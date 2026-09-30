import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'config/app_theme.dart';
import 'data/intelligence_data.dart';
import 'models/intelligence_models.dart';
import 'services/flutter_bridge.dart';
import 'screens/hybrid_webview_screen.dart';
import 'screens/dashboard_screen.dart';
import 'screens/assessment_screen.dart';
import 'screens/native_ai_counselor_screen.dart';
import 'screens/report_screen.dart';
import 'screens/profile_screen.dart';
import 'widgets/modals/add_member_dialog.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);
  runApp(const DakshHybridApp());
}

class DakshHybridApp extends StatelessWidget {
  const DakshHybridApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Daksh Hybrid Platform',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      home: const MainNavigationShell(),
    );
  }
}

class MainNavigationShell extends StatefulWidget {
  const MainNavigationShell({super.key});

  @override
  State<MainNavigationShell> createState() => _MainNavigationShellState();
}

class _MainNavigationShellState extends State<MainNavigationShell> {
  int _currentTabIndex = 0;
  bool _isHybridWebViewActive = false; // Dual-Engine: Switch between Native Flutter & Hybrid Vite WebView

  late final FlutterHybridBridge _bridge;

  List<StudentProfile> _profiles = List.from(IntelligenceData.initialProfiles);
  late StudentProfile _activeProfile;

  @override
  void initState() {
    super.initState();
    _activeProfile = _profiles.first;
    _bridge = FlutterHybridBridge();

    // Listen to incoming bridge commands from JavaScript
    _bridge.onNavigateRequested = (screen, payload) {
      if (screen == 'counselor' || screen == 'mentor') {
        setState(() => _currentTabIndex = 2);
      } else if (screen == 'assessment') {
        setState(() => _currentTabIndex = 1);
      } else if (screen == 'report') {
        setState(() => _currentTabIndex = 3);
      } else if (screen == 'profile') {
        setState(() => _currentTabIndex = 4);
      }
    };

    _bridge.onAIChatTriggered = (prompt) {
      setState(() => _currentTabIndex = 2);
    };
  }

  void _handleSelectProfile(StudentProfile profile) {
    setState(() {
      _activeProfile = profile;
    });
  }

  void _handleAddMember(StudentProfile newMember) {
    setState(() {
      _profiles.add(newMember);
      _activeProfile = newMember;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _isHybridWebViewActive
          ? HybridWebViewScreen(
              bridge: _bridge,
              initialUrl: 'https://daksh.app',
            )
          : IndexedStack(
              index: _currentTabIndex,
              children: [
                // Tab 0: Home Dashboard
                DashboardScreen(
                  activeProfile: _activeProfile,
                  profiles: _profiles,
                  onSelectProfile: _handleSelectProfile,
                  onAddMember: _handleAddMember,
                  onOpenCounselor: () => setState(() => _currentTabIndex = 2),
                ),
                // Tab 1: Assessments
                const AssessmentScreen(),
                // Tab 2: Vayo AI Mentor
                NativeAICounselorScreen(profile: _activeProfile),
                // Tab 3: Certified Report
                const ReportScreen(),
                // Tab 4: Profile & Family
                ProfileScreen(
                  activeProfile: _activeProfile,
                  onSelectProfile: _handleSelectProfile,
                  onAddMember: () {
                    showDialog(
                      context: context,
                      builder: (_) => AddMemberDialog(onAdd: _handleAddMember),
                    );
                  },
                ),
              ],
            ),

      bottomNavigationBar: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Mode Switcher Banner: Hybrid Vite WebView <-> Native Flutter 60 FPS
          Container(
            color: const Color(0xFFEEF2FF),
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Icon(
                      _isHybridWebViewActive ? Icons.web : Icons.flutter_dash,
                      size: 16,
                      color: const Color(0xFF4F46E5),
                    ),
                    const SizedBox(width: 6),
                    Text(
                      _isHybridWebViewActive ? 'Mode: Hybrid Vite WebView' : 'Mode: Native Flutter 60 FPS',
                      style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF4F46E5)),
                    ),
                  ],
                ),
                TextButton(
                  style: TextButton.styleFrom(visualDensity: VisualDensity.compact),
                  onPressed: () {
                    setState(() => _isHybridWebViewActive = !_isHybridWebViewActive);
                  },
                  child: Text(
                    _isHybridWebViewActive ? 'Switch to Native' : 'Switch to Hybrid',
                    style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold),
                  ),
                ),
              ],
            ),
          ),
          if (!_isHybridWebViewActive)
            NavigationBar(
              selectedIndex: _currentTabIndex,
              onDestinationSelected: (idx) => setState(() => _currentTabIndex = idx),
              destinations: const [
                NavigationDestination(
                  icon: Icon(Icons.dashboard_outlined),
                  selectedIcon: Icon(Icons.dashboard, color: Color(0xFF4F46E5)),
                  label: 'Home',
                ),
                NavigationDestination(
                  icon: Icon(Icons.fact_check_outlined),
                  selectedIcon: Icon(Icons.fact_check, color: Color(0xFF4F46E5)),
                  label: 'Assessment',
                ),
                NavigationDestination(
                  icon: Icon(Icons.auto_awesome_outlined),
                  selectedIcon: Icon(Icons.auto_awesome, color: Color(0xFF4F46E5)),
                  label: 'Vayo AI',
                ),
                NavigationDestination(
                  icon: Icon(Icons.description_outlined),
                  selectedIcon: Icon(Icons.description, color: Color(0xFF4F46E5)),
                  label: 'Report',
                ),
                NavigationDestination(
                  icon: Icon(Icons.person_outline),
                  selectedIcon: Icon(Icons.person, color: Color(0xFF4F46E5)),
                  label: 'Profile',
                ),
              ],
            ),
        ],
      ),
    );
  }
}
