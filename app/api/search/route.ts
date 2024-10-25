import { NextRequest, NextResponse } from 'next/server';
import OpenAI from "openai";
import { getAuth } from "@clerk/nextjs/server";
import connectDB from '../../lib/mongodb';
import Subscription from '../../models/Subscription';

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
  const { userId } = getAuth(request);
  const { query } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  await connectDB();
  
  // Check subscription status
  const subscription = await Subscription.findOne({
    userId,
    status: 'active'
  });

  // Get search count from MongoDB
  const searchCount = await Subscription.countDocuments({
    userId,
    searchCount: { $exists: true }
  });

  if (!subscription && searchCount >= 1) {
    return NextResponse.json({ 
      error: 'Free plan limited to 1 search. Please upgrade to Premium for unlimited searches.' 
    }, { status: 403 });
  }

  try {
    // Increment search count for non-premium users
    if (!subscription) {
      await Subscription.updateOne(
        { userId },
        { $inc: { searchCount: 1 } },
        { upsert: true }
      );
    }

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