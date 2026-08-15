# Full-Stack E-Commerce App

A full-stack e-commerce application with a Node.js/Express backend and an Angular frontend.

## Tech Stack

**Backend**
- Node.js + Express 5
- MongoDB with Mongoose
- JWT authentication (`jsonwebtoken`)
- Password hashing with `bcrypt`
- Email confirmation via `nodemailer`

**Frontend**
- Angular 21
- Server-Side Rendering (Angular SSR + Express)
- RxJS

## Project Structure

```
Full-Stack/
├── backend/
│   ├── db/
│   │   ├── models/        # Mongoose models (cart, order, product, user)
│   │   ├── dbConnection.js
│   │   └── seed.js        # Database seeding script
│   ├── src/
│   │   ├── middleware/     # Email check, mail confirmation, token verification
│   │   ├── modules/        # Feature modules
│   │   │   ├── cart/
│   │   │   ├── checkout/
│   │   │   ├── product/
│   │   │   └── user/
│   │   └── utilities/      # Email templates
│   └── index.js            # App entry point
└── frontend/
    ├── src/                # Angular application source
    └── angular.json
```

## Getting Started

### Prerequisites
- Node.js
- MongoDB instance (local or cloud)

### Backend Setup

```bash
cd backend
npm install
npm run dev      # starts the server with --watch
```

Available scripts:
- `npm start` – run the server
- `npm run dev` – run the server with file watching
- `npm run seed` – seed the database

### Frontend Setup

```bash
cd frontend
npm install
npm start         # runs `ng serve`
```

Available scripts:
- `npm start` – run the Angular dev server
- `npm run build` – build for production
- `npm run watch` – build in watch mode (development)
- `npm run test` – run unit tests

## Features

- User authentication with JWT and email confirmation
- Product catalog and management
- Shopping cart
- Checkout flow
- Order management

## License

ISC
