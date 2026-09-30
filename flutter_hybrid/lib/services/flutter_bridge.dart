import 'dart:convert';
import 'package:flutter/services.dart';
import 'package:share_plus/share_plus.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Bidirectional Flutter <-> JavaScript Hybrid Communication Bridge
class FlutterHybridBridge {
  static const String channelName = 'FlutterBridge';

  // Listeners for incoming events from the Web application
  Function(String screen, dynamic payload)? onNavigateRequested;
  Function(Map<String, dynamic> profile)? onProfileUpdated;
  Function(String prompt)? onAIChatTriggered;

  /// Process incoming JSON message from JavaScript running inside the WebView:
  /// Example JS Call:
  /// window.flutter_inappwebview.callHandler('FlutterBridge', JSON.stringify({ action: 'haptic', type: 'selection' }))
  /// or
  /// FlutterBridge.postMessage(JSON.stringify({ action: 'navigate', target: 'swot' }))
  Future<Map<String, dynamic>> handleJavaScriptMessage(String messagePayload) async {
    try {
      final Map<String, dynamic> data = jsonDecode(messagePayload);
      final String action = data['action'] ?? '';
      final dynamic payload = data['payload'];

      switch (action) {
        case 'haptic':
          await _handleHaptic(payload);
          return {'status': 'success', 'handled': 'haptic'};

        case 'share':
          final String title = payload['title'] ?? 'Daksh Intelligence Report';
          final String text = payload['text'] ?? '';
          await Share.share('$title\n$text');
          return {'status': 'success', 'handled': 'share'};

        case 'navigate':
          if (onNavigateRequested != null) {
            onNavigateRequested!(payload['screen'] ?? 'dashboard', payload);
          }
          return {'status': 'success', 'handled': 'navigate'};

        case 'save_local':
          final prefs = await SharedPreferences.getInstance();
          final String key = payload['key'] ?? 'daksh_data';
          final String val = payload['value'] ?? '';
          await prefs.setString(key, val);
          return {'status': 'success', 'handled': 'save_local'};

        case 'get_local':
          final prefs = await SharedPreferences.getInstance();
          final String key = payload['key'] ?? 'daksh_data';
          final String? val = prefs.getString(key);
          return {'status': 'success', 'data': val};

        case 'ai_counsel':
          if (onAIChatTriggered != null) {
            onAIChatTriggered!(payload['prompt'] ?? '');
          }
          return {'status': 'success', 'handled': 'ai_counsel'};

        default:
          return {'status': 'unhandled_action', 'action': action};
      }
    } catch (e) {
      return {'status': 'error', 'message': e.toString()};
    }
  }

  Future<void> _handleHaptic(dynamic payload) async {
    final String type = payload is Map ? (payload['type'] ?? 'medium') : 'medium';
    switch (type) {
      case 'light':
        await HapticFeedback.lightImpact();
        break;
      case 'medium':
        await HapticFeedback.mediumImpact();
        break;
      case 'heavy':
        await HapticFeedback.heavyImpact();
        break;
      case 'selection':
        await HapticFeedback.selectionClick();
        break;
      default:
        await HapticFeedback.mediumImpact();
    }
  }

  /// JavaScript snippet injected into the WebView to set up `window.FlutterBridge`
  static String get injectionJavaScript => '''
    (function() {
      if (window.FlutterBridge) return;
      window.isFlutterHybrid = true;
      window.FlutterBridge = {
        postMessage: function(msg) {
          if (window.flutter_inappwebview && window.flutter_inappwebview.callHandler) {
            return window.flutter_inappwebview.callHandler('FlutterBridge', typeof msg === 'string' ? msg : JSON.stringify(msg));
          } else if (window.FlutterBridgeChannel && window.FlutterBridgeChannel.postMessage) {
            return window.FlutterBridgeChannel.postMessage(typeof msg === 'string' ? msg : JSON.stringify(msg));
          }
        },
        triggerHaptic: function(type) {
          this.postMessage({ action: 'haptic', payload: { type: type || 'selection' } });
        },
        share: function(title, text) {
          this.postMessage({ action: 'share', payload: { title: title, text: text } });
        },
        navigate: function(screen, payload) {
          this.postMessage({ action: 'navigate', payload: { screen: screen, ...payload } });
        }
      };
      // Dispatch custom event to notify React app that Flutter bridge is active
      window.dispatchEvent(new CustomEvent('FlutterBridgeReady'));
    })();
  ''';
}
