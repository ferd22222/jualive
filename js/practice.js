// ============================================
// JuaLive — Practice Mode Logic
// ============================================

const Practice = {
  isRunning: false,
  startTime: null,
  elapsed: 0,
  timerInterval: null,
  scriptLines: [],
  currentLineIdx: 0,
  scrollInterval: null,

  init() {
    this.startBtn = document.getElementById('practice-start');
    this.stopBtn = document.getElementById('practice-stop');
    this.timerDisplay = document.getElementById('practice-timer');
    this.teleprompter = document.getElementById('teleprompter');
    this.scriptInput = document.getElementById('practice-script');
    this.feedbackBox = document.getElementById('practice-feedback');
    this.feedbackBtn = document.getElementById('feedback-btn');

    if (this.startBtn) {
      this.startBtn.addEventListener('click', () => this.start());
    }
    if (this.stopBtn) {
      this.stopBtn.addEventListener('click', () => this.stop());
    }
    if (this.feedbackBtn) {
      this.feedbackBtn.addEventListener('click', () => this.getFeedback());
    }

    // Load last script from history
    this.loadLastScript();
  },

  loadLastScript() {
    const scripts = JuaLiveStorage.getScripts();
    if (scripts.length > 0 && this.scriptInput) {
      this.scriptInput.value = scripts[0].script || '';
    }
  },

  start() {
    const text = this.scriptInput?.value?.trim();
    if (!text) {
      App.showToast('Paste atau tulis script dulu! Atau generate di Script Generator 📝', 'error');
      return;
    }

    this.isRunning = true;
    this.startTime = Date.now();
    this.elapsed = 0;

    // Parse lines
    this.scriptLines = text.split('\n').filter(l => l.trim());
    this.currentLineIdx = 0;

    // Update UI
    this.startBtn.classList.add('hidden');
    this.stopBtn.classList.remove('hidden');
    this.scriptInput.readOnly = true;
    this.feedbackBox.classList.add('hidden');

    // Render teleprompter
    this.renderTeleprompter();
    this.teleprompter.classList.remove('hidden');

    // Start timer
    this.timerInterval = setInterval(() => this.updateTimer(), 100);

    // Auto scroll teleprompter
    const scrollSpeed = Math.max(3000, 60000 / this.scriptLines.length); // ~1 min total
    this.scrollInterval = setInterval(() => this.advanceLine(), scrollSpeed);

    App.showToast('Practice dimulai! GO! 🎬');
  },

  stop() {
    this.isRunning = false;
    clearInterval(this.timerInterval);
    clearInterval(this.scrollInterval);

    // Update UI
    this.startBtn.classList.remove('hidden');
    this.stopBtn.classList.add('hidden');
    this.scriptInput.readOnly = false;

    // Save session
    const duration = Math.round((Date.now() - this.startTime) / 1000);
    JuaLiveStorage.savePractice({
      duration: duration,
      linesCompleted: this.currentLineIdx,
      totalLines: this.scriptLines.length
    });

    this.feedbackBtn.classList.remove('hidden');
    App.showToast(`Selesai! Durasi: ${this.formatTime(duration)} ⏱️`);
  },

  updateTimer() {
    this.elapsed = Date.now() - this.startTime;
    if (this.timerDisplay) {
      this.timerDisplay.textContent = this.formatTime(Math.round(this.elapsed / 1000));
    }
  },

  formatTime(totalSec) {
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  },

  renderTeleprompter() {
    if (!this.teleprompter) return;
    this.teleprompter.innerHTML = this.scriptLines.map((line, i) => {
      let cls = 'future-line';
      if (i < this.currentLineIdx) cls = 'past-line';
      if (i === this.currentLineIdx) cls = 'current-line';
      return `<div class="${cls}" data-line="${i}">${line}</div>`;
    }).join('');
  },

  advanceLine() {
    if (this.currentLineIdx < this.scriptLines.length - 1) {
      this.currentLineIdx++;
      this.renderTeleprompter();
      // Scroll to current line
      const currentEl = this.teleprompter.querySelector('.current-line');
      if (currentEl) {
        currentEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      this.stop();
    }
  },

  async getFeedback() {
    if (!GeminiAI.hasApiKey()) {
      App.showApiKeyModal();
      return;
    }

    this.feedbackBtn.disabled = true;
    this.feedbackBtn.textContent = '⏳ AI sedang menganalisis...';

    try {
      const practices = JuaLiveStorage.getPractices();
      const last = practices[0] || {};

      const feedback = await GeminiAI.generateFeedback({
        duration: last.duration || 0,
        scriptUsed: true,
        notes: `Completed ${last.linesCompleted || 0} of ${last.totalLines || 0} lines`
      });

      this.feedbackBox.classList.remove('hidden');
      this.feedbackBox.textContent = feedback;
      App.showToast('Feedback diterima! 🎯');
    } catch (error) {
      App.showToast(error.message, 'error');
    } finally {
      this.feedbackBtn.disabled = false;
      this.feedbackBtn.textContent = '🤖 Minta Feedback AI';
    }
  }
};

document.addEventListener('DOMContentLoaded', () => Practice.init());
