import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-[#F8F8F8]">
      {/* Header */}
      <header className="flex items-center p-6 bg-white">
        <div className="text-3xl font-bold text-[#333333]">Syntent</div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-6">
        <ScrollArea className="h-full">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Receiver message */}
            <div className="flex items-end space-x-2">
              <Avatar>
                <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc3fTjOEQnBpWJgs3Yh6BXd13yPjchG8nUNA&s" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm max-w-xs md:max-w-md text-[#333333]">
                <p className="text-sm">Hello! How can I assist you today?</p>
              </div>
            </div>
            {/* User message */}
            <div className="flex items-end justify-end space-x-2">
              <div className="bg-[#007AFF] p-4 rounded-2xl rounded-br-none shadow-sm max-w-xs md:max-w-md text-white">
                <p className="text-sm">Hi! I have a question about coding.</p>
              </div>
              <Avatar>
                <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc3fTjOEQnBpWJgs3Yh6BXd13yPjchG8nUNA&s" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
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
          />
          <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-transparent shadow-none hover:bg-transparent p-2">
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
