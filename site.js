
document.addEventListener('DOMContentLoaded',()=>{
  const f = document.querySelector('#sform');
  if(!f) return;
  f.addEventListener('submit', (e)=>{
    e.preventDefault();
    const q = new URLSearchParams(new FormData(f)).get('q') || '';
    if(q.trim().length) window.location.href = '/?q=' + encodeURIComponent(q.trim());
  });
});
