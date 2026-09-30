import { IntelligenceItem, SenseItem, StudentProfile, SwotCategory } from '../types';

export const initialProfiles: StudentProfile[] = [
  { id: 'aarav', name: 'Aarav', role: 'Class 8', avatar: '👦', gender: 'boy', grade: 'Class 8', active: true },
  { id: 'ananya', name: 'Ananya', role: 'Class 11', avatar: '👧', gender: 'girl', grade: 'Class 11', active: false },
  { id: 'rahul', name: 'Rahul', role: 'Father', avatar: '🧔', gender: 'man', active: false },
  { id: 'priya', name: 'Priya', role: 'Mother', avatar: '👩', gender: 'woman', active: false },
];

export const intelligenceList: IntelligenceItem[] = [
  {
    id: 'bodily-kinesthetic',
    name: 'Bodily Kinesthetic',
    shortName: 'Bodily',
    score: 85,
    ratingText: 'Very Strong',
    color: '#FDB022',
    bgColor: '#FEF6E7',
    badgeBg: '#E8F8F0',
    badgeText: '#1DB954',
    description: 'You have exceptional mind-body coordination, physical dexterity, reflexes, and tactile learning agility.',
    goodAt: [
      { title: 'Physical Coordination', icon: 'run' },
      { title: 'Fine Motor Skills', icon: 'hand' },
      { title: 'Hands-on Building', icon: 'wrench' },
      { title: 'Tactile Learning', icon: 'compass' }
    ],
    careers: [
      { title: 'Surgeon', icon: 'plus-circle' },
      { title: 'Athlete', icon: 'zap' },
      { title: 'Engineer', icon: 'settings' },
      { title: 'Craftsman', icon: 'edit' },
      { title: 'Architect', icon: 'layout' },
      { title: 'Dancer', icon: 'music' }
    ],
    improvements: [
      'Engage in sports and physical drills',
      'Learn through building prototypes & 3D models',
      'Incorporate standing desk & study movement',
      'Practice martial arts or yoga for balance',
      'Use physical flashcards and tactile kits',
      'Take regular active study pauses'
    ],
    breakdown: [
      { name: 'Gross Motor Skills', score: 88, icon: 'run' },
      { name: 'Dexterity & Tactile', score: 86, icon: 'hand' },
      { name: 'Reflexes & Timing', score: 84, icon: 'clock' },
      { name: 'Spatial Movement', score: 82, icon: 'compass' }
    ],
    learningStyle: {
      bestLearnsWith: 'Hands-on labs & physical models',
      learnsBestThrough: 'Trial, error, and physical repetition',
      prefers: 'Interactive simulations over passive reading'
    },
    famousPeople: [
      { name: 'Michael Jordan', title: 'Legendary Athlete', icon: 'trophy' },
      { name: 'Misty Copeland', title: 'Principal Ballerina', icon: 'star' },
      { name: 'Usain Bolt', title: 'Olympic Champion', icon: 'zap' }
    ]
  },
  {
    id: 'linguistic',
    name: 'Linguistic Intelligence',
    shortName: 'Linguistic',
    score: 80,
    ratingText: 'Strong',
    color: '#884CED',
    bgColor: '#F3E8FF',
    badgeBg: '#E8F8F0',
    badgeText: '#1DB954',
    description: 'You have a high facility with words, languages, storytelling, reading comprehension, and expressive writing.',
    goodAt: [
      { title: 'Expressive writing & essays', icon: 'edit' },
      { title: 'Public speaking & rhetoric', icon: 'mic' },
      { title: 'Speed reading & analysis', icon: 'book' },
      { title: 'Language learning & vocab', icon: 'message' }
    ],
    careers: [
      { title: 'Author', icon: 'book-open' },
      { title: 'Journalist', icon: 'file-text' },
      { title: 'Lawyer', icon: 'scale' },
      { title: 'Editor', icon: 'edit-3' },
      { title: 'Speaker', icon: 'message-circle' },
      { title: 'Translator', icon: 'languages' }
    ],
    improvements: [
      'Daily creative writing practice',
      'Read diverse literary genres',
      'Join debate or speech clubs',
      'Study etymology & new vocabulary',
      'Keep a personal journal',
      'Listen to literary podcasts'
    ],
    breakdown: [
      { name: 'Verbal Fluency', score: 84, icon: 'message-circle' },
      { name: 'Written Expression', score: 82, icon: 'edit-2' },
      { name: 'Vocabulary & Grammar', score: 78, icon: 'book-open' },
      { name: 'Listening Comprehension', score: 76, icon: 'volume-2' }
    ],
    learningStyle: {
      bestLearnsWith: 'Reading, storytelling & note-taking',
      learnsBestThrough: 'Debates & interactive discussions',
      prefers: 'Semantics, rich prose & audiobooks'
    },
    famousPeople: [
      { name: 'William Shakespeare', title: 'Playwright & Poet', icon: 'feather' },
      { name: 'Maya Angelou', title: 'Poet & Civil Rights Leader', icon: 'book' },
      { name: 'J.K. Rowling', title: 'Novelist & Philanthropist', icon: 'sparkles' }
    ]
  },
  {
    id: 'interpersonal',
    name: 'Interpersonal Intelligence',
    shortName: 'Interpersonal',
    score: 80,
    ratingText: 'Strong',
    color: '#20B2AA',
    bgColor: '#E0F7F6',
    badgeBg: '#E8F8F0',
    badgeText: '#1DB954',
    description: 'You have a natural ability to understand emotions, motivations, intentions, and perspectives of other people.',
    goodAt: [
      { title: 'Active listening & empathy', icon: 'mic' },
      { title: 'Conflict resolution', icon: 'scale' },
      { title: 'Team leadership & collab', icon: 'users' },
      { title: 'Reading social cues', icon: 'eye' }
    ],
    careers: [
      { title: 'Counselor', icon: 'message-square' },
      { title: 'Diplomat', icon: 'globe' },
      { title: 'HR Mgr', icon: 'users' },
      { title: 'Teacher', icon: 'graduation-cap' },
      { title: 'Sales Exec', icon: 'trending-up' },
      { title: 'Mediator', icon: 'clock' }
    ],
    improvements: [
      'Practice non-violent communication',
      'Perspective-taking exercises',
      'Join collaborative team projects',
      'Seek constructive 360 feedback',
      'Volunteer in community events',
      'Attend leadership seminars'
    ],
    breakdown: [
      { name: 'Social Empathy', score: 84, icon: 'heart' },
      { name: 'Negotiation', score: 82, icon: 'arrow-right-left' },
      { name: 'Group Dynamics', score: 79, icon: 'users' },
      { name: 'Conflict Mediation', score: 75, icon: 'shield' }
    ],
    learningStyle: {
      bestLearnsWith: 'Group discussions & interactive talk',
      learnsBestThrough: 'Team workshops & co-learning',
      prefers: 'Mentorship & collaborative roles'
    },
    famousPeople: [
      { name: 'Mahatma Gandhi', title: 'Civil Rights Leader', icon: 'award' },
      { name: 'Oprah Winfrey', title: 'Host & Philanthropist', icon: 'smile' },
      { name: 'Nelson Mandela', title: 'Statesman & Peacemaker', icon: 'flag' }
    ]
  },
  {
    id: 'logical-mathematical',
    name: 'Logical-Mathematical Intelligence',
    shortName: 'Logical',
    score: 82,
    ratingText: 'Strong',
    color: '#F45A7E',
    bgColor: '#FFE8EE',
    badgeBg: '#E8F8F0',
    badgeText: '#1DB954',
    description: 'You have a strong ability to reason, solve problems and understand patterns and numbers.',
    goodAt: [
      { title: 'Solving math problems', icon: 'plus-square' },
      { title: 'Logical reasoning', icon: 'lightbulb' },
      { title: 'Analyzing patterns', icon: 'trending-up' },
      { title: 'Working with numbers', icon: 'calculator' }
    ],
    careers: [
      { title: 'Data Analyst', icon: 'bar-chart' },
      { title: 'Engineer', icon: 'settings' },
      { title: 'Scientist', icon: 'flask' },
      { title: 'Accountant', icon: 'credit-card' },
      { title: 'Actuary', icon: 'pie-chart' },
      { title: 'Researcher', icon: 'search' }
    ],
    improvements: [
      'Practice puzzles and brain games',
      'Play strategy games',
      'Learn mental math',
      'Understand data and graphs',
      'Solve real life problems',
      'Take online logic tests'
    ],
    breakdown: [
      { name: 'Logical Reasoning', score: 85, icon: 'lightbulb' },
      { name: 'Pattern Recognition', score: 80, icon: 'grid' },
      { name: 'Problem Solving', score: 83, icon: 'briefcase' },
      { name: 'Mathematical Ability', score: 78, icon: 'plus' }
    ],
    learningStyle: {
      bestLearnsWith: 'Examples, logic & experiments',
      learnsBestThrough: 'Understanding how things work',
      prefers: 'Facts, figures and systems'
    },
    famousPeople: [
      { name: 'Albert Einstein', title: 'Theoretical Physicist', icon: 'compass' },
      { name: 'Isaac Newton', title: 'Mathematician & Scientist', icon: 'apple' },
      { name: 'Nikola Tesla', title: 'Inventor & Engineer', icon: 'zap' }
    ]
  },
  {
    id: 'musical',
    name: 'Musical Intelligence',
    shortName: 'Musical',
    score: 75,
    ratingText: 'Strong',
    color: '#48BB78',
    bgColor: '#EAF7EE',
    badgeBg: '#E8F8F0',
    badgeText: '#1DB954',
    description: 'You possess sensitivity to rhythm, pitch, melody, tone, and the structure of musical compositions.',
    goodAt: [
      { title: 'Recognizing tonal pitch', icon: 'music' },
      { title: 'Rhythm & cadence keeping', icon: 'activity' },
      { title: 'Sound composition', icon: 'radio' },
      { title: 'Auditory patterning', icon: 'headphones' }
    ],
    careers: [
      { title: 'Music Producer', icon: 'headphones' },
      { title: 'Composer', icon: 'music' },
      { title: 'Sound Engineer', icon: 'sliders' },
      { title: 'Vocal Coach', icon: 'mic' },
      { title: 'Instrumentalist', icon: 'disc' },
      { title: 'Acoustician', icon: 'volume-2' }
    ],
    improvements: [
      'Practice playing an instrument daily',
      'Analyze music structures across genres',
      'Study rhythm & metronome drills',
      'Learn music theory fundamentals',
      'Sing or hum along to ear-training tracks',
      'Experiment with digital audio workstations'
    ],
    breakdown: [
      { name: 'Rhythm Perception', score: 82, icon: 'activity' },
      { name: 'Pitch Discrimination', score: 78, icon: 'music' },
      { name: 'Harmonic Awareness', score: 74, icon: 'disc' },
      { name: 'Compositional Sense', score: 70, icon: 'radio' }
    ],
    learningStyle: {
      bestLearnsWith: 'Rhymes, melodies & musical mnemonic aids',
      learnsBestThrough: 'Rhythmic background focus & listening',
      prefers: 'Audio soundscapes while studying'
    },
    famousPeople: [
      { name: 'Ludwig van Beethoven', title: 'Legendary Composer', icon: 'music' },
      { name: 'Wolfgang Amadeus Mozart', title: 'Classical Virtuoso', icon: 'disc' },
      { name: 'Taylor Swift', title: 'Songwriter & Performer', icon: 'star' }
    ]
  },
  {
    id: 'intrapersonal',
    name: 'Intrapersonal Intelligence',
    shortName: 'Intrapersonal',
    score: 70,
    ratingText: 'Average',
    color: '#2D7FF9',
    bgColor: '#EBF3FE',
    badgeBg: '#F1F5F9',
    badgeText: '#64748B',
    description: 'You understand yourself deeply—your feelings, motivations, strengths, weaknesses, and personal values.',
    goodAt: [
      { title: 'Self-reflection & awareness', icon: 'user' },
      { title: 'Goal setting & discipline', icon: 'target' },
      { title: 'Emotional regulation', icon: 'shield' },
      { title: 'Independent study', icon: 'book' }
    ],
    careers: [
      { title: 'Psychologist', icon: 'heart' },
      { title: 'Philosopher', icon: 'book-open' },
      { title: 'Author', icon: 'feather' },
      { title: 'Life Coach', icon: 'compass' },
      { title: 'Strategic Planner', icon: 'trending-up' },
      { title: 'Researcher', icon: 'search' }
    ],
    improvements: [
      'Keep a nightly reflective journal',
      'Practice mindfulness meditation',
      'Set clear short & long term goals',
      'Conduct monthly personal SWOT audits',
      'Read philosophy and psychology books',
      'Take regular solitary contemplative walks'
    ],
    breakdown: [
      { name: 'Self-Awareness', score: 76, icon: 'user' },
      { name: 'Goal Orientation', score: 72, icon: 'target' },
      { name: 'Intrinsic Motivation', score: 68, icon: 'zap' },
      { name: 'Metacognition', score: 66, icon: 'compass' }
    ],
    learningStyle: {
      bestLearnsWith: 'Self-paced learning & quiet environments',
      learnsBestThrough: 'Personal relevance & connection to values',
      prefers: 'Individual projects over group chaos'
    },
    famousPeople: [
      { name: 'Marcus Aurelius', title: 'Roman Emperor & Stoic', icon: 'shield' },
      { name: 'Carl Jung', title: 'Analytical Psychologist', icon: 'brain' },
      { name: 'Virginia Woolf', title: 'Modernist Writer', icon: 'feather' }
    ]
  },
  {
    id: 'spatial',
    name: 'Spatial Intelligence',
    shortName: 'Spatial',
    score: 70,
    ratingText: 'Average',
    color: '#F47B25',
    bgColor: '#FEF1E7',
    badgeBg: '#F1F5F9',
    badgeText: '#64748B',
    description: 'You can visualize 3D objects, mentally manipulate spaces, understand directions, and navigate visual arts.',
    goodAt: [
      { title: 'Mental 3D rotation', icon: 'box' },
      { title: 'Map reading & navigation', icon: 'map' },
      { title: 'Drawing & sketching', icon: 'image' },
      { title: 'Visual memory', icon: 'eye' }
    ],
    careers: [
      { title: 'Architect', icon: 'home' },
      { title: 'Graphic Designer', icon: 'palette' },
      { title: 'Pilot', icon: 'send' },
      { title: 'Game Designer', icon: 'layout' },
      { title: 'Surgeon', icon: 'activity' },
      { title: 'Urban Planner', icon: 'map-pin' }
    ],
    improvements: [
      'Solve 3D puzzles and Rubik’s cubes',
      'Sketch diagrams when studying complex topics',
      'Explore CAD design and 3D modeling software',
      'Practice navigating without GPS map orientation',
      'Study architecture and photography layouts',
      'Play visual strategy games'
    ],
    breakdown: [
      { name: 'Mental Rotation', score: 74, icon: 'box' },
      { name: 'Visual Navigation', score: 72, icon: 'map' },
      { name: 'Graphic Interpretation', score: 68, icon: 'image' },
      { name: 'Spatial Memory', score: 66, icon: 'eye' }
    ],
    learningStyle: {
      bestLearnsWith: 'Mind maps, diagrams, charts & infographics',
      learnsBestThrough: 'Visual associations & spatial layout',
      prefers: 'Color coding and flowcharts over plain text'
    },
    famousPeople: [
      { name: 'Leonardo da Vinci', title: 'Polymath & Artist', icon: 'palette' },
      { name: 'Zaha Hadid', title: 'Pioneering Architect', icon: 'box' },
      { name: 'Frank Lloyd Wright', title: 'Master Architect', icon: 'home' }
    ]
  },
  {
    id: 'naturalistic',
    name: 'Naturalistic Intelligence',
    shortName: 'Naturalistic',
    score: 65,
    ratingText: 'Average',
    color: '#586EE0',
    bgColor: '#EEF2FF',
    badgeBg: '#F1F5F9',
    badgeText: '#64748B',
    description: 'You possess sensitivity to nature, weather patterns, animals, ecological systems, and species taxonomy.',
    goodAt: [
      { title: 'Identifying flora & fauna', icon: 'leaf' },
      { title: 'Patterning environmental change', icon: 'sun' },
      { title: 'Ecological appreciation', icon: 'globe' },
      { title: 'Care for living organisms', icon: 'heart' }
    ],
    careers: [
      { title: 'Environmental Scientist', icon: 'globe' },
      { title: 'Veterinarian', icon: 'heart' },
      { title: 'Marine Biologist', icon: 'droplet' },
      { title: 'Botanist', icon: 'leaf' },
      { title: 'Geologist', icon: 'map-pin' },
      { title: 'Wildlife Officer', icon: 'compass' }
    ],
    improvements: [
      'Spend mindful time outdoors in nature',
      'Start a home herb or plant gardening project',
      'Identify local trees and birds with nature apps',
      'Study biology and ecology documentaries',
      'Visit natural history museums and botanical gardens',
      'Volunteer with wildlife conservation groups'
    ],
    breakdown: [
      { name: 'Classification Ability', score: 68, icon: 'tag' },
      { name: 'Environmental Sensitivity', score: 66, icon: 'sun' },
      { name: 'Nature Pattern Recognition', score: 64, icon: 'leaf' },
      { name: 'Bio-System Understanding', score: 62, icon: 'globe' }
    ],
    learningStyle: {
      bestLearnsWith: 'Outdoor exploration & tangible biological samples',
      learnsBestThrough: 'Taxonomy & categorization frameworks',
      prefers: 'Real world environmental case studies'
    },
    famousPeople: [
      { name: 'Charles Darwin', title: 'Naturalist & Biologist', icon: 'book' },
      { name: 'Jane Goodall', title: 'Primatologist & Ethologist', icon: 'heart' },
      { name: 'David Attenborough', title: 'Broadcaster & Naturalist', icon: 'globe' }
    ]
  }
];

export const senseList: SenseItem[] = [
  {
    id: 'vision',
    name: 'Vision',
    typeName: 'Visual',
    score: 88,
    ratingText: 'Dominant',
    color: '#2563EB',
    accentColor: '#3B82F6',
    bgColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    description: 'You prefer visual learning through images, diagrams, videos, and graphic mind maps.',
    strengths: [
      { title: 'Visual Memory', icon: 'eye' },
      { title: 'Color Association', icon: 'palette' },
      { title: 'Spatial Mapping', icon: 'map' },
      { title: 'Graphic Interpretation', icon: 'bar-chart' }
    ],
    learnBestWith: [
      { title: 'Diagrams & Charts', icon: 'pie-chart' },
      { title: 'Video Lessons', icon: 'video' },
      { title: 'Color-Coded Notes', icon: 'edit' },
      { title: 'Mind Maps', icon: 'git-branch' },
      { title: 'Visual Flashcards', icon: 'layers' },
      { title: 'Illustrated Books', icon: 'book' }
    ],
    careers: [
      { title: 'UI/UX Designer', icon: 'layout' },
      { title: 'Film Director', icon: 'video' },
      { title: 'Architect', icon: 'home' },
      { title: 'Data Visualizer', icon: 'bar-chart' },
      { title: 'Photographer', icon: 'camera' }
    ]
  },
  {
    id: 'hearing',
    name: 'Hearing',
    typeName: 'Auditory',
    score: 76,
    ratingText: 'Strong',
    color: '#16A34A',
    accentColor: '#22C55E',
    bgColor: '#F0FDF4',
    borderColor: '#BBF7D0',
    description: 'You learn effectively through listening, discussions, spoken explanations, and auditory lectures.',
    strengths: [
      { title: 'Auditory Memory', icon: 'volume-2' },
      { title: 'Verbal Retention', icon: 'mic' },
      { title: 'Pitch Sensitivity', icon: 'music' },
      { title: 'Dialogue Synthesis', icon: 'message-circle' }
    ],
    learnBestWith: [
      { title: 'Podcasts & Audiobooks', icon: 'headphones' },
      { title: 'Oral Presentations', icon: 'mic' },
      { title: 'Study Discussions', icon: 'users' },
      { title: 'Rhythmic Jingles', icon: 'music' },
      { title: 'Read-Aloud Revision', icon: 'book' },
      { title: 'Recorded Lectures', icon: 'play' }
    ],
    careers: [
      { title: 'Sound Engineer', icon: 'sliders' },
      { title: 'Journalist', icon: 'mic' },
      { title: 'Language Translator', icon: 'languages' },
      { title: 'Podcast Host', icon: 'radio' },
      { title: 'Music Producer', icon: 'music' }
    ]
  },
  {
    id: 'touch',
    name: 'Touch',
    typeName: 'Kinesthetic',
    score: 82,
    ratingText: 'Strong',
    color: '#EA580C',
    accentColor: '#F97316',
    bgColor: '#FFF7ED',
    borderColor: '#FFEDD5',
    description: 'You learn best through hands-on practice, physical activity, and tactile experiences. Physical engagement drives your deepest focus.',
    strengths: [
      { title: 'Hands-on Learner', icon: 'wrench' },
      { title: 'Muscle Memory', icon: 'user' },
      { title: 'High Dexterity', icon: 'grid' },
      { title: 'Learns by Doing', icon: 'play-circle' }
    ],
    learnBestWith: [
      { title: 'Practical Labs', icon: 'flask' },
      { title: 'Role Playing', icon: 'users' },
      { title: 'Building Models', icon: 'box' },
      { title: 'Physical Experiments', icon: 'flask' },
      { title: 'Interactive Games', icon: 'gamepad' },
      { title: 'Field Trips', icon: 'globe' }
    ],
    careers: [
      { title: 'Surgeon', icon: 'plus-circle' },
      { title: 'Athlete', icon: 'zap' },
      { title: 'Engineer', icon: 'settings' },
      { title: 'Craftsman', icon: 'edit' },
      { title: 'Chef', icon: 'coffee' }
    ]
  },
  {
    id: 'smell',
    name: 'Smell',
    typeName: 'Olfactory',
    score: 58,
    ratingText: 'Moderate',
    color: '#7C3AED',
    accentColor: '#8B5CF6',
    bgColor: '#F5F3FF',
    borderColor: '#DDD6FE',
    description: 'You have moderate sensitivity to smell-based experiences and olfactory environmental anchors.',
    strengths: [
      { title: 'Aroma Recall', icon: 'wind' },
      { title: 'Mood Anchoring', icon: 'sparkles' },
      { title: 'Atmosphere Sense', icon: 'sun' },
      { title: 'Botanical Instinct', icon: 'leaf' }
    ],
    learnBestWith: [
      { title: 'Aromatherapy Focus', icon: 'wind' },
      { title: 'Fresh Air Study Spaces', icon: 'sun' },
      { title: 'Scent Associative Cues', icon: 'sparkles' },
      { title: 'Nature Immersion', icon: 'leaf' },
      { title: 'Calming Essential Oils', icon: 'droplet' },
      { title: 'Clean Study Habitats', icon: 'check-circle' }
    ],
    careers: [
      { title: 'Perfumer', icon: 'wind' },
      { title: 'Sommelier', icon: 'wine' },
      { title: 'Botanist', icon: 'leaf' },
      { title: 'Food Flavorist', icon: 'coffee' },
      { title: 'Spa Aromatherapist', icon: 'heart' }
    ]
  },
  {
    id: 'taste',
    name: 'Taste',
    typeName: 'Gustatory',
    score: 62,
    ratingText: 'Moderate',
    color: '#E11D48',
    accentColor: '#F43F5E',
    bgColor: '#FFF1F2',
    borderColor: '#FFE4E6',
    description: 'You have a moderate connection with taste, flavor experiences, and sensory engagement through food and beverages.',
    strengths: [
      { title: 'Flavor Discrimination', icon: 'disc' },
      { title: 'Culinary Appreciation', icon: 'utensils' },
      { title: 'Sensory Curiosity', icon: 'star' },
      { title: 'Social Dining Comfort', icon: 'coffee' }
    ],
    learnBestWith: [
      { title: 'Study Breaks', icon: 'clock' },
      { title: 'Healthy Snacks', icon: 'check' },
      { title: 'Flavored Teas', icon: 'coffee' },
      { title: 'Sensory Anchors', icon: 'lightbulb' },
      { title: 'Social Dinners', icon: 'users' },
      { title: 'Mindful Tasting', icon: 'smile' }
    ],
    careers: [
      { title: 'Culinary Chef', icon: 'utensils' },
      { title: 'Food Critic', icon: 'edit' },
      { title: 'Flavor Chemist', icon: 'flask' },
      { title: 'Dietitian', icon: 'shield' },
      { title: 'Barista', icon: 'coffee' }
    ]
  }
];

export const brainDominanceData = {
  overallScore: 65,
  dominantSide: 'Right Brain Dominant',
  dominantSideDescription: 'You use your Right Brain more naturally. You are imaginative, intuitive and creative.',
  leftBrain: {
    percentage: 35,
    title: 'Analytical',
    type: 'Left Brain',
    color: '#3B82F6'
  },
  rightBrain: {
    percentage: 65,
    title: 'Creative',
    type: 'Right Brain',
    color: '#F43F5E'
  },
  traits: [
    { name: 'Imagination', score: 85, color: '#A855F7', bg: '#FAF5FF', text: '#9333EA' },
    { name: 'Intuition', score: 75, color: '#FB7185', bg: '#FFF1F2', text: '#E11D48' },
    { name: 'Creativity', score: 80, color: '#FBBF24', bg: '#FEF3C7', text: '#D97706' },
    { name: 'Logic', score: 40, color: '#3B82F6', bg: '#EFF6FF', text: '#2563EB' },
    { name: 'Analysis', score: 35, color: '#10B981', bg: '#ECFDF5', text: '#059669' }
  ]
};

export const personalityData = {
  archetype: {
    name: 'The Visionary Driver',
    code: 'D-I Blend',
    primaryPercentage: 65,
    secondaryPercentage: 35,
    headline: 'Decisive leadership propelled by infectious charisma and rapid execution',
    summary:
      'Combines bold assertiveness and milestone focus (65% Dominate) with magnetic social charisma, optimism, and team-rallying energy (35% Influential). Never waits for permission—creates momentum wherever they go.',
    superpower: 'The Momentum Machine',
    superpowerDesc:
      'Unlike pure drivers who may alienate others, or pure persuaders who struggle to close tasks, this blend inspires people with vision and personally drives the mission across the finish line.'
  },
  primary: {
    name: 'DOMINATE',
    percentage: 65,
    role: 'The Driver & Commander',
    color: '#7C3AED',
    accentColor: '#6D28D9',
    lightBg: '#F5F3FF',
    badgeText: 'Primary Personality (65%)',
    traits: ['Result-oriented', 'Strong-willed', 'Decisive', 'Direct & Candid', 'Milestone Driven'],
    cardTitle: 'Dominate Personality',
    tagline: 'Leads with bold confidence, focuses on milestones, and loves taking charge.',
    detail: 'A natural catalyst who cuts through hesitation, thrives on challenges, and takes charge when situations lack clarity.',
    powers: [
      'Fast, clear decision-making in ambiguity',
      'High accountability and outcome ownership',
      'Uncompromising grit when solving hard problems',
      'Cuts through overthinking to take rapid action'
    ],
    blindspots: [
      'Can appear blunt or hurried to sensitive peers',
      'May bypass consensus to accelerate output',
      'Needs reminders to celebrate small interim steps'
    ]
  },
  secondary: {
    name: 'INFLUENTIAL',
    percentage: 35,
    role: 'The Catalyst & Inspirer',
    color: '#10B981',
    accentColor: '#059669',
    lightBg: '#ECFDF5',
    badgeText: 'Secondary Personality (35%)',
    traits: ['Enthusiastic', 'Optimistic', 'Persuasive', 'People-Oriented', 'Inspiring'],
    cardTitle: 'Influential Personality',
    tagline: 'Inspires and mobilizes others through positive energy, charisma, and ideas.',
    detail: 'Brings warmth and infectious optimism to any group, making ambitious goals feel exciting and achievable.',
    powers: [
      'Natural presenter and verbal storyteller',
      'Builds quick trust, rapport, and collaborative spirit',
      'Bounces back rapidly from emotional setbacks',
      'Turns tense moments into shared laughter and focus'
    ],
    blindspots: [
      'Can lose interest once initial novelty fades',
      'May occasionally overcommit in bursts of excitement',
      'Dislikes overly rigid, repetitive administrative routines'
    ]
  },
  dimensions: [
    { name: 'Decisiveness & Drive', score: 94, level: 'Exceptional', description: 'Quick to commit; acts boldly under uncertainty' },
    { name: 'Charisma & Social Energy', score: 88, level: 'Very High', description: 'Draws people in; articulates vision with conviction' },
    { name: 'Task Autonomy', score: 90, level: 'Exceptional', description: 'Requires ownership; thrives when trusted with outcomes' },
    { name: 'Pace & Execution Urgency', score: 92, level: 'Exceptional', description: 'High internal clock; moves projects forward rapidly' },
    { name: 'Collaborative Listening', score: 74, level: 'Balanced', description: 'Engaged in dialogue; benefits from deliberate pause drills' },
    { name: 'Calculated Risk Appetite', score: 86, level: 'High', description: 'Prefers smart experiments over comfortable stagnation' }
  ],
  scenarios: [
    {
      id: 'teamwork',
      title: 'In Group Projects',
      subtitle: 'Natural Captain & Coordinator',
      icon: 'users',
      color: '#7C3AED',
      bg: '#F5F3FF',
      behavior: 'Naturally takes the whiteboard, outlines the project milestones, assigns responsibilities according to strengths, and keeps the team motivated when deadlines loom.',
      tip: 'Encourage team check-ins where every member voices their opinion before the final vote.'
    },
    {
      id: 'pressure',
      title: 'Under Exam / Academic Pressure',
      subtitle: 'Competitive Clarity & Speed',
      icon: 'zap',
      color: '#059669',
      bg: '#ECFDF5',
      behavior: 'Instead of freezing, focuses intensely on high-yield topics, builds a rapid action plan, and uses timer-based sprints to knock out study goals.',
      tip: 'Schedule forced calm intervals so intense focus does not lead to physical fatigue.'
    },
    {
      id: 'communication',
      title: 'Communication Playbook',
      subtitle: 'Direct, Expressive & Candid',
      icon: 'message',
      color: '#2563EB',
      bg: '#EFF6FF',
      behavior: 'Appreciates direct, concise communication without beat-around-the-bush filler. Responds best to "Here is the objective, here are your options, what do you think?"',
      tip: 'Provide the big picture first, followed by the specific outcome expected.'
    },
    {
      id: 'learning',
      title: 'Optimal Learning Environment',
      subtitle: 'Challenge-Driven & Active',
      icon: 'compass',
      color: '#D97706',
      bg: '#FFFBEB',
      behavior: 'Loses engagement during passive, repetitive lectures. Excels when given real-world case studies, competitive quizzes, debates, and prototype builds.',
      tip: 'Incorporate project-based challenges and debate formats into daily study.'
    }
  ],
  roleModels: [
    { name: 'Steve Jobs', role: 'Visionary Innovator', tag: 'D-I Pioneer', note: 'Iconic blend of relentless product drive and charismatic stage presence.' },
    { name: 'Serena Williams', role: 'Champion & Venture Leader', tag: 'D-I Competitor', note: 'Fierce competitive determination coupled with inspiring global advocacy.' },
    { name: 'Winston Churchill', role: 'Historic Statesman', tag: 'D-I Orator', note: 'Uncompromising resolve articulated through stirring, morale-lifting speeches.' }
  ],
  topStrengths: [
    { title: 'Executive Initiative', icon: 'crosshair', color: '#7C3AED', bg: '#F5F3FF', score: 96, desc: 'Takes proactive ownership without waiting for instructions' },
    { title: 'Persuasive Vision', icon: 'sparkles', color: '#10B981', bg: '#ECFDF5', score: 92, desc: 'Articulates goals so clearly that others enthusiastically follow' },
    { title: 'Crisis Decisiveness', icon: 'zap', color: '#2563EB', bg: '#EFF6FF', score: 90, desc: 'Maintains composure and makes decisive calls when others hesitate' },
    { title: 'Milestone Execution', icon: 'trending-up', color: '#D97706', bg: '#FFFBEB', score: 88, desc: 'Relentlessly tracks and drives projects across the finish line' },
    { title: 'Team Morale Catalyst', icon: 'users', color: '#E11D48', bg: '#FFF1F2', score: 85, desc: 'Infuses optimism and lifts group energy during challenging phases' }
  ],
  mentorTips: [
    {
      category: 'For Parents & Mentors',
      advice: 'Grant autonomy over the roadmap while setting clear non-negotiable milestones. When trust is given, initiative doubles.'
    },
    {
      category: 'Communication Key',
      advice: 'Be direct and concise. Lead with the ultimate destination and show how suggestions accelerate his goals.'
    },
    {
      category: 'Growth Exercise',
      advice: 'Practice the "3-Beat Pause": Before finalizing a team decision, ask two quiet peers for their take.'
    }
  ]
};

export const swotData: SwotCategory[] = [
  {
    title: 'STRENGTHS',
    count: 12,
    color: '#16A34A',
    bgColor: '#EAF9EE',
    borderColor: '#BCECC8',
    iconBg: '#D4F4DD',
    items: ['Result-oriented', 'Strong-willed', 'Decisive', 'Direct', 'Goal Driven']
  },
  {
    title: 'WEAKNESSES',
    count: 5,
    color: '#EA580C',
    bgColor: '#FFF7ED',
    borderColor: '#FED7AA',
    iconBg: '#FFE8D6',
    items: ['Impatience', 'Overconfidence', 'Public Speaking', 'Consistency', 'Delegation']
  },
  {
    title: 'OPPORTUNITIES',
    count: 8,
    color: '#2563EB',
    bgColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    iconBg: '#DBEAFE',
    items: ['Business Leadership', 'Entrepreneurship', 'Product Management', 'Public Speaking', 'Team Leadership']
  },
  {
    title: 'THREATS',
    count: 3,
    color: '#E11D48',
    bgColor: '#FFF1F2',
    borderColor: '#FECDD3',
    iconBg: '#FFE4E6',
    items: ['Impatience', 'Overconfidence', 'Public Speaking', 'Consistency', 'Delegation']
  }
];

export const recommendationsData = {
  weaknesses: [
    'Practice patience with mindfulness exercises',
    'Join public speaking club',
    'Work on active listening skills',
    'Use daily planner for better consistency'
  ],
  opportunities: [
    'Explore leadership development programs',
    'Participate in hackathons and competitions',
    'Network with industry professionals',
    'Take up entrepreneurial projects'
  ],
  threats: [
    'Follow a strict time management routine',
    'Avoid multitasking and social media distraction',
    'Take regular breaks to avoid burnout',
    'Practice stress management techniques'
  ]
};
