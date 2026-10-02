import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View, type StyleProp, type TextInputProps, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import { useColors } from '@/hooks/useColors';
import { useFintech, type PriceMode } from '@/context/FintechContext';

export const money = (value: number, digits = 2) => `₹${Math.abs(value).toLocaleString('en-IN', { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
export const signedMoney = (value: number) => `${value < 0 ? '−' : '+'}${money(value)}`;
export const prettyNumber = (value: number) => value.toLocaleString('en-IN', { maximumFractionDigits: 2 });

export function Page({ children, contentStyle, scroll = true, bottomSpace }: { children: React.ReactNode; contentStyle?: StyleProp<ViewStyle>; scroll?: boolean; bottomSpace?: number }) {
  const colors = useColors();
  const body = scroll
    ? <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={[styles.pageContent, { paddingBottom: bottomSpace ?? (Platform.OS === 'web' ? 118 : 36) }, contentStyle]} showsVerticalScrollIndicator={false}>{children}</ScrollView>
    : <View style={[styles.pageContent, { flex: 1, paddingBottom: bottomSpace ?? 24 }, contentStyle]}>{children}</View>;
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={[styles.page, { backgroundColor: colors.background, paddingTop: Platform.OS === 'web' ? 67 : 0 }]}>
      {body}
    </SafeAreaView>
  );
}

export function TopBar({ title, subtitle, back, right }: { title: string; subtitle?: string; back?: () => void; right?: React.ReactNode }) {
  const colors = useColors();
  return (
    <View style={styles.topBar}>
      {back ? <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={back} style={styles.iconButton}><Feather name="arrow-left" size={21} color={colors.foreground} /></Pressable> : null}
      <View style={styles.topBarText}>
        <Text style={[styles.topTitle, { color: colors.foreground }]}>{title}</Text>
        {subtitle ? <Text style={[styles.topSubtitle, { color: colors.mutedForeground }]}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  );
}

export function IconButton({ icon, label, onPress }: { icon: keyof typeof Feather.glyphMap; label: string; onPress: () => void }) {
  const colors = useColors();
  return <Pressable accessibilityRole="button" accessibilityLabel={label} hitSlop={12} onPress={onPress} style={styles.iconButton}><Feather name={icon} size={21} color={colors.foreground} /></Pressable>;
}

export function Heading({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  const colors = useColors();
  return <View style={styles.headingRow}><Text style={[styles.sectionHeading, { color: colors.foreground }]}>{title}</Text>{action && onAction ? <Pressable onPress={onAction} accessibilityRole="button"><Text style={[styles.linkText, { color: colors.accentForeground }]}>{action}</Text></Pressable> : null}</View>;
}

export function Card({ children, style, tone = 'soft' }: { children: React.ReactNode; style?: StyleProp<ViewStyle>; tone?: 'soft' | 'white' | 'ink' }) {
  const colors = useColors();
  return <View style={[styles.card, { backgroundColor: tone === 'ink' ? colors.ink : tone === 'white' ? colors.background : colors.card, borderColor: tone === 'white' ? colors.border : 'transparent' }, style]}>{children}</View>;
}

export function Button({ label, onPress, kind = 'primary', icon, disabled = false, testID, style }: { label: string; onPress: () => void; kind?: 'primary' | 'ink' | 'success' | 'danger' | 'outline' | 'quiet'; icon?: keyof typeof Feather.glyphMap; disabled?: boolean; testID?: string; style?: StyleProp<ViewStyle> }) {
  const colors = useColors();
  const palette = {
    primary: [colors.primary, colors.primaryForeground],
    ink: [colors.ink, colors.inverse],
    success: [colors.positive, colors.inverse],
    danger: [colors.negativeFill, colors.inverse],
    outline: [colors.background, colors.foreground],
    quiet: [colors.secondary, colors.foreground],
  }[kind];
  return (
    <Pressable testID={testID} accessibilityRole="button" accessibilityState={{ disabled }} disabled={disabled} onPress={onPress} style={({ pressed }) => [
      styles.button, { backgroundColor: disabled ? colors.muted : pressed && kind === 'primary' ? colors.primaryPressed : palette[0], borderColor: kind === 'outline' ? colors.border : 'transparent', opacity: pressed && kind !== 'primary' ? 0.86 : 1 }, style,
    ]}>
      {icon ? <Feather name={icon} size={17} color={disabled ? colors.disabledText : palette[1]} /> : null}
      <Text style={[styles.buttonText, { color: disabled ? colors.disabledText : palette[1] }]}>{label}</Text>
    </Pressable>
  );
}

export function Chip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  const colors = useColors();
  return <Pressable accessibilityRole="button" accessibilityState={{ selected }} onPress={onPress} style={[styles.chip, { backgroundColor: selected ? colors.accent : colors.secondary, borderColor: selected ? colors.ink : 'transparent' }]}><Text style={[styles.chipText, { color: selected ? colors.foreground : colors.mutedForeground }]}>{label}</Text></Pressable>;
}

export function Field({ label, value, onChangeText, placeholder, keyboardType, secureTextEntry, multiline, autoCapitalize = 'sentences', testID }: TextInputProps & { label: string; value: string; onChangeText: (text: string) => void; testID?: string }) {
  const colors = useColors();
  return (
    <View style={styles.fieldWrap}>
      <Text style={[styles.fieldLabel, { color: colors.foreground }]}>{label}</Text>
      <TextInput testID={testID} accessibilityLabel={label} value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={colors.tertiaryText} keyboardType={keyboardType} secureTextEntry={secureTextEntry} multiline={multiline} autoCapitalize={autoCapitalize} style={[styles.input, multiline && styles.multilineInput, { backgroundColor: colors.secondary, borderColor: colors.input, color: colors.foreground }]} />
    </View>
  );
}

export function PriceMove({ value, mode, compact = false }: { value: number; mode?: PriceMode; compact?: boolean }) {
  const { data } = useFintech();
  const colors = useColors();
  const chosen = mode ?? data.priceMode;
  const up = value >= 0;
  const color = chosen === 'safe' ? (up ? colors.safePositive : colors.safeNegative) : chosen === 'reversed' ? (up ? colors.negative : colors.positive) : (up ? colors.positive : colors.negative);
  return <Text accessibilityLabel={`${up ? 'Up' : 'Down'} ${Math.abs(value).toFixed(2)} percent`} style={{ color, fontFamily: 'Inter_600SemiBold', fontSize: compact ? 12 : 13 }}>{up ? '▲ +' : '▼ −'}{Math.abs(value).toFixed(2)}%</Text>;
}

export function MiniChart({ values, color, height = 142, fill = false }: { values: number[]; color: string; height?: number; fill?: boolean }) {
  const colors = useColors();
  const width = 320;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const points = values.map((value, index) => ({
    x: (index * (width - 4)) / Math.max(1, values.length - 1) + 2,
    y: height - 10 - ((value - min) / span) * (height - 24),
  }));
  const line = points.map((point, index) => `${index ? 'L' : 'M'}${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(' ');
  const area = `${line} L${width},${height} L0,${height} Z`;
  return (
    <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      {[0.25, 0.5, 0.75].map((part) => <Line key={part} x1="0" x2={width} y1={height * part} y2={height * part} stroke={colors.grid} strokeWidth="1" />)}
      {fill ? <Path d={area} fill={color} opacity={0.08} /> : null}
      <Path d={line} fill="none" stroke={color} strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
      {points.length ? <Circle cx={points[points.length - 1]?.x ?? 0} cy={points[points.length - 1]?.y ?? 0} r="4" fill={color} /> : null}
    </Svg>
  );
}

export function Delta({ value }: { value: number }) {
  const colors = useColors();
  const positive = value >= 0;
  return <View style={[styles.delta, { backgroundColor: positive ? colors.positiveSoft : colors.negativeSoft }]}><Text style={[styles.deltaText, { color: positive ? colors.positive : colors.negative }]}>{positive ? '▲ +' : '▼ −'}{money(value)}</Text></View>;
}

export function SectionDivider() {
  const colors = useColors();
  return <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginVertical: 12 }} />;
}

export const styles = StyleSheet.create({
  page: { flex: 1 },
  pageContent: { paddingHorizontal: 20, paddingTop: 10, gap: 22 },
  topBar: { minHeight: 54, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 2 },
  topBarText: { flex: 1, gap: 3 },
  topTitle: { fontFamily: 'Inter_700Bold', fontSize: 23, letterSpacing: -0.55 },
  topSubtitle: { fontFamily: 'Inter_400Regular', fontSize: 12 },
  iconButton: { minWidth: 42, minHeight: 42, alignItems: 'center', justifyContent: 'center' },
  headingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  sectionHeading: { fontFamily: 'Inter_600SemiBold', fontSize: 16, letterSpacing: -0.25 },
  linkText: { fontFamily: 'Inter_600SemiBold', fontSize: 12 },
  card: { borderRadius: 20, padding: 18, borderWidth: 1 },
  button: { minHeight: 50, paddingHorizontal: 16, borderRadius: 15, borderWidth: 1, flexDirection: 'row', gap: 9, alignItems: 'center', justifyContent: 'center' },
  buttonText: { fontFamily: 'Inter_600SemiBold', fontSize: 14 },
  chip: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 999, borderWidth: 1 },
  chipText: { fontFamily: 'Inter_600SemiBold', fontSize: 12 },
  fieldWrap: { gap: 8 },
  fieldLabel: { fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  input: { minHeight: 50, borderWidth: 1, borderRadius: 14, paddingHorizontal: 14, fontFamily: 'Inter_400Regular', fontSize: 15 },
  multilineInput: { minHeight: 100, paddingTop: 13, textAlignVertical: 'top' },
  delta: { paddingHorizontal: 10, paddingVertical: 7, borderRadius: 999, alignSelf: 'flex-start' },
  deltaText: { fontFamily: 'Inter_600SemiBold', fontSize: 12 },
});