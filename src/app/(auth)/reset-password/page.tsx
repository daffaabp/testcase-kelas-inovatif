'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { createClientComponentClient } from '@supabase/ssr'
import { Loader2, AlertCircle, Check } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { resetPasswordSchema, type ResetPasswordInput } from '@/lib/validations/auth'
import * as z from "zod"

export default function ResetPassword() {
    const [formData, setFormData] = useState<ResetPasswordInput>({
        currentPassword: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const router = useRouter()
    const supabase = createClientComponentClient()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const validatePasswordStrength = (password: string) => {
        const checks = [
            { regex: /.{8,}/, text: 'Minimal 8 karakter' },
            { regex: /[a-z]/, text: 'Mengandung huruf kecil' },
            { regex: /[A-Z]/, text: 'Mengandung huruf besar' },
            { regex: /\d/, text: 'Mengandung angka' },
            { regex: /[!@#$%^&*]/, text: 'Mengandung karakter spesial (!@#$%^&*)' }
        ]

        return checks.map(check => ({
            passed: check.regex.test(password),
            text: check.text
        }))
    }

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setMessage('')

        try {
            // Validasi form menggunakan Zod
            const validatedData = resetPasswordSchema.parse(formData)

            setLoading(true)

            // Verifikasi password lama
            const { data: { user } } = await supabase.auth.getUser()

            if (!user?.email) {
                throw new Error('Sesi tidak valid')
            }

            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: user.email,
                password: validatedData.currentPassword,
            })

            if (signInError) {
                throw new Error('Password lama tidak valid')
            }

            // Update password baru
            const { error: updateError } = await supabase.auth.updateUser({
                password: validatedData.password
            })

            if (updateError) throw updateError

            setMessage('Password berhasil diubah')

            // Redirect ke dashboard setelah 2 detik
            setTimeout(() => {
                router.push('/dashboard')
            }, 2000)

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

    const passwordChecks = validatePasswordStrength(formData.password)

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-[400px]">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Reset Password</CardTitle>
                        <CardDescription>
                            Masukkan password lama dan password baru Anda
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleResetPassword}>
                            <div className="flex flex-col gap-6">
                                {error && (
                                    <Alert variant="destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}
                                {message && (
                                    <Alert className="bg-green-50 text-green-600 border-green-200">
                                        <Check className="h-4 w-4" />
                                        <AlertDescription>{message}</AlertDescription>
                                    </Alert>
                                )}

                                {/* Password Fields */}
                                <div className="grid gap-2">
                                    <Label htmlFor="currentPassword">Password Lama</Label>
                                    <Input
                                        id="currentPassword"
                                        name="currentPassword"
                                        type="password"
                                        value={formData.currentPassword}
                                        onChange={handleInputChange}
                                        placeholder="Masukkan password lama"
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password Baru</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Masukkan password baru"
                                        required
                                        disabled={loading}
                                    />
                                    <ul className="text-sm text-gray-600 space-y-1 mt-2">
                                        {passwordChecks.map((check, index) => (
                                            <li
                                                key={index}
                                                className={`flex items-center gap-2 ${check.passed ? 'text-green-600' : ''
                                                    }`}
                                            >
                                                {check.passed ? (
                                                    <Check className="h-4 w-4" />
                                                ) : (
                                                    <span className="h-4 w-4">•</span>
                                                )}
                                                {check.text}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        placeholder="Konfirmasi password baru"
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Mengubah password...
                                        </>
                                    ) : (
                                        'Ubah Password'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
} 