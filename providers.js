/**
 * Mock Cloud Provider Data
 * Contains sample metrics for different cloud providers
 */

const cloudProviders = {
  AWS: {
    name: "Amazon Web Services",
    price: 75,           // Lower is better (1-100 scale)
    efficiency: 92,      // Higher is better (1-100 scale)
    speed: 95,          // Higher is better (1-100 scale)
    reliability: 99.99, // Uptime percentage
    security: 92,
    scalability: 98,
    global_reach: 99,
    support: 90,
    service_variety: 98,
    ease_of_use: 80,
    sustainability: 70,
    description: "Market leader with comprehensive services"
  },
  Azure: {
    name: "Microsoft Azure",
    price: 78,
    efficiency: 88,
    speed: 90,
    reliability: 99.95,
    security: 90,
    scalability: 95,
    global_reach: 98,
    support: 88,
    service_variety: 95,
    ease_of_use: 78,
    sustainability: 68,
    description: "Strong enterprise integration and hybrid capabilities"
  },
  GCP: {
    name: "Google Cloud Platform",
    price: 72,
    efficiency: 94,
    speed: 93,
    reliability: 99.95,
    security: 91,
    scalability: 96,
    global_reach: 97,
    support: 85,
    service_variety: 94,
    ease_of_use: 82,
    sustainability: 75,
    description: "Excellent data analytics and AI/ML capabilities"
  },
  Oracle: {
    name: "Oracle Cloud",
    price: 60,
    efficiency: 90,
    speed: 92,
    reliability: 99.95,
    security: 94,
    scalability: 94,
    global_reach: 85,
    support: 86,
    service_variety: 88,
    ease_of_use: 70,
    sustainability: 60,
    description: "Enterprise-grade cloud with strong database and hybrid features"
  },
  Linode: {
    name: "Linode",
    price: 45,
    efficiency: 83,
    speed: 85,
    reliability: 99.9,
    security: 80,
    scalability: 70,
    global_reach: 65,
    support: 82,
    service_variety: 70,
    ease_of_use: 85,
    sustainability: 55,
    description: "Cost-effective with good performance"
  },
  IBM: {
    name: "IBM Cloud",
    price: 85,
    efficiency: 86,
    speed: 88,
    reliability: 99.9,
    security: 89,
    scalability: 90,
    global_reach: 80,
    support: 87,
    service_variety: 86,
    ease_of_use: 68,
    sustainability: 66,
    description: "Strong for enterprise and hybrid cloud solutions"
  }
};

module.exports = cloudProviders;
