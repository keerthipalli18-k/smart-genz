
const bars=document.querySelector('#bars');
const vals=[62,78,55,84,70,92];
bars.innerHTML=vals.map((v,i)=>`<div class="bar-col"><div class="bar income" style="height:${v}%"></div><div class="bar expense" style="height:${Math.max(18,v-38)}%"></div><label>${['May','Jun','Jul','Aug','Sep','Oct'][i]}</label></div>`).join('');
const data=[
['☕','Blue Bottle Coffee','-$8.40','Today'],['◈','Salary deposit','+$6,250','Yesterday'],
['🛒','Whole Foods Market','-$124.60','Oct 5'],['🚕','City Transit','-$32.00','Oct 4'],['◎','Acme Software','-$49.00','Oct 3']
];
const tx=document.querySelector('#transactions');
function render(expensesOnly=false){tx.innerHTML=data.filter(x=>!expensesOnly||x[2][0]==='-').map(x=>`<div class="tx"><span class="tx-icon">${x[0]}</span><div><b>${x[1]}</b><small>${x[3]}</small></div><strong class="${x[2][0]==='+'?'up':'down'}">${x[2]}</strong></div>`).join('')}
render();
document.querySelector('#filterBtn').onclick=()=>{const b=document.querySelector('#filterBtn'); const only=b.textContent.includes('Show'); render(only); b.textContent=only?'Show all':'Show expenses'};
document.querySelector('#addIncome').onclick=()=>{const amount=prompt('Income amount ($):','1000'); if(amount&&Number(amount)>0){document.querySelector('#balance').textContent='$'+(12840+Number(amount)).toLocaleString(); alert('Income added to this demo balance.')}};
document.querySelector('#themeBtn').onclick=()=>document.body.classList.toggle('light');
