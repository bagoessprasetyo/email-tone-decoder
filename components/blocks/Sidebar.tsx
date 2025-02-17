// "use client"
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut, Mail, Settings, User, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import router from "next/router";

export function Sidebar() {
  const { data: session } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed");
    if (savedState) setIsCollapsed(JSON.parse(savedState));
  }, []);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(newState));
  };

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: true });
    //   router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (!session) return null;

  return (
    <Card className={`h-screen ${isCollapsed ? 'w-16' : 'w-64'} p-4 flex flex-col gap-4 border-r relative transition-all duration-300`}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-6 w-6 h-6 rounded-full border shadow-sm"
        onClick={toggleSidebar}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </Button>

      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 p-2'}`}>
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <User className="w-6 h-6 text-primary" />
        </div>
        {!isCollapsed && (
          <div className="flex flex-col">
            <span className="font-medium">{session.user?.name}</span>
            {/* <span className="text-sm text-muted-foreground">{session.user?.email}</span> */}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Link href="/compose" className="w-full">
          <Button variant="ghost" className={`w-full ${isCollapsed ? 'justify-center px-2' : 'justify-start gap-2'}`}>
            <Mail className="w-4 h-4" />
            {!isCollapsed && "Compose"}
          </Button>
        </Link>
      </div>

      <div className="mt-auto">
        <Button
          variant="ghost"
          className={`w-full ${isCollapsed ? 'justify-center px-2' : 'justify-start gap-2'} text-red-500 hover:text-red-600 hover:bg-red-50`}
          onClick={handleSignOut}
        >
          <LogOut className="w-4 h-4" />
          {!isCollapsed && "Sign Out"}
        </Button>
      </div>
    </Card>
  );
}