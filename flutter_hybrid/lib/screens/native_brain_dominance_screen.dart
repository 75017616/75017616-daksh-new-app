import 'package:flutter/material.dart';

class NativeBrainDominanceScreen extends StatelessWidget {
  const NativeBrainDominanceScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Brain Dominance Analysis', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // Hemisphere comparison bar
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: const Color(0xFFE2E8F0)),
              ),
              child: Column(
                children: [
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Left Brain (Analytic)', style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF4F46E5))),
                      Text('Right Brain (Creative)', style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFFEC4899))),
                    ],
                  ),
                  const SizedBox(height: 10),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(10),
                    child: SizedBox(
                      height: 24,
                      child: Row(
                        children: [
                          Expanded(
                            flex: 56,
                            child: Container(
                              color: const Color(0xFF4F46E5),
                              alignment: Alignment.center,
                              child: const Text('56%', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12)),
                            ),
                          ),
                          Expanded(
                            flex: 44,
                            child: Container(
                              color: const Color(0xFFEC4899),
                              alignment: Alignment.center,
                              child: const Text('44%', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12)),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Dominant Pattern: Balanced Analytic-Intuitive (Whole-Brain Thinker)',
                    textAlign: TextAlign.center,
                    style: TextStyle(fontWeight: FontWeight.w600, color: Color(0xFF0F172A), fontSize: 14),
                  ),
                  const SizedBox(height: 6),
                  const Text(
                    'You possess both structured logic for systemic problem breakdown and intuitive spatial imagination for novel solution prototyping.',
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Color(0xFF64748B), fontSize: 12),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // Left vs Right traits grid
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: _TraitColumn(
                    title: 'Left Hemisphere',
                    color: const Color(0xFF4F46E5),
                    traits: const [
                      'Sequential Logic',
                      'Mathematical Reasoning',
                      'Grammar & Syntax',
                      'Critical Evaluation',
                      'Rule-Based Deduction',
                    ],
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _TraitColumn(
                    title: 'Right Hemisphere',
                    color: const Color(0xFFEC4899),
                    traits: const [
                      'Holistic Synthesis',
                      'Spatial Visualization',
                      'Creative Metaphor',
                      'Emotional Empathy',
                      'Pattern Recognition',
                    ],
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _TraitColumn extends StatelessWidget {
  final String title;
  final Color color;
  final List<String> traits;

  const _TraitColumn({
    required this.title,
    required this.color,
    required this.traits,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: TextStyle(fontWeight: FontWeight.bold, color: color, fontSize: 13)),
          const SizedBox(height: 10),
          ...traits.map((t) => Padding(
            padding: const EdgeInsets.only(bottom: 8.0),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Icon(Icons.check_circle_outline, size: 14, color: color),
                const SizedBox(width: 6),
                Expanded(
                  child: Text(t, style: const TextStyle(fontSize: 12, color: Color(0xFF334155))),
                ),
              ],
            ),
          )),
        ],
      ),
    );
  }
}
