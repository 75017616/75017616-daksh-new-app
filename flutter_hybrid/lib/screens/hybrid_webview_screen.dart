import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import '../services/flutter_bridge.dart';

class HybridWebViewScreen extends StatefulWidget {
  final String initialUrl;
  final FlutterHybridBridge bridge;

  const HybridWebViewScreen({
    super.key,
    this.initialUrl = 'http://localhost:3000',
    required this.bridge,
  });

  @override
  State<HybridWebViewScreen> createState() => _HybridWebViewScreenState();
}

class _HybridWebViewScreenState extends State<HybridWebViewScreen> {
  InAppWebViewController? webViewController;
  double progress = 0;
  bool isLoading = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Row(
          children: [
            Text(
              'Daksh',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
            ),
            SizedBox(width: 8),
            Chip(
              label: Text('HYBRID WEBVIEW', style: TextStyle(fontSize: 10, color: Colors.white, fontWeight: FontWeight.bold)),
              backgroundColor: Color(0xFF4F46E5),
              padding: EdgeInsets.zero,
              materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () => webViewController?.reload(),
            tooltip: 'Reload App',
          ),
        ],
      ),
      body: Stack(
        children: [
          InAppWebView(
            initialUrlRequest: URLRequest(url: WebUri(widget.initialUrl)),
            initialSettings: InAppWebViewSettings(
              useShouldOverrideUrlLoading: true,
              mediaPlaybackRequiresUserGesture: false,
              allowsInlineMediaPlayback: true,
              javaScriptEnabled: true,
              domStorageEnabled: true,
              cacheEnabled: true,
              transparentBackground: false,
            ),
            onWebViewCreated: (controller) {
              webViewController = controller;

              // Register JavaScript bridge channel handler
              controller.addJavaScriptHandler(
                handlerName: FlutterHybridBridge.channelName,
                callback: (args) async {
                  if (args.isNotEmpty) {
                    final String msg = args[0].toString();
                    return await widget.bridge.handleJavaScriptMessage(msg);
                  }
                  return {'status': 'empty_message'};
                },
              );
            },
            onLoadStart: (controller, url) {
              setState(() {
                isLoading = true;
              });
            },
            onLoadStop: (controller, url) async {
              setState(() {
                isLoading = false;
              });
              // Inject the Flutter Bridge helper into the Vite web app context
              await controller.evaluateJavascript(
                source: FlutterHybridBridge.injectionJavaScript,
              );
            },
            onProgressChanged: (controller, p) {
              setState(() {
                progress = p / 100.0;
              });
            },
          ),
          if (isLoading)
            LinearProgressIndicator(
              value: progress > 0 ? progress : null,
              backgroundColor: Colors.transparent,
              valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFF4F46E5)),
            ),
        ],
      ),
    );
  }
}
