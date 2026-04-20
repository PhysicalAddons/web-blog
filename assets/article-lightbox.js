(() => {
  const article = document.querySelector('.single-article');
  const content = article?.querySelector('.single-article__content');
  const lightbox = article?.querySelector('[data-lightbox]');
  const lightboxImage = lightbox?.querySelector('.single-article__lightbox-image');
  const lightboxCaption = lightbox?.querySelector('.single-article__lightbox-caption');
  const closeButton = lightbox?.querySelector('.single-article__lightbox-close');
  const pageBody = document.body;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const animationDuration = 260;
  let activeSourceImage = null;
  let animationToken = 0;
  let activeGhost = null;

  if (!content || !lightbox || !lightboxImage || !lightboxCaption || !closeButton) {
    return;
  }

  const zoomableImages = content.querySelectorAll('img');
  if (!zoomableImages.length) {
    return;
  }

  const isValidRect = (rect) => rect.width > 0 && rect.height > 0;

  const cleanupGhost = () => {
    if (activeGhost) {
      activeGhost.remove();
      activeGhost = null;
    }
  };

  const hideLightboxShell = () => {
    lightbox.classList.remove('single-article__lightbox--visible');
    lightbox.classList.remove('single-article__lightbox--ready');
    lightbox.classList.remove('single-article__lightbox--animating');
    lightbox.style.pointerEvents = '';
    lightbox.hidden = true;
    pageBody.classList.remove('image-viewer-open');
  };

  const clearLightboxContent = () => {
    cleanupGhost();
    lightboxImage.removeAttribute('src');
    lightboxImage.alt = '';
    lightboxCaption.textContent = '';
    lightboxCaption.hidden = true;
    activeSourceImage = null;
  };

  const resetLightbox = () => {
    hideLightboxShell();
    clearLightboxContent();
  };

  const showLightboxContents = () => {
    lightbox.classList.add('single-article__lightbox--visible');
    lightbox.classList.add('single-article__lightbox--ready');
    lightbox.classList.remove('single-article__lightbox--animating');
    lightbox.style.pointerEvents = 'auto';
  };

  const waitForImageLayout = (callback) => {
    const run = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(callback);
      });
    };

    if (lightboxImage.complete && lightboxImage.naturalWidth > 0) {
      run();
      return;
    }

    lightboxImage.addEventListener('load', run, { once: true });
    lightboxImage.addEventListener('error', run, { once: true });
  };

  const upgradeLightboxImage = (source, token) => {
    if (!source || source === lightboxImage.currentSrc || source === lightboxImage.src) {
      return;
    }

    const fullImage = new Image();
    fullImage.decoding = 'async';
    fullImage.src = source;
    fullImage.addEventListener(
      'load',
      () => {
        if (token !== animationToken || lightbox.hidden) {
          return;
        }

        lightboxImage.src = source;
      },
      { once: true }
    );
  };

  const createGhost = (rect, src, altText) => {
    const ghost = document.createElement('img');
    ghost.className = 'single-article__lightbox-ghost';
    ghost.src = src;
    ghost.alt = altText;
    ghost.style.left = `${rect.left}px`;
    ghost.style.top = `${rect.top}px`;
    ghost.style.width = `${rect.width}px`;
    ghost.style.height = `${rect.height}px`;
    document.body.appendChild(ghost);
    activeGhost = ghost;
    return ghost;
  };

  const fadeOutGhost = (ghost, onFinish) => {
    requestAnimationFrame(() => {
      ghost.style.opacity = '0';
    });

    window.setTimeout(() => {
      if (activeGhost === ghost) {
        cleanupGhost();
      } else {
        ghost.remove();
      }

      onFinish?.();
    }, 180);
  };

  const transitionGhost = (ghost, targetRect, onFinish) => {
    let isDone = false;
    let fallbackTimer = 0;

    const finish = () => {
      if (isDone) {
        return;
      }

      isDone = true;
      window.clearTimeout(fallbackTimer);
      ghost.removeEventListener('transitionend', handleTransitionEnd);
      onFinish();
    };

    const handleTransitionEnd = (event) => {
      if (event.target === ghost && event.propertyName === 'width') {
        finish();
      }
    };

    ghost.addEventListener('transitionend', handleTransitionEnd);

    fallbackTimer = window.setTimeout(finish, animationDuration + 80);

    requestAnimationFrame(() => {
      ghost.style.left = `${targetRect.left}px`;
      ghost.style.top = `${targetRect.top}px`;
      ghost.style.width = `${targetRect.width}px`;
      ghost.style.height = `${targetRect.height}px`;
    });
  };

  const closeLightbox = () => {
    if (lightbox.hidden) {
      return;
    }

    animationToken += 1;
    const token = animationToken;

    if (
      prefersReducedMotion.matches ||
      !activeSourceImage ||
      !document.body.contains(activeSourceImage)
    ) {
      resetLightbox();
      return;
    }

    const fromRect = lightboxImage.getBoundingClientRect();
    const toRect = activeSourceImage.getBoundingClientRect();
    if (!isValidRect(fromRect) || !isValidRect(toRect)) {
      resetLightbox();
      return;
    }

    cleanupGhost();
    const ghost = createGhost(fromRect, lightboxImage.currentSrc || lightboxImage.src, lightboxImage.alt);

    hideLightboxShell();

    transitionGhost(ghost, toRect, () => {
      if (token === animationToken) {
        clearLightboxContent();
      }
    });
  };

  const openLightbox = (image) => {
    animationToken += 1;
    const token = animationToken;
    const source = image.closest('a')?.href || image.currentSrc || image.src;
    const altText = image.getAttribute('alt') || '';
    const previewSource = image.currentSrc || image.src;
    const fromRect = image.getBoundingClientRect();

    activeSourceImage = image;
    cleanupGhost();

    lightbox.hidden = false;
    lightbox.classList.add('single-article__lightbox--visible');
    lightbox.classList.add('single-article__lightbox--animating');
    lightbox.classList.remove('single-article__lightbox--ready');
    lightbox.style.pointerEvents = 'none';

    lightboxImage.src = previewSource;
    lightboxImage.alt = altText;
    lightboxCaption.textContent = altText;
    lightboxCaption.hidden = !altText;
    pageBody.classList.add('image-viewer-open');

    waitForImageLayout(() => {
      if (token !== animationToken || lightbox.hidden) {
        return;
      }

      const toRect = lightboxImage.getBoundingClientRect();
      if (
        prefersReducedMotion.matches ||
        !isValidRect(fromRect) ||
        !isValidRect(toRect)
      ) {
        showLightboxContents();
        return;
      }

      const ghost = createGhost(fromRect, previewSource, altText);
      transitionGhost(ghost, toRect, () => {
        if (token !== animationToken) {
          return;
        }

        showLightboxContents();
        fadeOutGhost(ghost);
        upgradeLightboxImage(source, token);
      });
    });
  };

  zoomableImages.forEach((image) => {
    image.classList.add('single-article__zoomable-image');
    image.setAttribute('tabindex', '0');
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', 'Open image in viewer');
  });

  content.addEventListener('click', (event) => {
    const image = event.target.closest('img');
    if (!image || !content.contains(image)) {
      return;
    }

    event.preventDefault();
    openLightbox(image);
  });

  content.addEventListener('keydown', (event) => {
    const image = event.target.closest('.single-article__zoomable-image');
    if (!image) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openLightbox(image);
    }
  });

  closeButton.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!lightbox.hidden && event.key === 'Escape') {
      closeLightbox();
    }
  });
})();
