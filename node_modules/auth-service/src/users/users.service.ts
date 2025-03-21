import { Injectable, Logger } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UsersService {
  private supabase: SupabaseClient | null = null;
  private readonly logger = new Logger(UsersService.name);

  constructor(private configService: ConfigService) {
    this.initializeSupabase();
  }

  private initializeSupabase() {
    try {
      const supabaseUrl = this.configService.get("SUPABASE_URL");
      const supabaseKey = this.configService.get("SUPABASE_SERVICE_ROLE_KEY");

      if (!supabaseUrl || !supabaseKey) {
        this.logger.error(
          "Missing Supabase credentials. Please configure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file"
        );
        return;
      }

      this.supabase = createClient(supabaseUrl, supabaseKey);
      this.logger.log(
        "Supabase client initialized successfully with service role"
      );
    } catch (error) {
      this.logger.error("Failed to initialize Supabase client:", error);
    }
  }

  private validateSupabaseConnection() {
    if (!this.supabase) {
      throw new Error(
        "Supabase client is not initialized. Please check your configuration."
      );
    }
  }

  async findByProviderAndProviderId(provider: string, providerId: string) {
    this.validateSupabaseConnection();
    const { data, error } = await this.supabase
      .from("users")
      .select("*")
      .eq("provider", provider)
      .eq("provider_id", providerId)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async findByEmail(email: string) {
    this.validateSupabaseConnection();
    const { data, error } = await this.supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async findById(id: string) {
    this.validateSupabaseConnection();
    const { data, error } = await this.supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async create(userData: any) {
    this.validateSupabaseConnection();
    const { data, error } = await this.supabase
      .from("users")
      .insert([userData])
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async update(id: string, userData: any) {
    this.validateSupabaseConnection();
    const { data, error } = await this.supabase
      .from("users")
      .update(userData)
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  }
}
