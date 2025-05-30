import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import dracula from 'react-syntax-highlighter/dist/esm/styles/prism'
import slugify from 'slugify'

interface PostContentProps {
  content: string
}

export function PostContent({ content }: PostContentProps) {
  return (
    <section className="flex flex-col gap-4 px-8 py-10 text-slate-300">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                style={dracula}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
          a({ href, children, ...props }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-400"
                {...props}
              >
                {children}
              </a>
            )
          },
          h2({ children }) {
            const text = String(children)
            const id = slugify(text, { lower: true, strict: true })
            return (
              <h2 id={id} className="mt-6 mb-2 text-xl font-bold">
                {children}
              </h2>
            )
          },
          ul({ children }) {
            return <ul className="ml-6 list-disc text-slate-300">{children}</ul>
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </section>
  )
}
