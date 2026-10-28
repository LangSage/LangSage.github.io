/* Each reply becomes the next speaker's context. The student's role changes with it. */
(() => {
  'use strict';
  const option = (text, explanation) => ({ text, explanation });
  const turn = (role, prompt, options, correct, action, direction) => ({ role, speaker: role === 'guest' ? 'Receptionist' : 'Guest', prompt, options, correct, action, direction });
  const scenarios = [
    { name: 'Arrival', label: 'Заезд · найдите свою бронь', time: 'DAY 01 · 18:30', person: 0, turns: [
      turn('guest', 'Good evening. Welcome to the Atrium Hotel. How can I help?', [
        option("I'd like to check out, please.", 'Check out — выехать из отеля. Вы только приехали: для заселения нужно check in.'),
        option("I'd like to check in. I have a reservation.", 'Верно: check in — заселиться, I have a reservation — у меня есть бронь. Вы сразу объяснили цель визита.'),
        option("I'd like to extend my stay.", 'Extend my stay — продлить проживание. Сначала нужно заселиться по существующей брони.')
      ], 1, 'welcome'),
      turn('receptionist', "I'd like to check in. I have a reservation.", [
        option('Of course. What name is the reservation under?', 'Верно: так администратор вежливо спрашивает, на какое имя оформлена бронь. Under здесь означает «на имя».'),
        option('Of course. What time would you like to check out?', 'Вы спрашиваете о времени выезда. Сейчас гость заселяется, и сначала нужно найти его бронь.'),
        option('Of course. Would you like to make a reservation?', 'Make a reservation — забронировать. Гость уже сказал, что бронь у него есть.')
      ], 0, 'booking'),
      turn('guest', 'Of course. What name is the reservation under?', [
        option("It's a double room for three nights.", 'Это описание номера и срока проживания. Для поиска брони сейчас требуется имя.'),
        option('Could you tell me your name, please?', 'Так вы спрашиваете имя собеседника. Администратор же попросил назвать имя в вашей брони.'),
        option("It's under Alex Morgan. I booked three nights.", 'Верно: It’s under Alex Morgan — бронь на имя Алекса Моргана. Затем вы уточняете, что забронировали три ночи.')
      ], 2, 'booking'),
      turn('receptionist', "It's under Alex Morgan. I booked three nights.", [
        option("I've found it: three nights, a double room. Is that right?", 'Верно: вы нашли бронь и проверяете даты и тип номера. Is that right? — всё верно?'),
        option("I've booked you another three nights. Is that right?", 'Another three nights — ещё три ночи. Гость не просил продлевать или создавать новую бронь.'),
        option("I'm sorry, we only accept cash.", 'Accept cash — принимать наличные. Сейчас обсуждается поиск брони, а не способ оплаты.')
      ], 0, 'booking'),
      turn('guest', "I've found it: three nights, a double room. Is that right?", [
        option('Yes, please cancel the reservation.', 'Cancel — отменить. Это противоречит вашему намерению заселиться.'),
        option("Yes, that's right. Is breakfast included?", 'Верно: вы подтверждаете данные и уточняете, включён ли завтрак. Included — включён в стоимость.'),
        option('Yes, I would like three more rooms.', 'Three more rooms — ещё три номера. Вы подтверждаете одну бронь, а не заказываете дополнительные номера.')
      ], 1, 'booking'),
      turn('receptionist', "Yes, that's right. Is breakfast included?", [
        option('Yes. Your room is on the second floor.', 'Second floor — второй этаж. Номер этажа не отвечает на вопрос о завтраке.'),
        option('Yes. You can check out by eleven.', 'Check out by eleven — выехать до одиннадцати. Вопрос гостя касается включённого завтрака.'),
        option('Yes. Breakfast is served from seven to ten.', 'Верно: Yes подтверждает, что завтрак включён, а from seven to ten уточняет время: с семи до десяти.')
      ], 2, 'welcome')
    ] },
    { name: 'Documents', label: 'Документы · паспорт и ключ', time: 'DAY 01 · 18:35', person: 0, turns: [
      turn('guest', 'May I see your passport, please?', [
        option('Certainly. Here you are.', 'Верно: Certainly — конечно. Here you are — вот, пожалуйста. Вы вежливо передаёте паспорт.'),
        option('Certainly. Could I see your passport?', 'Вы просите показать паспорт собеседника. Сейчас администратор просит ваш документ.'),
        option('Certainly. Here is my key card.', 'Key card — карта-ключ. Администратор попросил паспорт, а не ключ от номера.')
      ], 0, 'passport', 'give'),
      turn('receptionist', 'Certainly. Here you are.', [
        option('Thank you. Would you like a receipt?', 'Receipt — чек. Гость передал паспорт; прежде нужно уточнить разрешение на сканирование.'),
        option('Thank you. Please leave your luggage here.', 'Leave your luggage — оставить багаж. Это не продолжает оформление документа.'),
        option('Thank you. May I scan it for our records?', 'Верно: May I scan it? — могу я его отсканировать? For our records — для учётных данных отеля.')
      ], 2, 'booking'),
      turn('guest', 'Thank you. May I scan it for our records?', [
        option('Yes, I can scan your passport.', 'I can scan — я могу отсканировать. Вы предлагаете сделать это сами, хотя разрешение спрашивает администратор.'),
        option('Yes, of course.', 'Верно: Yes, of course — да, конечно. Вы явно разрешаете отсканировать свой паспорт.'),
        option('No, thank you. Please scan it.', 'No отказывает в разрешении, а Please scan it тут же просит сканировать. Ответ противоречит сам себе.')
      ], 1, 'scan'),
      turn('receptionist', 'Yes, of course.', [
        option("Thank you. Here's your passport back. Please sign here.", 'Верно: вы возвращаете паспорт после сканирования и просите поставить подпись. Sign here — подпишите здесь.'),
        option("Thank you. I'll keep your passport until tomorrow.", 'Keep until tomorrow — оставить до завтра. В этой сцене сканирование завершено: документ нужно вернуть гостю.'),
        option('Thank you. Please scan my passport now.', 'My passport — мой паспорт. Вы оформляете документ гостя, а не предлагаете ему сканировать свой.')
      ], 0, 'passport', 'give'),
      turn('guest', "Thank you. Here's your passport back. Please sign here.", [
        option("I've paid the bill. Here you are.", 'Paid the bill — оплатил счёт. Сейчас вас попросили подписать форму, а не оплатить проживание.'),
        option("I've lost my passport. Can you help?", 'Lost my passport — потерял паспорт. Вам только что вернули документ; нужно ответить на просьбу о подписи.'),
        option("I've signed the form. Here you are.", 'Верно: I’ve signed the form — я подписал форму. Here you are сопровождает передачу подписанного документа.')
      ], 2, 'sign'),
      turn('receptionist', "I've signed the form. Here you are.", [
        option("Thank you. Here's your bill for room 402.", 'Bill — счёт, а 402 — другой номер. Сейчас завершается регистрация и выдаётся ключ от номера 204.'),
        option("Thank you. Here's your key card. You're in room 204.", 'Верно: оформление закончено. Вы передаёте карту-ключ и ясно называете номер комнаты: 204.'),
        option('Thank you. Could you sign the form, please?', 'Гость уже сообщил, что подписал форму. Повторная просьба не продвигает разговор к выдаче ключа.')
      ], 1, 'key')
    ] },
    { name: 'Payment', label: 'Оплата · счёт и депозит', time: 'DAY 01 · 18:40', person: 0, turns: [
      turn('guest', 'Would you like to pay for your three-night stay now?', [
        option('Yes, I would like three more nights.', 'Three more nights — ещё три ночи. Вопрос касается оплаты уже забронированного проживания.'),
        option('Yes, please. How much is it in total?', 'Верно: вы соглашаетесь оплатить и спрашиваете полную сумму. In total — всего, в общей сложности.'),
        option('Yes, please. What time is breakfast?', 'Это вопрос о времени завтрака. Перед оплатой нужно уточнить сумму счёта.')
      ], 1, 'booking'),
      turn('receptionist', 'Yes, please. How much is it in total?', [
        option("It's €360, including breakfast. How would you like to pay?", 'Верно: вы называете общую сумму за проживание с завтраком и спрашиваете удобный способ оплаты.'),
        option("It's €120 per night. See you tomorrow!", 'Per night — за ночь. Гость спросил общую сумму за три ночи; нужно назвать €360 и продолжить оплату.'),
        option("It's room 204. How would you like to pay?", 'Room 204 — номер комнаты. Номер комнаты не отвечает на вопрос How much? — сколько стоит?')
      ], 0, 'booking'),
      turn('guest', "It's €360, including breakfast. How would you like to pay?", [
        option('For three nights, please.', 'For three nights — на три ночи. Срок проживания уже известен; вас спрашивают о способе оплаты.'),
        option('By ten in the morning, please.', 'By ten — к десяти. Это время, а не способ оплаты. By card означает «картой».'),
        option('By card, please. Is there a deposit as well?', 'Верно: By card — картой. Затем вы уточняете, есть ли ещё и залог: a deposit as well.')
      ], 2, 'booking'),
      turn('receptionist', 'By card, please. Is there a deposit as well?', [
        option("Yes, there's a €50 refundable deposit.", 'Верно: вы прямо отвечаете на вопрос о залоге. Refundable — возвратный; в этой брони залог составляет €50.'),
        option('Yes, breakfast is served until ten.', 'Время завтрака не объясняет условия залога. Гость спрашивает про deposit.'),
        option('No, but you must pay a €50 deposit.', 'No отрицает наличие залога, а вторая часть требует его оплатить. Нужно дать непротиворечивый ответ.')
      ], 0, 'booking'),
      turn('guest', "Yes, there's a €50 refundable deposit.", [
        option("That's fine. I'll give you my room key.", 'Room key — ключ от номера. Для завершения оплаты нужна банковская карта, а не ключ.'),
        option("That's fine. I'll tap my card here.", 'Верно: вы принимаете условия и прикладываете карту к терминалу. Tap my card — приложить карту.'),
        option("That's fine. Please cancel my stay.", 'Cancel my stay — отменить проживание. Это не продолжает согласованную оплату брони.')
      ], 1, 'payment'),
      turn('receptionist', "That's fine. I'll tap my card here.", [
        option("Payment approved. Here's your passport.", 'Passport — паспорт. После оплаты гость ожидает чек; документ уже вернули при заселении.'),
        option('Payment approved. Please pay again.', 'Pay again — оплатить ещё раз. Если платёж одобрен, повторно платить не нужно.'),
        option("Payment approved. Here's your receipt.", 'Верно: Payment approved — платёж одобрен. Вы подтверждаете успешную оплату и передаёте чек.')
      ], 2, 'receipt')
    ] },
    { name: 'Help', label: 'Помощь · ключ и кондиционер', time: 'DAY 02 · 15:10', person: 0, turns: [
      turn('guest', 'Good afternoon. Is everything all right with your room?', [
        option("My key card isn't working. Could you help?", 'Верно: isn’t working — не работает. Вы называете конкретную проблему и вежливо просите помощи.'),
        option("Everything is fine. I don't need any help.", 'Так вы говорите, что всё в порядке. По ситуации карта-ключ не работает, и нужно сообщить об этом.'),
        option('Could I book a room for next month?', 'Это новая бронь на следующий месяц. Сейчас вам нужна помощь с ключом от уже занятого номера.')
      ], 0, 'booking'),
      turn('receptionist', "My key card isn't working. Could you help?", [
        option("I'm sorry. What time is your flight?", 'Время рейса не поможет определить, для какой комнаты нужно заменить ключ.'),
        option("I'm sorry. Would you like to check out?", 'Check out — выехать. Гость просит исправить ключ, а не закончить проживание.'),
        option("I'm sorry. May I have your room number, please?", 'Верно: вы признаёте неудобство и уточняете номер комнаты, чтобы помочь с картой-ключом.')
      ], 2, 'booking'),
      turn('guest', "I'm sorry. May I have your room number, please?", [
        option("It's Alex Morgan. Can I check in?", 'Вы называете имя и просите заселить вас снова. Администратор спросил номер комнаты.'),
        option("It's 204. I also need help with the air conditioning.", 'Верно: вы называете комнату 204 и добавляете вторую проблему — нужна помощь с кондиционером.'),
        option("It's €360, including breakfast.", '€360 — сумма оплаты. Room number означает номер комнаты, а не стоимость проживания.')
      ], 1, 'booking'),
      turn('receptionist', "It's 204. I also need help with the air conditioning.", [
        option("I'll replace your key and call maintenance about the air conditioning.", 'Верно: вы решаете обе проблемы — заменяете ключ и вызываете техническую службу. Maintenance — техническая служба.'),
        option("I'll send housekeeping to bring extra towels.", 'Housekeeping и extra towels — уборка и дополнительные полотенца. Это не решит проблему ключа и кондиционера.'),
        option("I'll book you a taxi to the airport.", 'Так вы обещаете такси в аэропорт. Гость просил помочь с оборудованием номера.')
      ], 0, 'call'),
      turn('guest', "I'll replace your key and call maintenance about the air conditioning.", [
        option('Thank you. Could I have a receipt for breakfast?', 'Это просьба о чеке за завтрак. Сейчас вы договариваетесь о визите техника.'),
        option('Thank you. Could someone come up in the next ten minutes?', 'Верно: come up — подняться в номер. Вы вежливо уточняете, сможет ли сотрудник прийти в ближайшие десять минут.'),
        option('Thank you. Could you change my flight?', 'Change my flight — изменить рейс. Это не связано с ремонтом кондиционера и заменой ключа.')
      ], 1, 'call'),
      turn('receptionist', 'Thank you. Could someone come up in the next ten minutes?', [
        option('Yes. Breakfast starts at seven tomorrow.', 'Время завтрака не отвечает на просьбу о визите техника в ближайшие десять минут.'),
        option("Yes. You'll need to check out in ten minutes.", 'Check out — выехать. Гость спрашивает, когда придёт техник, а не когда нужно освободить номер.'),
        option("Yes. A technician will be there within ten minutes. Here's your new key.", 'Верно: within ten minutes — в течение десяти минут. Вы подтверждаете время визита и передаёте новый ключ.')
      ], 2, 'key')
    ] },
    { name: 'Departure', label: 'Выезд · багаж до двух', time: 'DAY 04 · 09:00', person: 0, turns: [
      turn('guest', 'Good morning. How can I help you?', [
        option("I'd like to check in to room 204, please.", 'Check in — заселиться. После трёх ночей вы собираетесь выехать, поэтому нужно check out.'),
        option("I'd like to check out of room 204, please.", 'Верно: check out of room 204 — выехать из номера 204. Вы сразу называете комнату для проверки счёта.'),
        option("I'd like to extend my stay by three nights.", 'Extend my stay — продлить проживание. По ситуации вы заканчиваете поездку и хотите выехать.')
      ], 1, 'booking'),
      turn('receptionist', "I'd like to check out of room 204, please.", [
        option('Of course. Did you use the minibar?', 'Верно: при выезде вы уточняете, были ли дополнительные расходы. Did you use the minibar? — пользовались ли вы мини-баром?'),
        option('Of course. Would you like to check in?', 'Гость просит оформить выезд. Check in предлагает противоположное действие — заселение.'),
        option('Of course. What name would you like to book under?', 'Book under — забронировать на имя. Сейчас нужно закрыть существующее проживание, а не создать новую бронь.')
      ], 0, 'booking'),
      turn('guest', 'Of course. Did you use the minibar?', [
        option("Yes, I did. I didn't use anything.", 'Yes, I did подтверждает использование, а I didn’t use anything отрицает его. Ответ должен быть последовательным.'),
        option("No, I don't want to book a room.", 'Book a room — забронировать номер. Вопрос был о расходах на мини-бар.'),
        option("No, I didn't use the minibar. Is there anything left to pay?", 'Верно: вы отрицаете использование мини-бара и спрашиваете, осталось ли что-то оплатить. Left to pay — осталось к оплате.')
      ], 2, 'payment'),
      turn('receptionist', "No, I didn't use the minibar. Is there anything left to pay?", [
        option('Your bill is settled, and your €50 deposit has been released.', 'Верно: bill is settled — счёт оплачен. Deposit has been released — блокировка залога снята; это не обещание мгновенного зачисления банком.'),
        option('Please pay €360 again for your stay.', 'Проживание уже оплачено при заезде, а дополнительных расходов не было. Повторно требовать €360 не нужно.'),
        option('Your room will be ready at three.', 'Room will be ready — номер будет готов. Это относится к заселению, а не к окончательному расчёту при выезде.')
      ], 0, 'receipt'),
      turn('guest', 'Your bill is settled, and your €50 deposit has been released.', [
        option('Thank you. Could you wake me up at two?', 'Wake me up — разбудить. Вы уже выезжаете и хотите оставить багаж, а не заказать звонок-будильник.'),
        option('Thank you. Could you store my luggage until two?', 'Верно: store my luggage — оставить мой багаж на хранение. Until two — до двух часов.'),
        option('Thank you. Could I stay in my room until tomorrow?', 'Так вы просите остаться ещё на ночь. В этой ситуации вы уже выехали и хотите оставить только багаж.')
      ], 1, 'luggage'),
      turn('receptionist', 'Thank you. Could you store my luggage until two?', [
        option("Certainly. Here's a key for another three nights.", 'Ключ ещё на три ночи не нужен: гость уже выехал и просит хранение багажа до двух.'),
        option('Certainly. Please take all your luggage with you now.', 'Вы сначала соглашаетесь хранить багаж, а затем просите забрать его немедленно. Это противоречит запросу гостя.'),
        option("Certainly. Here's your luggage tag. Have a safe journey!", 'Верно: luggage tag — бирка для получения багажа. Вы принимаете вещи на хранение и желаете счастливого пути.')
      ], 2, 'farewell')
    ] }
  ];

  const $ = id => document.getElementById(id);
  const roleName = role => role === 'guest' ? 'Guest' : 'Receptionist';
  const freshState = () => ({ position: 0, solved: new Set(), wrong: new Map(), done: false });
  let states = scenarios.map(freshState);
  let active = 0;
  let scene = null;
  let sound = false;
  let voices = [];
  let reviewQueue = null;
  let reviewPosition = 0;
  let reviewSolved = false;
  let reviewWrong = new Set();
  let sceneAvailable = false;
  let currentAudio = null;
  let audioVersion = 0;
  const synth = window.speechSynthesis;
  const supportedAudio = !!(synth && window.SpeechSynthesisUtterance);
  const tabs = [...document.querySelectorAll('[data-scenario]')];

  function current() {
    const scenarioIndex = reviewQueue ? reviewQueue[reviewPosition].scenario : active;
    const index = reviewQueue ? reviewQueue[reviewPosition].index : states[active].position;
    return { scenario: scenarios[scenarioIndex], scenarioIndex, index, step: scenarios[scenarioIndex].turns[index], state: states[scenarioIndex] };
  }
  function solvedNow() { const c = current(); return reviewQueue ? reviewSolved : c.state.solved.has(c.index); }
  function stopAudio() {
    audioVersion += 1;
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.removeAttribute('src');
      currentAudio.load();
      currentAudio = null;
    }
    if (supportedAudio) synth.cancel();
  }
  function refreshVoices() { voices = supportedAudio ? synth.getVoices().filter(voice => /^en(?:-|_)/i.test(voice.lang)) : []; }
  function speak(text, slow = false, speaker = current().step.speaker) {
    stopAudio();
    const version = audioVersion;
    let fallbackStarted = false;
    const announce = () => {
      if (version === audioVersion) $('audio-status').textContent = slow ? 'Медленная озвучка.' : 'Озвучка реплики.';
    };
    const fallback = () => {
      if (version !== audioVersion || fallbackStarted) return;
      fallbackStarted = true;
      if (currentAudio) { currentAudio.pause(); currentAudio = null; }
      if (!supportedAudio) { $('audio-status').textContent = 'Озвучка недоступна. Продолжайте по тексту.'; return; }
      refreshVoices();
      const utterance = new SpeechSynthesisUtterance(text);
      const preferred = voices.filter(voice => /en-(GB|US|AU)/i.test(voice.lang));
      const pool = preferred.length ? preferred : voices;
      const voice = pool.length ? pool[(speaker === 'Guest' ? 1 : 0) % pool.length] : null;
      if (voice) utterance.voice = voice;
      utterance.lang = voice ? voice.lang : speaker === 'Guest' ? 'en-US' : 'en-GB';
      utterance.rate = slow ? 0.75 : 0.95;
      utterance.onstart = announce;
      utterance.onerror = event => {
        if (version === audioVersion && !['canceled', 'interrupted'].includes(event.error)) $('audio-status').textContent = 'Озвучка недоступна. Продолжайте по тексту.';
      };
      try { synth.speak(utterance); } catch (_) { $('audio-status').textContent = 'Озвучка недоступна. Продолжайте по тексту.'; }
    };
    const c = current();
    const kind = text === c.step.prompt ? 'prompt' : text === c.step.options[c.step.correct].text ? 'reply' : null;
    if (!kind) { fallback(); return; }
    const recording = new Audio(`audio/${c.scenarioIndex + 1}-${c.index + 1}-${kind}.mp3`);
    currentAudio = recording;
    recording.playbackRate = slow ? 0.78 : 1;
    recording.onplaying = announce;
    recording.onerror = fallback;
    recording.onended = () => { if (version === audioVersion && currentAudio === recording) currentAudio = null; };
    try {
      const promise = recording.play();
      if (promise) promise.catch(fallback);
    } catch (_) { fallback(); }
  }
  function sceneSet(step, mood = 'neutral') {
    if (scene) scene.set({ role: step.role, person: current().scenario.person, mood });
  }
  function updateProgress() {
    const total = states.reduce((sum, state) => sum + state.solved.size, 0);
    $('total-progress').value = total;
    $('total-label').textContent = `${total} / 30 реплик`;
    tabs.forEach((tab, index) => {
      const selected = index === current().scenarioIndex;
      if (selected) tab.setAttribute('aria-current', 'step'); else tab.removeAttribute('aria-current');
      tab.querySelector('.tab-check').textContent = states[index].solved.size === 6 ? '✓' : '';
      tab.setAttribute('aria-label', `${scenarios[index].name}: ${scenarios[index].label}, ${states[index].solved.size} из 6 реплик пройдено`);
    });
  }
  function setFeedback(kind, text) {
    $('feedback').className = `feedback${kind ? ` ${kind}` : ''}`;
    $('feedback').querySelector('.feedback-icon').textContent = kind === 'success' ? '✓' : kind === 'error' ? '↻' : '';
    $('feedback-text').textContent = text;
  }
  function syncButtons() {
    const c = current();
    const solved = solvedNow();
    const wrong = reviewQueue ? reviewWrong : c.state.wrong.get(c.index) || new Set();
    $('exercise').classList.toggle('is-solved', solved);
    $('exercise').classList.toggle('has-error', !solved && wrong.size > 0);
    [...$('answers').children].forEach((button, index) => {
      const isCorrect = solved && index === c.step.correct;
      const isWrong = wrong.has(index);
      button.classList.toggle('correct', isCorrect);
      button.classList.toggle('wrong', isWrong);
      button.disabled = solved || isWrong;
      button.setAttribute('aria-label', `${index + 1}. ${c.step.options[index].text}${isCorrect ? ' — верный ответ' : isWrong ? ' — неверный ответ' : ''}`);
      button.querySelector('.answer-number').textContent = isCorrect ? '✓' : isWrong ? '×' : index + 1;
    });
    $('next').disabled = !solved;
  }
  function render(focus = false) {
    stopAudio();
    if (scene) scene.stop();
    const c = current();
    $('exercise').hidden = false;
    $('results').hidden = true;
    $('scene-time').textContent = c.scenario.time;
    $('role-label').textContent = roleName(c.step.role);
    $('view-label').textContent = c.step.role === 'guest' ? 'Вы смотрите глазами гостя' : 'Вы смотрите глазами администратора';
    $('scenario-label').textContent = reviewQueue ? `Повторение · ${c.scenario.name}` : c.scenario.label;
    $('step-label').textContent = reviewQueue ? `${reviewPosition + 1} / ${reviewQueue.length}` : `${c.index + 1} / 6`;
    $('step-dots').replaceChildren(...c.scenario.turns.map((_, index) => {
      const dot = document.createElement('span');
      dot.className = `${c.state.solved.has(index) ? 'done' : ''} ${index === c.index ? 'current' : ''}`;
      return dot;
    }));
    $('speaker-label').textContent = `${c.step.speaker} says`;
    $('prompt').textContent = c.step.prompt;
    if (window.LangSageGlossary) window.LangSageGlossary.decorate($('prompt'));
    $('answer-instruction').textContent = `Ваш ответ · ${roleName(c.step.role)}`;
    $('answers').replaceChildren(...c.step.options.map((item, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'answer';
      const number = document.createElement('span');
      number.className = 'answer-number';
      number.setAttribute('aria-hidden', 'true');
      number.textContent = index + 1;
      const label = document.createElement('span');
      label.lang = 'en';
      label.textContent = item.text;
      button.append(number, label);
      button.addEventListener('click', () => answer(index));
      return button;
    }));
    if (solvedNow()) setFeedback('success', c.step.options[c.step.correct].explanation);
    else setFeedback('', '');
    const last = reviewQueue ? reviewPosition === reviewQueue.length - 1 : c.index === 5;
    $('next').textContent = last ? (reviewQueue || states.every((state, index) => index === active || state.solved.size === 6) ? 'Итоги →' : 'Следующая сцена →') : 'Далее →';
    const followingRole = last ? null : reviewQueue
      ? scenarios[reviewQueue[reviewPosition + 1].scenario].turns[reviewQueue[reviewPosition + 1].index].role
      : c.scenario.turns[c.index + 1].role;
    $('role-hint').textContent = last ? (reviewQueue ? 'Завершите повторение' : 'Ситуация почти пройдена') : `Далее вы — ${roleName(followingRole)}`;
    syncButtons();
    updateProgress();
    sceneSet(c.step, solvedNow() ? 'happy' : 'neutral');
    if (focus) $('prompt').focus({ preventScroll: true });
    if (sound) speak(c.step.prompt);
  }
  function answer(index) {
    if ($('exercise').hidden || solvedNow()) return;
    const c = current();
    const item = c.step.options[index];
    if (!item) return;
    const wrong = reviewQueue ? reviewWrong : c.state.wrong.get(c.index) || new Set();
    if (wrong.has(index)) return;
    stopAudio();
    const correct = index === c.step.correct;
    if (correct) {
      if (reviewQueue) reviewSolved = true; else c.state.solved.add(c.index);
      setFeedback('success', item.explanation);
      sceneSet(c.step, 'happy');
      if (sceneAvailable && c.step.action) scene.play(c.step.action, c.step.direction ? { direction: c.step.direction } : undefined);
      if (sound) speak(item.text, false, roleName(c.step.role));
    } else {
      wrong.add(index);
      if (!reviewQueue) c.state.wrong.set(c.index, wrong);
      setFeedback('error', `${item.explanation} Попробуйте другой ответ.`);
      if (scene && typeof scene.react === 'function') scene.react(false);
    }
    syncButtons();
    updateProgress();
    if (correct) $('next').focus({ preventScroll: true });
    else {
      const available = [...$('answers').children].find(button => !button.disabled);
      if (available) available.focus({ preventScroll: true });
    }
  }
  function next() {
    if (!solvedNow()) return;
    if (reviewQueue) {
      if (reviewPosition + 1 === reviewQueue.length) { reviewQueue = null; showResults(true); return; }
      reviewPosition += 1;
      reviewSolved = false;
      reviewWrong = new Set();
    } else {
      const state = states[active];
      if (state.position < 5) state.position += 1;
      else {
        state.done = true;
        const remaining = states.map((_, index) => (active + 1 + index) % states.length).find(index => !states[index].done);
        if (remaining === undefined) { showResults(); return; }
        active = remaining;
      }
    }
    render(true);
  }
  function mistakes() {
    return states.flatMap((state, scenario) => [...state.wrong.entries()].sort((a, b) => a[0] - b[0]).map(([index, choices]) => ({ scenario, index, choices })));
  }
  function showResults(reviewed = false) {
    stopAudio();
    if (scene) scene.stop();
    $('exercise').hidden = true;
    $('results').hidden = false;
    const missed = mistakes();
    const count = missed.reduce((sum, item) => sum + item.choices.size, 0);
    $('result-title').textContent = reviewed ? 'Трудные реплики отработаны!' : 'Отличная смена!';
    $('result-description').textContent = reviewed ? 'Вы ещё раз прошли все реплики, в которых ошибались. Можно повторить их или начать новый заезд.' : 'От заезда до прощания: 30 реплик, 5 ситуаций и опыт по обе стороны стойки.';
    $('stat-first').textContent = 30 - missed.length;
    $('stat-mistakes').textContent = count;
    $('review').hidden = !missed.length;
    $('mistake-details').hidden = !missed.length;
    $('mistake-details').open = false;
    $('mistake-count').textContent = `(${missed.length})`;
    $('mistake-list').replaceChildren(...missed.map(item => {
      const step = scenarios[item.scenario].turns[item.index];
      const li = document.createElement('li');
      const title = document.createElement('strong');
      title.textContent = `${scenarios[item.scenario].name} · ${roleName(step.role)}`;
      const prompt = document.createElement('p');
      prompt.lang = 'en';
      prompt.textContent = `${step.speaker}: ${step.prompt}`;
      li.append(title, prompt);
      item.choices.forEach(index => {
        const wrong = document.createElement('p');
        wrong.className = 'review-wrong';
        wrong.textContent = `× ${step.options[index].text} — ${step.options[index].explanation}`;
        li.append(wrong);
      });
      const correct = document.createElement('p');
      correct.className = 'review-correct';
      correct.textContent = `✓ ${step.options[step.correct].text}`;
      const why = document.createElement('p');
      why.textContent = step.options[step.correct].explanation;
      li.append(correct, why);
      return li;
    }));
    $('result-title').focus({ preventScroll: true });
  }

  tabs.forEach((tab, index) => tab.addEventListener('click', () => {
    active = index;
    reviewQueue = null;
    render(true);
  }));
  $('next').addEventListener('click', next);
  $('listen').addEventListener('click', () => speak(current().step.prompt));
  $('listen-slow').addEventListener('click', () => speak(current().step.prompt, true));
  $('sound-toggle').addEventListener('click', () => {
    sound = !sound;
    $('sound-toggle').setAttribute('aria-pressed', String(sound));
    $('sound-toggle').setAttribute('aria-label', sound ? 'Выключить автоматическую озвучку' : 'Включить автоматическую озвучку');
    $('sound-toggle').textContent = sound ? 'Звук: вкл.' : 'Звук: выкл.';
    if (sound && !$('exercise').hidden) speak(current().step.prompt); else stopAudio();
  });
  $('restart').addEventListener('click', () => {
    states = scenarios.map(freshState);
    active = 0;
    reviewQueue = null;
    render(true);
  });
  $('review').addEventListener('click', () => {
    reviewQueue = mistakes();
    if (!reviewQueue.length) { reviewQueue = null; return; }
    reviewPosition = 0;
    reviewSolved = false;
    reviewWrong = new Set();
    render(true);
  });
  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.repeat || $('exercise').hidden) return;
    if (event.target.closest('input,textarea,select,[contenteditable="true"]')) return;
    if (/^[123]$/.test(event.key)) { event.preventDefault(); answer(Number(event.key) - 1); }
    if (event.key === 'Escape') stopAudio();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { stopAudio(); if (scene) scene.stop(); }
  });
  window.addEventListener('pagehide', () => { stopAudio(); if (scene) scene.stop(); });
  if (supportedAudio) {
    refreshVoices();
    synth.addEventListener('voiceschanged', refreshVoices);
  }
  if (typeof window.ReceptionScene === 'function') {
    try {
      $('scene').replaceChildren();
      scene = new window.ReceptionScene($('scene'));
      sceneAvailable = true;
    } catch (error) { console.warn('Reception scene could not start.', error); }
  }
  render();
})();
