import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faCalendar,
  faChevronLeft,
  faComment,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import { ExternalLink } from '@/components/external-link'
import { api } from '@/services/github'
import { relativeDateFormatter } from '@/utils/formatter'
import { PostContent } from './post-content'
import { GITHUB_REPO, GITHUB_USERNAME } from '@/config/github'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

async function fetchPostDetails(number: string) {
  const response = await api.get(
    `/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/issues/${number}`,
  )
  return response.data
}

export default async function Post({
  params,
}: {
  params: Promise<{ number: string }>
}) {
  const awaitedParams = await params

  const postNumber = awaitedParams.number

  if (!postNumber) notFound()

  const postData = await fetchPostDetails(postNumber)
  const formattedDate = relativeDateFormatter(postData.created_at)

  return (
    <>
      <div className="rounded-lxl mt-[-88px] flex flex-col bg-slate-900 p-6 shadow-2xl lg:max-h-42 lg:w-full lg:p-8">
        <header className="mb-5 flex items-center justify-between lg:w-full">
          <ExternalLink
            href="/"
            text="Voltar"
            icon={<FontAwesomeIcon icon={faChevronLeft} />}
            iconPosition="left"
          />
          <ExternalLink
            text="Ver no github"
            href={postData.html_url}
            target="_blank"
          />
        </header>
        <h1 className="text-2xl font-bold text-slate-100">{postData.title}</h1>
        <ul className="item-center mt-4 flex flex-col gap-2 lg:flex-row lg:gap-6">
          <li className="flex items-center gap-2 text-slate-400">
            <FontAwesomeIcon
              className="h-4.5 w-4.5 text-slate-600"
              icon={faGithub}
            />
            {postData.user.login}
          </li>
          <li className="flex items-center gap-2 text-slate-400">
            <FontAwesomeIcon
              className="h-4.5 w-4.5 text-slate-600"
              icon={faCalendar}
            />
            {formattedDate}
          </li>
          <li className="flex items-center gap-2 text-slate-400">
            <FontAwesomeIcon
              className="h-4.5 w-4.5 text-slate-600"
              icon={faComment}
            />
            {postData.comments} comentários
          </li>
        </ul>
      </div>

      <PostContent content={postData.body} />
    </>
  )
}
