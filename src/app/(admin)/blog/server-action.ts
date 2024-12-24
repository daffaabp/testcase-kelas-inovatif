'use server'

import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'
import { createBlogSchema, updateBlogSchema } from './validation'

export async function createBlog(formData: FormData) {
  try {
    const title = formData.get('title') as string
    const content = formData.get('content') as string 
    const imageUrl = formData.get('image_url') as string
    const authorId = formData.get('author_id') as string
    const published = formData.get('published') === 'true'

    const validatedData = createBlogSchema.parse({
      title,
      content,
      image_url: imageUrl,
      author_id: authorId,
      published
    })

    const { error } = await supabase
      .from('blogs')
      .insert(validatedData)

    if (error) throw error

    revalidatePath('/dashboard/blogs')
    return { success: true }

  } catch (error) {
    return { error: 'Gagal membuat blog' }
  }
}

export async function updateBlog(id: string, formData: FormData) {
  try {
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const imageUrl = formData.get('image_url') as string
    const published = formData.get('published') === 'true'

    const validatedData = updateBlogSchema.parse({
      title,
      content, 
      image_url: imageUrl,
      published
    })

    const { error } = await supabase
      .from('blogs')
      .update(validatedData)
      .eq('id', id)

    if (error) throw error

    revalidatePath('/dashboard/blogs')
    return { success: true }

  } catch (error) {
    return { error: 'Gagal mengupdate blog' }
  }
}

export async function deleteBlog(id: string) {
  try {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id)

    if (error) throw error

    revalidatePath('/dashboard/blogs')
    return { success: true }

  } catch (error) {
    return { error: 'Gagal menghapus blog' }
  }
}

export async function getBlog(id: string) {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    return { data }

  } catch (error) {
    return { error: 'Gagal mendapatkan blog' }
  }
}

export async function getBlogs() {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return { data }

  } catch (error) {
    return { error: 'Gagal mendapatkan daftar blog' }
  }
}
