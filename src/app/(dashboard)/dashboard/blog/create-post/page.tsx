'use client'

import { useRouter } from 'next/navigation'
import { createBlog } from '../server-action'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { useAlert } from '@/hooks/use-sweet-alert'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

interface CreatePostForm {
    title: string
    content: string
    image_url: string
    published: boolean
}

export default function CreatePost() {
    const router = useRouter()
    const { showSuccess, showError } = useAlert()

    const form = useForm<CreatePostForm>({
        defaultValues: {
            title: '',
            content: '',
            image_url: '',
            published: false
        }
    })

    const { isSubmitting } = form.formState

    async function onSubmit(values: CreatePostForm) {
        try {
            const formData = new FormData()
            formData.append('title', values.title)
            formData.append('content', values.content)
            formData.append('image_url', values.image_url)
            formData.append('published', values.published.toString())

            const result = await createBlog(formData)

            if (result.error) {
                throw new Error(result.error)
            }

            await showSuccess('Blog berhasil dibuat')
            router.push('/dashboard/blog')
            router.refresh()

        } catch (error) {
            await showError(error instanceof Error ? error.message : 'Terjadi kesalahan')
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
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Judul</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Masukkan judul blog"
                                                disabled={isSubmitting}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Konten</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tulis konten blog di sini..."
                                                className="min-h-[200px]"
                                                disabled={isSubmitting}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="image_url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>URL Gambar</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="url"
                                                placeholder="https://example.com/image.jpg"
                                                disabled={isSubmitting}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="published"
                                render={({ field }) => (
                                    <FormItem className="flex items-center gap-2">
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <FormLabel>Publikasikan sekarang</FormLabel>
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-4">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full"
                                >
                                    {isSubmitting ? 'Menyimpan...' : 'Simpan Blog'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={isSubmitting}
                                    onClick={() => router.push('/dashboard/blog')}
                                    className="w-full"
                                >
                                    Batal
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}