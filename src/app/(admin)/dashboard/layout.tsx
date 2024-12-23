import Sidebar from '@/components/dashboard/sidebar'
import Navbar from '@/components/dashboard/navbar'
import { SidebarProvider } from '@/context/sidebar-context'

export default function DashboardLayout({
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