/**
 * VORTEXA - Ultra-Premium Cryptocurrency Exchange Platform
 * Master JavaScript Application Controller
 * Zero-dependency, offline-ready, high-performance architecture
 */

(() => {
  'use strict';

  /* ==========================================================================
     1. State Management & Initial Mock Data
     ========================================================================== */

  const DEFAULT_MARKETS = [
    { symbol: 'BTC', pair: 'BTC/USDT', name: 'Bitcoin', price: 68420.25, change24h: 3.82, high24h: 69120.00, low24h: 66850.10, vol24h: 28491.24, turnover: 1948200150, color: '#f7931a', decimals: 2 },
    { symbol: 'ETH', pair: 'ETH/USDT', name: 'Ethereum', price: 3842.60, change24h: 2.15, high24h: 3910.00, low24h: 3755.40, vol24h: 194520.80, turnover: 747291040, color: '#627eea', decimals: 2 },
    { symbol: 'SOL', pair: 'SOL/USDT', name: 'Solana', price: 178.40, change24h: 6.45, high24h: 184.20, low24h: 165.10, vol24h: 842100.50, turnover: 150230629, color: '#14f195', decimals: 2 },
    { symbol: 'BNB', pair: 'BNB/USDT', name: 'BNB', price: 592.15, change24h: -0.84, high24h: 604.00, low24h: 588.20, vol24h: 74300.20, turnover: 43997163, color: '#f3ba2f', decimals: 2 },
    { symbol: 'XRP', pair: 'XRP/USDT', name: 'XRP', price: 0.6245, change24h: 1.42, high24h: 0.6410, low24h: 0.6080, vol24h: 45100000.00, turnover: 28164950, color: '#23292f', decimals: 4 },
    { symbol: 'AVAX', pair: 'AVAX/USDT', name: 'Avalanche', price: 34.80, change24h: 4.12, high24h: 36.20, low24h: 33.10, vol24h: 512000.00, turnover: 17817600, color: '#e84142', decimals: 2 },
    { symbol: 'ADA', pair: 'ADA/USDT', name: 'Cardano', price: 0.4850, change24h: -1.25, high24h: 0.5020, low24h: 0.4780, vol24h: 32800000.00, turnover: 15908000, color: '#0033ad', decimals: 4 },
    { symbol: 'DOGE', pair: 'DOGE/USDT', name: 'Dogecoin', price: 0.1420, change24h: 8.75, high24h: 0.1550, low24h: 0.1290, vol24h: 182000000.00, turnover: 25844000, color: '#c2a633', decimals: 4 }
  ];

  const DEFAULT_BALANCES = {
    USDT: { total: 25480.00, available: 25480.00, locked: 0.00 },
    BTC:  { total: 0.4500, available: 0.4500, locked: 0.00 },
    ETH:  { total: 2.8000, available: 2.8000, locked: 0.00 },
    SOL:  { total: 18.500, available: 18.500, locked: 0.00 },
    BNB:  { total: 4.2000, available: 4.2000, locked: 0.00 },
    AVAX: { total: 35.000, available: 35.000, locked: 0.00 },
    XRP:  { total: 2400.0, available: 2400.0, locked: 0.00 },
    ADA:  { total: 1500.0, available: 1500.0, locked: 0.00 },
    DOGE: { total: 5000.0, available: 5000.0, locked: 0.00 }
  };

  const DEFAULT_ORDERS = [
    { id: 'ORD-98421', time: '14:22:05', pair: 'BTC/USDT', type: 'Limit', side: 'Buy', price: 67800.00, amount: 0.1500, filled: 0, total: 10170.00, status: 'Open' },
    { id: 'ORD-98319', time: '12:10:44', pair: 'ETH/USDT', type: 'Limit', side: 'Sell', price: 3920.00, amount: 0.8000, filled: 0, total: 3136.00, status: 'Open' },
    { id: 'ORD-98102', time: '09:45:12', pair: 'SOL/USDT', type: 'Market', side: 'Buy', price: 174.50, amount: 5.000, filled: 100, total: 872.50, status: 'Filled' },
    { id: 'ORD-97855', time: 'Yesterday', pair: 'BTC/USDT', type: 'Limit', side: 'Sell', price: 68100.00, amount: 0.2000, filled: 100, total: 13620.00, status: 'Filled' },
    { id: 'ORD-97640', time: 'Yesterday', pair: 'AVAX/USDT', type: 'Limit', side: 'Buy', price: 32.50, amount: 20.00, filled: 0, total: 650.00, status: 'Cancelled' }
  ];

  const DEFAULT_TRANSACTIONS = [
    { txid: '0x7f9a...3b21', type: 'Deposit', asset: 'USDT', amount: 10000.00, fee: 0.00, status: 'Completed', time: 'Today 11:20 UTC' },
    { txid: '0x4c2e...88a1', type: 'Trade', asset: 'SOL', amount: 5.000, fee: 0.87, status: 'Completed', time: 'Today 09:45 UTC' },
    { txid: '0x1b9c...f443', type: 'Withdrawal', asset: 'USDT', amount: 1500.00, fee: 1.00, status: 'Completed', time: 'Yesterday 18:30 UTC' },
    { txid: '0x88ea...92c0', type: 'Deposit', asset: 'ETH', amount: 1.500, fee: 0.00, status: 'Completed', time: 'Sep 09, 2026' }
  ];

  const DEFAULT_ALERTS = [
    { id: 'ALT-1', asset: 'BTC', condition: 'above', targetPrice: 70000.00, note: 'Take profit on swing', status: 'Monitoring', date: 'Today' },
    { id: 'ALT-2', asset: 'SOL', condition: 'above', targetPrice: 190.00, note: 'Breakout watch', status: 'Monitoring', date: 'Yesterday' }
  ];

  const DEFAULT_NOTIFICATIONS = [
    { id: 1, title: 'Welcome to VORTEXA PRO', message: 'Institutional matching engine connected with 4.2ms latency.', time: '10m ago', read: false, type: 'info' },
    { id: 2, title: 'Security Safeguards Active', message: 'KYC Level 2 verified and 2FA hardware simulation operational.', time: '1h ago', read: false, type: 'success' },
    { id: 3, title: 'Market Volatility Alert', message: 'BTC/USDT 24h volume exceeded $1.9 Billion.', time: '3h ago', read: false, type: 'warning' }
  ];

  // Helper to load or persist in localStorage
  function loadStorage(key, fallback) {
    try {
      const item = localStorage.getItem('vortexa_' + key);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function saveStorage(key, val) {
    try {
      localStorage.setItem('vortexa_' + key, JSON.stringify(val));
    } catch (e) {}
  }

  // Application Global Reactive State
  const state = {
    markets: loadStorage('markets', DEFAULT_MARKETS),
    balances: loadStorage('balances', DEFAULT_BALANCES),
    orders: loadStorage('orders', DEFAULT_ORDERS),
    transactions: loadStorage('transactions', DEFAULT_TRANSACTIONS),
    alerts: loadStorage('alerts', DEFAULT_ALERTS),
    notifications: loadStorage('notifications', DEFAULT_NOTIFICATIONS),
    watchlist: new Set(loadStorage('watchlist', ['BTC', 'ETH', 'SOL'])),
    selectedMarket: 'BTC',
    chartTimeframe: '1H',
    chartIndicators: { ma20: true, ma50: true, vol: true },
    orderSide: 'Buy',
    orderType: 'Limit',
    marketFilter: 'all',
    activeView: 'view-landing'
  };

  /* ==========================================================================
     2. Web Audio Synthesizer (Micro-interactions)
     ========================================================================== */
  const audioCtx = window.AudioContext ? new (window.AudioContext || window.webkitAudioContext)() : null;
  function playChirp(freq = 880, duration = 0.08, type = 'sine') {
    if (!audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  /* ==========================================================================
     3. Toast Notification Engine
     ========================================================================== */
  const toastContainer = document.getElementById('toast-container');

  function showToast(title, message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast-item ${type}`;

    let icon = 'ℹ️';
    if (type === 'success') icon = '✓';
    if (type === 'error') icon = '✕';
    if (type === 'warning') icon = '⚠️';

    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-content">
        <div class="toast-title">${escapeHTML(title)}</div>
        <div class="toast-message">${escapeHTML(message)}</div>
      </div>
      <button type="button" class="toast-close" title="Close">&times;</button>
    `;

    toast.querySelector('.toast-close').addEventListener('click', () => removeToast(toast));
    toastContainer.appendChild(toast);
    playChirp(type === 'error' ? 220 : type === 'success' ? 960 : 640);

    setTimeout(() => {
      removeToast(toast);
    }, 4200);
  }

  function removeToast(toast) {
    if (!toast || toast.classList.contains('removing')) return;
    toast.classList.add('removing');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 250);
  }

  function escapeHTML(str) {
    return String(str).replace(/[&<>'"]/g, tag => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag] || tag));
  }

  /* ==========================================================================
     4. Navigation & View Switcher
     ========================================================================== */
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-item, .footer-nav-link');
  const allViews = document.querySelectorAll('.app-view');

  function switchView(viewId) {
    const target = document.getElementById(viewId);
    if (!target) return;

    allViews.forEach(v => v.classList.remove('active'));
    target.classList.add('active');
    state.activeView = viewId;

    // Update active nav links
    navLinks.forEach(link => {
      if (link.getAttribute('data-view') === viewId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Refresh views if needed
    if (viewId === 'view-trade') {
      resizeAndRenderChart();
      renderOrderBook();
      renderTerminalOrders();
    } else if (viewId === 'view-portfolio') {
      renderPortfolio();
    } else if (viewId === 'view-wallet') {
      renderWallet();
    } else if (viewId === 'view-markets') {
      renderMarketsTable();
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = link.getAttribute('data-view');
      if (targetView) switchView(targetView);
    });
  });

  // Home logo click
  document.getElementById('brand-home-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    switchView('view-landing');
  });

  // Hero CTAs
  document.getElementById('hero-start-trading-btn')?.addEventListener('click', () => switchView('view-trade'));
  document.getElementById('hero-explore-markets-btn')?.addEventListener('click', () => switchView('view-markets'));
  document.getElementById('hero-quick-deposit-btn')?.addEventListener('click', () => openModal('modal-deposit'));

  /* ==========================================================================
     5. Real-Time Market Simulation Engine
     ========================================================================== */
  function startMarketTickEngine() {
    setInterval(() => {
      // Pick a random market to fluctuate realistically
      const idx = Math.floor(Math.random() * state.markets.length);
      const m = state.markets[idx];

      // Stochastic micro fluctuation between -0.3% and +0.3%
      const pctDelta = (Math.random() - 0.49) * 0.005;
      const oldPrice = m.price;
      m.price = Number((m.price * (1 + pctDelta)).toFixed(m.decimals));

      // 24h stats update
      if (m.price > m.high24h) m.high24h = m.price;
      if (m.price < m.low24h) m.low24h = m.price;
      m.change24h = Number((m.change24h + (pctDelta * 40)).toFixed(2));
      m.vol24h = Number((m.vol24h + (Math.random() * 2)).toFixed(2));

      // If this is the active market in the trading terminal, update terminal headers
      if (m.symbol === state.selectedMarket) {
        updateTerminalHeader(m, oldPrice);
        pushRecentTrade(m);
        renderOrderBook();
        updateChartLiveCandle(m.price);
      }

      // Check user Price Alerts
      checkPriceAlerts(m);

      // Refresh ticker ribbon
      renderTickerRibbon();
    }, 1800);
  }

  function updateTerminalHeader(m, oldPrice) {
    const priceEl = document.getElementById('terminal-last-price');
    const changeEl = document.getElementById('terminal-24h-change');
    const highEl = document.getElementById('terminal-24h-high');
    const lowEl = document.getElementById('terminal-24h-low');
    const volEl = document.getElementById('terminal-24h-vol');

    if (!priceEl) return;

    priceEl.textContent = `$${m.price.toLocaleString(undefined, { minimumFractionDigits: m.decimals })}`;
    priceEl.className = 'pair-last-price ' + (m.price >= oldPrice ? 'text-buy' : 'text-sell');

    changeEl.textContent = `${m.change24h >= 0 ? '+' : ''}${m.change24h}%`;
    changeEl.className = 'pair-stat-value ' + (m.change24h >= 0 ? 'text-buy' : 'text-sell');

    highEl.textContent = `$${m.high24h.toLocaleString(undefined, { minimumFractionDigits: m.decimals })}`;
    lowEl.textContent = `$${m.low24h.toLocaleString(undefined, { minimumFractionDigits: m.decimals })}`;
    volEl.textContent = `${m.vol24h.toLocaleString()} ${m.symbol}`;

    // Update Mid price in orderbook
    const midEl = document.getElementById('ob-mid-price');
    if (midEl) {
      midEl.textContent = `$${m.price.toLocaleString(undefined, { minimumFractionDigits: m.decimals })}`;
      midEl.className = m.change24h >= 0 ? 'text-buy' : 'text-sell';
    }
  }

  function checkPriceAlerts(market) {
    state.alerts.forEach(alert => {
      if (alert.asset === market.symbol && alert.status === 'Monitoring') {
        let triggered = false;
        if (alert.condition === 'above' && market.price >= alert.targetPrice) {
          triggered = true;
        } else if (alert.condition === 'below' && market.price <= alert.targetPrice) {
          triggered = true;
        }

        if (triggered) {
          alert.status = 'Triggered';
          saveStorage('alerts', state.alerts);
          showToast(`Price Alert Triggered: ${market.symbol}`, `${market.symbol} hit $${market.price.toLocaleString()} (${alert.condition} $${alert.targetPrice})`, 'warning');
          addNotification(`Alert Triggered: ${market.symbol}`, `Target of $${alert.targetPrice} hit at $${market.price}.`, 'warning');
          renderAlerts();
        }
      }
    });
  }

  /* ==========================================================================
     6. Ticker Ribbon & Hero Preview Cards
     ========================================================================== */
  function renderTickerRibbon() {
    const track = document.getElementById('ticker-track');
    if (!track) return;

    // Render twice for infinite loop
    let html = '';
    const doubleMarkets = [...state.markets, ...state.markets];
    doubleMarkets.forEach(m => {
      const isUp = m.change24h >= 0;
      html += `
        <div class="ticker-item" data-symbol="${m.symbol}">
          <span class="ticker-symbol">${m.pair}</span>
          <span class="ticker-price">$${m.price.toLocaleString(undefined, { minimumFractionDigits: m.decimals })}</span>
          <span class="ticker-change ${isUp ? 'text-buy' : 'text-sell'}">${isUp ? '+' : ''}${m.change24h}%</span>
        </div>
      `;
    });
    track.innerHTML = html;

    track.querySelectorAll('.ticker-item').forEach(item => {
      item.addEventListener('click', () => {
        selectMarket(item.getAttribute('data-symbol'));
        switchView('view-trade');
      });
    });
  }

  function renderHeroPreviewCards() {
    const container = document.getElementById('hero-preview-cards');
    if (!container) return;

    const featured = state.markets.slice(0, 3);
    container.innerHTML = featured.map(m => `
      <div class="preview-coin-card" data-symbol="${m.symbol}">
        <div class="preview-coin-header">
          <div class="preview-coin-info">
            <div class="coin-icon-badge" style="background:${m.color}">${m.symbol.slice(0,1)}</div>
            <div>
              <div class="preview-coin-name">${m.name}</div>
              <div class="preview-coin-symbol">${m.pair}</div>
            </div>
          </div>
          <span class="change-pill ${m.change24h >= 0 ? 'up' : 'down'}">
            ${m.change24h >= 0 ? '↑' : '↓'} ${Math.abs(m.change24h)}%
          </span>
        </div>
        <div class="preview-coin-price">$${m.price.toLocaleString(undefined, { minimumFractionDigits: m.decimals })}</div>
        <canvas class="sparkline-canvas" id="sparkline-hero-${m.symbol}" width="280" height="48"></canvas>
      </div>
    `).join('');

    featured.forEach(m => {
      drawSparkline(`sparkline-hero-${m.symbol}`, m.change24h >= 0);
    });

    container.querySelectorAll('.preview-coin-card').forEach(card => {
      card.addEventListener('click', () => {
        selectMarket(card.getAttribute('data-symbol'));
        switchView('view-trade');
      });
    });
  }

  function drawSparkline(canvasId, isUp) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = isUp ? '#10b981' : '#f43f5e';

    const points = [];
    let y = h / 2;
    for (let x = 0; x < w; x += 14) {
      y += (Math.random() - 0.48) * 9;
      y = Math.max(4, Math.min(h - 4, y));
      points.push({ x, y });
    }
    points.push({ x: w, y: isUp ? 6 : h - 6 });

    points.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();

    // Gradient fill below sparkline
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, isUp ? 'rgba(16, 185, 129, 0.25)' : 'rgba(244, 63, 94, 0.25)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fill();
  }

  /* ==========================================================================
     7. Markets Directory
     ========================================================================== */
  function renderMarketsTable() {
    const tbody = document.getElementById('markets-table-body');
    if (!tbody) return;

    const query = (document.getElementById('market-search-input')?.value || '').toLowerCase().trim();
    let list = [...state.markets];

    // Filter by tab
    if (state.marketFilter === 'gainers') {
      list = list.filter(m => m.change24h > 0).sort((a, b) => b.change24h - a.change24h);
    } else if (state.marketFilter === 'losers') {
      list = list.filter(m => m.change24h < 0).sort((a, b) => a.change24h - b.change24h);
    } else if (state.marketFilter === 'volume') {
      list = list.sort((a, b) => b.turnover - a.turnover);
    } else if (state.marketFilter === 'watchlist') {
      list = list.filter(m => state.watchlist.has(m.symbol));
    }

    // Search query
    if (query) {
      list = list.filter(m => m.name.toLowerCase().includes(query) || m.symbol.toLowerCase().includes(query) || m.pair.toLowerCase().includes(query));
    }

    // Update watchlist counter in tab
    const wlCount = document.getElementById('watchlist-count');
    if (wlCount) wlCount.textContent = state.watchlist.size;

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:3rem; color:var(--text-muted);">No cryptocurrency markets match your filter.</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(m => {
      const isStarred = state.watchlist.has(m.symbol);
      const isUp = m.change24h >= 0;
      return `
        <tr>
          <td>
            <button type="button" class="star-btn ${isStarred ? 'starred' : ''}" data-symbol="${m.symbol}" title="Add to Watchlist">
              ${isStarred ? '★' : '☆'}
            </button>
          </td>
          <td>
            <div class="coin-cell">
              <div class="coin-icon-badge" style="background:${m.color}; width:28px; height:28px; font-size:0.75rem;">${m.symbol.slice(0,1)}</div>
              <div>
                <span class="coin-symbol-bold">${m.symbol}</span>
                <span class="text-muted" style="font-size:0.75rem;"> / USDT</span>
                <div class="text-muted" style="font-size:0.72rem;">${m.name}</div>
              </div>
            </div>
          </td>
          <td class="mono font-weight-bold">$${m.price.toLocaleString(undefined, { minimumFractionDigits: m.decimals })}</td>
          <td>
            <span class="change-pill ${isUp ? 'up' : 'down'}">
              ${isUp ? '+' : ''}${m.change24h}%
            </span>
          </td>
          <td class="mono text-secondary">$${m.high24h.toLocaleString(undefined, { minimumFractionDigits: m.decimals })}</td>
          <td class="mono text-secondary">$${m.low24h.toLocaleString(undefined, { minimumFractionDigits: m.decimals })}</td>
          <td class="mono text-secondary">$${(m.turnover / 1e6).toFixed(2)}M</td>
          <td>
            <canvas id="table-spark-${m.symbol}" width="120" height="32" style="display:block;"></canvas>
          </td>
          <td style="text-align:right;">
            <button type="button" class="btn btn-sm btn-primary market-trade-btn" data-symbol="${m.symbol}">Trade</button>
          </td>
        </tr>
      `;
    }).join('');

    // Draw sparklines for table rows
    list.forEach(m => {
      drawSparkline(`table-spark-${m.symbol}`, m.change24h >= 0);
    });

    // Attach trade button listeners
    tbody.querySelectorAll('.market-trade-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectMarket(btn.getAttribute('data-symbol'));
        switchView('view-trade');
      });
    });

    // Attach star toggle listeners
    tbody.querySelectorAll('.star-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const symbol = btn.getAttribute('data-symbol');
        if (state.watchlist.has(symbol)) {
          state.watchlist.delete(symbol);
          btn.classList.remove('starred');
          btn.textContent = '☆';
          showToast('Watchlist Updated', `Removed ${symbol} from watchlist.`);
        } else {
          state.watchlist.add(symbol);
          btn.classList.add('starred');
          btn.textContent = '★';
          showToast('Watchlist Updated', `Added ${symbol} to watchlist.`, 'success');
        }
        saveStorage('watchlist', Array.from(state.watchlist));
        renderMarketsTable();
        renderDrawerMarketsList();
      });
    });
  }

  // Filter tab buttons
  document.querySelectorAll('.market-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.market-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.marketFilter = btn.getAttribute('data-filter');
      renderMarketsTable();
    });
  });

  // Search input
  document.getElementById('market-search-input')?.addEventListener('input', () => {
    renderMarketsTable();
  });

  /* ==========================================================================
     8. Spot Trading Terminal Engine & Canvas Chart
     ========================================================================== */
  let chartCandles = [];
  let chartHoverIndex = -1;

  function selectMarket(symbol) {
    const m = state.markets.find(x => x.symbol === symbol);
    if (!m) return;
    state.selectedMarket = symbol;

    // Update Terminal Header
    document.getElementById('terminal-pair-name').textContent = m.pair;
    const iconBadge = document.getElementById('terminal-pair-icon');
    if (iconBadge) {
      iconBadge.textContent = m.symbol.slice(0,1);
      iconBadge.style.background = m.color;
    }
    updateTerminalHeader(m, m.price);

    // Update Buy/Sell input units
    const baseUnit = document.getElementById('trade-base-unit');
    const addon = document.getElementById('trade-amount-addon');
    const submitBtn = document.getElementById('trade-submit-btn');
    if (baseUnit) baseUnit.textContent = m.symbol;
    if (addon) addon.textContent = m.symbol;
    if (submitBtn) submitBtn.textContent = `${state.orderSide} ${m.symbol}`;

    // Set default limit price
    const priceInput = document.getElementById('trade-price-input');
    if (priceInput) priceInput.value = m.price;

    updateAvailableBalanceDisplay();
    generateChartCandles();
    resizeAndRenderChart();
    renderOrderBook();
    renderDrawerMarketsList();
  }

  // Generate realistic OHLCV historical dataset
  function generateChartCandles() {
    const m = state.markets.find(x => x.symbol === state.selectedMarket) || state.markets[0];
    const barsCount = 65;
    chartCandles = [];

    let current = m.price * 0.94;
    const now = Date.now();
    const intervalMs = { '1m': 60000, '5m': 300000, '15m': 900000, '1H': 3600000, '4H': 14400000, '1D': 86400000, '1W': 604800000 }[state.chartTimeframe] || 3600000;

    for (let i = barsCount; i >= 0; i--) {
      const time = new Date(now - i * intervalMs);
      const volatility = current * 0.012;
      const open = current;
      const delta = (Math.random() - 0.48) * volatility;
      const close = Number((open + delta).toFixed(m.decimals));
      const high = Number((Math.max(open, close) + Math.random() * volatility * 0.6).toFixed(m.decimals));
      const low = Number((Math.min(open, close) - Math.random() * volatility * 0.6).toFixed(m.decimals));
      const volume = Math.floor(Math.random() * 800) + 120;

      chartCandles.push({ time, open, high, low, close, volume });
      current = close;
    }

    // Set last close to exact current price
    chartCandles[chartCandles.length - 1].close = m.price;
  }

  function updateChartLiveCandle(newPrice) {
    if (chartCandles.length === 0) return;
    const last = chartCandles[chartCandles.length - 1];
    last.close = newPrice;
    if (newPrice > last.high) last.high = newPrice;
    if (newPrice < last.low) last.low = newPrice;
    renderCandlestickChart();
  }

  // HTML5 High-DPI Canvas Candlestick Renderer
  const chartCanvas = document.getElementById('candlestick-chart');
  const chartContainer = document.getElementById('chart-container');

  function resizeAndRenderChart() {
    if (!chartCanvas || !chartContainer) return;
    const rect = chartContainer.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const dpr = window.devicePixelRatio || 1;
    chartCanvas.width = rect.width * dpr;
    chartCanvas.height = rect.height * dpr;
    chartCanvas.style.width = rect.width + 'px';
    chartCanvas.style.height = rect.height + 'px';

    renderCandlestickChart();
  }

  function renderCandlestickChart() {
    if (!chartCanvas) return;
    const ctx = chartCanvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = chartCanvas.width;
    const h = chartCanvas.height;

    ctx.clearRect(0, 0, w, h);
    if (chartCandles.length < 2) return;

    // Layout margins
    const marginRight = 75 * dpr;
    const marginBottom = 28 * dpr;
    const chartW = w - marginRight;
    const chartH = h - marginBottom;
    const volHeight = chartH * 0.22;
    const priceH = chartH - volHeight - (10 * dpr);

    // Min & Max Calculations
    let minPrice = Infinity;
    let maxPrice = -Infinity;
    let maxVol = 0;

    chartCandles.forEach(c => {
      if (c.low < minPrice) minPrice = c.low;
      if (c.high > maxPrice) maxPrice = c.high;
      if (c.volume > maxVol) maxVol = c.volume;
    });

    const pricePadding = (maxPrice - minPrice) * 0.08;
    minPrice -= pricePadding;
    maxPrice += pricePadding;
    const priceRange = maxPrice - minPrice || 1;

    // Price to Y Coordinate Mapper
    function priceToY(p) {
      return priceH - ((p - minPrice) / priceRange) * priceH + (10 * dpr);
    }

    // Grid Lines & Price Axis Labels
    ctx.lineWidth = 1 * dpr;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillStyle = '#64748b';
    ctx.font = `${11 * dpr}px 'JetBrains Mono', monospace`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    const priceSteps = 6;
    for (let i = 0; i <= priceSteps; i++) {
      const p = minPrice + (priceRange / priceSteps) * i;
      const y = priceToY(p);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(chartW, y);
      ctx.stroke();

      ctx.fillText('$' + p.toFixed(2), chartW + (8 * dpr), y);
    }

    // Bar Geometry
    const n = chartCandles.length;
    const barSpacing = chartW / n;
    const candleW = Math.max(3 * dpr, barSpacing * 0.65);

    // Moving Averages calculation
    function calculateMA(period) {
      const ma = [];
      for (let i = 0; i < n; i++) {
        if (i < period - 1) {
          ma.push(null);
        } else {
          let sum = 0;
          for (let j = 0; j < period; j++) sum += chartCandles[i - j].close;
          ma.push(sum / period);
        }
      }
      return ma;
    }

    // Draw Volume Bars
    if (state.chartIndicators.vol) {
      chartCandles.forEach((c, i) => {
        const x = i * barSpacing + barSpacing / 2;
        const vH = (c.volume / (maxVol || 1)) * volHeight;
        const y = chartH - vH;
        ctx.fillStyle = c.close >= c.open ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)';
        ctx.fillRect(x - candleW / 2, y, candleW, vH);
      });
    }

    // Draw Candlesticks (Wicks + Bodies)
    chartCandles.forEach((c, i) => {
      const x = i * barSpacing + barSpacing / 2;
      const openY = priceToY(c.open);
      const closeY = priceToY(c.close);
      const highY = priceToY(c.high);
      const lowY = priceToY(c.low);
      const isBull = c.close >= c.open;

      ctx.strokeStyle = isBull ? '#10b981' : '#f43f5e';
      ctx.fillStyle = isBull ? '#10b981' : '#f43f5e';

      // Wick
      ctx.beginPath();
      ctx.moveTo(x, highY);
      ctx.lineTo(x, lowY);
      ctx.stroke();

      // Body
      const bodyTop = Math.min(openY, closeY);
      const bodyHeight = Math.max(1.5 * dpr, Math.abs(closeY - openY));
      ctx.fillRect(x - candleW / 2, bodyTop, candleW, bodyHeight);
    });

    // Moving Average Lines (MA 20: Cyan, MA 50: Violet)
    function drawMALine(maArr, strokeColor) {
      ctx.beginPath();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1.5 * dpr;
      let started = false;
      maArr.forEach((val, i) => {
        if (val !== null) {
          const x = i * barSpacing + barSpacing / 2;
          const y = priceToY(val);
          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
        }
      });
      ctx.stroke();
    }

    if (state.chartIndicators.ma20) drawMALine(calculateMA(20), '#06b6d4');
    if (state.chartIndicators.ma50) drawMALine(calculateMA(50), '#a78bfa');

    // Crosshair & Hover Tooltip
    if (chartHoverIndex >= 0 && chartHoverIndex < n) {
      const hc = chartCandles[chartHoverIndex];
      const hx = chartHoverIndex * barSpacing + barSpacing / 2;
      const hy = priceToY(hc.close);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.setLineDash([4 * dpr, 4 * dpr]);
      ctx.lineWidth = 1 * dpr;

      // Vertical line
      ctx.beginPath();
      ctx.moveTo(hx, 0);
      ctx.lineTo(hx, chartH);
      ctx.stroke();

      // Horizontal line
      ctx.beginPath();
      ctx.moveTo(0, hy);
      ctx.lineTo(chartW, hy);
      ctx.stroke();
      ctx.setLineDash([]);

      // Highlight badge on price axis
      ctx.fillStyle = '#7952fc';
      ctx.fillRect(chartW, hy - (10 * dpr), marginRight, 20 * dpr);
      ctx.fillStyle = '#ffffff';
      ctx.fillText('$' + hc.close.toFixed(2), chartW + (6 * dpr), hy);

      // Update OHLCV overlay values
      document.getElementById('chart-tip-o').textContent = '$' + hc.open.toFixed(2);
      document.getElementById('chart-tip-h').textContent = '$' + hc.high.toFixed(2);
      document.getElementById('chart-tip-l').textContent = '$' + hc.low.toFixed(2);
      document.getElementById('chart-tip-c').textContent = '$' + hc.close.toFixed(2);
      document.getElementById('chart-tip-v').textContent = hc.volume;
    }
  }

  // Crosshair Mouse Move
  chartCanvas?.addEventListener('mousemove', (e) => {
    const rect = chartCanvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (window.devicePixelRatio || 1);
    const dpr = window.devicePixelRatio || 1;
    const chartW = chartCanvas.width - (75 * dpr);
    const barSpacing = chartW / (chartCandles.length || 1);

    chartHoverIndex = Math.floor(x / barSpacing);
    if (chartHoverIndex < 0) chartHoverIndex = 0;
    if (chartHoverIndex >= chartCandles.length) chartHoverIndex = chartCandles.length - 1;
    renderCandlestickChart();
  });

  chartCanvas?.addEventListener('mouseleave', () => {
    chartHoverIndex = -1;
    renderCandlestickChart();
  });

  window.addEventListener('resize', () => {
    if (state.activeView === 'view-trade') resizeAndRenderChart();
  });

  // Timeframe Buttons
  document.querySelectorAll('#chart-tf-buttons .tf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#chart-tf-buttons .tf-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.chartTimeframe = btn.getAttribute('data-tf');
      generateChartCandles();
      renderCandlestickChart();
    });
  });

  // Indicator Toggles
  document.getElementById('toggle-ma20')?.addEventListener('click', function() {
    this.classList.toggle('active');
    state.chartIndicators.ma20 = this.classList.contains('active');
    renderCandlestickChart();
  });
  document.getElementById('toggle-ma50')?.addEventListener('click', function() {
    this.classList.toggle('active');
    state.chartIndicators.ma50 = this.classList.contains('active');
    renderCandlestickChart();
  });
  document.getElementById('toggle-vol')?.addEventListener('click', function() {
    this.classList.toggle('active');
    state.chartIndicators.vol = this.classList.contains('active');
    renderCandlestickChart();
  });

  /* ==========================================================================
     9. Terminal Left Drawer: Market Pairs
     ========================================================================== */
  function renderDrawerMarketsList() {
    const list = document.getElementById('term-markets-list');
    if (!list) return;

    list.innerHTML = state.markets.map(m => {
      const isSelected = m.symbol === state.selectedMarket;
      const isUp = m.change24h >= 0;
      return `
        <div class="market-item-row ${isSelected ? 'active' : ''}" data-symbol="${m.symbol}">
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="font-weight:700;">${m.symbol}</span>
            <span class="text-muted" style="font-size:0.7rem;">/USDT</span>
          </div>
          <div style="text-align:right;">
            <div class="mono" style="font-weight:600;">$${m.price.toLocaleString(undefined, { minimumFractionDigits: m.decimals })}</div>
            <div class="${isUp ? 'text-buy' : 'text-sell'}" style="font-size:0.7rem;">${isUp ? '+' : ''}${m.change24h}%</div>
          </div>
        </div>
      `;
    }).join('');

    list.querySelectorAll('.market-item-row').forEach(row => {
      row.addEventListener('click', () => {
        selectMarket(row.getAttribute('data-symbol'));
      });
    });
  }

  /* ==========================================================================
     10. Order Book & Recent Trades
     ========================================================================== */
  function renderOrderBook() {
    const m = state.markets.find(x => x.symbol === state.selectedMarket) || state.markets[0];
    const asksList = document.getElementById('ob-asks-list');
    const bidsList = document.getElementById('ob-bids-list');
    if (!asksList || !bidsList) return;

    const rowsCount = 7;
    let asks = [];
    let bids = [];

    let cumAsk = 0;
    for (let i = rowsCount; i >= 1; i--) {
      const price = Number((m.price * (1 + (i * 0.0007))).toFixed(m.decimals));
      const amount = Number((Math.random() * 1.8 + 0.1).toFixed(3));
      cumAsk += amount;
      asks.push({ price, amount, total: cumAsk });
    }

    let cumBid = 0;
    for (let i = 1; i <= rowsCount; i++) {
      const price = Number((m.price * (1 - (i * 0.0007))).toFixed(m.decimals));
      const amount = Number((Math.random() * 2.2 + 0.1).toFixed(3));
      cumBid += amount;
      bids.push({ price, amount, total: cumBid });
    }

    const maxTotal = Math.max(cumAsk, cumBid);

    asksList.innerHTML = asks.map(row => {
      const depthPct = Math.min(100, Math.round((row.total / maxTotal) * 100));
      return `
        <div class="ob-row" data-price="${row.price}">
          <div class="ob-depth-bar ask" style="width: ${depthPct}%;"></div>
          <span class="text-sell">$${row.price.toLocaleString(undefined, { minimumFractionDigits: m.decimals })}</span>
          <span style="text-align:right;">${row.amount}</span>
          <span style="text-align:right;" class="text-secondary">${row.total.toFixed(2)}</span>
        </div>
      `;
    }).join('');

    bidsList.innerHTML = bids.map(row => {
      const depthPct = Math.min(100, Math.round((row.total / maxTotal) * 100));
      return `
        <div class="ob-row" data-price="${row.price}">
          <div class="ob-depth-bar bid" style="width: ${depthPct}%;"></div>
          <span class="text-buy">$${row.price.toLocaleString(undefined, { minimumFractionDigits: m.decimals })}</span>
          <span style="text-align:right;">${row.amount}</span>
          <span style="text-align:right;" class="text-secondary">${row.total.toFixed(2)}</span>
        </div>
      `;
    }).join('');

    // Click on any orderbook row auto-fills the price input in the Buy/Sell panel!
    document.querySelectorAll('.ob-row').forEach(r => {
      r.addEventListener('click', () => {
        const p = r.getAttribute('data-price');
        const priceInput = document.getElementById('trade-price-input');
        if (priceInput) {
          priceInput.value = p;
          calculateTradeTotals();
          showToast('Price Selected', `Limit price set to $${p}`);
        }
      });
    });

    // Update Spread
    const spreadVal = document.getElementById('ob-spread-val');
    if (spreadVal && asks.length > 0 && bids.length > 0) {
      const spread = (asks[asks.length - 1].price - bids[0].price).toFixed(2);
      spreadVal.textContent = `$${spread}`;
    }
  }

  function pushRecentTrade(m) {
    const list = document.getElementById('recent-trades-list');
    if (!list) return;

    const isBuy = Math.random() > 0.45;
    const amount = (Math.random() * 1.5 + 0.05).toFixed(3);
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];

    const row = document.createElement('div');
    row.className = 'ob-row';
    row.innerHTML = `
      <span class="text-muted">${timeStr}</span>
      <span class="${isBuy ? 'text-buy' : 'text-sell'}" style="text-align:right;">$${m.price.toFixed(m.decimals)}</span>
      <span style="text-align:right;">${amount}</span>
    `;

    list.insertBefore(row, list.firstChild);
    while (list.children.length > 18) {
      list.removeChild(list.lastChild);
    }
  }

  // Rightside Tab Switcher (Order Book vs Recent Trades)
  document.querySelectorAll('.rightside-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.rightside-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.getAttribute('data-tab');
      if (tab === 'orderbook') {
        document.getElementById('orderbook-container').style.display = 'flex';
        document.getElementById('recent-trades-container').style.display = 'none';
      } else {
        document.getElementById('orderbook-container').style.display = 'none';
        document.getElementById('recent-trades-container').style.display = 'flex';
      }
    });
  });

  /* ==========================================================================
     11. Buy / Sell Trade Execution Panel
     ========================================================================== */
  const priceInput = document.getElementById('trade-price-input');
  const amountInput = document.getElementById('trade-amount-input');
  const calcOrderVal = document.getElementById('calc-order-val');
  const calcOrderFee = document.getElementById('calc-order-fee');
  const calcOrderTotal = document.getElementById('calc-order-total');
  const submitTradeBtn = document.getElementById('trade-submit-btn');

  function updateAvailableBalanceDisplay() {
    const availBalEl = document.getElementById('trade-avail-bal');
    if (!availBalEl) return;

    if (state.orderSide === 'Buy') {
      const usdt = state.balances.USDT ? state.balances.USDT.available : 0;
      availBalEl.textContent = `${usdt.toLocaleString(undefined, { minimumFractionDigits: 2 })} USDT`;
    } else {
      const bal = state.balances[state.selectedMarket] ? state.balances[state.selectedMarket].available : 0;
      availBalEl.textContent = `${bal.toLocaleString()} ${state.selectedMarket}`;
    }
  }

  function calculateTradeTotals() {
    const p = parseFloat(priceInput?.value) || 0;
    const a = parseFloat(amountInput?.value) || 0;
    const value = p * a;
    const fee = value * 0.001; // 0.1% spot fee
    const total = state.orderSide === 'Buy' ? value + fee : value - fee;

    if (calcOrderVal) calcOrderVal.textContent = `${value.toFixed(2)} USDT`;
    if (calcOrderFee) calcOrderFee.textContent = `${fee.toFixed(2)} USDT`;
    if (calcOrderTotal) calcOrderTotal.textContent = `${Math.max(0, total).toFixed(2)} USDT`;
  }

  priceInput?.addEventListener('input', calculateTradeTotals);
  amountInput?.addEventListener('input', calculateTradeTotals);

  // Side Toggle: Buy vs Sell
  const buySideBtn = document.getElementById('trade-side-buy');
  const sellSideBtn = document.getElementById('trade-side-sell');

  buySideBtn?.addEventListener('click', () => {
    state.orderSide = 'Buy';
    buySideBtn.className = 'side-btn active-buy';
    sellSideBtn.className = 'side-btn';
    submitTradeBtn.className = 'btn btn-buy trade-submit-btn';
    submitTradeBtn.textContent = `Buy ${state.selectedMarket}`;
    updateAvailableBalanceDisplay();
    calculateTradeTotals();
  });

  sellSideBtn?.addEventListener('click', () => {
    state.orderSide = 'Sell';
    sellSideBtn.className = 'side-btn active-sell';
    buySideBtn.className = 'side-btn';
    submitTradeBtn.className = 'btn btn-sell trade-submit-btn';
    submitTradeBtn.textContent = `Sell ${state.selectedMarket}`;
    updateAvailableBalanceDisplay();
    calculateTradeTotals();
  });

  // Order Type: Limit vs Market
  const limitTypeBtn = document.getElementById('order-type-limit');
  const marketTypeBtn = document.getElementById('order-type-market');

  limitTypeBtn?.addEventListener('click', () => {
    state.orderType = 'Limit';
    limitTypeBtn.classList.add('active');
    marketTypeBtn.classList.remove('active');
    if (priceInput) priceInput.disabled = false;
    calculateTradeTotals();
  });

  marketTypeBtn?.addEventListener('click', () => {
    state.orderType = 'Market';
    marketTypeBtn.classList.add('active');
    limitTypeBtn.classList.remove('active');
    const m = state.markets.find(x => x.symbol === state.selectedMarket);
    if (priceInput && m) {
      priceInput.value = m.price;
      priceInput.disabled = true;
    }
    calculateTradeTotals();
  });

  // Percentage Quick Selectors (25%, 50%, 75%, 100%)
  document.querySelectorAll('.pct-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pct = parseFloat(btn.getAttribute('data-pct')) / 100;
      const m = state.markets.find(x => x.symbol === state.selectedMarket) || state.markets[0];
      const p = parseFloat(priceInput.value) || m.price;

      if (state.orderSide === 'Buy') {
        const usdtAvail = state.balances.USDT ? state.balances.USDT.available : 0;
        const targetValue = (usdtAvail * pct) / 1.001; // deduct fee
        const amount = targetValue / p;
        amountInput.value = Math.max(0, amount).toFixed(4);
      } else {
        const assetAvail = state.balances[state.selectedMarket] ? state.balances[state.selectedMarket].available : 0;
        const amount = assetAvail * pct;
        amountInput.value = Math.max(0, amount).toFixed(4);
      }
      calculateTradeTotals();
    });
  });

  // Order Execution Submit
  submitTradeBtn?.addEventListener('click', () => {
    const p = parseFloat(priceInput.value);
    const a = parseFloat(amountInput.value);

    if (!p || p <= 0) {
      showToast('Validation Error', 'Please enter a valid price.', 'error');
      return;
    }
    if (!a || a <= 0) {
      showToast('Validation Error', 'Please enter a valid order amount.', 'error');
      return;
    }

    const value = p * a;
    const fee = value * 0.001;
    const total = value + fee;

    // Balance Verification
    if (state.orderSide === 'Buy') {
      const usdt = state.balances.USDT ? state.balances.USDT.available : 0;
      if (total > usdt) {
        showToast('Insufficient USDT Balance', `Order requires $${total.toFixed(2)} USDT, but you only have $${usdt.toFixed(2)}.`, 'error');
        return;
      }
      // Deduct balance
      state.balances.USDT.available = Number((state.balances.USDT.available - total).toFixed(2));
      state.balances.USDT.total = Number((state.balances.USDT.total - total).toFixed(2));
    } else {
      const asset = state.balances[state.selectedMarket] ? state.balances[state.selectedMarket].available : 0;
      if (a > asset) {
        showToast(`Insufficient ${state.selectedMarket} Balance`, `You only have ${asset} ${state.selectedMarket} available to sell.`, 'error');
        return;
      }
      // Deduct balance
      state.balances[state.selectedMarket].available = Number((state.balances[state.selectedMarket].available - a).toFixed(4));
      state.balances[state.selectedMarket].total = Number((state.balances[state.selectedMarket].total - a).toFixed(4));
    }

    const orderId = 'ORD-' + Math.floor(10000 + Math.random() * 90000);
    const timeStr = new Date().toTimeString().split(' ')[0];

    // If Market Order: Executes Immediately
    if (state.orderType === 'Market') {
      if (state.orderSide === 'Buy') {
        if (!state.balances[state.selectedMarket]) {
          state.balances[state.selectedMarket] = { total: 0, available: 0, locked: 0 };
        }
        state.balances[state.selectedMarket].available += a;
        state.balances[state.selectedMarket].total += a;
      } else {
        state.balances.USDT.available += (value - fee);
        state.balances.USDT.total += (value - fee);
      }

      state.orders.unshift({
        id: orderId,
        time: timeStr,
        pair: `${state.selectedMarket}/USDT`,
        type: 'Market',
        side: state.orderSide,
        price: p,
        amount: a,
        filled: 100,
        total: Number(value.toFixed(2)),
        status: 'Filled'
      });

      state.transactions.unshift({
        txid: '0x' + Math.random().toString(16).substring(2, 10),
        type: 'Trade',
        asset: state.selectedMarket,
        amount: a,
        fee: Number(fee.toFixed(2)),
        status: 'Completed',
        time: 'Just now'
      });

      showToast('Order Filled (Market)', `Executed ${state.orderSide} ${a} ${state.selectedMarket} @ $${p.toLocaleString()}`, 'success');
      addNotification('Trade Executed', `Market ${state.orderSide} for ${a} ${state.selectedMarket} was filled at $${p.toFixed(2)}.`, 'success');
    } else {
      // Limit Order placed in Open Orders
      state.orders.unshift({
        id: orderId,
        time: timeStr,
        pair: `${state.selectedMarket}/USDT`,
        type: 'Limit',
        side: state.orderSide,
        price: p,
        amount: a,
        filled: 0,
        total: Number(value.toFixed(2)),
        status: 'Open'
      });

      showToast('Limit Order Placed', `Order ${orderId} added to order book.`, 'success');
      addNotification('Order Placed', `Limit ${state.orderSide} placed for ${a} ${state.selectedMarket} at $${p.toFixed(2)}.`, 'info');
    }

    // Persist & Update UI
    saveStorage('balances', state.balances);
    saveStorage('orders', state.orders);
    saveStorage('transactions', state.transactions);

    amountInput.value = '';
    calculateTradeTotals();
    updateAvailableBalanceDisplay();
    renderTerminalOrders();
    renderPortfolio();
  });

  /* ==========================================================================
     12. Terminal Orders Panel (Open / History / Cancel)
     ========================================================================== */
  let terminalOrderTab = 'open';

  function renderTerminalOrders() {
    const tbody = document.getElementById('terminal-orders-tbody');
    const openCountEl = document.getElementById('open-orders-count');
    if (!tbody) return;

    const openOrders = state.orders.filter(o => o.status === 'Open');
    if (openCountEl) openCountEl.textContent = openOrders.length;

    let displayList = state.orders;
    if (terminalOrderTab === 'open') {
      displayList = openOrders;
    } else if (terminalOrderTab === 'history') {
      displayList = state.orders.filter(o => o.status !== 'Open');
    }

    if (displayList.length === 0) {
      tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; padding:1.5rem; color:var(--text-muted);">No orders found.</td></tr>`;
      return;
    }

    tbody.innerHTML = displayList.map(o => `
      <tr>
        <td class="text-muted">${o.time}</td>
        <td class="font-weight-bold">${o.pair}</td>
        <td>${o.type}</td>
        <td class="${o.side === 'Buy' ? 'text-buy' : 'text-sell'}" style="font-weight:700;">${o.side}</td>
        <td class="mono">$${o.price.toLocaleString()}</td>
        <td class="mono">${o.amount}</td>
        <td>${o.filled}%</td>
        <td class="mono">$${o.total.toLocaleString()}</td>
        <td>
          <span class="change-pill ${o.status === 'Filled' ? 'up' : o.status === 'Open' ? '' : 'down'}" style="${o.status === 'Open' ? 'background:rgba(59,130,246,0.15); color:#60a5fa;' : ''}">
            ${o.status}
          </span>
        </td>
        <td style="text-align:right;">
          ${o.status === 'Open' ? `<button type="button" class="btn-sm btn-secondary cancel-order-btn" data-id="${o.id}">Cancel</button>` : `<span class="text-muted">-</span>`}
        </td>
      </tr>
    `).join('');

    // Cancel order action
    tbody.querySelectorAll('.cancel-order-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        cancelOrder(btn.getAttribute('data-id'));
      });
    });
  }

  function cancelOrder(orderId) {
    const order = state.orders.find(o => o.id === orderId);
    if (!order || order.status !== 'Open') return;

    order.status = 'Cancelled';

    // Refund demo balance
    const symbol = order.pair.split('/')[0];
    if (order.side === 'Buy') {
      state.balances.USDT.available = Number((state.balances.USDT.available + order.total).toFixed(2));
      state.balances.USDT.total = Number((state.balances.USDT.total + order.total).toFixed(2));
    } else {
      if (state.balances[symbol]) {
        state.balances[symbol].available = Number((state.balances[symbol].available + order.amount).toFixed(4));
        state.balances[symbol].total = Number((state.balances[symbol].total + order.amount).toFixed(4));
      }
    }

    saveStorage('orders', state.orders);
    saveStorage('balances', state.balances);

    showToast('Order Cancelled', `Order ${orderId} has been cancelled and balances refunded.`, 'info');
    renderTerminalOrders();
    updateAvailableBalanceDisplay();
    renderOrdersManagementView();
    renderPortfolio();
  }

  // Cancel All Orders
  document.getElementById('cancel-all-orders-btn')?.addEventListener('click', () => {
    const openOrders = state.orders.filter(o => o.status === 'Open');
    if (openOrders.length === 0) {
      showToast('No Open Orders', 'You have no open orders to cancel.', 'info');
      return;
    }
    openOrders.forEach(o => cancelOrder(o.id));
    showToast('All Orders Cancelled', 'All open orders cancelled successfully.', 'success');
  });

  // Terminal Orders Tabs
  document.querySelectorAll('.order-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.order-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      terminalOrderTab = btn.getAttribute('data-view');
      renderTerminalOrders();
    });
  });

  /* ==========================================================================
     13. Portfolio Dashboard & Allocation Canvas Donut
     ========================================================================== */
  function renderPortfolio() {
    let totalUSD = 0;
    const assetHoldings = [];

    // USDT
    const usdtTotal = state.balances.USDT ? state.balances.USDT.total : 0;
    totalUSD += usdtTotal;
    assetHoldings.push({
      symbol: 'USDT',
      name: 'Tether USD',
      total: usdtTotal,
      available: state.balances.USDT ? state.balances.USDT.available : 0,
      locked: 0,
      avgPrice: 1.00,
      valueUSD: usdtTotal,
      color: '#26a17b'
    });

    // Crypto assets
    state.markets.forEach(m => {
      const bal = state.balances[m.symbol];
      if (bal && bal.total > 0) {
        const val = bal.total * m.price;
        totalUSD += val;
        assetHoldings.push({
          symbol: m.symbol,
          name: m.name,
          total: bal.total,
          available: bal.available,
          locked: bal.locked || 0,
          avgPrice: m.price * 0.92, // mock acquisition avg
          valueUSD: val,
          color: m.color
        });
      }
    });

    // Update KPI metrics
    const btcMarket = state.markets.find(x => x.symbol === 'BTC') || state.markets[0];
    const btcEquiv = (totalUSD / btcMarket.price).toFixed(4);

    const totalBalEl = document.getElementById('port-total-balance');
    const availBalEl = document.getElementById('port-avail-balance');
    if (totalBalEl) totalBalEl.textContent = `$${totalUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (availBalEl) availBalEl.textContent = `$${usdtTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

    // Render Holdings Table
    const tbody = document.getElementById('portfolio-assets-tbody');
    if (tbody) {
      tbody.innerHTML = assetHoldings.map(a => `
        <tr>
          <td>
            <div class="coin-cell">
              <div class="coin-icon-badge" style="background:${a.color}; width:28px; height:28px; font-size:0.75rem;">${a.symbol.slice(0,1)}</div>
              <div>
                <span class="coin-symbol-bold">${a.symbol}</span>
                <div class="text-muted" style="font-size:0.75rem;">${a.name}</div>
              </div>
            </div>
          </td>
          <td class="mono font-weight-bold">${a.total.toLocaleString()}</td>
          <td class="mono text-secondary">${a.available.toLocaleString()}</td>
          <td class="mono text-secondary">${a.locked.toLocaleString()}</td>
          <td class="mono text-secondary">$${a.avgPrice.toFixed(2)}</td>
          <td class="mono font-weight-bold text-buy">$${a.valueUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          <td style="text-align:right;">
            <button type="button" class="btn btn-sm btn-secondary port-trade-btn" data-symbol="${a.symbol}">Trade</button>
          </td>
        </tr>
      `).join('');

      tbody.querySelectorAll('.port-trade-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const sym = btn.getAttribute('data-symbol');
          selectMarket(sym === 'USDT' ? 'BTC' : sym);
          switchView('view-trade');
        });
      });
    }

    drawAllocationDonut(assetHoldings, totalUSD);
  }

  function drawAllocationDonut(holdings, totalUSD) {
    const canvas = document.getElementById('allocation-canvas');
    const legend = document.getElementById('allocation-legend');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const radius = (w / 2) - 15;
    const innerRadius = radius * 0.65;

    ctx.clearRect(0, 0, w, h);

    if (totalUSD <= 0) return;

    let currentAngle = -Math.PI / 2;
    holdings.forEach(item => {
      const sliceAngle = (item.valueUSD / totalUSD) * 2 * Math.PI;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, currentAngle, currentAngle + sliceAngle);
      ctx.arc(cx, cy, innerRadius, currentAngle + sliceAngle, currentAngle, true);
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fill();
      currentAngle += sliceAngle;
    });

    // Center text
    ctx.fillStyle = '#f8fafc';
    ctx.font = `bold 16px ${getComputedStyle(document.body).fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('100%', cx, cy);

    // Legend
    if (legend) {
      legend.innerHTML = holdings.map(item => {
        const pct = ((item.valueUSD / totalUSD) * 100).toFixed(1);
        return `
          <div class="legend-item">
            <div>
              <span class="legend-color-dot" style="background:${item.color};"></span>
              <span>${item.symbol}</span>
            </div>
            <span class="mono text-secondary">${pct}% ($${item.valueUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })})</span>
          </div>
        `;
      }).join('');
    }
  }

  /* ==========================================================================
     14. Wallet Management & Procedural QR Canvas
     ========================================================================== */
  function renderWallet() {
    const tbody = document.getElementById('wallet-assets-tbody');
    if (!tbody) return;

    const assets = [
      { symbol: 'USDT', name: 'Tether USD', color: '#26a17b' },
      ...state.markets.map(m => ({ symbol: m.symbol, name: m.name, color: m.color }))
    ];

    tbody.innerHTML = assets.map(a => {
      const bal = state.balances[a.symbol] || { total: 0, available: 0, locked: 0 };
      const m = state.markets.find(x => x.symbol === a.symbol);
      const price = a.symbol === 'USDT' ? 1.00 : (m ? m.price : 0);
      const valUSD = (bal.total * price).toFixed(2);

      return `
        <tr>
          <td>
            <div class="coin-cell">
              <div class="coin-icon-badge" style="background:${a.color}; width:28px; height:28px; font-size:0.75rem;">${a.symbol.slice(0,1)}</div>
              <div>
                <span class="coin-symbol-bold">${a.symbol}</span>
                <span class="text-muted" style="font-size:0.75rem;">${a.name}</span>
              </div>
            </div>
          </td>
          <td class="mono font-weight-bold">${bal.total.toLocaleString()}</td>
          <td class="mono text-buy">${bal.available.toLocaleString()}</td>
          <td class="mono text-muted">${(bal.locked || 0).toLocaleString()}</td>
          <td class="mono font-weight-bold">$${parseFloat(valUSD).toLocaleString()}</td>
          <td style="text-align:right;">
            <button type="button" class="btn-sm btn-primary wallet-dep-btn" data-symbol="${a.symbol}">Deposit</button>
            <button type="button" class="btn-sm btn-secondary wallet-wd-btn" data-symbol="${a.symbol}" style="margin-left:4px;">Withdraw</button>
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('.wallet-dep-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sym = btn.getAttribute('data-symbol');
        const sel = document.getElementById('deposit-coin-select');
        if (sel) sel.value = sym;
        openModal('modal-deposit');
        renderDepositModal();
      });
    });

    tbody.querySelectorAll('.wallet-wd-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sym = btn.getAttribute('data-symbol');
        const sel = document.getElementById('withdraw-coin-select');
        if (sel) sel.value = sym;
        openModal('modal-withdraw');
        updateWithdrawalModal();
      });
    });
  }

  // Draw Procedural High-Quality Matrix QR on Canvas
  function drawProceduralQR(canvasId, text) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    const grid = 21;
    const cell = size / grid;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = '#0a0d14';

    // Seeded random pseudo matrix
    let hash = 0;
    for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) % 1000000;

    for (let r = 0; r < grid; r++) {
      for (let c = 0; c < grid; c++) {
        // Corner alignment squares
        const isTL = r < 7 && c < 7;
        const isTR = r < 7 && c >= grid - 7;
        const isBL = r >= grid - 7 && c < 7;

        if (isTL || isTR || isBL) {
          const inBorder = (r === 0 || r === 6 || c === 0 || c === 6) ||
                           (r === 0 || r === 6 || c === grid - 1 || c === grid - 7) ||
                           (r === grid - 1 || r === grid - 7 || c === 0 || c === 6);
          const inCenter = (r >= 2 && r <= 4 && c >= 2 && c <= 4) ||
                           (r >= 2 && r <= 4 && c >= grid - 5 && c <= grid - 3) ||
                           (r >= grid - 5 && r >= grid - 5 && r <= grid - 3 && c >= 2 && c <= 4);
          if (inBorder || inCenter) {
            ctx.fillRect(c * cell, r * cell, cell, cell);
          }
        } else {
          // Data bits based on seed
          hash = (hash * 1103515245 + 12345) % 2147483648;
          if ((hash % 100) > 48) {
            ctx.fillRect(c * cell, r * cell, cell, cell);
          }
        }
      }
    }
  }

  function renderDepositModal() {
    const coin = document.getElementById('deposit-coin-select')?.value || 'USDT';
    const addrEl = document.getElementById('deposit-address-text');
    const sampleAddresses = {
      BTC: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
      ETH: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
      USDT: 'TX9aZ8qR7bKp2mN1xW6vY4uC8eL3jH5gFt',
      SOL: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
      BNB: 'bnb136ns6lfw4zs5hg4n85vdthaad7hq5m4gtkgf23'
    };
    const addr = sampleAddresses[coin] || sampleAddresses.USDT;
    if (addrEl) addrEl.textContent = addr;
    drawProceduralQR('deposit-qr-canvas', addr);
  }

  document.getElementById('deposit-coin-select')?.addEventListener('change', renderDepositModal);

  // Copy address button
  document.getElementById('copy-deposit-addr-btn')?.addEventListener('click', function() {
    const text = document.getElementById('deposit-address-text')?.textContent || '';
    navigator.clipboard?.writeText(text);
    this.textContent = 'Copied!';
    showToast('Copied to Clipboard', text, 'success');
    setTimeout(() => { this.textContent = 'Copy'; }, 2000);
  });

  // Simulate instant +$5,000 deposit
  document.getElementById('simulate-instant-deposit-btn')?.addEventListener('click', () => {
    const coin = document.getElementById('deposit-coin-select')?.value || 'USDT';
    const amount = coin === 'USDT' ? 5000.00 : coin === 'BTC' ? 0.08 : 1.5;

    if (!state.balances[coin]) state.balances[coin] = { total: 0, available: 0, locked: 0 };
    state.balances[coin].available += amount;
    state.balances[coin].total += amount;

    state.transactions.unshift({
      txid: '0x' + Math.random().toString(16).substring(2, 12),
      type: 'Deposit',
      asset: coin,
      amount: amount,
      fee: 0.00,
      status: 'Completed',
      time: 'Just now'
    });

    saveStorage('balances', state.balances);
    saveStorage('transactions', state.transactions);

    closeModal('modal-deposit');
    showToast('Deposit Credited', `+$${amount} ${coin} added to your spot balance.`, 'success');
    addNotification('Deposit Confirmed', `On-chain deposit of ${amount} ${coin} finalized.`, 'success');

    renderPortfolio();
    renderWallet();
    updateAvailableBalanceDisplay();
    renderTransactionsTable();
  });

  // Withdrawal modal calculations & validation
  function updateWithdrawalModal() {
    const coin = document.getElementById('withdraw-coin-select')?.value || 'USDT';
    const bal = state.balances[coin] ? state.balances[coin].available : 0;
    const availVal = document.getElementById('withdraw-avail-val');
    if (availVal) availVal.textContent = `${bal.toLocaleString()} ${coin}`;

    const amt = parseFloat(document.getElementById('withdraw-amount-input')?.value) || 0;
    const feeOpt = document.getElementById('withdraw-network-select')?.selectedOptions[0];
    const fee = parseFloat(feeOpt?.getAttribute('data-fee')) || 1.00;

    const feeEl = document.getElementById('withdraw-calc-fee');
    const receiveEl = document.getElementById('withdraw-calc-receive');
    if (feeEl) feeEl.textContent = `${fee.toFixed(2)} ${coin}`;
    if (receiveEl) receiveEl.textContent = `${Math.max(0, amt - fee).toFixed(2)} ${coin}`;
  }

  document.getElementById('withdraw-coin-select')?.addEventListener('change', updateWithdrawalModal);
  document.getElementById('withdraw-network-select')?.addEventListener('change', updateWithdrawalModal);
  document.getElementById('withdraw-amount-input')?.addEventListener('input', updateWithdrawalModal);

  document.getElementById('withdraw-max-btn')?.addEventListener('click', () => {
    const coin = document.getElementById('withdraw-coin-select')?.value || 'USDT';
    const bal = state.balances[coin] ? state.balances[coin].available : 0;
    const input = document.getElementById('withdraw-amount-input');
    if (input) input.value = bal;
    updateWithdrawalModal();
  });

  document.getElementById('confirm-withdraw-btn')?.addEventListener('click', () => {
    const coin = document.getElementById('withdraw-coin-select')?.value || 'USDT';
    const addr = document.getElementById('withdraw-address-input')?.value.trim();
    const amt = parseFloat(document.getElementById('withdraw-amount-input')?.value) || 0;
    const feeOpt = document.getElementById('withdraw-network-select')?.selectedOptions[0];
    const fee = parseFloat(feeOpt?.getAttribute('data-fee')) || 1.00;

    if (!addr || addr.length < 16) {
      showToast('Invalid Address', 'Please provide a valid destination crypto address.', 'error');
      return;
    }

    const avail = state.balances[coin] ? state.balances[coin].available : 0;
    if (amt <= fee) {
      showToast('Amount Too Low', `Minimum withdrawal must be greater than network fee (${fee} ${coin}).`, 'error');
      return;
    }
    if (amt > avail) {
      showToast('Insufficient Balance', `You only have ${avail} ${coin} available.`, 'error');
      return;
    }

    // Process withdrawal
    state.balances[coin].available -= amt;
    state.balances[coin].total -= amt;

    state.transactions.unshift({
      txid: '0x' + Math.random().toString(16).substring(2, 12),
      type: 'Withdrawal',
      asset: coin,
      amount: amt,
      fee: fee,
      status: 'Completed',
      time: 'Just now'
    });

    saveStorage('balances', state.balances);
    saveStorage('transactions', state.transactions);

    closeModal('modal-withdraw');
    showToast('Withdrawal Processed', `Dispatched ${(amt - fee).toFixed(2)} ${coin} to ${addr.slice(0, 8)}...`, 'success');
    addNotification('Withdrawal Dispatched', `TxID sent to blockchain node cluster with ${fee} fee.`, 'info');

    renderPortfolio();
    renderWallet();
    updateAvailableBalanceDisplay();
    renderTransactionsTable();
  });

  /* ==========================================================================
     15. Transactions Ledger
     ========================================================================== */
  function renderTransactionsTable() {
    const tbody = document.getElementById('transactions-tbody');
    if (!tbody) return;

    const filterType = document.getElementById('tx-filter-type')?.value || 'all';
    let list = state.transactions;

    if (filterType !== 'all') {
      list = list.filter(t => t.type.toLowerCase() === filterType.toLowerCase());
    }

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:2rem; color:var(--text-muted);">No transactions found.</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(t => `
      <tr>
        <td class="mono text-cyan">${t.txid}</td>
        <td>
          <span class="change-pill ${t.type === 'Deposit' ? 'up' : t.type === 'Trade' ? '' : 'down'}">
            ${t.type}
          </span>
        </td>
        <td class="font-weight-bold">${t.asset}</td>
        <td class="mono font-weight-bold">${t.amount.toLocaleString()}</td>
        <td class="mono text-secondary">${t.fee.toFixed(2)}</td>
        <td><span class="change-pill up">Completed</span></td>
        <td class="text-muted">${t.time}</td>
        <td style="text-align:right;">
          <button type="button" class="btn-sm btn-secondary tx-detail-btn" data-txid="${t.txid}">Details</button>
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('.tx-detail-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        showToast('Ledger Record', `Audit verification passed for TxID: ${btn.getAttribute('data-txid')}`, 'info');
      });
    });
  }

  document.getElementById('tx-filter-type')?.addEventListener('change', renderTransactionsTable);

  /* ==========================================================================
     16. Orders Management View
     ========================================================================== */
  function renderOrdersManagementView() {
    const tbody = document.getElementById('orders-full-tbody');
    if (!tbody) return;

    if (state.orders.length === 0) {
      tbody.innerHTML = `<tr><td colspan="11" style="text-align:center; padding:3rem; color:var(--text-muted);">No orders recorded.</td></tr>`;
      return;
    }

    tbody.innerHTML = state.orders.map(o => `
      <tr>
        <td class="mono text-muted">${o.id}</td>
        <td class="text-secondary">${o.time}</td>
        <td class="font-weight-bold">${o.pair}</td>
        <td>${o.type}</td>
        <td class="${o.side === 'Buy' ? 'text-buy' : 'text-sell'}" style="font-weight:700;">${o.side}</td>
        <td class="mono">$${o.price.toLocaleString()}</td>
        <td class="mono">${o.amount}</td>
        <td>${o.filled}%</td>
        <td class="mono">$${o.total.toLocaleString()}</td>
        <td><span class="change-pill ${o.status === 'Filled' ? 'up' : o.status === 'Open' ? '' : 'down'}">${o.status}</span></td>
        <td style="text-align:right;">
          ${o.status === 'Open' ? `<button type="button" class="btn-sm btn-secondary cancel-mgmt-order" data-id="${o.id}">Cancel</button>` : `<span class="text-muted">-</span>`}
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('.cancel-mgmt-order').forEach(btn => {
      btn.addEventListener('click', () => {
        cancelOrder(btn.getAttribute('data-id'));
      });
    });
  }

  /* ==========================================================================
     17. Price Alerts Engine
     ========================================================================== */
  function renderAlerts() {
    const tbody = document.getElementById('alerts-tbody');
    if (!tbody) return;

    if (state.alerts.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--text-muted);">No active price alerts. Create one above!</td></tr>`;
      return;
    }

    tbody.innerHTML = state.alerts.map(a => {
      const m = state.markets.find(x => x.symbol === a.asset) || state.markets[0];
      return `
        <tr>
          <td class="font-weight-bold">${a.asset}/USDT</td>
          <td>${a.condition === 'above' ? 'Price Rises Above (≥)' : 'Price Drops Below (≤)'}</td>
          <td class="mono text-cyan">$${a.targetPrice.toLocaleString()}</td>
          <td class="mono">$${m.price.toLocaleString()}</td>
          <td class="text-muted">${a.note || '-'}</td>
          <td>
            <span class="change-pill ${a.status === 'Triggered' ? 'up' : ''}" style="${a.status === 'Monitoring' ? 'background:rgba(121,82,252,0.15); color:var(--accent-violet-light);' : ''}">
              ${a.status}
            </span>
          </td>
          <td style="text-align:right;">
            <button type="button" class="btn-sm btn-secondary delete-alert-btn" data-id="${a.id}">Delete</button>
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('.delete-alert-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        state.alerts = state.alerts.filter(x => x.id !== id);
        saveStorage('alerts', state.alerts);
        renderAlerts();
        showToast('Alert Removed', 'Price alert deleted.', 'info');
      });
    });
  }

  document.getElementById('create-alert-btn')?.addEventListener('click', () => {
    const asset = document.getElementById('alert-asset-select')?.value;
    const condition = document.getElementById('alert-condition-select')?.value;
    const price = parseFloat(document.getElementById('alert-price-input')?.value);
    const note = document.getElementById('alert-note-input')?.value.trim();

    if (!price || price <= 0) {
      showToast('Validation Error', 'Please enter a target price.', 'error');
      return;
    }

    state.alerts.push({
      id: 'ALT-' + Math.floor(Math.random() * 1000),
      asset,
      condition,
      targetPrice: price,
      note,
      status: 'Monitoring',
      date: 'Today'
    });

    saveStorage('alerts', state.alerts);
    renderAlerts();
    document.getElementById('alert-price-input').value = '';
    document.getElementById('alert-note-input').value = '';
    showToast('Price Alert Created', `Watching ${asset}/USDT for ${condition} $${price.toLocaleString()}`, 'success');
  });

  /* ==========================================================================
     18. Notification Center
     ========================================================================== */
  function addNotification(title, message, type = 'info') {
    state.notifications.unshift({
      id: Date.now(),
      title,
      message,
      time: 'Just now',
      read: false,
      type
    });
    saveStorage('notifications', state.notifications);
    updateNotificationBadge();
  }

  function updateNotificationBadge() {
    const badge = document.getElementById('notif-badge');
    const unread = state.notifications.filter(n => !n.read).length;
    if (badge) {
      badge.textContent = unread;
      badge.style.display = unread > 0 ? 'flex' : 'none';
    }
  }

  function renderNotificationModalList() {
    const list = document.getElementById('notif-modal-list');
    if (!list) return;

    if (state.notifications.length === 0) {
      list.innerHTML = `<div style="text-align:center; padding:2rem; color:var(--text-muted);">No notifications.</div>`;
      return;
    }

    list.innerHTML = state.notifications.map(n => `
      <div class="card" style="padding:0.75rem; border-left:3px solid ${n.read ? 'var(--border-subtle)' : 'var(--accent-violet)'}; background:${n.read ? 'var(--bg-surface-2)' : 'var(--bg-surface-3)'};">
        <div style="display:flex; justify-content:space-between; margin-bottom:2px;">
          <b style="font-size:0.85rem;">${escapeHTML(n.title)}</b>
          <span class="text-muted" style="font-size:0.7rem;">${n.time}</span>
        </div>
        <div style="font-size:0.78rem; color:var(--text-secondary);">${escapeHTML(n.message)}</div>
      </div>
    `).join('');
  }

  document.getElementById('notif-btn')?.addEventListener('click', () => {
    openModal('modal-notifications');
    renderNotificationModalList();
  });

  document.getElementById('notif-mark-all-read')?.addEventListener('click', () => {
    state.notifications.forEach(n => n.read = true);
    saveStorage('notifications', state.notifications);
    updateNotificationBadge();
    renderNotificationModalList();
    showToast('Notifications Updated', 'All items marked as read.');
  });

  document.getElementById('notif-clear-all')?.addEventListener('click', () => {
    state.notifications = [];
    saveStorage('notifications', state.notifications);
    updateNotificationBadge();
    renderNotificationModalList();
    showToast('Cleared', 'Notification inbox cleared.');
  });

  /* ==========================================================================
     19. Global Spotlight Command Palette (Ctrl + K)
     ========================================================================== */
  const commandModal = document.getElementById('modal-command-palette');
  const commandInput = document.getElementById('command-search-input');
  const commandResults = document.getElementById('command-results-list');

  const COMMAND_ITEMS = [
    { label: 'Spot Trading Terminal', desc: 'Open advanced charting and order book terminal', action: () => switchView('view-trade') },
    { label: 'Markets Directory', desc: 'Browse all spot pairs and volume gainers', action: () => switchView('view-markets') },
    { label: 'Portfolio Valuation', desc: 'View net worth, P&L, and asset allocation donut', action: () => switchView('view-portfolio') },
    { label: 'Funding & Spot Wallet', desc: 'Manage digital asset addresses and balances', action: () => switchView('view-wallet') },
    { label: 'Deposit Cryptocurrency', desc: 'Generate multi-chain deposit QR codes', action: () => openModal('modal-deposit') },
    { label: 'Withdraw Cryptocurrency', desc: 'Initiate external wallet withdrawals', action: () => openModal('modal-withdraw') },
    { label: 'Price Alerts Center', desc: 'Configure automatic limit price alerts', action: () => switchView('view-alerts') },
    { label: 'Security & 2FA Setup', desc: 'Account verification, sessions, and API keys', action: () => switchView('view-security') },
    { label: 'Trade BTC/USDT', desc: 'Instant switch to Bitcoin trading market', action: () => { selectMarket('BTC'); switchView('view-trade'); } },
    { label: 'Trade ETH/USDT', desc: 'Instant switch to Ethereum trading market', action: () => { selectMarket('ETH'); switchView('view-trade'); } },
    { label: 'Trade SOL/USDT', desc: 'Instant switch to Solana trading market', action: () => { selectMarket('SOL'); switchView('view-trade'); } },
    { label: 'Trade BNB/USDT', desc: 'Instant switch to BNB trading market', action: () => { selectMarket('BNB'); switchView('view-trade'); } }
  ];

  function openCommandPalette() {
    openModal('modal-command-palette');
    commandInput.value = '';
    renderCommandResults('');
    setTimeout(() => commandInput.focus(), 50);
  }

  function renderCommandResults(query) {
    const q = query.toLowerCase().trim();
    const filtered = COMMAND_ITEMS.filter(c => c.label.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q));

    if (filtered.length === 0) {
      commandResults.innerHTML = `<div style="padding:1.5rem; text-align:center; color:var(--text-muted);">No matching commands or pairs found.</div>`;
      return;
    }

    commandResults.innerHTML = filtered.map((c, i) => `
      <div class="command-item ${i === 0 ? 'selected' : ''}" data-idx="${i}">
        <div>
          <div style="font-weight:700;">${escapeHTML(c.label)}</div>
          <div class="text-muted" style="font-size:0.75rem;">${escapeHTML(c.desc)}</div>
        </div>
        <kbd class="mono" style="font-size:0.7rem; background:var(--bg-surface-4); padding:2px 6px; border-radius:4px;">Jump</kbd>
      </div>
    `).join('');

    commandResults.querySelectorAll('.command-item').forEach((item, i) => {
      item.addEventListener('click', () => {
        closeModal('modal-command-palette');
        filtered[i].action();
      });
    });
  }

  commandInput?.addEventListener('input', () => {
    renderCommandResults(commandInput.value);
  });

  // Ctrl + K Global Listener
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openCommandPalette();
    }
  });

  document.getElementById('open-search-btn')?.addEventListener('click', openCommandPalette);

  /* ==========================================================================
     20. Security Settings & Demo Account Governance
     ========================================================================== */
  // 2FA Toggle
  document.getElementById('toggle-2fa-btn')?.addEventListener('click', function() {
    if (this.textContent.includes('Enabled')) {
      this.textContent = 'Disabled';
      this.className = 'btn-sm btn-secondary';
      showToast('2FA Disabled', 'Two-factor protection disabled in demo.', 'warning');
    } else {
      this.textContent = 'Enabled (Demo)';
      this.className = 'btn-sm btn-primary';
      showToast('2FA Enabled', 'Two-Factor Authenticator active.', 'success');
    }
  });

  // Change Password Simulation
  document.getElementById('save-pw-btn')?.addEventListener('click', () => {
    const input = document.getElementById('new-pw-input');
    if (!input || input.value.length < 6) {
      showToast('Validation Error', 'Password must be at least 6 characters.', 'error');
      return;
    }
    input.value = '';
    showToast('Password Updated', 'Your security password was changed successfully.', 'success');
  });

  // API Key Generator
  document.getElementById('generate-api-key-btn')?.addEventListener('click', () => {
    const newKey = 'vtx_live_' + Math.random().toString(36).substring(2, 14) + Math.random().toString(36).substring(2, 10);
    const keyEl = document.getElementById('demo-api-key');
    if (keyEl) keyEl.textContent = newKey;
    showToast('API Key Generated', 'New programmatic API credentials generated.', 'success');
  });

  document.getElementById('copy-api-key-btn')?.addEventListener('click', function() {
    const key = document.getElementById('demo-api-key')?.textContent || '';
    navigator.clipboard?.writeText(key);
    this.textContent = 'Copied!';
    showToast('Copied', 'API Key copied to clipboard.');
    setTimeout(() => { this.textContent = 'Copy'; }, 2000);
  });

  // Terminate Sessions
  document.querySelectorAll('.terminate-session-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const row = this.closest('tr');
      if (row) row.style.display = 'none';
      showToast('Session Terminated', 'Remote OAuth token revoked.', 'info');
    });
  });

  document.getElementById('terminate-all-sessions-btn')?.addEventListener('click', () => {
    document.querySelectorAll('.terminate-session-btn').forEach(btn => {
      const row = btn.closest('tr');
      if (row) row.style.display = 'none';
    });
    showToast('Sessions Cleared', 'All other login sessions have been terminated.', 'success');
  });

  // Support Ticket Submission
  document.getElementById('send-support-btn')?.addEventListener('click', () => {
    const subject = document.getElementById('support-subject')?.value.trim();
    const msg = document.getElementById('support-msg')?.value.trim();
    if (!subject || !msg) {
      showToast('Validation Error', 'Please enter ticket subject and description.', 'error');
      return;
    }
    document.getElementById('support-subject').value = '';
    document.getElementById('support-msg').value = '';
    showToast('Support Ticket Created', `Ticket #${Math.floor(10000 + Math.random()*90000)} submitted to tier 2 support.`, 'success');
  });

  /* ==========================================================================
     21. User Profile Dropdown & Authentication Modal
     ========================================================================== */
  const userProfileBtn = document.getElementById('user-profile-btn');
  const userDropdown = document.getElementById('user-dropdown');

  userProfileBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    userDropdown?.classList.toggle('open');
  });

  window.addEventListener('click', (e) => {
    if (!userDropdown?.contains(e.target) && !userProfileBtn?.contains(e.target)) {
      userDropdown?.classList.remove('open');
    }
  });

  // User Dropdown Actions
  document.querySelectorAll('.user-dropdown .dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      userDropdown?.classList.remove('open');
      const action = item.getAttribute('data-action');
      if (action === 'view-profile' || action === 'view-security') {
        switchView('view-security');
      } else if (action === 'open-deposit') {
        openModal('modal-deposit');
      } else if (action === 'reset-demo') {
        localStorage.clear();
        showToast('Demo Reset', 'Reloading default exchange environment...', 'info');
        setTimeout(() => window.location.reload(), 1200);
      } else if (action === 'auth-toggle') {
        openModal('modal-auth');
      }
    });
  });

  // Auth Modal Form Submission
  document.getElementById('auth-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    closeModal('modal-auth');
    showToast('Authentication Successful', 'Signed in as Alex Morgan (VIP 1).', 'success');
  });

  /* ==========================================================================
     22. Modal Reusable Dialog Engine
     ========================================================================== */
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Close buttons and backdrop click
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(btn.getAttribute('data-close'));
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach(bd => {
    bd.addEventListener('click', (e) => {
      if (e.target === bd) closeModal(bd.id);
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.active').forEach(m => closeModal(m.id));
      userDropdown?.classList.remove('open');
    }
  });

  // Quick Portfolio Deposit / Withdraw triggers
  document.getElementById('portfolio-deposit-trigger')?.addEventListener('click', () => openModal('modal-deposit'));
  document.getElementById('portfolio-withdraw-trigger')?.addEventListener('click', () => openModal('modal-withdraw'));
  document.getElementById('wallet-deposit-btn')?.addEventListener('click', () => openModal('modal-deposit'));
  document.getElementById('wallet-withdraw-btn')?.addEventListener('click', () => openModal('modal-withdraw'));

  /* ==========================================================================
     23. Mobile Terminal Tab Switcher (< 768px)
     ========================================================================== */
  document.querySelectorAll('#mobile-term-tabs .mobile-term-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#mobile-term-tabs .mobile-term-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.getAttribute('data-target');
      document.querySelectorAll('.term-chart-panel, .term-rightside-panel, .term-orders-panel').forEach(p => p.classList.remove('mobile-active'));

      if (target === 'chart') {
        document.querySelector('.term-chart-panel')?.classList.add('mobile-active');
        resizeAndRenderChart();
      } else if (target === 'orderbook' || target === 'tradeform') {
        document.querySelector('.term-rightside-panel')?.classList.add('mobile-active');
      } else if (target === 'orders') {
        document.querySelector('.term-orders-panel')?.classList.add('mobile-active');
      }
    });
  });

  /* ==========================================================================
     24. Application Initialization
     ========================================================================== */
  function initApp() {
    renderTickerRibbon();
    renderHeroPreviewCards();
    renderMarketsTable();
    selectMarket('BTC');
    renderPortfolio();
    renderWallet();
    renderTransactionsTable();
    renderOrdersManagementView();
    renderAlerts();
    updateNotificationBadge();
    renderDepositModal();
    updateWithdrawalModal();

    startMarketTickEngine();

    console.log('%c VORTEXA Institutional Trading Architecture Loaded ', 'background: #7952fc; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px;');
  }

  // Run immediately on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
