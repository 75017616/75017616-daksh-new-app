import 'package:flutter/material.dart';

class DailyDrillsDialog extends StatefulWidget {
  final String studentName;

  const DailyDrillsDialog({super.key, required this.studentName});

  @override
  State<DailyDrillsDialog> createState() => _DailyDrillsDialogState();
}

class _DailyDrillsDialogState extends State<DailyDrillsDialog> {
  final List<Map<String, dynamic>> _drills = [
    {'title': 'Mental Spatial Rotation', 'time': '3m', 'done': true},
    {'title': 'Algorithmic Speed Math', 'time': '5m', 'done': true},
    {'title': 'Analogical Metaphor Quiz', 'time': '4m', 'done': false},
    {'title': 'Tactile Handwriting Drill', 'time': '3m', 'done': false},
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
                    Text('⚡', style: TextStyle(fontSize: 20)),
                    SizedBox(width: 8),
                    Text('Daily Drills', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
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
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFEF3C7),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: const Text('Streak: 4 Days 🔥', style: TextStyle(color: Color(0xFFB45309), fontSize: 11, fontWeight: FontWeight.bold)),
                ),
                const SizedBox(width: 8),
                Text('Drills for ${widget.studentName}', style: const TextStyle(fontSize: 11, color: Color(0xFF64748B))),
              ],
            ),
            const SizedBox(height: 16),

            ..._drills.asMap().entries.map((entry) {
              final idx = entry.key;
              final d = entry.value;
              final bool isDone = d['done'] as bool;

              return Container(
                margin: const EdgeInsets.only(bottom: 8),
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                decoration: BoxDecoration(
                  color: isDone ? const Color(0xFFF8FAFC) : Colors.white,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: isDone ? const Color(0xFFCBD5E1) : const Color(0xFF4F46E5).withOpacity(0.3)),
                ),
                child: Row(
                  children: [
                    Checkbox(
                      value: isDone,
                      activeColor: const Color(0xFF10B981),
                      onChanged: (val) {
                        setState(() {
                          _drills[idx]['done'] = val ?? false;
                        });
                      },
                    ),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            d['title'] as String,
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 12,
                              decoration: isDone ? TextDecoration.lineThrough : null,
                              color: isDone ? const Color(0xFF94A3B8) : const Color(0xFF0F172A),
                            ),
                          ),
                          Text('Est. ${d['time']}', style: const TextStyle(fontSize: 10, color: Color(0xFF64748B))),
                        ],
                      ),
                    ),
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
