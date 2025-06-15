import { ContentIdeas } from '@/types';

// Use the provided API key
const GEMINI_API_KEY = 'AIzaSyAVQXo7oZDqUMTQudDwYHRDqQ9nFEokUyE';

export async function generateContentIdeas(topic: string, contentStyle: string = 'Evergreen SEO'): Promise<ContentIdeas> {
  const prompt = `
    As an expert in content marketing and SEO, generate a set of content ideas for the niche topic: "${topic}". 
    The desired tone and style of the content is "${contentStyle}". 
    
    Tailor your entire output to match this style:
    - "Evergreen SEO": Focus on timeless, search-optimized content with high search volume keywords
    - "Viral & Trendy": Include current trends, viral potential, and trending hashtags
    - "Professional & Corporate": Use authoritative language, industry terms, and business-focused angles
    - "Casual & Humorous": Make it fun, relatable, and entertaining with a conversational tone
    
    Your response must be a valid JSON object only, with no other text before or after it.
    The JSON object must have the following structure:
    {
      "seoKeywords": ["an array of 10-15 valuable keywords tailored to the ${contentStyle} style"],
      "blogTitles": ["an array of 5-7 compelling blog post titles that match the ${contentStyle} tone"],
      "socialHooks": ["an array of 3-5 short, punchy social media hooks that fit the ${contentStyle} style"]
    }
  `;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error Response:', errorText);
      throw new Error(`Gemini API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response structure from Gemini API');
    }
    
    const generatedText = data.candidates[0].content.parts[0].text;
    
    // Clean and parse the JSON from the response text
    const cleanedText = generatedText.replace(/```json/g, '').replace(/```/g, '').trim();
    const resultJson = JSON.parse(cleanedText);

    // Validate the response structure
    if (!resultJson.seoKeywords || !resultJson.blogTitles || !resultJson.socialHooks) {
      throw new Error('Invalid response format from AI model');
    }

    return resultJson;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to generate content from AI model.');
  }
}