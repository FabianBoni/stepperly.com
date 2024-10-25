import { NextRequest, NextResponse } from 'next/server';
import OpenAI from "openai";
import { headers } from 'next/headers';
import { getAuth } from "@clerk/nextjs/server";
import connectDB from '../../lib/mongodb';
import Subscription from '../../models/Subscription';
import AnonymousSearch from '../../models/AnonymousSearch';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function parseResponse(content: string) {
  const titleMatch = content.match(/Title: (.+)/);
  const stepsPattern = /\d+\.\s+\*\*([^*]+)\*\*:\s*((?:[-•][^\n]+\n?)+)/g;
  const conclusionMatch = content.match(/Conclusion: (.+)/);

  const title = titleMatch ? titleMatch[1] : '';
  const steps = [];
  let match;

  while ((match = stepsPattern.exec(content)) !== null) {
    const title = match[1].trim();
    const substeps = match[2]
      .split('\n')
      .filter(step => step.trim().startsWith('-'))
      .map(step => step.trim().replace(/^-\s*/, ''));
    
    steps.push({ title, substeps });
  }

  const conclusion = conclusionMatch ? conclusionMatch[1] : '';

  return { title, steps, conclusion };
}

export async function POST(request: NextRequest) {
  const headersList = headers();
  const ip = headersList.get('x-forwarded-for') || 'unknown';
  const { userId } = getAuth(request);
  const { query } = await request.json();

  await connectDB();

  // Handle logged-in users
  if (userId) {
    const subscription = await Subscription.findOne({
      userId,
      status: 'active'
    });

    const searchCount = await Subscription.countDocuments({
      userId,
      searchCount: { $exists: true }
    });

    if (!subscription && searchCount >= 1) {
      return NextResponse.json({ 
        error: 'Free plan limited to 1 search. Please upgrade to Premium for unlimited searches.' 
      }, { status: 403 });
    }

    if (!subscription) {
      await Subscription.updateOne(
        { userId },
        { $inc: { searchCount: 1 } },
        { upsert: true }
      );
    }
  } 
  // Handle non-logged-in users
  else {
    const anonymousSearch = await AnonymousSearch.findOne({ 
      ip,
      createdAt: { 
        $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) 
      }
    });

    if (anonymousSearch && anonymousSearch.searchCount >= 1) {
      return NextResponse.json({ 
        error: "You've reached your free search limit. Sign up for more searches!" 
      }, { status: 403 });
    }

    await AnonymousSearch.create({
      ip,
      searchCount: 1
    });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that provides step-by-step introductions. Always format your response as follows:\n\nTitle: [Title]\n\nSteps:\n\n1. **[Step Title]**:\n- [Substep 1]\n- [Substep 2]\n...\n\n2. **[Step Title]**:\n- [Substep 1]\n- [Substep 2]\n...\n\nConclusion: [Brief conclusion]" },
        { role: "user", content: `Provide a step-by-step introduction for: ${query}` }
      ],
    });

    const result = response.choices[0].message?.content;
    const parsedResult = parseResponse(result || '');
    return NextResponse.json(parsedResult);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
  }
}