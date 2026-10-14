/* ESA 321 COURSE ACCESS CONTROL
   Edit ONLY the true/false values below as topics are released.
   This is a teaching progression lock for a static GitHub Pages site,
   not password-grade security. */
const ESA321_ACCESS = {
  bar: true,
  truss2d: true,
  beam2d: true,
  frame2d: true,
  cst: false,
  truss3d: true,
  beam3d: false
};

(() => {
  const modules = [
    ['bar','1D Bar','bar.html'],
    ['truss2d','2D Truss','truss2d.html'],
    ['beam2d','2D Beam','beam2d.html'],
    ['frame2d','2D Frame','frame2d.html'],
    ['cst','CST','cst.html'],
    ['truss3d','3D Truss','truss3d.html'],
    ['beam3d','3D Beam','beam3d.html']
  ];
  const fileToKey = Object.fromEntries(modules.map(m => [m[2], m[0]]));
  const releasedCount = modules.filter(m => ESA321_ACCESS[m[0]]).length;

  const css = document.createElement('style');
  css.textContent = `
    .esa-lock-badge{display:inline-flex;align-items:center;gap:6px;padding:6px 10px;border-radius:999px;background:#eef2f6;color:#52606d;font:700 12px Arial,sans-serif;border:1px solid #d5dde7;margin-top:8px}
    .module-card.esa-locked{opacity:.72;cursor:not-allowed;position:relative;filter:saturate(.55)}
    .module-card.esa-locked:hover{transform:none!important;box-shadow:0 5px 18px rgba(15,39,71,.06)!important;border-color:#d7dde6!important}
    .module-card.esa-locked .fem-pic{transform:none!important}
    .module-card.esa-locked:after{content:'🔒 NOT YET RELEASED';position:absolute;right:14px;top:14px;background:#fff;color:#52606d;border:1px solid #cfd8e3;border-radius:999px;padding:6px 9px;font:700 11px Arial,sans-serif;letter-spacing:.03em}
    .fem-site-nav a.esa-locked-link{opacity:.48;cursor:not-allowed;text-decoration:none}
    .esa-progress{max-width:780px;margin:0 auto 24px;background:#fff;border:1px solid #d7e0eb;border-radius:12px;padding:16px 18px;box-shadow:0 4px 14px rgba(15,39,71,.06);font-family:Arial,sans-serif}
    .esa-progress-row{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-bottom:9px;color:#17365d;font-weight:700}
    .esa-progress-track{height:10px;border-radius:999px;background:#e6ebf1;overflow:hidden}
    .esa-progress-fill{height:100%;background:#2f75b5;border-radius:999px;transition:width .25s ease}
    .esa-progress-dots{margin-top:10px;display:flex;gap:7px;flex-wrap:wrap}.esa-dot{width:11px;height:11px;border-radius:50%;background:#d4dbe4}.esa-dot.on{background:#2f75b5}
    .esa-lock-page{max-width:760px;margin:46px auto;padding:34px 28px;text-align:center;background:#fff;border:1px solid #d7e0eb;border-radius:16px;box-shadow:0 12px 32px rgba(15,39,71,.10);font-family:Arial,sans-serif}
    .esa-lock-icon{font-size:44px}.esa-lock-page h2{color:#17365d;font-size:28px;margin:10px 0}.esa-lock-page p{color:#667085;line-height:1.65}.esa-lock-page a{display:inline-block;margin-top:10px;padding:11px 16px;border-radius:8px;background:#17365d;color:#fff;text-decoration:none;font-weight:700}
    @media(max-width:620px){.esa-progress-row{align-items:flex-start;flex-direction:column}.module-card.esa-locked:after{font-size:9px}}
  `;
  document.head.appendChild(css);

  function lockNavigation(){
    document.querySelectorAll('a[href]').forEach(a => {
      const href = (a.getAttribute('href') || '').split('#')[0].split('?')[0];
      const key = fileToKey[href];
      if(key && !ESA321_ACCESS[key]){
        a.classList.add('esa-locked-link');
        if(a.classList.contains('module-card')) a.classList.add('esa-locked');
        a.setAttribute('aria-disabled','true');
        a.setAttribute('title','This ESA 321 module has not been released yet.');
        a.addEventListener('click', e => {
          e.preventDefault();
          if(a.classList.contains('module-card')){
            const old = a.querySelector('.esa-lock-badge');
            if(!old){
              const b=document.createElement('div'); b.className='esa-lock-badge'; b.textContent='🔒 This topic has not been released yet.'; a.appendChild(b);
            }
          }
        });
      }
    });
    document.querySelectorAll('select.fem-quick-select option').forEach(opt => {
      const href=(opt.value||'').split('?')[0]; const key=fileToKey[href];
      if(key && !ESA321_ACCESS[key]){ opt.disabled=true; if(!opt.textContent.includes('🔒')) opt.textContent += ' 🔒'; }
    });
  }

  function addProgress(){
    if(!/index\.html$/.test(location.pathname) && location.pathname.split('/').pop()!=='') return;
    const main=document.querySelector('main'); if(!main) return;
    const intro=main.querySelector('.intro');
    const box=document.createElement('section'); box.className='esa-progress'; box.setAttribute('aria-label','Course module progress');
    const pct=(releasedCount/modules.length)*100;
    box.innerHTML=`<div class="esa-progress-row"><span>Course Progress</span><span>${releasedCount} of ${modules.length} modules released</span></div><div class="esa-progress-track"><div class="esa-progress-fill" style="width:${pct}%"></div></div><div class="esa-progress-dots">${modules.map(m=>`<span class="esa-dot ${ESA321_ACCESS[m[0]]?'on':''}" title="${m[1]}: ${ESA321_ACCESS[m[0]]?'Available':'Not yet released'}"></span>`).join('')}</div>`;
    if(intro) intro.insertAdjacentElement('afterend',box); else main.prepend(box);
  }

  function protectDirectPage(){
    const file=location.pathname.split('/').pop() || 'index.html'; const key=fileToKey[file];
    if(!key || ESA321_ACCESS[key]) return;
    const label=(modules.find(m=>m[0]===key)||[])[1] || 'This module';
    const main=document.querySelector('main');
    if(main){
      main.innerHTML=`<section class="esa-lock-page"><div class="esa-lock-icon" aria-hidden="true">🔒</div><h2>${label} Module Not Yet Released</h2><p>This topic will become available after it has been covered in <strong>ESA 321 – Finite Element Method</strong>.</p><p>Please continue with the currently released learning modules.</p><a href="index.html">Return to ESA 321 Home</a></section>`;
    }
    document.title=`${label} – Not Yet Released | ESA 321`;
  }

  document.addEventListener('DOMContentLoaded',()=>{ lockNavigation(); addProgress(); protectDirectPage(); });
})();
