/* Otra Vida — P0..P4 return-loop layer.
   P0 media + actions, P1 persistent passport, P2 daily life,
   P3 duel, P4 blind spot. No backend; all preference state stays local. */

const RETENTION_KEY='dntl_art_persistent_passport_v1';
const MEDIA_CACHE_KEY='dntl_art_media_cache_v1';
const RET_EVENTS_KEY='dntl_art_retention_events_v1';

const RET_COPY={
  es:{dailyEyebrow:'DAILY OTHER LIFE',dailyTitle:'La vida de hoy',dailyBody:'Una puerta cambia cada día. Ábrela, decide rápido y deja otra marca en tu pasaporte.',openDaily:'abrir la vida de hoy',dailyOpened:'abierta hoy ✓',dailyStamp:'días abiertos',
    persistentEyebrow:'YOUR LIVING CINEMA',persistentTitle:'Tu pasaporte sigue creciendo.',persistentBody:'No se borra al iniciar una sesión nueva. Guarda señales de tus vidas, películas vistas, watchlist y duelos — solo en este navegador.',films:'películas',lives:'vidas abiertas',seen:'vistas',watchlist:'watchlist',savedForLater:'GUARDADAS PARA DESPUÉS',noneYet:'todavía ninguna',
    trailer:'TRAILER ↗',imdb:'IMDb ↗',source:'fuente de imagen / Wikipedia ↗',seenAction:'SEEN ✓',watchAction:'WATCHLIST +',passAction:'PASS',saved:'guardado ✓',
    duelEyebrow:'DUEL',duelTitle:'Dos vidas. Una gana.',duelBody:'Cinco elecciones rápidas. No pienses en cuál es “mejor”; toca la película que te llama primero.',startDuel:'empezar duelo',again:'jugar otro duelo',duelRound:'duelo',duelResult:'tu sesgo de duelo',duelOpen:'abrir la ganadora',
    blindEyebrow:'BLIND SPOT',blindTitle:'Tu mapa tiene un hueco.',blindBody:'El juego busca una película fuera de tus patrones actuales: otra vida, otra época o otra geografía.',openBlind:'abrir este blind spot',anotherBlind:'otro hueco ↻',blindNewLife:'Casi no has explorado esta vida.',blindOld:'Tu mapa está cargado hacia cine reciente; esta puerta va hacia atrás.',blindWorld:'Tu mapa está cargado hacia EE.UU.; esta puerta cambia de geografía.',blindUnknown:'Esta película vive lejos de tus elecciones repetidas.',
    dailyLife:'vida',today:'hoy',returning:'bienvenido de vuelta',firstVisit:'primer sello de pasaporte',sourceUnavailable:'imagen no disponible',duelTaste:'te inclinas hacia',passportNote:'Este perfil vive solo en tu navegador.'},
  en:{dailyEyebrow:'DAILY OTHER LIFE',dailyTitle:"Today's life",dailyBody:'One door changes every day. Open it, decide fast, and leave another mark in your passport.',openDaily:"open today's life",dailyOpened:'opened today ✓',dailyStamp:'days opened',
    persistentEyebrow:'YOUR LIVING CINEMA',persistentTitle:'Your passport keeps growing.',persistentBody:'It survives a new session. It remembers your lives, seen films, watchlist and duels — only in this browser.',films:'films',lives:'lives opened',seen:'seen',watchlist:'watchlist',savedForLater:'SAVED FOR LATER',noneYet:'none yet',
    trailer:'TRAILER ↗',imdb:'IMDb ↗',source:'image source / Wikipedia ↗',seenAction:'SEEN ✓',watchAction:'WATCHLIST +',passAction:'PASS',saved:'saved ✓',
    duelEyebrow:'DUEL',duelTitle:'Two lives. One wins.',duelBody:'Five fast choices. Do not pick the “better” film; tap the one that pulls you first.',startDuel:'start duel',again:'play another duel',duelRound:'duel',duelResult:'your duel bias',duelOpen:'open the winner',
    blindEyebrow:'BLIND SPOT',blindTitle:'Your map has a gap.',blindBody:'The game looks for a film outside your current pattern: another life, another era or another geography.',openBlind:'open this blind spot',anotherBlind:'another gap ↻',blindNewLife:'You have barely explored this life.',blindOld:'Your map leans recent; this door goes backward in time.',blindWorld:'Your map leans US-heavy; this door changes geography.',blindUnknown:'This film sits far from your repeated choices.',
    dailyLife:'life',today:'today',returning:'welcome back',firstVisit:'first passport stamp',sourceUnavailable:'image unavailable',duelTaste:'you lean toward',passportNote:'This profile lives only in your browser.'},
  de:{dailyEyebrow:'DAILY OTHER LIFE',dailyTitle:'Das heutige Leben',dailyBody:'Jeden Tag öffnet sich eine andere Tür. Öffne sie, entscheide schnell und setze einen weiteren Stempel in deinen Pass.',openDaily:'heutiges Leben öffnen',dailyOpened:'heute geöffnet ✓',dailyStamp:'geöffnete Tage',
    persistentEyebrow:'DEIN LEBENDIGES KINO',persistentTitle:'Dein Pass wächst weiter.',persistentBody:'Er überlebt eine neue Sitzung. Er merkt sich Leben, gesehene Filme, Watchlist und Duelle — nur in diesem Browser.',films:'Filme',lives:'geöffnete Leben',seen:'gesehen',watchlist:'Watchlist',savedForLater:'FÜR SPÄTER GESPEICHERT',noneYet:'noch keine',
    trailer:'TRAILER ↗',imdb:'IMDb ↗',source:'Bildquelle / Wikipedia ↗',seenAction:'GESEHEN ✓',watchAction:'WATCHLIST +',passAction:'WEITER',saved:'gespeichert ✓',
    duelEyebrow:'DUELL',duelTitle:'Zwei Leben. Eines gewinnt.',duelBody:'Fünf schnelle Entscheidungen. Wähle nicht den „besseren“ Film, sondern den, der dich zuerst zieht.',startDuel:'Duell starten',again:'noch ein Duell',duelRound:'Duell',duelResult:'deine Duell-Tendenz',duelOpen:'Gewinner öffnen',
    blindEyebrow:'BLIND SPOT',blindTitle:'Deine Karte hat eine Lücke.',blindBody:'Das Spiel sucht einen Film außerhalb deines aktuellen Musters: ein anderes Leben, eine andere Zeit oder Geografie.',openBlind:'Blind Spot öffnen',anotherBlind:'andere Lücke ↻',blindNewLife:'Dieses Leben hast du kaum erkundet.',blindOld:'Deine Karte ist stark auf neues Kino fokussiert; diese Tür führt zurück.',blindWorld:'Deine Karte ist stark US-lastig; diese Tür wechselt die Geografie.',blindUnknown:'Dieser Film liegt weit weg von deinen wiederholten Entscheidungen.',
    dailyLife:'Leben',today:'heute',returning:'willkommen zurück',firstVisit:'erster Passstempel',sourceUnavailable:'Bild nicht verfügbar',duelTaste:'du neigst zu',passportNote:'Dieses Profil lebt nur in deinem Browser.'}
};
const rt=k=>RET_COPY[lang]?.[k]||RET_COPY.es[k]||k;
const nowDateKey=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
const hash=s=>{let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return Math.abs(h>>>0)};
const safeJson=(k,fallback)=>{try{return JSON.parse(localStorage.getItem(k))||fallback}catch{return fallback}};

let persistent=safeJson(RETENTION_KEY,{version:1,createdAt:new Date().toISOString(),lastVisit:null,visitDates:[],processed:{},movies:{},lives:{},duels:[],dailyOpened:{},blindspots:[]});
let mediaCache=safeJson(MEDIA_CACHE_KEY,{});
let retentionEvents=safeJson(RET_EVENTS_KEY,[]);
let duelState={active:false,round:0,choices:[],left:null,right:null};
let blindOffset=0;

function savePersistent(){persistent.lastVisit=new Date().toISOString();localStorage.setItem(RETENTION_KEY,JSON.stringify(persistent))}
function saveMedia(){try{localStorage.setItem(MEDIA_CACHE_KEY,JSON.stringify(mediaCache))}catch(e){}}
function retEvent(type,payload={}){retentionEvents.push({at:new Date().toISOString(),type,...payload});if(retentionEvents.length>300)retentionEvents=retentionEvents.slice(-300);localStorage.setItem(RET_EVENTS_KEY,JSON.stringify(retentionEvents))}
function allMovies(){return LIVES.flatMap(l=>l.movies.map(movie=>({life:l,movie})))}
function movieKey(m){return `${m.title}::${m.year}`}
function visitToday(){const k=nowDateKey();if(!persistent.visitDates.includes(k)){persistent.visitDates.push(k);retEvent('visit',{date:k});savePersistent()}}
visitToday();

function ensureLife(id){if(!persistent.lives[id])persistent.lives[id]={discoveries:0,seen:0,watchlist:0,passes:0,scoreSum:0,scoreN:0,duelWins:0};return persistent.lives[id]}
function upsertPersistentMovie(row){
  const key=`${row.movie}::${row.year||''}`;const prev=persistent.movies[key]||{};
  const reaction=row.quick_reaction||'';
  let status=row.seen?'seen':reaction==='watchlist'?'watchlist':reaction==='pass'?'pass':Number(row.score)>=8?'watchlist':Number(row.score)<=3?'pass':'maybe';
  const priority={pass:1,maybe:2,watchlist:3,seen:4};if(prev.status&&priority[prev.status]>priority[status])status=prev.status;
  persistent.movies[key]={...prev,title:row.movie,year:row.year,life_id:row.life_id,life:row.life,director:row.director,country:row.country,runtime_min:row.runtime_min,status,lastScore:row.score,lastAt:row.timestamp||new Date().toISOString(),seen:status==='seen'||prev.seen===true};
  const l=ensureLife(row.life_id||row.life);l.discoveries++;l.scoreSum+=Number(row.score)||0;l.scoreN++;if(row.seen)l.seen++;if(status==='watchlist')l.watchlist++;if(status==='pass')l.passes++;
}
function syncPassportFromSession(){
  session.forEach((row,i)=>{const key=`${row.timestamp||i}::${row.movie}`;if(persistent.processed[key])return;persistent.processed[key]=1;upsertPersistentMovie(row)});savePersistent();
}
syncPassportFromSession();

function setMovieStatus(movie,life,status){
  const key=movieKey(movie),prev=persistent.movies[key]||{};persistent.movies[key]={...prev,title:movie.title,year:movie.year,director:movie.director,country:movie.country,runtime_min:movie.runtime,life_id:life.id,life:lifeName(life),status,seen:status==='seen'||prev.seen===true,lastAt:new Date().toISOString()};
  const l=ensureLife(life.id);l.discoveries++;if(status==='seen')l.seen++;if(status==='watchlist')l.watchlist++;if(status==='pass')l.passes++;savePersistent();renderPersistentPassport();retEvent('film_action',{movie:movie.title,life_id:life.id,status});
}

async function resolveMedia(movie){
  const key=movieKey(movie);if(mediaCache[key])return mediaCache[key];
  try{
    const q=encodeURIComponent(`"${movie.title}" ${movie.year} film`);
    const url=`https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${q}&gsrlimit=1&prop=pageimages|pageprops|info&piprop=thumbnail|original&pithumbsize=700&inprop=url&format=json&origin=*`;
    const res=await fetch(url);if(!res.ok)throw new Error('wiki search');const data=await res.json();const pages=Object.values(data.query?.pages||{});const p=pages[0];if(!p)throw new Error('no page');
    let imdbId='';const qid=p.pageprops?.wikibase_item;
    if(qid){try{const wr=await fetch(`https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${encodeURIComponent(qid)}&props=claims&format=json&origin=*`);const wd=await wr.json();imdbId=wd.entities?.[qid]?.claims?.P345?.[0]?.mainsnak?.datavalue?.value||''}catch(e){}}
    const item={poster:p.original?.source||p.thumbnail?.source||'',wiki:p.fullurl||'',imdbId};mediaCache[key]=item;saveMedia();return item;
  }catch(e){mediaCache[key]={poster:'',wiki:'',imdbId:''};saveMedia();return mediaCache[key]}
}
function imdbUrl(movie,media){return media?.imdbId?`https://www.imdb.com/title/${media.imdbId}/`:`https://www.imdb.com/find/?q=${encodeURIComponent(movie.title+' '+movie.year)}`}
function trailerUrl(movie){return `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title+' '+movie.year+' official trailer')}`}

function ensureFilmActions(){
  const copy=document.querySelector('.film-copy');if(!copy||$('#filmExternal'))return;const el=document.createElement('div');el.id='filmExternal';el.className='film-external';copy.appendChild(el);const src=document.createElement('a');src.id='filmSource';src.className='film-source hidden';src.target='_blank';src.rel='noopener';src.textContent=rt('source');copy.appendChild(src);
}
async function enhanceRealMedia(){
  if(!currentMovie||!currentLife)return;ensureFilmActions();const movieAtCall=currentMovie;const media=await resolveMedia(movieAtCall);if(currentMovie!==movieAtCall)return;
  let img=$('#realPosterImg');if(!img){img=document.createElement('img');img.id='realPosterImg';img.className='real-poster-img';img.alt='';posterArt.prepend(img)}
  if(media.poster){img.src=media.poster;img.style.display='block';posterArt.classList.add('has-real-poster')}else{img.removeAttribute('src');img.style.display='none';posterArt.classList.remove('has-real-poster')}
  const ext=$('#filmExternal');if(ext){ext.innerHTML=`<a id="trailerLink" target="_blank" rel="noopener">${rt('trailer')}</a><a id="imdbLink" target="_blank" rel="noopener">${rt('imdb')}</a><button type="button" data-ret-action="seen">${rt('seenAction')}</button><button type="button" data-ret-action="watchlist">${rt('watchAction')}</button><button type="button" data-ret-action="pass">${rt('passAction')}</button>`;$('#trailerLink').href=trailerUrl(currentMovie);$('#imdbLink').href=imdbUrl(currentMovie,media);ext.querySelectorAll('[data-ret-action]').forEach(b=>b.addEventListener('click',()=>{setMovieStatus(currentMovie,currentLife,b.dataset.retAction);b.textContent=rt('saved');b.classList.add('active');toast(rt('saved'))}))}
  const src=$('#filmSource');if(src){if(media.wiki){src.href=media.wiki;src.textContent=rt('source');src.classList.remove('hidden')}else src.classList.add('hidden')}
}

function dailyPick(){const date=nowDateKey();const li=hash(`life:${date}`)%LIVES.length;const life=LIVES[li];const mi=hash(`movie:${date}:${life.id}`)%life.movies.length;return{date,life,movie:life.movies[mi]}}
function injectDaily(){
  if($('#dailyGate'))return;const hero=document.querySelector('.hero');if(!hero)return;const s=document.createElement('section');s.id='dailyGate';s.className='daily-gate glass';s.innerHTML=`<div class="daily-visual" id="dailyVisual"></div><div class="daily-copy"><span class="retention-eyebrow" id="dailyEyebrow"></span><h3 id="dailyHeading"></h3><p id="dailyBody"></p><div class="daily-meta"><span id="dailyLife"></span><span id="dailyDate"></span></div></div><div class="daily-action"><button type="button" id="openDaily" class="primary-btn"></button><small id="dailyStamp"></small></div>`;hero.insertAdjacentElement('afterend',s);$('#openDaily').addEventListener('click',openDaily);renderDaily();
}
async function renderDaily(){if(!$('#dailyGate'))return;const p=dailyPick();$('#dailyEyebrow').textContent=rt('dailyEyebrow');$('#dailyHeading').textContent=rt('dailyTitle');$('#dailyBody').textContent=rt('dailyBody');$('#dailyLife').textContent=`${rt('dailyLife')} · ${lifeName(p.life)}`;$('#dailyDate').textContent=p.date;$('#dailyStamp').textContent=`${persistent.visitDates.length} ${rt('dailyStamp')}`;$('#openDaily').textContent=persistent.dailyOpened[p.date]?rt('dailyOpened'):rt('openDaily');const media=await resolveMedia(p.movie);const v=$('#dailyVisual');if(v){v.innerHTML=media.poster?`<img src="${escapeHtml(media.poster)}" alt="">`:''}}
function openDaily(){const p=dailyPick();persistent.dailyOpened[p.date]=true;savePersistent();retEvent('daily_open',{date:p.date,life_id:p.life.id,movie:p.movie.title});currentLife=p.life;currentMovie=p.movie;lifeWord.textContent=lifeName(currentLife).toLowerCase();lifeResult.textContent=`${t('gotLife')} ${lifeName(currentLife).toLowerCase()}`;showMovie();renderDaily();document.querySelector('.game-grid')?.scrollIntoView({behavior:'smooth',block:'start'})}

function injectPersistentPassport(){
  if($('#persistentPassport'))return;const target=$('#cinematicPassport')||document.querySelector('.session-section');if(!target)return;const s=document.createElement('section');s.id='persistentPassport';s.className='persistent-passport glass';s.innerHTML=`<div class="passport-head"><div><span class="retention-eyebrow" id="ppEyebrow"></span><h3 id="ppTitle"></h3></div><p id="ppBody"></p></div><div class="passport-stats"><div class="passport-stat"><span id="ppFilmsLabel"></span><strong id="ppFilms">0</strong></div><div class="passport-stat"><span id="ppLivesLabel"></span><strong id="ppLives">0</strong></div><div class="passport-stat"><span id="ppSeenLabel"></span><strong id="ppSeen">0</strong></div><div class="passport-stat"><span id="ppWatchLabel"></span><strong id="ppWatch">0</strong></div></div><div class="life-map" id="lifeMap"></div><div class="passport-watchlist"><span id="ppSavedLabel"></span><div class="watchlist-row" id="ppWatchlist"></div></div>`;target.insertAdjacentElement('afterend',s);renderPersistentPassport();
}
function renderPersistentPassport(){if(!$('#persistentPassport'))return;const movies=Object.values(persistent.movies);const lifeIds=Object.keys(persistent.lives).filter(k=>persistent.lives[k].discoveries>0);$('#ppEyebrow').textContent=rt('persistentEyebrow');$('#ppTitle').textContent=rt('persistentTitle');$('#ppBody').textContent=`${rt('persistentBody')} ${rt('passportNote')}`;$('#ppFilmsLabel').textContent=rt('films');$('#ppLivesLabel').textContent=rt('lives');$('#ppSeenLabel').textContent=rt('seen');$('#ppWatchLabel').textContent=rt('watchlist');$('#ppFilms').textContent=movies.length;$('#ppLives').textContent=lifeIds.length;$('#ppSeen').textContent=movies.filter(m=>m.seen||m.status==='seen').length;$('#ppWatch').textContent=movies.filter(m=>m.status==='watchlist').length;$('#lifeMap').innerHTML=LIVES.map(l=>{const n=persistent.lives[l.id]?.discoveries||0;return `<span class="life-stamp${n?' open':''}">${escapeHtml(lifeName(l))}${n?` <b>${n}</b>`:''}</span>`}).join('');$('#ppSavedLabel').textContent=rt('savedForLater');const wl=movies.filter(m=>m.status==='watchlist').sort((a,b)=>String(b.lastAt).localeCompare(String(a.lastAt))).slice(0,8);$('#ppWatchlist').innerHTML=wl.length?wl.map(m=>`<span class="watchlist-pill">${escapeHtml(m.title)} · ${m.year}</span>`).join(''):`<span class="watchlist-pill">${rt('noneYet')}</span>`}

function injectExperiences(){
  if($('#returnExperiences'))return;const pp=$('#persistentPassport');if(!pp)return;const wrap=document.createElement('section');wrap.id='returnExperiences';wrap.className='experience-grid';wrap.innerHTML=`<article class="experience-card glass" id="duelExperience"><span class="retention-eyebrow" id="duelEyebrow"></span><h3 id="duelTitle"></h3><p class="experience-lede" id="duelBody"></p><div id="duelContent"></div></article><article class="experience-card glass" id="blindExperience"><span class="retention-eyebrow" id="blindEyebrow"></span><h3 id="blindTitle"></h3><p class="experience-lede" id="blindBody"></p><div id="blindContent"></div></article>`;pp.insertAdjacentElement('afterend',wrap);renderExperiencesLocale();renderDuelIdle();renderBlindSpot();
}
function renderExperiencesLocale(){if(!$('#returnExperiences'))return;$('#duelEyebrow').textContent=rt('duelEyebrow');$('#duelTitle').textContent=rt('duelTitle');$('#duelBody').textContent=rt('duelBody');$('#blindEyebrow').textContent=rt('blindEyebrow');$('#blindTitle').textContent=rt('blindTitle');$('#blindBody').textContent=rt('blindBody')}

function weightedDuelCandidates(){const interacted=new Set(Object.values(persistent.movies).map(x=>`${x.title}::${x.year}`));return allMovies().map(x=>({...x,novel:interacted.has(movieKey(x.movie))?0:2,depth:typeof oracleDepth==='function'?oracleDepth(x.movie):1})).sort((a,b)=>(b.novel+b.depth)-(a.novel+a.depth))}
function pickDuelPair(){const pool=weightedDuelCandidates();const seed=hash(`${nowDateKey()}:${duelState.round}:${duelState.choices.length}:${Date.now()>>13}`);const a=pool[seed%pool.length];let b=pool[(seed*7+11)%pool.length];for(let i=0;i<pool.length&&b.life.id===a.life.id;i++)b=pool[(seed*7+11+i)%pool.length];return[a,b]}
function renderDuelIdle(){const c=$('#duelContent');if(!c)return;c.innerHTML=`<button type="button" id="startDuel" class="primary-btn">${rt('startDuel')}</button>`;$('#startDuel').addEventListener('click',startDuel)}
function startDuel(){duelState={active:true,round:1,choices:[],left:null,right:null};retEvent('duel_start');renderDuelRound()}
async function renderDuelRound(){const c=$('#duelContent');if(!c)return;const [left,right]=pickDuelPair();duelState.left=left;duelState.right=right;const [lm,rm]=await Promise.all([resolveMedia(left.movie),resolveMedia(right.movie)]);c.innerHTML=`<div class="duel-stage"><button class="duel-card" data-duel-side="left"><div class="duel-poster">${lm.poster?`<img src="${escapeHtml(lm.poster)}" alt="">`:''}</div><div class="duel-info"><small>${escapeHtml(lifeName(left.life))} · ${left.movie.year}</small><strong>${escapeHtml(left.movie.title)}</strong></div></button><div class="duel-vs">VS</div><button class="duel-card" data-duel-side="right"><div class="duel-poster">${rm.poster?`<img src="${escapeHtml(rm.poster)}" alt="">`:''}</div><div class="duel-info"><small>${escapeHtml(lifeName(right.life))} · ${right.movie.year}</small><strong>${escapeHtml(right.movie.title)}</strong></div></button></div><div class="duel-progress"><span>${rt('duelRound')} ${duelState.round}/5</span><span>${'●'.repeat(duelState.round-1)}${'○'.repeat(6-duelState.round)}</span></div>`;c.querySelectorAll('[data-duel-side]').forEach(b=>b.addEventListener('click',()=>chooseDuel(b.dataset.duelSide)))}
function chooseDuel(side){const win=side==='left'?duelState.left:duelState.right,lose=side==='left'?duelState.right:duelState.left;duelState.choices.push({winner:win,loser:lose});const l=ensureLife(win.life.id);l.duelWins++;persistent.duels.push({at:new Date().toISOString(),winner:win.movie.title,winner_life:win.life.id,loser:lose.movie.title,loser_life:lose.life.id});savePersistent();retEvent('duel_choice',{round:duelState.round,winner:win.movie.title,winner_life:win.life.id,loser:lose.movie.title});if(duelState.round>=5){renderDuelResult();renderPersistentPassport();return}duelState.round++;renderDuelRound()}
function renderDuelResult(){const counts={};duelState.choices.forEach(c=>{counts[c.winner.life.id]=(counts[c.winner.life.id]||0)+1});const top=Object.entries(counts).sort((a,b)=>b[1]-a[1])[0]?.[0];const life=LIVES.find(l=>l.id===top)||duelState.choices[0].winner.life;const winner=duelState.choices.slice().sort((a,b)=>(persistent.lives[b.winner.life.id]?.duelWins||0)-(persistent.lives[a.winner.life.id]?.duelWins||0))[0]?.winner||duelState.choices[0].winner;const c=$('#duelContent');c.innerHTML=`<div class="duel-result"><span class="retention-eyebrow">${rt('duelResult')}</span><strong>${escapeHtml(lifeName(life))}</strong><p>${rt('duelTaste')} ${escapeHtml(lifeName(life).toLowerCase())}. ${escapeHtml(winner.movie.title)} quedó como puerta inmediata.</p><button type="button" id="duelOpen" class="primary-btn">${rt('duelOpen')}</button><button type="button" id="duelAgain" class="download-btn">${rt('again')}</button></div>`;$('#duelOpen').addEventListener('click',()=>openFilm(winner.life,winner.movie,'duel_winner'));$('#duelAgain').addEventListener('click',startDuel)}

function blindCandidates(){
  const movies=Object.values(persistent.movies),seenKeys=new Set(movies.filter(m=>m.status==='seen'||m.status==='watchlist').map(m=>`${m.title}::${m.year}`));const selected=movies.filter(m=>m.status!=='pass');const recentRatio=selected.length?selected.filter(m=>(m.year||9999)>=2000).length/selected.length:1;const usRatio=selected.length?selected.filter(m=>String(m.country||'').toUpperCase().includes('USA')).length/selected.length:1;const lifeCounts=Object.fromEntries(LIVES.map(l=>[l.id,persistent.lives[l.id]?.discoveries||0]));const minLife=Math.min(...Object.values(lifeCounts));return allMovies().filter(x=>!seenKeys.has(movieKey(x.movie))).map(x=>{let score=(typeof oracleDepth==='function'?oracleDepth(x.movie):1)*1.5;const reasons=[];if(lifeCounts[x.life.id]===minLife){score+=3;reasons.push('life')}if(recentRatio>.65&&x.movie.year<1990){score+=3;reasons.push('old')}if(usRatio>.65&&!String(x.movie.country).toUpperCase().includes('USA')){score+=3;reasons.push('world')}if(!persistent.movies[movieKey(x.movie)])score+=2;return{...x,score,reasons}}).sort((a,b)=>b.score-a.score||hash(a.movie.title)-hash(b.movie.title))
}
function currentBlind(){const list=blindCandidates();return list.length?list[blindOffset%list.length]:null}
function blindReason(p){if(!p)return rt('blindUnknown');if(p.reasons.includes('old'))return rt('blindOld');if(p.reasons.includes('world'))return rt('blindWorld');if(p.reasons.includes('life'))return rt('blindNewLife');return rt('blindUnknown')}
async function renderBlindSpot(){const c=$('#blindContent');if(!c)return;const p=currentBlind();if(!p){c.innerHTML=`<p>${rt('noneYet')}</p>`;return}const media=await resolveMedia(p.movie);c.innerHTML=`<div class="blindspot-core"><div class="blindspot-poster">${media.poster?`<img src="${escapeHtml(media.poster)}" alt="">`:''}</div><div class="blindspot-copy"><small>${escapeHtml(lifeName(p.life))} · ${p.movie.year} · ${escapeHtml(p.movie.country)}</small><strong>${escapeHtml(p.movie.title)}</strong><p>${escapeHtml(blindReason(p))}</p><div class="blindspot-actions"><button type="button" id="openBlind" class="primary-btn">${rt('openBlind')}</button><button type="button" id="nextBlind" class="download-btn">${rt('anotherBlind')}</button></div></div></div>`;$('#openBlind').addEventListener('click',()=>{persistent.blindspots.push({at:new Date().toISOString(),movie:p.movie.title,life_id:p.life.id});savePersistent();retEvent('blindspot_open',{movie:p.movie.title,life_id:p.life.id,reasons:p.reasons});openFilm(p.life,p.movie,'blindspot')});$('#nextBlind').addEventListener('click',()=>{blindOffset++;renderBlindSpot()})}

function openFilm(life,movie,source){currentLife=life;currentMovie=movie;lifeWord.textContent=lifeName(life).toLowerCase();lifeResult.textContent=`${t('gotLife')} ${lifeName(life).toLowerCase()}`;showMovie();retEvent('curated_open',{source,movie:movie.title,life_id:life.id});document.querySelector('.game-grid')?.scrollIntoView({behavior:'smooth',block:'start'})}
function toast(text){let x=$('#returnToast');if(!x){x=document.createElement('div');x.id='returnToast';x.className='return-toast';document.body.appendChild(x)}x.textContent=text;x.classList.add('show');clearTimeout(x._t);x._t=setTimeout(()=>x.classList.remove('show'),1300)}

// Keep all previous behavior, add media and persistent learning on top.
const retShowMovie=showMovie;showMovie=function(reset=true){retShowMovie(reset);enhanceRealMedia()};
const retPersist=persist;persist=function(){retPersist();syncPassportFromSession();renderPersistentPassport();renderBlindSpot()};

function rerenderRetention(){renderDaily();renderPersistentPassport();renderExperiencesLocale();if(duelState.active&&duelState.round<=5)renderDuelRound();else if(!duelState.active)renderDuelIdle();renderBlindSpot();enhanceRealMedia()}
document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>setTimeout(rerenderRetention,20)));

injectDaily();injectPersistentPassport();injectExperiences();ensureFilmActions();if(currentMovie)enhanceRealMedia();
