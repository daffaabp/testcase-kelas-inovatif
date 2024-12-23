'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, FileText, Users, Settings, LogOut } from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const menuItems = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard
    },
    {
        title: 'Documents',
        href: '/dashboard/documents',
        icon: FileText
    },
    {
        title: 'Team',
        href: '/dashboard/team',
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
    const supabase = createClientComponentClient()

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
        <div className="flex h-full w-72 flex-col border-r bg-white">
            <div className="p-6 border-b">
                <h1 className="text-xl font-semibold text-blue-600">Typeset</h1>
            </div>

            <div className="flex-1 px-4 py-6">
                <nav className="space-y-1">
                    {menuItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <Button
                                variant="ghost"
                                className={cn(
                                    'w-full justify-start h-11 px-4',
                                    pathname === item.href
                                        ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                                        : 'text-gray-600 hover:bg-gray-50'
                                )}
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.title}
                            </Button>
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="p-4 border-t">
                <Button
                    variant="ghost"
                    className="w-full justify-start h-11 text-gray-600 hover:bg-gray-50"
                    onClick={handleSignOut}
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Sign Out
                </Button>
            </div>
        </div>
    )
} 