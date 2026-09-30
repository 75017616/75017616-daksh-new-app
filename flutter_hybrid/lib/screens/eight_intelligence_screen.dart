import 'package:flutter/material.dart';
import '../data/intelligence_data.dart';
import '../models/intelligence_models.dart';
import '../widgets/intelligence_radar_chart.dart';
import 'intelligence_detail_screen.dart';

class EightIntelligenceScreen extends StatelessWidget {
  final VoidCallback? onBack;

  const EightIntelligenceScreen({super.key, this.onBack});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        leading: onBack != null
            ? IconButton(
                icon: const Icon(Icons.arrow_back_ios_new, size: 20),
                onPressed: onBack,
              )
            : null,
        title: const Text(
          '8 Multiple Intelligences',
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 17, color: Color(0xFF0F172A)),
        ),
        centerTitle: true,
      ),
      body: ListView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        children: [
          // Radar chart summary card
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: const Color(0xFFE2E8F0)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Cognitive Radar Overview',
                  style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                ),
                const SizedBox(height: 12),
                IntelligenceRadarChart(
                  scores: IntelligenceData.intelligenceList.map((i) => i.score).toList(),
                  labels: IntelligenceData.intelligenceList.map((i) => i.shortName).toList(),
                  primaryColor: const Color(0xFF4F46E5),
                ),
              ],
            ),
          ),

          const SizedBox(height: 16),

          const Text(
            'All 8 Intelligence Profiles',
            style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
          ),
          const SizedBox(height: 10),

          // List of 8 Intelligences
          ...IntelligenceData.intelligenceList.map((item) {
            return Card(
              margin: const EdgeInsets.only(bottom: 12),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(18),
                side: BorderSide(color: item.color.withOpacity(0.3), width: 1.2),
              ),
              elevation: 0,
              child: InkWell(
                borderRadius: BorderRadius.circular(18),
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (_) => IntelligenceDetailScreen(
                        item: item,
                        onBack: () => Navigator.pop(context),
                      ),
                    ),
                  );
                },
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Container(
                            width: 44,
                            height: 44,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              color: item.color.withOpacity(0.15),
                            ),
                            alignment: Alignment.center,
                            child: Text(
                              '${item.score.toInt()}%',
                              style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: item.color),
                            ),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  item.name,
                                  style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                                ),
                                const SizedBox(height: 2),
                                Text(
                                  item.ratingText,
                                  style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: item.color),
                                ),
                              ],
                            ),
                          ),
                          const Icon(Icons.arrow_forward_ios, size: 14, color: Color(0xFF94A3B8)),
                        ],
                      ),
                      const SizedBox(height: 10),
                      Text(
                        item.description,
                        style: const TextStyle(fontSize: 12, color: Color(0xFF64748B), height: 1.35),
                      ),
                      const SizedBox(height: 10),
                      Wrap(
                        spacing: 6,
                        runSpacing: 4,
                        children: item.careers.take(3).map((career) {
                          return Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                            decoration: BoxDecoration(
                              color: const Color(0xFFF1F5F9),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text(
                              career,
                              style: const TextStyle(fontSize: 10, color: Color(0xFF475569), fontWeight: FontWeight.w500),
                            ),
                          );
                        }).toList(),
                      ),
                    ],
                  ),
                ),
              ),
            );
          }),
        ],
      ),
    );
  }
}
