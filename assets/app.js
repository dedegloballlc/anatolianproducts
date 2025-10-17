// === Data ===
const COUNTRIES = [
  {name:'Türkiye', flag:'🇹🇷', query:'Türkiye', tz:'Europe/Istanbul'},
  {name:'Yunanistan', flag:'🇬🇷', query:'Greece', tz:'Europe/Athens'},
  {name:'Bulgaristan', flag:'🇧🇬', query:'Bulgaria', tz:'Europe/Sofia'},
  {name:'Sırbistan', flag:'🇷🇸', query:'Serbia', tz:'Europe/Belgrade'},
  {name:'Bosna-Hersek', flag:'🇧🇦', query:'Bosnia and Herzegovina', tz:'Europe/Sarajevo'},
  {name:'Arnavutluk', flag:'🇦🇱', query:'Albania', tz:'Europe/Tirane'},
  {name:'Kuzey Makedonya', flag:'🇲🇰', query:'North Macedonia', tz:'Europe/Skopje'},
  {name:'Romanya', flag:'🇷🇴', query:'Romania', tz:'Europe/Bucharest'},
  {name:'İran', flag:'🇮🇷', query:'Iran', tz:'Asia/Tehran'},
  {name:'Irak', flag:'🇮🇶', query:'Iraq', tz:'Asia/Baghdad'},
  {name:'Suriye', flag:'🇸🇾', query:'Syria', tz:'Asia/Damascus'},
  {name:'Lübnan', flag:'🇱🇧', query:'Lebanon', tz:'Asia/Beirut'},
  {name:'Ürdün', flag:'🇯🇴', query:'Jordan', tz:'Asia/Amman'},
  {name:'İsrail', flag:'🇮🇱', query:'Israel', tz:'Asia/Jerusalem'},
  {name:'Suudi Arabistan', flag:'🇸🇦', query:'Saudi Arabia', tz:'Asia/Riyadh'},
  {name:'BAE', flag:'🇦🇪', query:'United Arab Emirates', tz:'Asia/Dubai'},
  {name:'Katar', flag:'🇶🇦', query:'Qatar', tz:'Asia/Qatar'},
  {name:'Kuveyt', flag:'🇰🇼', query:'Kuwait', tz:'Asia/Kuwait'},
  {name:'Umman', flag:'🇴🇲', query:'Oman', tz:'Asia/Muscat'},
  {name:'Bahreyn', flag:'🇧🇭', query:'Bahrain', tz:'Asia/Bahrain'},
  {name:'Mısır', flag:'🇪🇬', query:'Egypt', tz:'Africa/Cairo'}
];

// === Helpers ===
const $ = (sel) => document.querySelector(sel);
function h(tag, cls){ const e = document.createElement(tag); if(cls) e.className = cls; return e; }
function setMarqueeDuration(track, speed=80){
  const halfWidth = track.scrollWidth / 2;
  const dur = Math.max(20, Math.round(halfWidth / speed));
  track.style.setProperty('--dur', dur + 's');
}
function colorFor(i){ return `hsl(${(i*37)%360} 70% 45%)`; }

// === Flags marquee ===
(function buildFlags(){
  const track = $('#flagsTrack'); if(!track) return;
  const make = () => COUNTRIES.map(c => {
    const a = h('a','flag-link');
    a.href = `https://www.google.com/search?q=${encodeURIComponent(c.query)}`;
    a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.innerHTML = `<span style="font-size:18px">${c.flag}</span><span>${c.name}</span>`;
    return a;
  });
  const one = make(), two = make();
  [...one, ...two].forEach(n => track.appendChild(n));
  requestAnimationFrame(()=> setMarqueeDuration(track, getNum('speedFlags', 90)));
})();

// === Clocks marquee ===
const clocksTrack = $('#clocksTrack');
function renderClocks(){
  if(!clocksTrack) return;
  const make = () => COUNTRIES.map((c, i) => {
    const now = new Date();
    const timeStr = new Intl.DateTimeFormat('tr-TR', {hour:'2-digit', minute:'2-digit', hour12:false, timeZone:c.tz}).format(now);
    const chip = h('div','clock'); chip.style.color = colorFor(i);
    chip.textContent = `${c.flag} ${c.name}: ${timeStr}`;
    return chip;
  });
  clocksTrack.innerHTML = '';
  const one = make(), two = make();
  [...one, ...two].forEach(n => clocksTrack.appendChild(n));
  requestAnimationFrame(()=> setMarqueeDuration(clocksTrack, getNum('speedClocks', 70)));
}
renderClocks();
setInterval(renderClocks, 30000);

// === Product block ===
const PRODUCT = {
  title: 'Kahve Dünyası Premium Türk Kahvesi 250g',
  price: '19.99',
  img: 'assets/placeholder.jpg',
  url: 'https://www.amazon.com/dp/B07J5GLXFK'
};
const params = new URLSearchParams(location.search);
const title = params.get('title') || PRODUCT.title;
const price = params.get('price') || PRODUCT.price;
const img = params.get('img') || PRODUCT.img;
const url = params.get('url') || PRODUCT.url;
$('#productTitle').textContent = title;
$('#productPrice').textContent = `$${Number(price).toFixed(2)}`;
$('#productImage').src = img;
$('#productLink').href = url;

// JSON-LD
const schema = {
  "@context":"https://schema.org",
  "@type":"Product",
  "name": title,
  "image": [img],
  "brand": {"@type":"Organization","name":"Dede Global LLC"},
  "offers": {"@type":"Offer","priceCurrency":"USD","price": String(Number(price).toFixed(2)), "url": url, "availability":"https://schema.org/InStock"}
};
document.getElementById('product-schema').textContent = JSON.stringify(schema);

// === Snow ===
const snowEl = $('#snow');
const toggleSnowBtn = $('#toggleSnow');
function buildSnow(){
  snowEl.innerHTML = '';
  const FLAKES = 100;
  for(let i=0;i<FLAKES;i++){
    const flake = document.createElement('i');
    const size = Math.random()*2.2 + 0.8; // 0.8–3px
    flake.style.width = size+'px';
    flake.style.height = size+'px';
    flake.style.left = Math.random()*100 + 'vw';
    const dur = 8 + Math.random()*14;
    flake.style.setProperty('--dur', dur + 's');
    flake.style.animationDelay = (-Math.random()*dur) + 's';
    flake.style.opacity = 0.9;
    snowEl.appendChild(flake);
  }
}
function getNum(key, def){ const v = Number(params.get(key)); return Number.isFinite(v) && v>0 ? v : def; }
let snowOn = params.get('snow') === '0' ? false : true;
if(snowOn) buildSnow();
if(toggleSnowBtn){
  toggleSnowBtn.setAttribute('aria-pressed', snowOn?'true':'false');
  toggleSnowBtn.addEventListener('click', ()=>{
    snowOn = !snowOn;
    toggleSnowBtn.setAttribute('aria-pressed', snowOn?'true':'false');
    if(snowOn) buildSnow(); else snowEl.innerHTML='';
  });
}
