import { z } from "zod"

export const blogSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(10, "Judul harus diisi").max(255, "Judul terlalu panjang"),
  content: z.string().min(100, "Konten harus diisi"),
  image_url: z.string().url("URL gambar tidak valid"),
  author_id: z.string().uuid("ID penulis tidak valid"),
  created_at: z.date(),
  updated_at: z.date(),
  published: z.boolean()
})

export type Blog = z.infer<typeof blogSchema>

export const createBlogSchema = blogSchema.omit({ 
  id: true,
  created_at: true,
  updated_at: true 
})

export const updateBlogSchema = blogSchema.omit({
  id: true,
  author_id: true,
  created_at: true,
  updated_at: true
})

export type CreateBlog = z.infer<typeof createBlogSchema>
export type UpdateBlog = z.infer<typeof updateBlogSchema>

