import 'package:flutter/material.dart';
import '../data/intelligence_data.dart';
import '../models/intelligence_models.dart';
import '../widgets/intelligence_radar_chart.dart';
import '../widgets/modals/focus_timer_dialog.dart';
import '../widgets/modals/stream_selector_dialog.dart';
import '../widgets/modals/cognitive_badges_dialog.dart';
import '../widgets/modals/daily_drills_dialog.dart';
import '../widgets/modals/upgrade_dialog.dart';
import '../widgets/modals/add_member_dialog.dart';
import 'eight_intelligence_screen.dart';
import 'five_senses_screen.dart';
import 'brain_dominance_screen.dart';
import 'personality_screen.dart';
import 'swot_screen.dart';
import 'recommendations_screen.dart';

class DashboardScreen extends StatefulWidget {
  final StudentProfile activeProfile;
  final List<StudentProfile> profiles;
  final Function(StudentProfile) onSelectProfile;
  final Function(StudentProfile) onAddMember;
  final VoidCallback onOpenCounselor;

  const DashboardScreen({
    super.key,
    required this.activeProfile,
    required this.profiles,
    required this.onSelectProfile,
    required this.onAddMember,
    required this.onOpenCounselor,
  });

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  void _showFocusTimer() {
    showDialog(
      context: context,
      builder: (_) => FocusTimerDialog(studentName: widget.activeProfile.name),
    );
  }

  void _showStreamSelector() {
    showDialog(
      context: context,
      builder: (_) => StreamSelectorDialog(studentName: widget.activeProfile.name),
    );
  }

  void _showBadges() {
    showDialog(context: context, builder: (_) => const CognitiveBadgesDialog());
  }

  void _showDailyDrills() {
    showDialog(
      context: context,
      builder: (_) => DailyDrillsDialog(studentName: widget.activeProfile.name),
    );
  }

  void _showUpgrade() {
    showDialog(context: context, builder: (_) => const UpgradeDialog());
  }

  void _showAddMember() {
    showDialog(
      context: context,
      builder: (_) => AddMemberDialog(onAdd: widget.onAddMember),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      backgroundColor: const Color(0xFFF8FAFC),
      drawer: _buildDrawer(),
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.menu_rounded, color: Color(0xFF1E293B)),
          onPressed: () => _scaffoldKey.currentState?.openDrawer(),
        ),
        title: InkWell(
          onTap: () => _scaffoldKey.currentState?.openDrawer(),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              CircleAvatar(
                radius: 16,
                backgroundColor: const Color(0xFFE0E7FF),
                child: Text(widget.activeProfile.avatar, style: const TextStyle(fontSize: 16)),
              ),
              const SizedBox(width: 8),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text(
                        widget.activeProfile.name,
                        style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                      ),
                      const Icon(Icons.arrow_drop_down, size: 18, color: Color(0xFF64748B)),
                    ],
                  ),
                  Text(
                    widget.activeProfile.role,
                    style: const TextStyle(fontSize: 10, color: Color(0xFF64748B)),
                  ),
                ],
              ),
            ],
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_none, size: 20, color: Color(0xFF475569)),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('🎉 ${widget.activeProfile.name} completed the cognitive battery!')),
              );
            },
          ),
          Padding(
            padding: const EdgeInsets.only(right: 12),
            child: ActionChip(
              avatar: const Text('👑', style: TextStyle(fontSize: 11)),
              label: const Text('Pro', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF065F46))),
              backgroundColor: const Color(0xFFECFDF5),
              side: const BorderSide(color: Color(0xFFA7F3D0)),
              onPressed: _showUpgrade,
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 1. Family Profile Switcher Horizontal Row
            Container(
              padding: const EdgeInsets.all(14),
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
                      const Text('Switch Profile', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Color(0xFF0F172A))),
                      InkWell(
                        onTap: _showAddMember,
                        child: const Text('+ Add Member', style: TextStyle(color: Color(0xFF4F46E5), fontSize: 11, fontWeight: FontWeight.bold)),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Row(
                      children: widget.profiles.map((p) {
                        final isCurrent = p.id == widget.activeProfile.id;
                        return Padding(
                          padding: const EdgeInsets.only(right: 14),
                          child: InkWell(
                            onTap: () => widget.onSelectProfile(p),
                            child: Column(
                              children: [
                                Stack(
                                  children: [
                                    Container(
                                      padding: const EdgeInsets.all(3),
                                      decoration: BoxDecoration(
                                        shape: BoxShape.circle,
                                        border: Border.all(
                                          color: isCurrent ? const Color(0xFF4F46E5) : Colors.transparent,
                                          width: 2,
                                        ),
                                      ),
                                      child: CircleAvatar(
                                        radius: 22,
                                        backgroundColor: const Color(0xFFF1F5F9),
                                        child: Text(p.avatar, style: const TextStyle(fontSize: 22)),
                                      ),
                                    ),
                                    if (isCurrent)
                                      const Positioned(
                                        bottom: 0,
                                        right: 0,
                                        child: CircleAvatar(
                                          radius: 6,
                                          backgroundColor: Color(0xFF10B981),
                                        ),
                                      ),
                                  ],
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  p.name,
                                  style: TextStyle(
                                    fontSize: 11,
                                    fontWeight: isCurrent ? FontWeight.bold : FontWeight.normal,
                                    color: isCurrent ? const Color(0xFF0F172A) : const Color(0xFF64748B),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        );
                      }).toList(),
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 14),

            // 2. Vayo AI Counselor Hero Banner
            Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF1E1363), Color(0xFF321F9C), Color(0xFF241372)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(24),
                boxShadow: [
                  BoxShadow(
                    color: const Color(0xFF321F9C).withOpacity(0.3),
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
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
                        decoration: BoxDecoration(
                          color: Colors.white.withOpacity(0.15),
                          borderRadius: BorderRadius.circular(14),
                        ),
                        child: const Text('✨ VAYO • AI COUNSELOR', style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),
                      ),
                      const Text('✦ Live AI', style: TextStyle(color: Colors.amberAccent, fontSize: 11, fontWeight: FontWeight.bold)),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Text(
                    'Hi ${widget.activeProfile.name}! 👋',
                    style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    'I have synthesized your DISC, Brain Dominance, and 8 Intelligences. Ask me anything about career pathways or study focus.',
                    style: TextStyle(color: Colors.white70, fontSize: 12, height: 1.35),
                  ),
                  const SizedBox(height: 14),
                  Row(
                    children: [
                      Expanded(
                        child: ElevatedButton.icon(
                          onPressed: widget.onOpenCounselor,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.white,
                            foregroundColor: const Color(0xFF1E1363),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                            padding: const EdgeInsets.symmetric(vertical: 10),
                          ),
                          icon: const Icon(Icons.chat_bubble_outline, size: 16),
                          label: const Text('Chat with Vayo', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: OutlinedButton.icon(
                          onPressed: _showUpgrade,
                          style: OutlinedButton.styleFrom(
                            foregroundColor: Colors.white,
                            side: const BorderSide(color: Colors.white38),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                            padding: const EdgeInsets.symmetric(vertical: 10),
                          ),
                          icon: const Icon(Icons.medical_services_outlined, size: 16),
                          label: const Text('Live Counselor', style: TextStyle(fontSize: 11)),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 14),

            // 3. Eight Intelligences Summary Card
            _buildDomainCard(
              title: '8 MULTIPLE INTELLIGENCES',
              subtitle: 'Bodily-Kinesthetic (85%) & Linguistic (80%) top traits',
              icon: Icons.psychology,
              color: const Color(0xFF4F46E5),
              onTap: () {
                Navigator.push(context, MaterialPageRoute(builder: (_) => const EightIntelligenceScreen()));
              },
              child: Column(
                children: [
                  IntelligenceRadarChart(
                    scores: IntelligenceData.intelligenceList.map((i) => i.score).toList(),
                    labels: IntelligenceData.intelligenceList.map((i) => i.shortName).toList(),
                    primaryColor: const Color(0xFF4F46E5),
                  ),
                  const SizedBox(height: 10),
                  Wrap(
                    spacing: 6,
                    runSpacing: 6,
                    children: IntelligenceData.intelligenceList.take(4).map((item) {
                      return Chip(
                        avatar: CircleAvatar(
                          backgroundColor: item.color,
                          radius: 5,
                        ),
                        label: Text('${item.shortName} ${item.score.toInt()}%', style: const TextStyle(fontSize: 10)),
                        backgroundColor: const Color(0xFFF8FAFC),
                        side: const BorderSide(color: Color(0xFFE2E8F0)),
                        visualDensity: VisualDensity.compact,
                        padding: EdgeInsets.zero,
                      );
                    }).toList(),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 14),

            // 4. Five Senses Modality Card
            _buildDomainCard(
              title: '5 SENSES SENSORY PROFILE',
              subtitle: 'Dominant: Touch & Tactile Modality (85%)',
              icon: Icons.visibility_outlined,
              color: const Color(0xFF06B6D4),
              onTap: () {
                Navigator.push(context, MaterialPageRoute(builder: (_) => const FiveSensesScreen()));
              },
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: const [
                  _SensoryIconScore(icon: '👁️', label: 'Vision', score: '80%'),
                  _SensoryIconScore(icon: '👂', label: 'Audio', score: '72%'),
                  _SensoryIconScore(icon: '🖐️', label: 'Touch', score: '85%'),
                  _SensoryIconScore(icon: '👃', label: 'Smell', score: '65%'),
                  _SensoryIconScore(icon: '👅', label: 'Taste', score: '55%'),
                ],
              ),
            ),

            const SizedBox(height: 14),

            // 5. Brain Dominance Card
            _buildDomainCard(
              title: 'BRAIN DOMINANCE DUALITY',
              subtitle: 'Balanced Whole-Brain (56% Left / 44% Right)',
              icon: Icons.bubble_chart,
              color: const Color(0xFF8B5CF6),
              onTap: () {
                Navigator.push(context, MaterialPageRoute(builder: (_) => const BrainDominanceScreen()));
              },
              child: Row(
                children: [
                  const Column(
                    children: [
                      Text('56%', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF4F46E5))),
                      Text('Left Brain\n(Analytic)', textAlign: TextAlign.center, style: TextStyle(fontSize: 10, color: Color(0xFF64748B))),
                    ],
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(8),
                      child: SizedBox(
                        height: 18,
                        child: Row(
                          children: [
                            Expanded(flex: 56, child: Container(color: const Color(0xFF4F46E5))),
                            Expanded(flex: 44, child: Container(color: const Color(0xFFEC4899))),
                          ],
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 14),
                  const Column(
                    children: [
                      Text('44%', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFFEC4899))),
                      Text('Right Brain\n(Creative)', textAlign: TextAlign.center, style: TextStyle(fontSize: 10, color: Color(0xFF64748B))),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 14),

            // 6. Personality & SWOT Grid
            Row(
              children: [
                Expanded(
                  child: InkWell(
                    borderRadius: BorderRadius.circular(20),
                    onTap: () {
                      Navigator.push(context, MaterialPageRoute(builder: (_) => const PersonalityScreen()));
                    },
                    child: Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: const Color(0xFFE2E8F0)),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const CircleAvatar(
                            radius: 18,
                            backgroundColor: Color(0xFFFDF2F8),
                            child: Icon(Icons.fingerprint, color: Color(0xFFEC4899), size: 20),
                          ),
                          const SizedBox(height: 10),
                          const Text('Personality', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                          const SizedBox(height: 2),
                          const Text('The Strategic Architect\n(D-C Blend)', style: TextStyle(fontSize: 11, color: Color(0xFF64748B))),
                        ],
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: InkWell(
                    borderRadius: BorderRadius.circular(20),
                    onTap: () {
                      Navigator.push(context, MaterialPageRoute(builder: (_) => const SwotScreen()));
                    },
                    child: Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: const Color(0xFFE2E8F0)),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const CircleAvatar(
                            radius: 18,
                            backgroundColor: Color(0xFFECFDF5),
                            child: Icon(Icons.grid_view, color: Color(0xFF10B981), size: 20),
                          ),
                          const SizedBox(height: 10),
                          const Text('SWOT Matrix', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                          const SizedBox(height: 2),
                          const Text('18 Cognitive Traits\n& Mitigation Tips', style: TextStyle(fontSize: 11, color: Color(0xFF64748B))),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDomainCard({
    required String title,
    required String subtitle,
    required IconData icon,
    required Color color,
    required VoidCallback onTap,
    required Widget child,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
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
              Row(
                children: [
                  CircleAvatar(
                    radius: 16,
                    backgroundColor: color.withOpacity(0.12),
                    child: Icon(icon, color: color, size: 18),
                  ),
                  const SizedBox(width: 10),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(title, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                      Text(subtitle, style: const TextStyle(fontSize: 10, color: Color(0xFF64748B))),
                    ],
                  ),
                ],
              ),
              IconButton(
                icon: const Icon(Icons.arrow_forward_ios, size: 14, color: Color(0xFF94A3B8)),
                onPressed: onTap,
              ),
            ],
          ),
          const Divider(height: 20),
          child,
        ],
      ),
    );
  }

  Widget _buildDrawer() {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          DrawerHeader(
            decoration: const BoxDecoration(
              gradient: LinearGradient(colors: [Color(0xFF1E1B4B), Color(0xFF312E81)]),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                CircleAvatar(
                  radius: 26,
                  backgroundColor: const Color(0xFFE0E7FF),
                  child: Text(widget.activeProfile.avatar, style: const TextStyle(fontSize: 26)),
                ),
                const SizedBox(height: 8),
                Text(
                  widget.activeProfile.name,
                  style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
                ),
                Text(
                  widget.activeProfile.role,
                  style: const TextStyle(color: Colors.white70, fontSize: 11),
                ),
              ],
            ),
          ),
          ListTile(
            leading: const Icon(Icons.school_outlined, color: Color(0xFF4F46E5)),
            title: const Text('Stream Predictor (Class 9-11)', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
            onTap: () {
              Navigator.pop(context);
              _showStreamSelector();
            },
          ),
          ListTile(
            leading: const Icon(Icons.timer_outlined, color: Color(0xFF06B6D4)),
            title: const Text('Pomodoro Focus Timer (25m)', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
            onTap: () {
              Navigator.pop(context);
              _showFocusTimer();
            },
          ),
          ListTile(
            leading: const Icon(Icons.bolt_outlined, color: Color(0xFFF59E0B)),
            title: const Text('Daily Cognitive Drills', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
            trailing: Container(
              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
              decoration: BoxDecoration(color: const Color(0xFFFEF3C7), borderRadius: BorderRadius.circular(6)),
              child: const Text('Streak 4🔥', style: TextStyle(color: Color(0xFFB45309), fontSize: 9, fontWeight: FontWeight.bold)),
            ),
            onTap: () {
              Navigator.pop(context);
              _showDailyDrills();
            },
          ),
          ListTile(
            leading: const Icon(Icons.military_tech_outlined, color: Color(0xFF10B981)),
            title: const Text('Cognitive Badges (6 Unlocked)', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
            onTap: () {
              Navigator.pop(context);
              _showBadges();
            },
          ),
          const Divider(),
          ListTile(
            leading: const Icon(Icons.card_membership_outlined, color: Color(0xFFEC4899)),
            title: const Text('Upgrade to Family Plan', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
            onTap: () {
              Navigator.pop(context);
              _showUpgrade();
            },
          ),
          ListTile(
            leading: const Icon(Icons.group_add_outlined, color: Color(0xFF64748B)),
            title: const Text('Add Family Member', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
            onTap: () {
              Navigator.pop(context);
              _showAddMember();
            },
          ),
        ],
      ),
    );
  }
}

class _SensoryIconScore extends StatelessWidget {
  final String icon;
  final String label;
  final String score;

  const _SensoryIconScore({
    required this.icon,
    required this.label,
    required this.score,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        CircleAvatar(
          radius: 18,
          backgroundColor: const Color(0xFFF1F5F9),
          child: Text(icon, style: const TextStyle(fontSize: 16)),
        ),
        const SizedBox(height: 4),
        Text(score, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
        Text(label, style: const TextStyle(fontSize: 9, color: Color(0xFF64748B))),
      ],
    );
  }
}
