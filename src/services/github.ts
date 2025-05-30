import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
  },
})

export interface IPost {
  title: string
  body: string
  created_at: string
  number: number
  html_url: string
  comments: number
  user: {
    login: string
  }
}

export async function fetchPosts(): Promise<IPost[]> {
  try {
    const response = await api.get(
      `/repos/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}/${process.env.NEXT_PUBLIC_GITHUB_REPONAME}/issues`,
      {
        params: {
          state: 'open',
          per_page: 100,
        },
      },
    )

    return response.data
  } catch (error) {
    console.error('Erro ao buscar posts:', error)
    throw new Error('Falha ao carregar posts')
  }
}
