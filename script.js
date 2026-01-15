// =========================
// STORY PAGES
// =========================

const pages = {
  // =========================
  // CHAPTER 1
  // =========================

  // PAGE 1
  "CH1-001-Start": {
    text: `You wake to a low rumble beneath you. The ground trembles gently at first... then quickly worsens.

A photo of your pet hamster tips off the bedside table and hits the floor. Glass shatters somewhere in the kitchen.

Quick. What now!?`,
    // Reset run-state when starting/restarting
    onEnter: () => {
      gameState.hasHammond = false;
      gameState.hasKey = false;
      gameState.sawHammondEscape = false;
    },
    choices: [
      { text: "> Take cover underneath your desk.", next: "CH1-001a-UnderDesk" },
      { text: "> Grab your pillow and cover your head with it.", next: "CH1-001b-PillowProtect" },
      { text: "> Grab some important things in your apartment and run outside.", next: "CH1-001c-GrabBelongings" }
    ]
  },

  "CH1-001a-UnderDesk": {
    text: `You duck under the desk just as the rumbling peaks. Dust falls from the ceiling... and then everything goes suddenly quiet.

Too quiet.`,
    choices: [
      { text: "> Look outside your bedroom window.", next: "CH1-001aa-LookOutsideWindow" },
      { text: "> Head straight for the front door to go outside.", next: "CH1-002-Outside" }
    ]
  },

  "CH1-001aa-LookOutsideWindow": {
    text: `You look outside. This is not the usual view of your neighbourhood.

Thick, glowing fog surrounds your house.`,
    choices: [{ text: "> Head to the front door to go outside.", next: "CH1-002-Outside" }]
  },

  "CH1-001b-PillowProtect": {
    text: `You pull your pillow over your head and brace yourself. The shaking continues for a few seconds... then stops.

It's quiet. Too quiet...`,
    choices: [
      { text: "> Look outside your bedroom window.", next: "CH1-001aa-LookOutsideWindow" },
      { text: "> Head to the front door to go outside.", next: "CH1-002-Outside" }
    ]
  },

  "CH1-001c-GrabBelongings": {
    text: `You start to panic.

What should you take?!`,
    choices: [
      { text: "> Grab the first aid kit in the kitchen.", next: "CH1-001cc-FirstAid" },
      { text: "> Stuff your backpack with any food and drink you can find.", next: "CH1-001ccc-FoodAndDrink" },
      { text: "> Your pet hamster, Hammond.", next: "CH1-001cccc-Hammond" }
    ]
  },

  "CH1-001cc-FirstAid": {
    text: `You step into the kitchen. Broken glass, chairs overturned. A real mess.

Over there. You snatch the first aid kit.`,
    choices: [{ text: "> Head to the front door to go outside.", next: "CH1-002-Outside" }]
  },

  "CH1-001ccc-FoodAndDrink": {
    text: `You step into the kitchen. Broken glass, chairs overturned. A real mess.

You still manage to get to the fridge and shove some leftover chicken schnitzel and iced tea into your backpack.`,
    choices: [{ text: "> Head to the front door to go outside.", next: "CH1-002-Outside" }]
  },

  // Hammond option stays, but he escapes
  "CH1-001cccc-Hammond": {
    text: `You run straight to Hammond. He looks as shocked as you are!`,
    image: "assets/gifs/shocked-hamster.gif",
    text2: `\n\nAs you go to get him from his cage, Hammond launches himself out of his cage and sprints straight out the front door.`,
    onEnter: () => {
      gameState.hasHammond = false;
      gameState.sawHammondEscape = true;
    },
    choices: [{ text: "> Chase Hammond outside!", next: "CH1-002-HammondChaseOutside" }]
  },

  // Chase scene that merges back into main flow
  "CH1-002-HammondChaseOutside": {
    text: `You burst outside, heart hammering. Fog swallows the hill in every direction. You call his name once, then again. Nothing.

No sign of him at all. Just the fog... breathing...`,
    choices: [{ text: "> Move forward and figure out where you are.", next: "CH1-003-FogBreath" }]
  },

  // PAGE 2
  "CH1-002-Outside": {
    text: `As you step outside, you find your house perched alone atop a grassy hill, surrounded by endless, thick fog.

Like someone picked up your whole life and placed it somewhere else.`,
    choices: [{ text: "> Continue...", next: "CH1-003-FogBreath" }]
  },

  // PAGE 3
  "CH1-003-FogBreath": {
    text: `The fog doesn't just sit there. It *breathes*. It swirls like it's thinking about you... almost like it's reaching out to grab you.

Down the slope, you spot a faint outline: a wooden sign, crooked but still holding strong, pointing confidently.`,
    choices: [
      { text: "> Walk through the fog toward the sign.", next: "CH1-003a-BraveWalk" },
      { text: "> Shout into the fog to see if it shouts back.", next: "CH1-003b-YellFog" },
      { text: "> Go back inside and pretend this is a weird dream.", next: "CH1-003c-Denial" }
    ]
  },

  "CH1-003a-BraveWalk": {
    text: `You take three bold steps and immediately realise the hill is steeper than you thought. You lose your balance and start sliding... then tumbling until you reach the bottom of the hill.

You shake off the dirt and stand up and look around.`,
    choices: [{ text: "> Walk toward the sign.", next: "CH1-004-Signpost" }]
  },

  "CH1-003b-YellFog": {
    text: `"HELLOOOO?" you yell. The fog yells back: "hELLoOoO!"

It's either an echo... or the fog has opinions.`,
    choices: [{ text: "> Head toward the sign.", next: "CH1-004-Signpost" }]
  },

  "CH1-003c-Denial": {
    text: `You step back inside your apartment. Everything is normal... except your apartment is on a hill in a glowing fog realm and your brain is doing cartwheels.

You give denial one last try. It fails instantly.`,
    choices: [{ text: "> Accept reality and head toward the sign.", next: "CH1-004-Signpost" }]
  },

  // PAGE 4
  "CH1-004-Signpost": {
    text: `The sign reads:

"WELCOME TO GLOAMHILL REGION!
Please do not feed the fog.
If you are lost, you are probably in the correct place."

Below it is a smaller sign:

"Settlement of MOSSWICH (roughly that way)"

You squint. "Roughly that way." How helpful.`,
    choices: [
      { text: "> Follow the rough direction anyway.", next: "CH1-005-Bridge" },
      { text: "> Inspect the sign further.", next: "CH1-004a-SecretCompartment" }
    ]
  },

  "CH1-004a-SecretCompartment": {
    text: `You pat down the sign like it owes you money. No secret compartment... but you do find a pamphlet nailed-on that has the heading: "How To Not Die In Gloamhill"

It reads:
Step 1: "The fog is always listening."
Step 2: "Be nice to the fog."`,
    choices: [{ text: "> Continue toward Mosswich.", next: "CH1-005-Bridge" }]
  },

  // PAGE 5
  "CH1-005-Bridge": {
    text: `You reach a narrow rope bridge stretching between hills. The fog thins a little as you approach, like it's curious.

Halfway across, you notice a small building near the bridges end. A voice calls out from inside: "State your business, hill-walker!"

A small shape steps forward. It's a goblin, scarf way too big for them and notepad in hand.`,
    choices: [
      { text: "> Introduce yourself politely. (Hi, I'm Daniel.)", next: "CH1-005a-PoliteIntro" },
      { text: "> Explain you're from the real world and this is impossible.", next: "CH1-005b-RealWorldRant" },
      { text: "> Pretend you're a famous adventurer and pose dramatically.", next: "CH1-005c-FamousPose" }
    ]
  },

  "CH1-005a-PoliteIntro": {
    text: `"Daniel," you say, trying to sound like someone who hasn't just been teleported into fog purgatory.

The goblin nods. "I'm Pip. Official bridge interrogator."`,
    choices: [{ text: "> Ask for help getting to Mosswich.", next: "CH1-006-PipGuide" }]
  },

  "CH1-005b-RealWorldRant": {
    text: `You launch into it: electricity bills, suburbia, the concept of "Monday" and why fog-based civilisations are NOT in the brochure. Then you remember your manners. "Oh... um. I'm Daniel."

The goblin stares for a beat. "Ah. I'm Pip. Official bridge interrogator."`,
    choices: [{ text: "> Ask how to reach Mosswich.", next: "CH1-006-PipGuide" }]
  },

  "CH1-005c-FamousPose": {
    text: `You strike a heroic stance. "Daniel! Daniel Donk!" The bridge creaks like it disapproves.

The goblin squints. "That pose is illegal in Mosswich without a permit... good thing I'm Pip. Official bridge interrogator."`,
    choices: [{ text: "> Ask Pip to guide you to town.", next: "CH1-006-PipGuide" }]
  },

  // PAGE 6
  "CH1-006-PipGuide": {
    text: `Pip shuffles closer, peering at you like you're a weird bird. She senses the opportunity to adventure.

She says, "You need a guide? I am the best guide around! I just need one small favour..."`,

    choices: [
      { text: "> Ask what kind of favour?.", next: "CH1-006a-AskAboutFavour" },
      { text: "> Ask Pip what the fog actually is?", next: "CH1-006b-AskAboutFog1" },
      {
        text: "> Tell Pip about Hammond.",
        next: "CH1-006c-HammondLore",
        condition: () => gameState.hasHammond || gameState.sawHammondEscape
      }
    ]
  },

  "CH1-006a-AskAboutFavour": {
    text: `You think to yourself... I could really use a guide... "What kind of favour?" you ask.

Pip nods, "I lost my brother somewhere in the fog. Maybe you can help me find him?"

You find it ironic and a bit unsettling that your new potential guide lost their own brother but you feel as though you don't have much choice. "Deal."`,

    choices: [{ text: "> Continue with Pip toward Mosswich.", next: "CH1-007-MosswichGate" }]
  },

  "CH1-006b-AskAboutFog1": {
    text: `Pip lowers their voice. "Some say it's the world's breath. Some say it's a curse others say it's just weather with attitude."

The fog swirls. It definitely heard that.

"That's why you need a guide! I am the best around, I just need a small favour!"`,
    choices: [{ text: "> Ask Pip what kind of favour?", next: "CH1-006a-AskAboutFavour" }]
  },

  "CH1-006c-HammondLore": {
    text: `You mention Hammond. Pip's eyes widen a little. "A pocket-beast companion? Bold."

They glance around the mist like it might be listening too. "In Mosswich, hamsters are considered either sacred... or delicious... depending on the festival."`,
    choices: [{ text: "> Decide Hammond's festival schedule is private and continue.", next: "CH1-007-MosswichGate" }]
  },

  // PAGE 7
  "CH1-007-MosswichGate": {
    text: `The fog thins and you arrive at wooden gates wrapped in vines and hanging lanterns.

A guard leans over the wall, tall and sleep-deprived looking, wearing a helmet that clearly doesn't fit him. "Password?" the guard asks.`,
    choices: [
      { text: "> Look to Pip for help.", next: "CH1-007a-PipPassword" },
      { text: "> Attempt a confident password: \"Moss...Wich?\"", next: "CH1-007b-BadPassword" },
      { text: "> Tell the truth: \"I'm really confused.\"", next: "CH1-007c-TruthPassword" }
    ]
  },

  "CH1-007a-PipPassword": {
    text: `Pip sighs. "The password is 'Please.' It's always 'Please.'"

The guard nods. "Correct. We're very polite here."`,
    choices: [{ text: "> Enter Mosswich.", next: "CH1-008-InTown" }]
  },

  "CH1-007b-BadPassword": {
    text: `"Moss...Wich?" you say.

The guard squints. "Uh, yes, that's the town name."

You nod like that was the plan. 
Pip leans in. "Say 'Please'."`,
    choices: [{ text: "> Say: \"Please.\"", next: "CH1-008-InTown" }]
  },

  "CH1-007c-TruthPassword": {
    text: `The guard scratches at the edge of their helmet. 
Pip leans in. "Say 'Please'."`,
    choices: [{ text: "> Say: \"Please.\"", next: "CH1-008-InTown" }]
  },

  // PAGE 8
  "CH1-008-InTown": {
    text: `The gates open with a long creak and you enter Mosswich. It smells like swamplike but it's got a charm to it.

People bustling around.
Humans, goblins, tall folk with glowing eyes you even notice a grey cat wearing a tiny cape.

Pip gestures towards the sign of the inn: "THE SOGGY BOOT." The boot on the sign drips water continuously, like it's committed to the bit.`,
    choices: [{ text: "> Proceed to the inn.", next: "CH1-009-Inn" }]
  },

  // PAGE 9
  "CH1-009-Inn": {
    text: `Inside the Soggy Boot Inn, warmth hits you like a hug from a fresh blanket out of the dryer. A bartender slides a bowl of stew across the counter.

"New face," the bartender says. "Fog-dropper?" Pip adds, "This one is... complicated." The bartender nods. "Aren't we all."

You take one sip of stew and immediately feel 12% more capable.`,
    choices: [
      { text: "> Ask about the fog.", next: "CH1-009b-AskAboutFog" },
      { text: "> Eat more stew.", next: "CH1-009c-EatMoreStew" }
    ]
  },

  "CH1-009b-AskAboutFog": {
    text: `Pip lowers their voice. "Fog's been thicker lately. Like it's gathering itself." The bartender leans in too, because gossip is universal. "Some say the fog is looking for something it lost."

You blink. "Fog can lose things?"

Before the bartender can answer, the inn's front door rattles. A cold draft slides in and for half a second, fog curls across the floorboards like it's testing the room. Everyone goes silent.

The bartender snaps their fingers and tosses a pinch of salt toward the doorway. The fog recoils like it just got insulted.`,
    choices: [{ text: "> Ask for answers.", next: "CH1-009d-FindAnswers" }]
  },

  "CH1-009c-EatMoreStew": {
    text: `It tastes like potatoes, herbs and the comforting realisation that you are not going to die today.

A cold draft slides in and for half a second, fog curls across the floorboards like it's testing the room. Everyone goes silent. The bartender snaps their fingers and tosses a pinch of salt toward the doorway. The fog recoils like it just got insulted.`,
    choices: [{ text: "> Ask for answers.", next: "CH1-009d-FindAnswers" }]
  },

  "CH1-009d-FindAnswers": {
    text: `Everyone slowly exhales again. Steam from the stew brings a little comfort back into the room.

You lean in. "Okay. Tell me everything."

Pip studies you for a moment. "Fog wasn't always here," Pip says. "The night the king's daughter disappeared... it came with her absence."

You go still for a moment. "So what happened to her?"

Pip shakes their head. "The king sent guards. Hunters. Adventurers... none of them really returned..." The bartender mutters, "And the ones that did, came back... different."`,
    choices: [{ text: "> Ask where answers come from.", next: "CH1-009e-WhereAnswers" }]
  },

  "CH1-009e-WhereAnswers": {
    text: `"How do people even know where to go?" you ask. "And what to look for?"

Pip breaks eye contact. "Mostly old stories. Myths. Theories that got passed around until they sounded true.
It's dangerous because of the monsters and puzzles that feed on your sanity."

Your heart thumps. You didn't choose to come here... but now that you are, your curiosity is digging in.`,
    choices: [{ text: "> Sit with that feeling for a moment.", next: "CH1-009f-Decision" }]
  },

  "CH1-009f-Decision": {
    text: `You stare at the stew for a second, thinking. The fog. Why is it here? What does it want? It feels like it stretches across the whole region... yet it's always close by.

You lift your head. "Okay. First things first, I need supplies. I need to go back to my place, gear up and then... we talk routes. Properly."`,
    choices: [{ text: "> Ask Pip to come with you.", next: "CH1-009a-ApartmentIdea" }]
  },

  // PAGE 10
  "CH1-009a-ApartmentIdea": {
    text: `The bartender looks up from polishing a glass like you just suggested skydiving without a parachute. "Pip here is an experienced guide," the bartender says. "If anyone can help you navigate the hills and fog, it's them."

Pip is silent for a moment, then nods.

You get up from the table and head out with Pip.

(End of Chapter 1)`,
    choices: [{ text: "> Continue to Chapter 2", next: "CH2-001-BackToHill" }]
  },

  // =========================
  // CHAPTER 2
  // =========================

  "CH2-001-BackToHill": {
    text: `You and Pip head back out through the gates. The fog meets you like you just came home from a long trip.

Your apartment is visible as a darker shape in the mist on top of the hill, like a lonely lighthouse... except instead of warning ships, it's warning you.

Pip tightens their scarf. "Ready?"`,
    choices: [
      { text: "> Walk home with confidence.", next: "CH2-002-ApartmentDoor" },
      { text: "> Ask Pip why they're so calm about all this.", next: "CH2-001a-WhySoCalm" }
    ]
  },

  "CH2-001a-WhySoCalm": {
    text: `You ask Pip why they're so calm. Pip shrugs. "Because panic is expensive. Calm is free."

That is the most goblin sentence you've ever heard. Also... it helps.`,
    choices: [{ text: "> Continue to your apartment.", next: "CH2-002-ApartmentDoor" }]
  },

  "CH2-002-ApartmentDoor": {
    text: `After a surprisingly easy journey, you reach your apartment. The front door looks normal.
Too normal.

Like it's trying to pretend it didn't teleport to this unknown world.

Pip taps the doorframe.`,
    choices: [{ text: "> Go inside.", next: "CH2-003-KitchenArmour" }]
  },

  "CH2-003-KitchenArmour": {
    text: `You step inside. Your apartment is... mostly fine. A little messy. A little dusty.

Pip heads straight to the kitchen like a raccoon with purpose. They pull a handful of kitchen items off the counter and start assembling them into makeshift armour."

Pip beams, proud of themself.`,
    choices: [
      { text: "> Accept the gear with dignity and purpose.", next: "CH2-004-ArmourLoot" },
      { text: "> Ask if this is really how adventurers work.", next: "CH2-003a-IsThisNormal" }
    ]
  },

  "CH2-003a-IsThisNormal": {
    text: `You ask if this is normal adventurer stuff. Pip nods seriously.

You stare at the pot lid. Somewhere, a chef cries.`,
    choices: [{ text: "> Continue looting supplies.", next: "CH2-004-ArmourLoot" }]
  },

  "CH2-004-ArmourLoot": {
    text: `You grab the basics: backpack, bandages, snacks and water.

Pip discovers your oven mitts and wears them like gauntlets.

Then you hear it... a tiny slurping sound from the living room.`,
    choices: [
      {
        text: "> Investigate the slurping sound.", next: "CH2-005-HammondTV",
      }
    ]
  },

  "CH2-005-HammondTV": {
    text: `You enter the living room. And there he is.

Hammond!

He's sitting cosy in your bean bag watching TV and it even looks like he set up his own water dispenser with a juice box.

You blink. Pip blinks. Hammond does not blink, eyes glued to the screen.`,
    choices: [
      { text: "> \"Hammond?! HOW?\"", next: "CH2-005b-TVBreak" },
      { text: "> Respect his vibe and quietly back away.", next: "CH2-005b-TVBreak" }
    ]
  },

  "CH2-005b-TVBreak": {
    text: `Before you can process anything, the TV makes a sad *bwoooop* noise and dies.

Silence.

Hammond stares at the dark screen, then stares at you. He sighs in a way no hamster should be capable of.
He hops off the bean bag and waddles toward you. You don't know why... but you're suddenly certain he's coming with you now.`,
    onEnter: () => {
      gameState.hasHammond = true;
    },
    choices: [{ text: "> Accept your new reality. Hammond joins the party.", next: "CH2-006-LeaveApartment" }]
  },

  // Key item page (Chapter 2)
  "CH2-006-LeaveApartment": {
    text: `You step back outside with your supplies and new "armour".

Pip points at a small half-buried crate near your front door that definitely was NOT there before. The crate has a label: "LOST & FOUND (HILL EDITION)"

Pip rubs their hands together. "Ohhh. This is either treasure... or a curse."`,
    choices: [
      { text: "> Open the Lost & Found crate.", next: "CH2-007-LostFoundCrate" },
      { text: "> Ignore it and head back to town.", next: "CH2-008-BackToInn" }
    ]
  },

  "CH2-007-LostFoundCrate": {
    text: `Inside the crate you find:
- A single sock (size: large goblin foot)
- A scuffed drawing of a hill wearing a crown
- A brass key with a tag

Pip's eyes glint as they stare at the key. "Keys are never here for decoration," Pip says. "They're here for destiny."`,
    choices: [
      { text: "> Take the brass key.", next: "CH2-007a-TakeKey" },
      { text: "> Leave it. You have enough weird today.", next: "CH2-007b-LeaveKey" }
    ]
  },

  "CH2-007a-TakeKey": {
    text: `You take the brass key. It feels warm, like it's pleased you said yes.

The tag reads: "Smotts Chest"

You have no idea what that means... but you do feel slightly more like a video game protagonist.`,
    onEnter: () => {
      gameState.hasKey = true;
    },
    choices: [{ text: "> Head back to Mosswich.", next: "CH2-008-BackToInn" }]
  },

  "CH2-007b-LeaveKey": {
    text: `You leave the key behind. The air immediately feels like it's judging you.

Pip pats your shoulder. "Probably fine," Pip says, in the voice of someone who has seen "probably fine" explode before.`,
    choices: [{ text: "> Head back to Mosswich.", next: "CH2-008-BackToInn" }]
  },

  "CH2-008-BackToInn": {
    text: `Back at the Soggy Boot Inn, the moment you enter, three different locals gasp at the same time. One points at Hammond, one points at your pot-lid shield, one points at your face like you personally did this to them.

The bartender leans in, whispering: "We've been expecting him."

You: "...Who?"
The bartender: "The Prophet of Fate."

You look at Hammond. Hammond looks at a crumb. Pip whispers, "Oh no."`,
    choices: [
      { text: "> Ask why everyone thinks Hammond is a prophet.", next: "CH2-009-ProphetTalk" },
      { text: "> Try to deny it (and fail socially).", next: "CH2-009-ProphetTalk" }
    ]
  },

  "CH2-009-ProphetTalk": {
    text: `A local slaps a crumpled poster on the table. It shows a shadowy figure in the fog, blurry, dramatic... vaguely hamster-shaped if you squint.

"Behold," the local says, "the foretold Prophet of Fate who will clear the fog!"

You squint harder. "That could be a potato."

The local gasps. "Blasphemy!"`,
    choices: [{ text: "> (End of Chapter 2) Continue to Chapter 3", next: "CH3-001-Name" }]
  },

  "CH3-001-Name": {
    text: `(To be continued...)
  
  More chapters coming soon!`,
    choices: [{ text: "> Return to Start", next: "CH1-001-Start" }]
  }
};

// =========================
// GAME STATE
// =========================

const gameState = {
  hasHammond: false,
  hasKey: false,
  sawHammondEscape: false
};

let currentPageId = null;
let isTyping = true;
let sfxEnabled = true;
let typingTimeout;
let typeSessionId = 0;

const textBox = document.getElementById("text-box");
const choicesBox = document.getElementById("choices");
const bgm = document.getElementById("bgm");

async function typeText(text, callback) {
  textBox.textContent = "";
  isTyping = true;

  const sessionId = ++typeSessionId; // Unique session per call

  if (!window.typingSound) {
    window.typingSound = new Audio("assets/audio/TypingDialogueSoundEffect.wav");
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

    const skipButton = document.getElementById("skip-button");
    if (skipButton) {
      skipButton.style.display = "none";
    }

    if (typeof callback === "function") callback();
  }
}

function skipTyping() {
  isTyping = false;
  clearTimeout(typingTimeout);

  if (window.typingSound) {
    window.typingSound.pause();
    window.typingSound.currentTime = 0;
  }

  const skipButton = document.querySelector('button[onclick="skipTyping()"]');
  if (skipButton) {
    skipButton.style.display = "none";
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

  if (!sfxEnabled && window.typingSound) {
    window.typingSound.pause();
    window.typingSound.currentTime = 0;
  } else if (sfxEnabled && isTyping && window.typingSound) {
    window.typingSound.play();
  }

  const sfxButton = document.querySelector("#controls button:nth-child(2)");
  if (sfxButton) {
    sfxButton.textContent = sfxEnabled ? "SFX: ON" : "SFX: OFF";
  }
}

function showPage(id) {
  currentPageId = id;
  const page = pages[id];

  if (page && page.onEnter) {
    page.onEnter();
  }

  choicesBox.innerHTML = "";
  textBox.textContent = "";
  skipTyping();

  const skipButton = document.getElementById("skip-button");
  if (skipButton) {
    skipButton.style.display = "inline-block";
  }

  typeText(page.text, () => {
    if (page.image) {
      const img = document.createElement("img");
      img.src = page.image;
      img.style.width = "32px";
      img.style.height = "auto";
      img.style.verticalAlign = "middle";
      img.style.marginLeft = "8px";
      textBox.appendChild(img);
    }

    if (page.text2) {
      textBox.appendChild(document.createTextNode(page.text2));
    }

    page.choices
      .filter(choice => !choice.condition || choice.condition())
      .forEach(choice => {
        const el = document.createElement("div");
        el.textContent = choice.text;
        el.className = "choice";
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

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  const fadeInterval = setInterval(() => {
    currentStep++;
    const progress = currentStep / steps;
    audio.volume = originalVolume * (1 - easeOutCubic(progress));

    if (progress >= 1) {
      clearInterval(fadeInterval);
      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
      }, 500);
    }
  }, stepDuration);
}

document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("intro-screen");
  const introButton = document.getElementById("intro-button");
  const menuMusic = document.getElementById("menu-music");

  // Keybind: press "S" to skip the typewriter effect
  document.addEventListener("keydown", e => {
    const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : "";
    if (tag === "input" || tag === "textarea") return;

    if (e.key === "s" || e.key === "S") {
      if (isTyping) {
        e.preventDefault();
        skipTyping();
      }
    }
  });

  document.getElementById("save-button").addEventListener("click", () => {
    if (currentPageId) {
      showConfirmation("Do you want to save your progress?", () => {
        localStorage.setItem("savedPage", currentPageId);
        localStorage.setItem("savedState", JSON.stringify(gameState));
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

  document.getElementById("load-button").addEventListener("click", () => {
    const savedPage = localStorage.getItem("savedPage");
    if (savedPage && pages[savedPage]) {
      showConfirmation("Load your last saved game?", () => {
        const savedState = localStorage.getItem("savedState");
        if (savedState) {
          try {
            const parsed = JSON.parse(savedState);
            gameState.hasHammond = !!parsed.hasHammond;
            gameState.hasKey = !!parsed.hasKey;
            gameState.sawHammondEscape = !!parsed.sawHammondEscape;
          } catch (e) {
            gameState.hasHammond = false;
            gameState.hasKey = false;
            gameState.sawHammondEscape = false;
          }
        }

        isTyping = false;
        clearTimeout(typingTimeout);

        if (window.typingSound) {
          window.typingSound.pause();
          window.typingSound.currentTime = 0;
        }

        textBox.textContent = "";
        choicesBox.innerHTML = "";

        showPage(savedPage);
      });
    } else {
      alert("No saved game found.");
    }
  });

  document.getElementById("sfx-button").addEventListener("click", toggleSFX);

  // Hide menu initially
  document.getElementById("main-menu").style.display = "none";
  document.getElementById("save-load-controls").style.display = "none";

  introButton.addEventListener("click", () => {
    introScreen.style.display = "none";
    document.getElementById("main-menu").style.display = "flex";

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
    showPage("CH1-001-Start");
  });
});
