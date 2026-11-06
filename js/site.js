/* Yoga in the Grove: shared behavior for every page (header, menu, community dropdown,
   scroll reveal, join dialog + Formspree, photo lightbox). See CLAUDE.md section 3. */
(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* header: border + nav button once the page hero is scrolled past */
  var header=document.querySelector('.site-header'), hero=document.querySelector('.hero, .page-hero');
  function onScroll(){header.classList.toggle('scrolled', window.scrollY > (hero ? hero.offsetHeight - 80 : 40));}
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

  /* mobile menu */
  var btn=document.getElementById('menuBtn'), nav=document.getElementById('siteNav');
  function closeMenu(){nav.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.textContent='Menu';}
  btn.addEventListener('click',function(){var o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o);btn.textContent=o?'Close':'Menu';});
  nav.addEventListener('click',function(e){if(e.target.closest('a')&&nav.classList.contains('open'))closeMenu();});

  /* community dropdown */
  var dd=document.getElementById('ddCommunity');
  if(dd){
    var ddBtn=dd.querySelector('.dd-btn');
    var setDD=function(o){dd.classList.toggle('open',o);ddBtn.setAttribute('aria-expanded',o);};
    ddBtn.addEventListener('click',function(e){e.stopPropagation();setDD(!dd.classList.contains('open'));});
    document.addEventListener('click',function(e){if(!dd.contains(e.target))setDD(false);});
    dd.addEventListener('keydown',function(e){if(e.key==='Escape'){setDD(false);ddBtn.focus();}});
    dd.addEventListener('focusout',function(e){if(!dd.contains(e.relatedTarget))setDD(false);});
  }

  /* sections rise in on scroll */
  if('IntersectionObserver' in window && !reduce){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('rise');io.unobserve(e.target);}});},{rootMargin:'0px 0px -10% 0px'});
    document.querySelectorAll('.sec-head, .practice, .g, .tile, .people-grid > *, .food-grid > *, .visit-grid > *, .reveal').forEach(function(el){
      if(el.getBoundingClientRect().top > window.innerHeight) io.observe(el);
    });
  }

  /* Formspree forms: success message only after Formspree confirms.
     Only the live site really sends; any preview shows success without sending. */
  function wireForm(form, onDone, msg){
    form.addEventListener('submit',function(e){
      e.preventDefault(); msg.textContent='';
      var name=form.elements.name.value.trim(), email=form.elements.email.value.trim();
      if(!name){msg.textContent='Please add your name.'; form.elements.name.focus(); return;}
      if(!/^\S+@\S+\.\S+$/.test(email)){msg.textContent='Please add a valid email so we can reach you.'; form.elements.email.focus(); return;}
      if(form.elements.message && form.elements.message.required && !form.elements.message.value.trim()){msg.textContent='Please add a short message.'; form.elements.message.focus(); return;}
      var sendBtn=form.querySelector('[type=submit]'); sendBtn.disabled=true; sendBtn.firstChild.textContent='Sending… ';
      var finish=function(){sendBtn.disabled=false; sendBtn.firstChild.textContent='Send '; onDone();};
      if(!/yogainthegrove\.org$/.test(location.hostname)){ setTimeout(finish,600); return; }
      fetch(form.getAttribute('action'),{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}})
        .then(function(r){ if(r.ok){finish();} else { throw 0; } })
        .catch(function(){ sendBtn.disabled=false; sendBtn.firstChild.textContent='Send '; msg.innerHTML="That didn't go through. Please try again, or email us at <a href=\"mailto:marjazz2012@gmail.com\">marjazz2012@gmail.com</a>."; });
    });
  }

  /* join dialog */
  var dlg=document.getElementById('joinDialog');
  if(dlg){
    var jForm=document.getElementById('joinForm'), done=document.getElementById('joinDone');
    document.querySelectorAll('[data-open-join]').forEach(function(b){b.addEventListener('click',function(){
      if(nav.classList.contains('open'))closeMenu();
      if(dlg.showModal){dlg.showModal();}else{dlg.setAttribute('open','');}
      setTimeout(function(){document.getElementById('jf-name').focus();},50);
    });});
    document.querySelectorAll('[data-close-join]').forEach(function(b){b.addEventListener('click',function(){dlg.close();});});
    dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close();});
    dlg.addEventListener('close',function(){if(!done.hidden){jForm.reset();jForm.hidden=false;done.hidden=true;}});
    wireForm(jForm,function(){jForm.hidden=true;done.hidden=false;},document.getElementById('formMsg'));
  }

  /* any other form marked data-formspree (e.g. contact page) */
  document.querySelectorAll('form[data-formspree]').forEach(function(f){
    var ok=document.getElementById(f.dataset.done), m=f.querySelector('.form-msg');
    wireForm(f,function(){f.hidden=true; ok.hidden=false; ok.focus();},m);
  });

  /* photo lightbox */
  var lb=document.getElementById('lightbox');
  if(lb){
    var lbImg=document.getElementById('lbImg'), lbCap=document.getElementById('lbCap');
    document.querySelectorAll('.tile-open').forEach(function(t){t.addEventListener('click',function(){
      lbImg.src=t.dataset.full; lbImg.alt=t.querySelector('img').alt; lbCap.textContent=t.dataset.cap;
      if(lb.showModal){lb.showModal();}else{lb.setAttribute('open','');}
    });});
    lb.querySelector('.lb-close').addEventListener('click',function(){lb.close();});
    lb.addEventListener('click',function(e){if(e.target===lb)lb.close();});
  }

  /* click-to-load embeds (maps): <div class="embed" data-src="..."><button>…</button></div> */
  document.querySelectorAll('.embed [data-load]').forEach(function(b){b.addEventListener('click',function(){
    var box=b.closest('.embed'), f=document.createElement('iframe');
    f.src=box.dataset.src; f.title=box.dataset.title||''; f.loading='lazy'; f.referrerPolicy='no-referrer-when-downgrade'; f.allowFullscreen=true;
    box.innerHTML=''; box.appendChild(f); box.classList.add('loaded');
  });});
})();
