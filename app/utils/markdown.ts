/**
 * Encodes angle brackets in AI-generated content before MDC rendering
 * to prevent inline HTML (e.g. `<script>`) from being interpreted as DOM.
 * Intentionally does NOT encode `&` to avoid double-encoding entities.
 */
export function sanitizeMarkdownInput(value: string): string {
  return value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Markdown inline syntax → plain text (links keep their label). */
export function markdownToPlainText(value: string): string {
  return value
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)(\{[^}]*\})?/g, "$1")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Question/answer pairs from a markdown section whose `### ` headings are
 * the questions, e.g. the FAQ in app/data/help.md. Answers are plain text,
 * for FAQPage structured data.
 */
export function extractFaqEntries(
  markdown: string,
  sectionTitle: string,
): { question: string; answer: string }[] {
  const start = markdown.indexOf(`## ${sectionTitle}`);
  if (start === -1) return [];
  const rest = markdown.slice(start + sectionTitle.length + 3);
  const end = rest.search(/^## /m);
  const section = end === -1 ? rest : rest.slice(0, end);
  return section
    .split(/^### /m)
    .slice(1)
    .map((block) => {
      const [heading = "", ...body] = block.split("\n");
      return {
        question: markdownToPlainText(heading),
        answer: markdownToPlainText(
          body.filter((line) => !/^-{3,}\s*$/.test(line)).join(" "),
        ),
      };
    })
    .filter((entry) => entry.question && entry.answer);
}
