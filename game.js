// =================================================================================
// GLOBAL VARIABLES AND SETUP
// =================================================================================
const intro = document.getElementById("intro");
const startScreen = document.getElementById("start-screen");
const outro = document.getElementById("outro");
const blackScreen = document.getElementById("black-screen");
const raccoonScene = document.getElementById("raccoon-scene");
const rippleScene = document.getElementById("ripple-scene");
const blackout = document.getElementById("blackout");

// Intro Scene Elements
const introText = document.getElementById("dialog-text-intro");
const introPenguin = document.getElementById("penguin-intro");
const introPortal = document.getElementById("portal-intro");
const startButton = document.getElementById("start-btn");

// Raccoon Scene Elements
const raccoonPenguin = document.getElementById("penguin-raccoon");
const raccoonPortal = document.getElementById("portal-raccoon");
const raccoonPenguinBubble = document.getElementById("penguinBubble");
const raccoonBubble = document.getElementById("raccoonBubble");
const overlay = document.getElementById("overlay");
const popupDialog = document.getElementById("popupDialog");
const bg = document.getElementById("bg");
const bg2 = document.getElementById("bg2");
const healthbar = document.getElementById("healthbar0");
const healthbarFinal = document.getElementById("healthbar3");
const raccoonFinal = document.getElementById("raccoonfinal");
const penguinFinal = document.getElementById("penguinfinal");
const finalPortal = document.getElementById("finalPortal");

// Game State Variables
let currentIntroLine = 0;
let raccoonCurrentLine = 0;
let finalDialogIndex = 0;
let compostSelected = false;
let fieldClickCount = 0;
const MAX_CLICKS = 3;

// Dialog Arrays
const introDialogLines = [
  "In my time… the ice is gone.",
  "Our glaciers melted, our homes drowned.",
  "The skies choke, the stars are lost.",
  "But just before the end, a portal opened.",
  "I went back in time—not for me, but for Earth.",
  "Three islands. Three disasters.",
  "One last chance to change everything."
];

const raccoonDialogLines = [
  { speaker: "penguin", text: "You use poisonous fertilizers!!!!" },
  { speaker: "penguin", text: "Those are harmful to the ecosystem." },
  { speaker: "raccoon", text: "It's called productivity, birdie." },
  { speaker: "raccoon", text: "I spray, I grow, I earn." },
  { speaker: "raccoon", text: "Fast crops, fat profits." },
  { speaker: "penguin", text: "At what cost? Your soil's dying." },
  { speaker: "penguin", text: "This isn't farming—this is slow death." },
  { speaker: "raccoon", text: "But… this is what everyone does!" },
  { speaker: "raccoon", text: "How else will I grow anything?" },
  { speaker: "penguin", text: "You could grow life, not just crops." },
  { speaker: "penguin", text: "Start with kindness—to the earth." },
  { speaker: "raccoon", text: "Hmm… kindness to soil?" },
  { speaker: "penguin", text: "Try compost. Real food for the ground." },
  { speaker: "penguin", text: "Let it breathe again." },
  { speaker: "raccoon", text: "Yeahhh! Bio-compost!" },
  { speaker: "raccoon", text: "I've got a pile of dry leaves..." },
  { speaker: "raccoon", text: "Oh! And veggie waste!" }
];

const finalDialog = [
  { speaker: "raccoon", text: "Thank you for helping me save this land." },
  { speaker: "penguin", text: "You're welcome! Keep it green, friend." }
];

// =================================================================================
// SCENE MANAGEMENT AND TRANSITIONS
// =================================================================================

function fadeInBlackToScene(sceneElement) {
  blackScreen.style.opacity = 1;
  setTimeout(() => {
    blackScreen.style.opacity = 0;
    sceneElement.style.display = 'block';
    setTimeout(() => { blackScreen.style.zIndex = 0; }, 800);
  }, 100);
}

function transitionToRaccoonScene() {
  blackScreen.style.zIndex = 120;
  blackScreen.style.opacity = 1;
  setTimeout(() => {
    startScreen.style.display = "none";
    raccoonScene.style.display = "block";
    setTimeout(() => {
      blackScreen.style.opacity = 0;
      setTimeout(() => {
        blackScreen.style.zIndex = 0;
        startRaccoonScene();
      }, 1000);
    }, 1000);
  }, 1000);
}

function transitionToRippleScene() {
  blackScreen.style.zIndex = 120;
  blackScreen.style.opacity = 1;
  setTimeout(() => {
    raccoonScene.style.display = "none";
    rippleScene.style.display = "block";
    setTimeout(() => {
      blackScreen.style.opacity = 0;
      blackScreen.style.zIndex = 0;
      startRipple();
    }, 1000);
  }, 1000);
}

function transitionToOutroScene() {
  blackScreen.style.zIndex = 120;
  blackScreen.style.opacity = 1;
  setTimeout(() => {
    rippleScene.style.display = "none";
    outro.style.display = "block";
    setTimeout(() => {
      blackScreen.style.opacity = 0;
      blackScreen.style.zIndex = 0;
      startOutro();
    }, 1000);
  }, 1000);
}

// =================================================================================
// INTRO SCENE LOGIC
// =================================================================================

function showNextIntroLine() {
  if (currentIntroLine < introDialogLines.length) {
    if (introDialogLines[currentIntroLine] === "But just before the end, a portal opened.") {
      setTimeout(() => {
        introPortal.style.opacity = 1;
        startPenguinWalkIntro();
      }, 1000);
    }
    introText.style.opacity = 0;
    setTimeout(() => {
      introText.textContent = introDialogLines[currentIntroLine++];
      introText.style.opacity = 1;
    }, 200);
  } else {
    intro.style.opacity = 0;
    intro.style.pointerEvents = 'none';
    setTimeout(() => {
      intro.style.display = "none";
      startScreen.style.display = "block";
      startScreen.style.opacity = 1;
    }, 1000);
  }
}

function startPenguinWalkIntro() {
  introPenguin.style.transform = "translateX(+325px) scale(0.8)";
  setTimeout(() => {
    introPenguin.style.opacity = 0;
    setTimeout(() => {
      introPortal.style.opacity = 0;
    }, 2400);
  }, 2200);
}

// =================================================================================
// RACCOON SCENE LOGIC
// =================================================================================

function startRaccoonScene() {
  document.body.addEventListener("click", showNextRaccoonDialog);
  raccoonPenguin.style.left = "30%";
  raccoonPenguin.style.transform = "scale(1)";
  setTimeout(() => showNextRaccoonDialog(), 2500);
  bg.addEventListener("click", handleBackgroundClick);
}

function showRaccoonBubble(bubble, text) {
  bubble.textContent = text;
  bubble.classList.remove("hidden");
  setTimeout(() => bubble.classList.add("show"), 10);
}

function hideRaccoonBubbles() {
  raccoonPenguinBubble.classList.remove("show");
  raccoonBubble.classList.remove("show");
  setTimeout(() => {
    raccoonPenguinBubble.classList.add("hidden");
    raccoonBubble.classList.add("hidden");
  }, 300);
}

function showNextRaccoonDialog() {
  hideRaccoonBubbles();
  if (raccoonCurrentLine < raccoonDialogLines.length) {
    const line = raccoonDialogLines[raccoonCurrentLine];
    if (raccoonCurrentLine === 0) {
      setTimeout(() => {
        raccoonPortal.style.opacity = "0";
        setTimeout(() => (raccoonPortal.style.display = "none"), 500);
      }, 100);
    }
    setTimeout(() => {
      if (line.speaker === "penguin") {
        showRaccoonBubble(raccoonPenguinBubble, line.text);
      } else {
        showRaccoonBubble(raccoonBubble, line.text);
      }
      raccoonCurrentLine++;
    }, 300);
  } else {
    document.body.removeEventListener("click", showNextRaccoonDialog);
    setTimeout(() => {
      overlay.classList.remove("hidden");
      overlay.classList.add("blur-active");
      attachInventoryListeners();
    }, 300);
  }
}

function attachInventoryListeners() {
  const inventoryItems = document.querySelectorAll(".inventory-item");
  inventoryItems.forEach((item) => {
    item.addEventListener("click", handleInventoryClick, { once: true });
  });
}

function handleInventoryClick(event) {
  const chosenItem = event.target.getAttribute("data-item");
  if (chosenItem === "compost") {
    popupDialog.innerHTML = `<p class="popup-title">Good job!</p>
                             <p class="popup-subtitle">Click on the rotten field ${MAX_CLICKS} times to restore the island.</p>`;
    document.body.style.cursor = "url('assets/inventory/cursorManure.png') 14 17, auto";
    compostSelected = true;
    setTimeout(() => {
      overlay.classList.add("hidden");
      overlay.classList.remove("blur-active");
    }, 2000);
  } else {
    popupDialog.innerHTML = `<p class="popup-title">Oops! Wrong item, try again</p>`;
    setTimeout(() => {
      popupDialog.innerHTML = `
        <p class="popup-title">Ready to start mission?</p>
        <p class="popup-subtitle">Help raccoon rejuvenate his land.</p>
        <div id="inventoryItems">
          <img src="assets/inventory/fertilizer.png" alt="Fertilizer" class="inventory-item" data-item="fertilizer" />
          <img src="assets/inventory/manure.png" alt="Compost" class="inventory-item" data-item="compost" />
          <img src="assets/inventory/fishnet.png" alt="Fishing Net" class="inventory-item" data-item="fishingnet" />
        </div>
      `;
      attachInventoryListeners();
    }, 2000);
  }
}

function handleBackgroundClick() {
  if (!compostSelected) return;
  fieldClickCount++;
  if (fieldClickCount >= MAX_CLICKS) {
    bg2.classList.remove("hidden");
    bg2.classList.add("fade-in");
    raccoonPenguin.style.opacity = "0";
    document.getElementById("raccoon").style.opacity = "0";
    healthbar.style.opacity = "0";
    healthbar.addEventListener('transitionend', function onFade() {
      healthbar.removeEventListener('transitionend', onFade);
      healthbar.src = "assets/healthbar/healthbar_3.png";
      setTimeout(() => healthbar.style.opacity = "1", 100);
    });
    document.body.style.cursor = "auto";
    bg.removeEventListener("click", handleBackgroundClick);
    compostSelected = false;
    setTimeout(() => {
      raccoonPenguin.style.display = "none";
      document.getElementById("raccoon").style.display = "none";
      triggerFinalScene();
    }, 2000);
  }
}

function triggerFinalScene() {
  document.getElementById("raccoon").classList.add("hidden");
  raccoonPenguin.classList.add("hidden");
  raccoonFinal.classList.remove("hidden");
  penguinFinal.classList.remove("hidden");
  document.body.addEventListener("click", showFinalDialog);
}

let showingFinalBubble = false;
function showFinalDialog() {
  if (showingFinalBubble) {
    hideRaccoonBubbles();
    showingFinalBubble = false;
  } else if (finalDialogIndex < finalDialog.length) {
    const line = finalDialog[finalDialogIndex];
    if (line.speaker === "raccoon") showRaccoonBubble(raccoonBubble, line.text);
    else showRaccoonBubble(raccoonPenguinBubble, line.text);
    finalDialogIndex++;
    showingFinalBubble = true;
  } else {
    document.body.removeEventListener("click", showFinalDialog);
    hideRaccoonBubbles();
    setTimeout(() => {
      finalPortal.classList.remove("hidden");
      animatePenguinToPortal();
    }, 1000);
  }
}

function animatePenguinToPortal() {
  const portalRect = finalPortal.getBoundingClientRect();
  const sceneRect = raccoonScene.getBoundingClientRect();
  const penguinWidth = penguinFinal.offsetWidth;
  const targetX = portalRect.left + (portalRect.width / 2) - (penguinWidth / 2) - sceneRect.left;
  penguinFinal.style.left = `${targetX}px`;
  penguinFinal.style.transform = "scale(0.2)";
  setTimeout(() => {
    penguinFinal.style.opacity = "0";
    finalPortal.style.opacity = "0";
    setTimeout(() => {
      showEcoChecklist();
    }, 1000);
  }, 2000);
}

function showEcoChecklist() {
  raccoonFinal.style.transform = "scale(1.2)";
  overlay.classList.remove("hidden");
  overlay.classList.add("blur-active");
  popupDialog.innerHTML = `
    <h2 class="popup-title">Time to Reflect</h2>
    <p class="popup-section-title">Raccoon realizes:</p>
    <ul class="popup-list">
      <li>His selfish practices harmed the soil</li>
      <li>Polluting the soil with fertilizers makes it poisonous</li>
      <li>Usage of bio manure can be beneficial to both the ecosystem and himself</li>
    </ul>
    <p class="popup-section-title">Raccoon decides:</p>
    <ul class="popup-list">
      <li>To avoid using fertilizer and use bio manure</li>
      <li>To perform composting practices like vermi-composting, bio-composting</li>
      <li>To adopt sustainable living practices</li>
    </ul>
    <button id="endMissionBtn">Continue to Next Mission</button>
  `;
  document.getElementById('endMissionBtn').addEventListener('click', () => {
    transitionToRippleScene();
  });
}

// =================================================================================
// RIPPLE SCENE LOGIC
// =================================================================================

function startRipple() {
  // Game State Variables for Ripple Scene
  let dialogFinished = false;
  let currentLine = 0;
  let wastePicked = 0;
  const totalWaste = 6;
  let done = 0;
  
  // DOM Elements for Ripple Scene
  const initialDialogLines = [
    { speaker: "penguin", text: "Whoaaa, what is going on? It smells like something gave up in here!" },
    { speaker: "frog", text: "That my friend is the sweet smell of success, business has been GOOD" },
    { speaker: "penguin", text: "Ripple, the fish are gone. The lilies are wilted." },
    { speaker: "penguin", text: "You're not just tossing trash, you're tossing life out of this pond." },
    { speaker: "frog", text: "Hey, hey, hey! I need the forest! Everyone loves my mushroom skewers." },
    { speaker: "frog", text: "I can't spend rush hours sorting banana peels from bottle caps." },
    { speaker: "penguin", text: "You don't have to stop feeding the forest, but you do have to stop feeding your trash." },
    { speaker: "penguin", text: "The pond isn't your bin, it's someone else's home!" },
    { speaker: "frog", text: "Well….now that you mention it, I haven't seen Chuck in a while. And the water….does look murkier than usual." },
    { speaker: "penguin", text: "Let's clean it together!" },
    { speaker: "penguin", text: "We'll keep the good, the leaves, the apple cores, and toss the rest. Deal?" },
    { speaker: "frog", text: "Alright! But if I fall in, I'm pulling you in too." }
  ];

  const finalDialogLines = [
    { speaker: "frog", text: "hey!! where'd all my snack wrappers go!?" },
    { speaker: "penguin", text: "Gone. Along with that weird floating corn dog from last week." },
    { speaker: "frog", text: "Hey! That was limited edition!" },
    { speaker: "frog", text: "But yeah, I guess I like the pond better when it doesn't smell like old mustard." },
    { speaker: "penguin", text: "see, even Chuck's back!" },
    { speaker: "frog", text: "LOOK! There he goes!" }
  ];

  const penguinBubbleRipple = document.getElementById("penguinBubble-ripple");
  const frogBubbleRipple = document.getElementById("frogBubble-ripple");
  const penguinRipple = document.getElementById("penguin");
  const portalRipple = document.getElementById("portal");
  const overlayRipple = document.getElementById("overlay-ripple");
  const popupDialogRipple = document.getElementById("popupDialog-ripple");
  const itemContainer = document.getElementById("item-container");
  const dirtyBg = document.getElementById("dirty-bg");
  const cleanBg = document.getElementById("clean-bg");
  const evilFrog = document.getElementById("froggy-evil");
  const finalFrog = document.getElementById("froggy-final");
  const infoBox = document.getElementById("infoBox");

  // --- Initial Setup and Dialog Flow ---

  function startPenguinWalk() {
    penguinRipple.style.transform = "translateX(150px) scale(1)";
    setTimeout(() => {
      portalRipple.style.opacity = 0;
    }, 2500);
  }

  // A generic function to display dialog lines
  function showNextDialog(dialogLines) {
    penguinBubbleRipple.classList.remove("show");
    frogBubbleRipple.classList.remove("show");

    if (currentLine < dialogLines.length) {
      const line = dialogLines[currentLine];
      const bubble = line.speaker === "penguin" ? penguinBubbleRipple : frogBubbleRipple;
      bubble.querySelector(".bubble-text").textContent = line.text;
      bubble.classList.remove("hidden");
      setTimeout(() => bubble.classList.add("show"), 10);
      currentLine++;
    } else {
      penguinBubbleRipple.classList.add("hidden");
      frogBubbleRipple.classList.add("hidden");

      if (dialogLines === initialDialogLines) {
        dialogFinished = true;
        overlayRipple.classList.remove("hidden");
        attachRippleInventoryListeners();
        document.body.removeEventListener("click", initialDialogHandler);
      } else if (dialogLines === finalDialogLines) {
        setTimeout(() => {
          duckWalksThenPortalAppears();
        }, 1000);
      }
    }
  }

  function initialDialogHandler() {
    showNextDialog(initialDialogLines);
  }

  function finalDialogHandler() {
    showNextDialog(finalDialogLines);
  }

  // --- Inventory and Gameplay Logic ---

  function attachRippleInventoryListeners() {
    const inventoryItems = document.querySelectorAll("#overlay-ripple .inventory-item");
    inventoryItems.forEach((item) => {
      item.addEventListener("click", handleRippleInventoryClick, { once: true });
    });
  }

  function handleRippleInventoryClick(event) {
    const chosenItem = event.target.getAttribute("data-item");
    const popupTitle = popupDialogRipple.querySelector(".popup-title");
    const popupSubtitle = popupDialogRipple.querySelector(".popup-subtitle");
    const inventoryContainer = popupDialogRipple.querySelector("#inventoryItems-ripple");

    if (chosenItem === "fishnet") {
      popupTitle.textContent = "Good job!";
      popupSubtitle.textContent = "Click on the non-biodegradable items to pick them up!";
      inventoryContainer.innerHTML = "";
      document.body.style.cursor = "url('assets/inventory/Cursorfishnet.png') 25 25, auto";

      setTimeout(() => {
        overlayRipple.classList.add("hidden");
        spawnItems();
      }, 2000);
    } else {
      popupTitle.textContent = "Oops! Wrong item, try again.";
      popupSubtitle.textContent = "";

      setTimeout(() => {
        popupTitle.textContent = "Ready to start the mission?";
        popupSubtitle.textContent = "Help Ripple clean the river by picking up the waste!";
        inventoryContainer.innerHTML = `
          <img src="assets/inventory/fertilizer.png" alt="Fertilizer" class="inventory-item" data-item="fertilizer" />
          <img src="assets/inventory/manure.png" alt="Manure" class="inventory-item" data-item="manure" />
          <img src="assets/inventory/fishnet.png" alt="Fish Net" class="inventory-item" data-item="fishnet" />
        `;
        attachRippleInventoryListeners();
      }, 2000);
    }
  }

  function spawnItems() {
    const itemsToSpawn = [
      { type: "waste", src: "assets/interactive_items/waste_bottle.png" },
      { type: "waste", src: "assets/interactive_items/waste_box.png" },
      { type: "waste", src: "assets/interactive_items/waste_cover.png" },
      { type: "waste", src: "assets/interactive_items/waste_box.png" },
      { type: "waste", src: "assets/interactive_items/waste_cover.png" },
      { type: "waste", src: "assets/interactive_items/waste_bottle.png" },
      { type: "good", src: "assets/interactive_items/good_banana.png" },
      { type: "good", src: "assets/interactive_items/good_leaf.png" },
      { type: "good", src: "assets/interactive_items/good_leaf.png" }
    ];

    itemsToSpawn.forEach(itemData => {
      const { x, y } = randomPosition();
      const img = document.createElement("img");
      img.src = itemData.src;
      img.classList.add("item");
      if (itemData.src.includes("banana")) {
        img.classList.add("big-banana");
      }
      img.style.left = `${x}%`;
      img.style.top = `${y}%`;
      img.dataset.type = itemData.type;
      img.addEventListener("click", handleItemClick);
      itemContainer.appendChild(img);
    });
  }

  function handleItemClick(event) {
    const item = event.target;
    if (item.dataset.type === "waste") {
      item.remove();
      wastePicked++;
      if (wastePicked >= totalWaste) {
        endGame();
      }
    } else {
      const popupTitle = popupDialogRipple.querySelector(".popup-title");
      const popupSubtitle = popupDialogRipple.querySelector(".popup-subtitle");
      popupTitle.textContent = "Oops! That's not waste, it's part of the ecosystem";
      popupSubtitle.textContent = "";
      overlayRipple.classList.remove("hidden");
      setTimeout(() => {
        overlayRipple.classList.add("hidden");
      }, 2000);
    }
  }

  function endGame() {
    overlayRipple.classList.add("hidden");
    document.querySelectorAll(".item").forEach(el => el.remove());
    document.getElementById('healthBarBefore').classList.add('hidden');
    document.getElementById('healthBarAfter').classList.remove('hidden');

    dirtyBg.style.opacity = 0;
    cleanBg.style.opacity = 1;
    evilFrog.style.opacity = 0;
    finalFrog.style.opacity = 1;
    document.body.style.cursor = "auto";
    
    dialogFinished = false; 
    currentLine = 0;
    setTimeout(() => {
      document.body.addEventListener("click", finalDialogHandler);
    }, 2000);
  }

  function randomPosition() {
    const x = Math.random() * 70 + 10;
    const y = 60 + Math.random() * 30;
    return { x, y };
  }

  function penguinExit() {
    penguinRipple.style.transform = "translateX(600px) scale(1)";
    portalRipple.style.transform = "translateX(620px) scale(1.2)";
    portalRipple.style.opacity = 1;
    setTimeout(() => {
      portalRipple.style.opacity = 0;
      penguinRipple.style.opacity = 0;
      document.getElementById("background-container").classList.add("blur");
      infoBox.style.display = "block";
    }, 2500);

    infoBox.addEventListener('click', () => {
      blackout.style.opacity = 1;
      blackout.style.zIndex = 120;
      infoBox.style.opacity = 0;

      setTimeout(() => {
        infoBox.style.display = "none";
        itemContainer.style.display = "none";
        setTimeout(() => {
          blackout.style.opacity = 0;
          blackout.style.zIndex = 0;
          transitionToOutroScene();
        }, 1000);
      }, 1000);
    });
  }

  function duckWalksThenPortalAppears() {
    const duck = document.getElementById("duck");
    duck.classList.remove("hidden");
    setTimeout(() => {
      duck.classList.add("show");
    }, 100);

    setTimeout(() => {
      penguinExit();
    }, 4200);
    done = 1;
  }

  // --- Game Start ---
  startPenguinWalk();
  setTimeout(() => {
    document.body.addEventListener("click", initialDialogHandler);
  }, 2000);
}

// =================================================================================
// OUTRO SCENE LOGIC
// =================================================================================

function startOutro() {
  const outroLines = [ 
    "I still remember the melting glaciers…", 
    "My icy home crumbling… my friends drifting into silence.",
    "All because the world forgot to care.",
    "But today… the rivers run pure, the skies are blue,", 
    "and the air no longer burns.",
    "This world… this future… it feels alive again.",
    "Not because I changed the past — ",
    "but because we chose to protect it.", 
    "And now… maybe my ice can last a little longer"
  ];
  
  let currOutroLine = 0;

  const outroTextElement = document.getElementById("dialog-text-outro");
  const portalOutro = document.getElementById("portal-outro");
  const penguinOutro = document.getElementById("penguin-outro");
  const endScreen = document.getElementById("end-screen");

  outro.style.zIndex = 130;

  function fadeInBlackToScene() {
    blackout.style.opacity = 1;

    setTimeout(() => {
      blackout.style.opacity = 0;
      setTimeout(() => {
        blackout.style.zIndex = 0;
      }, 800);
    }, 100);
  }

  function showNextLine() {
    outroTextElement.style.visibility = "visible";
    outroTextElement.style.opacity = 1;
    outroTextElement.style.display = "flex";

    if (currOutroLine < outroLines.length) {
      outroTextElement.style.opacity = 0;
      setTimeout(() => {
        outroTextElement.textContent = outroLines[currOutroLine++];
        outroTextElement.style.opacity = 1;
      }, 200);
    } else {
      blackout.style.zIndex = 140;
      document.getElementById('healthBarAfter').classList.add('hidden');
      blackout.style.opacity = 1;
      
      setTimeout(() => {
        outro.style.display = "none";
        endScreen.style.display = "block";
      }, 1000);
    }
  }

  outro.addEventListener("click", showNextLine);

  function startPenguinWalk() {
    penguinOutro.style.transition = "none";
    penguinOutro.style.transform = "translateX(0px)";
    penguinOutro.style.opacity = 1;

    setTimeout(() => {
      penguinOutro.style.transition = "transform 2s linear, opacity 1s ease";
      penguinOutro.style.transform = "translateX(325px) scale(1.8)";
      setTimeout(() => {
        portalOutro.style.opacity = 0;
      }, 2500);
    }, 50);
  }

  fadeInBlackToScene();
  startPenguinWalk();
}

// =================================================================================
// GAME INITIALIZATION
// =================================================================================

window.onload = () => {
  fadeInBlackToScene(intro);
};

intro.addEventListener("click", showNextIntroLine);
startButton.addEventListener("click", transitionToRaccoonScene);