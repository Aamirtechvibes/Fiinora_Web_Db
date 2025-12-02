/**
 * Currency utility functions for INR formatting
 */

/**
 * Formats a number as Indian Rupees with ₹ symbol
 * @param amount - The amount to format
 * @param decimals - Number of decimal places (default: 0)
 * @returns Formatted INR string
 */
export function formatINR(amount: number, decimals: number = 0): string {
  return `₹${formatIndianNumber(amount, decimals)}`;
}

/**
 * Formats a number in Indian numbering system (lakhs and crores)
 * @param amount - The amount to format
 * @param decimals - Number of decimal places (default: 0)
 * @returns Formatted number string
 */
export function formatIndianNumber(amount: number, decimals: number = 0): string {
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  
  // Format with specified decimals
  const fixed = absAmount.toFixed(decimals);
  const [integerPart, decimalPart] = fixed.split('.');
  
  // Indian numbering: last 3 digits, then groups of 2
  let formatted = '';
  const len = integerPart.length;
  
  if (len <= 3) {
    formatted = integerPart;
  } else {
    // Last 3 digits
    formatted = integerPart.slice(-3);
    let remaining = integerPart.slice(0, -3);
    
    // Groups of 2 from right to left
    while (remaining.length > 0) {
      if (remaining.length <= 2) {
        formatted = remaining + ',' + formatted;
        remaining = '';
      } else {
        formatted = remaining.slice(-2) + ',' + formatted;
        remaining = remaining.slice(0, -2);
      }
    }
  }
  
  // Add decimal part if exists
  if (decimalPart) {
    formatted += '.' + decimalPart;
  }
  
  return (isNegative ? '-' : '') + formatted;
}

/**
 * Converts USD to INR using a conversion rate
 * @param usdAmount - Amount in USD
 * @param conversionRate - USD to INR conversion rate (default: 83)
 * @returns Amount in INR
 */
export function convertUSDToINR(usdAmount: number, conversionRate: number = 83): number {
  return usdAmount * conversionRate;
}
