-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('ADMIN', 'ENTREPRENEUR', 'SPONSOR', 'REVIEWER');

-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255),
  name VARCHAR(255),
  role user_role NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  social_links JSONB,
  provider VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create password resets table
CREATE TABLE password_resets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for users table
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes
CREATE INDEX users_email_idx ON users(email);
CREATE INDEX users_provider_idx ON users(provider);
CREATE INDEX password_resets_token_idx ON password_resets(token);
CREATE INDEX password_resets_user_id_idx ON password_resets(user_id);

-- Insert default admin user
INSERT INTO users (
  email,
  password,
  name,
  role,
  provider,
  created_at
) VALUES (
  'admin@starttex.com',
  '$2a$10$K8ZpdrjwzUWSTmtyM.SAHewu7Zxpq3kUF8RyQJQIz7yFnpS0uIMFW', -- Default password: Admin@123
  'System Admin',
  'ADMIN',
  'credentials',
  CURRENT_TIMESTAMP
); 