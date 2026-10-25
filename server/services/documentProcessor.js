// DOCUMENT INTELLIGENCE BOUNDARY PROCESSOR
export function processDocumentAttachment(file) {
  if (!file) return null;

  const extension = file.name.split('.').pop().toLowerCase();

  switch (extension) {
    case 'txt':
    case 'md':
    case 'js':
    case 'jsx':
    case 'ts':
    case 'tsx':
    case 'json':
    case 'html':
    case 'css':
    case 'csv':
      return {
        type: 'text',
        name: file.name,
        content: file.content || 'Code file context attached.'
      };

    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'webp':
      return {
        type: 'image',
        name: file.name,
        data: file.base64Data,
        mimeType: `image/${extension === 'jpg' ? 'jpeg' : extension}`
      };

    case 'pdf':
    case 'docx':
      return {
        type: 'boundary',
        name: file.name,
        message: `Document [${file.name}] attached. Full multi-page PDF/DOCX parsing boundary active.`
      };

    default:
      return {
        type: 'unknown',
        name: file.name,
        message: 'Unsupported document format.'
      };
  }
}
