// ============================================================
// InfoAtlas project page — small interactions
// ============================================================

(function () {
  // -- Results gallery (interactive carousel) --
  const gallery = document.getElementById('resultsGallery');
  if (gallery) {
    const slides   = Array.from(gallery.querySelectorAll('.gallery-slide'));
    const dots     = Array.from(gallery.querySelectorAll('.gallery-dot'));
    const captionEl = document.getElementById('galleryCaption');
    const prevBtn  = gallery.querySelector('.gallery-prev');
    const nextBtn  = gallery.querySelector('.gallery-next');
    let idx = 0;

    function show(i) {
      idx = (i + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle('is-active', k === idx));
      dots.forEach((d, k)   => d.classList.toggle('is-active', k === idx));
      if (captionEl) {
        const cap = slides[idx].getAttribute('data-caption') || '';
        captionEl.innerHTML = cap;
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', () => show(idx - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => show(idx + 1));
    dots.forEach(d =>
      d.addEventListener('click', () => show(Number(d.dataset.index || 0)))
    );

    // Keyboard navigation when the gallery has focus
    gallery.addEventListener('keydown', (ev) => {
      if (ev.key === 'ArrowRight') { ev.preventDefault(); show(idx + 1); }
      else if (ev.key === 'ArrowLeft') { ev.preventDefault(); show(idx - 1); }
    });

    // Click-zones: tap the right half of the frame to advance, left to go back
    const track = gallery.querySelector('.gallery-track');
    if (track) {
      track.addEventListener('click', (ev) => {
        const rect = track.getBoundingClientRect();
        const x = ev.clientX - rect.left;
        if (x > rect.width / 2) show(idx + 1);
        else show(idx - 1);
      });
    }
  }

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
