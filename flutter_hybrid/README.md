# Daksh Hybrid Mobile Platform (Flutter + Vite.js)

A production-ready hybrid mobile architecture integrating the **Daksh Multi-Intelligence & Career Assessment Platform** with Flutter.

---

## 🏗️ Architecture Overview

The platform supports **dual-engine execution**:

1. **Hybrid WebView Mode (`flutter_inappwebview`)**:
   - Directly loads the high-performance Vite React web application.
   - Provides a zero-latency bidirectional JavaScript Bridge (`FlutterHybridBridge`).
   - Seamlessly exposes native mobile hardware (device haptics, system share sheet, local secure storage, native alerts).
   - Injects `window.FlutterBridge` and sets `window.isFlutterHybrid = true`.

2. **Pure Native Flutter Mode (60 FPS Material 3)**:
   - Built with native Flutter widgets and `CustomPainter` radar chart.
   - Complete screens for:
     - **Native Dashboard**: Multi-intelligence quotient banner, metric cards, profile switcher.
     - **8 Intelligences**: Full score breakdowns, learning styles, career paths, and improvement drills.
     - **Brain Dominance**: Interactive left/right hemisphere analysis and sensory trait comparison.
     - **Cognitive SWOT**: 4-quadrant strategic matrix (Strengths, Weaknesses, Opportunities, Threats).
     - **Vayo AI Counselor**: Native Gemini 2.5 streaming chat for career and psychological mentoring.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- [Flutter SDK](https://docs.flutter.dev/get-started/install) (>= 3.16.0)
- Android Studio / Xcode

### 2. Setup Project
```bash
# Clone or navigate to the project directory
cd flutter_hybrid

# Install dependencies
flutter pub get
```

### 3. Run on Emulator or Physical Device
```bash
# Run in debug mode (default connects to live web app)
flutter run

# To test against a local Vite dev server (e.g., http://10.0.2.2:3000 on Android emulator)
flutter run --dart-define=WEB_URL=http://10.0.2.2:3000
```

### 4. Build Release Packages
```bash
# Build Android APK
flutter build apk --release

# Build Android App Bundle (for Google Play Store)
flutter build appbundle --release

# Build iOS Archive (on macOS)
flutter build ipa --release
```

---

## 🔌 Bidirectional JavaScript Bridge API

### Web to Flutter Calls
From anywhere in your JavaScript / React app:
```javascript
// 1. Device Haptics
window.FlutterBridge?.triggerHaptic('selection'); // or 'light', 'medium', 'heavy'

// 2. Native Share Sheet
window.FlutterBridge?.share('Daksh Assessment', 'Check out my 94% Logical Intelligence profile!');

// 3. Native Screen Navigation
window.FlutterBridge?.navigate('swot', { profileId: '1' });

// 4. Trigger AI Counselor
window.FlutterBridge?.postMessage({
  action: 'ai_counsel',
  payload: { prompt: 'Recommend career options for Logical + Spatial dominant students' }
});
```

---

## 📁 Project Directory Structure
```
flutter_hybrid/
├── pubspec.yaml
├── README.md
├── android/
│   ├── app/
│   │   ├── build.gradle
│   │   └── src/main/AndroidManifest.xml
├── ios/
│   └── Runner/Info.plist
└── lib/
    ├── main.dart                          # App Entrypoint & Mode Switcher
    ├── config/
    │   └── app_theme.dart                 # Indigo/Slate Material 3 Theme
    ├── models/
    │   └── intelligence_models.dart       # Data Models & Schemas
    ├── services/
    │   ├── flutter_bridge.dart            # Bidirectional JS Channel
    │   └── gemini_service.dart            # Native Gemini 2.5 Integration
    ├── widgets/
    │   └── intelligence_radar_chart.dart  # CustomPainter 8-Axis Radar Chart
    └── screens/
        ├── hybrid_webview_screen.dart     # InAppWebView Host
        ├── native_dashboard_screen.dart   # Native Dashboard UI
        ├── native_intelligence_screen.dart# 8 Intelligences UI
        ├── native_brain_dominance_screen.dart
        ├── native_swot_screen.dart
        └── native_ai_counselor_screen.dart# Native AI Counselor Chat
```
