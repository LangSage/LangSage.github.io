const root = document.getElementById("lessonRoot");
const tip = document.getElementById("tip");
const checkBtn = document.getElementById("checkBtn");
const clearBtn = document.getElementById("clearBtn");
const sendBtn = document.getElementById("sendBtn");
const legendBtn = document.getElementById("legendBtn");
const legend = document.getElementById("legend");
const legendClose = document.getElementById("legendClose");
const studentName = document.getElementById("studentName");
const scoreText = document.getElementById("scoreText");
const shieldCanvas = document.getElementById("shieldCanvas");
const saveKey = "psTravelHomeworkProgressV2";
const formBase = "https://docs.google.com/forms/d/e/1FAIpQLSeUzYUvQbbzo_1r81AacP6Kj7HlKDzEVfa93Dam39LiVjcItA/formResponse";

document.documentElement.setAttribute("translate", "no");
document.body.setAttribute("translate", "no");
document.body.classList.add("lock-select");

document.querySelectorAll(".panel, .task-card").forEach((slide, index) => {
  slide.classList.add("slide");
  slide.dataset.slide = String(index + 1);
});

["copy", "cut", "contextmenu", "dragstart"].forEach((eventName) => {
  document.addEventListener(eventName, (event) => {
    const editable = event.target.closest("input, textarea, select");
    if (!editable) event.preventDefault();
  });
});

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  const protectedCombo = (event.ctrlKey || event.metaKey) && ["c", "x", "u", "s", "p"].includes(key);
  if (protectedCombo && !event.target.closest("input, textarea")) event.preventDefault();
});

function normalize(value) {
  return String(value || "")
    .trim()
    .replace(/[']/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.?!]+$/g, "")
    .toLowerCase();
}

function checkAnswers() {
  let checked = 0;
  let correct = 0;

  document.querySelectorAll("[data-answer]").forEach((field) => {
    const answer = normalize(field.dataset.answer);
    const value = normalize(field.value);
    if (!answer || !value) {
      field.classList.remove("correct", "wrong");
      return;
    }

    checked += 1;
    const ok = value === answer;
    correct += ok ? 1 : 0;
    field.classList.toggle("correct", ok);
    field.classList.toggle("wrong", !ok);
  });

  scoreText.textContent = checked ? `${correct}/${checked} checked` : "Write answers first";
  saveProgress();
  return { checked, correct };
}

function clearWork() {
  document.querySelectorAll("input, textarea, select").forEach((field) => {
    field.value = "";
    field.classList.remove("correct", "wrong");
  });
  scoreText.textContent = "";
  localStorage.removeItem(saveKey);
  document.cookie = `${saveKey}=; Max-Age=0; path=/`;
}

checkBtn.addEventListener("click", checkAnswers);
clearBtn.addEventListener("click", clearWork);
sendBtn.addEventListener("click", sendResults);

legendBtn.addEventListener("click", () => {
  legend.hidden = false;
  window.clearTimeout(legend.hideTimer);
  legend.hideTimer = window.setTimeout(() => { legend.hidden = true; }, 12000);
});

legendClose.addEventListener("click", () => { legend.hidden = true; });

document.addEventListener("input", (event) => {
  if (event.target.matches("input, textarea, select")) saveProgress();
});

document.addEventListener("change", (event) => {
  if (event.target.matches("input, textarea, select")) saveProgress();
});

function showTip(button, entry) {
  const rect = button.getBoundingClientRect();
  tip.innerHTML = `<b>${entry.emoji ? `${entry.emoji} ` : ""}${entry.word}</b><br>${entry.translation}`;
  tip.hidden = false;
  const left = Math.min(rect.left, window.innerWidth - tip.offsetWidth - 12);
  const top = rect.bottom + tip.offsetHeight + 14 > window.innerHeight
    ? rect.top - tip.offsetHeight - 10
    : rect.bottom + 10;
  tip.style.left = `${Math.max(12, left)}px`;
  tip.style.top = `${Math.max(12, top)}px`;
}

function hideTip(event) {
  if (!event.target.closest(".vocab-word")) tip.hidden = true;
}

document.addEventListener("click", hideTip);
window.addEventListener("scroll", () => { tip.hidden = true; }, { passive: true });

function fieldId(field, index) {
  if (!field.dataset.saveId) field.dataset.saveId = `field-${index}`;
  return field.dataset.saveId;
}

function getFields() {
  return Array.from(document.querySelectorAll("input, textarea, select"));
}

function saveProgress() {
  const data = {
    updatedAt: new Date().toISOString(),
    fields: {}
  };

  getFields().forEach((field, index) => {
    data.fields[fieldId(field, index)] = field.value;
  });

  localStorage.setItem(saveKey, JSON.stringify(data));
  document.cookie = `${saveKey}=1; Max-Age=2592000; path=/; SameSite=Lax`;
}

function loadProgress() {
  const raw = localStorage.getItem(saveKey);
  if (!raw) return;

  try {
    const data = JSON.parse(raw);
    getFields().forEach((field, index) => {
      const value = data.fields?.[fieldId(field, index)];
      if (typeof value === "string") field.value = value;
    });
    scoreText.textContent = "progress saved";
  } catch {
    localStorage.removeItem(saveKey);
  }
}

function buildResults() {
  const score = checkAnswers();
  const tasks = Array.from(document.querySelectorAll("[data-task]")).map((task, index) => {
    const fields = Array.from(task.querySelectorAll("input, textarea, select"));
    const checkedFields = fields.filter((field) => field.dataset.answer);
    const correct = checkedFields.filter((field) => normalize(field.value) === normalize(field.dataset.answer)).length;
    const answered = fields.filter((field) => field.value.trim()).length;

    return {
      task: index + 1,
      answered,
      fields: fields.length,
      checked: checkedFields.length,
      correct
    };
  });

  return {
    name: studentName.value.trim() || "No name",
    group: "TG25 defaul",
    lesson: "past simple and travel",
    score: score.correct,
    checked: score.checked,
    completedTasks: tasks.filter((task) => task.answered > 0).length,
    totalTasks: tasks.length,
    tasks,
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
  form.action = formBase;
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
  scoreText.textContent = `sent: ${payload.score}/${payload.checked}`;
  window.setTimeout(() => {
    iframe.remove();
    form.remove();
  }, 5000);
}

async function loadVocabulary() {
  try {
    const response = await fetch("words_fixed.json", { cache: "force-cache" });
    const words = await response.json();
    const dict = new Map();

    words.forEach((item) => {
      const word = String(item.Word || "").toLowerCase();
      if (word && /^[a-z][a-z'-]*$/.test(word)) {
        dict.set(word, {
          word: item.Word,
          translation: item.Translation || "",
          emoji: item.Emoji || ""
        });
      }
    });

    wrapText(root, dict);
  } catch {
    scoreText.textContent = "Vocabulary did not load";
  }
}

function wrapText(container, dict) {
  const used = new Map();
  let totalWrapped = 0;
  const maxTotal = 360;
  const maxPerWord = 3;
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.closest("input, textarea, select, button, script, style")) {
        return NodeFilter.FILTER_REJECT;
      }
      return /[A-Za-z]/.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    const fragment = document.createDocumentFragment();
    const parts = node.nodeValue.split(/([A-Za-z][A-Za-z'-]*)/g);

    parts.forEach((part) => {
      const entry = dict.get(part.toLowerCase());
      const key = part.toLowerCase();
      const wordCount = used.get(key) || 0;
      if (!entry || part.length < 3 || wordCount >= maxPerWord || totalWrapped >= maxTotal) {
        fragment.appendChild(document.createTextNode(part));
        return;
      }

      used.set(key, wordCount + 1);
      totalWrapped += 1;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "vocab-word";
      button.textContent = part;
      button.setAttribute("translate", "no");
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        showTip(button, entry);
      });
      fragment.appendChild(button);
    });

    node.parentNode.replaceChild(fragment, node);
  });
}

function drawShield() {
  const ratio = window.devicePixelRatio || 1;
  shieldCanvas.width = Math.floor(window.innerWidth * ratio);
  shieldCanvas.height = Math.floor(window.innerHeight * ratio);
  const ctx = shieldCanvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = "#1f7a74";
  ctx.font = "700 15px Segoe UI, Arial";
  ctx.rotate(-Math.PI / 9);

  for (let x = -window.innerWidth; x < window.innerWidth * 1.4; x += 240) {
    for (let y = 0; y < window.innerHeight * 1.8; y += 140) {
      ctx.fillText("Past Simple Travel", x, y);
    }
  }
}

window.addEventListener("resize", drawShield);
drawShield();
loadProgress();
loadVocabulary();
