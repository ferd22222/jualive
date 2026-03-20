// ============================================
// JuaLive — Script Generator Logic
// ============================================

const ScriptGen = {
  init() {
    this.form = document.getElementById('script-form');
    this.outputBox = document.getElementById('script-output');
    this.generateBtn = document.getElementById('generate-btn');
    this.copyBtn = document.getElementById('copy-btn');
    this.shareBtn = document.getElementById('share-btn');
    this.loadingEl = document.getElementById('script-loading');

    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.generate();
      });
    }

    if (this.copyBtn) {
      this.copyBtn.addEventListener('click', () => {
        if (this.lastScript) App.copyText(this.lastScript);
      });
    }

    if (this.shareBtn) {
      this.shareBtn.addEventListener('click', () => {
        if (this.lastScript) App.shareWhatsApp(this.lastScript);
      });
    }

    this.lastScript = '';
    this.updateUsageDisplay();
  },

  updateUsageDisplay() {
    const el = document.getElementById('usage-counter');
    if (el) {
      const used = JuaLiveStorage.getUsageToday();
      const max = JuaLiveStorage.getMaxUsage();
      el.textContent = `${used}/${max} hari ini`;
    }
  },

  async generate() {
    if (!GeminiAI.hasApiKey()) {
      App.showApiKeyModal();
      return;
    }

    if (!JuaLiveStorage.canUseAI()) {
      App.showToast('Batas harian tercapai! Upgrade untuk lebih banyak 🚀', 'error');
      return;
    }

    const params = {
      productName: document.getElementById('product-name').value.trim(),
      category: document.getElementById('product-category').value,
      price: document.getElementById('product-price').value.trim(),
      platform: document.getElementById('platform').value,
      tone: document.getElementById('tone').value,
      audience: document.getElementById('audience').value.trim(),
      description: document.getElementById('product-desc').value.trim()
    };

    if (!params.productName || !params.price) {
      App.showToast('Isi nama produk & harga dulu ya! 😊', 'error');
      return;
    }

    // Show loading
    this.setLoading(true);

    try {
      const script = await GeminiAI.generateScript(params);
      this.lastScript = script;

      // Display
      this.outputBox.classList.remove('empty');
      this.outputBox.textContent = script;
      document.getElementById('output-actions').classList.remove('hidden');

      // Save to history
      JuaLiveStorage.saveScript({
        product: params.productName,
        platform: params.platform,
        script: script
      });

      this.updateUsageDisplay();
      App.showToast('Script berhasil dibuat! 🎉');

    } catch (error) {
      App.showToast(error.message, 'error');
    } finally {
      this.setLoading(false);
    }
  },

  setLoading(isLoading) {
    if (isLoading) {
      this.generateBtn.disabled = true;
      this.generateBtn.innerHTML = '<div class="loading-spinner" style="width:20px;height:20px;border-width:2px;"></div> Generating...';
      this.outputBox.classList.add('empty');
      this.outputBox.innerHTML = '<div class="loading-dots"><span></span><span></span><span></span></div> AI sedang membuat script...';
    } else {
      this.generateBtn.disabled = false;
      this.generateBtn.innerHTML = '✨ Generate Script';
    }
  }
};

document.addEventListener('DOMContentLoaded', () => ScriptGen.init());
