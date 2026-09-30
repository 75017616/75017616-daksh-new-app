import 'package:flutter/material.dart';

class NativeSwotScreen extends StatelessWidget {
  const NativeSwotScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Cognitive SWOT & Career Alignment', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            _buildQuadrantCard(
              title: 'STRENGTHS',
              subtitle: 'Inherent cognitive advantages',
              color: const Color(0xFF10B981),
              icon: Icons.shield_outlined,
              items: [
                'High logical problem decomposition',
                'Fast pattern recognition in visual data',
                'Strong intrinsic self-motivation and goal focus',
              ],
            ),
            const SizedBox(height: 12),
            _buildQuadrantCard(
              title: 'WEAKNESSES',
              subtitle: 'Areas for strategic improvement',
              color: const Color(0xFFF59E0B),
              icon: Icons.lightbulb_outline,
              items: [
                'Patience with unstructured group communication',
                'Verbal articulation of complex intuitions',
                'Prone to overthinking routine decisions',
              ],
            ),
            const SizedBox(height: 12),
            _buildQuadrantCard(
              title: 'OPPORTUNITIES',
              subtitle: 'Emerging fields aligned to profile',
              color: const Color(0xFF3B82F6),
              icon: Icons.rocket_launch_outlined,
              items: [
                'AI Architecture & Computational Neuroscience',
                'Autonomous Systems & Spatial Computing (AR/VR)',
                'Quantitative Decision Systems & Game Theory',
              ],
            ),
            const SizedBox(height: 12),
            _buildQuadrantCard(
              title: 'THREATS',
              subtitle: 'Cognitive pitfalls to mitigate',
              color: const Color(0xFFEF4444),
              icon: Icons.warning_amber_rounded,
              items: [
                'Burnout from hyper-focused deep analytical sprints',
                'Neglecting physical kinesthetic breaks',
                'Imposter syndrome when navigating subjective arts',
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildQuadrantCard({
    required String title,
    required String subtitle,
    required Color color,
    required IconData icon,
    required List<String> items,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: color.withOpacity(0.3), width: 1.5),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CircleAvatar(
                radius: 14,
                backgroundColor: color.withOpacity(0.15),
                child: Icon(icon, color: color, size: 16),
              ),
              const SizedBox(width: 8),
              Text(
                title,
                style: TextStyle(fontWeight: FontWeight.bold, color: color, fontSize: 13, letterSpacing: 0.5),
              ),
              const Spacer(),
              Text('${items.length} Points', style: TextStyle(fontSize: 11, color: Colors.grey[600], fontWeight: FontWeight.w600)),
            ],
          ),
          const SizedBox(height: 4),
          Text(subtitle, style: const TextStyle(fontSize: 11, color: Color(0xFF64748B))),
          const SizedBox(height: 12),
          ...items.map((it) => Padding(
            padding: const EdgeInsets.only(bottom: 6.0),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  margin: const EdgeInsets.only(top: 6),
                  width: 5,
                  height: 5,
                  decoration: BoxDecoration(shape: BoxShape.circle, color: color),
                ),
                const SizedBox(width: 8),
                Expanded(child: Text(it, style: const TextStyle(fontSize: 12, color: Color(0xFF334155), height: 1.4))),
              ],
            ),
          )),
        ],
      ),
    );
  }
}
