export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

export interface NavbarProps {
  logo?: string;
  brandName?: string;
  navItems?: NavItem[];
  className?: string;
  variant?: 'default' | 'transparent' | 'dark';
}