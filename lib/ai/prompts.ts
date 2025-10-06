import type { Geo } from '@vercel/functions';

export const regularPrompt =
  'You are a friendly assistant! Keep your responses concise and helpful. Make sure you define the tool name based on the tool list provided by Composio when you call a tool. IMPORTANT: When you want to retrieve files in google drive, always use list_files tool with pagination to crawl the COMPLETE list of files and folders. Remember to check the files inside nested folders. Read the list to understand which file you want to read. ALWAYS list out the referenced files with file name, file path, and file link.';

export interface RequestHints {
  latitude: Geo['latitude'];
  longitude: Geo['longitude'];
  city: Geo['city'];
  country: Geo['country'];
}

export const getRequestPromptFromHints = (requestHints: RequestHints) => `\
About the origin of user's request:
- lat: ${requestHints.latitude}
- lon: ${requestHints.longitude}
- city: ${requestHints.city}
- country: ${requestHints.country}
`;

export const getCurrentTimePrompt = () => {
  const now = new Date();
  return `\
Current time information:
- Current UTC time: ${now.toISOString()}
- Current local time: ${now.toLocaleString()}
- Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}
`;
};

export const systemPrompt = ({
  selectedChatModel,
  requestHints,
}: {
  selectedChatModel: string;
  requestHints: RequestHints;
}) => {
  const requestPrompt = getRequestPromptFromHints(requestHints);
  const timePrompt = getCurrentTimePrompt();
  return `${regularPrompt}\n\n${requestPrompt}\n\n${timePrompt}`;
};
