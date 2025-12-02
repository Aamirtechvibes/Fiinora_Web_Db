# Design Document

## Overview

This design document outlines the implementation approach for personalizing the FIINORA financial application with INR currency support, user profile customization for "Aamir", and an enhanced AI assistant that provides personalized financial advice based on real user data.

The solution involves creating a centralized currency formatting system, updating user profile data, and implementing a financial context provider that enables the AI assistant to access and reference actual user financial data in its responses.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     FIINORA Application                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │   Currency   │    │     User     │    │  Financial   │  │
│  │   Utility    │    │   Profile    │    │   Context    │  │
│  │   Module     │    │   Module     │    │   Provider   │  │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘  │
│         │                   │                    │           │
│         └───────────────────┼────────────────────┘           │
│                             │                                │
│  ┌──────────────────────────┼────────────────────────────┐  │
│  │                          ▼                             │  │
│  │              Component Layer                           │  │
│  │  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐     │  │
│  │  │  Home  │  │ Wallet │  │Invest  │  │   AI   │     │  │
│  │  │  Page  │  │  Page  │  │  Page  │  │Assistant│    │  │
│  │  └────────┘  └────────┘  └────────┘  └────────┘     │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Component Relationships

1. **Currency Utility Module**: Standalone utility functions that format numbers to INR
2. **User Profile Module**: Manages user identity data (name, initials)
3. **Financial Context Provider**: Aggregates financial data from all pages
4. **AI Assistant**: Consumes financial context to generate personalized responses

## Components and Interfaces

### 1. Currency Utility Module

**Location**: `src/utils/currency.ts`

**Purpose**: Centralized currency formatting for consistent INR display across the application

**Interface**:
```typescript
// Format number to INR with symbol
export function formatINR(amount: number, options?: FormatOptions): string

// Format number with Indian numbering system (lakhs, crores)
export function formatIndianNumber(amount: number): string

// Convert USD to INR (for existing hardcoded values)
export function convertUSDToINR(usdAmount: number, rate?: number): number

interface FormatOptions {
  showSymbol?: boolean;      // Default: true
  useIndianFormat?: boolean; // Default: true
  decimals?: number;         // Default: 2
}
```

**Implementation Details**:
- Default conversion rate: 1 USD = 83 INR (configurable)
- Indian numbering: Uses lakhs (1,00,000) and crores (1,00,00,000) separators
- Symbol: ₹ (Indian Rupee symbol)

### 2. User Profile Module

**Location**: `src/config/userProfile.ts`

**Purpose**: Centralized user profile configuration

**Interface**:
```typescript
export interface UserProfile {
  name: string;
  initials: string;
  email?: string;
  avatar?: string;
}

export const currentUser: UserProfile = {
  name: "Aamir",
  initials: "AA",
  email: "aamir@example.com"
}

export function getUserInitials(name: string): string
```

### 3. Financial Context Provider

**Location**: `src/contexts/FinancialContext.tsx`

**Purpose**: Provides centralized access to user's financial data for AI assistant

**Interface**:
```typescript
export interface FinancialData {
  // Account balances
  accounts: Account[];
  totalBalance: number;
  totalAssets: number;
  totalLiabilities: number;
  
  // Income and expenses
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
  
  // Budget data
  budgetCategories: BudgetCategory[];
  budgetUtilization: number;
  
  // Investment data
  portfolio: PortfolioHolding[];
  portfolioValue: number;
  portfolioReturn: number;
  
  // Goals
  savingsGoals: SavingsGoal[];
  investmentGoals: InvestmentGoal[];
  
  // Debt
  debtAccounts: DebtAccount[];
  totalDebt: number;
}

export interface FinancialContextType {
  financialData: FinancialData;
  updateFinancialData: (data: Partial<FinancialData>) => void;
}

export const FinancialContext = React.createContext<FinancialContextType>()
export function useFinancialContext(): FinancialContextType
```

### 4. Enhanced AI Assistant Module

**Location**: `src/components/ai-assistant-page.tsx`

**Purpose**: Generate personalized financial responses using real user data

**Key Functions**:
```typescript
// Generate AI response based on user question and financial context
function generatePersonalizedResponse(
  question: string,
  financialData: FinancialData,
  userName: string
): string

// Extract relevant financial metrics for a given question
function getRelevantMetrics(
  question: string,
  financialData: FinancialData
): RelevantMetrics

// Format response with INR values and user name
function formatAIResponse(
  response: string,
  userName: string
): string
```

## Data Models

### Account Model
```typescript
interface Account {
  name: string;
  balance: number;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  change: number;
  bank: string;
  accountNumber: string;
  interest?: number;
  limit?: number;
  ytdReturn?: number;
}
```

### Budget Category Model
```typescript
interface BudgetCategory {
  category: string;
  budgeted: number;
  spent: number;
  color: string;
}
```

### Portfolio Holding Model
```typescript
interface PortfolioHolding {
  symbol: string;
  name: string;
  shares: number;
  currentPrice: number;
  totalValue: number;
  change: number;
  allocation: number;
}
```

### Savings Goal Model
```typescript
interface SavingsGoal {
  name: string;
  target: number;
  current: number;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
}
```

### Debt Account Model
```typescript
interface DebtAccount {
  name: string;
  balance: number;
  minPayment: number;
  interestRate: number;
  payoffDate: string;
}
```

## Implementation Strategy

### Phase 1: Currency System

1. Create `src/utils/currency.ts` with formatting functions
2. Update all components to use `formatINR()` instead of hardcoded `$` symbols
3. Convert existing USD values to INR equivalents
4. Update chart tooltips and axis formatters

**Files to Update**:
- `src/App.tsx` - Header balance display
- `src/components/wallet-page.tsx` - All monetary values
- `src/components/investment-page.tsx` - Portfolio values
- `src/components/personal-management-page.tsx` - Budget and savings
- `src/components/home-page.tsx` - Market data and quick stats
- `src/components/ai-assistant-page.tsx` - AI responses

### Phase 2: User Profile

1. Create `src/config/userProfile.ts` with user configuration
2. Update `src/App.tsx` header to use `currentUser.name` and `currentUser.initials`
3. Update `src/components/home-page.tsx` greeting to use `currentUser.name`

### Phase 3: Financial Context Provider

1. Create `src/contexts/FinancialContext.tsx`
2. Aggregate financial data from existing component state
3. Wrap application with `FinancialContextProvider` in `src/App.tsx`
4. Provide methods to access financial data

### Phase 4: Enhanced AI Assistant

1. Update `src/components/ai-assistant-page.tsx` to consume `FinancialContext`
2. Implement `generatePersonalizedResponse()` function
3. Create response templates that reference actual financial data
4. Update quick questions to be India-relevant
5. Format all AI responses with INR currency

## AI Response Generation Logic

### Response Template System

The AI assistant will use a template-based system with dynamic data injection:

```typescript
const responseTemplates = {
  budgeting: (data: FinancialData, userName: string) => `
    Hi ${userName}! Based on your current spending, you're using ${data.budgetUtilization}% 
    of your monthly budget. Your monthly income is ₹${formatINR(data.monthlyIncome)} and 
    expenses are ₹${formatINR(data.monthlyExpenses)}, giving you a savings rate of 
    ${data.savingsRate}%. ${generateBudgetAdvice(data)}
  `,
  
  savings: (data: FinancialData, userName: string) => `
    ${userName}, your emergency fund currently has ₹${formatINR(data.savingsGoals[0].current)} 
    out of your ₹${formatINR(data.savingsGoals[0].target)} goal. That's 
    ${((data.savingsGoals[0].current / data.savingsGoals[0].target) * 100).toFixed(1)}% complete! 
    ${generateSavingsAdvice(data)}
  `,
  
  investments: (data: FinancialData, userName: string) => `
    Your investment portfolio is worth ₹${formatINR(data.portfolioValue)}, ${userName}. 
    ${generateInvestmentAdvice(data)}
  `,
  
  debt: (data: FinancialData, userName: string) => `
    ${userName}, you have ₹${formatINR(data.totalDebt)} in total debt across 
    ${data.debtAccounts.length} accounts. ${generateDebtAdvice(data)}
  `
}
```

### Question Classification

The AI will classify questions into categories to select appropriate templates:

```typescript
function classifyQuestion(question: string): QuestionCategory {
  const keywords = {
    budgeting: ['budget', 'spending', 'expenses', 'save money'],
    savings: ['emergency fund', 'savings', 'save', 'goal'],
    investments: ['invest', 'portfolio', 'stocks', 'returns'],
    debt: ['debt', 'loan', 'credit card', 'pay off'],
    general: []
  }
  
  // Return category based on keyword matching
}
```

### India-Specific Quick Questions

```typescript
const quickQuestions = [
  "How can I optimize my budget for Indian expenses?",
  "What's the best way to build my emergency fund in INR?",
  "Should I invest in Indian stocks or mutual funds?",
  "How much should I save for retirement in India?",
  "What are good tax-saving investment options in India?"
]
```

## Error Handling

### Currency Conversion Errors
- Fallback to default conversion rate if custom rate fails
- Log warnings for invalid number inputs
- Display "N/A" for undefined values

### Financial Context Errors
- Provide default empty financial data if context is unavailable
- Gracefully handle missing data fields
- Show generic responses if personalized data is incomplete

### AI Response Errors
- Fallback to generic responses if template generation fails
- Validate financial data before injection into templates
- Handle edge cases (zero balances, negative values, etc.)

## Testing Strategy

### Unit Tests

1. **Currency Utility Tests**
   - Test INR formatting with various amounts
   - Test Indian numbering system (lakhs, crores)
   - Test USD to INR conversion
   - Test edge cases (zero, negative, very large numbers)

2. **Financial Context Tests**
   - Test data aggregation from multiple sources
   - Test context provider state updates
   - Test hook usage in components

3. **AI Response Generation Tests**
   - Test question classification
   - Test template rendering with real data
   - Test INR formatting in responses
   - Test user name injection

### Integration Tests

1. **End-to-End Currency Display**
   - Verify all pages show INR symbol
   - Verify Indian number formatting
   - Verify chart tooltips use INR

2. **AI Assistant Integration**
   - Verify AI accesses financial context
   - Verify responses include actual user data
   - Verify responses use user name
   - Verify all amounts in INR

### Manual Testing Checklist

- [ ] All monetary values display ₹ symbol
- [ ] Large numbers use Indian formatting (lakhs/crores)
- [ ] Header shows "Aamir" and "AA" initials
- [ ] AI assistant addresses user as "Aamir"
- [ ] AI responses reference actual account balances
- [ ] AI responses reference actual budget data
- [ ] AI responses reference actual investment portfolio
- [ ] Quick questions are India-relevant
- [ ] All AI response amounts in INR

## Performance Considerations

### Currency Formatting
- Memoize formatted values in components to avoid re-computation
- Use lightweight formatting functions (no heavy libraries)

### Financial Context
- Update context only when financial data changes
- Use React.memo for components consuming context
- Avoid unnecessary re-renders

### AI Response Generation
- Cache common responses
- Debounce user input to reduce computation
- Generate responses asynchronously

## Security Considerations

- Financial data remains client-side only
- No sensitive data sent to external APIs
- User profile data stored in configuration file only
- AI responses generated locally (no external AI service)

## Accessibility

- Ensure currency symbols are screen-reader friendly
- Maintain ARIA labels on all interactive elements
- Preserve keyboard navigation
- Maintain color contrast ratios for all text

## Future Enhancements

1. **Multi-Currency Support**: Allow users to switch between INR, USD, EUR
2. **Real-Time Exchange Rates**: Fetch live conversion rates
3. **Advanced AI**: Integrate with actual AI service for more sophisticated responses
4. **User Preferences**: Allow users to customize number formatting
5. **Multiple User Profiles**: Support switching between different users
6. **Historical Data**: Track financial changes over time for better AI insights
