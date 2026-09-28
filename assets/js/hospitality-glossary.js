(function () {
  const dictionary = {
    "ac": "кондиционер",
    "air conditioning": "кондиционер",
    "airport shuttle": "шаттл до аэропорта",
    "arrange": "организовать",
    "availability": "наличие свободных номеров",
    "baby cot": "детская кроватка",
    "bath mat": "коврик у ванны",
    "bathrobe": "халат",
    "bed": "кровать",
    "bellhop": "носильщик",
    "bill": "счет",
    "blanket": "плед",
    "book a taxi": "заказать такси",
    "booking": "бронь",
    "breakfast": "завтрак",
    "breakfast included": "завтрак включен",
    "brown": "Браун, фамилия",
    "call maintenance": "позвать техника",
    "call security": "позвать охрану",
    "change room": "поменять номер",
    "change the room": "поменять номер",
    "charge": "позиция в счете",
    "check in": "заселиться",
    "check out": "выехать из отеля",
    "chef": "повар",
    "complaint": "жалоба",
    "concierge": "консьерж",
    "conditioner": "кондиционер для волос",
    "confirmation number": "номер подтверждения",
    "contact": "связаться",
    "copy the passport": "скопировать паспорт",
    "credit card": "банковская карта",
    "deposit": "залог",
    "double room": "двухместный номер",
    "driver": "водитель",
    "duvet": "одеяло",
    "early check-in": "ранний заезд",
    "elevator": "лифт",
    "emergency services": "экстренные службы",
    "extra fee": "дополнительная плата",
    "extra towels": "дополнительные полотенца",
    "fifteen": "пятнадцать",
    "fifty": "пятьдесят",
    "floor": "этаж",
    "front desk": "ресепшен",
    "guest": "гость",
    "hair dryer": "фен",
    "hanger": "вешалка",
    "housekeeper": "горничная",
    "housekeeping": "служба уборки",
    "invoice": "счет для компании",
    "iron": "утюг",
    "key card": "карта-ключ",
    "key card holder": "конверт для карты",
    "kettle": "чайник",
    "late check-out": "поздний выезд",
    "laundry": "прачечная",
    "leave luggage": "оставить багаж",
    "lobby": "лобби",
    "lost and found": "бюро находок",
    "luggage": "багаж",
    "luggage tag": "бирка багажа",
    "maintenance": "техническая служба",
    "maintenance worker": "техник",
    "manager": "менеджер",
    "meeting": "встреча",
    "minibar": "мини-бар",
    "non-smoking": "для некурящих",
    "overbooking": "сверхбронирование",
    "parking": "парковка",
    "passport": "паспорт",
    "pillow": "подушка",
    "print receipt": "распечатать чек",
    "print the receipt": "распечатать чек",
    "quiet room": "тихий номер",
    "razor": "бритва",
    "receipt": "чек, квитанция",
    "receptionist": "администратор ресепшена",
    "recode the key card": "перекодировать карту-ключ",
    "remote control": "пульт",
    "reservation": "бронь",
    "restaurant": "ресторан",
    "room number": "номер комнаты",
    "room service": "обслуживание в номере",
    "safe": "сейф",
    "same-day laundry": "прачечная в тот же день",
    "security guard": "охранник",
    "send housekeeping": "отправить уборку",
    "sheet": "простыня",
    "shampoo": "шампунь",
    "shower cap": "шапочка для душа",
    "socket": "розетка",
    "split bill": "разделить счет",
    "store luggage": "оставить багаж на хранение",
    "tissue box": "салфетки",
    "toothbrush": "зубная щетка",
    "toothpaste": "зубная паста",
    "towel": "полотенце",
    "transfer": "трансфер",
    "upgrade": "апгрейд",
    "upgrade the room": "повысить категорию номера",
    "waiter": "официант",
    "wake-up call": "звонок-будильник",
    "wi-fi password": "пароль от Wi-Fi"
  };

  let activeTerm = null;
  let popover = null;

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[“”]/g, '"')
      .replace(/[’]/g, "'")
      .replace(/[.!?,:;]+$/g, "")
      .trim();
  }

  function translationFor(element) {
    const direct = element.dataset.glossRu;
    if (direct) return direct;
    return dictionary[normalize(element.dataset.gloss || element.textContent)];
  }

  function ensureStyles() {
    if (document.getElementById("langsage-glossary-style")) return;
    const style = document.createElement("style");
    style.id = "langsage-glossary-style";
    style.textContent = `
      .ls-glossary-term {
        cursor: help;
        text-decoration: underline;
        text-decoration-style: dotted;
        text-decoration-thickness: 1px;
        text-underline-offset: 3px;
      }

      .ls-glossary-popover {
        position: fixed;
        z-index: 10000;
        max-width: min(260px, calc(100vw - 20px));
        padding: 9px 11px;
        border: 1px solid rgba(18, 108, 118, .28);
        border-radius: 8px;
        background: #172126;
        color: #fff;
        font: 800 14px/1.25 Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        box-shadow: 0 16px 38px rgba(23, 33, 38, .24);
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
  }

  function hide() {
    if (popover) popover.remove();
    popover = null;
    activeTerm = null;
  }

  function isLetter(value) {
    return /[a-z]/i.test(value || "");
  }

  function findMatch(text, startIndex) {
    const lower = text.toLowerCase();
    const terms = Object.keys(dictionary).sort((a, b) => b.length - a.length);
    for (let index = startIndex; index < text.length; index += 1) {
      for (const term of terms) {
        if (!lower.startsWith(term, index)) continue;
        const before = text[index - 1];
        const after = text[index + term.length];
        if (isLetter(before) || isLetter(after)) continue;
        return { index, term, text: text.slice(index, index + term.length) };
      }
    }
    return null;
  }

  function decorateText(root) {
    const scope = root || document;
    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent || parent.closest(".ls-glossary-term, [data-gloss]")) return NodeFilter.FILTER_REJECT;
        if (parent.closest("script, style, textarea, input")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      const text = node.nodeValue;
      const fragment = document.createDocumentFragment();
      let cursor = 0;
      let match = findMatch(text, cursor);
      if (!match) return;

      while (match) {
        if (match.index > cursor) fragment.appendChild(document.createTextNode(text.slice(cursor, match.index)));
        const span = document.createElement("span");
        span.dataset.gloss = match.term;
        span.textContent = match.text;
        fragment.appendChild(span);
        cursor = match.index + match.text.length;
        match = findMatch(text, cursor);
      }
      if (cursor < text.length) fragment.appendChild(document.createTextNode(text.slice(cursor)));
      node.replaceWith(fragment);
    });
  }

  function show(element) {
    const text = translationFor(element);
    if (!text) return;
    ensureStyles();
    hide();
    activeTerm = element;
    popover = document.createElement("div");
    popover.className = "ls-glossary-popover";
    popover.textContent = text;
    document.body.appendChild(popover);

    const rect = element.getBoundingClientRect();
    const pop = popover.getBoundingClientRect();
    let top = rect.bottom + 8;
    if (top + pop.height > window.innerHeight - 8) top = Math.max(8, rect.top - pop.height - 8);
    let left = rect.left + (rect.width / 2) - (pop.width / 2);
    left = Math.max(8, Math.min(left, window.innerWidth - pop.width - 8));
    popover.style.top = `${Math.round(top)}px`;
    popover.style.left = `${Math.round(left)}px`;
  }

  function mount(root) {
    ensureStyles();
    const scope = root || document;
    scope.querySelectorAll("[data-gloss]").forEach((element) => {
      if (element.dataset.glossaryReady === "true") return;
      if (!translationFor(element)) return;
      element.dataset.glossaryReady = "true";
      element.classList.add("ls-glossary-term");
      if (!element.hasAttribute("tabindex")) element.tabIndex = 0;
      element.addEventListener("mouseenter", () => show(element));
      element.addEventListener("mouseleave", hide);
      element.addEventListener("focus", () => show(element));
      element.addEventListener("blur", hide);
      element.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (activeTerm === element) hide();
        else show(element);
      });
    });
  }

  function decorate(root) {
    decorateText(root || document);
    mount(root || document);
  }

  document.addEventListener("click", (event) => {
    if (!event.target.closest("[data-gloss]")) hide();
  });
  window.addEventListener("scroll", hide, { passive: true });
  window.addEventListener("resize", hide);

  window.LangSageGlossary = {
    dictionary,
    decorate,
    mount,
    lookup: (term) => dictionary[normalize(term)]
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => mount(document));
  } else {
    mount(document);
  }
})();
