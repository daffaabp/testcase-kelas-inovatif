'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Loader2 } from "lucide-react"
import { loginSchema } from '@/lib/validations/auth'
import * as z from 'zod'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClientComponentClient()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            // Validasi form menggunakan Zod
            const validatedData = loginSchema.parse({ email, password })

            const { error: authError } = await supabase.auth.signInWithPassword({
                email: validatedData.email,
                password: validatedData.password,
            })

            if (authError) throw authError

            router.push('/dashboard')
            router.refresh()
        } catch (err) {
            if (err instanceof z.ZodError) {
                setError(err.errors[0].message)
            } else if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Terjadi kesalahan yang tidak diketahui')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-[400px]">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>
                            Masukkan email Anda untuk masuk ke akun
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin}>
                            <div className="flex flex-col gap-6">
                                {error && (
                                    <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                                        {error}
                                    </div>
                                )}
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="nama@email.com"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">Password</Label>
                                        <Link
                                            href="/forgot-password"
                                            className="text-sm text-blue-600 hover:underline"
                                        >
                                            Lupa password?
                                        </Link>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Masukkan password"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Sedang masuk...
                                        </>
                                    ) : (
                                        'Masuk'
                                    )}
                                </Button>
                                <Button variant="outline" className="w-full" disabled={loading}>
                                    Lanjutkan dengan Google
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <p className="text-center text-sm text-gray-600 w-full">
                            Belum punya akun?{' '}
                            <Link href="/register" className="text-blue-600 hover:underline">
                                Daftar
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}