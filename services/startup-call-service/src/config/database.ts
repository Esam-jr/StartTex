import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// Database connection check
export const checkDatabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from("startup_calls")
      .select("count")
      .limit(1);

    if (error) {
      console.error("❌ Database connection failed:", error.message);
      process.exit(1);
    }

    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};
