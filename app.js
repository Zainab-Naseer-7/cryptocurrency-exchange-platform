/**
 * ==========================================================================
 * CRYPTERA - ULTRA-PREMIUM CRYPTOCURRENCY EXCHANGE PLATFORM
 * Core Engine & Interactive Trading Terminal Logic
 * ==========================================================================
 */

// --- 01. CENTRAL MOCK DATA & STATE ---
const CRYPTERA_STATE = {
  theme: localStorage.getItem('cryptera_theme') || 'dark',
  activePair: 'BTC/USDT',
  activeTimeframe: '1H',
  chartType: 'candle', // 'candle' or 'line'
  activeIndicators: {
    ma20: true,
    ema50: false,
    bb: false,
    vol: true
  },
  user: {
    isLoggedIn: true,
    name: 'Alex Vance',
    email: 'alex.vance@cryptera.io',
    totalBalanceUSDT: 24892.46,
    pnl24hUSDT: 842.17,
    pnl24hPct: 3.51,
    holdings: {
      BTC: { available: 0.185, locked: 0.02 },
      ETH: { available: 2.42, locked: 0.15 },
      SOL: { available: 18.5, locked: 0 },
      USDT: { available: 4250.00, locked: 1200.00 }
    }
  },
  favorites: JSON.parse(localStorage.getItem('cryptera_favorites') || '["BTC", "ETH", "SOL"]'),
  alerts: JSON.parse(localStorage.getItem('cryptera_alerts') || '[]'),
  openOrders: [
    { id: 'ORD-9841', pair: 'BTC/USDT', type: 'Limit', side: 'BUY', price: 66500.00, amount: 0.05, filled: '0%', date: '10:42:15' },
    { id: 'ORD-9839', pair: 'ETH/USDT', type: 'Limit', side: 'SELL', price: 3620.00, amount: 1.20, filled: '0%', date: '09:18:04' }
  ],
  tradeHistory: [
    { id: 'TX-4401', pair: 'BTC/USDT', type: 'Market', side: 'BUY', price: 67210.50, amount: 0.08, total: 5376.84, date: 'Yesterday 18:22' },
    { id: 'TX-4398', pair: 'SOL/USDT', type: 'Limit', side: 'BUY', price: 174.50, amount: 12.0, total: 2094.00, date: '2 days ago' },
    { id: 'TX-4395', pair: 'ETH/USDT', type: 'Market', side: 'SELL', price: 3510.00, amount: 0.85, total: 2983.50, date: '3 days ago' }
  ],
  marketCategory: 'all',
  searchQuery: ''
};

// --- ASSET CATALOG WITH REALISTIC CRYPTO DATA & SVG LOGOS ---
const CRYPTO_ASSETS = [
  {
    symbol: 'BTC',
    pair: 'BTC/USDT',
    name: 'Bitcoin',
    price: 67842.31,
    change24h: 3.42,
    high24h: 68490.00,
    low24h: 65210.00,
    volume24h: '32.48B',
    category: ['spot', 'trending', 'gainers', 'layer1'],
    color: '#f7931a',
    sparkline: [65200, 65800, 66400, 66100, 67200, 66900, 67842],
    decimals: 2,
    icon: `<svg viewBox="0 0 32 32" class="coin-icon-img"><circle cx="16" cy="16" r="16" fill="#F7931A"/><path fill="#FFF" d="M22.8 13.5c.3-2.1-1.3-3.2-3.5-4l.7-2.9-1.8-.4-.7 2.8c-.5-.1-1-.2-1.5-.3l.7-2.9-1.8-.4-.7 2.9c-.4-.1-.8-.2-1.1-.3l-2.4-.6-.5 1.9s1.3.3 1.3.3c.7.2.8.7.8 1.1l-.8 3.3c.1 0 .1 0 .2.1l-.2-.1-1.2 4.7c-.1.2-.3.6-.8.4 0 0-1.3-.3-1.3-.3l-.9 2.1 2.3.6c.4.1.9.2 1.3.3l-.7 3 1.8.4.7-2.9c.5.1 1 .3 1.5.4l-.7 2.9 1.8.4.7-2.9c2.9.5 5.1.3 6-2.3.8-2 .1-3.2-1.4-4 1.1-.3 1.9-1.1 2.1-2.8zm-3.7 5.9c-.5 2.1-4 .9-5.1.7l.9-3.7c1.1.3 4.8.8 4.2 3zm.5-5.9c-.5 1.9-3.4.9-4.3.7l.8-3.4c1 .2 4.1.7 3.5 2.7z"/></svg>`
  },
  {
    symbol: 'ETH',
    pair: 'ETH/USDT',
    name: 'Ethereum',
    price: 3542.80,
    change24h: 2.18,
    high24h: 3610.20,
    low24h: 3450.00,
    volume24h: '18.64B',
    category: ['spot', 'trending', 'gainers', 'layer1', 'defi'],
    color: '#627eea',
    sparkline: [3450, 3480, 3510, 3490, 3530, 3520, 3542],
    decimals: 2,
    icon: `<svg viewBox="0 0 32 32" class="coin-icon-img"><circle cx="16" cy="16" r="16" fill="#627EEA"/><g fill="#FFF"><path fill-opacity=".6" d="M16 4v8.9l7.5 3.3z"/><path d="M16 4L8.5 16.2l7.5-3.3z"/><path fill-opacity=".6" d="M16 21.9v6.1l7.5-10.4z"/><path d="M16 28V21.9L8.5 17.6z"/><path fill-opacity=".2" d="M16 20.6l7.5-4.4L16 12.9z"/><path fill-opacity=".6" d="M8.5 16.2l7.5 4.4v-7.7z"/></g></svg>`
  },
  {
    symbol: 'SOL',
    pair: 'SOL/USDT',
    name: 'Solana',
    price: 184.65,
    change24h: 7.84,
    high24h: 189.20,
    low24h: 171.10,
    volume24h: '9.21B',
    category: ['spot', 'trending', 'gainers', 'layer1'],
    color: '#14f195',
    sparkline: [171, 174, 178, 176, 181, 180, 184.65],
    decimals: 2,
    icon: `<svg viewBox="0 0 32 32" class="coin-icon-img"><circle cx="16" cy="16" r="16" fill="#000"/><path fill="url(#solGrad)" d="M8.5 21.2h12.3c.4 0 .7.2.9.5l2.2 2.2c.4.4.1 1.1-.5 1.1H11.1c-.4 0-.7-.2-.9-.5l-2.2-2.2c-.4-.4-.1-1.1.5-1.1zm0-6.6h12.3c.4 0 .7.2.9.5l2.2 2.2c.4.4.1 1.1-.5 1.1H11.1c-.4 0-.7-.2-.9-.5l-2.2-2.2c-.4-.4-.1-1.1.5-1.1zm2.6-6.6H23.4c.4 0 .7.2.9.5l-2.2 2.2c-.4.4-.1 1.1-.5 1.1H8.5c-.4 0-.7-.2-.9-.5L5.4 9.1c-.4-.4-.1-1.1.5-1.1h5.2z"/><defs><linearGradient id="solGrad" x1="5" y1="26" x2="25" y2="7" gradientUnits="userSpaceOnUse"><stop stop-color="#00FFA3"/><stop offset="1" stop-color="#DC1FFF"/></linearGradient></defs></svg>`
  },
  {
    symbol: 'BNB',
    pair: 'BNB/USDT',
    name: 'BNB Chain',
    price: 594.12,
    change24h: -0.84,
    high24h: 605.00,
    low24h: 588.40,
    volume24h: '2.14B',
    category: ['spot', 'losers', 'layer1'],
    color: '#f3ba2f',
    sparkline: [602, 600, 597, 595, 592, 596, 594.12],
    decimals: 2,
    icon: `<svg viewBox="0 0 32 32" class="coin-icon-img"><circle cx="16" cy="16" r="16" fill="#F3BA2F"/><path fill="#FFF" d="M16 7.5l3.8 3.8-3.8 3.8-3.8-3.8L16 7.5zm5.7 5.7l3.8 3.8-3.8 3.8-3.8-3.8 3.8-3.8zM6.5 17l3.8-3.8 3.8 3.8-3.8 3.8L6.5 17zm9.5 9.5l-3.8-3.8 3.8-3.8 3.8 3.8-3.8 3.8zm0-6.7l-2.8-2.8 2.8-2.8 2.8 2.8-2.8 2.8z"/></svg>`
  },
  {
    symbol: 'XRP',
    pair: 'XRP/USDT',
    name: 'XRP',
    price: 0.6241,
    change24h: 4.12,
    high24h: 0.6410,
    low24h: 0.5980,
    volume24h: '3.82B',
    category: ['spot', 'trending', 'gainers'],
    color: '#23292f',
    sparkline: [0.598, 0.605, 0.612, 0.608, 0.619, 0.621, 0.6241],
    decimals: 4,
    icon: `<svg viewBox="0 0 32 32" class="coin-icon-img"><circle cx="16" cy="16" r="16" fill="#23292F"/><path fill="#FFF" d="M23.9 10h-2.4l-5.5 5.5-5.5-5.5H8.1l6.7 6.7c.7.7 1.7.7 2.4 0l6.7-6.7zm-15.8 12h2.4l5.5-5.5 5.5 5.5h2.4l-6.7-6.7c-.7-.7-1.7-.7-2.4 0l-6.7 6.7z"/></svg>`
  },
  {
    symbol: 'ADA',
    pair: 'ADA/USDT',
    name: 'Cardano',
    price: 0.4852,
    change24h: -1.45,
    high24h: 0.5010,
    low24h: 0.4780,
    volume24h: '1.24B',
    category: ['spot', 'losers', 'layer1'],
    color: '#0033ad',
    sparkline: [0.495, 0.492, 0.489, 0.491, 0.486, 0.488, 0.4852],
    decimals: 4,
    icon: `<svg viewBox="0 0 32 32" class="coin-icon-img"><circle cx="16" cy="16" r="16" fill="#0033AD"/><circle cx="16" cy="16" r="4" fill="#FFF"/><circle cx="16" cy="7" r="1.8" fill="#FFF"/><circle cx="16" cy="25" r="1.8" fill="#FFF"/><circle cx="7" cy="16" r="1.8" fill="#FFF"/><circle cx="25" cy="16" r="1.8" fill="#FFF"/></svg>`
  },
  {
    symbol: 'AVAX',
    pair: 'AVAX/USDT',
    name: 'Avalanche',
    price: 36.85,
    change24h: 5.20,
    high24h: 38.00,
    low24h: 34.70,
    volume24h: '1.45B',
    category: ['spot', 'trending', 'gainers', 'layer1'],
    color: '#e84142',
    sparkline: [34.7, 35.2, 35.8, 35.5, 36.4, 36.2, 36.85],
    decimals: 2,
    icon: `<svg viewBox="0 0 32 32" class="coin-icon-img"><circle cx="16" cy="16" r="16" fill="#E84142"/><path fill="#FFF" d="M19.8 19.8l-3.8-6.6-3.8 6.6h7.6zm-11.4 0l7.6-13.2 2.6 4.5-5 8.7H8.4zm15.2 0l-2.6-4.5h5.2l-2.6 4.5z"/></svg>`
  },
  {
    symbol: 'DOT',
    pair: 'DOT/USDT',
    name: 'Polkadot',
    price: 8.45,
    change24h: 1.15,
    high24h: 8.70,
    low24h: 8.25,
    volume24h: '890M',
    category: ['spot', 'layer1'],
    color: '#e6007a',
    sparkline: [8.25, 8.35, 8.42, 8.38, 8.41, 8.43, 8.45],
    decimals: 2,
    icon: `<svg viewBox="0 0 32 32" class="coin-icon-img"><circle cx="16" cy="16" r="16" fill="#E6007A"/><circle cx="16" cy="10" r="4.5" fill="#FFF"/><circle cx="16" cy="22" r="3" fill="#FFF"/></svg>`
  },
  {
    symbol: 'NEAR',
    pair: 'NEAR/USDT',
    name: 'NEAR Protocol',
    price: 6.75,
    change24h: 8.40,
    high24h: 7.10,
    low24h: 6.20,
    volume24h: '650M',
    category: ['spot', 'trending', 'gainers', 'ai', 'layer1'],
    color: '#000000',
    sparkline: [6.2, 6.35, 6.5, 6.4, 6.6, 6.7, 6.75],
    decimals: 2,
    icon: `<svg viewBox="0 0 32 32" class="coin-icon-img"><circle cx="16" cy="16" r="16" fill="#000"/><path fill="#FFF" d="M11 9h2.5l6.5 9.5V9H22v14h-2.5L13 13.5V23H11V9z"/></svg>`
  },
  {
    symbol: 'LINK',
    pair: 'LINK/USDT',
    name: 'Chainlink',
    price: 18.90,
    change24h: 3.80,
    high24h: 19.40,
    low24h: 18.10,
    volume24h: '780M',
    category: ['spot', 'defi', 'infrastructure'],
    color: '#375bd2',
    sparkline: [18.1, 18.3, 18.6, 18.4, 18.7, 18.8, 18.9],
    decimals: 2,
    icon: `<svg viewBox="0 0 32 32" class="coin-icon-img"><circle cx="16" cy="16" r="16" fill="#375BD2"/><path fill="#FFF" d="M16 6.5l8 4.6v9.2l-8 4.6-8-4.6v-9.2l8-4.6zm0 3.2l-5.2 3v6l5.2 3 5.2-3v-6l-5.2-3z"/></svg>`
  }
];

// --- 02. HELPER UTILITIES ---
function formatCurrency(val, decimals = 2) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(val);
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${type === 'success' ? '#10b981' : '#00f0ff'}" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(40px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Generate SVG Sparkline string
function generateSparklineSVG(points, isPositive) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const width = 54;
  const height = 20;

  const pathData = points.map((val, idx) => {
    const x = (idx / (points.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 4) - 2;
    return `${idx === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const strokeColor = isPositive ? '#10b981' : '#f43f5e';
  return `
    <svg class="sparkline-svg" viewBox="0 0 ${width} ${height}">
      <path d="${pathData}" fill="none" stroke="${strokeColor}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
}

// --- 03. TICKER STRIP RENDERING ---
function initTickerStrip() {
  const track = document.getElementById('tickerTrack');
  if (!track) return;

  const items = [...CRYPTO_ASSETS, ...CRYPTO_ASSETS]; // Repeat for infinite seamless loop
  track.innerHTML = items.map(asset => {
    const isUp = asset.change24h >= 0;
    const arrow = isUp ? '↑' : '↓';
    return `
      <div class="ticker-item" onclick="switchActivePair('${asset.pair}')">
        <span class="ticker-symbol">${asset.symbol}/USDT</span>
        <span class="ticker-price tabular-nums">${formatCurrency(asset.price, asset.decimals)}</span>
        <span class="ticker-change ${isUp ? 'trend-up' : 'trend-down'}">
          ${arrow} ${isUp ? '+' : ''}${asset.change24h.toFixed(2)}%
        </span>
        ${generateSparklineSVG(asset.sparkline, isUp)}
      </div>
    `;
  }).join('');
}

// --- 04. MARKET OVERVIEW TABLE & FILTERING ---
function renderMarketTable() {
  const tbody = document.getElementById('marketTableBody');
  if (!tbody) return;

  const filtered = CRYPTO_ASSETS.filter(asset => {
    // Category match
    const categoryMatches = 
      CRYPTERA_STATE.marketCategory === 'all' ||
      (CRYPTERA_STATE.marketCategory === 'favorites' && CRYPTERA_STATE.favorites.includes(asset.symbol)) ||
      asset.category.includes(CRYPTERA_STATE.marketCategory);

    // Search query match
    const searchMatches = 
      !CRYPTERA_STATE.searchQuery ||
      asset.name.toLowerCase().includes(CRYPTERA_STATE.searchQuery.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(CRYPTERA_STATE.searchQuery.toLowerCase());

    return categoryMatches && searchMatches;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 48px; color: var(--text-tertiary);">
          No digital assets match your filter criteria.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(asset => {
    const isUp = asset.change24h >= 0;
    const isFav = CRYPTERA_STATE.favorites.includes(asset.symbol);
    const arrow = isUp ? '↑' : '↓';
    return `
      <tr onclick="switchActivePair('${asset.pair}')">
        <td>
          <div class="coin-cell">
            <button class="star-fav-btn ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite('${asset.symbol}')" title="Add to favorites">
              ${isFav ? '★' : '☆'}
            </button>
            ${asset.icon}
            <div class="coin-names">
              <span class="coin-symbol">${asset.symbol}</span>
              <span class="coin-full-name">${asset.name}</span>
            </div>
          </div>
        </td>
        <td class="tabular-nums font-semibold">${formatCurrency(asset.price, asset.decimals)}</td>
        <td>
          <span class="${isUp ? 'trend-badge-up' : 'trend-badge-down'} tabular-nums">
            ${arrow} ${isUp ? '+' : ''}${asset.change24h.toFixed(2)}%
          </span>
        </td>
        <td class="tabular-nums">${formatCurrency(asset.high24h, asset.decimals)}</td>
        <td class="tabular-nums">${formatCurrency(asset.low24h, asset.decimals)}</td>
        <td class="tabular-nums">$${asset.volume24h}</td>
        <td>${generateSparklineSVG(asset.sparkline, isUp)}</td>
        <td>
          <button class="btn btn-outline btn-sm" onclick="event.stopPropagation(); switchActivePair('${asset.pair}'); scrollToElement('terminal');">
            Trade
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function toggleFavorite(symbol) {
  const idx = CRYPTERA_STATE.favorites.indexOf(symbol);
  if (idx > -1) {
    CRYPTERA_STATE.favorites.splice(idx, 1);
    showToast(`Removed ${symbol} from favorites`);
  } else {
    CRYPTERA_STATE.favorites.push(symbol);
    showToast(`Added ${symbol} to favorites`, 'success');
  }
  localStorage.setItem('cryptera_favorites', JSON.stringify(CRYPTERA_STATE.favorites));
  renderMarketTable();
  renderWatchlist();
}

// --- 05. ADVANCED CANVAS TRADING CHART ENGINE ---
let chartCandles = [];
let chartHoverData = null;

function generateHistoricalCandles(basePrice, count = 60, timeframe = '1H') {
  const candles = [];
  let currentClose = basePrice * 0.94;
  const now = Date.now();
  const tfMinutes = timeframe === '1m' ? 1 : timeframe === '5m' ? 5 : timeframe === '15m' ? 15 : timeframe === '1H' ? 60 : timeframe === '4H' ? 240 : 1440;
  const stepMs = tfMinutes * 60 * 1000;

  for (let i = count; i >= 0; i--) {
    const time = new Date(now - i * stepMs);
    const volatility = currentClose * 0.008;
    const delta = (Math.random() - 0.48) * volatility;
    const open = currentClose;
    const close = open + delta;
    const high = Math.max(open, close) + Math.random() * (volatility * 0.6);
    const low = Math.min(open, close) - Math.random() * (volatility * 0.6);
    const volume = Math.floor(Math.random() * 80 + 20);

    candles.push({ time, open, high, low, close, volume });
    currentClose = close;
  }
  return candles;
}

function initTradingChart() {
  const canvas = document.getElementById('tradingChartCanvas');
  if (!canvas) return;

  const currentAsset = CRYPTO_ASSETS.find(a => a.pair === CRYPTERA_STATE.activePair) || CRYPTO_ASSETS[0];
  chartCandles = generateHistoricalCandles(currentAsset.price, 65, CRYPTERA_STATE.activeTimeframe);
  
  // Set up resize observer & draw
  window.addEventListener('resize', drawChart);
  canvas.addEventListener('mousemove', handleChartMouseMove);
  canvas.addEventListener('mouseleave', () => {
    chartHoverData = null;
    drawChart();
  });

  drawChart();
}

function drawChart() {
  const canvas = document.getElementById('tradingChartCanvas');
  if (!canvas || !chartCandles.length) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.height;

  // Colors
  const isLight = CRYPTERA_STATE.theme === 'light';
  const bgColor = isLight ? '#ffffff' : '#080c14';
  const gridColor = isLight ? 'rgba(15, 23, 42, 0.06)' : 'rgba(255, 255, 255, 0.04)';
  const textColor = isLight ? '#64748b' : '#64748b';
  const upColor = isLight ? '#059669' : '#10b981';
  const downColor = isLight ? '#e11d48' : '#f43f5e';

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // Layout boundaries
  const paddingRight = 70;
  const paddingBottom = 30;
  const chartW = width - paddingRight;
  const chartH = height - paddingBottom;
  const volH = chartH * 0.18;
  const priceH = chartH - volH;

  // Min & Max Price calculation
  let minP = Infinity;
  let maxP = -Infinity;
  let maxVol = 0;

  chartCandles.forEach(c => {
    if (c.low < minP) minP = c.low;
    if (c.high > maxP) maxP = c.high;
    if (c.volume > maxVol) maxVol = c.volume;
  });

  const pRange = maxP - minP || 1;
  const pBuffer = pRange * 0.08;
  const plotMin = minP - pBuffer;
  const plotMax = maxP + pBuffer;
  const plotRange = plotMax - plotMin;

  // Horizontal Grid Lines & Price Axis
  ctx.lineWidth = 1;
  ctx.strokeStyle = gridColor;
  ctx.fillStyle = textColor;
  ctx.font = '11px JetBrains Mono, monospace';
  ctx.textAlign = 'left';

  const gridSteps = 6;
  for (let i = 0; i <= gridSteps; i++) {
    const y = (priceH / gridSteps) * i;
    const priceVal = plotMax - (i / gridSteps) * plotRange;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(chartW, y);
    ctx.stroke();
    ctx.fillText(priceVal.toFixed(2), chartW + 8, y + 4);
  }

  // Draw Volume separator
  ctx.beginPath();
  ctx.moveTo(0, priceH);
  ctx.lineTo(chartW, priceH);
  ctx.stroke();

  // Candle slot width
  const candleCount = chartCandles.length;
  const slotW = chartW / candleCount;
  const candleW = Math.max(2, slotW * 0.68);

  // Moving Average calculation helper
  const ma20Points = [];

  // Draw Candlesticks & Volume Bars
  chartCandles.forEach((c, idx) => {
    const x = idx * slotW + slotW / 2;
    const isGreen = c.close >= c.open;
    const color = isGreen ? upColor : downColor;

    // Volume Bar
    const vBarH = (c.volume / maxVol) * (volH - 10);
    const vY = height - paddingBottom - vBarH;
    ctx.fillStyle = isGreen ? 'rgba(16, 185, 129, 0.25)' : 'rgba(244, 63, 94, 0.25)';
    ctx.fillRect(x - candleW / 2, vY, candleW, vBarH);

    // Candle or Line Mode
    if (CRYPTERA_STATE.chartType === 'candle') {
      const openY = priceH - ((c.open - plotMin) / plotRange) * priceH;
      const closeY = priceH - ((c.close - plotMin) / plotRange) * priceH;
      const highY = priceH - ((c.high - plotMin) / plotRange) * priceH;
      const lowY = priceH - ((c.low - plotMin) / plotRange) * priceH;

      // Wick
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(x, highY);
      ctx.lineTo(x, lowY);
      ctx.stroke();

      // Body
      ctx.fillStyle = color;
      const topY = Math.min(openY, closeY);
      const bH = Math.max(1.5, Math.abs(closeY - openY));
      ctx.fillRect(x - candleW / 2, topY, candleW, bH);
    }

    // Compute MA20
    if (idx >= 19) {
      const slice = chartCandles.slice(idx - 19, idx + 1);
      const avg = slice.reduce((sum, item) => sum + item.close, 0) / 20;
      const maY = priceH - ((avg - plotMin) / plotRange) * priceH;
      ma20Points.push({ x, y: maY });
    }
  });

  // Draw Line Chart mode
  if (CRYPTERA_STATE.chartType === 'line') {
    ctx.beginPath();
    chartCandles.forEach((c, idx) => {
      const x = idx * slotW + slotW / 2;
      const y = priceH - ((c.close - plotMin) / plotRange) * priceH;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Area fill gradient
    const lastX = (chartCandles.length - 1) * slotW + slotW / 2;
    ctx.lineTo(lastX, priceH);
    ctx.lineTo(slotW / 2, priceH);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, 0, 0, priceH);
    grad.addColorStop(0, 'rgba(0, 240, 255, 0.25)');
    grad.addColorStop(1, 'rgba(0, 240, 255, 0.0)');
    ctx.fillStyle = grad;
    ctx.fill();
  }

  // Draw Indicators: MA 20
  if (CRYPTERA_STATE.activeIndicators.ma20 && ma20Points.length > 0) {
    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#f59e0b'; // Amber MA line
    ma20Points.forEach((pt, i) => {
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.stroke();
  }

  // Crosshair Interaction
  if (chartHoverData) {
    const { mouseX, mouseY, candle, candleIdx } = chartHoverData;
    const x = candleIdx * slotW + slotW / 2;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.setLineDash([4, 4]);

    // Vertical line
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height - paddingBottom);
    ctx.stroke();

    // Horizontal line
    ctx.beginPath();
    ctx.moveTo(0, mouseY);
    ctx.lineTo(chartW, mouseY);
    ctx.stroke();

    ctx.setLineDash([]); // Reset line dash

    // Update floating hover overlay
    const overlay = document.getElementById('chartHoverOverlay');
    if (overlay && candle) {
      overlay.innerHTML = `
        <span>O: <b>${candle.open.toFixed(2)}</b></span>
        <span>H: <b>${candle.high.toFixed(2)}</b></span>
        <span>L: <b>${candle.low.toFixed(2)}</b></span>
        <span>C: <b>${candle.close.toFixed(2)}</b></span>
        <span>Vol: <b>${candle.volume}K</b></span>
      `;
    }
  }
}

function handleChartMouseMove(e) {
  const canvas = document.getElementById('tradingChartCanvas');
  if (!canvas || !chartCandles.length) return;

  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  const chartW = rect.width - 70;

  if (mouseX < 0 || mouseX > chartW) {
    chartHoverData = null;
    drawChart();
    return;
  }

  const slotW = chartW / chartCandles.length;
  const candleIdx = Math.min(chartCandles.length - 1, Math.max(0, Math.floor(mouseX / slotW)));
  const candle = chartCandles[candleIdx];

  chartHoverData = { mouseX, mouseY, candle, candleIdx };
  drawChart();
}

// Switch chart timeframe
function setTimeframe(tf) {
  CRYPTERA_STATE.activeTimeframe = tf;
  document.querySelectorAll('.chart-timeframe-group .chart-tool-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tf === tf);
  });
  const currentAsset = CRYPTO_ASSETS.find(a => a.pair === CRYPTERA_STATE.activePair) || CRYPTO_ASSETS[0];
  chartCandles = generateHistoricalCandles(currentAsset.price, 65, tf);
  drawChart();
}

// Switch chart style (Candle vs Line)
function setChartType(type) {
  CRYPTERA_STATE.chartType = type;
  document.querySelectorAll('.chart-type-group .chart-tool-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.type === type);
  });
  drawChart();
}

// --- 06. ORDERBOOK SIMULATOR ---
function renderOrderbook(basePrice) {
  const asksContainer = document.getElementById('orderbookAsks');
  const bidsContainer = document.getElementById('orderbookBids');
  const spreadEl = document.getElementById('orderbookSpread');
  if (!asksContainer || !bidsContainer) return;

  const asks = [];
  const bids = [];
  let cumAsk = 0;
  let cumBid = 0;

  for (let i = 5; i >= 1; i--) {
    const askPrice = basePrice + i * (basePrice * 0.00035);
    const amount = (Math.random() * 1.8 + 0.2).toFixed(3);
    cumAsk += parseFloat(amount);
    asks.push({ price: askPrice, amount, total: cumAsk.toFixed(3) });
  }

  for (let i = 1; i <= 5; i++) {
    const bidPrice = basePrice - i * (basePrice * 0.00035);
    const amount = (Math.random() * 2.2 + 0.3).toFixed(3);
    cumBid += parseFloat(amount);
    bids.push({ price: bidPrice, amount, total: cumBid.toFixed(3) });
  }

  asksContainer.innerHTML = asks.map(a => `
    <div class="orderbook-row trend-down">
      <span class="tabular-nums">${a.price.toFixed(2)}</span>
      <span class="tabular-nums text-right">${a.amount}</span>
      <span class="tabular-nums text-right">${a.total}</span>
      <div class="orderbook-depth-bar depth-ask" style="width: ${(a.total / cumAsk) * 100}%"></div>
    </div>
  `).join('');

  bidsContainer.innerHTML = bids.map(b => `
    <div class="orderbook-row trend-up">
      <span class="tabular-nums">${b.price.toFixed(2)}</span>
      <span class="tabular-nums text-right">${b.amount}</span>
      <span class="tabular-nums text-right">${b.total}</span>
      <div class="orderbook-depth-bar depth-bid" style="width: ${(b.total / cumBid) * 100}%"></div>
    </div>
  `).join('');

  if (spreadEl) {
    const spread = (asks[asks.length - 1].price - bids[0].price).toFixed(2);
    spreadEl.innerHTML = `Spread: <span class="tabular-nums">${spread} (${((spread / basePrice) * 100).toFixed(3)}%)</span>`;
  }
}

// --- 07. WATCHLIST IN TERMINAL ---
let watchlistQuery = '';

function filterWatchlist(query) {
  watchlistQuery = (query || '').toLowerCase();
  renderWatchlist();
}

function renderWatchlist() {
  const list = document.getElementById('terminalWatchlist');
  if (!list) return;

  const filtered = CRYPTO_ASSETS.filter(asset => {
    if (!watchlistQuery) return true;
    return asset.symbol.toLowerCase().includes(watchlistQuery) || asset.name.toLowerCase().includes(watchlistQuery);
  });

  if (filtered.length === 0) {
    list.innerHTML = `<div style="padding: 16px; font-size: 0.75rem; color: var(--text-tertiary); text-align: center;">No pairs found.</div>`;
    return;
  }

  list.innerHTML = filtered.map(asset => {
    const isUp = asset.change24h >= 0;
    const isActive = asset.pair === CRYPTERA_STATE.activePair;
    return `
      <div class="watchlist-row ${isActive ? 'active' : ''}" onclick="switchActivePair('${asset.pair}')">
        <div class="watchlist-pair-name">
          <span>${asset.symbol}/USDT</span>
          <span class="watchlist-pair-vol">Vol $${asset.volume24h}</span>
        </div>
        <div style="text-align: right;">
          <div class="tabular-nums font-semibold">${formatCurrency(asset.price, asset.decimals)}</div>
          <div class="text-xs ${isUp ? 'trend-up' : 'trend-down'} tabular-nums">
            ${isUp ? '+' : ''}${asset.change24h.toFixed(2)}%
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// --- 08. SWITCH ACTIVE TRADING PAIR ---
function switchActivePair(pair) {
  CRYPTERA_STATE.activePair = pair;
  const asset = CRYPTO_ASSETS.find(a => a.pair === pair) || CRYPTO_ASSETS[0];

  // Update top bar in terminal
  const titleEl = document.getElementById('terminalPairTitle');
  const priceHeroEl = document.getElementById('terminalPriceHero');
  const highEl = document.getElementById('terminalHigh');
  const lowEl = document.getElementById('terminalLow');
  const volEl = document.getElementById('terminalVol');
  const changeBadgeEl = document.getElementById('terminalChangeBadge');

  if (titleEl) titleEl.innerHTML = `${asset.icon} ${asset.pair}`;
  if (priceHeroEl) priceHeroEl.textContent = formatCurrency(asset.price, asset.decimals);
  if (highEl) highEl.textContent = formatCurrency(asset.high24h, asset.decimals);
  if (lowEl) lowEl.textContent = formatCurrency(asset.low24h, asset.decimals);
  if (volEl) volEl.textContent = `$${asset.volume24h}`;

  if (changeBadgeEl) {
    const isUp = asset.change24h >= 0;
    changeBadgeEl.className = isUp ? 'trend-badge-up' : 'trend-badge-down';
    changeBadgeEl.textContent = `${isUp ? '↑ +' : '↓ '}${asset.change24h.toFixed(2)}%`;
  }

  // Update Order Form default price
  const priceInput = document.getElementById('orderPriceInput');
  if (priceInput) priceInput.value = asset.price.toFixed(asset.decimals);

  // Update Unit labels
  const unitLabel = document.getElementById('orderAmountUnit');
  if (unitLabel) unitLabel.textContent = asset.symbol;

  const submitBtn = document.getElementById('orderSubmitBtn');
  const currentSide = document.querySelector('.buy-sell-btn.active-buy') ? 'BUY' : 'SELL';
  if (submitBtn) {
    submitBtn.textContent = `${currentSide === 'BUY' ? 'Buy' : 'Sell'} ${asset.symbol}`;
  }

  // Re-generate chart candles & orderbook
  chartCandles = generateHistoricalCandles(asset.price, 65, CRYPTERA_STATE.activeTimeframe);
  drawChart();
  renderOrderbook(asset.price);
  renderWatchlist();
  updateOrderCalculations();
}

// --- 09. ORDER PLACEMENT & CALCULATIONS ---
function updateOrderCalculations() {
  const priceInput = document.getElementById('orderPriceInput');
  const amountInput = document.getElementById('orderAmountInput');
  const totalInput = document.getElementById('orderTotalInput');
  const feeEl = document.getElementById('orderFeeEstimate');

  if (!priceInput || !amountInput || !totalInput) return;

  const price = parseFloat(priceInput.value) || 0;
  const amount = parseFloat(amountInput.value) || 0;
  const total = price * amount;

  totalInput.value = total > 0 ? total.toFixed(2) : '';
  if (feeEl) {
    const fee = total * 0.00075; // 0.075% maker/taker fee
    feeEl.textContent = `$${fee.toFixed(2)} USDT`;
  }
}

function setOrderPercentage(pct) {
  const asset = CRYPTO_ASSETS.find(a => a.pair === CRYPTERA_STATE.activePair) || CRYPTO_ASSETS[0];
  const priceInput = document.getElementById('orderPriceInput');
  const amountInput = document.getElementById('orderAmountInput');
  const isBuy = !!document.querySelector('.buy-sell-btn.active-buy');

  const price = parseFloat(priceInput.value) || asset.price;
  if (price <= 0) return;

  if (isBuy) {
    const availableUSDT = CRYPTERA_STATE.user.holdings.USDT.available;
    const targetUSDT = availableUSDT * (pct / 100);
    const amount = targetUSDT / price;
    amountInput.value = amount.toFixed(4);
  } else {
    const availableCrypto = (CRYPTERA_STATE.user.holdings[asset.symbol] || {}).available || 0;
    const amount = availableCrypto * (pct / 100);
    amountInput.value = amount.toFixed(4);
  }

  updateOrderCalculations();
}

function submitOrder(e) {
  if (e) e.preventDefault();
  const asset = CRYPTO_ASSETS.find(a => a.pair === CRYPTERA_STATE.activePair) || CRYPTO_ASSETS[0];
  const isBuy = !!document.querySelector('.buy-sell-btn.active-buy');
  const priceInput = document.getElementById('orderPriceInput');
  const amountInput = document.getElementById('orderAmountInput');

  const price = parseFloat(priceInput.value);
  const amount = parseFloat(amountInput.value);

  if (!price || price <= 0 || !amount || amount <= 0) {
    showToast('Please enter a valid price and amount', 'error');
    return;
  }

  const total = price * amount;

  if (isBuy) {
    if (total > CRYPTERA_STATE.user.holdings.USDT.available) {
      showToast(`Insufficient USDT balance. Available: $${CRYPTERA_STATE.user.holdings.USDT.available.toFixed(2)}`, 'error');
      return;
    }
    // Deduct USDT & add open order
    CRYPTERA_STATE.user.holdings.USDT.available -= total;
    CRYPTERA_STATE.user.holdings.USDT.locked += total;
  } else {
    const userHolding = CRYPTERA_STATE.user.holdings[asset.symbol] || { available: 0, locked: 0 };
    if (amount > userHolding.available) {
      showToast(`Insufficient ${asset.symbol} balance. Available: ${userHolding.available.toFixed(4)}`, 'error');
      return;
    }
    userHolding.available -= amount;
    userHolding.locked += amount;
  }

  const newOrder = {
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    pair: asset.pair,
    type: 'Limit',
    side: isBuy ? 'BUY' : 'SELL',
    price,
    amount,
    filled: '0%',
    date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  };

  CRYPTERA_STATE.openOrders.unshift(newOrder);
  renderOrdersTable();
  updatePortfolioUI();
  showToast(`Successfully created ${newOrder.side} order for ${amount} ${asset.symbol}`, 'success');

  amountInput.value = '';
  updateOrderCalculations();
}

function cancelOrder(orderId) {
  const idx = CRYPTERA_STATE.openOrders.findIndex(o => o.id === orderId);
  if (idx === -1) return;

  const order = CRYPTERA_STATE.openOrders[idx];
  const [base] = order.pair.split('/');

  // Refund locked balance
  if (order.side === 'BUY') {
    const total = order.price * order.amount;
    CRYPTERA_STATE.user.holdings.USDT.locked -= total;
    CRYPTERA_STATE.user.holdings.USDT.available += total;
  } else {
    if (CRYPTERA_STATE.user.holdings[base]) {
      CRYPTERA_STATE.user.holdings[base].locked -= order.amount;
      CRYPTERA_STATE.user.holdings[base].available += order.amount;
    }
  }

  CRYPTERA_STATE.openOrders.splice(idx, 1);
  renderOrdersTable();
  updatePortfolioUI();
  showToast(`Order ${orderId} cancelled & funds unlocked`, 'info');
}

function renderOrdersTable() {
  const tbody = document.getElementById('openOrdersTableBody');
  const countBadge = document.getElementById('openOrdersCount');
  if (!tbody) return;

  if (countBadge) countBadge.textContent = CRYPTERA_STATE.openOrders.length;

  if (CRYPTERA_STATE.openOrders.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="orders-empty-state">No open orders active in this demo terminal.</td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = CRYPTERA_STATE.openOrders.map(order => {
    const isBuy = order.side === 'BUY';
    return `
      <tr>
        <td><b>${order.date}</b></td>
        <td><b>${order.pair}</b></td>
        <td>${order.type}</td>
        <td><span class="${isBuy ? 'trend-up' : 'trend-down'} font-bold">${order.side}</span></td>
        <td class="tabular-nums">$${order.price.toFixed(2)}</td>
        <td class="tabular-nums">${order.amount}</td>
        <td>
          <button class="btn btn-outline btn-sm" onclick="cancelOrder('${order.id}')" style="padding: 4px 10px; font-size: 0.75rem;">
            Cancel
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// --- 10. PORTFOLIO & ASSETS UI ---
function updatePortfolioUI() {
  const netWorthEl = document.getElementById('portfolioNetWorth');
  const pnlEl = document.getElementById('portfolio24hPnl');
  const tableBody = document.getElementById('portfolioHoldingsBody');
  if (!netWorthEl || !tableBody) return;

  // Calculate actual total based on live asset prices
  let totalUSD = CRYPTERA_STATE.user.holdings.USDT.available + CRYPTERA_STATE.user.holdings.USDT.locked;
  const holdingRows = [];

  ['BTC', 'ETH', 'SOL'].forEach(sym => {
    const asset = CRYPTO_ASSETS.find(a => a.symbol === sym);
    const holding = CRYPTERA_STATE.user.holdings[sym] || { available: 0, locked: 0 };
    const totalCoin = holding.available + holding.locked;
    const usdVal = totalCoin * (asset ? asset.price : 0);
    totalUSD += usdVal;

    holdingRows.push({
      symbol: sym,
      name: asset.name,
      icon: asset.icon,
      available: holding.available,
      locked: holding.locked,
      total: totalCoin,
      usdVal
    });
  });

  // Add USDT
  holdingRows.push({
    symbol: 'USDT',
    name: 'Tether USD',
    icon: `<svg viewBox="0 0 32 32" class="coin-icon-img"><circle cx="16" cy="16" r="16" fill="#26A17B"/><path fill="#FFF" d="M17.9 14.5v-2.3h5.3V8.8H8.8v3.4h5.3v2.3c-4.3.2-7.5 1.1-7.5 2.1s3.2 1.9 7.5 2.1v6.7h3.8v-6.7c4.3-.2 7.5-1.1 7.5-2.1s-3.2-1.9-7.5-2.1zm0 3.2v-.2c3.5-.2 5.9-.8 5.9-1.5s-2.4-1.3-5.9-1.5v3.2zm-3.8 0v-3.2c-3.5.2-5.9.8-5.9 1.5s2.4 1.3 5.9 1.5v.2z"/></svg>`,
    available: CRYPTERA_STATE.user.holdings.USDT.available,
    locked: CRYPTERA_STATE.user.holdings.USDT.locked,
    total: CRYPTERA_STATE.user.holdings.USDT.available + CRYPTERA_STATE.user.holdings.USDT.locked,
    usdVal: CRYPTERA_STATE.user.holdings.USDT.available + CRYPTERA_STATE.user.holdings.USDT.locked
  });

  netWorthEl.textContent = formatCurrency(totalUSD);
  if (pnlEl) {
    pnlEl.textContent = `+$${CRYPTERA_STATE.user.pnl24hUSDT.toFixed(2)} (+${CRYPTERA_STATE.user.pnl24hPct}%)`;
  }

  tableBody.innerHTML = holdingRows.map(row => {
    const pctOfPort = ((row.usdVal / totalUSD) * 100).toFixed(1);
    return `
      <tr>
        <td>
          <div class="coin-cell">
            ${row.icon}
            <div>
              <div class="font-bold">${row.symbol}</div>
              <div class="text-xs text-muted">${row.name}</div>
            </div>
          </div>
        </td>
        <td class="tabular-nums">${row.available.toFixed(4)}</td>
        <td class="tabular-nums">${row.locked.toFixed(4)}</td>
        <td class="tabular-nums font-bold">${formatCurrency(row.usdVal)}</td>
        <td>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="flex: 1; height: 6px; background: rgba(255,255,255,0.08); border-radius: 99px; overflow: hidden;">
              <div style="width: ${pctOfPort}%; height: 100%; background: var(--cyan-primary);"></div>
            </div>
            <span class="text-xs tabular-nums">${pctOfPort}%</span>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// --- 11. PRICE ALERT SYSTEM ---
function renderAlerts() {
  const container = document.getElementById('alertsListContainer');
  if (!container) return;

  if (CRYPTERA_STATE.alerts.length === 0) {
    container.innerHTML = `<div style="text-align: center; padding: 24px; color: var(--text-tertiary);">No active price alerts set.</div>`;
    return;
  }

  container.innerHTML = CRYPTERA_STATE.alerts.map(alert => `
    <div class="alert-item-row">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="font-bold">${alert.asset}</span>
        <span class="badge-tag" style="margin: 0; padding: 2px 8px; font-size: 0.6875rem;">
          ${alert.condition === 'above' ? 'rises above' : 'drops below'}
        </span>
        <span class="tabular-nums font-bold text-cyan">${formatCurrency(alert.targetPrice)}</span>
      </div>
      <button class="modal-close-btn" onclick="deleteAlert('${alert.id}')" title="Delete alert">✕</button>
    </div>
  `).join('');
}

function createAlert(e) {
  if (e) e.preventDefault();
  const assetSelect = document.getElementById('alertAssetSelect');
  const condSelect = document.getElementById('alertConditionSelect');
  const priceInput = document.getElementById('alertPriceInput');

  if (!assetSelect || !condSelect || !priceInput) return;

  const targetPrice = parseFloat(priceInput.value);
  if (!targetPrice || targetPrice <= 0) {
    showToast('Please enter a valid target price', 'error');
    return;
  }

  const newAlert = {
    id: `ALT-${Date.now()}`,
    asset: assetSelect.value,
    condition: condSelect.value,
    targetPrice,
    createdAt: new Date().toLocaleDateString()
  };

  CRYPTERA_STATE.alerts.unshift(newAlert);
  localStorage.setItem('cryptera_alerts', JSON.stringify(CRYPTERA_STATE.alerts));
  renderAlerts();
  showToast(`Alert created for ${newAlert.asset} ${newAlert.condition} $${targetPrice}`, 'success');
  priceInput.value = '';
}

function deleteAlert(id) {
  CRYPTERA_STATE.alerts = CRYPTERA_STATE.alerts.filter(a => a.id !== id);
  localStorage.setItem('cryptera_alerts', JSON.stringify(CRYPTERA_STATE.alerts));
  renderAlerts();
  showToast('Alert removed', 'info');
}

// --- 12. HERO DIGITAL FINANCIAL SPHERE (CANVAS ANIMATION) ---
function initHeroSphereCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;

  const width = 540;
  const height = 520;
  canvas.width = width;
  canvas.height = height;

  // 3D Nodes on a sphere
  const nodeCount = 52;
  const nodes = [];
  const radius = 170;

  for (let i = 0; i < nodeCount; i++) {
    const theta = Math.acos(2 * Math.random() - 1);
    const phi = 2 * Math.PI * Math.random();
    nodes.push({
      x: radius * Math.sin(theta) * Math.cos(phi),
      y: radius * Math.sin(theta) * Math.sin(phi),
      z: radius * Math.cos(theta),
      baseSize: Math.random() * 2.5 + 2
    });
  }

  let angleX = 0.002;
  let angleY = 0.004;

  function renderSphere() {
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;

    // Rotate nodes
    nodes.forEach(node => {
      // Rotate around Y
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const x1 = node.x * cosY + node.z * sinY;
      const z1 = -node.x * sinY + node.z * cosY;

      // Rotate around X
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const y1 = node.y * cosX - z1 * sinX;
      const z2 = node.y * sinX + z1 * cosX;

      node.x = x1;
      node.y = y1;
      node.z = z2;
    });

    // Draw connecting arcs / blockchain links
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 72) {
          const alpha = (1 - dist / 72) * 0.4;
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(centerX + nodes[i].x, centerY + nodes[i].y);
          ctx.lineTo(centerX + nodes[j].x, centerY + nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw glowing nodes
    nodes.forEach(node => {
      const scale = (node.z + radius * 1.4) / (radius * 2);
      const r = Math.max(1, node.baseSize * scale);
      const alpha = Math.max(0.2, (node.z + radius) / (radius * 2));

      ctx.fillStyle = `rgba(0, 240, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(centerX + node.x, centerY + node.y, r, 0, Math.PI * 2);
      ctx.fill();

      if (scale > 0.8) {
        ctx.fillStyle = `rgba(139, 92, 246, ${alpha * 0.5})`;
        ctx.beginPath();
        ctx.arc(centerX + node.x, centerY + node.y, r * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    animationFrameId = requestAnimationFrame(renderSphere);
  }

  renderSphere();
}

// --- 13. MODAL CONTROLLERS ---
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('open');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('open');
}

function copyToClipboard(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    const original = btnElement.textContent;
    btnElement.textContent = 'Copied!';
    btnElement.style.color = 'var(--cyan-primary)';
    setTimeout(() => {
      btnElement.textContent = original;
      btnElement.style.color = '';
    }, 2000);
  });
}

// --- 14. THEME TOGGLE (DARK / LIGHT) ---
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  CRYPTERA_STATE.theme = newTheme;
  localStorage.setItem('cryptera_theme', newTheme);

  // Redraw chart with new palette
  drawChart();
}

// --- 15. SMOOTH SCROLL HELPER ---
function scrollToElement(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

// --- 16. DESKTOP CUSTOM CURSOR ---
function initCustomCursor() {
  const dot = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');

  if (!dot || !follower) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.18;
    followerY += (mouseY - followerY) * 0.18;
    follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover state detection
  document.addEventListener('mouseover', e => {
    const target = e.target.closest('a, button, input, select, .crypto-table tr, .ticker-item, .discover-card');
    if (target) {
      document.body.classList.add('cursor-hover');
    } else {
      document.body.classList.remove('cursor-hover');
    }
  });
}

// --- 17. GLOBAL INIT & EVENT BINDINGS ---
document.addEventListener('DOMContentLoaded', () => {
  // Set initial theme
  document.documentElement.setAttribute('data-theme', CRYPTERA_STATE.theme);

  // Sticky Navbar Scroll Listener
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Setup Visuals & Components
  initTickerStrip();
  renderMarketTable();
  initTradingChart();
  renderWatchlist();
  renderOrderbook(67842.31);
  renderOrdersTable();
  updatePortfolioUI();
  renderAlerts();
  initHeroSphereCanvas();
  initCustomCursor();

  // Market Tabs Event Binding
  document.querySelectorAll('.market-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.market-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      CRYPTERA_STATE.marketCategory = btn.dataset.category;
      renderMarketTable();
    });
  });

  // Search input binding
  const searchInput = document.getElementById('marketSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      CRYPTERA_STATE.searchQuery = e.target.value.trim();
      renderMarketTable();
    });
  }

  // Order Type chips binding
  document.querySelectorAll('.order-type-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.order-type-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  // Buy / Sell toggle binding
  const buyBtn = document.getElementById('btnOrderBuy');
  const sellBtn = document.getElementById('btnOrderSell');
  const submitBtn = document.getElementById('orderSubmitBtn');

  if (buyBtn && sellBtn && submitBtn) {
    buyBtn.addEventListener('click', () => {
      buyBtn.className = 'buy-sell-btn active-buy';
      sellBtn.className = 'buy-sell-btn';
      submitBtn.className = 'btn btn-buy';
      const [base] = CRYPTERA_STATE.activePair.split('/');
      submitBtn.textContent = `Buy ${base}`;
    });

    sellBtn.addEventListener('click', () => {
      sellBtn.className = 'buy-sell-btn active-sell';
      buyBtn.className = 'buy-sell-btn';
      submitBtn.className = 'btn btn-sell';
      const [base] = CRYPTERA_STATE.activePair.split('/');
      submitBtn.textContent = `Sell ${base}`;
    });
  }

  // Order inputs binding
  const pInput = document.getElementById('orderPriceInput');
  const aInput = document.getElementById('orderAmountInput');
  if (pInput) pInput.addEventListener('input', updateOrderCalculations);
  if (aInput) aInput.addEventListener('input', updateOrderCalculations);

  // Close modals on click outside
  window.addEventListener('click', e => {
    if (e.target.classList.contains('modal-backdrop')) {
      e.target.classList.remove('open');
    }
  });

  // Simulated live market ticks (volatility pulse)
  setInterval(() => {
    CRYPTO_ASSETS.forEach(asset => {
      const delta = (Math.random() - 0.49) * (asset.price * 0.0006);
      asset.price += delta;
    });

    // Check alerts
    CRYPTERA_STATE.alerts.forEach(alert => {
      const asset = CRYPTO_ASSETS.find(a => a.symbol === alert.asset);
      if (asset) {
        if (alert.condition === 'above' && asset.price >= alert.targetPrice) {
          showToast(`⚡ Alert Triggered: ${alert.asset} has risen above $${alert.targetPrice.toFixed(2)}!`, 'success');
        } else if (alert.condition === 'below' && asset.price <= alert.targetPrice) {
          showToast(`⚡ Alert Triggered: ${alert.asset} has dropped below $${alert.targetPrice.toFixed(2)}!`, 'error');
        }
      }
    });

    // Soft update active pair hero price & orderbook
    const current = CRYPTO_ASSETS.find(a => a.pair === CRYPTERA_STATE.activePair);
    if (current) {
      const heroPrice = document.getElementById('terminalPriceHero');
      if (heroPrice) heroPrice.textContent = formatCurrency(current.price, current.decimals);
      renderOrderbook(current.price);
    }
  }, 4000);
});
