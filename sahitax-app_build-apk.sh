#!/bin/bash
# One-shot APK build script. Run from project root.
# Requires: Android Studio + JDK 17 + Android SDK installed.

set -e

echo "1/4 Installing dependencies..."
npm install

echo "2/4 Building web app..."
npm run build

echo "3/4 Adding Android platform (skipped if already added)..."
npx cap add android 2>/dev/null || echo "  (already added)"

echo "4/4 Syncing and building APK..."
npx cap sync android
cd android
./gradlew assembleDebug

echo ""
echo "✓ Done. APK is at:"
echo "  $(pwd)/app/build/outputs/apk/debug/app-debug.apk"
