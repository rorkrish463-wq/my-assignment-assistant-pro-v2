import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { question, rules } = await req.json();

    const prompt = `
Write a complete academic answer in formal third-person language.

Requirements:
- Use Calibri font formatting principles.
- Main headings: 16 pt.
- Subheadings: 14 pt.
- Body text: 11 pt.
- Include APA 7 references if sources are used.
- Highlight important points using bold markers.
- Follow all user instructions.
- Human-like, natural academic writing.

Assignment Question:
${question}

Instructions:
${rules}
`;

    const response = await client.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.4,
    });

    const answer = response.choices[0]?.message?.content || 'No response.';
    return NextResponse.json({ answer });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to generate answer.' },
      { status: 500 }
    );
  }
}