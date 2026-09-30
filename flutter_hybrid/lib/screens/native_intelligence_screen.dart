import 'package:flutter/material.dart';
import '../models/intelligence_models.dart';

class NativeIntelligenceScreen extends StatelessWidget {
  const NativeIntelligenceScreen({super.key});

  static const List<IntelligenceScore> dummyList = [
    IntelligenceScore(
      id: 'logical-mathematical',
      name: 'Logical - Mathematical',
      shortName: 'Logical',
      score: 94,
      ratingText: 'Very Strong',
      color: Color(0xFF6366F1),
      description: 'Exceptional capacity to analyze problems logically, carry out mathematical operations, and investigate issues scientifically.',
      goodAt: ['Algorithmic Thinking', 'Abstract Problem Solving', 'Pattern Recognition'],
      careers: ['Data Scientist', 'AI Researcher', 'Systems Architect', 'Quantitative Analyst'],
      improvements: ['Practice spatial geometry puzzles', 'Explain complex logic in non-technical metaphors'],
    ),
    IntelligenceScore(
      id: 'visual-spatial',
      name: 'Visual - Spatial',
      shortName: 'Spatial',
      score: 88,
      ratingText: 'Strong',
      color: Color(0xFF8B5CF6),
      description: 'Ability to think in three dimensions. Capacity for mental imagery, spatial reasoning, and artistic design.',
      goodAt: ['3D Modeling', 'Architectural Drafting', 'Mind Mapping'],
      careers: ['UX Architect', 'Industrial Designer', 'Robotics Specialist'],
      improvements: ['Engage in CAD modeling', 'Draw concept maps for study notes'],
    ),
    IntelligenceScore(
      id: 'intrapersonal',
      name: 'Intrapersonal',
      shortName: 'Intrapersonal',
      score: 85,
      ratingText: 'Strong',
      color: Color(0xFF06B6D4),
      description: 'High self-awareness, understanding of own emotional states, motivations, strengths, and meta-learning strategies.',
      goodAt: ['Goal Setting', 'Self-Regulation', 'Strategic Planning'],
      careers: ['Founder / Entrepreneur', 'Philosopher', 'Independent Researcher'],
      improvements: ['Write structured reflection journals', 'Review decisions periodically'],
    ),
    IntelligenceScore(
      id: 'interpersonal',
      name: 'Interpersonal',
      shortName: 'Interpersonal',
      score: 82,
      ratingText: 'Strong',
      color: Color(0xFF10B981),
      description: 'Ability to understand and interact effectively with others, empathize with different perspectives, and lead groups.',
      goodAt: ['Negotiation', 'Team Leadership', 'Active Listening'],
      careers: ['Product Leader', 'Psychologist', 'Diplomat'],
      improvements: ['Lead cross-functional workshops', 'Practice non-violent communication'],
    ),
    IntelligenceScore(
      id: 'bodily-kinesthetic',
      name: 'Bodily - Kinesthetic',
      shortName: 'Kinesthetic',
      score: 79,
      ratingText: 'Moderate',
      color: Color(0xFFEC4899),
      description: 'Coordination between mind and physical movement, tactile learning, fine motor agility.',
      goodAt: ['Tactile Assembly', 'Experimental Labs', 'Physical Coordination'],
      careers: ['Surgeon', 'Biomedical Engineer', 'Athletic Coach'],
      improvements: ['Integrate movement into learning sprints'],
    ),
    IntelligenceScore(
      id: 'linguistic-verbal',
      name: 'Linguistic - Verbal',
      shortName: 'Linguistic',
      score: 76,
      ratingText: 'Moderate',
      color: Color(0xFF3B82F6),
      description: 'Sensitivity to spoken and written language, ability to learn languages, and express complex arguments clearly.',
      goodAt: ['Technical Writing', 'Debating', 'Narrative Structuring'],
      careers: ['Technical Author', 'Legal Counsel', 'Journalist'],
      improvements: ['Write essays explaining your STEM projects'],
    ),
    IntelligenceScore(
      id: 'naturalistic',
      name: 'Naturalistic',
      shortName: 'Naturalist',
      score: 72,
      ratingText: 'Average',
      color: Color(0xFF14B8A6),
      description: 'Recognition and classification of numerous species of flora and fauna, ecology, and natural systems.',
      goodAt: ['Environmental Observation', 'Taxonomy', 'Biological Systems'],
      careers: ['Environmental Engineer', 'Bioinformatician'],
      improvements: ['Study biomimicry in technological designs'],
    ),
    IntelligenceScore(
      id: 'musical-rhythmic',
      name: 'Musical - Rhythmic',
      shortName: 'Musical',
      score: 68,
      ratingText: 'Average',
      color: Color(0xFFF59E0B),
      description: 'Capacity to discern pitch, rhythm, timbre, and tone. Recognition of acoustic harmonic patterns.',
      goodAt: ['Audio Pattern Detection', 'Rhythm Synchronization'],
      careers: ['Acoustic Engineer', 'Audio Software Designer'],
      improvements: ['Listen to complex polyrhythms while studying focus'],
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('8 Multiple Intelligences', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: dummyList.length,
        itemBuilder: (context, index) {
          final item = dummyList[index];
          return Card(
            margin: const EdgeInsets.only(bottom: 14),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(18),
              side: const BorderSide(color: Color(0xFFE2E8F0)),
            ),
            child: ExpansionTile(
              shape: const Border(),
              leading: CircleAvatar(
                backgroundColor: item.color.withOpacity(0.15),
                child: Text('${item.score.toInt()}%', style: TextStyle(color: item.color, fontWeight: FontWeight.bold, fontSize: 13)),
              ),
              title: Text(item.name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
              subtitle: Text(item.ratingText, style: TextStyle(color: item.color, fontSize: 12, fontWeight: FontWeight.w600)),
              childrenPadding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
              children: [
                Text(item.description, style: const TextStyle(color: Color(0xFF475569), fontSize: 13, height: 1.4)),
                const SizedBox(height: 12),
                const Text('Top Career Matches:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Color(0xFF0F172A))),
                const SizedBox(height: 6),
                Wrap(
                  spacing: 6,
                  runSpacing: 6,
                  children: item.careers.map((c) => Chip(
                    label: Text(c, style: const TextStyle(fontSize: 11, color: Color(0xFF334155))),
                    backgroundColor: const Color(0xFFF1F5F9),
                    side: BorderSide.none,
                    padding: const EdgeInsets.symmetric(horizontal: 4),
                  )).toList(),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
