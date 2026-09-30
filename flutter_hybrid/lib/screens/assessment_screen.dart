import 'package:flutter/material.dart';
import '../data/intelligence_data.dart';

class AssessmentScreen extends StatefulWidget {
  final VoidCallback? onBack;

  const AssessmentScreen({super.key, this.onBack});

  @override
  State<AssessmentScreen> createState() => _AssessmentScreenState();
}

class _AssessmentScreenState extends State<AssessmentScreen> {
  String _selectedFilter = 'all';

  void _startQuiz() {
    showDialog(
      context: context,
      builder: (ctx) => const _InteractiveQuizDialog(),
    );
  }

  @override
  Widget build(BuildContext context) {
    final tests = IntelligenceData.assessmentTests.where((t) {
      if (_selectedFilter == 'completed') return t['status'] == 'Completed';
      if (_selectedFilter == 'pending') return t['status'] == 'Pending';
      return true;
    }).toList();

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        leading: widget.onBack != null
            ? IconButton(
                icon: const Icon(Icons.arrow_back_ios_new, size: 20),
                onPressed: widget.onBack,
              )
            : null,
        title: const Text(
          'Cognitive Assessment Battery',
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 17, color: Color(0xFF0F172A)),
        ),
        centerTitle: true,
      ),
      body: ListView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        children: [
          // Quick Quiz CTA Banner
          Container(
            padding: const EdgeInsets.all(18),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF4F46E5), Color(0xFF6366F1), Color(0xFF8B5CF6)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(22),
              boxShadow: [
                BoxShadow(
                  color: const Color(0xFF4F46E5).withOpacity(0.25),
                  blurRadius: 14,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('BATTERY 5/6 COMPLETED', style: TextStyle(color: Colors.white70, fontSize: 11, fontWeight: FontWeight.bold)),
                    Icon(Icons.verified, color: Colors.emeraldAccent, size: 18),
                  ],
                ),
                const SizedBox(height: 8),
                const Text(
                  'Quick Aptitude Drill',
                  style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 4),
                const Text(
                  'Take the 3-minute adaptive diagnostic to calibrate your multiple intelligence and learning scores.',
                  style: TextStyle(color: Colors.white70, fontSize: 12),
                ),
                const SizedBox(height: 14),
                ElevatedButton.icon(
                  onPressed: _startQuiz,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.white,
                    foregroundColor: const Color(0xFF4F46E5),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  icon: const Icon(Icons.play_arrow_rounded),
                  label: const Text('Launch Interactive Quiz'),
                ),
              ],
            ),
          ),

          const SizedBox(height: 18),

          // Filters
          Row(
            children: [
              _buildFilterChip('all', 'All Tests (6)'),
              const SizedBox(width: 8),
              _buildFilterChip('completed', 'Completed (5)'),
              const SizedBox(width: 8),
              _buildFilterChip('pending', 'Pending (1)'),
            ],
          ),

          const SizedBox(height: 14),

          // Test cards list
          ...tests.map((test) {
            final color = test['color'] as Color;
            final isCompleted = test['status'] == 'Completed';

            return Container(
              margin: const EdgeInsets.only(bottom: 12),
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(18),
                border: Border.all(color: const Color(0xFFE2E8F0)),
              ),
              child: Row(
                children: [
                  CircleAvatar(
                    radius: 22,
                    backgroundColor: color.withOpacity(0.12),
                    child: Icon(test['icon'] as IconData, color: color, size: 22),
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          test['title'] as String,
                          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF0F172A)),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          '${test['duration']} • ${test['questions']} Questions',
                          style: const TextStyle(fontSize: 11, color: Color(0xFF64748B)),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'Result: ${test['score']}',
                          style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: color),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: isCompleted ? const Color(0xFFECFDF5) : const Color(0xFFFEF3C7),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Text(
                      isCompleted ? '✓ Done' : 'Pending',
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.bold,
                        color: isCompleted ? const Color(0xFF047857) : const Color(0xFFB45309),
                      ),
                    ),
                  ),
                ],
              ),
            );
          }),
        ],
      ),
    );
  }

  Widget _buildFilterChip(String id, String label) {
    final isSelected = _selectedFilter == id;
    return InkWell(
      onTap: () => setState(() => _selectedFilter = id),
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: isSelected ? const Color(0xFF4F46E5) : Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: isSelected ? const Color(0xFF4F46E5) : const Color(0xFFE2E8F0)),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 11,
            fontWeight: FontWeight.bold,
            color: isSelected ? Colors.white : const Color(0xFF64748B),
          ),
        ),
      ),
    );
  }
}

class _InteractiveQuizDialog extends StatefulWidget {
  const _InteractiveQuizDialog();

  @override
  State<_InteractiveQuizDialog> createState() => _InteractiveQuizDialogState();
}

class _InteractiveQuizDialogState extends State<_InteractiveQuizDialog> {
  int _step = 0;
  final List<int> _answers = [];

  static const List<Map<String, dynamic>> _questions = [
    {
      'q': 'When solving a complex technical or logic puzzle, what is your initial instinct?',
      'options': [
        'Diagram or draw it out spatially on paper',
        'Break it into logic equations and step-by-step numbers',
        'Talk it through verbally with a mentor or peer',
        'Build or physically tinker with a prototype',
      ],
    },
    {
      'q': 'Which school or academic challenge excites you the most?',
      'options': [
        'Constructing a miniature working robot or 3D bridge',
        'Writing a persuasive research paper or editorial',
        'Conducting a biochemical lab experiment',
        'Organizing a school charity campaign with classmates',
      ],
    },
    {
      'q': 'During free unstructured study hours, you naturally gravitate towards:',
      'options': [
        'Visual arts, CAD design, or strategic puzzle games',
        'Athletic drills, sports, or outdoor excursions',
        'Reading non-fiction, journaling, or learning linguistics',
        'Synthesizing audio compositions or music instruments',
      ],
    },
  ];

  @override
  Widget build(BuildContext context) {
    if (_step >= _questions.length) {
      return AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: const Text('Assessment Calibrated! 🎉', style: TextStyle(fontWeight: FontWeight.bold)),
        content: const Text(
          'Your scores have been updated.\n\nPrimary Trait: Logical-Mathematical & Kinesthetic dominant with balanced whole-brain synthesis.',
          style: TextStyle(fontSize: 13, height: 1.4),
        ),
        actions: [
          ElevatedButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Back to Dashboard'),
          ),
        ],
      );
    }

    final currentQ = _questions[_step];

    return Dialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Question ${_step + 1} of ${_questions.length}', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF4F46E5))),
                IconButton(
                  icon: const Icon(Icons.close, size: 18),
                  onPressed: () => Navigator.pop(context),
                  padding: EdgeInsets.zero,
                  constraints: const BoxConstraints(),
                ),
              ],
            ),
            const SizedBox(height: 8),
            ClipRRect(
              borderRadius: BorderRadius.circular(4),
              child: LinearProgressIndicator(
                value: (_step + 1) / _questions.length,
                backgroundColor: const Color(0xFFE2E8F0),
                valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFF4F46E5)),
              ),
            ),
            const SizedBox(height: 16),
            Text(
              currentQ['q'] as String,
              style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Color(0xFF0F172A), height: 1.35),
            ),
            const SizedBox(height: 16),
            ...(currentQ['options'] as List).asMap().entries.map((entry) {
              final idx = entry.key;
              final opt = entry.value as String;
              return Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: OutlinedButton(
                  style: OutlinedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                    alignment: Alignment.centerLeft,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    side: const BorderSide(color: Color(0xFFCBD5E1)),
                  ),
                  onPressed: () {
                    setState(() {
                      _answers.add(idx);
                      _step++;
                    });
                  },
                  child: Text(
                    opt,
                    style: const TextStyle(fontSize: 12, color: Color(0xFF334155), height: 1.3),
                  ),
                ),
              );
            }).toList(),
          ],
        ),
      ),
    );
  }
}
