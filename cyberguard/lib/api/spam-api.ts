/**
 * Spam Email Detection API Integration
 *
 * This module provides integration with external spam detection APIs
 * for email analysis, phishing detection, and threat intelligence.
 */

// Types for API responses and requests
export interface EmailAnalysisRequest {
  subject?: string
  sender?: string
  content: string
  headers?: string
  analysisOptions?: {
    checkPhishing: boolean
    checkSpam: boolean
    checkMalware: boolean
    checkSenderReputation: boolean
  }
}

export interface EmailAnalysisResponse {
  analysisId: string
  status: "completed" | "failed" | "processing"
  result?: {
    isClean: boolean
    isSpam: boolean
    isPhishing: boolean
    isSuspicious: boolean
    confidence: number
    category?: string
    indicators?: {
      type: string
      description: string
      severity: "high" | "medium" | "low"
    }[]
    links?: {
      url: string
      status: "malicious" | "suspicious" | "safe"
    }[]
    senderReputation?: {
      score: number
      domain: string
      knownMalicious: boolean
      firstSeen?: string
    }
    recommendation?: string
  }
  error?: string
}

// API configuration
const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_SPAM_API_URL || "http://127.0.0.1:8000"   // "https://api.emailsecurity.example",
  // apiKey: process.env.SPAM_API_KEY || "",
  // timeout: 15000, // 15 seconds
}

/**
 * Analyzes an email for spam, phishing, and other threats
 */
export async function analyzeEmail(emailData: EmailAnalysisRequest): Promise<EmailAnalysisResponse> {
  console.log("emailData", JSON.stringify(emailData))
  try {
    // Make API request
    // const response = await fetch(`${API_CONFIG.baseUrl}/analyze`, {
    const response = await fetch(`${API_CONFIG.baseUrl}/predict_spam`, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${API_CONFIG.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({message: emailData.content}),
      // body: JSON.stringify(emailData),
      // signal: AbortSignal.timeout(API_CONFIG.timeout),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to analyze email")
    }

    const json =  await response.json()
    console.log("received response: ", json)

    return await json
  } catch (error) {
    console.error("Error analyzing email:", error)
    return {
      analysisId: `error-${Date.now()}`,
      status: "failed",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

/**
 * Checks the status of an ongoing email analysis
 */
export async function checkEmailAnalysisStatus(analysisId: string): Promise<EmailAnalysisResponse> {
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}/status/${analysisId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_CONFIG.apiKey}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(API_CONFIG.timeout),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to check analysis status")
    }

    return await response.json()
  } catch (error) {
    console.error("Error checking analysis status:", error)
    return {
      analysisId,
      status: "failed",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

/**
 * Checks a URL for phishing or malicious content
 */
export async function checkUrl(url: string): Promise<any> {
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}/url/check`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_CONFIG.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
      signal: AbortSignal.timeout(API_CONFIG.timeout),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to check URL")
    }

    return await response.json()
  } catch (error) {
    console.error("Error checking URL:", error)
    throw error
  }
}

/**
 * Gets spam detection statistics
 */
export async function getSpamStats(timeframe: "day" | "week" | "month" = "day"): Promise<any> {
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}/stats?timeframe=${timeframe}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_CONFIG.apiKey}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(API_CONFIG.timeout),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to fetch spam statistics")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching spam statistics:", error)
    throw error
  }
}

