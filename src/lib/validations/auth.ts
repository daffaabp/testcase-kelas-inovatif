import * as z from 'zod'

// Base password validation
const passwordValidation = z.string()
    .min(8, 'Password minimal 8 karakter')

// Register schema
export const registerSchema = z.object({
    fullName: z.string()
        .min(3, 'Nama lengkap minimal 3 karakter')
        .max(50, 'Nama lengkap maksimal 50 karakter')
        .regex(/^[a-zA-Z\s]*$/, 'Nama hanya boleh mengandung huruf dan spasi'),
    email: z.string()
        .min(1, 'Email harus diisi')
        .email('Format email tidak valid'),
    password: passwordValidation,
    confirmPassword: z.string()
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password tidak cocok",
            path: ["confirmPassword"]
        });
    }
})

// Login schema
export const loginSchema = z.object({
    email: z.string()
        .min(1, 'Email harus diisi')
        .email('Format email tidak valid'),
    password: z.string()
        .min(1, 'Password harus diisi')
})

// Reset password schema
export const resetPasswordSchema = z.object({
    currentPassword: z.string().min(1, "Password lama harus diisi"),
    password: z.string()
        .min(8, "Password minimal 8 karakter")
        .regex(/[a-z]/, "Password harus mengandung huruf kecil")
        .regex(/[A-Z]/, "Password harus mengandung huruf besar")
        .regex(/\d/, "Password harus mengandung angka")
        .regex(/[!@#$%^&*]/, "Password harus mengandung karakter spesial (!@#$%^&*)"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"]
})

// Forgot password schema
export const forgotPasswordSchema = z.object({
    email: z.string()
        .min(1, 'Email harus diisi')
        .email('Format email tidak valid')
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema> 