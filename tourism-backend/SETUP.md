# Nepal Tourism Flow Analysis — Backend Setup Guide

## Project Architecture

```
tourism-backend/
├── server.js                    # Entry point
├── package.json
├── .env                         # DB credentials
│
└── src/
    ├── config/
    │   └── db.js                # PostgreSQL pool
    │
    ├── data/                    # JSON fallback files (Python output)
    │   ├── annual_arrivals.json
    │   ├── forecast_2025_2026.json
    │   ├── heatmap_data.json
    │   ├── historical_monthly.json
    │   ├── length_of_stay.json
    │   ├── master_summary.json
    │   ├── model_metrics.json
    │   ├── outlier_detection.json
    │   ├── purpose_of_visit.json
    │   └── stationarity_results.json
    │
    ├── models/
    │   └── schemas.sql          # Run once to create PostgreSQL tables
    │
    ├── scripts/
    │   └── seedDatabase.js      # Run once to import JSON → PostgreSQL
    │
    ├── utils/
    │   └── dataSource.js        # Smart DB/JSON resolver
    │
    ├── services/                # Business logic layer (DB-first, JSON fallback)
    │   ├── annualService.js
    │   ├── forecastService.js
    │   ├── heatmapService.js
    │   ├── historicalService.js
    │   ├── metricsService.js
    │   ├── purposeService.js
    │   ├── stayService.js
    │   └── summaryService.js
    │
    ├── controllers/             # Route handlers
    │   ├── authController.js
    │   ├── datasetController.js
    │   ├── forecastController.js
    │   └── tourismController.js
    │
    ├── middleware/
    │   ├── authMiddleware.js
    │   └── uploadMiddleware.js
    │
    └── routes/
        ├── authRoutes.js
        ├── datasetRoutes.js
        ├── forecastRoutes.js
        └── tourismRoutes.js
```

---

## How the Data Source Works

Every service checks PostgreSQL first. If the table is empty, it falls back to the
JSON files in `src/data/`. Once the database is populated via the seed script,
**no code changes are needed** — the app automatically switches to the DB.

---

## Step 1: Environment Variables (.env)

```
PORT=5001
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=capstone
JWT_SECRET=your_jwt_secret
```

---

## Step 2: Create PostgreSQL Tables (run once)

```bash
psql -U your_db_user -d capstone -f src/models/schemas.sql
```

---

## Step 3: Start the Server (works immediately, uses JSON)

```bash
npm install
npm run dev
```

The API starts immediately using the JSON files. No DB population needed yet.

---

## Step 4: Seed the Database (when ready)

```bash
npm run seed
```

After this, all APIs automatically switch to reading from PostgreSQL.
No frontend or backend code changes required.

---

## API Endpoints

### Tourism Data
| Method | Endpoint                          | Description                    |
|--------|-----------------------------------|--------------------------------|
| GET    | /api/tourism/annual               | Annual arrivals 1996-2024      |
| GET    | /api/tourism/monthly?year=YYYY    | Monthly arrivals (all or 1yr)  |
| GET    | /api/tourism/years                | List of available years        |
| GET    | /api/tourism/purpose?year=YYYY    | Purpose of visit breakdown     |
| GET    | /api/tourism/stay?year=YYYY       | Length of stay statistics      |
| GET    | /api/tourism/heatmap?year=YYYY    | Crowd intensity heatmap        |
| GET    | /api/tourism/dashboard            | Dashboard KPIs                 |
| GET    | /api/tourism/summary              | Master project summary         |

### Forecast Data
| Method | Endpoint                          | Description                    |
|--------|-----------------------------------|--------------------------------|
| GET    | /api/forecast/results?year=2025   | SARIMAX forecast (2025-2026)   |
| GET    | /api/forecast/comparison          | Historical vs forecasted       |
| GET    | /api/forecast/metrics             | ARIMA vs SARIMAX comparison    |
| GET    | /api/forecast/stationarity        | ADF stationarity test results  |
| GET    | /api/forecast/outliers            | Detected outliers              |
| POST   | /api/forecast/trigger (JWT)       | Trigger new forecast run       |

### Auth & Dataset
| Method | Endpoint                | Description              |
|--------|-------------------------|--------------------------|
| POST   | /api/auth/login         | Admin login → JWT token  |
| GET    | /api/auth/verify        | Verify JWT token         |
| GET    | /api/dataset/info       | Dataset metadata         |
| POST   | /api/dataset/upload     | Upload CSV (admin)       |

---

## Frontend Integration (Axios examples)

```javascript
// Dashboard KPIs
const { data } = await axios.get('http://localhost:5001/api/tourism/dashboard');

// SARIMAX Forecast 2025
const { data } = await axios.get('http://localhost:5001/api/forecast/results?year=2025');

// Historical monthly for a year
const { data } = await axios.get('http://localhost:5001/api/tourism/monthly?year=2024');

// Model comparison (ARIMA vs SARIMAX)
const { data } = await axios.get('http://localhost:5001/api/forecast/metrics');

// Heatmap crowd data
const { data } = await axios.get('http://localhost:5001/api/tourism/heatmap');

// Historical vs Forecast comparison
const { data } = await axios.get('http://localhost:5001/api/forecast/comparison');
```

---

## PostgreSQL Tables Created

| Table                  | Source JSON                  | Records |
|------------------------|------------------------------|---------|
| annual_arrivals        | annual_arrivals.json         | 29      |
| historical_monthly     | historical_monthly.json      | 348     |
| forecast_results       | forecast_2025_2026.json      | 24      |
| purpose_of_visit       | purpose_of_visit.json        | 29      |
| length_of_stay         | length_of_stay.json          | 29      |
| model_metrics          | model_metrics.json           | 2       |
| stationarity_results   | stationarity_results.json    | 4       |
| outlier_detection      | outlier_detection.json       | 2       |
| heatmap_data           | heatmap_data.json            | 348     |
