
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { RepoInput } from '@/components/RepoInput';
import { ContributorDashboard } from '@/components/ContributorDashboard';
import { ScrumBoard } from '@/components/ScrumBoard';
import { ThemeProvider } from '@/components/ThemeProvider';

const Index = () => {
  const [selectedRepo, setSelectedRepo] = useState<string>('');
  
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 transition-colors duration-300">
        <Header />
        <main className="container mx-auto px-4 py-8 space-y-8">
          <div className="animate-fade-in">
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Open Source Manager
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Modern contribution management with Agile/Scrum integration. 
                Streamline your open-source workflow.
              </p>
            </div>
            
            <RepoInput onRepoSelect={setSelectedRepo} />
          </div>
          
          {selectedRepo && (
            <div className="animate-fade-in space-y-8">
              <ContributorDashboard repoUrl={selectedRepo} />
              <ScrumBoard repoUrl={selectedRepo} />
            </div>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;
