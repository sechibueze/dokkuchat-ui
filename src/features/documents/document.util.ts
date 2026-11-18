import {
  ALLOWED_UPLOAD_MIME_TYPES,
  MAX_UPLOAD_SIZE_BYTES,
} from '@/features/documents/constant';

export function validateUploadFile(file: File): string | null {
  if (!ALLOWED_UPLOAD_MIME_TYPES.includes(file.type)) {
    return `"${file.name}" is not a supported file type.`;
  }
  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    return `"${file.name}" is larger than 5 MB.`;
  }
  return null;
}
