
let holdings=[['NVDA','NVIDIA Corporation',18,12840.20,32.4],['MSFT','Microsoft',12,8120.50,14.8],['VTI','Vanguard Total Stock',35,9675.80,8.2],['BND','Vanguard Bond ETF',42,3440.10,-1.4],['AAPL','Apple',16,4210.70,6.7]];
const h=document.querySelector('#holdings');
function render(){h.innerHTML=holdings.map((x,i)=>`<div class="holding"><div class="ticker">${x[0].slice(0,2)}</div><div class="grow"><b>${x[0]}</b><small>${x[1]} · ${x[2]} shares</small></div><strong>$${x[3].toLocaleString()}</strong><span class="${x[4]>=0?'up':'down'}">${x[4]>=0?'+':''}${x[4]}%</span></div>`).join('')}
document.querySelector('#add').onclick=()=>{let s=prompt('Ticker symbol:','GOOG');if(s){holdings.push([s.toUpperCase(),'New holding',1,2500,0]);render()}};
document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tabs button').forEach(x=>x.classList.remove('active'));b.classList.add('active')});
document.querySelector('#watch').onclick=()=>alert('Watchlist opened — demo interaction.');
render();
