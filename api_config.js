/**
 * API Configuration
 * Define endpoints and configuration for real-time cloud data fetching.
 */

module.exports = {
    // Example structure - to be updated with your provided APIs
    endpoints: {
        pricing: process.env.PRICING_API_URL || '',
        status: process.env.STATUS_API_URL || '',
        latency: process.env.LATENCY_API_URL || ''
    },
    timeout: 5000 // 5 seconds timeout for real-time checks
};