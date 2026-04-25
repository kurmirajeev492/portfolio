export type SocialIcon = 'github' | 'linkedin' | 'x' | 'dribbble' | 'mail' | 'phone';

export interface PortfolioMeta {
  siteTitle: string;
  description: string;
}

export interface PortfolioPerson {
  name: string;
  headline: string;
  typingRoles: string[];
  location: string;
  summary?: string;
  heroImage?: string;
  profileImage: string;
  resumeUrl?: string;
}

export interface PortfolioSocialLink {
  label: string;
  icon: SocialIcon;
  url: string;
}

export interface PortfolioNavItem {
  id: string;
  label: string;
}

export interface PortfolioAbout {
  title: string;
  subtitle: string;
  description: string;
  tags?: string[];
}

export interface PortfolioSkill {
  name: string;
  level: number;
}

export interface PortfolioSkills {
  coding: PortfolioSkill[];
  professional: PortfolioSkill[];
}

export interface PortfolioExperienceItem {
  title: string;
  company: string;
  location: string;
  start: string;
  end: string;
  highlights: string[];
}

export interface PortfolioProjectLink {
  label: string;
  url: string;
}

export interface PortfolioProject {
  title: string;
  description: string;
  image: string;
  tags: string[];
  links: PortfolioProjectLink[];
}

export interface PortfolioContact {
  title: string;
  email: string;
  phone?: string;
  cta: string;
}

export interface PortfolioData {
  meta: PortfolioMeta;
  person: PortfolioPerson;
  social: PortfolioSocialLink[];
  nav: PortfolioNavItem[];
  about: PortfolioAbout;
  skills: PortfolioSkills;
  experience: PortfolioExperienceItem[];
  projects: PortfolioProject[];
  contact: PortfolioContact;
}

