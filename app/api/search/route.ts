import { NextResponse } from 'next/server';
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: "sk-svcacct-2Hx9Wbyx9e5o3l-09tTqnpHJZ9Yql5YdXqaPTH4OWDZYz37JGWpAyNyWUVRH3sHE7T3BlbkFJ2kHV2rSuo8lymIJQUOzP2Godnaef3Rccf2pGGEBUbf4Zm6VPbRmM0qAvwtznaO79wA" });

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

export async function POST(request: Request) {
  const { query } = await request.json();

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that provides step-by-step introductions. Always format your response as follows:\n\nTitle: [Title]\n\nSteps:\n\n1. **[Step Title]**:\n- [Substep 1]\n- [Substep 2]\n...\n\n2. **[Step Title]**:\n- [Substep 1]\n- [Substep 2]\n...\n\nConclusion: [Brief conclusion]" },
        { role: "user", content: `Provide a step-by-step introduction for: ${query}` }
      ],
    });

    const result = response.choices[0].message?.content;
    console.log(result)
    const parsedResult = parseResponse(result || '');
    return NextResponse.json(parsedResult);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
  }
}