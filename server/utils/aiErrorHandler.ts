import {
  APICallError,
  RetryError,
  NoObjectGeneratedError,
} from "ai";

export interface ClassifiedError {
  statusCode: number;
  statusMessage: string;
}

export function classifyAiError(err: unknown): ClassifiedError {
  // Timeout / abort
  if (err instanceof Error && err.name === "TimeoutError") {
    return {
      statusCode: 504,
      statusMessage:
        "The AI model took too long to respond. Please try again.",
    };
  }
  if (err instanceof DOMException && err.name === "AbortError") {
    return {
      statusCode: 504,
      statusMessage: "Request was aborted due to timeout. Please try again.",
    };
  }

  // Schema validation failure — AI returned data that doesn't match
  if (NoObjectGeneratedError.isInstance(err)) {
    return {
      statusCode: 422,
      statusMessage:
        "The AI generated an invalid theme structure. Please try a different prompt.",
    };
  }

  // All retries exhausted
  if (RetryError.isInstance(err)) {
    const lastErr = err.lastError;
    const innerStatus =
      lastErr && typeof lastErr === "object" && "status" in lastErr
        ? (lastErr as { status?: number }).status
        : undefined;

    if (innerStatus === 429) {
      return {
        statusCode: 429,
        statusMessage:
          "AI provider rate limit exceeded after retries. Please wait a moment and try again.",
      };
    }

    return {
      statusCode: 502,
      statusMessage:
        "The AI service is temporarily unavailable after multiple attempts. Please try again shortly.",
    };
  }

  // API-level errors from the provider
  if (APICallError.isInstance(err)) {
    const status = err.statusCode;

    if (status === 401) {
      return {
        statusCode: 401,
        statusMessage:
          "Invalid API key. Please check your key and try again.",
      };
    }

    if (status === 403) {
      return {
        statusCode: 403,
        statusMessage:
          "Access denied by AI provider. Your key may lack permissions for this model.",
      };
    }

    if (status === 429) {
      return {
        statusCode: 429,
        statusMessage:
          "AI provider rate limit or quota exceeded. Please check your plan and billing details.",
      };
    }

    if (status === 503 || status === 502) {
      return {
        statusCode: 502,
        statusMessage:
          "The AI model is temporarily overloaded. Please try again in a few seconds.",
      };
    }

    // Content filtering
    if (
      err.message?.includes("content_filter") ||
      err.message?.includes("content management policy")
    ) {
      return {
        statusCode: 400,
        statusMessage:
          "Your prompt was flagged by the AI provider's content filter. Please rephrase and try again.",
      };
    }
  }

  // Fallback: extract whatever info we can
  const error = err as {
    status?: number;
    statusCode?: number;
    message?: string;
    code?: string;
  };
  const status = error.status || error.statusCode || 500;
  const code = error.code || "";
  const message = error.message || "";

  if (status === 401 || code === "invalid_api_key") {
    return {
      statusCode: 401,
      statusMessage: "Invalid API key. Please check your key and try again.",
    };
  }

  if (
    status === 429 ||
    message.includes("exceeded your current quota") ||
    message.includes("rate limit") ||
    message.includes("billing")
  ) {
    return {
      statusCode: 429,
      statusMessage:
        "AI provider rate limit or quota exceeded. Please check your plan and billing details.",
    };
  }

  if (status === 403) {
    return {
      statusCode: 403,
      statusMessage:
        "Access denied by AI provider. Your key may lack permissions for this model.",
    };
  }

  // Include a sanitized hint of the actual error for debugging
  const hint =
    message.length > 0 && message.length < 200 ? ` (${message})` : "";
  return {
    statusCode: status >= 400 && status < 600 ? status : 500,
    statusMessage: `Failed to generate theme. Please try again.${hint}`,
  };
}
