'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, Filter, FileText } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useState } from "react"

const suggestedQueries = [
    "Machine Learning in Healthcare",
    "Renewable Energy Technologies",
    "Climate Change Mitigation",
    "Artificial Intelligence Ethics",
    "Sustainable Development Goals"
]

const sources = [
    { name: "Science Direct", papers: "10M+" },
    { name: "IEEE Xplore", papers: "5M+" },
    { name: "Springer", papers: "8M+" },
    { name: "PubMed", papers: "15M+" },
    { name: "arXiv", papers: "2M+" }
]

export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState("")

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        // Implementasi pencarian
        console.log("Searching for:", searchQuery)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4">
            <div className="max-w-4xl w-full space-y-12 text-center">
                {/* Hero Section */}
                <div className="space-y-4">
                    <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        Access Millions of Research Papers
                    </h1>
                    <p className="text-xl text-gray-600">
                        Search and download from <span className="text-blue-600 font-semibold">40M+</span> peer-reviewed journals, articles, and research papers
                    </p>
                </div>

                {/* Search Section */}
                <Card className="p-6 shadow-lg border-none bg-white/50 backdrop-blur-sm">
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="relative max-w-2xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search papers, journals, or research topics..."
                                    className="w-full pl-10 pr-20 h-12 bg-white/70 border-gray-200 focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                                <Button
                                    type="submit"
                                    className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9"
                                >
                                    Search
                                </Button>
                            </div>
                        </div>

                        {/* Advanced Search Options */}
                        <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                            <Button variant="ghost" size="sm" className="gap-2">
                                <Filter className="h-4 w-4" />
                                Advanced Filters
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-2">
                                <BookOpen className="h-4 w-4" />
                                Journal Directory
                            </Button>
                        </div>
                    </form>

                    {/* Suggested Queries */}
                    <div className="mt-6 space-y-4">
                        <p className="text-sm font-medium text-gray-600">
                            Popular Research Topics:
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {suggestedQueries.map((query, index) => (
                                <Button
                                    key={index}
                                    variant="outline"
                                    onClick={() => setSearchQuery(query)}
                                    className="text-sm bg-white/70 hover:bg-blue-50 border-gray-200"
                                >
                                    <Search className="mr-2 h-4 w-4" />
                                    {query}
                                </Button>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Sources Grid */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Trusted Sources</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {sources.map((source, index) => (
                            <Card
                                key={index}
                                className="p-4 border-none shadow-md bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all"
                            >
                                <div className="text-center">
                                    <FileText className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                                    <h3 className="font-medium text-gray-900">{source.name}</h3>
                                    <p className="text-sm text-gray-600">{source.papers} papers</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            title: "Comprehensive Search",
                            description: "Access papers from multiple trusted sources in one place"
                        },
                        {
                            title: "Full-Text Download",
                            description: "Download complete papers with institutional access"
                        },
                        {
                            title: "Citation Tools",
                            description: "Export citations in multiple formats"
                        }
                    ].map((feature, index) => (
                        <Card
                            key={index}
                            className="p-6 border-none shadow-md bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all"
                        >
                            <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                            <p className="text-sm text-gray-600 mt-2">{feature.description}</p>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Background Decoration */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>
        </div>
    )
} 