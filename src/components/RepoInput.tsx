
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Github } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RepoInputProps {
  onRepoSelect: (repoUrl: string) => void;
}

export const RepoInput: React.FC<RepoInputProps> = ({ onRepoSelect }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateGitHubUrl = (url: string): boolean => {
    const githubUrlPattern = /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/?$/;
    return githubUrlPattern.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!repoUrl.trim()) {
      toast({
        title: "Repository URL Required",
        description: "Please enter a GitHub repository URL",
        variant: "destructive",
      });
      return;
    }

    if (!validateGitHubUrl(repoUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid GitHub repository URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onRepoSelect(repoUrl);
      
      toast({
        title: "Repository Connected!",
        description: "Successfully fetched repository data and contributors",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Unable to fetch repository data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <Github className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-semibold mb-2">Connect Repository</h2>
          <p className="text-muted-foreground">
            Paste a GitHub repository URL to automatically fetch contributors and start managing
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Input
              type="url"
              placeholder="https://github.com/username/repository"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="pr-10 h-12 text-base"
              disabled={isLoading}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          
          <Button
            type="submit"
            size="lg"
            disabled={isLoading}
            className="h-12 px-8 hover:scale-105 transition-transform duration-200"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                <span>Fetching...</span>
              </div>
            ) : (
              'Fetch Repository'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
