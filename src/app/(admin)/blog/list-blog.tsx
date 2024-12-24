'use client'

import { useEffect, useState } from 'react'
import { Blog } from './validation'
import { getBlogs } from './server-action'
import Link from 'next/link'
import Image from 'next/image'

export default function ListBlog() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBlogs() {
      const result = await getBlogs()
      
      if (result.error) {
        setError(result.error)
      } else if (result.data) {
        setBlogs(result.data)
      }
      
      setLoading(false)
    }

    fetchBlogs()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Memuat data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-gray-500">Belum ada blog yang ditambahkan</p>
        <Link 
          href="/blog/create" 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Tambah Blog Baru
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Daftar Blog</h1>
        <Link
          href="/blog/create"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Tambah Blog Baru
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="border rounded-lg overflow-hidden shadow-sm">
            <div className="relative h-48">
              <Image
                src={blog.image_url}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-4">
                {blog.content.substring(0, 150)}...
              </p>
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded text-sm ${
                  blog.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {blog.published ? 'Dipublikasi' : 'Draft'}
                </span>
                <Link
                  href={`/blog/edit/${blog.id}`}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Edit Blog
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
