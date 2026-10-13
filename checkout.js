shell('checkout');
const items=cart.map(c=>({...c,p:PRODUCTS.find(x=>x.id==c.id)})).filter(c=>c.p&&c.p.usd),skipped=cart.filter(c=>{const p=PRODUCTS.find(x=>x.id==c.id);return !p||!p.usd}).length;
const sub=items.reduce((s,c)=>s+c.p.usd,0);
const summary=()=>`<aside class=sum><div class=eyebrow>Order summary</div><div class=rule style="margin:16px 0"></div>${items.map(c=>`<div class=ci><img src="${c.p.card}" alt=""><div style="flex:1"><div style="font-family:'Cormorant Garamond';font-size:18px">${c.p.name}</div><div style="color:#7a7066;font-size:12px">${[c.color,c.size].filter(Boolean).join(' · ')}</div></div><div>$${c.p.usd}</div></div>`).join('')}
${skipped?`<p class=note>${skipped} DM-priced item${skipped>1?'s are':' is'} not included. <a href="https://ig.me/m/the_p_pattern" target=_blank>DM us</a> to order.</p>`:''}
<div class=tl><span>Subtotal</span><span>$${sub}</span></div><div class=tl><span>Shipping</span><span>Confirmed after order</span></div><div class="tl tot"><span>Total</span><span>$${sub} USD</span></div></aside>`;
if(!items.length){co.innerHTML=`<div style="text-align:center;padding:40px 5vw 120px"><p style="color:#6d645b">${skipped?'Your bag only has DM-priced items. Please DM us to order them.':'Your bag is empty.'}</p><a class=btn href=shop.html>Discover the collection</a></div>`}
else{
co.innerHTML=`<form class=cof id=f novalidate><div class=col>
<h3>Contact</h3><div class=row><label>Email<input name=email type=email required autocomplete=email></label><label>Phone<input name=phone type=tel required autocomplete=tel></label></div>
<h3>Shipping address</h3><div class=row><label>First name<input name=fn required autocomplete=given-name></label><label>Last name<input name=ln required autocomplete=family-name></label></div>
<label>Address<input name=addr required autocomplete=street-address></label><div class=row><label>City<input name=city required autocomplete=address-level2></label><label>Region / State<input name=region autocomplete=address-level1></label></div>
<div class=row><label>Postcode<input name=zip autocomplete=postal-code></label><label>Country<select name=country required autocomplete=country-name><option value="">Select</option>${['Ghana','Nigeria','United States','United Kingdom','Canada','Germany','France','South Africa','Kenya','Other'].map(c=>`<option>${c}</option>`).join('')}</select></label></div>
<h3>Payment</h3><div class=pm>${[['card','Card'],['paypal','PayPal'],['paystack','Paystack · Mobile Money']].map(([v,l],i)=>`<label class="pmo ${i?'':'on'}"><input type=radio name=pay value=${v} ${i?'':'checked'}>${l}</label>`).join('')}</div>
<div id=pay-card class=pbox><label>Card number<div class=cn><input name=cc inputmode=numeric autocomplete=off placeholder="1234 1234 1234 1234" maxlength=23><span id=brand></span></div></label>
<div class=row><label>Expiry<input name=exp inputmode=numeric autocomplete=off placeholder="MM / YY" maxlength=7></label><label>CVC<input name=cvc inputmode=numeric autocomplete=off placeholder="123" maxlength=4></label></div><label>Name on card<input name=ccname autocomplete=off></label></div>
<div id=pay-paypal class=pbox hidden><p>You'll confirm with PayPal after placing your order.</p></div>
<div id=pay-paystack class=pbox hidden><p>Pay with card or mobile money (MTN MoMo, Telecel Cash, AirtelTigo Money) via Paystack.</p><label>Mobile money number<input name=momo inputmode=tel autocomplete=off placeholder="024 000 0000"></label></div>
<p id=err class=err></p><button class="btn o" style="width:100%">Place order · $${sub}</button><p class=demo style="display:block;text-align:center">Demo store: no payment is processed.</p></div>${summary()}</form>`;
const F=f.elements,v=id=>f.querySelector('#'+id);
f.querySelectorAll('input[name=pay]').forEach(r=>r.onchange=()=>{f.querySelectorAll('.pmo').forEach(l=>l.classList.toggle('on',l.contains(r)&&r.checked));['card','paypal','paystack'].forEach(k=>v('pay-'+k).hidden=k!=r.value)});
const brandOf=n=>/^4/.test(n)?'Visa':/^(5[1-5]|2[2-7])/.test(n)?'Mastercard':/^3[47]/.test(n)?'Amex':/^(506[01]|507[89]|6500)/.test(n)?'Verve':/^6(011|5)/.test(n)?'Discover':'';
F.cc.oninput=e=>{const d=F.cc.value.replace(/\D/g,'').slice(0,19);F.cc.value=d.replace(/(\d{4})(?=\d)/g,'$1 ');v('brand').textContent=brandOf(d)};
F.exp.oninput=()=>{const d=F.exp.value.replace(/\D/g,'').slice(0,4);F.exp.value=d.length>2?d.slice(0,2)+' / '+d.slice(2):d};
F.cvc.oninput=()=>F.cvc.value=F.cvc.value.replace(/\D/g,'').slice(0,4);
const luhn=n=>{let s=0,a=false;for(let i=n.length-1;i>=0;i--){let x=+n[i];if(a){x*=2;if(x>9)x-=9}s+=x;a=!a}return s%10==0};
f.onsubmit=e=>{e.preventDefault();const bad=[];f.querySelectorAll('.inv').forEach(x=>x.classList.remove('inv'));
const need=(el,ok,msg)=>{if(!ok){el.classList.add('inv');bad.push(msg)}};
need(F.email,/^\S+@\S+\.\S+$/.test(F.email.value),'a valid email');need(F.phone,F.phone.value.replace(/\D/g,'').length>=7,'a phone number');
['fn','ln','addr','city','country'].forEach(k=>need(F[k],F[k].value.trim(),'your full shipping address'));
const pay=F.pay.value;
if(pay=='card'){const n=F.cc.value.replace(/\D/g,''),m=F.exp.value.replace(/\D/g,''),mm=+m.slice(0,2),yy=+m.slice(2),now=new Date(),cy=now.getFullYear()%100;
need(F.cc,n.length>=13&&luhn(n),'a valid card number');need(F.exp,m.length==4&&mm>=1&&mm<=12&&(yy>cy||(yy==cy&&mm>=now.getMonth()+1)),'a valid expiry date');
need(F.cvc,F.cvc.value.length>=(brandOf(n)=='Amex'?4:3),'the CVC');need(F.ccname,F.ccname.value.trim(),'the name on the card')}
if(pay=='paystack')need(F.momo,!F.momo.value||F.momo.value.replace(/\D/g,'').length>=9,'a valid mobile money number');
if(bad.length){v('err').textContent='Please enter '+[...new Set(bad)].join(', ')+'.';return}
const no='PP-'+Date.now().toString(36).toUpperCase().slice(-6)+Math.floor(Math.random()*90+10);
const name=F.fn.value.trim(),email=F.email.value.trim(),method={card:'Card'+(brandOf(F.cc.value.replace(/\D/g,''))?' ('+brandOf(F.cc.value.replace(/\D/g,''))+' ending '+F.cc.value.replace(/\D/g,'').slice(-4)+')':''),paypal:'PayPal',paystack:'Paystack'}[pay];
const shipTo=[F.addr.value,F.city.value,F.country.value].map(s=>s.trim()).filter(Boolean).join(', ');
const lines=items;f.reset();
cart=cart.filter(c=>{const p=PRODUCTS.find(x=>x.id==c.id);return !p||!p.usd});save();
window.scrollTo({top:0,behavior:'smooth'});document.querySelector('.ph-t').innerHTML=`<div class=eyebrow style="color:var(--orange)">Thank you, ${name.replace(/</g,'')}</div><h1 style="font-size:44px">Your order is confirmed</h1><div class=rule></div>`;
co.innerHTML=`<div class=conf><div class=eyebrow>Order number</div><div class=ono>${no}</div><p>A confirmation would be sent to <b>${email.replace(/</g,'')}</b>.</p>
<div class=cbox>${lines.map(c=>`<div class=tl><span>${c.p.name}${c.color?' · '+c.color:''}${c.size?' · '+c.size:''}</span><span>$${c.p.usd}</span></div>`).join('')}<div class="tl tot"><span>Total</span><span>$${sub} USD</span></div><div class=tl><span>Payment</span><span>${method}</span></div><div class=tl><span>Ship to</span><span>${shipTo.replace(/</g,'')}</span></div></div>
<p class=demo>Demo store: this is a sample confirmation. No payment was taken.</p><a class=btn href=shop.html>Continue shopping</a></div>`};
}
