(function(){
  'use strict';

  // Countries (Israel excluded). Core TR + Balkans + Middle East.
  const BALKANS=[
    {name:"Türkiye", flag:"🇹🇷", capital:"İstanbul", tz:"Europe/Istanbul"},
    {name:"Bosna-Hersek", flag:"🇧🇦", capital:"Saraybosna", tz:"Europe/Sarajevo"},
    {name:"Arnavutluk", flag:"🇦🇱", capital:"Tiranë", tz:"Europe/Tirane"},
    {name:"Sırbistan", flag:"🇷🇸", capital:"Belgrad", tz:"Europe/Belgrade"},
    {name:"Yunanistan", flag:"🇬🇷", capital:"Atina", tz:"Europe/Athens"}
  ];
  const MIDDLE_EAST=[
    {name:"Suudi Arabistan", flag:"🇸🇦", capital:"Riyad", tz:"Asia/Riyadh"},
    {name:"BAE", flag:"🇦🇪", capital:"Abu Dhabi", tz:"Asia/Dubai"},
    {name:"Katar", flag:"🇶🇦", capital:"Doha", tz:"Asia/Qatar"},
    {name:"Irak", flag:"🇮🇶", capital:"Bağdat", tz:"Asia/Baghdad"},
    {name:"Ürdün", flag:"🇯🇴", capital:"Amman", tz:"Asia/Amman"},
    {name:"Lübnan", flag:"🇱🇧", capital:"Beyrut", tz:"Asia/Beirut"},
    {name:"Filistin", flag:"🇵🇸", capital:"Ramallah", tz:"Asia/Hebron"},
    {name:"Mısır", flag:"🇪🇬", capital:"Kahire", tz:"Africa/Cairo"},
    {name:"İran", flag:"🇮🇷", capital:"Tahran", tz:"Asia/Tehran"},
    {name:"Suriye", flag:"🇸🇾", capital:"Şam", tz:"Asia/Damascus"}
  ];
  const ALL=[...BALKANS,...MIDDLE_EAST];

  // Expose small API for inline handlers
  window.APP={
    goSearch(e){
      e.preventDefault();
      const q=document.getElementById('q').value.trim();
      if(!q) return false;
      const url='https://www.google.com/search?q='+encodeURIComponent(q);
      window.open(url,'_blank','noopener,noreferrer');
      return false;
    }
  };

  // Flags with keyboard support
  const flagsEl=document.getElementById('flags');
  ALL.forEach(c=>{
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='flag';
    btn.setAttribute('role','listitem');
    btn.title=`${c.name} · ${c.capital}`;
    btn.textContent=c.flag;
    btn.addEventListener('click',()=>prefillSearch(c));
    btn.addEventListener('keyup',(ev)=>{ if(ev.key==='Enter'||ev.key===' ') prefillSearch(c); });
    flagsEl.appendChild(btn);
  });

  function prefillSearch(country){
    const bar=document.getElementById('searchbar');
    const q=document.getElementById('q');
    bar.hidden=false;
    q.value=`${country.name} ${country.capital}`;
    q.focus();
  }

  // Matte palette for ticker chips
  const COLORS=['#334155','#1f2937','#3f3f46','#3b0764','#312e81','#083344','#1e293b','#2e1065','#0f172a','#052e16'];

  // Clock ticker
  const ticker=document.getElementById('ticker');
  function drawTicker(){
    ticker.innerHTML='';
    ALL.forEach((c,i)=>{
      const chip=document.createElement('span');
      chip.className='tick';
      chip.style.background=COLORS[i%COLORS.length];
      chip.style.color='#e5e7eb';
      const time=new Date().toLocaleString('tr-TR',{timeZone:c.tz,hour:'2-digit',minute:'2-digit'});
      chip.textContent=`${c.capital} • ${time}`;
      ticker.appendChild(chip);
    });
  }
  drawTicker();
  let tickerTimer=setInterval(drawTicker,30_000);

  // Product rotator
  const state={items:[],i:0,rotor:null};
  function renderProduct(p){
    const title=document.getElementById('pTitle');
    const link=document.getElementById('pLink');
    const img=document.getElementById('pImg');
    title.textContent=p.title||'Ürün';
    link.href=p.url||'#';
    img.style.backgroundImage=p.image?`url('${p.image}')`:'none';
  }
  async function loadProducts(){
    try{
      const res=await fetch('/products.json',{cache:'no-cache'});
      const data=await res.json();
      state.items=Array.isArray(data)&&data.length?data:[{title:'Örnek Ürün',url:'#',image:''}];
    }catch(_){
      state.items=[{title:'Örnek Ürün',url:'#',image:''}];
    }
    state.i=0;
    renderProduct(state.items[state.i]);
    if(state.rotor) clearInterval(state.rotor);
    state.rotor=setInterval(()=>{
      state.i=(state.i+1)%state.items.length;
      renderProduct(state.items[state.i]);
    },5_000);
  }
  loadProducts();

  // Cleanup if needed (SPA style navigations)
  window.addEventListener('pagehide',()=>{
    if(tickerTimer) clearInterval(tickerTimer);
    if(state.rotor) clearInterval(state.rotor);
  });
})();