import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// API route to generate dynamic quizzes using Gemini API
app.post('/api/generate-quiz', async (req, res) => {
  try {
    const { topic = 'Cognitive Science', count = 5, difficulty = 'Intermediate' } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({
        success: false,
        message: 'GEMINI_API_KEY not configured. Using fallback local question generator.',
        questions: null
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are a world-class academic educator and exam creator.
Create exactly ${Math.min(Math.max(Number(count) || 5, 3), 10)} challenging, high-yield multiple-choice questions on the topic: "${topic}".
Difficulty level: ${difficulty}.

Return STRICT JSON format conforming to this schema:
{
  "title": "Short title for this quiz set",
  "category": "Broad category name",
  "topic": "${topic}",
  "questions": [
    {
      "id": "q1",
      "stem": "Precise, thoughtful question stem. Can include realistic scenario or brief technical premise.",
      "codeOrContext": "Optional snippet, formula, or context if applicable (or null)",
      "options": [
        "First plausible option",
        "Second plausible option",
        "Third plausible option",
        "Fourth plausible option"
      ],
      "correctIndex": 0, // 0, 1, 2, or 3
      "explanation": "Deep conceptual breakdown explaining why the correct choice is right and addressing common misconceptions.",
      "keyConcept": "1-2 sentence core takeaway for flashcard retention",
      "difficulty": "${difficulty}"
    }
  ]
}
Do not include markdown code block ticks outside JSON if possible, just valid JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.6,
      },
    });

    const text = response.text || '{}';
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      // Clean up markdown block if present
      const cleaned = text.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
      data = JSON.parse(cleaned);
    }

    res.json({ success: true, data });
  } catch (error: any) {
    console.error('Gemini Quiz Generation Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate quiz',
    });
  }
});

// Vite middleware or static serving
const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Luminous Study Server listening on port ${PORT}`);
});
