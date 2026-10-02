import React, { useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { Button, Card, Chip, Delta, Field, Heading, IconButton, MiniChart, money, Page, PriceMove, prettyNumber, SectionDivider, TopBar } from '@/components/FintechUI';
import { MARKETPLACE_PRODUCTS, useAsset, useFintech, type Asset, type ListingStatus, type ProductListing } from '@/context/FintechContext';
import { useColors } from '@/hooks/useColors';

const chartPoints = [22, 24, 21, 28, 26, 34, 31, 37, 35, 44, 40, 47, 43, 53, 50, 61, 57, 68, 65, 74, 70, 83];
const detailPoints = [50, 44, 48, 40, 45, 39, 42, 32, 36, 30, 35, 27, 32, 24, 28, 18, 22, 16, 20, 12];

function PageHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: React.ReactNode }) {
  return <TopBar title={title} subtitle={subtitle} right={right} />;
}

function AssetMark({ symbol }: { symbol: string }) {
  const colors = useColors();
  const initials = symbol === 'NIFTY 50' ? '50' : symbol === 'BANKNIFTY' ? 'BK' : symbol.replace(/[^A-Z]/g, '').slice(0, 2);
  return <View style={[local.mark, { backgroundColor: colors.accent }]}><Text style={[local.markText, { color: colors.accentForeground }]}>{initials}</Text></View>;
}

function AssetRow({ asset, onPress, showWatch = false }: { asset: Asset; onPress: () => void; showWatch?: boolean }) {
  const colors = useColors();
  const { data, toggleWatchlist } = useFintech();
  const watched = data.watchlist.includes(asset.symbol);
  return (
    <Pressable testID={`asset-${asset.symbol}`} accessibilityRole="button" accessibilityLabel={`${asset.name}, ${money(asset.price)}; open details`} onPress={onPress} style={({ pressed }) => [local.assetRow, pressed && { opacity: 0.76 }]}>
      <AssetMark symbol={asset.symbol} />
      <View style={local.assetMain}>
        <Text style={[local.assetSymbol, { color: colors.foreground }]} numberOfLines={1}>{asset.symbol}</Text>
        <Text style={[local.assetName, { color: colors.mutedForeground }]} numberOfLines={1}>{asset.name}</Text>
      </View>
      <View style={local.assetNumbers}>
        <Text style={[local.assetPrice, { color: colors.foreground }]}>{money(asset.price)}</Text>
        <PriceMove value={asset.changePercent} compact />
      </View>
      {showWatch ? <Pressable accessibilityRole="button" accessibilityLabel={watched ? `Remove ${asset.symbol} from watchlist` : `Add ${asset.symbol} to watchlist`} hitSlop={10} onPress={() => toggleWatchlist(asset.symbol)} style={local.watchTap}><Feather name={watched ? 'star' : 'star'} size={16} color={watched ? colors.warning : colors.disabledText} /></Pressable> : null}
    </Pressable>
  );
}

function ActivityRow({ title, detail, amount, type }: { title: string; detail: string; amount: number; type: string }) {
  const colors = useColors();
  const icon: keyof typeof Feather.glyphMap = type === 'Deposit' ? 'arrow-down-left' : type === 'Sell' ? 'arrow-up-right' : type === 'Marketplace' ? 'shopping-bag' : 'bar-chart-2';
  return (
    <View style={local.activityRow}>
      <View style={[local.activityIcon, { backgroundColor: type === 'Sell' || type === 'Deposit' ? colors.positiveSoft : colors.secondary }]}><Feather name={icon} size={16} color={type === 'Sell' || type === 'Deposit' ? colors.positive : colors.foreground} /></View>
      <View style={local.activityMain}><Text style={[local.assetSymbol, { color: colors.foreground }]} numberOfLines={1}>{title}</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>{detail}</Text></View>
      <Text style={[local.activityAmount, { color: amount >= 0 ? colors.positive : colors.foreground }]}>{amount >= 0 ? '+' : '−'}{money(amount)}</Text>
    </View>
  );
}

export function HomeScreen() {
  const colors = useColors();
  const { data, quotes, addFunds, storageAvailable } = useFintech();
  const watch = data.watchlist.map((symbol) => quotes.find((asset) => asset.symbol === symbol)).filter((asset): asset is Asset => !!asset).slice(0, 3);
  const portfolioValue = data.holdings.reduce((sum, item) => sum + item.quantity * (quotes.find((asset) => asset.symbol === item.symbol)?.price ?? item.averagePrice), 0);
  const invested = data.holdings.reduce((sum, item) => sum + item.quantity * item.averagePrice, 0);
  const pnl = portfolioValue - invested;
  return (
    <Page>
      <PageHeader title={`Good morning, ${data.userName.split(' ')[0]}`} subtitle="Your money, markets and orders at a glance" right={<IconButton icon="bell" label="Notifications" onPress={() => router.push('/notifications')} />} />
      {!storageAvailable ? <View style={[local.notice, { backgroundColor: colors.warningSoft }]}><Text style={{ color: colors.warning, fontFamily: 'Inter_500Medium', fontSize: 12 }}>Local saving is unavailable. Demo changes may reset when you close the app.</Text></View> : null}
      <Card tone="ink" style={{ padding: 21 }}>
        <View style={local.between}><Text style={local.darkCaption}>PORTFOLIO VALUE</Text><View style={local.liveLabel}><View style={[local.liveDot, { backgroundColor: colors.primary }]} /><Text style={local.darkCaption}>DEMO MARKET</Text></View></View>
        <Text style={local.heroBalance}>{money(portfolioValue, 0)}</Text>
        <View style={[local.between, { marginTop: 10, alignItems: 'flex-end' }]}>
          <View><Text style={local.darkCaption}>TODAY'S P&L</Text><Text style={[local.darkChange, { color: pnl >= 0 ? '#CDEFDF' : '#FAD3D6' }]}>{pnl >= 0 ? '+' : '−'}{money(Math.abs(pnl))} <Text style={local.darkPercent}>({pnl >= 0 ? '+' : '−'}2.41%)</Text></Text></View>
          <Feather name="trending-up" size={22} color={colors.primary} />
        </View>
        <View style={local.darkChart}><MiniChart values={chartPoints} color={colors.primary} height={70} /></View>
      </Card>
      <View style={local.quickActions}>
        <Pressable onPress={() => router.push('/(tabs)/markets')} style={local.quickAction}><View style={[local.quickIcon, { backgroundColor: colors.accent }]}><Feather name="bar-chart-2" size={18} color={colors.accentForeground} /></View><Text style={[local.quickLabel, { color: colors.foreground }]}>Markets</Text></Pressable>
        <Pressable onPress={() => Alert.alert('Add demo funds', 'Add ₹10,000 to your simulated cash balance?', [{ text: 'Not now', style: 'cancel' }, { text: 'Add ₹10,000', onPress: () => addFunds(10000) }])} style={local.quickAction}><View style={[local.quickIcon, { backgroundColor: colors.positiveSoft }]}><Feather name="plus" size={18} color={colors.positive} /></View><Text style={[local.quickLabel, { color: colors.foreground }]}>Add funds</Text></Pressable>
        <Pressable onPress={() => router.push('/marketplace')} style={local.quickAction}><View style={[local.quickIcon, { backgroundColor: colors.infoSoft }]}><Feather name="shopping-bag" size={18} color={colors.info} /></View><Text style={[local.quickLabel, { color: colors.foreground }]}>Marketplace</Text></Pressable>
        <Pressable onPress={() => router.push('/transactions')} style={local.quickAction}><View style={[local.quickIcon, { backgroundColor: colors.warningSoft }]}><Feather name="clock" size={18} color={colors.warning} /></View><Text style={[local.quickLabel, { color: colors.foreground }]}>Activity</Text></Pressable>
      </View>
      <View>
        <Heading title="Markets today" action="See all" onAction={() => router.push('/(tabs)/markets')} />
        <Card style={{ paddingVertical: 4 }}>
          {quotes.slice(0, 3).map((asset, index) => <React.Fragment key={asset.symbol}>{index ? <SectionDivider /> : null}<AssetRow asset={asset} onPress={() => router.push({ pathname: '/asset/[symbol]', params: { symbol: asset.symbol } })} /></React.Fragment>)}
        </Card>
      </View>
      <View>
        <Heading title="Your watchlist" action="Manage" onAction={() => router.push('/(tabs)/markets')} />
        {watch.length ? <Card style={{ paddingVertical: 4 }}>{watch.map((asset, index) => <React.Fragment key={asset.symbol}>{index ? <SectionDivider /> : null}<AssetRow asset={asset} onPress={() => router.push({ pathname: '/asset/[symbol]', params: { symbol: asset.symbol } })} /> </React.Fragment>)}</Card> : <Card><Text style={[local.bodyText, { color: colors.mutedForeground }]}>Add a few assets to your watchlist to keep them close.</Text><Button label="Explore markets" onPress={() => router.push('/(tabs)/markets')} /></Card>}
      </View>
      <View>
        <Heading title="Recent activity" action="View all" onAction={() => router.push('/transactions')} />
        <Card style={{ paddingVertical: 4 }}>{data.transactions.slice(0, 3).map((item, index) => <React.Fragment key={item.id}>{index ? <SectionDivider /> : null}<ActivityRow title={item.title} detail={item.createdAt} amount={item.amount} type={item.type} /></React.Fragment>)}</Card>
      </View>
      <View>
        <Heading title="Explore products" action="Browse" onAction={() => router.push('/marketplace')} />
        <Pressable onPress={() => router.push('/marketplace')}><Card tone="white" style={local.marketplacePromo}><View style={{ flex: 1, gap: 7 }}><Text style={[local.eyebrow, { color: colors.accentForeground }]}>CITRON MARKETPLACE</Text><Text style={[local.promoTitle, { color: colors.foreground }]}>Discover products from the community</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>Explore listings or publish one of your own.</Text></View><Feather name="arrow-up-right" size={20} color={colors.foreground} /></Card></Pressable>
      </View>
      <View style={local.disclaimer}><Feather name="info" size={14} color={colors.mutedForeground} /><Text style={[local.disclaimerText, { color: colors.mutedForeground }]}>Demo experience only. Prices and orders are simulated.</Text></View>
    </Page>
  );
}

export function MarketsScreen() {
  const colors = useColors();
  const { quotes } = useFintech();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Equity', 'Index', 'ETF', 'Gold'];
  const filtered = quotes.filter((asset) => (filter === 'All' || asset.category === filter) && `${asset.symbol} ${asset.name}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <Page>
      <PageHeader title="Markets" subtitle="NSE · Simulated market prices" />
      <View style={[local.searchBox, { backgroundColor: colors.secondary, borderColor: colors.input }]}><Feather name="search" size={17} color={colors.mutedForeground} /><TextInput accessibilityLabel="Search markets" testID="market-search" value={query} onChangeText={setQuery} placeholder="Search stocks, ETFs and indices" placeholderTextColor={colors.tertiaryText} style={[local.searchInput, { color: colors.foreground }]} /></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>{filters.map((item) => <Chip key={item} label={item} selected={filter === item} onPress={() => setFilter(item)} />)}</ScrollView>
      <View style={local.between}><Heading title="Popular assets" /><Text style={[local.assetName, { color: colors.mutedForeground }]}>PRICE · 1D CHANGE</Text></View>
      <Card style={{ paddingVertical: 4 }}>
        {filtered.map((asset, index) => <React.Fragment key={asset.symbol}>{index ? <SectionDivider /> : null}<AssetRow asset={asset} showWatch onPress={() => router.push({ pathname: '/asset/[symbol]', params: { symbol: asset.symbol } })} /></React.Fragment>)}
        {!filtered.length ? <View style={local.emptyState}><Feather name="search" size={23} color={colors.disabledText} /><Text style={[local.assetSymbol, { color: colors.foreground }]}>No matching assets</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>Try a different name or category.</Text></View> : null}
      </Card>
      <View style={[local.notice, { backgroundColor: colors.infoSoft }]}><Feather name="info" size={15} color={colors.info} /><Text style={[local.noticeText, { color: colors.info }]}>Demo prices update occasionally and are not live market data.</Text></View>
    </Page>
  );
}

export function PortfolioScreen() {
  const colors = useColors();
  const { data, quotes } = useFintech();
  const [view, setView] = useState<'Holdings' | 'Positions'>('Holdings');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'Value' | 'P&L'>('Value');
  const investments = data.holdings.map((holding) => {
    const asset = quotes.find((item) => item.symbol === holding.symbol);
    const price = asset?.price ?? holding.averagePrice;
    return { holding, asset, value: price * holding.quantity, pnl: (price - holding.averagePrice) * holding.quantity };
  });
  const total = investments.reduce((sum, item) => sum + item.value, 0);
  const invested = investments.reduce((sum, item) => sum + item.holding.quantity * item.holding.averagePrice, 0);
  const visible = investments.filter((item) => {
    const text = `${item.holding.symbol} ${item.asset?.name ?? ''}`.toLowerCase();
    return text.includes(query.toLowerCase());
  }).sort((a, b) => sort === 'Value' ? b.value - a.value : b.pnl - a.pnl);
  const openOrders = data.orders.filter((item) => item.status === 'Open');
  return (
    <Page>
      <PageHeader title="Portfolio" subtitle="Your holdings and positions" />
      <Card>
        <Text style={[local.assetName, { color: colors.mutedForeground }]}>TOTAL INVESTED VALUE</Text>
        <Text style={[local.balanceLarge, { color: colors.foreground }]}>{money(total)}</Text>
        <View style={[local.between, { marginTop: 10 }]}><Text style={[local.assetName, { color: colors.mutedForeground }]}>Invested {money(invested)}</Text><Delta value={total - invested} /></View>
        <View style={{ marginTop: 18 }}><MiniChart values={detailPoints} color={colors.ink} fill height={122} /></View>
        <View style={local.chartLabels}><Text style={[local.assetName, { color: colors.mutedForeground }]}>1D</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>1W</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>1M</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>1Y</Text></View>
      </Card>
      <View style={local.between}><View style={local.inline}><Chip label="Holdings" selected={view === 'Holdings'} onPress={() => setView('Holdings')} /><Chip label="Positions" selected={view === 'Positions'} onPress={() => setView('Positions')} /></View><Pressable onPress={() => setSort((value) => value === 'Value' ? 'P&L' : 'Value')}><Text style={[local.assetName, { color: colors.accentForeground }]}>Sort: {sort} ↕</Text></Pressable></View>
      {view === 'Holdings' ? <>
        <View style={[local.searchBox, { backgroundColor: colors.secondary, borderColor: colors.input }]}><Feather name="search" size={17} color={colors.mutedForeground} /><TextInput accessibilityLabel="Search holdings" value={query} onChangeText={setQuery} placeholder="Search your holdings" placeholderTextColor={colors.tertiaryText} style={[local.searchInput, { color: colors.foreground }]} /></View>
        <Card style={{ paddingVertical: 4 }}>{visible.map((item, index) => <React.Fragment key={item.holding.symbol}>{index ? <SectionDivider /> : null}<Pressable onPress={() => router.push({ pathname: '/asset/[symbol]', params: { symbol: item.holding.symbol } })} style={local.assetRow}><AssetMark symbol={item.holding.symbol} /><View style={local.assetMain}><Text style={[local.assetSymbol, { color: colors.foreground }]}>{item.holding.symbol}</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>{prettyNumber(item.holding.quantity)} shares · Avg. {money(item.holding.averagePrice)}</Text></View><View style={local.assetNumbers}><Text style={[local.assetPrice, { color: colors.foreground }]}>{money(item.value)}</Text><Text style={{ color: item.pnl >= 0 ? colors.positive : colors.negative, fontFamily: 'Inter_600SemiBold', fontSize: 11 }}>{item.pnl >= 0 ? '▲ +' : '▼ −'}{money(Math.abs(item.pnl))}</Text></View></Pressable></React.Fragment>)}{!visible.length ? <View style={local.emptyState}><Text style={[local.assetName, { color: colors.mutedForeground }]}>No holdings match that search.</Text></View> : null}</Card>
      </> : <Card style={{ paddingVertical: 4 }}>{openOrders.length ? openOrders.map((order, index) => <React.Fragment key={order.id}>{index ? <SectionDivider /> : null}<View style={local.assetRow}><AssetMark symbol={order.symbol} /><View style={local.assetMain}><Text style={[local.assetSymbol, { color: colors.foreground }]}>{order.symbol} · {order.side}</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>{order.quantity} shares · {order.orderType} order</Text></View><Text style={[local.assetPrice, { color: colors.warning }]}>{money(order.total)}</Text></View></React.Fragment>) : <View style={local.emptyState}><Feather name="layers" size={24} color={colors.disabledText} /><Text style={[local.assetSymbol, { color: colors.foreground }]}>No open positions</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>Limit orders will appear here.</Text></View>}</Card>}
      <View><Heading title="Allocation" /><Card style={{ gap: 14 }}>{investments.slice(0, 4).map((item) => <View key={item.holding.symbol}><View style={local.between}><Text style={[local.assetSymbol, { color: colors.foreground }]}>{item.holding.symbol}</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>{total ? Math.round(item.value / total * 100) : 0}%</Text></View><View style={[local.allocationTrack, { backgroundColor: colors.secondary }]}><View style={[local.allocationBar, { width: `${total ? Math.min(100, item.value / total * 100) : 0}%`, backgroundColor: colors.ink }]} /></View></View>)}</Card></View>
    </Page>
  );
}

export function OrdersScreen() {
  const colors = useColors();
  const { data, cancelOrder } = useFintech();
  const [filter, setFilter] = useState('Open');
  const visible = data.orders.filter((order) => order.status === filter);
  return (
    <Page>
      <PageHeader title="Orders" subtitle="Review your simulated activity" right={<IconButton icon="clock" label="Transaction history" onPress={() => router.push('/transactions')} />} />
      <View style={local.inline}>{['Open', 'Completed', 'Cancelled'].map((value) => <Chip key={value} label={value} selected={filter === value} onPress={() => setFilter(value)} />)}</View>
      {visible.length ? visible.map((order) => <Card key={order.id} style={{ gap: 13 }}>
        <View style={local.between}><View style={local.inline}><View style={[local.orderSide, { backgroundColor: order.side === 'Buy' ? colors.positiveSoft : colors.negativeSoft }]}><Text style={{ color: order.side === 'Buy' ? colors.positive : colors.negative, fontFamily: 'Inter_700Bold', fontSize: 11 }}>{order.side.toUpperCase()}</Text></View><Text style={[local.assetSymbol, { color: colors.foreground }]}>{order.symbol}</Text></View><Text style={[local.assetName, { color: order.status === 'Open' ? colors.warning : order.status === 'Completed' ? colors.positive : colors.mutedForeground }]}>{order.status}</Text></View>
        <Text style={[local.assetName, { color: colors.mutedForeground }]}>{order.name} · {order.orderType} · {order.createdAt}</Text>
        <View style={local.between}><View><Text style={[local.microLabel, { color: colors.mutedForeground }]}>QUANTITY</Text><Text style={[local.orderValue, { color: colors.foreground }]}>{prettyNumber(order.quantity)}</Text></View><View><Text style={[local.microLabel, { color: colors.mutedForeground }]}>PRICE</Text><Text style={[local.orderValue, { color: colors.foreground }]}>{money(order.price)}</Text></View><View><Text style={[local.microLabel, { color: colors.mutedForeground }]}>TOTAL</Text><Text style={[local.orderValue, { color: colors.foreground }]}>{money(order.total)}</Text></View></View>
        {order.status === 'Open' ? <Button label="Cancel order" kind="outline" onPress={() => Alert.alert('Cancel order?', `Cancel your ${order.side.toLowerCase()} order for ${order.symbol}?`, [{ text: 'Keep order', style: 'cancel' }, { text: 'Cancel order', style: 'destructive', onPress: () => cancelOrder(order.id) }])} /> : null}
      </Card>) : <Card style={local.emptyState}><Feather name="inbox" size={25} color={colors.disabledText} /><Text style={[local.assetSymbol, { color: colors.foreground }]}>No {filter.toLowerCase()} orders</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>Orders you place in the demo will appear here.</Text><Button label="Explore markets" onPress={() => router.push('/(tabs)/markets')} /></Card>}
      <View style={[local.notice, { backgroundColor: colors.infoSoft }]}><Feather name="info" size={15} color={colors.info} /><Text style={[local.noticeText, { color: colors.info }]}>All order activity is simulated. No trades are sent to an exchange.</Text></View>
    </Page>
  );
}

export function ProfileScreen() {
  const colors = useColors();
  const { data, signOut } = useFintech();
  const menu = [
    { title: 'My listings', detail: 'Manage products you publish', icon: 'tag' as const, path: '/my-listings' },
    { title: 'Transactions', detail: 'Buys, sells and account activity', icon: 'clock' as const, path: '/transactions' },
    { title: 'Appearance', detail: 'Light theme and accessible price colors', icon: 'eye' as const, path: '/settings' },
    { title: 'Notifications', detail: 'Updates on your account and market', icon: 'bell' as const, path: '/notifications' },
    { title: 'Help & support', detail: 'Frequently asked questions', icon: 'help-circle' as const, path: '/settings' },
  ];
  return (
    <Page>
      <PageHeader title="Profile" subtitle="Your account and preferences" />
      <Card style={local.profileCard}>
        <View style={[local.avatar, { backgroundColor: colors.accent }]}><Text style={[local.avatarText, { color: colors.accentForeground }]}>{data.userName.slice(0, 1).toUpperCase()}</Text></View>
        <View style={{ flex: 1, gap: 4 }}><Text style={[local.promoTitle, { color: colors.foreground }]}>{data.userName}</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>{data.signedIn ? data.userEmail : 'Demo account · Sign in to personalize'}</Text></View>
        <View style={[local.accountStatus, { backgroundColor: colors.positiveSoft }]}><Text style={{ color: colors.positive, fontFamily: 'Inter_600SemiBold', fontSize: 10 }}>{data.signedIn ? 'ACTIVE' : 'DEMO'}</Text></View>
      </Card>
      <Card style={{ paddingVertical: 4 }}>{menu.map((item, index) => <React.Fragment key={item.title}>{index ? <SectionDivider /> : null}<Pressable accessibilityRole="button" onPress={() => router.push(item.path)} style={local.menuRow}><View style={[local.menuIcon, { backgroundColor: colors.secondary }]}><Feather name={item.icon} size={17} color={colors.foreground} /></View><View style={local.assetMain}><Text style={[local.assetSymbol, { color: colors.foreground }]}>{item.title}</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>{item.detail}</Text></View><Feather name="chevron-right" size={17} color={colors.disabledText} /></Pressable></React.Fragment>)}</Card>
      <Card style={{ gap: 12 }}><Text style={[local.assetSymbol, { color: colors.foreground }]}>Account access</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>Demo-only sign-in. Your profile stays on this device.</Text>{data.signedIn ? <Button label="Sign out" kind="outline" icon="log-out" onPress={signOut} /> : <Button label="Sign in or create an account" onPress={() => router.push('/auth')} icon="arrow-right" />}</Card>
      <View style={local.disclaimer}><Feather name="shield" size={14} color={colors.mutedForeground} /><Text style={[local.disclaimerText, { color: colors.mutedForeground }]}>Citron Fintech is a client-demo prototype, not a brokerage.</Text></View>
    </Page>
  );
}

export function AssetDetailScreen() {
  const colors = useColors();
  const { symbol = '' } = useLocalSearchParams<{ symbol: string }>();
  const asset = useAsset(symbol);
  const { data, toggleWatchlist } = useFintech();
  const [range, setRange] = useState('1D');
  if (!asset) return <Page><TopBar title="Asset not found" back={() => router.back()} /><Card><Text style={{ color: colors.mutedForeground }}>This demo asset is unavailable.</Text><Button label="Back to markets" onPress={() => router.replace('/(tabs)/markets')} /></Card></Page>;
  const watched = data.watchlist.includes(asset.symbol);
  const directionColor = asset.changePercent >= 0 ? colors.positiveFill : colors.negativeFill;
  return (
    <Page>
      <TopBar title={asset.symbol} subtitle={`${asset.name} · ${asset.exchange}`} back={() => router.back()} right={<IconButton icon="star" label={watched ? 'Remove from watchlist' : 'Add to watchlist'} onPress={() => toggleWatchlist(asset.symbol)} />} />
      <View style={{ gap: 8 }}><Text style={[local.detailPrice, { color: colors.foreground }]}>{money(asset.price)}</Text><View style={local.inline}><PriceMove value={asset.changePercent} /><Text style={[local.assetName, { color: colors.mutedForeground }]}>today</Text></View></View>
      <Card style={{ padding: 10, gap: 13 }}><MiniChart values={detailPoints} color={directionColor} fill height={184} /><View style={local.chartLabels}>{['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((item) => <Pressable key={item} onPress={() => setRange(item)}><Text style={{ color: item === range ? colors.foreground : colors.mutedForeground, fontFamily: 'Inter_600SemiBold', fontSize: 11 }}>{item}</Text></Pressable>)}</View></Card>
      <View style={local.actionPair}><Button label="Buy" onPress={() => router.push({ pathname: '/trade', params: { symbol: asset.symbol, side: 'Buy' } })} style={{ flex: 1 }} /><Button label="Sell" kind="danger" onPress={() => router.push({ pathname: '/trade', params: { symbol: asset.symbol, side: 'Sell' } })} style={{ flex: 1 }} /></View>
      <View><Heading title="Market depth" /><Card style={{ gap: 12 }}>
        {[['SELL', '1,486.20', '240'], ['SELL', '1,485.90', '180'], ['SELL', '1,485.50', '320']].map((row) => <View key={row.join('-')} style={local.depthRow}><Text style={[local.assetName, { color: colors.negative }]}>{row[0]}</Text><Text style={[local.assetSymbol, { color: colors.foreground }]}>{`₹${row[1]}`}</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>{row[2]}</Text></View>)}
        <View style={[local.depthMid, { backgroundColor: colors.secondary }]}><Text style={[local.assetName, { color: colors.mutedForeground }]}>LAST TRADED</Text><Text style={[local.assetSymbol, { color: colors.foreground }]}>{money(asset.price)}</Text></View>
        {[['BUY', '1,484.50', '410'], ['BUY', '1,484.10', '290'], ['BUY', '1,483.80', '170']].map((row) => <View key={row.join('-')} style={local.depthRow}><Text style={[local.assetName, { color: colors.positive }]}>{row[0]}</Text><Text style={[local.assetSymbol, { color: colors.foreground }]}>{`₹${row[1]}`}</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>{row[2]}</Text></View>)}
      </Card></View>
      <Card style={local.notice}><Feather name="activity" size={15} color={colors.info} /><Text style={[local.noticeText, { color: colors.info }]}>Prices and market depth are simulated for demonstration only.</Text></Card>
    </Page>
  );
}

export function TradeScreen() {
  const colors = useColors();
  const params = useLocalSearchParams<{ symbol?: string; side?: string }>();
  const symbol = params.symbol ?? 'RELIANCE';
  const asset = useAsset(symbol);
  const side = params.side === 'Sell' ? 'Sell' : 'Buy';
  const { data, placeOrder } = useFintech();
  const holding = data.holdings.find((item) => item.symbol === symbol);
  const [quantity, setQuantity] = useState('1');
  const [orderType, setOrderType] = useState<'Market' | 'Limit'>('Market');
  const [limitPrice, setLimitPrice] = useState(asset?.price.toFixed(2) ?? '');
  const [review, setReview] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [orderId, setOrderId] = useState('');
  const qty = Number(quantity);
  const price = orderType === 'Market' ? (asset?.price ?? 0) : Number(limitPrice);
  const total = qty * price;
  const canContinue = !!asset && Number.isInteger(qty) && qty > 0 && price > 0 && (side === 'Buy' ? total <= data.balance : qty <= (holding?.quantity ?? 0));
  const submit = () => {
    if (!asset) return;
    try {
      const order = placeOrder({ symbol, side, quantity: qty, orderType, limitPrice: Number(limitPrice) });
      setOrderId(order.id);
      setSuccess(true);
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not place this demo order.');
    }
  };
  return (
    <Page scroll={false} contentStyle={{ flex: 1 }}>
      <TopBar title={success ? 'Order placed' : review ? 'Review order' : `${side} ${symbol}`} subtitle={asset?.name} back={() => router.back()} />
      <KeyboardAwareScrollViewCompat contentContainerStyle={{ gap: 18, paddingBottom: Platform.OS === 'web' ? 40 : 28 }} keyboardShouldPersistTaps="handled" bottomOffset={30}>
        {success ? <Card style={[local.successCard, { backgroundColor: colors.positiveSoft }]}><View style={[local.successCheck, { backgroundColor: colors.positive }]}><Feather name="check" size={22} color={colors.inverse} /></View><Text style={[local.promoTitle, { color: colors.positive }]}>Order placed successfully</Text><Text style={[local.assetName, { color: colors.foreground }]}>{orderType === 'Market' ? 'Your simulated order is complete.' : 'Your limit order is open.'} No trade was sent to an exchange.</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>Order ID · {orderId}</Text><Button label="View orders" onPress={() => router.replace('/(tabs)/orders')} /></Card> : !review ? <>
          <View style={[local.orderSideBanner, { backgroundColor: side === 'Buy' ? colors.positiveSoft : colors.negativeSoft }]}><Text style={{ fontFamily: 'Inter_600SemiBold', color: side === 'Buy' ? colors.positive : colors.negative }}>{side.toUpperCase()} ORDER</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>{side === 'Buy' ? 'Available balance' : 'Available to sell'} · {side === 'Buy' ? money(data.balance) : `${prettyNumber(holding?.quantity ?? 0)} shares`}</Text></View>
          <Field label="Quantity" value={quantity} onChangeText={setQuantity} keyboardType="number-pad" placeholder="Number of shares" testID="trade-quantity" />
          <View><Text style={[local.fieldHeading, { color: colors.foreground }]}>Order type</Text><View style={local.inline}><Chip label="Market" selected={orderType === 'Market'} onPress={() => setOrderType('Market')} /><Chip label="Limit" selected={orderType === 'Limit'} onPress={() => setOrderType('Limit')} /></View></View>
          {orderType === 'Limit' ? <Field label="Limit price" value={limitPrice} onChangeText={setLimitPrice} keyboardType="decimal-pad" placeholder="Enter price" /> : <Card style={local.between}><Text style={[local.assetName, { color: colors.mutedForeground }]}>Market price</Text><Text style={[local.assetSymbol, { color: colors.foreground }]}>{money(asset?.price ?? 0)}</Text></Card>}
          <Card style={{ gap: 13 }}><View style={local.between}><Text style={[local.assetName, { color: colors.mutedForeground }]}>Estimated total</Text><Text style={[local.assetSymbol, { color: colors.foreground }]}>{money(total)}</Text></View><View style={local.between}><Text style={[local.assetName, { color: colors.mutedForeground }]}>Estimated fees</Text><Text style={[local.assetName, { color: colors.foreground }]}>₹0.00 · Demo</Text></View><Text style={[local.assetName, { color: colors.mutedForeground }]}>Final value may vary for a market order.</Text></Card>
          {error ? <Text style={{ color: colors.negative, fontFamily: 'Inter_500Medium' }}>{error}</Text> : null}
          <Button testID="trade-continue" disabled={!canContinue} label={`Review ${side.toLowerCase()} order`} onPress={() => { setError(''); setReview(true); }} />
        </> : <>
          <Card style={{ gap: 14 }}><Text style={[local.promoTitle, { color: colors.foreground }]}>{asset?.name}</Text><View style={local.between}><Text style={[local.assetName, { color: colors.mutedForeground }]}>Side</Text><Text style={{ color: side === 'Buy' ? colors.positive : colors.negative, fontFamily: 'Inter_700Bold' }}>{side}</Text></View><View style={local.between}><Text style={[local.assetName, { color: colors.mutedForeground }]}>Order type</Text><Text style={[local.assetSymbol, { color: colors.foreground }]}>{orderType}</Text></View><View style={local.between}><Text style={[local.assetName, { color: colors.mutedForeground }]}>Quantity</Text><Text style={[local.assetSymbol, { color: colors.foreground }]}>{qty} shares</Text></View><View style={local.between}><Text style={[local.assetName, { color: colors.mutedForeground }]}>Price</Text><Text style={[local.assetSymbol, { color: colors.foreground }]}>{money(price)}</Text></View><SectionDivider /><View style={local.between}><Text style={[local.assetSymbol, { color: colors.foreground }]}>Estimated total</Text><Text style={[local.balanceMedium, { color: colors.foreground }]}>{money(total)}</Text></View></Card>
          {error ? <Text style={{ color: colors.negative }}>{error}</Text> : null}
          <Button label={`Confirm ${side.toLowerCase()} order`} kind={side === 'Buy' ? 'primary' : 'danger'} onPress={submit} />
          <Button label="Back to order" kind="outline" onPress={() => setReview(false)} />
          <Text style={[local.assetName, { color: colors.mutedForeground, textAlign: 'center' }]}>This is a simulation. No real transaction will take place.</Text>
        </>}
      </KeyboardAwareScrollViewCompat>
    </Page>
  );
}

export function MarketplaceScreen() {
  const colors = useColors();
  const { data } = useFintech();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const products = [...data.listings, ...MARKETPLACE_PRODUCTS].filter((item) => item.status === 'Active');
  const categories = ['All', ...Array.from(new Set(products.map((item) => item.category)))];
  const visible = products.filter((item) => (category === 'All' || item.category === category) && `${item.name} ${item.category} ${item.seller}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <Page>
      <TopBar title="Marketplace" subtitle="Explore products from the community" back={() => router.back()} right={<IconButton icon="tag" label="My listings" onPress={() => router.push('/my-listings')} />} />
      <View style={[local.searchBox, { backgroundColor: colors.secondary, borderColor: colors.input }]}><Feather name="search" size={17} color={colors.mutedForeground} /><TextInput accessibilityLabel="Search marketplace" testID="marketplace-search" value={query} onChangeText={setQuery} placeholder="Search products and sellers" placeholderTextColor={colors.tertiaryText} style={[local.searchInput, { color: colors.foreground }]} /></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>{categories.map((item) => <Chip key={item} label={item} selected={category === item} onPress={() => setCategory(item)} />)}</ScrollView>
      <View style={local.between}><Heading title="Available products" /><Text style={[local.assetName, { color: colors.mutedForeground }]}>{visible.length} listings</Text></View>
      {visible.length ? visible.map((product) => <ProductCard key={product.id} product={product} />) : <Card style={local.emptyState}><Feather name="shopping-bag" size={24} color={colors.disabledText} /><Text style={[local.assetSymbol, { color: colors.foreground }]}>Nothing found</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>Adjust your search or list a product of your own.</Text></Card>}
      <Button label="List a product" icon="plus" onPress={() => router.push('/list-product')} />
      <View style={[local.notice, { backgroundColor: colors.warningSoft }]}><Feather name="info" size={15} color={colors.warning} /><Text style={[local.noticeText, { color: colors.warning }]}>Marketplace products are demo listings, not investment recommendations.</Text></View>
    </Page>
  );
}

function ProductCard({ product }: { product: ProductListing }) {
  const colors = useColors();
  return (
    <Pressable accessibilityRole="button" onPress={() => router.push({ pathname: '/marketplace/[id]', params: { id: product.id } })}>
      <Card tone="white" style={local.productCard}>
        <View style={[local.productGlyph, { backgroundColor: colors.accent }]}><Feather name={product.category === 'Gold' ? 'award' : product.category === 'Bonds' ? 'file-text' : 'layers'} size={21} color={colors.accentForeground} /></View>
        <View style={local.productDetails}><View style={local.between}><Text style={[local.categoryTag, { color: colors.accentForeground }]}>{product.category.toUpperCase()}</Text><View style={local.rating}><Feather name="star" size={12} color={colors.warning} /><Text style={[local.ratingText, { color: colors.foreground }]}>{product.sellerRating.toFixed(1)}</Text></View></View><Text style={[local.productName, { color: colors.foreground }]} numberOfLines={2}>{product.name}</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>By {product.seller} · {product.location.split(',')[0]}</Text><View style={[local.between, { marginTop: 10 }]}><Text style={[local.productPrice, { color: colors.foreground }]}>{money(product.price)}</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>{product.quantity} available</Text></View></View>
      </Card>
    </Pressable>
  );
}

export function ProductDetailScreen() {
  const colors = useColors();
  const { id = '' } = useLocalSearchParams<{ id: string }>();
  const { data, buyProduct, availableQuantity } = useFintech();
  const product = [...data.listings, ...MARKETPLACE_PRODUCTS].find((item) => item.id === id);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  if (!product) return <Page><TopBar title="Listing not found" back={() => router.back()} /><Card><Text style={{ color: colors.mutedForeground }}>This listing is no longer available.</Text><Button label="Back to marketplace" onPress={() => router.replace('/marketplace')} /></Card></Page>;
  return (
    <Page>
      <TopBar title="Product details" subtitle="Community marketplace" back={() => router.back()} />
      <View style={[local.productHero, { backgroundColor: colors.secondary }]}><Feather name={product.category === 'Gold' ? 'award' : 'layers'} size={48} color={colors.accentForeground} /><Text style={[local.categoryTag, { color: colors.mutedForeground }]}>{product.category.toUpperCase()}</Text></View>
      <View style={{ gap: 9 }}><Text style={[local.detailPrice, { color: colors.foreground }]}>{money(product.price)}</Text><Text style={[local.promoTitle, { color: colors.foreground }]}>{product.name}</Text><View style={local.inline}><Feather name="star" size={14} color={colors.warning} /><Text style={[local.assetName, { color: colors.foreground }]}>{product.sellerRating.toFixed(1)} · {product.seller}</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>· {product.location}</Text></View></View>
      <Card><Text style={[local.assetSymbol, { color: colors.foreground, marginBottom: 7 }]}>About this product</Text><Text style={[local.bodyText, { color: colors.mutedForeground }]}>{product.description}</Text></Card>
      <View style={local.between}><Text style={[local.assetName, { color: colors.mutedForeground }]}>Available quantity</Text><Text style={[local.assetSymbol, { color: colors.foreground }]}>{availableQuantity(product)} units</Text></View>
      {success ? <Card style={[local.successCard, { backgroundColor: colors.positiveSoft }]}><Feather name="check-circle" size={22} color={colors.positive} /><Text style={[local.assetSymbol, { color: colors.positive }]}>Purchase completed</Text><Text style={[local.assetName, { color: colors.foreground }]}>A simulated marketplace transaction was added to your activity.</Text><Button label="View transactions" onPress={() => router.push('/transactions')} /></Card> : <>
        {error ? <Text style={{ color: colors.negative }}>{error}</Text> : null}
        <Button testID="marketplace-buy" label={`Buy for ${money(product.price)}`} icon="shopping-bag" disabled={availableQuantity(product) < 1 || product.mine} onPress={() => { try { buyProduct(product); setSuccess(true); setError(''); } catch (e) { setError(e instanceof Error ? e.message : 'This purchase could not be completed.'); } }} />
        {product.mine ? <Text style={[local.assetName, { color: colors.mutedForeground, textAlign: 'center' }]}>This is your listing.</Text> : null}
      </>}
      <Text style={[local.assetName, { color: colors.mutedForeground }]}>All purchases in this prototype are simulated.</Text>
    </Page>
  );
}

export function ListingFormScreen() {
  const colors = useColors();
  const params = useLocalSearchParams<{ id?: string }>();
  const { data, createListing, updateListing } = useFintech();
  const existing = params.id ? data.listings.find((item) => item.id === params.id) : undefined;
  const [name, setName] = useState(existing?.name ?? '');
  const [category, setCategory] = useState(existing?.category ?? 'ETF');
  const [description, setDescription] = useState(existing?.description ?? '');
  const [price, setPrice] = useState(existing?.price.toString() ?? '');
  const [quantity, setQuantity] = useState(existing?.quantity.toString() ?? '');
  const [location, setLocation] = useState(existing?.location ?? '');
  const [error, setError] = useState('');
  const publish = (status: ListingStatus) => {
    const parsedPrice = Number(price);
    const parsedQuantity = Number(quantity);
    if (!name.trim() || !description.trim() || !location.trim() || parsedPrice <= 0 || !Number.isInteger(parsedQuantity) || parsedQuantity <= 0) {
      setError('Add a name, description, location, valid price and whole-number quantity.');
      return;
    }
    const listing = { id: existing?.id, name: name.trim(), category, description: description.trim(), price: parsedPrice, quantity: parsedQuantity, location: location.trim(), status };
    if (existing) updateListing({ ...listing, id: existing.id });
    else createListing(listing);
    setError('');
    router.replace('/my-listings');
  };
  return (
    <Page scroll={false} contentStyle={{ flex: 1 }}>
      <TopBar title={existing ? 'Edit listing' : 'List a product'} subtitle="Reach buyers in the community" back={() => router.back()} />
      <KeyboardAwareScrollViewCompat contentContainerStyle={{ gap: 16, paddingBottom: 36 }} keyboardShouldPersistTaps="handled" bottomOffset={40}>
        <Pressable accessibilityRole="button" onPress={() => Alert.alert('Product image', 'Image upload is represented by a placeholder in this demo.') } style={[local.imageUpload, { backgroundColor: colors.secondary, borderColor: colors.borderStrong }]}><Feather name="camera" size={19} color={colors.mutedForeground} /><Text style={[local.assetSymbol, { color: colors.foreground }]}>Add product image</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>Optional · image upload placeholder</Text></Pressable>
        <Field label="Product name" value={name} onChangeText={setName} placeholder="e.g. Nifty 50 ETF units" testID="listing-name" />
        <View><Text style={[local.fieldHeading, { color: colors.foreground }]}>Category</Text><View style={local.wrapRow}>{['ETF', 'Gold', 'Bonds', 'Basket', 'Other'].map((item) => <Chip key={item} label={item} selected={category === item} onPress={() => setCategory(item)} />)}</View></View>
        <Field label="Description" value={description} onChangeText={setDescription} placeholder="Share useful details with buyers" multiline />
        <View style={local.formPair}><View style={{ flex: 1 }}><Field label="Price (₹)" value={price} onChangeText={setPrice} placeholder="0.00" keyboardType="decimal-pad" testID="listing-price" /></View><View style={{ flex: 1 }}><Field label="Quantity" value={quantity} onChangeText={setQuantity} placeholder="0" keyboardType="number-pad" testID="listing-quantity" /></View></View>
        <Field label="Location" value={location} onChangeText={setLocation} placeholder="City, state" />
        {error ? <Text style={{ color: colors.negative, fontFamily: 'Inter_500Medium' }}>{error}</Text> : null}
        <Card style={{ gap: 7 }}><Text style={[local.assetSymbol, { color: colors.foreground }]}>Preview</Text><Text style={[local.promoTitle, { color: colors.foreground }]}>{name || 'Your product name'}</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>{category} · {location || 'Location'}</Text><Text style={[local.assetSymbol, { color: colors.foreground }]}>{price ? money(Number(price) || 0) : 'Set a price'}</Text></Card>
        <Button testID="listing-publish" label={existing ? 'Save changes' : 'Publish listing'} onPress={() => publish('Active')} />
        {!existing ? <Button label="Save as draft" kind="outline" onPress={() => publish('Draft')} /> : null}
      </KeyboardAwareScrollViewCompat>
    </Page>
  );
}

export function MyListingsScreen() {
  const colors = useColors();
  const { data, updateListingStatus, deleteListing } = useFintech();
  const [filter, setFilter] = useState<ListingStatus>('Active');
  const filters: ListingStatus[] = ['Active', 'Paused', 'Sold', 'Draft'];
  const visible = data.listings.filter((item) => item.status === filter);
  const remove = (item: ProductListing) => Alert.alert('Delete listing?', `Remove “${item.name}” from your listings?`, [{ text: 'Keep', style: 'cancel' }, { text: 'Delete', style: 'destructive', onPress: () => deleteListing(item.id) }]);
  return (
    <Page>
      <TopBar title="My listings" subtitle="Products you share with the community" back={() => router.back()} right={<IconButton icon="plus" label="Create listing" onPress={() => router.push('/list-product')} />} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>{filters.map((item) => <Chip key={item} label={item} selected={filter === item} onPress={() => setFilter(item)} />)}</ScrollView>
      {visible.length ? visible.map((item) => <Card key={item.id} style={{ gap: 13 }}>
        <View style={local.between}><View style={{ flex: 1, gap: 5 }}><Text style={[local.productName, { color: colors.foreground }]}>{item.name}</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>{item.category} · {item.quantity} available</Text></View><View style={[local.categoryTagBox, { backgroundColor: item.status === 'Active' ? colors.positiveSoft : colors.secondary }]}><Text style={{ color: item.status === 'Active' ? colors.positive : colors.mutedForeground, fontFamily: 'Inter_600SemiBold', fontSize: 10 }}>{item.status.toUpperCase()}</Text></View></View>
        <View style={local.between}><Text style={[local.productPrice, { color: colors.foreground }]}>{money(item.price)}</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>{item.views} views · {item.ordersCount} orders</Text></View>
        <View style={local.actionPair}><Button label="Edit" kind="outline" icon="edit-2" onPress={() => router.push({ pathname: '/list-product', params: { id: item.id } })} style={{ flex: 1 }} /><Button label={item.status === 'Active' ? 'Pause' : 'Activate'} kind="quiet" onPress={() => updateListingStatus(item.id, item.status === 'Active' ? 'Paused' : 'Active')} style={{ flex: 1 }} /><IconButton icon="trash-2" label="Delete listing" onPress={() => remove(item)} /></View>
      </Card>) : <Card style={local.emptyState}><Feather name="tag" size={24} color={colors.disabledText} /><Text style={[local.assetSymbol, { color: colors.foreground }]}>No {filter.toLowerCase()} listings</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>Publish a product to see it here.</Text><Button label="List your first product" onPress={() => router.push('/list-product')} icon="plus" /></Card>}
    </Page>
  );
}

export function TransactionsScreen() {
  const colors = useColors();
  const { data } = useFintech();
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Buy', 'Sell', 'Deposit', 'Withdrawal', 'Marketplace'];
  const visible = data.transactions.filter((item) => filter === 'All' || item.type === filter);
  return (
    <Page>
      <TopBar title="Transactions" subtitle="Account activity · Demo data" back={() => router.back()} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>{filters.map((item) => <Chip key={item} label={item} selected={filter === item} onPress={() => setFilter(item)} />)}</ScrollView>
      {visible.length ? <Card style={{ paddingVertical: 4 }}>{visible.map((item, index) => <React.Fragment key={item.id}>{index ? <SectionDivider /> : null}<View style={local.activityRow}><View style={[local.activityIcon, { backgroundColor: item.amount >= 0 ? colors.positiveSoft : colors.secondary }]}><Feather name={item.type === 'Deposit' ? 'arrow-down-left' : item.type === 'Marketplace' ? 'shopping-bag' : 'repeat'} size={16} color={item.amount >= 0 ? colors.positive : colors.foreground} /></View><View style={local.activityMain}><Text style={[local.assetSymbol, { color: colors.foreground }]} numberOfLines={1}>{item.title}</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>{item.detail} · {item.createdAt}</Text></View><Text style={[local.activityAmount, { color: item.amount >= 0 ? colors.positive : colors.foreground }]}>{item.amount >= 0 ? '+' : '−'}{money(item.amount)}</Text></View></React.Fragment>)}</Card> : <Card style={local.emptyState}><Feather name="clock" size={24} color={colors.disabledText} /><Text style={[local.assetSymbol, { color: colors.foreground }]}>No {filter.toLowerCase()} activity</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>Completed actions will appear here.</Text></Card>}
    </Page>
  );
}

export function NotificationsScreen() {
  const colors = useColors();
  const { data } = useFintech();
  const notices: [string, string, keyof typeof Feather.glyphMap][] = [
    ['Trending in your watchlist', 'RELIANCE is up 1.84% today.', 'trending-up' as const],
    ['Order update', 'Your limit order for INFY is open.', 'clock' as const],
    ['Marketplace picks', 'New community listings are ready to explore.', 'shopping-bag' as const],
  ];
  return (
    <Page>
      <TopBar title="Notifications" subtitle={data.notificationsEnabled ? 'You are receiving demo updates' : 'Notifications are turned off'} back={() => router.back()} right={<IconButton icon="settings" label="Notification settings" onPress={() => router.push('/settings')} />} />
      {notices.map(([title, detail, icon], index) => <Card key={title} style={local.notificationCard}><View style={[local.activityIcon, { backgroundColor: index === 0 ? colors.positiveSoft : colors.secondary }]}><Feather name={icon} size={17} color={index === 0 ? colors.positive : colors.foreground} /></View><View style={{ flex: 1, gap: 5 }}><View style={local.between}><Text style={[local.assetSymbol, { color: colors.foreground }]}>{title}</Text><View style={[local.liveDot, { backgroundColor: index === 0 ? colors.infoFill : colors.borderStrong }]} /></View><Text style={[local.assetName, { color: colors.mutedForeground }]}>{detail}</Text><Text style={[local.assetName, { color: colors.tertiaryText }]}>{index === 0 ? 'Just now' : `${index + 1}h ago`}</Text></View></Card>)}
      <View style={[local.notice, { backgroundColor: colors.infoSoft }]}><Feather name="info" size={15} color={colors.info} /><Text style={[local.noticeText, { color: colors.info }]}>These notifications are local examples. No push messages are sent.</Text></View>
    </Page>
  );
}

export function SettingsScreen() {
  const colors = useColors();
  const { data, setPriceMode, setNotificationsEnabled, signOut } = useFintech();
  const choices = [
    { id: 'default' as const, title: 'Default', detail: 'Green up · red down' },
    { id: 'safe' as const, title: 'Color-vision safe', detail: 'Blue up · vermilion down' },
    { id: 'reversed' as const, title: 'Reversed', detail: 'Red up · green down' },
  ];
  return (
    <Page>
      <TopBar title="Appearance & settings" subtitle="Make Citron work for you" back={() => router.back()} />
      <Card style={{ gap: 13 }}><View><Text style={[local.promoTitle, { color: colors.foreground }]}>Price colors</Text><Text style={[local.assetName, { color: colors.mutedForeground, marginTop: 4 }]}>Every change also uses a sign and direction marker.</Text></View>{choices.map((item) => <Pressable key={item.id} accessibilityRole="radio" accessibilityState={{ selected: data.priceMode === item.id }} onPress={() => setPriceMode(item.id)} style={[local.choiceRow, { borderColor: data.priceMode === item.id ? colors.ink : colors.border, backgroundColor: data.priceMode === item.id ? colors.accent : colors.background }]}><View style={{ flex: 1, gap: 4 }}><Text style={[local.assetSymbol, { color: colors.foreground }]}>{item.title}</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>{item.detail}</Text></View><PriceMove value={1.27} mode={item.id} compact /><View style={[local.radio, { borderColor: data.priceMode === item.id ? colors.ink : colors.input }]}>{data.priceMode === item.id ? <View style={[local.radioDot, { backgroundColor: colors.ink }]} /> : null}</View></Pressable>)}</Card>
      <Card style={local.settingRow}><View style={{ flex: 1, gap: 4 }}><Text style={[local.assetSymbol, { color: colors.foreground }]}>Demo notifications</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>Control in-app sample updates</Text></View><Switch accessibilityLabel="Demo notifications" value={data.notificationsEnabled} onValueChange={setNotificationsEnabled} trackColor={{ false: colors.borderStrong, true: colors.positive }} thumbColor={colors.background} /></Card>
      <Card style={local.settingRow}><View style={{ gap: 4 }}><Text style={[local.assetSymbol, { color: colors.foreground }]}>Theme</Text><Text style={[local.assetName, { color: colors.mutedForeground }]}>Citron Light · always on</Text></View><Feather name="sun" size={18} color={colors.warning} /></Card>
      <Card style={{ gap: 12 }}><Text style={[local.assetSymbol, { color: colors.foreground }]}>Account</Text><Button label={data.signedIn ? 'Sign out' : 'Sign in or create an account'} icon={data.signedIn ? 'log-out' : 'user'} kind="outline" onPress={() => data.signedIn ? signOut() : router.push('/auth')} /></Card>
      <Text style={[local.assetName, { color: colors.mutedForeground, textAlign: 'center' }]}>Prototype only · No real trades, money movement or market feeds.</Text>
    </Page>
  );
}

export function AuthScreen() {
  const colors = useColors();
  const { signIn } = useFintech();
  const [mode, setMode] = useState<'login' | 'signup' | 'otp'>('login');
  const [email, setEmail] = useState('demo@citron.app');
  const [password, setPassword] = useState('Demo@123');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const finish = () => { signIn(email); router.replace('/(tabs)'); };
  const submit = () => {
    setError('');
    if (!email.includes('@')) { setError('Enter a valid email address.'); return; }
    if (mode === 'otp') {
      if (otp !== '123456') { setError('Use the demo verification code 123456.'); return; }
      finish(); return;
    }
    if (password.length < 6) { setError('Use at least 6 characters for this demo password.'); return; }
    if (mode === 'signup') { setMode('otp'); return; }
    finish();
  };
  return (
    <Page scroll={false} contentStyle={{ flex: 1 }}>
      <TopBar title={mode === 'signup' ? 'Create account' : mode === 'otp' ? 'Verify email' : 'Welcome back'} subtitle="Your simulated Citron account" back={() => mode === 'otp' ? setMode('signup') : router.back()} />
      <KeyboardAwareScrollViewCompat contentContainerStyle={{ gap: 18, paddingBottom: 36 }} keyboardShouldPersistTaps="handled" bottomOffset={36}>
        <Card tone="ink" style={{ gap: 10 }}><Text style={local.darkCaption}>CITRON FINTECH · DEMO</Text><Text style={local.authTitle}>Invest with clarity.</Text><Text style={local.authCopy}>Explore the product with a local demo account. No personal data is sent to a service.</Text></Card>
        {mode !== 'otp' ? <>
          <Field label="Email address" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholder="you@example.com" testID="auth-email" />
          <Field label="Password" value={password} onChangeText={setPassword} secureTextEntry placeholder="Enter password" testID="auth-password" />
          <Text style={[local.assetName, { color: colors.mutedForeground }]}>Demo account · demo@citron.app · Demo@123</Text>
        </> : <>
          <Text style={[local.bodyText, { color: colors.mutedForeground }]}>Enter the demo verification code sent to {email}.</Text>
          <Field label="Verification code" value={otp} onChangeText={setOtp} keyboardType="number-pad" placeholder="123456" testID="auth-otp" />
          <Text style={[local.assetName, { color: colors.mutedForeground }]}>Use 123456 to complete this simulated step.</Text>
        </>}
        {error ? <Text style={{ color: colors.negative, fontFamily: 'Inter_500Medium' }}>{error}</Text> : null}
        <Button testID="auth-submit" label={mode === 'signup' ? 'Continue to verification' : mode === 'otp' ? 'Verify and continue' : 'Sign in'} onPress={submit} />
        {mode !== 'otp' ? <Pressable onPress={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }} accessibilityRole="button"><Text style={{ color: colors.accentForeground, fontFamily: 'Inter_600SemiBold', textAlign: 'center' }}>{mode === 'login' ? 'New to Citron? Create an account' : 'Already have an account? Sign in'}</Text></Pressable> : null}
        <Button label="Continue as demo user" kind="outline" onPress={() => { setEmail('demo@citron.app'); finish(); }} />
        <Text style={[local.assetName, { color: colors.mutedForeground, textAlign: 'center' }]}>Authentication is simulated and stored only on this device.</Text>
      </KeyboardAwareScrollViewCompat>
    </Page>
  );
}

const local = StyleSheet.create({
  between: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  inline: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  wrapRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 9 },
  actionPair: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  mark: { width: 40, height: 40, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  markText: { fontFamily: 'Inter_700Bold', fontSize: 12 },
  assetRow: { minHeight: 66, flexDirection: 'row', alignItems: 'center', gap: 11, paddingHorizontal: 12, paddingVertical: 9 },
  assetMain: { flex: 1, gap: 4 },
  assetNumbers: { minWidth: 84, alignItems: 'flex-end', gap: 5 },
  assetSymbol: { fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  assetName: { fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 16 },
  assetPrice: { fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  watchTap: { padding: 7 },
  heroBalance: { color: '#FFFFFF', fontFamily: 'Inter_700Bold', fontSize: 31, letterSpacing: -0.8, marginTop: 8 },
  darkCaption: { color: '#E1E4E9', fontFamily: 'Inter_600SemiBold', fontSize: 9, letterSpacing: 1 },
  darkChange: { fontFamily: 'Inter_700Bold', fontSize: 16, marginTop: 4 },
  darkPercent: { color: '#FFFFFF', fontFamily: 'Inter_400Regular', fontSize: 11 },
  liveLabel: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  liveDot: { width: 7, height: 7, borderRadius: 4 },
  darkChart: { marginTop: 10, marginHorizontal: -8 },
  quickActions: { flexDirection: 'row', justifyContent: 'space-between', gap: 6 },
  quickAction: { alignItems: 'center', gap: 7, minWidth: 68 },
  quickIcon: { width: 46, height: 46, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  quickLabel: { fontFamily: 'Inter_500Medium', fontSize: 10 },
  bodyText: { fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 20 },
  notice: { flexDirection: 'row', alignItems: 'center', gap: 9, padding: 12, borderRadius: 14 },
  noticeText: { flex: 1, fontFamily: 'Inter_500Medium', fontSize: 11, lineHeight: 16 },
  marketplacePromo: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  eyebrow: { fontFamily: 'Inter_700Bold', fontSize: 9, letterSpacing: 1.1 },
  promoTitle: { fontFamily: 'Inter_700Bold', fontSize: 16, letterSpacing: -0.25 },
  disclaimer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 7 },
  disclaimerText: { fontFamily: 'Inter_400Regular', fontSize: 10, textAlign: 'center' },
  searchBox: { minHeight: 49, borderWidth: 1, borderRadius: 14, paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', gap: 10 },
  searchInput: { flex: 1, minHeight: 47, fontFamily: 'Inter_400Regular', fontSize: 13 },
  emptyState: { alignItems: 'center', justifyContent: 'center', gap: 10, padding: 22 },
  balanceLarge: { fontFamily: 'Inter_700Bold', fontSize: 29, letterSpacing: -0.7, marginTop: 8 },
  balanceMedium: { fontFamily: 'Inter_700Bold', fontSize: 17 },
  chartLabels: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, paddingTop: 4 },
  allocationTrack: { height: 6, borderRadius: 6, overflow: 'hidden', marginTop: 8 },
  allocationBar: { height: 6, borderRadius: 6 },
  orderSide: { minWidth: 44, alignItems: 'center', paddingHorizontal: 7, paddingVertical: 5, borderRadius: 8 },
  microLabel: { fontFamily: 'Inter_600SemiBold', fontSize: 9, letterSpacing: 0.5, marginBottom: 4 },
  orderValue: { fontFamily: 'Inter_600SemiBold', fontSize: 12 },
  profileCard: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar: { width: 52, height: 52, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: 'Inter_700Bold', fontSize: 20 },
  accountStatus: { borderRadius: 99, paddingHorizontal: 9, paddingVertical: 6 },
  menuRow: { minHeight: 70, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 10, paddingVertical: 9 },
  menuIcon: { width: 37, height: 37, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  detailPrice: { fontFamily: 'Inter_700Bold', fontSize: 31, letterSpacing: -0.7 },
  depthRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  depthMid: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderRadius: 10 },
  orderSideBanner: { borderRadius: 16, padding: 15, gap: 6 },
  fieldHeading: { fontFamily: 'Inter_600SemiBold', fontSize: 13, marginBottom: 9 },
  successCard: { alignItems: 'center', padding: 22, gap: 13 },
  successCheck: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  productCard: { flexDirection: 'row', gap: 14, padding: 14 },
  productGlyph: { width: 54, height: 54, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  productDetails: { flex: 1, gap: 7 },
  categoryTag: { fontFamily: 'Inter_700Bold', fontSize: 9, letterSpacing: 0.7 },
  categoryTagBox: { borderRadius: 99, paddingHorizontal: 9, paddingVertical: 6 },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontFamily: 'Inter_600SemiBold', fontSize: 11 },
  productName: { fontFamily: 'Inter_600SemiBold', fontSize: 14, lineHeight: 20 },
  productPrice: { fontFamily: 'Inter_700Bold', fontSize: 17 },
  productHero: { height: 180, borderRadius: 24, alignItems: 'center', justifyContent: 'center', gap: 12 },
  imageUpload: { minHeight: 110, borderRadius: 16, borderWidth: 1, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', gap: 7 },
  formPair: { flexDirection: 'row', gap: 12 },
  activityRow: { minHeight: 64, flexDirection: 'row', alignItems: 'center', gap: 11, paddingHorizontal: 12, paddingVertical: 8 },
  activityIcon: { width: 36, height: 36, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  activityMain: { flex: 1, gap: 4 },
  activityAmount: { fontFamily: 'Inter_600SemiBold', fontSize: 12 },
  notificationCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  choiceRow: { minHeight: 64, borderWidth: 1, borderRadius: 15, flexDirection: 'row', alignItems: 'center', padding: 12, gap: 12 },
  radio: { width: 19, height: 19, borderRadius: 10, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  radioDot: { width: 9, height: 9, borderRadius: 5 },
  settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 14 },
  authTitle: { color: '#FFFFFF', fontFamily: 'Inter_700Bold', fontSize: 24, letterSpacing: -0.5 },
  authCopy: { color: '#E1E4E9', fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18 },
});