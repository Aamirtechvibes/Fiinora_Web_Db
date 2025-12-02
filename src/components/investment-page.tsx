import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { formatINR, convertUSDToINR } from '../utils/currency';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Target, Brain, Star, AlertCircle, Activity, Zap } from "lucide-react";

const portfolioData = [
  { month: 'Jan', value: convertUSDToINR(8500) },
  { month: 'Feb', value: convertUSDToINR(8720) },
  { month: 'Mar', value: convertUSDToINR(8450) },
  { month: 'Apr', value: convertUSDToINR(8890) },
  { month: 'May', value: convertUSDToINR(8650) },
  { month: 'Jun', value: convertUSDToINR(8945) },
];

const holdings = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', shares: 25, currentPrice: convertUSDToINR(185.43), totalValue: convertUSDToINR(4635.75), change: 2.4, allocation: 20.8 },
  { symbol: 'TCS', name: 'Tata Consultancy Services', shares: 15, currentPrice: convertUSDToINR(248.50), totalValue: convertUSDToINR(3727.50), change: -1.2, allocation: 16.7 },
  { symbol: 'INFY', name: 'Infosys Limited', shares: 12, currentPrice: convertUSDToINR(412.80), totalValue: convertUSDToINR(4953.60), change: 1.8, allocation: 22.2 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', shares: 8, currentPrice: convertUSDToINR(445.20), totalValue: convertUSDToINR(3561.60), change: 4.5, allocation: 16.0 },
  { symbol: 'NIFTYBEES', name: 'Nifty 50 ETF', shares: 35, currentPrice: convertUSDToINR(418.50), totalValue: convertUSDToINR(14647.50), change: 0.9, allocation: 24.3 },
];

const aiRecommendations = [
  {
    symbol: 'WIPRO',
    name: 'Wipro Limited',
    price: convertUSDToINR(152.30),
    recommendation: 'BUY',
    confidence: 85,
    reason: 'Strong growth in IT services and digital transformation demand',
    targetPrice: convertUSDToINR(180.00),
    riskLevel: 'Medium'
  },
  {
    symbol: 'ITC',
    name: 'ITC Limited',
    price: convertUSDToINR(142.65),
    recommendation: 'HOLD',
    confidence: 72,
    reason: 'Diversified portfolio offset by regulatory concerns in tobacco',
    targetPrice: convertUSDToINR(155.00),
    riskLevel: 'Low'
  },
  {
    symbol: 'ZOMATO',
    name: 'Zomato Limited',
    price: convertUSDToINR(68.45),
    recommendation: 'BUY',
    confidence: 78,
    reason: 'Food delivery market recovery and quick commerce expansion',
    targetPrice: convertUSDToINR(85.00),
    riskLevel: 'High'
  },
];

const portfolioAllocation = [
  { name: 'Technology', value: 65, color: '#0070f3' },
  { name: 'ETFs', value: 24, color: '#06b6d4' },
  { name: 'Healthcare', value: 7, color: '#f59e0b' },
  { name: 'Finance', value: 4, color: '#10b981' },
];

const investmentGoals = [
  { name: 'Retirement Fund', target: convertUSDToINR(500000), current: convertUSDToINR(125000), timeframe: '25 years' },
  { name: 'House Down Payment', target: convertUSDToINR(80000), current: convertUSDToINR(15000), timeframe: '5 years' },
  { name: 'Kids Education', target: convertUSDToINR(200000), current: convertUSDToINR(32000), timeframe: '15 years' },
];

export function InvestmentPage() {
  const totalValue = holdings.reduce((sum, holding) => sum + holding.totalValue, 0);
  const totalGainLoss = holdings.reduce((sum, holding) => {
    return sum + (holding.totalValue * holding.change / 100);
  }, 0);
  const totalReturn = (totalGainLoss / totalValue * 100).toFixed(2);

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Investment Matrix
        </h1>
        <p className="text-muted-foreground mt-1">AI-powered wealth generation and portfolio optimization</p>
      </div>

      {/* Portfolio Overview */}
      <Card className="glass-card bg-gradient-to-br from-primary/10 to-blue-500/10 border-primary/30 money-glow">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="text-primary/80 text-sm font-medium">Total Portfolio Value</span>
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-2">{formatINR(totalValue)}</h2>
              <div className="flex items-center gap-2">
                {totalGainLoss >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-primary" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${totalGainLoss >= 0 ? 'text-primary' : 'text-red-500'}`}>
                  {totalReturn}% today
                </span>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-right p-4 rounded-2xl glass-card border border-primary/20">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-primary/80 text-sm font-medium">Today's P&L</span>
              </div>
              <div className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-primary' : 'text-red-500'}`}>
                {totalGainLoss >= 0 ? '+' : ''}{formatINR(totalGainLoss)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Performance Chart */}
      <Card className="glass-card border-primary/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Portfolio Evolution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={portfolioData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 112, 243, 0.1)" />
              <XAxis 
                dataKey="month" 
                stroke="#71717a"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#71717a"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Portfolio Value']} 
                contentStyle={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(0, 112, 243, 0.2)',
                  borderRadius: '12px',
                  color: '#1a1a1a'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#0070f3" 
                strokeWidth={3}
                dot={{ fill: '#0070f3', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#0070f3', strokeWidth: 2, fill: '#0070f3' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card className="glass-card border-primary/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Investment Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {aiRecommendations.map((rec, index) => (
            <div key={index} className="p-4 rounded-2xl glass-card border border-primary/10 hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{rec.symbol}</h3>
                    <p className="text-sm text-muted-foreground">{rec.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground text-lg">{formatINR(rec.price)}</p>
                  <Badge 
                    variant={rec.recommendation === 'BUY' ? 'default' : rec.recommendation === 'SELL' ? 'destructive' : 'secondary'}
                    className={`${
                      rec.recommendation === 'BUY' ? 'bg-primary/10 text-primary border-primary/20' :
                      rec.recommendation === 'SELL' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                      'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                    }`}
                  >
                    {rec.recommendation}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
                  <div className="text-muted-foreground mb-2">AI Confidence</div>
                  <div className="flex items-center gap-2">
                    <Progress value={rec.confidence} className="h-2 flex-1 bg-primary/20" />
                    <span className="font-semibold text-primary">{rec.confidence}%</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
                  <div className="text-muted-foreground mb-2">Target Price</div>
                  <div className="font-semibold text-foreground">{formatINR(rec.targetPrice)}</div>
                </div>
              </div>
              <p className="text-sm text-foreground mb-4 leading-relaxed">{rec.reason}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      rec.riskLevel === 'Low' ? 'border-primary/20 text-primary' :
                      rec.riskLevel === 'Medium' ? 'border-yellow-500/20 text-yellow-500' :
                      'border-red-500/20 text-red-500'
                    }`}
                  >
                    Risk: {rec.riskLevel}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Activity className="h-3 w-3 text-primary" />
                    <span className="text-xs text-primary">Live Analysis</span>
                  </div>
                </div>
                <Button size="sm" className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20">
                  <Zap className="h-3 w-3 mr-1" />
                  Invest Now
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Current Holdings */}
      <Card className="glass-card border-primary/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Active Holdings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {holdings.map((holding, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-2xl glass-card border border-primary/10 hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{holding.symbol}</p>
                  <p className="text-sm text-muted-foreground">{holding.shares} shares @ {formatINR(holding.currentPrice)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground text-lg">{formatINR(holding.totalValue)}</p>
                <div className="flex items-center gap-1 justify-end">
                  {holding.change >= 0 ? (
                    <TrendingUp className="h-3 w-3 text-primary" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={`text-xs font-medium ${holding.change >= 0 ? 'text-primary' : 'text-red-500'}`}>
                    {holding.change >= 0 ? '+' : ''}{holding.change}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Portfolio Allocation */}
      <Card className="glass-card border-primary/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Portfolio Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={portfolioAllocation}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  strokeWidth={2}
                  stroke="rgba(255, 255, 255, 0.8)"
                >
                  {portfolioAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Allocation']} 
                  contentStyle={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(0, 112, 243, 0.2)',
                    borderRadius: '12px',
                    color: '#1a1a1a'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {portfolioAllocation.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl glass-card border border-primary/10">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full border-2 border-primary/20" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-medium text-foreground">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-foreground">{item.value}%</div>
                    <div className="w-2 h-2 bg-primary rounded-full mx-auto mt-1 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment Goals */}
      <Card className="glass-card border-primary/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Investment Objectives
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {investmentGoals.map((goal, index) => {
            const percentage = (goal.current / goal.target) * 100;
            
            return (
              <div key={index} className="p-4 rounded-2xl glass-card border border-primary/10 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">{goal.name}</h3>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    {goal.timeframe}
                  </span>
                </div>
                <div className="space-y-3">
                  <Progress value={percentage} className="h-3 bg-primary/20" />
                  <div className="flex justify-between text-sm">
                    <span className="text-primary font-medium">{formatINR(goal.current)} saved</span>
                    <span className="text-muted-foreground">{formatINR(goal.target)} target</span>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-primary" />
                      {percentage.toFixed(1)}% complete
                    </span>
                    <span>{formatINR(goal.target - goal.current)} remaining</span>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Market Insights */}
      <Card className="glass-card border-primary/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Market Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-blue-500/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="h-4 w-4 text-primary" />
              <span className="font-semibold text-primary">AI Market Analysis</span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              Current market conditions favor technology stocks. AI predicts a 15% upside potential for your portfolio over the next 6 months.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-500/5 to-orange-500/5 border border-yellow-500/20">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-yellow-500 animate-pulse" />
              <span className="font-semibold text-yellow-600">Risk Alert</span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              Your portfolio is heavily weighted in technology. Consider diversifying into other sectors to reduce risk.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}