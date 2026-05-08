// ============================================================
// InfoAtlas project page — small interactions
// ============================================================

(function () {
  // -- Copy BibTeX entry to clipboard --
  const btn = document.getElementById('copyBibtexBtn');
  const pre = document.getElementById('bibtexEntry');
  if (btn && pre) {
    btn.addEventListener('click', async () => {
      const text = pre.innerText;
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        // Fallback for older browsers
        const range = document.createRange();
        range.selectNode(pre);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        try { document.execCommand('copy'); } catch (_) {}
        sel.removeAllRanges();
      }
      const label = btn.querySelector('span:last-child');
      const original = label ? label.textContent : 'Copy';
      btn.classList.add('copied');
      if (label) label.textContent = 'Copied';
      setTimeout(() => {
        btn.classList.remove('copied');
        if (label) label.textContent = original;
      }, 1600);
    });
  }
})();
