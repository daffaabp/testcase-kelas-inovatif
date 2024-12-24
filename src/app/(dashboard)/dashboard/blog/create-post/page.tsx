'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBlog } from '../server-action'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useAlert } from '@/hooks/use-sweet-alert'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CreatePost() {
    const [loading, setLoading] = useState(false)
    const [published, setPublished] = useState(false)
    const router = useRouter()
    const { showSuccess, showError } = useAlert()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        try {
            const formData = new FormData(e.currentTarget)
            formData.append('published', published.toString())

            const result = await createBlog(formData)

            if (result.error) {
                throw new Error(result.error)
            }

            await showSuccess('Blog berhasil dibuat')
            router.push('/dashboard/blog')
            router.refresh()

        } catch (error) {
            await showError(error instanceof Error ? error.message : 'Terjadi kesalahan')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container max-w-4xl py-6">
            <Card>
                <CardHeader className="space-y-1">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard/blog">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <CardTitle className="text-2xl">Buat Post Baru</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Judul</Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Masukkan judul blog"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Konten</Label>
                            <Textarea
                                id="content"
                                name="content"
                                placeholder="Tulis konten blog di sini..."
                                className="min-h-[200px]"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image_url">URL Gambar</Label>
                            <Input
                                id="image_url"
                                name="image_url"
                                type="url"
                                placeholder="https://example.com/image.jpg"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Switch
                                id="published"
                                checked={published}
                                onCheckedChange={setPublished}
                                disabled={loading}
                            />
                            <Label htmlFor="published">Publikasikan sekarang</Label>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full"
                            >
                                {loading ? 'Menyimpan...' : 'Simpan Blog'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                disabled={loading}
                                onClick={() => router.push('/dashboard/blog')}
                                className="w-full"
                            >
                                Batal
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
} 