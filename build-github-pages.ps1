# Build the project
ng build --configuration github-pages --output-path docs

# Move files from browser subfolder to docs root
Set-Location docs
if (Test-Path "browser") {
    Move-Item browser\* . -Force
    Remove-Item browser -Recurse -Force
}
