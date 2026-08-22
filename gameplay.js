/* DNTL ART — gameplay layer v3
   Keeps the original oracle intact and adds short-session game loops,
   cinephile depth, tonight filtering, a cinematic passport and richer export. */

const GAME_COPY = {
  es:{
    modeLabel:'ELIGE CÓMO JUGAR', quick:'1 MINUTO', quickSub:'3 películas · 1 revelación', cine:'CINÉFILO', cineSub:'contra tu propio canon', tonight:'ESTA NOCHE', tonightSub:'una película que sí te cabe',
    round:'RONDA', reel:'REEL', quickPrompt:'Decide por instinto.', seen:'YA LA VI', watch:'WATCHLIST +', maybe:'QUIZÁ', pass:'PASO', rateSeen:'¿Cómo quedó en tu memoria?',
    meh:'5 · tibia', good:'8 · muy buena', love:'10 · me marcó', wildcard:'↯ wildcard', depth:'PROFUNDIDAD', minuteHint:'Tres decisiones. Luego el oráculo te devuelve algo sobre ti.',
    timeLabel:'¿Cuánto tiempo tienes?', min90:'≤ 90 MIN', min120:'≤ 120 MIN', any:'SIN LÍMITE', tonightHint:'El oráculo respetará tu ventana de tiempo.',
    passportEyebrow:'YOUR CINEMATIC PASSPORT', passportTitle:'Tres decisiones ya dibujan una sombra.', dominant:'VIDA DOMINANTE', gaze:'TU MIRADA', canon:'RELACIÓN CON EL CANON', nextFilm:'SIGUIENTE PELÍCULA',
    continue:'jugar 3 más ↻', share:'compartir resultado', copied:'resultado copiado ✓', frontier:'frontera abierta', explorer:'explorador familiar', deepCanon:'canon profundo',
    gazeSystems:'sistemas + evidencia', gazeForm:'forma + composición', gazeRhythm:'ritmo + intensidad', gazeUnknown:'ideas + lo desconocido', gazeLanguage:'lenguaje + estructura', gazeCraft:'oficio + impulso',
    depth1:'entrada', depth2:'desvío', depth3:'fuera del centro', quickSaved:'guardado · siguiente vida →', passportReady:'pasaporte desbloqueado', playMode:'Modo de juego', reaction:'Reacción rápida', oracleDepth:'Profundidad', runtimeFilter:'Filtro de duración', runId:'Run ID',
    noPick:'sigue jugando para encontrarla', shareLead:'Mi Otra Vida cinematográfica', shareLink:'Juega aquí'
  },
  en:{
    modeLabel:'CHOOSE HOW TO PLAY', quick:'1 MINUTE', quickSub:'3 films · 1 reveal', cine:'CINEPHILE', cineSub:'play against your canon', tonight:'TONIGHT', tonightSub:'a film that actually fits',
    round:'ROUND', reel:'REEL', quickPrompt:'Decide by instinct.', seen:'SEEN IT', watch:'WATCHLIST +', maybe:'MAYBE', pass:'PASS', rateSeen:'How did it stay in your memory?',
    meh:'5 · lukewarm', good:'8 · very good', love:'10 · stayed with me', wildcard:'↯ wildcard', depth:'DEPTH', minuteHint:'Three decisions. Then the oracle gives something back about you.',
    timeLabel:'How much time do you have?', min90:'≤ 90 MIN', min120:'≤ 120 MIN', any:'NO LIMIT', tonightHint:'The oracle will respect your time window.',
    passportEyebrow:'YOUR CINEMATIC PASSPORT', passportTitle:'Three decisions already cast a shadow.', dominant:'DOMINANT LIFE', gaze:'YOUR GAZE', canon:'RELATION TO CANON', nextFilm:'NEXT FILM',
    continue:'play 3 more ↻', share:'share result', copied:'result copied ✓', frontier:'open frontier', explorer:'familiar explorer', deepCanon:'deep canon',
    gazeSystems:'systems + evidence', gazeForm:'form + composition', gazeRhythm:'rhythm + intensity', gazeUnknown:'ideas + the unknown', gazeLanguage:'language + structure', gazeCraft:'craft + momentum',
    depth1:'entry', depth2:'detour', depth3:'off-center', quickSaved:'saved · next life →', passportReady:'passport unlocked', playMode:'Play mode', reaction:'Quick reaction', oracleDepth:'Depth', runtimeFilter:'Runtime filter', runId:'Run ID',
    noPick:'keep playing to find it', shareLead:'My cinematic Other Life', shareLink:'Play here'
  },
  de:{
    modeLabel:'WÄHLE DEIN SPIEL', quick:'1 MINUTE', quickSub:'3 Filme · 1 Enthüllung', cine:'CINEPHIL', cineSub:'gegen den eigenen Kanon', tonight:'HEUTE ABEND', tonightSub:'ein Film, der wirklich passt',
    round:'RUNDE', reel:'ROLLE', quickPrompt:'Entscheide nach Instinkt.', seen:'KENNE ICH', watch:'WATCHLIST +', maybe:'VIELLEICHT', pass:'WEITER', rateSeen:'Wie ist er dir im Gedächtnis geblieben?',
    meh:'5 · lauwarm', good:'8 · sehr gut', love:'10 · blieb bei mir', wildcard:'↯ wildcard', depth:'TIEFE', minuteHint:'Drei Entscheidungen. Dann gibt dir das Orakel etwas über dich zurück.',
    timeLabel:'Wie viel Zeit hast du?', min90:'≤ 90 MIN', min120:'≤ 120 MIN', any:'OHNE LIMIT', tonightHint:'Das Orakel respektiert dein Zeitfenster.',
    passportEyebrow:'DEIN KINEMATOGRAFISCHER PASS', passportTitle:'Drei Entscheidungen werfen bereits einen Schatten.', dominant:'DOMINANTES LEBEN', gaze:'DEIN BLICK', canon:'BEZIEHUNG ZUM KANON', nextFilm:'NÄCHSTER FILM',
    continue:'3 weitere spielen ↻', share:'Ergebnis teilen', copied:'Ergebnis kopiert ✓', frontier:'offene Grenze', explorer:'vertrauter Entdecker', deepCanon:'tiefer Kanon',
    gazeSystems:'Systeme + Evidenz', gazeForm:'Form + Komposition', gazeRhythm:'Rhythmus + Intensität', gazeUnknown:'Ideen + das Unbekannte', gazeLanguage:'Sprache + Struktur', gazeCraft:'Handwerk + Impuls',
    depth1:'Einstieg', depth2:'Umweg', depth3:'abseits des Zentrums', quickSaved:'gespeichert · nächstes Leben →', passportReady:'Pass freigeschaltet', playMode:'Spielmodus', reaction:'Schnelle Reaktion', oracleDepth:'Tiefe', runtimeFilter:'Längenfilter', runId:'Run ID',
    noPick:'spiele weiter, um ihn zu finden', shareLead:'Mein kinematografisches anderes Leben', shareLink:'Hier spielen'
  }
};

const GAME_STATE_KEY='dntl_art_game_state_v3';
const GAME_MODES={quick:'quick',cine:'cinephile',tonight:'tonight'};
const gameT=(key)=>GAME_COPY[lang]?.[key]||GAME_COPY.es[key]||key;
const gameUuid=()=>crypto.randomUUID?crypto.randomUUID():`run_${Date.now()}_${Math.random().toString(16).slice(2)}`;

let gameState=loadGameState();
if(!gameState.runId) gameState.runId=gameUuid();
if(!gameState.mode) gameState.mode=GAME_MODES.quick;
if(!gameState.runtimeMax) gameState.runtimeMax=120;
persistGameState();

const originalRandomMovie=randomMovie;
const originalShowMovie=showMovie;

function loadGameState(){
  try{return JSON.parse(localStorage.getItem(GAME_STATE_KEY))||{}}catch{return{}}
}
function persistGameState(){localStorage.setItem(GAME_STATE_KEY,JSON.stringify(gameState))}
function runRows(){return session.filter(r=>r.run_id===gameState.runId)}
function oracleDepth(movie){
  if(!movie)return 1;
  let score=0;
  if(movie.year<1990)score+=2;else if(movie.year<2005)score+=1;
  if(!String(movie.country||'').toUpperCase().includes('USA'))score+=2;
  if(movie.runtime>=150)score+=1;
  return score>=4?3:score>=2?2:1;
}
function depthLabel(movie){return gameT(`depth${oracleDepth(movie)}`)}
function accepted(row){return Number(row.score)>=7}

// Bias selection by mode while preserving the original catalogue.
randomMovie=function(life,exclude){
  let pool=life.movies.filter(x=>x.title!==exclude);
  const already=new Set(session.map(r=>r.movie));
  const fresh=pool.filter(x=>!already.has(x.title));
  if(fresh.length)pool=fresh;
  if(gameState.mode===GAME_MODES.cine){
    const deeper=pool.filter(x=>oracleDepth(x)>=2);
    if(deeper.length)pool=deeper;
  }
  if(gameState.mode===GAME_MODES.tonight&&gameState.runtimeMax){
    const timed=pool.filter(x=>x.runtime<=Number(gameState.runtimeMax));
    if(timed.length)pool=timed;
  }
  return pool[Math.floor(Math.random()*pool.length)]||originalRandomMovie(life,exclude);
};

showMovie=function(reset=true){
  originalShowMovie(reset);
  enhanceCurrentMovie();
};

function injectGameplayUI(){
  if(!document.querySelector('link[href="gameplay.css"]')){
    const link=document.createElement('link');link.rel='stylesheet';link.href='gameplay.css';document.head.appendChild(link);
  }

  const grid=document.querySelector('.game-grid');
  if(grid&&!$('#gameModes')){
    const modes=document.createElement('section');modes.id='gameModes';modes.className='game-modes';
    modes.innerHTML=`
      <div class="mode-head"><span id="modeLabel"></span><span id="minuteHint"></span></div>
      <div class="mode-grid">
        <button type="button" class="mode-card" data-mode="quick"><strong id="modeQuick"></strong><small id="modeQuickSub"></small></button>
        <button type="button" class="mode-card" data-mode="cinephile"><strong id="modeCine"></strong><small id="modeCineSub"></small></button>
        <button type="button" class="mode-card" data-mode="tonight"><strong id="modeTonight"></strong><small id="modeTonightSub"></small></button>
      </div>
      <div id="tonightControls" class="tonight-controls hidden">
        <span id="timeLabel"></span>
        <div class="time-pills">
          <button type="button" data-runtime="90"></button><button type="button" data-runtime="120"></button><button type="button" data-runtime="0"></button>
        </div>
        <small id="tonightHint"></small>
      </div>
      <div class="run-progress"><div class="run-progress-top"><span id="roundLabel"></span><span id="reelLabel"></span></div><div class="run-track"><i id="runFill"></i></div></div>`;
    grid.parentNode.insertBefore(modes,grid);
  }

  const qs=$('#questionStack');
  if(qs&&!$('#quickPlay')){
    const quick=document.createElement('div');quick.id='quickPlay';quick.className='quick-play hidden';
    quick.innerHTML=`
      <div class="quick-head"><span id="quickPrompt"></span><span id="quickDepth"></span></div>
      <div class="quick-actions">
        <button type="button" data-quick="seen" class="qa-seen"></button>
        <button type="button" data-quick="watch" class="qa-watch"></button>
        <button type="button" data-quick="maybe"></button>
        <button type="button" data-quick="pass"></button>
      </div>
      <div id="quickRating" class="quick-rating hidden"><span id="rateSeen"></span><div><button type="button" data-quick-rating="5"></button><button type="button" data-quick-rating="8"></button><button type="button" data-quick-rating="10"></button></div></div>
      <p id="quickFeedback" class="quick-feedback"></p>`;
    qs.insertBefore(quick,qs.firstChild);
  }

  const reroll=$('#rerollMovieBtn');
  if(reroll&&!$('#wildcardBtn')){
    const wild=document.createElement('button');wild.id='wildcardBtn';wild.className='wildcard-btn';wild.type='button';
    reroll.insertAdjacentElement('afterend',wild);
  }

  const sessionSection=document.querySelector('.session-section');
  if(sessionSection&&!$('#cinematicPassport')){
    const pass=document.createElement('section');pass.id='cinematicPassport';pass.className='passport glass hidden';
    pass.innerHTML=`
      <div class="passport-stamp">DNTL<br>ART</div>
      <div class="passport-copy"><p id="passportEyebrow" class="eyebrow"></p><h3 id="passportTitle"></h3></div>
      <div class="passport-grid">
        <div><span id="domLabel"></span><strong id="passportLife">—</strong></div>
        <div><span id="gazeLabel"></span><strong id="passportGaze">—</strong></div>
        <div><span id="canonLabel"></span><strong id="passportCanon">—</strong></div>
        <div><span id="nextLabel"></span><strong id="passportFilm">—</strong></div>
      </div>
      <div class="passport-actions"><button type="button" id="continueRun" class="primary-btn"></button><button type="button" id="sharePassport" class="download-btn"></button></div>`;
    sessionSection.parentNode.insertBefore(pass,sessionSection);
  }

  bindGameplayEvents();
  renderGameplayLocale();
  renderGameMode();
  renderRunProgress();
  maybeRevealPassport(false);
}

function bindGameplayEvents(){
  document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>startRun(b.dataset.mode)));
  document.querySelectorAll('[data-runtime]').forEach(b=>b.addEventListener('click',()=>{
    gameState.runtimeMax=Number(b.dataset.runtime)||0;persistGameState();renderGameMode();
    if(currentLife){currentMovie=randomMovie(currentLife,currentMovie?.title);showMovie();}
  }));
  document.querySelectorAll('[data-quick]').forEach(b=>b.addEventListener('click',()=>handleQuick(b.dataset.quick)));
  document.querySelectorAll('[data-quick-rating]').forEach(b=>b.addEventListener('click',()=>saveQuick(true,Number(b.dataset.quickRating),'seen')));
  $('#wildcardBtn')?.addEventListener('click',wildcard);
  $('#continueRun')?.addEventListener('click',()=>startRun(gameState.mode));
  $('#sharePassport')?.addEventListener('click',sharePassport);
  document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>setTimeout(()=>{renderGameplayLocale();renderGameMode();renderRunProgress();maybeRevealPassport(false);enhanceCurrentMovie()},0)));

  // The original detailed save remains untouched; enrich its row after it runs.
  saveBtn?.addEventListener('click',()=>setTimeout(()=>{
    const r=session[session.length-1];
    if(!r||r.run_id)return;
    Object.assign(r,{run_id:gameState.runId,play_mode:gameState.mode,quick_reaction:'detailed',oracle_depth:oracleDepth(currentMovie),runtime_filter:gameState.mode===GAME_MODES.tonight?gameState.runtimeMax||'any':''});
    persist();renderRunProgress();maybeRevealPassport(true);
  },0));

  replaceExcelHandler();
}

function startRun(mode){
  gameState.mode=mode;gameState.runId=gameUuid();gameState.startedAt=new Date().toISOString();persistGameState();
  $('#cinematicPassport')?.classList.add('hidden');
  renderGameMode();renderRunProgress();
  if(currentMovie)enhanceCurrentMovie();
}

function renderGameMode(){
  document.body.dataset.gameMode=gameState.mode;
  document.querySelectorAll('[data-mode]').forEach(b=>b.classList.toggle('active',b.dataset.mode===gameState.mode));
  $('#tonightControls')?.classList.toggle('hidden',gameState.mode!==GAME_MODES.tonight);
  document.querySelectorAll('[data-runtime]').forEach(b=>b.classList.toggle('active',Number(b.dataset.runtime)===Number(gameState.runtimeMax)||(b.dataset.runtime==='0'&&!gameState.runtimeMax)));
  $('#quickPlay')?.classList.toggle('hidden',gameState.mode!==GAME_MODES.quick);
  const detailed=gameState.mode!==GAME_MODES.quick;
  document.querySelectorAll('#questionStack > .question, #questionStack > #saveBtn').forEach(el=>el.classList.toggle('game-suppressed',!detailed));
}

function enhanceCurrentMovie(){
  if(!currentMovie)return;
  const d=oracleDepth(currentMovie);
  $('#quickDepth')&&( $('#quickDepth').textContent=`${gameT('depth')} ${d}/3 · ${depthLabel(currentMovie)}` );
  $('#wildcardBtn')&&( $('#wildcardBtn').textContent=gameT('wildcard') );
  posterArt?.setAttribute('data-depth',String(d));
  renderGameMode();
}

function handleQuick(reaction){
  if(!currentMovie||!currentLife)return;
  if(reaction==='seen'){$('#quickRating')?.classList.remove('hidden');return;}
  if(reaction==='watch')saveQuick(false,9,'watchlist');
  if(reaction==='maybe')saveQuick(false,6,'maybe');
  if(reaction==='pass')saveQuick(false,2,'pass');
}

function saveQuick(seenValue,score,reaction){
  if(!currentLife||!currentMovie)return;
  const record={
    session_id:sessionId,run_id:gameState.runId,timestamp:new Date().toISOString(),language:lang,
    life_id:currentLife.id,life:lifeName(currentLife),movie:currentMovie.title,year:currentMovie.year,director:currentMovie.director,country:currentMovie.country,runtime_min:currentMovie.runtime,
    seen:seenValue,score:Number(score),score_type:seenValue?'rating':'watch_intent',hook:'',reason:currentMovie.reason[lang]||currentMovie.reason.es,
    play_mode:gameState.mode,quick_reaction:reaction,oracle_depth:oracleDepth(currentMovie),runtime_filter:gameState.mode===GAME_MODES.tonight?gameState.runtimeMax||'any':''
  };
  session.push(record);persist();renderRunProgress();
  $('#quickRating')?.classList.add('hidden');
  const feedback=$('#quickFeedback');if(feedback)feedback.textContent=gameT('quickSaved');
  if(runRows().length>=3){maybeRevealPassport(true);if(feedback)feedback.textContent=gameT('passportReady');return;}
  setTimeout(()=>{if(feedback)feedback.textContent='';spin()},520);
}

function wildcard(){
  const others=LIVES.filter(l=>l.id!==currentLife?.id);
  if(!others.length)return;
  const ranked=others.map(l=>({life:l,movie:(l.movies.filter(m=>!session.some(r=>r.movie===m.title)).sort((a,b)=>oracleDepth(b)-oracleDepth(a))[0]||l.movies[0])}));
  const pick=ranked[Math.floor(Math.random()*ranked.length)];currentLife=pick.life;currentMovie=pick.movie;
  lifeWord.textContent=lifeName(currentLife).toLowerCase();lifeResult.textContent=`${t('gotLife')} ${lifeName(currentLife).toLowerCase()}`;showMovie();
}

function renderRunProgress(){
  const count=Math.min(runRows().length,3),pct=(count/3)*100;
  $('#roundLabel')&&( $('#roundLabel').textContent=`${gameT('round')} ${Math.min(count+1,3)}/3` );
  $('#reelLabel')&&( $('#reelLabel').textContent=`${gameT('reel')} ${count}/3` );
  $('#runFill')&&( $('#runFill').style.width=`${pct}%` );
}

function profileFromRows(rows){
  if(!rows.length)return null;
  const byLife={};rows.forEach(r=>{const key=r.life_id||r.life;byLife[key]??={sum:0,n:0,label:r.life};byLife[key].sum+=Number(r.score)||0;byLife[key].n++});
  const dominantEntry=Object.entries(byLife).sort((a,b)=>(b[1].sum/b[1].n)-(a[1].sum/a[1].n)||b[1].n-a[1].n)[0];
  const dominantId=dominantEntry?.[0],dominant=dominantEntry?.[1];
  const seenRatio=rows.filter(r=>r.seen).length/rows.length;
  const canon=seenRatio>=.67?gameT('deepCanon'):seenRatio>=.34?gameT('explorer'):gameT('frontier');
  const gazeMap={strategist:'gazeSystems',investigator:'gazeSystems',architect:'gazeForm',designer:'gazeForm',filmmaker:'gazeForm',musician:'gazeRhythm',scientist:'gazeUnknown',explorer:'gazeUnknown',writer:'gazeLanguage',builder:'gazeCraft'};
  const hookCounts=rows.map(r=>r.hook).filter(Boolean).reduce((a,x)=>(a[x]=(a[x]||0)+1,a),{});
  const topHook=Object.entries(hookCounts).sort((a,b)=>b[1]-a[1])[0]?.[0];
  const hookGaze={story:'gazeLanguage',image:'gazeForm',sound:'gazeRhythm',rhythm:'gazeRhythm',performance:'gazeCraft',idea:'gazeUnknown'};
  const gaze=gameT(hookGaze[topHook]||gazeMap[dominantId]||'gazeUnknown');
  const unseen=rows.filter(r=>!r.seen).sort((a,b)=>Number(b.score)-Number(a.score));
  let next=unseen[0]?.movie;
  if(!next&&dominantId){const life=LIVES.find(l=>l.id===dominantId);next=life?.movies.filter(m=>!session.some(r=>r.movie===m.title)).sort((a,b)=>oracleDepth(b)-oracleDepth(a))[0]?.title;}
  return{dominantLife:dominant?.label||'—',dominantId,gaze,canon,next:next||gameT('noPick')};
}

function maybeRevealPassport(scroll){
  const rows=runRows();if(rows.length<3)return;
  const profile=profileFromRows(rows);if(!profile)return;
  $('#passportLife').textContent=profile.dominantLife;$('#passportGaze').textContent=profile.gaze;$('#passportCanon').textContent=profile.canon;$('#passportFilm').textContent=profile.next;
  const pass=$('#cinematicPassport');pass?.classList.remove('hidden');
  if(scroll)pass?.scrollIntoView({behavior:'smooth',block:'center'});
}

async function sharePassport(){
  const p=profileFromRows(runRows());if(!p)return;
  const text=`${gameT('shareLead')}: ${p.dominantLife} · ${p.gaze}. ${gameT('nextFilm')}: ${p.next}. ${gameT('shareLink')}: https://dntl-art.vercel.app`;
  if(navigator.share){try{await navigator.share({title:'Otra Vida — Film Oracle',text,url:'https://dntl-art.vercel.app'});return}catch(e){}}
  try{await navigator.clipboard.writeText(text);const b=$('#sharePassport');b.textContent=gameT('copied');setTimeout(()=>b.textContent=gameT('share'),1400)}catch(e){}
}

function renderGameplayLocale(){
  $('#modeLabel')&&( $('#modeLabel').textContent=gameT('modeLabel') );$('#minuteHint')&&( $('#minuteHint').textContent=gameT('minuteHint') );
  $('#modeQuick')&&( $('#modeQuick').textContent=gameT('quick') );$('#modeQuickSub')&&( $('#modeQuickSub').textContent=gameT('quickSub') );
  $('#modeCine')&&( $('#modeCine').textContent=gameT('cine') );$('#modeCineSub')&&( $('#modeCineSub').textContent=gameT('cineSub') );
  $('#modeTonight')&&( $('#modeTonight').textContent=gameT('tonight') );$('#modeTonightSub')&&( $('#modeTonightSub').textContent=gameT('tonightSub') );
  $('#timeLabel')&&( $('#timeLabel').textContent=gameT('timeLabel') );$('#tonightHint')&&( $('#tonightHint').textContent=gameT('tonightHint') );
  const times=document.querySelectorAll('[data-runtime]');if(times[0])times[0].textContent=gameT('min90');if(times[1])times[1].textContent=gameT('min120');if(times[2])times[2].textContent=gameT('any');
  $('#quickPrompt')&&( $('#quickPrompt').textContent=gameT('quickPrompt') );
  const qs=document.querySelectorAll('[data-quick]');qs.forEach(b=>b.textContent=gameT(b.dataset.quick==='seen'?'seen':b.dataset.quick==='watch'?'watch':b.dataset.quick==='maybe'?'maybe':'pass'));
  $('#rateSeen')&&( $('#rateSeen').textContent=gameT('rateSeen') );const ratings=document.querySelectorAll('[data-quick-rating]');if(ratings[0])ratings[0].textContent=gameT('meh');if(ratings[1])ratings[1].textContent=gameT('good');if(ratings[2])ratings[2].textContent=gameT('love');
  $('#passportEyebrow')&&( $('#passportEyebrow').textContent=gameT('passportEyebrow') );$('#passportTitle')&&( $('#passportTitle').textContent=gameT('passportTitle') );
  $('#domLabel')&&( $('#domLabel').textContent=gameT('dominant') );$('#gazeLabel')&&( $('#gazeLabel').textContent=gameT('gaze') );$('#canonLabel')&&( $('#canonLabel').textContent=gameT('canon') );$('#nextLabel')&&( $('#nextLabel').textContent=gameT('nextFilm') );
  $('#continueRun')&&( $('#continueRun').textContent=gameT('continue') );$('#sharePassport')&&( $('#sharePassport').textContent=gameT('share') );$('#wildcardBtn')&&( $('#wildcardBtn').textContent=gameT('wildcard') );
  renderRunProgress();enhanceCurrentMovie();
}

function replaceExcelHandler(){
  const old=$('#downloadBtn');if(!old||old.dataset.v3)return;
  const clone=old.cloneNode(true);clone.dataset.v3='1';old.replaceWith(clone);clone.addEventListener('click',downloadExcelV3);
}

async function downloadExcelV3(){
  if(!session.length)return;if(typeof ExcelJS==='undefined'){alert(t('excelError'));return}
  const wb=new ExcelJS.Workbook();wb.creator='DNTL Art / Otra Vida';wb.created=new Date();wb.subject='Cinematic identity game session';
  const pass=wb.addWorksheet('Passport');
  pass.mergeCells('A1:F2');pass.getCell('A1').value='OTRA VIDA / CINEMATIC PASSPORT';pass.getCell('A1').font={name:'Georgia',size:24,bold:true,color:{argb:'FFF3EAD9'}};pass.getCell('A1').fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF181512'}};pass.getCell('A1').alignment={vertical:'middle'};
  const profile=profileFromRows(runRows().length?runRows():session.slice(-3));
  [['Session ID',sessionId],['Run ID',gameState.runId],[gameT('playMode'),gameState.mode],[gameT('dominant'),profile?.dominantLife||''],[gameT('gaze'),profile?.gaze||''],[gameT('canon'),profile?.canon||''],[gameT('nextFilm'),profile?.next||''],['Exported',new Date()]].forEach((x,i)=>{pass.getCell(`A${i+4}`).value=x[0];pass.getCell(`B${i+4}`).value=x[1]});pass.columns=[{width:24},{width:42},{width:18},{width:18},{width:18},{width:18}];

  const ws=wb.addWorksheet('Session',{views:[{state:'frozen',ySplit:1}]});
  ws.columns=[
    {header:'session_id',key:'session_id',width:38},{header:'run_id',key:'run_id',width:38},{header:'timestamp',key:'timestamp',width:24},{header:'language',key:'language',width:10},{header:'play_mode',key:'play_mode',width:14},
    {header:'alternative_life',key:'life',width:19},{header:'movie',key:'movie',width:28},{header:'year',key:'year',width:9},{header:'director',key:'director',width:24},{header:'country',key:'country',width:18},{header:'runtime_min',key:'runtime_min',width:13},
    {header:'seen',key:'seen',width:9},{header:'score_type',key:'score_type',width:18},{header:'score_1_10',key:'score',width:13},{header:'attention_hook',key:'hook',width:18},{header:'quick_reaction',key:'quick_reaction',width:18},{header:'oracle_depth',key:'oracle_depth',width:14},{header:'runtime_filter',key:'runtime_filter',width:15},{header:'oracle_reason',key:'reason',width:58}
  ];
  session.forEach(r=>ws.addRow({...r,seen:r.seen?'yes':'no',play_mode:r.play_mode||'',run_id:r.run_id||'',quick_reaction:r.quick_reaction||'',oracle_depth:r.oracle_depth||'',runtime_filter:r.runtime_filter||''}));
  styleTable(ws,session.length,19);ws.autoFilter={from:'A1',to:`S${session.length+1}`};ws.getColumn('score').numFmt='0"/10"';

  const sum=wb.addWorksheet('Summary');sum.columns=[{header:'alternative_life',key:'life',width:22},{header:'recommendations',key:'count',width:18},{header:'already_seen',key:'seen',width:15},{header:'avg_score',key:'avg',width:14},{header:'accepted_7_plus',key:'accepted',width:18},{header:'avg_depth',key:'depth',width:14}];
  LIVES.map(l=>{const rows=session.filter(r=>r.life_id===l.id);if(!rows.length)return null;return{life:lifeName(l),count:rows.length,seen:rows.filter(r=>r.seen).length,avg:rows.reduce((a,r)=>a+Number(r.score||0),0)/rows.length,accepted:rows.filter(accepted).length,depth:rows.reduce((a,r)=>a+Number(r.oracle_depth||1),0)/rows.length}}).filter(Boolean).forEach(r=>sum.addRow(r));styleTable(sum,sum.rowCount-1,6);sum.getColumn('avg').numFmt='0.0';sum.getColumn('depth').numFmt='0.0';

  const buf=await wb.xlsx.writeBuffer(),blob=new Blob([buf],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`dntl_art_cinematic_passport_${new Date().toISOString().slice(0,10)}.xlsx`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
}

injectGameplayUI();
