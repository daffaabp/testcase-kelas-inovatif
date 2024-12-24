import ListBlog from './list-blog'

export const metadata = {
  title: 'Daftar Blog',
  description: 'Halaman manajemen blog'
}

export default function BlogPage() {
  return (
    <main>
      <ListBlog />
    </main>
  )
}
