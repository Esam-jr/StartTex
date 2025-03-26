import dotenv from "dotenv";

// Load test environment variables
dotenv.config({ path: ".env.test" });

// Set test environment
process.env.NODE_ENV = "test";

// Mock Supabase client
jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn().mockReturnValue({
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn(),
    execute: jest.fn(),
  }),
}));

// Global test timeout
jest.setTimeout(10000);
