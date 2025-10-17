const TARGET_URL = "https://www.amazon.com/sp?ie=UTF8&seller=A2CJDBZTAQF6VN&asin=B0FLLQCFZ5&ref_=dp_merchant_link&isAmazonFulfilled=1";
// Countries (native names), Israel removed
const COUNTRIES = [{"name": "Türkiye", "flag": "🇹🇷", "query": "Türkiye", "tz": "Europe/Istanbul"}, {"name": "Ελλάδα", "flag": "🇬🇷", "query": "Greece", "tz": "Europe/Athens"}, {"name": "България", "flag": "🇧🇬", "query": "Bulgaria", "tz": "Europe/Sofia"}, {"name": "Србија", "flag": "🇷🇸", "query": "Serbia", "tz": "Europe/Belgrade"}, {"name": "Bosna i Hercegovina", "flag": "🇧🇦", "query": "Bosnia and Herzegovina", "tz": "Europe/Sarajevo"}, {"name": "Shqipëria", "flag": "🇦🇱", "query": "Albania", "tz": "Europe/Tirane"}, {"name": "Северна Македонија", "flag": "🇲🇰", "query": "North Macedonia", "tz": "Europe/Skopje"}, {"name": "România", "flag": "🇷🇴", "query": "Romania", "tz": "Europe/Bucharest"}, {"name": "ایران", "flag": "🇮🇷", "query": "Iran", "tz": "Asia/Tehran"}, {"name": "العراق", "flag": "🇮🇶", "query": "Iraq", "tz": "Asia/Baghdad"}, {"name": "سوريا", "flag": "🇸🇾", "query": "Syria", "tz": "Asia/Damascus"}, {"name": "لبنان", "flag": "🇱🇧", "query": "Lebanon", "tz": "Asia/Beirut"}, {"name": "الأردن", "flag": "🇯🇴", "query": "Jordan", "tz": "Asia/Amman"}, {"name": "السعودية", "flag": "🇸🇦", "query": "Saudi Arabia", "tz": "Asia/Riyadh"}, {"name": "الإمارات", "flag": "🇦🇪", "query": "United Arab Emirates", "tz": "Asia/Dubai"}, {"name": "قطر", "flag": "🇶🇦", "query": "Qatar", "tz": "Asia/Qatar"}, {"name": "الكويت", "flag": "🇰🇼", "query": "Kuwait", "tz": "Asia/Kuwait"}, {"name": "عُمان", "flag": "🇴🇲", "query": "Oman", "tz": "Asia/Muscat"}, {"name": "البحرين", "flag": "🇧🇭", "query": "Bahrain", "tz": "Asia/Bahrain"}, {"name": "مصر", "flag": "🇪🇬", "query": "Egypt", "tz": "Africa/Cairo"}];

function $(sel){ return document.querySelector(sel); }
function h(tag, cls){ const e = document.createElement(tag); if(cls) e.className = cls; return e; }
function setMarqueeDuration(track, speed){ const half = track.scrollWidth/2; const dur = Math.max(18, Math.round(half/speed)); track.style.setProperty('--dur', dur+'s'); }
function hue(i){ return (i*37)%360; }

// Flags marquee
(function buildFlags(){
  const track = $('#flagsTrack'); if(!track) return;
  const make = () => COUNTRIES.map(c => {
    const a = h('a','flag-link');
    a.href = 'https://www.google.com/search?q=' + encodeURIComponent(c.query);
    a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.innerHTML = '<span style="font-size:18px">'+c.flag+'</span><span>'+c.name+'</span>';
    return a;
  });
  const one = make(), two = make();
  [...one, ...two].forEach(n => track.appendChild(n));
  requestAnimationFrame(()=> setMarqueeDuration(track, 110));
})();

// Clocks marquee
// Clocks marquee
const clocksTrack = $('#clocksTrack');
function renderClocks(){
  if(!clocksTrack) return;
  const make = () => COUNTRIES.map((c, i) => {
    const now = new Date();
    const timeStr = new Intl.DateTimeFormat('tr-TR', {hour:'2-digit', minute:'2-digit', hour12:false, timeZone:c.tz}).format(now);
    const chip = h('a','clock');
    chip.href = TARGET_URL;
    chip.target = '_blank';
    chip.rel = 'noopener noreferrer';
    chip.style.color = `hsl(${(i*37)%360} 70% 55%)`;
    chip.textContent = `${c.flag} ${c.name}: ${timeStr}`;
    return chip;
  });
  clocksTrack.innerHTML = '';
  const one = make(), two = make();
  [...one, ...two].forEach(n => clocksTrack.appendChild(n));
  requestAnimationFrame(()=> setMarqueeDuration(clocksTrack, 90));
}

// Product
const PRODUCT = { title:'Kahve Dünyası Premium Türk Kahvesi 250g', price:'19.99', img:'assets/placeholder.jpg', url:'https://www.amazon.com/dp/B07J5GLXFK' };
const params = new URLSearchParams(location.search);
const title = params.get('title') || PRODUCT.title;
const price = params.get('price') || PRODUCT.price;
const img = params.get('img') || PRODUCT.img;
const url = params.get('url') || PRODUCT.url;
document.getElementById('productTitle').textContent = title;
document.getElementById('productPrice').textContent = '$' + Number(price).toFixed(2);
document.getElementById('productImage').src = img;
document.getElementById('productLink').href = url;

// JSON-LD
const schema = {"@context":"https://schema.org","@type":"Product","name":title,"image":[img],"brand":{"@type":"Organization","name":"Dede Global LLC"},"offers":{"@type":"Offer","priceCurrency":"USD","price":String(Number(price).toFixed(2)),"url":url,"availability":"https://schema.org/InStock"}};
document.getElementById('product-schema').textContent = JSON.stringify(schema);

// Snow
const snowEl = document.getElementById('snow');
(function buildSnow(){
  const F = 120;
  for(let i=0;i<F;i++){
    const s = document.createElement('i');
    const size = Math.random()*2 + 1;
    s.style.width = size+'px'; s.style.height = size+'px';
    s.style.left = Math.random()*100 + 'vw';
    const dur = 10 + Math.random()*14;
    s.style.setProperty('--dur', dur + 's');
    s.style.animationDelay = (-Math.random()*dur) + 's';
    s.style.opacity = .85;
    snowEl.appendChild(s);
  }
})();
