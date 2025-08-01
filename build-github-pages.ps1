# Backup CNAME file if it exists
$cnameBackup = $null
if (Test-Path "docs\CNAME") {
    $cnameBackup = Get-Content "docs\CNAME"
    Write-Host "CNAME file backed up: $cnameBackup"
}

# Build the project
ng build --configuration github-pages --output-path docs

# Move files from browser subfolder to docs root
Set-Location docs
if (Test-Path "browser") {
    Move-Item browser\* . -Force
    Remove-Item browser -Recurse -Force
}

# Restore CNAME file if it was backed up
if ($cnameBackup) {
    Set-Content "CNAME" -Value $cnameBackup
    Write-Host "CNAME file restored: $cnameBackup"
}
