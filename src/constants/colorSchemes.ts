export interface ColorScheme {
  id: string;
  name: string;
  background: string;
  foreground: string;
  circleColor: string; // Solid color for the color picker circle
}

export const COLOR_SCHEMES: ColorScheme[] = [
  {
    id: 'default',
    name: 'Default',
    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
    foreground: '#2c3e50',
    circleColor: '#f8f9fa',
  },
  {
    id: 'blue',
    name: 'Blue',
    background: 'linear-gradient(145deg, #e3f2fd 0%, #bbdefb 100%)',
    foreground: '#1565c0',
    circleColor: '#bbdefb',
  },
  {
    id: 'green',
    name: 'Green',
    background: 'linear-gradient(145deg, #e8f5e9 0%, #c8e6c9 100%)',
    foreground: '#2e7d32',
    circleColor: '#c8e6c9',
  },
  {
    id: 'purple',
    name: 'Purple',
    background: 'linear-gradient(145deg, #f3e5f5 0%, #e1bee7 100%)',
    foreground: '#7b1fa2',
    circleColor: '#e1bee7',
  },
  {
    id: 'orange',
    name: 'Orange',
    background: 'linear-gradient(145deg, #fff3e0 0%, #ffe0b2 100%)',
    foreground: '#e65100',
    circleColor: '#ffe0b2',
  },
  {
    id: 'pink',
    name: 'Pink',
    background: 'linear-gradient(145deg, #fce4ec 0%, #f8bbd0 100%)',
    foreground: '#c2185b',
    circleColor: '#f8bbd0',
  },
  {
    id: 'teal',
    name: 'Teal',
    background: 'linear-gradient(145deg, #e0f2f1 0%, #b2dfdb 100%)',
    foreground: '#00695c',
    circleColor: '#b2dfdb',
  },
  {
    id: 'amber',
    name: 'Amber',
    background: 'linear-gradient(145deg, #fff8e1 0%, #ffecb3 100%)',
    foreground: '#ff6f00',
    circleColor: '#ffecb3',
  },
];

export const DEFAULT_COLOR_SCHEME_ID = 'default';

export const getColorSchemeById = (id: string): ColorScheme => {
  return COLOR_SCHEMES.find((scheme) => scheme.id === id) || COLOR_SCHEMES[0];
};

