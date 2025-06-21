
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Users, GitPullRequest, Bug, Star, Plus } from 'lucide-react';

interface Contributor {
  id: string;
  name: string;
  username: string;
  avatar: string;
  contributions: number;
  issues: number;
  pullRequests: number;
  classification: 'core' | 'regular' | 'newcomer' | 'maintainer';
}

interface ContributorDashboardProps {
  repoUrl: string;
}

export const ContributorDashboard: React.FC<ContributorDashboardProps> = ({ repoUrl }) => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContributors = async () => {
      setIsLoading(true);
      
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockContributors: Contributor[] = [
        {
          id: '1',
          name: 'Alex Johnson',
          username: 'alexj',
          avatar: '/placeholder.svg',
          contributions: 156,
          issues: 23,
          pullRequests: 45,
          classification: 'maintainer'
        },
        {
          id: '2',
          name: 'Sarah Chen',
          username: 'sarah-dev',
          avatar: '/placeholder.svg',
          contributions: 89,
          issues: 12,
          pullRequests: 28,
          classification: 'core'
        },
        {
          id: '3',
          name: 'Mike Rodriguez',
          username: 'mike-r',
          avatar: '/placeholder.svg',
          contributions: 34,
          issues: 8,
          pullRequests: 15,
          classification: 'regular'
        },
        {
          id: '4',
          name: 'Emma Wilson',
          username: 'emmaw',
          avatar: '/placeholder.svg',
          contributions: 7,
          issues: 3,
          pullRequests: 2,
          classification: 'newcomer'
        }
      ];
      
      setContributors(mockContributors);
      setIsLoading(false);
    };

    fetchContributors();
  }, [repoUrl]);

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'maintainer': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'core': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'regular': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'newcomer': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Users className="h-6 w-6" />
          Contributors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-20 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Users className="h-6 w-6" />
          Contributors ({contributors.length})
        </h2>
        <Button size="sm" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Invite Contributor
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {contributors.map((contributor) => (
          <Card 
            key={contributor.id} 
            className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-primary/20"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={contributor.avatar} alt={contributor.name} />
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10">
                    {contributor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-sm font-medium truncate">
                    {contributor.name}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">@{contributor.username}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0 space-y-3">
              <Badge 
                variant="secondary" 
                className={`text-xs ${getClassificationColor(contributor.classification)}`}
              >
                {contributor.classification.charAt(0).toUpperCase() + contributor.classification.slice(1)}
              </Badge>
              
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="space-y-1">
                  <div className="flex items-center justify-center">
                    <Star className="h-3 w-3 text-yellow-500" />
                  </div>
                  <p className="text-xs font-medium">{contributor.contributions}</p>
                  <p className="text-xs text-muted-foreground">Commits</p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-center">
                    <Bug className="h-3 w-3 text-red-500" />
                  </div>
                  <p className="text-xs font-medium">{contributor.issues}</p>
                  <p className="text-xs text-muted-foreground">Issues</p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-center">
                    <GitPullRequest className="h-3 w-3 text-green-500" />
                  </div>
                  <p className="text-xs font-medium">{contributor.pullRequests}</p>
                  <p className="text-xs text-muted-foreground">PRs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
