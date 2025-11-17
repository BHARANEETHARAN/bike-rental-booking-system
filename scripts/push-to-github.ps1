<#
Manual helper script: run in PowerShell from project root to initialize git and push to GitHub.
This script prints commands you should run rather than automating GitHub repository creation.

Usage:
  1. Open PowerShell in the project root.
  2. Run: .\scripts\push-to-github.ps1

This will:
  - Initialize a local git repo (if not already initialized)
  - Add and commit current files
  - Show commands to create a GitHub repo and push (you'll need to run them and provide your credentials or PAT)
#>

Write-Host "== Push to GitHub helper =="

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Host "Git is not installed or not in PATH. Please install Git and re-run this script." -ForegroundColor Red
  return
}

if (-not (Test-Path .git)) {
  Write-Host "Initializing git repository..."
  git init
} else {
  Write-Host "Git repository already initialized."
}

git add .
git commit -m "Initial commit - Bike Rental Booking System" -q

Write-Host "\nNext steps: create a repository on GitHub under your account 'BHARANEETHARAN' named 'bike-rental-booking-system' (or any name you prefer)."
Write-Host "You can create it via the GitHub website or using the GitHub CLI (gh)."

Write-Host "If using gh CLI (recommended):"
Write-Host "  gh repo create BHARANEETHARAN/bike-rental-booking-system --public --source=. --remote=origin --push"

Write-Host "Or run these commands after creating the repo on GitHub and replacing <repo-url>:"
Write-Host "  git remote add origin <repo-url>"
Write-Host "  git branch -M main"
Write-Host "  git push -u origin main"

Write-Host "\nIf you want, paste the repo URL here and I can show the exact push command." -ForegroundColor Green
