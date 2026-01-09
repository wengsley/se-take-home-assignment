#!/bin/bash

# Build Script
# This script should contain all compilation steps for your CLI application

echo "Building application..."

cd feedme-backend

# Install dependencies using yarn
if command -v yarn &> /dev/null; then
    yarn install
else
    echo "Yarn not found, using npm instead..."
    npm install
fi

# Compile TypeScript
if command -v yarn &> /dev/null; then
    yarn build
else
    npm run build
fi

echo "Build completed"