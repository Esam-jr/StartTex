export interface StartupCall {
  id: string;
  title: string;
  description: string;
  date: Date;
  status: "scheduled" | "completed" | "cancelled";
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  related_call_id?: string;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: string;
  email: string;
  role: "admin" | "user";
}

export interface JwtPayload {
  id: string;
  role: string;
}
