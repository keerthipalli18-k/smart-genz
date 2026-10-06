const p=document.getElementById('prompt'), preview=document.getElementById('preview');
document.querySelectorAll('.chips button').forEach(b=>b.onclick=()=>{p.value=b.dataset.t; update()});
document.getElementById('sample').onclick=()=>{p.value='Act as a senior product designer. Create a simple onboarding flow for a student productivity app. Return 5 concise recommendations with reasons.';update()};
p.addEventListener('input',update);document.getElementById('run').onclick=()=>{preview.textContent='Prompt executed successfully.\n\nAI response preview: I would first identify the user goal, then structure the response into clear, actionable steps.'};
function update(){preview.textContent=p.value||'Your prompt preview will appear here.';document.querySelector('.metrics div:nth-child(1) b').textContent=p.value.trim()?p.value.trim().split(/\s+/).length:0;document.querySelector('.metrics div:nth-child(2) b').textContent=p.value.length}
