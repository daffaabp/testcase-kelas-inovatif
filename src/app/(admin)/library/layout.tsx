import FolderSidebar from "@/components/library/folder-sidebar"

export default function LibraryLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-full">
            <FolderSidebar />
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
} 