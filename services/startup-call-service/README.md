# Startup Call Management Service

A microservice for managing startup calls and related events in the Startup Management System.

## Features

- Create and manage startup calls
- Schedule and manage events
- Role-based access control (Admin/User)
- Input validation
- Error handling
- API documentation with Swagger

## Project Structure

```
src/
├── __tests__/           # Test files
│   └── routes/         # Route tests
├── config/             # Configuration files
├── controllers/        # Route controllers
├── middleware/         # Custom middleware
├── routes/            # API routes
├── services/          # Business logic
├── types/             # TypeScript types
└── index.ts           # Application entry point
```

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- Supabase account

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment file:
   ```bash
   cp .env.example .env
   ```
4. Update environment variables in `.env`

## Development

1. Start development server:

   ```bash
   npm run dev
   ```

2. Run tests:

   ```bash
   npm test
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## API Documentation

The API documentation is available at `/api-docs` when running the server.

### Endpoints

#### Startup Calls

- `GET /api/startup-calls` - Get all startup calls
- `GET /api/startup-calls/:id` - Get a specific startup call
- `POST /api/startup-calls` - Create a new startup call (Admin only)
- `PUT /api/startup-calls/:id` - Update a startup call (Admin only)
- `DELETE /api/startup-calls/:id` - Delete a startup call (Admin only)

#### Events

- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get a specific event
- `GET /api/events/startup-call/:callId` - Get events for a startup call
- `POST /api/events` - Create a new event (Admin only)
- `PUT /api/events/:id` - Update an event (Admin only)
- `DELETE /api/events/:id` - Delete an event (Admin only)

## Testing

The project uses Jest for testing. Run tests with:

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
