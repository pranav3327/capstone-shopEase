# ShopEase Deployment Guide

Follow these steps to deploy your full-stack application.

## 1. Database Deployment (MySQL)
You need a hosted MySQL database. **Aiven** or **PlanetScale** are good options.

1.  Create a MySQL service on [Aiven](https://aiven.io/) or your preferred provider.
2.  Get the **Connection URL** (e.g., `mysql://user:password@host:port/defaultdb?ssl-mode=REQUIRED`).
3.  Save this URL; you will need it for the Backend environment variables.

## 2. Backend Deployment (Render)
We will deploy the Node.js/Express backend to Render.

1.  Push your code to **GitHub**.
2.  Log in to [Render](https://render.com/).
3.  Click **New +** -> **Web Service**.
4.  Connect your GitHub repository.
5.  Select the `backend` directory as the **Root Directory**.
6.  **Settings**:
    *   **Name**: `shopease-backend`
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install && npx prisma generate`
    *   **Start Command**: `npm start`
7.  **Environment Variables** (Advanced):
    *   `DATABASE_URL`: *[Paste your MySQL Connection URL from Step 1]*
    *   `JWT_SECRET`: *[Enter a strong random secret key]*
    *   `NODE_ENV`: `production`
8.  Click **Create Web Service**.
9.  Wait for deployment. **Copy the Backend URL** (e.g., `https://shopease-backend.onrender.com`).

## 3. Frontend Deployment (Vercel)
We will deploy the React frontend to Vercel.

1.  Log in to [Vercel](https://vercel.com/).
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.
4.  **Configure Project**:
    *   **Framework Preset**: `Vite`
    *   **Root Directory**: `frontend` (Click Edit and select `frontend` folder).
5.  **Environment Variables**:
    *   `VITE_API_URL`: *[Paste your Render Backend URL from Step 2]*
6.  Click **Deploy**.

## 4. Final Steps
1.  Once the Backend is live, the `prisma generate` command in the build script will ensure it can talk to the DB.
2.  **Seeding the DB**: You might want to run the seed script on the production DB.
    *   You can do this locally by updating your local `.env` with the *production* `DATABASE_URL` and running `node prisma/seed.js` from the `backend` folder.
    *   *Warning*: This will overwrite data in your production DB.

Your ShopEase store is now live! 🚀

## Troubleshooting
If products are not loading:
1.  **Check Vercel Environment Variables**: Ensure `VITE_API_URL` is set to your Render Backend URL (e.g., `https://shopease-backend.onrender.com`). **Do not add a trailing slash**.
2.  **Check Render Logs**: Look for "Server running on port..." in the Render dashboard logs.
3.  **Check Browser Console**: Open Developer Tools (F12) -> Console. If you see "Mixed Content" or "Connection Refused", your `VITE_API_URL` is likely missing or pointing to localhost.
