// ── PROJECT FILTER ──
function filterProj(cat, btn) {
  document.querySelectorAll('.pf-btn').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  document.querySelectorAll('.pcard').forEach(function(card) {
    if (cat === 'all' || card.dataset.cat === cat) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

// ── CUSTOM CURSOR ──
var cur = document.getElementById('cursor');
var trail = document.getElementById('cursorTrail');
document.addEventListener('mousemove', function(e) {
  cur.style.left = e.clientX + 'px';
  cur.style.top = e.clientY + 'px';
  setTimeout(function() {
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
  }, 80);
});
document.querySelectorAll('a,button,.trait,.itag,.pcard,.sidebar-card,.clink').forEach(function(el) {
  el.addEventListener('mouseenter', function() { cur.style.transform = 'translate(-50%,-50%) scale(2.5)'; });
  el.addEventListener('mouseleave', function() { cur.style.transform = 'translate(-50%,-50%) scale(1)'; });
});

// ── SCROLL REVEALS ──
var revealObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e, i) {
    if (e.isIntersecting) setTimeout(function() { e.target.classList.add('visible'); }, i * 90);
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(function(el) { revealObs.observe(el); });

// ── INTERN TIMELINE ──
var internObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e, i) {
    if (e.isIntersecting) setTimeout(function() { e.target.classList.add('visible'); }, i * 150);
  });
}, { threshold: 0.15 });
document.querySelectorAll('.intern-card').forEach(function(el) { internObs.observe(el); });

// ── SKILL BARS ──
var skillObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.sfill').forEach(function(b) { b.classList.add('animated'); });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('#skills').forEach(function(el) { skillObs.observe(el); });

// ── CONTACT FORM ──
function doSend(btn) {
  btn.textContent = 'Sending...';
  btn.style.opacity = '0.6';
  setTimeout(function() {
    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'var(--teal)';
    btn.style.opacity = '1';
    setTimeout(function() {
      btn.textContent = '✉ Send Message';
      btn.style.background = '';
    }, 2500);
  }, 900);
}

// ── CHATBOT ──
var chatOpen = false;
var emuSVG = '';

window.addEventListener('DOMContentLoaded', function() {
  emuSVG = document.getElementById('chat-btn').innerHTML;
});

function toggleChat() {
  chatOpen = !chatOpen;
  document.getElementById('chat-window').classList.toggle('open', chatOpen);
  document.getElementById('chat-btn').innerHTML = chatOpen
    ? '<span style="font-size:1.3rem;color:white;line-height:1">✕</span>'
    : emuSVG;
}

var kb = {
  skills: "Mohor is skilled in HTML/CSS (92%), JavaScript (85%), MERN/MEAN Stack (80%), C, Java, and SQL. She's certified in MEAN Full Stack Web Development (IALSD, 2025)! 💻",
  education: "Mohor is pursuing B.Tech in CSE at Narula Institute of Technology (WBUT, 2027) with a CGPA of 8.647. She scored 75.2% in Class 12 (WBCHSE, 2023) and 81.43% in Class 10 (WBBSE, 2021). 🎓",
  certifications: "Mohor holds 6 certifications: 🏅 MEAN Full Stack (IALSD 2025), ⚡ IEEE Innovation Recognition (2024), 📱 Android Dev Internship (OasisInfobyte), 💃 MA Bharatnatyam First Class (2025), 🌐 Web Dev Workshop (NIT), and 🔗 Blockchain & Cryptography (NPTEL)!",
  internships: "Mohor has 3 internship/training experiences: 📱 Android Development at OasisInfobyte (virtual, 2024), ⚡ IEEE Computer Society volunteer at NIT (2024-2025), and 💻 MEAN Full Stack training at IALSD (2025 — certified). 🚀",
  projects: "Mohor has built 10 projects! Major: 🗳️ E-Voting Blockchain, 💊 Medico medical shop, 🤖 MeChat AI chatbot, 🌤️ Weather Dashboard. Mini: Tic-Tac-Toe, Chessboard, College Website, E-Commerce, Calculator, E-Health Watch. 🚀",
  blockchain: "Mohor built a Blockchain-based E-Voting system using Cryptosystem, Solidity, Web3.js, React & Node.js. Each vote is hashed as an immutable block — tamper-proof! 🔗",
  medico: "Medico is Mohor's online medical shop built with MERN stack — product catalog, prescription uploads, order tracking, and Stripe payments. 💊",
  mechat: "MeChat is Mohor's AI chatbot built with React, Socket.io, Node.js and OpenAI API — real-time messaging and AI responses! 🤖",
  weather: "Mohor's Weather Dashboard uses OpenWeatherMap API — real-time forecasts, hourly charts, wind/humidity data, animated weather icons. 🌤️",
  contact: "Reach Mohor at mohormoumi@gmail.com or call 8101012184. Based in Habra, North 24 Parganas, West Bengal. Open to opportunities! 📬",
  hobbies: "Mohor's hobbies: website design, Bharatnatyam dance (MA First Class 2025!), art & craft, chess, and swimming. 🎨",
  ieee: "Mohor is an IEEE Computer Society member (2025), recognized for innovation at IEEE CIS & MOVE Outreach India 2024! 🌟",
  default: "I can tell you about Mohor's skills, education, projects, certifications, internships, hobbies or contact info. What would you like to know? 🤖"
};

function getBotReply(m) {
  m = m.toLowerCase();
  if (m.match(/certif|award|achiev|qualify|credential/)) return kb.certifications;
  if (m.match(/intern|training|experience|ialsd|oasis|industry/)) return kb.internships;
  if (m.match(/skill|tech|html|css|js|java|sql|mern|mean|code|program/)) return kb.skills;
  if (m.match(/edu|study|college|school|degree|cgpa|marks|gpa|uni/)) return kb.education;
  if (m.match(/blockchain|voting|evot|crypto|solidity|web3/)) return kb.blockchain;
  if (m.match(/medico|medical|medicine|pharmacy|shop|pharma/)) return kb.medico;
  if (m.match(/mechat|chatbot|chat bot|ai chat|socket/)) return kb.mechat;
  if (m.match(/weather|forecast|dashboard|climate|openweather/)) return kb.weather;
  if (m.match(/project|health|caregiver|ehealth|tictac|chess|ecom|calculat/)) return kb.projects;
  if (m.match(/contact|email|phone|reach|call|where|location|address/)) return kb.contact;
  if (m.match(/hobby|hobbies|dance|swim|art|craft|bharat/)) return kb.hobbies;
  if (m.match(/ieee|member|award|recogni|outreach/)) return kb.ieee;
  if (m.match(/hi|hello|hey/)) return "Hello! 🤖 I'm EMU, Mohor's AI assistant. How can I help you today?";
  if (m.match(/thank/)) return "You're welcome! 🤖";
  return kb.default;
}

function addMsg(text, type) {
  var msgs = document.getElementById('chatMsgs');
  var div = document.createElement('div');
  div.className = 'cmsg ' + type;
  var t = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  div.innerHTML = '<div class="cbubble">' + text + '</div><div class="ctime">' + t + '</div>';
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function sendChat() {
  var inp = document.getElementById('chat-inp');
  var txt = inp.value.trim();
  if (!txt) return;
  addMsg(txt, 'user');
  inp.value = '';
  document.getElementById('quickR').style.display = 'none';
  var msgs = document.getElementById('chatMsgs');
  var ty = document.createElement('div');
  ty.className = 'cmsg bot';
  ty.id = 'ty';
  ty.innerHTML = '<div class="cbubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>';
  msgs.appendChild(ty);
  msgs.scrollTop = msgs.scrollHeight;
  setTimeout(function() {
    var tyEl = document.getElementById('ty');
    if (tyEl) tyEl.remove();
    addMsg(getBotReply(txt), 'bot');
  }, 800 + Math.random() * 400);
}

function qask(t) {
  document.getElementById('chat-inp').value = t;
  sendChat();
}