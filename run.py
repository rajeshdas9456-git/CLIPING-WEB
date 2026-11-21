#!/usr/bin/env python3
"""
ClipForge AI - Quick Start Launcher
"""
import webbrowser
import threading
import time
import server

def open_browser():
    time.sleep(1.2)
    try:
        webbrowser.open("http://localhost:8080")
    except Exception:
        pass

if __name__ == "__main__":
    threading.Thread(target=open_browser, daemon=True).start()
    server.run_server(8080)
