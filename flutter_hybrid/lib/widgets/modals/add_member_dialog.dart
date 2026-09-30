import 'package:flutter/material.dart';
import '../../models/intelligence_models.dart';

class AddMemberDialog extends StatefulWidget {
  final Function(StudentProfile) onAdd;

  const AddMemberDialog({super.key, required this.onAdd});

  @override
  State<AddMemberDialog> createState() => _AddMemberDialogState();
}

class _AddMemberDialogState extends State<AddMemberDialog> {
  final _nameController = TextEditingController();
  String _selectedRole = 'Class 9';
  String _selectedGender = 'boy';
  String _selectedAvatar = '👦';

  final List<String> _avatars = ['👦', '👧', '🧑', '🧔', '👩', '👶'];

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
                const Text('Add Family Member', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                IconButton(
                  icon: const Icon(Icons.close, size: 18),
                  onPressed: () => Navigator.pop(context),
                  padding: EdgeInsets.zero,
                  constraints: const BoxConstraints(),
                ),
              ],
            ),
            const SizedBox(height: 14),

            // Avatar picker
            const Text('Choose Avatar', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF64748B))),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: _avatars.map((av) {
                final isSelected = _selectedAvatar == av;
                return InkWell(
                  onTap: () => setState(() => _selectedAvatar = av),
                  borderRadius: BorderRadius.circular(12),
                  child: Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: isSelected ? const Color(0xFFEEF2FF) : Colors.transparent,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: isSelected ? const Color(0xFF4F46E5) : Colors.transparent, width: 2),
                    ),
                    child: Text(av, style: const TextStyle(fontSize: 24)),
                  ),
                );
              }).toList(),
            ),

            const SizedBox(height: 14),

            TextField(
              controller: _nameController,
              decoration: InputDecoration(
                labelText: 'Student / Member Name',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
              ),
            ),

            const SizedBox(height: 14),

            DropdownButtonFormField<String>(
              value: _selectedRole,
              decoration: InputDecoration(
                labelText: 'Grade / Role',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
              ),
              items: const [
                DropdownMenuItem(value: 'Class 6-8', child: Text('Middle School (Class 6-8)')),
                DropdownMenuItem(value: 'Class 9', child: Text('Class 9')),
                DropdownMenuItem(value: 'Class 10', child: Text('Class 10 - Board Candidate')),
                DropdownMenuItem(value: 'Class 11', child: Text('Class 11 - Stream Starter')),
                DropdownMenuItem(value: 'Class 12', child: Text('Class 12 - College Prep')),
                DropdownMenuItem(value: 'Parent', child: Text('Parent / Guardian')),
              ],
              onChanged: (val) {
                if (val != null) setState(() => _selectedRole = val);
              },
            ),

            const SizedBox(height: 20),

            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF4F46E5),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  padding: const EdgeInsets.symmetric(vertical: 12),
                ),
                onPressed: () {
                  final name = _nameController.text.trim();
                  if (name.isEmpty) return;
                  final newProfile = StudentProfile(
                    id: DateTime.now().millisecondsSinceEpoch.toString(),
                    name: name,
                    role: _selectedRole,
                    avatar: _selectedAvatar,
                    gender: _selectedGender,
                    grade: _selectedRole,
                    active: true,
                  );
                  widget.onAdd(newProfile);
                  Navigator.pop(context);
                },
                child: const Text('Add Member to Family', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
