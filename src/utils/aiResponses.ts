import { FinancialData } from '../contexts/FinancialContext';
import { formatINR } from './currency';

export function generatePersonalizedResponse(
  question: string,
  financialData: FinancialData,
  userName: string
): string {
  const questionLower = question.toLowerCase();
  
  // Calculate financial metrics
  const totalBudgeted = financialData.budgetCategories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalSpent = financialData.budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const budgetUtilization = ((totalSpent / totalBudgeted) * 100).toFixed(1);
  
  const totalDebt = financialData.debtAccounts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalMinPayments = financialData.debtAccounts.reduce((sum, debt) => sum + debt.minPayment, 0);
  
  const totalSavings = financialData.savingsGoals.reduce((sum, goal) => sum + goal.current, 0);
  const totalSavingsTarget = financialData.savingsGoals.reduce((sum, goal) => sum + goal.target, 0);
  
  const portfolioValue = financialData.portfolioHoldings.reduce((sum, holding) => sum + holding.totalValue, 0);
  
  const savingsRate = ((financialData.monthlyIncome - financialData.monthlyExpenses) / financialData.monthlyIncome * 100).toFixed(1);
  
  // Budgeting questions
  if (questionLower.includes('budget') || questionLower.includes('spending')) {
    const overBudgetCategories = financialData.budgetCategories.filter(
      cat => (cat.spent / cat.budgeted) > 1
    );
    
    let response = `Hi ${userName}! Looking at your budget, you're currently using ${budgetUtilization}% of your monthly budget (${formatINR(totalSpent)} out of ${formatINR(totalBudgeted)}). `;
    
    if (overBudgetCategories.length > 0) {
      response += `I notice you're over budget in ${overBudgetCategories[0].category} by ${formatINR(overBudgetCategories[0].spent - overBudgetCategories[0].budgeted)}. `;
      response += `Consider reducing discretionary spending in this category next month. `;
    } else {
      response += `Great job staying within budget across all categories! `;
    }
    
    response += `Your savings rate of ${savingsRate}% is ${parseFloat(savingsRate) > 20 ? 'excellent' : 'good'}. Keep up the disciplined approach!`;
    return response;
  }
  
  // Savings questions
  if (questionLower.includes('save') || questionLower.includes('savings') || questionLower.includes('emergency fund')) {
    const emergencyFund = financialData.savingsGoals.find(goal => goal.name.toLowerCase().includes('emergency'));
    
    let response = `${userName}, your total savings currently stand at ${formatINR(totalSavings)}. `;
    
    if (emergencyFund) {
      const percentage = ((emergencyFund.current / emergencyFund.target) * 100).toFixed(1);
      response += `Your emergency fund is ${percentage}% complete with ${formatINR(emergencyFund.current)} saved towards your ${formatINR(emergencyFund.target)} goal. `;
      
      if (parseFloat(percentage) < 100) {
        const remaining = emergencyFund.target - emergencyFund.current;
        const monthsToGoal = Math.ceil(remaining / (financialData.monthlyIncome - financialData.monthlyExpenses));
        response += `At your current savings rate, you'll reach your goal in approximately ${monthsToGoal} months. `;
      }
    }
    
    response += `I recommend maintaining 3-6 months of expenses (${formatINR(financialData.monthlyExpenses * 3)} to ${formatINR(financialData.monthlyExpenses * 6)}) in your emergency fund before increasing other investments.`;
    return response;
  }
  
  // Investment questions
  if (questionLower.includes('invest') || questionLower.includes('portfolio') || questionLower.includes('stock')) {
    let response = `${userName}, your investment portfolio is currently valued at ${formatINR(portfolioValue)}. `;
    
    const topHolding = financialData.portfolioHoldings.reduce((max, holding) => 
      holding.totalValue > max.totalValue ? holding : max
    );
    
    response += `Your largest holding is ${topHolding.symbol} at ${formatINR(topHolding.totalValue)} (${topHolding.allocation}% of portfolio). `;
    
    const positiveHoldings = financialData.portfolioHoldings.filter(h => h.change > 0).length;
    response += `Currently, ${positiveHoldings} out of ${financialData.portfolioHoldings.length} holdings are showing positive returns. `;
    
    response += `For Indian markets, consider diversifying across sectors and including some debt funds for stability. Your current allocation looks good, but review it quarterly to rebalance.`;
    return response;
  }
  
  // Debt questions
  if (questionLower.includes('debt') || questionLower.includes('loan') || questionLower.includes('credit card')) {
    let response = `${userName}, your total debt stands at ${formatINR(totalDebt)} with minimum monthly payments of ${formatINR(totalMinPayments)}. `;
    
    const highestInterestDebt = financialData.debtAccounts.reduce((max, debt) => 
      debt.interestRate > max.interestRate ? debt : max
    );
    
    response += `Your highest interest debt is ${highestInterestDebt.name} at ${highestInterestDebt.interestRate}% APR with a balance of ${formatINR(highestInterestDebt.balance)}. `;
    response += `I recommend using the avalanche method: focus on paying off this high-interest debt first while making minimum payments on others. `;
    
    const extraPayment = (financialData.monthlyIncome - financialData.monthlyExpenses) * 0.3;
    response += `Consider allocating ${formatINR(extraPayment)} extra per month to accelerate debt payoff.`;
    return response;
  }
  
  // Credit score questions
  if (questionLower.includes('credit score') || questionLower.includes('cibil')) {
    return `${userName}, to improve your credit score: 1) Pay all bills on time - this is the most important factor, 2) Keep credit utilization below 30% (you currently have ${formatINR(Math.abs(financialData.accounts.find(a => a.type === 'credit')?.balance || 0))} on credit cards), 3) Don't close old credit accounts, 4) Monitor your CIBIL report regularly, and 5) Avoid multiple credit inquiries. Based on your current debt of ${formatINR(totalDebt)}, focus on paying down your ${financialData.debtAccounts[0].name} first.`;
  }
  
  // Retirement questions
  if (questionLower.includes('retire') || questionLower.includes('pension')) {
    return `${userName}, for retirement planning in India: 1) Maximize your EPF contributions, 2) Consider NPS for additional tax benefits under 80CCD, 3) Invest in PPF for guaranteed returns, 4) Build a diversified portfolio with equity mutual funds for long-term growth, and 5) Aim to save at least 15-20% of income. Your current savings rate of ${savingsRate}% is ${parseFloat(savingsRate) >= 15 ? 'excellent' : 'good, but could be improved'}. With your monthly income of ${formatINR(financialData.monthlyIncome)}, consider increasing retirement contributions.`;
  }
  
  // Default response with personalized data
  return `That's a great question, ${userName}! Based on your financial profile: You have ${formatINR(portfolioValue)} in investments, ${formatINR(totalSavings)} in savings goals, and ${formatINR(totalDebt)} in debt. Your monthly income is ${formatINR(financialData.monthlyIncome)} with expenses of ${formatINR(financialData.monthlyExpenses)}, giving you a healthy ${savingsRate}% savings rate. I'd recommend reviewing your budget allocation and considering diversification strategies. Your current financial health is strong - keep up the disciplined approach!`;
}
