# VORTEXA | Ultra-Premium Cryptocurrency Exchange Platform

> **"Trade Smarter. Move Faster."**
> A production-grade, ultra-premium front-end digital asset exchange and algorithmic trading terminal built for institutional and professional portfolios.

---

## 🌟 Overview

**VORTEXA** is a fully functional, zero-dependency, institutional-grade cryptocurrency exchange interface engineered with modern FinTech principles. It blends the depth and precision of institutional trading terminals (like Binance Pro, Coinbase Advanced, Hyperliquid, Bybit) with the aesthetic polish of an Apple-grade SaaS dashboard.

---

## 🚀 Key Highlights & Architecture

- **Zero-Dependency & Offline-First**: Built with 100% Vanilla HTML5, CSS3, and modern JavaScript. Requires **no `npm install`**, no Node.js build process, and no external CDN lockouts. Simply double-click `index.html` or open with VS Code Live Server.
- **Strict Root-Level Architecture**: No subfolders (`src/`, `components/`, `css/`, `js/`, etc.). All core assets reside directly in the workspace root for instant portability and presentation.
- **Deep Obsidian & Electric Violet Palette**: Custom luxury dark theme featuring deep obsidian (`#07080c`), violet accents (`#7952fc`), cyan highlights (`#06b6d4`), emerald buy indicators (`#10b981`), and rose sell indicators (`#f43f5e`).
- **Real-Time Market Engine**: Realistic stochastic price micro-fluctuations every 1.8 seconds with dynamic ticker updates, 24-hour high/low tracking, and automatic price alert triggering.
- **High-Performance Canvas Candlestick Chart**: Custom HTML5 Canvas engine with high-DPI rendering, multiple timeframes (`1m`, `5m`, `15m`, `1H`, `4H`, `1D`, `1W`), Volume bars, Moving Average overlays (`MA 20`, `MA 50`), and real-time crosshair inspection with exact OHLCV tooltips.
- **Dynamic Order Book & Depth Visualization**: Real-time bid/ask order book with proportional depth background bars, spread calculation, and click-to-fill functionality.
- **Simulated Trade Execution Engine**:
  - Limit and Market orders for Buy and Sell sides.
  - Percentage quick-fill buttons (`25%`, `50%`, `75%`, `100%`).
  - Dynamic fee (0.1%) and total settlement calculations.
  - Active balance validation, automatic ledger recording, and instant order cancellation with balance refunding.
- **Interactive Portfolio & Multi-Chain Wallet**:
  - Real-time net worth calculation and 24h P&L metrics.
  - Interactive Canvas Donut Allocation Chart.
  - Multi-chain Deposit Modal with procedural on-canvas QR matrix generation and 1-click clipboard address copying.
  - Comprehensive Withdrawal Modal with address validation and network gas fee estimation.
- **Automated Price Alerts**: Trigger conditions (`>=` or `<=`) that monitor live ticks, play synthesized Web Audio chirps, log system notifications, and fire dismissible toast alerts.
- **Global Command Palette (`Ctrl + K`)**: Keyboard-driven spotlight search for instant navigation between pairs, pages, and actions.
- **Multi-Level Toast Notification Stack**: Queue of dismissible status toasts (success, error, warning, info) with auto-dismiss timers.
- **100% Responsive Design**: Seamless adaptive experience on 4K Desktops, Laptops, Tablets, and Smartphones with dedicated touch navigation and tabbed mobile trading terminals.

---

## 📁 File Structure

```
Cryptocurrency Exchange Platform/
│
├── index.html        # Complete semantic single-page application & modals
├── style.css         # Master design system, obsidian theme & glassmorphism
├── script.js         # Reactive state machine, chart engine & trading logic
├── favicon.svg       # Holographic brand icon
└── README.md         # Project documentation & portfolio showcase guide
```

---

## 💻 How to Run

1. **Option 1: Direct File Launch (Zero Setup)**
   - Double-click `index.html` in Windows Explorer or open it with Google Chrome, Microsoft Edge, Firefox, or Safari.

2. **Option 2: VS Code Live Server**
   - Open the project folder in VS Code.
   - Right-click `index.html` and select **"Open with Live Server"**.

---

## 🛠️ User Flows & Interactive Features

### 1. Spot Trading
- Navigate to the **Trade** tab.
- Switch between pairs (`BTC/USDT`, `ETH/USDT`, `SOL/USDT`, `BNB/USDT`, `AVAX/USDT`).
- Click any price row in the **Order Book** to automatically set your Limit Price.
- Select **25%**, **50%**, **75%**, or **100%** of your available USDT to auto-calculate the purchase amount.
- Click **"Buy BTC"** to execute. Open orders can be cancelled anytime to refund your balance.

### 2. Deposit Simulation
- Click the **Deposit** button in the header or wallet.
- Select your target coin (`BTC`, `ETH`, `USDT`, `SOL`) and network.
- The modal generates an authentic procedural QR code and displays a multi-chain address.
- Click **"Copy"** to test clipboard interaction.
- Click **"Simulate +$5,000 Deposit"** to instantly credit your spot wallet.

### 3. Price Alerts
- Switch to the **Alerts** view.
- Choose an asset, specify condition (e.g. `BTC` rises above `$70,000`), and click **Add Alert**.
- As the live market ticks, the background engine tests your alert conditions in real-time.

### 4. Global Spotlight (`Ctrl + K`)
- Press `Ctrl + K` (or `Cmd + K` on Mac) or click the search box in the navigation bar.
- Type any coin or page name (e.g., `"Solana"`, `"Wallet"`, `"Deposit"`) and press **Enter** to jump immediately.

---

## 🔒 Compliance & Disclaimer

> **Notice**: VORTEXA is a front-end simulation platform designed strictly for software engineering portfolio demonstrations. No real cryptocurrency, fiat currency, or blockchain transactions are executed. All demo balances, API keys, and order books are simulated locally within your browser session (`localStorage`).

---

## 📄 Author & License

Developed for professional portfolio presentation. MIT License.
