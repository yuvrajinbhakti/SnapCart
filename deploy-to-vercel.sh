#!/bin/bash

echo "Preparing deployment to Vercel..."

# Install Vercel CLI if not already installed
if ! command -v vercel &> /dev/null
then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Ensure all changes are committed
echo "Please ensure all your changes are committed to git before deploying."
read -p "Continue with deployment? (y/n): " confirm

if [ "$confirm" != "y" ]; then
    echo "Deployment cancelled."
    exit 0
fi

# Deploy to Vercel
echo "Deploying to Vercel..."
vercel --prod

echo "Deployment process completed. Check the Vercel dashboard for details." 