# URL Shortener Web Application

## Overview

This is a URL Shortener web application built with Next.js, allowing users to generate shortened URLs.

## Prerequisites

- Node.js (v18 or later)
- `npm` or `yarn`
- Deploy the stack in [URL Shortener CDK Back-end](https://github.com/ayomikvn/url-shortener-cdk) and take note of the API Gateway endpoint

## Getting Started

1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

2. Install Dependencies

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory of the project and add the following:

```bash
NEXT_PUBLIC_URL_SHORTENER_API_ENDPOINT=https://your-api-endpoint.com/shorten
```

Replace `https://your-api-endpoint.com/shorten` with the API Gateway endpoint generated when you deployed the AWS CDK stack in [URL Shortener CDK Back-end](https://github.com/ayomikvn/url-shortener-cdk)

4. Run the Development server

```bash
npm run dev
# or
yarn dev
```

5. Open http://localhost:3000 in your browser to use the URL Shortener

## How to Use

1. Enter a long URL in the input field
2. Click "Shorten URL"
3. The application will generate a shortened URL
4. Copy the short URL and paste it in another tab of your browser

## Troubleshooting

- Ensure the API endpoint is correctly configured in the `.env.local` file
- Check that you have the latest dependencies installed
- Verify your API endpoint is accessible and returns the expected response