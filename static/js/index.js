// ============================================================
// InfoAtlas project page — small interactions
// ============================================================

(function () {
  // -- Results gallery (auto-sizes to active slide) --
  const gallery = document.getElementById('resultsGallery');
  if (gallery) {
    const track    = gallery.querySelector('.gallery-track');
    const slides   = Array.from(gallery.querySelectorAll('.gallery-slide'));
    const dots     = Array.from(gallery.querySelectorAll('.gallery-dot'));
    const captionEl = document.getElementById('galleryCaption');
    const prevBtn  = gallery.querySelector('.gallery-prev');
    const nextBtn  = gallery.querySelector('.gallery-next');
    let idx = 0;

    function resizeTrack() {
      if (!track) return;
      const active = slides[idx];
      if (!active) return;
      // Slide is position:absolute with no bottom set, so offsetHeight reads
      // its natural content height. Set the track to match.
      const h = active.offsetHeight;
      if (h > 0) track.style.height = h + 'px';
    }

    function show(i) {
      idx = (i + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle('is-active', k === idx));
      dots.forEach((d, k)   => d.classList.toggle('is-active', k === idx));
      if (captionEl) {
        const cap = slides[idx].getAttribute('data-caption') || '';
        captionEl.innerHTML = cap;
      }
      resizeTrack();
    }

    if (prevBtn) prevBtn.addEventListener('click', (ev) => { ev.stopPropagation(); show(idx - 1); });
    if (nextBtn) nextBtn.addEventListener('click', (ev) => { ev.stopPropagation(); show(idx + 1); });
    dots.forEach(d =>
      d.addEventListener('click', (ev) => {
        ev.stopPropagation();
        show(Number(d.dataset.index || 0));
      })
    );

    // Keyboard navigation
    gallery.addEventListener('keydown', (ev) => {
      if (ev.key === 'ArrowRight') { ev.preventDefault(); show(idx + 1); }
      else if (ev.key === 'ArrowLeft') { ev.preventDefault(); show(idx - 1); }
    });

    // Click-zones: tap left/right half of the active slide to navigate.
    // Ignore taps on interactive children (links, buttons) and on the table cells
    // — that lets users select text without flipping the slide.
    if (track) {
      track.addEventListener('click', (ev) => {
        if (ev.target.closest('a, button, th, td')) return;
        const rect = track.getBoundingClientRect();
        const x = ev.clientX - rect.left;
        if (x > rect.width / 2) show(idx + 1);
        else show(idx - 1);
      });
    }

    // Recompute height when images finish loading and on viewport resize.
    const imgs = gallery.querySelectorAll('img');
    imgs.forEach(img => {
      if (img.complete) return;
      img.addEventListener('load',  resizeTrack, { once: true });
      img.addEventListener('error', resizeTrack, { once: true });
    });
    window.addEventListener('resize', () => {
      // throttle via rAF
      window.requestAnimationFrame(resizeTrack);
    });
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(() => resizeTrack());
      slides.forEach(s => ro.observe(s));
    }

    // First paint
    show(0);
    // Re-measure once more after fonts/styles settle
    window.requestAnimationFrame(() => window.requestAnimationFrame(resizeTrack));
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
