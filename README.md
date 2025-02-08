<div align="center">
  <h2>Cryptocurrency Dashboard</h2>
  <p>Live Ethereum Cryptocurrency Prices and Statistics Updates</p>
  <p>Made by <a href="https://noahrizika.github.io/">Noah Rizika</a></p>
</div>

## Application Overview

This is a NextJS14 web application, using Typescript, TailwindCSS, and BitQuery. It features live updates for tokens on the Ethereum blockchain using BitQuery's APIv2.

*Features*
- Quickly find the latest information on ethereum-based cryptocurrencies
- Friendly UI with easily-digestible visualizations (using Shadcn components)

## Getting Started

### 1. Clone this repository 

```bash
git clone https://github.com/noahrizika/crypto-dashboard.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Upload your API keys

Place your BitQuery Access Token in a new .env file.

Example .env file:  
BITQUERY_ACCESS_TOKEN='YOUR_ACCESS_TOKEN_HERE'  
BITQUERY_GRAPHQL_URL='https://streaming.bitquery.io/graphql'

### 4. Run the development server

You can start the server using this command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the webpage.

## Architectural Decisions

**Organizational Design**

I used PascalCase for components and camelCase for all other variable names, folders and files.  
Hardcoded data, such as types and token metadata, was stored in the lib folder. Components were oranized by functionality.  
Errors with API fetching are handled gracefully with try...catch statements

**Perfomance Optimizations and Latency**

*Concurrency*  
The array.**map()** function is used asynchronously to fetch data from BitQuery, expediting the delivery of data (for reference, see [here](https://stackoverflow.com/questions/43691808/http-performance-many-small-requests-or-one-big-one))

*Low Latency*  
Fetching price data for one token from Bitquery's IDE takes around **1.500s**. Fetching price data on two tokens takes over twice as long (~3.200s). Therefore, by individually and asynchronously querying tokens' price data, responses arrive with minimal latency. Further, the backend is easily scalable and can handle many more queries while maintaining low latency.

*Isolation of Client Components*  
Only the data visualizations are rerendered once new data is fetched—-not the entire webpage. Further, the client components created are as lightweight as possible, while still maintaing full functionality.
