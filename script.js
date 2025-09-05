// フェードイン＋スクロール連動アニメーション
const faders = document.querySelectorAll('.fade');
const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));

// 背景パーティクル
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let stars = [];
function initStars(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = [];
  for(let i=0;i<250;i++){
    stars.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*2,dx:(Math.random()-0.5)*0.7,dy:(Math.random()-0.5)*0.7,opacity:Math.random()});
  }
}
function drawStars(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let s of stars){
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(255,255,255,${s.opacity})`;
    ctx.fill();
    s.x+=s.dx; s.y+=s.dy; s.opacity+=Math.random()*0.02-0.01;
    if(s.opacity>1)s.opacity=1; if(s.opacity<0)s.opacity=0;
    if(s.x<0)s.x=canvas.width;if(s.x>canvas.width)s.x=0;
    if(s.y<0)s.y=canvas.height;if(s.y>canvas.height)s.y=0;
  }
  requestAnimationFrame(drawStars);
}
window.addEventListener('resize',initStars);
initStars(); drawStars();

// Valorantスキルアニメーション
const skillTexts=document.querySelectorAll('.skill-text');
window.addEventListener('scroll',()=>{
  skillTexts.forEach(st=>{
    const rect=st.getBoundingClientRect();
    if(rect.top<window.innerHeight*0.8){
      st.style.opacity=1;
      st.style.transform='translateX(0)';
    }
  });
});

// セクション背景スクロール連動
const sections=document.querySelectorAll('section');
window.addEventListener('scroll',()=>{
  const scrollPos = window.scrollY + window.innerHeight/2;
  sections.forEach(sec=>{
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    if(scrollPos>=top && scrollPos<=top+height){
      let color1='#0e0f14', color2='#1a1c2b';
      if(sec.id==='about'){color1='#0e0f14'; color2='#1a1c2b';}
      if(sec.id==='minecraft'){color1='#071a0a'; color2='#0d2b1d';}
      if(sec.id==='valorant'){color1='#1a0e0f'; color2='#2b1011';}
      if(sec.id==='skills'){color1='#0e101a'; color2='#1b1c2d';}
      if(sec.id==='youtube'){color1='#10100e'; color2='#2d2b1b';}
      if(sec.id==='activity'){color1='#0e1414'; color2='#1a2b2b';}
      if(sec.id==='goals'){color1='#140e14'; color2='#2b1a2b';}
      if(sec.id==='contact'){color1='#0e1010'; color2='#1b1d1d';}
      document.body.style.background=`linear-gradient(135deg,${color1},${color2})`;
    }
  });
});

// 見出し光るラインスクロール
const headers=document.querySelectorAll('h2');
window.addEventListener('scroll',()=>{
  headers.forEach(h=>{
    const rect=h.getBoundingClientRect();
    if(rect.top<window.innerHeight*0.8){
      h.style.textShadow='0 0 20px #4ac9ff,0 0 30px #50e3c2,0 0 40px #ff6ec7';
    } else {
      h.style.textShadow='0 0 5px #4ac9ff,0 0 10px #50e3c2';
    }
  });
});

// 活動・目標ブロック文字アニメーション
const extraSections=document.querySelectorAll('#activity,#goals');
extraSections.forEach(section=>{
  const items=section.querySelectorAll('p,li,h2,h3');
  items.forEach((item,i)=>{
    item.style.opacity=0;
    item.style.transform='translateY(40px)';
    item.style.transition=`all 0.7s ease ${i*0.15}s`;
  });
  window.addEventListener('scroll',()=>{
    items.forEach(item=>{
      const rect=item.getBoundingClientRect();
      if(rect.top<window.innerHeight*0.85){
        item.style.opacity=1;
        item.style.transform='translateY(0)';
      }
    });
  });
});
