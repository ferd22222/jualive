// ============================================
// JuaLive — Core App Logic v2
// Supports both proxy mode (production) and direct mode (development)
// ============================================

const App = {
  init() {
    // Initialize Gemini
    GeminiAI.init();

    // Register service worker
    this.registerSW();

    // Check configuration
    if (!GeminiAI.isReady()) {
      this.showSetupModal();
    }
  },

  async registerSW() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('/sw.js');
      } catch (e) {
        console.log('SW registration skipped:', e.message);
      }
    }
  },

  // ── Setup Modal (supports both modes) ──
  showSetupModal() {
    const existing = document.getElementById('setup-modal');
    if (existing) return;

    const modal = document.createElement('div');
    modal.id = 'setup-modal';
    modal.style.cssText = `
      position: fixed; inset: 0; z-index: 1000;
      background: rgba(0,0,0,0.7); backdrop-filter: blur(10px);
      display: flex; align-items: center; justify-content: center;
      padding: 16px;
    `;
    modal.innerHTML = `
      <div class="card" style="max-width: 480px; width: 100%;">
        <h3 style="margin-bottom: 12px;">⚙️ Setup JuaLive</h3>

        <!-- Tab buttons -->
        <div style="display: flex; gap: 8px; margin-bottom: 16px;">
          <button class="btn btn-primary btn-sm" id="tab-proxy" onclick="App.switchTab('proxy')" style="flex:1;">
            🌐 Mode Online
          </button>
          <button class="btn btn-secondary btn-sm" id="tab-direct" onclick="App.switchTab('direct')" style="flex:1;">
            🔑 Mode Developer
          </button>
        </div>

        <!-- Proxy mode (Production — untuk user biasa) -->
        <div id="panel-proxy">
          <p style="font-size: 0.85rem; margin-bottom: 12px; color: var(--text-secondary);">
            Masukkan URL server JuaLive Anda. Kalau Anda <strong>user biasa</strong>, minta URL ini dari pengelola JuaLive.
          </p>
          <div class="form-group" style="margin-bottom: 16px;">
            <label class="form-label">Server URL</label>
            <input type="text" id="proxy-url-input" class="form-input" 
                   placeholder="https://jualive-api.your-name.workers.dev"
                   value="${GeminiAI.proxyUrl || ''}"
                   autocomplete="off">
          </div>
          <button id="save-proxy" class="btn btn-primary btn-full" onclick="App.saveProxy()">
            Hubungkan 🚀
          </button>
        </div>

        <!-- Direct mode (Development — pakai API key sendiri) -->
        <div id="panel-direct" style="display: none;">
          <p style="font-size: 0.85rem; margin-bottom: 12px; color: var(--text-secondary);">
            Mode developer/testing. Dapatkan API key <strong>GRATIS</strong> dari 
            <a href="https://aistudio.google.com/apikey" target="_blank" style="color: var(--primary);">Google AI Studio</a>.
          </p>
          <div class="form-group" style="margin-bottom: 16px;">
            <label class="form-label">Gemini API Key</label>
            <input type="text" id="apikey-input" class="form-input" 
                   placeholder="Paste API key di sini..."
                   value="${GeminiAI.apiKey || ''}"
                   autocomplete="off">
          </div>
          <button id="save-apikey" class="btn btn-primary btn-full" onclick="App.saveApiKey()">
            Simpan & Mulai 🚀
          </button>
        </div>

        <p style="font-size: 0.7rem; color: var(--text-tertiary); margin-top: 12px; text-align: center;">
          Semua data disimpan di perangkat Anda saja.
        </p>
      </div>
    `;

    document.body.appendChild(modal);
  },

  // Alias for backward compatibility
  showApiKeyModal() {
    this.showSetupModal();
  },

  switchTab(tab) {
    const proxyPanel = document.getElementById('panel-proxy');
    const directPanel = document.getElementById('panel-direct');
    const proxyTab = document.getElementById('tab-proxy');
    const directTab = document.getElementById('tab-direct');

    if (tab === 'proxy') {
      proxyPanel.style.display = 'block';
      directPanel.style.display = 'none';
      proxyTab.className = 'btn btn-primary btn-sm';
      directTab.className = 'btn btn-secondary btn-sm';
    } else {
      proxyPanel.style.display = 'none';
      directPanel.style.display = 'block';
      proxyTab.className = 'btn btn-secondary btn-sm';
      directTab.className = 'btn btn-primary btn-sm';
    }
  },

  saveProxy() {
    const url = document.getElementById('proxy-url-input').value.trim();
    if (url && url.startsWith('http')) {
      GeminiAI.setProxyUrl(url);
      document.getElementById('setup-modal')?.remove();
      this.showToast('Terhubung ke server! ✅');
    } else {
      this.showToast('URL tidak valid. Harus dimulai dengan https://', 'error');
    }
  },

  saveApiKey() {
    const key = document.getElementById('apikey-input').value.trim();
    if (key.length > 10) {
      GeminiAI.setApiKey(key);
      document.getElementById('setup-modal')?.remove();
      this.showToast('API Key tersimpan! ✅');
    } else {
      this.showToast('API key tidak valid.', 'error');
    }
  },

  // ── Toast Notification ──
  showToast(message, type = 'success') {
    const toast = document.createElement('div');
    const bgColor = type === 'error' ? '#FF2D55' : '#FF6B35';
    toast.style.cssText = `
      position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
      background: ${bgColor}; color: white; padding: 12px 24px;
      border-radius: 12px; font-size: 0.9rem; font-weight: 500;
      z-index: 2000; animation: fadeInUp 0.3s ease;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      max-width: 90%; text-align: center;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  },

  // ── Copy to Clipboard ──
  async copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.showToast('Tersalin! 📋');
    } catch (e) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
      this.showToast('Tersalin! 📋');
    }
  },

  // ── Share to WhatsApp ──
  shareWhatsApp(text) {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  },

  // ── Format number ──
  formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  },

  // ── Update Stats ──
  updateStats() {
    const stats = JuaLiveStorage.getStats();
    const els = {
      'stat-scripts': stats.totalScripts,
      'stat-practices': stats.totalPractices,
      'stat-usage': `${stats.usageToday}/${stats.maxUsage}`
    };
    Object.entries(els).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    });
  }
};

// Auto-init
document.addEventListener('DOMContentLoaded', () => App.init());
