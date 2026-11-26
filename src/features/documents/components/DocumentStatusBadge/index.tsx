import { cn } from "@/lib/cn";
import type { DocumentStatus } from "@/features/documents/document.schema";

const STATUS_STYLES: Record<
  DocumentStatus,
  { label: string; className: string }
> = {
  uploaded: { label: "Queued", className: "bg-slate-100 text-slate-600" },
  processing: { label: "Processing", className: "bg-amber-100 text-amber-700" },
  ready: { label: "Ready", className: "bg-green-100 text-green-700" },
  failed: { label: "Failed", className: "bg-red-100 text-red-700" },
};

export function DocumentStatusBadge({ status }: { status: DocumentStatus }) {
  // @ts-ignore
  const { label, className } = STATUS_STYLES[(status as string).toLowerCase()];
  return (
    <span
      className={cn("rounded-full px-2 py-0.5 text-xs font-medium", className)}
    >
      {label}
    </span>
  );
}
