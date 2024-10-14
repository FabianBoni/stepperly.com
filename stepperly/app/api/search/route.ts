import { NextResponse } from 'next/server';
import OpenAI from "openai";



function parseResponse(content: string) {
  const titleMatch = content.match(/Title: (.+)/);
  const stepsMatch = content.match(/Steps:\n\n([\s\S]*?)\n\nConclusion:/);
  const conclusionMatch = content.match(/Conclusion: (.+)/);

  const title = titleMatch ? titleMatch[1] : '';
  const steps = stepsMatch ? stepsMatch[1].split(/\d+\.\s+\*\*/).slice(1).map(step => {
    const [title, ...substepsArray] = step.split('\n');
    const substeps = substepsArray.map(s => s.trim()).filter(s => s !== '');
    return { 
      title: title.replace(/\*\*:/, '').trim(),
      substeps 
    };
  }) : [];
  const conclusion = conclusionMatch ? conclusionMatch[1] : '';

  return { title, steps, conclusion };
}

export async function POST(request: Request) {
  const { query } = await request.json();

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
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