"use client";
import { useState } from "react";

interface ApiResponse {
  message?: string;
  error?: string;
  data?: string;
}

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export default function Form() {
  const [inputValue, setInputValue] = useState<string>("");
  const [response, setResponse] = useState<ApiResponse>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  const URL_SHORTENER_API_ENDPOINT =
    process.env.NEXT_PUBLIC_URL_SHORTENER_API_ENDPOINT;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidUrl(inputValue)) {
      setResponse({ error: "Please enter a valid URL" });
      return;
    }

    setIsLoading(true);
    setResponse({});

    try {
      const apiResponse = await fetch(URL_SHORTENER_API_ENDPOINT as string, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl: inputValue }),
      });

      if (!apiResponse.ok) {
        throw new Error("Network response was not okay");
      }

      const result = await apiResponse.json();

      setResponse({
        data: result.data?.shortUrl,
        message: result.message,
        error: result.error?.message,
      });
    } catch (error) {
      setResponse({
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (response.data) {
      navigator.clipboard.writeText(
        `${URL_SHORTENER_API_ENDPOINT}/${response.data}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  let output: string | undefined;

  if (response.error) {
    output = response.error;
  } else if (response.data) {
    output = `Your short URL is ${URL_SHORTENER_API_ENDPOINT}/${response.data}`;
  } else {
    output = response.message;
  }

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">URL Shortener</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        aria-label="URL Shortener Form"
      >
        <div>
          <label htmlFor="url-input" className="sr-only">
            Enter URL to shorten
          </label>
          <input
            id="url-input"
            type="url"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Paste the URL you would like to shorten"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            aria-required="true"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-live="polite"
        >
          {isLoading ? "Waiting for short URL..." : "Shorten URL"}
        </button>
      </form>

      {/* Response display area */}
      {output && (
        <div
          role="alert"
          className={`mt-4 p-3 rounded ${
            response.error
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {output}
        </div>
      )}
      {response.data && (
        <button
          onClick={handleCopy}
          className="ml-2 mt-4 bg-gray-200 text-gray-800 px-2 py-1 rounded"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      )}
    </div>
  );
}
