import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { useFinancialContext } from '../contexts/FinancialContext';
import { currentUser } from '../config/userProfile';
import { formatINR, convertUSDToINR } from '../utils/currency';
import { generatePersonalizedResponse } from '../utils/aiResponses';
import { Send, Bot, User, Lightbulb, TrendingUp, PiggyBank, CreditCard, Activity, Zap, Brain, Loader2 } from "lucide-react";

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const quickQuestions = [
  "How can I improve my CIBIL score?",
  "What's the best way to save for retirement in India?",
  "Should I invest in mutual funds or stocks?",
  "How much should I have in my emergency fund?",
  "What are some good budgeting strategies?",
  "How can I reduce my debt faster?",
];



export function AIAssistantPage() {
  const financialData = useFinancialContext();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: `Hello ${currentUser.name}! I'm your AI financial intelligence system. I can analyze your portfolio, optimize your budget, provide investment insights, and answer any financial questions. I have access to your complete financial profile and can provide personalized recommendations. How can I assist with your wealth management today?`,
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    const scrollElement = document.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollElement) {
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response with loading state
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        content: generatePersonalizedResponse(content, financialData, currentUser.name),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] sm:h-[calc(100vh-120px)] p-3 sm:p-6 space-y-3 sm:space-y-6 overflow-hidden">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          AI Finance Assistant
        </h1>
        <p className="text-muted-foreground mt-1">Get personalized financial intelligence powered by advanced AI</p>
      </div>

      {/* Quick Insights */}
      <Card className="glass-card border-primary/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Real-time Financial Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-blue-500/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Portfolio Performance</span>
              </div>
              <p className="text-sm text-foreground">Your portfolio is up 5.2% this month at {formatINR(financialData.portfolioHoldings.reduce((sum, h) => sum + h.totalValue, 0))}!</p>
              <div className="flex items-center gap-1 mt-1">
                <Activity className="h-3 w-3 text-primary animate-pulse" />
                <span className="text-xs text-primary">Live Analysis</span>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-cyan-400/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <PiggyBank className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Savings Goal</span>
              </div>
              <p className="text-sm text-foreground">Emergency fund: {formatINR(financialData.savingsGoals.find(g => g.name.includes('Emergency'))?.current || 0)} saved</p>
              <div className="flex items-center gap-1 mt-1">
                <Zap className="h-3 w-3 text-primary animate-pulse" />
                <span className="text-xs text-primary">On Track</span>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-500/5 to-orange-500/5 border border-yellow-500/20">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-semibold text-yellow-600">Budget Alert</span>
              </div>
              <p className="text-sm text-foreground">Entertainment spending over budget</p>
              <div className="flex items-center gap-1 mt-1">
                <Activity className="h-3 w-3 text-yellow-500 animate-pulse" />
                <span className="text-xs text-yellow-600">Needs Attention</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="glass-card border-primary/20 flex-1 flex flex-col min-h-0 overflow-hidden">
        <CardHeader className="pb-3 sm:pb-4 flex-shrink-0 border-b border-border/50">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Bot className="h-5 w-5 text-primary" />
            AI Intelligence Chat
            <div className="flex items-center gap-1 ml-auto">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-xs text-primary">Online</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col min-h-0 overflow-hidden p-3 sm:p-6">
          <ScrollArea className="flex-1 mb-3 sm:mb-4 min-h-0 overflow-auto">
            <div className="space-y-3 sm:space-y-4 pb-6 sm:pb-8">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className={`p-3 rounded-2xl border ${
                    message.sender === 'user' 
                      ? 'bg-primary/10 border-primary/20 text-primary' 
                      : 'bg-primary/10 border-primary/20 text-primary'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div className={`max-w-[80%] ${
                    message.sender === 'user' ? 'text-right' : ''
                  }`}>
                    <div className={`p-4 rounded-2xl glass-card border ${
                      message.sender === 'user'
                        ? 'border-primary/20 bg-gradient-to-br from-primary/5 to-blue-500/5'
                        : 'border-primary/10 bg-gradient-to-br from-primary/5 to-primary/10'
                    }`}>
                      <p className="text-sm text-foreground leading-relaxed">{message.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* AI Typing Indicator */}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="p-3 rounded-2xl border bg-primary/10 border-primary/20 text-primary">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="max-w-[80%]">
                    <div className="p-4 rounded-2xl glass-card border border-primary/10 bg-gradient-to-br from-primary/5 to-primary/10">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        <p className="text-sm text-muted-foreground">AI is analyzing your request...</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Questions */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
              <Lightbulb className="h-3 w-3 text-primary" />
              Quick financial questions:
            </p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary/10 hover:border-primary/30 text-xs py-1 px-2 border-primary/20 text-primary transition-all duration-200"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </Badge>
              ))}
            </div>
          </div>

          {/* Enhanced Input Section - Highly Visible & Accessible */}
          <div className="space-y-2 sm:space-y-3 flex-shrink-0 bg-gradient-to-t from-white/95 to-white/90 backdrop-blur-sm p-3 sm:p-4 rounded-2xl border-2 border-primary/30 shadow-xl mt-auto">
            <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-primary">
              <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-primary animate-pulse flex-shrink-0" />
              <span className="truncate">Ask me anything about your finances</span>
            </div>
            <div className="flex gap-2 sm:gap-3 items-stretch">
              <div className="flex-1 relative min-w-0">
                <Input
                  placeholder="Type your question here..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !isLoading) {
                      handleSendMessage(inputValue);
                    }
                  }}
                  disabled={isLoading}
                  className="h-12 sm:h-14 border-2 border-primary/40 bg-white shadow-md pr-12 px-4 text-sm sm:text-base font-medium placeholder:text-gray-500 placeholder:font-normal focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-200 w-full rounded-xl"
                  autoFocus
                />
                {inputValue.length > 0 && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-lg"></div>
                  </div>
                )}
              </div>
              <Button 
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isLoading}
                size="lg"
                className={`h-12 sm:h-14 px-4 sm:px-8 transition-all duration-300 flex-shrink-0 rounded-xl font-bold text-base ${
                  inputValue.trim() 
                    ? 'bg-primary text-white hover:bg-primary/90 neon-glow shadow-xl scale-100 hover:scale-105' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
                ) : (
                  <>
                    <Send className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="hidden sm:inline ml-2">Send</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}