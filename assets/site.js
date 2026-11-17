(function(){
  var WA='254798583258';
  var nav=document.getElementById('nav'),bar=document.getElementById('mbar');
  function sc(){var y=scrollY;nav.classList.toggle('solid',y>40);if(bar)bar.classList.toggle('show',y>innerHeight*.5)}
  addEventListener('scroll',sc,{passive:true});sc();

  // mobile menu
  var mb=document.getElementById('menuBtn'),mn=document.getElementById('mnav'),mc=document.getElementById('menuClose');
  function menu(open){mn.hidden=!open;mb.setAttribute('aria-expanded',open);document.body.style.overflow=open?'hidden':''; if(open)mc.focus()}
  if(mb){mb.addEventListener('click',function(){menu(true)});mc.addEventListener('click',function(){menu(false)});
    addEventListener('keydown',function(e){if(e.key==='Escape'&&!mn.hidden)menu(false)});}

  // videos
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function load(v){if(v.dataset.loaded)return;v.querySelectorAll('source[data-src]').forEach(function(s){s.src=s.dataset.src});v.dataset.loaded=1;v.load()}
  function play(v){if(reduce)return;var p=v.play();if(p&&p.catch)p.catch(function(){})}
  document.querySelectorAll('video[data-eager]').forEach(function(v){if(reduce){v.removeAttribute('autoplay');v.pause()}else play(v)});
  var vids=[].slice.call(document.querySelectorAll('video:not([data-eager])'));
  var rv=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var vo=new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;if(e.isIntersecting){load(v);play(v)}else{v.pause()}})},{rootMargin:'200px 0px'});
    vids.forEach(function(v){vo.observe(v)});
    var ro=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target)}})},{threshold:.12});
    rv.forEach(function(el){ro.observe(el)});
  }else{vids.forEach(function(v){load(v);play(v)});rv.forEach(function(el){el.classList.add('in')})}

  var sh=document.getElementById('share');if(sh)sh.href+=encodeURIComponent(location.origin+'/');
  var yr=document.getElementById('yr');if(yr)yr.textContent=new Date().getFullYear();
  var ol=document.getElementById('openline');
  if(ol){try{var h=+new Intl.DateTimeFormat('en-GB',{hour:'numeric',hour12:false,timeZone:'Africa/Nairobi'}).format(new Date());ol.textContent=(h>=6&&h<21)?'Open now · until 9 PM':'Closed now · opens 6 AM';}catch(e){}}

  // WhatsApp message builder
  var f=document.getElementById('waForm');
  if(f){
    var $=function(id){return document.getElementById(id)};
    var name=$('wName'),prog=$('wProg'),who=$('wWho'),day=$('wDay'),msg=$('wMsg'),prev=$('wPrev');
    function compose(){
      var lines=['Hi ACK Aqua Hub!'];
      if(name.value.trim())lines.push('My name is '+name.value.trim()+'.');
      if(prog.value)lines.push('I\'m interested in: '+prog.value+'.');
      if(who.value)lines.push('Who is swimming: '+who.value+'.');
      if(day.value)lines.push('Preferred day: '+day.value+'.');
      var m=msg.value.trim();
      lines.push(m||'I\'d like to book a swim session.');
      return lines.join('\n');
    }
    function upd(){prev.textContent=compose()}
    [name,prog,who,day,msg].forEach(function(el){el.addEventListener('input',upd);el.addEventListener('change',upd)});
    f.querySelectorAll('.chip').forEach(function(c){c.addEventListener('click',function(){
      f.querySelectorAll('.chip').forEach(function(x){x.setAttribute('aria-pressed','false')});
      c.setAttribute('aria-pressed','true');msg.value=c.dataset.t;upd();msg.focus();
    })});
    f.addEventListener('submit',function(e){e.preventDefault();
      window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(compose()),'_blank','noopener');});
    upd();
  }
})();
