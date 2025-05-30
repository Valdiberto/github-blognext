'use client'

import Image from 'next/image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faBuilding, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { ExternalLink } from '../../components/external-link'
import { ProfileSkeleton } from './profile-skeleton'
import { GITHUB_USERNAME } from '@/config/github'
import { api } from '@/services/github'

interface GitHubUser {
  avatar_url: string
  name: string
  bio: string
  html_url: string
  login: string
  company: string | null
  followers: number
}

export function Profile() {
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<GitHubUser | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true)
        const response = await api.get<GitHubUser>(`/users/${GITHUB_USERNAME}`)
        setUserData(response.data)
      } catch (err) {
        console.error('Failed to fetch user data:', err)
        setError('Failed to load profile data')
      } finally {
        setIsLoading(false)
      }
    }
    fetchUserData()
  }, [])
  if (isLoading) return <ProfileSkeleton />

  if (error) {
    return (
      <div className="rounded-lxl mt-[-88px] flex gap-8 bg-slate-900 px-10 py-8">
        <div className="flex flex-1 items-center justify-center">
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    )
  }

  if (!userData) {
    return null
  }

  return (
    <div className="rounded-lxl mt-[-88px] flex w-216 gap-8 bg-slate-900 px-10 py-8">
      <Image
        className="rounded-lg object-cover"
        src={userData.avatar_url}
        width={148}
        height={148}
        alt="User avatar"
        priority
      />
      <div className="flex w-full flex-col">
        <div className="mb-2 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-100">
            {userData.name || userData.login}
          </h1>

          <ExternalLink
            text="Github"
            href={userData.html_url}
            target="_blank"
          />
        </div>
        <p className="leading-[160%] text-slate-300">
          {userData.bio || 'No bio available'}
        </p>
        <ul className="mt-auto flex flex-wrap items-center gap-6 text-slate-200">
          <li className="flex items-center gap-2">
            <FontAwesomeIcon
              className="h-4.5 w-4.5 text-slate-600"
              icon={faGithub}
            />
            {userData.login}
          </li>
          {userData.company && (
            <li className="flex items-center gap-2">
              <FontAwesomeIcon
                className="h-4.5 w-4.5 text-slate-600"
                icon={faBuilding}
              />
              {userData.company}
            </li>
          )}

          <li className="flex items-center gap-2">
            <FontAwesomeIcon
              className="h-4.5 w-4.5 text-slate-600"
              icon={faUserGroup}
            />
            {userData.followers}{' '}
            {userData.followers === 1 ? 'seguidor' : 'seguidores'}
          </li>
        </ul>
      </div>
    </div>
  )
}
