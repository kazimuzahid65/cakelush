/* Cake Lush — application logic. Content lives in js/data.js */
document.querySelectorAll('img[data-i]').forEach(i=>i.src=IMG[i.dataset.i]);
document.querySelectorAll('[data-cfg]').forEach(e=>{const k=e.dataset.cfg;e.textContent=CONFIG[k];e.href=(k==='email'?'mailto:':'tel:')+CONFIG[k]});
document.querySelectorAll('a.ig').forEach(a=>a.href=/Daily/.test(a.textContent)?CONFIG.social.daily:CONFIG.social.bespoke);
document.querySelectorAll('[data-social]').forEach(a=>a.href=CONFIG.social[a.dataset.social]||'#');
document.querySelector('.bg-fixed').style.backgroundImage='url('+IMG['bg.jpg']+')';

(function(){
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const store={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};

/* theme toggle */
const root=document.documentElement;
root.dataset.theme=store.get('cl-theme','dark');
$('#themeBtn')?.addEventListener('click',()=>{const t=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=t;store.set('cl-theme',t)});

/* header, progress, back-to-top */
const hdr=$('.hdr'),bar=$('#progress'),top=$('#top');
function onScroll(){
  const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
  hdr.classList.toggle('scrolled',y>40);bar.style.width=(h>0?y/h*100:0)+'%';top.classList.toggle('show',y>600);
}
addEventListener('scroll',onScroll,{passive:true});onScroll();
top.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

/* mobile menu */
const mm=$('.mm');
$('.burger')?.addEventListener('click',()=>{mm.classList.add('open');document.body.style.overflow='hidden'});
const closeMM=()=>{mm.classList.remove('open');document.body.style.overflow=''};
$('.mm .x')?.addEventListener('click',closeMM);$$('.mm a').forEach(a=>a.addEventListener('click',closeMM));
addEventListener('keydown',e=>{if(e.key==='Escape'){closeMM();closeCart();closeLB();closeCO?.();document.querySelectorAll('.rvm.open').forEach(m=>m.classList.remove('open'))}});

/* reveal on scroll + counters */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);
  if(e.target.dataset.count)count(e.target)}}),{threshold:.12});
$$('.rv,[data-count]').forEach(el=>io.observe(el));
function count(el){const to=+el.dataset.count,suf=el.dataset.suf||'';let n=0;const step=Math.max(1,Math.ceil(to/60));
  const t=setInterval(()=>{n=Math.min(to,n+step);el.textContent=n+suf;if(n>=to)clearInterval(t)},25)}

/* FAQ accordion */
$$('.fq').forEach(f=>f.querySelector('button').addEventListener('click',()=>{
  const open=f.classList.contains('open');
  $$('.fq.open',f.parentElement).forEach(o=>{o.classList.remove('open');o.querySelector('.ans').style.maxHeight=0});
  if(!open){f.classList.add('open');const a=f.querySelector('.ans');a.style.maxHeight=a.scrollHeight+'px'}
}));

/* gallery + lightbox */
let lbList=[],lbI=0;const lb=$('.lb');
function showLB(){const im=$('img',lb);im.src=lbList[lbI];$('span',lb).textContent=(lbI+1)+' / '+lbList.length}
function closeLB(){lb?.classList.remove('open')}
$$('.gi').forEach(g=>g.addEventListener('click',()=>{
  lbList=$$('.gi:not(.hide) img').map(i=>i.src);lbI=lbList.indexOf(g.querySelector('img').src);lb.classList.add('open');showLB()}));
$('.lb .c')?.addEventListener('click',closeLB);
$('.lb .p')?.addEventListener('click',e=>{e.stopPropagation();lbI=(lbI-1+lbList.length)%lbList.length;showLB()});
$('.lb .n')?.addEventListener('click',e=>{e.stopPropagation();lbI=(lbI+1)%lbList.length;showLB()});
lb?.addEventListener('click',e=>{if(e.target===lb)closeLB()});
addEventListener('keydown',e=>{if(!lb?.classList.contains('open'))return;
  if(e.key==='ArrowRight')$('.lb .n').click();if(e.key==='ArrowLeft')$('.lb .p').click()});
$$('.filters button[data-f]').forEach(b=>b.addEventListener('click',()=>{
  $$('.filters button').forEach(x=>x.classList.remove('on'));b.classList.add('on');
  $$('.gi').forEach(g=>g.classList.toggle('hide',b.dataset.f!=='all'&&g.dataset.c!==b.dataset.f))}));

/* toast */
function toast(m){const t=$('.toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}

/* cart */
let cart=store.get('cl-cart',[]);
const drawer=$('.drawer'),dim=$('.dim');
const money=n=>'$'+n.toFixed(2);
function openCart(){drawer.classList.add('open');dim.classList.add('open')}
function closeCart(){drawer?.classList.remove('open');dim?.classList.remove('open')}
function saveCart(){store.set('cl-cart',cart);renderCart()}
function renderCart(){
  const n=cart.reduce((a,c)=>a+c.q,0),t=cart.reduce((a,c)=>a+c.q*c.p,0);
  $$('.cart-count').forEach(b=>{b.textContent=n;b.style.display=n?'flex':'none'});
  const dsc=Math.round(t*(window.CL_DISC||0)*100)/100;$$('.cart-total').forEach(b=>b.textContent=money(t-dsc));const dr=$('.dsc-row');if(dr){dr.style.display=dsc?'flex':'none';$('.dsc-amt').textContent='−'+money(dsc)}
  const l=$('.cl');if(!l)return;
  l.innerHTML=cart.length?cart.map((c,i)=>`<div class="ci"><img src="${IMG[c.img]}" alt=""><div style="flex:1"><b>${c.n}</b><div class="gold">${money(c.p)}</div>
   <div class="q"><button data-a="m" data-i="${i}">−</button><span>${c.q}</span><button data-a="p" data-i="${i}">+</button><button data-a="d" data-i="${i}" style="margin-left:auto;width:auto;padding:0 10px">Remove</button></div></div></div>`).join(''):'<p class="muted center" style="margin-top:40px">Your cart is empty.</p>';
}
$('.cl')?.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const i=+b.dataset.i;
  if(b.dataset.a==='p')cart[i].q++;if(b.dataset.a==='m')cart[i].q=Math.max(1,cart[i].q-1);if(b.dataset.a==='d')cart.splice(i,1);saveCart()});
$$('.cart-btn').forEach(b=>b.addEventListener('click',openCart));
$('.drawer .x')?.addEventListener('click',closeCart);dim?.addEventListener('click',closeCart);
const COUPONS=CONFIG.coupons;
let cpn=store.get('cl-coupon','');if(!COUPONS[cpn])cpn='';window.CL_DISC=COUPONS[cpn]||0;
$('#cpnBtn')?.addEventListener('click',()=>{const c=$('#cpn').value.trim().toUpperCase(),m=$('.cpn-msg');
 if(COUPONS[c]){cpn=c;window.CL_DISC=COUPONS[c];m.textContent='Coupon '+c+' applied — '+Math.round(COUPONS[c]*100)+'% off';m.style.color='var(--gold-soft)'}
 else{cpn='';window.CL_DISC=0;m.textContent='Invalid coupon code';m.style.color='#e0584a'}store.set('cl-coupon',cpn);renderCart()});
if(cpn&&$('#cpn')){$('#cpn').value=cpn;$('.cpn-msg').textContent='Coupon '+cpn+' applied'}
renderCart();

/* ---- checkout: order by email ---- */
const co=$('#co'),cof=$('#coForm');let pend=null;
const orderNo=()=>'CL-'+Date.now().toString(36).toUpperCase().slice(-6);
const tots=()=>{const s=cart.reduce((a,c)=>a+c.q*c.p,0),d=Math.round(s*(window.CL_DISC||0)*100)/100;return{s,d,t:s-d}};
function drawCO(){const T=tots();$('#coItems').innerHTML=cart.map(c=>`<div class="ci"><img src="${IMG[c.img]}" alt=""><div style="flex:1"><b>${c.n}</b><div class="muted">${c.q} × ${money(c.p)}</div></div><b>${money(c.q*c.p)}</b></div>`).join('')+(T.d?`<div class="dsc-row" style="display:flex;margin-top:10px"><span>Discount (${cpn})</span><span>−${money(T.d)}</span></div>`:'')+`<div class="tot" style="margin:12px 0 22px"><span>Total</span><b>${money(T.t)}</b></div>`}
function openCO(){if(!cart.length)return toast('Your cart is empty');closeCart();pend=orderNo();$('#coMain').style.display='block';$('#coDone').style.display='none';drawCO();
  const d=new Date(Date.now()+2*864e5).toISOString().split('T')[0];$('#co-date').min=d;co.classList.add('open');document.body.style.overflow='hidden'}
function closeCO(){co.classList.remove('open');document.body.style.overflow=''}
$('#checkout')?.addEventListener('click',openCO);$('#coX')?.addEventListener('click',closeCO);$('#coClose')?.addEventListener('click',closeCO);
co?.addEventListener('click',e=>{if(e.target===co)closeCO()});
$$('input[name=com]',cof).forEach(r=>r.addEventListener('change',()=>{$('#coAddrF').style.display=cof.com.value==='delivery'?'block':'none'}));
function collect(){const T=tots(),v=id=>$('#'+id).value.trim();return{no:pend,date:new Date().toLocaleString('en-US',{dateStyle:'medium',timeStyle:'short'}),name:v('co-name'),phone:v('co-phone'),email:v('co-email'),method:cof.com.value,addr:v('co-addr'),when:v('co-date'),note:v('co-note'),items:cart.map(c=>({...c})),cpn,s:T.s,d:T.d,t:T.t}}
function receipt(o){const L=['CAKE LUSH — ORDER RECEIPT','Order #: '+o.no,'Date: '+o.date,'','CUSTOMER','Name: '+o.name,'Phone: '+o.phone,'Email: '+o.email,'','FULFILMENT',o.method==='delivery'?'Delivery to: '+o.addr:'Pickup','Needed by: '+o.when,'','ITEMS'];
  o.items.forEach(i=>L.push(i.q+' x '+i.n+' — '+money(i.q*i.p)));L.push('','Subtotal: '+money(o.s));if(o.d)L.push('Discount ('+o.cpn+'): -'+money(o.d));L.push('TOTAL: '+money(o.t));
  if(o.note)L.push('','Notes: '+o.note);L.push('','Minimum 48 hours’ advance notice is required for all orders.','Tip: attach your downloaded Order Card image to this email.','Thank you for choosing Cake Lush.');return L.join('\n')}
const loadImg=s=>new Promise((r,j)=>{const i=new Image();i.onload=()=>r(i);i.onerror=j;i.src=s});
async function card(o,withImg){const W=900,H=420+o.items.length*110+(o.d?36:0),cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d');
  x.fillStyle='#0b0b0c';x.fillRect(0,0,W,H);x.strokeStyle='#A67C45';x.lineWidth=3;x.strokeRect(20,20,W-40,H-40);x.lineWidth=1;x.strokeRect(32,32,W-64,H-64);
  x.textAlign='center';x.fillStyle='#C9A76B';x.font='700 16px Lato,Arial,sans-serif';x.fillText('E D I B L E   A R C H I T E C T U R E',W/2,90);
  x.fillStyle='#fff';x.font='600 56px "Playfair Display",Georgia,serif';x.fillText('Cake Lush',W/2,155);
  x.fillStyle='#C9A76B';x.font='italic 24px "Playfair Display",Georgia,serif';x.fillText('Order '+o.no+'  ·  '+o.date,W/2,205);
  x.textAlign='left';let y=250;
  for(const i of o.items){if(withImg){try{x.drawImage(await loadImg(IMG[i.img]),70,y,84,84)}catch(e){}}x.strokeStyle='#A67C45';x.strokeRect(70,y,84,84);
    x.fillStyle='#fff';x.font='600 24px "Playfair Display",Georgia,serif';x.fillText(i.n,176,y+34);x.fillStyle='#bdb6aa';x.font='18px Lato,Arial,sans-serif';x.fillText(i.q+' × '+money(i.p),176,y+66);
    x.textAlign='right';x.fillStyle='#C9A76B';x.font='700 22px Lato,Arial,sans-serif';x.fillText(money(i.q*i.p),W-70,y+50);x.textAlign='left';y+=110}
  x.fillStyle='#A67C45';x.fillRect(70,y,W-140,1);y+=44;x.textAlign='right';
  if(o.d){x.fillStyle='#C9A76B';x.font='18px Lato,Arial,sans-serif';x.fillText('Discount ('+o.cpn+')  −'+money(o.d),W-70,y);y+=36}
  x.fillStyle='#fff';x.font='600 34px "Playfair Display",Georgia,serif';x.fillText('Total  '+money(o.t),W-70,y+10);
  x.textAlign='center';x.fillStyle='#bdb6aa';x.font='15px Lato,Arial,sans-serif';x.fillText((o.method==='delivery'?'Delivery':'Pickup')+' · needed by '+(o.when||'—')+' · minimum 48 hours’ notice',W/2,H-62);return cv}
async function dlCard(o){let b;try{b=await new Promise((r,j)=>{try{(async()=>(await card(o,true)).toBlob(r,'image/png'))().catch(j)}catch(e){j(e)}})}catch(e){}
  if(!b){b=await new Promise(r=>card(o,false).then(c=>c.toBlob(r,'image/png')))}
  const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='cake-lush-order-'+o.no+'.png';a.click()}
$('#coCard')?.addEventListener('click',()=>dlCard(collect()));
$('#coCard2')?.addEventListener('click',()=>dlCard(pend_o));let pend_o=null;
cof?.addEventListener('submit',e=>{e.preventDefault();let bad=null;
  $$('.f[data-req]',cof).forEach(f=>{const i=$('input',f);let ok=i.value.trim()!=='';if(ok&&i.type==='email')ok=/^\S+@\S+\.\S+$/.test(i.value);f.classList.toggle('err',!ok);if(!ok&&!bad)bad=f});
  if(cof.com.value==='delivery'&&!$('#co-addr').value.trim()){$('#coAddrF').classList.add('err');bad=bad||$('#coAddrF')}
  if(bad)return bad.scrollIntoView({behavior:'smooth',block:'center'});
  const o=collect();pend_o=o;$('#coNo').textContent=o.no;$('#coMain').style.display='none';$('#coDone').style.display='block';
  location.href='mailto:'+CONFIG.email+'?cc='+encodeURIComponent(o.email)+'&subject='+encodeURIComponent('Cake Lush Order '+o.no)+'&body='+encodeURIComponent(receipt(o));
  cart=[];saveCart()});
$$('input',cof).forEach(i=>i.addEventListener('input',()=>i.closest('.f')?.classList.remove('err')));

/* store */
const grid=$('#prods');
if(grid){
  const P=window.PRODUCTS;let cat='all',q='',sort='new',ty='all',pr='all';
  const draw=()=>{
    let l=P.filter(p=>(cat==='all'||p.c===cat)&&(ty==='all'||p.t===ty)&&(pr==='all'||(pr==='u'&&p.p<50)||(pr==='m'&&p.p>=50&&p.p<100)||(pr==='o'&&p.p>=100))&&(p.n+' '+(p.k||'')).toLowerCase().includes(q));
    if(sort==='lo')l.sort((a,b)=>a.p-b.p);if(sort==='hi')l.sort((a,b)=>b.p-a.p);if(sort==='az')l.sort((a,b)=>a.n.localeCompare(b.n));
    $('#cnt').textContent=l.length+(l.length===1?' cake':' cakes');
    grid.innerHTML=l.length?l.map((p,i)=>`<article class="prod glass" data-view="${p.id}" style="animation-delay:${i*80}ms"><div class="im"><img src="${IMG[p.img]}" alt="${p.n}"><span class="bdg">${p.t}</span></div>
     <div class="inf"><h3>${p.n}</h3><div class="pr">${money(p.p)}</div><div class="row"><button class="btn ghost sm" type="button">View details</button><button class="btn sm" type="button" data-id="${p.id}">Add to cart</button></div></div></article>`).join(''):'<p class="muted">No products match your filters.</p>'};
  const pdm=$('#pdModal');let pdq=1;
  const addP=(p,n)=>{const f=cart.find(c=>c.id===p.id);f?f.q+=n:cart.push({id:p.id,n:p.n,p:p.p,img:p.img,q:n});saveCart();toast('Added: '+p.n)};
  function openPD(p){pdq=1;$('#pdBody').innerHTML=`<div class="pd"><div class="pd-im"><img src="${IMG[p.img]}" alt="${p.n}"></div><div class="pd-in"><span class="eyebrow">${p.t}</span><h3>${p.n}</h3><div class="pr" style="color:var(--gold-soft);font-size:1.5rem;font-weight:700">${money(p.p)}</div><p class="muted">${p.d}</p><ul class="pd-ul"><li>Made fresh to order</li><li>Minimum 48 hours’ advance notice</li><li>Flavors &amp; fillings on request — see <a href="#/flavors">Flavors</a></li></ul><div class="pd-qty"><button type="button" data-q="-1" aria-label="Less">−</button><span id="pdq">1</span><button type="button" data-q="1" aria-label="More">+</button></div><button class="btn" type="button" id="pdAdd" data-pid="${p.id}">Add to cart</button></div></div>`;pdm.classList.add('open')}
  pdm?.addEventListener('click',e=>{if(e.target===pdm||e.target.closest('#pdX')||e.target.closest('a[href^="#/"]'))return pdm.classList.remove('open');
    const q=e.target.closest('[data-q]');if(q){pdq=Math.max(1,Math.min(20,pdq+ +q.dataset.q));$('#pdq').textContent=pdq}
    if(e.target.closest('#pdAdd')){addP(P.find(x=>x.id==$('#pdAdd').dataset.pid),pdq);pdm.classList.remove('open')}});
  grid.addEventListener('click',e=>{const v=e.target.closest('[data-view]');if(v&&!e.target.closest('[data-id]'))return openPD(P.find(x=>x.id==v.dataset.view));
    const b=e.target.closest('[data-id]');if(!b)return;const p=P.find(x=>x.id==b.dataset.id);
    const f=cart.find(c=>c.id===p.id);f?f.q++:cart.push({id:p.id,n:p.n,p:p.p,img:p.img,q:1});saveCart();toast('Added: '+p.n)});
  $('#q').addEventListener('input',e=>{q=e.target.value.toLowerCase();draw()});
  $('#sort').addEventListener('change',e=>{sort=e.target.value;draw()});
  $$('.side button').forEach(b=>b.addEventListener('click',()=>{
    const k=b.dataset.c!==undefined?'c':b.dataset.t!==undefined?'t':b.dataset.pr!==undefined?'pr':'x';
    if(k==='x'){cat=ty=pr='all';$$('.side button').forEach(x=>x.classList.toggle('on',x.dataset.c==='all'||x.dataset.t==='all'||x.dataset.pr==='all'))}
    else{$$('.side button').filter(x=>x.dataset[k]!==undefined).forEach(x=>x.classList.remove('on'));b.classList.add('on');const v=b.dataset[k];if(k==='c')cat=v;if(k==='t')ty=v;if(k==='pr')pr=v}
    draw()}));
  const sg=$('#sug'),qi=$('#q'),KW=['Floral','Cupcakes','Birthday','Heart','Round','Gift box','Bouquet'];
  const sugDraw=()=>{const v=qi.value.trim().toLowerCase();let h='';
    if(!v)h='<small>Popular searches</small><div class="kw">'+KW.map(k=>`<button type="button" data-k="${k}">${k}</button>`).join('')+'</div>';
    else{const kk=KW.filter(k=>k.toLowerCase().includes(v)),pp=P.filter(p=>(p.n+' '+(p.k||'')).toLowerCase().includes(v));
      if(kk.length)h+='<small>Keywords</small><div class="kw">'+kk.map(k=>`<button type="button" data-k="${k}">${k}</button>`).join('')+'</div>';
      h+=pp.length?'<small>Products</small>'+pp.map(p=>`<button type="button" class="pi" data-k="${p.n}"><img src="${IMG[p.img]}" alt="">${p.n}<b>${money(p.p)}</b></button>`).join(''):'<small>No matches — try “floral” or “birthday”</small>'}
    sg.innerHTML=h;sg.classList.add('open')};
  qi.addEventListener('focus',sugDraw);qi.addEventListener('click',sugDraw);qi.addEventListener('input',sugDraw);
  sg.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(!b)return;qi.value=b.dataset.k;q=qi.value.toLowerCase();draw();sg.classList.remove('open')});
  document.addEventListener('click',e=>{if(!e.target.closest('.sw'))sg.classList.remove('open')});
  qi.addEventListener('keydown',e=>{if(e.key==='Escape'||e.key==='Enter')sg.classList.remove('open')});
  draw();
}

/* forms */
$$('form[data-mail]').forEach(form=>{
  form.addEventListener('submit',e=>{
    e.preventDefault();let bad=null;
    $$('.f[data-req]',form).forEach(f=>{
      const ins=$$('input,select,textarea',f);let ok;
      if(ins[0].type==='radio'||ins[0].type==='checkbox')ok=ins.some(i=>i.checked);
      else{ok=ins[0].value.trim()!=='';if(ok&&ins[0].type==='email')ok=/^\S+@\S+\.\S+$/.test(ins[0].value)}
      f.classList.toggle('err',!ok);if(!ok&&!bad)bad=f});
    if(bad)return bad.scrollIntoView({behavior:'smooth',block:'center'});
    const lines=$$('.f',form).map(f=>{const lab=(f.querySelector('label,.lbl')?.childNodes[0]?.textContent||'').trim();
      const ins=$$('input,select,textarea',f);let v;
      if(ins[0].type==='radio')v=ins.find(i=>i.checked)?.value||'';else if(ins[0].type==='checkbox')return null;else v=ins[0].value;
      return lab+': '+v}).filter(Boolean).join('\n');
    form.style.display='none';const ok=$('.ok',form.parentElement);ok.style.display='block';ok.scrollIntoView({behavior:'smooth',block:'center'});
    $('.mailbtn',ok).href='mailto:jessica@cakelush.com?subject='+encodeURIComponent(form.dataset.mail)+'&body='+encodeURIComponent(lines);
  });
  $$('input,select,textarea',form).forEach(i=>i.addEventListener('input',()=>i.closest('.f')?.classList.remove('err')));
});
/* quote form: show flavors after cake type chosen */
const rf=$$('input[name="rfr"]');const fl=$('#flavorBox');
if(fl){fl.style.opacity='.35';fl.style.pointerEvents='none';rf.forEach(r=>r.addEventListener('change',()=>{fl.style.opacity=1;fl.style.pointerEvents='auto'}))}
/* min date for event inputs */
$$('input[data-future]').forEach(i=>i.min=new Date().toISOString().split('T')[0]);
})();




(function(){
const BOOKS={"bespoke": {"t": "Lush Bespoke", "s": "Custom High-Fashion Weddings", "l": "Wedding", "i": ["gallery/cake-03.jpg", "gallery/cake-09.jpg", "gallery/cake-10.jpg", "gallery/cake-11.jpg", "gallery/cake-12.jpg", "gallery/cake-13.jpg", "gallery/cake-20.jpg", "gallery/cake-24.jpg", "gallery/cake-25.jpg"]}, "daily": {"t": "Lush Daily", "s": "Ready-to-Order Signature Cakes", "l": "Celebration", "i": ["gallery/cake-01.jpg", "gallery/cake-02.jpg", "gallery/cake-04.jpg", "gallery/cake-05.jpg", "gallery/cake-06.jpg", "gallery/cake-07.jpg", "gallery/cake-08.jpg", "gallery/cake-14.jpg", "gallery/cake-15.jpg"]}};
let muted=false;try{muted=localStorage.getItem('cl-mute')==='1'}catch(e){}
let ac;function flip(){if(muted)return;try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();const d=ac.currentTime,len=.5,sr=ac.sampleRate,b=ac.createBuffer(1,sr*len,sr),a=b.getChannelData(0);
 for(let i=0;i<a.length;i++){const x=i/a.length;a[i]=(Math.random()*2-1)*Math.pow(1-x,2.4)*Math.min(1,x*9)}
 const s=ac.createBufferSource();s.buffer=b;const f=ac.createBiquadFilter();f.type='bandpass';f.frequency.setValueAtTime(800,d);f.frequency.exponentialRampToValueAtTime(4800,d+len);f.Q.value=.7;
 const g=ac.createGain();g.gain.value=.7;s.connect(f);f.connect(g);g.connect(ac.destination);s.start(d)}catch(e){}}
const ICON='<svg viewBox="0 0 24 24"><path d="M12 6C9.5 4.6 6.5 4.3 3 5v13c3.5-.7 6.5-.4 9 1 2.5-1.4 5.5-1.7 9-1V5c-3.500-.7-6.500-.4-9 1zM12 6v13"/></svg>';
const snd=()=>muted?'♪ Sound off':'♪ Sound on';
document.querySelectorAll('.mag-frame').forEach(fr=>{
 const B=BOOKS[fr.dataset.book],lg=IMG['logo.png'];
 const pages=[`<div class="pg dk"><img src="${lg}" alt=""><h4>${B.t}</h4><p>Lookbook · Vol. 01</p></div>`,
  `<div class="pg tx"><span class="eyebrow">Cake Lush</span><h4>${B.t}</h4><div class="title-line" style="margin-left:0"></div><p>${B.s}.</p><p>Curating edible architecture for every occasion. Turn the page to explore the collection.</p></div>`]
  .concat(B.i.map((k,i)=>`<div class="pg im"><img src="${IMG[k]}" alt="${B.t} cake ${i+1}"><div class="cap"><span>No. ${String(i+1).padStart(2,'0')}</span><span>${B.l}</span></div></div>`))
  .concat([`<div class="pg dk"><img src="${lg}" alt=""><h4>Cake Lush</h4><p>Edible Architecture · Miami, FL</p></div>`]);
 const L=pages.length/2;let cur=0,busy=0;
 fr.innerHTML=`<div class="mf-head"><span class="mf-ic">${ICON}</span><div><span class="eyebrow">Magazine</span><h3>${B.t} Lookbook</h3></div><button type="button" class="filters-btn btn ghost sm mf-snd">${snd()}</button></div>
 <div class="mf-stage" tabindex="0" aria-label="${B.t} lookbook magazine"><div class="book">${Array.from({length:L},(_,k)=>`<div class="leaf">${pages[2*k].replace('class="pg ','class="pg ft ')}${pages[2*k+1].replace('class="pg ','class="pg bk ')}</div>`).join('')}</div></div>
 <div class="mf-ctl"><button type="button" data-a="f" aria-label="First">«</button><button type="button" data-a="p" aria-label="Previous">‹</button><span class="mf-cnt"></span><button type="button" data-a="n" aria-label="Next">›</button><button type="button" data-a="l" aria-label="Last">»</button></div>`;
 const st=fr.querySelector('.mf-stage'),bk=fr.querySelector('.book'),lv=[...fr.querySelectorAll('.leaf')],cnt=fr.querySelector('.mf-cnt'),sb=fr.querySelector('.mf-snd');
 const z=()=>lv.forEach((l,k)=>l.style.zIndex=k<cur?k:L-k);
 function ui(){lv.forEach((l,k)=>l.classList.toggle('fl',k<cur));bk.style.setProperty('--tx',cur===0?'-210px':cur===L?'210px':'0px');
  cnt.textContent=cur===0?'Cover':cur===L?'Back cover':'Pages '+(2*cur)+' – '+(2*cur+1)+' of '+2*L;
  fr.querySelectorAll('[data-a=f],[data-a=p]').forEach(b=>b.disabled=cur===0);fr.querySelectorAll('[data-a=n],[data-a=l]').forEach(b=>b.disabled=cur===L)}
 function go(n){n=Math.max(0,Math.min(L,n));if(n===cur)return;const dir=n>cur?1:-1,first=dir>0?cur:n-0;
  cur=n;z();const mv=lv[dir>0?cur-1:cur];if(mv){mv.style.zIndex=L+2;mv.classList.add('turning');setTimeout(()=>mv.classList.remove('turning'),1300)}ui();flip();clearTimeout(busy);busy=setTimeout(z,1300)}
 const step=d=>go(cur+d);
 fr.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a;if(a==='n')step(1);if(a==='p')step(-1);if(a==='f')go(0);if(a==='l')go(L)});
 sb.addEventListener('click',()=>{muted=!muted;try{localStorage.setItem('cl-mute',muted?'1':'0')}catch(e){}document.querySelectorAll('.mf-snd').forEach(x=>x.textContent=snd());if(!muted)flip()});
 let x0=null;st.addEventListener('pointerdown',e=>x0=e.clientX);
 st.addEventListener('pointerup',e=>{if(x0===null)return;const dx=e.clientX-x0;x0=null;
  if(dx<-40)step(1);else if(dx>40)step(-1);else if(Math.abs(dx)<10){const r=st.getBoundingClientRect();step(e.clientX>r.left+r.width/2?1:-1)}});
 st.addEventListener('keydown',e=>{if(e.key==='ArrowRight')step(1);if(e.key==='ArrowLeft')step(-1)});
 const fit=()=>{const s=Math.min(1,st.clientWidth/880);if(!st.clientWidth)return;bk.style.setProperty('--s',s);st.style.height=Math.ceil(560*s+6)+'px'};
 new ResizeObserver(fit).observe(st);addEventListener('resize',fit);z();ui();
});
document.getElementById('themeBtn')?.addEventListener('click',()=>document.getElementById('themeBtn').setAttribute('aria-checked',document.documentElement.dataset.theme==='dark'));
document.getElementById('bespokeGo')?.addEventListener('click',()=>document.getElementById('bespoke-form').scrollIntoView({behavior:'smooth',block:'start'}));
})();

/* ===== Reviews, services filter, combo builder, chat ===== */
(function(){
const Q=(s,r=document)=>r.querySelector(s),QA=(s,r=document)=>[...r.querySelectorAll(s)];
const stars=n=>'<span class="stars" aria-label="'+n+' out of 5">'+'★'.repeat(n)+'<i>'+'★'.repeat(5-n)+'</i></span>';
const av=r=>r.photo?`<img class="av" src="${r.photo}" alt="${r.name}">`:`<span class="av">${r.name.trim()[0]}</span>`;
/* reviews */
const trk=Q('#rvTrack');
if(trk){const card=(r,i)=>`<button type="button" class="rv-card glass" data-i="${i}">${av(r)}<div class="rv-m"><b>${r.name}</b>${stars(r.rating)}</div><h4>${r.title||''}</h4><p>${r.text}</p><span class="rv-more">Read more</span></button>`;
 trk.innerHTML=REVIEWS.map(card).join('')+REVIEWS.map(card).join('');
 const m=Q('#rvModal');
 trk.addEventListener('click',e=>{const b=e.target.closest('.rv-card');if(!b)return;const r=REVIEWS[b.dataset.i];
  Q('#rvBody').innerHTML=`<div class="rv-top">${av(r)}<div><h3 style="font-size:1.5rem">${r.name}</h3>${stars(r.rating)}</div></div><h4 style="margin:18px 0 8px">${r.title||''}</h4><p style="margin:0">${r.text}</p>`;m.classList.add('open')});
 Q('#rvX').addEventListener('click',()=>m.classList.remove('open'));m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('open')})}
/* services nav + filter */
Q('#svcBtn')?.addEventListener('click',()=>{location.hash='#/services'});
QA('#svcF button').forEach(b=>b.addEventListener('click',()=>{QA('#svcF button').forEach(x=>x.classList.toggle('on',x===b));
 QA('#svcG .svc').forEach(c=>{const s=b.dataset.sf==='all'||c.dataset.s===b.dataset.sf;c.style.display=s?'':'none'})}));
/* combo builder */
const F=['Armaretto','Coconut','Banana','Carrot','Chocolate','Cookies & Cream','Lemon','Red Velvet','Marble'],I=['Guava','Pineapple','Strawberry','Lemon','Nutella','Dulce Leche'];
const cb=Q('#cbF');
if(cb){let f='',i='';const out=Q('#combo');
 const draw=()=>{QA('#cbF .chip-f').forEach(x=>x.classList.toggle('on',x.dataset.v===f));QA('#cbI .chip-f').forEach(x=>x.classList.toggle('on',x.dataset.v===i));
  const t=f&&i?f+' cake with '+i+' filling':f?f+' cake — now choose a filling':i?'Choose a flavor — with '+i+' filling':'Pick a flavor and filling';out.textContent=t;
  QA('#cbP .chip-f').forEach(x=>x.classList.toggle('on',x.dataset.f===f&&x.dataset.i===i))};
 Q('#cbF').innerHTML=F.map((x,n)=>`<button type="button" class="chip-f" data-v="${x}"><i>${String(n+1).padStart(2,'0')}</i><span>${x}</span></button>`).join('');Q('#cbI').innerHTML=I.map((x,n)=>`<button type="button" class="chip-f" data-v="${x}"><i>${String(n+1).padStart(2,'0')}</i><span>${x}</span></button>`).join('');
 Q('#cbR').addEventListener('click',()=>{f=i='';draw()});
 Q('#cbP').innerHTML=[['Chocolate','Nutella'],['Red Velvet','Dulce Leche'],['Lemon','Strawberry'],['Coconut','Pineapple'],['Banana','Dulce Leche']].map(p=>`<button type="button" class="chip-f" data-f="${p[0]}" data-i="${p[1]}">${p[0]} + ${p[1]}</button>`).join('');
 Q('#cbF').addEventListener('click',e=>{const b=e.target.closest('[data-v]');if(b){f=b.dataset.v;draw()}});Q('#cbI').addEventListener('click',e=>{const b=e.target.closest('[data-v]');if(b){i=b.dataset.v;draw()}});
 Q('#cbP').addEventListener('click',e=>{const b=e.target.closest('[data-f]');if(b){f=b.dataset.f;i=b.dataset.i;draw()}});
 Q('#cbQ').addEventListener('click',()=>{if(f&&i)try{sessionStorage.setItem('cl-combo',f+' cake with '+i+' filling')}catch(e){}});draw()}
/* chat */
const ch=Q('#chat');
if(ch){const msgs=Q('#chMsgs'),inp=Q('#chI');let started=false,mapDone=false;
 const open=v=>{ch.classList.toggle('open',v);Q('#chatBtn').classList.toggle('hide',v);if(v&&!started){started=true;bot(BOT[0])}if(v)setTimeout(()=>inp.focus(),300)};
 const add=(cls,html)=>{const d=document.createElement('div');d.className='m '+cls;d.innerHTML=html;msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight;return d};
 const bot=r=>{const t=add('bot typing','<i></i><i></i><i></i>');setTimeout(()=>{t.remove();const a=typeof r.a==='function'?r.a():r.a;let h=a;
   if(r.c)h+='<div class="qr">'+r.c.map(x=>`<button type="button">${x}</button>`).join('')+'</div>';add('bot',h)},550)};
 const ask=q=>{q=q.trim();if(!q)return;QA('.qr',msgs).forEach(x=>x.remove());const u=add('user','');u.textContent=q;
  const hit=BOT.slice(1).find(r=>new RegExp(r.k,'i').test(q))||(new RegExp(BOT[0].k,'i').test(q)?BOT[0]:null);bot(hit||BOT_FALLBACK)};
 Q('#chatBtn').addEventListener('click',()=>open(true));Q('#chX').addEventListener('click',()=>open(false));
 Q('#chF').addEventListener('submit',e=>{e.preventDefault();ask(inp.value);inp.value=''});
 msgs.addEventListener('click',e=>{const b=e.target.closest('.qr button');if(b)ask(b.textContent)});
 Q('#chClear').addEventListener('click',()=>{msgs.innerHTML='';started=true;bot(BOT[0])});
 const tab=t=>{QA('.ch-tabs button').forEach(b=>b.classList.toggle('on',b.dataset.t===t));QA('.ch-p').forEach(p=>p.classList.toggle('on',p.dataset.p===t));Q('#chF').style.display=t==='chat'?'':'none';
  if(t==='map'&&!mapDone){mapDone=true;Q('#chMap').innerHTML=`<iframe title="Map" loading="lazy" src="https://www.google.com/maps?q=${encodeURIComponent(CONFIG.mapQuery)}&output=embed"></iframe><a class="btn sm" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.mapQuery)}">Open in Google Maps</a>`}};
 QA('.ch-tabs button').forEach(b=>b.addEventListener('click',()=>tab(b.dataset.t)));
 Q('#chHelp').innerHTML='<p class="muted" style="margin:0 0 12px">Tap a topic to ask:</p>'+['View menu','Prices','How to order','Delivery','48 hours notice','Flavors','Wedding cakes','Get a quote','Payment','Coupon code','Allergies','Contact'].map(x=>`<button type="button" class="hp">${x}</button>`).join('');
 Q('#chHelp').addEventListener('click',e=>{const b=e.target.closest('.hp');if(b){tab('chat');ask(b.textContent)}});
 Q('#chFaq').innerHTML=FAQS.map(f=>`<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('');
 Q('#chContact').innerHTML=`<a class="ct" href="tel:${CONFIG.phone}"><b>Call us</b><span>${CONFIG.phone}</span></a><a class="ct" href="mailto:${CONFIG.email}"><b>Email us</b><span>${CONFIG.email}</span></a><a class="ct" href="#/inquiries"><b>Send an inquiry</b><span>Weddings &amp; custom events</span></a><a class="ct" target="_blank" rel="noopener" href="${CONFIG.social.daily}"><b>Instagram · Lush Daily</b><span>Ready-to-order cakes</span></a><a class="ct" target="_blank" rel="noopener" href="${CONFIG.social.bespoke}"><b>Instagram · Lush Bespoke</b><span>Custom weddings</span></a>`;
 Q('#chContact').addEventListener('click',e=>{if(e.target.closest('a[href^="#/"]'))open(false)});
 msgs.addEventListener('click',e=>{if(e.target.closest('a[href^="#/"]'))open(false)})}
})();

/* ===== European-style calendar (all date fields) ===== */
(function(){
const MO=['January','February','March','April','May','June','July','August','September','October','November','December'],DW=['Mo','Tu','We','Th','Fr','Sa','Su'];
const pop=document.createElement('div');pop.className='cal';pop.hidden=true;document.body.appendChild(pop);
const day=d=>new Date(d.getFullYear(),d.getMonth(),d.getDate());let inp=null,view=null,sel=null;
const min=()=>day(new Date(Date.now()+2*864e5)); /* 48 hours' notice */
const fmtD=d=>d.getDate()+' '+MO[d.getMonth()].slice(0,3)+' '+d.getFullYear();
function draw(){const y=view.getFullYear(),m=view.getMonth(),first=(new Date(y,m,1).getDay()+6)%7,n=new Date(y,m+1,0).getDate(),mn=min();let h=`<div class="cal-h"><button type="button" data-n="-1" aria-label="Previous month">‹</button><b>${MO[m]} ${y}</b><button type="button" data-n="1" aria-label="Next month">›</button></div><div class="cal-w">${DW.map(x=>`<span>${x}</span>`).join('')}</div><div class="cal-g">`;
  for(let i=0;i<first;i++)h+='<i></i>';
  for(let d=1;d<=n;d++){const dt=new Date(y,m,d),off=dt<mn,on=sel&&+sel===+dt;h+=`<button type="button" class="${on?'on':''}" data-d="${d}" ${off?'disabled':''}>${d}</button>`}
  pop.innerHTML=h+`</div><p class="cal-f">Minimum 48 hours’ advance notice</p>`}
function place(){const r=inp.getBoundingClientRect(),w=Math.min(320,innerWidth-20);pop.style.width=w+'px';pop.style.left=Math.max(10,Math.min(r.left,innerWidth-w-10))+'px';const below=innerHeight-r.bottom>360;pop.style.top=(below?r.bottom+8:Math.max(10,r.top-368))+'px'}
function open(i){inp=i;sel=i.dataset.iso?day(new Date(i.dataset.iso)):null;view=sel?new Date(sel):new Date(min());view.setDate(1);draw();pop.hidden=false;place()}
const close=()=>{pop.hidden=true};
document.querySelectorAll('input[type=date]').forEach(i=>{i.type='text';i.readOnly=true;i.placeholder='Select a date';i.classList.add('cal-in');i.autocomplete='off';
  i.addEventListener('click',()=>open(i));i.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(i)}})});
pop.addEventListener('click',e=>{const n=e.target.closest('[data-n]'),d=e.target.closest('[data-d]');
  if(n){view.setMonth(view.getMonth()+ +n.dataset.n);draw()}
  if(d&&!d.disabled){const dt=new Date(view.getFullYear(),view.getMonth(),+d.dataset.d);inp.value=fmtD(dt);inp.dataset.iso=dt.toISOString();inp.dispatchEvent(new Event('input',{bubbles:true}));close()}});
document.addEventListener('click',e=>{if(!pop.hidden&&!e.target.closest('.cal')&&!e.target.classList.contains('cal-in'))close()});
addEventListener('keydown',e=>{if(e.key==='Escape')close()});addEventListener('resize',close);document.addEventListener('scroll',()=>{if(!pop.hidden)place()},true);
})();

/* ===== router (single-file multi-page) ===== */
(function(){
const pages=[...document.querySelectorAll('.page')];
function go(){
  let h=(location.hash||'#/index').replace('#/','');const sec=h.split('?')[0];
  let pg=pages.find(p=>p.dataset.page===sec)||pages[0];
  pages.forEach(p=>p.hidden=p!==pg);
  document.title=pg.dataset.title;
  document.querySelectorAll('a[href^="#/"]').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#/'+pg.dataset.page&&!a.closest('.page')&&!a.closest('.ftr')));
  const m=document.querySelector('.mm');if(m){m.classList.remove('open');document.body.style.overflow=''}
  document.querySelector('.drawer')?.classList.remove('open');document.querySelector('.dim')?.classList.remove('open');
  document.querySelector('.lb')?.classList.remove('open');
  scrollTo(0,0);window.dispatchEvent(new Event('scroll'));
}
addEventListener('hashchange',go);go();
})();
