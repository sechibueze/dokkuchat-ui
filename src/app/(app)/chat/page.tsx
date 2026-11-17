import type { Metadata } from 'next';
import { ChatWorkspace } from '@/features/chat/components/ChatWorkspace';

export const metadata: Metadata = { title: 'New chat' };

export default function NewChatPage() {
  return <ChatWorkspace />;
}
