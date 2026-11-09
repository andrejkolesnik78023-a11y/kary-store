/* KARY STORE visual interactions — no backend calls, no changes to checkout/auth. */
(function(){
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
  const support=$('heroSupport');if(support)support.addEventListener('click',()=>{const button=$('navSupport');if(button)button.click()});
 };
 const reveal=()=>{
  const items=document.querySelectorAll('.product,.benefit,.sale-card,.showreel-section');
  if(!('IntersectionObserver'in window)){items.forEach(x=>x.classList.add('kary-visible'));return}
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('kary-visible');observer.unobserve(entry.target)}}),{threshold:.08});
  items.forEach(x=>{if(!x.classList.contains('kary-visible'))observer.observe(x)});
 };
 const init=()=>{
  addHeroControls();reveal();
  const products=$('products');
  if(products){const observer=new MutationObserver(reveal);observer.observe(products,{childList:true,subtree:true});}
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();