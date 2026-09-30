import 'package:flutter/material.dart';

class CognitiveBadgesDialog extends StatelessWidget {
  const CognitiveBadgesDialog({super.key});

  static const List<Map<String, String>> badges = [
    {'title': 'Logic Maestro', 'desc': 'Top 5% in Mathematical algorithmic problem solving', 'icon': '🧠', 'color': '0xFF4F46E5'},
    {'title': 'Tactile Craftsman', 'desc': 'Mastery of physical prototype and fine motor tests', 'icon': '🖐️', 'color': '0xFFF59E0B'},
    {'title': 'Whole-Brain Thinker', 'desc': 'Balanced 56/44 Left-Right hemispheric coordination', 'icon': '🔮', 'color': '0xFF8B5CF6'},
    {'title': 'Consistent Scholar', 'desc': 'Completed all 6 core cognitive testing batteries', 'icon': '🏆', 'color': '0xFF10B981'},
    {'title': 'DISC Visionary', 'desc': 'Strategic Architect archetype with high execution index', 'icon': '⚡', 'color': '0xFFEC4899'},
    {'title': 'Focus Champion', 'desc': 'Completed 10+ Pomodoro deep cognitive focus sprints', 'icon': '⏱️', 'color': '0xFF06B6D4'},
  ];

  @override
  Widget build(BuildContext context) {
    return Dialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Row(
                  children: [
                    Text('🏆', style: TextStyle(fontSize: 20)),
                    SizedBox(width: 8),
                    Text('Cognitive Badges', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                  ],
                ),
                IconButton(
                  icon: const Icon(Icons.close, size: 18),
                  onPressed: () => Navigator.pop(context),
                  padding: EdgeInsets.zero,
                  constraints: const BoxConstraints(),
                ),
              ],
            ),
            const SizedBox(height: 4),
            const Text('6 Unlocked Achievement Badges', style: TextStyle(fontSize: 12, color: Color(0xFF64748B))),
            const SizedBox(height: 16),

            ...badges.map((b) {
              return Container(
                margin: const EdgeInsets.only(bottom: 8),
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                ),
                child: Row(
                  children: [
                    Text(b['icon']!, style: const TextStyle(fontSize: 22)),
                    const SizedBox(width: 10),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(b['title']!, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                          Text(b['desc']!, style: const TextStyle(fontSize: 10, color: Color(0xFF64748B))),
                        ],
                      ),
                    ),
                    const Icon(Icons.verified, size: 16, color: Color(0xFF10B981)),
                  ],
                ),
              );
            }),
          ],
        ),
      ),
    );
  }
}
