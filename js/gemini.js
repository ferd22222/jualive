// ============================================
// JuaLive — Gemini API Integration v2
// VERSI BARU: Pakai server proxy (user TIDAK perlu API key)
// ============================================

const GeminiAI = {
  // URL backend proxy (Cloudflare Worker)
  // Ganti ini setelah deploy worker
  proxyUrl: '',

  // Mode: 'proxy' (production) atau 'direct' (development/testing)
  mode: 'direct',

  // Direct mode config (untuk development saja)
  apiKey: '',
  model: 'gemini-2.5-flash-lite',
  baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models',

  init() {
    this.proxyUrl = JuaLiveStorage.get('proxy_url', '');
    this.apiKey = JuaLiveStorage.get('gemini_api_key', '');

    // Auto-detect mode
    if (this.proxyUrl) {
      this.mode = 'proxy';
    } else {
      this.mode = 'direct';
    }
  },

  setProxyUrl(url) {
    this.proxyUrl = url;
    this.mode = 'proxy';
    JuaLiveStorage.set('proxy_url', url);
  },

  setApiKey(key) {
    this.apiKey = key;
    this.mode = 'direct';
    JuaLiveStorage.set('gemini_api_key', key);
  },

  isReady() {
    if (this.mode === 'proxy') return !!this.proxyUrl;
    return this.apiKey && this.apiKey.length > 10;
  },

  async call(prompt, options = {}) {
    if (!this.isReady()) {
      throw new Error('Belum dikonfigurasi. Masuk ke Pengaturan.');
    }

    if (!JuaLiveStorage.canUseAI()) {
      const max = JuaLiveStorage.getMaxUsage();
      throw new Error(`Batas harian tercapai (${max}x/hari). Upgrade ke paket Starter untuk lebih banyak! 🚀`);
    }

    if (this.mode === 'proxy') {
      return this.callProxy(prompt, options);
    } else {
      return this.callDirect(prompt, options);
    }
  },

  // ── Proxy Mode (Production — user tidak perlu API key) ──
  async callProxy(prompt, options = {}) {
    const response = await fetch(this.proxyUrl + '/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        temperature: options.temperature || 0.8,
        maxTokens: options.maxTokens || 2048
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Gagal menghubungi server.');
    }

    JuaLiveStorage.incrementUsage();
    return data.result;
  },

  // ── Direct Mode (Development — pakai API key sendiri) ──
  async callDirect(prompt, options = {}) {
    const url = `${this.baseUrl}/${this.model}:generateContent?key=${this.apiKey}`;

    const body = {
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: options.temperature || 0.8,
        maxOutputTokens: options.maxTokens || 2048,
        topP: 0.95
      }
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        if (response.status === 429) {
          throw new Error('Terlalu banyak permintaan. Tunggu sebentar. ⏳');
        }
        if (response.status === 403) {
          throw new Error('API key tidak valid. 🔑');
        }
        throw new Error(errData.error?.message || `Error ${response.status}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error('AI tidak menghasilkan respons. Coba lagi.');
      }

      JuaLiveStorage.incrementUsage();
      return text;
    } catch (error) {
      if (error.message.includes('fetch')) {
        throw new Error('Tidak ada koneksi internet. 📶');
      }
      throw error;
    }
  },

  // ── Script Generator ──
  async generateScript(params) {
    const { productName, category, price, platform, tone, audience, description } = params;

    const prompt = `Kamu adalah pelatih live selling profesional Indonesia yang sangat berpengalaman. Buat script live selling yang LENGKAP dan DETAIL dalam Bahasa Indonesia yang natural dan energik.

INFORMASI PRODUK:
- Nama: ${productName}
- Kategori: ${category}
- Harga: Rp ${price}
- Platform: ${platform}
- Tone: ${tone}
- Target Audience: ${audience || 'Umum'}
- Deskripsi: ${description || '-'}

FORMAT SCRIPT (berikan semua bagian ini):

🎬 PEMBUKAAN (30 detik pertama — HOOK yang bikin orang stay):
[Tulis salam energik + hook yang bikin penasaran]

🔥 BANGUN ANTUSIASME (1 menit):
[Ceritakan masalah yang diselesaikan produk ini, tunjukkan benefit]

💎 REVEAL PRODUK (1-2 menit):
[Perkenalkan produk, fitur utama, keunggulan vs kompetitor]

🎯 SOCIAL PROOF (30 detik):
[Contoh testimoni, jumlah terjual, rating]

💰 HARGA & PROMO (30 detik):
[Reveal harga dengan teknik anchor pricing, diskon, bonus]

⚡ SCARCITY & URGENCY (30 detik):
[Stok terbatas, waktu terbatas, siapa cepat dia dapat]

📢 CTA — CALL TO ACTION (15 detik):
[Instruksi jelas cara beli: klik keranjang kuning, checkout sekarang]

🔄 TIPS ENGAGEMENT:
- 3 pertanyaan untuk ditanyakan ke penonton
- 3 respons untuk komentar umum
- 2 cara handle keberatan harga

Pastikan bahasa NATURAL seperti orang Indonesia ngomong, bukan kaku. Gunakan kata-kata: "guys", "kak", "bestie", "nih", "banget", "seriusan", dll sesuai tone ${tone}.`;

    return await this.call(prompt, { temperature: 0.85, maxTokens: 3000 });
  },

  // ── Practice Feedback ──
  async generateFeedback(practiceData) {
    const { duration, scriptUsed, notes } = practiceData;

    const prompt = `Kamu adalah pelatih live selling profesional. Berikan feedback dan saran perbaikan untuk sesi latihan live selling berikut:

Durasi latihan: ${duration} detik
Script yang dipakai: ${scriptUsed ? 'Ya' : 'Tidak'}
Catatan: ${notes || 'Tidak ada'}

Berikan feedback dalam format:

⭐ PENILAIAN UMUM: (1 paragraf singkat)

✅ YANG SUDAH BAGUS:
- (3 poin positif)

🔧 YANG PERLU DIPERBAIKI:
- (3 poin perbaikan spesifik)

💡 TIPS UNTUK SESI SELANJUTNYA:
- (3 tips actionable)

🎯 TANTANGAN: (Berikan 1 tantangan spesifik untuk latihan berikutnya)

Gunakan bahasa Indonesia casual dan supportif.`;

    return await this.call(prompt, { temperature: 0.7, maxTokens: 1500 });
  },

  // ── Live Tips Generator ──
  async generateTips(productName) {
    const prompt = `Berikan 10 tips singkat (masing-masing 1 kalimat) untuk ditampilkan saat live selling produk "${productName}". Format: satu tips per baris, diawali emoji. Tips harus actionable dan langsung bisa dipraktekan saat live.

Contoh format:
🎤 Sapa viewers baru yang masuk!
💰 Sebutkan harga sekarang!

Berikan tips yang bervariasi antara: engagement, urgency, storytelling, CTA, dan handling objection.`;

    return await this.call(prompt, { temperature: 0.9, maxTokens: 800 });
  }
};
