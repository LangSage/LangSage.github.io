window.TRAINER_TASKS = [
  {
    "id": "flow-01",
    "mode": "flow",
    "level": "A2",
    "scene": "checkin",
    "title": "Check-in opening",
    "ru": "Гость подошел к стойке. Выбери первую профессиональную реплику.",
    "spoken": "Good evening. I have a reservation under Petrova.",
    "formula": "Greet + confirm the booking name.",
    "coach": [
      "Сначала понять этап: check-in, check-out или просьба.",
      "Хорошая фраза звучит вежливо и дает следующий шаг.",
      "Could / May I / Let me check почти всегда безопаснее, чем приказ."
    ],
    "hidden": false,
    "audio": "audio/flow-01.mp3",
    "options": [
      [
        "Good evening. Welcome to our hotel. May I have your name, please?",
        "вежливое начало",
        true,
        "Правильно: ты приветствуешь гостя и просишь имя для поиска брони. Example: “May I have your name, please?”"
      ],
      [
        "Give me your passport now.",
        "слишком резко",
        false,
        "Ошибка: “give me” и “now” звучат как приказ. Лучше: “Could I have your passport, please?”"
      ],
      [
        "What is your room number?",
        "слишком рано",
        false,
        "Ошибка: гость еще не заселен, номера комнаты пока нет."
      ],
      [
        "Breakfast is at seven.",
        "не отвечает ситуации",
        false,
        "Ошибка: гость говорит о reservation, а не о завтраке."
      ]
    ]
  },
  {
    "id": "flow-02",
    "mode": "flow",
    "level": "A2",
    "scene": "checkin",
    "title": "Passport request",
    "ru": "Бронь найдена. Нужно попросить документ.",
    "spoken": "Yes, that is me. What do you need from me?",
    "formula": "Could I have + document + please?",
    "coach": [
      "Сначала понять этап: check-in, check-out или просьба.",
      "Хорошая фраза звучит вежливо и дает следующий шаг.",
      "Could / May I / Let me check почти всегда безопаснее, чем приказ."
    ],
    "hidden": false,
    "audio": "audio/flow-02.mp3",
    "options": [
      [
        "Could I have your passport, please?",
        "стандартная просьба",
        true,
        "Правильно: “Could I have...” звучит мягко и профессионально. Example: “Could I have your passport, please?”"
      ],
      [
        "Passport. Quickly.",
        "грубо",
        false,
        "Ошибка: слишком коротко и резко. На ресепшене нужна полная вежливая просьба."
      ],
      [
        "Where are you passport?",
        "грамматическая ошибка",
        false,
        "Ошибка: так не говорят. Можно: “May I see your passport, please?”"
      ],
      [
        "You are passport?",
        "непонятно",
        false,
        "Ошибка: фраза не имеет нужного смысла."
      ]
    ]
  },
  {
    "id": "flow-03",
    "mode": "flow",
    "level": "A2-B1",
    "scene": "checkin",
    "title": "Reservation not found",
    "ru": "Система не находит бронь. Нужна спокойная следующая фраза.",
    "spoken": "I booked a room online yesterday, but I do not have the confirmation number.",
    "formula": "Apologize lightly + ask for alternate detail.",
    "coach": [
      "Сначала понять этап: check-in, check-out или просьба.",
      "Хорошая фраза звучит вежливо и дает следующий шаг.",
      "Could / May I / Let me check почти всегда безопаснее, чем приказ."
    ],
    "hidden": false,
    "audio": "audio/flow-03.mp3",
    "options": [
      [
        "No problem. May I check the booking under your full name?",
        "спокойно ищем дальше",
        true,
        "Правильно: ты не пугаешь гостя и просишь другую деталь. Example: “May I check the booking under your full name?”"
      ],
      [
        "Then you have no booking.",
        "слишком категорично",
        false,
        "Ошибка: без confirmation number бронь все равно можно искать по имени, email или телефону."
      ],
      [
        "You must leave.",
        "грубо",
        false,
        "Ошибка: это не сервисный ответ и не решение."
      ],
      [
        "I like online booking.",
        "не по делу",
        false,
        "Ошибка: фраза не помогает найти бронь."
      ]
    ]
  },
  {
    "id": "flow-04",
    "mode": "flow",
    "level": "A2-B1",
    "scene": "checkin",
    "title": "Payment pre-authorization",
    "ru": "Нужно объяснить депозит/предавторизацию карты.",
    "spoken": "Why do you need my card if I already paid online?",
    "formula": "Explain purpose + reassure.",
    "coach": [
      "Сначала понять этап: check-in, check-out или просьба.",
      "Хорошая фраза звучит вежливо и дает следующий шаг.",
      "Could / May I / Let me check почти всегда безопаснее, чем приказ."
    ],
    "hidden": false,
    "audio": "audio/flow-04.mp3",
    "options": [
      [
        "It is only for the security deposit and possible extras. The room is already paid.",
        "короткое объяснение",
        true,
        "Правильно: ты объясняешь зачем карта и успокаиваешь гостя. Example: “The room is already paid.”"
      ],
      [
        "Because I said so.",
        "агрессивно",
        false,
        "Ошибка: это не объяснение, а давление."
      ],
      [
        "You did not pay anything.",
        "опасное утверждение",
        false,
        "Ошибка: гость сказал, что платил online. Сначала проверь, не спорь."
      ],
      [
        "Cards are beautiful.",
        "не по теме",
        false,
        "Ошибка: не отвечает на вопрос why."
      ]
    ]
  },
  {
    "id": "flow-05",
    "mode": "flow",
    "level": "B1",
    "scene": "checkin",
    "title": "Breakfast confirmation",
    "ru": "Гость спрашивает, включен ли завтрак.",
    "spoken": "Is breakfast included in my booking?",
    "formula": "Confirm + give time/place.",
    "coach": [
      "Сначала понять этап: check-in, check-out или просьба.",
      "Хорошая фраза звучит вежливо и дает следующий шаг.",
      "Could / May I / Let me check почти всегда безопаснее, чем приказ."
    ],
    "hidden": false,
    "audio": "audio/flow-05.mp3",
    "options": [
      [
        "Yes, breakfast is included. It is served from 7 to 10 in the restaurant.",
        "полный ответ",
        true,
        "Правильно: есть yes/no плюс полезные детали. Example: “It is served from 7 to 10.”"
      ],
      [
        "Maybe yes.",
        "неуверенно",
        false,
        "Ошибка: звучит непрофессионально. Если не уверен: “Let me check that for you.”"
      ],
      [
        "Breakfast is food.",
        "неинформативно",
        false,
        "Ошибка: гость спрашивает included or not."
      ],
      [
        "You can ask tomorrow.",
        "откладывает проблему",
        false,
        "Ошибка: лучше проверить сейчас."
      ]
    ]
  },
  {
    "id": "flow-06",
    "mode": "flow",
    "level": "B1",
    "scene": "checkin",
    "title": "Wi-Fi information",
    "ru": "Гость просит Wi-Fi. Нужно дать понятную инструкцию.",
    "spoken": "Could you tell me the Wi-Fi password?",
    "formula": "Give network + password + where written.",
    "coach": [
      "Сначала понять этап: check-in, check-out или просьба.",
      "Хорошая фраза звучит вежливо и дает следующий шаг.",
      "Could / May I / Let me check почти всегда безопаснее, чем приказ."
    ],
    "hidden": false,
    "audio": "audio/flow-06.mp3",
    "options": [
      [
        "Of course. The network is Hotel Guest, and the password is on your key card holder.",
        "понятно и полезно",
        true,
        "Правильно: ты даешь сеть и где найти пароль. Example: “The password is on your key card holder.”"
      ],
      [
        "I do not use Wi-Fi.",
        "не помогает",
        false,
        "Ошибка: личный опыт не отвечает запросу гостя."
      ],
      [
        "Wi-Fi is in the air.",
        "шутка не к месту",
        false,
        "Ошибка: гостю нужна конкретная информация."
      ],
      [
        "Ask the restaurant.",
        "перекладывает работу",
        false,
        "Ошибка: ресепшен должен помочь с базовой информацией."
      ]
    ]
  },
  {
    "id": "flow-07",
    "mode": "flow",
    "level": "A2-B1",
    "scene": "checkin",
    "title": "Room directions",
    "ru": "Гость получил ключ. Нужно объяснить, как пройти к номеру.",
    "spoken": "How do I get to room 512?",
    "formula": "Floor + elevator + direction.",
    "coach": [
      "Сначала понять этап: check-in, check-out или просьба.",
      "Хорошая фраза звучит вежливо и дает следующий шаг.",
      "Could / May I / Let me check почти всегда безопаснее, чем приказ."
    ],
    "hidden": false,
    "audio": "audio/flow-07.mp3",
    "options": [
      [
        "Take the elevator to the fifth floor. Your room is on the left.",
        "четкая инструкция",
        true,
        "Правильно: floor и direction есть. Example: “Take the elevator to the fifth floor.”"
      ],
      [
        "It is somewhere upstairs.",
        "слишком расплывчато",
        false,
        "Ошибка: гость может заблудиться. Нужна конкретика."
      ],
      [
        "I do not know rooms.",
        "плохой сервис",
        false,
        "Ошибка: ресепшен должен знать базовую навигацию."
      ],
      [
        "Room 512 is expensive.",
        "не отвечает",
        false,
        "Ошибка: вопрос был how to get there."
      ]
    ]
  },
  {
    "id": "flow-08",
    "mode": "flow",
    "level": "B1",
    "scene": "checkin",
    "title": "Early check-in",
    "ru": "Гость приехал раньше времени заселения.",
    "spoken": "I know check-in is at three, but is my room ready now?",
    "formula": "Check availability + offer luggage storage.",
    "coach": [
      "Сначала понять этап: check-in, check-out или просьба.",
      "Хорошая фраза звучит вежливо и дает следующий шаг.",
      "Could / May I / Let me check почти всегда безопаснее, чем приказ."
    ],
    "hidden": false,
    "audio": "audio/flow-08.mp3",
    "options": [
      [
        "Let me check. If it is not ready yet, we can store your luggage for you.",
        "реалистично и заботливо",
        true,
        "Правильно: ты проверяешь возможность и предлагаешь запасной вариант. Example: “We can store your luggage.”"
      ],
      [
        "No, come at three.",
        "слишком холодно",
        false,
        "Ошибка: может быть верно по правилам, но лучше сначала проверить и предложить luggage storage."
      ],
      [
        "You are too early.",
        "обвиняет гостя",
        false,
        "Ошибка: факт понятен, но тон плохой."
      ],
      [
        "Sleep in the lobby.",
        "непрофессионально",
        false,
        "Ошибка: это не нормальное решение."
      ]
    ]
  },
  {
    "id": "flow-09",
    "mode": "flow",
    "level": "B1",
    "scene": "checkin",
    "title": "No smoking policy",
    "ru": "Нужно вежливо объяснить правило о курении.",
    "spoken": "Can I smoke in the room if I open the window?",
    "formula": "State policy + alternative location.",
    "coach": [
      "Сначала понять этап: check-in, check-out или просьба.",
      "Хорошая фраза звучит вежливо и дает следующий шаг.",
      "Could / May I / Let me check почти всегда безопаснее, чем приказ."
    ],
    "hidden": false,
    "audio": "audio/flow-09.mp3",
    "options": [
      [
        "I’m afraid all rooms are non-smoking, but there is a smoking area outside.",
        "правило плюс альтернатива",
        true,
        "Правильно: “I’m afraid” смягчает отказ, а smoking area дает решение."
      ],
      [
        "Smoke wherever you want.",
        "нарушает правило",
        false,
        "Ошибка: нельзя разрешать то, что запрещено политикой отеля."
      ],
      [
        "Absolutely not, never ask again.",
        "слишком резко",
        false,
        "Ошибка: отказ должен быть вежливым."
      ],
      [
        "Windows are expensive.",
        "не по теме",
        false,
        "Ошибка: вопрос о smoking policy."
      ]
    ]
  },
  {
    "id": "flow-10",
    "mode": "flow",
    "level": "B1",
    "scene": "checkout",
    "title": "Check-out opening",
    "ru": "Гость хочет выехать. Нужно начать check-out.",
    "spoken": "I would like to check out, please.",
    "formula": "Ask room number/name + prepare bill.",
    "coach": [
      "Сначала понять этап: check-in, check-out или просьба.",
      "Хорошая фраза звучит вежливо и дает следующий шаг.",
      "Could / May I / Let me check почти всегда безопаснее, чем приказ."
    ],
    "hidden": false,
    "audio": "audio/flow-10.mp3",
    "options": [
      [
        "Certainly. May I have your room number, please?",
        "правильный первый шаг",
        true,
        "Правильно: для check-out нужен room number или name. Example: “May I have your room number, please?”"
      ],
      [
        "Do you want to check in?",
        "перепутан этап",
        false,
        "Ошибка: guest says check out."
      ],
      [
        "You cannot leave.",
        "без причины",
        false,
        "Ошибка: нельзя блокировать гостя без объяснения."
      ],
      [
        "Your room is upstairs.",
        "не отвечает",
        false,
        "Ошибка: гость уже выезжает."
      ]
    ]
  },
  {
    "id": "flow-11",
    "mode": "flow",
    "level": "B1",
    "scene": "checkout",
    "title": "Ask about stay",
    "ru": "Счет готов. Нужно красиво завершить общение.",
    "spoken": "Here is my key card. Is everything settled?",
    "formula": "Confirm bill + ask about stay.",
    "coach": [
      "Сначала понять этап: check-in, check-out или просьба.",
      "Хорошая фраза звучит вежливо и дает следующий шаг.",
      "Could / May I / Let me check почти всегда безопаснее, чем приказ."
    ],
    "hidden": false,
    "audio": "audio/flow-11.mp3",
    "options": [
      [
        "Yes, everything is settled. How was your stay with us?",
        "профессиональное завершение",
        true,
        "Правильно: подтверждение плюс сервисный вопрос. Example: “How was your stay with us?”"
      ],
      [
        "Go away now.",
        "грубо",
        false,
        "Ошибка: check-out все еще часть сервиса."
      ],
      [
        "Give me more keys.",
        "не нужно",
        false,
        "Ошибка: guest already gave the key card."
      ],
      [
        "You have no room.",
        "не по ситуации",
        false,
        "Ошибка: вопрос о счете."
      ]
    ]
  },
  {
    "id": "flow-12",
    "mode": "flow",
    "level": "B1",
    "scene": "checkout",
    "title": "Receipt request",
    "ru": "Гость просит чек/квитанцию на email.",
    "spoken": "Could you email me the receipt?",
    "formula": "Ask email + confirm sending.",
    "coach": [
      "Сначала понять этап: check-in, check-out или просьба.",
      "Хорошая фраза звучит вежливо и дает следующий шаг.",
      "Could / May I / Let me check почти всегда безопаснее, чем приказ."
    ],
    "hidden": false,
    "audio": "audio/flow-12.mp3",
    "options": [
      [
        "Of course. Could you confirm your email address, please?",
        "нужная деталь",
        true,
        "Правильно: перед отправкой нужно подтвердить email. Example: “Could you confirm your email address?”"
      ],
      [
        "No emails today.",
        "без причины",
        false,
        "Ошибка: если система работает, нужно помочь."
      ],
      [
        "I sent it to someone.",
        "опасно",
        false,
        "Ошибка: нужно подтвердить адрес, чтобы не отправить не туда."
      ],
      [
        "Receipts are paper animals.",
        "бессмысленно",
        false,
        "Ошибка: фраза не отвечает запросу."
      ]
    ]
  },
  {
    "id": "flow-13",
    "mode": "flow",
    "level": "A2-B1",
    "scene": "checkin",
    "title": "Luggage storage",
    "ru": "Гость хочет оставить багаж до заселения.",
    "spoken": "Can I leave my luggage here until check-in?",
    "formula": "Yes/no + luggage room + ticket.",
    "coach": [
      "Сначала понять этап: check-in, check-out или просьба.",
      "Хорошая фраза звучит вежливо и дает следующий шаг.",
      "Could / May I / Let me check почти всегда безопаснее, чем приказ."
    ],
    "hidden": false,
    "audio": "audio/flow-13.mp3",
    "options": [
      [
        "Yes, of course. We can store it in the luggage room and give you a ticket.",
        "четкое решение",
        true,
        "Правильно: ты подтверждаешь услугу и объясняешь процесс. Example: “We can store it in the luggage room.”"
      ],
      [
        "Leave it in the street.",
        "плохой сервис",
        false,
        "Ошибка: это небезопасно и непрофессионально."
      ],
      [
        "Luggage is not my hobby.",
        "неуместно",
        false,
        "Ошибка: гостю нужна помощь."
      ],
      [
        "Only after check-out.",
        "логически неверно",
        false,
        "Ошибка: luggage storage часто доступен до check-in."
      ]
    ]
  },
  {
    "id": "flow-14",
    "mode": "flow",
    "level": "B1",
    "scene": "checkin",
    "title": "Upgrade request",
    "ru": "Гость спрашивает про номер лучше.",
    "spoken": "Do you have any room upgrades available?",
    "formula": "Check availability + mention price.",
    "coach": [
      "Сначала понять этап: check-in, check-out или просьба.",
      "Хорошая фраза звучит вежливо и дает следующий шаг.",
      "Could / May I / Let me check почти всегда безопаснее, чем приказ."
    ],
    "hidden": false,
    "audio": "audio/flow-14.mp3",
    "options": [
      [
        "Let me check availability. An upgrade may be possible for an additional charge.",
        "реалистично",
        true,
        "Правильно: ты не обещаешь вслепую и сразу предупреждаешь про charge."
      ],
      [
        "Yes, everything is free.",
        "опасное обещание",
        false,
        "Ошибка: upgrade обычно зависит от availability и цены."
      ],
      [
        "No, because I do not like upgrades.",
        "непрофессионально",
        false,
        "Ошибка: личное мнение не важно."
      ],
      [
        "Your room is a car.",
        "бессмысленно",
        false,
        "Ошибка: не отвечает запросу."
      ]
    ]
  },
  {
    "id": "flow-15",
    "mode": "flow",
    "level": "B1",
    "scene": "checkin",
    "title": "City tax",
    "ru": "Гость удивлен городскому налогу.",
    "spoken": "What is this city tax on the bill?",
    "formula": "Explain required local tax.",
    "coach": [
      "Сначала понять этап: check-in, check-out или просьба.",
      "Хорошая фраза звучит вежливо и дает следующий шаг.",
      "Could / May I / Let me check почти всегда безопаснее, чем приказ."
    ],
    "hidden": false,
    "audio": "audio/flow-15.mp3",
    "options": [
      [
        "It is a local city tax required by the municipality. It is not included in the room rate.",
        "спокойное объяснение",
        true,
        "Правильно: объясняешь природу платежа. Example: “It is required by the municipality.”"
      ],
      [
        "It is my personal tax.",
        "неверно",
        false,
        "Ошибка: city tax не личный сбор сотрудника."
      ],
      [
        "Do not ask questions.",
        "грубо",
        false,
        "Ошибка: гость имеет право понять счет."
      ],
      [
        "City tax means breakfast.",
        "неверное значение",
        false,
        "Ошибка: city tax не breakfast."
      ]
    ]
  },
  {
    "id": "flow-16",
    "mode": "flow",
    "level": "B1",
    "scene": "checkin",
    "title": "Wake-up call",
    "ru": "Гость просит wake-up call.",
    "spoken": "Could I get a wake-up call at six thirty tomorrow morning?",
    "formula": "Confirm time + room.",
    "coach": [
      "Сначала понять этап: check-in, check-out или просьба.",
      "Хорошая фраза звучит вежливо и дает следующий шаг.",
      "Could / May I / Let me check почти всегда безопаснее, чем приказ."
    ],
    "hidden": false,
    "audio": "audio/flow-16.mp3",
    "options": [
      [
        "Certainly. I will arrange a wake-up call for 6:30 tomorrow morning.",
        "подтверждает время",
        true,
        "Правильно: повтор времени предотвращает ошибку. Example: “for 6:30 tomorrow morning.”"
      ],
      [
        "Wake up yourself.",
        "грубо",
        false,
        "Ошибка: отель может предоставлять wake-up call."
      ],
      [
        "At sixteen thirty, yes.",
        "не то время",
        false,
        "Ошибка: six thirty morning = 6:30 a.m., не 16:30."
      ],
      [
        "Tomorrow is closed.",
        "не по теме",
        false,
        "Ошибка: услуга wake-up call не закрывает отель."
      ]
    ]
  },
  {
    "id": "flow-17",
    "mode": "flow",
    "level": "B1",
    "scene": "checkin",
    "title": "Taxi request",
    "ru": "Гость просит такси в аэропорт.",
    "spoken": "Could you book a taxi to the airport for tomorrow morning?",
    "formula": "Ask time + confirm destination.",
    "coach": [
      "Сначала понять этап: check-in, check-out или просьба.",
      "Хорошая фраза звучит вежливо и дает следующий шаг.",
      "Could / May I / Let me check почти всегда безопаснее, чем приказ."
    ],
    "hidden": false,
    "audio": "audio/flow-17.mp3",
    "options": [
      [
        "Of course. What time would you like the taxi?",
        "нужный следующий вопрос",
        true,
        "Правильно: destination уже есть, не хватает времени. Example: “What time would you like the taxi?”"
      ],
      [
        "The airport is far.",
        "не помогает",
        false,
        "Ошибка: это не бронирование такси."
      ],
      [
        "Take any car outside.",
        "небезопасно",
        false,
        "Ошибка: гость просит help from hotel."
      ],
      [
        "Taxi is breakfast.",
        "бессмысленно",
        false,
        "Ошибка: не соответствует запросу."
      ]
    ]
  },
  {
    "id": "flow-18",
    "mode": "flow",
    "level": "B1",
    "scene": "checkout",
    "title": "Payment method",
    "ru": "Гость хочет оплатить картой.",
    "spoken": "Can I pay by card?",
    "formula": "Confirm accepted payment.",
    "coach": [
      "Сначала понять этап: check-in, check-out или просьба.",
      "Хорошая фраза звучит вежливо и дает следующий шаг.",
      "Could / May I / Let me check почти всегда безопаснее, чем приказ."
    ],
    "hidden": false,
    "audio": "audio/flow-18.mp3",
    "options": [
      [
        "Yes, certainly. You can pay by card here.",
        "ясный ответ",
        true,
        "Правильно: коротко и уверенно. Example: “You can pay by card.”"
      ],
      [
        "Cards are impossible everywhere.",
        "неверно",
        false,
        "Ошибка: если card accepted, ответ должен быть yes."
      ],
      [
        "Pay with your passport.",
        "неверно",
        false,
        "Ошибка: passport is ID, not payment."
      ],
      [
        "Only yesterday.",
        "непонятно",
        false,
        "Ошибка: не отвечает на can I pay by card."
      ]
    ]
  },
  {
    "id": "flow-19",
    "mode": "flow",
    "level": "A2-B1",
    "scene": "checkout",
    "title": "Thank guest",
    "ru": "Нужно вежливо попрощаться после выезда.",
    "spoken": "Thank you. That is all, right?",
    "formula": "Confirm + farewell.",
    "coach": [
      "Сначала понять этап: check-in, check-out или просьба.",
      "Хорошая фраза звучит вежливо и дает следующий шаг.",
      "Could / May I / Let me check почти всегда безопаснее, чем приказ."
    ],
    "hidden": false,
    "audio": "audio/flow-19.mp3",
    "options": [
      [
        "Yes, that is all. Thank you for staying with us, and have a safe trip.",
        "хорошее завершение",
        true,
        "Правильно: confirms all is done and closes politely. Example: “Have a safe trip.”"
      ],
      [
        "Finally.",
        "грубо",
        false,
        "Ошибка: звучит будто гость надоел."
      ],
      [
        "You are staying forever.",
        "неверно",
        false,
        "Ошибка: check-out завершен."
      ],
      [
        "No words.",
        "не сервисно",
        false,
        "Ошибка: нужна нормальная farewell phrase."
      ]
    ]
  },
  {
    "id": "flow-20",
    "mode": "flow",
    "level": "B1",
    "scene": "checkin",
    "title": "Guest has a pet",
    "ru": "Гость приехал с собакой. Нужно уточнить правила.",
    "spoken": "I am travelling with a small dog. Is that okay?",
    "formula": "Check pet policy + possible fee.",
    "coach": [
      "Сначала понять этап: check-in, check-out или просьба.",
      "Хорошая фраза звучит вежливо и дает следующий шаг.",
      "Could / May I / Let me check почти всегда безопаснее, чем приказ."
    ],
    "hidden": false,
    "audio": "audio/flow-20.mp3",
    "options": [
      [
        "Let me check our pet policy. There may be an additional cleaning fee.",
        "профессионально",
        true,
        "Правильно: pet policy зависит от отеля; ты проверяешь и предупреждаешь о fee."
      ],
      [
        "Dogs can choose any room.",
        "неверно",
        false,
        "Ошибка: pet-friendly rooms may be limited."
      ],
      [
        "I hate dogs.",
        "непрофессионально",
        false,
        "Ошибка: личное мнение неуместно."
      ],
      [
        "Put it in the minibar.",
        "абсурдно",
        false,
        "Ошибка: не является решением."
      ]
    ]
  },
  {
    "id": "listen-01",
    "mode": "listen",
    "level": "A2-B1",
    "scene": "listen",
    "title": "Listen: reservation name",
    "ru": "Прослушай гостя. Выбери лучшую следующую реплику.",
    "spoken": "Hi. I booked a double room for two nights under the name Schneider.",
    "formula": "Repeat name + room type + nights.",
    "coach": [
      "Сначала слушай общий смысл, потом детали.",
      "Не угадывай по одному слову: имя, число и время часто решают ответ.",
      "Если текст скрыт, тренируй ухо; потом открой и проверь себя."
    ],
    "hidden": true,
    "audio": "audio/listen-01.mp3",
    "options": [
      [
        "Thank you. Let me check that: Schneider, a double room for two nights.",
        "точно повторяет детали",
        true,
        "Правильно: услышаны Schneider, double room, two nights. Example: “Let me check that: Schneider...”"
      ],
      [
        "Do you want to book a room?",
        "он уже booked",
        false,
        "Ошибка: guest said “I booked”, бронь уже есть."
      ],
      [
        "Your name is Breakfast?",
        "неверная деталь",
        false,
        "Ошибка: breakfast не звучал; фамилия Schneider."
      ],
      [
        "Can you leave now?",
        "не по ситуации",
        false,
        "Ошибка: это check-in, не check-out."
      ]
    ]
  },
  {
    "id": "listen-02",
    "mode": "listen",
    "level": "B1",
    "scene": "listen",
    "title": "Listen: complaint tone",
    "ru": "Гость раздражен. Выбери фразу, которая снижает напряжение.",
    "spoken": "Excuse me, there is no hot water in my room, and I have a meeting in one hour.",
    "formula": "Apologize + urgent action.",
    "coach": [
      "Сначала слушай общий смысл, потом детали.",
      "Не угадывай по одному слову: имя, число и время часто решают ответ.",
      "Если текст скрыт, тренируй ухо; потом открой и проверь себя."
    ],
    "hidden": true,
    "audio": "audio/listen-02.mp3",
    "options": [
      [
        "I am sorry about that. I will contact maintenance right away.",
        "сервисно и быстро",
        true,
        "Правильно: complaint требует apology + action. Example: “I will contact maintenance right away.”"
      ],
      [
        "This is impossible.",
        "спор",
        false,
        "Ошибка: ты споришь с гостем вместо решения."
      ],
      [
        "You can shower tomorrow.",
        "игнорирует срочность",
        false,
        "Ошибка: guest has a meeting in one hour."
      ],
      [
        "Why did you do that?",
        "обвинение",
        false,
        "Ошибка: не обвиняем гостя."
      ]
    ]
  },
  {
    "id": "listen-03",
    "mode": "listen",
    "level": "A2",
    "scene": "listen",
    "title": "Listen: spelling",
    "ru": "Гость диктует фамилию. Выбери правильное подтверждение.",
    "spoken": "The name is Brown. B-R-O-W-N.",
    "formula": "Repeat spelling to confirm.",
    "coach": [
      "Сначала слушай общий смысл, потом детали.",
      "Не угадывай по одному слову: имя, число и время часто решают ответ.",
      "Если текст скрыт, тренируй ухо; потом открой и проверь себя."
    ],
    "hidden": true,
    "audio": "audio/listen-03.mp3",
    "options": [
      [
        "Let me confirm: Brown, B-R-O-W-N.",
        "правильное spelling",
        true,
        "Правильно: ты повторяешь фамилию и буквы. Example: “Brown, B-R-O-W-N.”"
      ],
      [
        "Let me confirm: Braun, B-R-A-U-N.",
        "другая фамилия",
        false,
        "Ошибка: Brown и Braun похожи, но spelling разный."
      ],
      [
        "Your room is brown.",
        "не то значение",
        false,
        "Ошибка: Brown здесь surname."
      ],
      [
        "Can you spell hotel?",
        "не тот вопрос",
        false,
        "Ошибка: guest already spelled the name."
      ]
    ]
  },
  {
    "id": "listen-04",
    "mode": "listen",
    "level": "A2-B1",
    "scene": "listen",
    "title": "Listen: room type",
    "ru": "Выбери номер, который просит гость.",
    "spoken": "Could we have a twin room instead of a double room?",
    "formula": "Twin = two separate beds.",
    "coach": [
      "Сначала слушай общий смысл, потом детали.",
      "Не угадывай по одному слову: имя, число и время часто решают ответ.",
      "Если текст скрыт, тренируй ухо; потом открой и проверь себя."
    ],
    "hidden": true,
    "audio": "audio/listen-04.mp3",
    "options": [
      [
        "They want a twin room with two separate beds.",
        "правильный смысл",
        true,
        "Правильно: twin room = two separate beds. Double room обычно one large bed."
      ],
      [
        "They want two double rooms.",
        "не то",
        false,
        "Ошибка: guest asks for one twin room, not two rooms."
      ],
      [
        "They want breakfast instead.",
        "не звучало",
        false,
        "Ошибка: речь о bed type."
      ],
      [
        "They want to check out.",
        "не тот этап",
        false,
        "Ошибка: это request about room type."
      ]
    ]
  },
  {
    "id": "listen-05",
    "mode": "listen",
    "level": "B1",
    "scene": "listen",
    "title": "Listen: parking",
    "ru": "Гость спрашивает про парковку.",
    "spoken": "Is parking included, or do I need to pay extra?",
    "formula": "Answer parking price/status.",
    "coach": [
      "Сначала слушай общий смысл, потом детали.",
      "Не угадывай по одному слову: имя, число и время часто решают ответ.",
      "Если текст скрыт, тренируй ухо; потом открой и проверь себя."
    ],
    "hidden": true,
    "audio": "audio/listen-05.mp3",
    "options": [
      [
        "Let me check your booking. Parking may be an extra charge.",
        "аккуратный ответ",
        true,
        "Правильно: если included неизвестно, проверяем booking и предупреждаем про extra charge."
      ],
      [
        "Your room has wheels.",
        "не по теме",
        false,
        "Ошибка: guest asks about parking."
      ],
      [
        "Parking is always free in every hotel.",
        "опасное обобщение",
        false,
        "Ошибка: правила разные."
      ],
      [
        "Pay for breakfast.",
        "неверная услуга",
        false,
        "Ошибка: вопрос про parking, not breakfast."
      ]
    ]
  },
  {
    "id": "listen-06",
    "mode": "listen",
    "level": "B1",
    "scene": "listen",
    "title": "Listen: accessible room",
    "ru": "Гость просит доступный номер.",
    "spoken": "I requested an accessible room with a walk-in shower.",
    "formula": "Confirm accessibility request.",
    "coach": [
      "Сначала слушай общий смысл, потом детали.",
      "Не угадывай по одному слову: имя, число и время часто решают ответ.",
      "Если текст скрыт, тренируй ухо; потом открой и проверь себя."
    ],
    "hidden": true,
    "audio": "audio/listen-06.mp3",
    "options": [
      [
        "Let me check that we have an accessible room with a walk-in shower for you.",
        "точно услышано",
        true,
        "Правильно: ключи accessible room + walk-in shower. Example: “Let me check that...”"
      ],
      [
        "You requested a room with a balcony.",
        "другая деталь",
        false,
        "Ошибка: balcony не звучал."
      ],
      [
        "You requested a taxi.",
        "неверно",
        false,
        "Ошибка: речь о room facilities."
      ],
      [
        "A shower is not a room.",
        "не помогает",
        false,
        "Ошибка: нужно подтвердить request."
      ]
    ]
  },
  {
    "id": "listen-07",
    "mode": "listen",
    "level": "A2-B1",
    "scene": "listen",
    "title": "Listen: luggage",
    "ru": "Пойми, что нужно гостю.",
    "spoken": "Could you keep our luggage after check-out until five p.m.?",
    "formula": "Store luggage after check-out.",
    "coach": [
      "Сначала слушай общий смысл, потом детали.",
      "Не угадывай по одному слову: имя, число и время часто решают ответ.",
      "Если текст скрыт, тренируй ухо; потом открой и проверь себя."
    ],
    "hidden": true,
    "audio": "audio/listen-07.mp3",
    "options": [
      [
        "They want luggage storage after check-out until 5 p.m.",
        "правильно",
        true,
        "Правильно: after check-out + until five p.m. = хранение багажа до 17:00."
      ],
      [
        "They want breakfast at five.",
        "неверно",
        false,
        "Ошибка: breakfast не звучал."
      ],
      [
        "They want to check in at five.",
        "неверный этап",
        false,
        "Ошибка: guest says after check-out."
      ],
      [
        "They lost their luggage.",
        "не звучало",
        false,
        "Ошибка: keep luggage, not lost luggage."
      ]
    ]
  },
  {
    "id": "listen-08",
    "mode": "listen",
    "level": "B1",
    "scene": "listen",
    "title": "Listen: invoice details",
    "ru": "Гость просит счет на компанию.",
    "spoken": "Could you put the invoice under my company name, Travel Point Limited?",
    "formula": "Company invoice request.",
    "coach": [
      "Сначала слушай общий смысл, потом детали.",
      "Не угадывай по одному слову: имя, число и время часто решают ответ.",
      "Если текст скрыт, тренируй ухо; потом открой и проверь себя."
    ],
    "hidden": true,
    "audio": "audio/listen-08.mp3",
    "options": [
      [
        "Certainly. Could you spell the company name for me, please?",
        "нужное уточнение",
        true,
        "Правильно: company invoice требует точного spelling. Example: “Could you spell the company name?”"
      ],
      [
        "I will put it under Breakfast.",
        "неверное имя",
        false,
        "Ошибка: company name is Travel Point Limited."
      ],
      [
        "Companies cannot stay here.",
        "абсурдно",
        false,
        "Ошибка: речь о billing details."
      ],
      [
        "Your passport is a company.",
        "неверно",
        false,
        "Ошибка: invoice under company name, not passport."
      ]
    ]
  },
  {
    "id": "listen-09",
    "mode": "listen",
    "level": "B1",
    "scene": "listen",
    "title": "Listen: airport shuttle",
    "ru": "Гость спрашивает о шаттле.",
    "spoken": "What time does the airport shuttle leave in the morning?",
    "formula": "Give/ask shuttle schedule.",
    "coach": [
      "Сначала слушай общий смысл, потом детали.",
      "Не угадывай по одному слову: имя, число и время часто решают ответ.",
      "Если текст скрыт, тренируй ухо; потом открой и проверь себя."
    ],
    "hidden": true,
    "audio": "audio/listen-09.mp3",
    "options": [
      [
        "Let me check the shuttle schedule for you.",
        "правильная реакция",
        true,
        "Правильно: guest asks about shuttle time; нужно check schedule."
      ],
      [
        "The airport sleeps in the morning.",
        "не по теме",
        false,
        "Ошибка: нужен schedule."
      ],
      [
        "Your checkout is cancelled.",
        "неверно",
        false,
        "Ошибка: shuttle не связан с отменой."
      ],
      [
        "We only have elevators.",
        "не отвечает",
        false,
        "Ошибка: спросили про airport shuttle."
      ]
    ]
  },
  {
    "id": "listen-10",
    "mode": "listen",
    "level": "A2-B1",
    "scene": "listen",
    "title": "Listen: lost item",
    "ru": "Гость что-то потерял.",
    "spoken": "I think I left my charger in room 208.",
    "formula": "Lost item + room number.",
    "coach": [
      "Сначала слушай общий смысл, потом детали.",
      "Не угадывай по одному слову: имя, число и время часто решают ответ.",
      "Если текст скрыт, тренируй ухо; потом открой и проверь себя."
    ],
    "hidden": true,
    "audio": "audio/listen-10.mp3",
    "options": [
      [
        "I will check with housekeeping for a charger in room 208.",
        "точное решение",
        true,
        "Правильно: item = charger, room = 208. Example: “I will check with housekeeping.”"
      ],
      [
        "You left your passport in room 280.",
        "неверная вещь и номер",
        false,
        "Ошибка: charger, room 208."
      ],
      [
        "Chargers cannot be lost.",
        "не помогает",
        false,
        "Ошибка: нужно проверить lost and found."
      ],
      [
        "Room 208 wants breakfast.",
        "бессмысленно",
        false,
        "Ошибка: не отвечает."
      ]
    ]
  },
  {
    "id": "listen-11",
    "mode": "listen",
    "level": "B1",
    "scene": "listen",
    "title": "Listen: maintenance timing",
    "ru": "Пойми, когда гость будет в номере.",
    "spoken": "I will be out until six, so maintenance can come before then or after eight.",
    "formula": "Choose suitable maintenance time.",
    "coach": [
      "Сначала слушай общий смысл, потом детали.",
      "Не угадывай по одному слову: имя, число и время часто решают ответ.",
      "Если текст скрыт, тренируй ухо; потом открой и проверь себя."
    ],
    "hidden": true,
    "audio": "audio/listen-11.mp3",
    "options": [
      [
        "Maintenance can come before 6 or after 8.",
        "правильно",
        true,
        "Правильно: guest is out until six and available after eight. Нужно учитывать both windows."
      ],
      [
        "Maintenance must come exactly at seven.",
        "неверно",
        false,
        "Ошибка: seven is between six and eight, not offered."
      ],
      [
        "Maintenance cannot come today.",
        "не звучало",
        false,
        "Ошибка: guest gave possible times."
      ],
      [
        "They want breakfast before six.",
        "неверная тема",
        false,
        "Ошибка: речь о maintenance."
      ]
    ]
  },
  {
    "id": "listen-12",
    "mode": "listen",
    "level": "B1",
    "scene": "listen",
    "title": "Listen: allergy",
    "ru": "Гость сообщает об аллергии.",
    "spoken": "I have a nut allergy. Could you tell the restaurant?",
    "formula": "Inform restaurant about allergy.",
    "coach": [
      "Сначала слушай общий смысл, потом детали.",
      "Не угадывай по одному слову: имя, число и время часто решают ответ.",
      "Если текст скрыт, тренируй ухо; потом открой и проверь себя."
    ],
    "hidden": true,
    "audio": "audio/listen-12.mp3",
    "options": [
      [
        "Of course. I will inform the restaurant about your nut allergy.",
        "точно и безопасно",
        true,
        "Правильно: allergy важна для safety. Example: “I will inform the restaurant.”"
      ],
      [
        "Nuts are in every room.",
        "неверно и опасно",
        false,
        "Ошибка: нельзя игнорировать allergy."
      ],
      [
        "You should not eat anything.",
        "непрофессионально",
        false,
        "Ошибка: нужно передать информацию ресторану."
      ],
      [
        "Tell the elevator.",
        "не по теме",
        false,
        "Ошибка: restaurant должен знать."
      ]
    ]
  },
  {
    "id": "listen-13",
    "mode": "listen",
    "level": "B1",
    "scene": "listen",
    "title": "Listen: quiet room",
    "ru": "Гость просит тихий номер.",
    "spoken": "If possible, I would prefer a quiet room away from the elevator.",
    "formula": "Quiet room away from elevator.",
    "coach": [
      "Сначала слушай общий смысл, потом детали.",
      "Не угадывай по одному слову: имя, число и время часто решают ответ.",
      "Если текст скрыт, тренируй ухо; потом открой и проверь себя."
    ],
    "hidden": true,
    "audio": "audio/listen-13.mp3",
    "options": [
      [
        "I will note your preference for a quiet room away from the elevator.",
        "правильно",
        true,
        "Правильно: away from the elevator = не рядом с лифтом."
      ],
      [
        "They want a room inside the elevator.",
        "наоборот",
        false,
        "Ошибка: away from = подальше от."
      ],
      [
        "They want a loud room.",
        "наоборот",
        false,
        "Ошибка: quiet room."
      ],
      [
        "They want no room.",
        "неверно",
        false,
        "Ошибка: guest has a preference, not cancellation."
      ]
    ]
  },
  {
    "id": "listen-14",
    "mode": "listen",
    "level": "A2-B1",
    "scene": "listen",
    "title": "Listen: extra towel",
    "ru": "Гость просит предмет в номер.",
    "spoken": "Could you send two extra towels to room 419?",
    "formula": "Send two towels to room 419.",
    "coach": [
      "Сначала слушай общий смысл, потом детали.",
      "Не угадывай по одному слову: имя, число и время часто решают ответ.",
      "Если текст скрыт, тренируй ухо; потом открой и проверь себя."
    ],
    "hidden": true,
    "audio": "audio/listen-14.mp3",
    "options": [
      [
        "Of course. I will send two extra towels to room 419.",
        "точные детали",
        true,
        "Правильно: two towels + room 419. Example: “to room 419.”"
      ],
      [
        "I will send two pillows to room 491.",
        "не та вещь и номер",
        false,
        "Ошибка: towels, room 419."
      ],
      [
        "Towels are closed.",
        "непонятно",
        false,
        "Ошибка: не сервисный ответ."
      ],
      [
        "You can buy a towel.",
        "не нужно",
        false,
        "Ошибка: guest asks hotel to send towels."
      ]
    ]
  },
  {
    "id": "listen-15",
    "mode": "listen",
    "level": "B1",
    "scene": "listen",
    "title": "Listen: cancellation",
    "ru": "Гость говорит о второй ночи.",
    "spoken": "I need to cancel the second night, but I will stay tonight.",
    "formula": "Cancel only second night.",
    "coach": [
      "Сначала слушай общий смысл, потом детали.",
      "Не угадывай по одному слову: имя, число и время часто решают ответ.",
      "Если текст скрыт, тренируй ухо; потом открой и проверь себя."
    ],
    "hidden": true,
    "audio": "audio/listen-15.mp3",
    "options": [
      [
        "They want to stay tonight and cancel only the second night.",
        "правильно",
        true,
        "Правильно: stay tonight, cancel second night. Не отменяй всю бронь."
      ],
      [
        "They want to cancel the whole stay.",
        "слишком много",
        false,
        "Ошибка: guest will stay tonight."
      ],
      [
        "They want to add a second night.",
        "наоборот",
        false,
        "Ошибка: cancel the second night."
      ],
      [
        "They want a second breakfast.",
        "неверно",
        false,
        "Ошибка: night, not breakfast."
      ]
    ]
  },
  {
    "id": "listen-16",
    "mode": "listen",
    "level": "B1",
    "scene": "listen",
    "title": "Listen: baby cot",
    "ru": "Гость просит детскую кроватку.",
    "spoken": "We requested a baby cot, but it is not in the room.",
    "formula": "Arrange baby cot.",
    "coach": [
      "Сначала слушай общий смысл, потом детали.",
      "Не угадывай по одному слову: имя, число и время часто решают ответ.",
      "Если текст скрыт, тренируй ухо; потом открой и проверь себя."
    ],
    "hidden": true,
    "audio": "audio/listen-16.mp3",
    "options": [
      [
        "I am sorry. I will arrange a baby cot for your room right away.",
        "правильное решение",
        true,
        "Правильно: apologize + arrange baby cot. Example: “right away.”"
      ],
      [
        "Babies are not furniture.",
        "неуместно",
        false,
        "Ошибка: baby cot = детская кроватка."
      ],
      [
        "You requested a boat.",
        "неверное слово",
        false,
        "Ошибка: cot, not boat."
      ],
      [
        "It is in the restaurant.",
        "не решает",
        false,
        "Ошибка: cot нужен in the room."
      ]
    ]
  },
  {
    "id": "listen-17",
    "mode": "listen",
    "level": "B1",
    "scene": "listen",
    "title": "Listen: extra night",
    "ru": "Гость хочет продлить проживание.",
    "spoken": "Is it possible to stay one more night?",
    "formula": "Check availability for extension.",
    "coach": [
      "Сначала слушай общий смысл, потом детали.",
      "Не угадывай по одному слову: имя, число и время часто решают ответ.",
      "Если текст скрыт, тренируй ухо; потом открой и проверь себя."
    ],
    "hidden": true,
    "audio": "audio/listen-17.mp3",
    "options": [
      [
        "Let me check availability for one more night.",
        "правильно",
        true,
        "Правильно: extension depends on availability. Example: “one more night.”"
      ],
      [
        "You stayed too long already.",
        "грубо",
        false,
        "Ошибка: не сервисный тон."
      ],
      [
        "One more breakfast?",
        "не та услуга",
        false,
        "Ошибка: guest asks about night."
      ],
      [
        "Check-out was yesterday.",
        "не звучало",
        false,
        "Ошибка: надо проверить availability."
      ]
    ]
  },
  {
    "id": "listen-18",
    "mode": "listen",
    "level": "B1",
    "scene": "listen",
    "title": "Listen: payment split",
    "ru": "Гость хочет разделить оплату.",
    "spoken": "Could we split the bill between two cards?",
    "formula": "Split bill between two cards.",
    "coach": [
      "Сначала слушай общий смысл, потом детали.",
      "Не угадывай по одному слову: имя, число и время часто решают ответ.",
      "Если текст скрыт, тренируй ухо; потом открой и проверь себя."
    ],
    "hidden": true,
    "audio": "audio/listen-18.mp3",
    "options": [
      [
        "Certainly. We can split the payment between two cards.",
        "правильно",
        true,
        "Правильно: split the bill/payment between two cards. Example: “between two cards.”"
      ],
      [
        "They want two rooms.",
        "неверно",
        false,
        "Ошибка: two cards, not two rooms."
      ],
      [
        "They want to cut the card.",
        "буквальный перевод",
        false,
        "Ошибка: split bill = разделить оплату."
      ],
      [
        "Cards cannot be two.",
        "неверно",
        false,
        "Ошибка: можно оплатить двумя картами, если система позволяет."
      ]
    ]
  },
  {
    "id": "listen-19",
    "mode": "listen",
    "level": "B1",
    "scene": "listen",
    "title": "Listen: laundry",
    "ru": "Гость спрашивает про прачечную.",
    "spoken": "Do you offer same-day laundry service?",
    "formula": "Laundry service question.",
    "coach": [
      "Сначала слушай общий смысл, потом детали.",
      "Не угадывай по одному слову: имя, число и время часто решают ответ.",
      "Если текст скрыт, тренируй ухо; потом открой и проверь себя."
    ],
    "hidden": true,
    "audio": "audio/listen-19.mp3",
    "options": [
      [
        "Let me check the laundry schedule. Same-day service may be available.",
        "правильно",
        true,
        "Правильно: вопрос про same-day laundry. Нужно проверить schedule."
      ],
      [
        "Laundry is a taxi.",
        "неверно",
        false,
        "Ошибка: laundry = прачечная."
      ],
      [
        "You can wash in the pool.",
        "непрофессионально",
        false,
        "Ошибка: не решение."
      ],
      [
        "The room has no windows.",
        "не по теме",
        false,
        "Ошибка: question about laundry."
      ]
    ]
  },
  {
    "id": "listen-20",
    "mode": "listen",
    "level": "B1",
    "scene": "listen",
    "title": "Listen: restaurant booking",
    "ru": "Гость хочет столик в ресторане.",
    "spoken": "Could you reserve a table for two at the restaurant at eight thirty?",
    "formula": "Reserve table for two at 8:30.",
    "coach": [
      "Сначала слушай общий смысл, потом детали.",
      "Не угадывай по одному слову: имя, число и время часто решают ответ.",
      "Если текст скрыт, тренируй ухо; потом открой и проверь себя."
    ],
    "hidden": true,
    "audio": "audio/listen-20.mp3",
    "options": [
      [
        "Of course. I will reserve a table for two at 8:30.",
        "все детали услышаны",
        true,
        "Правильно: table for two + 8:30. Example: “for two at 8:30.”"
      ],
      [
        "A room for two at 8:13.",
        "не та услуга и время",
        false,
        "Ошибка: table, not room; eight thirty, not eight thirteen."
      ],
      [
        "Breakfast for thirty people.",
        "неверно",
        false,
        "Ошибка: for two, not thirty."
      ],
      [
        "The restaurant is a room key.",
        "бессмысленно",
        false,
        "Ошибка: не отвечает."
      ]
    ]
  },
  {
    "id": "details-01",
    "mode": "details",
    "level": "A2-B1",
    "scene": "details",
    "title": "Room number trap",
    "ru": "Прослушай номер комнаты и выбери правильную карточку.",
    "spoken": "Your room number is three fourteen.",
    "formula": "Three fourteen = 314.",
    "coach": [
      "Опасные места: dates, room numbers, prices, spelling.",
      "Хорошая стратегия: повторить деталь вслух.",
      "Fifteen/fifty и thirteen/thirty проверяй особенно внимательно."
    ],
    "hidden": true,
    "audio": "audio/details-01.mp3",
    "options": [
      [
        "Room 314",
        "three fourteen",
        true,
        "Правильно: three fourteen = 314. Example: “Room three fourteen.”"
      ],
      [
        "Room 340",
        "three forty",
        false,
        "Ошибка: 340 звучит как three forty."
      ],
      [
        "Room 304",
        "three oh four",
        false,
        "Ошибка: 304 = three oh four."
      ],
      [
        "Room 413",
        "four thirteen",
        false,
        "Ошибка: порядок цифр другой."
      ]
    ]
  },
  {
    "id": "details-02",
    "mode": "details",
    "level": "A2-B1",
    "scene": "details",
    "title": "Fifteen or fifty",
    "ru": "Выбери правильную сумму депозита.",
    "spoken": "We need a fifty euro deposit, please.",
    "formula": "Fifty = 50.",
    "coach": [
      "Опасные места: dates, room numbers, prices, spelling.",
      "Хорошая стратегия: повторить деталь вслух.",
      "Fifteen/fifty и thirteen/thirty проверяй особенно внимательно."
    ],
    "hidden": true,
    "audio": "audio/details-02.mp3",
    "options": [
      [
        "50 euros",
        "fifty",
        true,
        "Правильно: fifty = 50. Example: “a fifty euro deposit.”"
      ],
      [
        "15 euros",
        "fifteen",
        false,
        "Ошибка: fifteen = 15, другое ударение."
      ],
      [
        "5 euros",
        "five",
        false,
        "Ошибка: было fifty, не five."
      ],
      [
        "500 euros",
        "five hundred",
        false,
        "Ошибка: hundred не звучало."
      ]
    ]
  },
  {
    "id": "details-03",
    "mode": "details",
    "level": "B1",
    "scene": "details",
    "title": "Date choice",
    "ru": "Гость меняет дату выезда. Выбери новую дату.",
    "spoken": "Could we check out on the seventeenth instead of the sixteenth?",
    "formula": "Seventeenth = 17th.",
    "coach": [
      "Опасные места: dates, room numbers, prices, spelling.",
      "Хорошая стратегия: повторить деталь вслух.",
      "Fifteen/fifty и thirteen/thirty проверяй особенно внимательно."
    ],
    "hidden": true,
    "audio": "audio/details-03.mp3",
    "options": [
      [
        "17th",
        "new date",
        true,
        "Правильно: “on the seventeenth” = новая дата, 17-е."
      ],
      [
        "16th",
        "old date",
        false,
        "Ошибка: sixteenth стоит после instead of, это старая дата."
      ],
      [
        "7th",
        "seventh",
        false,
        "Ошибка: seventh и seventeenth разные."
      ],
      [
        "6th",
        "sixth",
        false,
        "Ошибка: sixth не звучало."
      ]
    ]
  },
  {
    "id": "details-04",
    "mode": "details",
    "level": "B1",
    "scene": "details",
    "title": "Late check-out time",
    "ru": "Выбери время, которое просит гость.",
    "spoken": "Is it possible to have a late check-out at half past one?",
    "formula": "Half past one = 1:30.",
    "coach": [
      "Опасные места: dates, room numbers, prices, spelling.",
      "Хорошая стратегия: повторить деталь вслух.",
      "Fifteen/fifty и thirteen/thirty проверяй особенно внимательно."
    ],
    "hidden": true,
    "audio": "audio/details-04.mp3",
    "options": [
      [
        "1:30",
        "half past one",
        true,
        "Правильно: half past one = 1:30."
      ],
      [
        "12:30",
        "half past twelve",
        false,
        "Ошибка: было one, не twelve."
      ],
      [
        "1:15",
        "quarter past one",
        false,
        "Ошибка: quarter past = :15."
      ],
      [
        "2:30",
        "half past two",
        false,
        "Ошибка: было one, не two."
      ]
    ]
  },
  {
    "id": "details-05",
    "mode": "details",
    "level": "A2-B1",
    "scene": "details",
    "title": "Thirty or thirteen",
    "ru": "Выбери правильную цену за завтрак.",
    "spoken": "Breakfast is thirteen euros per person.",
    "formula": "Thirteen = 13.",
    "coach": [
      "Опасные места: dates, room numbers, prices, spelling.",
      "Хорошая стратегия: повторить деталь вслух.",
      "Fifteen/fifty и thirteen/thirty проверяй особенно внимательно."
    ],
    "hidden": true,
    "audio": "audio/details-05.mp3",
    "options": [
      [
        "13 euros",
        "thirteen",
        true,
        "Правильно: thirteen = 13. Example: “thirteen euros per person.”"
      ],
      [
        "30 euros",
        "thirty",
        false,
        "Ошибка: thirty = 30, другое слово и ударение."
      ],
      [
        "3 euros",
        "three",
        false,
        "Ошибка: было thirteen."
      ],
      [
        "33 euros",
        "thirty-three",
        false,
        "Ошибка: не звучало thirty-three."
      ]
    ]
  },
  {
    "id": "details-06",
    "mode": "details",
    "level": "A2-B1",
    "scene": "details",
    "title": "Room 208",
    "ru": "Выбери номер комнаты.",
    "spoken": "Please send the towels to room two oh eight.",
    "formula": "Two oh eight = 208.",
    "coach": [
      "Опасные места: dates, room numbers, prices, spelling.",
      "Хорошая стратегия: повторить деталь вслух.",
      "Fifteen/fifty и thirteen/thirty проверяй особенно внимательно."
    ],
    "hidden": true,
    "audio": "audio/details-06.mp3",
    "options": [
      [
        "Room 208",
        "two oh eight",
        true,
        "Правильно: oh в номерах часто означает zero. Two oh eight = 208."
      ],
      [
        "Room 280",
        "two eighty",
        false,
        "Ошибка: 280 звучит как two eighty."
      ],
      [
        "Room 218",
        "two eighteen",
        false,
        "Ошибка: eighteen не звучало."
      ],
      [
        "Room 802",
        "eight oh two",
        false,
        "Ошибка: порядок другой."
      ]
    ]
  },
  {
    "id": "details-07",
    "mode": "details",
    "level": "B1",
    "scene": "details",
    "title": "One hundred and fifteen",
    "ru": "Выбери правильную сумму.",
    "spoken": "The total is one hundred and fifteen euros.",
    "formula": "115 euros.",
    "coach": [
      "Опасные места: dates, room numbers, prices, spelling.",
      "Хорошая стратегия: повторить деталь вслух.",
      "Fifteen/fifty и thirteen/thirty проверяй особенно внимательно."
    ],
    "hidden": true,
    "audio": "audio/details-07.mp3",
    "options": [
      [
        "115 euros",
        "one hundred and fifteen",
        true,
        "Правильно: one hundred and fifteen = 115."
      ],
      [
        "150 euros",
        "one hundred and fifty",
        false,
        "Ошибка: fifty = 50, fifteen = 15."
      ],
      [
        "105 euros",
        "one hundred and five",
        false,
        "Ошибка: five не звучало."
      ],
      [
        "15 euros",
        "without hundred",
        false,
        "Ошибка: было one hundred and fifteen."
      ]
    ]
  },
  {
    "id": "details-08",
    "mode": "details",
    "level": "B1",
    "scene": "details",
    "title": "Quarter to six",
    "ru": "Выбери время шаттла.",
    "spoken": "The shuttle leaves at quarter to six in the morning.",
    "formula": "Quarter to six = 5:45.",
    "coach": [
      "Опасные места: dates, room numbers, prices, spelling.",
      "Хорошая стратегия: повторить деталь вслух.",
      "Fifteen/fifty и thirteen/thirty проверяй особенно внимательно."
    ],
    "hidden": true,
    "audio": "audio/details-08.mp3",
    "options": [
      [
        "5:45 a.m.",
        "quarter to six",
        true,
        "Правильно: quarter to six = за 15 минут до шести, то есть 5:45."
      ],
      [
        "6:15 a.m.",
        "quarter past six",
        false,
        "Ошибка: quarter past six = 6:15."
      ],
      [
        "6:45 a.m.",
        "quarter to seven",
        false,
        "Ошибка: quarter to seven = 6:45."
      ],
      [
        "5:15 a.m.",
        "quarter past five",
        false,
        "Ошибка: не то выражение."
      ]
    ]
  },
  {
    "id": "details-09",
    "mode": "details",
    "level": "A2-B1",
    "scene": "details",
    "title": "Phone digits",
    "ru": "Выбери последние четыре цифры телефона.",
    "spoken": "The last four digits are seven zero double five.",
    "formula": "7055.",
    "coach": [
      "Опасные места: dates, room numbers, prices, spelling.",
      "Хорошая стратегия: повторить деталь вслух.",
      "Fifteen/fifty и thirteen/thirty проверяй особенно внимательно."
    ],
    "hidden": true,
    "audio": "audio/details-09.mp3",
    "options": [
      [
        "7055",
        "seven zero double five",
        true,
        "Правильно: double five = 55, значит 7055."
      ],
      [
        "7005",
        "seven double zero five",
        false,
        "Ошибка: double относится к five, не к zero."
      ],
      [
        "7550",
        "wrong order",
        false,
        "Ошибка: порядок цифр другой."
      ],
      [
        "7050",
        "missing one five",
        false,
        "Ошибка: double five = две пятерки."
      ]
    ]
  },
  {
    "id": "details-10",
    "mode": "details",
    "level": "B1",
    "scene": "details",
    "title": "Date: twenty-third",
    "ru": "Выбери дату заезда.",
    "spoken": "Your check-in date is the twenty-third of September.",
    "formula": "23 September.",
    "coach": [
      "Опасные места: dates, room numbers, prices, spelling.",
      "Хорошая стратегия: повторить деталь вслух.",
      "Fifteen/fifty и thirteen/thirty проверяй особенно внимательно."
    ],
    "hidden": true,
    "audio": "audio/details-10.mp3",
    "options": [
      [
        "23 September",
        "twenty-third",
        true,
        "Правильно: twenty-third = 23rd."
      ],
      [
        "13 September",
        "thirteenth",
        false,
        "Ошибка: thirteenth = 13th."
      ],
      [
        "30 September",
        "thirtieth",
        false,
        "Ошибка: thirtieth = 30th."
      ],
      [
        "20 September",
        "twentieth",
        false,
        "Ошибка: twentieth = 20th."
      ]
    ]
  },
  {
    "id": "details-11",
    "mode": "details",
    "level": "B1",
    "scene": "details",
    "title": "Floor number",
    "ru": "Выбери этаж.",
    "spoken": "Take the lift to the twelfth floor.",
    "formula": "Twelfth floor = 12th.",
    "coach": [
      "Опасные места: dates, room numbers, prices, spelling.",
      "Хорошая стратегия: повторить деталь вслух.",
      "Fifteen/fifty и thirteen/thirty проверяй особенно внимательно."
    ],
    "hidden": true,
    "audio": "audio/details-11.mp3",
    "options": [
      [
        "12th floor",
        "twelfth",
        true,
        "Правильно: twelfth = 12-й этаж."
      ],
      [
        "20th floor",
        "twentieth",
        false,
        "Ошибка: twentieth звучит иначе."
      ],
      [
        "2nd floor",
        "second",
        false,
        "Ошибка: second = 2nd."
      ],
      [
        "10th floor",
        "tenth",
        false,
        "Ошибка: tenth не звучало."
      ]
    ]
  },
  {
    "id": "details-12",
    "mode": "details",
    "level": "B1",
    "scene": "details",
    "title": "Payment deadline",
    "ru": "Выбери дедлайн оплаты.",
    "spoken": "The deposit must be paid by Friday at noon.",
    "formula": "Friday at 12:00.",
    "coach": [
      "Опасные места: dates, room numbers, prices, spelling.",
      "Хорошая стратегия: повторить деталь вслух.",
      "Fifteen/fifty и thirteen/thirty проверяй особенно внимательно."
    ],
    "hidden": true,
    "audio": "audio/details-12.mp3",
    "options": [
      [
        "Friday at 12:00",
        "at noon",
        true,
        "Правильно: noon = 12:00 днем."
      ],
      [
        "Friday at midnight",
        "12 at night",
        false,
        "Ошибка: midnight = 00:00, не noon."
      ],
      [
        "Monday at noon",
        "wrong day",
        false,
        "Ошибка: day was Friday."
      ],
      [
        "Friday at 2:00",
        "wrong time",
        false,
        "Ошибка: noon = 12:00."
      ]
    ]
  },
  {
    "id": "details-13",
    "mode": "details",
    "level": "A2-B1",
    "scene": "details",
    "title": "Breakfast hours",
    "ru": "Выбери время завтрака.",
    "spoken": "Breakfast is served from seven fifteen to ten forty-five.",
    "formula": "7:15-10:45.",
    "coach": [
      "Опасные места: dates, room numbers, prices, spelling.",
      "Хорошая стратегия: повторить деталь вслух.",
      "Fifteen/fifty и thirteen/thirty проверяй особенно внимательно."
    ],
    "hidden": true,
    "audio": "audio/details-13.mp3",
    "options": [
      [
        "7:15-10:45",
        "seven fifteen to ten forty-five",
        true,
        "Правильно: from seven fifteen to ten forty-five."
      ],
      [
        "7:50-10:15",
        "mixed numbers",
        false,
        "Ошибка: перепутаны fifteen/fifty и forty-five/fifteen."
      ],
      [
        "7:00-10:00",
        "too general",
        false,
        "Ошибка: в аудио были точные минуты."
      ],
      [
        "6:15-9:45",
        "wrong hours",
        false,
        "Ошибка: hours были seven and ten."
      ]
    ]
  },
  {
    "id": "details-14",
    "mode": "details",
    "level": "B1",
    "scene": "details",
    "title": "Booking code",
    "ru": "Выбери правильный код бронирования.",
    "spoken": "Your booking code is A as in Amsterdam, K as in King, nine four.",
    "formula": "AK94.",
    "coach": [
      "Опасные места: dates, room numbers, prices, spelling.",
      "Хорошая стратегия: повторить деталь вслух.",
      "Fifteen/fifty и thirteen/thirty проверяй особенно внимательно."
    ],
    "hidden": true,
    "audio": "audio/details-14.mp3",
    "options": [
      [
        "AK94",
        "A-K-nine-four",
        true,
        "Правильно: A as in Amsterdam, K as in King, nine four = AK94."
      ],
      [
        "AK49",
        "digits reversed",
        false,
        "Ошибка: было nine four, не four nine."
      ],
      [
        "AC94",
        "wrong letter",
        false,
        "Ошибка: K as in King, not C."
      ],
      [
        "NK94",
        "wrong first letter",
        false,
        "Ошибка: A as in Amsterdam."
      ]
    ]
  },
  {
    "id": "details-15",
    "mode": "details",
    "level": "B1",
    "scene": "details",
    "title": "Stay length",
    "ru": "Выбери продолжительность проживания.",
    "spoken": "You are staying for three nights, checking out on Monday.",
    "formula": "Three nights.",
    "coach": [
      "Опасные места: dates, room numbers, prices, spelling.",
      "Хорошая стратегия: повторить деталь вслух.",
      "Fifteen/fifty и thirteen/thirty проверяй особенно внимательно."
    ],
    "hidden": true,
    "audio": "audio/details-15.mp3",
    "options": [
      [
        "3 nights",
        "three nights",
        true,
        "Правильно: for three nights."
      ],
      [
        "13 nights",
        "thirteen",
        false,
        "Ошибка: было three, not thirteen."
      ],
      [
        "3 weeks",
        "wrong unit",
        false,
        "Ошибка: nights, not weeks."
      ],
      [
        "Until Sunday",
        "wrong checkout day",
        false,
        "Ошибка: checking out on Monday."
      ]
    ]
  },
  {
    "id": "details-16",
    "mode": "details",
    "level": "A2-B1",
    "scene": "details",
    "title": "Elevator direction",
    "ru": "Выбери направление после лифта.",
    "spoken": "When you leave the elevator, turn right and your room is at the end of the corridor.",
    "formula": "Turn right.",
    "coach": [
      "Опасные места: dates, room numbers, prices, spelling.",
      "Хорошая стратегия: повторить деталь вслух.",
      "Fifteen/fifty и thirteen/thirty проверяй особенно внимательно."
    ],
    "hidden": true,
    "audio": "audio/details-16.mp3",
    "options": [
      [
        "Turn right",
        "right after elevator",
        true,
        "Правильно: turn right after leaving the elevator."
      ],
      [
        "Turn left",
        "opposite direction",
        false,
        "Ошибка: left не звучало."
      ],
      [
        "Go downstairs",
        "wrong movement",
        false,
        "Ошибка: речь о corridor after elevator."
      ],
      [
        "Leave the hotel",
        "неверно",
        false,
        "Ошибка: нужно найти room."
      ]
    ]
  },
  {
    "id": "details-17",
    "mode": "details",
    "level": "B1",
    "scene": "details",
    "title": "Deposit refund",
    "ru": "Выбери срок возврата депозита.",
    "spoken": "The deposit will be released within five to seven business days.",
    "formula": "5-7 business days.",
    "coach": [
      "Опасные места: dates, room numbers, prices, spelling.",
      "Хорошая стратегия: повторить деталь вслух.",
      "Fifteen/fifty и thirteen/thirty проверяй особенно внимательно."
    ],
    "hidden": true,
    "audio": "audio/details-17.mp3",
    "options": [
      [
        "5-7 business days",
        "within five to seven",
        true,
        "Правильно: within five to seven business days."
      ],
      [
        "57 days",
        "misheard range",
        false,
        "Ошибка: five to seven = диапазон, не fifty-seven."
      ],
      [
        "2-3 days",
        "wrong range",
        false,
        "Ошибка: было five to seven."
      ],
      [
        "Immediately",
        "not stated",
        false,
        "Ошибка: deposit release takes 5-7 business days."
      ]
    ]
  },
  {
    "id": "details-18",
    "mode": "details",
    "level": "B1",
    "scene": "details",
    "title": "Minibar charge",
    "ru": "Выбери сумму mini-bar charge.",
    "spoken": "There is a minibar charge of twenty-eight euros.",
    "formula": "28 euros.",
    "coach": [
      "Опасные места: dates, room numbers, prices, spelling.",
      "Хорошая стратегия: повторить деталь вслух.",
      "Fifteen/fifty и thirteen/thirty проверяй особенно внимательно."
    ],
    "hidden": true,
    "audio": "audio/details-18.mp3",
    "options": [
      [
        "28 euros",
        "twenty-eight",
        true,
        "Правильно: twenty-eight = 28."
      ],
      [
        "82 euros",
        "eighty-two",
        false,
        "Ошибка: order reversed."
      ],
      [
        "18 euros",
        "eighteen",
        false,
        "Ошибка: eighteen не звучало."
      ],
      [
        "20 euros",
        "twenty only",
        false,
        "Ошибка: было twenty-eight."
      ]
    ]
  },
  {
    "id": "details-19",
    "mode": "details",
    "level": "B1",
    "scene": "details",
    "title": "Gate number",
    "ru": "Выбери выход для шаттла.",
    "spoken": "The shuttle picks up guests at gate B twelve.",
    "formula": "Gate B12.",
    "coach": [
      "Опасные места: dates, room numbers, prices, spelling.",
      "Хорошая стратегия: повторить деталь вслух.",
      "Fifteen/fifty и thirteen/thirty проверяй особенно внимательно."
    ],
    "hidden": true,
    "audio": "audio/details-19.mp3",
    "options": [
      [
        "Gate B12",
        "B twelve",
        true,
        "Правильно: B twelve = B12."
      ],
      [
        "Gate P12",
        "wrong letter",
        false,
        "Ошибка: было B, not P."
      ],
      [
        "Gate B20",
        "wrong number",
        false,
        "Ошибка: twelve = 12."
      ],
      [
        "Room B12",
        "wrong object",
        false,
        "Ошибка: shuttle gate, not room."
      ]
    ]
  },
  {
    "id": "details-20",
    "mode": "details",
    "level": "A2-B1",
    "scene": "details",
    "title": "Email domain",
    "ru": "Выбери email-домен.",
    "spoken": "Please send it to maria dot hotel at example dot com.",
    "formula": "maria.hotel@example.com.",
    "coach": [
      "Опасные места: dates, room numbers, prices, spelling.",
      "Хорошая стратегия: повторить деталь вслух.",
      "Fifteen/fifty и thirteen/thirty проверяй особенно внимательно."
    ],
    "hidden": true,
    "audio": "audio/details-20.mp3",
    "options": [
      [
        "maria.hotel@example.com",
        "dot and at heard correctly",
        true,
        "Правильно: dot = точка, at = @. Example: maria.hotel@example.com."
      ],
      [
        "maria@hotel.example.com",
        "different structure",
        false,
        "Ошибка: guest said maria dot hotel at example dot com."
      ],
      [
        "maria.hotel.example@com",
        "wrong at position",
        false,
        "Ошибка: at before example."
      ],
      [
        "hotel.maria@example.com",
        "name order changed",
        false,
        "Ошибка: order was maria dot hotel."
      ]
    ]
  },
  {
    "id": "problems-01",
    "mode": "problems",
    "level": "B1",
    "scene": "problem",
    "title": "Dirty room",
    "ru": "Гость говорит, что номер не убран.",
    "spoken": "My room has not been cleaned. There are towels on the floor.",
    "formula": "Apologize + housekeeping/change room.",
    "coach": [
      "Complaint formula: apologize + action + time.",
      "Не спорь с гостем в первой реплике.",
      "Решение должно быть конкретным: call, check, send, change, remove."
    ],
    "hidden": false,
    "audio": "audio/problems-01.mp3",
    "options": [
      [
        "I am sorry about that. I will send housekeeping right away, or we can change your room.",
        "сильное решение",
        true,
        "Правильно: есть apology и варианты решения. Example: “I will send housekeeping right away.”"
      ],
      [
        "It is not dirty.",
        "спор",
        false,
        "Ошибка: ты споришь с жалобой вместо действия."
      ],
      [
        "You should clean it.",
        "обвиняет гостя",
        false,
        "Ошибка: housekeeping is hotel responsibility."
      ],
      [
        "Come back next week.",
        "не решение",
        false,
        "Ошибка: проблему нужно решать сейчас."
      ]
    ]
  },
  {
    "id": "problems-02",
    "mode": "problems",
    "level": "A2-B1",
    "scene": "problem",
    "title": "Key card does not work",
    "ru": "Карта от номера не открывает дверь.",
    "spoken": "My key card is not working. I cannot get into my room.",
    "formula": "Verify guest + recode key.",
    "coach": [
      "Complaint formula: apologize + action + time.",
      "Не спорь с гостем в первой реплике.",
      "Решение должно быть конкретным: call, check, send, change, remove."
    ],
    "hidden": false,
    "audio": "audio/problems-02.mp3",
    "options": [
      [
        "I am sorry. May I check your room number and name? I will recode the key for you.",
        "безопасно",
        true,
        "Правильно: сначала security check, потом recode the key. Example: “I will recode the key.”"
      ],
      [
        "Try harder.",
        "грубо",
        false,
        "Ошибка: не решает техническую проблему."
      ],
      [
        "It is your fault.",
        "обвинение",
        false,
        "Ошибка: guest needs help, not blame."
      ],
      [
        "I will call the police.",
        "слишком резко",
        false,
        "Ошибка: это обычная проблема key card."
      ]
    ]
  },
  {
    "id": "problems-03",
    "mode": "problems",
    "level": "B1",
    "scene": "problem",
    "title": "Noisy neighbors",
    "ru": "Гость жалуется на шум.",
    "spoken": "The people next door are very loud. I cannot sleep.",
    "formula": "Apologize + contact guests/security.",
    "coach": [
      "Complaint formula: apologize + action + time.",
      "Не спорь с гостем в первой реплике.",
      "Решение должно быть конкретным: call, check, send, change, remove."
    ],
    "hidden": false,
    "audio": "audio/problems-03.mp3",
    "options": [
      [
        "I am sorry. I will contact them and ask them to keep the noise down.",
        "реалистично",
        true,
        "Правильно: ты берешь конфликт на себя. Example: “ask them to keep the noise down.”"
      ],
      [
        "You can shout at them.",
        "перекладывает конфликт",
        false,
        "Ошибка: guest should not solve it alone."
      ],
      [
        "Sleep in the lobby.",
        "плохой сервис",
        false,
        "Ошибка: нужно решить noise complaint."
      ],
      [
        "Loud people are normal.",
        "обесценивает",
        false,
        "Ошибка: так жалобы не закрывают."
      ]
    ]
  },
  {
    "id": "problems-04",
    "mode": "problems",
    "level": "B1-B2",
    "scene": "problem",
    "title": "Overbooking",
    "ru": "Свободного номера по брони нет.",
    "spoken": "What do you mean there is no room? I booked it two weeks ago.",
    "formula": "Apologize + responsibility + alternative.",
    "coach": [
      "Complaint formula: apologize + action + time.",
      "Не спорь с гостем в первой реплике.",
      "Решение должно быть конкретным: call, check, send, change, remove."
    ],
    "hidden": false,
    "audio": "audio/problems-04.mp3",
    "options": [
      [
        "I am very sorry. We will arrange another room for you at a partner hotel and cover the transfer.",
        "кризисное решение",
        true,
        "Правильно: apology, responsibility, concrete alternative. Example: “cover the transfer.”"
      ],
      [
        "It happens. Goodbye.",
        "бросает гостя",
        false,
        "Ошибка: overbooking требует решения."
      ],
      [
        "You booked too early.",
        "обвиняет гостя",
        false,
        "Ошибка: guest did the right thing by booking early."
      ],
      [
        "I cannot do anything.",
        "не решение",
        false,
        "Ошибка: отель должен предложить альтернативу."
      ]
    ]
  },
  {
    "id": "problems-05",
    "mode": "problems",
    "level": "B1",
    "scene": "checkout",
    "title": "Wrong bill",
    "ru": "Гость видит лишний mini-bar charge.",
    "spoken": "There is a minibar charge on my bill, but I did not use the minibar.",
    "formula": "Check charge + remove if incorrect.",
    "coach": [
      "Complaint formula: apologize + action + time.",
      "Не спорь с гостем в первой реплике.",
      "Решение должно быть конкретным: call, check, send, change, remove."
    ],
    "hidden": false,
    "audio": "audio/problems-05.mp3",
    "options": [
      [
        "I am sorry. Let me check that charge for you. If it is incorrect, I will remove it.",
        "честно и сервисно",
        true,
        "Правильно: ты проверяешь charge и обещаешь исправить, если ошибка."
      ],
      [
        "You must pay everything.",
        "слишком жестко",
        false,
        "Ошибка: сначала нужно проверить dispute."
      ],
      [
        "Minibar is always expensive.",
        "не отвечает",
        false,
        "Ошибка: проблема не цена, а wrong charge."
      ],
      [
        "Maybe your friend drank it.",
        "обвинительно",
        false,
        "Ошибка: звучит непрофессионально."
      ]
    ]
  },
  {
    "id": "problems-06",
    "mode": "problems",
    "level": "B1",
    "scene": "problem",
    "title": "No hot water",
    "ru": "Нет горячей воды перед встречей.",
    "spoken": "There is no hot water in my room, and I have a meeting soon.",
    "formula": "Apologize + urgent maintenance + option.",
    "coach": [
      "Complaint formula: apologize + action + time.",
      "Не спорь с гостем в первой реплике.",
      "Решение должно быть конкретным: call, check, send, change, remove."
    ],
    "hidden": false,
    "audio": "audio/problems-06.mp3",
    "options": [
      [
        "I am sorry. I will send maintenance right away and check if another room is available.",
        "срочное решение",
        true,
        "Правильно: urgent action плюс backup option. Example: “right away.”"
      ],
      [
        "Use cold water.",
        "плохой сервис",
        false,
        "Ошибка: guest has a real problem."
      ],
      [
        "Hot water is not important.",
        "обесценивает",
        false,
        "Ошибка: для гостя это важно."
      ],
      [
        "Meetings are difficult.",
        "не решение",
        false,
        "Ошибка: нужно решить water issue."
      ]
    ]
  },
  {
    "id": "problems-07",
    "mode": "problems",
    "level": "B1",
    "scene": "problem",
    "title": "Air conditioning",
    "ru": "Кондиционер не работает.",
    "spoken": "The air conditioning in my room is not working.",
    "formula": "Apologize + maintenance.",
    "coach": [
      "Complaint formula: apologize + action + time.",
      "Не спорь с гостем в первой реплике.",
      "Решение должно быть конкретным: call, check, send, change, remove."
    ],
    "hidden": false,
    "audio": "audio/problems-07.mp3",
    "options": [
      [
        "I am sorry. I will send maintenance to your room as soon as possible.",
        "прямое решение",
        true,
        "Правильно: apology + send maintenance. Example: “as soon as possible.”"
      ],
      [
        "Open the window.",
        "недостаточно",
        false,
        "Ошибка: может временно помочь, но не решает AC."
      ],
      [
        "Air conditioning is difficult.",
        "не сервисно",
        false,
        "Ошибка: гостю нужно action."
      ],
      [
        "You broke it.",
        "обвинение",
        false,
        "Ошибка: не начинаем с blame."
      ]
    ]
  },
  {
    "id": "problems-08",
    "mode": "problems",
    "level": "B1",
    "scene": "problem",
    "title": "Lost passport",
    "ru": "Гость потерял паспорт.",
    "spoken": "I cannot find my passport. I may have left it in the lobby.",
    "formula": "Stay calm + lost and found + security.",
    "coach": [
      "Complaint formula: apologize + action + time.",
      "Не спорь с гостем в первой реплике.",
      "Решение должно быть конкретным: call, check, send, change, remove."
    ],
    "hidden": false,
    "audio": "audio/problems-08.mp3",
    "options": [
      [
        "I am sorry. Let me check lost and found and ask security to review the lobby area.",
        "правильный план",
        true,
        "Правильно: calm response + concrete steps. Example: “check lost and found.”"
      ],
      [
        "That is funny.",
        "неуместно",
        false,
        "Ошибка: passport loss is serious."
      ],
      [
        "Buy a new passport here.",
        "невозможно",
        false,
        "Ошибка: hotel cannot issue passports."
      ],
      [
        "Forget about it.",
        "опасно",
        false,
        "Ошибка: паспорт нужно искать и помогать."
      ]
    ]
  },
  {
    "id": "problems-09",
    "mode": "problems",
    "level": "B1",
    "scene": "problem",
    "title": "Double charged",
    "ru": "Гость считает, что оплатил дважды.",
    "spoken": "I think I was charged twice for the room.",
    "formula": "Check payment records.",
    "coach": [
      "Complaint formula: apologize + action + time.",
      "Не спорь с гостем в первой реплике.",
      "Решение должно быть конкретным: call, check, send, change, remove."
    ],
    "hidden": false,
    "audio": "audio/problems-09.mp3",
    "options": [
      [
        "I am sorry. Let me check the payment records and compare the transactions.",
        "профессионально",
        true,
        "Правильно: payment issue требует проверки records. Example: “compare the transactions.”"
      ],
      [
        "Pay a third time.",
        "абсурдно",
        false,
        "Ошибка: усиливает проблему."
      ],
      [
        "Banks are strange.",
        "не решение",
        false,
        "Ошибка: нужно проверить transactions."
      ],
      [
        "You probably forgot.",
        "обвинение",
        false,
        "Ошибка: не обвиняем, проверяем."
      ]
    ]
  },
  {
    "id": "problems-10",
    "mode": "problems",
    "level": "B1",
    "scene": "problem",
    "title": "Room smells of smoke",
    "ru": "В номере запах сигарет.",
    "spoken": "My room smells of smoke, but I booked a non-smoking room.",
    "formula": "Apologize + inspect/change room.",
    "coach": [
      "Complaint formula: apologize + action + time.",
      "Не спорь с гостем в первой реплике.",
      "Решение должно быть конкретным: call, check, send, change, remove."
    ],
    "hidden": false,
    "audio": "audio/problems-10.mp3",
    "options": [
      [
        "I am sorry. We will inspect the room and move you to another non-smoking room if available.",
        "хорошее решение",
        true,
        "Правильно: ты признаешь mismatch и предлагаешь room move."
      ],
      [
        "Just open the window.",
        "недостаточно",
        false,
        "Ошибка: guest booked non-smoking room."
      ],
      [
        "Smoke smells nice.",
        "неуместно",
        false,
        "Ошибка: это complaint."
      ],
      [
        "You booked smoking.",
        "спор без проверки",
        false,
        "Ошибка: сначала check booking/room."
      ]
    ]
  },
  {
    "id": "problems-11",
    "mode": "problems",
    "level": "B1",
    "scene": "problem",
    "title": "Elevator out of service",
    "ru": "Лифт не работает, у гостя тяжелый багаж.",
    "spoken": "The elevator is out of service, and I have two heavy suitcases.",
    "formula": "Apologize + assistance.",
    "coach": [
      "Complaint formula: apologize + action + time.",
      "Не спорь с гостем в первой реплике.",
      "Решение должно быть конкретным: call, check, send, change, remove."
    ],
    "hidden": false,
    "audio": "audio/problems-11.mp3",
    "options": [
      [
        "I am sorry for the inconvenience. I will arrange assistance with your luggage.",
        "сервисное решение",
        true,
        "Правильно: inconvenience + assistance. Example: “arrange assistance.”"
      ],
      [
        "Carry them yourself.",
        "грубо",
        false,
        "Ошибка: не помогает."
      ],
      [
        "Suitcases are heavy.",
        "только повтор",
        false,
        "Ошибка: нужна помощь."
      ],
      [
        "Use the minibar.",
        "не по теме",
        false,
        "Ошибка: вопрос про elevator/luggage."
      ]
    ]
  },
  {
    "id": "problems-12",
    "mode": "problems",
    "level": "B1",
    "scene": "problem",
    "title": "Booking name mismatch",
    "ru": "Имя в брони не совпадает.",
    "spoken": "The booking should be under Ivanov, but your system shows another name.",
    "formula": "Verify details + search alternate booking.",
    "coach": [
      "Complaint formula: apologize + action + time.",
      "Не спорь с гостем в первой реплике.",
      "Решение должно быть конкретным: call, check, send, change, remove."
    ],
    "hidden": false,
    "audio": "audio/problems-12.mp3",
    "options": [
      [
        "Let me check the booking details. Could you show me the confirmation email, please?",
        "правильная проверка",
        true,
        "Правильно: confirmation email помогает найти mismatch."
      ],
      [
        "Then you are not Ivanov.",
        "слишком резко",
        false,
        "Ошибка: может быть ошибка системы или агентства."
      ],
      [
        "Names are not important.",
        "опасно",
        false,
        "Ошибка: имена важны для security."
      ],
      [
        "Change your name.",
        "абсурдно",
        false,
        "Ошибка: не решение."
      ]
    ]
  },
  {
    "id": "problems-13",
    "mode": "problems",
    "level": "B1",
    "scene": "problem",
    "title": "Late taxi",
    "ru": "Такси опаздывает.",
    "spoken": "The taxi you booked for me is ten minutes late.",
    "formula": "Apologize + call taxi company + update.",
    "coach": [
      "Complaint formula: apologize + action + time.",
      "Не спорь с гостем в первой реплике.",
      "Решение должно быть конкретным: call, check, send, change, remove."
    ],
    "hidden": false,
    "audio": "audio/problems-13.mp3",
    "options": [
      [
        "I am sorry. I will call the taxi company now and update you immediately.",
        "конкретное действие",
        true,
        "Правильно: ты берешь проблему в работу и обещаешь update."
      ],
      [
        "Ten minutes is nothing.",
        "обесценивает",
        false,
        "Ошибка: у гостя может быть flight/meeting."
      ],
      [
        "Run to the airport.",
        "не решение",
        false,
        "Ошибка: нужно call taxi or arrange alternative."
      ],
      [
        "Taxi is sleeping.",
        "непрофессионально",
        false,
        "Ошибка: не сервисный ответ."
      ]
    ]
  },
  {
    "id": "problems-14",
    "mode": "problems",
    "level": "B1",
    "scene": "problem",
    "title": "Restaurant closed",
    "ru": "Ресторан закрыт, гость голоден.",
    "spoken": "The restaurant is closed, but I need something to eat.",
    "formula": "Offer alternatives.",
    "coach": [
      "Complaint formula: apologize + action + time.",
      "Не спорь с гостем в первой реплике.",
      "Решение должно быть конкретным: call, check, send, change, remove."
    ],
    "hidden": false,
    "audio": "audio/problems-14.mp3",
    "options": [
      [
        "I am sorry. Room service is available until eleven, and I can also recommend nearby restaurants.",
        "варианты решения",
        true,
        "Правильно: apology + alternatives. Example: “I can recommend nearby restaurants.”"
      ],
      [
        "Do not eat.",
        "грубо",
        false,
        "Ошибка: не помогает."
      ],
      [
        "The restaurant is closed, so life is closed.",
        "абсурдно",
        false,
        "Ошибка: нужно предложить alternatives."
      ],
      [
        "Breakfast was yesterday.",
        "не по теме",
        false,
        "Ошибка: guest needs food now."
      ]
    ]
  },
  {
    "id": "problems-15",
    "mode": "problems",
    "level": "B1",
    "scene": "problem",
    "title": "Safe locked",
    "ru": "Сейф в номере заблокирован.",
    "spoken": "The safe in my room is locked, and my laptop is inside.",
    "formula": "Security procedure + help.",
    "coach": [
      "Complaint formula: apologize + action + time.",
      "Не спорь с гостем в первой реплике.",
      "Решение должно быть конкретным: call, check, send, change, remove."
    ],
    "hidden": false,
    "audio": "audio/problems-15.mp3",
    "options": [
      [
        "I am sorry. For security, I will send a manager to your room to help open the safe.",
        "безопасно",
        true,
        "Правильно: safe issue требует manager/security procedure."
      ],
      [
        "Tell me the code loudly.",
        "небезопасно",
        false,
        "Ошибка: нельзя просить код loudly."
      ],
      [
        "Break the safe.",
        "опасно",
        false,
        "Ошибка: нужен procedure."
      ],
      [
        "Laptops like safes.",
        "неуместно",
        false,
        "Ошибка: guest needs access."
      ]
    ]
  },
  {
    "id": "problems-16",
    "mode": "problems",
    "level": "B1",
    "scene": "problem",
    "title": "Wrong bed type",
    "ru": "Гость бронировал twin, получил double.",
    "spoken": "We booked a twin room, but there is only one bed.",
    "formula": "Apologize + check/change room.",
    "coach": [
      "Complaint formula: apologize + action + time.",
      "Не спорь с гостем в первой реплике.",
      "Решение должно быть конкретным: call, check, send, change, remove."
    ],
    "hidden": false,
    "audio": "audio/problems-16.mp3",
    "options": [
      [
        "I am sorry. Let me check your booking and see if we can move you to a twin room.",
        "правильное решение",
        true,
        "Правильно: check booking + room change. Example: “move you to a twin room.”"
      ],
      [
        "One bed is enough.",
        "обесценивает",
        false,
        "Ошибка: guest requested twin room."
      ],
      [
        "Twin means one bed.",
        "неверно",
        false,
        "Ошибка: twin usually means two separate beds."
      ],
      [
        "Sleep on the floor.",
        "плохой сервис",
        false,
        "Ошибка: не решение."
      ]
    ]
  },
  {
    "id": "problems-17",
    "mode": "problems",
    "level": "B1",
    "scene": "problem",
    "title": "Internet down",
    "ru": "Wi-Fi не работает, гостю нужно работать.",
    "spoken": "The Wi-Fi keeps disconnecting, and I need to join a video call.",
    "formula": "Apologize + technical help + alternative.",
    "coach": [
      "Complaint formula: apologize + action + time.",
      "Не спорь с гостем в первой реплике.",
      "Решение должно быть конкретным: call, check, send, change, remove."
    ],
    "hidden": false,
    "audio": "audio/problems-17.mp3",
    "options": [
      [
        "I am sorry. I will report it to our technician and can offer a workspace with a wired connection.",
        "решение и альтернатива",
        true,
        "Правильно: action + alternative for urgent work."
      ],
      [
        "Video calls are boring.",
        "неуместно",
        false,
        "Ошибка: guest needs connectivity."
      ],
      [
        "Disconnect your computer.",
        "не помогает",
        false,
        "Ошибка: проблема Wi-Fi."
      ],
      [
        "Internet is weather.",
        "неверно",
        false,
        "Ошибка: не сервисный ответ."
      ]
    ]
  },
  {
    "id": "problems-18",
    "mode": "problems",
    "level": "B1",
    "scene": "problem",
    "title": "Laundry lost",
    "ru": "Прачечная не вернула рубашку.",
    "spoken": "One of my shirts is missing from the laundry.",
    "formula": "Apologize + check laundry + update.",
    "coach": [
      "Complaint formula: apologize + action + time.",
      "Не спорь с гостем в первой реплике.",
      "Решение должно быть конкретным: call, check, send, change, remove."
    ],
    "hidden": false,
    "audio": "audio/problems-18.mp3",
    "options": [
      [
        "I am sorry. I will contact the laundry service and update you as soon as possible.",
        "правильное действие",
        true,
        "Правильно: missing item требует check + update."
      ],
      [
        "Buy another shirt.",
        "плохой сервис",
        false,
        "Ошибка: hotel/laundry should investigate."
      ],
      [
        "Shirts disappear.",
        "непрофессионально",
        false,
        "Ошибка: обесценивает проблему."
      ],
      [
        "Laundry is closed forever.",
        "без проверки",
        false,
        "Ошибка: нужно contact laundry."
      ]
    ]
  },
  {
    "id": "problems-19",
    "mode": "problems",
    "level": "B1",
    "scene": "problem",
    "title": "Guest is sick",
    "ru": "Гостю плохо, нужна помощь.",
    "spoken": "I feel very sick. Is there a doctor nearby?",
    "formula": "Offer medical help + emergency option.",
    "coach": [
      "Complaint formula: apologize + action + time.",
      "Не спорь с гостем в первой реплике.",
      "Решение должно быть конкретным: call, check, send, change, remove."
    ],
    "hidden": false,
    "audio": "audio/problems-19.mp3",
    "options": [
      [
        "I am sorry to hear that. I can call a doctor for you or help contact emergency services.",
        "безопасно",
        true,
        "Правильно: health issue требует serious help. Example: “call a doctor” or “emergency services.”"
      ],
      [
        "Sleep more.",
        "недостаточно",
        false,
        "Ошибка: может быть серьезно."
      ],
      [
        "Doctors are expensive.",
        "не первая реакция",
        false,
        "Ошибка: сначала помощь, потом details."
      ],
      [
        "Ask another guest.",
        "непрофессионально",
        false,
        "Ошибка: staff should help."
      ]
    ]
  },
  {
    "id": "problems-20",
    "mode": "problems",
    "level": "B1-B2",
    "scene": "problem",
    "title": "Angry guest escalation",
    "ru": "Гость злится из-за нескольких проблем.",
    "spoken": "This is the third problem today. I want to speak to the manager.",
    "formula": "Acknowledge + manager + stay calm.",
    "coach": [
      "Complaint formula: apologize + action + time.",
      "Не спорь с гостем в первой реплике.",
      "Решение должно быть конкретным: call, check, send, change, remove."
    ],
    "hidden": false,
    "audio": "audio/problems-20.mp3",
    "options": [
      [
        "I understand your frustration. I will call the manager right away.",
        "деэскалация",
        true,
        "Правильно: ты признаешь эмоцию и выполняешь request. Example: “I understand your frustration.”"
      ],
      [
        "Calm down or leave.",
        "эскалация",
        false,
        "Ошибка: звучит угрожающе и ухудшает конфликт."
      ],
      [
        "The manager is imaginary.",
        "абсурдно",
        false,
        "Ошибка: guest requested manager."
      ],
      [
        "Problems are normal.",
        "обесценивает",
        false,
        "Ошибка: третья проблема требует серьезной реакции."
      ]
    ]
  },
  {
    "id": "exam-01",
    "mode": "exam",
    "level": "Mixed",
    "scene": "checkin",
    "title": "Exam: first move",
    "ru": "Выбери лучшую следующую реплику.",
    "spoken": "Hello. I think I have a booking for tonight.",
    "formula": "Ask for name politely.",
    "coach": [
      "Экзамен смешивает check-in, детали и проблемы.",
      "Выбирай не просто грамматически верный, а сервисно лучший ответ.",
      "После ошибки смотри объяснение и повторяй фразу вслух."
    ],
    "hidden": false,
    "audio": "audio/exam-01.mp3",
    "options": [
      [
        "May I have your name, please?",
        "правильно",
        true,
        "Правильно: booking ищем по имени. Example: “May I have your name, please?”"
      ],
      [
        "Do you want breakfast?",
        "слишком рано",
        false,
        "Ошибка: сначала booking."
      ],
      [
        "Leave your bags outside.",
        "не по ситуации",
        false,
        "Ошибка: не помогает check-in."
      ],
      [
        "Your bill is ready.",
        "это check-out",
        false,
        "Ошибка: guest is checking in."
      ]
    ]
  },
  {
    "id": "exam-02",
    "mode": "exam",
    "level": "Mixed",
    "scene": "details",
    "title": "Exam: detail",
    "ru": "Прослушай и выбери правильную карточку.",
    "spoken": "The total is one hundred and fifteen euros.",
    "formula": "115 euros.",
    "coach": [
      "Экзамен смешивает check-in, детали и проблемы.",
      "Выбирай не просто грамматически верный, а сервисно лучший ответ.",
      "После ошибки смотри объяснение и повторяй фразу вслух."
    ],
    "hidden": true,
    "audio": "audio/exam-02.mp3",
    "options": [
      [
        "115 euros",
        "one hundred and fifteen",
        true,
        "Правильно: 115. Example: “one hundred and fifteen euros.”"
      ],
      [
        "150 euros",
        "fifty вместо fifteen",
        false,
        "Ошибка: fifteen = 15, fifty = 50."
      ],
      [
        "105 euros",
        "не то число",
        false,
        "Ошибка: five не звучало."
      ],
      [
        "15 euros",
        "пропущено hundred",
        false,
        "Ошибка: было one hundred."
      ]
    ]
  },
  {
    "id": "exam-03",
    "mode": "exam",
    "level": "Mixed",
    "scene": "problem",
    "title": "Exam: complaint",
    "ru": "Выбери лучший ответ на жалобу.",
    "spoken": "The air conditioning in my room is not working.",
    "formula": "Apologize + send maintenance.",
    "coach": [
      "Экзамен смешивает check-in, детали и проблемы.",
      "Выбирай не просто грамматически верный, а сервисно лучший ответ.",
      "После ошибки смотри объяснение и повторяй фразу вслух."
    ],
    "hidden": false,
    "audio": "audio/exam-03.mp3",
    "options": [
      [
        "I am sorry. I will send maintenance to your room as soon as possible.",
        "правильно",
        true,
        "Правильно: complaint formula работает: apology + action."
      ],
      [
        "Open the window.",
        "недостаточно",
        false,
        "Ошибка: это не чинит кондиционер."
      ],
      [
        "Air conditioning is difficult.",
        "не помогает",
        false,
        "Ошибка: нет action."
      ],
      [
        "You broke it.",
        "обвинение",
        false,
        "Ошибка: нельзя обвинять гостя."
      ]
    ]
  },
  {
    "id": "exam-04",
    "mode": "exam",
    "level": "Mixed",
    "scene": "checkout",
    "title": "Exam: late check-out",
    "ru": "Гость просит поздний выезд.",
    "spoken": "Could I check out at 2 p.m. instead of 11 a.m.?",
    "formula": "Check availability + possible fee.",
    "coach": [
      "Экзамен смешивает check-in, детали и проблемы.",
      "Выбирай не просто грамматически верный, а сервисно лучший ответ.",
      "После ошибки смотри объяснение и повторяй фразу вслух."
    ],
    "hidden": false,
    "audio": "audio/exam-04.mp3",
    "options": [
      [
        "Let me check availability. Late check-out may be possible for an extra fee.",
        "правильно",
        true,
        "Правильно: late check-out зависит от availability и fee."
      ],
      [
        "No, never.",
        "слишком резко",
        false,
        "Ошибка: сначала check availability."
      ],
      [
        "Yes, always free.",
        "опасное обещание",
        false,
        "Ошибка: may be fee."
      ],
      [
        "Check-in is at 3.",
        "не отвечает",
        false,
        "Ошибка: вопрос про check-out."
      ]
    ]
  },
  {
    "id": "exam-05",
    "mode": "exam",
    "level": "Mixed",
    "scene": "listen",
    "title": "Exam: spelling",
    "ru": "Прослушай фамилию и выбери подтверждение.",
    "spoken": "The surname is Clarke. C-L-A-R-K-E.",
    "formula": "Clarke spelling.",
    "coach": [
      "Экзамен смешивает check-in, детали и проблемы.",
      "Выбирай не просто грамматически верный, а сервисно лучший ответ.",
      "После ошибки смотри объяснение и повторяй фразу вслух."
    ],
    "hidden": true,
    "audio": "audio/exam-05.mp3",
    "options": [
      [
        "Clarke, C-L-A-R-K-E.",
        "правильно",
        true,
        "Правильно: Clarke ends with E. Example: “C-L-A-R-K-E.”"
      ],
      [
        "Clark, C-L-A-R-K.",
        "нет E",
        false,
        "Ошибка: guest spelled final E."
      ],
      [
        "Clerk, C-L-E-R-K.",
        "другое слово",
        false,
        "Ошибка: surname Clarke, not clerk."
      ],
      [
        "Clock, C-L-O-C-K.",
        "другое слово",
        false,
        "Ошибка: не то spelling."
      ]
    ]
  },
  {
    "id": "exam-06",
    "mode": "exam",
    "level": "Mixed",
    "scene": "problem",
    "title": "Exam: key card",
    "ru": "Выбери правильное действие.",
    "spoken": "My key card stopped working again.",
    "formula": "Apologize + verify + recode.",
    "coach": [
      "Экзамен смешивает check-in, детали и проблемы.",
      "Выбирай не просто грамматически верный, а сервисно лучший ответ.",
      "После ошибки смотри объяснение и повторяй фразу вслух."
    ],
    "hidden": false,
    "audio": "audio/exam-06.mp3",
    "options": [
      [
        "I am sorry. Let me verify your room number and recode the card for you.",
        "правильно",
        true,
        "Правильно: security first, then recode."
      ],
      [
        "Stop using doors.",
        "абсурдно",
        false,
        "Ошибка: не решает problem."
      ],
      [
        "It is not my card.",
        "не помогает",
        false,
        "Ошибка: ресепшен должен помочь."
      ],
      [
        "Pay for a new hotel.",
        "грубо",
        false,
        "Ошибка: key card fix is hotel service."
      ]
    ]
  },
  {
    "id": "exam-07",
    "mode": "exam",
    "level": "Mixed",
    "scene": "details",
    "title": "Exam: time",
    "ru": "Выбери время.",
    "spoken": "The restaurant closes at quarter past ten.",
    "formula": "10:15.",
    "coach": [
      "Экзамен смешивает check-in, детали и проблемы.",
      "Выбирай не просто грамматически верный, а сервисно лучший ответ.",
      "После ошибки смотри объяснение и повторяй фразу вслух."
    ],
    "hidden": true,
    "audio": "audio/exam-07.mp3",
    "options": [
      [
        "10:15",
        "quarter past ten",
        true,
        "Правильно: quarter past ten = 10:15."
      ],
      [
        "9:45",
        "quarter to ten",
        false,
        "Ошибка: quarter to ten = 9:45."
      ],
      [
        "10:45",
        "quarter to eleven",
        false,
        "Ошибка: не past ten."
      ],
      [
        "10:30",
        "half past ten",
        false,
        "Ошибка: half past = :30."
      ]
    ]
  },
  {
    "id": "exam-08",
    "mode": "exam",
    "level": "Mixed",
    "scene": "checkout",
    "title": "Exam: receipt",
    "ru": "Гость просит receipt.",
    "spoken": "Could I get a printed receipt, please?",
    "formula": "Provide receipt.",
    "coach": [
      "Экзамен смешивает check-in, детали и проблемы.",
      "Выбирай не просто грамматически верный, а сервисно лучший ответ.",
      "После ошибки смотри объяснение и повторяй фразу вслух."
    ],
    "hidden": false,
    "audio": "audio/exam-08.mp3",
    "options": [
      [
        "Certainly. I will print it for you now.",
        "правильно",
        true,
        "Правильно: короткий сервисный ответ. Example: “I will print it for you now.”"
      ],
      [
        "Receipts are private.",
        "неверно",
        false,
        "Ошибка: guest can receive receipt."
      ],
      [
        "Only by phone call.",
        "не по запросу",
        false,
        "Ошибка: guest asked printed receipt."
      ],
      [
        "Print your passport.",
        "неверно",
        false,
        "Ошибка: нужен receipt."
      ]
    ]
  },
  {
    "id": "exam-09",
    "mode": "exam",
    "level": "Mixed",
    "scene": "problem",
    "title": "Exam: noisy room",
    "ru": "Гость не может спать из-за шума.",
    "spoken": "There is a loud party next door.",
    "formula": "Contact noisy room/security.",
    "coach": [
      "Экзамен смешивает check-in, детали и проблемы.",
      "Выбирай не просто грамматически верный, а сервисно лучший ответ.",
      "После ошибки смотри объяснение и повторяй фразу вслух."
    ],
    "hidden": false,
    "audio": "audio/exam-09.mp3",
    "options": [
      [
        "I am sorry. I will contact the room and security if needed.",
        "правильно",
        true,
        "Правильно: noise complaint needs staff action."
      ],
      [
        "Join the party.",
        "непрофессионально",
        false,
        "Ошибка: guest wants sleep."
      ],
      [
        "Parties are allowed everywhere.",
        "опасно",
        false,
        "Ошибка: hotel has quiet rules."
      ],
      [
        "Use earphones.",
        "не решение",
        false,
        "Ошибка: проблема в соседях."
      ]
    ]
  },
  {
    "id": "exam-10",
    "mode": "exam",
    "level": "Mixed",
    "scene": "details",
    "title": "Exam: room number",
    "ru": "Выбери room number.",
    "spoken": "Your room is four oh six.",
    "formula": "406.",
    "coach": [
      "Экзамен смешивает check-in, детали и проблемы.",
      "Выбирай не просто грамматически верный, а сервисно лучший ответ.",
      "После ошибки смотри объяснение и повторяй фразу вслух."
    ],
    "hidden": true,
    "audio": "audio/exam-10.mp3",
    "options": [
      [
        "Room 406",
        "four oh six",
        true,
        "Правильно: oh = zero, four oh six = 406."
      ],
      [
        "Room 460",
        "four sixty",
        false,
        "Ошибка: 460 звучит differently."
      ],
      [
        "Room 416",
        "four sixteen",
        false,
        "Ошибка: sixteen не звучало."
      ],
      [
        "Room 604",
        "six oh four",
        false,
        "Ошибка: order reversed."
      ]
    ]
  },
  {
    "id": "exam-11",
    "mode": "exam",
    "level": "Mixed",
    "scene": "checkin",
    "title": "Exam: early arrival",
    "ru": "Гость приехал рано.",
    "spoken": "We arrived early. Can we leave our luggage here?",
    "formula": "Offer luggage storage.",
    "coach": [
      "Экзамен смешивает check-in, детали и проблемы.",
      "Выбирай не просто грамматически верный, а сервисно лучший ответ.",
      "После ошибки смотри объяснение и повторяй фразу вслух."
    ],
    "hidden": false,
    "audio": "audio/exam-11.mp3",
    "options": [
      [
        "Yes, we can store your luggage until your room is ready.",
        "правильно",
        true,
        "Правильно: решает early arrival. Example: “until your room is ready.”"
      ],
      [
        "No luggage exists.",
        "абсурдно",
        false,
        "Ошибка: не отвечает."
      ],
      [
        "Only in the restaurant oven.",
        "неприемлемо",
        false,
        "Ошибка: luggage room/storage."
      ],
      [
        "Come back last year.",
        "бессмысленно",
        false,
        "Ошибка: не сервисный ответ."
      ]
    ]
  },
  {
    "id": "exam-12",
    "mode": "exam",
    "level": "Mixed",
    "scene": "listen",
    "title": "Exam: allergy",
    "ru": "Прослушай и выбери безопасный ответ.",
    "spoken": "I have a seafood allergy. Could you tell the kitchen?",
    "formula": "Inform kitchen.",
    "coach": [
      "Экзамен смешивает check-in, детали и проблемы.",
      "Выбирай не просто грамматически верный, а сервисно лучший ответ.",
      "После ошибки смотри объяснение и повторяй фразу вслух."
    ],
    "hidden": true,
    "audio": "audio/exam-12.mp3",
    "options": [
      [
        "Of course. I will inform the kitchen about your seafood allergy.",
        "правильно",
        true,
        "Правильно: allergy = safety issue, нужно передать kitchen."
      ],
      [
        "Seafood is everywhere.",
        "опасно",
        false,
        "Ошибка: игнорирует allergy."
      ],
      [
        "Tell the elevator.",
        "не по теме",
        false,
        "Ошибка: kitchen should know."
      ],
      [
        "Eat more seafood.",
        "опасно",
        false,
        "Ошибка: нельзя советовать аллерген."
      ]
    ]
  },
  {
    "id": "exam-13",
    "mode": "exam",
    "level": "Mixed",
    "scene": "checkout",
    "title": "Exam: dispute charge",
    "ru": "Гость спорит со счетом.",
    "spoken": "I do not recognize this parking charge.",
    "formula": "Check disputed charge.",
    "coach": [
      "Экзамен смешивает check-in, детали и проблемы.",
      "Выбирай не просто грамматически верный, а сервисно лучший ответ.",
      "После ошибки смотри объяснение и повторяй фразу вслух."
    ],
    "hidden": false,
    "audio": "audio/exam-13.mp3",
    "options": [
      [
        "Let me check that charge for you and verify it with our records.",
        "правильно",
        true,
        "Правильно: disputed charge = check records."
      ],
      [
        "Recognize it now.",
        "грубо",
        false,
        "Ошибка: не сервисно."
      ],
      [
        "Parking is a room.",
        "неверно",
        false,
        "Ошибка: не отвечает."
      ],
      [
        "All charges are mysterious.",
        "непрофессионально",
        false,
        "Ошибка: нужно проверить."
      ]
    ]
  },
  {
    "id": "exam-14",
    "mode": "exam",
    "level": "Mixed",
    "scene": "details",
    "title": "Exam: date",
    "ru": "Выбери дату.",
    "spoken": "Your departure date is the thirtieth of April.",
    "formula": "30 April.",
    "coach": [
      "Экзамен смешивает check-in, детали и проблемы.",
      "Выбирай не просто грамматически верный, а сервисно лучший ответ.",
      "После ошибки смотри объяснение и повторяй фразу вслух."
    ],
    "hidden": true,
    "audio": "audio/exam-14.mp3",
    "options": [
      [
        "30 April",
        "thirtieth",
        true,
        "Правильно: thirtieth = 30th."
      ],
      [
        "13 April",
        "thirteenth",
        false,
        "Ошибка: thirteenth = 13th."
      ],
      [
        "3 April",
        "third",
        false,
        "Ошибка: third = 3rd."
      ],
      [
        "20 April",
        "twentieth",
        false,
        "Ошибка: twentieth = 20th."
      ]
    ]
  },
  {
    "id": "exam-15",
    "mode": "exam",
    "level": "Mixed",
    "scene": "problem",
    "title": "Exam: smoke smell",
    "ru": "Гость жалуется на запах дыма.",
    "spoken": "The room smells of smoke, but I requested non-smoking.",
    "formula": "Apologize + room solution.",
    "coach": [
      "Экзамен смешивает check-in, детали и проблемы.",
      "Выбирай не просто грамматически верный, а сервисно лучший ответ.",
      "После ошибки смотри объяснение и повторяй фразу вслух."
    ],
    "hidden": false,
    "audio": "audio/exam-15.mp3",
    "options": [
      [
        "I am sorry. Let me check another non-smoking room for you.",
        "правильно",
        true,
        "Правильно: recognizes issue and offers room solution."
      ],
      [
        "Smoke is normal.",
        "обесценивает",
        false,
        "Ошибка: non-smoking request нарушен."
      ],
      [
        "Smoke outside then.",
        "не отвечает",
        false,
        "Ошибка: проблема запах в комнате."
      ],
      [
        "Buy perfume.",
        "плохой сервис",
        false,
        "Ошибка: hotel should solve room issue."
      ]
    ]
  },
  {
    "id": "exam-16",
    "mode": "exam",
    "level": "Mixed",
    "scene": "checkin",
    "title": "Exam: pet policy",
    "ru": "Гость спрашивает про питомца.",
    "spoken": "Is there an extra fee for my dog?",
    "formula": "Explain/check pet fee.",
    "coach": [
      "Экзамен смешивает check-in, детали и проблемы.",
      "Выбирай не просто грамматически верный, а сервисно лучший ответ.",
      "После ошибки смотри объяснение и повторяй фразу вслух."
    ],
    "hidden": false,
    "audio": "audio/exam-16.mp3",
    "options": [
      [
        "Let me check the pet fee for you. It may include an additional cleaning charge.",
        "правильно",
        true,
        "Правильно: pet fee may vary; cleaning charge is a useful explanation."
      ],
      [
        "Dogs pay by card.",
        "абсурдно",
        false,
        "Ошибка: не отвечает."
      ],
      [
        "Your dog is a guest manager.",
        "бессмысленно",
        false,
        "Ошибка: нужен fee policy."
      ],
      [
        "No animals have fees anywhere.",
        "опасное обобщение",
        false,
        "Ошибка: pet fees differ by hotel."
      ]
    ]
  },
  {
    "id": "exam-17",
    "mode": "exam",
    "level": "Mixed",
    "scene": "details",
    "title": "Exam: booking code",
    "ru": "Выбери booking code.",
    "spoken": "The reference is M as in Madrid, R as in Rome, three eight.",
    "formula": "MR38.",
    "coach": [
      "Экзамен смешивает check-in, детали и проблемы.",
      "Выбирай не просто грамматически верный, а сервисно лучший ответ.",
      "После ошибки смотри объяснение и повторяй фразу вслух."
    ],
    "hidden": true,
    "audio": "audio/exam-17.mp3",
    "options": [
      [
        "MR38",
        "M-R-three-eight",
        true,
        "Правильно: M as in Madrid, R as in Rome, three eight."
      ],
      [
        "RM38",
        "letters reversed",
        false,
        "Ошибка: order was M then R."
      ],
      [
        "MR83",
        "digits reversed",
        false,
        "Ошибка: three eight, not eight three."
      ],
      [
        "NR38",
        "wrong first letter",
        false,
        "Ошибка: M as in Madrid."
      ]
    ]
  },
  {
    "id": "exam-18",
    "mode": "exam",
    "level": "Mixed",
    "scene": "problem",
    "title": "Exam: sick guest",
    "ru": "Гость просит врача.",
    "spoken": "Could you call a doctor? I feel dizzy.",
    "formula": "Call doctor/emergency help.",
    "coach": [
      "Экзамен смешивает check-in, детали и проблемы.",
      "Выбирай не просто грамматически верный, а сервисно лучший ответ.",
      "После ошибки смотри объяснение и повторяй фразу вслух."
    ],
    "hidden": false,
    "audio": "audio/exam-18.mp3",
    "options": [
      [
        "Of course. I will call a doctor for you right away. If it is urgent, we can contact emergency services.",
        "правильно",
        true,
        "Правильно: health issue needs immediate help and emergency option."
      ],
      [
        "Drink coffee.",
        "опасно",
        false,
        "Ошибка: dizzy может быть серьезно."
      ],
      [
        "Doctors are busy.",
        "не решение",
        false,
        "Ошибка: нужно помочь contact doctor."
      ],
      [
        "Ask tomorrow.",
        "опасно",
        false,
        "Ошибка: health issue сейчас."
      ]
    ]
  },
  {
    "id": "exam-19",
    "mode": "exam",
    "level": "Mixed",
    "scene": "listen",
    "title": "Exam: restaurant table",
    "ru": "Прослушай и выбери детали брони.",
    "spoken": "Please book a table for four at seven forty-five.",
    "formula": "Table for four at 7:45.",
    "coach": [
      "Экзамен смешивает check-in, детали и проблемы.",
      "Выбирай не просто грамматически верный, а сервисно лучший ответ.",
      "После ошибки смотри объяснение и повторяй фразу вслух."
    ],
    "hidden": true,
    "audio": "audio/exam-19.mp3",
    "options": [
      [
        "A table for four at 7:45.",
        "правильно",
        true,
        "Правильно: for four + seven forty-five."
      ],
      [
        "A room for four at 7:15.",
        "не та услуга и время",
        false,
        "Ошибка: table, not room; forty-five, not fifteen."
      ],
      [
        "A table for fourteen at 7:45.",
        "four vs fourteen",
        false,
        "Ошибка: было for four."
      ],
      [
        "A taxi for four at 7:45.",
        "не та услуга",
        false,
        "Ошибка: book a table."
      ]
    ]
  },
  {
    "id": "exam-20",
    "mode": "exam",
    "level": "Mixed",
    "scene": "checkout",
    "title": "Exam: farewell",
    "ru": "Выбери финальную фразу после check-out.",
    "spoken": "Thank you for your help. We are leaving now.",
    "formula": "Polite farewell.",
    "coach": [
      "Экзамен смешивает check-in, детали и проблемы.",
      "Выбирай не просто грамматически верный, а сервисно лучший ответ.",
      "После ошибки смотри объяснение и повторяй фразу вслух."
    ],
    "hidden": false,
    "audio": "audio/exam-20.mp3",
    "options": [
      [
        "Thank you for staying with us. Have a safe trip.",
        "правильно",
        true,
        "Правильно: polite farewell closes the service interaction."
      ],
      [
        "Finally you leave.",
        "грубо",
        false,
        "Ошибка: звучит оскорбительно."
      ],
      [
        "Check in tomorrow yesterday.",
        "бессмысленно",
        false,
        "Ошибка: нет смысла."
      ],
      [
        "Pay again outside.",
        "неверно",
        false,
        "Ошибка: check-out already finished."
      ]
    ]
  }
];
