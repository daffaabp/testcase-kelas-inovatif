'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Home,
    User2,
    MessageSquare,
    Pencil,
    ChevronLeft,
    BookOpen
} from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useContext } from 'react'
import { SidebarContext } from '@/context/sidebar-context'

const menuItems = [
    {
        title: 'Home',
        href: '/dashboard',
        icon: Home
    },
    {
        title: 'Blog',
        href: '/dashboard/blog',
        icon: MessageSquare,
        submenu: [
            {
                title: 'All Posts',
                href: '/dashboard/blog',
                icon: BookOpen
            },
            {
                title: 'Create Post',
                href: '/dashboard/blog/create-post',
                icon: Pencil
            }
        ]
    },
    {
        title: 'AI Writer',
        href: '/dashboard/writer',
        icon: Pencil
    },
]

export default function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClientComponentClient()
    const { isOpen, toggleSidebar } = useContext(SidebarContext)

    const handleSignOut = async () => {
        try {
            await supabase.auth.signOut()
            router.push('/login')
            router.refresh()
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    return (
        <div className={cn(
            "fixed inset-y-0 left-0 z-50 flex h-full flex-col bg-white transition-all duration-300 lg:relative",
            isOpen ? "w-72" : "w-[70px]"
        )}>
            <div className="flex h-16 items-center justify-between border-b px-4">
                <h1 className={cn(
                    "text-xl font-semibold text-blue-600 transition-all duration-300",
                    !isOpen && "opacity-0"
                )}>
                    Testing
                </h1>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    className="hidden lg:flex"
                >
                    <ChevronLeft className={cn(
                        "h-5 w-5 transition-all duration-300",
                        !isOpen && "rotate-180"
                    )} />
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                <nav className="space-y-1">
                    {menuItems.map((item) => (
                        <div key={item.href}>
                            <Link href={item.href}>
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        'w-full justify-start h-10 px-2',
                                        (pathname === item.href || pathname.startsWith(item.href + '/'))
                                            ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    )}
                                >
                                    <item.icon className="h-4 w-4 shrink-0" />
                                    {isOpen && <span className="ml-3">{item.title}</span>}
                                </Button>
                            </Link>
                            {isOpen && item.submenu && (
                                <div className="ml-4 mt-1 space-y-1">
                                    {item.submenu.map((subitem) => (
                                        <Link key={subitem.href} href={subitem.href}>
                                            <Button
                                                variant="ghost"
                                                className={cn(
                                                    'w-full justify-start h-9 px-2',
                                                    pathname === subitem.href
                                                        ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                                                        : 'text-gray-600 hover:bg-gray-50'
                                                )}
                                            >
                                                <subitem.icon className="h-4 w-4 shrink-0" />
                                                <span className="ml-3">{subitem.title}</span>
                                            </Button>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    )
} 