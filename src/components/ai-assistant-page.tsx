import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Send, Bot, User, Lightbulb, TrendingUp, PiggyBank, CreditCard, Activity, Zap, Brain, Loader2 } from "lucide-react";

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const quickQuestions = [
  "How can I improve my credit score?",
  "What's the best way to save for retirement?",
  "Should I invest in stocks or bonds?",
  "How much should I have in my emergency fund?",
  "What are some good budgeting strategies?",
];

const mockResponses: { [key: string]: string } = {
  "How can I improve my credit score?": "To improve your credit score, focus on: 1) Pay all bills on time, 2) Keep credit utilization below 30%, 3) Don't close old credit accounts, 4) Monitor your credit report regularly, and 5) Consider becoming an authorized user on someone else's account. Based on your current financial profile, I recommend focusing on paying down your Chase credit card first.",
  "What's the best way to save for retirement?": "For retirement savings, I recommend: 1) Contribute to your 401(k) up to company match, 2) Consider a Roth IRA for tax-free growth, 3) Aim to save 10-15% of your income, 4) Diversify with index funds, and 5) Increase contributions annually. Given your current savings rate of 33%, you're on track! Consider increasing your emergency fund goal to accelerate retirement savings.",
  "Should I invest in stocks or bonds?": "Your investment allocation should depend on your age, risk tolerance, and timeline. For someone your age, I'd recommend 70-80% stocks and 20-30% bonds. Based on your current portfolio, you're heavily weighted in tech stocks. Consider adding some bond ETFs or international diversification to reduce risk.",
  "How much should I have in my emergency fund?": "You should have 3-6 months of expenses in your emergency fund. Based on your monthly expenses of $3,000, you need $9,000-$18,000. You currently have $6,500, so you're 65% complete with your minimum goal. I recommend prioritizing this before increasing other investments.",
  "What are some good budgeting strategies?": "Effective budgeting strategies include: 1) The 50/30/20 rule (needs/wants/savings), 2) Zero-based budgeting, 3) Envelope method, and 4) Automated savings. Looking at your current spending, you're doing well with an 85% budget utilization. Consider reducing entertainment spending to boost your emergency fund faster."
};

export function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your AI financial intelligence system. I can analyze your portfolio, optimize your budget, provide investment insights, and answer any financial questions. How can I assist with your wealth management today?",
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
        content: mockResponses[content] || "That's a great question! Based on your financial profile and current market conditions, I'd recommend reviewing your budget allocation and considering diversification strategies. Your current savings rate of 33% is excellent, but there might be opportunities to optimize your investment portfolio for better returns.",
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
    <div className="flex flex-col h-[calc(100vh-120px)] p-6 space-y-6">
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
              <p className="text-sm text-foreground">Your portfolio is up 5.2% this month!</p>
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
              <p className="text-sm text-foreground">Emergency fund is 65% complete</p>
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
      <Card className="glass-card border-primary/20 flex-1 flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI Intelligence Chat
            <div className="flex items-center gap-1 ml-auto">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-xs text-primary">Online</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 mb-4">
            <div className="space-y-4">
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

          {/* Enhanced Input Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Activity className="h-3 w-3 text-primary animate-pulse" />
              <span>Type your question or select from quick options above</span>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Input
                  placeholder="Ask me anything about your finances..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !isLoading) {
                      handleSendMessage(inputValue);
                    }
                  }}
                  disabled={isLoading}
                  className="glass-card border-primary/20 bg-input-background pr-4 py-3 text-sm focus:border-primary/40 focus:neon-glow transition-all duration-200"
                  autoFocus
                />
                {inputValue.length > 0 && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
              <Button 
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isLoading}
                className={`px-6 py-3 transition-all duration-300 ${
                  inputValue.trim() 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 neon-glow shadow-lg' 
                    : 'bg-primary/10 hover:bg-primary/20 text-primary border-primary/20'
                }`}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}