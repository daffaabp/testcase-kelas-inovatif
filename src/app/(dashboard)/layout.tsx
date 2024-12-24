import { SidebarProvider } from '@/context/sidebar-context'
import Sidebar from '@/components/dashboard/sidebar'
import Navbar from '@/components/dashboard/navbar'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
                <div className="flex-1">
                    <Navbar />
                    <main className="p-6">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
} 