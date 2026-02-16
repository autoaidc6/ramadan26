
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
