/**
 * Cloud Provider Analyzer
 * Handles the logic for selecting the best provider based on user criteria
 */

const cloudProviders = require('./providers');

/**
 * Normalize a metric to 0-100 scale
 * @param {number} value - The value to normalize
 * @param {number} max - Maximum value for normalization
 * @returns {number} Normalized value
 */
function normalizeMetric(value, max = 100) {
  return Math.min(100, (value / max) * 100);
}

/**
 * Calculate a score for a provider based on user weights
 * @param {object} provider - Provider data
 * @param {object} weights - User weights for each criteria
 * @returns {number} Total weighted score
 */
function calculateScore(provider, weights) {
  // Generic scoring: iterate provided weights and compute weighted components.
  let totalWeight = 0;
  let weightedSum = 0;

  for (const [key, weight] of Object.entries(weights)) {
    const w = Number(weight) || 0;
    if (w <= 0) continue;
    totalWeight += w;

    // Determine provider metric value (default neutral 50 if missing)
    let metricValue = 50;
    if (provider.hasOwnProperty(key) && provider[key] != null) {
      metricValue = provider[key];
    }

    // Special handling
    if (key === 'price') {
      // lower price is better
      metricValue = 100 - metricValue;
    }

    if (key === 'reliability') {
      // reliability is percentage like 99.95 -> normalize to 0-100
      metricValue = normalizeMetric(metricValue, 100);
    }

    // Clamp metricValue to 0-100
    metricValue = Math.max(0, Math.min(100, metricValue));

    weightedSum += metricValue * w;
  }

  if (totalWeight === 0) return 0;
  return weightedSum / totalWeight;
}

/**
 * Analyze and return the best cloud provider
 * @param {object} criteria - User selection criteria with weights
 * @returns {object} Analysis result with best provider and reasoning
 */
function analyzeBestProvider(criteria) {
  // Validate input
  if (!criteria || typeof criteria !== 'object') {
    return {
      success: false,
      error: 'Invalid criteria provided'
    };
  }

  // Normalize weights if provided as percentages
  const weights = {};
  const allowedMetrics = [
    'price', 'efficiency', 'speed', 'reliability', 'security', 
    'scalability', 'global_reach', 'support', 'service_variety', 
    'ease_of_use', 'sustainability'
  ];

  for (const key of allowedMetrics) {
    if (criteria[key]) {
      weights[key] = Number(criteria[key]);
    }
  }

  // Ensure at least one weight is provided
  const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0);
  if (totalWeight === 0) {
    return {
      success: false,
      error: 'Please select at least one criteria'
    };
  }

  // Score all providers
  const scores = {};
  for (const [key, provider] of Object.entries(cloudProviders)) {
    scores[key] = {
      provider,
      score: calculateScore(provider, weights)
    };
  }

  // Find the best provider
  let bestProvider = null;
  let bestScore = -1;

  for (const [key, data] of Object.entries(scores)) {
    if (data.score > bestScore) {
      bestScore = data.score;
      bestProvider = key;
    }
  }

  // Generate reasoning
  const reasoning = generateReasoning(bestProvider, weights, scores);

  return {
    success: true,
    bestProvider: bestProvider,
    providerDetails: cloudProviders[bestProvider],
    score: bestScore,
    reasoning: reasoning,
    allScores: Object.entries(scores).map(([key, data]) => ({
      provider: key,
      score: data.score.toFixed(2)
    })).sort((a, b) => b.score - a.score)
  };
}

/**
 * Generate human-readable reasoning for the selection
 * @param {string} bestProvider - The selected provider
 * @param {object} weights - User weights
 * @param {object} scores - All provider scores
 * @returns {string} Reasoning text
 */
function generateReasoning(bestProvider, weights, scores) {
  const reasons = [];
  const provider = cloudProviders[bestProvider];

  for (const [key, weight] of Object.entries(weights)) {
    const w = Number(weight) || 0;
    if (w <= 0) continue;

    switch (key) {
      case 'price':
        reasons.push(`Price consideration: ${provider.name} offers pricing at ${provider.price}/100`);
        break;
      case 'efficiency':
        reasons.push(`Efficiency: ${provider.name} has an efficiency rating of ${provider.efficiency}/100`);
        break;
      case 'speed':
        reasons.push(`Performance: ${provider.name} delivers speed ${provider.speed}/100`);
        break;
      case 'reliability':
        reasons.push(`Reliability: ${provider.name} guarantees ${provider.reliability}% uptime`);
        break;
      default:
        // Generic message for other keys
        if (provider[key] != null) {
          reasons.push(`${key.replace(/_/g, ' ')}: ${provider.name} scores ${provider[key]}/100`);
        }
        break;
    }
  }

  // Always include the provider description
  reasons.push(`${provider.description}`);

  return reasons.join(' | ');
}

module.exports = {
  analyzeBestProvider,
  calculateScore
};
