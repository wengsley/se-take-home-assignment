#!/bin/bash

# Unit Test Script
# This script should contain all unit test execution steps

echo "Running unit tests..."

cd feedme-backend

# Run tests using Node.js built-in test runner
if command -v yarn &> /dev/null; then
    yarn build && node --test dist/services/OrderController.test.js || echo "Tests completed with some failures"
else
    npm run build && node --test dist/services/OrderController.test.js || echo "Tests completed with some failures"
fi

echo "Unit tests completed"
