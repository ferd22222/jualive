// ============================================
// JuaLive — Live Timer / Prompter Logic
// ============================================

const LiveTimer = {
  isRunning: false,
  totalSeconds: 0,
  remaining: 0,
  interval: null,
  tipInterval: null,
  tips: [],
  currentTipIdx: 0,

  defaultTips: [
    "🎤 Sapa viewers baru yang masuk!",
    "💰 Sebutkan harga sekarang!",
    "⚡ Buat urgency — stok terbatas!",
    "📢 CTA: \"Klik keranjang kuning sekarang!\"",
    "🔥 Ceritakan testimoni customer!",
    "💎 Tunjukkan keunggulan vs kompetitor!",
    "❤️ Ajak viewers like & share!",
    "🎁 Announce bonus/freebie!",
    "😱 Scarcity — \"Tinggal 5 lagi!\"",
    "🤝 Jawab pertanyaan di comment!",
    "📱 Remind: Checkout sekarang!",
    "✨ Ulangi benefitnya utama!"
  ],

  init() {
    this.display = document.getElementById('timer-display');
    this.startBtn = document.getElementById('timer-start');
    this.stopBtn = document.getElementById('timer-stop');
    this.resetBtn = document.getElementById('timer-reset');
    this.minutesInput = document.getElementById('timer-minutes');
    this.tipContainer = document.getElementById('timer-tip');
    this.productInput = document.getElementById('timer-product');
    this.genTipsBtn = document.getElementById('gen-tips-btn');

    if (this.startBtn) this.startBtn.addEventListener('click', () => this.start());
    if (this.stopBtn) this.stopBtn.addEventListener('click', () => this.stop());
    if (this.resetBtn) this.resetBtn.addEventListener('click', () => this.reset());
    if (this.genTipsBtn) this.genTipsBtn.addEventListener('click', () => this.generateCustomTips());

    this.tips = [...this.defaultTips];
    this.updateDisplay();
  },

  start() {
    if (this.isRunning) return;

    const minutes = parseInt(this.minutesInput?.value) || 5;
    if (this.remaining <= 0) {
      this.totalSeconds = minutes * 60;
      this.remaining = this.totalSeconds;
    }

    this.isRunning = true;
    this.startBtn.classList.add('hidden');
    this.stopBtn.classList.remove('hidden');

    this.interval = setInterval(() => this.tick(), 1000);

    // Show tips every 30 seconds
    this.showTip();
    this.tipInterval = setInterval(() => this.showTip(), 30000);

    App.showToast('Timer dimulai! Good luck! 🔥');
  },

  stop() {
    this.isRunning = false;
    clearInterval(this.interval);
    clearInterval(this.tipInterval);

    this.startBtn.classList.remove('hidden');
    this.stopBtn.classList.add('hidden');
    this.startBtn.textContent = '▶️ Lanjut';
  },

  reset() {
    this.stop();
    const minutes = parseInt(this.minutesInput?.value) || 5;
    this.totalSeconds = minutes * 60;
    this.remaining = this.totalSeconds;
    this.currentTipIdx = 0;
    this.startBtn.textContent = '▶️ Mulai Live';
    this.updateDisplay();
    if (this.tipContainer) this.tipContainer.classList.add('hidden');
  },

  tick() {
    this.remaining--;
    this.updateDisplay();

    if (this.remaining <= 0) {
      this.stop();
      App.showToast('Waktu habis! Great job! 🎉');
      // Flash animation
      if (this.display) {
        this.display.style.animation = 'countPulse 0.5s ease 3';
      }
    }
  },

  updateDisplay() {
    if (!this.display) return;
    const min = Math.floor(Math.max(0, this.remaining) / 60);
    const sec = Math.max(0, this.remaining) % 60;
    this.display.textContent = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;

    // Color change when time running low
    if (this.remaining <= 30 && this.remaining > 0) {
      this.display.style.background = 'linear-gradient(135deg, #FF2D55 0%, #FF6B35 100%)';
      this.display.style.webkitBackgroundClip = 'text';
    }
  },

  showTip() {
    if (!this.tipContainer) return;
    const tip = this.tips[this.currentTipIdx % this.tips.length];
    this.tipContainer.classList.remove('hidden');
    this.tipContainer.textContent = tip;
    this.tipContainer.style.animation = 'none';
    this.tipContainer.offsetHeight; // Reflow
    this.tipContainer.style.animation = 'fadeInUp 0.4s ease, fadeIn 0.3s ease';

    this.currentTipIdx++;

    // Auto-hide after 8 seconds
    setTimeout(() => {
      if (this.tipContainer) {
        this.tipContainer.style.opacity = '0';
        this.tipContainer.style.transition = 'opacity 0.5s';
        setTimeout(() => {
          if (this.tipContainer) {
            this.tipContainer.style.opacity = '1';
            this.tipContainer.style.transition = '';
          }
        }, 600);
      }
    }, 8000);
  },

  async generateCustomTips() {
    const product = this.productInput?.value?.trim();
    if (!product) {
      App.showToast('Isi nama produk dulu untuk tips yang lebih relevan! 😊', 'error');
      return;
    }

    if (!GeminiAI.isReady()) {
      App.showSetupModal();
      return;
    }

    this.genTipsBtn.disabled = true;
    this.genTipsBtn.textContent = '⏳ Generating...';

    try {
      const result = await GeminiAI.generateTips(product);
      // Parse tips (each line starting with emoji)
      const parsed = result.split('\n').filter(l => l.trim().length > 2);
      if (parsed.length > 0) {
        this.tips = parsed;
        this.currentTipIdx = 0;
        App.showToast(`${parsed.length} tips dibuat untuk "${product}"! 🎯`);
      }
    } catch (error) {
      App.showToast(error.message, 'error');
    } finally {
      this.genTipsBtn.disabled = false;
      this.genTipsBtn.textContent = '🤖 Generate Tips AI';
    }
  }
};

document.addEventListener('DOMContentLoaded', () => LiveTimer.init());
