const AMAZON_URL = "https://www.amazon.com/sp?ie=UTF8&seller=A2CJDBZTAQF6VN&asin=B0FLLQCFZ5&ref_=dp_merchant_link&isAmazonFulfilled=1";

const COUNTRIES = [
  {name:'Türkiye', flag:'🇹🇷', tz:'Europe/Istanbul'},
  {name:'Ελλάδα', flag:'🇬🇷', tz:'Europe/Athens'},
  {name:'България', flag:'🇧🇬', tz:'Europe/Sofia'},
  {name:'Србија', flag:'🇷🇸', tz:'Europe/Belgrade'},
  {name:'Bosna i Hercegovina', flag:'🇧🇦', tz:'Europe/Sarajevo'},
  {name:'Shqipëria', flag:'🇦🇱', tz:'Europe/Tirane'},
  {name:'Северна Македонија', flag:'🇲🇰', tz:'Europe/Skopje'},
  {name:'România', flag:'🇷🇴', tz:'Europe/Bucharest'},
  {name:'ایران', flag:'🇮🇷', tz:'Asia/Tehran'},
  {name:'العراق', flag:'🇮🇶', tz:'Asia/Baghdad'},
  {name:'سوريا', flag:'🇸🇾', tz:'Asia/Damascus'},
  {name:'لبنان', flag:'🇱🇧', tz:'Asia/Beirut'},
  {name:'الأردن', flag:'🇯🇴', tz:'Asia/Amman'},
  {name:'السعودية', flag:'🇸🇦', tz:'Asia/Riyadh'},
  {name:'الإمارات', flag:'🇦🇪', tz:'Asia/Dubai'},
  {name:'قطر', flag:'🇶🇦', tz:'Asia/Qatar'},
  {name:'الكويت', flag:'🇰🇼', tz:'Asia/Kuwait'},
  {name:'عُمان', flag:'🇴🇲', tz:'Asia/Muscat'},
  {name:'البحرين', flag:'🇧🇭', tz:'Asia/Bahrain'},
  {name:'مصر', flag:'🇪🇬', tz:'Africa/Cairo'}
];

const $ = s => document.querySelector(s);
const el = (t,c) => { const e=document.createElement(t); if(c) e.className=c; return e; };
const setMarquee = (track, speed=90) => {
  if(!track) return;
  const kids = [...track.children];
  kids.forEach(k => track.appendChild(k.cloneNode(true)));
  const half = track.scrollWidth/2;
  const dur = Math.max(18, Math.round(half/speed));
  track.style.setProperty('--dur', dur+'s');
};

(function buildFlags(){
  const t = $('#flagsTrack'); if(!t) return;
  COUNTRIES.forEach(c => {
    const a = el('a'); a.href = AMAZON_URL; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.innerHTML = `<span style="font-size:18px">${c.flag}</span><span>${c.name}</span>`;
    t.appendChild(a);
  });
  setMarquee(t, 110);
})();

const clocksTrack = $('#clocksTrack');
function renderClocks(){
  if(!clocksTrack) return;
  clocksTrack.innerHTML='';
  COUNTRIES.forEach((c)=>{
    const now = new Date();
    const t = new Intl.DateTimeFormat('tr-TR',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:c.tz}).format(now);
    const a = el('a'); a.href = AMAZON_URL; a.target='_blank'; a.rel='noopener noreferrer';
    a.textContent = `${c.flag} ${c.name} • ${t}`;
    clocksTrack.appendChild(a);
  });
  setMarquee(clocksTrack, 90);
}
renderClocks();
setInterval(renderClocks, 30000);

(function snow(){
  const root = document.getElementById('snow'); if(!root) return;
  const F = 140;
  for(let i=0;i<F;i++){
    const s=document.createElement('i');
    const size=1+Math.random()*2.2;
    s.style.width=size+'px'; s.style.height=size+'px';
    s.style.left=(Math.random()*100)+'vw';
    const dur=12+Math.random()*16;
    s.style.setProperty('--flake-dur', dur+'s');
    s.style.animationDelay = (-Math.random()*dur)+'s';
    root.appendChild(s);
  }
})();

const PRODUCT = {
  title: 'Turkish Flag Car Air Freshener',
  img: 'assets/products/1.jpg',
  price: '19.99',
  url: 'https://www.amazon.com/Turkish-Flag-Car-Air-Freshener/dp/B0FLLQCFZ5'
};
document.getElementById('productTitle').textContent = PRODUCT.title;
document.getElementById('productPrice').textContent = '$ ' + Number(PRODUCT.price).toFixed(2);
document.getElementById('productImage').src = PRODUCT.img;
document.getElementById('productLink').href = PRODUCT.url;

document.getElementById('product-schema').textContent = JSON.stringify({
  "@context":"https://schema.org",
  "@type":"Product",
  "name": PRODUCT.title,
  "image":[PRODUCT.img],
  "brand":{"@type":"Organization","name":"Dede Global LLC"},
  "offers":{"@type":"Offer","priceCurrency":"USD","price":String(Number(PRODUCT.price).toFixed(2)),"url":PRODUCT.url,"availability":"https://schema.org/InStock"}
});
