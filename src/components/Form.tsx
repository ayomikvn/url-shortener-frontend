"use client";
import { useState } from "react";

interface ApiResponse {
  message?: string;
  error?: string;
  data?: string;
}

export default function Form() {
  const [inputValue, setInputValue] = useState<string>("");
  const [response, setResponse] = useState<ApiResponse>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const URL_SHORTENER_API_ENDPOINT =
    process.env.NEXT_PUBLIC_URL_SHORTENER_API_ENDPOINT;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        throw new Error("Network response was not ok");
      }

      const result = await apiResponse.json();
      setResponse({ data: result.data.shortUrl });
    } catch (error) {
      setResponse({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 bg-white">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Paste the URL you would like to shorten"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? "Waiting for short URL..." : "Shorten URL"}
        </button>
      </form>

      {/* Response display area */}
      {(response.message || response.error) && (
        <div
          className={`mt-4 p-3 rounded ${
            response.error
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {`${URL_SHORTENER_API_ENDPOINT}/`}
          {response.message || response.error}
        </div>
      )}
    </div>
  );
}
