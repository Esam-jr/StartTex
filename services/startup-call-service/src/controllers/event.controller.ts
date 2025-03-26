import { Request, Response } from "express";
import { supabase } from "../config/database";
import { AppError } from "../middleware/error.middleware";

interface Event {
  title: string;
  description: string;
  date: Date;
  related_call_id?: string;
  created_by: string;
}

export class EventController {
  async getAllEvents(req: Request, res: Response) {
    try {
      const { data, error } = await supabase
        .from("events")
        .select(
          `
          *,
          startup_calls (
            title,
            description
          )
        `
        )
        .order("date", { ascending: true });

      if (error) throw error;
      res.json(data);
    } catch (error) {
      throw new AppError("Failed to fetch events", 500);
    }
  }

  async getEventById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { data, error } = await supabase
        .from("events")
        .select(
          `
          *,
          startup_calls (
            title,
            description
          )
        `
        )
        .eq("id", id)
        .single();

      if (error) throw error;
      if (!data) throw new AppError("Event not found", 404);
      res.json(data);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to fetch event", 500);
    }
  }

  async createEvent(req: Request, res: Response) {
    try {
      if (!req.user?.id) {
        throw new AppError("User not authenticated", 401);
      }

      const event: Event = {
        ...req.body,
        created_by: req.user.id,
      };

      // Validate required fields
      if (!event.title || !event.description || !event.date) {
        throw new AppError("Missing required fields", 400);
      }

      // If related_call_id is provided, verify it exists
      if (event.related_call_id) {
        const { data: callData, error: callError } = await supabase
          .from("startup_calls")
          .select("id")
          .eq("id", event.related_call_id)
          .single();

        if (callError || !callData) {
          throw new AppError("Related startup call not found", 400);
        }
      }

      const { data, error } = await supabase
        .from("events")
        .insert([event])
        .select()
        .single();

      if (error) throw error;
      res.status(201).json(data);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to create event", 500);
    }
  }

  async updateEvent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates: Partial<Event> = req.body;

      // If related_call_id is being updated, verify it exists
      if (updates.related_call_id) {
        const { data: callData, error: callError } = await supabase
          .from("startup_calls")
          .select("id")
          .eq("id", updates.related_call_id)
          .single();

        if (callError || !callData) {
          throw new AppError("Related startup call not found", 400);
        }
      }

      const { data, error } = await supabase
        .from("events")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new AppError("Event not found", 404);
      res.json(data);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to update event", 500);
    }
  }

  async deleteEvent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { error } = await supabase.from("events").delete().eq("id", id);

      if (error) throw error;
      res.status(204).send();
    } catch (error) {
      throw new AppError("Failed to delete event", 500);
    }
  }

  async getEventsByStartupCall(req: Request, res: Response) {
    try {
      const { callId } = req.params;
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("related_call_id", callId)
        .order("date", { ascending: true });

      if (error) throw error;
      res.json(data);
    } catch (error) {
      throw new AppError("Failed to fetch events for startup call", 500);
    }
  }
}
