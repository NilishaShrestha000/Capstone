-- =========================================================
-- Tourism Flow Analysis - PostgreSQL Schema
-- Schema: Analytics
-- Matches the columns queried by src/services/*.js and
-- populated by src/scripts/seedDatabase.js + saveModels.js.
-- Run once (in pgAdmin or psql) against the target database.
-- =========================================================

CREATE SCHEMA IF NOT EXISTS "Analytics";

CREATE TABLE IF NOT EXISTS "Analytics".annual_arrivals (
    id              SERIAL PRIMARY KEY,
    year            INTEGER   NOT NULL UNIQUE,
    third_country   NUMERIC,
    india           NUMERIC,
    total           NUMERIC   NOT NULL,
    pct_change      NUMERIC,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Analytics".monthly_arrivals (
    id              SERIAL PRIMARY KEY,
    year            INTEGER   NOT NULL UNIQUE,
    jan             NUMERIC,
    feb             NUMERIC,
    mar             NUMERIC,
    apr             NUMERIC,
    may             NUMERIC,
    jun             NUMERIC,
    jul             NUMERIC,
    aug             NUMERIC,
    sep             NUMERIC,
    oct             NUMERIC,
    nov             NUMERIC,
    "dec"           NUMERIC,
    total           NUMERIC,
    covid_dummy     INTEGER   DEFAULT 0,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Analytics".forecast_results (
    forecast_id         SERIAL PRIMARY KEY,
    forecast_year       INTEGER     NOT NULL,
    forecast_month      INTEGER     NOT NULL,
    predicted_arrivals  NUMERIC     NOT NULL,
    lower_bound         NUMERIC,
    upper_bound         NUMERIC,
    model_type          VARCHAR(50),
    forecast_date       DATE GENERATED ALWAYS AS (
                            make_date(forecast_year, forecast_month, 1)
                        ) STORED,
    created_at          TIMESTAMP DEFAULT NOW(),
    UNIQUE(forecast_year, forecast_month)
);

CREATE TABLE IF NOT EXISTS "Analytics".purpose_of_visit (
    id              SERIAL PRIMARY KEY,
    year            INTEGER   NOT NULL UNIQUE,
    holiday         NUMERIC,
    trekking        NUMERIC,
    business        NUMERIC,
    pilgrimage      NUMERIC,
    official        NUMERIC,
    conference      NUMERIC,
    others          NUMERIC,
    total           NUMERIC,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Analytics".length_of_stay (
    id              SERIAL PRIMARY KEY,
    year            INTEGER   NOT NULL UNIQUE,
    total           NUMERIC,
    growth_rate     NUMERIC,
    by_air_number   NUMERIC,
    by_air_pct      NUMERIC,
    by_land_number  NUMERIC,
    by_land_pct     NUMERIC,
    avg_stay_days   NUMERIC,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Analytics".model_evaluation (
    evaluation_id   SERIAL PRIMARY KEY,
    model_name      VARCHAR(50) NOT NULL,
    rmse            NUMERIC,
    mae             NUMERIC,
    mape            NUMERIC,
    forecast_id     INTEGER REFERENCES "Analytics".forecast_results(forecast_id),
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Analytics".import_logs (
    log_id              SERIAL PRIMARY KEY,
    file_name           VARCHAR(255),
    imported_at         TIMESTAMP DEFAULT NOW(),
    status              VARCHAR(20),
    records_imported    INTEGER
);

-- Table to store trained model binary (pkl) + metadata
CREATE TABLE IF NOT EXISTS "Analytics".trained_models (
    model_id        SERIAL PRIMARY KEY,
    model_name      VARCHAR(20)  NOT NULL UNIQUE,  -- 'ARIMA' or 'SARIMAX'
    model_class     VARCHAR(100) NOT NULL,
    model_order     VARCHAR(30),
    seasonal_order  VARCHAR(30),
    aic             NUMERIC,
    bic             NUMERIC,
    mse             NUMERIC,
    mae             NUMERIC,
    nobs            INTEGER,
    trained_start   DATE,
    trained_end     DATE,
    has_exog        BOOLEAN DEFAULT FALSE,
    is_selected     BOOLEAN DEFAULT FALSE,
    model_binary    BYTEA NOT NULL,               -- the actual .pkl file stored as bytes
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

COMMENT ON COLUMN "Analytics".trained_models.model_binary IS
  'Binary content of the .pkl file serialized with Python pickle';
COMMENT ON COLUMN "Analytics".trained_models.is_selected IS
  'TRUE for the model currently used for production forecasting (SARIMAX)';

-- No DB table for stationarity_results / outlier_detection — those two
-- endpoints always read straight from the JSON files (see metricsService.js).
