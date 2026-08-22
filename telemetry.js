/* DNTL ART — local product telemetry.
   No network calls: signals stay in the session until the user exports them. */

const TELEMETRY_STATE_KEY='dntl_art_telemetry_v1';
let telemetryState=loadTelemetry();
if(!telemetryState.sessionOpenedAt)telemetryState.sessionOpenedAt=Date.now();
saveTelemetry();

function loadTelemetry(){try{return JSON.parse(localStorage.getItem(TELEMETRY_STATE_KEY))||{}}catch{return{}}}
function saveTelemetry(){localStorage.setItem(TELEMETRY_STATE_KEY,JSON.stringify(telemetryState))}
function markMovieShown(){telemetryState.movieShownAt=Date.now();telemetryState.cardsShown=(telemetryState.cardsShown||0)+1;saveTelemetry()}
function enrichTelemetryRow(row){
  if(!row)return;
  const now=Date.now(),runCount=session.filter(r=>r.run_id===row.run_id).length;
  row.decision_ms=telemetryState.movieShownAt?Math.max(0,now-telemetryState.movieShownAt):null;
  row.session_elapsed_ms=Math.max(0,now-telemetryState.sessionOpenedAt);
  row.run_index=runCount;
  row.run_completed=runCount>=3;
  row.cards_shown_before_choice=telemetryState.cardsShown||null;
  persist();
}

const gameplayStyleLinks=[...document.querySelectorAll('link[rel="stylesheet"]')].filter(x=>String(x.href).includes('gameplay.css'));
if(gameplayStyleLinks.length>1)document.querySelectorAll('link[href="gameplay.css"]').forEach(x=>x.remove());

const telemetryShowMovie=showMovie;
showMovie=function(reset=true){telemetryShowMovie(reset);markMovieShown()};

const telemetrySaveQuick=saveQuick;
saveQuick=function(seenValue,score,reaction){
  const before=session.length;telemetrySaveQuick(seenValue,score,reaction);
  if(session.length>before)enrichTelemetryRow(session[session.length-1]);
};

saveBtn?.addEventListener('click',()=>setTimeout(()=>{
  const row=session[session.length-1];if(row&&!row.decision_ms)enrichTelemetryRow(row);
},30));

$('#newSessionBtn')?.addEventListener('click',()=>setTimeout(()=>{
  telemetryState={sessionOpenedAt:Date.now(),cardsShown:0};saveTelemetry();startRun(gameState.mode);$('#cinematicPassport')?.classList.add('hidden');
},20));

function metricRows(){
  const valid=session.filter(Boolean),decisions=valid.map(r=>Number(r.decision_ms)).filter(Number.isFinite),runs=new Set(valid.filter(r=>r.run_completed).map(r=>r.run_id));
  const quick=valid.filter(r=>r.quick_reaction&&r.quick_reaction!=='detailed');
  const avg=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:null;
  return [
    ['records',valid.length],['completed_runs',runs.size],['cards_shown',telemetryState.cardsShown||0],['avg_decision_seconds',avg(decisions)?.valueOf()/1000||null],
    ['seen_rate',valid.length?valid.filter(r=>r.seen).length/valid.length:null],['watchlist_rate',quick.length?quick.filter(r=>r.quick_reaction==='watchlist').length/quick.length:null],
    ['pass_rate',quick.length?quick.filter(r=>r.quick_reaction==='pass').length/quick.length:null],['avg_score',valid.length?avg(valid.map(r=>Number(r.score)||0)):null],
    ['avg_oracle_depth',valid.length?avg(valid.map(r=>Number(r.oracle_depth)||1)):null]
  ];
}

function installTelemetryExport(){
  const old=$('#downloadBtn');if(!old||old.dataset.telemetry)return;
  const clone=old.cloneNode(true);clone.dataset.telemetry='1';old.replaceWith(clone);clone.addEventListener('click',downloadTelemetryWorkbook);
}

async function downloadTelemetryWorkbook(){
  if(!session.length)return;if(typeof ExcelJS==='undefined'){alert(t('excelError'));return}
  const wb=new ExcelJS.Workbook();wb.creator='DNTL Art / Otra Vida';wb.created=new Date();wb.subject='Cinematic identity game session + local product signals';

  const passport=wb.addWorksheet('Passport');passport.mergeCells('A1:F2');passport.getCell('A1').value='OTRA VIDA / CINEMATIC PASSPORT';passport.getCell('A1').font={name:'Georgia',size:24,bold:true,color:{argb:'FFF3EAD9'}};passport.getCell('A1').fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF181512'}};passport.getCell('A1').alignment={vertical:'middle'};
  const profile=profileFromRows(runRows().length?runRows():session.slice(-3));
  [['Session ID',sessionId],['Run ID',gameState.runId],[gameT('playMode'),gameState.mode],[gameT('dominant'),profile?.dominantLife||''],[gameT('gaze'),profile?.gaze||''],[gameT('canon'),profile?.canon||''],[gameT('nextFilm'),profile?.next||''],['Exported',new Date()]].forEach((x,i)=>{passport.getCell(`A${i+4}`).value=x[0];passport.getCell(`B${i+4}`).value=x[1]});passport.columns=[{width:24},{width:42},{width:18},{width:18},{width:18},{width:18}];

  const ws=wb.addWorksheet('Session',{views:[{state:'frozen',ySplit:1}]});
  ws.columns=[
    {header:'session_id',key:'session_id',width:38},{header:'run_id',key:'run_id',width:38},{header:'timestamp',key:'timestamp',width:24},{header:'language',key:'language',width:10},{header:'play_mode',key:'play_mode',width:14},
    {header:'alternative_life',key:'life',width:19},{header:'movie',key:'movie',width:28},{header:'year',key:'year',width:9},{header:'director',key:'director',width:24},{header:'country',key:'country',width:18},{header:'runtime_min',key:'runtime_min',width:13},
    {header:'seen',key:'seen',width:9},{header:'score_type',key:'score_type',width:18},{header:'score_1_10',key:'score',width:13},{header:'attention_hook',key:'hook',width:18},{header:'quick_reaction',key:'quick_reaction',width:18},{header:'oracle_depth',key:'oracle_depth',width:14},{header:'runtime_filter',key:'runtime_filter',width:15},
    {header:'decision_ms',key:'decision_ms',width:14},{header:'session_elapsed_ms',key:'session_elapsed_ms',width:19},{header:'run_index',key:'run_index',width:11},{header:'run_completed',key:'run_completed',width:15},{header:'oracle_reason',key:'reason',width:58}
  ];
  session.forEach(r=>ws.addRow({...r,seen:r.seen?'yes':'no',run_completed:r.run_completed?'yes':'no'}));styleTable(ws,session.length,23);ws.autoFilter={from:'A1',to:`W${session.length+1}`};ws.getColumn('score').numFmt='0"/10"';

  const metrics=wb.addWorksheet('Product Metrics');metrics.columns=[{header:'metric',key:'metric',width:28},{header:'value',key:'value',width:22}];metricRows().forEach(([metric,value])=>metrics.addRow({metric,value}));styleTable(metrics,metrics.rowCount-1,2);metrics.getColumn('value').numFmt='0.00';

  const summary=wb.addWorksheet('Summary');summary.columns=[{header:'alternative_life',key:'life',width:22},{header:'recommendations',key:'count',width:18},{header:'already_seen',key:'seen',width:15},{header:'avg_score',key:'avg',width:14},{header:'accepted_7_plus',key:'accepted',width:18},{header:'avg_depth',key:'depth',width:14}];
  LIVES.map(l=>{const rows=session.filter(r=>r.life_id===l.id);if(!rows.length)return null;return{life:lifeName(l),count:rows.length,seen:rows.filter(r=>r.seen).length,avg:rows.reduce((a,r)=>a+Number(r.score||0),0)/rows.length,accepted:rows.filter(r=>Number(r.score)>=7).length,depth:rows.reduce((a,r)=>a+Number(r.oracle_depth||1),0)/rows.length}}).filter(Boolean).forEach(r=>summary.addRow(r));styleTable(summary,summary.rowCount-1,6);summary.getColumn('avg').numFmt='0.0';summary.getColumn('depth').numFmt='0.0';

  const buf=await wb.xlsx.writeBuffer(),blob=new Blob([buf],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`dntl_art_product_session_${new Date().toISOString().slice(0,10)}.xlsx`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
}

installTelemetryExport();

// Load the P0–P4 retention layer from the same origin/CDN revision as this script.
(function loadRetentionLayer(){
  if(window.__dntlRetentionLoading)return;window.__dntlRetentionLoading=true;
  const src=document.currentScript?.src||'';const base=src.includes('/')?src.slice(0,src.lastIndexOf('/')+1):'';
  if(!document.querySelector('link[data-dntl-retention]')){const l=document.createElement('link');l.rel='stylesheet';l.dataset.dntlRetention='1';l.href=base+'retention.css';document.head.appendChild(l)}
  const s=document.createElement('script');s.src=base+'retention.js';s.defer=false;s.onload=()=>{window.__dntlRetentionReady=true};s.onerror=()=>{console.warn('DNTL retention layer could not load')};document.body.appendChild(s);
})();
