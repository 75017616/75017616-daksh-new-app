/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenType, StudentProfile, TabType } from './types';
import { initialProfiles, intelligenceList, senseList } from './data/intelligenceData';
import { DashboardScreen } from './components/DashboardScreen';
import { EightIntelligenceScreen } from './components/EightIntelligenceScreen';
import { IntelligenceDetailScreen } from './components/IntelligenceDetailScreen';
import { BrainDominanceScreen } from './components/BrainDominanceScreen';
import { FiveSensesScreen } from './components/FiveSensesScreen';
import { SenseDetailScreen } from './components/SenseDetailScreen';
import { PersonalityScreen } from './components/PersonalityScreen';
import { SwotScreen } from './components/SwotScreen';
import { RecommendationsScreen } from './components/RecommendationsScreen';
import { AssessmentScreen } from './components/AssessmentScreen';
import { AIMentorScreen } from './components/AIMentorScreen';
import { ReportScreen } from './components/ReportScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { BottomTabBar } from './components/BottomTabBar';
import { VayoBotWidget } from './components/VayoBotWidget';
import { AICounselorModal } from './components/AICounselorModal';
import { UpgradeModal } from './components/UpgradeModal';
import { AddMemberModal } from './components/AddMemberModal';
import { DetailedAnalysisModal } from './components/DetailedAnalysisModal';
import { AndroidInstallModal } from './components/AndroidInstallModal';
import { FlutterHybridModal } from './components/FlutterHybridModal';
import { OfflineIndicator } from './components/OfflineIndicator';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [profiles, setProfiles] = useState<StudentProfile[]>(initialProfiles);
  const [activeProfile, setActiveProfile] = useState<StudentProfile>(initialProfiles[0]);

  // Sub-screen parameters
  const [selectedIntelligenceId, setSelectedIntelligenceId] = useState<string>('logical-mathematical');
  const [selectedSenseId, setSelectedSenseId] = useState<string>('touch');

  // Modals state
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [aiChatInitialPrompt, setAIChatInitialPrompt] = useState<string | undefined>(undefined);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isAndroidModalOpen, setIsAndroidModalOpen] = useState(false);
  const [isFlutterModalOpen, setIsFlutterModalOpen] = useState(false);
  const [detailedAnalysisData, setDetailedAnalysisData] = useState<{
    isOpen: boolean;
    title: string;
    category: string;
    score: number;
    careers: string[];
    recommendations: string[];
  }>({
    isOpen: false,
    title: '',
    category: '',
    score: 0,
    careers: [],
    recommendations: []
  });

  // Handle Tab Switch
  const handleTabChange = (tab: TabType) => {
    setCurrentTab(tab);
    if (tab === 'home') {
      setCurrentScreen('dashboard');
    }
    document.getElementById('app-scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Profile Selection
  const handleSelectProfile = (profile: StudentProfile) => {
    setProfiles(
      profiles.map((p) => ({
        ...p,
        active: p.id === profile.id
      }))
    );
    setActiveProfile(profile);
  };

  // Handle Add Member
  const handleAddMember = (newMember: StudentProfile) => {
    setProfiles((prev) => [...prev, newMember]);
    setActiveProfile(newMember);
  };

  // Handle Navigation from cards/buttons
  const handleNavigate = (screen: ScreenType, payload?: any) => {
    if (screen === 'intelligence_detail' && payload) {
      setSelectedIntelligenceId(payload);
    }
    if (screen === 'sense_detail' && payload) {
      setSelectedSenseId(payload);
    }
    setCurrentScreen(screen);
    setCurrentTab('home');
    setTimeout(() => {
      document.getElementById('app-scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 10);
  };

  // Handle Opening AI Counselor with prompt
  const handleOpenAIChat = (prompt?: string) => {
    setAIChatInitialPrompt(prompt);
    setIsAIChatOpen(true);
  };

  // Handle Detailed Analysis Modal
  const handleOpenDetailedAnalysis = (
    title: string,
    category: string,
    score: number,
    careers: string[],
    recommendations: string[]
  ) => {
    setDetailedAnalysisData({
      isOpen: true,
      title,
      category,
      score,
      careers,
      recommendations
    });
  };

  // Current active intelligence object
  const activeIntelligence =
    intelligenceList.find((i) => i.id === selectedIntelligenceId) || intelligenceList[1];

  // Current active sense object
  const activeSense = senseList.find((s) => s.id === selectedSenseId) || senseList[2];

  // Dynamic tab bar accent color based on active screen
  const getAccentColor = () => {
    if (currentScreen === 'intelligence_detail') return activeIntelligence.color;
    if (currentScreen === 'sense_detail') return activeSense.color;
    if (currentScreen === 'eight_intelligence') return '#5B43EA';
    if (currentScreen === 'swot' || currentScreen === 'recommendations') return '#2563EB';
    if (currentScreen === 'personality') return '#7C3AED';
    if (currentScreen === 'brain_dominance') return '#2563EB';
    return '#4F46E5';
  };

  // Render Screen Content based on currentTab & currentScreen
  const renderContent = () => {
    if (currentTab === 'assessment') {
      return (
        <AssessmentScreen
          activeProfile={activeProfile}
          onNavigate={(screen, payload) => handleNavigate(screen, payload)}
        />
      );
    }

    if (currentTab === 'mentor') {
      return (
        <AIMentorScreen
          activeProfile={activeProfile}
          onOpenAIChat={handleOpenAIChat}
        />
      );
    }

    if (currentTab === 'report') {
      return (
        <ReportScreen
          activeProfile={activeProfile}
          onNavigate={(screen, payload) => handleNavigate(screen, payload)}
        />
      );
    }

    if (currentTab === 'profile') {
      return (
        <ProfileScreen
          activeProfile={activeProfile}
          profiles={profiles}
          onSelectProfile={handleSelectProfile}
          onAddMember={() => setIsAddMemberOpen(true)}
          onOpenUpgrade={() => setIsUpgradeOpen(true)}
          onOpenAndroidModal={() => setIsAndroidModalOpen(true)}
          onOpenFlutterModal={() => setIsFlutterModalOpen(true)}
        />
      );
    }

    // Home Tab Screen Routing
    switch (currentScreen) {
      case 'dashboard':
        return (
          <DashboardScreen
            onNavigate={handleNavigate}
            activeProfile={activeProfile}
            profiles={profiles}
            onSelectProfile={handleSelectProfile}
            onOpenAIChat={handleOpenAIChat}
            onOpenUpgrade={() => setIsUpgradeOpen(true)}
            onAddMember={() => setIsAddMemberOpen(true)}
            onOpenAndroidModal={() => setIsAndroidModalOpen(true)}
            onOpenFlutterModal={() => setIsFlutterModalOpen(true)}
          />
        );

      case 'eight_intelligence':
        return (
          <EightIntelligenceScreen
            onBack={() => setCurrentScreen('dashboard')}
            onSelectIntelligence={(id) => handleNavigate('intelligence_detail', id)}
            onViewFullReport={() => handleTabChange('report')}
          />
        );

      case 'intelligence_detail':
        return (
          <IntelligenceDetailScreen
            item={activeIntelligence}
            onBack={() => setCurrentScreen('eight_intelligence')}
            onViewDetailedAnalysis={() =>
              handleOpenDetailedAnalysis(
                activeIntelligence.name,
                'Multiple Intelligence',
                activeIntelligence.score,
                activeIntelligence.careers.map((c) => c.title),
                activeIntelligence.improvements
              )
            }
          />
        );

      case 'brain_dominance':
        return (
          <BrainDominanceScreen
            onBack={() => setCurrentScreen('dashboard')}
            onViewFullReport={() => handleTabChange('report')}
          />
        );

      case 'five_senses':
        return (
          <FiveSensesScreen
            onBack={() => setCurrentScreen('dashboard')}
            onSelectSense={(id) => handleNavigate('sense_detail', id)}
          />
        );

      case 'sense_detail':
        return (
          <SenseDetailScreen
            sense={activeSense}
            onBack={() => setCurrentScreen('five_senses')}
            onViewDetailedAnalysis={() =>
              handleOpenDetailedAnalysis(
                `${activeSense.name} (${activeSense.typeName})`,
                'Sensory Profile',
                activeSense.score,
                activeSense.careers.map((c) => c.title),
                activeSense.learnBestWith.map((l) => l.title)
              )
            }
          />
        );

      case 'personality':
        return (
          <PersonalityScreen
            onBack={() => setCurrentScreen('dashboard')}
            onViewFullReport={() => handleTabChange('report')}
            activeProfile={activeProfile}
            onOpenAIChat={handleOpenAIChat}
            onOpenUpgrade={() => setIsUpgradeOpen(true)}
            isPremium={false}
          />
        );

      case 'swot':
        return (
          <SwotScreen
            onBack={() => setCurrentScreen('dashboard')}
            onViewRecommendations={() => setCurrentScreen('recommendations')}
          />
        );

      case 'recommendations':
        return (
          <RecommendationsScreen
            onBack={() => setCurrentScreen('swot')}
          />
        );

      case 'mentor':
        return (
          <AIMentorScreen
            activeProfile={activeProfile}
            onOpenAIChat={handleOpenAIChat}
            onBack={() => setCurrentScreen('dashboard')}
          />
        );

      default:
        return (
          <DashboardScreen
            onNavigate={handleNavigate}
            activeProfile={activeProfile}
            profiles={profiles}
            onSelectProfile={handleSelectProfile}
            onOpenAIChat={handleOpenAIChat}
            onOpenUpgrade={() => setIsUpgradeOpen(true)}
            onAddMember={() => setIsAddMemberOpen(true)}
            onOpenAndroidModal={() => setIsAndroidModalOpen(true)}
            onOpenFlutterModal={() => setIsFlutterModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-200/70 flex justify-center items-center text-slate-800 antialiased p-0 sm:py-4">
      {/* Mobile Device Frame Container */}
      <div className="w-full max-w-[420px] h-[100dvh] sm:h-[860px] sm:max-h-[94vh] bg-white shadow-2xl relative flex flex-col sm:rounded-[44px] overflow-hidden border-0 sm:border-8 sm:border-slate-900">
        {/* Scrollable Screen Content Container */}
        <div id="app-scroll-container" className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col bg-[#F8FAFC]">
          {renderContent()}
        </div>

        {/* Floating Vayo AI Chatbot Widget - anchored safely inside the app UI */}
        <VayoBotWidget
          onClick={handleOpenAIChat}
          activeProfile={activeProfile}
        />

        {/* Global Bottom Tab Bar - pinned at bottom of the app frame */}
        <BottomTabBar
          activeTab={currentTab}
          onTabChange={handleTabChange}
          onOpenAIChat={handleOpenAIChat}
          accentColor={getAccentColor()}
        />

        {/* Global Modals - scoped directly within the mobile frame */}
        <AICounselorModal
          isOpen={isAIChatOpen}
          onClose={() => setIsAIChatOpen(false)}
          activeProfile={activeProfile}
          initialPrompt={aiChatInitialPrompt}
        />

        <UpgradeModal
          isOpen={isUpgradeOpen}
          onClose={() => setIsUpgradeOpen(false)}
          onUnlockAll={() => {
            alert('Premium Family activated for all members! Full cognitive matrices unlocked.');
          }}
        />

        <AddMemberModal
          isOpen={isAddMemberOpen}
          onClose={() => setIsAddMemberOpen(false)}
          onAdd={handleAddMember}
        />

        <DetailedAnalysisModal
          isOpen={detailedAnalysisData.isOpen}
          onClose={() => setDetailedAnalysisData((prev) => ({ ...prev, isOpen: false }))}
          title={detailedAnalysisData.title}
          category={detailedAnalysisData.category}
          score={detailedAnalysisData.score}
          careers={detailedAnalysisData.careers}
          recommendations={detailedAnalysisData.recommendations}
        />

        {/* Android App & APK Installation Hub Modal */}
        <AndroidInstallModal
          isOpen={isAndroidModalOpen}
          onClose={() => setIsAndroidModalOpen(false)}
          onOpenFlutterModal={() => setIsFlutterModalOpen(true)}
        />

        {/* Flutter Hybrid Mobile Platform & Source Code Exporter Modal */}
        <FlutterHybridModal
          isOpen={isFlutterModalOpen}
          onClose={() => setIsFlutterModalOpen(false)}
        />

        {/* Global Offline Mode Status Banner */}
        <OfflineIndicator />
      </div>
    </div>
  );
}
