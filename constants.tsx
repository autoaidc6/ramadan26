
import { NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#' },
  { label: 'Journey', href: '#profile' },
  { label: 'Tracker', href: '#tracker' },
  { label: 'Quran', href: '#quran' },
  { 
    label: 'Kids', 
    href: '#kids',
    children: [
      { label: 'Storytelling', href: '#kids/stories' },
      { label: 'Challenges', href: '#kids/challenges' },
      { label: 'Nasheeds', href: '#kids/nasheeds' },
      { label: 'Resources', href: '#kids/printables' },
    ]
  },
  { label: 'Reflections', href: '#calendar' },
];

export const COLORS = {
  navy: '#0a192f',
  gold: '#D4AF37',
  goldHover: '#facc15',
};

export const RAMADAN_2026 = {
  startDate: new Date('2026-02-18T00:00:00'),
  endDate: new Date('2026-03-19T23:59:59'), // Approximate 30 days
};
