@echo off
title ClipForge AI - Video Clipping Platform
cls
echo ========================================================
echo   ClipForge AI - YouTube to Shorts & Reels Generator
echo ========================================================
echo.
echo Starting local ClipForge AI server on port 8080...
echo.

start "" http://localhost:8080

python server.py
pause
