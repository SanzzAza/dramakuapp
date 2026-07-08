const BASE_API="https://api.sonzaix.indevs.in";
const PLATFORMS={
  melolo:{label:"Melolo",base:`${BASE_API}/melolo`,icon:"https://i.ibb.co.com/p5T3Xmr/images.png",color:"linear-gradient(135deg,#facc15,#f59e0b)"},
  freereels:{label:"FreeReels",base:`${BASE_API}/freereels`,icon:"https://i.ibb.co.com/RTHpypGj/images.jpg",color:"linear-gradient(135deg,#34d399,#0ea5e9)"},
  dramanova:{label:"DramaNova",base:`${BASE_API}/dramanova`,icon:"https://i.ibb.co.com/B5kT5zZc/images-1.jpg",color:"linear-gradient(135deg,#e8455a,#ff6b35)"},
  goodshort:{label:"GoodShort",base:`${BASE_API}/goodshort`,icon:"https://i.ibb.co.com/0jprQJMS/images-2.jpg",color:"linear-gradient(135deg,#0ea5e9,#6366f1)"},
  meloshort:{label:"MeloShort",base:`${BASE_API}/meloshort`,icon:"https://i.ibb.co.com/3K3vKzJ/images-3.jpg",color:"linear-gradient(135deg,#a855f7,#ec4899)"},
  netshort:{label:"NetShort",base:`${BASE_API}/netshort`,icon:"https://i.ibb.co.com/rGj8LDsW/images-4.jpg",color:"linear-gradient(135deg,#0f766e,#0ea5e9)"},
  dramabox:{label:"DramaBox",base:`${BASE_API}/dramabox`,icon:"https://i.ibb.co.com/G3db6Rgn/images-5.jpg",color:"linear-gradient(135deg,#7c3aed,#db2777)"},
  moviebox:{label:"MovieBox",base:`${BASE_API}/moviebox`,icon:"https://i.ibb.co.com/Ng0ZPpsK/images-7.jpg",color:"linear-gradient(135deg,#1e293b,#0ea5e9)"},
};
const MOVIE_TABS=[
  {name:"Beranda",cat:"home"},
  {name:"Indonesia",cat:"indonesia"},
  {name:"Horror",cat:"horror"},
  {name:"Animasi",cat:"animasi"},
  {name:"Anime",cat:"series/anime"},
  {name:"Asia",cat:"asia"}
];
const DRAMA_TABS=["Terbaru","China","Korea","Aksi","Romantis","Fantasi","Komedi"];
let currentMovieCategory="home";
let currentPlatform="melolo";
try{const sp=localStorage.getItem("dramaku_platform");if(sp&&PLATFORMS[sp])currentPlatform=sp;}catch(e){}
function getAPI(){return PLATFORMS[currentPlatform].base;}
function homeUrl(page){
  if(currentPlatform==="moviebox"){
    const cat=currentMovieCategory||"home";
    if(cat==="home"){
      if(page<=1)return `${getAPI()}/homepage?tabId=0`;
      return `${getAPI()}/asia?page=${page-1}&perPage=10`;
    }
    return `${getAPI()}/${cat}?page=${page}&perPage=10`;
  }
  if(currentPlatform==="dramanova")return `${getAPI()}/home?page=${page}`;
  if(currentPlatform==="goodshort")return `${getAPI()}/home`;
  if(currentPlatform==="meloshort")return page===1?`${getAPI()}/home?page=${page}`:`${getAPI()}/new?reset=1`;
  if(currentPlatform==="netshort")return page===1?`${getAPI()}/home?page=${page}`:`${getAPI()}/new`;
  if(currentPlatform==="dramabox")return page===1?`${getAPI()}/home?page=${page}&lang=in`:`${getAPI()}/new?page=${page}&lang=in`;
  if(currentPlatform==="flickreels")return page===1?`${getAPI()}/home?page=${page}`:`${getAPI()}/new?page=${page}`;
  return `${getAPI()}/home?page=${page}&lang=${LANG}`;
}
function searchUrl(q,page){
  if(currentPlatform==="moviebox")return `${getAPI()}/search?q=${encodeURIComponent(q)}&page=${page}&perPage=10`;
  if(currentPlatform==="dramanova")return `${getAPI()}/search?q=${encodeURIComponent(q)}&page=${page}&size=10`;
  if(currentPlatform==="goodshort")return `${getAPI()}/search?q=${encodeURIComponent(q)}&page=${page}`;
  if(currentPlatform==="meloshort")return `${getAPI()}/search?query=${encodeURIComponent(q)}`;
  if(currentPlatform==="netshort")return `${getAPI()}/search?query=${encodeURIComponent(q)}&page=${page}`;
  if(currentPlatform==="dramabox")return `${getAPI()}/search?q=${encodeURIComponent(q)}&page=${page}&lang=in`;
  if(currentPlatform==="flickreels")return `${getAPI()}/search?q=${encodeURIComponent(q)}`;
  return `${getAPI()}/search?q=${encodeURIComponent(q)}&page=${page}&lang=${LANG}`;
}
function detailUrl(id){
  if(currentPlatform==="moviebox")return `${getAPI()}/detail?subjectId=${id}`;
  if(currentPlatform==="dramanova")return `${getAPI()}/detail?id=${id}`;
  if(currentPlatform==="goodshort")return `${getAPI()}/detail?bookId=${id}`;
  if(currentPlatform==="meloshort")return `${getAPI()}/detail?drama_id=${id}`;
  if(currentPlatform==="netshort")return `${getAPI()}/detail?id=${id}`;
  if(currentPlatform==="dramabox")return `${getAPI()}/detail?bookId=${id}&lang=in`;
  if(currentPlatform==="flickreels")return `${getAPI()}/detail?id=${id}`;
  return `${getAPI()}/detail?id=${id}&lang=${LANG}`;
}
function streamUrls(id,ep){
  if(currentPlatform==="moviebox"){
    const isMovie=(window._mbType&&window._mbType[id]==="MOVIE");
    if(isMovie)return [
      `${getAPI()}/download-movie?subjectId=${id}&resolution=720`,
      `${getAPI()}/download-movie?subjectId=${id}&resolution=480`,
      `${getAPI()}/stream?subjectId=${id}`,
      `${getAPI()}/watch?subjectId=${id}`,
      `${getAPI()}/play?subjectId=${id}`
    ];
    return [
      `${getAPI()}/download-series?subjectId=${id}&se=${ep}&resolution=720`,
      `${getAPI()}/download-series?subjectId=${id}&se=${ep}&resolution=480`,
      `${getAPI()}/stream?subjectId=${id}&episode=${ep}`,
      `${getAPI()}/watch?subjectId=${id}&episode=${ep}`,
      `${getAPI()}/play?subjectId=${id}&episode=${ep}`
    ];
  }
  if(currentPlatform==="freereels")return [`${getAPI()}/stream?dramaId=${id}&episode=${ep}&lang=${LANG}&_t=${Date.now()}`];
  if(currentPlatform==="dramanova")return [`${getAPI()}/stream?id=${id}&ep=${ep}`,`${getAPI()}/play?id=${id}&ep=${ep}`];
  if(currentPlatform==="goodshort")return [`${getAPI()}/stream?bookId=${id}`];
  if(currentPlatform==="meloshort"){const chId=window._vidMap?.[id]?.[String(ep)]||"";console.log("[DK] meloshort stream chId="+chId+" ep="+ep+" map=",window._vidMap?.[id]);return chId?[`${getAPI()}/stream?drama_id=${id}&chapter_id=${chId}`]:[`${getAPI()}/stream?drama_id=${id}&chapter_id=${id}&episode=${ep}`];}
  if(currentPlatform==="netshort")return [`${getAPI()}/stream?id=${id}&episode_no=${ep}`,`${getAPI()}/streamv2?id=${id}&ep=${ep}`];
  if(currentPlatform==="dramabox"){const chIdx=ep-1;return [`${getAPI()}/stream?bookId=${id}&chapterIndex=${chIdx}&lang=in`];}
  if(currentPlatform==="flickreels"){
    // Cek apakah episode sudah di-cache dari detail response
    const hlsCache=window._flickHlsMap?.[id];
    if(hlsCache&&String(ep) in hlsCache){
      // Episode ada di cache (bisa locked="", atau ada URL)
      const hlsUrl=hlsCache[String(ep)];
      // Selalu pakai direct (termasuk jika kosong/locked, biar ditangani di playVideo)
      return ["__flickreels_direct__:"+hlsUrl];
    }
    // Fallback: tidak ada di cache, fetch stream endpoint
    const chId=window._vidMap?.[id]?.[String(ep)]||"";
    if(chId)return [`${getAPI()}/stream?id=${id}&ep=${ep}&chapter_id=${chId}`];
    return [`${getAPI()}/stream?id=${id}&ep=${ep}`];
  }
  return [`${getAPI()}/streamv2?id=${id}&ep=${ep}&lang=${LANG}`];
}
const CODE="04AA0FC87491A42A11A33C32610CD172",LANG="id";
const HOME_KEYWORDS=["cinta","nikah","raja","dokter","ibu","ayah","istri","suami","kaya","dendam","kultivator","naga","dewa","CEO","jodoh","reinkarnasi","siluman","iblis","ratu","tentara","polisi","detektif","hantu","sihir","kerajaan","pangeran","pengkhianat","balas","takdir","tuan"];
const TAB_KEYWORDS={China:["cinta","china","kaisar","istana"],Korea:["korea","oppa","cinta"],Aksi:["tentara","polisi","aksi","petarung"],Romantis:["cinta","nikah","jodoh","romantis"],Fantasi:["kultivator","naga","dewa","siluman","sihir"],Komedi:["komedi","lucu","kocak"]};
let currentDramaId="",currentEp=1,totalEps=1,swipeStartY=0,swipeActive=false;
let isLoading=false,hasMore=false,currentSearch="",currentOffset=0;
let homeKeyIdx=0,homeSearchOffset=0,epCurrentGroup=0,hideTimer=null;
let prevPage="home",history_=[],watchEpHistory={};
let vid=document.getElementById("videoPlayer");
const playerBox=document.getElementById("playerBox");
const playerOverlay=document.getElementById("playerOverlay");
const epLabel=document.getElementById("epLabel");
const swipeInd=document.getElementById("swipeIndicator");
const seekIndLeft=document.getElementById("seekIndLeft");
const seekIndRight=document.getElementById("seekIndRight");
const seekIndLeftLabel=document.getElementById("seekIndLeftLabel");
const seekIndRightLabel=document.getElementById("seekIndRightLabel");
const seekBar=document.getElementById("seekBar");
const seekFill=document.getElementById("seekFill");
const seekThumb=document.getElementById("seekThumb");
const timeCurrent=document.getElementById("timeCurrent");
const timeDuration=document.getElementById("timeDuration");
const playPauseBtn=document.getElementById("playPauseBtn");
const playerTitle=document.getElementById("playerTitle");
const epPanel=document.getElementById("epPanel");
const epPanelGrid=document.getElementById("epPanelGrid");
const epPanelTitle=document.getElementById("epPanelTitle");
function pick(o,k){for(const x of k){if(o&&o[x]!==undefined&&o[x]!==null&&o[x]!=="")return o[x];}return "";}
function strVal(v){
  if(!v)return "";
  if(typeof v==="string"||typeof v==="number")return String(v);
  if(typeof v==="object")return v.url||v.src||v.link||v.resourceLink||v.coverUrl||v.imageUrl||"";
  return "";
}
function mbObj(x){return (currentPlatform==="moviebox" && x?.subject) ? x.subject : x;}
function getTitle(x){const y=mbObj(x);return pick(y,["drama_name","name","title","content","drama_title","book_name","bookName","series_name"])||pick(x,["drama_name","content","title"])||"Tanpa Judul"}
function getCover(x){
  const y=mbObj(x);
  let u=pick(y,["drama_cover","thumb_url","cover","cover_url","coverUrl","verticalCover","horizontalCover","bookCover","bookDetailCover","thumb","poster","image","img","coverImg","cover_img","verticalImage","horizontalImage"]);
  if(!u)u=pick(x,["drama_cover","cover","coverUrl","verticalCover","horizontalCover","image","poster","thumb","verticalImage","horizontalImage"]);
  return fixImgUrl(strVal(u))||"";
}
function getDesc(x){
  const y=mbObj(x);
  const raw=pick(y,["description","intro","drama_desc","plot","story","story_line","storyline","abstract","desc","summary","introduction","bookIntro","book_intro","synopsis"])||pick(x,["description","intro","drama_desc","plot","story","abstract","desc","summary"])||"";
  // Buang desc yang cuma slash atau karakter tidak berguna
  if(!raw||raw.trim()==="/"||raw.trim()==="-"||raw.trim().length<3)return"";
  return raw;
}
function getId(x){
  if(currentPlatform==="goodshort"||currentPlatform==="dramabox"){const bid=x?.bookId||x?.book_id;if(bid)return String(bid);}
  const y=mbObj(x);
  return String(pick(y,["subjectId","drama_id","id","series_id","book_id","bookId","novel_id"])||pick(x,["subjectId","drama_id","id"])||"")
}
function fmtTime(s){s=Math.floor(s||0);return Math.floor(s/60)+":"+String(s%60).padStart(2,"0");}
function isDub(t){return /dub|sulih/i.test(t)}
function cleanTitle(t){return t.replace(/\((dub|dubbing|sulih suara)\)/gi,"").trim()}
function fixImgUrl(u){
  if(!u)return "";
  u=String(u);
  // .heic tidak didukung banyak browser/webview, convert ke .jpeg
  return u.replace(/\.heic(\?|$)/i,".jpeg$1");
}
function isValidBook(x){
  return x&&typeof x==="object"&&(getId(x)||getCover(x)||getTitle(x)!=="Tanpa Judul");
}
function extractBooks(j){
  // MovieBox: homepage/category beda-beda. Harus flatten subjects dari section items dan banner.subject.
  if(currentPlatform==="moviebox"){
    const md=j?.data;
    const out=[];
    const push=(v)=>{
      if(!v)return;
      if(Array.isArray(v)){v.forEach(push);return;}
      if(v.subject) push(v.subject);
      else if(isValidBook(v)) out.push(v);
    };
    if(md&&typeof md==="object"&&!Array.isArray(md)){
      if(Array.isArray(md.subjects)) push(md.subjects);
      if(Array.isArray(md.results)){
        for(const r of md.results){
          if(Array.isArray(r.subjects)) push(r.subjects);
          else push(r);
        }
      }
      if(Array.isArray(md.items)){
        for(const sec of md.items){
          if(Array.isArray(sec.subjects)) push(sec.subjects);
          if(sec.banner&&Array.isArray(sec.banner.banners)){
            for(const b of sec.banner.banners){ if(b?.subject) push(b.subject); }
          }
          if(Array.isArray(sec.groups)){
            for(const g of sec.groups){ if(Array.isArray(g.subjects)) push(g.subjects); }
          }
        }
      }
      if(Array.isArray(md.list)){
        for(const sec of md.list){
          if(Array.isArray(sec.subjects)) push(sec.subjects);
          else push(sec);
        }
      }
    }
    if(Array.isArray(j?.items)) push(j.items);
    if(Array.isArray(j?.subjects)) push(j.subjects);
    // buang duplikat dan subjectId 0/banner kosong
    const seen=new Set();
    return out.filter(x=>{
      const id=getId(x);
      if(!id||id==="0"||seen.has(id))return false;
      seen.add(id);return true;
    });
  }
  // ── FlickReels: {type:"home"|"new", data:[{drama_id, drama_name, cover, ...}]}
  // Atau: {data:{dramas:[...]}} atau {dramas:[...]}
  if(currentPlatform==="flickreels"){
    if(Array.isArray(j?.data)&&j.data.length&&isIA(j.data))return j.data.filter(isValidBook);
    if(Array.isArray(j?.data?.dramas)&&j.data.dramas.length)return j.data.dramas.filter(isValidBook);
    if(Array.isArray(j?.dramas)&&j.dramas.length)return j.dramas.filter(isValidBook);
    if(Array.isArray(j?.data?.list)&&j.data.list.length)return j.data.list.filter(isValidBook);
    if(Array.isArray(j?.data?.data)&&j.data.data.length&&isIA(j.data.data))return j.data.data.filter(isValidBook);
  }
  // DramaBox & GoodShort: {data:{bookList:[...]}} or {data:{list:[...]}} or {data:{sections:[{bookList:[...]}]}}
  if((currentPlatform==="goodshort"||currentPlatform==="dramabox")&&j?.data&&typeof j.data==="object"&&!Array.isArray(j.data)){
    if(Array.isArray(j.data.bookList)&&j.data.bookList.length)return j.data.bookList.filter(isValidBook);
    if(Array.isArray(j.data.list)&&j.data.list.length)return j.data.list.filter(isValidBook);
    if(Array.isArray(j.data.data)&&j.data.data.length)return j.data.data.filter(isValidBook);
    if(Array.isArray(j.data.sections)&&j.data.sections.length){
      const a=[];for(const s of j.data.sections){
        if(Array.isArray(s.bookList))a.push(...s.bookList);
        else if(Array.isArray(s.books))a.push(...s.books);
      }
      if(a.length)return a.filter(isValidBook);
    }
  }
  if(j?.data&&typeof j.data==="object"&&!Array.isArray(j.data)){
    if(Array.isArray(j.data.sections)&&j.data.sections.length){
      const a=[];for(const s of j.data.sections)if(Array.isArray(s.books))a.push(...s.books);
      if(a.length)return a.filter(isValidBook);
    }
    if(Array.isArray(j.data.list)&&j.data.list.length)return j.data.list.filter(isValidBook);
    if(Array.isArray(j.data.data)&&j.data.data.length)return j.data.data.filter(isValidBook);
  }
  // API baru: {type:"home", data:[{books:[...]}, ...]}
  if(Array.isArray(j?.data)&&j.data.length){
    if(j.data[0]&&Array.isArray(j.data[0].books)){
      const a=[];for(const c of j.data)if(Array.isArray(c.books))a.push(...c.books);
      if(a.length)return a.filter(isValidBook);
    }
    if(isIA(j.data))return j.data.filter(isValidBook);
  }
  // fallback lama
  try{const cd=j?.cell?.cell_data;if(Array.isArray(cd)){const a=[];for(const c of cd)if(Array.isArray(c.books))a.push(...c.books);if(a.length)return a.filter(isValidBook);}}catch(e){}
  const fa=findArr(j);
  if(fa.length)return fa.filter(isValidBook);
  return[];
}
function isIA(a){return a.length>0&&a[0]&&(a[0].id||a[0].drama_id||a[0].name||a[0].title||a[0].drama_name||a[0].book_id||a[0].bookId||a[0].book_name||a[0].bookName||a[0].subjectId);}
function findArr(o,d=0){
  if(d>6)return[];if(Array.isArray(o)&&isIA(o))return o;if(!o||typeof o!=="object")return[];
  for(const k of["dramas","drama_list","list","data","books","bookList","book_list","items","results","recommend"]){if(Array.isArray(o[k])&&isIA(o[k]))return o[k];}
  for(const k of Object.keys(o)){if(Array.isArray(o[k])&&isIA(o[k]))return o[k];if(o[k]&&typeof o[k]==="object"){const a=findArr(o[k],d+1);if(a.length)return a;}}return[];
}
async function getJson(url){
  try{
    const r=await fetch(url,{cache:"no-store"});
    if(!r.ok)throw new Error("HTTP "+r.status);
    // Fix: angka besar (>15 digit) di JSON akan corrupt jika pakai r.json()
    // Ganti dulu jadi string sebelum parse
    const txt=await r.text();
    // Protect all large integers (15+ digits) from floating point corruption
    const safe=txt.replace(/:\s*(\d{15,})([,\}\]])/g,":\"$1\"$2");
    return JSON.parse(safe);
  }catch(e){
    if(!navigator.onLine)showToast("Tidak ada koneksi internet");
    throw e;
  }
}
/* ── PAGES ── */
function _hideAll(){
  document.getElementById("homePage").style.display="none";
  document.getElementById("searchPage").classList.remove("active");
  document.getElementById("detailPage").classList.remove("active");
  document.getElementById("mePage").classList.remove("active");
  document.getElementById("historyPage").classList.remove("active");
  document.getElementById("favPage").classList.remove("active");
  document.getElementById("catTabs").style.display="none";
  document.querySelectorAll(".nav-btn").forEach(b=>b.classList.remove("active"));
}
function showHome(){
  _hideAll();
  document.getElementById("homePage").style.display="flex";
  document.getElementById("catTabs").style.display="flex";
  document.getElementById("navHome").classList.add("active");
  renderContinueSection();
}
function showSearch(){
  _hideAll();
  document.getElementById("searchPage").classList.add("active");
  document.getElementById("navSearch").classList.add("active");
  document.getElementById("searchInput").focus();
}
function showDetailPage(){
  _hideAll();
  document.getElementById("detailPage").classList.add("active");
}
function showMe(){
  _hideAll();
  document.getElementById("mePage").classList.add("active");
  document.getElementById("navMe").classList.add("active");
  document.getElementById("statHistory").textContent=history_.length;
  const totalEpWatched=history_.reduce((acc,x)=>{
    const ep=Number(x.serial_count||x.episode_count||x.last_chapter_index||0);
    return acc+(ep>0?ep:0);
  },0);
  document.getElementById("statEpisode").textContent=totalEpWatched||0;
  document.getElementById("statFav").textContent=favorites.length;
}
function backFromDetail(){
  if(prevPage==="search") showSearch();
  else if(prevPage==="history") showHistory();
  else if(prevPage==="fav") showFav();
  else showHome();
}
function showHistory(){
  _hideAll();
  document.getElementById("historyPage").classList.add("active");
  document.getElementById("navHistory").classList.add("active");
  renderHistoryGrid();
}
function renderHistoryGrid(){
  const g=document.getElementById("historyGrid");
  if(!history_.length){
    g.innerHTML='<div class="loading" style="grid-column:1/-1"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="1.5" style="margin-bottom:8px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span>Belum ada riwayat tonton</span></div>';
    return;
  }
  g.innerHTML=history_.map(x=>renderGCard(x)).join("");
}
function clearHistory(){
  if(!history_.length)return;
  history_=[];
  watchEpHistory={};
  renderHistoryGrid();
  showToast("Riwayat dihapus");
}
/* ── TOAST ── */
let _toastTimer=null;
function showToast(msg){
  const t=document.getElementById("toast");
  t.textContent=msg;t.classList.add("show");
  clearTimeout(_toastTimer);
  _toastTimer=setTimeout(()=>t.classList.remove("show"),2500);
}
/* ── TABS ── */
function setTab(el,name){
  document.querySelectorAll(".cat-tab").forEach(b=>b.classList.remove("active"));
  el.classList.add("active");
  const kws=TAB_KEYWORDS[name]||null;
  homeKeyIdx=0;homeSearchOffset=0;hasMore=true;currentSearch="";
  document.getElementById("gridList").innerHTML='<div class="loading" style="grid-column:1/-1"><div class="spinner"></div></div>';
  loadGrid(false,kws);
}
/* ── LOCALSTORAGE PERSISTENCE ── */
function lsSave(key,val){try{localStorage.setItem(key,JSON.stringify(val));}catch(e){}}
function lsLoad(key,def){try{const v=localStorage.getItem(key);return v?JSON.parse(v):def;}catch(e){return def;}}
// Load persisted data
let favorites=lsLoad('dk_fav',[]);
let continueData=lsLoad('dk_continue',{}); // {id:{ep,total,title,cover,time,duration,ts}}
function savePersist(){
  lsSave('dk_fav',favorites);
  lsSave('dk_continue',continueData);
}
/* ── FAVORIT ── */
function isFav(id){return favorites.some(x=>getId(x)===id)}
function toggleFav(id){
  if(isFav(id)){
    favorites=favorites.filter(x=>getId(x)!==id);
    showToast("Dihapus dari tersimpan");
  } else {
    const d=history_.find(x=>getId(x)===id);
    if(d){favorites.unshift(d);if(favorites.length>50)favorites.pop();}
    showToast("Disimpan!");
  }
  savePersist();
  updateBookmarkBtn(id);
}
function updateBookmarkBtn(id){
  const btn=document.getElementById('bookmarkBtn');
  if(!btn)return;
  const saved=isFav(id);
  btn.classList.toggle('saved',saved);
  btn.innerHTML=saved
    ?`<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg> Tersimpan`
    :`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg> Simpan`;
}
function showFav(){
  _hideAll();
  document.getElementById('favPage').classList.add('active');
  renderFavGrid();
}
function renderFavGrid(){
  const g=document.getElementById('favGrid');
  if(!favorites.length){
    g.innerHTML=`<div class="fav-empty" style="grid-column:1/-1">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
      <span>Belum ada drama yang disimpan</span>
      <span style="font-size:12px;font-weight:600;color:var(--muted)">Buka detail drama lalu tekan Simpan</span>
    </div>`;
    return;
  }
  g.innerHTML=favorites.map(x=>renderGCard(x)).join('');
}
function clearFav(){
  if(!favorites.length)return;
  favorites=[];savePersist();
  renderFavGrid();
  showToast('Semua tersimpan dihapus');
}
/* ── CONTINUE WATCHING ── */
function getContinuePct(d){
  const time=Number(d?.time||0),dur=Number(d?.duration||0);
  if(dur>0)return Math.min(100,Math.max(0,Math.round((time/dur)*100)));
  return Math.min(100,Math.max(0,Math.round((Number(d?.ep||1)/Math.max(Number(d?.total||1),1))*100)));
}
function saveContinue(id,ep,total,title,cover,time,duration){
  if(!id)return;
  const old=continueData[id]||{};
  const next={
    ep:Number(ep||old.ep||1),
    total:Number(total||old.total||1),
    title:title||old.title||'Drama',
    cover:cover||old.cover||'',
    time:(time!==undefined&&time!==null)?Math.floor(Number(time)||0):(old.ep==Number(ep)?Number(old.time||0):0),
    duration:(duration!==undefined&&duration!==null)?Math.floor(Number(duration)||0):Number(old.duration||0),
    ts:Date.now()
  };
  continueData[id]=next;
  savePersist();
}
function getContinueMeta(id){return continueData[id]||null;}
function resumeContinue(id){
  const d=getContinueMeta(id);
  if(!d)return loadDetail(id);
  playVideo(id,Number(d.ep||1),Number(d.total||1),Number(d.time||0));
}
function renderContinueSection(){
  const items=Object.entries(continueData)
    .filter(([_,d])=>d&&d.cover&&d.title)
    .sort((a,b)=>Number(b[1].ts||0)-Number(a[1].ts||0))
    .slice(0,10);
  const sec=document.getElementById('sectionContinue');
  const list=document.getElementById('listContinue');
  if(!items.length){sec.style.display='none';return;}
  sec.style.display='block';
  list.innerHTML=items.map(([id,d])=>{
    const pct=getContinuePct(d);
    const timeText=(Number(d.duration||0)>0)?`${fmtTime(d.time||0)} / ${fmtTime(d.duration||0)}`:`EP ${d.ep}/${d.total}`;
    return`<div class="continue-h-card" onclick="resumeContinue('${id}')">
      <img class="continue-h-card-img" src="${d.cover}" loading="lazy" referrerpolicy="no-referrer" onload="this.classList.add('img-loaded')" onerror="this.src='';this.style.background='#1c1c2e'">
      <div class="continue-h-card-ep">
        EP ${d.ep} • ${timeText}
        <div class="continue-h-card-bar"><div class="continue-h-card-bar-fill" style="width:${pct}%"></div></div>
      </div>
      <div class="continue-h-card-title">${d.title||'Drama'}</div>
    </div>`;
  }).join('');
}
/* ── RENDER ── */
function renderHCard(x){
  const id=getId(x),cover=getCover(x),title=cleanTitle(getTitle(x));
  const ep=x.serial_count||x.episode_count||x.last_chapter_index||x.chapterCount||x.totalChapter||"?";
  return`<div class="h-card" onclick="loadDetail('${id}')">
    <img class="h-card-img" src="${cover}" loading="lazy" referrerpolicy="no-referrer" onerror="this.src='';this.style.background='#1c1c2e'">
    <div class="h-card-title">${title}</div>
    <div class="h-card-ep">${ep} Episode</div>
  </div>`;
}
function renderGCard(x){
  const id=getId(x),cover=getCover(x),title=cleanTitle(getTitle(x));
  const dub=isDub(getTitle(x));
  const cd=continueData[id];
  const pct=cd?getContinuePct(cd):0;
  const ep=x.serial_count||x.episode_count||x.last_chapter_index||x.chapterCount||x.totalChapter||"";
  const platLabel=PLATFORMS[currentPlatform]?.label||"";
  return`<div class="g-card" onclick="loadDetail('${id}')">
    <div class="g-card-img-wrap">
      <img class="g-card-img" src="${cover}" loading="lazy" referrerpolicy="no-referrer" onerror="this.src='';this.style.background='#1c1c2e'">
      ${platLabel?`<span class="g-card-plat">${platLabel}</span>`:''}
      ${ep?`<span class="g-card-ep-badge">${ep} EP</span>`:''}
      ${pct>0?`<div class="g-card-progress"><div class="g-card-progress-fill" style="width:${pct}%"></div></div>`:''}
    </div>
    <div class="g-card-title">${title}</div>
    ${dub?'<div class="g-card-badge"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align:-1px"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg> DUB</div>':''}
  </div>`;
}
/* ── HOME LOAD ── */
let _heroAutoSlide=null;
async function loadHome(){
  homeKeyIdx=0;homeSearchOffset=1;hasMore=true;
  // skeleton loading
  document.getElementById("gridList").innerHTML=Array.from({length:6},()=>`
    <div class="g-card">
      <div class="skel" style="width:100%;aspect-ratio:2/3"></div>
      <div class="skel" style="height:12px;margin-top:8px;width:80%"></div>
      <div class="skel" style="height:10px;margin-top:5px;width:50%"></div>
    </div>`).join("");
  try{
    const json=await getJson(homeUrl(1));
    const all=extractBooks(json);
    if(all.length>=6){
      const heroItems=all.slice(0,5);
      document.getElementById("heroWrap").style.display="block";
      const carousel=document.getElementById("heroCarousel");
      carousel.innerHTML=heroItems.map((x,i)=>`
        <div class="hero-slide" onclick="loadDetail('${getId(x)}')">
          <img src="${getCover(x)}" referrerpolicy="no-referrer" onerror="this.src='';this.style.background='#1c1c2e'">
          <div class="hero-slide-overlay">
            <div class="hero-badge"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align:-1px"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Trending</div>
            <div class="hero-title">${cleanTitle(getTitle(x))}</div>
          </div>
        </div>`).join("");
      const dots=document.getElementById("heroDots");
      dots.innerHTML=heroItems.map((_,i)=>`<div class="hero-dot${i===0?' active':''}"></div>`).join("");
      // update dots saat scroll manual
      carousel.addEventListener("scroll",()=>{
        const i=Math.round(carousel.scrollLeft/carousel.offsetWidth);
        document.querySelectorAll(".hero-dot").forEach((d,j)=>d.classList.toggle("active",j===i));
      },{passive:true});
      // auto-slide setiap 4 detik
      clearInterval(_heroAutoSlide);
      let _heroIdx=0;
      _heroAutoSlide=setInterval(()=>{
        _heroIdx=(_heroIdx+1)%heroItems.length;
        carousel.scrollTo({left:_heroIdx*carousel.offsetWidth,behavior:"smooth"});
      },4000);
      const trend=all.slice(5);
      if(trend.length){
        document.getElementById("sectionTerbaru").style.display="block";
        document.getElementById("listTerbaru").innerHTML=trend.map(x=>renderHCard(x)).join("");
      }
      document.getElementById("gridList").innerHTML=all.map(x=>renderGCard(x)).join("");
    } else {
      document.getElementById("gridList").innerHTML=all.map(x=>renderGCard(x)).join("");
    }
  }catch(e){document.getElementById("gridList").innerHTML='<div class="loading" style="grid-column:1/-1">Gagal load</div>';}
  loadGrid(true);
  renderContinueSection();
}
async function loadGrid(append,kws){
  if(isLoading)return;
  isLoading=true;
  try{
    const json=await getJson(homeUrl(homeSearchOffset+1));
    const list=extractBooks(json);
    const more=Array.isArray(list)&&list.length>0;
    if(more){homeSearchOffset+=1;}
    hasMore=more;
    const g=document.getElementById("gridList");
    if(append){const t=document.createElement("div");t.innerHTML=list.map(x=>renderGCard(x)).join("");while(t.firstChild)g.appendChild(t.firstChild);}
    else{g.innerHTML=list.map(x=>renderGCard(x)).join("");}
  }catch(e){}
  finally{isLoading=false;}
}
/* ── SEARCH ── */
let sOffset=0,sMore=false,sQ="";
async function doSearch(append){
  const q=document.getElementById("searchInput").value.trim();
  if(!q)return;
  if(isLoading)return;
  if(!append){sOffset=0;sQ=q;document.getElementById("searchGrid").innerHTML='<div class="loading" style="grid-column:1/-1"><div class="spinner"></div></div>';}
  isLoading=true;
  try{
    const json=await getJson(searchUrl(q,sOffset+1));
    const list=extractBooks(json);
    sMore=Array.isArray(list)&&list.length>0;
    if(sMore)sOffset+=1;
    const g=document.getElementById("searchGrid");
    if(append){const t=document.createElement("div");t.innerHTML=list.map(x=>renderGCard(x)).join("");while(t.firstChild)g.appendChild(t.firstChild);}
    else{g.innerHTML=list.map(x=>renderGCard(x)).join("");}
  }catch(e){document.getElementById("searchGrid").innerHTML='<div class="loading" style="grid-column:1/-1">Gagal cari</div>';}
  finally{isLoading=false;}
}
/* ── DETAIL ── */
let _detailId="",_detailTotal=0,_detailTitle="";
async function loadDetail(id){
  prevPage=document.getElementById("searchPage").classList.contains("active")?"search":
            document.getElementById("historyPage").classList.contains("active")?"history":
            document.getElementById("favPage").classList.contains("active")?"fav":"home";
  showDetailPage();
  document.getElementById("detailScroll").innerHTML=`<div class="loading"><div class="spinner"></div>Memuat...</div>`;
  try{
    const d=await getJson(detailUrl(id));
    // API detail: flat response {code, id, title, cover, episodes, intro, videos:[{episode,vid}]}
    // GoodShort: {data:{book:{...}, list:[{id,index,chapterName,cdnList,multiVideos}]}}
    let dd=d?.data||d;
    if((currentPlatform==="goodshort"||currentPlatform==="dramabox")&&dd?.book){
      const bk=dd.book;
      const cl=dd.list||dd.chapterList||[];
      const apiCount=Number(bk.chapterCount||0);
      const listCount=cl.length;
      bk.chapterCount=apiCount||listCount;
      bk._chapterList=cl;
      dd={...bk,_chapterList:cl,_rawData:dd};
    }
    // MeloShort: {data:{drama:{drama_id,drama_name,drama_cover,drama_desc,...}, episodes:[...]}}
    if(currentPlatform==="meloshort"&&dd?.drama&&typeof dd.drama==="object"){
      const drm=dd.drama;
      const eps=dd.episodes||dd.episode_list||[];
      dd={...drm,episodes:eps,_episodeList:eps,_rawData:dd};
    }
    let mbIsMovie=false;
    if(currentPlatform==="moviebox"){
      const ty=String(dd?.subjectType||dd?.type||dd?.subjectInfo?.subjectType||"").toUpperCase();
      mbIsMovie=ty.includes("MOVIE")||(!ty.includes("TV")&&!ty.includes("SERIES")&&!Array.isArray(dd?.seasons)&&!dd?.episodeCount&&!dd?.totalEpisode);
      window._mbType=window._mbType||{};
      window._mbType[id]=mbIsMovie?"MOVIE":"TV";
    }
    let total;
    if(currentPlatform==="moviebox"&&mbIsMovie){
      total=1;
    }else{
      total=Number(dd?.info?.totalEpisodes||dd?.info?.updateEpisode||dd?.episodes?.dramaListResponseList?.length||(Array.isArray(dd?.episodes)?dd.episodes.length:dd?.episodes)||dd?.total_episodes||dd?.chapters_total||dd?.episode_count||dd?.serial_count||dd?.totalEpisodes||dd?.chapterCount||dd?.totalChapter||dd?.chapter_count||dd?.episodeCount||dd?.totalEpisode||dd?.seasons?.[0]?.episodeCount||0)||0;
      if(!total)total=(currentPlatform==="moviebox")?24:80;
    }
    const cover=fixImgUrl(getCover(dd)||dd?.video_list?.[0]?.cover||dd?.videos?.[0]?.cover||""),title=cleanTitle(getTitle(dd)),desc=getDesc(dd);
    const _detailDebug='';
    // Simpan mapping vid_id per episode untuk playVideo
    window._vidMap=window._vidMap||{};
    window._vidMap[id]={};
    // FlickReels: simpan hls_url dan is_locked per episode ke _flickHlsMap
    window._flickHlsMap=window._flickHlsMap||{};
    window._flickHlsMap[id]={};
    window._flickLockedMap=window._flickLockedMap||{};
    window._flickLockedMap[id]={};
    // Support berbagai nama field dari API + GoodShort _chapterList
    let _vlist=[];
    if(dd?._chapterList)_vlist=dd._chapterList;
    else if(dd?._episodeList)_vlist=dd._episodeList;
    else if(dd?.chapters&&Array.isArray(dd.chapters))_vlist=dd.chapters;
    else if(currentPlatform==="flickreels"&&Array.isArray(dd?.episodes))_vlist=dd.episodes;
    else if(currentPlatform==="meloshort"&&Array.isArray(dd?.episodes))_vlist=dd.episodes;
    else if(dd?.episode_list&&Array.isArray(dd.episode_list))_vlist=dd.episode_list;
    else if(dd?.videos&&Array.isArray(dd.videos))_vlist=dd.videos;
    else if(dd?.video_list&&Array.isArray(dd.video_list))_vlist=dd.video_list;
    else if(dd?.chapterList&&Array.isArray(dd.chapterList))_vlist=dd.chapterList;
    if(Array.isArray(_vlist)&&_vlist.length){
      _vlist.forEach((v,i)=>{
        // MeloShort: chapter_index is 1-based
        // GoodShort: index is 0-based, ep is 1-based
        const epNum=(currentPlatform==="meloshort")?(v.chapter_index||(v.index!=null?v.index+1:null)||v.episode||(i+1)):(currentPlatform==="netshort")?(v.episode_no||v.episode_number||v.episode||v.ep||(i+1)):(currentPlatform==="goodshort"||currentPlatform==="dramabox")?((v.index!=null?v.index:i)+1):(v.episode||v.ep||v.index||v.chapter||v.num||v.episode_number);
        const vidId=(v.chapter_id||v.shortPlayId||v.vid||v.video_id||v.vid_id||v.play_id||v.episode_id||v.id);
        if(epNum!=null&&vidId) window._vidMap[id][String(epNum)]=String(vidId);
        // FlickReels: simpan hls_url dan lock status
        if(currentPlatform==="flickreels"&&epNum!=null){
          window._flickHlsMap[id][String(epNum)]=v.hls_url||"";
          window._flickLockedMap[id][String(epNum)]=!!(v.is_locked||!v.is_free||!v.hls_url);
        }
      });
    }
    _detailId=id;_detailTotal=total;_detailTitle=title;
    document.getElementById("detailTopTitle").textContent=title;
    history_=history_.filter(x=>getId(x)!==id);
    history_.unshift({...dd,id});if(history_.length>20)history_.pop();
    const cd=continueData[id];
    const continueBanner=cd?`
      <div class="continue-banner" onclick="resumeContinue('${id}')">
        <div class="continue-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="#000"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>
        <div class="continue-text">
          <div class="continue-label">Lanjutkan Nonton</div>
          <div class="continue-ep">Episode ${cd.ep} • ${cd.duration?fmtTime(cd.time||0)+' / '+fmtTime(cd.duration||0):('dari '+cd.total)}</div>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </div>`:'';
    document.getElementById("detailScroll").innerHTML=`
      ${_detailDebug}
      <div class="detail-cover-wrap"><img src="${cover}" referrerpolicy="no-referrer" onerror="this.src='';this.style.background='#1c1c2e'"></div>
      <div class="detail-info">
        <div class="detail-row">
          <img class="detail-thumb" src="${cover}" referrerpolicy="no-referrer" onerror="this.src='';this.style.background='#1c1c2e'">
          <div class="detail-meta">
            <div class="detail-title" id="dramaTitle">${title}</div>
            <div class="detail-tags">
              ${isDub(title)?'<span class="detail-tag"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align:-1px"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg> DUB</span>':''}
              <span class="detail-tag"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align:-1px"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg> ${currentPlatform==="moviebox"?(mbIsMovie?"Film":"Series"):"Drama"}</span>
            </div>
            <div class="detail-ep-count"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> ${mbIsMovie?"Film":total+" Episode"}</div>
          </div>
        </div>
      </div>
      <div class="detail-actions">
        <button class="btn-bookmark" id="bookmarkBtn" onclick="toggleFav('${id}')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg> Simpan
        </button>
        <button class="btn-play-first" onclick="playVideo('${id}',${cd?cd.ep:1},${total})">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          ${mbIsMovie?"Putar Film":(cd?`Lanjut EP ${cd.ep}`:'Putar EP 1')}
        </button>
      </div>
      ${continueBanner}
      <div class="detail-desc">${desc}</div>
      ${mbIsMovie?'':`<div class="eps-section">
        <div class="eps-label">Episode</div>
        <div class="eps-grid">
          ${Array.from({length:Number(total)},(_,i)=>{
            const ep=i+1;
            const isActive=ep===currentEp&&id===currentDramaId;
            const isLocked=currentPlatform==="flickreels"&&window._flickLockedMap?.[id]?.[String(ep)];
            return`<div class="ep-btn${isActive?' active-ep':''}${isLocked?' ep-locked':''}" id="epbtn-${ep}" onclick="playVideo('${id}',${ep},${total})">${isLocked?'🔒 ':''}EP ${ep}</div>`;
          }).join("")}
        </div>
      </div>`}`;
  updateBookmarkBtn(id);
  }catch(e){const eMsg=e?.message||String(e)||"unknown";document.getElementById("detailScroll").innerHTML='<div class="loading">Gagal memuat detail<br><small style="font-size:10px;opacity:.6;word-break:break-all">'+detailUrl(id)+'</small><br><small style="font-size:10px;color:var(--accent)">'+eMsg+'</small></div>';}
}
/* ── INFINITE SCROLL ── */
const mainScroll=document.getElementById("mainScroll");
const sentinel=document.getElementById("scrollSentinel");
new IntersectionObserver(e=>{
  if(e[0].isIntersecting&&hasMore&&!isLoading){
      loadGrid(true);
  }
},{root:mainScroll,rootMargin:"200px"}).observe(sentinel);
const searchResults=document.getElementById("searchResults");
const searchSentinel=document.getElementById("searchSentinel");
new IntersectionObserver(e=>{if(e[0].isIntersecting&&sMore&&!isLoading)doSearch(true);},{root:searchResults,rootMargin:"200px"}).observe(searchSentinel);
/* ── PLAYER ── */
function getVideoUrl(j){
  if(!j)return"";
  const c=[j.url,j.stream_url,j.video_url,j.videoUrl,j.playUrl,j.play_url,j.src,j.m3u8,j.hls_url,j.data?.url,j.data?.stream_url,j.data?.video_url,j.data?.videoUrl,j.data?.m3u8,j.data?.hls_url];
  for(const v of c){if(v&&typeof v==="string"&&v.startsWith("http"))return v;}
  if(j.data&&typeof j.data==="object"){for(const v of Object.values(j.data)){if(v&&typeof v==="string"&&v.startsWith("http")&&(v.includes(".mp4")||v.includes(".m3u8")))return v;}}
  const q=j.qualityList||j.quality_list||j.data?.qualityList||[];
  if(Array.isArray(q)&&q.length){const b=q.find(x=>/480/i.test(String(x.label||x.quality||"")))||q[0];return b?.url||b?.videoUrl||b?.play_url||"";}
  return"";
}
function extractSubtitleUrl(json){
  if(!json)return"";
  const md=json?.data||json;
  // MovieBox movie: {data:{subtitle:{url}}}
  if(md?.subtitle?.url&&String(md.subtitle.url).startsWith("http"))return md.subtitle.url;
  // MovieBox series: {data:{episodes:[{ep, subtitle:{url}}]}}
  if(Array.isArray(md?.episodes)&&md.episodes.length){
    const epNow=Number(window._gsCurrentEp||currentEp||1);
    const item=md.episodes.find(x=>Number(x.ep||x.episode||x.index)===epNow)||md.episodes[0];
    if(item?.subtitle?.url&&String(item.subtitle.url).startsWith("http"))return item.subtitle.url;
  }
  // MeloShort / NetShort / FreeReels: {data:{subtitles:[{language,url,format}]}}
  if(Array.isArray(md?.subtitles)&&md.subtitles.length){
    const idTrack=md.subtitles.find(t=>t.language==="id-ID"||t.language==="ind-ID"||t.language==="id"||t.language==="in"||t.lan==="in_id");
    const t=idTrack||md.subtitles[0];
    if(t?.url)return t.url;
  }
  const tracks=json?.info?.subtitle_tracks||json?.subtitle_tracks||md?.info?.subtitle_tracks||md?.subtitle_tracks;
  if(!Array.isArray(tracks)||!tracks.length)return"";
  const idTrack=tracks.find(t=>t.language==="in"||t.language==="id"||t.lan==="in_id");
  const t=idTrack||tracks[0];
  return t?.url||t?.label||"";
}
function srtToVtt(srt){
  let vtt=srt.replace(/\r+/g,"");
  vtt=vtt.replace(/^\uFEFF/,"");
  // convert timestamps 00:00:00,000 -> 00:00:00.000
  vtt=vtt.replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g,"$1.$2");
  return "WEBVTT\n\n"+vtt;
}
async function fetchSubtitleText(url){
  // try direct fetch first
  try{
    const res=await fetch(url,{referrerPolicy:"no-referrer-when-downgrade"});
    if(res.ok)return await res.text();
  }catch(e){}
  // fallback: CORS proxies
  const proxies=[
    "https://corsproxy.io/?url="+encodeURIComponent(url),
    "https://api.allorigins.win/raw?url="+encodeURIComponent(url)
  ];
  for(const p of proxies){
    try{
      const res=await fetch(p);
      if(res.ok){
        const t=await res.text();
        if(t&&t.length>10)return t;
      }
    }catch(e){}
  }
  throw new Error("all sources failed");
}
async function attachSubtitle(url){
  // remove existing track + revoke old blob
  const old=vid.querySelector("track");
  if(old)old.remove();
  if(vid._subBlobUrl){URL.revokeObjectURL(vid._subBlobUrl);vid._subBlobUrl=null;}
  if(!url)return;
  try{
    let text=await fetchSubtitleText(url);
    if(!/^WEBVTT/.test(text.trim()))text=srtToVtt(text);
    const blob=new Blob([text],{type:"text/vtt"});
    const blobUrl=URL.createObjectURL(blob);
    vid._subBlobUrl=blobUrl;
    const track=document.createElement("track");
    track.kind="subtitles";track.label="Indonesia";track.srclang="id";track.src=blobUrl;track.default=true;
    vid.appendChild(track);
    const positionCues=()=>{
      const tt=vid.textTracks[0];
      if(!tt)return;
      tt.mode="showing";
      if(tt.cues){
        for(let i=0;i<tt.cues.length;i++){
          try{tt.cues[i].line=-4;tt.cues[i].snapToLines=true;}catch(e){}
        }
      }
    };
    track.addEventListener("load",positionCues);
    vid.addEventListener("loadedmetadata",function _e(){
      positionCues();
      vid.removeEventListener("loadedmetadata",_e);
    });
    positionCues();
  }catch(e){showToast("Subtitle error: "+e.message);}
}
function extractStreamUrl(json){
  if(!json)return"";
  // ── MovieBox /download-movie: {data:{files:[{resourceLink,resolution,codecName}]}}
  // ── MovieBox /download-series: {data:{episodes:[{ep,resourceLink,...}]}}
  // ── MovieBox /stream atau /play: {data:{playUrl, resourceLink, url, videoUrl, ...}}
  if(currentPlatform==="moviebox"){
    const md=json?.data||json;
    // Cek direct URL fields dulu (dari /stream atau /play endpoint)
    const direct=md?.resourceLink||md?.playUrl||md?.play_url||md?.url||md?.videoUrl||md?.video_url||md?.downloadUrl||md?.download_url||"";
    if(direct&&typeof direct==="string"&&direct.startsWith("http"))return direct;
    // /stream response: {data:{videoList:[...]}} atau {data:{streams:[...]}}
    if(Array.isArray(md?.videoList)&&md.videoList.length){
      const h264=md.videoList.filter(v=>String(v.codecName||v.encode||"").toLowerCase().includes("h264"));
      const pool=h264.length?h264:md.videoList;
      const best=pool.find(v=>Number(v.resolution||v.dpi)===720)||pool.find(v=>Number(v.resolution||v.dpi)===480)||pool[0];
      const u=best?.resourceLink||best?.playUrl||best?.url||"";
      if(u&&u.startsWith("http"))return u;
    }
    if(Array.isArray(md?.streams)&&md.streams.length){
      const best=md.streams.find(v=>Number(v.quality||v.resolution)===720)||md.streams[0];
      const u=best?.url||best?.resourceLink||best?.playUrl||"";
      if(u&&u.startsWith("http"))return u;
    }
    let arr=[];
    // movie response: files array
    if(Array.isArray(md?.files)&&md.files.length)arr=md.files;
    // series response: pilih episode aktif
    if(!arr.length&&Array.isArray(md?.episodes)&&md.episodes.length){
      const epNow=Number(window._gsCurrentEp||currentEp||1);
      const epItem=md.episodes.find(x=>Number(x.ep||x.episode||x.index)===epNow)||md.episodes[0];
      if(epItem?.resourceLink||epItem?.url||epItem?.playUrl){
        arr=[epItem];
      }else if(Array.isArray(epItem?.files)&&epItem.files.length){
        arr=epItem.files;
      }else if(Array.isArray(epItem?.videoList)&&epItem.videoList.length){
        arr=epItem.videoList;
      }else{
        arr=md.episodes;
      }
    }
    // fallback: list/downloads/resolutions
    if(!arr.length)arr=md?.list||md?.downloads||md?.resolutions||md?.qualities||(Array.isArray(md)?md:[]);
    if(Array.isArray(arr)&&arr.length){
      // H264 prioritas untuk Android WebView
      const h264=arr.filter(v=>String(v.codecName||v.encode||"").toLowerCase().includes("h264"));
      const pool=h264.length?h264:arr;
      const best=
        pool.find(v=>Number(v.resolution||v.quality||v.dpi)===720)||
        pool.find(v=>Number(v.resolution||v.quality||v.dpi)===480)||
        pool.sort((a,b)=>Number(b.resolution||b.quality||b.dpi||0)-Number(a.resolution||a.quality||a.dpi||0))[0];
      const u=best?.resourceLink||best?.url||best?.downloadUrl||best?.download_url||best?.playUrl||best?.play_url||best?.videoUrl||best?.video_url||"";
      if(u&&String(u).startsWith("http"))return u;
    }
    return getVideoUrl(json);
  }
  // ── FreeReels /stream: {data:{h264_m3u8, m3u8_url, video_url, h265_m3u8}}
  // h264_m3u8 HARUS diprioritaskan — h265 sering black screen di Android WebView
  if(currentPlatform==="freereels"){
    const dd=json?.data||json;
    // Prioritas: h264_m3u8 > m3u8_url > video_url (hindari h265)
    const u=dd?.h264_m3u8||dd?.m3u8_url||dd?.video_url||dd?.playUrl||dd?.play_url||"";
    if(u&&u.startsWith("http"))return u;
    // fallback root level
    const root=json?.h264_m3u8||json?.m3u8_url||json?.video_url||"";
    if(root&&root.startsWith("http"))return root;
    return"";
  }
  // ── FlickReels /stream: {type:"stream", data:{hls_url, drama_name, cover, ...}}
  // Also handles: {url, stream_url, play_url, data:{url,...}}
  if(currentPlatform==="flickreels"){
    const dd=json?.data||json;
    const u=dd?.hls_url||dd?.url||dd?.stream_url||dd?.play_url||dd?.video_url||dd?.videoUrl||dd?.playUrl||dd?.m3u8||dd?.m3u8_url||"";
    if(u&&u.startsWith("http"))return u;
    const root=json?.hls_url||json?.url||json?.stream_url||json?.play_url||json?.m3u8||json?.m3u8_url||"";
    if(root&&root.startsWith("http"))return root;
    return"";
  }
  // ── DramaBox /stream: {data:{videoUrl, playUrl, cdnList:[{videoPath}], multiVideos:[{type,filePath}]}}
  if(currentPlatform==="dramabox"){
    const dd=json?.data||json;
    // multiVideos prefer 720p > 540p > 1080p > any
    if(Array.isArray(dd?.multiVideos)&&dd.multiVideos.length){
      const mv=dd.multiVideos;
      const pref=mv.find(v=>v.type==="720p")||mv.find(v=>v.type==="540p")||mv.find(v=>v.type==="1080p")||mv[0];
      if(pref?.filePath&&pref.filePath.startsWith("http"))return pref.filePath;
      if(pref?.videoPath&&pref.videoPath.startsWith("http"))return pref.videoPath;
    }
    // cdnList
    if(Array.isArray(dd?.cdnList)&&dd.cdnList.length){
      const u=dd.cdnList[0]?.videoPath||dd.cdnList[0]?.url||"";
      if(u.startsWith("http"))return u;
    }
    // direct fields
    const direct=dd?.videoUrl||dd?.playUrl||dd?.play_url||dd?.url||dd?.video_url||"";
    if(direct&&direct.startsWith("http"))return direct;
    return"";
  }
  // ── Generic /stream: {data:{videoList:[{playUrl,encode,dpi}], play_url}}
  // STRICT H264 only — H265 causes black screen on Android WebView
  if(Array.isArray(json?.data?.videoList)&&json.data.videoList.length){
    const vl=json.data.videoList;
    console.log("[DK] videoList encodes:",vl.map(v=>(v.encode||"?")+":"+v.dpi+"px:"+((v.playUrl||"").split("/").pop())).join(" | "));
    // Cari H264 dulu
    const h264=vl.filter(v=>String(v.encode||"").toUpperCase()==="H264");
    if(h264.length){
      // Prefer 480p/360p (ld/sd) — lebih aman di semua device
      const best=h264.find(v=>Number(v.dpi)===480)||h264.find(v=>Number(v.dpi)===360)||h264.find(v=>Number(v.dpi)===720)||h264[0];
      console.log("[DK] picked H264 dpi="+best?.dpi+" url="+String(best?.playUrl||"").slice(-30));
      if(best?.playUrl)return best.playUrl;
    }
    // Tidak ada H264 — coba cari URL yang mengandung "-ld." atau "-sd." (biasanya H264)
    const ldUrl=(()=>{
      for(const v of vl){
        const u=v.playUrl||"";
        if(u.includes("-ld.")||u.includes("-sd.")||u.includes("_ld.")||u.includes("_sd."))return u;
      }
      return "";
    })();
    if(ldUrl){console.log("[DK] fallback ld/sd url");return ldUrl;}
    // play_url di data level (sering H264)
    if(json.data.play_url&&json.data.play_url.startsWith("http"))return json.data.play_url;
    // Last resort: resolusi terendah yang tersedia
    const sorted=[...vl].sort((a,b)=>Number(a.dpi||0)-Number(b.dpi||0));
    const lowest=sorted[0];
    console.warn("[DK] no H264, using lowest dpi="+lowest?.dpi+" encode="+lowest?.encode);
    if(lowest?.playUrl)return lowest.playUrl;
  }
  // ── Generic /streamv2: {data:{streams:[{url,quality,encode}], play_url}}
  if(Array.isArray(json?.data?.streams)&&json.data.streams.length){
    const st=json.data.streams;
    const h264=st.filter(v=>String(v.encode||"").toUpperCase()==="H264");
    if(h264.length){
      // Prefer 480p/360p untuk kompatibilitas
      const best=h264.find(v=>Number(v.quality)===480)||h264.find(v=>Number(v.quality)===360)||h264.find(v=>Number(v.quality)===720)||h264[0];
      if(best?.url)return best.url;
    }
    // Cari ld/sd di URL
    for(const v of st){const u=v.url||"";if(u.includes("-ld.")||u.includes("-sd.")||u.includes("_ld.")||u.includes("_sd."))return u;}
    // Resolusi terendah
    const sorted=[...st].sort((a,b)=>Number(a.quality||0)-Number(b.quality||0));
    if(sorted[0]?.url)return sorted[0].url;
    return "";
  }
  // ── Generic fallback: data.play_url
  if(json?.data?.play_url&&json.data.play_url.startsWith("http"))return json.data.play_url;
  if(json?.data?.url&&typeof json.data.url==="string"&&json.data.url.startsWith("http"))return json.data.url;
  if(Array.isArray(json?.data?.quality_list)&&json.data.quality_list.length){
    const q=json.data.quality_list.find(x=>/480/i.test(String(x.label||"")))||json.data.quality_list[0];
    if(q?.url)return q.url;
  }
  let url="";
  // MeloShort: {data:{videos:[{quality,url}], video_url, subtitles:[]}}
  if(Array.isArray(json?.data?.videos)&&json.data.videos.length){
    const v=json.data.videos.find(v=>v.quality==="720p")||json.data.videos.find(v=>v.quality==="480p")||json.data.videos[0];
    if(v?.url)return v.url;
  }
  if(json?.data?.video_url&&json.data.video_url.startsWith("http"))return json.data.video_url;
  // ShortMax: {data:{streams:{video_720,video_1080,video_480}, play_url}}
  if(json?.data?.streams&&typeof json.data.streams==="object"&&!Array.isArray(json.data.streams)){
    const s=json.data.streams;
    const url720=s.video_720||s.video720;
    const url480=s.video_480||s.video480;
    const url1080=s.video_1080||s.video1080;
    const best=url720||url480||url1080||Object.values(s).find(v=>typeof v==="string"&&v.startsWith("http"));
    if(best&&best.startsWith("http"))return best;
  }
  // NetShort / ShortMax: {data:{stream_url, play_url, m3u8_url}}
  if(json?.data?.stream_url&&json.data.stream_url.startsWith("http"))return json.data.stream_url;
  if(json?.data?.m3u8_url&&json.data.m3u8_url.startsWith("http"))return json.data.m3u8_url;
  // streamv2 (melolo): {playable, encrypted:false, url}
  if(json?.playable&&json?.encrypted===false&&json?.url)url=json.url;
  // qualities[] with label/url/backup_url
  if(!url&&Array.isArray(json?.qualities)&&json.qualities.length){
    const q480=json.qualities.find(q=>q.label==="480p");
    const q360=json.qualities.find(q=>q.label==="360p");
    const best=q480||q360||json.qualities[0];
    url=best?.url||best?.backup_url||"";
  }
  // qualityList[] (legacy)
  if(!url&&Array.isArray(json?.qualityList)&&json.qualityList.length){
    const q480=json.qualityList.find(q=>q.label==="480p");
    const q360=json.qualityList.find(q=>q.label==="360p");
    const best=q480||q360||json.qualityList[0];
    url=best?.url||"";
  }
  if(!url)url=json?.videoUrl||json?.url||json?.play_url||json?.data?.url||getVideoUrl(json);
  // jangan terima jika encrypted secara eksplisit dan tanpa fallback url
  if(url&&json?.encrypted===true&&!String(url).startsWith("http"))url="";
  // \u2500\u2500 GoodShort /stream: {data:{downloadList:[{index,multiVideos:[{type,filePath}], cdnList:[{videoPath}]}]}}
  if(!url&&Array.isArray(json?.data?.downloadList)&&json.data.downloadList.length){
    // pilih chapter sesuai currentEp (index = ep-1)
    const epIdx=Math.max(0,(window._gsCurrentEp||1)-1);
    const ch=json.data.downloadList.find(c=>c.index===epIdx)||json.data.downloadList[epIdx]||json.data.downloadList[0];
    if(ch){
      // prefer proxied filePath dari multiVideos (720p > 540p > 1080p > any)
      if(Array.isArray(ch.multiVideos)&&ch.multiVideos.length){
        const mv=ch.multiVideos;
        const pref=mv.find(v=>v.type==="720p")||mv.find(v=>v.type==="540p")||mv.find(v=>v.type==="1080p")||mv[0];
        if(pref?.filePath&&pref.filePath.startsWith("http"))url=pref.filePath;
      }
      // fallback: cdnList videoPath
      if(!url&&Array.isArray(ch.cdnList)&&ch.cdnList.length){
        url=ch.cdnList[0]?.videoPath||"";
      }
    }
  }
  // fallback generic url fields
  if(!url&&json?.data?.videoUrl&&typeof json.data.videoUrl==="string"&&json.data.videoUrl.startsWith("http"))url=json.data.videoUrl;
  if(!url&&json?.data?.url&&typeof json.data.url==="string"&&json.data.url.startsWith("http"))url=json.data.url;
  return url||"";
}
function setPlayerIcon(state){
  document.getElementById("iconPlay").style.display=state==="play"?"block":"none";
  document.getElementById("iconPause").style.display=state==="pause"?"block":"none";
  document.getElementById("iconLoading").style.display=state==="loading"?"block":"none";
  playPauseBtn.classList.toggle("loading",state==="loading");
  // show/hide dedicated loading overlay
  const overlay=document.getElementById("playerLoadingOverlay");
  if(state==="loading"){
    overlay.classList.add("show");
    playPauseBtn.classList.add("hidden");
  } else {
    overlay.classList.remove("show");
  }
}
function resetVideo(){if(_hls){_hls.destroy();_hls=null;}clearTimeout(_blackCheckTimer);vid.oncanplay=null;vid.onerror=null;vid.pause();vid.removeAttribute("src");const old=vid.querySelector("track");if(old)old.remove();if(vid._subBlobUrl){URL.revokeObjectURL(vid._subBlobUrl);vid._subBlobUrl=null;}vid.load();}
let _blackCheckTimer=null;
// Deteksi audio jalan tapi video blank (codec tidak ter-decode, mis. H265) ‐ cuma kasih peringatan, TIDAK mengubah playback
function _watchBlackScreen(){
  clearTimeout(_blackCheckTimer);
  const _t0=vid.currentTime;
  _blackCheckTimer=setTimeout(function(){
    try{
      const decoded=vid.webkitDecodedFrameCount;
      const isPlaying=!vid.paused&&vid.currentTime>_t0+0.3;
      if(isPlaying&&typeof decoded==="number"&&decoded===0){
        showToast("⚠️ Video mungkin tidak tampil (codec tidak didukung). Coba episode/platform lain.");
      }
    }catch(e){}
  },3500);
}
let _hls=null;
let _resumeTime=0;
function applyResumeTime(){if(_resumeTime>3){try{vid.currentTime=_resumeTime;}catch(e){} _resumeTime=0;}}
function _tryHls(src){
  if(_hls){_hls.destroy();_hls=null;}
  _hls=new Hls({
    enableWorker:false,lowLatencyMode:false,
    maxBufferLength:30,maxMaxBufferLength:60,
    startLevel:-1,capLevelToPlayerSize:true,
    fragLoadingTimeOut:20000,manifestLoadingTimeOut:20000,levelLoadingTimeOut:20000,
    xhrSetup:function(xhr){
      xhr.withCredentials=false;
      // FlickReels CDN butuh referrer yang valid
      if(currentPlatform==="flickreels"){
        try{xhr.setRequestHeader("Referrer-Policy","no-referrer-when-downgrade");}catch(e){}
      }
    }
  });
  _hls.loadSource(src);
  _hls.attachMedia(vid);
  _hls.on(Hls.Events.MANIFEST_PARSED,function(){
    showOverlay();applyResumeTime();
    vid.play().catch(e=>{setPlayerIcon("play");playPauseBtn.classList.remove("hidden");showOverlay();});
    _watchBlackScreen();
  });
  let _netRetry=0;
  _hls.on(Hls.Events.ERROR,function(_,data){
    console.warn("[DK] HLS error",data.type,data.details,data.fatal);
    if(data.fatal){
      if(data.type===Hls.ErrorTypes.NETWORK_ERROR){
        _netRetry++;
        if(_netRetry<=3){setTimeout(()=>{if(_hls)_hls.startLoad();},1000*_netRetry);}
        else{showToast("Gagal memuat stream");closePlayer();}
      } else if(data.type===Hls.ErrorTypes.MEDIA_ERROR){
        _hls.recoverMediaError();
      } else {
        showToast("Video tidak bisa diputar");closePlayer();
      }
    }
  });
}
// Selalu coba native video dulu untuk m3u8, HLS.js hanya jika native gagal.
// Android WebView modern support HLS native dan tidak punya masalah XHR policy.
// HLS.js bisa gagal di WebView karena strict fetch policy dari null origin.
function _startHls(src){
  if(_hls){_hls.destroy();_hls=null;}
  console.log("[DK] FORCE HLS.js src="+String(src).slice(0,80));
  vid.referrerPolicy="no-referrer-when-downgrade";
  vid.removeAttribute("src");
  try{vid.load();}catch(e){}
  // MeloShort pakai .m3u8. Di Android WebView native HLS kadang audio jalan tapi video hitam.
  // Jadi untuk m3u8 kita paksa HLS.js dulu, baru fallback ke native kalau HLS.js tidak support.
  if(typeof Hls!=="undefined" && Hls.isSupported()){
    _tryHls(src);
    return;
  }
  // Fallback native HLS untuk Safari/iOS atau browser yang tidak support MSE.
  vid.src=src;
  vid.oncanplay=function(){
    vid.oncanplay=null;vid.onerror=null;
    showOverlay();applyResumeTime();
    vid.play().catch(function(){
      setPlayerIcon("play");
      playPauseBtn.classList.remove("hidden");
      showOverlay();
    });
    _watchBlackScreen();
  };
  vid.onerror=function(){
    vid.oncanplay=null;vid.onerror=null;
    showToast("Video tidak bisa diputar");
    closePlayer();
  };
  vid.load();
}
function doPlay(src){
  if(_hls){_hls.destroy();_hls=null;}
  vid.oncanplay=null;vid.onerror=null;
  vid.referrerPolicy="no-referrer-when-downgrade";
  const isM3u8=src.includes(".m3u8")||src.includes("/m3u8");
  console.log("[DK] doPlay isM3u8="+isM3u8+" platform="+currentPlatform+" src="+src.slice(0,80));
  // FlickReels: skip HLS.js, pakai native WebView HLS langsung
  if(isM3u8&&currentPlatform==="flickreels"){
    _playNativeWithProxyFallback(src);
    return;
  }
  if(isM3u8&&typeof Hls!=="undefined"){
    _startHls(src);
  } else if(isM3u8){
    vid.removeAttribute("crossorigin");
    vid.src=src;
    vid.oncanplay=function(){vid.oncanplay=null;showOverlay();applyResumeTime();vid.play().catch(e=>{
      setPlayerIcon("play");playPauseBtn.classList.remove("hidden");showOverlay();
    });};
    vid.onerror=function(){vid.onerror=null;showToast("Video tidak bisa diputar");closePlayer();};
    vid.load();
  } else {
    // mp4 / non-m3u8
    vid.removeAttribute("crossorigin");
    vid.src=src;
    vid.oncanplay=function(){vid.oncanplay=null;showOverlay();applyResumeTime();vid.play().catch(e=>{
      setPlayerIcon("play");playPauseBtn.classList.remove("hidden");showOverlay();
    });};
    vid.onerror=function(){vid.onerror=null;showToast("Video tidak bisa diputar");closePlayer();};
    vid.load();
  }
}
function _playNativeDirect(src){
  console.log("[DK] native direct: "+src.slice(0,80));
  if(_hls){_hls.destroy();_hls=null;}
  vid.oncanplay=null;vid.onerror=null;
  vid.removeAttribute("crossorigin");
  vid.referrerPolicy="no-referrer-when-downgrade";
  // TRICK: Reset WebView video renderer dengan pause + removeAttribute src + load
  // Ini paksa WebView buat SurfaceTexture baru, fix H265 black screen
  vid.pause();
  vid.removeAttribute("src");
  vid.load();
  let _failed=false;
  const _onCanPlay=function(){
    if(_failed)return;
    vid.oncanplay=null;vid.onerror=null;
    showOverlay();applyResumeTime();
    vid.play().catch(e=>{setPlayerIcon("play");playPauseBtn.classList.remove("hidden");showOverlay();});
  };
  const _onError=function(){
    if(_failed)return;
    _failed=true;
    vid.onerror=null;vid.oncanplay=null;
    const errCode=vid.error?.code||"?";
    console.warn("[DK] native direct error code="+errCode);
    if(typeof Hls!=="undefined"&&Hls.isSupported()){
      console.log("[DK] fallback ke HLS.js");
      _tryHls(src);
    } else {
      showToast("Video tidak bisa diputar (H265)");closePlayer();
    }
  };
  // Delay sedikit sebelum set src baru — beri waktu renderer reset
  setTimeout(function(){
    const _t=setTimeout(function(){
      if(!_failed&&vid.readyState<2){
        _failed=true;vid.onerror=null;vid.oncanplay=null;
        console.warn("[DK] native timeout, fallback HLS.js");
        if(typeof Hls!=="undefined"&&Hls.isSupported()){_tryHls(src);}
        else{showToast("Video tidak bisa diputar");closePlayer();}
      }
    },10000);
    vid.oncanplay=function(){clearTimeout(_t);_onCanPlay();};
    vid.onerror=function(){clearTimeout(_t);_onError();};
    vid.src=src;
    vid.load();
  },80);
}
// Native HLS player dengan proxy fallback (untuk FlickReels / file:// origin)
async function _playNativeWithProxyFallback(src){
  console.log("[DK] proxy HLS: "+src.slice(0,80));
  const referer="https://zshipricf.farsunpteltd.com";
  const proxies=[
    src,
    "https://corsproxy.io/?url="+encodeURIComponent(src),
    "https://api.allorigins.win/raw?url="+encodeURIComponent(src),
    "https://proxy.cors.sh/"+src,
    "https://thingproxy.freeboard.io/fetch/"+src
  ];
  for(const p of proxies){
    try{
      console.log("[DK] fetch try: "+p.slice(0,80));
      const fetchOpts={};
      if(p===src){fetchOpts.referrer=referer;fetchOpts.referrerPolicy="no-referrer-when-downgrade";}
      const res=await fetch(p,fetchOpts);
      if(!res.ok)continue;
      const txt=await res.text();
      if(!txt||txt.length<10)continue;
      const base=src.substring(0,src.lastIndexOf("/")+1);
      // Rewrite SEMUA segment URL (relative maupun absolute) ke corsproxy
      // Ini penting karena segment .ts juga kena CORS dari null/file:// origin
      const proxyBase="https://corsproxy.io/?url=";
      const rewritten=txt.replace(/^(?!#)([^#\n\r][^\n\r]*)$/gm,(line)=>{
        const l=line.trim();
        if(!l)return line;
        let absUrl=l;
        if(!l.startsWith("http")&&!l.startsWith("//"))absUrl=base+l;
        // Wrap dengan corsproxy agar segment bisa diakses dari null origin
        return proxyBase+encodeURIComponent(absUrl);
      });
      const blob=new Blob([rewritten],{type:"application/vnd.apple.mpegurl"});
      const blobUrl=URL.createObjectURL(blob);
      console.log("[DK] blob HLS+proxy segments via: "+p.slice(0,60));
      _playBlobHls(blobUrl,src);
      return;
    }catch(e){console.warn("[DK] fetch fail:",p.slice(0,60),e?.message||e);}
  }
  console.warn("[DK] all fetch failed, try HLS.js");
  if(typeof Hls!=="undefined"&&Hls.isSupported()){
    _tryHls(src);
  } else {
    showToast("Video tidak dapat diputar");closePlayer();
  }
}
function _playBlobHls(blobUrl,origSrc){
  vid.removeAttribute("crossorigin");
  vid.src=blobUrl;
  let _done=false;
  const _cleanup=()=>{if(!_done){_done=true;URL.revokeObjectURL(blobUrl);}};
  const _timeout=setTimeout(()=>{
    if(!_done&&vid.readyState<2){
      _cleanup();
      console.warn("[DK] blob HLS timeout, try HLS.js");
      if(typeof Hls!=="undefined"&&Hls.isSupported()){_tryHls(origSrc);}
      else{showToast("Video tidak dapat diputar");closePlayer();}
    }
  },8000);
  vid.oncanplay=function(){
    clearTimeout(_timeout);
    vid.oncanplay=null;vid.onerror=null;
    showOverlay();applyResumeTime();
    vid.play().catch(e=>{setPlayerIcon("play");playPauseBtn.classList.remove("hidden");showOverlay();});
  };
  vid.onerror=function(){
    clearTimeout(_timeout);_cleanup();
    vid.onerror=null;vid.oncanplay=null;
    console.warn("[DK] blob HLS error, try HLS.js");
    if(typeof Hls!=="undefined"&&Hls.isSupported()){_tryHls(origSrc);}
    else{showToast("Video tidak dapat diputar");closePlayer();}
  };
  vid.load();
}
function showOverlay(){playerOverlay.classList.remove("hidden");clearTimeout(hideTimer);hideTimer=setTimeout(()=>{if(!vid.paused)playerOverlay.classList.add("hidden");},3000);}
playerBox.addEventListener("click",e=>{if(epPanel.style.display==="flex")return;if(e.target===vid||e.target===playerBox){if(playerOverlay.classList.contains("hidden"))showOverlay();else{togglePlay();showOverlay();}}});
seekBar.addEventListener("touchstart",()=>showOverlay(),{passive:true});
function togglePlay(){if(vid.paused){vid.play();setPlayerIcon("pause");}else{vid.pause();setPlayerIcon("play");}}
vid.addEventListener("timeupdate",()=>{
  if(!vid.duration)return;
  const p=(vid.currentTime/vid.duration)*100;
  seekBar.value=p;seekFill.style.width=p+"%";seekThumb.style.left=p+"%";
  timeCurrent.textContent=fmtTime(vid.currentTime);timeDuration.textContent=fmtTime(vid.duration);
  const now=Date.now();
  if(currentDramaId&&vid.currentTime>3&&(!vid._lastSave||now-vid._lastSave>3500)){
    vid._lastSave=now;
    const item=history_.find(x=>getId(x)===currentDramaId)||{};
    const title=cleanTitle(_detailTitle||document.getElementById('dramaTitle')?.textContent||getTitle(item)||'Drama');
    const cover=getCover(item)||continueData[currentDramaId]?.cover||'';
    saveContinue(currentDramaId,currentEp,totalEps,title,cover,vid.currentTime,vid.duration);
    renderContinueSection();
  }
});
vid.addEventListener("play",()=>{setPlayerIcon("pause");showOverlay();const bg=document.getElementById("playerBgCover");if(bg)bg.style.opacity="0";});
vid.addEventListener("pause",()=>{setPlayerIcon("play");playPauseBtn.classList.remove("hidden");showOverlay();});
vid.addEventListener("ended",()=>{if(currentEp<totalEps)playVideo(currentDramaId,currentEp+1,totalEps);});
vid.addEventListener("waiting",()=>{
  document.getElementById("playerLoadingOverlay").classList.add("show");
});
vid.addEventListener("playing",()=>{
  document.getElementById("playerLoadingOverlay").classList.remove("show");
});
vid.addEventListener("canplay",()=>{
  document.getElementById("playerLoadingOverlay").classList.remove("show");
});
seekBar.addEventListener("input",()=>{if(vid.duration)vid.currentTime=(seekBar.value/100)*vid.duration;});
function openEpPanel(){
  const title=_detailTitle||document.getElementById("dramaTitle")?.textContent||"Drama";
  playerTitle.textContent=title;epPanelTitle.textContent=title;
  epCurrentGroup=Math.floor((currentEp-1)/30);renderEpGroups();renderEpGrid(epCurrentGroup);
  const bd=document.getElementById("epBackdrop");bd.style.display="block";epPanel.style.display="flex";
  requestAnimationFrame(()=>{bd.classList.add("show");epPanel.classList.add("show");});
}
function renderEpGroups(){
  const g=Math.ceil(totalEps/30);
  document.getElementById("epGroups").innerHTML=Array.from({length:g},(_,i)=>{const f=i*30+1,t2=Math.min((i+1)*30,totalEps);return`<button class="ep-group-btn${i===epCurrentGroup?" active":""}" onclick="epCurrentGroup=${i};renderEpGroups();renderEpGrid(${i})">${f}-${t2}</button>`;}).join("");
}
function renderEpGrid(group){
  const from=group*30,to=Math.min(from+30,totalEps);
  epPanelGrid.innerHTML=Array.from({length:to-from},(_,i)=>{const n=from+i+1,a=n===currentEp;return`<button class="epb${a?" active playing":""}" onclick="closeEpPanel();playVideo('${currentDramaId}',${n},${totalEps})">${n}</button>`;}).join("");
}
function closeEpPanel(){const bd=document.getElementById("epBackdrop");epPanel.classList.remove("show");bd.classList.remove("show");setTimeout(()=>{epPanel.style.display="none";bd.style.display="none";},320);}
function showSwipe(t){swipeInd.textContent=t;swipeInd.style.opacity="1";clearTimeout(swipeInd._t);swipeInd._t=setTimeout(()=>swipeInd.style.opacity="0",900);}
function showSeekIndicator(side){
  const el=side==="left"?seekIndLeft:seekIndRight;
  el.classList.remove("show");
  void el.offsetWidth;
  el.classList.add("show");
  clearTimeout(el._t);
  el._t=setTimeout(()=>el.classList.remove("show"),500);
}
playerBox.addEventListener("touchstart",e=>{swipeStartY=e.touches[0].clientY;swipeActive=true;},{passive:true});
function seekBy(sec){
  if(!vid.duration)return;
  vid.currentTime=Math.min(vid.duration,Math.max(0,vid.currentTime+sec));
  showSeekIndicator(sec>0?"right":"left");
  showOverlay();
}
playerBox.addEventListener("touchend",e=>{
  if(!swipeActive)return;swipeActive=false;
  const dy=swipeStartY-e.changedTouches[0].clientY;if(Math.abs(dy)<50)return;
  if(dy>0&&currentEp<totalEps){showSwipe("Episode "+(currentEp+1));playVideo(currentDramaId,currentEp+1,totalEps);}
  else if(dy<0&&currentEp>1){showSwipe("Episode "+(currentEp-1));playVideo(currentDramaId,currentEp-1,totalEps);}
  else showSwipe(dy>0?"Episode terakhir":"Episode pertama");
},{passive:true});
async function playVideo(id,ep,total,resumeTime){
  currentDramaId=id;currentEp=Number(ep);if(total)totalEps=Number(total);
  window._gsCurrentEp=Number(ep); // GoodShort: used by extractStreamUrl to pick correct chapter
  window._vidMap=window._vidMap||{};
  epLabel.textContent="EP "+currentEp;
  // track watch history per episode
  if(!watchEpHistory[id])watchEpHistory[id]={};
  watchEpHistory[id][ep]=true;
  // save continue watching
  const _ct=cleanTitle(_detailTitle||document.getElementById('dramaTitle')?.textContent||'');
  const _cc=history_.find(x=>getId(x)===id);
  saveContinue(id,ep,totalEps||total||1,_ct||getTitle(_cc||{}),getCover(_cc||{}));
  _resumeTime=Number(resumeTime||0);
  renderContinueSection();
  const dtEl=document.getElementById("dramaTitle");
  playerTitle.textContent=(_detailId===id&&_detailTitle)?_detailTitle:(dtEl?dtEl.textContent:"Drama");
  seekBar.value=0;seekFill.style.width="0%";seekThumb.style.left="0%";
  timeCurrent.textContent="0:00";timeDuration.textContent="0:00";
  playerBox.style.display="flex";playerBox.style.opacity="0";
  requestAnimationFrame(()=>{playerBox.style.transition="opacity .25s";playerBox.style.opacity="1";});
  // Set background cover di playerBox (bukan poster video, agar tidak menutupi overlay)
  const _coverItem=history_.find(x=>getId(x)===id);
  const _posterUrl=getCover(_coverItem||{})||continueData[id]?.cover||"";
  vid.removeAttribute("poster");
  const _bgEl=document.getElementById("playerBgCover")||document.createElement("div");
  _bgEl.id="playerBgCover";
  _bgEl.style.cssText="position:absolute;inset:0;z-index:0;background-size:cover;background-position:center;background-repeat:no-repeat;transition:opacity .3s;";
  _bgEl.style.backgroundImage=_posterUrl?`url('${_posterUrl}')`:"none";
  if(!document.getElementById("playerBgCover"))playerBox.insertBefore(_bgEl,playerBox.firstChild);
  setPlayerIcon("loading");playPauseBtn.classList.remove("hidden");
  document.querySelectorAll(".ep-btn").forEach(b=>b.classList.remove("active-ep"));
  const activeBtn=document.getElementById("epbtn-"+ep);
  if(activeBtn){activeBtn.classList.add("active-ep");activeBtn.scrollIntoView({block:"nearest",behavior:"smooth"});}
  resetVideo();
  try{
    // Cek _vidMap: detail sudah menyimpan vid per episode
    // API video butuh drama ID + nomor episode (param/endpoint berbeda per platform)
    const candidates=streamUrls(id,ep);
    let json=null,url="";
    // FlickReels: HLS URL langsung dari detail cache, tidak perlu fetch
    if(candidates.length===1&&candidates[0].startsWith("__flickreels_direct__:")){
      url=candidates[0].replace("__flickreels_direct__:","");
      if(!url){
        // Episode locked di detail, tapi coba fetch stream endpoint juga (API kadang unlock)
        const chId=window._vidMap?.[id]?.[String(ep)]||"";
        const streamEndpoint=chId
          ?`${getAPI()}/stream?id=${id}&ep=${ep}&chapter_id=${chId}`
          :`${getAPI()}/stream?id=${id}&ep=${ep}`;
        try{
          const sj=await getJson(streamEndpoint);
          url=extractStreamUrl(sj);
        }catch(e){}
        if(!url){
          showToast("EP "+ep+" terkunci 🔒");
          setPlayerIcon("play");playPauseBtn.classList.add("hidden");
          closePlayer();return;
        }
      }
    } else {
      for(const su of candidates){
        try{
          json=await getJson(su);
        }catch(e){continue;}
        url=extractStreamUrl(json);
        if(url)break;
      }
    }
    // Update total episodes jika API kasih info lebih akurat
    const _total=json?.totalEpisodes||json?.data?.chapters_total||json?.chapters_total||json?.data?.total||json?.data?.episode_total||json?.data?.total_episodes||json?.data?.episodes_total||json?.data?.episodeCount||json?.data?.episode_count||json?.data?.total_episode;
    if(_total&&Number(_total)>0){
      totalEps=Number(_total);
      epLabel.textContent="EP "+currentEp;
    }
    setPlayerIcon("play");playPauseBtn.classList.add("hidden");
    if(!url){
      showToast('EP'+ep+' gagal: tidak ada URL stream (cek console)');
      console.warn("[DK] no stream url. candidates:",candidates,"json:",JSON.stringify(json).slice(0,300));
      closePlayer();return;
    }
    console.log("[DK] stream url:",url);
    doPlay(url);
    let subUrl=extractSubtitleUrl(json);
    if(!subUrl&&currentPlatform==="dramanova"){
      // fallback: endpoint /stream biasanya selalu menyertakan info.subtitle_tracks
      try{
        const subJson=await getJson(`${getAPI()}/stream?id=${id}&ep=${ep}&lang=${LANG}`);
        subUrl=extractSubtitleUrl(subJson);
      }catch(e){}
    }
    attachSubtitle(subUrl);
  }catch(e){setPlayerIcon("play");playPauseBtn.classList.add("hidden");showToast("Gagal memuat video");closePlayer();}
}
function closePlayer(){
  if(currentDramaId&&vid.duration&&vid.currentTime>3){
    const item=history_.find(x=>getId(x)===currentDramaId)||{};
    const title=cleanTitle(_detailTitle||document.getElementById('dramaTitle')?.textContent||getTitle(item)||'Drama');
    const cover=getCover(item)||continueData[currentDramaId]?.cover||'';
    saveContinue(currentDramaId,currentEp,totalEps,title,cover,vid.currentTime,vid.duration);
    renderContinueSection();
  }
  playerBox.style.opacity="0";setTimeout(()=>{resetVideo();playerBox.style.display="none";playerBox.style.opacity="1";},220);
}
/* ── PLATFORM SWITCH ── */
function updatePlatformTabs(){
  const cfg=PLATFORMS[currentPlatform];
  const lbl=document.getElementById("platformBadgeLabel");
  if(lbl&&cfg)lbl.textContent=cfg.label;
  renderPlatformGrid();
}
function renderCatTabs(){
  const wrap=document.getElementById("catTabs");
  if(!wrap)return;
  if(currentPlatform==="moviebox"){
    wrap.innerHTML=MOVIE_TABS.map((t,i)=>`<button class="cat-tab${i===0?' active':''}" onclick="setMovieTab(this,'${t.cat}')">${t.name}</button>`).join("");
  } else {
    wrap.innerHTML=DRAMA_TABS.map((t,i)=>`<button class="cat-tab${i===0?' active':''}" onclick="setTab(this,'${t}')">${t}</button>`).join("");
  }
}
function setMovieTab(el,cat){
  document.querySelectorAll(".cat-tab").forEach(b=>b.classList.remove("active"));
  el.classList.add("active");
  currentMovieCategory=cat;
  homeKeyIdx=0;homeSearchOffset=0;hasMore=true;currentSearch="";
  document.getElementById("heroWrap").style.display="none";
  document.getElementById("sectionTerbaru").style.display="none";
  clearInterval(_heroAutoSlide);
  if(cat==="home"){
    loadHome();
  } else {
    document.getElementById("gridList").innerHTML='<div class="loading" style="grid-column:1/-1"><div class="spinner"></div></div>';
    loadGrid(false);
  }
}
function renderPlatformGrid(){
  const grid=document.getElementById("platGrid");
  if(!grid)return;
  grid.innerHTML=Object.keys(PLATFORMS).map(key=>{
    const p=PLATFORMS[key];
    const active=key===currentPlatform;
    return `<div class="plat-item${active?" active":""}" data-name="${p.label.toLowerCase()}" onclick="selectPlatform('${key}')">
      <div class="plat-icon" style="background:${p.color}"><img src="${p.icon}" alt="${p.label}" loading="lazy" referrerpolicy="no-referrer">${active?'<span class="plat-check"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>':''}</div>
      <span class="plat-name">${p.label}</span>
      ${active?'<span class="plat-active-label">Aktif</span>':''}
    </div>`;
  }).join("");
}
function filterPlatformGrid(q){
  const query=(q||"").trim().toLowerCase();
  document.querySelectorAll("#platGrid .plat-item").forEach(el=>{
    el.style.display = !query || el.dataset.name.includes(query) ? "" : "none";
  });
}
function openPlatformSheet(){
  renderPlatformGrid();
  const si=document.getElementById("platSearchInput");
  if(si)si.value="";
  const bd=document.getElementById("platBackdrop"),sh=document.getElementById("platSheet");
  bd.style.display="block";sh.style.display="flex";
  requestAnimationFrame(()=>{bd.classList.add("show");sh.classList.add("show");});
}
function closePlatformSheet(){
  const bd=document.getElementById("platBackdrop"),sh=document.getElementById("platSheet");
  sh.classList.remove("show");bd.classList.remove("show");
  setTimeout(()=>{sh.style.display="none";bd.style.display="none";},320);
}
function selectPlatform(p){
  setPlatform(p);
  closePlatformSheet();
}
function setPlatform(p){
  if(!PLATFORMS[p]||p===currentPlatform){updatePlatformTabs();showHome();return;}
  currentPlatform=p;
  try{localStorage.setItem("dramaku_platform",p);}catch(e){}
  updatePlatformTabs();
  // reset state home & search
  homeSearchOffset=1;hasMore=true;sOffset=0;sMore=false;
  currentMovieCategory="home";
  renderCatTabs();
  document.getElementById("heroWrap").style.display="none";
  document.getElementById("sectionTerbaru").style.display="none";
  clearInterval(_heroAutoSlide);
  showHome();
  loadHome();
}
updatePlatformTabs();
renderCatTabs();
loadHome();
/* ═══════════════════════════════════════
   UI SMOOTHNESS UPGRADES
═══════════════════════════════════════ */
// ── Ripple effect
function addRipple(el, e) {
  const rect = el.getBoundingClientRect();
  const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
  const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
  const size = Math.max(rect.width, rect.height) * 2;
  const r = document.createElement('span');
  r.className = 'ripple-wave';
  r.style.cssText = `width:${size}px;height:${size}px;left:${x-size/2}px;top:${y-size/2}px`;
  el.appendChild(r);
  r.addEventListener('animationend', () => r.remove());
}
document.addEventListener('touchstart', e => {
  const el = e.target.closest('.ripple-host');
  if (el) addRipple(el, e);
}, {passive: true});
// ── Haptic feedback
function haptic(ms=20) { try { navigator.vibrate && navigator.vibrate(ms); } catch(e){} }
document.addEventListener('touchstart', e => {
  if (e.target.closest('.p-btn,.nav-btn,.cat-tab,.ep-btn,.epb,.btn-play-first,.btn-bookmark')) haptic(18);
}, {passive: true});
// ── Page transition helper
function pageAnim(el, dir='enter') {
  el.classList.remove('page-enter','page-exit');
  void el.offsetWidth;
  el.classList.add(dir === 'enter' ? 'page-enter' : 'page-exit');
}
// ── Wrap showHome, showSearch, showMe, showHistory, showDetailPage to animate
const _origShowHome = showHome;
showHome = function() {
  const detail = document.getElementById('detailPage');
  if (detail.classList.contains('active')) { pageAnim(detail, 'exit'); setTimeout(()=>{ _origShowHome(); pageAnim(document.getElementById('homePage'), 'enter'); },120); return; }
  _origShowHome();
  pageAnim(document.getElementById('homePage'), 'enter');
};
const _origShowSearch = showSearch;
showSearch = function() {
  _origShowSearch();
  pageAnim(document.getElementById('searchPage'), 'enter');
};
const _origShowMe = showMe;
showMe = function() {
  _origShowMe();
  pageAnim(document.getElementById('mePage'), 'enter');
};
const _origShowDetailPage = showDetailPage;
showDetailPage = function() {
  _origShowDetailPage();
  pageAnim(document.getElementById('detailPage'), 'enter');
};
// ── Smooth image lazy load
function smoothImg(img) {
  if (!img) return;
  if (img.complete && img.naturalWidth) { img.classList.add('img-loaded'); return; }
  img.addEventListener('load', () => img.classList.add('img-loaded'), {once:true});
  img.addEventListener('error', () => img.classList.add('img-loaded'), {once:true});
}
// Observe DOM for new images
const imgObs = new MutationObserver(muts => {
  muts.forEach(m => m.addedNodes.forEach(n => {
    if (n.nodeType !== 1) return;
    n.querySelectorAll && n.querySelectorAll('img').forEach(smoothImg);
    if (n.tagName === 'IMG') smoothImg(n);
  }));
});
imgObs.observe(document.body, {childList:true, subtree:true});
document.querySelectorAll('img').forEach(smoothImg);
// ── Detail parallax cover on scroll
(function(){
  const ds = document.getElementById('detailScroll');
  if (!ds) return;
  ds.addEventListener('scroll', () => {
    const img = ds.querySelector('.detail-cover-wrap img');
    if (!img) return;
    const scrollY = ds.scrollTop;
    img.style.transform = `translateY(${scrollY * 0.3}px) scale(1.05)`;
  }, {passive:true});
})();
// ── Hero carousel auto-scroll with smooth momentum
(function(){
  let heroTimer;
  function startHeroAuto() {
    clearInterval(heroTimer);
    heroTimer = setInterval(() => {
      const c = document.getElementById('heroCarousel');
      if (!c || !c.offsetParent) return;
      const slides = c.querySelectorAll('.hero-slide');
      if (slides.length < 2) return;
      const idx = Math.round(c.scrollLeft / c.offsetWidth);
      const next = (idx + 1) % slides.length;
      c.scrollTo({left: next * c.offsetWidth, behavior:'smooth'});
    }, 4000);
  }
  startHeroAuto();
  document.getElementById('heroCarousel')?.addEventListener('touchstart', () => clearInterval(heroTimer), {passive:true});
  document.getElementById('heroCarousel')?.addEventListener('touchend', () => setTimeout(startHeroAuto, 2000), {passive:true});
})();
// ── Seekbar touch-drag upgrade
(function(){
  const seekWrap = document.querySelector('.p-seekwrap');
  if (!seekWrap) return;
  seekWrap.addEventListener('touchstart', () => seekWrap.classList.add('dragging'), {passive:true});
  seekWrap.addEventListener('touchend', () => seekWrap.classList.remove('dragging'), {passive:true});
})();
