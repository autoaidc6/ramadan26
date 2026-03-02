
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface NavbarProps {
  items: NavItem[];
}

export interface Reflection {
  id: string;
  day: number;
  ayah: string;
  arabicAyah?: string;
  reflectionText: string;
  journalQuestion: string;
  dua: string;
}

export interface HabitStatus {
  fasting: boolean;
  prayers: boolean;
  taraweeh: boolean;
  quran: boolean;
  dhikr: boolean;
  charity: boolean;
}

export interface DayData {
  day: number;
  habits: HabitStatus;
}

export interface JuzData {
  number: number;
  completed: boolean;
  notes: string;
}

export type PrintableCategory = 'All' | 'Kids' | 'Planners' | 'Trackers' | 'Family';

export interface Printable {
  id: string;
  title: string;
  description: string;
  category: PrintableCategory;
  isPremium: boolean;
  thumbnailUrl: string;
  fileUrl?: string;
  created_at?: string;
}

export interface Tradition {
  id: string;
  title: string;
  description: string;
  icon: string;
  created_at?: string;
}

export type UserRole = 'admin' | 'user';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  category: 'Habits' | 'Quran' | 'Social' | 'Special';
}

export interface DailyDeed {
  id: string;
  title: string;
  points: number;
  icon: string;
  isCompleted?: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: string;
  category: 'Daily' | 'Weekly' | 'Special';
  isCompleted?: boolean;
}

export interface UserStats {
  points: number;
  level: number;
  streak: number;
  badges: Badge[];
  totalHabitsCompleted: number;
  totalJuzCompleted: number;
}

export interface Profile {
  id: string;
  role: UserRole;
  avatar_url?: string;
  stats?: UserStats;
}
