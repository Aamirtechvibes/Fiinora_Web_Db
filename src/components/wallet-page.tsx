import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { formatINR, convertUSDToINR } from '../utils/currency';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, PiggyBank, Target, Zap, Activity, Wallet, Eye, EyeOff, RefreshCw, ArrowUpRight, ArrowDownRight, Plus, MoreVertical, Calendar, Filter } from "lucide-react";

const balanceData = [
  { month: 'Jan', balance: convertUSDToINR(18250), savings: convertUSDToINR(12400), investments: convertUSDToINR(8940) },
  { month: 'Feb', balance: convertUSDToINR(19820), savings: convertUSDToINR(13100), investments: convertUSDToINR(9650) },
  { month: 'Mar', balance: convertUSDToINR(21400), savings: convertUSDToINR(13850), investments: convertUSDToINR(10200) },
  { month: 'Apr', balance: convertUSDToINR(20950), savings: convertUSDToINR(14200), investments: convertUSDToINR(9890) },
  { month: 'May', balance: convertUSDToINR(22780), savings: convertUSDToINR(15100), investments: convertUSDToINR(11240) },
  { month: 'Jun', balance: convertUSDToINR(24150), savings: convertUSDToINR(15850), investments: convertUSDToINR(12350) },
  { month: 'Jul', balance: convertUSDToINR(25890), savings: convertUSDToINR(16420), investments: convertUSDToINR(13180) },
];

const expenseData = [
  { category: 'Housing & Utilities', amount: convertUSDToINR(1850), color: '#0070f3', percentage: 42.1 },
  { category: 'Food & Dining', amount: convertUSDToINR(680), color: '#06b6d4', percentage: 15.5 },
  { category: 'Transportation', amount: convertUSDToINR(420), color: '#f59e0b', percentage: 9.6 },
  { category: 'Healthcare', amount: convertUSDToINR(280), color: '#ef4444', percentage: 6.4 },
  { category: 'Entertainment', amount: convertUSDToINR(320), color: '#8b5cf6', percentage: 7.3 },
  { category: 'Shopping', amount: convertUSDToINR(450), color: '#10b981', percentage: 10.2 },
  { category: 'Miscellaneous', amount: convertUSDToINR(390), color: '#f97316', percentage: 8.9 },
];

const monthlySpending = [
  { month: 'Jan', income: convertUSDToINR(4000), expenses: convertUSDToINR(2800) },
  { month: 'Feb', income: convertUSDToINR(4200), expenses: convertUSDToINR(3100) },
  { month: 'Mar', income: convertUSDToINR(4000), expenses: convertUSDToINR(2900) },
  { month: 'Apr', income: convertUSDToINR(4300), expenses: convertUSDToINR(3200) },
  { month: 'May', income: convertUSDToINR(4100), expenses: convertUSDToINR(2750) },
  { month: 'Jun', income: convertUSDToINR(4500), expenses: convertUSDToINR(3000) },
];

const accounts = [
  { 
    name: 'HDFC Bank Savings', 
    balance: convertUSDToINR(4850.42), 
    type: 'checking', 
    change: +convertUSDToINR(325.30), 
    bank: 'HDFC',
    accountNumber: '****7842',
    interest: 3.5
  },
  { 
    name: 'Fixed Deposit Account', 
    balance: convertUSDToINR(15850.89), 
    type: 'savings', 
    change: +convertUSDToINR(420.15), 
    bank: 'SBI',
    accountNumber: '****2156',
    interest: 7.0
  },
  { 
    name: 'ICICI Credit Card', 
    balance: -convertUSDToINR(1845.67), 
    type: 'credit', 
    change: -convertUSDToINR(127.45), 
    bank: 'ICICI',
    accountNumber: '****8923',
    limit: convertUSDToINR(15000)
  },
  { 
    name: 'Zerodha Portfolio', 
    balance: convertUSDToINR(12350.23), 
    type: 'investment', 
    change: +convertUSDToINR(678.18), 
    bank: 'Zerodha',
    accountNumber: '****3401',
    ytdReturn: 8.7
  },
  { 
    name: 'Emergency Fund', 
    balance: convertUSDToINR(8200.00), 
    type: 'savings', 
    change: +convertUSDToINR(150.00), 
    bank: 'Axis Bank',
    accountNumber: '****9876',
    interest: 6.5
  },
];

export function WalletPage() {
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  const monthlyIncome = convertUSDToINR(6800);
  const monthlyExpenses = convertUSDToINR(4390);
  const savingsRate = ((monthlyIncome - monthlyExpenses) / monthlyIncome * 100).toFixed(1);
  const totalAssets = accounts.filter(acc => acc.balance > 0).reduce((sum, acc) => sum + acc.balance, 0);
  const totalLiabilities = Math.abs(accounts.filter(acc => acc.balance < 0).reduce((sum, acc) => sum + acc.balance, 0));

  return (
    <div className="space-y-8 p-6">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Financial Command Center
          </h1>
          <p className="text-muted-foreground mt-1">Real-time wealth tracking • Last updated 2 minutes ago</p>
        </div>
        <div className="flex items-center gap-3">
          <Button size="sm" variant="outline" className="border-primary/20 hover:bg-primary/10">
            <Calendar className="h-4 w-4 mr-1" />
            This Month
          </Button>
          <Button size="sm" variant="outline" className="border-primary/20 hover:bg-primary/10">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
          <Button size="sm" className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20">
            <RefreshCw className="h-4 w-4 mr-1" />
            Sync
          </Button>
        </div>
      </div>

      {/* Enhanced Total Balance Card - Mobile Optimized */}
      <Card className="glass-card bg-gradient-to-br from-primary/10 to-blue-500/10 border-primary/30 money-glow">
        <CardContent className="p-4 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Wallet className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                <span className="text-sm sm:text-base text-primary/80 font-medium">Total Net Worth</span>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0 hover:bg-primary/10">
                  <Eye className="h-3 w-3 text-primary" />
                </Button>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-2 sm:mb-3 break-all">{formatINR(totalBalance)}</h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <TrendingUp className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-green-500 font-medium break-all">+{formatINR(convertUSDToINR(1247))}</span>
                  <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">(+5.8%) this month</span>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl glass-card border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground text-sm">Total Assets</span>
                </div>
                <div className="text-xl font-bold text-foreground">{formatINR(totalAssets)}</div>
              </div>
              <div className="p-4 rounded-2xl glass-card border border-red-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                  <span className="text-muted-foreground text-sm">Total Debt</span>
                </div>
                <div className="text-xl font-bold text-foreground">{formatINR(totalLiabilities)}</div>
              </div>
              <div className="p-4 rounded-2xl glass-card border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground text-sm">Savings Rate</span>
                </div>
                <div className="text-xl font-bold text-foreground">{savingsRate}%</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="glass-card border-primary/20 hover:border-primary/40 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground font-medium">Monthly Income</div>
                <div className="text-xl font-bold text-foreground">{formatINR(monthlyIncome)}</div>
                <div className="flex items-center gap-1 mt-1">
                  <Activity className="h-3 w-3 text-primary" />
                  <span className="text-xs text-primary">Active</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-primary/20 hover:border-primary/40 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/20">
                <CreditCard className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground font-medium">Monthly Expenses</div>
                <div className="text-xl font-bold text-foreground">{formatINR(monthlyExpenses)}</div>
                <div className="flex items-center gap-1 mt-1">
                  <Zap className="h-3 w-3 text-red-500" />
                  <span className="text-xs text-red-500">Tracked</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Accounts Overview */}
      {/* Connected Accounts - Mobile Optimized */}
      <Card className="glass-card border-primary/20 overflow-hidden">
        <CardHeader className="pb-3 sm:pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <span className="truncate">Connected Accounts</span>
          </CardTitle>
          <Button size="sm" className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs sm:text-sm whitespace-nowrap">
            <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            Link Account
          </Button>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          {accounts.map((account, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl glass-card border border-primary/10 hover:border-primary/30 transition-all duration-300 group gap-3 sm:gap-0 overflow-hidden">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl border flex-shrink-0 ${
                  account.type === 'checking' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' :
                  account.type === 'savings' ? 'bg-green-500/10 border-green-500/20 text-green-500' :
                  account.type === 'credit' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                  'bg-purple-500/10 border-purple-500/20 text-purple-500'
                }`}>
                  {account.type === 'checking' && <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />}
                  {account.type === 'savings' && <PiggyBank className="h-4 w-4 sm:h-5 sm:w-5" />}
                  {account.type === 'credit' && <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />}
                  {account.type === 'investment' && <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm sm:text-base text-foreground truncate">{account.name}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 sm:gap-2 flex-wrap">
                    <span className="truncate">{account.bank}</span>
                    <span className="text-xs whitespace-nowrap">{account.accountNumber}</span>
                    <div className="hidden sm:flex items-center gap-1">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-500 whitespace-nowrap">Connected</span>
                    </div>
                  </div>
                  {(account.interest || account.ytdReturn || account.limit) && (
                    <div className="text-xs text-muted-foreground mt-1 truncate">
                      {account.interest && `${account.interest}% APY`}
                      {account.ytdReturn && `${account.ytdReturn}% YTD`}
                      {account.limit && `Limit: ${formatINR(account.limit)}`}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <div className="text-left sm:text-right min-w-0">
                  <div className={`font-bold text-sm sm:text-base lg:text-lg ${account.balance < 0 ? 'text-red-500' : 'text-foreground'} break-all`}>
                    {account.balance < 0 ? '-' : ''}{formatINR(Math.abs(account.balance))}
                  </div>
                  <div className="flex items-center gap-1 justify-start sm:justify-end">
                    {account.change > 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-500 flex-shrink-0" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500 flex-shrink-0" />
                    )}
                    <span className={`text-xs font-medium ${account.change > 0 ? 'text-green-500' : 'text-red-500'} break-all`}>
                      {formatINR(Math.abs(account.change))}
                    </span>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="hidden sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex-shrink-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Enhanced Balance Trend - Mobile Optimized */}
      <Card className="glass-card border-primary/20 overflow-hidden">
        <CardHeader className="pb-3 sm:pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <span className="truncate">Wealth Growth Timeline</span>
          </CardTitle>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20 text-xs whitespace-nowrap">
              +12.3% YTD
            </Badge>
            <Button size="sm" variant="outline" className="border-primary/20 hover:bg-primary/10 text-xs sm:text-sm whitespace-nowrap">
              7 Months
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={balanceData}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0070f3" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0070f3" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="colorInvestments" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
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
                tickFormatter={(value) => `${(value/1000).toFixed(0)}k`}
              />
              <Tooltip 
                formatter={(value, name) => [`${formatINR(value)}`, name]} 
                contentStyle={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(0, 112, 243, 0.2)',
                  borderRadius: '12px',
                  color: '#1a1a1a'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="balance" 
                stackId="1"
                stroke="#0070f3" 
                fillOpacity={1}
                fill="url(#colorBalance)"
                strokeWidth={2}
                name="Total Balance"
              />
              <Area 
                type="monotone" 
                dataKey="savings" 
                stackId="2"
                stroke="#10b981" 
                fillOpacity={1}
                fill="url(#colorSavings)"
                strokeWidth={2}
                name="Savings"
              />
              <Area 
                type="monotone" 
                dataKey="investments" 
                stackId="3"
                stroke="#8b5cf6" 
                fillOpacity={1}
                fill="url(#colorInvestments)"
                strokeWidth={2}
                name="Investments"
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="p-3 rounded-xl glass-card border border-primary/10 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-xs text-muted-foreground">Net Worth</span>
              </div>
              <div className="font-bold text-foreground">{formatINR(balanceData[balanceData.length - 1].balance)}</div>
            </div>
            <div className="p-3 rounded-xl glass-card border border-green-500/10 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-muted-foreground">Savings</span>
              </div>
              <div className="font-bold text-foreground">{formatINR(balanceData[balanceData.length - 1].savings)}</div>
            </div>
            <div className="p-3 rounded-xl glass-card border border-purple-500/10 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-xs text-muted-foreground">Investments</span>
              </div>
              <div className="font-bold text-foreground">{formatINR(balanceData[balanceData.length - 1].investments)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expense Breakdown */}
      <Card className="glass-card border-primary/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <PiggyBank className="h-5 w-5 text-primary" />
            Expense Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                  strokeWidth={2}
                  stroke="rgba(255, 255, 255, 0.8)"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${formatINR(value)}`, 'Amount']} 
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
              {expenseData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl glass-card border border-primary/10">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full border-2 border-primary/20" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-medium text-foreground">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-foreground">{formatINR(item.amount)}</div>
                    <div className="w-2 h-2 bg-primary rounded-full mx-auto mt-1 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Income vs Expenses */}
      <Card className="glass-card border-primary/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Cash Flow Matrix
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlySpending}>
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
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip 
                contentStyle={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(0, 112, 243, 0.2)',
                  borderRadius: '12px',
                  color: '#1a1a1a'
                }}
              />
              <Bar 
                dataKey="income" 
                fill="#0070f3" 
                name="Income" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="expenses" 
                fill="#06b6d4" 
                name="Expenses" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}