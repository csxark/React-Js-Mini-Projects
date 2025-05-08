/*
  # Initial Database Schema for WalletWise

  1. New Tables
    - `profiles` - User profiles with preferences and basic information
    - `expenses` - User expense records with categories
    - `savings_goals` - User savings targets and progress
    - `financial_metrics` - Monthly and yearly savings metrics
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data

  3. Functions
    - Add helper functions for aggregating financial data
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  display_name text,
  avatar_url text,
  min_balance decimal(12, 2) DEFAULT 0,
  monthly_savings_target decimal(12, 2) DEFAULT 0,
  currency text DEFAULT 'USD',
  theme text DEFAULT 'system',
  savings_streak integer DEFAULT 0,
  notification_preferences jsonb DEFAULT '{"email": true, "push": false, "savings": true, "expenses": true, "goals": true}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  description text NOT NULL,
  amount decimal(12, 2) NOT NULL,
  category text NOT NULL,
  date date NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Savings Goals table
CREATE TABLE IF NOT EXISTS savings_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  target_amount decimal(12, 2) NOT NULL,
  current_amount decimal(12, 2) DEFAULT 0,
  start_date date DEFAULT current_date,
  target_date date NOT NULL,
  category text NOT NULL,
  priority integer DEFAULT 3, -- 1-5 scale
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Financial Metrics table (for storing aggregated data)
CREATE TABLE IF NOT EXISTS financial_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  metric_type text NOT NULL, -- e.g., 'monthly_savings', 'yearly_expenses', etc.
  year integer NOT NULL,
  month integer, -- NULL for yearly metrics
  amount decimal(12, 2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (user_id, metric_type, year, month)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE savings_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_metrics ENABLE ROW LEVEL SECURITY;

-- Row Level Security Policies

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Expenses policies
CREATE POLICY "Users can view their own expenses"
  ON expenses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own expenses"
  ON expenses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own expenses"
  ON expenses FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own expenses"
  ON expenses FOR DELETE
  USING (auth.uid() = user_id);

-- Savings Goals policies
CREATE POLICY "Users can view their own savings goals"
  ON savings_goals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own savings goals"
  ON savings_goals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own savings goals"
  ON savings_goals FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own savings goals"
  ON savings_goals FOR DELETE
  USING (auth.uid() = user_id);

-- Financial Metrics policies
CREATE POLICY "Users can view their own financial metrics"
  ON financial_metrics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own financial metrics"
  ON financial_metrics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own financial metrics"
  ON financial_metrics FOR UPDATE
  USING (auth.uid() = user_id);

-- Functions for analytics

-- Get monthly savings for a year
CREATE OR REPLACE FUNCTION get_monthly_savings(
  user_id_param uuid,
  year_param integer
)
RETURNS TABLE (
  month integer,
  amount decimal(12, 2)
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    EXTRACT(MONTH FROM date)::integer as month,
    SUM(amount) as amount
  FROM
    financial_metrics
  WHERE
    user_id = user_id_param AND
    year = year_param AND
    metric_type = 'monthly_savings'
  GROUP BY
    month
  ORDER BY
    month;
END;
$$;

-- Trigger to create a profile after a user signs up
CREATE OR REPLACE FUNCTION create_profile_for_user()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_profile_for_user();

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS expenses_user_id_idx ON expenses (user_id);
CREATE INDEX IF NOT EXISTS expenses_category_idx ON expenses (category);
CREATE INDEX IF NOT EXISTS expenses_date_idx ON expenses (date);
CREATE INDEX IF NOT EXISTS savings_goals_user_id_idx ON savings_goals (user_id);
CREATE INDEX IF NOT EXISTS financial_metrics_user_id_idx ON financial_metrics (user_id);
CREATE INDEX IF NOT EXISTS financial_metrics_year_month_idx ON financial_metrics (year, month);