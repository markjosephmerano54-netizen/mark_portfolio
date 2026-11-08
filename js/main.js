/* ===== EDIT YOUR CONTENT HERE ===== */
const SITE = {
  email: "",       // e.g. "you@example.com" (empty until you have one)
  facebook: "",    // full URL
  github: "",      // full URL
  formEndpoint: "" // optional: Formspree / Web3Forms URL to send the form for real
};
const INFO = [["Name","Mark Joseph Merano"],["Course","BS Computer Science"],["School","City College of Calamba"],
  ["Year Level","3rd Year"],["Location","Philippines"],["Career Interest","Software and Web Development"]];
const SKILLS = [
  {group:"Frontend Development",items:[["code-xml","HTML","Structures web pages with semantic markup."],["palette","CSS","Styles and lays out responsive pages."]]},
  {group:"Programming",items:[["terminal","Dart","Used for building application logic."],["server","PHP","Used for server-side and backend development."]]},
  {group:"Database Management",items:[["database","MySQL","Stores and manages relational data."]]}
];
const PROJECTS = [
  {title:"Brew Haven",cat:"Coffee Brand Website",img:"assets/brew-haven/landing-page.jpg",tags:["HTML","CSS","JavaScript"],
   desc:"A coffee brand landing page designed to showcase products, promote the brand, and provide an engaging online experience through modern web design.",link:"",github:"",
   galleryLabel:"View designs",gallery:["assets/brew-haven/landing-page.jpg","assets/brew-haven/newsletter.jpg","assets/brew-haven/social-post.jpg"]},
  {title:"ForgeWorks",cat:"Brand Identity / Logo Design",img:"assets/forgeworks/horizontal.png",contain:true,tags:["Logo Design","Branding"],
   desc:"A logo and brand identity set for ForgeWorks (Auto · Metal · Plumbing · Forge), including badge, horizontal, vertical, and icon versions.",link:"",github:"",
   galleryLabel:"View logos",gallery:["assets/forgeworks/badge.png","assets/forgeworks/horizontal.png","assets/forgeworks/vertical.png","assets/forgeworks/icon.png"]}
];
// Real certificates: {title, org, date, img:"assets/certs/file.jpg"} (no placeholder flag)
const CERTS = [
  {title:"Certificate Title 1",org:"Issuing Organization",date:"Date",img:"",placeholder:true},
  {title:"Certificate Title 2",org:"Issuing Organization",date:"Date",img:"",placeholder:true},
  {title:"Certificate Title 3",org:"Issuing Organization",date:"Date",img:"",placeholder:true}
];
const VIDEOS = [
  {title:"Video Ad 1",cat:"Video Ad",src:"assets/videos/ad-1.mp4",poster:"assets/videos/ad-1.jpg",desc:""}
];
/* ===== END EDIT AREA ===== */

const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const fb = 'onerror="this.remove()"';

function socials(){
  const list = [["mail",SITE.email&&"mailto:"+SITE.email,"Email"],["facebook",SITE.facebook,"Facebook"],["github",SITE.github,"GitHub"]];
  const html = list.map(([i,u,l]) => u
    ? `<a href="${esc(u)}" target="_blank" rel="noopener" aria-label="${l}"><i data-lucide="${i}"></i></a>`
    : `<a href="#contact" aria-label="${l} (not added yet)" title="${l}: not added yet"><i data-lucide="${i}"></i></a>`).join("");
  $("#socials").innerHTML = html; $("#footSocials").innerHTML = html;
  $("#contactLinks").innerHTML = list.map(([i,u,l]) =>
    `<li><a href="${u?esc(u):"#contact"}" ${u?'target="_blank" rel="noopener"':""}><i data-lucide="${i}"></i>${l}: ${u?esc(u.replace("mailto:","")):"Not yet provided"}</a></li>`).join("");
}

function render(){
  $("#info").innerHTML = INFO.map(([k,v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
  $("#skillGroups").innerHTML = SKILLS.map(g => `<div class="group reveal"><h3>${g.group}</h3>${g.items.map(([i,n,d]) =>
    `<div class="skill"><i data-lucide="${i}"></i><div><h3>${n}</h3><p>${d}</p></div></div>`).join("")}</div>`).join("");
  $("#projectGrid").innerHTML = PROJECTS.map((p,pi) => `<article class="card reveal">
    <div class="thumb${p.contain?" contain":""}">${esc(p.title)}<img src="${p.img}" alt="${esc(p.title)} preview" ${fb}></div>
    <div class="card-body"><h3>${esc(p.title)}</h3><p class="cat">${esc(p.cat)}</p><p>${esc(p.desc)}</p>
    <div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join("")}</div>
    <div class="card-actions">
      ${p.link?`<a class="btn small primary" href="${esc(p.link)}" target="_blank" rel="noopener">View project</a>`:p.gallery?"":`<span class="btn small primary" aria-disabled="true" title="Add a link in js/main.js">View project</span>`}
      ${p.gallery?`<button class="btn small primary" data-gal="${pi}">${p.galleryLabel||"View gallery"}</button>`:""}
      ${p.github?`<a class="btn small" href="${esc(p.github)}" target="_blank" rel="noopener">GitHub</a>`:""}
    </div></div></article>`).join("");
  $("#videoGrid").innerHTML = VIDEOS.length ? VIDEOS.map(v => `<article class="card vcard reveal">
    <video controls preload="metadata" playsinline poster="${v.poster||""}" aria-label="${esc(v.title)}"><source src="${v.src}" type="video/mp4"></video>
    <div class="card-body"><h3>${esc(v.title)}</h3><p class="cat">${esc(v.cat)}</p>${v.desc?`<p>${esc(v.desc)}</p>`:""}</div></article>`).join("") : '<p class="soon">COMING SOON</p>';
  $("#certGrid").innerHTML = CERTS.length ? CERTS.map((c,i) => `<button class="card cert reveal" data-i="${i}" aria-label="Preview ${esc(c.title)}">
    <div class="thumb">${c.placeholder?'<span class="soon">COMING SOON</span>':esc(c.title)}${c.img?`<img src="${c.img}" alt="${esc(c.title)}" ${fb}>`:""}</div>
    <div class="card-body"><h3>${esc(c.title)}</h3><p class="cat">${esc(c.org)}</p><p class="cat">${esc(c.date)}</p></div></button>`).join("")
    : '<p class="soon">COMING SOON</p>';
}

function init(){
  socials(); render();
  window.lucide && lucide.createIcons();
  const menu = $("#menu"), burger = $("#burger");
  burger.onclick = () => burger.setAttribute("aria-expanded", menu.classList.toggle("open"));
  menu.addEventListener("click", e => { if(e.target.tagName==="A"){menu.classList.remove("open");burger.setAttribute("aria-expanded","false")} });
  const links = [...menu.querySelectorAll("a")];
  const spy = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting) links.forEach(a => a.classList.toggle("active", a.hash==="#"+e.target.id)) }), {rootMargin:"-45% 0px -50% 0px"});
  document.querySelectorAll("main section").forEach(s => spy.observe(s));
  const rv = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){e.target.classList.add("in");rv.unobserve(e.target)} }), {threshold:.12});
  document.querySelectorAll(".reveal").forEach(n => rv.observe(n));
  const top = $("#toTop");
  addEventListener("scroll", () => top.classList.toggle("show", scrollY > 600), {passive:true});
  top.onclick = () => scrollTo({top:0,behavior:"smooth"});
  const modal = $("#modal"), body = $("#modalBody"), close = () => modal.hidden = true;
  $("#certGrid").addEventListener("click", e => {
    const b = e.target.closest(".cert"); if(!b) return;
    const c = CERTS[b.dataset.i];
    body.innerHTML = (c.img ? `<img src="${c.img}" alt="${esc(c.title)}">` : `<div class="thumb"><span class="soon">COMING SOON</span></div>`) + `<h3 style="margin-top:16px">${esc(c.title)}</h3><p>${esc(c.org)} · ${esc(c.date)}</p>`;
    modal.hidden = false; $("#close").focus();
  });
  $("#projectGrid").addEventListener("click", e => {
    const b = e.target.closest("[data-gal]"); if(!b) return;
    const p = PROJECTS[b.dataset.gal];
    body.innerHTML = `<div class="gallery">${p.gallery.map(g => `<img src="${g}" alt="${esc(p.title)} preview">`).join("")}</div><h3 style="margin-top:16px">${esc(p.title)}</h3><p>${esc(p.cat)}</p>`;
    modal.hidden = false; $("#close").focus();
  });
  $("#close").onclick = close;
  modal.addEventListener("click", e => { if(e.target===modal) close() });
  addEventListener("keydown", e => { if(e.key==="Escape") close() });
  const form = $("#form"), status = $("#status");
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    let bad = false;
    form.querySelectorAll("input,textarea").forEach(f => {
      const ok = f.value.trim() && (f.type!=="email" || /^\S+@\S+\.\S+$/.test(f.value));
      f.classList.toggle("invalid", !ok); bad = bad || !ok;
    });
    status.className = "err";
    if(bad){ status.textContent = "Please fill in every field and enter a valid email address."; return; }
    if(SITE.formEndpoint){
      try{
        const r = await fetch(SITE.formEndpoint,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(d)});
        if(!r.ok) throw 0;
        status.className="ok"; status.textContent="Message sent. Thank you!"; form.reset();
      }catch{ status.textContent="The message could not be sent. Please try again later."; }
    }else if(SITE.email){
      location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(d.message+"\n\nFrom: "+d.name+" ("+d.email+")")}`;
      status.className="ok"; status.textContent="Your email app should open with the message ready to send.";
    }else{
      status.textContent = "The form isn't connected to an email service yet, so nothing was sent.";
    }
  });
}
document.readyState==="loading" ? addEventListener("DOMContentLoaded",init) : init();
