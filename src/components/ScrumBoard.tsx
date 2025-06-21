
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Clock, AlertCircle, CheckCircle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee?: {
    name: string;
    avatar: string;
  };
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'review' | 'done';
  labels: string[];
}

interface ScrumBoardProps {
  repoUrl: string;
}

const columns = [
  { id: 'todo', title: 'To Do', icon: Clock, color: 'text-gray-500' },
  { id: 'in-progress', title: 'In Progress', icon: AlertCircle, color: 'text-blue-500' },
  { id: 'review', title: 'Review', icon: AlertCircle, color: 'text-orange-500' },
  { id: 'done', title: 'Done', icon: CheckCircle, color: 'text-green-500' },
];

export const ScrumBoard: React.FC<ScrumBoardProps> = ({ repoUrl }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'Implement user authentication',
          description: 'Add OAuth integration with GitHub',
          assignee: { name: 'Alex Johnson', avatar: '/placeholder.svg' },
          priority: 'high',
          status: 'in-progress',
          labels: ['feature', 'auth']
        },
        {
          id: '2',
          title: 'Fix responsive layout issues',
          description: 'Mobile breakpoints need adjustment',
          assignee: { name: 'Sarah Chen', avatar: '/placeholder.svg' },
          priority: 'medium',
          status: 'todo',
          labels: ['bug', 'ui']
        },
        {
          id: '3',
          title: 'Add dark mode support',
          description: 'Implement theme switching functionality',
          priority: 'low',
          status: 'review',
          labels: ['enhancement', 'ui']
        },
        {
          id: '4',
          title: 'Setup CI/CD pipeline',
          description: 'Configure GitHub Actions for deployment',
          assignee: { name: 'Mike Rodriguez', avatar: '/placeholder.svg' },
          priority: 'high',
          status: 'done',
          labels: ['devops']
        },
      ];
      
      setTasks(mockTasks);
      setIsLoading(false);
    };

    fetchTasks();
  }, [repoUrl]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Scrum Board</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((column) => (
            <Card key={column.id} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="h-20 bg-muted rounded"></div>
                  ))}
                </div>
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
        <h2 className="text-2xl font-bold">Scrum Board</h2>
        <Button size="sm" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Task
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((column) => {
          const columnTasks = getTasksByStatus(column.id);
          const Icon = column.icon;
          
          return (
            <Card key={column.id} className="h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <Icon className={`h-4 w-4 ${column.color}`} />
                  {column.title}
                  <Badge variant="secondary" className="ml-auto">
                    {columnTasks.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {columnTasks.map((task) => (
                  <Card 
                    key={task.id}
                    className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] border border-border/50"
                  >
                    <CardContent className="p-3 space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-medium text-sm leading-tight">{task.title}</h4>
                          <Badge 
                            variant="secondary"
                            className={`text-xs ${getPriorityColor(task.priority)}`}
                          >
                            {task.priority}
                          </Badge>
                        </div>
                        
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {task.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {task.labels.map((label) => (
                          <Badge 
                            key={label}
                            variant="outline"
                            className="text-xs px-1.5 py-0.5"
                          >
                            {label}
                          </Badge>
                        ))}
                      </div>
                      
                      {task.assignee && (
                        <div className="flex items-center gap-2 pt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                            <AvatarFallback className="text-xs bg-gradient-to-br from-primary/20 to-primary/10">
                              {task.assignee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground truncate">
                            {task.assignee.name}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                
                <Button 
                  variant="ghost" 
                  className="w-full h-8 text-xs border-2 border-dashed border-muted-foreground/25 hover:border-primary/25 hover:bg-primary/5"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Task
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
