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
  },
  {
    name: "Oracle Cloud",
    description: "Enterprise-grade cloud with strong database capabilities and competitive pricing.",
    scores: { price: 60, efficiency: 90, speed: 92, reliability: 99, security: 94, scalability: 94, global_reach: 85, support: 86, service_variety: 88, ease_of_use: 70, sustainability: 60 }
  },
  {
    name: "Alibaba Cloud",
    description: "The leading cloud provider in Asia, offering massive scalability for e-commerce and global business.",
    scores: { price: 65, efficiency: 88, speed: 90, reliability: 98, security: 88, scalability: 99, global_reach: 90, support: 80, service_variety: 92, ease_of_use: 75, sustainability: 75 }
  },
  {
    name: "IBM Cloud",
    description: "Ideal for hybrid cloud environments, AI integration, and enterprise-grade security.",
    scores: { price: 85, efficiency: 86, speed: 88, reliability: 99, security: 98, scalability: 90, global_reach: 80, support: 87, service_variety: 86, ease_of_use: 68, sustainability: 66 }
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
      scores: winner.details.scores
    },
    score: winner.score,
    reasoning: `Based on your selected criteria, ${winner.provider} offers the best balance.`,
    allScores: results.map(r => ({ 
      provider: r.provider.split(' ')[0], // Short name
      score: r.score,
      scores: r.details.scores, // Pass individual scores for details view
      description: r.details.description
    }))
  };
}

module.exports = { analyzeBestProvider };
