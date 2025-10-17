// Countries list
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

// Helpers
function h(tag, cls){ const e = document.createElement(tag); if(cls) e.className = cls; return e; }
function setMarqueeDuration(track, speed=80){ // px per second
  // track contains two copies of items next to each other -> move by 50%
  const halfWidth = track.scrollWidth / 2;
  const dur = Math.max(20, Math.round(halfWidth / speed));
  track.style.setProperty('--dur', dur + 's');
}

// Build flags marquee
(function buildFlags(){
  const track = document.getElementById('flagsTrack');
  const make = () => COUNTRIES.map(c => {
    const a = h('a','flag-link');
    a.href = `https://www.google.com/search?q=${encodeURIComponent(c.query)}`;
    a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.innerHTML = `<span style="font-size:18px">${c.flag}</span><span>${c.name}</span>`;
    return a;
  });
  const one = make();
  const two = make();
  [...one, ...two].forEach(n => track.appendChild(n));
  // Set duration after layout
  requestAnimationFrame(()=> setMarqueeDuration(track, 90));
})();

// Build clocks marquee
const clocksTrack = document.getElementById('clocksTrack');
function colorFor(i){ return `hsl(${(i*37)%360} 70% 45%)`; }
function renderClocks(){
  const make = () => COUNTRIES.map((c, i) => {
    const now = new Date();
    const timeStr = new Intl.DateTimeFormat('tr-TR', {hour:'2-digit', minute:'2-digit', hour12:false, timeZone:c.tz}).format(now);
    const chip = h('div','clock'); chip.style.color = colorFor(i);
    chip.textContent = `${c.flag} ${c.name}: ${timeStr}`;
    return chip;
  });
  clocksTrack.innerHTML = '';
  const one = make(); const two = make();
  [...one, ...two].forEach(n => clocksTrack.appendChild(n));
  requestAnimationFrame(()=> setMarqueeDuration(clocksTrack, 70));
}
renderClocks();
setInterval(renderClocks, 30000);

// Product defaults
const PRODUCT = {
  title: 'Kahve Dünyası Premium Türk Kahvesi 250g',
  price: '19.99',
  img: 'assets/placeholder.jpg',
  url: 'https://www.amazon.com/dp/B07J5GLXFK'
};
const params = new URLSearchParams(location.search);
document.getElementById('productTitle').textContent = params.get('title') || PRODUCT.title;
document.getElementById('productPrice').textContent = `$${Number(params.get('price') || PRODUCT.price).toFixed(2)}`;
document.getElementById('productImage').src = params.get('img') || PRODUCT.img;
document.getElementById('productLink').href = params.get('url') || PRODUCT.url;

// Snow: lighter, grain-like flakes
const snowEl = document.getElementById('snow');
const FLAKES = 90;
for(let i=0;i<FLAKES;i++){
  const flake = document.createElement('i');
  const size = Math.random()*2.2 + 1; // 1–3.2px
  flake.style.width = size+'px';
  flake.style.height = size+'px';
  flake.style.left = Math.random()*100 + 'vw';
  const dur = 8 + Math.random()*12;
  flake.style.setProperty('--dur', dur + 's');
  flake.style.animationDelay = (-Math.random()*dur) + 's';
  flake.style.opacity = 0.9;
  snowEl.appendChild(flake);
}
