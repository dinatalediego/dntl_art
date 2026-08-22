const LIVES = [
  {
    id:'strategist', label:'Estratega', emoji:'♟', color:'#30241c',
    movies:[
      ['Moneyball',2011,'Datos contra intuición: una organización descubre que estaba midiendo mal el talento.'],
      ['Margin Call',2011,'Una anomalía en un modelo sube por toda la jerarquía y obliga a decidir antes que el resto.'],
      ["Molly's Game",2017,'Información asimétrica, incentivos, poder y lectura humana convertidos en ventaja.'],
      ['Thirteen Days',2000,'Escenarios, negociación y decisiones bajo presión donde cada movimiento cambia el tablero.']
    ]
  },
  {
    id:'architect', label:'Arquitecto', emoji:'⌂', color:'#24211b',
    movies:[
      ['Columbus',2017,'Espacios, vínculos y decisiones vitales narrados con una precisión casi arquitectónica.'],
      ['The Brutalist',2024,'Ambición, identidad, obra y poder vistos desde la vida de un arquitecto inmigrante.'],
      ['Playtime',1967,'Una ciudad moderna convertida en sistema visual: geometría, rutina y caos perfectamente coreografiado.'],
      ['Blade Runner 2049',2017,'Un universo construido hasta el último detalle donde arquitectura e identidad cuentan la historia.']
    ]
  },
  {
    id:'musician', label:'Músico', emoji:'♪', color:'#2b1f25',
    movies:[
      ['Whiplash',2014,'Maestría, obsesión y el precio psicológico de intentar ser extraordinario.'],
      ['Amadeus',1984,'El talento visto desde alguien suficientemente brillante para reconocer un genio superior.'],
      ['Tár',2022,'Poder, disciplina, reputación y arte dentro de una institución musical de élite.'],
      ['Sound of Metal',2019,'Cuando tu identidad depende de una habilidad y de pronto debes aprender otra forma de vivir.']
    ]
  },
  {
    id:'scientist', label:'Científico', emoji:'⌬', color:'#1b2522',
    movies:[
      ['Arrival',2016,'Inferir reglas desde información incompleta hasta descubrir que el modelo mental inicial era insuficiente.'],
      ['Contact',1997,'Ciencia, evidencia y fe chocan cuando aparece una señal que podría cambiar nuestra posición en el universo.'],
      ['Gattaca',1997,'Una sociedad optimizada por genética pone a prueba qué significa realmente predecir a una persona.'],
      ['Primer',2004,'Dos ingenieros descubren algo enorme y el problema pasa rápidamente de técnico a epistemológico.']
    ]
  },
  {
    id:'builder', label:'Constructor', emoji:'✦', color:'#201b17',
    movies:[
      ['The Social Network',2010,'Producto, ambición, velocidad y relaciones humanas deformadas por una idea que crece demasiado rápido.'],
      ['BlackBerry',2023,'Construcción de producto, ejecución, cultura y el riesgo de no evolucionar cuando el mercado sí lo hace.'],
      ['The Founder',2016,'La historia de alguien que descubre que el verdadero negocio no era exactamente el producto visible.'],
      ['Ford v Ferrari',2019,'Ingeniería y excelencia compitiendo tanto contra un rival como contra la burocracia interna.']
    ]
  },
  {
    id:'investigator', label:'Investigador', emoji:'◉', color:'#181b25',
    movies:[
      ['Zodiac',2007,'Un problema sin cierre empieza a consumir a quienes creen que una pieza más finalmente lo resolverá.'],
      ['Spotlight',2015,'La verdad aparece no por una revelación sino por método, persistencia y acumulación de evidencia.'],
      ['The Insider',1999,'Información, instituciones e incentivos chocan cuando revelar la verdad tiene un costo personal enorme.'],
      ['Anatomy of a Fall',2023,'Cada evidencia permite varias historias plausibles y obliga a convivir con la ambigüedad.']
    ]
  },
  {
    id:'designer', label:'Diseñador', emoji:'◇', color:'#28211c',
    movies:[
      ['Phantom Thread',2017,'Un oficio llevado al nivel de sistema personal: detalle, control, ritual y dependencia.'],
      ['Her',2013,'Una visión cálida y extraña de producto, interfaz, intimidad y tecnología invisible.'],
      ['The Grand Budapest Hotel',2014,'Diseño visual extremo al servicio de ritmo, nostalgia, oficio y una pequeña civilización propia.'],
      ['The Prestige',2006,'Dos creadores convierten innovación, secreto y obsesión en una competencia sin límite.']
    ]
  },
  {
    id:'explorer', label:'Explorador', emoji:'↟', color:'#1d1b17',
    movies:[
      ['Interstellar',2014,'Modelos, incertidumbre y exploración ante un problema demasiado grande para una sola vida.'],
      ['2001: A Space Odyssey',1968,'Una experiencia sobre inteligencia, tecnología y evolución que se resiste a darte respuestas fáciles.'],
      ['Moon',2009,'Aislamiento, trabajo y una anomalía que obliga a reinterpretar toda la realidad del protagonista.'],
      ['Annihilation',2018,'Un territorio desconocido altera las reglas de la biología y también las de quienes entran en él.']
    ]
  }
];

const STORAGE_KEY='dntl_art_other_life_session_v1';
let rotation=0, currentLife=null, currentMovie=null, seen=null;
let session=loadSession();

const $=s=>document.querySelector(s);
const wheel=$('#wheel'), spinBtn=$('#spinBtn'), lifeWord=$('#lifeWord'), lifeResult=$('#lifeResult');
const emptyState=$('#emptyState'), oracleContent=$('#oracleContent'), lifeEmoji=$('#lifeEmoji'), lifeLabel=$('#lifeLabel');
const movieTitle=$('#movieTitle'), movieMeta=$('#movieMeta'), movieReason=$('#movieReason');
const interestQuestion=$('#interestQuestion'), scoreRange=$('#scoreRange'), scoreValue=$('#scoreValue'), scaleLabel=$('#scaleLabel'), saveBtn=$('#saveBtn');

function buildWheel(){
  LIVES.forEach((life,i)=>{
    const el=document.createElement('span'); el.className='wheel-label'; el.textContent=life.label.toUpperCase();
    el.style.transform=`rotate(${i*45+22.5}deg) translateY(-50%)`;
    wheel.appendChild(el);
  });
}
function loadSession(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY))||[]}catch{return []}}
function persist(){localStorage.setItem(STORAGE_KEY,JSON.stringify(session));renderHistory()}
function randomMovie(life,exclude){const pool=life.movies.filter(m=>m[0]!==exclude);return pool[Math.floor(Math.random()*pool.length)]||life.movies[0]}

function spin(){
  spinBtn.disabled=true; resetQuestions();
  const index=Math.floor(Math.random()*LIVES.length);
  const segment=360/LIVES.length;
  const jitter=(Math.random()-.5)*(segment*.55);
  rotation += 360*5 + (360-(index*segment+segment/2)) + jitter;
  wheel.style.transform=`rotate(${rotation}deg)`;
  setTimeout(()=>{currentLife=LIVES[index];showLife(currentLife);spinBtn.disabled=false},4550);
}
function showLife(life){
  lifeWord.textContent=life.label.toLowerCase(); lifeResult.textContent=`te tocó ser ${life.label.toLowerCase()}`;
  currentMovie=randomMovie(life); showMovie();
}
function showMovie(){
  emptyState.classList.add('hidden'); oracleContent.classList.remove('hidden');
  lifeEmoji.textContent=currentLife.emoji; lifeLabel.textContent=`EN OTRA VIDA · ${currentLife.label}`;
  movieTitle.textContent=currentMovie[0]; movieMeta.textContent=`${currentMovie[1]} · RECOMENDACIÓN DEL ORÁCULO`;
  movieReason.textContent=currentMovie[2]; resetQuestions();
}
function resetQuestions(){
  seen=null; document.querySelectorAll('[data-seen]').forEach(b=>b.classList.remove('active'));
  interestQuestion.classList.add('hidden'); saveBtn.classList.add('hidden'); scoreRange.value=7;scoreValue.textContent=7;
}
function selectSeen(value,btn){
  seen=value; document.querySelectorAll('[data-seen]').forEach(b=>b.classList.toggle('active',b===btn));
  interestQuestion.classList.remove('hidden'); saveBtn.classList.remove('hidden');
  scaleLabel.textContent=value==='yes'?'¿Qué tanto te gustó?':'¿Qué tan probable es que la veas?';
  document.querySelector('.scale-ends span:first-child').textContent=value==='yes'?'1 — nada':'1 — nada';
  document.querySelector('.scale-ends span:last-child').textContent=value==='yes'?'10 — favorita':'10 — esta semana';
}
function saveFinding(){
  if(!currentLife||!currentMovie||!seen)return;
  session.push({
    timestamp:new Date().toISOString(), life_id:currentLife.id, life:currentLife.label,
    movie:currentMovie[0], year:currentMovie[1], seen:seen==='yes',
    score:Number(scoreRange.value), score_type:seen==='yes'?'rating':'watch_intent', reason:currentMovie[2]
  });
  persist(); saveBtn.textContent='guardado ✓';
  setTimeout(()=>{saveBtn.textContent='guardar este hallazgo'; currentMovie=randomMovie(currentLife,currentMovie[0]);showMovie()},900);
}
function renderHistory(){
  $('#sessionCount').textContent=`${session.length} ${session.length===1?'hallazgo':'hallazgos'}`;
  $('#downloadBtn').disabled=!session.length;
  const h=$('#history');
  if(!session.length){h.className='history-empty';h.textContent='Todavía no guardaste ninguna película.';return}
  h.className='history-list'; h.innerHTML=session.slice().reverse().map((r,i)=>`<div class="history-row"><span class="history-index">${String(session.length-i).padStart(2,'0')}</span><span class="history-life">${escapeHtml(r.life)}</span><span class="history-movie">${escapeHtml(r.movie)} <small>(${r.year})</small></span><span class="history-score">${r.seen?'★ gusto':'↗ intención'} ${r.score}/10</span></div>`).join('');
}
function escapeHtml(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function newSession(){if(!session.length||confirm('¿Borrar los hallazgos de esta sesión y empezar de cero?')){session=[];localStorage.removeItem(STORAGE_KEY);renderHistory()}}

async function downloadExcel(){
  if(!session.length)return;
  if(typeof ExcelJS==='undefined'){alert('No se pudo cargar el generador de Excel. Revisa tu conexión e inténtalo otra vez.');return}
  const wb=new ExcelJS.Workbook(); wb.creator='DNTL Art'; wb.created=new Date();
  const ws=wb.addWorksheet('Session',{views:[{state:'frozen',ySplit:1}]});
  ws.columns=[
    {header:'Timestamp',key:'timestamp',width:24},{header:'Otra vida',key:'life',width:18},{header:'Película',key:'movie',width:30},
    {header:'Año',key:'year',width:10},{header:'¿Ya la vio?',key:'seen',width:14},{header:'Tipo de score',key:'score_type',width:18},
    {header:'Score (1-10)',key:'score',width:14},{header:'Por qué apareció',key:'reason',width:66}
  ];
  session.forEach(r=>ws.addRow({...r,seen:r.seen?'Sí':'No',score_type:r.score_type==='rating'?'Gusto':'Intención de verla'}));
  const header=ws.getRow(1);header.height=28;
  header.eachCell(c=>{c.font={bold:true,color:{argb:'FFF3EAD9'}};c.fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF181512'}};c.alignment={vertical:'middle'}});
  ws.autoFilter={from:'A1',to:`H${session.length+1}`};
  ws.eachRow((row,n)=>{if(n>1){row.height=30;row.eachCell(c=>{c.alignment={vertical:'middle',wrapText:true};c.border={bottom:{style:'hair',color:{argb:'FFE7DED1'}}}})}});
  ws.getColumn('score').numFmt='0"/10"';

  const sum=wb.addWorksheet('Summary');
  sum.columns=[{header:'Otra vida',key:'life',width:22},{header:'Recomendaciones',key:'count',width:18},{header:'Ya vistas',key:'seen',width:14},{header:'Score promedio',key:'avg',width:18},{header:'Intención promedio',key:'intent',width:20}];
  const grouped=LIVES.map(l=>{const rows=session.filter(r=>r.life_id===l.id);if(!rows.length)return null;const ratings=rows.filter(r=>r.seen),intents=rows.filter(r=>!r.seen);return{life:l.label,count:rows.length,seen:ratings.length,avg:ratings.length?ratings.reduce((a,r)=>a+r.score,0)/ratings.length:null,intent:intents.length?intents.reduce((a,r)=>a+r.score,0)/intents.length:null}}).filter(Boolean);
  grouped.forEach(r=>sum.addRow(r));
  sum.getRow(1).eachCell(c=>{c.font={bold:true,color:{argb:'FFF3EAD9'}};c.fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF181512'}}});
  sum.getColumn('avg').numFmt='0.0';sum.getColumn('intent').numFmt='0.0';
  sum.addRow([]);sum.addRow(['Nota','Este archivo representa una sola sesión guardada localmente en el navegador.']);

  const buf=await wb.xlsx.writeBuffer(); const blob=new Blob([buf],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`dntl_art_session_${new Date().toISOString().slice(0,10)}.xlsx`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
}

spinBtn.addEventListener('click',spin);
$('#rerollMovieBtn').addEventListener('click',()=>{currentMovie=randomMovie(currentLife,currentMovie?.[0]);showMovie()});
document.querySelectorAll('[data-seen]').forEach(b=>b.addEventListener('click',()=>selectSeen(b.dataset.seen,b)));
scoreRange.addEventListener('input',()=>scoreValue.textContent=scoreRange.value);
saveBtn.addEventListener('click',saveFinding);$('#newSessionBtn').addEventListener('click',newSession);$('#downloadBtn').addEventListener('click',downloadExcel);
buildWheel();renderHistory();
