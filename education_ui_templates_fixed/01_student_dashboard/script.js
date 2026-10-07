document.addEventListener('DOMContentLoaded', () => {
  const toast = (message) => { let t=document.querySelector('.toast'); if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t);Object.assign(t.style,{position:'fixed',right:'24px',bottom:'24px',padding:'14px 18px',background:'#111827',color:'#fff',borderRadius:'12px',zIndex:9999,boxShadow:'0 10px 30px #0003'});} t.textContent=message;t.style.display='block';clearTimeout(t.timer);t.timer=setTimeout(()=>t.style.display='none',2200); };
  document.addEventListener('click', e => {
    const el=e.target.closest('button,a'); if(!el)return; e.preventDefault();
    if(el.id==='notify') return toast('🔔 You have 3 new learning notifications.');
    if(el.id==='continueBtn') return toast('▶ Opening JavaScript Fundamentals — Lesson 13');
    const text=el.textContent.trim();
    document.querySelectorAll('.sidebar nav a').forEach(x=>x.classList.remove('active'));
    if(el.closest('.sidebar nav')) el.classList.add('active');
    if(text) toast(`${text.replace(/[→▾]/g,'').trim()} selected`);
  });
});
