import 'package:flutter/material.dart';

class UpgradeDialog extends StatelessWidget {
  const UpgradeDialog({super.key});

  @override
  Widget build(BuildContext context) {
    return Dialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Row(
                  children: [
                    Text('👑', style: TextStyle(fontSize: 22)),
                    SizedBox(width: 8),
                    Text('Unlock Family Plan', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
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
            const SizedBox(height: 6),
            const Text(
              'Unlock 5 student accounts, unlimited Vayo AI mentoring, full certified PDF reports, and live human counseling.',
              style: TextStyle(fontSize: 12, color: Color(0xFF64748B), height: 1.35),
            ),
            const SizedBox(height: 16),

            _buildBenefit('Unlimited Vayo AI Career & Psychological Mentoring'),
            _buildBenefit('Full 8 Multiple Intelligences & 5 Senses Breakdown'),
            _buildBenefit('Downloadable Certified Student Dossier PDF'),
            _buildBenefit('Direct 1-on-1 Certified Counselor Access'),
            _buildBenefit('Up to 5 Family Child / Scholar Profiles'),

            const SizedBox(height: 20),

            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF4F46E5),
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                ),
                onPressed: () {
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Daksh Family Plan activated! Full cognitive suite unlocked.')),
                  );
                },
                child: const Text('Activate Family Plan • ₹999/yr', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBenefit(String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Icon(Icons.check_circle, size: 16, color: Color(0xFF10B981)),
          const SizedBox(width: 8),
          Expanded(
            child: Text(text, style: const TextStyle(fontSize: 12, color: Color(0xFF334155))),
          ),
        ],
      ),
    );
  }
}
