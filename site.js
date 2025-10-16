// Regions: ALL Balkan and Middle Eastern countries with capitals + IANA time zones
const BALKANS = [
  {name:"Albania", flag:"🇦🇱", capital:"Tiranë", tz:"Europe/Tirane"},
  {name:"Bosnia and Herzegovina", flag:"🇧🇦", capital:"Saraybosna", tz:"Europe/Sarajevo"},
  {name:"Bulgaria", flag:"🇧🇬", capital:"Sofya", tz:"Europe/Sofia"},
  {name:"Croatia", flag:"🇭🇷", capital:"Zagreb", tz:"Europe/Zagreb"},
  {name:"Greece", flag:"🇬🇷", capital:"Atina", tz:"Europe/Athens"},
  {name:"Kosovo", flag:"🇽🇰", capital:"Priştine", tz:"Europe/Belgrade"},
  {name:"Montenegro", flag:"🇲🇪", capital:"Podgorica", tz:"Europe/Podgorica"},
  {name:"North Macedonia", flag:"🇲🇰", capital:"Üsküp", tz:"Europe/Skopje"},
  {name:"Romania", flag:"🇷🇴", capital:"Bükreş", tz:"Europe/Bucharest"},
  {name:"Serbia", flag:"🇷🇸", capital:"Belgrad", tz:"Europe/Belgrade"},
  {name:"Slovenia", flag:"🇸🇮", capital:"Ljubljana", tz:"Europe/Ljubljana"}
];
const MIDDLE_EAST = [
  {name:"Türkiye", flag:"🇹🇷", capital:"İstanbul", tz:"Europe/Istanbul"},
  {name:"Saudi Arabia", flag:"🇸🇦", capital:"Riyad", tz:"Asia/Riyadh"},
  {name:"United Arab Emirates", flag:"🇦🇪", capital:"Abu Dhabi", tz:"Asia/Dubai"},
  {name:"Qatar", flag:"🇶🇦", capital:"Doha", tz:"Asia/Qatar"},
  {name:"Bahrain", flag:"🇧🇭", capital:"Manama", tz:"Asia/Bahrain"},
  {name:"Kuwait", flag:"🇰🇼", capital:"Kuveyt", tz:"Asia/Kuwait"},
  {name:"Oman", flag:"🇴🇲", capital:"Maskat", tz:"Asia/Muscat"},
  {name:"Yemen", flag:"🇾🇪", capital:"Sana", tz:"Asia/Aden"},
  {name:"Iraq", flag:"🇮🇶", capital:"Bağdat", tz:"Asia/Baghdad"},
  {name:"Iran", flag:"🇮🇷", capital:"Tahran", tz:"Asia/Tehran"},
  {name:"Jordan", flag:"🇯🇴", capital:"Amman", tz:"Asia/Amman"},
  {name:"Lebanon", flag:"🇱🇧", capital:"Beyrut", tz:"Asia/Beirut"},
  {name:"Syria", flag:"🇸🇾", capital:"Şam", tz:"Asia/Damascus"},
  {name:"Israel", flag:"🇮🇱", capital:"Tel Aviv", tz:"Asia/Jerusalem"},
  {name:"Palestine", flag:"🇵🇸", capital:"Ramallah", tz:"Asia/Hebron"},
  {name:"Egypt", flag:"🇪🇬", capital:"Kahire", tz:"Africa/Cairo"},
  {name:"Cyprus", flag:"🇨🇾", capital:"Lefkoşa", tz:"Asia/Nicosia"}
];
const ALL = [...MIDDLE_EAST, ...BALKANS];

// Top: render all flags
const flagsEl = document.getElementById('flags');
ALL.forEach(c=>{
  const span=document.createElement('span');
  span.className='flag';
  span.title = `${c.name} · ${c.capital}`;
  span.textContent=c.flag;
  flagsEl.appendChild(span);
});

// Bottom: live ticker of times for each capital
const ticker=document.getElementById('ticker');
function drawTicker(){
  ticker.innerHTML='';
  ALL.forEach(c=>{
    const t=document.createElement('span');
    t.className='tick';
    const now = new Date().toLocaleString('tr-TR',{timeZone:c.tz,hour:'2-digit',minute:'2-digit'});
    t.textContent = `${c.capital} • ${now}`;
    ticker.appendChild(t);
  });
}
drawTicker();
setInterval(drawTicker, 30000); // update every 30s

// Center: single product rotating every 5s from products.json
let products=[], idx=0;
async function loadProducts(){
  try{
    const res=await fetch('/products.json',{cache:'no-cache'});
    products = await res.json();
  }catch(e){ products=[]; }
  if(!Array.isArray(products) || products.length===0){
    products=[{title:'Örnek Ürün', url:'#', image:'',}];
  }
  showProduct(0);
  setInterval(()=>{
    idx=(idx+1)%products.length;
    showProduct(idx);
  }, 5000);
}
function showProduct(i){
  const p=products[i];
  const t=document.getElementById('pTitle');
  const l=document.getElementById('pLink');
  const img=document.getElementById('pImg');
  t.textContent=p.title||'Ürün';
  l.href=p.url||'#';
  img.style.backgroundImage = p.image ? `url('${p.image}')` : 'none';
}
loadProducts();
