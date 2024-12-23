'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { FileText, Upload, Import } from "lucide-react"
import { useState } from "react"

export default function LibraryPage() {
    const [selectedFolder, setSelectedFolder] = useState("all")

    return (
        <div className="h-full p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">Library</h1>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2">
                        <Import className="h-4 w-4" />
                        Import from Zotero
                    </Button>
                    <Button className="gap-2">
                        <Upload className="h-4 w-4" />
                        Upload PDFs
                    </Button>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Select value={selectedFolder} onValueChange={setSelectedFolder}>
                        <SelectTrigger className="w-[140px] border-r-0 rounded-r-none">
                            <SelectValue placeholder="All folders" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All folders</SelectItem>
                            <SelectItem value="jurnal">Jurnal</SelectItem>
                            <SelectItem value="referensi">Referensi Saya</SelectItem>
                            <SelectItem value="notebooks">Notebooks</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input
                        placeholder="Search or ask a question..."
                        className="pl-[150px] h-10"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Select defaultValue="en">
                        <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="id">Indonesia</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">Chat</Button>
                    <Button variant="outline">New notebook</Button>
                </div>
            </div>

            {/* Files Section */}
            <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            Add columns (1)
                        </Button>
                        <div className="h-4 w-px bg-gray-200" />
                        <span className="text-sm text-gray-500">High Quality</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                            Sort by
                        </Button>
                        <Button variant="ghost" size="sm">
                            Export
                        </Button>
                    </div>
                </div>

                {/* Files List */}
                <div className="space-y-4">
                    <div className="grid grid-cols-[auto,1fr] gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="flex items-start gap-3">
                            <input type="checkbox" className="mt-1" />
                            <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">
                                An Artificial Intelligence Energy Management System
                            </h3>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                <span>R. Pretorius +1 more</span>
                                <span>27 Jan 2021</span>
                                <span>Last viewed 3 days ago</span>
                            </div>
                            <div className="flex items-center gap-4 mt-3">
                                <Button variant="ghost" size="sm">Summary</Button>
                                <Button variant="ghost" size="sm">Podcast</Button>
                                <Button variant="ghost" size="sm">Chat</Button>
                            </div>
                        </div>
                    </div>
                    {/* Add more file items here */}
                </div>
            </Card>
        </div>
    )
} 