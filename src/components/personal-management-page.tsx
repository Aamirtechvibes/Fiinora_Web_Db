import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { formatINR, convertUSDToINR } from '../utils/currency';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Target, PiggyBank, CreditCard, TrendingUp, Plus, AlertTriangle, CheckCircle, Zap, Activity } from "lucide-react";

const budgetCategories = [
  { category: 'Food & Dining', budgeted: convertUSDToINR(500), spent: convertUSDToINR(425), color: '#8884d8' },
  { category: 'Transportation', budgeted: convertUSDToINR(200), spent: convertUSDToINR(180), color: '#82ca9d' },
  { category: 'Entertainment', budgeted: convertUSDToINR(150), spent: convertUSDToINR(195), color: '#ffc658' },
  { category: 'Shopping', budgeted: convertUSDToINR(300), spent: convertUSDToINR(250), color: '#ff7300' },
  { category: 'Bills & Utilities', budgeted: convertUSDToINR(800), spent: convertUSDToINR(785), color: '#0088fe' },
];

const savingsGoals = [
  { 
    name: 'Emergency Fund', 
    target: convertUSDToINR(10000), 
    current: convertUSDToINR(6500), 
    deadline: '2025-12-31',
    priority: 'high'
  },
  { 
    name: 'Vacation to Europe', 
    target: convertUSDToINR(3500), 
    current: convertUSDToINR(1200), 
    deadline: '2025-07-15',
    priority: 'medium'
  },
  { 
    name: 'New Car Down Payment', 
    target: convertUSDToINR(8000), 
    current: convertUSDToINR(2400), 
    deadline: '2026-03-01',
    priority: 'low'
  },
];

const debtAccounts = [
  {
    name: 'Credit Card - ICICI',
    balance: convertUSDToINR(2450),
    minPayment: convertUSDToINR(75),
    interestRate: 18.24,
    payoffDate: '2026-02-15'
  },
  {
    name: 'Education Loan',
    balance: convertUSDToINR(15680),
    minPayment: convertUSDToINR(180),
    interestRate: 9.5,
    payoffDate: '2032-08-20'
  },
  {
    name: 'Car Loan',
    balance: convertUSDToINR(8920),
    minPayment: convertUSDToINR(320),
    interestRate: 8.5,
    payoffDate: '2027-11-10'
  },
];

const savingsProgress = [
  { month: 'Jan', amount: convertUSDToINR(4200) },
  { month: 'Feb', amount: convertUSDToINR(4650) },
  { month: 'Mar', amount: convertUSDToINR(5100) },
  { month: 'Apr', amount: convertUSDToINR(5380) },
  { month: 'May', amount: convertUSDToINR(5820) },
  { month: 'Jun', amount: convertUSDToINR(6500) },
];

export function PersonalManagementPage() {
  const totalBudgeted = budgetCategories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const budgetUtilization = (totalSpent / totalBudgeted * 100).toFixed(1);
  
  const totalDebt = debtAccounts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalMinPayments = debtAccounts.reduce((sum, debt) => sum + debt.minPayment, 0);

  return (
    <div className="space-y-4 sm:space-y-8 p-3 sm:p-6">
      {/* Header - Mobile Optimized */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
          Control Center
        </h1>
        <p className="text-muted-foreground mt-1">Master your financial universe through precision tracking</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card border-primary/20 hover:border-primary/40 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground font-medium">Budget Used</div>
                <div className="text-2xl font-bold text-foreground">{budgetUtilization}%</div>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-xs text-primary">Active</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-primary/20 hover:border-primary/40 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                <PiggyBank className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground font-medium">Total Savings</div>
                <div className="text-2xl font-bold text-foreground">{formatINR(convertUSDToINR(10100))}</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-primary" />
                  <span className="text-xs text-primary">Growing</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-red-500/20 hover:border-red-500/40 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/20">
                <CreditCard className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground font-medium">Total Debt</div>
                <div className="text-2xl font-bold text-foreground">{formatINR(totalDebt)}</div>
                <div className="flex items-center gap-1 mt-1">
                  <AlertTriangle className="h-3 w-3 text-red-500" />
                  <span className="text-xs text-red-500">Monitor</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Tracking */}
      <Card className="glass-card border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Budget Matrix
          </CardTitle>
          <Button size="sm" className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20">
            <Plus className="h-4 w-4 mr-1" />
            Add Category
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {budgetCategories.map((category, index) => {
            const percentage = (category.spent / category.budgeted) * 100;
            const isOverBudget = percentage > 100;
            
            return (
              <div key={index} className="p-4 rounded-2xl glass-card border border-primary/10 hover:border-primary/30 transition-all duration-300">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">{category.category}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${isOverBudget ? 'text-red-500' : 'text-muted-foreground'}`}>
                        {formatINR(category.spent)} / {formatINR(category.budgeted)}
                      </span>
                      {isOverBudget && <AlertTriangle className="h-4 w-4 text-red-500 animate-pulse" />}
                    </div>
                  </div>
                  <Progress 
                    value={Math.min(percentage, 100)} 
                    className={`h-3 ${isOverBudget ? 'bg-red-500/20' : 'bg-primary/20'}`}
                  />
                  <div className="flex justify-between text-xs">
                    <span className={isOverBudget ? 'text-red-500 font-medium' : 'text-primary'}>{percentage.toFixed(1)}% used</span>
                    <span className="text-muted-foreground">{formatINR(category.budgeted - category.spent)} remaining</span>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Savings Goals */}
      <Card className="glass-card border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="flex items-center gap-2">
            <PiggyBank className="h-5 w-5 text-primary" />
            Wealth Objectives
          </CardTitle>
          <Button size="sm" className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20">
            <Plus className="h-4 w-4 mr-1" />
            Add Goal
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {savingsGoals.map((goal, index) => {
            const percentage = (goal.current / goal.target) * 100;
            const remaining = goal.target - goal.current;
            
            return (
              <div key={index} className="p-4 rounded-2xl glass-card border border-primary/10 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-foreground">{goal.name}</h3>
                    <Badge 
                      variant="secondary"
                      className={`text-xs ${
                        goal.priority === 'high' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                        goal.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                        'bg-primary/10 text-primary border-primary/20'
                      }`}
                    >
                      {goal.priority}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    {goal.deadline}
                  </span>
                </div>
                <div className="space-y-3">
                  <Progress value={percentage} className="h-3 bg-primary/20" />
                  <div className="flex justify-between text-sm">
                    <span className="text-primary font-medium">{formatINR(goal.current)} saved</span>
                    <span className="text-muted-foreground">{formatINR(remaining)} to go</span>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-primary" />
                      {percentage.toFixed(1)}% complete
                    </span>
                    <span>Target: {formatINR(goal.target)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Savings Progress Chart */}
      <Card className="glass-card border-primary/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Wealth Evolution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={savingsProgress}>
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
                formatter={(value) => [`${formatINR(value)}`, 'Savings']}
                contentStyle={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(0, 112, 243, 0.2)',
                  borderRadius: '12px',
                  color: '#1a1a1a'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#0070f3" 
                strokeWidth={3}
                dot={{ fill: '#0070f3', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#0070f3', strokeWidth: 2, fill: '#0070f3' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Debt Management */}
      <Card className="glass-card border-red-500/20">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-red-500" />
            Debt Elimination
          </CardTitle>
          <div className="text-sm text-muted-foreground px-3 py-1 rounded-full glass-card border border-red-500/20">
            Min. payments: {formatINR(totalMinPayments)}/month
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {debtAccounts.map((debt, index) => (
            <div key={index} className="p-4 rounded-2xl glass-card border border-red-500/10 hover:border-red-500/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">{debt.name}</h3>
                <span className="font-bold text-red-500 text-lg">{formatINR(debt.balance)}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div className="p-2 rounded-xl bg-red-500/5 border border-red-500/10">
                  <div className="text-muted-foreground mb-1">Min. Payment</div>
                  <div className="font-semibold text-foreground">{formatINR(debt.minPayment)}/month</div>
                </div>
                <div className="p-2 rounded-xl bg-red-500/5 border border-red-500/10">
                  <div className="text-muted-foreground mb-1">Interest Rate</div>
                  <div className="font-semibold text-red-500">{debt.interestRate}%</div>
                </div>
                <div className="col-span-2 p-2 rounded-xl bg-red-500/5 border border-red-500/10">
                  <div className="text-muted-foreground mb-1">Payoff Date</div>
                  <div className="font-semibold text-foreground flex items-center gap-1">
                    <Activity className="h-3 w-3 text-red-500" />
                    {debt.payoffDate}
                  </div>
                </div>
              </div>
              <Button size="sm" className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border-red-500/20">
                <Zap className="h-3 w-3 mr-1" />
                Make Extra Payment
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Financial Health Score */}
      <Card className="glass-card border-primary/20 bg-gradient-to-br from-primary/5 to-cyan-400/5">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Financial Health Matrix
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-40 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[{ value: 78 }, { value: 22 }]}
                    cx="50%"
                    cy="50%"
                    startAngle={90}
                    endAngle={450}
                    innerRadius={50}
                    outerRadius={70}
                    dataKey="value"
                    strokeWidth={2}
                    stroke="rgba(255, 255, 255, 0.8)"
                  >
                    <Cell fill="#0070f3" />
                    <Cell fill="rgba(0, 112, 243, 0.1)" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-primary">78</span>
                <span className="text-xs text-muted-foreground">SCORE</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl glass-card border border-primary/10">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
              <span className="text-sm text-foreground">Emergency fund: 65% complete</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl glass-card border border-primary/10">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
              <span className="text-sm text-foreground">Debt-to-income ratio: 24%</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl glass-card border border-yellow-500/20">
              <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 animate-pulse" />
              <span className="text-sm text-foreground">Savings rate: 33% (Good)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}