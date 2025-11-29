import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, PiggyBank, Target, Zap, Activity, Wallet, Eye, EyeOff, RefreshCw, ArrowUpRight, ArrowDownRight, Plus, MoreVertical, Calendar, Filter } from "lucide-react";

const balanceData = [
  { month: 'Jan', balance: 18250, savings: 12400, investments: 8940 },
  { month: 'Feb', balance: 19820, savings: 13100, investments: 9650 },
  { month: 'Mar', balance: 21400, savings: 13850, investments: 10200 },
  { month: 'Apr', balance: 20950, savings: 14200, investments: 9890 },
  { month: 'May', balance: 22780, savings: 15100, investments: 11240 },
  { month: 'Jun', balance: 24150, savings: 15850, investments: 12350 },
  { month: 'Jul', balance: 25890, savings: 16420, investments: 13180 },
];

const expenseData = [
  { category: 'Housing & Utilities', amount: 1850, color: '#0070f3', percentage: 42.1 },
  { category: 'Food & Dining', amount: 680, color: '#06b6d4', percentage: 15.5 },
  { category: 'Transportation', amount: 420, color: '#f59e0b', percentage: 9.6 },
  { category: 'Healthcare', amount: 280, color: '#ef4444', percentage: 6.4 },
  { category: 'Entertainment', amount: 320, color: '#8b5cf6', percentage: 7.3 },
  { category: 'Shopping', amount: 450, color: '#10b981', percentage: 10.2 },
  { category: 'Miscellaneous', amount: 390, color: '#f97316', percentage: 8.9 },
];

const monthlySpending = [
  { month: 'Jan', income: 4000, expenses: 2800 },
  { month: 'Feb', income: 4200, expenses: 3100 },
  { month: 'Mar', income: 4000, expenses: 2900 },
  { month: 'Apr', income: 4300, expenses: 3200 },
  { month: 'May', income: 4100, expenses: 2750 },
  { month: 'Jun', income: 4500, expenses: 3000 },
];

const accounts = [
  { 
    name: 'Chase Premier Checking', 
    balance: 4850.42, 
    type: 'checking', 
    change: +325.30, 
    bank: 'Chase',
    accountNumber: '****7842',
    interest: 0.01
  },
  { 
    name: 'High-Yield Savings', 
    balance: 15850.89, 
    type: 'savings', 
    change: +420.15, 
    bank: 'Marcus',
    accountNumber: '****2156',
    interest: 4.5
  },
  { 
    name: 'Chase Sapphire Reserve', 
    balance: -1845.67, 
    type: 'credit', 
    change: -127.45, 
    bank: 'Chase',
    accountNumber: '****8923',
    limit: 15000
  },
  { 
    name: 'Vanguard Portfolio', 
    balance: 12350.23, 
    type: 'investment', 
    change: +678.18, 
    bank: 'Vanguard',
    accountNumber: '****3401',
    ytdReturn: 8.7
  },
  { 
    name: 'Emergency Fund', 
    balance: 8200.00, 
    type: 'savings', 
    change: +150.00, 
    bank: 'Ally',
    accountNumber: '****9876',
    interest: 4.2
  },
];

export function WalletPage() {
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  const monthlyIncome = 6800;
  const monthlyExpenses = 4390;
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

      {/* Enhanced Total Balance Card */}
      <Card className="glass-card bg-gradient-to-br from-primary/10 to-blue-500/10 border-primary/30 money-glow">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <Wallet className="h-6 w-6 text-primary" />
                <span className="text-primary/80 font-medium">Total Net Worth</span>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0 hover:bg-primary/10">
                  <Eye className="h-3 w-3 text-primary" />
                </Button>
              </div>
              <h2 className="text-5xl font-bold text-foreground mb-3">${totalBalance.toLocaleString()}</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-green-500 font-medium">+$1,247</span>
                  <span className="text-muted-foreground text-sm">(+5.8%) this month</span>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl glass-card border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground text-sm">Total Assets</span>
                </div>
                <div className="text-xl font-bold text-foreground">${totalAssets.toLocaleString()}</div>
              </div>
              <div className="p-4 rounded-2xl glass-card border border-red-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                  <span className="text-muted-foreground text-sm">Total Debt</span>
                </div>
                <div className="text-xl font-bold text-foreground">${totalLiabilities.toLocaleString()}</div>
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
                <div className="text-xl font-bold text-foreground">${monthlyIncome.toLocaleString()}</div>
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
                <div className="text-xl font-bold text-foreground">${monthlyExpenses.toLocaleString()}</div>
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
      <Card className="glass-card border-primary/20">
        <CardHeader className="pb-4 flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Connected Accounts
          </CardTitle>
          <Button size="sm" className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20">
            <Plus className="h-4 w-4 mr-1" />
            Link Account
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {accounts.map((account, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-2xl glass-card border border-primary/10 hover:border-primary/30 transition-all duration-300 group">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl border ${
                  account.type === 'checking' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' :
                  account.type === 'savings' ? 'bg-green-500/10 border-green-500/20 text-green-500' :
                  account.type === 'credit' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                  'bg-purple-500/10 border-purple-500/20 text-purple-500'
                }`}>
                  {account.type === 'checking' && <DollarSign className="h-5 w-5" />}
                  {account.type === 'savings' && <PiggyBank className="h-5 w-5" />}
                  {account.type === 'credit' && <CreditCard className="h-5 w-5" />}
                  {account.type === 'investment' && <TrendingUp className="h-5 w-5" />}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{account.name}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <span>{account.bank}</span>
                    <span className="text-xs">{account.accountNumber}</span>
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-500">Connected</span>
                  </div>
                  {(account.interest || account.ytdReturn || account.limit) && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {account.interest && `${account.interest}% APY`}
                      {account.ytdReturn && `${account.ytdReturn}% YTD Return`}
                      {account.limit && `${account.limit.toLocaleString()} Limit`}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className={`font-bold text-lg ${account.balance < 0 ? 'text-red-500' : 'text-foreground'}`}>
                    {account.balance < 0 ? '-' : ''}${Math.abs(account.balance).toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1 justify-end">
                    {account.change > 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={`text-xs font-medium ${account.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      ${Math.abs(account.change).toFixed(2)}
                    </span>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Enhanced Balance Trend */}
      <Card className="glass-card border-primary/20">
        <CardHeader className="pb-4 flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Wealth Growth Timeline
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
              +12.3% YTD
            </Badge>
            <Button size="sm" variant="outline" className="border-primary/20 hover:bg-primary/10">
              7 Months
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
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
                formatter={(value, name) => [`${value.toLocaleString()}`, name]} 
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
              <div className="font-bold text-foreground">${balanceData[balanceData.length - 1].balance.toLocaleString()}</div>
            </div>
            <div className="p-3 rounded-xl glass-card border border-green-500/10 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-muted-foreground">Savings</span>
              </div>
              <div className="font-bold text-foreground">${balanceData[balanceData.length - 1].savings.toLocaleString()}</div>
            </div>
            <div className="p-3 rounded-xl glass-card border border-purple-500/10 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-xs text-muted-foreground">Investments</span>
              </div>
              <div className="font-bold text-foreground">${balanceData[balanceData.length - 1].investments.toLocaleString()}</div>
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
                  formatter={(value) => [`${value}`, 'Amount']} 
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
                    <div className="font-bold text-foreground">${item.amount}</div>
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