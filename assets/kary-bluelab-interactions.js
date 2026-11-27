/* KARY STORE visual interactions — motion only; commerce/auth/backend logic stays in index.html. */
(function(){
 'use strict';
 const $=id=>document.getElementById(id);
 const addHeroControls=()=>{
  const copy=document.querySelector('.hero-copy');
  if(!copy||copy.querySelector('.hero-actions'))return;
  const actions=document.createElement('div');actions.className='hero-actions';
  actions.innerHTML='<a class="hero-primary" href="#catalog">Открыть каталог <span>↗</span></a><button class="hero-secondary" id="heroSupport" type="button">Задать вопрос</button>';
  copy.appendChild(actions);
  const proof=document.createElement('div');proof.className='hero-proof';
  proof.innerHTML='<span>✦ Цифровые решения</span><span>↗ Поддержка рядом</span>';
  copy.appendChild(proof);
  const support=$('heroSupport');
  if(support)support.addEventListener('click',()=>{const button=$('navSupport');if(button)button.click()});
 };
 const reveal=()=>{
  const items=document.querySelectorAll('.product,.benefit,.sale-card,.showreel-section,.lab-experience,.trust-card,.faq-list details');
  if(!('IntersectionObserver'in window)){items.forEach(x=>x.classList.add('kary-visible'));return}
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){items.forEach(x=>x.classList.add('kary-visible'));return}
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.classList.add('kary-visible');observer.unobserve(entry.target)}
  }),{threshold:.08,rootMargin:'0px 0px -24px 0px'});
  items.forEach(x=>{
   if(!x.classList.contains('kary-reveal')&&!x.classList.contains('kary-visible'))x.classList.add('kary-reveal');
   if(!x.classList.contains('kary-visible'))observer.observe(x);
  });
 };
 const pointerGlow=()=>{
  if(!window.matchMedia('(hover: hover) and (pointer: fine)').matches)return;
  document.addEventListener('pointermove',event=>{
   const card=event.target.closest('.product');
   if(!card)return;
   const rect=card.getBoundingClientRect();
   card.style.setProperty('--pointer-x',Math.round(event.clientX-rect.left)+'px');
   card.style.setProperty('--pointer-y',Math.round(event.clientY-rect.top)+'px');
  },{passive:true});
 };
 const scrollState=()=>{
  let ticking=false;
  const update=()=>{
   document.body.classList.toggle('kary-scrolled',window.scrollY>16);
   ticking=false;
  };
  window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true}},{passive:true});
  update();
 };
 const init=()=>{
  addHeroControls();reveal();pointerGlow();scrollState();
  const products=$('products');
  if(products){
   const observer=new MutationObserver(()=>reveal());
   observer.observe(products,{childList:true,subtree:true});
  }
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();