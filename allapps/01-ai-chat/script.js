const input=document.getElementById('input'), messages=document.getElementById('messages');
document.getElementById('send').onclick=send;
input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}});
document.getElementById('clear').onclick=()=>messages.innerHTML='<div class="msg ai"><b>Nova AI</b><p>Chat cleared. What would you like to explore?</p></div>';
function send(){const t=input.value.trim();if(!t)return;messages.innerHTML+=`<div class="msg user"><p>${escapeHtml(t)}</p></div>`;input.value='';setTimeout(()=>messages.innerHTML+=`<div class="msg ai"><b>Nova AI</b><p>Great prompt! I’d approach this by breaking it into clear steps and validating each result.</p></div>`,500)}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
