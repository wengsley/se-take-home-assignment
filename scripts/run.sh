#!/bin/bash

# Run Script
# This script should execute your CLI application and output results to result.txt

echo "Running CLI application..."

cd feedme-backend

# Run CLI simulation mode - filter out yarn/npm/tsx noise
if command -v yarn &> /dev/null; then
    yarn tsx src/cli.ts 2>&1 | grep -vE "(yarn run|Done in|warning|^\$|^yarn|tsx|node_modules)" > ../scripts/result.txt || true
else
    npx tsx src/cli.ts 2>&1 | grep -vE "(npm|Done in|warning|^\$|tsx|node_modules)" > ../scripts/result.txt || true
fi

echo "CLI application execution completed"