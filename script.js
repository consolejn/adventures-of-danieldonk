const pages = {
// PAGE 1
  "CH1-001-Start": {
    text: `You wake to a low rumble beneath you. The ground trembles gently at first but quickly worsens.
A photo of your pet hamster tips off the bedside table and hits the floor.
Glass shatters somewhere in the kitchen.
Quick! What now!?`,
    choices: [
      { text: "> Take cover underneath your desk.", next: "CH1-001a-UnderDesk" }, 
      { text: "> Grab your pillow and cover your head with it.", next: "CH1-001b-PillowProtect" },
      { text: "> Grab some things and run outside.", next: "CH1-001c-GrabBelongings" }
    ]
  },

  "CH1-001a-UnderDesk": {
    text: `You duck under the desk just as the rumbling peaks, dust falls from the ceiling and everything is suddenly quiet.`,
    choices: [
      { text: "> Look outside your bedroom window.", next: "CH1-001aa-LookOutsideWindow" },
      { text: "> Head straight for the front door to go outside.", next: "CH1-002-Outside" }
    ]
  },

  "CH1-001aa-LookOutsideWindow": {
    text: `You look outside but this doesn't seem to be the usual view of your neighborhood... 
Thick, glowing fog surrounds your house.`,
    choices: [
      {text: "> Head to the front door to go outside.",next: "CH1-002-Outside"},
    ]
  },

  "CH1-001b-PillowProtect": {
    text: `You pull your pillow over your head and brace yourself. The shaking continues for a few seconds, then stops.
It's quiet, too quiet...`,
    choices: [
      { text: "> Look outside your bedroom window.", next: "CH1-001aa-LookOutsideWindow" },
      { text: "> Head to the front door to go outside.", next: "CH1-002-Outside" }
    ]
  },

  "CH1-001c-GrabBelongings": {
    text: `As you are panicking you think to yourself... what should I take?!`,
    choices: [
      { text: "> Grab the first aid kit in the kitchen.", next: "CH1-001cc-FirstAid" },
      { text: "> Stuff your backpack with any delicious food and drink supplies you can find.", next: "CH1-001ccc-FoodAndDrink" },
      { text: "> Your pet hamster, Hammond.", next: "CH1-001cccc-Hammond" }
    ]
  },

  "CH1-001cc-FirstAid": {
    text: `You step into the kitchen, where you see a broken glass, chairs are overturned or lying on their side. It's a real mess.
Over there! You grab the first aid kit.`,

    choices: [
      {text: "> Head to the front door to go outside", next: "CH1-002-Outside" }
    ]
  },

  "CH1-001ccc-FoodAndDrink": {
    text: `Stepping into the kitchen, you see broken glass and chairs overturned or lying on their side. It's a real mess.
You still manage to get to the fridge and shove some leftover chicken snitzel and iced tea into your backpack.`,
    choices: [
      { text: "> Head to the front door to go outside.", next: "CH1-002-Outside" }
    ]
  },

    "CH1-001cccc-Hammond": {
    text: `You run straight to your beloved Hammond. He looks as shocked as you are!
Picking up the photo of him from the floor, you place it on top of his cage and begin to carry it.`,
    choices: [
      { text: "> Head to the front door to go outside.", next: "CH1-002-Outside" }
    ]
  },

  // PAGE 2
  "CH1-002-Outside": {
    text: `As you step outside, you find your house perched alone atop a grassy hill, surrounded by endless, thick fog.`,
    choices: [
      { text: "> Continue...", next: "CH1-003-NextScene" }
    ]
  },
  // PAGE 3
  "CH1-003-NextScene": {
    text: `To be continued...`,
    choices: [
      { text: ">CLICK HERE TO RESTART STORY", next: "CH1-001-Start"}
    ]
  }
};

let currentPageId = null;
let isTyping = true;
let sfxEnabled = true;
let typingTimeout;
let typeSessionId = 0;

const textBox = document.getElementById('text-box');
const choicesBox = document.getElementById('choices');
const bgm = document.getElementById('bgm');

async function typeText(text, callback) {
  textBox.textContent = '';
  isTyping = true;

  const sessionId = ++typeSessionId; // Unique session per call

  if (!window.typingSound) {
    window.typingSound = new Audio('assets/audio/TypingDialogueSoundEffect.wav');
    window.typingSound.loop = true;
    window.typingSound.volume = 0.3;
  }

  if (sfxEnabled) {
    window.typingSound.play();
  }

  let i = 0;
  while (isTyping && i < text.length) {
    // If a newer typing session has started, abort this one
    if (sessionId !== typeSessionId) return;

    textBox.textContent += text.charAt(i);
    i++;
    await new Promise(resolve => setTimeout(resolve, 15));
  }

  // Final check: if this session is still valid
  if (sessionId === typeSessionId) {
    textBox.textContent = text;
    isTyping = false;
    window.typingSound.pause();
    window.typingSound.currentTime = 0;

    const skipButton = document.getElementById('skip-button');
    if (skipButton) {
      skipButton.style.display = 'none';
    }

    callback();
  }
}

function skipTyping() {
  isTyping = false;
  clearTimeout(typingTimeout);

  if (window.typingSound) {
    window.typingSound.pause();
    window.typingSound.currentTime = 0;
  }

  // Hide the skip button after it's used
  const skipButton = document.querySelector('button[onclick="skipTyping()"]');
  if (skipButton) {
    skipButton.style.display = 'none';
  }
}

function toggleMusic() {
  if (bgm.paused) {
    bgm.play();
  } else {
    bgm.pause();
  }
}

function toggleSFX() {
  sfxEnabled = !sfxEnabled;

  // Optionally pause immediately if turning off mid-typing
  if (!sfxEnabled && window.typingSound) {
    window.typingSound.pause();
    window.typingSound.currentTime = 0;
  }else if (sfxEnabled && isTyping && window.typingSound) {
    window.typingSound.play();
  }

  // Optional: visual feedback in button text
  const sfxButton = document.querySelector("#controls button:nth-child(2)");
  sfxButton.textContent = sfxEnabled ? "SFX: ON" : "SFX: OFF";
}

function showPage(id) {

  currentPageId = id; // To save current page ID
  const page = pages[id];

  choicesBox.innerHTML = '';
  textBox.textContent = '';
  skipTyping();

  document.getElementById('skip-button').style.display = 'inline-block';

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

  document.getElementById('save-button').addEventListener('click', () => {
    if (currentPageId) {
      showConfirmation("Do you want to save your progress?", () => {
        localStorage.setItem('savedPage', currentPageId);
      });
    } else {
      alert("Nothing to save yet.");
    }
  });

  function showConfirmation(message, onConfirm) {
  const modal = document.getElementById("confirm-modal");
  const messageElem = document.getElementById("confirm-message");
  const yesBtn = document.getElementById("confirm-yes");
  const noBtn = document.getElementById("confirm-no");

  messageElem.textContent = message;
  modal.classList.remove("hidden");

  const cleanUp = () => {
    modal.classList.add("hidden");
    yesBtn.onclick = null;
    noBtn.onclick = null;
  };

  yesBtn.onclick = () => {
    cleanUp();
    onConfirm();
  };
  noBtn.onclick = cleanUp;
}

  document.getElementById('load-button').addEventListener('click', () => {
    const savedPage = localStorage.getItem('savedPage');
    if (savedPage && pages[savedPage]) {
      showConfirmation("Load your last saved game?", () => {
        isTyping = false;
        clearTimeout(typingTimeout);

        if (window.typingSound) {
          window.typingSound.pause();
          window.typingSound.currentTime = 0;
        }

        textBox.textContent = '';
        choicesBox.innerHTML = '';

        showPage(savedPage);
      });
    } else {
      alert("No saved game found.");
    }
  });

    document.getElementById('sfx-button').addEventListener('click', toggleSFX);

    // ---> ADD TOGGLE MUSIC EVENT LISTENER HERE WHEN READY <---- //

  // Hide menu initially
  document.getElementById('main-menu').style.display = 'none';
  document.getElementById('save-load-controls').style.display = 'none';

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
    document.getElementById("save-load-controls").style.display = "block";

    fadeOutMusic(menuMusic, 3000);
    showPage('CH1-001-Start');
  });
});
