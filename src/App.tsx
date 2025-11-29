import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { HomePage } from './components/home-page';
import { WalletPage } from './components/wallet-page';
import { PersonalManagementPage } from './components/personal-management-page';
import { InvestmentPage } from './components/investment-page';
import { AIAssistantPage } from './components/ai-assistant-page';
import { MapPage } from './components/map-page';
import { Home, Wallet, Target, TrendingUp, Bot, MapPin, DollarSign, Zap } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-background">
      {/* Premium Header */}
      <header className="glass-card-elevated border-b border-border sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="relative w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center neon-glow-strong shadow-lg">
              <DollarSign className="w-7 h-7 text-white" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 status-online rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient-primary tracking-tight">
                FIINORA
              </h1>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                <span className="text-xs text-muted-foreground tracking-widest font-semibold">SMART FINANCE AI</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl glass-card border border-primary/20 neon-glow">
                <div className="w-2 h-2 status-online rounded-full"></div>
                <span className="text-sm text-primary font-semibold">Markets Open</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl glass-card border border-green-500/20 success-glow">
                <Zap className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600 font-semibold">+$247 Today</span>
              </div>
            </div>
            <div className="relative w-11 h-11 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 rounded-2xl flex items-center justify-center border border-slate-200 shadow-lg card-hover-subtle">
              <span className="text-sm font-bold text-slate-700">JD</span>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 status-online rounded-full border-2 border-white"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-6xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="home" className="mt-0">
            <HomePage />
          </TabsContent>
          <TabsContent value="wallet" className="mt-0">
            <WalletPage />
          </TabsContent>
          <TabsContent value="personal" className="mt-0">
            <PersonalManagementPage />
          </TabsContent>
          <TabsContent value="investment" className="mt-0">
            <InvestmentPage />
          </TabsContent>
          <TabsContent value="ai" className="mt-0">
            <AIAssistantPage />
          </TabsContent>
          <TabsContent value="map" className="mt-0">
            <MapPage />
          </TabsContent>

          {/* Premium Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 glass-card-elevated border-t border-border backdrop-blur-md">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"></div>
            <div className="absolute inset-x-0 top-1 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"></div>
            <TabsList className="w-full h-22 grid grid-cols-6 bg-transparent p-4 gap-2">
              <TabsTrigger 
                value="home" 
                className="flex flex-col gap-1.5 h-full rounded-2xl transition-all duration-400 data-[state=active]:bg-gradient-to-t data-[state=active]:from-primary/15 data-[state=active]:to-primary/8 data-[state=active]:text-primary data-[state=active]:neon-glow data-[state=active]:border data-[state=active]:border-primary/30 hover:bg-primary/5 hover:scale-105 group"
              >
                <Home className="h-5 w-5 group-data-[state=active]:scale-110 transition-all duration-300" />
                <span className="text-xs font-semibold">Home</span>
              </TabsTrigger>
              <TabsTrigger 
                value="wallet"
                className="flex flex-col gap-1.5 h-full rounded-2xl transition-all duration-400 data-[state=active]:bg-gradient-to-t data-[state=active]:from-primary/15 data-[state=active]:to-primary/8 data-[state=active]:text-primary data-[state=active]:neon-glow data-[state=active]:border data-[state=active]:border-primary/30 hover:bg-primary/5 hover:scale-105 group"
              >
                <Wallet className="h-5 w-5 group-data-[state=active]:scale-110 transition-all duration-300" />
                <span className="text-xs font-semibold">Wallet</span>
              </TabsTrigger>
              <TabsTrigger 
                value="personal"
                className="flex flex-col gap-1.5 h-full rounded-2xl transition-all duration-400 data-[state=active]:bg-gradient-to-t data-[state=active]:from-primary/15 data-[state=active]:to-primary/8 data-[state=active]:text-primary data-[state=active]:neon-glow data-[state=active]:border data-[state=active]:border-primary/30 hover:bg-primary/5 hover:scale-105 group"
              >
                <Target className="h-5 w-5 group-data-[state=active]:scale-110 transition-all duration-300" />
                <span className="text-xs font-semibold">Manage</span>
              </TabsTrigger>
              <TabsTrigger 
                value="investment"
                className="flex flex-col gap-1.5 h-full rounded-2xl transition-all duration-400 data-[state=active]:bg-gradient-to-t data-[state=active]:from-primary/15 data-[state=active]:to-primary/8 data-[state=active]:text-primary data-[state=active]:neon-glow data-[state=active]:border data-[state=active]:border-primary/30 hover:bg-primary/5 hover:scale-105 group"
              >
                <TrendingUp className="h-5 w-5 group-data-[state=active]:scale-110 transition-all duration-300" />
                <span className="text-xs font-semibold">Invest</span>
              </TabsTrigger>
              <TabsTrigger 
                value="ai"
                className="flex flex-col gap-1.5 h-full rounded-2xl transition-all duration-400 data-[state=active]:bg-gradient-to-t data-[state=active]:from-primary/15 data-[state=active]:to-primary/8 data-[state=active]:text-primary data-[state=active]:neon-glow data-[state=active]:border data-[state=active]:border-primary/30 hover:bg-primary/5 hover:scale-105 group"
              >
                <Bot className="h-5 w-5 group-data-[state=active]:scale-110 transition-all duration-300" />
                <span className="text-xs font-semibold">AI</span>
              </TabsTrigger>
              <TabsTrigger 
                value="map"
                className="flex flex-col gap-1.5 h-full rounded-2xl transition-all duration-400 data-[state=active]:bg-gradient-to-t data-[state=active]:from-primary/15 data-[state=active]:to-primary/8 data-[state=active]:text-primary data-[state=active]:neon-glow data-[state=active]:border data-[state=active]:border-primary/30 hover:bg-primary/5 hover:scale-105 group"
              >
                <MapPin className="h-5 w-5 group-data-[state=active]:scale-110 transition-all duration-300" />
                <span className="text-xs font-semibold">Map</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Spacer for bottom navigation */}
          <div className="h-28"></div>
        </Tabs>
      </main>
    </div>
  );
}