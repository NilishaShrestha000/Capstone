-- ============================================================
-- ADD TO EXISTING Analytics SCHEMA
-- Run this in pgAdmin to add the model storage table
-- ============================================================

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

-- Comment for clarity
COMMENT ON COLUMN "Analytics".trained_models.model_binary IS
  'Binary content of the .pkl file serialized with Python pickle';
COMMENT ON COLUMN "Analytics".trained_models.is_selected IS
  'TRUE for the model currently used for production forecasting (SARIMAX)';
