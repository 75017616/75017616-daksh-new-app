import 'dart:math' as math;
import 'package:flutter/material.dart';

class IntelligenceRadarChart extends StatelessWidget {
  final List<double> scores; // 8 values (0 - 100)
  final List<String> labels; // 8 intelligence names
  final Color primaryColor;

  const IntelligenceRadarChart({
    super.key,
    required this.scores,
    required this.labels,
    this.primaryColor = const Color(0xFF4F46E5),
  });

  @override
  Widget build(BuildContext context) {
    return AspectRatio(
      aspectRatio: 1.15,
      child: CustomPaint(
        painter: _RadarChartPainter(
          scores: scores,
          labels: labels,
          color: primaryColor,
        ),
      ),
    );
  }
}

class _RadarChartPainter extends CustomPainter {
  final List<double> scores;
  final List<String> labels;
  final Color color;

  _RadarChartPainter({
    required this.scores,
    required this.labels,
    required this.color,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = math.min(size.width, size.height) * 0.38;
    final int count = labels.length;
    final double angleStep = (2 * math.pi) / count;

    final gridPaint = Paint()
      ..color = const Color(0xFFE2E8F0)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.0;

    final fillPaint = Paint()
      ..color = color.withOpacity(0.20)
      ..style = PaintingStyle.fill;

    final outlinePaint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2.5
      ..strokeCap = StrokeCap.round;

    final pointPaint = Paint()
      ..color = color
      ..style = PaintingStyle.fill;

    // Draw concentric web polygon rings (25%, 50%, 75%, 100%)
    for (int ring = 1; ring <= 4; ring++) {
      final double ringRadius = radius * (ring / 4);
      final ringPath = Path();
      for (int i = 0; i < count; i++) {
        final double angle = i * angleStep - (math.pi / 2);
        final double x = center.dx + ringRadius * math.cos(angle);
        final double y = center.dy + ringRadius * math.sin(angle);
        if (i == 0) {
          ringPath.moveTo(x, y);
        } else {
          ringPath.lineTo(x, y);
        }
      }
      ringPath.close();
      canvas.drawPath(ringPath, gridPaint);
    }

    // Draw spoke lines from center to outer vertices
    for (int i = 0; i < count; i++) {
      final double angle = i * angleStep - (math.pi / 2);
      final double x = center.dx + radius * math.cos(angle);
      final double y = center.dy + radius * math.sin(angle);
      canvas.drawLine(center, Offset(x, y), gridPaint);
    }

    // Compute polygon for student scores
    final dataPath = Path();
    final List<Offset> points = [];

    for (int i = 0; i < count; i++) {
      final double val = (i < scores.length ? scores[i] : 50.0).clamp(0.0, 100.0);
      final double pointRadius = radius * (val / 100.0);
      final double angle = i * angleStep - (math.pi / 2);
      final double x = center.dx + pointRadius * math.cos(angle);
      final double y = center.dy + pointRadius * math.sin(angle);
      final offset = Offset(x, y);
      points.add(offset);

      if (i == 0) {
        dataPath.moveTo(x, y);
      } else {
        dataPath.lineTo(x, y);
      }
    }
    dataPath.close();

    // Draw student data filled polygon and border
    canvas.drawPath(dataPath, fillPaint);
    canvas.drawPath(dataPath, outlinePaint);

    // Draw data points
    for (final pt in points) {
      canvas.drawCircle(pt, 4.0, pointPaint);
      canvas.drawCircle(pt, 2.0, Paint()..color = Colors.white);
    }

    // Draw Labels around the perimeter
    final textStyle = const TextStyle(
      color: Color(0xFF475569),
      fontSize: 10.0,
      fontWeight: FontWeight.w600,
    );

    for (int i = 0; i < count; i++) {
      final double angle = i * angleStep - (math.pi / 2);
      final double labelRadius = radius + 18.0;
      final double x = center.dx + labelRadius * math.cos(angle);
      final double y = center.dy + labelRadius * math.sin(angle);

      final textSpan = TextSpan(text: labels[i], style: textStyle);
      final textPainter = TextPainter(
        text: textSpan,
        textAlign: TextAlign.center,
        textDirection: TextDirection.ltr,
      );
      textPainter.layout();

      final Offset labelOffset = Offset(
        x - (textPainter.width / 2),
        y - (textPainter.height / 2),
      );
      textPainter.paint(canvas, labelOffset);
    }
  }

  @override
  bool shouldRepaint(covariant _RadarChartPainter oldDelegate) {
    return oldDelegate.scores != scores || oldDelegate.color != color;
  }
}
