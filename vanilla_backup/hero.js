/* ═══════════════════════════════════════════════════════════════ */
/*  QABAS HERO — GSAP ANIMATION ORCHESTRATION                    */
/*  Dual Spotlight Reveal (Cyan & Red) + 3D Text & Brand Slogan   */
/* ═══════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  var LAYER_COUNT = 5;
  var OFFSET_X = -2.5; // RTL offset direction
  var OFFSET_Y = 2.5;
  var BACK_ALPHA_MAX = 0.50;
  var BACK_ALPHA_STEP = 0.09;
  var BACK_ALPHA_MIN = 0.10;
  var RED_RGB = "229, 36, 39";
  var CYAN_RGB = "0, 163, 224";
  var PARTICLE_COUNT = 32;
  var LABEL = "QABAS";

  // DOM refs
  var nav = document.getElementById("nav");
  var beamCyan = document.getElementById("beamCyan");
  var beamRed = document.getElementById("beamRed");
  var floorStage = document.getElementById("floorStage");
  var floorPool = document.getElementById("floorPool");
  var floorGlow = document.getElementById("floorGlow");
  var floorRim = document.getElementById("floorRim");
  var glowBloom = document.getElementById("glowBloom");
  var logoWrapper = document.getElementById("logoWrapper");
  var heroLogo = document.getElementById("heroLogo");
  var logoGlow = document.getElementById("logoGlow");
  var arabicTitle = document.getElementById("arabicTitle");
  var text3dWrapper = document.getElementById("text3dWrapper");
  var sloganWrapper = document.getElementById("sloganWrapper");
  var scrollHint = document.getElementById("scrollHint");
  var particlesContainer = document.getElementById("particles");

  // ── Build 3D depth text layers ──
  for (var i = LAYER_COUNT - 1; i >= 0; i--) {
    var el = document.createElement("div");
    el.className = "hero__depth-text " + (i === 0 ? "is-front" : "is-back");
    el.textContent = LABEL;
    el.setAttribute("aria-hidden", i === 0 ? "false" : "true");

    if (i > 0) {
      var alpha = Math.max(BACK_ALPHA_MAX - i * BACK_ALPHA_STEP, BACK_ALPHA_MIN);
      el.style.color = (i % 2 === 0) ? "rgba(" + RED_RGB + ", " + alpha + ")" : "rgba(" + CYAN_RGB + ", " + alpha + ")";
      el.style.transform = "translate(" + (i * OFFSET_X) + "px, " + (i * OFFSET_Y) + "px)";
    }

    el.dataset.layer = String(i);
    text3dWrapper.appendChild(el);
  }

  // ── Build dust particles ──
  var particleEls = [];
  for (var p = 0; p < PARTICLE_COUNT; p++) {
    var dot = document.createElement("div");
    dot.className = "hero__particle";

    var seed1 = ((p * 374761393 + 668265263) ^ ((p * 374761393 + 668265263) >> 13)) >>> 0;
    var seed2 = ((p * 668265263 + 374761393) ^ ((p * 668265263 + 374761393) >> 13)) >>> 0;
    var seed3 = (((p + 7) * 1274126177) ^ (((p + 7) * 1274126177) >> 16)) >>> 0;

    var px = 15 + ((seed1 % 1000) / 1000) * 70;
    var py = 15 + ((seed2 % 1000) / 1000) * 65;
    var size = 2 + ((seed3 % 1000) / 1000) * 2.5;

    dot.style.left = px + "%";
    dot.style.top = py + "%";
    dot.style.width = size + "px";
    dot.style.height = size + "px";

    if (px < 50) {
      dot.style.background = "#00A3E0";
      dot.style.boxShadow = "0 0 8px #00A3E0";
    } else {
      dot.style.background = "#E52427";
      dot.style.boxShadow = "0 0 8px #E52427";
    }

    particlesContainer.appendChild(dot);
    particleEls.push({ el: dot, seed: p });
  }

  // ── Master Timeline ──
  var tl = gsap.timeline({ delay: 0.2 });

  // Phase 1: Dual Light Beams + Stage Illuminate
  tl.fromTo(
    floorStage,
    { opacity: 0, scale: 0.6 },
    { opacity: 1, scale: 1, duration: 2.0, ease: "power2.out" },
    0
  );

  tl.fromTo(
    beamCyan,
    { opacity: 0, scaleX: 0.4 },
    { opacity: 1, scaleX: 1, duration: 1.8, ease: "power2.out" },
    0.2
  );

  tl.fromTo(
    beamRed,
    { opacity: 0, scaleX: 0.4 },
    { opacity: 1, scaleX: 1, duration: 1.8, ease: "power2.out" },
    0.3
  );

  // Phase 2: Logo Descends
  tl.fromTo(
    logoWrapper,
    { opacity: 0, y: -45, scale: 0.7 },
    { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power3.out" },
    0.8
  );

  tl.fromTo(
    logoGlow,
    { opacity: 0, scale: 0.5 },
    { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" },
    1.0
  );

  // Phase 3: Main Arabic Title "قبس" Reveal
  tl.fromTo(
    "#arabicHeroWrapper",
    { opacity: 0, y: 25, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: "power3.out" },
    1.2
  );

  // Phase 4: 3D Text "QABAS" reveal & depth build
  var depthLayers = text3dWrapper.querySelectorAll(".hero__depth-text");
  depthLayers.forEach(function (layer) {
    var idx = Number(layer.dataset.layer);
    var finalAlpha = idx === 0 ? 1 : Math.max(BACK_ALPHA_MAX - idx * BACK_ALPHA_STEP, BACK_ALPHA_MIN);

    tl.fromTo(
      layer,
      { opacity: 0 },
      { opacity: finalAlpha, duration: 0.5, ease: "power2.out" },
      1.5 + (LAYER_COUNT - 1 - idx) * 0.05
    );
  });

  // Ambient glow bloom behind text
  tl.fromTo(
    glowBloom,
    { opacity: 0, scale: 0.7 },
    { opacity: 0.35, scale: 1, duration: 1.2, ease: "power2.out" },
    1.6
  );

  // Phase 5: Slogan Badge + Nav + Scroll Hint
  tl.fromTo(
    sloganWrapper,
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
    2.0
  );

  tl.fromTo(
    nav,
    { opacity: 0, y: -15 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
    2.2
  );

  particleEls.forEach(function (item, idx) {
    var seed = ((idx * 1274126177 + 374761393) ^ ((idx * 1274126177 + 374761393) >> 13)) >>> 0;
    var delay = 1.6 + (seed % 1500) / 1000;
    var peakOpacity = 0.2 + ((seed % 500) / 500) * 0.5;

    tl.fromTo(
      item.el,
      { opacity: 0 },
      { opacity: peakOpacity, duration: 0.5, ease: "power1.out" },
      delay
    );
  });

  tl.fromTo(
    scrollHint,
    { opacity: 0, y: -6 },
    { opacity: 0.7, y: 0, duration: 0.5, ease: "power2.out" },
    2.8
  );

  // ── Continuous Idles ──

  // Logo floating
  var logoPhase = { p: 0 };
  gsap.to(logoPhase, {
    p: Math.PI * 2 * 12,
    duration: 12 * 3.2,
    ease: "none",
    repeat: -1,
    onUpdate: function () {
      var s = Math.sin(logoPhase.p);
      heroLogo.style.transform = "translateY(" + (s * 6) + "px)";
    }
  });

  // 3D Text slow Y rotation
  var textRotation = { y: 0 };
  gsap.to(textRotation, {
    y: 360,
    duration: 32,
    ease: "none",
    repeat: -1,
    onUpdate: function () {
      text3dWrapper.style.transform = "rotateY(" + textRotation.y + "deg)";
    }
  });

  // Beams slow sway
  gsap.to(beamCyan, {
    scaleX: 1.08,
    duration: 4.5,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1
  });

  gsap.to(beamRed, {
    scaleX: 1.1,
    duration: 5.2,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1
  });

  // Particle drift
  particleEls.forEach(function (item, idx) {
    var seed = ((idx * 668265263 + 1274126177) ^ ((idx * 668265263 + 1274126177) >> 16)) >>> 0;
    var driftY = -30 - (seed % 40);
    var driftDur = 8 + (seed % 14);
    var driftDelay = (seed % 4000) / 1000;

    gsap.to(item.el, {
      y: driftY,
      opacity: 0,
      duration: driftDur,
      ease: "none",
      repeat: -1,
      delay: driftDelay,
      onRepeat: function () {
        gsap.set(item.el, { y: 0, opacity: 0.2 + ((seed % 350) / 350) * 0.4 });
      }
    });
  });

})();
