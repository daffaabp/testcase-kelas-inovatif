'use client';

import { useChat } from 'ai/react';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        maxSteps: 5,
    });

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)]">
            <Card className="h-full">
                <CardHeader>
                    <CardTitle>AI Blog Assistant</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[calc(100vh-15rem)] pr-4">
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={cn(
                                        "flex gap-3 text-sm",
                                        message.role === 'user' ? 'justify-end' : 'justify-start'
                                    )}
                                >
                                    {message.role !== 'user' && (
                                        <Avatar>
                                            <AvatarFallback>AI</AvatarFallback>
                                            <AvatarImage src="/ai-avatar.png" />
                                        </Avatar>
                                    )}
                                    <div
                                        className={cn(
                                            "rounded-lg px-4 py-2 max-w-[80%]",
                                            message.role === 'user'
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-100 text-gray-900"
                                        )}
                                    >
                                        {message.toolInvocations ? (
                                            <pre className="whitespace-pre-wrap text-sm">
                                                {JSON.stringify(message.toolInvocations, null, 2)}
                                            </pre>
                                        ) : (
                                            <p className="whitespace-pre-wrap">{message.content}</p>
                                        )}
                                    </div>
                                    {message.role === 'user' && (
                                        <Avatar>
                                            <AvatarFallback>ME</AvatarFallback>
                                            <AvatarImage src="/user-avatar.png" />
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter>
                    <form onSubmit={handleSubmit} className="flex w-full gap-2">
                        <Input
                            placeholder="Tanyakan sesuatu tentang blog..."
                            value={input}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        />
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Thinking...' : 'Send'}
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
    );
}