const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
nav.addEventListener('click', e => { if(e.target.closest('a')) { nav.classList.remove('open'); menu.setAttribute('aria-expanded','false'); } });
document.addEventListener('keydown', e => { if(e.key==='Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); menu.setAttribute('aria-expanded','false'); menu.focus(); } });
function element(tag, text, cls) { const el=document.createElement(tag); if(text) el.textContent=text; if(cls) el.className=cls; return el; }
function safeURL(value) { try { const u=new URL(value); return u.protocol==='https:' ? u.href : null; } catch { return null; } }
fetch('./event.json?v=20261027-public-redesign', { cache: 'no-store' }).then(r => { if(!r.ok) throw Error('Event information unavailable'); return r.json(); }).then(event => {
 document.querySelectorAll('[data-field]').forEach(el => { if(event[el.dataset.field]) el.textContent=event[el.dataset.field]; });
 const grid=document.querySelector('#topic-grid');
 event.topics.forEach(([num,title,description])=> { const card=element('article',null,'topic-card'); card.append(element('span',num,'topic-number'),element('h3',title),element('p',description)); grid.append(card); });
 const program=document.querySelector('#program-list');
 const sessions=event.sessions?.length ? event.sessions : event.program;
 sessions.forEach((session,i)=> { const row=element('article'); const body=element('div'); body.append(element('h3',session.title),element('p',session.description)); if(session.time) body.prepend(element('p',session.time,'small-label')); if(session.speaker) body.append(element('p',session.speaker)); row.append(element('span',session.dateLabel || 'Date TBC','agenda-date'),body); program.append(row); });
 if(event.organizers?.length){ const list=document.querySelector('#organizer-list'); list.replaceChildren(); event.organizers.forEach(o=> { const person=element('article');person.append(element('h3',o.name),element('p',o.role));list.append(person); }); }
 const registration=event.registration;
 const url=safeURL(registration.url);
 if(registration.status==='open' && url){ const link=element('a','Register via Microsoft Forms','button primary');link.href=url;link.target='_blank';link.rel='noopener noreferrer';document.querySelector('#registration-action').replaceChildren(link);document.querySelector('#hero-registration').textContent='Register Now'; const navLink=document.querySelector('.nav-register');navLink.href=url;navLink.target='_blank';navLink.rel='noopener noreferrer'; }
 if(registration.status==='closed'){ const disabled=element('button','Registration closed','button disabled');disabled.disabled=true;document.querySelector('#registration-action').replaceChildren(disabled); ['#hero-registration','.nav-register'].forEach(selector=>{const a=document.querySelector(selector);a.href='#registration';a.removeAttribute('target');});document.querySelector('#hero-registration').textContent='Registration closed'; }
 if(registration.deadline) document.querySelector('#deadline').textContent=`Registration deadline: ${registration.deadline}`;
 if(event.contactEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.contactEmail)){const a=element('a',event.contactEmail,'text-link');a.href=`mailto:${event.contactEmail}`;document.querySelector('#contact-details').replaceChildren(a);}
}).catch(()=>{document.querySelector('#topic-grid').append(element('p','Research topics include OT telemetry, anomaly detection, intelligent investigation, agentic AI, and collaborative prototyping.'));document.querySelector('#program-list').append(element('p','Orientation, data exploration, collaborative investigation, and demonstrations are proposed. The detailed program will follow organizer confirmation.'));});
