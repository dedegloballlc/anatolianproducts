const REGIONS={tr:['İstanbul','Ankara'],balkan:['Saraybosna','Belgrad'],me:['Riyad','Dubai','Kahire']};
sabit TICK=document.getElementById('ticker');
sabit bayraklar=belge.querySelectorAll('.bayraklar düğmesi');
bayraklar.forEach(b=>b.addEventListener('tıkla',()=>işlemeSaati(b.dataset.region)));
fonksiyon bölgesi(şehir){
  const Z={'İstanbul':'Avrupa/İstanbul','Ankara':'Avrupa/İstanbul','Saraybosna':'Avrupa/Saraybosna',
           'Belgrad':'Avrupa/Belgrad','Riyad':'Asya/Riyad','Dubai':'Asya/Dubai','Kahire':'Afrika/Kahire'};
  Z[şehir]||'UTC'yi döndür;
}
fonksiyon renderClock(bölge='tr'){
  TICK.innerHTML='';
  (BÖLGELER[bölge]||BÖLGELER.tr).forEach(c=>{
    sabit el=belge.oluşturElement('span');el.sınıfAdı='tick';el.dataset.city=c;TİC.appendChild(el);
  });
  güncellemeZamanları(); if(window._clk) clearInterval(window._clk); window._clk=setInterval(güncellemeZamanları,20*1000);
}
fonksiyon güncellemeZamanları(){
  belge.querySelectorAll('.tick').forEach(el=>{
    sabit şehir=el.dataset.city;
    sabit zaman=yeni Date().toLocaleString('tr-TR',{saatZone:zone(şehir),saat:'2-haneli',dakika:'2-haneli'});
    el.textContent=`${şehir} • ${zaman}`;
  });
}
asenkron fonksiyon loadProduct(){
  denemek{
    const res=await fetch('/products.json',{cache:'no-cache'});
    sabit veri=await res.json();
    sabit p=(veri&&veri[0])||null;
    eğer(!p) geri dön;
    document.querySelector('#pTitle').textContent=p.title||'Ürün';
    document.querySelector('#pCat').textContent=p.category||'Öneri';
    belge.querySelector('#pLink').href=p.url;
    sabit img=belge.sorguSeçici('.p-img');
    eğer(p.image) img.style.backgroundImage=`url('${p.image}')`;
  }catch(e){console.warn('products.json okunamadı',e)}
}
renderClock('tr'); loadProduct();
