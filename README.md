## My Web App

Full‑stack authentication demo built with React 19 + Vite on the frontend and an Express + MySQL API on the backend. Features role-based authentication with separate user and admin dashboards. Users can register/login, browse products, and add items to cart. Admins can manage all users and products with full CRUD operations.

### Features

**User Features:**
- User registration and login
- Browse product catalog
- Add products to cart
- View cart with total price
- Add new products

**Admin Features:**
- Admin dashboard with analytics
- User management (view, delete)
- Product management (view, edit, delete, add)
- Statistics overview
- Switch between admin and user views

### Prerequisites

- Node.js 20+
- npm 10+
- MySQL 8.0+ (or MariaDB 10.6+) running locally or remotely

### Environment Variables

- `VITE_API_BASE_URL` (frontend, optional): defaults to `http://localhost:5000`.
- `DB_HOST` (backend, optional): MySQL host, defaults to `localhost`.
- `DB_PORT` (backend, optional): MySQL port, defaults to `3306`.
- `DB_USER` (backend, optional): MySQL user, defaults to `root`.
- `DB_PASSWORD` (backend, optional): MySQL password, defaults to `""`.
- `DB_NAME` (backend, optional): Database name, defaults to `auth_app` (created automatically if missing).

### Installation

```
npm install
cd backend && npm install
```

### Running Locally

1. **Start the backend** (port 5000):
	```
	cd backend
	npm start
	```
	Ensure your MySQL server is running and the credentials above are correct. On first launch the app will create the `auth_app` database along with `users` and `products` tables if they do not exist.

2. **Create first admin user** (one-time setup):
    ```
    cd backend
    npm run create-admin
    ```
    This creates an admin user with credentials:
    - Email: `admin@admin.com`
    - Username: `admin`
    - Password: `admin123`
    
    Change the password after first login!

3. **Start the frontend** (Vite dev server, port 5173):
    ```
    npm run dev
    ```

Visit the URL shown by Vite. 
- Regular users: Register via the Register form
- Admin access: Login with admin credentials and access `/admin` route

```
backend/        Express API + MySQL helpers
public/         Static assets served by Vite
src/            React SPA (pages, components, styles)
```
