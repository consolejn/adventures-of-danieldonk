const pages = {
  start: {
    text: "Welcome to James' Text Adventure Web Game! :) \nIn this game, you'll be presented with choices that shape your journey.\nEvery decision matters, so choose carefully, these decisions will ultimately change the story and determine your FATE!",
    choices: [
      // The placeholder names are just to demo for now, will be changed to the outcome name.
      { text: "> Pick this option!", next: "PlaceholderNameOption1" }, 
      { text: "> No, don't pick that one, pick this one!!!", next: "PlaceholderNameOption2" },
      { text: "> Those other options seem desperate. Pick this one, if you want, idk.", next: "PlaceholderNameOption3" }
    ]
  },
  PlaceholderNameOption1: {
    text: "Ty for picking this option :) TO BE CONTINUED.",
    choices: []
  },
  PlaceholderNameOption2: {
    text: "I KNEW YOU WOULD PICK THIS ONE, YES! TO BE CONTINUED.",
    choices: []
  },
  PlaceholderNameOption3: {
    text: "Omg thank god you picked this one, phew... I was really hoping playing it cool would work. TO BE CONTINUED.",
    choices: []
  }
};

let isTyping = true;
let typingTimeout;

const textBox = document.getElementById('text-box');
const choicesBox = document.getElementById('choices');
const bgm = document.getElementById('bgm');

async function typeText(text, callback) {
  textBox.textContent = '';
  isTyping = true;

  // Create or reuse typing sound effect
  if (!window.typingSound) {
    window.typingSound = new Audio('assets/audio/TypingDialogueSoundEffect.wav');
    window.typingSound.loop = true;
    window.typingSound.volume = 0.3; // Adjust volume if needed
  }

  window.typingSound.play();

  let i = 0;

  while (isTyping && i < text.length) {
    textBox.textContent += text.charAt(i);
    i++;
    await new Promise(resolve => setTimeout(resolve, 15));
  }

  if (!isTyping && i < text.length) {
    textBox.textContent = text;
  }

  isTyping = false;
  window.typingSound.pause();
  window.typingSound.currentTime = 0;

  callback();
}

function skipTyping() {
  isTyping = false;
  clearTimeout(typingTimeout);
  if (window.typingSound) {
    window.typingSound.pause();
    window.typingSound.currentTime = 0;
  }
}

function toggleMusic() {
  if (bgm.paused) {
    bgm.play();
  } else {
    bgm.pause();
  }
}

function showPage(id) {
  const page = pages[id];
  choicesBox.innerHTML = '';
  skipTyping();
  typeText(page.text, () => {
    page.choices.forEach(choice => {
      const el = document.createElement('div');
      el.textContent = choice.text;
      el.className = 'choice';
      el.onclick = () => showPage(choice.next);
      choicesBox.appendChild(el);
    });
  });
}

// Fade out menu music
function fadeOutMusic(audio, duration = 2000) {
  const steps = 60;
  const stepDuration = duration / steps;
  let currentStep = 0;
  const originalVolume = audio.volume;

  function easeOutCubic(t){
    return 1 - Math.pow(1 - t, 3);
  }

  const fadeInterval = setInterval(() => {
    currentStep++;
    const progress = currentStep / steps;
    audio.volume = originalVolume * (1 - easeOutCubic(progress));

    if (progress >= 1) {
      clearInterval(fadeInterval);
      // Optional: delay pause/reset for natural tail fade
      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
      }, 500); 
    }
  }, stepDuration);
}

document.addEventListener('DOMContentLoaded', () => {
  const introScreen = document.getElementById('intro-screen');
  const introButton = document.getElementById('intro-button');
  const menuMusic = document.getElementById('menu-music');
  const bgm = document.getElementById('bgm');

  // Hide menu initially
  document.getElementById('main-menu').style.display = 'none';

  introButton.addEventListener('click', () => {
    introScreen.style.display = 'none';
    document.getElementById('main-menu').style.display = 'flex';

    menuMusic.volume = 0.2;
    menuMusic.play().catch(err => {
      console.warn("Autoplay blocked until user interacts:", err);
    });
  });

  document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("game-ui").style.display = "block";

    fadeOutMusic(menuMusic, 3000);
    showPage('start');
  });
});
