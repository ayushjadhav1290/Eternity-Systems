/**
 * Cloud Provider Analyzer
 * Logic for scoring and selecting the best cloud provider based on criteria
 */

const PROVIDERS = [
  {
    name: "AWS (Amazon Web Services)",
    description: "The leading cloud provider with the most extensive set of services, ideal for your high-performance needs.",
    scores: { price: 65, efficiency: 85, speed: 95, reliability: 99, security: 95, scalability: 98, global_reach: 99, support: 90, service_variety: 100, ease_of_use: 70, sustainability: 80 }
  },
  {
    name: "Google Cloud Platform",
    description: "Known for high-performance data analytics and AI capabilities, with a strong global network.",
    scores: { price: 70, efficiency: 90, speed: 92, reliability: 98, security: 94, scalability: 95, global_reach: 95, support: 85, service_variety: 90, ease_of_use: 75, sustainability: 95 }
  },
  {
    name: "Microsoft Azure",
    description: "Excellent for enterprise integration and hybrid cloud environments.",
    scores: { price: 68, efficiency: 88, speed: 90, reliability: 97, security: 96, scalability: 96, global_reach: 96, support: 88, service_variety: 95, ease_of_use: 72, sustainability: 85 }
  },
  {
    name: "DigitalOcean",
    description: "Simple, developer-friendly cloud computing, great for startups and small-to-medium projects.",
    scores: { price: 90, efficiency: 80, speed: 85, reliability: 95, security: 85, scalability: 80, global_reach: 70, support: 80, service_variety: 60, ease_of_use: 95, sustainability: 75 }
  }
];

function analyzeBestProvider(criteria) {
  // Calculate scores
  const results = PROVIDERS.map(provider => {
    let totalScore = 0;
    let totalWeight = 0;
    
    for (const [key, weight] of Object.entries(criteria)) {
      if (provider.scores[key] !== undefined) {
        // Normalize weight (0-100) to 0-1 range for calculation
        const w = weight / 100;
        totalScore += provider.scores[key] * w;
        totalWeight += w;
      }
    }
    
    // Avoid division by zero
    const finalScore = totalWeight > 0 ? totalScore / totalWeight : 0;
    
    return {
      provider: provider.name,
      score: parseFloat(finalScore.toFixed(1)),
      details: provider
    };
  });
  
  // Sort by score descending
  results.sort((a, b) => b.score - a.score);
  
  const winner = results[0];
  
  return {
    success: true,
    providerDetails: {
      name: winner.details.name,
      description: winner.details.description,
      price: winner.details.scores.price,
      efficiency: winner.details.scores.efficiency,
      speed: winner.details.scores.speed,
      reliability: winner.details.scores.reliability
    },
    score: winner.score,
    reasoning: `Based on your selected criteria, ${winner.provider} offers the best balance.`,
    allScores: results.map(r => ({ 
      provider: r.provider.split(' ')[0], // Short name
      score: r.score 
    }))
  };
}

module.exports = { analyzeBestProvider };
