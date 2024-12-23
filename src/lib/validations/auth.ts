import * as z from 'zod'

// Validasi untuk password
const passwordValidation = z.string()
    .min(8, 'Password minimal 8 karakter')
    .regex(/^(?=.*[a-z])/, 'Password harus mengandung huruf kecil')
    .regex(/^(?=.*[A-Z])/, 'Password harus mengandung huruf besar')
    .regex(/^(?=.*\d)/, 'Password harus mengandung angka')
    .regex(/^(?=.*[!@#$%^&*])/, 'Password harus mengandung karakter spesial (!@#$%^&*)')

// Schema untuk reset password
export const resetPasswordSchema = z.object({
    currentPassword: z.string()
        .min(1, 'Password lama harus diisi'),
    password: passwordValidation,
    confirmPassword: z.string()
}).superRefine((data, ctx) => {
    // Validasi password tidak boleh sama dengan password lama
    if (data.currentPassword === data.password) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password baru tidak boleh sama dengan password lama",
            path: ["password"]
        });
    }
    
    // Validasi konfirmasi password
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password baru tidak cocok dengan konfirmasi password",
            path: ["confirmPassword"]
        });
    }
})

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema> 