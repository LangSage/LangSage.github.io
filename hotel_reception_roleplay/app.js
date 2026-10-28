/* Ordered source-script excerpts, with one selected spoken alternative. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const scene = new ReceptionScene($('scene'));
  let lessons=[], role='receptionist', active=0;
  let audio=null, audioVersion=0, sound=false, review=null, reviewPosition=0;
  let reviewSolved=false, reviewWrong=new Set(), choices=[];
  const progress={receptionist:[],guest:[]};
  const normalize=value=>String(value||'').replace(/\s+/g,' ').trim();
  function brief(value){
    let text=normalize(value).split(/(?<=[.!?])\s+/)[0];
    if(text.length>90&&text.includes('('))text=text.slice(0,text.indexOf('(')).trim();
    if(text.length>90){const end=text.lastIndexOf(' ',88);text=text.slice(0,end>0?end:88)+'…';}return text;
  }
  const roleName=()=>role==='guest'?'Гость':'Администратор';
  const state=()=>progress[role][active];
  const tasks=()=>lessons[active].tasks;
  const currentIndex=()=>review?review[reviewPosition]:state().position;
  const current=()=>tasks()[currentIndex()];
  const solved=()=>review?reviewSolved:state().solved.has(currentIndex());
  const wrongChoices=()=>review?reviewWrong:state().wrong.get(currentIndex())||new Set();
  const fresh=()=>({position:0,solved:new Set(),wrong:new Map()});

  // Break only at existing whitespace in the selected source variant.
  function chunks(text) {
    const words=[...text.matchAll(/\S+/g)], result=[];
    for(let start=0;start<words.length;){
      let end=Math.min(start+14,words.length);
      while(end>start+4&&words[end-1].index+words[end-1][0].length-words[start].index>105)end--;
      if(end<words.length)for(let i=end-1;i>start+5;i--){
        if(/[.!?;]$/.test(words[i][0])&&!/^(Mr|Mrs|Ms|Dr|a\.m|p\.m)\.$/i.test(words[i][0])){end=i+1;break;}
      }
      result.push(text.slice(words[start].index,words[end-1].index+words[end-1][0].length));start=end;
    }
    return result;
  }
  function makeTasks(lesson){
    return lesson.steps.filter(step=>/[A-Za-zА-Яа-яЁё]/.test(step.text)).flatMap(step=>chunks(normalize(step.practiceText||step.text)).map((text,index,array)=>({
      id:`${step.id}:${index}`,step,text,part:index+1,parts:array.length
    })));
  }
  function shuffled(values){
    const result=[...values];for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;
  }
  function getChoices(task){
    const source=normalize(task.step.originalText||task.step.text);
    const candidates=lessons.flatMap(l=>l.tasks).filter(t=>t.step.kind===task.step.kind&&t.parts===1&&t.step.id!==task.step.id&&
      t.text!==task.text&&!source.includes(t.text)&&t.text.length<=(task.step.kind==='action'?110:65)&&
      (!task.step.instruction||t.step.instruction!==task.step.instruction));
    const unique=[...new Map(candidates.map(t=>[t.text,t])).values()];
    return shuffled([task,...shuffled(unique).slice(0,2)]);
  }
  function actionFor(task){
    const text=`${task.text} ${task.step.instruction||''}`.toLowerCase();
    if(/копи|скан|\bcopy\b|\bscan\b/.test(text))return'scan';
    if(/возврат.*документ|возвращ.*документ|\bhere are your documents\b/.test(text))return'passport';
    if(/паспорт|\bpassport\b/.test(text))return'passport';
    if(/подпис|подпись|\bsign\b|\bsignature\b/.test(text))return'sign';
    if(/ключ|\bkey\b/.test(text))return'key';
    if(/\breceipt\b|\binvoice\b|чек/.test(text))return'receipt';
    if(/\bpay\b|оплат|расчёт|расчет/.test(text))return'payment';
    if(/\bluggage\b|багаж/.test(text))return'luggage';
    if(/\b(call|inform|send|contact)\b|вызыва|сообщает|связыва/.test(text))return'call';
    if(/\breservation\b|\bbooking\b|брони|провер/.test(text))return'booking';
    if(/\b(goodbye|nice day|see you again)\b|прощ/.test(text))return'farewell';return null;
  }
  function directionFor(task,action){
    if(action==='passport'){
      const giving=/возвращ|возврат|\bhere are your documents\b/i.test(`${task.text} ${task.step.instruction}`);
      return{direction:giving===(role==='receptionist')?'give':'receive'};
    }
    if(action==='key'){
      const receiving=/забира|\bcan i see\b/i.test(`${task.text} ${task.step.instruction}`);
      return{direction:receiving===(role==='receptionist')?'receive':'give'};
    }return{};
  }
  function stopAudio(){
    audioVersion++;if(audio){audio.pause();audio.removeAttribute('src');audio.load();audio=null;}
    if('speechSynthesis'in window)speechSynthesis.cancel();$('audio-status').textContent='';
  }
  function listen(slow=false){
    const task=current();if(task.step.kind==='action')return;
    stopAudio();const version=audioVersion;let failed=false;
    const fallback=()=>{
      if(version!==audioVersion||failed)return;failed=true;if(audio){audio.pause();audio=null;}
      if(!('speechSynthesis'in window)){$('audio-status').textContent='Аудио недоступно.';return;}
      const utterance=new SpeechSynthesisUtterance(task.step.practiceText||task.step.text);utterance.lang='en-GB';utterance.rate=slow?.75:.95;
      utterance.onstart=()=>{if(version===audioVersion)$('audio-status').textContent='Озвучка скрипта.';};speechSynthesis.speak(utterance);
    };
    if(!task.step.audio||(task.step.practiceText&&task.step.speechText!==task.step.practiceText)){fallback();return;}
    const recording=new Audio(task.step.audio);audio=recording;recording.playbackRate=slow?.78:1;
    recording.onplaying=()=>{if(version===audioVersion)$('audio-status').textContent=slow?'Медленная озвучка скрипта.':'Озвучка скрипта.';};
    recording.onerror=fallback;recording.onended=()=>{if(version===audioVersion)audio=null;};recording.play().catch(fallback);
  }
  function setFeedback(kind,text){
    $('feedback').className=`feedback${kind?' '+kind:''}`;$('feedback-icon').textContent=kind==='success'?'✓':kind==='error'?'↻':'';$('feedback-text').textContent=text;
  }
  function explain(task){
    const context=brief(task.step.instruction),translation=brief(task.step.practiceTranslation||task.step.translation);
    if(context)return`Верно. ${context}${/[.!?]$/.test(context)?'':'.'}`;
    return translation.length<=180?`Верно. ${translation}`:'Верно: эта реплика продолжает исходный скрипт в нужном порядке.';
  }
  function updateProgress(){
    const count=progress[role].reduce((sum,s)=>sum+s.solved.size,0),total=lessons.reduce((sum,l)=>sum+l.tasks.length,0);
    $('total-label').textContent=`${count} / ${total}`;$('total-progress').max=total;$('total-progress').value=count;
  }
  function syncChoices(){
    const done=solved(),wrong=wrongChoices(),task=current();
    $('exercise').classList.toggle('is-solved',done);$('exercise').classList.toggle('has-error',!done&&wrong.size>0);
    [...$('answers').children].forEach((button,index)=>{
      const correct=done&&choices[index].id===task.id;
      button.classList.toggle('correct',correct);button.classList.toggle('wrong',wrong.has(choices[index].id));
      button.disabled=done||wrong.has(choices[index].id);button.querySelector('.answer-number').textContent=correct?'✓':wrong.has(choices[index].id)?'×':index+1;
    });$('next').disabled=!done;$('source-details').hidden=!done;
  }
  function render(focus=false){
    stopAudio();scene.stop();const lesson=lessons[active],task=current();
    $('exercise').hidden=false;$('results').hidden=true;$('lesson-select').value=String(active);
    $('exercise').dataset.scriptId=lesson.id;$('exercise').dataset.taskId=task.id;
    $('role-label').textContent=roleName();$('view-label').textContent=role==='guest'?'Вид гостя':'Вид администратора';
    $('scenario-label').textContent=lesson.title;
    $('step-label').textContent=review?`${reviewPosition+1} / ${review.length}`:`${state().position+1} / ${tasks().length}`;
    $('source-link').href=lesson.sourceUrl;$('source-link').textContent=`Скрипт · шаг ${task.step.sourceStep}${task.parts>1?' · часть '+task.part+'/'+task.parts:''}`;
    const hearing=role==='guest'&&task.step.kind!=='action'&&!solved();
    const previous=currentIndex()>0?tasks()[currentIndex()-1]:null;
    const context=task.part>1&&previous?previous.text:brief(task.step.instruction)||task.step.guestText||
      (previous?previous.text:'Начните разговор по скрипту.');
    $('speaker-label').textContent=task.step.kind==='action'?'Следующее действие':hearing?'Receptionist says':task.part>1?'Продолжите реплику':'Ситуация';
    $('prompt').textContent=hearing?'Слушайте администратора. Выберите его реплику.':context;
    $('prompt').lang=hearing||/[А-Яа-я]/.test(context)?'ru':'en';if(!hearing)window.LangSageGlossary?.decorate($('prompt'));
    $('answer-instruction').textContent=hearing?'Выберите услышанную реплику':'Выберите ответ по скрипту';
    $('listen').disabled=task.step.kind==='action';$('listen-slow').disabled=task.step.kind==='action';
    $('role-hint').textContent=`Ваша роль: ${roleName()}`;
    choices=getChoices(task);$('answers').replaceChildren(...choices.map((choice,index)=>{
      const button=document.createElement('button');button.type='button';button.className='answer';
      const number=document.createElement('span');number.className='answer-number';number.setAttribute('aria-hidden','true');number.textContent=index+1;
      const label=document.createElement('span');
      label.textContent=choice.step.kind==='action'&&choice.text.length>55?choice.text.slice(0,choice.text.lastIndexOf(' ',53))+'…':choice.text;
      button.setAttribute('aria-label',choice.text);button.append(number,label);button.addEventListener('click',()=>answer(choice));return button;
    }));
    setFeedback(solved()?'success':'',solved()?explain(task):'');
    $('next').textContent=(review?reviewPosition+1===review.length:state().position+1===tasks().length)?'Итоги →':'Далее →';
    scene.set({role,person:0,mood:solved()?'happy':'neutral'});
    document.querySelectorAll('[data-role-choice]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.roleChoice===role)));
    syncChoices();updateProgress();if(focus)$('prompt').focus({preventScroll:true});if(sound&&task.step.kind!=='action')listen();
  }
  function answer(choice){
    if(!choice||solved()||wrongChoices().has(choice.id))return;const task=current(),right=choice.id===task.id;stopAudio();
    if(right){
      if(review)reviewSolved=true;else state().solved.add(currentIndex());setFeedback('success',explain(task));
      if(role==='guest'){$('prompt').textContent='Реплика найдена.';$('prompt').lang='ru';}
      scene.react(true);const action=actionFor(task);if(action)scene.play(action,directionFor(task,action));if(sound&&task.step.kind!=='action')listen();
    }else{
      const wrong=wrongChoices();wrong.add(choice.id);if(!review)state().wrong.set(currentIndex(),wrong);
      const context=brief(task.step.instruction||task.step.practiceTranslation||task.step.translation),other=brief(choice.step.instruction);
      const reason=other?'Это другой шаг: '+other.replace(/[.!?]+$/,'')+'.':'Эта реплика относится к другому шагу скрипта.';
      setFeedback('error',`${reason}${context?' Сейчас: '+context.replace(/[.!?]+$/,'')+'.':''} Попробуйте ещё раз.`);scene.react(false);
    }syncChoices();updateProgress();if(right)$('next').focus({preventScroll:true});
  }
  function next(){
    if(!solved())return;
    if(review){if(++reviewPosition===review.length){review=null;showResults(true);return;}reviewSolved=false;reviewWrong=new Set();}
    else if(state().position+1<tasks().length)state().position++;else{showResults();return;}render(true);
  }
  function showResults(repeated=false){
    stopAudio();scene.stop();$('exercise').hidden=true;$('results').hidden=false;
    $('result-title').textContent=repeated?'Трудные фразы отработаны':'Скрипт пройден';$('result-description').textContent=lessons[active].title;
    $('stat-first').textContent=state().solved.size-state().wrong.size;$('stat-mistakes').textContent=[...state().wrong.values()].reduce((sum,set)=>sum+set.size,0);
    $('stat-total').textContent=tasks().length;$('review').hidden=!state().wrong.size;$('next-lesson').hidden=active+1===lessons.length;$('result-title').focus({preventScroll:true});
  }
  function selectLesson(index){active=index;review=null;render(true);}
  $('next').addEventListener('click',next);$('listen').addEventListener('click',()=>listen());$('listen-slow').addEventListener('click',()=>listen(true));
  $('source-details').addEventListener('click',()=>{
    const task=current();$('original-text').textContent=task.step.practiceText||task.step.originalText||task.step.text;$('original-translation').textContent=task.step.practiceTranslation||task.step.translation||'';
    $('original-notes').textContent=[task.step.instruction,task.step.notes].filter(Boolean).join(' ');$('original-source').href=lessons[active].sourceUrl;$('original-dialog').showModal();
  });
  $('close-original').addEventListener('click',()=>$('original-dialog').close());
  $('lesson-select').addEventListener('change',event=>selectLesson(Number(event.target.value)));
  document.querySelectorAll('[data-role-choice]').forEach(button=>button.addEventListener('click',()=>{
    if(role===button.dataset.roleChoice)return;role=button.dataset.roleChoice;review=null;render(true);
  }));
  $('sound-toggle').addEventListener('click',()=>{
    sound=!sound;$('sound-toggle').setAttribute('aria-pressed',String(sound));$('sound-toggle').textContent=sound?'Звук: вкл.':'Звук: выкл.';if(sound)listen();else stopAudio();
  });
  $('restart').addEventListener('click',()=>{progress[role][active]=fresh();review=null;render(true);});
  $('next-lesson').addEventListener('click',()=>selectLesson(active+1));
  $('review').addEventListener('click',()=>{review=[...state().wrong.keys()].sort((a,b)=>a-b);reviewPosition=0;reviewSolved=false;reviewWrong=new Set();render(true);});
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'){stopAudio();return;}
    if(event.repeat||event.ctrlKey||event.metaKey||event.altKey||!lessons.length||$('exercise').hidden||$('original-dialog').open||event.target.closest('input,select,textarea'))return;
    if(/^[123]$/.test(event.key)){event.preventDefault();answer(choices[Number(event.key)-1]);}
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden){stopAudio();scene.stop();}});window.addEventListener('pagehide',()=>{stopAudio();scene.stop();});
  async function load(){
    try{
      const response=await fetch('scripts-data.json?v=3');if(!response.ok)throw Error('Script data unavailable');
      const data=await response.json();
      lessons=data.lessons.map(lesson=>({...lesson,tasks:makeTasks(lesson)})).filter(l=>l.tasks.length);if(!lessons.length)throw Error('No source scripts');
      for(const r of ['guest','receptionist'])progress[r]=lessons.map(fresh);
      $('lesson-select').replaceChildren(...lessons.map((lesson,index)=>{const option=document.createElement('option');option.value=String(index);option.textContent=lesson.title;return option;}));
      $('loading').hidden=true;$('lesson-controls').hidden=false;render();
    }catch(error){$('loading').textContent='Не удалось загрузить скрипты. Обновите страницу.';console.error(error);}
  }load();
})();
