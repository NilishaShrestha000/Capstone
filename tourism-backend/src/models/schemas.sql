-- =========================================================
-- Tourism Flow Analysis - PostgreSQL Schema
-- Schema: Analytics
-- Run once to create all tables.
-- =========================================================

CREATE SCHEMA IF NOT EXISTS "Analytics";

CREATE TABLE IF NOT EXISTS "Analytics".annual_arrivals (
    id              SERIAL PRIMARY KEY,
    year            INTEGER   NOT NULL UNIQUE,
    total           NUMERIC   NOT NULL,
    third_country   NUMERIC,
    indian          NUMERIC,
    pct_change      NUMERIC,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Analytics".historical_monthly (
    id                  SERIAL PRIMARY KEY,
    date                DATE      NOT NULL,
    year                INTEGER   NOT NULL,
    month               VARCHAR(3) NOT NULL,
    month_number        INTEGER   NOT NULL,
    arrivals            NUMERIC   NOT NULL,
    arrivals_smoothed   NUMERIC,
    covid_dummy         INTEGER   DEFAULT 0,
    created_at          TIMESTAMP DEFAULT NOW(),
    UNIQUE(year, month_number)
);

CREATE TABLE IF NOT EXISTS "Analytics".forecast_results (
    id              SERIAL PRIMARY KEY,
    date            DATE      NOT NULL,
    year            INTEGER   NOT NULL,
    month           VARCHAR(3) NOT NULL,
    month_number    INTEGER   NOT NULL,
    forecast        NUMERIC   NOT NULL,
    lower_95        NUMERIC,
    upper_95        NUMERIC,
    crowd_level     VARCHAR(20),
    model_used      VARCHAR(50) DEFAULT 'SARIMAX',
    model_order     VARCHAR(50),
    created_at      TIMESTAMP DEFAULT NOW(),
    UNIQUE(year, month_number)
);

CREATE TABLE IF NOT EXISTS "Analytics".purpose_of_visit (
    id              SERIAL PRIMARY KEY,
    year            INTEGER   NOT NULL UNIQUE,
    holiday         NUMERIC,
    trekking        NUMERIC,
    pilgrimage      NUMERIC,
    business        NUMERIC,
    official        NUMERIC,
    conference      NUMERIC,
    others          NUMERIC,
    total           NUMERIC,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Analytics".length_of_stay (
    id              SERIAL PRIMARY KEY,
    year            INTEGER   NOT NULL UNIQUE,
    total_arrivals  NUMERIC,
    avg_stay_days   NUMERIC,
    by_air_number   NUMERIC,
    by_land_number  NUMERIC,
    by_air_pct      NUMERIC,
    by_land_pct     NUMERIC,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Analytics".model_metrics (
    id                   SERIAL PRIMARY KEY,
    model_name           VARCHAR(50)  NOT NULL UNIQUE,
    model_order          VARCHAR(50),
    mae                  NUMERIC,
    rmse                 NUMERIC,
    mape                 NUMERIC,
    ljung_box_pvalue     NUMERIC,
    residuals_random     BOOLEAN,
    covid_dummy_included BOOLEAN     DEFAULT FALSE,
    description          TEXT,
    is_selected          BOOLEAN     DEFAULT FALSE,
    created_at           TIMESTAMP   DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Analytics".stationarity_results (
    id              SERIAL PRIMARY KEY,
    test_name       VARCHAR(100) NOT NULL,
    series_label    VARCHAR(100) NOT NULL,
    adf_statistic   NUMERIC,
    p_value         NUMERIC,
    is_stationary   BOOLEAN,
    note            TEXT,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Analytics".outlier_detection (
    id              SERIAL PRIMARY KEY,
    date            DATE      NOT NULL,
    month_year      VARCHAR(50),
    original_value  NUMERIC,
    replaced_with   NUMERIC,
    z_score         NUMERIC,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Analytics".heatmap_data (
    id              SERIAL PRIMARY KEY,
    year            INTEGER   NOT NULL,
    month           VARCHAR(3) NOT NULL,
    month_number    INTEGER   NOT NULL,
    arrivals        NUMERIC,
    crowd_level     VARCHAR(20),
    created_at      TIMESTAMP DEFAULT NOW(),
    UNIQUE(year, month_number)
);
