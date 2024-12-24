'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterInput } from '@/lib/validations/auth'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, AlertCircle, CheckCircle2 } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import * as z from 'zod'

export default function Register() {
    const [error, setError] = useState<string | null>(null)
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [userEmail, setUserEmail] = useState<string>('')
    const router = useRouter()
    const supabase = createClientComponentClient()

    const form = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    const onSubmit = async (data: RegisterInput) => {
        try {
            setError(null)

            // Register user dengan Supabase
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        full_name: data.fullName,
                    },
                    emailRedirectTo: `${window.location.origin}/auth/callback`
                }
            })

            // Handle error registrasi
            if (authError) {
                if (authError.message.includes('User already registered')) {
                    throw new Error('Email sudah terdaftar. Silakan gunakan email lain.')
                }
                throw authError
            }

            // Jika registrasi berhasil
            if (authData.user) {
                // Simpan data ke profiles
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([
                        {
                            id: authData.user.id,
                            full_name: data.fullName,
                            email: data.email,
                        }
                    ])

                if (profileError) {
                    throw profileError
                }

                setUserEmail(data.email)
                setShowConfirmation(true)
            } else {
                throw new Error('Registrasi gagal. Silakan coba lagi.')
            }

        } catch (err) {
            if (err instanceof z.ZodError) {
                setError(err.errors[0].message)
            } else if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Terjadi kesalahan yang tidak diketahui')
            }
        }
    }

    const handleConfirmationClose = () => {
        setShowConfirmation(false)
        router.push('/login')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-[400px]">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Buat Akun</CardTitle>
                    <CardDescription>
                        Daftar untuk mulai menggunakan layanan kami
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {error && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nama Lengkap</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="nama@email.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Minimal 8 karakter" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Konfirmasi Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Ulangi password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Mendaftar...
                                    </>
                                ) : (
                                    'Daftar'
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <div className="text-sm text-muted-foreground text-center">
                        Sudah punya akun?{' '}
                        <Link href="/login" className="text-primary hover:underline">
                            Login
                        </Link>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                        Dengan mendaftar, Anda menyetujui Syarat & Ketentuan serta Kebijakan Privasi kami
                    </p>
                </CardFooter>
            </Card>

            {/* Email Confirmation Dialog */}
            <Dialog open={showConfirmation} onOpenChange={handleConfirmationClose}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            Registrasi Berhasil
                        </DialogTitle>
                        <DialogDescription className="space-y-4">
                            <div className="flex items-center gap-2 mt-4 p-4 bg-blue-50 text-blue-700 rounded-lg">
                                <Mail className="h-5 w-5" />
                                <p>Email konfirmasi telah dikirim ke:</p>
                            </div>
                            <p className="font-medium text-center">{userEmail}</p>
                            <div className="text-sm text-gray-600 space-y-2">
                                <p>Silakan cek inbox email Anda dan klik link konfirmasi untuk mengaktifkan akun.</p>
                                <p>Jika email tidak ditemukan, cek folder spam/junk.</p>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center mt-4">
                        <Button onClick={handleConfirmationClose}>
                            Lanjut ke Halaman Login
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}