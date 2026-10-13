shell('pdp');
const p=PRODUCTS.find(x=>x.id==new URLSearchParams(location.search).get('id'))||PRODUCTS[0];document.title=p.name+' | P.PATTERN';
let st={color:p.colors[0]?p.colors[0][0]:'',size:'',img:0};
d.innerHTML=`<div class=gal><div class=th>${p.media.map((m,i)=>`<div class=tw data-i=${i}><img loading=lazy src="${still(m)}" alt="">${m.v?'<span>&#9654;</span>':''}</div>`).join('')}</div><div class=zoom id=z></div></div>
<div class=info><div class=eyebrow style="color:#958a7e">${p.cat}</div><h1>${p.name}</h1><div class=pr>${price(p)}</div>
${p.colors.length?`<div class=lbl>Colour: <span id=cl>${st.color}</span></div><div>${p.colors.map((c,i)=>`<button class="opt col ${i?'':'on'}" data-c="${c[0]}" data-i=${c[1]}><span class=dot style="background:${sw(c[0])};vertical-align:-1px"></span>${c[0]}</button>`).join('')}</div>`:''}
${p.sizes.length?`<div class=lbl>Size</div><div>${p.sizes.map(s=>`<button class="opt sz" data-s=${s}>${s}</button>`).join('')}</div><div style="font-size:11px;color:#958a7e">Unsure of your size? DM us and we'll help.</div>`:''}
<p class=d>${p.desc}</p><button class="btn o" id=addb>Add to bag</button><a class=btn style="width:100%;text-align:center;margin-top:10px" href="${p.ig}" target=_blank>View on Instagram</a>
<div class=det><div>Price: ${price(p)}${p.price?' USD':', confirmed by DM'}</div><div>Worldwide delivery</div><div>Order by Instagram DM or email</div></div></div>`;
const sel=i=>{st.img=i;const m=p.media[i];z.innerHTML=m.v?`<video id=main src="${m.v}" poster="${m.p}" muted autoplay loop playsinline></video>`:pic(m.j,p.name,'',false).replace('<img','<img id=main');z.classList.toggle('isv',!!m.v);document.querySelectorAll('.th .tw').forEach(t=>t.classList.toggle('on',t.dataset.i==i))};sel(0);
document.querySelectorAll('.th .tw').forEach(t=>t.onclick=()=>sel(+t.dataset.i));
document.querySelectorAll('.col').forEach(b=>b.onclick=()=>{document.querySelectorAll('.col').forEach(x=>x.classList.remove('on'));b.classList.add('on');st.color=b.dataset.c;cl.textContent=st.color;sel(+b.dataset.i)});
document.querySelectorAll('.sz').forEach(b=>b.onclick=()=>{document.querySelectorAll('.sz').forEach(x=>x.classList.remove('on'));b.classList.add('on');st.size=b.dataset.s});
z.onmousemove=e=>{const main=document.getElementById('main');if(!main||main.tagName=='VIDEO')return;const r=z.getBoundingClientRect();main.style.transformOrigin=`${(e.clientX-r.left)/r.width*100}% ${(e.clientY-r.top)/r.height*100}%`;main.style.transform='scale(2)'};
z.onmouseleave=()=>{const main=document.getElementById('main');if(main)main.style.transform=''};
addb.onclick=()=>{if(p.sizes.length&&!st.size){addb.textContent='Please choose a size';setTimeout(()=>addb.textContent='Add to bag',1500);return}add({id:p.id,color:st.color,size:st.size,img:st.img})};
g.innerHTML=PRODUCTS.filter(x=>x.cat==p.cat&&x!=p).concat(PRODUCTS.filter(x=>x.cat!=p.cat)).slice(0,4).map(card).join('');reveal();
