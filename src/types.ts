export type ScreenType =
  | 'dashboard'
  | 'eight_intelligence'
  | 'intelligence_detail'
  | 'brain_dominance'
  | 'five_senses'
  | 'sense_detail'
  | 'personality'
  | 'swot'
  | 'recommendations'
  | 'mentor';

export type TabType = 'home' | 'assessment' | 'mentor' | 'report' | 'profile';

export interface StudentProfile {
  id: string;
  name: string;
  role: string;
  avatar: string;
  gender: 'boy' | 'girl' | 'man' | 'woman';
  grade?: string;
  active?: boolean;
}

export interface IntelligenceItem {
  id: string;
  name: string;
  shortName: string;
  score: number;
  ratingText: 'Very Strong' | 'Strong' | 'Average' | 'Moderate';
  color: string;
  bgColor: string;
  badgeBg: string;
  badgeText: string;
  description: string;
  goodAt: Array<{ title: string; icon: string }>;
  careers: Array<{ title: string; icon: string }>;
  improvements: string[];
  breakdown: Array<{ name: string; score: number; icon: string }>;
  learningStyle: {
    bestLearnsWith: string;
    learnsBestThrough: string;
    prefers: string;
  };
  famousPeople: Array<{ name: string; title: string; icon: string }>;
}

export interface SenseItem {
  id: string;
  name: string;
  typeName: string;
  score: number;
  ratingText: 'Dominant' | 'Strong' | 'Moderate' | 'Average';
  color: string;
  accentColor: string;
  bgColor: string;
  borderColor: string;
  description: string;
  strengths: Array<{ title: string; icon: string }>;
  learnBestWith: Array<{ title: string; icon: string }>;
  careers: Array<{ title: string; icon: string }>;
}

export interface SwotCategory {
  title: 'STRENGTHS' | 'WEAKNESSES' | 'OPPORTUNITIES' | 'THREATS';
  count: number;
  color: string;
  bgColor: string;
  borderColor: string;
  iconBg: string;
  items: string[];
}
