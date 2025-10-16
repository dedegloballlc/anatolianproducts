// clocks
function renderClocks(){
  const nodes = document.querySelectorAll('#clockStrip .clk');
  const now = new Date();
  nodes.forEach(n=>{
    const tz = n.dataset.tz;
    try{
      const fmt = new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:tz});
      const code = n.textContent.split(' ')[0];
      n.textContent = code + '  ' + fmt.format(now);
    }catch(e){}
  });
}
renderClocks(); setInterval(renderClocks, 15000);

// product rotator
let PRODUCTS = [];
async function initProductRotator(){
  try{
    const res = await fetch('/products.json', {cache:'no-store'});
    PRODUCTS = await res.json();
  }catch(e){ PRODUCTS = []; }
  const img = document.getElementById('pImg');
  const title = document.getElementById('pTitle');
  const link = document.getElementById('pLink');
  let i = 0;
  function show(idx){
    if(!PRODUCTS.length) return;
    const p = PRODUCTS[idx % PRODUCTS.length];
    img.src = p.image; img.alt = p.alt || p.title;
    title.textContent = p.title;
    link.href = p.url;
  }
  show(i++);
  setInterval(()=>show(i++), 5000);
}
initProductRotator();
