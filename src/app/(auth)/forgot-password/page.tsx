'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
import { createClientComponentClient } from '@supabase/ssr'
import { Loader2, ArrowLeft, Mail, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { forgotPasswordSchema } from '@/lib/validations/auth'
import * as z from 'zod'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const router = useRouter()
    const supabase = createClientComponentClient()

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            // Validasi email menggunakan Zod
            const validatedData = forgotPasswordSchema.parse({ email })

            const { error: resetError } = await supabase.auth.resetPasswordForEmail(
                validatedData.email,
                {
                    redirectTo: `${window.location.origin}/reset-password`,
                }
            )

            if (resetError) throw resetError

            setSuccess(true)
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

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-[400px]">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <CardTitle className="text-2xl">Periksa email Anda</CardTitle>
                            </div>
                            <CardDescription>
                                Kami telah mengirim link reset password ke email Anda
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2 p-4 bg-blue-50 text-blue-700 rounded-lg">
                                <Mail className="h-5 w-5" />
                                <p>{email}</p>
                            </div>
                            <p className="text-sm text-gray-600">
                                Klik link di email untuk mereset password Anda. Link akan kadaluarsa dalam 1 jam.
                                Jika Anda tidak melihat email, periksa folder spam.
                            </p>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => router.push('/login')}
                            >
                                Kembali ke login
                            </Button>
                            <p className="text-sm text-gray-600 text-center">
                                Tidak menerima email?{' '}
                                <button
                                    onClick={() => setSuccess(false)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Coba lagi
                                </button>
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-[400px]">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Lupa password?</CardTitle>
                        <CardDescription>
                            Masukkan email Anda dan kami akan mengirimkan link untuk reset password
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleResetPassword}>
                            <div className="flex flex-col gap-6">
                                {error && (
                                    <Alert variant="destructive">
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Alamat Email</Label>
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
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Mengirim link reset...
                                        </>
                                    ) : (
                                        'Kirim link reset'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button
                            variant="ghost"
                            className="w-full gap-2"
                            onClick={() => router.push('/login')}
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Kembali ke login
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
} 