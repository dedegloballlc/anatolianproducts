// Ülke listesi ve saat dilimleri
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

// Bayrak linkleri
const flagsEl = document.getElementById('flags');
COUNTRIES.forEach(c => {
  const a = document.createElement('a');
  a.className = 'flag-link';
  a.href = `https://www.google.com/search?q=${encodeURIComponent(c.query)}`;
  a.target = '_blank'; a.rel = 'noopener noreferrer';
  a.innerHTML = `<span style="font-size:18px">${c.flag}</span><span>${c.name}</span>`;
  flagsEl.appendChild(a);
});

// Saat şeridi
const clocksEl = document.getElementById('clocks');
function colorFor(i){ return `hsl(${(i*37)%360} 70% 45%)`; }
function renderClocks(){
  clocksEl.innerHTML = '';
  COUNTRIES.forEach((c, i) => {
    const now = new Date();
    const timeStr = new Intl.DateTimeFormat('tr-TR', {hour:'2-digit', minute:'2-digit', hour12:false, timeZone:c.tz}).format(now);
    const span = document.createElement('div');
    span.className = 'clock';
    span.style.borderColor = 'var(--border)';
    span.style.color = colorFor(i);
    span.textContent = `${c.flag} ${c.name}: ${timeStr}`;
    clocksEl.appendChild(span);
  });
}
renderClocks();
setInterval(renderClocks, 30000);

// Ürün bölümünün varsayılanları
const PRODUCT = {
  title: 'Kahve Dünyası Premium Türk Kahvesi 250g',
  price: '19.99',
  img: 'assets/placeholder.jpg',
  url: 'https://www.amazon.com/dp/B07J5GLXFK'
};

// URL parametreleriyle değiştir
const params = new URLSearchParams(location.search);
const title = params.get('title') || PRODUCT.title;
const price = params.get('price') || PRODUCT.price;
const img = params.get('img') || PRODUCT.img;
const url = params.get('url') || PRODUCT.url;
document.getElementById('productTitle').textContent = title;
document.getElementById('productPrice').textContent = `$${Number(price).toFixed(2)}`;
document.getElementById('productImage').src = img;
document.getElementById('productLink').href = url;

// Kar efekti
const snowEl = document.getElementById('snow');
const FLAKES = 120;
for(let i=0;i<FLAKES;i++){
  const flake = document.createElement('i');
  const size = Math.random()*3 + 1;
  flake.style.width = size+'px';
  flake.style.height = size+'px';
  flake.style.left = Math.random()*100 + 'vw';
  flake.style.animationDuration = (6 + Math.random()*8) + 's';
  flake.style.animationDelay = (-Math.random()*8) + 's';
  flake.style.opacity = 0.85;
  snowEl.appendChild(flake);
}
