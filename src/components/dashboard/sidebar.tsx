'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Users, Settings, LogOut } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const menuItems = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard
    },
    {
        title: 'Users',
        href: '/dashboard/users',
        icon: Users
    },
    {
        title: 'Settings',
        href: '/dashboard/settings',
        icon: Settings
    }
]

export default function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }

    return (
        <div className="flex h-full w-64 flex-col border-r bg-muted/40">
            <div className="p-6">
                <h1 className="text-2xl font-bold">Admin Panel</h1>
            </div>

            <div className="flex-1 px-4">
                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <Button
                                variant="ghost"
                                className={cn(
                                    'w-full justify-start',
                                    pathname === item.href && 'bg-muted'
                                )}
                            >
                                <item.icon className="mr-2 h-4 w-4" />
                                {item.title}
                            </Button>
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="p-4">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100"
                    onClick={handleSignOut}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </div>
    )
} 