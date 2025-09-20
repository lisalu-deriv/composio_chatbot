import { z } from 'zod';
import { availableModels } from '@/lib/ai/providers';

const textPartSchema = z.object({
  text: z.string().min(1).max(2000),
  type: z.enum(['text']),
});

// Generate model enum from available models
const modelIds = availableModels.map(model => model.id) as [string, ...string[]];

export const postRequestBodySchema = z.object({
  id: z.string().uuid(),
  message: z.object({
    id: z.string().uuid(),
    createdAt: z.coerce.date(),
    role: z.enum(['user']),
    content: z.string().min(1).max(2000),
    parts: z.array(textPartSchema),
    experimental_attachments: z
      .array(
        z.object({
          url: z.string().url(),
          name: z.string().min(1).max(2000),
          contentType: z.enum(['image/png', 'image/jpg', 'image/jpeg']),
        }),
      )
      .optional(),
  }),
  selectedChatModel: z.enum(modelIds.length > 0 ? modelIds : ['gpt-5-mini']),
  selectedVisibilityType: z.enum(['public', 'private']),
  enabledToolkits: z
    .array(
      z.object({
        slug: z.string(),
        isConnected: z.boolean(),
      }),
    )
    .optional(),
});

export type PostRequestBody = z.infer<typeof postRequestBodySchema>;

// Export available model IDs for use in other components
export const AVAILABLE_MODEL_IDS = modelIds;

// Validation helper for model IDs
export const isValidModelId = (modelId: string): boolean => {
  return modelIds.includes(modelId);
};
