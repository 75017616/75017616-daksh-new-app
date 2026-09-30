import 'package:flutter/material.dart';
import '../models/intelligence_models.dart';
import '../services/gemini_service.dart';

class NativeAICounselorScreen extends StatefulWidget {
  final StudentProfile profile;
  final String? initialPrompt;

  const NativeAICounselorScreen({
    super.key,
    required this.profile,
    this.initialPrompt,
  });

  @override
  State<NativeAICounselorScreen> createState() => _NativeAICounselorScreenState();
}

class _NativeAICounselorScreenState extends State<NativeAICounselorScreen> {
  final TextEditingController _controller = TextEditingController();
  final List<Map<String, String>> _messages = [];
  bool _isLoading = false;
  late final GeminiCounselorService _geminiService;

  @override
  void initState() {
    super.initState();
    _geminiService = GeminiCounselorService(apiKey: const String.fromEnvironment('GEMINI_API_KEY'));

    // Welcome message
    _messages.add({
      'role': 'assistant',
      'text': 'Hello ${widget.profile.name}! I am Vayo, your dedicated psychological & career mentor. I have analyzed your 8 Multiple Intelligences and Brain Dominance profile. How can I guide you today?',
    });

    if (widget.initialPrompt != null && widget.initialPrompt!.isNotEmpty) {
      _controller.text = widget.initialPrompt!;
    }
  }

  Future<void> _sendMessage([String? overrideText]) async {
    final text = overrideText ?? _controller.text.trim();
    if (text.isEmpty) return;

    setState(() {
      _messages.add({'role': 'user', 'text': text});
      _isLoading = true;
      _controller.clear();
    });

    final answer = await _geminiService.askCounselor(
      userQuery: text,
      studentName: widget.profile.name,
      topIntelligence: 'Logical - Mathematical (94%)',
      brainDominance: 'Balanced Whole-Brain (56% Left / 44% Right)',
    );

    if (mounted) {
      setState(() {
        _messages.add({'role': 'assistant', 'text': answer});
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Row(
          children: [
            CircleAvatar(
              radius: 16,
              backgroundColor: Color(0xFFE0E7FF),
              child: Icon(Icons.psychology, color: Color(0xFF4F46E5), size: 20),
            ),
            SizedBox(width: 10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Vayo AI Counselor', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                Text('Psychological & Career Mentor', style: TextStyle(fontSize: 11, color: Color(0xFF64748B))),
              ],
            ),
          ],
        ),
      ),
      body: Column(
        children: [
          // Prompt suggestions
          Container(
            height: 44,
            padding: const EdgeInsets.symmetric(vertical: 4),
            child: ListView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 12),
              children: [
                _buildPromptChip('Best careers for my profile?'),
                _buildPromptChip('How to improve interpersonal skills?'),
                _buildPromptChip('Should I choose STEM or Design?'),
                _buildPromptChip('Tips to reduce study overthinking'),
              ],
            ),
          ),
          const Divider(height: 1),

          // Chat messages list
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final msg = _messages[index];
                final isUser = msg['role'] == 'user';
                return Align(
                  alignment: isUser ? Alignment.centerRight : Alignment.centerLeft,
                  child: Container(
                    margin: const EdgeInsets.only(bottom: 12),
                    constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.82),
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                    decoration: BoxDecoration(
                      color: isUser ? const Color(0xFF4F46E5) : Colors.white,
                      borderRadius: BorderRadius.only(
                        topLeft: const Radius.circular(16),
                        topRight: const Radius.circular(16),
                        bottomLeft: Radius.circular(isUser ? 16 : 4),
                        bottomRight: Radius.circular(isUser ? 4 : 16),
                      ),
                      border: isUser ? null : Border.all(color: const Color(0xFFE2E8F0)),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.03),
                          blurRadius: 4,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ),
                    child: Text(
                      msg['text'] ?? '',
                      style: TextStyle(
                        color: isUser ? Colors.white : const Color(0xFF0F172A),
                        fontSize: 14,
                        height: 1.45,
                      ),
                    ),
                  ),
                );
              },
            ),
          ),

          if (_isLoading)
            const Padding(
              padding: EdgeInsets.all(8.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(
                    width: 16,
                    height: 16,
                    child: CircularProgressIndicator(strokeWidth: 2, color: Color(0xFF4F46E5)),
                  ),
                  SizedBox(width: 8),
                  Text('Vayo is formulating psychological guidance...', style: TextStyle(fontSize: 12, color: Color(0xFF64748B))),
                ],
              ),
            ),

          // Message input bar
          Container(
            padding: const EdgeInsets.all(12),
            color: Colors.white,
            child: SafeArea(
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _controller,
                      decoration: InputDecoration(
                        hintText: 'Ask Vayo about career or cognitive growth...',
                        hintStyle: const TextStyle(fontSize: 13, color: Color(0xFF94A3B8)),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(24),
                          borderSide: const BorderSide(color: Color(0xFFCBD5E1)),
                        ),
                        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                      ),
                      onSubmitted: (_) => _sendMessage(),
                    ),
                  ),
                  const SizedBox(width: 8),
                  IconButton.filled(
                    style: IconButton.styleFrom(backgroundColor: const Color(0xFF4F46E5)),
                    icon: const Icon(Icons.send_rounded, color: Colors.white, size: 18),
                    onPressed: _sendMessage,
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPromptChip(String text) {
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: ActionChip(
        label: Text(text, style: const TextStyle(fontSize: 11, color: Color(0xFF334155))),
        backgroundColor: const Color(0xFFF1F5F9),
        side: const BorderSide(color: Color(0xFFE2E8F0)),
        onPressed: () => _sendMessage(text),
      ),
    );
  }
}
