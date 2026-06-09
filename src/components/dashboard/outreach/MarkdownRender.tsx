// Tiny markdown renderer for internal report content.
// Supports: # / ## / ### headings, **bold**, *italic*, `code`,
// > blockquote, - and 1. lists, ```fenced code blocks```,
// [text](href) links, --- hr, and blank-line paragraphs.

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function renderInline(s: string): string {
  let out = escapeHtml(s)
  // inline code first so its content is not parsed further
  out = out.replace(/`([^`]+)`/g, (_, code: string) => `<code>${code}</code>`)
  // bold then italic
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>")
  // links — href must be http(s) or relative
  out = out.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  )
  return out
}

function renderMarkdown(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n")
  const out: string[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (/^```/.test(line)) {
      i++
      const buf: string[] = []
      while (i < lines.length && !/^```/.test(lines[i])) {
        buf.push(lines[i])
        i++
      }
      i++
      out.push(`<pre><code>${escapeHtml(buf.join("\n"))}</code></pre>`)
      continue
    }

    if (/^---\s*$/.test(line)) {
      out.push("<hr />")
      i++
      continue
    }

    const heading = /^(#{1,6})\s+(.*)$/.exec(line)
    if (heading) {
      const level = heading[1].length
      out.push(`<h${level}>${renderInline(heading[2])}</h${level}>`)
      i++
      continue
    }

    if (/^>\s?/.test(line)) {
      const buf: string[] = []
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ""))
        i++
      }
      out.push(`<blockquote>${renderInline(buf.join(" "))}</blockquote>`)
      continue
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const buf: string[] = []
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        buf.push(`<li>${renderInline(lines[i].replace(/^\s*[-*]\s+/, ""))}</li>`)
        i++
      }
      out.push(`<ul>${buf.join("")}</ul>`)
      continue
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const buf: string[] = []
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        buf.push(`<li>${renderInline(lines[i].replace(/^\s*\d+\.\s+/, ""))}</li>`)
        i++
      }
      out.push(`<ol>${buf.join("")}</ol>`)
      continue
    }

    if (line.trim() === "") {
      i++
      continue
    }

    const buf: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^(#{1,6})\s+/.test(lines[i]) &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !/^>\s?/.test(lines[i]) &&
      !/^```/.test(lines[i]) &&
      !/^---\s*$/.test(lines[i])
    ) {
      buf.push(lines[i])
      i++
    }
    out.push(`<p>${renderInline(buf.join(" "))}</p>`)
  }

  return out.join("\n")
}

export function MarkdownRender({ source }: { source: string }) {
  const html = renderMarkdown(source)
  return <div className="ox-md-content" dangerouslySetInnerHTML={{ __html: html }} />
}
