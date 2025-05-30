import Link from 'next/link'

import { relativeDateFormatter } from '@/utils/formatter'
import { IPost } from '@/services/github'

interface PostProps {
  post: IPost
}

export function PostCard({ post }: PostProps) {
  const formattedDate = relativeDateFormatter(post.created_at)
  return (
    <Link
      className="rounded-lxl h-65 w-full bg-slate-800 p-6 lg:p-8"
      href={`/post/${post.number}`}
    >
      <div className="mb-5 flex gap-4">
        <strong className="flex-1 overflow-hidden text-xl font-bold text-ellipsis text-slate-100">
          {post.title}
        </strong>
        <span className="text-sm leading-[160%] text-slate-400">
          {formattedDate}
        </span>
      </div>
      <p className="line-clamp-4 leading-[160%] text-slate-300">{post.body}</p>
    </Link>
  )
}
