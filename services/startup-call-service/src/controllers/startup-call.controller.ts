import { Request, Response } from "express";
import { supabase } from "../config/database";
import { AppError } from "../middleware/error.middleware";

interface StartupCall {
  title: string;
  description: string;
  categories: string[];
  submission_window_start: Date;
  submission_window_end: Date;
  eligibility: {
    region?: string[];
    stage?: string[];
    industry?: string[];
    [key: string]: any;
  };
  reward?: {
    prizes?: string[];
    funding?: string;
    other_incentives?: string[];
  };
  tags?: string[];
  max_submissions?: number;
  review_panel?: {
    judges?: string[];
    mentors?: string[];
  };
  guidelines_link?: string;
  promotional_media?: {
    images?: string[];
    videos?: string[];
    social_media?: string[];
  };
  status?: "draft" | "published" | "closed";
}

export class StartupCallController {
  async getAllStartupCalls(req: Request, res: Response) {
    try {
      const { data, error } = await supabase
        .from("startup_calls")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      res.json(data);
    } catch (error) {
      throw new AppError("Failed to fetch startup calls", 500);
    }
  }

  async getStartupCallById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { data, error } = await supabase
        .from("startup_calls")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (!data) throw new AppError("Startup call not found", 404);
      res.json(data);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to fetch startup call", 500);
    }
  }

  async createStartupCall(req: Request, res: Response) {
    try {
      if (!req.user?.id) {
        throw new AppError("User not authenticated", 401);
      }

      const startupCall: StartupCall = {
        ...req.body,
        created_by: req.user.id,
        status: req.body.status || "draft",
        max_submissions: req.body.max_submissions || 1,
      };

      // Validate required fields
      if (
        !startupCall.title ||
        !startupCall.description ||
        !startupCall.categories ||
        !startupCall.submission_window_start ||
        !startupCall.submission_window_end ||
        !startupCall.eligibility
      ) {
        throw new AppError("Missing required fields", 400);
      }

      const { data, error } = await supabase
        .from("startup_calls")
        .insert([startupCall])
        .select()
        .single();

      if (error) throw error;
      res.status(201).json(data);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to create startup call", 500);
    }
  }

  async updateStartupCall(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates: Partial<StartupCall> = req.body;

      const { data, error } = await supabase
        .from("startup_calls")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new AppError("Startup call not found", 404);
      res.json(data);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to update startup call", 500);
    }
  }

  async deleteStartupCall(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { error } = await supabase
        .from("startup_calls")
        .delete()
        .eq("id", id);

      if (error) throw error;
      res.status(204).send();
    } catch (error) {
      throw new AppError("Failed to delete startup call", 500);
    }
  }

  async publishStartupCall(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { data, error } = await supabase
        .from("startup_calls")
        .update({ status: "published" })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new AppError("Startup call not found", 404);
      res.json(data);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to publish startup call", 500);
    }
  }

  async closeStartupCall(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { data, error } = await supabase
        .from("startup_calls")
        .update({ status: "closed" })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new AppError("Startup call not found", 404);
      res.json(data);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to close startup call", 500);
    }
  }
}
