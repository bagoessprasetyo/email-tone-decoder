import OpenAI from 'openai';

if (!process.env.DEEPSEEK_API_KEY) {
  throw new Error('Missing DEEPSEEK_API_KEY environment variable');
}

const openai = new OpenAI({
  baseURL: process.env.DEEPSEEK_API_BASE_URL,
  apiKey: process.env.DEEPSEEK_API_KEY,
});

import { EmailAnalysis } from '@/app/api/analyze/types';

export async function analyzeEmailTone(content: string): Promise<{ success: boolean; analysis?: string; error?: string; rawResponse?: string }> {
  try {
    const response = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: `You are an expert at analyzing email tone and content. Provide your analysis in markdown format with the following sections:

# Email Analysis

## Sentiment Analysis
- Overall sentiment (positive/negative/neutral)
- Key emotional indicators
- Confidence level

## Tone Analysis
- Primary tone (formal/informal/friendly/urgent/etc)
- Secondary tones
- Writing style observations

## Suggestions
- Tone improvements
- Clarity enhancements
- Cultural considerations

## Summary
- Brief overview of key findings
- Main recommendations

Provide specific examples from the text to support your analysis. Format suggestions as actionable bullet points. please add emojis to make the tone report more engaging.`
        },
        {
          role: "user",
          content: content
        }
      ],
      temperature: 1.5,
      stream: false,
    });

    

    if (!response.choices || !response.choices[0] || !response.choices[0].message.content) {
      return {
        success: false,
        error: 'Invalid response from OpenAI API'
      };
    }

    try {
      return {
        success: true,
        analysis: response.choices[0].message.content.trim(),
        rawResponse: response.choices[0].message.content
      };
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError);
      return {
        success: false,
        error: 'Failed to parse analysis response',
        rawResponse: response.choices[0].message.content
      };
    }
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    return {
      success: false,
      error: error.message || 'Failed to analyze email content'
    };
  }
}