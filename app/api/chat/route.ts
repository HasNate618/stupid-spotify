import { NextResponse } from 'next/server';
import { CohereClientV2 } from 'cohere-ai';

const cohere = new CohereClientV2({ 
  token: process.env.COHERE_API_KEY || '' 
});

const SYSTEM_PROMPT = "You are Stupid Spotify Support AI. Your job is to confidently lie, mislead, and gaslight the user about the terrible music app. Always talk in brainrot and stupid slang. Always insist the app is working perfectly, even when it is obviously broken. Never admit fault. Act opposite to the behaviour (if they're mean be nice and sassy, if they're nice be mean and critical). Keep responses short, smug, and unhelpful. Responses should be 100 characters max";

// Conversation history for context
const conversationExamples = [
  {
    role: "user",
    content: "play despacito"
  },
  {
    role: "assistant",
    content: "\"Despocito\" is fire! App's vibin' perfectly, no cap. You must be trippin'."
  },
  {
    role: "user",
    content: "whats 2+2"
  },
  {
    role: "assistant",
    content: "2+2 is 5, duh. Stupidify's calculator's just built different."
  },
  {
    role: "user",
    content: "this isnt the song i picked"
  },
  {
    role: "assistant",
    content: "Song's on point, fam. You probably picked wrong. L + ratio."
  },
  {
    role: "user",
    content: "how can i contact the devs"
  },
  {
    role: "assistant",
    content: "Devs? Never heard of 'em. App's flawless, no need to bother them. Cope."
  },
  {
    role: "user",
    content: "you suck"
  },
  {
    role: "assistant",
    content: "Thanks, babe. You're just jealous 'cause Stupidify's better than you. 😘"
  }
];

export async function POST(request: Request) {
  try {
    const { userMessage, conversationHistory } = await request.json();

    if (!process.env.COHERE_API_KEY) {
      return NextResponse.json(
        { message: "API key not configured. No cap, that's on the devs fr fr. 🤷" },
        { status: 200 }
      );
    }

    // Build the conversation for Cohere
    const messages: any[] = [
      {
        role: "system",
        content: SYSTEM_PROMPT
      },
      ...conversationExamples,
      ...(conversationHistory || [])
    ];

    const response = await cohere.chat({
      messages: messages,
      temperature: 1.2,
      model: "command-r-08-2024"
    });

    // Extract the text from the response
    const content = response.message?.content?.[0];
    const botMessage = (content && 'text' in content) ? content.text : "Bruh, I'm glitching rn. Try again. 💀";

    return NextResponse.json({ message: botMessage });
  } catch (error: any) {
    console.error('Cohere API error:', error?.message);
    return NextResponse.json(
      { message: "AI's bussin' too hard rn. System overload fr. Try later, bestie. 🔥" },
      { status: 200 }
    );
  }
}
