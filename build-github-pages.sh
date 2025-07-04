#!/bin/bash

# Build the project
ng build --configuration github-pages --output-path docs

# Move files from browser subfolder to docs root
cd docs
if [ -d "browser" ]; then
    mv browser/* .
    rm -rf browser
fi

# Copy index.html to 404.html for GitHub Pages SPA support
cp index.html 404.html

echo "Build completed and files prepared for GitHub Pages!"
