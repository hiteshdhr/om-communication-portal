#!/usr/bin/env pwsh
# ─────────────────────────────────────────────────────────────────────────────
# verify-login.ps1
# Run this AFTER deploying both backend and frontend to verify the login flow.
#
# Usage:
#   .\verify-login.ps1 -RailwayUrl "https://your-service.up.railway.app" -Password "YourPassword"
# ─────────────────────────────────────────────────────────────────────────────

param(
    [Parameter(Mandatory=$true)]
    [string]$RailwayUrl,

    [Parameter(Mandatory=$true)]
    [string]$Password
)

$loginUrl = "$($RailwayUrl.TrimEnd('/'))/api/auth/login"
$body = "{`"username`":`"admin`",`"password`":`"$Password`"}"

Write-Host "`n[1] Testing Railway backend directly: POST $loginUrl" -ForegroundColor Cyan

try {
    $resp = Invoke-WebRequest -Uri $loginUrl -Method POST -ContentType "application/json" -Body $body -ErrorAction Stop
    Write-Host "[OK] Status: $($resp.StatusCode)" -ForegroundColor Green
    $data = $resp.Content | ConvertFrom-Json
    if ($data.token) {
        Write-Host "[OK] JWT token received (length: $($data.token.Length) chars)" -ForegroundColor Green
        Write-Host "[OK] Logged in as: $($data.username) with role: $($data.role)" -ForegroundColor Green
    }
} catch {
    $errResp = $_.Exception.Response
    if ($errResp) {
        $stream = $errResp.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $errBody = $reader.ReadToEnd()
        Write-Host "[FAIL] Status: $($errResp.StatusCode)" -ForegroundColor Red
        Write-Host "[FAIL] Body: $errBody" -ForegroundColor Red
    } else {
        Write-Host "[FAIL] Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n[2] Testing Cloudflare -> Railway (production URL): POST" -ForegroundColor Cyan
$cfLoginUrl = "https://om-communication-portal.hiteshdheer155.workers.dev/api/auth/login"

try {
    $resp2 = Invoke-WebRequest -Uri $cfLoginUrl -Method POST -ContentType "application/json" -Body $body -ErrorAction Stop
    Write-Host "[OK] Cloudflare status: $($resp2.StatusCode)" -ForegroundColor Green
} catch {
    $errResp2 = $_.Exception.Response
    if ($errResp2) {
        Write-Host "[STATUS] Cloudflare response: $($errResp2.StatusCode)" -ForegroundColor Yellow
        Write-Host "  -> If 405 or HTML: frontend was NOT rebuilt with VITE_API_URL set" -ForegroundColor Yellow
    } else {
        Write-Host "[FAIL] $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`nDone." -ForegroundColor Cyan
