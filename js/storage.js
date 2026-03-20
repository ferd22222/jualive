// ============================================
// JuaLive — LocalStorage Helper
// ============================================

const JuaLiveStorage = {
  PREFIX: 'jualive_',

  // Save data
  set(key, value) {
    try {
      localStorage.setItem(this.PREFIX + key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn('Storage full or unavailable:', e);
      return false;
    }
  },

  // Get data
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(this.PREFIX + key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  },

  // Remove data
  remove(key) {
    localStorage.removeItem(this.PREFIX + key);
  },

  // ── Script History ──
  saveScript(scriptData) {
    const history = this.get('scripts', []);
    const entry = {
      id: Date.now(),
      ...scriptData,
      createdAt: new Date().toISOString()
    };
    history.unshift(entry);
    // Keep last 50
    if (history.length > 50) history.pop();
    this.set('scripts', history);
    return entry;
  },

  getScripts() {
    return this.get('scripts', []);
  },

  // ── Practice Sessions ──
  savePractice(sessionData) {
    const history = this.get('practices', []);
    const entry = {
      id: Date.now(),
      ...sessionData,
      createdAt: new Date().toISOString()
    };
    history.unshift(entry);
    if (history.length > 30) history.pop();
    this.set('practices', history);
    return entry;
  },

  getPractices() {
    return this.get('practices', []);
  },

  // ── Usage Counter (for free tier limits) ──
  getUsageToday() {
    const today = new Date().toISOString().split('T')[0];
    const usage = this.get('usage', {});
    return usage[today] || 0;
  },

  incrementUsage() {
    const today = new Date().toISOString().split('T')[0];
    const usage = this.get('usage', {});
    // Clean old days
    const keys = Object.keys(usage);
    if (keys.length > 7) {
      keys.sort().slice(0, keys.length - 7).forEach(k => delete usage[k]);
    }
    usage[today] = (usage[today] || 0) + 1;
    this.set('usage', usage);
    return usage[today];
  },

  getMaxUsage() {
    const tier = this.get('tier', 'free');
    switch (tier) {
      case 'starter': return 20;
      case 'pro': return 999;
      default: return 3;
    }
  },

  canUseAI() {
    return this.getUsageToday() < this.getMaxUsage();
  },

  // ── Stats ──
  getStats() {
    return {
      totalScripts: this.getScripts().length,
      totalPractices: this.getPractices().length,
      usageToday: this.getUsageToday(),
      maxUsage: this.getMaxUsage(),
      tier: this.get('tier', 'free')
    };
  }
};
