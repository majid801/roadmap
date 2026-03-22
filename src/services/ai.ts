import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateRoadmap(goal: string, currentLevel: string, timePerDay: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Create a detailed career roadmap for someone who wants to become a ${goal}. 
    Current skill level: ${currentLevel}. 
    Time available per day: ${timePerDay}.
    
    The roadmap should be structured as a list of phases, each with a title, description, and a list of specific tasks.
    Return the response in JSON format.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          phases: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                duration: { type: Type.STRING },
                tasks: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      description: { type: Type.STRING },
                      estimatedTime: { type: Type.STRING },
                    },
                    required: ["title", "description"],
                  },
                },
              },
              required: ["title", "description", "tasks"],
            },
          },
        },
        required: ["title", "description", "phases"],
      },
    },
  });

  return JSON.parse(response.text);
}

export async function getAiMentorship(question: string, context: any) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Context: ${JSON.stringify(context)}
    Question: ${question}`,
    config: {
      systemInstruction: "You are a senior career mentor and technical expert. Provide concise, actionable advice based on the user's current roadmap and progress.",
    },
  });

  return response.text;
}
