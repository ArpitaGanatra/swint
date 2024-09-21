"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppKitAccount } from "@reown/appkit/react";
import { useEffect, useState } from "react";
import { getStructuredResponse } from "@/utils/phalaRes";

type Message = {
  _id: string;
  text: string;
  sender: "user" | "ai";
  walletAddress: string;
};

export default function Home() {
  const { address: walletAddress, isConnected } = useAppKitAccount();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    if (isConnected && walletAddress) {
      fetchMessages();
    }
  }, [walletAddress, isConnected]);

  const fetchMessages = async () => {
    const res = await fetch(`/api/messages?walletAddress=${walletAddress}`);
    const data = await res.json();
    setMessages(data);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() && walletAddress) {
      const userMessage = { text: inputMessage, sender: "user", walletAddress };
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userMessage),
      });
      setInputMessage("");

      setTimeout(async () => {
        const aiText = await getStructuredResponse(inputMessage);
        console.log("aiText", aiText);
        const aiMessage = {
          text: aiText,
          sender: "ai",
          walletAddress,
        };
        await fetch("/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(aiMessage),
        });
        fetchMessages();
      }, 1000);

      fetchMessages();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F8F8F8]">
      {/* Main content */}
      <main className="flex-1 p-6 h-full">
        <ScrollArea className="h-full">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Receiver message */}
            {/* <div className="flex items-end space-x-2">
              <Avatar>
                <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc3fTjOEQnBpWJgs3Yh6BXd13yPjchG8nUNA&s" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm max-w-xs md:max-w-md text-[#333333]">
                <p className="text-sm">Hello! How can I assist you today?</p>
              </div>
            </div> */}
            {/* User message */}
            {/* <div className="flex items-end justify-end space-x-2">
              <div className="bg-[#007AFF] p-4 rounded-2xl rounded-br-none shadow-sm max-w-xs md:max-w-md text-white">
                <p className="text-sm">Hi! I have a question about coding.</p>
              </div>
              <Avatar>
                <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc3fTjOEQnBpWJgs3Yh6BXd13yPjchG8nUNA&s" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div> */}

            {Array.isArray(messages) &&
              messages.map((message) => (
                <div
                  key={message._id}
                  className={`flex items-end ${
                    message.sender === "user" ? "justify-end" : ""
                  } space-x-2`}
                >
                  {message.sender === "ai" && (
                    <Avatar>
                      <AvatarImage src="https://www.google.com/imgres?q=degentlemen&imgurl=https%3A%2F%2Fi.seadn.io%2Fs%2Fraw%2Ffiles%2Fb4177cd9eb7bfdf382e10b8231a8e77f.png%3Fauto%3Dformat%26dpr%3D1%26w%3D1000&imgrefurl=https%3A%2F%2Fopensea.io%2Fassets%2Fbase%2F0x93d9212fb2111b4619c48393a4cc2c9e1983edb3%2F5261&docid=-OmHATcmvRf02M&tbnid=s4EXVKfawInChM&vet=12ahUKEwjhwvS35tSIAxURTWcHHd24AR0QM3oECHkQAA..i&w=1000&h=1000&hcb=2&ved=2ahUKEwjhwvS35tSIAxURTWcHHd24AR0QM3oECHkQAA" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`p-4 rounded-2xl shadow-sm max-w-xs md:max-w-md ${
                      message.sender === "user"
                        ? "bg-[#007AFF] text-white rounded-br-none"
                        : "bg-white text-[#333333] rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    {message.sender === "ai" && <Button>Sign & confirm</Button>}
                  </div>
                  {message?.sender === "user" && (
                    <Avatar>
                      <AvatarImage src="https://www.google.com/imgres?q=degentlemen&imgurl=https%3A%2F%2Fi.seadn.io%2Fs%2Fraw%2Ffiles%2Fb4177cd9eb7bfdf382e10b8231a8e77f.png%3Fauto%3Dformat%26dpr%3D1%26w%3D1000&imgrefurl=https%3A%2F%2Fopensea.io%2Fassets%2Fbase%2F0x93d9212fb2111b4619c48393a4cc2c9e1983edb3%2F5261&docid=-OmHATcmvRf02M&tbnid=s4EXVKfawInChM&vet=12ahUKEwjhwvS35tSIAxURTWcHHd24AR0QM3oECHkQAA..i&w=1000&h=1000&hcb=2&ved=2ahUKEwjhwvS35tSIAxURTWcHHd24AR0QM3oECHkQAA" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            {/* Add more message components as needed */}
          </div>
        </ScrollArea>
      </main>

      {/* Input area */}
      <footer className="p-6">
        <div className="max-w-3xl mx-auto relative">
          <Input
            type="text"
            placeholder="Type your message..."
            className="w-full rounded-full bg-white border-none text-sm h-12 pr-12 text-black"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <Button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-transparent shadow-none hover:bg-transparent p-2"
            onClick={handleSendMessage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#007AFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </Button>
        </div>
      </footer>
    </div>
  );
}
