/**
 * Client-side Flutter Hybrid Bridge Service
 * Handles bidirectional communication when the Vite app is rendered
 * inside a Flutter InAppWebView / WebView container.
 */

declare global {
  interface Window {
    FlutterBridge?: {
      postMessage: (msg: any) => void;
      triggerHaptic?: (type: 'light' | 'medium' | 'heavy' | 'selection') => void;
      share?: (title: string, text: string) => void;
      navigate?: (screen: string, payload?: any) => void;
    };
    flutter_inappwebview?: {
      callHandler: (handlerName: string, ...args: any[]) => Promise<any>;
    };
    isFlutterHybrid?: boolean;
  }
}

export class FlutterBridgeService {
  /**
   * Checks whether the web app is running inside a Flutter Hybrid mobile container
   */
  static isInsideFlutter(): boolean {
    if (typeof window === 'undefined') return false;
    return Boolean(
      window.isFlutterHybrid ||
      window.FlutterBridge ||
      window.flutter_inappwebview
    );
  }

  /**
   * Triggers native device haptic vibration
   */
  static triggerHaptic(type: 'light' | 'medium' | 'heavy' | 'selection' = 'selection'): void {
    if (window.FlutterBridge?.triggerHaptic) {
      window.FlutterBridge.triggerHaptic(type);
      return;
    }

    if (window.flutter_inappwebview?.callHandler) {
      window.flutter_inappwebview.callHandler('FlutterBridge', JSON.stringify({
        action: 'haptic',
        payload: { type }
      })).catch(() => {});
      return;
    }

    // Web fallback using navigator.vibrate if available
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      const duration = type === 'heavy' ? 40 : type === 'medium' ? 25 : 12;
      try {
        navigator.vibrate(duration);
      } catch {
        // Ignore fallback errors
      }
    }
  }

  /**
   * Prompts the native OS share sheet via Flutter or Web Share API
   */
  static async share(title: string, text: string, url?: string): Promise<boolean> {
    if (window.FlutterBridge?.share) {
      window.FlutterBridge.share(title, `${text} ${url || ''}`.trim());
      return true;
    }

    if (window.flutter_inappwebview?.callHandler) {
      try {
        await window.flutter_inappwebview.callHandler('FlutterBridge', JSON.stringify({
          action: 'share',
          payload: { title, text: `${text} ${url || ''}`.trim() }
        }));
        return true;
      } catch {
        // Fallback to Web Share API
      }
    }

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, text, url: url || window.location.href });
        return true;
      } catch {
        return false;
      }
    }

    return false;
  }

  /**
   * Requests Flutter to switch to a native screen or trigger native counselor
   */
  static sendNativeNavigation(screen: string, payload?: any): void {
    if (window.FlutterBridge?.navigate) {
      window.FlutterBridge.navigate(screen, payload);
      return;
    }

    if (window.flutter_inappwebview?.callHandler) {
      window.flutter_inappwebview.callHandler('FlutterBridge', JSON.stringify({
        action: 'navigate',
        payload: { screen, ...payload }
      })).catch(() => {});
    }
  }
}
