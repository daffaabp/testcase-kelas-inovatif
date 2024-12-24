'use client'

import { useEffect, useState } from 'react'
import { Blog } from './validation'
import { getBlogs } from './server-action'
import Link from 'next/link'
import Image from 'next/image'

interface ImageComponentProps {
    src: string
    alt: string
}

const ImageComponent = ({ src, alt }: ImageComponentProps) => {
    const fallbackImage = '/images/placeholder.jpg'
    const [imgSrc, setImgSrc] = useState(src)

    return (
        <div className="relative h-48 bg-gray-100">
            <Image
                src={imgSrc}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                onError={() => {
                    setImgSrc(fallbackImage)
                }}
            />
        </div>
    )
}

export default function ListBlog() {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const result = await getBlogs()

                if (result.error) {
                    setError(result.error)
                } else if (result.data) {
                    setBlogs(result.data)
                }
            } catch (err) {
                setError('Terjadi kesalahan saat mengambil data blog')
            } finally {
                setLoading(false)
            }
        }

        void fetchBlogs()
    }, [])

    if (loading) {
        return <div className="p-4">Loading...</div>
    }

    if (error) {
        return <div className="p-4 text-red-500">{error}</div>
    }

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="border rounded-lg overflow-hidden shadow-sm"
                    >
                        <ImageComponent
                            src={blog.image_url}
                            alt={blog.title}
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                            <p className="text-gray-600 mb-4">
                                {blog.content.substring(0, 150)}...
                            </p>
                            <div className="flex justify-between items-center">
                                <span
                                    className={`px-2 py-1 rounded text-sm ${blog.published
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}
                                >
                                    {blog.published ? 'Dipublikasi' : 'Draft'}
                                </span>
                                <Link
                                    href={`/dashboard/blog/edit/${blog.id}`}
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
