import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import slugify from 'slugify'
import type { Components } from 'react-markdown'

interface PostContentProps {
  content: string
}

const CodeBlock: React.FC<{
  inline?: boolean
  className?: string
  children?: React.ReactNode
}> = ({ inline, className, children, ...props }) => {
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
    <code className="rounded bg-slate-800 px-1 py-0.5" {...props}>
      {children}
    </code>
  )
}

export function PostContent({ content }: PostContentProps) {
  const components: Components = {
    code: CodeBlock,
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
        <h2 id={id} className="mt-6 mb-2 text-xl font-bold text-slate-200">
          {children}
        </h2>
      )
    },
    ul({ children }) {
      return <ul className="ml-6 list-disc text-slate-300">{children}</ul>
    },
  }

  return (
    <section className="flex flex-col gap-4 px-8 py-10 text-slate-300">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </section>
  )
}
