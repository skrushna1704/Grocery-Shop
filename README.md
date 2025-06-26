# Jumale Kirana Grocery E-Commerce (MERN Stack)

A full-featured grocery e-commerce platform built with the MERN stack, supporting multi-role interfaces, real product management, secure authentication, and a modern, responsive UI.

---

## 🛒 Project Overview
This monorepo contains both the **backend** (Node.js, Express, MongoDB) and **frontend** (Next.js, React, Tailwind CSS) for the Jumale Kirana grocery e-commerce application.

- **Backend:** RESTful API for authentication, product management, orders, and more.
- **Frontend:** Modern, mobile-friendly web app for customers, admins, and vendors.

---

## ✨ Features

### Frontend
- Product catalog, search, and filtering
- Product detail pages
- Cart, checkout, and order flow
- Multi-role UI (customer, admin, vendor)
- Authentication (login/register)
- Responsive design (Tailwind CSS)
- Error handling and loading states

### Backend
- User authentication (JWT, bcrypt)
- Product CRUD (with images, categories, stock)
- Order management (create, update, status)
- Secure API endpoints (role-based access)
- Middleware for validation, error handling, security
- MongoDB models for users, products, orders

---

## 🧑‍💻 Tech Stack
- **Frontend:** Next.js, React, Tailwind CSS, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- **Other:** Cloudinary (images), dotenv, nodemailer, etc.

---

## 📁 Monorepo Structure
```
Jumale Kirana/
├── backend/      # Express API, MongoDB models, controllers
├── frontend/     # Next.js app, React components, pages
└── README.md     # (this file)
```

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd Jumale\ Kirana
```

### 2. Setup the Backend
```bash
cd backend
cp .env.example .env   # Fill in your MongoDB URI, JWT secret, etc.
npm install
npm run dev            # or: npm start
```

### 3. Setup the Frontend
```bash
cd ../frontend
cp .env.example .env   # Set NEXT_PUBLIC_API_URL, etc.
npm install
npm run dev
```

- Backend runs on [http://localhost:9000](http://localhost:9000)
- Frontend runs on [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Environment Variables
- See `.env.example` in both `backend/` and `frontend/` for required variables.
- Common variables:
  - `MONGODB_URI`, `JWT_SECRET`, `CLOUDINARY_URL` (backend)
  - `NEXT_PUBLIC_API_URL` (frontend)

---

## 🛠️ Common Commands
- **Backend:**
  - `npm run dev` — Start backend in dev mode
  - `npm start` — Start backend in production
- **Frontend:**
  - `npm run dev` — Start frontend in dev mode
  - `npm run build && npm start` — Production build

---

## 📚 API & Usage Notes
- All API endpoints are under `/api` (see backend routes/controllers for details)
- Auth required for protected routes (JWT in `Authorization` header)
- See frontend `src/utils/productService.js` for API usage examples

---

## 🤝 Contributing
Pull requests and issues are welcome! Please open an issue to discuss major changes first.

---

## 🆘 Support
For questions, contact the maintainer or open an issue.

---

## 📝 License
This project is licensed under the MIT License.
