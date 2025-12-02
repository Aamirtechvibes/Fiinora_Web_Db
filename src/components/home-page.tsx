import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { currentUser } from '../config/userProfile';
import { formatINR, convertUSDToINR } from '../utils/currency';
import { TrendingUp, TrendingDown, MessageCircle, Heart, Share, Clock, Zap, DollarSign, Activity, Bell, Target, PiggyBank, AlertCircle, ArrowRight, BarChart3, LineChart, Globe, Users, Bookmark, Image, X, Upload, Send } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "Federal Reserve Hints at March Rate Cut as Inflation Cools",
    summary: "Fed officials signal potential 0.25% reduction following six consecutive months of declining inflation metrics",
    category: "Markets",
    time: "47m ago",
    image: "https://images.unsplash.com/photo-1748609278627-4b0e483b9b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmaW5hbmNpYWwlMjBkYXNoYm9hcmQlMjBhbmFseXRpY3N8ZW58MXx8fHwxNzU4MzA4MDA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 1247,
    comments: 89,
    source: "Reuters",
    trending: true,
    impact: "positive"
  },
  {
    id: 2,
    title: "Bitcoin Surges Past $47K as Institutional Adoption Accelerates",
    summary: "Major banks report 300% increase in crypto service requests, Ethereum follows with 8% gains",
    category: "Crypto",
    time: "1h 23m ago",
    image: "https://images.unsplash.com/photo-1744473755637-e09f0c2fab41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlwdG9jdXJyZW5jeSUyMG1hcmtldCUyMHRyYWRpbmclMjBjaGFydHN8ZW58MXx8fHwxNzU4MzA4MDEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 892,
    comments: 124,
    source: "CoinDesk",
    trending: true,
    impact: "positive"
  },
  {
    id: 3,
    title: "AI-Powered Investment Platforms Show 23% Better Returns",
    summary: "Study reveals algorithmic trading strategies outperform traditional portfolio management",
    category: "Technology",
    time: "2h 15m ago",
    image: "https://images.unsplash.com/photo-1613442301287-4fa478efd9ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlc3RtZW50JTIwcG9ydGZvbGlvJTIwc21hcnRwaG9uZSUyMGFwcHxlbnwxfHx8fDE3NTgzMDgwMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 567,
    comments: 76,
    source: "TechCrunch",
    trending: false,
    impact: "neutral"
  },
  {
    id: 4,
    title: "European Markets Rally on Trade Deal Optimism",
    summary: "FTSE 100 gains 2.1% as Brexit trade negotiations show promising progress",
    category: "Global",
    time: "3h 42m ago",
    image: "https://images.unsplash.com/photo-1565688527174-775059ac429c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1lZXRpbmclMjBmaW5hbmNlfGVufDF8fHx8MTc1ODI3NjI2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 334,
    comments: 41,
    source: "Financial Times",
    trending: false,
    impact: "positive"
  }
];

const communityPosts = [
  {
    id: 1,
    author: "Sarah Chen",
    avatar: "SC",
    badge: "Premium",
    content: "Just crossed $50K in my emergency fund using Fiinora's auto-save feature! The 1% optimization suggestions added an extra $200/month. This app literally pays for itself.",
    image: "https://images.unsplash.com/photo-1657049671938-3e5988228df3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBzdWNjZXNzJTIwY2VsZWJyYXRpb24lMjBtb25leXxlbnwxfHx8fDE3NTgzNDYzMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    time: "32m ago",
    likes: 127,
    replies: 18,
    tags: ["Emergency Fund", "Auto-Save"],
    verified: true,
    achievements: ["6-Month Streak", "Goal Crusher"]
  },
  {
    id: 2,
    author: "Marcus Rodriguez",
    avatar: "MR",
    badge: "Investor Pro",
    content: "AI portfolio rebalancing just saved me from a 4% loss during yesterday's market dip. The risk adjustment algorithm is incredibly sophisticated - moved 15% to bonds automatically.",
    image: "https://images.unsplash.com/photo-1640451859877-1374a1155215?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlc3RtZW50JTIwcG9ydGZvbGlvJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc1ODI1MDE1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    time: "1h 15m ago",
    likes: 89,
    replies: 23,
    tags: ["AI Trading", "Risk Management"],
    verified: true,
    achievements: ["Risk Master", "AI Adopter"]
  },
  {
    id: 3,
    author: "Dr. Emily Watson",
    avatar: "EW",
    badge: "Financial Advisor",
    content: "I recommend Fiinora to all my clients now. The debt avalanche calculator helped one client save $12K in interest payments. Professional-grade analytics in a consumer app.",
    time: "2h 45m ago",
    likes: 156,
    replies: 31,
    tags: ["Debt Strategy", "Professional"],
    verified: true,
    achievements: ["Trusted Advisor", "Community Leader"]
  },
  {
    id: 4,
    author: "Alex Thompson",
    avatar: "AT",
    badge: "Explorer",
    content: "Map cost predictions were 97% accurate for my Tokyo trip! Budgeted $3,200, spent $3,156. Even predicted the exact subway costs. Mind = blown 🤯",
    image: "https://images.unsplash.com/photo-1625241310933-640978bb5176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBidWRnZXQlMjBwbGFubmluZyUyMHZhY2F0aW9ufGVufDF8fHx8MTc1ODM0NjMyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    time: "4h 12m ago",
    likes: 73,
    replies: 12,
    tags: ["Travel Budget", "Map Feature"],
    verified: false,
    achievements: ["Travel Pro"]
  }
];

export function HomePage() {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening";
  
  // Create Post State
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  
  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview('');
  };
  
  const handleSubmitPost = () => {
    if (postContent.trim() || selectedImage) {
      // Here you would typically send the post to your backend
      console.log('New post:', { content: postContent, image: selectedImage });
      
      // Reset form
      setPostContent('');
      setSelectedImage(null);
      setImagePreview('');
      setShowCreatePost(false);
    }
  };

  return (
    <div className="space-y-8 p-6">
      {/* Enhanced Header with Personal Insights */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            {greeting}, {currentUser.name}!
          </h1>
          <p className="text-muted-foreground mt-1">Your wealth grew by <span className="text-primary font-medium">{formatINR(convertUSDToINR(1247))}</span> this week</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl glass-card border border-primary/20">
            <Activity className="h-5 w-5 text-primary animate-pulse" />
            <div className="text-right">
              <p className="text-sm font-medium text-primary">S&P 500</p>
              <p className="text-xs text-primary">+2.7% ↗</p>
            </div>
          </div>
          <Button size="sm" className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20">
            <Bell className="h-4 w-4 mr-1" />
            3
          </Button>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Budget</p>
                <p className="text-xs text-muted-foreground">73% used</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-green-500/20 hover:border-green-500/40 transition-all duration-300 cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-green-500/10 border border-green-500/20">
                <PiggyBank className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Savings</p>
                <p className="text-xs text-muted-foreground">+{formatINR(convertUSDToINR(340))} this week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <BarChart3 className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Portfolio</p>
                <p className="text-xs text-muted-foreground">+5.2% month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <AlertCircle className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Alerts</p>
                <p className="text-xs text-muted-foreground">2 new insights</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Market Summary */}
      <Card className="glass-card border-primary/20">
        <CardHeader className="pb-4 flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Global Markets
          </CardTitle>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-primary/20">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-xs text-primary font-medium">Live</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-blue-500/10 border border-primary/20 hover:border-primary/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">S&P 500</p>
                <LineChart className="h-3 w-3 text-primary" />
              </div>
              <p className="text-xl font-bold text-foreground">{formatINR(convertUSDToINR(4267.89))}</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-primary" />
                <p className="text-sm text-primary font-medium">+2.7%</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">+{formatINR(convertUSDToINR(115.32))} pts</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Bitcoin</p>
                <BarChart3 className="h-3 w-3 text-amber-500" />
              </div>
              <p className="text-xl font-bold text-foreground">{formatINR(convertUSDToINR(47125))}</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-amber-500" />
                <p className="text-sm text-amber-500 font-medium">+5.8%</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">+{formatINR(convertUSDToINR(2580))}</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">NASDAQ</p>
                <TrendingUp className="h-3 w-3 text-green-500" />
              </div>
              <p className="text-xl font-bold text-foreground">{formatINR(convertUSDToINR(13542.78))}</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <p className="text-sm text-green-500 font-medium">+1.9%</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">+{formatINR(convertUSDToINR(252.15))} pts</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Gold</p>
                <TrendingDown className="h-3 w-3 text-red-500" />
              </div>
              <p className="text-xl font-bold text-foreground">{formatINR(convertUSDToINR(2034))}</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <TrendingDown className="h-3 w-3 text-red-500" />
                <p className="text-sm text-red-500 font-medium">-0.8%</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">-{formatINR(convertUSDToINR(16.50))}</p>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-xl glass-card border border-primary/10">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Market Sentiment</span>
              <div className="flex items-center gap-2">
                <div className="px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                  <span className="text-xs text-green-500 font-medium">Bullish</span>
                </div>
                <span className="text-sm text-foreground font-medium">Fear & Greed: 72</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Financial News */}
      <Card className="glass-card border-primary/20">
        <CardHeader className="pb-4 flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Market Intelligence
          </CardTitle>
          <Button size="sm" variant="outline" className="border-primary/20 hover:bg-primary/10">
            View All
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {newsItems.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 rounded-2xl glass-card border border-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer group">
              <div className="relative flex-shrink-0">
                <ImageWithFallback 
                  src={item.image} 
                  alt={item.title}
                  className="w-24 h-24 rounded-xl object-cover border border-primary/20"
                />
                {item.trending && (
                  <div className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 border-2 border-background">
                    <Zap className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    variant="secondary" 
                    className={`text-xs border hover:bg-opacity-80 ${
                      item.category === 'Markets' ? 'bg-primary/10 text-primary border-primary/20' :
                      item.category === 'Crypto' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      item.category === 'Technology' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                      'bg-green-500/10 text-green-500 border-green-500/20'
                    }`}
                  >
                    {item.category}
                  </Badge>
                  {item.impact && (
                    <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      item.impact === 'positive' ? 'bg-green-500/10 text-green-500' :
                      item.impact === 'negative' ? 'bg-red-500/10 text-red-500' :
                      'bg-gray-500/10 text-gray-500'
                    }`}>
                      {item.impact === 'positive' ? '↗' : item.impact === 'negative' ? '↘' : '→'}
                    </div>
                  )}
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {item.time}
                  </span>
                </div>
                <h3 className="font-semibold text-sm line-clamp-2 text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{item.summary}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <Heart className="h-3 w-3" />
                      {item.likes}
                    </button>
                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <MessageCircle className="h-3 w-3" />
                      {item.comments}
                    </button>
                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <Bookmark className="h-3 w-3" />
                      Save
                    </button>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.source}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Enhanced Community Feed */}
      <Card className="glass-card border-primary/20">
        <CardHeader className="pb-4 flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Wealth Community
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-full glass-card border border-primary/20">
              <span className="text-xs text-primary font-medium">12.3K Active</span>
            </div>
            <Button size="sm" variant="outline" className="border-primary/20 hover:bg-primary/10">
              Join Discussion
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {communityPosts.map((post) => (
            <div key={post.id} className="p-4 rounded-2xl glass-card border border-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer group">
              <div className="flex items-start gap-3 mb-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 border border-primary/30 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">{post.avatar}</span>
                  </div>
                  {post.verified && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-background flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-foreground">{post.author}</span>
                    <Badge variant="secondary" className={`text-xs ${
                      post.badge === 'Premium' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      post.badge === 'Investor Pro' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                      post.badge === 'Financial Advisor' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                      'bg-gray-500/10 text-gray-500 border-gray-500/20'
                    }`}>
                      {post.badge}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{post.time}</span>
                  </div>
                  {post.achievements && post.achievements.length > 0 && (
                    <div className="flex items-center gap-1 mb-2">
                      {post.achievements.slice(0, 2).map((achievement, idx) => (
                        <div key={idx} className="px-2 py-0.5 rounded-full bg-primary/5 border border-primary/10">
                          <span className="text-xs text-primary font-medium">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <p className="text-sm mb-4 text-foreground leading-relaxed group-hover:text-foreground/90 transition-colors">{post.content}</p>
              
              {post.image && (
                <div className="mb-4 rounded-xl overflow-hidden border border-primary/20">
                  <ImageWithFallback 
                    src={post.image} 
                    alt="User post image"
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center gap-2 mb-3">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 rounded-full bg-primary/5 border border-primary/10 text-xs text-primary">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-red-500 transition-colors">
                    <Heart className="h-3 w-3" />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                    <MessageCircle className="h-3 w-3" />
                    {post.replies} replies
                  </button>
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                    <Share className="h-3 w-3" />
                    Share
                  </button>
                </div>
                <button className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Follow Thread
                </button>
              </div>
            </div>
          ))}
          
          {/* Enhanced Create Post Interface */}
          {!showCreatePost ? (
            <div className="p-4 rounded-2xl glass-card border border-primary/10 text-center">
              <p className="text-sm text-muted-foreground mb-2">Share your financial wins with the community</p>
              <Button 
                size="sm" 
                className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
                onClick={() => setShowCreatePost(true)}
              >
                <MessageCircle className="h-3 w-3 mr-1" />
                Create Post
              </Button>
            </div>
          ) : (
            <div className="p-6 rounded-2xl glass-card-elevated border border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Share with Community</h3>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => setShowCreatePost(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 border border-primary/30 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">{currentUser.initials}</span>
                </div>
                <div className="flex-1">
                  <Textarea
                    placeholder="Share your financial win, tip, or insight..."
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="min-h-[100px] resize-none border-primary/20 focus:border-primary/40 bg-transparent"
                  />
                </div>
              </div>
              
              {imagePreview && (
                <div className="mb-4 relative">
                  <div className="rounded-xl overflow-hidden border border-primary/20">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-primary/20 hover:bg-primary/10 cursor-pointer"
                      asChild
                    >
                      <span>
                        <Image className="h-4 w-4 mr-1" />
                        Add Image
                      </span>
                    </Button>
                  </label>
                  <span className="text-xs text-muted-foreground">
                    Share screenshots, charts, or success photos
                  </span>
                </div>
                
                <Button 
                  size="sm" 
                  className="bg-primary hover:bg-primary/90"
                  onClick={handleSubmitPost}
                  disabled={!postContent.trim() && !selectedImage}
                >
                  <Send className="h-3 w-3 mr-1" />
                  Post
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}