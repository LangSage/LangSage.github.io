/* Shared, dependency-free first-person reception scenes. */
(function () {
  'use strict';
  let serial = 0;
  const actions = {
    passport: 'The passport is handed across the counter.',
    scan: 'The passport is placed on the scanner, checked and returned.',
    sign: 'The guest signs the registration form.',
    key: 'The room key card is handed across the counter.',
    payment: 'A bank card is tapped on the payment terminal.',
    receipt: 'The receipt is printed and handed over.',
    booking: 'The receptionist checks the booking on the computer.',
    call: 'The receptionist makes a phone call.',
    luggage: 'The luggage is labelled for storage.',
    welcome: 'The receptionist welcomes the guest.',
    farewell: 'The guest and receptionist say goodbye.'
  };
  const people = [
    {skin:'#c58b68',shade:'#a9684d',hair:'#302c30',shirt:'#d5bba0'},
    {skin:'#e9ba96',shade:'#ca8d70',hair:'#734637',shirt:'#718d9b'},
    {skin:'#8b5a46',shade:'#6c4034',hair:'#25272d',shirt:'#bd7b5c'},
    {skin:'#edc6a5',shade:'#d3a17f',hair:'#343c47',shirt:'#83967c'}
  ];

  function person(staff) {
    return `<g class="rs-person ${staff ? 'rs-staff' : 'rs-guest'}" transform="translate(305 54)">
      <ellipse cx="56" cy="202" rx="78" ry="9" fill="#152a3022"/>
      <g class="rs-breathe">
      <path d="M-11 202 0 136Q7 115 34 110H78Q105 115 112 136L124 202Z" fill="${staff ? '#254e53' : 'var(--rs-shirt)'}"/>
      <path d="m31 113 25 39 27-39-16-7H46Z" fill="${staff ? '#f7f1df' : '#ece3d6'}"/>
      ${staff ? '<path d="m53 132 7 0 3 10-5 6 8 45H49l7-45-5-6Z" fill="#bb8d4c"/><path d="m29 113-8 27 21-3-4 19 18 37-10-56Zm54 0 8 27-19-3 3 19-17 37 9-56Z" fill="#386368"/><rect x="77" y="148" width="25" height="9" rx="2" fill="#d8b87b"/><path d="M82 152h14" stroke="#735d3d"/>' : '<path d="m24 122 15 78M91 122l-15 78" stroke="#ffffff22" stroke-width="3"/><path d="M-5 155 12 160M100 160l17-5" stroke="#263c4722" stroke-width="2"/>'}
      <path d="M44 95v22q12 18 25 0V95" fill="var(--rs-skin)"/>
      <path d="M44 100q13 15 25 0v10q-14 14-25-1Z" fill="var(--rs-shade)" opacity=".55"/>
      <ellipse cx="24" cy="71" rx="7" ry="12" fill="var(--rs-skin)"/><ellipse cx="88" cy="71" rx="7" ry="12" fill="var(--rs-skin)"/>
      <path d="M25 52Q24 17 56 17T87 52L85 82Q81 106 56 108 30 103 27 83Z" fill="var(--rs-skin)"/>
      <path d="M24 68Q11 29 36 16q23-15 45 3 17 14 7 49l-7-23q-18 7-37-9-4 17-18 15Z" fill="var(--rs-hair)"/>
      ${staff ? '<circle cx="25" cy="38" r="15" fill="var(--rs-hair)"/>' : '<path d="m74 26 13 13-4 9-14-15" fill="#ffffff0c"/>'}
      <path d="m34 59 11-2m22 0 11 2" stroke="var(--rs-hair)" stroke-width="2.7" stroke-linecap="round"/>
      <g class="rs-eyes" fill="#263637"><ellipse cx="40" cy="66" rx="2.3" ry="3"/><ellipse cx="73" cy="66" rx="2.3" ry="3"/></g>
      <path d="m56 67-3 14h6" fill="none" stroke="var(--rs-shade)" stroke-width="1.8" stroke-linecap="round"/>
      <path class="rs-smile" d="M46 88q10 8 21-1" fill="none" stroke="#8a4d43" stroke-width="2" stroke-linecap="round"/>
      <path class="rs-concern" d="M47 92q9-6 18-1" fill="none" stroke="#8a4d43" stroke-width="2" stroke-linecap="round"/>
      <path d="M0 137q-7 5-12 33l-8 22q-2 9 8 10h39v-12H0l14-38M111 137q9 9 12 34l8 21q2 9-8 10H84v-12h28l-15-38" fill="${staff ? '#254e53' : 'var(--rs-shirt)'}"/>
      <path d="M17 190q6-5 14-4l15 5q5 4 0 7H20ZM94 190q-6-5-14-4l-15 5q-5 4 0 7h26Z" fill="var(--rs-skin)"/>
      </g>
    </g>`;
  }

  function markup(id) {
    return `<div class="reception-viewport" data-role="receptionist" data-mood="neutral">
      <svg class="rs-world" viewBox="0 0 720 320" role="img" aria-labelledby="${id}-title" preserveAspectRatio="xMidYMid meet">
      <title id="${id}-title">Hotel reception, from behind the desk</title>
      <defs>
        <linearGradient id="${id}-wall" x2="0" y2="1"><stop stop-color="#e6ded0"/><stop offset="1" stop-color="#c6bdab"/></linearGradient>
        <linearGradient id="${id}-desk" x2="0" y2="1"><stop stop-color="#f7eee0"/><stop offset="1" stop-color="#cdbb9d"/></linearGradient>
        <linearGradient id="${id}-wood" x2="1" y2="0"><stop stop-color="#5c493b"/><stop offset=".5" stop-color="#89684b"/><stop offset="1" stop-color="#4a3b33"/></linearGradient>
        <linearGradient id="${id}-window" x2="0" y2="1"><stop stop-color="#abc8c4"/><stop offset="1" stop-color="#e5e4cd"/></linearGradient>
        <linearGradient id="${id}-screen" x2="1" y2="1"><stop stop-color="#244b50"/><stop offset="1" stop-color="#102d33"/></linearGradient>
        <pattern id="${id}-slats" width="15" height="100" patternUnits="userSpaceOnUse"><path d="M1 0v100" stroke="#302b25" stroke-opacity=".18" stroke-width="3"/></pattern>
      </defs>
      <rect width="720" height="320" fill="url(#${id}-wall)"/>
      <g class="rs-guest-view">
        <path d="M0 0h185v237H0Zm535 0h185v237H535Z" fill="#54706a"/>
        <path d="M0 0h185v237H0Zm535 0h185v237H535Z" fill="url(#${id}-slats)"/>
        <rect x="226" y="34" width="270" height="155" rx="2" fill="#ede6d7" stroke="#aa9574"/>
        <path d="m335 66 25-12 25 12-25 12Z" fill="none" stroke="#9a7952" stroke-width="1.4"/>
        <path d="M360 54v24m-14-18v12m28-12v12" stroke="#9a7952"/>
        <text x="360" y="100" text-anchor="middle" font-family="Georgia,serif" font-size="18" letter-spacing="6" fill="#76654d">THE ATRIUM</text>
        <text x="360" y="119" text-anchor="middle" font-size="7" letter-spacing="4" fill="#98876d">HOTEL &amp; RESIDENCE</text>
        <path d="M104 0v66m514-66v66" stroke="#665745" stroke-width="2"/>
        <path d="m82 66 8-24h28l8 24Zm514 0 8-24h28l8 24Z" fill="#cfb887"/>
        <ellipse cx="104" cy="67" rx="22" ry="4" fill="#f7dfad"/><ellipse cx="618" cy="67" rx="22" ry="4" fill="#f7dfad"/>
        <path d="M238 154h48m-40 7h32m153-7h48m-40 7h32" stroke="#b7a68b" stroke-width="2"/>
        ${person(true)}
        <g transform="translate(512 175)"><path d="m0 0 65-8v54H0Z" fill="#3a4442"/><path d="M31 44v11m-15 0h32" stroke="#3a4442" stroke-width="5"/></g>
      </g>
      <g class="rs-staff-view">
        <path d="M0 226V0h720v226Z" fill="#dcd6c8"/>
        <path d="M73 228V96a74 74 0 0 1 148 0v132Zm418 0V96a74 74 0 0 1 148 0v132Z" fill="#b1ac98"/>
        <path d="M83 228V96a64 64 0 0 1 128 0v132Zm418 0V96a64 64 0 0 1 128 0v132Z" fill="url(#${id}-window)"/>
        <path d="M147 32v196M83 119h128m354-87v196m-64-109h128" stroke="#f0e7d4" stroke-width="6"/>
        <path d="M0 212h720v53H0Z" fill="#b6ad99"/><path d="M207 320 285 212m228 108-78-108" stroke="#968b7722" stroke-width="2"/>
        <rect x="252" y="19" width="217" height="21" rx="3" fill="#495e54"/><text x="360" y="33" text-anchor="middle" font-size="9" letter-spacing="3" fill="#f3ead8">THE ATRIUM · LOBBY</text>
        <g transform="translate(46 176)"><rect width="130" height="40" rx="12" fill="#b78a67"/><rect y="24" width="130" height="25" rx="7" fill="#a07152"/><path d="M14 49v10m104-10v10" stroke="#554b3c" stroke-width="4"/></g>
        <g transform="translate(544 176)"><rect width="130" height="40" rx="12" fill="#829082"/><rect y="24" width="130" height="25" rx="7" fill="#677b6b"/><path d="M14 49v10m104-10v10" stroke="#554b3c" stroke-width="4"/></g>
        ${person(false)}
        <g class="rs-suitcase" transform="translate(456 183)"><path d="M15 5v-22h17V5" fill="none" stroke="#4e534c" stroke-width="3"/><rect width="48" height="60" rx="9" fill="#96684e"/><path d="M12 9v39m12-39v39m12-39v39" stroke="#be9473" stroke-width="2"/><circle cx="9" cy="62" r="4" fill="#414841"/><circle cx="39" cy="62" r="4" fill="#414841"/><rect class="rs-luggage-tag" x="32" y="9" width="22" height="29" rx="2" fill="#fbefd3" transform="rotate(-12 32 9)"/></g>
      </g>
      <g class="rs-plant" transform="translate(663 114)"><path d="M-17 93h37l-5 37h-26Z" fill="#ba9b76"/><path d="M1 99V15" stroke="#4b6a4b" stroke-width="3"/><path d="M0 57Q-44 26-32 11 0 11 0 57m1 19Q38 35 34 22 6 20 1 76m0-40Q-17 8-7-7 17-3 1 36" fill="#47745a"/><path d="M1 92Q-38 69-33 52-6 53 1 92m0-35Q27 5 37 11 43 35 1 57" fill="#66896a"/></g>
      <path d="M0 245 720 245 720 320H0Z" fill="url(#${id}-wood)"/>
      <path d="M0 263h720v57H0Z" fill="url(#${id}-slats)"/>
      <path class="rs-countertop" d="M0 232h720v37H0Z" fill="url(#${id}-desk)"/>
      <path d="M0 267h720" stroke="#a18561" stroke-width="3"/>
      <path d="M0 248q100-17 202 6t205-5 176 4 137-9" fill="none" stroke="#a68d6b" opacity=".17"/>
      <g class="rs-bell" transform="translate(586 230)"><ellipse cx="0" cy="17" rx="22" ry="5" fill="#67513a"/><path d="M-18 13a18 18 0 0 1 36 0Z" fill="#c4a76a"/><path d="M-10 7q5-10 13-10" stroke="#f3dfab" stroke-width="3" fill="none"/><path d="M0-5v-6m-5 0H5" stroke="#b79758" stroke-width="3"/></g>
      <g class="rs-workstation rs-staff-view">
        <g transform="translate(35 197)"><path d="M34 61v15m-21 0h64" stroke="#38473f" stroke-width="7"/><rect width="142" height="68" rx="5" fill="#354b48"/><rect x="5" y="5" width="132" height="55" rx="2" fill="url(#${id}-screen)"/><circle cx="12" cy="13" r="2" fill="#c2a76c"/><path d="M20 13h47M12 25h73M12 35h52M12 45h60" stroke="#71958b" stroke-width="3"/><rect class="rs-screen-highlight" x="96" y="24" width="30" height="25" rx="3" fill="#c8b77d"/><path d="m3 83 122 0 14 13H-8Z" fill="#656c5e"/><path d="M14 87h98m-105 5h114" stroke="#b5b7a1" stroke-width="2"/></g>
        <g transform="translate(524 260)"><path d="m0 6 45-4 17 24-48 6Z" fill="#49594e"/><path d="m7 8 30-2 6 9-31 3Z" fill="#7d9c87"/><path d="m20 23 24-2" stroke="#b7c5aa" stroke-width="2"/><circle class="rs-terminal-light" cx="49" cy="19" r="3" fill="#b3ad76"/></g>
        <g transform="translate(607 268)"><path d="m0 0 48-3 10 23-51 4Z" fill="#4c594e"/><path d="m8 7 36-2" stroke="#1d332d" stroke-width="3"/><path class="rs-printer-paper" d="m10 5 3-28 28-2 1 28Z" fill="#fbf2df"/><path d="m10 15 34-2" stroke="#8e9b85" stroke-width="2"/></g>
      </g>
      <g class="rs-guest-view" transform="translate(157 230)"><rect width="50" height="24" rx="3" fill="#46605b"/><path d="M9 7h31M9 13h21" stroke="#cbb77e" stroke-width="2"/></g>
      <g class="rs-props" aria-hidden="true">
        <g class="rs-prop rs-passport"><g transform="translate(328 214)"><path class="rs-hand" d="M-8 103-12 59q-2-12 10-16L18 35l34 4 15 28 8 36Z" fill="var(--rs-hand)"/><rect x="0" y="0" width="57" height="77" rx="5" fill="#813e36"/><rect x="5" y="5" width="47" height="67" rx="2" fill="none" stroke="#c69c68" stroke-width=".8"/><circle cx="29" cy="33" r="12" fill="none" stroke="#d5b278" stroke-width="1.3"/><ellipse cx="29" cy="33" rx="5" ry="12" fill="none" stroke="#d5b278"/><path d="M17 33h24M15 58h27m-22 5h17" stroke="#d5b278"/><path d="M49 42q15-10 16-1l-1 20-12 6Z" fill="var(--rs-hand)"/></g></g>
        <g class="rs-prop rs-key"><g transform="translate(331 235)"><path class="rs-hand" d="M-11 88-8 36q-2-13 10-14l35 2 25 19 2 45Z" fill="var(--rs-hand)"/><rect width="65" height="40" rx="5" fill="#315653"/><path d="m25 12 8-4 8 4-8 4Z" fill="none" stroke="#e4c284"/><path d="M12 28h40" stroke="#d7b675" stroke-width="2"/><path d="M54 22q15-9 13 0l-3 16-12 5Z" fill="var(--rs-hand)"/></g></g>
        <g class="rs-prop rs-scan"><g transform="translate(308 238)"><rect x="-16" y="-5" width="110" height="51" rx="7" fill="#59675b"/><rect x="-8" y="0" width="94" height="34" rx="2" fill="#a9bda8"/><g class="rs-scan-document"><rect width="70" height="31" rx="2" fill="#f9edce"/><rect x="5" y="5" width="17" height="19" rx="1" fill="#b5b8a2"/><path d="M28 7h34M28 13h24M28 19h30M5 28h58" stroke="#a59677" stroke-width="2"/></g><path class="rs-scan-beam" d="M-5 3h88" stroke="#68f6cb" stroke-width="3"/><circle cx="85" cy="40" r="2" fill="#8fdbad"/></g></g>
        <g class="rs-prop rs-sign"><g transform="translate(275 230)"><path d="M10 0h122l-10 65H0Z" fill="#fff8e6" stroke="#c8b58f"/><path d="M25 11h77M23 19h62M22 27h79" stroke="#c5b99e" stroke-width="2"/><path class="rs-signature" d="M21 48q8-26 9-3t12-1 10 2 18-7q-4 13 5 5l15-7" fill="none" stroke="#355e6a" stroke-width="2" stroke-dasharray="130" stroke-dashoffset="130"/><g class="rs-writing-hand"><path d="m125 80-26-38q-4-9-15-7L73 42q-5 6 3 12l24 26Z" fill="var(--rs-hand)"/><path d="m58 48 25-36" stroke="#315053" stroke-width="6" stroke-linecap="round"/><path d="m58 48-3 9 8-5" fill="#c0a577"/></g></g></g>
        <g class="rs-prop rs-payment"><g transform="translate(421 233)"><path d="m0 10 49-5 18 35-54 8Z" fill="#3e534b"/><path d="m10 15 29-3 8 12-31 4Z" fill="#94b6a0"/><circle class="rs-pay-success" cx="52" cy="32" r="4" fill="#73dfad"/><g class="rs-bank-card"><path d="m80 91-33-48-28-6-11 12 32 42Z" fill="var(--rs-hand)"/><rect x="-4" y="-12" width="55" height="34" rx="4" fill="#c69c61" transform="rotate(-12)"/><rect x="5" y="-4" width="10" height="8" rx="1" fill="#e8d5a4" transform="rotate(-12)"/><path d="m27-4q6 3 2 9m3-12q10 6 5 16" fill="none" stroke="#846a42" stroke-width="1.4"/></g></g></g>
        <g class="rs-prop rs-receipt"><g transform="translate(330 222)"><path class="rs-hand" d="m-8 96 7-43q0-11 13-11l29 2 19 25 6 27Z" fill="var(--rs-hand)"/><path d="M5 0h48v74l-6-3-6 3-6-3-6 3-6-3-6 3-6-3-6 3Z" fill="#fff7e4"/><path d="M14 13h30m-30 8h22m-22 8h30m-30 8h30m-30 12h30M18 60h23" stroke="#b4a282" stroke-width="2"/><path d="M46 39q17-8 16 1l-2 23-13 5Z" fill="var(--rs-hand)"/></g></g>
        <g class="rs-prop rs-phone"><g transform="translate(403 137) rotate(-17)"><path d="m-3 84-7-47q-1-13 11-17l19 3 12 61Z" fill="var(--rs-skin)"/><rect width="26" height="55" rx="9" fill="#334942"/><rect x="6" y="7" width="14" height="14" rx="3" fill="#76988a"/><path d="M8 31h10m-10 6h10" stroke="#a6b5a3" stroke-width="2"/></g></g>
        <g class="rs-prop rs-booking"><g transform="translate(311 236)"><rect x="-4" y="-3" width="105" height="44" rx="5" fill="#36524c"/><rect x="2" y="2" width="93" height="33" rx="2" fill="#c1c4aa"/><path d="M10 10h49m-49 8h39m-39 8h49" stroke="#6a8575" stroke-width="2"/><circle cx="78" cy="18" r="10" fill="#567868"/><path class="rs-booking-check" d="m73 18 4 4 8-9" stroke="#e0d6a9" stroke-width="2" fill="none"/></g></g>
      </g>
      <g class="rs-wave" transform="translate(464 117)"><path d="m-17 102-5-48q-1-12 8-17l3-24q1-5 5-1l1 20 4-29q2-5 6-1l-1 28 7-26q3-4 6 0L10 34l9-18q4-3 6 1L16 49q-2 18-13 21l5 32Z" fill="var(--rs-skin)"/></g>
      <rect class="rs-light-wash" width="720" height="320" fill="#f9edcc" pointer-events="none"/>
      </svg>
      <div class="rs-role"><span class="rs-role-dot"></span><span class="rs-role-text">You · Receptionist</span></div>
      <span class="rs-status" role="status" aria-live="polite"></span>
    </div>`;
  }

  class ReceptionScene {
    constructor(container) {
      if (!container) throw new Error('ReceptionScene requires a container');
      this.container = container;
      this.timers = [];
      this.id = 'reception-' + (++serial);
      container.innerHTML = markup(this.id);
      this.el = container.firstElementChild;
      this.set({role:'receptionist',person:0});
    }
    stop() {
      this.timers.forEach(clearTimeout);
      this.timers = [];
      delete this.el.dataset.action;
      delete this.el.dataset.direction;
      delete this.el.dataset.reaction;
      this.el.querySelector('.rs-status').textContent = '';
    }
    set({role = 'receptionist', person:variant = 0, mood = 'neutral'} = {}) {
      this.stop();
      this.role = role === 'guest' ? 'guest' : 'receptionist';
      this.el.dataset.role = this.role;
      this.el.dataset.mood = ['neutral','happy','concerned'].includes(mood) ? mood : 'neutral';
      const p = people[((Number(variant) || 0) % people.length + people.length) % people.length];
      for (const key of ['skin','shade','hair','shirt']) this.el.style.setProperty('--rs-' + key,p[key]);
      this.el.style.setProperty('--rs-hand',this.role === 'guest' ? '#e4b38c' : '#c58b68');
      this.el.querySelector('.rs-role-text').textContent = 'You · ' + (this.role === 'guest' ? 'Guest' : 'Receptionist');
      this.el.querySelector('title').textContent = this.role === 'guest'
        ? 'Your view as the guest: the receptionist behind the counter.'
        : 'Your view as the receptionist: the guest in the lobby, with your computer on the desk.';
      this.el.classList.remove('rs-enter');
      // Restart only the short scene entrance; no timers from a previous exercise survive.
      void this.el.offsetWidth;
      this.el.classList.add('rs-enter');
    }
    react(correct) {
      this.el.dataset.mood = correct ? 'happy' : 'concerned';
      this.el.dataset.reaction = correct ? 'correct' : 'retry';
    }
    play(action, {direction} = {}) {
      if (!Object.hasOwn(actions,action)) return false;
      this.stop();
      this.el.dataset.mood = 'happy';
      this.el.dataset.action = action;
      if (direction === 'give' || direction === 'receive') this.el.dataset.direction = direction;
      this.el.querySelector('.rs-status').textContent = actions[action];
      this.el.dispatchEvent(new CustomEvent('reception:action',{bubbles:true,detail:{action,role:this.role}}));
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.timers.push(setTimeout(() => {
        delete this.el.dataset.action;
        this.el.querySelector('.rs-status').textContent = '';
        this.el.dispatchEvent(new CustomEvent('reception:complete',{bubbles:true,detail:{action}}));
      },reduced ? 1200 : 2900));
      return true;
    }
    destroy() { this.stop(); this.container.replaceChildren(); }
  }
  window.ReceptionScene = ReceptionScene;
})();
