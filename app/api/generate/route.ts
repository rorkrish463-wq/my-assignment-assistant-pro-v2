import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

export async function POST(req: NextRequest) {
  try {
    const { question, rules } = await req.json();

    const prompt = `
    Write a complete academic assignment answer.

    Requirements:
    - Use formal third-person language.
    - Use clear headings and subheadings.
    - Highlight important points in bold.
    - Include APA 7 references when appropriate.
    - Follow all instructions provided.

    Assignment Question:
    ${question}

    Instructions:
    ${rules}
    `;

    const response = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
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