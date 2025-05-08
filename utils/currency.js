// GEL to USD conversion rate (you should update this regularly or use an API)
const GEL_TO_USD_RATE = 0.37; // 1 GEL = 0.37 USD (approximate rate)

export const convertGelToUsd = (gelAmount) => {
    return (gelAmount * GEL_TO_USD_RATE).toFixed(2);
};

export const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}; 