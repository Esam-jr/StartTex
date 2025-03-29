import { supabase } from "../config/database";
import { AppError } from "../middleware/error.middleware";

export interface StartupCall {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  deadline: Date;
  status: 'draft' | 'published' | 'closed';
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

export class StartupCallService {
  async getAllStartupCalls(): Promise<StartupCall[]> {
    try {
      const { data, error } = await supabase
        .from('startup_calls')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new AppError('Failed to fetch startup calls', 500);
      }

      return data;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Internal server error', 500);
    }
  }

  async getStartupCallById(id: string): Promise<StartupCall> {
    const { data, error } = await supabase
      .from('startup_calls')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new AppError('Failed to fetch startup call', 500);
    if (!data) throw new AppError('Startup call not found', 404);
    return data;
  }

  async createStartupCall(startupCall: Omit<StartupCall, 'id' | 'created_at' | 'updated_at'>): Promise<StartupCall> {
    const { data, error } = await supabase
      .from('startup_calls')
      .insert([startupCall])
      .select()
      .single();

    if (error) throw new AppError('Failed to create startup call', 500);
    return data;
  }

  async updateStartupCall(id: string, updates: Partial<StartupCall>): Promise<StartupCall> {
    const { data, error } = await supabase
      .from('startup_calls')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new AppError('Failed to update startup call', 500);
    if (!data) throw new AppError('Startup call not found', 404);
    return data;
  }

  async deleteStartupCall(id: string): Promise<void> {
    const { error } = await supabase
      .from('startup_calls')
      .delete()
      .eq('id', id);

    if (error) throw new AppError('Failed to delete startup call', 500);
  }

  async publishStartupCall(id: string): Promise<StartupCall> {
    const { data, error } = await supabase
      .from('startup_calls')
      .update({ status: 'published' })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new AppError('Failed to publish startup call', 500);
    if (!data) throw new AppError('Startup call not found', 404);
    return data;
  }

  async closeStartupCall(id: string): Promise<StartupCall> {
    const { data, error } = await supabase
      .from('startup_calls')
      .update({ status: 'closed' })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new AppError('Failed to close startup call', 500);
    if (!data) throw new AppError('Startup call not found', 404);
    return data;
  }

  async validateStartupCall(startupCall: Partial<StartupCall>): Promise<void> {
    if (!startupCall.title?.trim()) {
      throw new AppError('Title is required', 400);
    }

    if (!startupCall.description?.trim()) {
      throw new AppError('Description is required', 400);
    }

    if (!Array.isArray(startupCall.requirements)) {
      throw new AppError('Requirements must be an array', 400);
    }

    if (startupCall.deadline && new Date(startupCall.deadline) < new Date()) {
      throw new AppError('Deadline cannot be in the past', 400);
    }
  }
} 