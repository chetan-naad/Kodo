import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function getHint(exercisePrompt: string, userCode: string, attemptCount: number) {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    let levelInstruction = 'Give a subtle nudge.';
    if (attemptCount === 2) levelInstruction = 'Give a clearer hint indicating exactly what part of the logic is wrong.';
    if (attemptCount >= 3) levelInstruction = 'Give a near-complete explanation of how to fix it, but do not write the full solution.';

    const prompt = `You are a Java tutor. The exercise is: "${exercisePrompt}".
The user's current code is:
\`\`\`java
${userCode}
\`\`\`
${levelInstruction}
Rules: Never write the exact solution code. Max 2 sentences. Use an encouraging tone.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
}

export async function reviewCode(exercisePrompt: string, studentSolution: string) {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    const prompt = `You are a Java code reviewer. The exercise was: "${exercisePrompt}".
The student wrote:
\`\`\`java
${studentSolution}
\`\`\`
Provide a short code review. Rules: Exactly 2-3 sentences. Give one specific praise, and one specific improvement suggestion. Be beginner-friendly.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
}

export async function explainError(code: string, errorMessage: string) {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    const prompt = `You are a Java tutor helping a beginner. 
Their code:
\`\`\`java
${code}
\`\`\`
The error they got:
${errorMessage}

Explain this error in plain English. State what the error means, point out which line is likely causing it, and tell them how to fix it. Rules: Maximum 3 sentences.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
}

export async function generateExercise(topic: string, difficulty: string, previousExercises: string[]) {
    const model = genAI.getGenerativeModel({ 
        model: 'gemini-1.5-pro',
        generationConfig: {
            responseMimeType: "application/json"
        }
    });
    
    const prompt = `Create a Java programming exercise on the topic: "${topic}". Difficulty: ${difficulty}.
The user has previously done these similar exercises: ${previousExercises.join(', ')}. Create something new.

Return strict JSON matching this interface:
{
  "prompt": "The exercise question/instruction",
  "template": "The starting code template snippet",
  "solution": "The correct solution snippet"
}

Rule: return ONLY raw JSON, without markdown blocks, without backticks around it.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    try {
        return JSON.parse(response.text() || '{}');
    } catch (e) {
        return { error: 'Failed to parse JSON', raw: response.text() };
    }
}
