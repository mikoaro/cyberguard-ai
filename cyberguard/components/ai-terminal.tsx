"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TerminalIcon, Send, User, Bot, SendHorizonal } from "lucide-react";
import { Textarea } from "./ui/textarea";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export function AITerminal() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello, I'm your AI Security Assistant. How can I help you today?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I've analyzed your network traffic and detected unusual patterns from IP 192.168.1.45. Would you like me to isolate this device?",
        "Based on the log analysis, this appears to be a potential phishing attempt. I've blocked the source and updated our threat database.",
        "I've completed a security scan of your infrastructure. All systems are secure, but I recommend updating your firewall rules.",
        "The suspicious activity has been contained. I've isolated the affected system and am running a deep scan to identify the root cause.",
        "I've detected and blocked a potential brute force attack on your authentication system. The source IP has been added to our blocklist.",
      ];

      const aiMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <Card className="max-h-[calc(100vh-22rem)] min-h-[calc(100vh-22rem)]">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <TerminalIcon className="h-5 w-5 text-primary" />
          <CardTitle>AI Security Terminal</CardTitle>
        </div>
        <CardDescription>
          Interact with your AI security assistant for real-time threat analysis
          and response
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col h-[calc(100%-5rem)] overflow-y-auto pb-20">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${
                    message.role === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  <div
                    className={`flex items-center justify-center h-8 w-8 rounded-full ${
                      message.role === "user" ? "bg-primary" : "bg-secondary"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="h-5 w-5 text-primary-foreground" />
                    ) : (
                      <Bot className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <div
                      className={`p-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {message.content}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-[80%]">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="p-3 rounded-lg bg-muted">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="h-2 w-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="h-2 w-2 bg-current rounded-full animate-bounce"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <form onSubmit={handleSendMessage} className="flex space-x-2 fixed bottom-12 lg:bottom-34 right-0 left-64 container mx-auto w-318 p-2 rounded-b-lg bg-white">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your security query or command..."
            disabled={isProcessing}
            className="flex-1 h-20"
          />
           <div className="absolute right-10 bottom-5 flex gap-3">
                <Button className="size-sm" type="submit" size="icon" disabled={isProcessing && !input}>
                  <SendHorizonal className="h-4 w-4" />
                </Button>
              </div>
        </form>
      </CardContent>
    </Card>
  );
}
