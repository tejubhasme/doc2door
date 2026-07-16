# Doc2Door

This repository contains Doc2Door, a simple home doctor visit booking platform.

- Backend: Spring Boot (Java 17), JWT, JPA (MySQL)
- Frontend: React + Vite + TailwindCSS

## Prerequisites
- Java 17+
- Maven 3.9+
- Node.js 18+
- MySQL 8+

## Backend Setup
1. Create a MySQL database (or let Hibernate create it):
   - Database: `doc2door`
2. Configure environment variables (optional):
   - `DB_USERNAME` (default: `root`)
   - `DB_PASSWORD` (default: `password`)
   - `JWT_SECRET` (default: `change_this_secret`)
3. Run backend:
```bash
cd doc2door-backend
mvn spring-boot:run
```

Key endpoints (port 8080):
- POST `/api/auth/patient/signup`
- POST `/api/auth/doctor/signup`
- POST `/api/auth/login` ({ email, password, role: PATIENT|DOCTOR })
- GET `/api/doctors?city=City`
- POST `/api/appointments/book` (Patient)
- GET `/api/appointments/me` (Patient)
- GET `/api/appointments/doctor/me` (Doctor)
- POST `/api/appointments/{id}/doctor-action` ({ action: ACCEPT|REJECT|CANCEL|COMPLETE })
- POST `/api/appointments/{id}/cancel` (Patient)

## Frontend Setup
1. Configure API base (optional): create `.env` in `doc2door-frontend/`:
```
VITE_API_BASE_URL=http://localhost:8080
```
2. Install and run:
```bash
cd doc2door-frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Notes
- JWT subject contains the user id; role is in claims. The frontend stores token, role, name, and id in `localStorage`.
- CORS is allowed via `@CrossOrigin` on controllers for local development.
- Entities use `ddl-auto=update` for convenience; switch to migrations for production.


