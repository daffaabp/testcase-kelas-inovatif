import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    messages,
    tools: {
      generateBlogIdeas: tool({
        description: 'Generate blog post ideas based on a topic',
        parameters: z.object({
          topic: z.string().describe('The main topic to generate blog ideas for'),
          count: z.number().min(1).max(5).describe('Number of ideas to generate'),
        }),
        execute: async ({ topic, count }) => {
          return {
            ideas: Array(count).fill(null).map((_, i) => ({
              title: `Sample Blog Idea ${i + 1} for ${topic}`,
              description: `This is a sample description for a blog post about ${topic}`
            }))
          };
        },
      }),
      analyzeBlogContent: tool({
        description: 'Analyze blog content and suggest improvements',
        parameters: z.object({
          content: z.string().describe('The blog content to analyze'),
        }),
        execute: async ({ content }) => {
          return {
            wordCount: content.split(' ').length,
            suggestions: [
              'Add more specific examples',
              'Include relevant statistics',
              'Consider adding subheadings'
            ]
          };
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}