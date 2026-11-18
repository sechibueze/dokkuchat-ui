export const MAX_UPLOAD_SIZE_BYTES = 5 * 1024 * 1024;

export const ALLOWED_UPLOAD_MIME_TYPES: readonly string[] = [
  'application/pdf',
  //   'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'text/markdown',
];

export const UPLOAD_ACCEPT_ATTRIBUTE = '.pdf,.txt,.md';
