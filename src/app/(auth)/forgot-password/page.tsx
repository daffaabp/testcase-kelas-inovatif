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
import { Loader2, ArrowLeft, Mail, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const router = useRouter()
    const supabase = createClientComponentClient()

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            })

            if (error) throw error

            setSuccess(true)
        } catch (err: any) {
            setError(err.message)
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
                                <CardTitle className="text-2xl">Check your email</CardTitle>
                            </div>
                            <CardDescription>
                                We've sent a password reset link to your email
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2 p-4 bg-blue-50 text-blue-700 rounded-lg">
                                <Mail className="h-5 w-5" />
                                <p>{email}</p>
                            </div>
                            <p className="text-sm text-gray-600">
                                Click the link in the email to reset your password. The link will expire in 1 hour.
                                If you don't see the email, check your spam folder.
                            </p>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => router.push('/login')}
                            >
                                Back to login
                            </Button>
                            <p className="text-sm text-gray-600 text-center">
                                Didn't receive the email?{' '}
                                <button
                                    onClick={() => setSuccess(false)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Try again
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
                        <CardTitle className="text-2xl">Forgot password?</CardTitle>
                        <CardDescription>
                            Enter your email address and we'll send you a link to reset your password
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
                                    <Label htmlFor="email">Email address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Sending reset link...
                                        </>
                                    ) : (
                                        'Send reset link'
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
                            Back to login
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
} 