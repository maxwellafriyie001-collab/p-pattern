const $=s=>document.querySelector(s);let cart=JSON.parse(localStorage.cart||"[]");
function head(){document.body.insertAdjacentHTML('afterbegin',`<div class="bar">Worldwide delivery · Made with love</div><header><a class="logo" href="index.html">P.PATTERN</a><nav><a class="h" href="shop.html">Shop</a><a class="h" href="https://www.instagram.com/the_p_pattern/">Instagram</a><a href="#" onclick="tog();return false">Bag (<span id=cc>0</span>)</a></nav></header><div id=cart></div>`);
document.body.insertAdjacentHTML('beforeend',`<footer>The P Pattern · Welcome princess · <a href="https://www.instagram.com/the_p_pattern/">@the_p_pattern</a></footer>`);draw()}
function tog(){$('#cart').classList.toggle('open')}
function add(id){cart.push(id);localStorage.cart=JSON.stringify(cart);draw();$('#cart').classList.add('open')}
function rm(i){cart.splice(i,1);localStorage.cart=JSON.stringify(cart);draw()}
function draw(){$('#cc').textContent=cart.length;const it=cart.map(id=>PRODUCTS.find(p=>p.id==id));
const txt=encodeURIComponent("Hi P Pattern! I'd like to order:\n"+it.map(p=>"- "+p.name+" ("+p.ig+")").join("\n"));
$('#cart').innerHTML=`<div style="display:flex;justify-content:space-between"><b style="font-size:12px;letter-spacing:.2em">YOUR BAG</b><a href="#" onclick="tog();return false">✕</a></div>`+
(it.length?it.map((p,i)=>`<div class=ci><img src="${p.img}"><div>${p.name}<br><small>DM for price</small><br><a href="#" onclick="rm(${i});return false"><u>Remove</u></a></div></div>`).join('')+
`<p style="font-size:12px;margin:20px 0">Checkout by DM: send us your bag on Instagram or email.</p><a class="btn dark" href="https://ig.me/m/the_p_pattern" onclick="navigator.clipboard&&navigator.clipboard.writeText(decodeURIComponent('${txt}'))">Order via Instagram DM</a><br><a class="btn" href="mailto:maxwellafriyie001@gmail.com?subject=P.Pattern%20order&body=${txt}">Order by email</a>`:'<p style="font-size:12px;margin-top:30px">Your bag is empty.</p>')}
const card=p=>`<a class=card href="product.html?id=${p.id}"><img src="${p.img}" alt="${p.name}"><p>${p.name}</p><small>DM for price</small></a>`;
