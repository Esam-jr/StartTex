import { Request, Response } from "express";
import { supabase } from "../config/database";
import { AppError } from "../middleware/error.middleware";

export class StartupCallController {
  async getAllStartupCalls(_req: Request, res: Response): Promise<void> {
    try {
      const { data, error } = await supabase
        .from("startup_calls")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw new AppError("Failed to fetch startup calls", 500);
      }

      res.json(data);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Internal server error", 500);
    }
  }

  async getStartupCallById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { data, error } = await supabase
        .from("startup_calls")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          throw new AppError("Startup call not found", 404);
        }
        throw new AppError("Failed to fetch startup call", 500);
      }

      res.json(data);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Internal server error", 500);
    }
  }

  async createStartupCall(req: Request, res: Response): Promise<void> {
    try {
      const { data, error } = await supabase
        .from("startup_calls")
        .insert(req.body)
        .select()
        .single();

      if (error) {
        throw new AppError("Failed to create startup call", 500);
      }

      res.status(201).json(data);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Internal server error", 500);
    }
  }

  async updateStartupCall(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { data, error } = await supabase
        .from("startup_calls")
        .update(req.body)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          throw new AppError("Startup call not found", 404);
        }
        throw new AppError("Failed to update startup call", 500);
      }

      res.json(data);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Internal server error", 500);
    }
  }

  async deleteStartupCall(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { error } = await supabase
        .from("startup_calls")
        .delete()
        .eq("id", id);

      if (error) {
        if (error.code === "PGRST116") {
          throw new AppError("Startup call not found", 404);
        }
        throw new AppError("Failed to delete startup call", 500);
      }

      res.status(204).send();
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Internal server error", 500);
    }
  }
}
