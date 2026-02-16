
export interface NavItem {
  label: string;
  href: string;
}

export interface NavbarProps {
  items: NavItem[];
}

export interface Reflection {
  id: string;
  day: number;
  ayah: string;
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
