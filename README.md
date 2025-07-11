# My Portfolio

Hi! My name is Philip Carey, and welcome to my portfolio! This is a React-based personal portfolio website showcasing some of my projects, (so far) including a Crypto Price Dashboard and a Weather App.

## Projects

### Crypto Price Dashboard
A real-time dashboard displaying cryptocurrency prices fetched from public APIs. It provides up-to-date market data and interactive charts.

### Weather App
A weather information app that allows users to search for any city worldwide. Features include:

- Autocomplete suggestions for city names with country/state info
- Temperature toggle between Fahrenheit and Celsius
- Displays current weather conditions, humidity, wind speed, sunrise and sunset times adjusted for local timezone
- Powered by OpenWeatherMap API

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/prcarey11/my-portfolio.git
   cd my-portfolio

2. Install dependencies:
   ```bash
   npm install

3. Create a ```.env``` file in the root directory with your OpenWeatherMap API key (free to signup):
   ```bash
   REACT_APP_OPENWEATHER_API_KEY=your_api_key_here

4. Start the development server:
   ```bash
   npm start

## Usage

- Navigate to `/` to view the homepage, which links to different portfolio projects.
- Use the navigation bar to visit the **Crypto Price Dashboard** or the **Weather App**.

### Crypto Price Dashboard

- Displays current cryptocurrency prices using a free third-party API.
- Real-time data for popular coins like Bitcoin, Ethereum, etc.
- Simple and clean design to demonstrate live data handling.

### Weather App Features

- Begin typing a city name (minimum 4 characters) to see autocomplete suggestions powered by OpenWeatherMap's geocoding API.
- Click a suggestion or manually enter a full city name (e.g., "Berkeley, California, US") and press **Search** to fetch the weather.
- Displays:
  - Current temperature (with toggle between °F and °C)
  - Weather description
  - Humidity
  - Wind speed (in `mph` or `m/s`)
  - Sunrise and sunset times (displayed in local time with UTC offset)
- Uses coordinate-based search when selecting a suggestion for more accurate results.
- Responsive layout and user-friendly UI (mobile coming soon).

---

Last Updated: July 11, 2025