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
  proof.innerHTML='<span><i></i> Каталог онлайн</span><span>✦ Цифровые решения</span><span>↗ Поддержка рядом</span>';
  copy.appendChild(proof);
  const support=$('heroSupport');if(support)support.addEventListener('click',()=>{const button=$('navSupport');if(button)button.click()});
 };
 const addLabSection=()=>{
  if($('karyLab'))return;
  const hero=document.querySelector('.hero');
  if(!hero)return;
  const section=document.createElement('section');section.className='lab-experience';section.id='karyLab';
  section.innerHTML='<div class="lab-topline"><div><span class="eyebrow">KARY DIGITAL LAB</span><h2>Найди решение под свою задачу</h2><p>Выбирай направление и переходи к подходящим предложениям</p></div><span class="lab-counter" id="labProductCounter">Загружаем каталог</span></div><div class="lab-body"><div class="lab-core" aria-hidden="true"><div class="lab-core-ring"></div><div class="lab-core-orb"></div></div><div class="lab-categories" id="labQuickCategories"><button class="lab-category" type="button" data-lab-all="1"><b>Все предложения</b><small>Посмотреть полный каталог</small></button></div></div>';
  hero.insertAdjacentElement('afterend',section);
  const quick=$('labQuickCategories');
  quick.addEventListener('click',e=>{
   const button=e.target.closest('[data-lab-category],[data-lab-all]');
   if(!button)return;
   if(button.hasAttribute('data-lab-all')){const all=document.querySelector('#categories [data-category="all"]');if(all)all.click()}
   else{const target=document.querySelector('#categories [data-category="'+CSS.escape(button.dataset.labCategory)+'"]');if(target)target.click()}
   $('catalog')?.scrollIntoView({behavior:'smooth',block:'start'});
  });
 };
 const syncLab=()=>{
  const source=$('categories'),target=$('labQuickCategories');
  if(!source||!target)return;
  const buttons=[...source.querySelectorAll('[data-category]')].filter(b=>b.dataset.category!=='all');
  const all='<button class="lab-category" type="button" data-lab-all="1"><b>Все предложения</b><small>Посмотреть полный каталог</small></button>';
  const cards=buttons.slice(0,5).map(b=>'<button class="lab-category" type="button" data-lab-category="'+String(b.dataset.category).replace(/&/g,'&amp;').replace(/"/g,'&quot;')+'"><b>'+b.textContent.replace(/[<>&"]/g,'').trim()+'</b><small>Открыть направление</small></button>').join('');
  target.innerHTML=all+cards;
  const count=$('productCount')?.textContent||'Каталог';
  const counter=$('labProductCounter');if(counter)counter.textContent=count;
 };
 const reveal=()=>{
  const items=document.querySelectorAll('.product,.benefit,.sale-card,.showreel-section');
  if(!('IntersectionObserver'in window)){items.forEach(x=>x.classList.add('kary-visible'));return}
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('kary-visible');observer.unobserve(entry.target)}}),{threshold:.08});
  items.forEach(x=>{if(!x.classList.contains('kary-visible'))observer.observe(x)});
 };
 const init=()=>{
  addHeroControls();addLabSection();syncLab();reveal();
  const cats=$('categories'),products=$('products'),count=$('productCount');
  const observer=new MutationObserver(()=>{syncLab();reveal()});
  [cats,products,count].filter(Boolean).forEach(el=>observer.observe(el,{childList:true,subtree:true,characterData:true}));
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();