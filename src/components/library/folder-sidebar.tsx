'use client'

import { Button } from "@/components/ui/button"
import { Folder, Plus } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const folders = [
    {
        name: "All files",
        href: "/library",
        icon: Folder
    },
    {
        name: "Jurnal",
        href: "/library/jurnal",
        icon: Folder
    },
    {
        name: "Referensi Saya",
        href: "/library/referensi",
        icon: Folder
    },
    {
        name: "Notebooks",
        href: "/library/notebooks",
        icon: Folder
    }
]

export default function FolderSidebar() {
    const pathname = usePathname()

    return (
        <div className="w-64 border-r bg-gray-50/50 p-4">
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-gray-900">Folders</h2>
                <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4" />
                    New
                </Button>
            </div>
            <nav className="space-y-1">
                {folders.map((folder) => (
                    <Link key={folder.href} href={folder.href}>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start",
                                pathname === folder.href && "bg-gray-100"
                            )}
                        >
                            <folder.icon className="mr-2 h-4 w-4" />
                            {folder.name}
                        </Button>
                    </Link>
                ))}
            </nav>
        </div>
    )
} 