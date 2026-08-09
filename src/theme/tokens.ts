export const colors = {
  primary: {
    50: "#F7F3FF",
    100: "#EDE5FF",
    400: "#8B5CF6",
    500: "#6C32D9",
    600: "#5821C7",
  },
  navy: { 700: "#33335C", 900: "#17174A" },
  gray: { 200: "#E5E5EF", 500: "#8B8BA3" },
  white: "#FFFFFF",
  success: "#59C83F",
  info: "#2588F5",
  warning: "#FFB51B",
  orange: "#FF8A16",
  pink: "#F4478F",
  danger: "#EF476F",
  subjects: {
    math: "#2588F5",
    science: "#69C93D",
    bahasaMelayu: "#FF9E28",
    english: "#F4478F",
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
  "3xl": 40,
} as const;

export const radii = {
  small: 12,
  control: 16,
  card: 20,
  pill: 999,
} as const;

export const typography = {
  display: { fontSize: 36, lineHeight: 42, fontFamily: "Nunito_800ExtraBold" },
  h1: { fontSize: 30, lineHeight: 36, fontFamily: "Nunito_800ExtraBold" },
  h2: { fontSize: 26, lineHeight: 32, fontFamily: "Nunito_800ExtraBold" },
  h3: { fontSize: 22, lineHeight: 28, fontFamily: "Nunito_700Bold" },
  bodyLarge: { fontSize: 18, lineHeight: 27, fontFamily: "Nunito_600SemiBold" },
  body: { fontSize: 16, lineHeight: 24, fontFamily: "Nunito_500Medium" },
  button: { fontSize: 17, lineHeight: 22, fontFamily: "Nunito_800ExtraBold" },
  label: { fontSize: 14, lineHeight: 19, fontFamily: "Nunito_700Bold" },
  caption: { fontSize: 12, lineHeight: 16, fontFamily: "Nunito_600SemiBold" },
} as const;
