from __future__ import annotations

import asyncio
import json
import os
from pathlib import Path

import edge_tts


ROOT = Path(__file__).resolve().parents[1]
AUDIO_DIR = ROOT / "audio"
DATA_FILE = ROOT / "trainer-data.js"


VOICE_ROTATION = [
    ("en-GB-SoniaNeural", "-2%", "+0Hz"),
    ("en-GB-RyanNeural", "-4%", "-2Hz"),
    ("en-US-JennyNeural", "-1%", "+2Hz"),
    ("en-US-GuyNeural", "-3%", "-3Hz"),
    ("en-AU-NatashaNeural", "-2%", "+1Hz"),
    ("en-AU-WilliamNeural", "-5%", "-4Hz"),
]


def opt(text: str, note: str, correct: bool, why: str) -> list[object]:
    return [text, note, correct, why]


def task(
    task_id: str,
    mode: str,
    level: str,
    scene: str,
    title: str,
    ru: str,
    spoken: str,
    formula: str,
    coach: list[str],
    options: list[list[object]],
    hidden: bool = False,
) -> dict[str, object]:
    return {
        "id": task_id,
        "mode": mode,
        "level": level,
        "scene": scene,
        "title": title,
        "ru": ru,
        "spoken": spoken,
        "formula": formula,
        "coach": coach,
        "hidden": hidden,
        "audio": f"audio/{task_id}.mp3",
        "options": options,
    }


COMMON_FLOW_COACH = [
    "Сначала понять этап: check-in, check-out или просьба.",
    "Хорошая фраза звучит вежливо и дает следующий шаг.",
    "Could / May I / Let me check почти всегда безопаснее, чем приказ.",
]

COMMON_LISTEN_COACH = [
    "Сначала слушай общий смысл, потом детали.",
    "Не угадывай по одному слову: имя, число и время часто решают ответ.",
    "Если текст скрыт, тренируй ухо; потом открой и проверь себя.",
]

COMMON_DETAILS_COACH = [
    "Опасные места: dates, room numbers, prices, spelling.",
    "Хорошая стратегия: повторить деталь вслух.",
    "Fifteen/fifty и thirteen/thirty проверяй особенно внимательно.",
]

COMMON_PROBLEM_COACH = [
    "Complaint formula: apologize + action + time.",
    "Не спорь с гостем в первой реплике.",
    "Решение должно быть конкретным: call, check, send, change, remove.",
]

COMMON_EXAM_COACH = [
    "Экзамен смешивает check-in, детали и проблемы.",
    "Выбирай не просто грамматически верный, а сервисно лучший ответ.",
    "После ошибки смотри объяснение и повторяй фразу вслух.",
]


TASKS: list[dict[str, object]] = [
    # Flow: 20
    task(
        "flow-01", "flow", "A2", "checkin", "Check-in opening",
        "Гость подошел к стойке. Выбери первую профессиональную реплику.",
        "Good evening. I have a reservation under Petrova.",
        "Greet + confirm the booking name.",
        COMMON_FLOW_COACH,
        [
            opt("Good evening. Welcome to our hotel. May I have your name, please?", "вежливое начало", True, "Правильно: ты приветствуешь гостя и просишь имя для поиска брони. Example: “May I have your name, please?”"),
            opt("Give me your passport now.", "слишком резко", False, "Ошибка: “give me” и “now” звучат как приказ. Лучше: “Could I have your passport, please?”"),
            opt("What is your room number?", "слишком рано", False, "Ошибка: гость еще не заселен, номера комнаты пока нет."),
            opt("Breakfast is at seven.", "не отвечает ситуации", False, "Ошибка: гость говорит о reservation, а не о завтраке."),
        ],
    ),
    task(
        "flow-02", "flow", "A2", "checkin", "Passport request",
        "Бронь найдена. Нужно попросить документ.",
        "Yes, that is me. What do you need from me?",
        "Could I have + document + please?",
        COMMON_FLOW_COACH,
        [
            opt("Could I have your passport, please?", "стандартная просьба", True, "Правильно: “Could I have...” звучит мягко и профессионально. Example: “Could I have your passport, please?”"),
            opt("Passport. Quickly.", "грубо", False, "Ошибка: слишком коротко и резко. На ресепшене нужна полная вежливая просьба."),
            opt("Where are you passport?", "грамматическая ошибка", False, "Ошибка: так не говорят. Можно: “May I see your passport, please?”"),
            opt("You are passport?", "непонятно", False, "Ошибка: фраза не имеет нужного смысла."),
        ],
    ),
    task(
        "flow-03", "flow", "A2-B1", "checkin", "Reservation not found",
        "Система не находит бронь. Нужна спокойная следующая фраза.",
        "I booked a room online yesterday, but I do not have the confirmation number.",
        "Apologize lightly + ask for alternate detail.",
        COMMON_FLOW_COACH,
        [
            opt("No problem. May I check the booking under your full name?", "спокойно ищем дальше", True, "Правильно: ты не пугаешь гостя и просишь другую деталь. Example: “May I check the booking under your full name?”"),
            opt("Then you have no booking.", "слишком категорично", False, "Ошибка: без confirmation number бронь все равно можно искать по имени, email или телефону."),
            opt("You must leave.", "грубо", False, "Ошибка: это не сервисный ответ и не решение."),
            opt("I like online booking.", "не по делу", False, "Ошибка: фраза не помогает найти бронь."),
        ],
    ),
    task(
        "flow-04", "flow", "A2-B1", "checkin", "Payment pre-authorization",
        "Нужно объяснить депозит/предавторизацию карты.",
        "Why do you need my card if I already paid online?",
        "Explain purpose + reassure.",
        COMMON_FLOW_COACH,
        [
            opt("It is only for the security deposit and possible extras. The room is already paid.", "короткое объяснение", True, "Правильно: ты объясняешь зачем карта и успокаиваешь гостя. Example: “The room is already paid.”"),
            opt("Because I said so.", "агрессивно", False, "Ошибка: это не объяснение, а давление."),
            opt("You did not pay anything.", "опасное утверждение", False, "Ошибка: гость сказал, что платил online. Сначала проверь, не спорь."),
            opt("Cards are beautiful.", "не по теме", False, "Ошибка: не отвечает на вопрос why."),
        ],
    ),
    task(
        "flow-05", "flow", "B1", "checkin", "Breakfast confirmation",
        "Гость спрашивает, включен ли завтрак.",
        "Is breakfast included in my booking?",
        "Confirm + give time/place.",
        COMMON_FLOW_COACH,
        [
            opt("Yes, breakfast is included. It is served from 7 to 10 in the restaurant.", "полный ответ", True, "Правильно: есть yes/no плюс полезные детали. Example: “It is served from 7 to 10.”"),
            opt("Maybe yes.", "неуверенно", False, "Ошибка: звучит непрофессионально. Если не уверен: “Let me check that for you.”"),
            opt("Breakfast is food.", "неинформативно", False, "Ошибка: гость спрашивает included or not."),
            opt("You can ask tomorrow.", "откладывает проблему", False, "Ошибка: лучше проверить сейчас."),
        ],
    ),
    task(
        "flow-06", "flow", "B1", "checkin", "Wi-Fi information",
        "Гость просит Wi-Fi. Нужно дать понятную инструкцию.",
        "Could you tell me the Wi-Fi password?",
        "Give network + password + where written.",
        COMMON_FLOW_COACH,
        [
            opt("Of course. The network is Hotel Guest, and the password is on your key card holder.", "понятно и полезно", True, "Правильно: ты даешь сеть и где найти пароль. Example: “The password is on your key card holder.”"),
            opt("I do not use Wi-Fi.", "не помогает", False, "Ошибка: личный опыт не отвечает запросу гостя."),
            opt("Wi-Fi is in the air.", "шутка не к месту", False, "Ошибка: гостю нужна конкретная информация."),
            opt("Ask the restaurant.", "перекладывает работу", False, "Ошибка: ресепшен должен помочь с базовой информацией."),
        ],
    ),
    task(
        "flow-07", "flow", "A2-B1", "checkin", "Room directions",
        "Гость получил ключ. Нужно объяснить, как пройти к номеру.",
        "How do I get to room 512?",
        "Floor + elevator + direction.",
        COMMON_FLOW_COACH,
        [
            opt("Take the elevator to the fifth floor. Your room is on the left.", "четкая инструкция", True, "Правильно: floor и direction есть. Example: “Take the elevator to the fifth floor.”"),
            opt("It is somewhere upstairs.", "слишком расплывчато", False, "Ошибка: гость может заблудиться. Нужна конкретика."),
            opt("I do not know rooms.", "плохой сервис", False, "Ошибка: ресепшен должен знать базовую навигацию."),
            opt("Room 512 is expensive.", "не отвечает", False, "Ошибка: вопрос был how to get there."),
        ],
    ),
    task(
        "flow-08", "flow", "B1", "checkin", "Early check-in",
        "Гость приехал раньше времени заселения.",
        "I know check-in is at three, but is my room ready now?",
        "Check availability + offer luggage storage.",
        COMMON_FLOW_COACH,
        [
            opt("Let me check. If it is not ready yet, we can store your luggage for you.", "реалистично и заботливо", True, "Правильно: ты проверяешь возможность и предлагаешь запасной вариант. Example: “We can store your luggage.”"),
            opt("No, come at three.", "слишком холодно", False, "Ошибка: может быть верно по правилам, но лучше сначала проверить и предложить luggage storage."),
            opt("You are too early.", "обвиняет гостя", False, "Ошибка: факт понятен, но тон плохой."),
            opt("Sleep in the lobby.", "непрофессионально", False, "Ошибка: это не нормальное решение."),
        ],
    ),
    task(
        "flow-09", "flow", "B1", "checkin", "No smoking policy",
        "Нужно вежливо объяснить правило о курении.",
        "Can I smoke in the room if I open the window?",
        "State policy + alternative location.",
        COMMON_FLOW_COACH,
        [
            opt("I’m afraid all rooms are non-smoking, but there is a smoking area outside.", "правило плюс альтернатива", True, "Правильно: “I’m afraid” смягчает отказ, а smoking area дает решение."),
            opt("Smoke wherever you want.", "нарушает правило", False, "Ошибка: нельзя разрешать то, что запрещено политикой отеля."),
            opt("Absolutely not, never ask again.", "слишком резко", False, "Ошибка: отказ должен быть вежливым."),
            opt("Windows are expensive.", "не по теме", False, "Ошибка: вопрос о smoking policy."),
        ],
    ),
    task(
        "flow-10", "flow", "B1", "checkout", "Check-out opening",
        "Гость хочет выехать. Нужно начать check-out.",
        "I would like to check out, please.",
        "Ask room number/name + prepare bill.",
        COMMON_FLOW_COACH,
        [
            opt("Certainly. May I have your room number, please?", "правильный первый шаг", True, "Правильно: для check-out нужен room number или name. Example: “May I have your room number, please?”"),
            opt("Do you want to check in?", "перепутан этап", False, "Ошибка: guest says check out."),
            opt("You cannot leave.", "без причины", False, "Ошибка: нельзя блокировать гостя без объяснения."),
            opt("Your room is upstairs.", "не отвечает", False, "Ошибка: гость уже выезжает."),
        ],
    ),
    task(
        "flow-11", "flow", "B1", "checkout", "Ask about stay",
        "Счет готов. Нужно красиво завершить общение.",
        "Here is my key card. Is everything settled?",
        "Confirm bill + ask about stay.",
        COMMON_FLOW_COACH,
        [
            opt("Yes, everything is settled. How was your stay with us?", "профессиональное завершение", True, "Правильно: подтверждение плюс сервисный вопрос. Example: “How was your stay with us?”"),
            opt("Go away now.", "грубо", False, "Ошибка: check-out все еще часть сервиса."),
            opt("Give me more keys.", "не нужно", False, "Ошибка: guest already gave the key card."),
            opt("You have no room.", "не по ситуации", False, "Ошибка: вопрос о счете."),
        ],
    ),
    task(
        "flow-12", "flow", "B1", "checkout", "Receipt request",
        "Гость просит чек/квитанцию на email.",
        "Could you email me the receipt?",
        "Ask email + confirm sending.",
        COMMON_FLOW_COACH,
        [
            opt("Of course. Could you confirm your email address, please?", "нужная деталь", True, "Правильно: перед отправкой нужно подтвердить email. Example: “Could you confirm your email address?”"),
            opt("No emails today.", "без причины", False, "Ошибка: если система работает, нужно помочь."),
            opt("I sent it to someone.", "опасно", False, "Ошибка: нужно подтвердить адрес, чтобы не отправить не туда."),
            opt("Receipts are paper animals.", "бессмысленно", False, "Ошибка: фраза не отвечает запросу."),
        ],
    ),
    task(
        "flow-13", "flow", "A2-B1", "checkin", "Luggage storage",
        "Гость хочет оставить багаж до заселения.",
        "Can I leave my luggage here until check-in?",
        "Yes/no + luggage room + ticket.",
        COMMON_FLOW_COACH,
        [
            opt("Yes, of course. We can store it in the luggage room and give you a ticket.", "четкое решение", True, "Правильно: ты подтверждаешь услугу и объясняешь процесс. Example: “We can store it in the luggage room.”"),
            opt("Leave it in the street.", "плохой сервис", False, "Ошибка: это небезопасно и непрофессионально."),
            opt("Luggage is not my hobby.", "неуместно", False, "Ошибка: гостю нужна помощь."),
            opt("Only after check-out.", "логически неверно", False, "Ошибка: luggage storage часто доступен до check-in."),
        ],
    ),
    task(
        "flow-14", "flow", "B1", "checkin", "Upgrade request",
        "Гость спрашивает про номер лучше.",
        "Do you have any room upgrades available?",
        "Check availability + mention price.",
        COMMON_FLOW_COACH,
        [
            opt("Let me check availability. An upgrade may be possible for an additional charge.", "реалистично", True, "Правильно: ты не обещаешь вслепую и сразу предупреждаешь про charge."),
            opt("Yes, everything is free.", "опасное обещание", False, "Ошибка: upgrade обычно зависит от availability и цены."),
            opt("No, because I do not like upgrades.", "непрофессионально", False, "Ошибка: личное мнение не важно."),
            opt("Your room is a car.", "бессмысленно", False, "Ошибка: не отвечает запросу."),
        ],
    ),
    task(
        "flow-15", "flow", "B1", "checkin", "City tax",
        "Гость удивлен городскому налогу.",
        "What is this city tax on the bill?",
        "Explain required local tax.",
        COMMON_FLOW_COACH,
        [
            opt("It is a local city tax required by the municipality. It is not included in the room rate.", "спокойное объяснение", True, "Правильно: объясняешь природу платежа. Example: “It is required by the municipality.”"),
            opt("It is my personal tax.", "неверно", False, "Ошибка: city tax не личный сбор сотрудника."),
            opt("Do not ask questions.", "грубо", False, "Ошибка: гость имеет право понять счет."),
            opt("City tax means breakfast.", "неверное значение", False, "Ошибка: city tax не breakfast."),
        ],
    ),
    task(
        "flow-16", "flow", "B1", "checkin", "Wake-up call",
        "Гость просит wake-up call.",
        "Could I get a wake-up call at six thirty tomorrow morning?",
        "Confirm time + room.",
        COMMON_FLOW_COACH,
        [
            opt("Certainly. I will arrange a wake-up call for 6:30 tomorrow morning.", "подтверждает время", True, "Правильно: повтор времени предотвращает ошибку. Example: “for 6:30 tomorrow morning.”"),
            opt("Wake up yourself.", "грубо", False, "Ошибка: отель может предоставлять wake-up call."),
            opt("At sixteen thirty, yes.", "не то время", False, "Ошибка: six thirty morning = 6:30 a.m., не 16:30."),
            opt("Tomorrow is closed.", "не по теме", False, "Ошибка: услуга wake-up call не закрывает отель."),
        ],
    ),
    task(
        "flow-17", "flow", "B1", "checkin", "Taxi request",
        "Гость просит такси в аэропорт.",
        "Could you book a taxi to the airport for tomorrow morning?",
        "Ask time + confirm destination.",
        COMMON_FLOW_COACH,
        [
            opt("Of course. What time would you like the taxi?", "нужный следующий вопрос", True, "Правильно: destination уже есть, не хватает времени. Example: “What time would you like the taxi?”"),
            opt("The airport is far.", "не помогает", False, "Ошибка: это не бронирование такси."),
            opt("Take any car outside.", "небезопасно", False, "Ошибка: гость просит help from hotel."),
            opt("Taxi is breakfast.", "бессмысленно", False, "Ошибка: не соответствует запросу."),
        ],
    ),
    task(
        "flow-18", "flow", "B1", "checkout", "Payment method",
        "Гость хочет оплатить картой.",
        "Can I pay by card?",
        "Confirm accepted payment.",
        COMMON_FLOW_COACH,
        [
            opt("Yes, certainly. You can pay by card here.", "ясный ответ", True, "Правильно: коротко и уверенно. Example: “You can pay by card.”"),
            opt("Cards are impossible everywhere.", "неверно", False, "Ошибка: если card accepted, ответ должен быть yes."),
            opt("Pay with your passport.", "неверно", False, "Ошибка: passport is ID, not payment."),
            opt("Only yesterday.", "непонятно", False, "Ошибка: не отвечает на can I pay by card."),
        ],
    ),
    task(
        "flow-19", "flow", "A2-B1", "checkout", "Thank guest",
        "Нужно вежливо попрощаться после выезда.",
        "Thank you. That is all, right?",
        "Confirm + farewell.",
        COMMON_FLOW_COACH,
        [
            opt("Yes, that is all. Thank you for staying with us, and have a safe trip.", "хорошее завершение", True, "Правильно: confirms all is done and closes politely. Example: “Have a safe trip.”"),
            opt("Finally.", "грубо", False, "Ошибка: звучит будто гость надоел."),
            opt("You are staying forever.", "неверно", False, "Ошибка: check-out завершен."),
            opt("No words.", "не сервисно", False, "Ошибка: нужна нормальная farewell phrase."),
        ],
    ),
    task(
        "flow-20", "flow", "B1", "checkin", "Guest has a pet",
        "Гость приехал с собакой. Нужно уточнить правила.",
        "I am travelling with a small dog. Is that okay?",
        "Check pet policy + possible fee.",
        COMMON_FLOW_COACH,
        [
            opt("Let me check our pet policy. There may be an additional cleaning fee.", "профессионально", True, "Правильно: pet policy зависит от отеля; ты проверяешь и предупреждаешь о fee."),
            opt("Dogs can choose any room.", "неверно", False, "Ошибка: pet-friendly rooms may be limited."),
            opt("I hate dogs.", "непрофессионально", False, "Ошибка: личное мнение неуместно."),
            opt("Put it in the minibar.", "абсурдно", False, "Ошибка: не является решением."),
        ],
    ),
    # Listen: 20
    task(
        "listen-01", "listen", "A2-B1", "listen", "Listen: reservation name",
        "Прослушай гостя. Выбери лучшую следующую реплику.",
        "Hi. I booked a double room for two nights under the name Schneider.",
        "Repeat name + room type + nights.",
        COMMON_LISTEN_COACH,
        [
            opt("Thank you. Let me check that: Schneider, a double room for two nights.", "точно повторяет детали", True, "Правильно: услышаны Schneider, double room, two nights. Example: “Let me check that: Schneider...”"),
            opt("Do you want to book a room?", "он уже booked", False, "Ошибка: guest said “I booked”, бронь уже есть."),
            opt("Your name is Breakfast?", "неверная деталь", False, "Ошибка: breakfast не звучал; фамилия Schneider."),
            opt("Can you leave now?", "не по ситуации", False, "Ошибка: это check-in, не check-out."),
        ],
        True,
    ),
    task(
        "listen-02", "listen", "B1", "listen", "Listen: complaint tone",
        "Гость раздражен. Выбери фразу, которая снижает напряжение.",
        "Excuse me, there is no hot water in my room, and I have a meeting in one hour.",
        "Apologize + urgent action.",
        COMMON_LISTEN_COACH,
        [
            opt("I am sorry about that. I will contact maintenance right away.", "сервисно и быстро", True, "Правильно: complaint требует apology + action. Example: “I will contact maintenance right away.”"),
            opt("This is impossible.", "спор", False, "Ошибка: ты споришь с гостем вместо решения."),
            opt("You can shower tomorrow.", "игнорирует срочность", False, "Ошибка: guest has a meeting in one hour."),
            opt("Why did you do that?", "обвинение", False, "Ошибка: не обвиняем гостя."),
        ],
        True,
    ),
    task(
        "listen-03", "listen", "A2", "listen", "Listen: spelling",
        "Гость диктует фамилию. Выбери правильное подтверждение.",
        "The name is Brown. B-R-O-W-N.",
        "Repeat spelling to confirm.",
        COMMON_LISTEN_COACH,
        [
            opt("Let me confirm: Brown, B-R-O-W-N.", "правильное spelling", True, "Правильно: ты повторяешь фамилию и буквы. Example: “Brown, B-R-O-W-N.”"),
            opt("Let me confirm: Braun, B-R-A-U-N.", "другая фамилия", False, "Ошибка: Brown и Braun похожи, но spelling разный."),
            opt("Your room is brown.", "не то значение", False, "Ошибка: Brown здесь surname."),
            opt("Can you spell hotel?", "не тот вопрос", False, "Ошибка: guest already spelled the name."),
        ],
        True,
    ),
    task(
        "listen-04", "listen", "A2-B1", "listen", "Listen: room type",
        "Выбери номер, который просит гость.",
        "Could we have a twin room instead of a double room?",
        "Twin = two separate beds.",
        COMMON_LISTEN_COACH,
        [
            opt("They want a twin room with two separate beds.", "правильный смысл", True, "Правильно: twin room = two separate beds. Double room обычно one large bed."),
            opt("They want two double rooms.", "не то", False, "Ошибка: guest asks for one twin room, not two rooms."),
            opt("They want breakfast instead.", "не звучало", False, "Ошибка: речь о bed type."),
            opt("They want to check out.", "не тот этап", False, "Ошибка: это request about room type."),
        ],
        True,
    ),
    task(
        "listen-05", "listen", "B1", "listen", "Listen: parking",
        "Гость спрашивает про парковку.",
        "Is parking included, or do I need to pay extra?",
        "Answer parking price/status.",
        COMMON_LISTEN_COACH,
        [
            opt("Let me check your booking. Parking may be an extra charge.", "аккуратный ответ", True, "Правильно: если included неизвестно, проверяем booking и предупреждаем про extra charge."),
            opt("Your room has wheels.", "не по теме", False, "Ошибка: guest asks about parking."),
            opt("Parking is always free in every hotel.", "опасное обобщение", False, "Ошибка: правила разные."),
            opt("Pay for breakfast.", "неверная услуга", False, "Ошибка: вопрос про parking, not breakfast."),
        ],
        True,
    ),
    task(
        "listen-06", "listen", "B1", "listen", "Listen: accessible room",
        "Гость просит доступный номер.",
        "I requested an accessible room with a walk-in shower.",
        "Confirm accessibility request.",
        COMMON_LISTEN_COACH,
        [
            opt("Let me check that we have an accessible room with a walk-in shower for you.", "точно услышано", True, "Правильно: ключи accessible room + walk-in shower. Example: “Let me check that...”"),
            opt("You requested a room with a balcony.", "другая деталь", False, "Ошибка: balcony не звучал."),
            opt("You requested a taxi.", "неверно", False, "Ошибка: речь о room facilities."),
            opt("A shower is not a room.", "не помогает", False, "Ошибка: нужно подтвердить request."),
        ],
        True,
    ),
    task(
        "listen-07", "listen", "A2-B1", "listen", "Listen: luggage",
        "Пойми, что нужно гостю.",
        "Could you keep our luggage after check-out until five p.m.?",
        "Store luggage after check-out.",
        COMMON_LISTEN_COACH,
        [
            opt("They want luggage storage after check-out until 5 p.m.", "правильно", True, "Правильно: after check-out + until five p.m. = хранение багажа до 17:00."),
            opt("They want breakfast at five.", "неверно", False, "Ошибка: breakfast не звучал."),
            opt("They want to check in at five.", "неверный этап", False, "Ошибка: guest says after check-out."),
            opt("They lost their luggage.", "не звучало", False, "Ошибка: keep luggage, not lost luggage."),
        ],
        True,
    ),
    task(
        "listen-08", "listen", "B1", "listen", "Listen: invoice details",
        "Гость просит счет на компанию.",
        "Could you put the invoice under my company name, Travel Point Limited?",
        "Company invoice request.",
        COMMON_LISTEN_COACH,
        [
            opt("Certainly. Could you spell the company name for me, please?", "нужное уточнение", True, "Правильно: company invoice требует точного spelling. Example: “Could you spell the company name?”"),
            opt("I will put it under Breakfast.", "неверное имя", False, "Ошибка: company name is Travel Point Limited."),
            opt("Companies cannot stay here.", "абсурдно", False, "Ошибка: речь о billing details."),
            opt("Your passport is a company.", "неверно", False, "Ошибка: invoice under company name, not passport."),
        ],
        True,
    ),
    task(
        "listen-09", "listen", "B1", "listen", "Listen: airport shuttle",
        "Гость спрашивает о шаттле.",
        "What time does the airport shuttle leave in the morning?",
        "Give/ask shuttle schedule.",
        COMMON_LISTEN_COACH,
        [
            opt("Let me check the shuttle schedule for you.", "правильная реакция", True, "Правильно: guest asks about shuttle time; нужно check schedule."),
            opt("The airport sleeps in the morning.", "не по теме", False, "Ошибка: нужен schedule."),
            opt("Your checkout is cancelled.", "неверно", False, "Ошибка: shuttle не связан с отменой."),
            opt("We only have elevators.", "не отвечает", False, "Ошибка: спросили про airport shuttle."),
        ],
        True,
    ),
    task(
        "listen-10", "listen", "A2-B1", "listen", "Listen: lost item",
        "Гость что-то потерял.",
        "I think I left my charger in room 208.",
        "Lost item + room number.",
        COMMON_LISTEN_COACH,
        [
            opt("I will check with housekeeping for a charger in room 208.", "точное решение", True, "Правильно: item = charger, room = 208. Example: “I will check with housekeeping.”"),
            opt("You left your passport in room 280.", "неверная вещь и номер", False, "Ошибка: charger, room 208."),
            opt("Chargers cannot be lost.", "не помогает", False, "Ошибка: нужно проверить lost and found."),
            opt("Room 208 wants breakfast.", "бессмысленно", False, "Ошибка: не отвечает."),
        ],
        True,
    ),
    task(
        "listen-11", "listen", "B1", "listen", "Listen: maintenance timing",
        "Пойми, когда гость будет в номере.",
        "I will be out until six, so maintenance can come before then or after eight.",
        "Choose suitable maintenance time.",
        COMMON_LISTEN_COACH,
        [
            opt("Maintenance can come before 6 or after 8.", "правильно", True, "Правильно: guest is out until six and available after eight. Нужно учитывать both windows."),
            opt("Maintenance must come exactly at seven.", "неверно", False, "Ошибка: seven is between six and eight, not offered."),
            opt("Maintenance cannot come today.", "не звучало", False, "Ошибка: guest gave possible times."),
            opt("They want breakfast before six.", "неверная тема", False, "Ошибка: речь о maintenance."),
        ],
        True,
    ),
    task(
        "listen-12", "listen", "B1", "listen", "Listen: allergy",
        "Гость сообщает об аллергии.",
        "I have a nut allergy. Could you tell the restaurant?",
        "Inform restaurant about allergy.",
        COMMON_LISTEN_COACH,
        [
            opt("Of course. I will inform the restaurant about your nut allergy.", "точно и безопасно", True, "Правильно: allergy важна для safety. Example: “I will inform the restaurant.”"),
            opt("Nuts are in every room.", "неверно и опасно", False, "Ошибка: нельзя игнорировать allergy."),
            opt("You should not eat anything.", "непрофессионально", False, "Ошибка: нужно передать информацию ресторану."),
            opt("Tell the elevator.", "не по теме", False, "Ошибка: restaurant должен знать."),
        ],
        True,
    ),
    task(
        "listen-13", "listen", "B1", "listen", "Listen: quiet room",
        "Гость просит тихий номер.",
        "If possible, I would prefer a quiet room away from the elevator.",
        "Quiet room away from elevator.",
        COMMON_LISTEN_COACH,
        [
            opt("I will note your preference for a quiet room away from the elevator.", "правильно", True, "Правильно: away from the elevator = не рядом с лифтом."),
            opt("They want a room inside the elevator.", "наоборот", False, "Ошибка: away from = подальше от."),
            opt("They want a loud room.", "наоборот", False, "Ошибка: quiet room."),
            opt("They want no room.", "неверно", False, "Ошибка: guest has a preference, not cancellation."),
        ],
        True,
    ),
    task(
        "listen-14", "listen", "A2-B1", "listen", "Listen: extra towel",
        "Гость просит предмет в номер.",
        "Could you send two extra towels to room 419?",
        "Send two towels to room 419.",
        COMMON_LISTEN_COACH,
        [
            opt("Of course. I will send two extra towels to room 419.", "точные детали", True, "Правильно: two towels + room 419. Example: “to room 419.”"),
            opt("I will send two pillows to room 491.", "не та вещь и номер", False, "Ошибка: towels, room 419."),
            opt("Towels are closed.", "непонятно", False, "Ошибка: не сервисный ответ."),
            opt("You can buy a towel.", "не нужно", False, "Ошибка: guest asks hotel to send towels."),
        ],
        True,
    ),
    task(
        "listen-15", "listen", "B1", "listen", "Listen: cancellation",
        "Гость говорит о второй ночи.",
        "I need to cancel the second night, but I will stay tonight.",
        "Cancel only second night.",
        COMMON_LISTEN_COACH,
        [
            opt("They want to stay tonight and cancel only the second night.", "правильно", True, "Правильно: stay tonight, cancel second night. Не отменяй всю бронь."),
            opt("They want to cancel the whole stay.", "слишком много", False, "Ошибка: guest will stay tonight."),
            opt("They want to add a second night.", "наоборот", False, "Ошибка: cancel the second night."),
            opt("They want a second breakfast.", "неверно", False, "Ошибка: night, not breakfast."),
        ],
        True,
    ),
    task(
        "listen-16", "listen", "B1", "listen", "Listen: baby cot",
        "Гость просит детскую кроватку.",
        "We requested a baby cot, but it is not in the room.",
        "Arrange baby cot.",
        COMMON_LISTEN_COACH,
        [
            opt("I am sorry. I will arrange a baby cot for your room right away.", "правильное решение", True, "Правильно: apologize + arrange baby cot. Example: “right away.”"),
            opt("Babies are not furniture.", "неуместно", False, "Ошибка: baby cot = детская кроватка."),
            opt("You requested a boat.", "неверное слово", False, "Ошибка: cot, not boat."),
            opt("It is in the restaurant.", "не решает", False, "Ошибка: cot нужен in the room."),
        ],
        True,
    ),
    task(
        "listen-17", "listen", "B1", "listen", "Listen: extra night",
        "Гость хочет продлить проживание.",
        "Is it possible to stay one more night?",
        "Check availability for extension.",
        COMMON_LISTEN_COACH,
        [
            opt("Let me check availability for one more night.", "правильно", True, "Правильно: extension depends on availability. Example: “one more night.”"),
            opt("You stayed too long already.", "грубо", False, "Ошибка: не сервисный тон."),
            opt("One more breakfast?", "не та услуга", False, "Ошибка: guest asks about night."),
            opt("Check-out was yesterday.", "не звучало", False, "Ошибка: надо проверить availability."),
        ],
        True,
    ),
    task(
        "listen-18", "listen", "B1", "listen", "Listen: payment split",
        "Гость хочет разделить оплату.",
        "Could we split the bill between two cards?",
        "Split bill between two cards.",
        COMMON_LISTEN_COACH,
        [
            opt("Certainly. We can split the payment between two cards.", "правильно", True, "Правильно: split the bill/payment between two cards. Example: “between two cards.”"),
            opt("They want two rooms.", "неверно", False, "Ошибка: two cards, not two rooms."),
            opt("They want to cut the card.", "буквальный перевод", False, "Ошибка: split bill = разделить оплату."),
            opt("Cards cannot be two.", "неверно", False, "Ошибка: можно оплатить двумя картами, если система позволяет."),
        ],
        True,
    ),
    task(
        "listen-19", "listen", "B1", "listen", "Listen: laundry",
        "Гость спрашивает про прачечную.",
        "Do you offer same-day laundry service?",
        "Laundry service question.",
        COMMON_LISTEN_COACH,
        [
            opt("Let me check the laundry schedule. Same-day service may be available.", "правильно", True, "Правильно: вопрос про same-day laundry. Нужно проверить schedule."),
            opt("Laundry is a taxi.", "неверно", False, "Ошибка: laundry = прачечная."),
            opt("You can wash in the pool.", "непрофессионально", False, "Ошибка: не решение."),
            opt("The room has no windows.", "не по теме", False, "Ошибка: question about laundry."),
        ],
        True,
    ),
    task(
        "listen-20", "listen", "B1", "listen", "Listen: restaurant booking",
        "Гость хочет столик в ресторане.",
        "Could you reserve a table for two at the restaurant at eight thirty?",
        "Reserve table for two at 8:30.",
        COMMON_LISTEN_COACH,
        [
            opt("Of course. I will reserve a table for two at 8:30.", "все детали услышаны", True, "Правильно: table for two + 8:30. Example: “for two at 8:30.”"),
            opt("A room for two at 8:13.", "не та услуга и время", False, "Ошибка: table, not room; eight thirty, not eight thirteen."),
            opt("Breakfast for thirty people.", "неверно", False, "Ошибка: for two, not thirty."),
            opt("The restaurant is a room key.", "бессмысленно", False, "Ошибка: не отвечает."),
        ],
        True,
    ),
    # Details: 20
    task(
        "details-01", "details", "A2-B1", "details", "Room number trap",
        "Прослушай номер комнаты и выбери правильную карточку.",
        "Your room number is three fourteen.",
        "Three fourteen = 314.",
        COMMON_DETAILS_COACH,
        [
            opt("Room 314", "three fourteen", True, "Правильно: three fourteen = 314. Example: “Room three fourteen.”"),
            opt("Room 340", "three forty", False, "Ошибка: 340 звучит как three forty."),
            opt("Room 304", "three oh four", False, "Ошибка: 304 = three oh four."),
            opt("Room 413", "four thirteen", False, "Ошибка: порядок цифр другой."),
        ],
        True,
    ),
    task(
        "details-02", "details", "A2-B1", "details", "Fifteen or fifty",
        "Выбери правильную сумму депозита.",
        "We need a fifty euro deposit, please.",
        "Fifty = 50.",
        COMMON_DETAILS_COACH,
        [
            opt("50 euros", "fifty", True, "Правильно: fifty = 50. Example: “a fifty euro deposit.”"),
            opt("15 euros", "fifteen", False, "Ошибка: fifteen = 15, другое ударение."),
            opt("5 euros", "five", False, "Ошибка: было fifty, не five."),
            opt("500 euros", "five hundred", False, "Ошибка: hundred не звучало."),
        ],
        True,
    ),
    task(
        "details-03", "details", "B1", "details", "Date choice",
        "Гость меняет дату выезда. Выбери новую дату.",
        "Could we check out on the seventeenth instead of the sixteenth?",
        "Seventeenth = 17th.",
        COMMON_DETAILS_COACH,
        [
            opt("17th", "new date", True, "Правильно: “on the seventeenth” = новая дата, 17-е."),
            opt("16th", "old date", False, "Ошибка: sixteenth стоит после instead of, это старая дата."),
            opt("7th", "seventh", False, "Ошибка: seventh и seventeenth разные."),
            opt("6th", "sixth", False, "Ошибка: sixth не звучало."),
        ],
        True,
    ),
    task(
        "details-04", "details", "B1", "details", "Late check-out time",
        "Выбери время, которое просит гость.",
        "Is it possible to have a late check-out at half past one?",
        "Half past one = 1:30.",
        COMMON_DETAILS_COACH,
        [
            opt("1:30", "half past one", True, "Правильно: half past one = 1:30."),
            opt("12:30", "half past twelve", False, "Ошибка: было one, не twelve."),
            opt("1:15", "quarter past one", False, "Ошибка: quarter past = :15."),
            opt("2:30", "half past two", False, "Ошибка: было one, не two."),
        ],
        True,
    ),
    task(
        "details-05", "details", "A2-B1", "details", "Thirty or thirteen",
        "Выбери правильную цену за завтрак.",
        "Breakfast is thirteen euros per person.",
        "Thirteen = 13.",
        COMMON_DETAILS_COACH,
        [
            opt("13 euros", "thirteen", True, "Правильно: thirteen = 13. Example: “thirteen euros per person.”"),
            opt("30 euros", "thirty", False, "Ошибка: thirty = 30, другое слово и ударение."),
            opt("3 euros", "three", False, "Ошибка: было thirteen."),
            opt("33 euros", "thirty-three", False, "Ошибка: не звучало thirty-three."),
        ],
        True,
    ),
    task(
        "details-06", "details", "A2-B1", "details", "Room 208",
        "Выбери номер комнаты.",
        "Please send the towels to room two oh eight.",
        "Two oh eight = 208.",
        COMMON_DETAILS_COACH,
        [
            opt("Room 208", "two oh eight", True, "Правильно: oh в номерах часто означает zero. Two oh eight = 208."),
            opt("Room 280", "two eighty", False, "Ошибка: 280 звучит как two eighty."),
            opt("Room 218", "two eighteen", False, "Ошибка: eighteen не звучало."),
            opt("Room 802", "eight oh two", False, "Ошибка: порядок другой."),
        ],
        True,
    ),
    task(
        "details-07", "details", "B1", "details", "One hundred and fifteen",
        "Выбери правильную сумму.",
        "The total is one hundred and fifteen euros.",
        "115 euros.",
        COMMON_DETAILS_COACH,
        [
            opt("115 euros", "one hundred and fifteen", True, "Правильно: one hundred and fifteen = 115."),
            opt("150 euros", "one hundred and fifty", False, "Ошибка: fifty = 50, fifteen = 15."),
            opt("105 euros", "one hundred and five", False, "Ошибка: five не звучало."),
            opt("15 euros", "without hundred", False, "Ошибка: было one hundred and fifteen."),
        ],
        True,
    ),
    task(
        "details-08", "details", "B1", "details", "Quarter to six",
        "Выбери время шаттла.",
        "The shuttle leaves at quarter to six in the morning.",
        "Quarter to six = 5:45.",
        COMMON_DETAILS_COACH,
        [
            opt("5:45 a.m.", "quarter to six", True, "Правильно: quarter to six = за 15 минут до шести, то есть 5:45."),
            opt("6:15 a.m.", "quarter past six", False, "Ошибка: quarter past six = 6:15."),
            opt("6:45 a.m.", "quarter to seven", False, "Ошибка: quarter to seven = 6:45."),
            opt("5:15 a.m.", "quarter past five", False, "Ошибка: не то выражение."),
        ],
        True,
    ),
    task(
        "details-09", "details", "A2-B1", "details", "Phone digits",
        "Выбери последние четыре цифры телефона.",
        "The last four digits are seven zero double five.",
        "7055.",
        COMMON_DETAILS_COACH,
        [
            opt("7055", "seven zero double five", True, "Правильно: double five = 55, значит 7055."),
            opt("7005", "seven double zero five", False, "Ошибка: double относится к five, не к zero."),
            opt("7550", "wrong order", False, "Ошибка: порядок цифр другой."),
            opt("7050", "missing one five", False, "Ошибка: double five = две пятерки."),
        ],
        True,
    ),
    task(
        "details-10", "details", "B1", "details", "Date: twenty-third",
        "Выбери дату заезда.",
        "Your check-in date is the twenty-third of September.",
        "23 September.",
        COMMON_DETAILS_COACH,
        [
            opt("23 September", "twenty-third", True, "Правильно: twenty-third = 23rd."),
            opt("13 September", "thirteenth", False, "Ошибка: thirteenth = 13th."),
            opt("30 September", "thirtieth", False, "Ошибка: thirtieth = 30th."),
            opt("20 September", "twentieth", False, "Ошибка: twentieth = 20th."),
        ],
        True,
    ),
    task(
        "details-11", "details", "B1", "details", "Floor number",
        "Выбери этаж.",
        "Take the lift to the twelfth floor.",
        "Twelfth floor = 12th.",
        COMMON_DETAILS_COACH,
        [
            opt("12th floor", "twelfth", True, "Правильно: twelfth = 12-й этаж."),
            opt("20th floor", "twentieth", False, "Ошибка: twentieth звучит иначе."),
            opt("2nd floor", "second", False, "Ошибка: second = 2nd."),
            opt("10th floor", "tenth", False, "Ошибка: tenth не звучало."),
        ],
        True,
    ),
    task(
        "details-12", "details", "B1", "details", "Payment deadline",
        "Выбери дедлайн оплаты.",
        "The deposit must be paid by Friday at noon.",
        "Friday at 12:00.",
        COMMON_DETAILS_COACH,
        [
            opt("Friday at 12:00", "at noon", True, "Правильно: noon = 12:00 днем."),
            opt("Friday at midnight", "12 at night", False, "Ошибка: midnight = 00:00, не noon."),
            opt("Monday at noon", "wrong day", False, "Ошибка: day was Friday."),
            opt("Friday at 2:00", "wrong time", False, "Ошибка: noon = 12:00."),
        ],
        True,
    ),
    task(
        "details-13", "details", "A2-B1", "details", "Breakfast hours",
        "Выбери время завтрака.",
        "Breakfast is served from seven fifteen to ten forty-five.",
        "7:15-10:45.",
        COMMON_DETAILS_COACH,
        [
            opt("7:15-10:45", "seven fifteen to ten forty-five", True, "Правильно: from seven fifteen to ten forty-five."),
            opt("7:50-10:15", "mixed numbers", False, "Ошибка: перепутаны fifteen/fifty и forty-five/fifteen."),
            opt("7:00-10:00", "too general", False, "Ошибка: в аудио были точные минуты."),
            opt("6:15-9:45", "wrong hours", False, "Ошибка: hours были seven and ten."),
        ],
        True,
    ),
    task(
        "details-14", "details", "B1", "details", "Booking code",
        "Выбери правильный код бронирования.",
        "Your booking code is A as in Amsterdam, K as in King, nine four.",
        "AK94.",
        COMMON_DETAILS_COACH,
        [
            opt("AK94", "A-K-nine-four", True, "Правильно: A as in Amsterdam, K as in King, nine four = AK94."),
            opt("AK49", "digits reversed", False, "Ошибка: было nine four, не four nine."),
            opt("AC94", "wrong letter", False, "Ошибка: K as in King, not C."),
            opt("NK94", "wrong first letter", False, "Ошибка: A as in Amsterdam."),
        ],
        True,
    ),
    task(
        "details-15", "details", "B1", "details", "Stay length",
        "Выбери продолжительность проживания.",
        "You are staying for three nights, checking out on Monday.",
        "Three nights.",
        COMMON_DETAILS_COACH,
        [
            opt("3 nights", "three nights", True, "Правильно: for three nights."),
            opt("13 nights", "thirteen", False, "Ошибка: было three, not thirteen."),
            opt("3 weeks", "wrong unit", False, "Ошибка: nights, not weeks."),
            opt("Until Sunday", "wrong checkout day", False, "Ошибка: checking out on Monday."),
        ],
        True,
    ),
    task(
        "details-16", "details", "A2-B1", "details", "Elevator direction",
        "Выбери направление после лифта.",
        "When you leave the elevator, turn right and your room is at the end of the corridor.",
        "Turn right.",
        COMMON_DETAILS_COACH,
        [
            opt("Turn right", "right after elevator", True, "Правильно: turn right after leaving the elevator."),
            opt("Turn left", "opposite direction", False, "Ошибка: left не звучало."),
            opt("Go downstairs", "wrong movement", False, "Ошибка: речь о corridor after elevator."),
            opt("Leave the hotel", "неверно", False, "Ошибка: нужно найти room."),
        ],
        True,
    ),
    task(
        "details-17", "details", "B1", "details", "Deposit refund",
        "Выбери срок возврата депозита.",
        "The deposit will be released within five to seven business days.",
        "5-7 business days.",
        COMMON_DETAILS_COACH,
        [
            opt("5-7 business days", "within five to seven", True, "Правильно: within five to seven business days."),
            opt("57 days", "misheard range", False, "Ошибка: five to seven = диапазон, не fifty-seven."),
            opt("2-3 days", "wrong range", False, "Ошибка: было five to seven."),
            opt("Immediately", "not stated", False, "Ошибка: deposit release takes 5-7 business days."),
        ],
        True,
    ),
    task(
        "details-18", "details", "B1", "details", "Minibar charge",
        "Выбери сумму mini-bar charge.",
        "There is a minibar charge of twenty-eight euros.",
        "28 euros.",
        COMMON_DETAILS_COACH,
        [
            opt("28 euros", "twenty-eight", True, "Правильно: twenty-eight = 28."),
            opt("82 euros", "eighty-two", False, "Ошибка: order reversed."),
            opt("18 euros", "eighteen", False, "Ошибка: eighteen не звучало."),
            opt("20 euros", "twenty only", False, "Ошибка: было twenty-eight."),
        ],
        True,
    ),
    task(
        "details-19", "details", "B1", "details", "Gate number",
        "Выбери выход для шаттла.",
        "The shuttle picks up guests at gate B twelve.",
        "Gate B12.",
        COMMON_DETAILS_COACH,
        [
            opt("Gate B12", "B twelve", True, "Правильно: B twelve = B12."),
            opt("Gate P12", "wrong letter", False, "Ошибка: было B, not P."),
            opt("Gate B20", "wrong number", False, "Ошибка: twelve = 12."),
            opt("Room B12", "wrong object", False, "Ошибка: shuttle gate, not room."),
        ],
        True,
    ),
    task(
        "details-20", "details", "A2-B1", "details", "Email domain",
        "Выбери email-домен.",
        "Please send it to maria dot hotel at example dot com.",
        "maria.hotel@example.com.",
        COMMON_DETAILS_COACH,
        [
            opt("maria.hotel@example.com", "dot and at heard correctly", True, "Правильно: dot = точка, at = @. Example: maria.hotel@example.com."),
            opt("maria@hotel.example.com", "different structure", False, "Ошибка: guest said maria dot hotel at example dot com."),
            opt("maria.hotel.example@com", "wrong at position", False, "Ошибка: at before example."),
            opt("hotel.maria@example.com", "name order changed", False, "Ошибка: order was maria dot hotel."),
        ],
        True,
    ),
    # Problems: 20
    task(
        "problems-01", "problems", "B1", "problem", "Dirty room",
        "Гость говорит, что номер не убран.",
        "My room has not been cleaned. There are towels on the floor.",
        "Apologize + housekeeping/change room.",
        COMMON_PROBLEM_COACH,
        [
            opt("I am sorry about that. I will send housekeeping right away, or we can change your room.", "сильное решение", True, "Правильно: есть apology и варианты решения. Example: “I will send housekeeping right away.”"),
            opt("It is not dirty.", "спор", False, "Ошибка: ты споришь с жалобой вместо действия."),
            opt("You should clean it.", "обвиняет гостя", False, "Ошибка: housekeeping is hotel responsibility."),
            opt("Come back next week.", "не решение", False, "Ошибка: проблему нужно решать сейчас."),
        ],
    ),
    task(
        "problems-02", "problems", "A2-B1", "problem", "Key card does not work",
        "Карта от номера не открывает дверь.",
        "My key card is not working. I cannot get into my room.",
        "Verify guest + recode key.",
        COMMON_PROBLEM_COACH,
        [
            opt("I am sorry. May I check your room number and name? I will recode the key for you.", "безопасно", True, "Правильно: сначала security check, потом recode the key. Example: “I will recode the key.”"),
            opt("Try harder.", "грубо", False, "Ошибка: не решает техническую проблему."),
            opt("It is your fault.", "обвинение", False, "Ошибка: guest needs help, not blame."),
            opt("I will call the police.", "слишком резко", False, "Ошибка: это обычная проблема key card."),
        ],
    ),
    task(
        "problems-03", "problems", "B1", "problem", "Noisy neighbors",
        "Гость жалуется на шум.",
        "The people next door are very loud. I cannot sleep.",
        "Apologize + contact guests/security.",
        COMMON_PROBLEM_COACH,
        [
            opt("I am sorry. I will contact them and ask them to keep the noise down.", "реалистично", True, "Правильно: ты берешь конфликт на себя. Example: “ask them to keep the noise down.”"),
            opt("You can shout at them.", "перекладывает конфликт", False, "Ошибка: guest should not solve it alone."),
            opt("Sleep in the lobby.", "плохой сервис", False, "Ошибка: нужно решить noise complaint."),
            opt("Loud people are normal.", "обесценивает", False, "Ошибка: так жалобы не закрывают."),
        ],
    ),
    task(
        "problems-04", "problems", "B1-B2", "problem", "Overbooking",
        "Свободного номера по брони нет.",
        "What do you mean there is no room? I booked it two weeks ago.",
        "Apologize + responsibility + alternative.",
        COMMON_PROBLEM_COACH,
        [
            opt("I am very sorry. We will arrange another room for you at a partner hotel and cover the transfer.", "кризисное решение", True, "Правильно: apology, responsibility, concrete alternative. Example: “cover the transfer.”"),
            opt("It happens. Goodbye.", "бросает гостя", False, "Ошибка: overbooking требует решения."),
            opt("You booked too early.", "обвиняет гостя", False, "Ошибка: guest did the right thing by booking early."),
            opt("I cannot do anything.", "не решение", False, "Ошибка: отель должен предложить альтернативу."),
        ],
    ),
    task(
        "problems-05", "problems", "B1", "checkout", "Wrong bill",
        "Гость видит лишний mini-bar charge.",
        "There is a minibar charge on my bill, but I did not use the minibar.",
        "Check charge + remove if incorrect.",
        COMMON_PROBLEM_COACH,
        [
            opt("I am sorry. Let me check that charge for you. If it is incorrect, I will remove it.", "честно и сервисно", True, "Правильно: ты проверяешь charge и обещаешь исправить, если ошибка."),
            opt("You must pay everything.", "слишком жестко", False, "Ошибка: сначала нужно проверить dispute."),
            opt("Minibar is always expensive.", "не отвечает", False, "Ошибка: проблема не цена, а wrong charge."),
            opt("Maybe your friend drank it.", "обвинительно", False, "Ошибка: звучит непрофессионально."),
        ],
    ),
    task(
        "problems-06", "problems", "B1", "problem", "No hot water",
        "Нет горячей воды перед встречей.",
        "There is no hot water in my room, and I have a meeting soon.",
        "Apologize + urgent maintenance + option.",
        COMMON_PROBLEM_COACH,
        [
            opt("I am sorry. I will send maintenance right away and check if another room is available.", "срочное решение", True, "Правильно: urgent action плюс backup option. Example: “right away.”"),
            opt("Use cold water.", "плохой сервис", False, "Ошибка: guest has a real problem."),
            opt("Hot water is not important.", "обесценивает", False, "Ошибка: для гостя это важно."),
            opt("Meetings are difficult.", "не решение", False, "Ошибка: нужно решить water issue."),
        ],
    ),
    task(
        "problems-07", "problems", "B1", "problem", "Air conditioning",
        "Кондиционер не работает.",
        "The air conditioning in my room is not working.",
        "Apologize + maintenance.",
        COMMON_PROBLEM_COACH,
        [
            opt("I am sorry. I will send maintenance to your room as soon as possible.", "прямое решение", True, "Правильно: apology + send maintenance. Example: “as soon as possible.”"),
            opt("Open the window.", "недостаточно", False, "Ошибка: может временно помочь, но не решает AC."),
            opt("Air conditioning is difficult.", "не сервисно", False, "Ошибка: гостю нужно action."),
            opt("You broke it.", "обвинение", False, "Ошибка: не начинаем с blame."),
        ],
    ),
    task(
        "problems-08", "problems", "B1", "problem", "Lost passport",
        "Гость потерял паспорт.",
        "I cannot find my passport. I may have left it in the lobby.",
        "Stay calm + lost and found + security.",
        COMMON_PROBLEM_COACH,
        [
            opt("I am sorry. Let me check lost and found and ask security to review the lobby area.", "правильный план", True, "Правильно: calm response + concrete steps. Example: “check lost and found.”"),
            opt("That is funny.", "неуместно", False, "Ошибка: passport loss is serious."),
            opt("Buy a new passport here.", "невозможно", False, "Ошибка: hotel cannot issue passports."),
            opt("Forget about it.", "опасно", False, "Ошибка: паспорт нужно искать и помогать."),
        ],
    ),
    task(
        "problems-09", "problems", "B1", "problem", "Double charged",
        "Гость считает, что оплатил дважды.",
        "I think I was charged twice for the room.",
        "Check payment records.",
        COMMON_PROBLEM_COACH,
        [
            opt("I am sorry. Let me check the payment records and compare the transactions.", "профессионально", True, "Правильно: payment issue требует проверки records. Example: “compare the transactions.”"),
            opt("Pay a third time.", "абсурдно", False, "Ошибка: усиливает проблему."),
            opt("Banks are strange.", "не решение", False, "Ошибка: нужно проверить transactions."),
            opt("You probably forgot.", "обвинение", False, "Ошибка: не обвиняем, проверяем."),
        ],
    ),
    task(
        "problems-10", "problems", "B1", "problem", "Room smells of smoke",
        "В номере запах сигарет.",
        "My room smells of smoke, but I booked a non-smoking room.",
        "Apologize + inspect/change room.",
        COMMON_PROBLEM_COACH,
        [
            opt("I am sorry. We will inspect the room and move you to another non-smoking room if available.", "хорошее решение", True, "Правильно: ты признаешь mismatch и предлагаешь room move."),
            opt("Just open the window.", "недостаточно", False, "Ошибка: guest booked non-smoking room."),
            opt("Smoke smells nice.", "неуместно", False, "Ошибка: это complaint."),
            opt("You booked smoking.", "спор без проверки", False, "Ошибка: сначала check booking/room."),
        ],
    ),
    task(
        "problems-11", "problems", "B1", "problem", "Elevator out of service",
        "Лифт не работает, у гостя тяжелый багаж.",
        "The elevator is out of service, and I have two heavy suitcases.",
        "Apologize + assistance.",
        COMMON_PROBLEM_COACH,
        [
            opt("I am sorry for the inconvenience. I will arrange assistance with your luggage.", "сервисное решение", True, "Правильно: inconvenience + assistance. Example: “arrange assistance.”"),
            opt("Carry them yourself.", "грубо", False, "Ошибка: не помогает."),
            opt("Suitcases are heavy.", "только повтор", False, "Ошибка: нужна помощь."),
            opt("Use the minibar.", "не по теме", False, "Ошибка: вопрос про elevator/luggage."),
        ],
    ),
    task(
        "problems-12", "problems", "B1", "problem", "Booking name mismatch",
        "Имя в брони не совпадает.",
        "The booking should be under Ivanov, but your system shows another name.",
        "Verify details + search alternate booking.",
        COMMON_PROBLEM_COACH,
        [
            opt("Let me check the booking details. Could you show me the confirmation email, please?", "правильная проверка", True, "Правильно: confirmation email помогает найти mismatch."),
            opt("Then you are not Ivanov.", "слишком резко", False, "Ошибка: может быть ошибка системы или агентства."),
            opt("Names are not important.", "опасно", False, "Ошибка: имена важны для security."),
            opt("Change your name.", "абсурдно", False, "Ошибка: не решение."),
        ],
    ),
    task(
        "problems-13", "problems", "B1", "problem", "Late taxi",
        "Такси опаздывает.",
        "The taxi you booked for me is ten minutes late.",
        "Apologize + call taxi company + update.",
        COMMON_PROBLEM_COACH,
        [
            opt("I am sorry. I will call the taxi company now and update you immediately.", "конкретное действие", True, "Правильно: ты берешь проблему в работу и обещаешь update."),
            opt("Ten minutes is nothing.", "обесценивает", False, "Ошибка: у гостя может быть flight/meeting."),
            opt("Run to the airport.", "не решение", False, "Ошибка: нужно call taxi or arrange alternative."),
            opt("Taxi is sleeping.", "непрофессионально", False, "Ошибка: не сервисный ответ."),
        ],
    ),
    task(
        "problems-14", "problems", "B1", "problem", "Restaurant closed",
        "Ресторан закрыт, гость голоден.",
        "The restaurant is closed, but I need something to eat.",
        "Offer alternatives.",
        COMMON_PROBLEM_COACH,
        [
            opt("I am sorry. Room service is available until eleven, and I can also recommend nearby restaurants.", "варианты решения", True, "Правильно: apology + alternatives. Example: “I can recommend nearby restaurants.”"),
            opt("Do not eat.", "грубо", False, "Ошибка: не помогает."),
            opt("The restaurant is closed, so life is closed.", "абсурдно", False, "Ошибка: нужно предложить alternatives."),
            opt("Breakfast was yesterday.", "не по теме", False, "Ошибка: guest needs food now."),
        ],
    ),
    task(
        "problems-15", "problems", "B1", "problem", "Safe locked",
        "Сейф в номере заблокирован.",
        "The safe in my room is locked, and my laptop is inside.",
        "Security procedure + help.",
        COMMON_PROBLEM_COACH,
        [
            opt("I am sorry. For security, I will send a manager to your room to help open the safe.", "безопасно", True, "Правильно: safe issue требует manager/security procedure."),
            opt("Tell me the code loudly.", "небезопасно", False, "Ошибка: нельзя просить код loudly."),
            opt("Break the safe.", "опасно", False, "Ошибка: нужен procedure."),
            opt("Laptops like safes.", "неуместно", False, "Ошибка: guest needs access."),
        ],
    ),
    task(
        "problems-16", "problems", "B1", "problem", "Wrong bed type",
        "Гость бронировал twin, получил double.",
        "We booked a twin room, but there is only one bed.",
        "Apologize + check/change room.",
        COMMON_PROBLEM_COACH,
        [
            opt("I am sorry. Let me check your booking and see if we can move you to a twin room.", "правильное решение", True, "Правильно: check booking + room change. Example: “move you to a twin room.”"),
            opt("One bed is enough.", "обесценивает", False, "Ошибка: guest requested twin room."),
            opt("Twin means one bed.", "неверно", False, "Ошибка: twin usually means two separate beds."),
            opt("Sleep on the floor.", "плохой сервис", False, "Ошибка: не решение."),
        ],
    ),
    task(
        "problems-17", "problems", "B1", "problem", "Internet down",
        "Wi-Fi не работает, гостю нужно работать.",
        "The Wi-Fi keeps disconnecting, and I need to join a video call.",
        "Apologize + technical help + alternative.",
        COMMON_PROBLEM_COACH,
        [
            opt("I am sorry. I will report it to our technician and can offer a workspace with a wired connection.", "решение и альтернатива", True, "Правильно: action + alternative for urgent work."),
            opt("Video calls are boring.", "неуместно", False, "Ошибка: guest needs connectivity."),
            opt("Disconnect your computer.", "не помогает", False, "Ошибка: проблема Wi-Fi."),
            opt("Internet is weather.", "неверно", False, "Ошибка: не сервисный ответ."),
        ],
    ),
    task(
        "problems-18", "problems", "B1", "problem", "Laundry lost",
        "Прачечная не вернула рубашку.",
        "One of my shirts is missing from the laundry.",
        "Apologize + check laundry + update.",
        COMMON_PROBLEM_COACH,
        [
            opt("I am sorry. I will contact the laundry service and update you as soon as possible.", "правильное действие", True, "Правильно: missing item требует check + update."),
            opt("Buy another shirt.", "плохой сервис", False, "Ошибка: hotel/laundry should investigate."),
            opt("Shirts disappear.", "непрофессионально", False, "Ошибка: обесценивает проблему."),
            opt("Laundry is closed forever.", "без проверки", False, "Ошибка: нужно contact laundry."),
        ],
    ),
    task(
        "problems-19", "problems", "B1", "problem", "Guest is sick",
        "Гостю плохо, нужна помощь.",
        "I feel very sick. Is there a doctor nearby?",
        "Offer medical help + emergency option.",
        COMMON_PROBLEM_COACH,
        [
            opt("I am sorry to hear that. I can call a doctor for you or help contact emergency services.", "безопасно", True, "Правильно: health issue требует serious help. Example: “call a doctor” or “emergency services.”"),
            opt("Sleep more.", "недостаточно", False, "Ошибка: может быть серьезно."),
            opt("Doctors are expensive.", "не первая реакция", False, "Ошибка: сначала помощь, потом details."),
            opt("Ask another guest.", "непрофессионально", False, "Ошибка: staff should help."),
        ],
    ),
    task(
        "problems-20", "problems", "B1-B2", "problem", "Angry guest escalation",
        "Гость злится из-за нескольких проблем.",
        "This is the third problem today. I want to speak to the manager.",
        "Acknowledge + manager + stay calm.",
        COMMON_PROBLEM_COACH,
        [
            opt("I understand your frustration. I will call the manager right away.", "деэскалация", True, "Правильно: ты признаешь эмоцию и выполняешь request. Example: “I understand your frustration.”"),
            opt("Calm down or leave.", "эскалация", False, "Ошибка: звучит угрожающе и ухудшает конфликт."),
            opt("The manager is imaginary.", "абсурдно", False, "Ошибка: guest requested manager."),
            opt("Problems are normal.", "обесценивает", False, "Ошибка: третья проблема требует серьезной реакции."),
        ],
    ),
    # Exam: 20
    task(
        "exam-01", "exam", "Mixed", "checkin", "Exam: first move",
        "Выбери лучшую следующую реплику.",
        "Hello. I think I have a booking for tonight.",
        "Ask for name politely.",
        COMMON_EXAM_COACH,
        [
            opt("May I have your name, please?", "правильно", True, "Правильно: booking ищем по имени. Example: “May I have your name, please?”"),
            opt("Do you want breakfast?", "слишком рано", False, "Ошибка: сначала booking."),
            opt("Leave your bags outside.", "не по ситуации", False, "Ошибка: не помогает check-in."),
            opt("Your bill is ready.", "это check-out", False, "Ошибка: guest is checking in."),
        ],
    ),
    task(
        "exam-02", "exam", "Mixed", "details", "Exam: detail",
        "Прослушай и выбери правильную карточку.",
        "The total is one hundred and fifteen euros.",
        "115 euros.",
        COMMON_EXAM_COACH,
        [
            opt("115 euros", "one hundred and fifteen", True, "Правильно: 115. Example: “one hundred and fifteen euros.”"),
            opt("150 euros", "fifty вместо fifteen", False, "Ошибка: fifteen = 15, fifty = 50."),
            opt("105 euros", "не то число", False, "Ошибка: five не звучало."),
            opt("15 euros", "пропущено hundred", False, "Ошибка: было one hundred."),
        ],
        True,
    ),
    task(
        "exam-03", "exam", "Mixed", "problem", "Exam: complaint",
        "Выбери лучший ответ на жалобу.",
        "The air conditioning in my room is not working.",
        "Apologize + send maintenance.",
        COMMON_EXAM_COACH,
        [
            opt("I am sorry. I will send maintenance to your room as soon as possible.", "правильно", True, "Правильно: complaint formula работает: apology + action."),
            opt("Open the window.", "недостаточно", False, "Ошибка: это не чинит кондиционер."),
            opt("Air conditioning is difficult.", "не помогает", False, "Ошибка: нет action."),
            opt("You broke it.", "обвинение", False, "Ошибка: нельзя обвинять гостя."),
        ],
    ),
    task(
        "exam-04", "exam", "Mixed", "checkout", "Exam: late check-out",
        "Гость просит поздний выезд.",
        "Could I check out at 2 p.m. instead of 11 a.m.?",
        "Check availability + possible fee.",
        COMMON_EXAM_COACH,
        [
            opt("Let me check availability. Late check-out may be possible for an extra fee.", "правильно", True, "Правильно: late check-out зависит от availability и fee."),
            opt("No, never.", "слишком резко", False, "Ошибка: сначала check availability."),
            opt("Yes, always free.", "опасное обещание", False, "Ошибка: may be fee."),
            opt("Check-in is at 3.", "не отвечает", False, "Ошибка: вопрос про check-out."),
        ],
    ),
    task(
        "exam-05", "exam", "Mixed", "listen", "Exam: spelling",
        "Прослушай фамилию и выбери подтверждение.",
        "The surname is Clarke. C-L-A-R-K-E.",
        "Clarke spelling.",
        COMMON_EXAM_COACH,
        [
            opt("Clarke, C-L-A-R-K-E.", "правильно", True, "Правильно: Clarke ends with E. Example: “C-L-A-R-K-E.”"),
            opt("Clark, C-L-A-R-K.", "нет E", False, "Ошибка: guest spelled final E."),
            opt("Clerk, C-L-E-R-K.", "другое слово", False, "Ошибка: surname Clarke, not clerk."),
            opt("Clock, C-L-O-C-K.", "другое слово", False, "Ошибка: не то spelling."),
        ],
        True,
    ),
    task(
        "exam-06", "exam", "Mixed", "problem", "Exam: key card",
        "Выбери правильное действие.",
        "My key card stopped working again.",
        "Apologize + verify + recode.",
        COMMON_EXAM_COACH,
        [
            opt("I am sorry. Let me verify your room number and recode the card for you.", "правильно", True, "Правильно: security first, then recode."),
            opt("Stop using doors.", "абсурдно", False, "Ошибка: не решает problem."),
            opt("It is not my card.", "не помогает", False, "Ошибка: ресепшен должен помочь."),
            opt("Pay for a new hotel.", "грубо", False, "Ошибка: key card fix is hotel service."),
        ],
    ),
    task(
        "exam-07", "exam", "Mixed", "details", "Exam: time",
        "Выбери время.",
        "The restaurant closes at quarter past ten.",
        "10:15.",
        COMMON_EXAM_COACH,
        [
            opt("10:15", "quarter past ten", True, "Правильно: quarter past ten = 10:15."),
            opt("9:45", "quarter to ten", False, "Ошибка: quarter to ten = 9:45."),
            opt("10:45", "quarter to eleven", False, "Ошибка: не past ten."),
            opt("10:30", "half past ten", False, "Ошибка: half past = :30."),
        ],
        True,
    ),
    task(
        "exam-08", "exam", "Mixed", "checkout", "Exam: receipt",
        "Гость просит receipt.",
        "Could I get a printed receipt, please?",
        "Provide receipt.",
        COMMON_EXAM_COACH,
        [
            opt("Certainly. I will print it for you now.", "правильно", True, "Правильно: короткий сервисный ответ. Example: “I will print it for you now.”"),
            opt("Receipts are private.", "неверно", False, "Ошибка: guest can receive receipt."),
            opt("Only by phone call.", "не по запросу", False, "Ошибка: guest asked printed receipt."),
            opt("Print your passport.", "неверно", False, "Ошибка: нужен receipt."),
        ],
    ),
    task(
        "exam-09", "exam", "Mixed", "problem", "Exam: noisy room",
        "Гость не может спать из-за шума.",
        "There is a loud party next door.",
        "Contact noisy room/security.",
        COMMON_EXAM_COACH,
        [
            opt("I am sorry. I will contact the room and security if needed.", "правильно", True, "Правильно: noise complaint needs staff action."),
            opt("Join the party.", "непрофессионально", False, "Ошибка: guest wants sleep."),
            opt("Parties are allowed everywhere.", "опасно", False, "Ошибка: hotel has quiet rules."),
            opt("Use earphones.", "не решение", False, "Ошибка: проблема в соседях."),
        ],
    ),
    task(
        "exam-10", "exam", "Mixed", "details", "Exam: room number",
        "Выбери room number.",
        "Your room is four oh six.",
        "406.",
        COMMON_EXAM_COACH,
        [
            opt("Room 406", "four oh six", True, "Правильно: oh = zero, four oh six = 406."),
            opt("Room 460", "four sixty", False, "Ошибка: 460 звучит differently."),
            opt("Room 416", "four sixteen", False, "Ошибка: sixteen не звучало."),
            opt("Room 604", "six oh four", False, "Ошибка: order reversed."),
        ],
        True,
    ),
    task(
        "exam-11", "exam", "Mixed", "checkin", "Exam: early arrival",
        "Гость приехал рано.",
        "We arrived early. Can we leave our luggage here?",
        "Offer luggage storage.",
        COMMON_EXAM_COACH,
        [
            opt("Yes, we can store your luggage until your room is ready.", "правильно", True, "Правильно: решает early arrival. Example: “until your room is ready.”"),
            opt("No luggage exists.", "абсурдно", False, "Ошибка: не отвечает."),
            opt("Only in the restaurant oven.", "неприемлемо", False, "Ошибка: luggage room/storage."),
            opt("Come back last year.", "бессмысленно", False, "Ошибка: не сервисный ответ."),
        ],
    ),
    task(
        "exam-12", "exam", "Mixed", "listen", "Exam: allergy",
        "Прослушай и выбери безопасный ответ.",
        "I have a seafood allergy. Could you tell the kitchen?",
        "Inform kitchen.",
        COMMON_EXAM_COACH,
        [
            opt("Of course. I will inform the kitchen about your seafood allergy.", "правильно", True, "Правильно: allergy = safety issue, нужно передать kitchen."),
            opt("Seafood is everywhere.", "опасно", False, "Ошибка: игнорирует allergy."),
            opt("Tell the elevator.", "не по теме", False, "Ошибка: kitchen should know."),
            opt("Eat more seafood.", "опасно", False, "Ошибка: нельзя советовать аллерген."),
        ],
        True,
    ),
    task(
        "exam-13", "exam", "Mixed", "checkout", "Exam: dispute charge",
        "Гость спорит со счетом.",
        "I do not recognize this parking charge.",
        "Check disputed charge.",
        COMMON_EXAM_COACH,
        [
            opt("Let me check that charge for you and verify it with our records.", "правильно", True, "Правильно: disputed charge = check records."),
            opt("Recognize it now.", "грубо", False, "Ошибка: не сервисно."),
            opt("Parking is a room.", "неверно", False, "Ошибка: не отвечает."),
            opt("All charges are mysterious.", "непрофессионально", False, "Ошибка: нужно проверить."),
        ],
    ),
    task(
        "exam-14", "exam", "Mixed", "details", "Exam: date",
        "Выбери дату.",
        "Your departure date is the thirtieth of April.",
        "30 April.",
        COMMON_EXAM_COACH,
        [
            opt("30 April", "thirtieth", True, "Правильно: thirtieth = 30th."),
            opt("13 April", "thirteenth", False, "Ошибка: thirteenth = 13th."),
            opt("3 April", "third", False, "Ошибка: third = 3rd."),
            opt("20 April", "twentieth", False, "Ошибка: twentieth = 20th."),
        ],
        True,
    ),
    task(
        "exam-15", "exam", "Mixed", "problem", "Exam: smoke smell",
        "Гость жалуется на запах дыма.",
        "The room smells of smoke, but I requested non-smoking.",
        "Apologize + room solution.",
        COMMON_EXAM_COACH,
        [
            opt("I am sorry. Let me check another non-smoking room for you.", "правильно", True, "Правильно: recognizes issue and offers room solution."),
            opt("Smoke is normal.", "обесценивает", False, "Ошибка: non-smoking request нарушен."),
            opt("Smoke outside then.", "не отвечает", False, "Ошибка: проблема запах в комнате."),
            opt("Buy perfume.", "плохой сервис", False, "Ошибка: hotel should solve room issue."),
        ],
    ),
    task(
        "exam-16", "exam", "Mixed", "checkin", "Exam: pet policy",
        "Гость спрашивает про питомца.",
        "Is there an extra fee for my dog?",
        "Explain/check pet fee.",
        COMMON_EXAM_COACH,
        [
            opt("Let me check the pet fee for you. It may include an additional cleaning charge.", "правильно", True, "Правильно: pet fee may vary; cleaning charge is a useful explanation."),
            opt("Dogs pay by card.", "абсурдно", False, "Ошибка: не отвечает."),
            opt("Your dog is a guest manager.", "бессмысленно", False, "Ошибка: нужен fee policy."),
            opt("No animals have fees anywhere.", "опасное обобщение", False, "Ошибка: pet fees differ by hotel."),
        ],
    ),
    task(
        "exam-17", "exam", "Mixed", "details", "Exam: booking code",
        "Выбери booking code.",
        "The reference is M as in Madrid, R as in Rome, three eight.",
        "MR38.",
        COMMON_EXAM_COACH,
        [
            opt("MR38", "M-R-three-eight", True, "Правильно: M as in Madrid, R as in Rome, three eight."),
            opt("RM38", "letters reversed", False, "Ошибка: order was M then R."),
            opt("MR83", "digits reversed", False, "Ошибка: three eight, not eight three."),
            opt("NR38", "wrong first letter", False, "Ошибка: M as in Madrid."),
        ],
        True,
    ),
    task(
        "exam-18", "exam", "Mixed", "problem", "Exam: sick guest",
        "Гость просит врача.",
        "Could you call a doctor? I feel dizzy.",
        "Call doctor/emergency help.",
        COMMON_EXAM_COACH,
        [
            opt("Of course. I will call a doctor for you right away. If it is urgent, we can contact emergency services.", "правильно", True, "Правильно: health issue needs immediate help and emergency option."),
            opt("Drink coffee.", "опасно", False, "Ошибка: dizzy может быть серьезно."),
            opt("Doctors are busy.", "не решение", False, "Ошибка: нужно помочь contact doctor."),
            opt("Ask tomorrow.", "опасно", False, "Ошибка: health issue сейчас."),
        ],
    ),
    task(
        "exam-19", "exam", "Mixed", "listen", "Exam: restaurant table",
        "Прослушай и выбери детали брони.",
        "Please book a table for four at seven forty-five.",
        "Table for four at 7:45.",
        COMMON_EXAM_COACH,
        [
            opt("A table for four at 7:45.", "правильно", True, "Правильно: for four + seven forty-five."),
            opt("A room for four at 7:15.", "не та услуга и время", False, "Ошибка: table, not room; forty-five, not fifteen."),
            opt("A table for fourteen at 7:45.", "four vs fourteen", False, "Ошибка: было for four."),
            opt("A taxi for four at 7:45.", "не та услуга", False, "Ошибка: book a table."),
        ],
        True,
    ),
    task(
        "exam-20", "exam", "Mixed", "checkout", "Exam: farewell",
        "Выбери финальную фразу после check-out.",
        "Thank you for your help. We are leaving now.",
        "Polite farewell.",
        COMMON_EXAM_COACH,
        [
            opt("Thank you for staying with us. Have a safe trip.", "правильно", True, "Правильно: polite farewell closes the service interaction."),
            opt("Finally you leave.", "грубо", False, "Ошибка: звучит оскорбительно."),
            opt("Check in tomorrow yesterday.", "бессмысленно", False, "Ошибка: нет смысла."),
            opt("Pay again outside.", "неверно", False, "Ошибка: check-out already finished."),
        ],
    ),
]


def write_data() -> None:
    DATA_FILE.write_text(
        "window.TRAINER_TASKS = "
        + json.dumps(TASKS, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )


def tts_text(spoken: str) -> str:
    return spoken


async def generate_audio() -> None:
    AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    start_at = os.environ.get("HST_START_AT", "")
    skipping = bool(start_at)
    for idx, item in enumerate(TASKS):
        if skipping:
            if item["id"] != start_at:
                continue
            skipping = False
        out = AUDIO_DIR / f"{item['id']}.mp3"
        voice, rate, pitch = VOICE_ROTATION[idx % len(VOICE_ROTATION)]
        for attempt in range(1, 4):
            try:
                communicate = edge_tts.Communicate(
                    tts_text(str(item["spoken"])),
                    voice=voice,
                    rate=rate,
                    pitch=pitch,
                )
                await asyncio.wait_for(communicate.save(str(out)), timeout=60)
                print(f"audio: {out.name} ({voice}, rate {rate}, pitch {pitch})", flush=True)
                break
            except TimeoutError:
                if attempt == 3:
                    raise
                print(f"retry: {out.name} after timeout ({attempt}/3)", flush=True)


async def main() -> None:
    write_data()
    await generate_audio()
    print(f"tasks: {len(TASKS)}", flush=True)
    print(f"data: {DATA_FILE}", flush=True)
    print(f"audio: {AUDIO_DIR}", flush=True)


if __name__ == "__main__":
    asyncio.run(main())
