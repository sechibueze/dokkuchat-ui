import { FileText } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Message } from "@/features/chat/chat.schema";

export function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role.toLowerCase() === "user";

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-indigo-600 text-white"
            : "border border-slate-200 bg-white text-slate-800",
        )}
      >
        {message.content}
        {/* {!isUser && sources.length > 0 && (
          <div className="mt-3 border-t border-slate-100 pt-2">
            <p className="mb-1.5 text-xs font-medium text-slate-500">Sources</p>
            <ul className="flex flex-wrap gap-1.5">
              {sources.map((source) => (
                <li
                  key={`${source.documentId}-${source.documentName.slice(0, 20)}`}
                  title={source.documentName}
                  className="flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-1 text-xs text-indigo-700"
                >
                  <FileText className="h-3 w-3" />
                  {source.documentName}
                </li>
              ))}
            </ul>
          </div>
        )} */}
      </div>
    </div>
  );
}
