const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeUzYUvQbbzo_1r81AacP6Kj7HlKDzEVfa93Dam39LiVjcItA/formResponse";
const SAVE_KEY = "pastContiniousAnimalsProgressV2";

const steps = [
  { type: "intro", title: "The Lost Dog", body: "Animals, pets, street animals, safe help, and Past Continuous. Read, choose, build sentences, and move one step at a time." },
  {
    type: "explain",
    title: "Past Continuous",
    body: "Use Past Continuous for an action that was happening at a specific time in the past.",
    rules: ["I / he / she / it + was + verb-ing", "you / we / they + were + verb-ing", "At 7 o'clock yesterday, I was walking my dog."],
    ru: "Это процесс в прошлом. Не просто факт, а действие в моменте: в 7 вечера я гулял с собакой."
  },
  { type: "choice", task: 1, title: "Choose was or were", prompt: "I ___ walking my dog yesterday evening.", options: ["was", "were", "am"], answer: "was" },
  { type: "choice", task: 2, title: "Choose was or were", prompt: "They ___ looking for their cat.", options: ["was", "were", "are"], answer: "were" },
  { type: "choice", task: 3, title: "Choose was or were", prompt: "The dog ___ barking loudly.", options: ["was", "were", "did"], answer: "was" },
  {
    type: "explain",
    title: "Negative",
    body: "Use wasn't or weren't before verb-ing.",
    rules: ["The cat wasn't eating.", "They weren't playing.", "The owner wasn't shouting."],
    ru: "Глагол остается с -ing: wasn't barking, weren't looking."
  },
  { type: "choice", task: 4, title: "Negative", prompt: "They ___ helping the stray dog.", options: ["wasn't", "weren't", "didn't"], answer: "weren't" },
  { type: "choice", task: 5, title: "Add -ing", prompt: "run ->", options: ["running", "runing", "ran"], answer: "running" },
  { type: "choice", task: 6, title: "Add -ing", prompt: "sit ->", options: ["sitting", "siting", "sat"], answer: "sitting" },
  { type: "choice", task: 7, title: "Add -ing", prompt: "hide ->", options: ["hiding", "hideing", "hid"], answer: "hiding" },
  { type: "choice", task: 8, title: "Add -ing", prompt: "lie ->", options: ["lying", "lieing", "lay"], answer: "lying" },
  {
    type: "explain",
    title: "Questions",
    body: "Put was or were before the person.",
    rules: ["Was the dog barking?", "Were they feeding the animals?", "Was she calling the vet?"],
    ru: "В вопросе was / were выходит вперед."
  },
  { type: "construct", task: 9, title: "Build a Question", prompt: "the dog / bark?", tokens: ["Was", "the dog", "barking?"], distractors: ["Were", "barked"], answer: "Was the dog barking?" },
  { type: "construct", task: 10, title: "Build a Question", prompt: "they / look / for the puppy?", tokens: ["Were", "they", "looking", "for the puppy?"], distractors: ["Was", "looked"], answer: "Were they looking for the puppy?" },
  { type: "reading", title: "Why People Keep Pets", body: "Many people keep pets because animals make life warmer. A dog can be a friend and a reason to walk every day. A cat can make a flat feel comfortable. Pets can help people feel less lonely. But pets are not toys. They need food, water, time, care, and money." },
  { type: "choice", task: 11, title: "Reading", prompt: "Why do many people keep pets?", options: ["Because pets make life warmer", "Because pets are machines", "Because pets need no care"], answer: "Because pets make life warmer" },
  { type: "choice", task: 12, title: "Reading", prompt: "What does a pet need?", options: ["Food, water, time, care, and money", "Only a toy", "Nothing"], answer: "Food, water, time, care, and money" },
  { type: "reading", title: "Story: The Lost Dog", body: "Yesterday evening, Alina was walking home from college. It was cold and getting dark. She saw a small dog near the bus stop. The dog was standing alone and shaking. It was wearing a red collar, but there was no phone number. People were walking past it. Alina called Denis, posted a photo in a local chat, and later the owner found the dog." },
  { type: "choice", task: 13, title: "Story", prompt: "Where was Alina walking?", options: ["Home from college", "To the zoo", "Inside a shelter"], answer: "Home from college" },
  { type: "choice", task: 14, title: "Story", prompt: "What was the dog wearing?", options: ["A red collar", "A blue leash", "A coat"], answer: "A red collar" },
  { type: "choice", task: 15, title: "True or False", prompt: "People were walking past the dog.", options: ["True", "False"], answer: "True" },
  { type: "construct", task: 16, title: "Build the Sentence", prompt: "Alina ___ walking home from college.", tokens: ["Alina", "was", "walking", "home", "from college."], distractors: ["were", "walked"], answer: "Alina was walking home from college." },
  { type: "construct", task: 17, title: "Build the Sentence", prompt: "People ___ walking past the dog.", tokens: ["People", "were", "walking", "past", "the dog."], distractors: ["was", "walked"], answer: "People were walking past the dog." },
  { type: "reading", title: "Street Animals", body: "Street animals often look for food, sleep in cold places, and stay away from cars. People can help by giving water, posting photos online, calling a shelter, or asking adults. Be careful: a frightened animal can bite or scratch." },
  { type: "choice", task: 18, title: "Safe or Dangerous?", prompt: "A boy is running quickly to a frightened dog.", options: ["Safe", "Dangerous"], answer: "Dangerous" },
  { type: "choice", task: 19, title: "Safe or Dangerous?", prompt: "A girl is calling a shelter.", options: ["Safe", "Dangerous"], answer: "Safe" },
  { type: "choice", task: 20, title: "Safe or Dangerous?", prompt: "A child is touching an angry dog.", options: ["Safe", "Dangerous"], answer: "Dangerous" },
  { type: "reading", title: "Working Animals", body: "Some animals work with people. Police dogs find dangerous things. Guide dogs help blind people. Rescue dogs look for people after accidents. Horses can help in villages, sport, tourism, and therapy." },
  { type: "choice", task: 21, title: "Working Animals", prompt: "What does a guide dog do?", options: ["Helps a blind person", "Catches mice", "Orders tea"], answer: "Helps a blind person" },
  { type: "construct", task: 22, title: "Working Animals", prompt: "The rescue dog ___ searching for people.", tokens: ["The rescue dog", "was", "searching", "for people."], distractors: ["were", "searched"], answer: "The rescue dog was searching for people." },
  { type: "reading", title: "Funny Animal Videos", body: "Animal videos can be funny when the animal is safe and happy. A video is wrong if the animal is scared, angry, or in danger. People should not make animals uncomfortable for likes." },
  { type: "choice", task: 23, title: "Funny or Wrong?", prompt: "A dog is playing with a ball in the garden.", options: ["Funny and safe", "Wrong"], answer: "Funny and safe" },
  { type: "choice", task: 24, title: "Funny or Wrong?", prompt: "A man is scaring a kitten for a video.", options: ["Funny and safe", "Wrong"], answer: "Wrong" },
  { type: "reading", title: "Wild Animals Near People", body: "Wild animals sometimes come close to cities because they are looking for food. They are not pets. Do not feed, touch, or take them home. If a wild animal is dangerous or injured, call special services." },
  { type: "choice", task: 25, title: "Wild Animals", prompt: "Should people feed wild animals?", options: ["No", "Yes"], answer: "No" },
  { type: "construct", task: 26, title: "What Was Happening?", prompt: "At 6 a.m., a fox was near the bins.", tokens: ["It", "was", "looking", "for food."], distractors: ["were", "looked"], answer: "It was looking for food." },
  { type: "reading", title: "Mini Story: The Cat Under the Car", body: "After school, Mira was walking past a shop. A grey cat was hiding under a parked car. It was crying quietly. People were standing near the door, but nobody was touching the cat because it was frightened." },
  { type: "choice", task: 27, title: "Mini Story", prompt: "Where was the cat hiding?", options: ["Under a parked car", "In a tree", "Inside a classroom"], answer: "Under a parked car" },
  { type: "choice", task: 28, title: "Mini Story", prompt: "Why were people not touching the cat?", options: ["It was frightened", "It was sleeping", "It was eating"], answer: "It was frightened" },
  { type: "construct", task: 29, title: "Mini Story", prompt: "Build the sentence.", tokens: ["The cat", "was", "crying", "quietly."], distractors: ["were", "cried"], answer: "The cat was crying quietly." },
  { type: "reading", title: "Mini Story: The Rabbit in the Box", body: "On Sunday morning, Timur was helping his grandmother in the garden. Near the gate, a white rabbit was sitting in a cardboard box. It was eating a leaf. Timur was looking for the owner and his grandmother was calling the neighbours." },
  { type: "choice", task: 30, title: "Mini Story", prompt: "What was the rabbit doing?", options: ["Eating a leaf", "Running near the road", "Barking loudly"], answer: "Eating a leaf" },
  { type: "choice", task: 31, title: "Mini Story", prompt: "What was Timur doing?", options: ["Looking for the owner", "Buying a snake", "Watching TV"], answer: "Looking for the owner" },
  { type: "construct", task: 32, title: "Mini Story", prompt: "Build the sentence.", tokens: ["His grandmother", "was", "calling", "the neighbours."], distractors: ["were", "called"], answer: "His grandmother was calling the neighbours." },
  { type: "reading", title: "Mini Story: The Parrot at Night", body: "Last night, Vera was sleeping when her parrot started making noise. The bird was sitting near the window and copying a phone ringtone. Vera's brother was laughing, but Vera was feeling tired." },
  { type: "choice", task: 33, title: "Mini Story", prompt: "What was the parrot copying?", options: ["A phone ringtone", "A dog bark", "A school bell"], answer: "A phone ringtone" },
  { type: "choice", task: 34, title: "Mini Story", prompt: "How was Vera feeling?", options: ["Tired", "Hungry", "Angry at the vet"], answer: "Tired" },
  { type: "construct", task: 35, title: "Mini Story", prompt: "Build the sentence.", tokens: ["The parrot", "was", "sitting", "near the window."], distractors: ["were", "sat"], answer: "The parrot was sitting near the window." },
  { type: "textarea", task: 36, title: "Problem Case", prompt: "A dog was sitting in a hot car and breathing fast. What should people do?", minWords: 6 },
  { type: "textarea", task: 37, title: "Short Answer", prompt: "You saw a stray cat near the road. Write 2 safe actions.", minWords: 6 },
  { type: "construct", task: 38, title: "Build a Sentence", prompt: "Use the blocks.", tokens: ["A small cat", "was", "hiding", "near the road."], distractors: ["were", "hide"], answer: "A small cat was hiding near the road." },
  { type: "construct", task: 39, title: "Final Grammar", prompt: "She ___ feeding the rabbit.", tokens: ["She", "was", "feeding", "the rabbit."], distractors: ["were", "feed"], answer: "She was feeding the rabbit." },
  { type: "construct", task: 40, title: "Final Grammar", prompt: "We ___ watching a film about animals.", tokens: ["We", "were", "watching", "a film", "about animals."], distractors: ["was", "watched"], answer: "We were watching a film about animals." },
  { type: "construct", task: 41, title: "Final Grammar", prompt: "The rabbit ___ hiding under the table.", tokens: ["The rabbit", "was", "hiding", "under the table."], distractors: ["were", "hide"], answer: "The rabbit was hiding under the table." },
  { type: "construct", task: 42, title: "Final Question", prompt: "Build the question.", tokens: ["Were", "the cats", "sleeping", "on the sofa?"], distractors: ["Was", "slept"], answer: "Were the cats sleeping on the sofa?" },
  { type: "textarea", task: 43, title: "Final Writing", prompt: "Write 5 sentences about yesterday evening. Use was, were, wasn't or weren't.", minWords: 18 },
  { type: "finish", title: "Finish", body: "Check your name, then send your results." }
];

const state = {
  step: 0,
  answers: {},
  checked: {}
};

const card = document.getElementById("card");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const message = document.getElementById("message");
const stepCount = document.getElementById("stepCount");
const barFill = document.getElementById("barFill");
const studentName = document.getElementById("studentName");
const legend = document.getElementById("legend");
const tip = document.getElementById("tip");

document.body.classList.add("lock-select");
document.documentElement.setAttribute("translate", "no");
document.body.setAttribute("translate", "no");

["copy", "cut", "contextmenu", "dragstart"].forEach((eventName) => {
  document.addEventListener(eventName, (event) => {
    const editable = event.target.closest("input, textarea");
    if (!editable) event.preventDefault();
  });
});

document.getElementById("legendBtn").addEventListener("click", () => {
  legend.hidden = false;
});

document.getElementById("legendClose").addEventListener("click", () => {
  legend.hidden = true;
});

backBtn.addEventListener("click", () => {
  if (state.step > 0) {
    state.step -= 1;
    render();
    save();
  }
});

nextBtn.addEventListener("click", () => {
  const current = steps[state.step];
  if (current.type === "finish") {
    sendResults();
    return;
  }
  if (!validateCurrent()) return;
  if (state.step < steps.length - 1) {
    state.step += 1;
    render();
    save();
  }
});

studentName.addEventListener("input", save);

function normalize(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[.?!]+$/g, "")
    .toLowerCase();
}

function words(value) {
  return String(value || "").trim().split(/\s+/).filter(Boolean).length;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function render() {
  const step = steps[state.step];
  message.textContent = "";
  stepCount.textContent = `Step ${state.step + 1} / ${steps.length}`;
  barFill.style.width = `${((state.step + 1) / steps.length) * 100}%`;
  backBtn.disabled = state.step === 0;
  nextBtn.textContent = step.type === "finish" ? "Send results" : step.task ? "Check & continue" : "Continue";

  if (step.type === "intro" || step.type === "reading") {
    card.innerHTML = `<h2>${escapeHtml(step.title)}</h2><p class="lead">${escapeHtml(step.body)}</p>`;
  } else if (step.type === "explain") {
    card.innerHTML = `
      <h2>${escapeHtml(step.title)}</h2>
      <p class="lead">${escapeHtml(step.body)}</p>
      <div class="rule-grid">${step.rules.map((rule) => `<div class="rule">${escapeHtml(rule)}</div>`).join("")}</div>
      <p class="ru">${escapeHtml(step.ru)}</p>
    `;
  } else if (step.type === "choice") {
    const saved = state.answers[step.task] || "";
    card.innerHTML = `
      <h2>${escapeHtml(step.title)}</h2>
      <p class="lead question-prompt">${escapeHtml(step.prompt)}</p>
      <div class="choice-grid">
        ${step.options.map((option) => `<button type="button" class="option ${saved === option ? "selected" : ""}" data-value="${escapeHtml(option)}">${escapeHtml(option)}</button>`).join("")}
      </div>
    `;
    card.querySelectorAll(".option").forEach((button) => {
      button.addEventListener("click", () => {
        state.answers[step.task] = button.dataset.value;
        card.querySelectorAll(".option").forEach((item) => item.classList.remove("selected"));
        button.classList.add("selected");
        save();
      });
    });
  } else if (step.type === "input") {
    card.innerHTML = `
      <h2>${escapeHtml(step.title)}</h2>
      <p class="lead question-prompt">${escapeHtml(step.prompt)}</p>
      <input id="answerField" class="inline-field" value="${escapeHtml(state.answers[step.task] || "")}" autocomplete="off">
    `;
    card.querySelector("#answerField").addEventListener("input", (event) => {
      state.answers[step.task] = event.target.value;
      save();
    });
  } else if (step.type === "textarea") {
    card.innerHTML = `
      <h2>${escapeHtml(step.title)}</h2>
      <p class="lead question-prompt">${escapeHtml(step.prompt)}</p>
      <textarea id="answerField">${escapeHtml(state.answers[step.task] || "")}</textarea>
      <p class="word-bank">Use: was, were, wasn't, weren't, walking, looking, helping, calling, hiding.</p>
    `;
    card.querySelector("#answerField").addEventListener("input", (event) => {
      state.answers[step.task] = event.target.value;
      save();
    });
  } else if (step.type === "construct") {
    renderConstructor(step);
  } else if (step.type === "finish") {
    const result = buildResults();
    card.innerHTML = `
      <h2>${escapeHtml(step.title)}</h2>
      <p class="lead">${escapeHtml(step.body)}</p>
      <div class="rule-grid">
        <div class="rule"><b>Name</b><br>${escapeHtml(studentName.value || "No name")}</div>
        <div class="rule"><b>Points</b><br>${result.score} / ${result.checked}</div>
        <div class="rule"><b>Completed</b><br>${result.completedTasks} / ${result.totalTasks}</div>
        <div class="rule ok"><b>Ready</b><br>Only results will be sent.</div>
      </div>
    `;
  }

  wrapVisibleWords();
}

function renderConstructor(step) {
  const selected = state.answers[step.task] ? state.answers[step.task].split(" | ") : [];
  const allTokens = shuffle([...(step.tokens || []), ...(step.distractors || [])]);
  card.innerHTML = `
    <h2>${escapeHtml(step.title)}</h2>
    <p class="lead question-prompt">${escapeHtml(step.prompt)}</p>
    <div class="answer-box" aria-label="Built sentence">${selected.map((token, index) => `<button type="button" class="token selected-token" data-index="${index}">${escapeHtml(token)}</button>`).join("")}</div>
    <div class="token-bank">
      ${allTokens.map((token) => `<button type="button" class="token" data-token="${escapeHtml(token)}">${escapeHtml(token)}</button>`).join("")}
    </div>
    <button type="button" class="small-action" id="clearSentence">Clear sentence</button>
  `;

  card.querySelectorAll(".token-bank .token").forEach((button) => {
    if (selected.includes(button.dataset.token)) button.disabled = true;
    button.addEventListener("click", () => {
      const current = state.answers[step.task] ? state.answers[step.task].split(" | ") : [];
      current.push(button.dataset.token);
      state.answers[step.task] = current.join(" | ");
      renderConstructor(step);
      save();
    });
  });

  card.querySelectorAll(".selected-token").forEach((button) => {
    button.addEventListener("click", () => {
      const current = state.answers[step.task] ? state.answers[step.task].split(" | ") : [];
      current.splice(Number(button.dataset.index), 1);
      state.answers[step.task] = current.join(" | ");
      renderConstructor(step);
      save();
    });
  });

  card.querySelector("#clearSentence").addEventListener("click", () => {
    state.answers[step.task] = "";
    renderConstructor(step);
    save();
  });
}

function answerText(step) {
  const value = state.answers[step.task] || "";
  return step.type === "construct" ? value.split(" | ").join(" ").trim() : value;
}

function validateCurrent() {
  const step = steps[state.step];
  if (!step.task) return true;
  const value = answerText(step);

  if (!String(value).trim()) {
    message.textContent = "Answer first.";
    return false;
  }

  if (step.answer) {
    const ok = normalize(value) === normalize(step.answer);
    state.checked[step.task] = ok;
    if (!ok) {
      message.textContent = step.type === "construct" ? "Move the blocks into the correct order." : "Check the rule and try again.";
      return false;
    }
  }

  if (step.minWords && words(value) < step.minWords) {
    message.textContent = `Write a little more: at least ${step.minWords} words.`;
    return false;
  }

  if (!step.answer) state.checked[step.task] = true;
  message.textContent = "";
  return true;
}

function buildResults() {
  const taskSteps = steps.filter((step) => step.task);
  const checkedSteps = taskSteps.filter((step) => step.answer);
  const correct = checkedSteps.filter((step) => normalize(answerText(step)) === normalize(step.answer)).length;
  const openDone = taskSteps.filter((step) => !step.answer && words(answerText(step)) >= (step.minWords || 1)).length;

  return {
    name: studentName.value.trim() || "No name",
    group: "TG25 defaul",
    lesson: "past continuous animals and pets",
    score: correct + openDone,
    checked: checkedSteps.length + taskSteps.filter((step) => !step.answer).length,
    completedTasks: taskSteps.filter((step) => String(answerText(step) || "").trim()).length,
    totalTasks: taskSteps.length,
    tasks: taskSteps.map((step) => ({
      task: step.task,
      answered: String(answerText(step) || "").trim() ? 1 : 0,
      checked: step.answer ? 1 : 0,
      correct: step.answer ? (normalize(answerText(step)) === normalize(step.answer) ? 1 : 0) : (words(answerText(step)) >= (step.minWords || 1) ? 1 : 0)
    })),
    sentAt: new Date().toISOString()
  };
}

function sendResults() {
  const payload = buildResults();
  const iframe = document.createElement("iframe");
  iframe.name = `formTarget${Date.now()}`;
  iframe.hidden = true;
  document.body.appendChild(iframe);

  const form = document.createElement("form");
  form.method = "POST";
  form.action = FORM_URL;
  form.target = iframe.name;
  form.hidden = true;

  const entries = {
    "entry.1582931880": payload.name,
    "entry.1222434157": payload.group,
    "entry.371289786": payload.lesson,
    "entry.679064514": JSON.stringify(payload)
  };

  Object.entries(entries).forEach(([name, value]) => {
    const input = document.createElement("input");
    input.name = name;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
  message.textContent = `Sent: ${payload.score} / ${payload.checked}`;
  window.setTimeout(() => {
    form.remove();
    iframe.remove();
  }, 5000);
}

function save() {
  localStorage.setItem(SAVE_KEY, JSON.stringify({
    step: state.step,
    answers: state.answers,
    checked: state.checked,
    name: studentName.value,
    updatedAt: new Date().toISOString()
  }));
  document.cookie = `${SAVE_KEY}=1; Max-Age=2592000; path=/; SameSite=Lax`;
}

function load() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    state.step = Math.min(saved.step || 0, steps.length - 1);
    state.answers = saved.answers || {};
    state.checked = saved.checked || {};
    studentName.value = saved.name || "";
  } catch {
    localStorage.removeItem(SAVE_KEY);
  }
}

let vocabulary = new Map();

async function loadVocabulary() {
  try {
    const response = await fetch("words_fixed.json", { cache: "force-cache" });
    const words = await response.json();
    words.forEach((item) => {
      const word = String(item.Word || "").toLowerCase();
      if (word && /^[a-z][a-z'-]*$/.test(word)) {
        vocabulary.set(word, {
          word: item.Word,
          translation: item.Translation || "",
          emoji: item.Emoji || ""
        });
      }
    });
    wrapVisibleWords();
  } catch {
    message.textContent = "Vocabulary did not load.";
  }
}

function wrapVisibleWords() {
  if (!vocabulary.size) return;
  const used = new Map();
  const walker = document.createTreeWalker(card, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.closest("input, textarea, button, label, .question-prompt, .answer-box, .token-bank")) return NodeFilter.FILTER_REJECT;
      return /[A-Za-z]/.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    const fragment = document.createDocumentFragment();
    node.nodeValue.split(/([A-Za-z][A-Za-z'-]*)/g).forEach((part) => {
      const key = part.toLowerCase();
      const entry = vocabulary.get(key);
      const count = used.get(key) || 0;
      if (!entry || part.length < 3 || count > 1) {
        fragment.appendChild(document.createTextNode(part));
        return;
      }
      used.set(key, count + 1);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "vocab-word";
      button.textContent = part;
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        showTip(button, entry);
      });
      fragment.appendChild(button);
    });
    node.parentNode.replaceChild(fragment, node);
  });
}

function showTip(button, entry) {
  const rect = button.getBoundingClientRect();
  tip.innerHTML = `<b>${entry.emoji ? `${entry.emoji} ` : ""}${escapeHtml(entry.word)}</b><br>${escapeHtml(entry.translation)}`;
  tip.hidden = false;
  const left = Math.min(rect.left, window.innerWidth - tip.offsetWidth - 12);
  const top = rect.bottom + tip.offsetHeight + 14 > window.innerHeight ? rect.top - tip.offsetHeight - 10 : rect.bottom + 10;
  tip.style.left = `${Math.max(12, left)}px`;
  tip.style.top = `${Math.max(12, top)}px`;
}

document.addEventListener("click", (event) => {
  if (!event.target.closest(".vocab-word")) tip.hidden = true;
});

load();
render();
loadVocabulary();
