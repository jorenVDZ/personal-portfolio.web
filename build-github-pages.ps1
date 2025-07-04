# PowerShell script for Windows
# Build the project
ng build --configuration github-pages --output-path docs

# Move files from browser subfolder to docs root
cd docs
if (Test-Path "browser") {
    Move-Item -Path "browser\*" -Destination "." -Force
    Remove-Item -Recurse -Force browser
}

# Copy index.html to 404.html for GitHub Pages SPA support
Copy-Item index.html 404.html

Write-Host "Build completed and files prepared for GitHub Pages!"
