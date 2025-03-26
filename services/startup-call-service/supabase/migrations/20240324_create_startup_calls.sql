-- Create startup_calls table
CREATE TABLE startup_calls (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    submission_deadline TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'draft',
    created_by UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    requirements JSONB,
    benefits JSONB,
    max_submissions INTEGER,
    current_submissions INTEGER DEFAULT 0
);

-- Create startup_call_events table
CREATE TABLE startup_call_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    startup_call_id UUID REFERENCES startup_calls(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE startup_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE startup_call_events ENABLE ROW LEVEL SECURITY;

-- Policies for startup_calls
CREATE POLICY "Anyone can view published startup calls"
    ON startup_calls FOR SELECT
    USING (status = 'published');

CREATE POLICY "Only admins can create startup calls"
    ON startup_calls FOR INSERT
    WITH CHECK (auth.uid() IN (
        SELECT user_id FROM user_roles WHERE role = 'admin'
    ));

CREATE POLICY "Only admins can update startup calls"
    ON startup_calls FOR UPDATE
    USING (auth.uid() IN (
        SELECT user_id FROM user_roles WHERE role = 'admin'
    ));

-- Policies for startup_call_events
CREATE POLICY "Anyone can view events for published startup calls"
    ON startup_call_events FOR SELECT
    USING (
        startup_call_id IN (
            SELECT id FROM startup_calls WHERE status = 'published'
        )
    );

CREATE POLICY "Only admins can manage events"
    ON startup_call_events FOR ALL
    USING (auth.uid() IN (
        SELECT user_id FROM user_roles WHERE role = 'admin'
    ));

-- Create indexes
CREATE INDEX idx_startup_calls_status ON startup_calls(status);
CREATE INDEX idx_startup_calls_dates ON startup_calls(start_date, end_date);
CREATE INDEX idx_startup_call_events_dates ON startup_call_events(event_date); 