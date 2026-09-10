/* ================================================================
   CONFIG — edit everything in this block to make it yours.
   Nothing below this block needs to change for basic customizing.
   ================================================================ */
const CONFIG = {
  // Her name, used in a couple of headings.
  girlfriendName: "Maheen",

  // The opening question. Keep it short — it has to fit one line
  // on a small phone screen at a large size.
  question: "Wanna see something cool?",

  // Messages shown under the buttons as she presses "No".
  // The last one repeats if she keeps clicking.
  noClickMessages: [
    "Think again?",
    "Are you sure?",
    "Really sure?",
    "Last chance...",
    "SEEDHA SEEDHA YES PRESS KARO!",
    "yes goodboy ahhahahah"
  ],

  // The letter. Each string in the array becomes its own paragraph.
  lletter: [
    `Meenu(with da teddybear emoji),`,
    `I couldnt have gotten a gift anyway so i thought might as well do something different right. Im a little gay bitch so i dont know what to write but just know im trying my best lmaoo.`,
    `Okay so first of all, you absolutely ditched me for most of that Islamabad trip and I have never fully forgiven you for it, but somehow I still ended up texting you every single day since, so clearly my judgment is broken. You're annoying as fuck btw, and im sick of your age jokes. I think about you more than any semi-sane person should think about someone they've met exactly once in real life, and then im like wow what a loser you are haha.
      But also like I'm kind of glad Hania decided to be a menace and make us meet, because whatever this is, brainrot and all, has turned into a very enjoyable part of my days.
mb this is me saying it a little sideways instead of straight up, so samajh jana bas.`,
    `ap bas andaza lagao how much to me that if we were on a boat that was sinking, and somehow there was only one lifejacket, im obviously gonna take it; but id miss you dearly though 🥹🥹
sab choro weese lmk how u liked my unique new birthday wishing tactic, THIS IS NO LESS THAN A GIFT OKAY? MERE ALL NIGHTERS LAGE HAIN U BETTER APPRECIATE THE GRINDING I DID FOR U lol.`,
    `Happy sixsevennnn birthday. I hope this year is as shit to you as were to me and
     to everyone around you (jox you werent). I'm grateful you got posted to samungli hhahaha. I hope you have a good day, and that you get to spend it with people who make you feel just as good.`,
    `dekho kitna kuch likh liya ap creativity check karo bas`
  ],
  letterSignature: "— cyzer",
  // Short reasons — keep each one to a single sentence.
  reasons: [
    "STOP SPILLING THE SHIT I TELL YOU TO RANDOS okay warna ill stop telling u stuff 🥹",
    "Cindy malt was dogshit btw, i drank it all in and i still feel like i wasted my life, only because apne khareeda tha",
    "give me rhodedendron wali gmail back thanks AND DONT GIVE YOUR PLAYLISTS NAMES LIKE YEARNING 😭😭",
    "You've perfected the art of leaving me on read for six hours and then sending fifteen messages in a row which is weird.",
    "I still have not recieved a sibglke gift u bragged to me about ke ill give to ur mom blahblah so you might wanna work on that :p",
    "heres some tareef for you, but dont get used to it. You're a genuinely good time, even over text, which should not be possible.",
  ],

  // Final screen.
  finalHeading: "To many more.",
  finalMessage:
    "itni tareef sehat keliye achi nhi hoti hahahahh so pipe down princess" +
    "  and have a good one",

  // Optional: set to a date string like "2022-05-14" to show a
  // "together for N days" line on the final screen. Set to null
  // to hide it entirely.
  relationshipStartDate: null,

  // Optional background music. Drop an mp3 at music/song.mp3 and
  // leave this true; the button will control play/pause. If you
  // don't want music at all, set this to false.
  enableMusic: true,
};

/* ================================================================
   Scene management
   ================================================================ */
const screens = Array.from(document.querySelectorAll(".screen"));

function goToScreen(name) {
  screens.forEach((el) => {
    el.classList.toggle("active", el.dataset.screen === name);
  });
  if (name === "final") {
    startConfetti();
  }
}

/* ================================================================
   Scene 1 — Yes / No question
   ================================================================ */
(function setupQuestion() {
  const heading = document.getElementById("questionHeading");
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const field = document.getElementById("btnField");
  const thinkAgain = document.getElementById("thinkAgain");

  heading.textContent = CONFIG.question;

  let clicks = 0;
  const MAX_SCALE = 2.1;
  const MIN_SCALE = 0.35;

  noBtn.addEventListener("click", () => {
    clicks += 1;

    const growth = Math.min(1 + clicks * 0.18, MAX_SCALE);
    const shrink = Math.max(1 - clicks * 0.14, MIN_SCALE);
    yesBtn.style.transform = `scale(${growth})`;
    noBtn.style.transform = `scale(${shrink})`;

    const msgIndex = Math.min(clicks - 1, CONFIG.noClickMessages.length - 1);
    thinkAgain.textContent = CONFIG.noClickMessages[msgIndex];

    
    if (clicks >= 2) {
      noBtn.classList.add("roaming");
      const bounds = field.getBoundingClientRect();
      const btnRect = noBtn.getBoundingClientRect();
      const maxLeft = Math.max(bounds.width - btnRect.width, 20);
      const maxTop = Math.max(bounds.height - btnRect.height, 20);
      const randomLeft = Math.random() * maxLeft;
      const randomTop = Math.random() * maxTop;
      noBtn.style.left = `${randomLeft}px`;
      noBtn.style.top = `${randomTop}px`;
    }

    if (shrink <= MIN_SCALE) {
      noBtn.style.opacity = "0.35";
      noBtn.disabled = true;
    }
  });

  yesBtn.addEventListener("click", () => {
    goToScreen("envelope");
  });
})();

/* ================================================================
   Scene 2 — Envelope
   ================================================================ */
(function setupEnvelope() {
  const envelope = document.getElementById("envelope");
  const hint = document.getElementById("envelopeHint");
  let opened = false;

  envelope.addEventListener("click", () => {
    if (opened) return;
    opened = true;
    envelope.classList.add("is-open");
    hint.textContent = "opening...";

    window.setTimeout(() => {
      renderLetter();
      goToScreen("letter");
    }, 1100);
  });
})();

/* ================================================================
   Scene 3 — Letter
   ================================================================ */
function renderLetter() {
  const content = document.getElementById("letterContent");
  const signature = document.getElementById("letterSignature");

  content.innerHTML = "";
  CONFIG.letter.forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph.replace(/\s+/g, " ").trim();
    content.appendChild(p);
  });
  signature.textContent = CONFIG.letterSignature;
}

document.getElementById("continueFromLetterBtn").addEventListener("click", () => {
  if (CONFIG.reasons && CONFIG.reasons.length > 0) {
    renderReasons();
    goToScreen("reasons");
  } else {
    goToScreen("cake");
  }
});

/* ================================================================
   Scene 4 — Reasons
   ================================================================ */
function renderReasons() {
  const grid = document.getElementById("reasonsGrid");
  grid.innerHTML = "";
  CONFIG.reasons.forEach((reason, i) => {
    const card = document.createElement("div");
    card.className = "reason-card";
    card.style.animationDelay = `${i * 90}ms`;
    card.textContent = reason;
    grid.appendChild(card);
  });
}

document.getElementById("continueFromReasonsBtn").addEventListener("click", () => {
  setupCake();
  goToScreen("cake");
});

/* ================================================================
   Scene 5 — Cake with candles
   ================================================================ */
let cakeInitialised = false;

function setupCake() {
  if (cakeInitialised) return;
  cakeInitialised = true;

  const candlesEl = document.getElementById("candles");
  const hint = document.getElementById("cakeHint");
  const continueBtn = document.getElementById("continueFromCakeBtn");
  const CANDLE_COUNT = 5;

  let remaining = CANDLE_COUNT;

  for (let i = 0; i < CANDLE_COUNT; i += 1) {
    const candle = document.createElement("div");
    candle.className = "candle";
    const flame = document.createElement("div");
    flame.className = "flame";
    candle.appendChild(flame);

    candle.addEventListener("click", () => {
      if (candle.classList.contains("blown")) return;
      candle.classList.add("blown");
      remaining -= 1;

      if (remaining === 0) {
        hint.textContent = "make your wish and email it to me id like to know.(sab choro CAKE CHECK KARO!)";
        continueBtn.classList.remove("is-hidden");
      }
    });

    candlesEl.appendChild(candle);
  }
}

document.getElementById("continueFromCakeBtn").addEventListener("click", () => {
  renderFinal();
  goToScreen("final");
});

/* ================================================================
   Scene 6 — Finale
   ================================================================ */
function renderFinal() {
  document.getElementById("finalHeading").textContent = CONFIG.finalHeading;
  document.getElementById("finalMessage").textContent = CONFIG.finalMessage;

  const counterEl = document.getElementById("togetherCounter");
  if (CONFIG.relationshipStartDate) {
    const start = new Date(CONFIG.relationshipStartDate);
    const days = Math.floor((Date.now() - start.getTime()) / 86400000);
    if (!Number.isNaN(days) && days >= 0) {
      counterEl.textContent = `${days.toLocaleString()} days, and counting.`;
      counterEl.classList.remove("is-hidden");
    }
  }
}

/* ================================================================
   Confetti (lightweight, no external library)
   ================================================================ */
let confettiStarted = false;

function startConfetti() {
  if (confettiStarted) return;
  confettiStarted = true;

  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");
  const colors = ["#7a2333", "#c98a93", "#b8873b", "#d9b06a", "#f1e2c4"];

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const pieceCount = window.innerWidth < 600 ? 60 : 120;
  const pieces = Array.from({ length: pieceCount }, () => spawnPiece());

  function spawnPiece() {
    return {
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.5,
      size: 4 + Math.random() * 6,
      speed: 1.2 + Math.random() * 2.2,
      drift: (Math.random() - 0.5) * 1.6,
      spin: Math.random() * Math.PI * 2,
      spinSpeed: (Math.random() - 0.5) * 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let frames = 0;
  const MAX_FRAMES = reduceMotion ? 0 : 620;

  function tick() {
    frames += 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach((p) => {
      p.y += p.speed;
      p.x += p.drift;
      p.spin += p.spinSpeed;
      if (p.y > canvas.height + 20) {
        Object.assign(p, spawnPiece(), { y: -20 });
      }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.spin);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    });

    if (frames < MAX_FRAMES) {
      requestAnimationFrame(tick);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  if (!reduceMotion) tick();
}

/* ================================================================
   Ambient floating hearts (background decoration, all scenes)
   ================================================================ */
(function setupFloatingHearts() {
  const container = document.getElementById("heartsBg");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const HEART_PATH =
    "M12 21s-7.5-4.7-10-9.2C.4 8.6 2 5 5.4 5c1.9 0 3.4 1 4.6 2.6C11.2 6 " +
    "12.7 5 14.6 5 18 5 19.6 8.6 22 11.8 19.5 16.3 12 21 12 21z";

  function spawnHeart() {
    const wrapper = document.createElement("span");
    wrapper.className = "floating-heart";
    const size = 10 + Math.random() * 16;
    const left = Math.random() * 100;
    const duration = 9 + Math.random() * 8;
    const drift = (Math.random() - 0.5) * 120;

    wrapper.style.left = `${left}vw`;
    wrapper.style.setProperty("--drift", `${drift}px`);
    wrapper.style.animationDuration = `${duration}s`;
    wrapper.innerHTML =
      `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor">` +
      `<path d="${HEART_PATH}"/></svg>`;

    container.appendChild(wrapper);
    window.setTimeout(() => wrapper.remove(), duration * 1000 + 500);
  }

  window.setInterval(spawnHeart, 900);
  for (let i = 0; i < 4; i += 1) window.setTimeout(spawnHeart, i * 300);
})();

/* ================================================================
   Music toggle
   ================================================================ */
(function setupMusic() {
  const toggle = document.getElementById("musicToggle");
  const audio = document.getElementById("bgMusic");

  if (!CONFIG.enableMusic) {
    toggle.style.display = "none";
    return;
  }

  let startedByUser = false;

  function startMusic() {
    if (startedByUser) return;
    startedByUser = true;
    audio.play()
      .then(() => { toggle.dataset.playing = "true"; })
      .catch((err) => {
        console.log("Autoplay blocked or file missing:", err);
        startedByUser = false;
      });
  }

  document.addEventListener("click", startMusic, { once: true });

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    if (audio.paused) {
      startedByUser = true;
      audio.play().catch(() => {});
      toggle.dataset.playing = "true";
    } else {
      audio.pause();
      toggle.dataset.playing = "false";
    }
  });
})();
