# Expense Tracker API

A robust REST API for managing personal expenses, built with Node.js, TypeScript, and Express. This project provides comprehensive expense tracking functionality including user authentication, transaction management, dashboard analytics, and user profile management.

## Inspiration

This project is inspired by the [Expense Tracker API project](https://roadmap.sh/projects/expense-tracker-api) from roadmap.sh.

## Features

- **User Authentication**: Secure registration, login, and JWT-based authentication with refresh tokens
- **Password Management**: Password reset functionality via email
- **Transaction Management**: Full CRUD operations for expense/income records
- **Dashboard**: Overview and summary of financial data
- **User Profile**: View and update user settings
- **API Documentation**: Interactive Swagger UI documentation
- **Rate Limiting**: Protection against abuse with configurable rate limits
- **Database Support**: Flexible database support (PostgreSQL and MySQL)
- **Caching**: Redis integration for performance optimization
- **Validation**: Robust input validation using Zod schemas
- **Error Handling**: Comprehensive error handling and logging
- **Testing**: Unit tests with Vitest

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: Sequelize ORM (supports PostgreSQL and MySQL)
- **Caching**: Redis
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Zod
- **API Documentation**: Swagger/OpenAPI
- **Testing**: Vitest
- **Package Manager**: pnpm
- **Containerization**: Docker & Docker Compose

## Prerequisites

- Node.js (v20 or higher)
- pnpm
- Docker & Docker Compose (for containerized setup)
- PostgreSQL or MySQL database
- Redis (optional, for caching)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Cleve-keem/Expense-tracker-api.git
   cd Expense-tracker-api
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Environment Setup:**
   - Copy `.env.example` to `.env`
   - Fill in the required environment variables:
     ```
     PORT=5001
     NODE_ENV=development
     DB_HOST=localhost
     DB_PORT=5432  # or 3306 for MySQL
     DB_USER=your_db_user
     DB_PASSWORD=your_db_password
     DB_NAME=expense_tracker
     JWT_SECRET_KEY=your_jwt_secret
     ```

4. **Database Setup:**
   - Ensure your database is running
   - The application will automatically sync tables on startup

## Usage

### Development

Start the development server with hot reload:

```bash
pnpm dev
```

The server will start on `http://localhost:5001`

### Production

Build and run with Docker Compose:

```bash
docker-compose up --build
```

<!-- The API will be available on `http://localhost:3000` -->

### API Documentation

Access the interactive API documentation at:

```
http://localhost:5001/api-docs
```

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/password-reset-request` - Request password reset

### Transactions

- `POST /api/v1/transactions` - Add new transaction
- `GET /api/v1/transactions` - Get transaction history
- `GET /api/v1/transactions/:id` - Get single transaction
- `PATCH /api/v1/transactions/:id` - Update transaction
- `DELETE /api/v1/transactions/:id` - Delete transaction

### Dashboard

- `GET /api/v1/dashboard/summary` - Get financial overview

### User Profile

- `GET /api/v1/me` - Get user profile
- `PATCH /api/v1/me` - Update user profile

### Health Check

- `GET /health-check` - Application health status

## Testing

Run the test suite:

```bash
pnpm test
```

## Project Structure

```
src/
├── app.ts                 # Express application setup
├── server.ts              # Server initialization
├── configs/               # Configuration files
│   ├── db.config.ts       # Database configuration
│   ├── swagger.config.ts  # Swagger documentation config
│   └── process-supervisor.ts # Process management
├── controllers/           # Route controllers
├── middlewares/           # Express middlewares
├── models/                # Sequelize models
├── repositories/          # Data access layer
├── routes/                # API routes
├── schemas/               # Zod validation schemas
├── services/              # Business logic services
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions

test/                      # Test files
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Cleve-keem**</content>
<parameter name="filePath">c:\Users\Hackhim\OneDrive\Backend\Roadmap\10-Expense-Tracker-API\README.md
