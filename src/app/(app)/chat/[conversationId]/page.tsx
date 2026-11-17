import { ChatWorkspace } from '@/features/chat/components/ChatWorkspace';

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) {
  const { conversationId } = await params;
  return <ChatWorkspace conversationId={conversationId} />;
}
