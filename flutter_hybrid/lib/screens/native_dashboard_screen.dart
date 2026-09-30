import 'package:flutter/material.dart';
import '../models/intelligence_models.dart';
import '../widgets/intelligence_radar_chart.dart';

class NativeDashboardScreen extends StatelessWidget {
  final StudentProfile profile;
  final VoidCallback onOpenCounselor;
  final Function(String screen) onNavigate;

  const NativeDashboardScreen({
    super.key,
    required this.profile,
    required this.onOpenCounselor,
    required this.onNavigate,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: Row(
          children: [
            CircleAvatar(
              backgroundColor: const Color(0xFFE0E7FF),
              child: Text(profile.avatar, style: const TextStyle(fontSize: 20)),
            ),
            const SizedBox(width: 12),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  profile.name,
                  style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                ),
                Text(
                  '${profile.grade} • ${profile.role}',
                  style: const TextStyle(fontSize: 12, color: Color(0xFF64748B)),
                ),
              ],
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.share_outlined, color: Color(0xFF475569)),
            onPressed: () {},
          ),
          IconButton(
            icon: const Icon(Icons.notifications_none, color: Color(0xFF475569)),
            onPressed: () {},
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Hero Banner: Overall Intelligence Quotient
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF4F46E5), Color(0xFF6366F1), Color(0xFF8B5CF6)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(24),
                boxShadow: [
                  BoxShadow(
                    color: const Color(0xFF4F46E5).withOpacity(0.3),
                    blurRadius: 16,
                    offset: const Offset(0, 6),
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: Colors.white.withOpacity(0.2),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: const Text(
                          'COGNITIVE INDEX 92/100',
                          style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold),
                        ),
                      ),
                      const Icon(Icons.auto_awesome, color: Colors.amberAccent, size: 20),
                    ],
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    'Multi-Intelligence Matrix',
                    style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    'Balanced analytic-creative profile with dominant Logical & Spatial aptitudes.',
                    style: TextStyle(color: Colors.white70, fontSize: 13),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton.icon(
                    onPressed: onOpenCounselor,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.white,
                      foregroundColor: const Color(0xFF4F46E5),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                    icon: const Icon(Icons.chat_bubble_outline, size: 16),
                    label: const Text('Consult Vayo AI Mentor'),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 20),

            // Quick Category Cards
            Row(
              children: [
                Expanded(
                  child: _MetricCard(
                    title: '8 Intelligences',
                    value: 'Logical (94%)',
                    icon: Icons.psychology,
                    color: const Color(0xFF6366F1),
                    onTap: () => onNavigate('intelligence'),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _MetricCard(
                    title: 'Brain Dominance',
                    value: 'Left 56% / Right 44%',
                    icon: Icons.bubble_chart,
                    color: const Color(0xFF06B6D4),
                    onTap: () => onNavigate('brain'),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: _MetricCard(
                    title: 'SWOT Analysis',
                    value: '18 Traits',
                    icon: Icons.grid_view_rounded,
                    color: const Color(0xFF10B981),
                    onTap: () => onNavigate('swot'),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _MetricCard(
                    title: 'Careers Match',
                    value: 'Data & Architecture',
                    icon: Icons.work_outline,
                    color: const Color(0xFFF59E0B),
                    onTap: () => onNavigate('swot'),
                  ),
                ),
              ],
            ),

            const SizedBox(height: 24),

            // Native Radar Chart Widget
            Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: const Color(0xFFE2E8F0)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        'Cognitive Radar',
                        style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                      ),
                      TextButton(
                        onPressed: () => onNavigate('intelligence'),
                        child: const Text('View All 8', style: TextStyle(fontSize: 13, color: Color(0xFF4F46E5))),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  const IntelligenceRadarChart(
                    scores: [94, 88, 76, 82, 68, 79, 85, 72],
                    labels: ['Logical', 'Spatial', 'Linguistic', 'Interpersonal', 'Musical', 'Kinesthetic', 'Intrapersonal', 'Natural'],
                    primaryColor: Color(0xFF4F46E5),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _MetricCard extends StatelessWidget {
  final String title;
  final String value;
  final IconData icon;
  final Color color;
  final VoidCallback onTap;

  const _MetricCard({
    required this.title,
    required this.value,
    required this.icon,
    required this.color,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: const Color(0xFFE2E8F0)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            CircleAvatar(
              radius: 18,
              backgroundColor: color.withOpacity(0.12),
              child: Icon(icon, color: color, size: 20),
            ),
            const SizedBox(height: 12),
            Text(title, style: const TextStyle(fontSize: 12, color: Color(0xFF64748B), fontWeight: FontWeight.w500)),
            const SizedBox(height: 4),
            Text(value, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
          ],
        ),
      ),
    );
  }
}
