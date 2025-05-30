import { fetchPosts } from '@/services/github'

async function test() {
  try {
    console.log('Iniciando teste...')
    const posts = await fetchPosts()
    console.log('Posts encontrados:', posts.length)
  } catch (error) {
    console.error('Erro no teste:', error)
  }
}

test()
