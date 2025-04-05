-- Insert default admin user
-- Default credentials:
-- Email: admin@starttex.com
-- Password: Admin@123

DO $$
BEGIN
    -- Check if admin user already exists
    IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@starttex.com') THEN
        -- Insert admin user with hashed password (Admin@123)
        INSERT INTO users (
            email,
            password_hash,
            name,
            role,
            provider
        ) VALUES (
            'admin@starttex.com',
            '$2a$10$qdYbOyGcMvA3TQzEHFzqHO0CNQvs3MPL5rX.v6HvnN4x9T8oDvZju', -- Hashed version of 'Admin@123'
            'System Admin',
            'ADMIN',
            'credentials'
        );

        -- Create admin profile
        INSERT INTO profiles (
            id,
            bio,
            company
        ) 
        SELECT 
            id,
            'System Administrator',
            'StartTex'
        FROM users 
        WHERE email = 'admin@starttex.com';
    END IF;
END
$$; 