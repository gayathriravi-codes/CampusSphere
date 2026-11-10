import {
  Briefcase,
  Camera,
  Cpu,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  Music4,
  Rocket,
  Trophy,
} from 'lucide-react'

export const categoryMeta = {
  Technology: {
    icon: Cpu,
    gradient: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    soft: '#eff6ff',
    text: '#1d4ed8',
  },
  Workshop: {
    icon: Lightbulb,
    gradient: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
    soft: '#f5f3ff',
    text: '#6d28d9',
  },
  Cultural: {
    icon: Music4,
    gradient: 'linear-gradient(135deg, #6d28d9 0%, #db2777 100%)',
    soft: '#fdf2f8',
    text: '#be185d',
  },
  Sports: {
    icon: Trophy,
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
    soft: '#eff6ff',
    text: '#0369a1',
  },
  Entrepreneurship: {
    icon: Rocket,
    gradient: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)',
    soft: '#eef2ff',
    text: '#4338ca',
  },
  Arts: {
    icon: Camera,
    gradient: 'linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)',
    soft: '#eef2ff',
    text: '#4f46e5',
  },
  Academic: {
    icon: GraduationCap,
    gradient: 'linear-gradient(135deg, #1d4ed8 0%, #4f46e5 100%)',
    soft: '#eff6ff',
    text: '#1d4ed8',
  },
  Community: {
    icon: HeartHandshake,
    gradient: 'linear-gradient(135deg, #0891b2 0%, #2563eb 100%)',
    soft: '#ecfeff',
    text: '#0e7490',
  },
  Career: {
    icon: Briefcase,
    gradient: 'linear-gradient(135deg, #6d28d9 0%, #2563eb 100%)',
    soft: '#f5f3ff',
    text: '#6d28d9',
  },
}

export const fallbackCategory = {
  icon: GraduationCap,
  gradient: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
  soft: '#eff6ff',
  text: '#1d4ed8',
}

export function getCategoryMeta(category) {
  return categoryMeta[category] || fallbackCategory
}

export const categories = Object.keys(categoryMeta)
