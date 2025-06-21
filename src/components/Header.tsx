
import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Github } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">OS</span>
          </div>
          <span className="font-semibold text-lg">Open Source Manager</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hover:scale-105 transition-transform duration-200"
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200"
          >
            <Github className="h-4 w-4" />
            <span>Connect GitHub</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
