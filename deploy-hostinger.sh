#!/bin/bash

# Hostinger Deployment Script
echo "🚀 Starting Hostinger deployment..."

# Pull latest changes
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
composer install --no-dev --optimize-autoloader
npm install

# Build assets
echo "🎨 Building production assets..."
npm run build

# Clear and cache config
echo "⚡ Optimizing Laravel..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations
echo "🗄️ Running database migrations..."
php artisan migrate --force

# Set permissions
echo "🔐 Setting permissions..."
chmod -R 755 storage bootstrap/cache

echo "✅ Deployment completed successfully!"
echo "🌐 Your site should now be live!"