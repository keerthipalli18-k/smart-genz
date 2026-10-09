
const amount=document.querySelector('#amount'),rate=document.querySelector('#rate'),term=document.querySelector('#term');
function calc(){
 const P=+amount.value, r=+rate.value/100/12, n=+term.value;
 const m=P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1), total=m*n, interest=total-P;
 document.querySelector('#amountOut').textContent='$'+P.toLocaleString();
 document.querySelector('#rateOut').textContent=(+rate.value).toFixed(1)+'%';
 document.querySelector('#termOut').textContent=n+' months';
 document.querySelector('#payment').textContent='$'+m.toFixed(2);
 document.querySelector('#interest').textContent='$'+interest.toFixed(2);
 document.querySelector('#repay').textContent='$'+total.toFixed(2);
 const ip=Math.round(interest/total*100), pp=100-ip;
 document.querySelector('#principal').textContent=pp+'%';document.querySelector('#interestPct').textContent=ip+'%';document.querySelector('#principalBar').style.width=pp+'%';
}
[amount,rate,term].forEach(x=>x.oninput=calc);document.querySelector('#save').onclick=()=>alert('Plan saved to your demo profile.');document.querySelector('#apply').onclick=()=>alert('Application flow started in this demo.');calc();
