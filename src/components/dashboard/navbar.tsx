'use client'

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, Bell, Search } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { SidebarContext } from "@/context/sidebar-context"
import { createClientComponentClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import Image from 'next/image'

interface UserProfile {
    email?: string;
    full_name?: string;
    avatar_url?: string;
    display_name?: string;
}

export default function Navbar() {
    const { toggleSidebar } = useContext(SidebarContext)
    const router = useRouter()
    const supabase = createClientComponentClient()
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser()

                if (user) {
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', user.id)
                        .single()

                    // Mengatur display name berdasarkan prioritas
                    const displayName = profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0]

                    setUserProfile({
                        email: user.email,
                        full_name: profile?.full_name || user.user_metadata?.full_name,
                        avatar_url: profile?.avatar_url,
                        display_name: displayName
                    })
                }
            } catch (error) {
                console.error('Error fetching user profile:', error)
            }
        }

        fetchUserProfile()
    }, [supabase])

    const handleSignOut = async () => {
        try {
            await supabase.auth.signOut()
            router.push('/login')
            router.refresh()
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    const getInitials = () => {
        if (userProfile?.display_name) {
            return userProfile.display_name
                .split(' ')
                .map(name => name[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)
        }
        return 'U'
    }

    return (
        <div className="h-16 border-b bg-white px-4 flex items-center justify-between">
            <div className="flex items-center flex-1 gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    className="lg:hidden"
                >
                    <Menu className="h-5 w-5" />
                </Button>

                <div className="hidden md:flex items-center flex-1 max-w-xl relative">
                    <Search className="absolute left-3 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search..."
                        className="pl-10 bg-gray-50 border-none focus-visible:ring-1 focus-visible:ring-gray-200"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                >
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="gap-2">
                            {userProfile?.avatar_url ? (
                                <Image
                                    src={userProfile.avatar_url}
                                    alt={userProfile.display_name || 'Profile'}
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                />
                            ) : (
                                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                                    <span className="text-sm font-medium text-white">
                                        {getInitials()}
                                    </span>
                                </div>
                            )}
                            <div className="hidden md:block text-left">
                                <p className="text-sm font-medium line-clamp-1">
                                    {userProfile?.display_name}
                                </p>
                                <p className="text-xs text-gray-500 line-clamp-1">
                                    {userProfile?.email}
                                </p>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium">{userProfile?.display_name}</p>
                                <p className="text-xs font-normal text-gray-500">{userProfile?.email}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuItem>
                            Profile Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Team
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Billing
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={handleSignOut}
                            className="text-red-600 focus:text-red-600"
                        >
                            Sign out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}