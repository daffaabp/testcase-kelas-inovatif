import * as z from 'zod'

export const registerSchema = z.object({
    fullName: z.string()
        .min(3, 'Nama lengkap minimal 3 karakter')
        .max(50, 'Nama lengkap maksimal 50 karakter'),
    email: z.string()
        .email('Email tidak valid'),
    password: z.string()
        .min(8, 'Password minimal 8 karakter')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password harus mengandung huruf besar, huruf kecil, dan angka'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
})

export type RegisterInput = z.infer<typeof registerSchema> 