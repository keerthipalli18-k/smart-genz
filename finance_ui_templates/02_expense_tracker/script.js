
let items=[['Lunch at Green Bowl',18.5,'Food'],['Metro card',25,'Transport'],['Streaming subscription',14.99,'Bills'],['New headphones',89,'Shopping'],['Groceries',76.45,'Food']];
const colors={Food:'violet',Transport:'cyan',Shopping:'orange',Bills:'green',Health:'red'};
const list=document.querySelector('#expenseList'), cats=document.querySelector('#categories'), total=document.querySelector('#total');
function render(){
 total.textContent='$'+items.reduce((s,x)=>s+x[1],0).toFixed(2);
 list.innerHTML=items.map((x,i)=>`<div class="tx clickable" data-i="${i}"><span class="dot ${colors[x[2]]}"></span><div><b>${x[0]}</b><small>${x[2]} · Today</small></div><strong>-$${x[1].toFixed(2)}</strong></div>`).join('');
 const sums={}; items.forEach(x=>sums[x[2]]=(sums[x[2]]||0)+x[1]);
 cats.innerHTML=Object.entries(sums).map(([k,v])=>`<div class="cat"><div><span>${k}</span><b>$${v.toFixed(2)}</b></div><div class="track"><i class="${colors[k]}" style="width:${Math.min(v/30,1)*100}%"></i></div></div>`).join('');
 document.querySelectorAll('.clickable').forEach(el=>el.onclick=()=>{items.splice(+el.dataset.i,1);render()});
}
document.querySelector('#expenseForm').onsubmit=e=>{e.preventDefault();items.unshift([name.value,+amount.value,category.value]);e.target.reset();render()};
document.querySelector('#clearBtn').onclick=()=>{items=[];render()};
render();
