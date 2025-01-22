import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { DashboardSidebar } from "./DashboardSidebar";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cyber-dark/80 backdrop-blur-sm border-b border-cyber-blue/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">
            <span className="text-cyber-blue">Thread</span>
            <span className="text-cyber-purple">Genius</span>
          </h1>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0 bg-cyber-dark border-cyber-blue/20">
            <DashboardSidebar />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};