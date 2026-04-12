export interface ColorScheme {
  id: string;
  name: string;
  foreground: string;
  circleColor: string;
}

interface ColorSchemeDefinition {
  id: string;
  name: string;
  light: { foreground: string; circleColor: string };
  dark: { foreground: string; circleColor: string };
}

const SCHEME_DEFINITIONS: ColorSchemeDefinition[] = [
  {
    id: 'default',
    name: 'Slate',
    light: { foreground: '#475569', circleColor: '#e2e8f0' },
    dark:  { foreground: '#94a3b8', circleColor: '#334155' },
  },
  {
    id: 'blue',
    name: 'Blue',
    light: { foreground: '#2563eb', circleColor: '#bfdbfe' },
    dark:  { foreground: '#60a5fa', circleColor: '#1e3a5f' },
  },
  {
    id: 'green',
    name: 'Green',
    light: { foreground: '#16a34a', circleColor: '#bbf7d0' },
    dark:  { foreground: '#4ade80', circleColor: '#14532d' },
  },
  {
    id: 'purple',
    name: 'Purple',
    light: { foreground: '#7c3aed', circleColor: '#e9d5ff' },
    dark:  { foreground: '#a78bfa', circleColor: '#3b1f6e' },
  },
  {
    id: 'orange',
    name: 'Orange',
    light: { foreground: '#ea580c', circleColor: '#fed7aa' },
    dark:  { foreground: '#fb923c', circleColor: '#5c2d0e' },
  },
  {
    id: 'pink',
    name: 'Pink',
    light: { foreground: '#db2777', circleColor: '#fbcfe8' },
    dark:  { foreground: '#f472b6', circleColor: '#5b1a3a' },
  },
  {
    id: 'teal',
    name: 'Teal',
    light: { foreground: '#0d9488', circleColor: '#99f6e4' },
    dark:  { foreground: '#2dd4bf', circleColor: '#134e4a' },
  },
  {
    id: 'amber',
    name: 'Amber',
    light: { foreground: '#d97706', circleColor: '#fde68a' },
    dark:  { foreground: '#fbbf24', circleColor: '#5c3a0e' },
  },
];

export const DEFAULT_COLOR_SCHEME_ID = 'default';

const isDarkMode = (): boolean => {
  return document.documentElement.getAttribute('data-theme') === 'dark';
};

export const getColorSchemeById = (id: string): ColorScheme => {
  const def = SCHEME_DEFINITIONS.find((s) => s.id === id) || SCHEME_DEFINITIONS[0];
  const palette = isDarkMode() ? def.dark : def.light;
  return { id: def.id, name: def.name, ...palette };
};

export const COLOR_SCHEMES = SCHEME_DEFINITIONS.map((def) => ({
  id: def.id,
  name: def.name,
  get foreground() { return (isDarkMode() ? def.dark : def.light).foreground; },
  get circleColor() { return (isDarkMode() ? def.dark : def.light).circleColor; },
}));
