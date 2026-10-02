/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const colors = {
  light: {
    // Citron Light tokens — light theme only.
    text: '#181C24',
    tint: '#55610A',
    background: '#FFFFFF',
    foreground: '#181C24',
    card: '#FAFAFB',
    cardForeground: '#181C24',
    primary: '#CDE72F',
    primaryForeground: '#181C24',
    primaryPressed: '#AFC71F',
    secondary: '#F5F6F8',
    secondaryForeground: '#2B313C',
    muted: '#EDEFF2',
    mutedForeground: '#4F5666',
    tertiaryText: '#636A78',
    disabledText: '#7F8695',
    accent: '#FBFDE8',
    accentForeground: '#55610A',
    destructive: '#D92D43',
    destructiveText: '#B4182C',
    destructiveSoft: '#FDEEEF',
    destructiveForeground: '#FFFFFF',
    border: '#E1E4E9',
    borderStrong: '#CDD1D8',
    input: '#7F8695',
    ink: '#181C24',
    positive: '#0B7A4B',
    positiveFill: '#0E9A5C',
    positiveSoft: '#EAF8F1',
    positiveBorder: '#CDEFDF',
    negative: '#B4182C',
    negativeFill: '#D92D43',
    negativeSoft: '#FDEEEF',
    warning: '#8F5A00',
    warningFill: '#B87400',
    warningSoft: '#FFF5E0',
    info: '#1B49B8',
    infoFill: '#2563D9',
    infoSoft: '#EBF3FF',
    safePositive: '#1649B0',
    safeNegative: '#B83A0A',
    safeNegativeFill: '#D9480F',
    chartViolet: '#7C4DDB',
    grid: '#EDEFF2',
    scrim: '#0D1017',
    inverse: '#FFFFFF',
    focus: '#2563D9',
  },
  radius: 16,
};

export default colors;
