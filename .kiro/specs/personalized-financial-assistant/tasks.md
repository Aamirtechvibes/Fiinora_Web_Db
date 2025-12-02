# Implementation Plan

- [ ] 1. Create currency utility module for INR formatting
  - Create `src/utils/currency.ts` file with INR formatting functions
  - Implement `formatINR()` function that converts numbers to INR format with ₹ symbol
  - Implement `formatIndianNumber()` function for lakhs and crores formatting
  - Implement `convertUSDToINR()` function with default conversion rate of 83
  - _Requirements: 1.1, 1.2, 1.3_

- [ ] 2. Create user profile configuration module
  - Create `src/config/userProfile.ts` file with user profile interface
  - Define `UserProfile` interface with name, initials, email fields
  - Export `currentUser` constant with name "Aamir" and initials "AA"
  - Implement `getUserInitials()` helper function
  - _Requirements: 2.1, 2.2_

- [ ] 3. Update App.tsx header with user profile
  - Import `currentUser` from user profile module
  - Replace hardcoded "JD" initials with `currentUser.initials` ("AA")
  - Update user display to show `currentUser.name` ("Aamir")
  - Verify header styling remains consistent
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ] 4. Update Wallet page with INR currency
  - Import `formatINR` utility function
  - Replace all `$` symbols with `formatINR()` calls for monetary values
  - Convert hardcoded USD amounts to INR using conversion rate
  - Update chart axis formatters to use INR formatting
  - Update chart tooltips to display INR symbol
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ] 5. Update Investment page with INR currency
  - Import `formatINR` utility function
  - Replace all `$` symbols with `formatINR()` calls for portfolio values
  - Convert stock prices and holdings to INR
  - Update chart formatters for INR display
  - Update AI recommendation prices to INR
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ] 6. Update Personal Management page with INR currency
  - Import `formatINR` utility function
  - Replace all `$` symbols with `formatINR()` calls in budget categories
  - Convert savings goals amounts to INR
  - Convert debt account balances to INR
  - Update chart formatters for INR display
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ] 7. Update Home page with INR currency and user name
  - Import `formatINR` utility and `currentUser` from config
  - Replace `userName` variable with `currentUser.name`
  - Replace all `$` symbols with `formatINR()` calls
  - Convert market data values to INR
  - Update greeting to use `currentUser.name`
  - _Requirements: 1.1, 1.2, 1.3, 1.5, 2.4_

- [ ] 8. Create Financial Context Provider
  - Create `src/contexts/FinancialContext.tsx` file
  - Define `FinancialData` interface with all financial metrics
  - Define `Account`, `BudgetCategory`, `PortfolioHolding`, `SavingsGoal`, `DebtAccount` interfaces
  - Implement `FinancialContextProvider` component
  - Implement `useFinancialContext` custom hook
  - Create initial financial data state with values from existing components
  - _Requirements: 3.1, 3.2_

- [ ] 9. Integrate Financial Context Provider in App
  - Import `FinancialContextProvider` in `src/App.tsx`
  - Wrap main application content with `FinancialContextProvider`
  - Ensure context is available to all child components
  - _Requirements: 3.1_

- [ ] 10. Enhance AI Assistant with personalized responses
- [ ] 10.1 Update AI Assistant to consume Financial Context
  - Import `useFinancialContext` hook in AI Assistant component
  - Import `currentUser` from user profile config
  - Access financial data from context in AI Assistant
  - _Requirements: 3.1, 3.6_

- [ ] 10.2 Implement personalized response generation
  - Create `generatePersonalizedResponse()` function that takes question, financial data, and user name
  - Implement question classification logic to categorize user questions
  - Create response templates for budgeting, savings, investments, and debt questions
  - Inject actual financial data values into response templates
  - Format all monetary values in responses using `formatINR()`
  - Include user name "Aamir" in responses for personalization
  - _Requirements: 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 4.1, 4.2, 4.5_

- [ ] 10.3 Update quick questions for Indian context
  - Replace existing quick questions with India-relevant financial questions
  - Update questions to reference INR and Indian financial concepts
  - Ensure questions align with common Indian financial planning topics
  - _Requirements: 3.8_

- [ ] 10.4 Update mock responses with personalized data
  - Modify `mockResponses` object to use `generatePersonalizedResponse()`
  - Remove hardcoded generic responses
  - Ensure responses reference actual user financial data from context
  - Verify responses address user as "Aamir"
  - Verify all amounts display in INR format
  - _Requirements: 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 11. Update AI Assistant insights cards with INR
  - Import `formatINR` utility in AI Assistant component
  - Replace `$` symbols in Real-time Financial Intelligence cards
  - Convert hardcoded USD values to INR
  - Ensure insight cards display INR consistently
  - _Requirements: 1.5, 3.7_

- [ ] 12. Verify INR formatting across all pages
  - Manually test Home page for INR display
  - Manually test Wallet page for INR display
  - Manually test Investment page for INR display
  - Manually test Personal Management page for INR display
  - Manually test AI Assistant page for INR display
  - Verify charts and tooltips show INR symbol
  - _Requirements: 1.1, 1.4, 1.5_

- [ ] 13. Verify user personalization
  - Verify header shows "Aamir" and "AA" initials
  - Verify Home page greeting uses "Aamir"
  - Verify AI Assistant addresses user as "Aamir"
  - Verify personalization is consistent across all pages
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 3.6_

- [ ] 14. Verify AI personalized responses
  - Test AI Assistant with budgeting questions and verify it references actual budget data
  - Test AI Assistant with savings questions and verify it references actual savings goals
  - Test AI Assistant with investment questions and verify it references actual portfolio
  - Test AI Assistant with debt questions and verify it references actual debt accounts
  - Verify all AI responses use INR currency
  - Verify AI responses provide specific numerical recommendations
  - _Requirements: 3.2, 3.3, 3.4, 3.5, 3.7, 4.1, 4.2, 4.3, 4.4, 4.5_
