
export interface Course {
  id: number;
  image?: string;
  field?: string;
  title?: string;
  description?: string;
  level?: string;
  duration?: string;
  price?: string;
  badgeColor?: string;
}


export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}
