const $ = (id) => document.getElementById(id);
const VERB_NAMES = Object.keys(VERBS);

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalize(s, ignoreAccents) {
  let r = s.toLowerCase().replace(/[’`´]/g, "'").replace(/œ/g, "oe").replace(/\s+/g, " ").trim();
  if (ignoreAccents) r = r.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return r;
}

function pronounFor(index, form) {
  if (index === 0 && /^[aeiouéèêh]/i.test(form)) return "j'";
  return PRONOUNS[index];
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* Renders "texto ___ texto" with a blank slot; returns { html, fill(answer) } */
function renderBlank(pre, post) {
  const slot = '<span class="blank-slot">?</span>';
  let html = escapeHtml(pre).replace("___", slot);
  if (post) html += " " + escapeHtml(post);
  return html;
}

/* ---------- Score persistence (home cards) ---------- */
const scores = JSON.parse(localStorage.getItem("fr-scores") || "{}");
function setScore(key, ok, total) {
  scores[key] = { ok, total };
  localStorage.setItem("fr-scores", JSON.stringify(scores));
  const el = $("hs-" + key);
  if (el && total) el.textContent = `${ok}/${total} ✓`;
}
function refreshHome() {
  for (const k of Object.keys(scores)) {
    const el = $("hs-" + k);
    if (el && scores[k].total) el.textContent = `${scores[k].ok}/${scores[k].total} ✓`;
  }
}

/* ---------- Countdown ---------- */
(function countdown() {
  const target = new Date("2026-11-10T09:00:00");
  const now = new Date();
  const diff = target - now;
  const el = $("countdown");
  if (diff <= 0) { el.textContent = "C'est aujourd'hui ! Bonne chance 🍀"; return; }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  el.textContent = `⏰ ${d > 0 ? d + " jour(s) " : ""}${h} h avant l'examen — courage !`;
})();

/* ---------- Tabs ---------- */
function goTab(name) {
  document.querySelectorAll(".tab").forEach((b) => b.classList.toggle("active", b.dataset.tab === name));
  document.querySelectorAll(".panel").forEach((p) => p.classList.toggle("active", p.id === name));
}
document.querySelectorAll(".tab").forEach((btn) => btn.addEventListener("click", () => goTab(btn.dataset.tab)));
document.querySelectorAll(".topic").forEach((card) => card.addEventListener("click", () => goTab(card.dataset.go)));

/* ---------- Generic MCQ engine (connecteurs, homophones, actes) ---------- */
function makeMcq(prefix, items, renderItem) {
  const state = { queue: [], current: null, answered: false, ok: 0, total: 0 };

  function next() {
    if (!state.queue.length) state.queue = shuffle(items);
    state.current = state.queue.pop();
    state.answered = false;
    $(prefix + "Feedback").textContent = "";
    $(prefix + "Feedback").className = "feedback";
    renderItem(state.current);
  }

  function answer(chosen, btn, isCorrect, explanation) {
    if (state.answered) return;
    state.answered = true;
    state.total++;
    const fb = $(prefix + "Feedback");
    if (isCorrect) {
      state.ok++;
      btn.classList.add("ok");
      fb.className = "feedback ok";
      fb.textContent = "✓ Correct !" + (explanation ? " " + explanation : "");
    } else {
      btn.classList.add("bad");
      fb.className = "feedback bad";
      fb.textContent = "✗ " + (explanation || "Ce n'est pas ça.");
      // mark the right one
      const opts = $(prefix + "Options").querySelectorAll("button");
      opts.forEach((b) => { if (b.dataset.right === "1") b.classList.add("ok"); });
    }
    $(prefix + "Options").querySelectorAll("button").forEach((b) => (b.disabled = true));
    $(prefix + "Score").textContent = `${state.ok} / ${state.total}`;
    setScore(prefix, state.ok, state.total);
  }

  $(prefix + "Next").addEventListener("click", next);
  return { state, next, answer };
}

/* ---------- Connecteurs ---------- */
$("connFiche").innerHTML = CONNECTEURS.map(
  (g) => `<div class="conn-group"><h5>${g.group}</h5><p>${g.words}</p><span class="es">${g.es}</span></div>`
).join("");

const connMcq = makeMcq("conn", CONN_EXERCISES, (ex) => {
  $("connSentence").innerHTML = renderBlank(ex.pre, ex.post);
  const valid = [ex.a, ...(ex.alt || [])];
  const options = shuffle([ex.a, ...ex.distract]);
  $("connOptions").innerHTML = "";
  options.forEach((opt) => {
    const b = document.createElement("button");
    b.textContent = opt;
    if (valid.some((v) => normalize(v, true) === normalize(opt, true))) b.dataset.right = "1";
    b.onclick = () => {
      connMcq.answer(opt, b, b.dataset.right === "1", b.dataset.right ? "" : `Réponse : « ${ex.a} »`);
      if (b.dataset.right) {
        const slot = $("connSentence").querySelector(".blank-slot");
        if (slot) slot.textContent = opt;
      }
    };
    $("connOptions").appendChild(b);
  });
});

/* ---------- Homophones ---------- */
const homoMcq = makeMcq("homo", HOMO_EXERCISES, (ex) => {
  $("homoSentence").innerHTML = renderBlank(ex.s);
  const options = shuffle(HOMO_OPTIONS);
  $("homoOptions").innerHTML = "";
  options.forEach((opt) => {
    const b = document.createElement("button");
    b.textContent = opt;
    if (normalize(opt, true) === normalize(ex.a, true)) b.dataset.right = "1";
    b.onclick = () => {
      const right = normalize(opt, true) === normalize(ex.a, true);
      homoMcq.answer(opt, b, right, right ? "" : `Réponse : « ${ex.a} »`);
      if (right) {
        const slot = $("homoSentence").querySelector(".blank-slot");
        if (slot) slot.textContent = ex.a;
      }
    };
    $("homoOptions").appendChild(b);
  });
});

/* ---------- Actes de parole ---------- */
const actesMcq = makeMcq("actes", ACTES_EXERCISES, (ex) => {
  $("actesSituation").textContent = ex.s;
  const order = shuffle(ex.o.map((_, i) => i));
  $("actesOptions").innerHTML = "";
  order.forEach((i) => {
    const b = document.createElement("button");
    b.style.borderRadius = "9px";
    b.textContent = ex.o[i];
    if (i === ex.a) b.dataset.right = "1";
    b.onclick = () => actesMcq.answer(ex.o[i], b, i === ex.a, ex.expl + (i === ex.a ? "" : ` Réponse : « ${ex.o[ex.a]} »`));
    $("actesOptions").appendChild(b);
  });
});

/* ---------- Verbs ---------- */
const verbState = { queue: [], current: null, checked: false, correct: 0, total: 0 };

$("verbPicker").innerHTML = VERB_NAMES.map(
  (v) => `<label><input type="checkbox" value="${v}" checked /> ${v}</label>`
).join("");

function selectedVerbs() {
  return [...$("verbPicker").querySelectorAll("input:checked")].map((i) => i.value);
}
$("verbAll").onclick = () => { $("verbPicker").querySelectorAll("input").forEach((i) => (i.checked = true)); verbState.queue = []; };
$("verbNone").onclick = () => { $("verbPicker").querySelectorAll("input").forEach((i) => (i.checked = false)); verbState.queue = []; };
$("verbPicker").addEventListener("change", () => (verbState.queue = []));

function nextVerb() {
  const pool = selectedVerbs();
  if (!pool.length) {
    $("verbName").textContent = "Choisissez au moins un verbe";
    $("verbForm").innerHTML = "";
    verbState.current = null;
    return;
  }
  if (!verbState.queue.length) verbState.queue = shuffle(pool);
  verbState.current = verbState.queue.pop();
  verbState.checked = false;
  const forms = VERBS[verbState.current];
  $("verbName").textContent = verbState.current;
  $("verbForm").innerHTML = forms.map((f, i) => `
    <div class="row">
      <span class="pron">${i === 0 ? "je / j'" : PRONOUNS[i]}</span>
      <input type="text" data-i="${i}" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="go" />
      <span class="correct" data-c="${i}"></span>
    </div>`).join("");
  $("verbForm").querySelector("input").focus();
}

function stripPronoun(ans, i) {
  const p = i === 0 ? "(je |j'|j’)" : `(${PRONOUNS[i]} )`;
  return ans.replace(new RegExp("^" + p), "");
}

function checkVerb(reveal = false) {
  if (!verbState.current) return;
  const forms = VERBS[verbState.current];
  const ign = $("verbAccents").checked;
  let right = 0;
  $("verbForm").querySelectorAll("input").forEach((inp) => {
    const i = +inp.dataset.i;
    const ans = stripPronoun(normalize(inp.value, ign), i);
    const ok = ans === normalize(forms[i], ign);
    if (ok) right++;
    inp.classList.toggle("ok", ok);
    inp.classList.toggle("bad", !ok);
    const c = $("verbForm").querySelector(`[data-c="${i}"]`);
    c.textContent = ok ? "✓" : (reveal || verbState.checked ? `${pronounFor(i, forms[i])} ${forms[i]}` : "✗");
    c.classList.toggle("wrong", !ok);
  });
  if (!verbState.checked) {
    verbState.correct += right;
    verbState.total += 6;
    $("verbScore").textContent = `${verbState.correct} / ${verbState.total}`;
    setScore("verbs", verbState.correct, verbState.total);
  }
  verbState.checked = true;
}

$("verbForm").addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  e.preventDefault();
  const inputs = [...$("verbForm").querySelectorAll("input")];
  const idx = inputs.indexOf(e.target);
  if (idx >= 0 && idx < inputs.length - 1 && !verbState.checked) inputs[idx + 1].focus();
  else if (!verbState.checked) checkVerb();
  else nextVerb();
});
$("verbCheck").onclick = () => checkVerb();
$("verbReveal").onclick = () => checkVerb(true);
$("verbNext").onclick = nextVerb;

/* ---------- Vocab ---------- */
const ARTICLES = /^(un |une |le |la |les |l'|el |los |las |una )/;
const vocabState = { queue: [], current: null, checked: false, correct: 0, total: 0 };

$("vocabTable").innerHTML = VOCAB_GROUPS.map(
  (g) => `<tr class="group"><td colspan="2">${escapeHtml(g.name)} (${g.pairs.length})</td></tr>` +
    g.pairs.map(([fr, es]) => `<tr><td>${escapeHtml(fr)}</td><td>${escapeHtml(es)}</td></tr>`).join("")
).join("");

function vocabPair() {
  const [fr, es] = vocabState.current;
  return { q: es, a: fr };
}

function nextVocab() {
  if (!vocabState.queue.length) vocabState.queue = shuffle(VOCAB);
  vocabState.current = vocabState.queue.pop();
  vocabState.checked = false;
  const { q } = vocabPair();
  $("vocabHint").textContent = "Traduis en français";
  $("vocabWord").textContent = q;
  $("vocabInput").value = "";
  $("vocabInput").className = "";
  $("vocabFeedback").textContent = "";
  $("vocabFeedback").className = "feedback";
  $("vocabInput").focus();
}

function vocabMatches(input, answer) {
  const ign = $("vocabAccents").checked;
  const optArt = $("vocabArticles").checked;
  const user = normalize(input, ign);
  return answer.split("/").some((alt) => {
    const target = normalize(alt, ign);
    if (user === target) return true;
    return optArt && user.replace(ARTICLES, "") === target.replace(ARTICLES, "");
  });
}

function checkVocab(reveal = false) {
  if (!vocabState.current) return;
  const { a } = vocabPair();
  const ok = vocabMatches($("vocabInput").value, a);
  $("vocabInput").className = ok ? "ok" : "bad";
  const fb = $("vocabFeedback");
  fb.className = "feedback " + (ok ? "ok" : "bad");
  fb.textContent = ok ? `✓ ${a}` : (reveal || vocabState.checked ? `Réponse : ${a}` : "✗ Essaye encore ou regarde la réponse");
  if (!vocabState.checked) {
    if (ok) vocabState.correct++;
    vocabState.total++;
    $("vocabScore").textContent = `${vocabState.correct} / ${vocabState.total}`;
    setScore("vocab", vocabState.correct, vocabState.total);
  }
  vocabState.checked = true;
}

$("vocabForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const { a } = vocabPair();
  if (vocabState.checked && (vocabMatches($("vocabInput").value, a) || $("vocabFeedback").textContent.startsWith("Réponse"))) nextVocab();
  else checkVocab();
});
$("vocabCheck").onclick = () => checkVocab();
$("vocabReveal").onclick = () => checkVocab(true);
$("vocabNext").onclick = nextVocab;

/* ---------- Avoir du mal à ---------- */
const avdmState = { queue: [], current: null, checked: false, correct: 0, total: 0 };

function nextAvdm() {
  if (!avdmState.queue.length) avdmState.queue = shuffle(AVDM_EXERCISES);
  avdmState.current = avdmState.queue.pop();
  avdmState.checked = false;
  $("avdmPrompt").innerHTML = `<strong>${escapeHtml(avdmState.current.sujet)}</strong> + avoir du mal à + <strong>${escapeHtml(avdmState.current.verb)}</strong>`;
  $("avdmInput").value = "";
  $("avdmInput").className = "";
  $("avdmFeedback").textContent = "";
  $("avdmFeedback").className = "feedback";
  $("avdmInput").focus();
}

function avdmMatches(input) {
  const ign = $("avdmAccents").checked;
  return normalize(input, ign).replace(/[.?!]+$/, "") === normalize(avdmState.current.a, ign).replace(/[.?!]+$/, "");
}

function checkAvdm(reveal = false) {
  if (!avdmState.current) return;
  const ok = avdmMatches($("avdmInput").value);
  $("avdmInput").className = ok ? "ok" : "bad";
  const fb = $("avdmFeedback");
  fb.className = "feedback " + (ok ? "ok" : "bad");
  fb.textContent = ok ? `✓ ${avdmState.current.a}` : (reveal || avdmState.checked ? `Réponse : ${avdmState.current.a}` : "✗ Essaye encore ou regarde la réponse");
  if (!avdmState.checked) {
    if (ok) avdmState.correct++;
    avdmState.total++;
    $("avdmScore").textContent = `${avdmState.correct} / ${avdmState.total}`;
    setScore("avdm", avdmState.correct, avdmState.total);
  }
  avdmState.checked = true;
}

$("avdmForm").addEventListener("submit", (e) => {
  e.preventDefault();
  if (avdmState.checked && (avdmMatches($("avdmInput").value) || $("avdmFeedback").textContent.startsWith("Réponse"))) nextAvdm();
  else checkAvdm();
});
$("avdmCheck").onclick = () => checkAvdm();
$("avdmReveal").onclick = () => checkAvdm(true);
$("avdmNext").onclick = nextAvdm;

/* ---------- Init ---------- */
refreshHome();
connMcq.next();
homoMcq.next();
actesMcq.next();
nextVerb();
nextVocab();
nextAvdm();
