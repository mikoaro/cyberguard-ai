/**
 * API Configuration
 *
 * This module provides configuration for API integrations.
 * Update these values in your .env file.
 */

// Malware Detection API Configuration
export const MALWARE_API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_MALWARE_API_URL || "https://api.malwaredetection.example",
  apiKey: process.env.MALWARE_API_KEY || "",
  timeout: 30000, // 30 seconds
  // Flag to determine if we should use mock data (for development/testing)
  useMockData: process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true" || !process.env.NEXT_PUBLIC_MALWARE_API_URL,
}

// Spam Detection API Configuration
export const SPAM_API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_SPAM_API_URL || "https://api.emailsecurity.example",
  apiKey: process.env.SPAM_API_KEY || "",
  timeout: 15000, // 15 seconds
  // Flag to determine if we should use mock data (for development/testing)
  useMockData: process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true" || !process.env.NEXT_PUBLIC_SPAM_API_URL,
}

// Environment variables needed for API integration
export const REQUIRED_ENV_VARS = [
  {
    name: "MALWARE_API_KEY",
    description: "API key for the malware detection service",
    isSecret: true,
  },
  {
    name: "NEXT_PUBLIC_MALWARE_API_URL",
    description: "URL for the malware detection API",
    isSecret: false,
    defaultValue: "https://api.malwaredetection.example",
  },
  {
    name: "SPAM_API_KEY",
    description: "API key for the spam detection service",
    isSecret: true,
  },
  {
    name: "NEXT_PUBLIC_SPAM_API_URL",
    description: "URL for the spam detection API",
    isSecret: false,
    defaultValue: "https://api.emailsecurity.example",
  },
  {
    name: "NEXT_PUBLIC_USE_MOCK_DATA",
    description: "Set to 'true' to use mock data instead of real API calls (for development/testing)",
    isSecret: false,
    defaultValue: "true",
  },
]

