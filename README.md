# MERN Stack E-commerce with Vercel Deployment

## Deployment Instructions

### Prerequisites
- Node.js 18 or later
- MongoDB database
- Vercel account

### Environment Variables
Set the following environment variables in your Vercel project:

1. `MONGO_URI`: Your MongoDB connection string
2. `NODE_ENV`: Set to `production` for deployment

### Deploy to Vercel

#### Method 1: Using the Vercel Dashboard
1. Push your code to GitHub
2. Log in to [Vercel](https://vercel.com)
3. Create a new project and import your GitHub repository
4. Configure environment variables in the Vercel dashboard
5. Deploy

#### Method 2: Using Vercel CLI
1. Install Vercel CLI: `npm install -g vercel`
2. Login to Vercel: `vercel login`
3. Run the deployment script: `./deploy-to-vercel.sh`
   OR deploy manually: `vercel --prod`

### Local Development
1. Clone the repository
2. Create a `.env` file in the root with:
   ```
   MONGO_URI=your_mongodb_connection_string
   ```
3. Install dependencies:
   ```
   npm install
   cd frontend && npm install
   ```
4. Run the development server:
   ```
   npm run dev
   ```

## Project Structure
- `frontend/`: React frontend built with Vite
- `backend/`: Node.js Express API server
- `vercel.json`: Vercel deployment configuration 