# Cloud Service Selector MVP

A minimal web application that helps clients select the best cloud provider based on their criteria (price, efficiency, speed, reliability).

## Features

- **Simple Web Interface**: HTML/CSS/JavaScript form for easy parameter input
- **Cloud Provider Comparison**: Analyzes 6 major cloud providers (AWS, Azure, GCP, DigitalOcean, Linode, IBM)
- **Flexible Criteria**: Users can weight importance of price, efficiency, speed, and reliability
- **JSON API**: RESTful endpoints for integration with other systems
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modular Architecture**: Easy to extend with new providers or criteria

## Project Structure

```
cloud-selector/
├── server.js              # Express.js server and API endpoints
├── analyzer.js            # Cloud provider analysis logic
├── providers.js           # Mock cloud provider data
├── package.json           # Project dependencies
├── README.md              # This file
└── public/
    ├── index.html         # Main HTML page
    ├── style.css          # Styling
    └── script.js          # Frontend JavaScript
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Steps

1. **Navigate to the project directory**
   ```bash
   cd "c:\eternity systems\cloud-selector"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

## API Endpoints

### GET `/`
Serves the main HTML page.

### GET `/api/providers`
Returns a list of all available cloud providers.

**Response:**
```json
{
  "success": true,
  "providers": [
    {
      "id": "AWS",
      "name": "Amazon Web Services",
      "description": "Market leader with comprehensive services"
    },
    ...
  ]
}
```

### POST `/api/analyze`
Analyzes cloud providers based on user criteria.

**Request Body:**
```json
{
  "price": 50,
  "efficiency": 75,
  "speed": 90,
  "reliability": 100
}
```

**Response:**
```json
{
  "success": true,
  "bestProvider": "AWS",
  "providerDetails": {
    "name": "Amazon Web Services",
    "price": 75,
    "efficiency": 92,
    "speed": 95,
    "reliability": 99.99,
    "description": "Market leader with comprehensive services"
  },
  "score": 89.45,
  "reasoning": "Price consideration: AWS offers... | Efficiency: AWS has... | Market leader...",
  "allScores": [
    { "provider": "AWS", "score": "89.45" },
    { "provider": "GCP", "score": "86.32" },
    ...
  ]
}
```

### GET `/api/providers/:id`
Returns detailed information about a specific provider.

**Example:** `GET /api/providers/AWS`

**Response:**
```json
{
  "success": true,
  "id": "AWS",
  "name": "Amazon Web Services",
  "price": 75,
  "efficiency": 92,
  "speed": 95,
  "reliability": 99.99,
  "description": "Market leader with comprehensive services"
}
```

## How It Works

1. **User Input**: Users adjust sliders for importance of each criteria (0-100)
2. **Request**: Form submits criteria to `/api/analyze`
3. **Analysis**: Server calculates weighted scores for each provider:
   - Normalizes all metrics to 0-100 scale
   - Applies user weights to each metric
   - Calculates final score for each provider
4. **Response**: Returns best provider with detailed reasoning
5. **Display**: Frontend renders results with ranking and provider details

## Scoring Algorithm

Each provider receives a weighted score based on:

```
Score = (Σ(metric_normalized × weight)) / total_weight
```

- **Price**: Lower score is better (inverted scale)
- **Efficiency**: Higher score is better
- **Speed**: Higher score is better
- **Reliability**: Higher score is better (expressed as percentage)

## Extending the Application

### Adding a New Cloud Provider

1. Open `providers.js`
2. Add a new entry to the `cloudProviders` object:
   ```javascript
   Vultr: {
     name: "Vultr",
     price: 50,
     efficiency: 86,
     speed: 88,
     reliability: 99.9,
     description: "High-performance cloud computing"
   }
   ```

### Adding a New Criterion

1. Modify `providers.js` to add metric to each provider
2. Update `analyzer.js` to handle the new metric in `calculateScore()`
3. Update `public/index.html` to add a new slider
4. Update `public/script.js` to handle the new slider

### Connecting to Real Data

Replace mock data in `providers.js` with:
- Real provider pricing APIs
- Performance benchmarks from monitoring services
- Actual uptime data from status pages

## Development Notes

- **MVP Focus**: Current implementation uses mock data for demonstration
- **No Authentication**: Not required for MVP
- **No Database**: Data is in-memory; no persistence
- **CORS**: Currently serves only static files, CORS not needed
- **Error Handling**: Basic error handling implemented

## Future Enhancements

- [ ] Add real provider data integration
- [ ] User authentication and saved preferences
- [ ] Database for storing analysis history
- [ ] Advanced filtering and custom metrics
- [ ] Export results to PDF
- [ ] Comparison with user's current provider
- [ ] Cost calculator with usage estimates
- [ ] Real-time pricing updates

## License

MIT

## Support

For issues or questions, please review the code documentation or create an issue.
