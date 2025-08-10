import React, { useEffect, useState, useCallback, useMemo } from "react";

// FOUNDERS UNIVERSITY - Enhanced with Claude API integration

// Claude API integration - goes through your backend
const callClaudeAPI = async (prompt, maxTokens = 1000) => {
  try {
    const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'YOUR_ACTUAL_API_KEY_HERE',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: maxTokens,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    
    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('Claude API error:', error);
    throw error;
  }
};
    }
    
    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('Claude API error:', error);
    throw error;
  }
};

const palette = {
  bg: "#070B14",
  panel: "#0C1222",
  soft: "#0A0F1D",
  text: "#EAF0FF",
  muted: "#9AA9D1",
  p1: "#7B5CFF",
  p2: "#43E6D2",
  accent: "#FF5EA7",
  good: "#1DD1A1",
  warn: "#FDCB6E",
  bad: "#FF7675",
};

const css = `
:root{--bg:${palette.bg};--panel:${palette.panel};--soft:${palette.soft};--text:${palette.text};--muted:${palette.muted};--p1:${palette.p1};--p2:${palette.p2};--accent:${palette.accent};--ring:rgba(255,255,255,.08)}
*{box-sizing:border-box}html,body,#root{height:100%;background:var(--bg)}body{margin:0;background:radial-gradient(1000px 400px at 70% -15%,rgba(123,92,255,.16),transparent),var(--bg);color:var(--text);font-family:Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial}
a{color:inherit;text-decoration:none}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(123,92,255,.3); }
  50% { box-shadow: 0 0 30px rgba(123,92,255,.6); }
}
@keyframes shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
}

.fade-in { animation: fadeInUp 0.6s ease-out; }
.slide-in { animation: slideInLeft 0.5s ease-out; }
.pulse-hover:hover { animation: pulse 0.3s ease-in-out; }

.container{max-width:1200px;margin:0 auto;padding:0 16px}
@media (min-width: 768px) { .container { padding: 0 22px; } }

.btn{display:inline-flex;gap:8px;align-items:center;border:1px solid var(--ring);background:rgba(255,255,255,.06);color:var(--text);padding:8px 12px;border-radius:999px;font-weight:600;transition:all 0.3s ease;transform:translateY(0);font-size:14px}
.btn:hover{background:rgba(255,255,255,.12);transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,.2)}
.btn:active{transform:translateY(0)}
.btn.primary{background:linear-gradient(135deg,var(--p1),var(--p2));color:white;border:1px solid rgba(123,92,255,.3)}
.btn.primary:hover{background:linear-gradient(135deg,var(--p1),var(--accent));box-shadow:0 4px 16px rgba(123,92,255,.4)}
.btn.primary:active{transform:translateY(0)}
.btn.ghost{background:rgba(255,255,255,.06)}
.btn.warn{background:rgba(253,203,110,.1);border-color:rgba(253,203,110,.3);color:rgba(253,203,110,1)}
.btn.warn:hover{background:rgba(253,203,110,.2)}
@media (min-width: 768px) { .btn { padding: 10px 14px; font-size: 15px; } }

.input{width:100%;background:rgba(255,255,255,.04);border:1px solid var(--ring);color:var(--text);padding:10px;border-radius:12px;transition:all 0.3s ease;font-size:14px}
.input:focus{outline:none;border-color:var(--p1);box-shadow:0 0 0 3px rgba(123,92,255,.1)}
@media (min-width: 768px) { .input { padding: 12px; font-size: 15px; } }

.label{font-size:12px;color:var(--muted);margin-bottom:6px;font-weight:500}
.card{background:linear-gradient(180deg,var(--panel),var(--soft));border:1px solid var(--ring);border-radius:16px;padding:16px;transition:all 0.4s ease;transform:translateY(0)}
.card:hover{transform:translateY(-4px);box-shadow:0 8px 32px rgba(0,0,0,.2);border-color:rgba(255,255,255,.12)}
@media (min-width: 768px) { .card { padding: 18px; } }

.badge{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--ring);background:rgba(255,255,255,.04);color:var(--muted);padding:4px 8px;border-radius:999px;font-size:11px;font-weight:500}
@media (min-width: 768px) { .badge { padding: 6px 10px; font-size: 12px; } }

.nav{position:sticky;top:0;z-index:30;background:linear-gradient(180deg,rgba(7,11,20,.95),rgba(7,11,20,.8));backdrop-filter:blur(16px);border-bottom:1px solid var(--ring);transition:all 0.3s ease}
.nav .wrap{display:flex;align-items:center;justify-content:space-between;padding:12px 0;flex-wrap:wrap;gap:10px}
@media (min-width: 768px) { .nav .wrap { padding: 14px 0; flex-wrap: nowrap; } }

.brand{display:flex;align-items:center;gap:8px;font-weight:800;font-size:16px}
@media (min-width: 768px) { .brand { gap: 10px; font-size: 18px; } }

.dot{height:8px;width:8px;border-radius:50%;background:linear-gradient(135deg,var(--p1),var(--accent));animation:glow 2s ease-in-out infinite}
@media (min-width: 768px) { .dot { height: 10px; width: 10px; } }

.hero{padding:40px 0 20px;border-bottom:1px solid var(--ring);background:linear-gradient(180deg,transparent,rgba(67,230,210,.05) 60%,transparent)}
@media (min-width: 768px) { .hero { padding: 56px 0 24px; } }

.h1{font-size:32px;font-weight:800;line-height:1.1;margin:8px 0 6px}
@media (min-width: 768px) { .h1 { font-size: 44px; line-height: 1.06; margin: 10px 0 8px; } }

.sub{color:var(--muted);max-width:640px;font-size:14px;line-height:1.5}
@media (min-width: 768px) { .sub { font-size: 16px; } }

.grid{display:grid;gap:16px}
.grid-2{display:grid;grid-template-columns:1fr;gap:16px}
.grid-3{display:grid;grid-template-columns:1fr;gap:16px}
@media (min-width: 768px) { .grid, .grid-2, .grid-3 { gap: 18px; } }
@media (min-width: 768px) { .grid-2 { grid-template-columns: 1fr 1fr; } }
@media (min-width: 960px) { .grid-3 { grid-template-columns: repeat(3,1fr); } }

.path{display:flex;gap:12px;overflow-x:auto;padding-bottom:6px;scroll-behavior:smooth}
.path::-webkit-scrollbar{height:4px}
.path::-webkit-scrollbar-track{background:rgba(255,255,255,.05);border-radius:2px}
.path::-webkit-scrollbar-thumb{background:rgba(255,255,255,.2);border-radius:2px}
@media (min-width: 768px) { .path { gap: 14px; } }

.node{min-width:140px;text-align:center;padding:10px;background:rgba(255,255,255,.04);border:1px solid var(--ring);border-radius:14px;position:relative;cursor:pointer;transition:all 0.3s ease;transform:scale(1)}
.node:hover{transform:scale(1.05);background:rgba(255,255,255,.08);border-color:var(--p1)}
.node.locked{opacity:.45;cursor:not-allowed}
.node.locked:hover{transform:scale(1)}
.node.in-progress{border-color:var(--warn);background:rgba(253,203,110,.1)}
.node.in-progress:hover{border-color:var(--warn);background:rgba(253,203,110,.15)}
.node .title{font-weight:700;font-size:13px;margin-bottom:4px}
.node .meta{font-size:11px;color:var(--muted)}
@media (min-width: 768px) { 
  .node { min-width: 160px; padding: 12px; }
  .node .title { font-size: 14px; }
  .node .meta { font-size: 12px; }
}

.kpi{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}
@media (min-width: 768px) { .kpi { grid-template-columns: repeat(4,1fr); gap: 10px; } }
.kpi .item{background:rgba(255,255,255,.04);border:1px solid var(--ring);border-radius:12px;padding:10px;text-align:center;transition:all 0.3s ease}
.kpi .item:hover{background:rgba(255,255,255,.08)}
@media (min-width: 768px) { .kpi .item { padding: 12px; } }
.kpi .k{font-weight:800;font-size:16px}
.kpi .l{font-size:11px;color:var(--muted);margin-top:2px}
@media (min-width: 768px) { 
  .kpi .k { font-size: 18px; }
  .kpi .l { font-size: 12px; }
}

.toast{position:fixed;right:16px;bottom:16px;background:#0b162c;color:#d8e4ff;border:1px solid var(--ring);border-radius:12px;padding:10px 12px;box-shadow:0 10px 30px rgba(0,0,0,.35);animation:slideInLeft 0.3s ease-out;z-index:1000}
@media (min-width: 768px) { .toast { right: 18px; bottom: 18px; padding: 12px 14px; } }

.loading-shimmer{background:linear-gradient(90deg,rgba(255,255,255,.04) 0%,rgba(255,255,255,.08) 50%,rgba(255,255,255,.04) 100%);background-size:200px 100%;animation:shimmer 1.5s infinite}

@media (max-width: 767px) {
  .hero { text-align: center; }
  .nav .wrap { 
    flex-direction: column; 
    align-items: stretch; 
    gap: 12px; 
  }
  .nav .wrap > div:last-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .grid-2.auth-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .path {
    padding: 0 16px;
    margin: 0 -16px;
  }
}

.gpu-accelerated{transform:translateZ(0);backface-visibility:hidden;perspective:1000px}
`;

const storage = {
  get: (k, d) => {
    try { 
      const v = localStorage.getItem(k); 
      return v ? JSON.parse(v) : d; 
    } catch { 
      return d; 
    }
  },
  set: (k, v) => {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {
      console.warn('Storage failed:', e);
    }
  },
};

const uid = () => Math.random().toString(36).slice(2, 10);
const hash = (s) => btoa(unescape(encodeURIComponent(s)));

// Helper function to save exam answers
const saveExamAnswers = (examId, answers, score, feedback) => {
  const examAnswers = storage.get("exam_answers", {});
  if (!examAnswers[examId]) {
    examAnswers[examId] = [];
  }
  
  examAnswers[examId].push({
    answers,
    score,
    feedback,
    timestamp: Date.now()
  });
  
  storage.set("exam_answers", examAnswers);
};

const MODULES = [
  {
    id: "mod1",
    title: "Vocabulary & Communication",
    color: palette.p1,
    lessons: [
      { 
        id: "l1", 
        type: "vocab", 
        title: "Core Terms I", 
        terms: [
          { term: "Runway", def: "Months until cash = 0 at current burn.", ex: "$250k in bank, burn $50k/mo → ~5 months runway." },
          { term: "Burn", def: "Net cash out each month.", ex: "Spend $120k, collect $30k → burn = $90k." },
          { term: "Gross Margin", def: "(Revenue − COGS) / Revenue.", ex: "$100 revenue, $20 COGS → 80% GM." },
          { term: "Business Model", def: "How the company creates, delivers, and captures value.", ex: "UNI: subs + affiliate + ads + enterprise licensing." },
          { term: "ROAS", def: "Return on Ad Spend = Revenue / Ad Spend.", ex: "$20 revenue on $5 ad → 4.0x ROAS." },
        ]
      },
      { 
        id: "l2", 
        type: "vocab", 
        title: "Core Terms II", 
        terms: [
          { term: "TAM/SAM/SOM", def: "Market sizing: Total / Serviceable / Obtainable.", ex: "Music events TAM huge; SOM for DMV nightlife smaller." },
          { term: "LTV/CAC", def: "Lifetime value vs cost to acquire.", ex: "LTV $120; CAC $6 → 20x LTV/CAC." },
          { term: "CAC Payback", def: "Months to recoup CAC from gross profit.", ex: "CAC $6, GM/mo $2 → 3 months." },
          { term: "MRR", def: "Monthly Recurring Revenue from subscriptions.", ex: "$50k MRR from 1000 users at $50/month." },
          { term: "ARR", def: "Annual Recurring Revenue (MRR × 12).", ex: "$600k ARR from $50k MRR base." },
          { term: "Wedge", def: "Initial narrow product that opens broader market.", ex: "Start with nightlife, expand to all IRL experiences." },
          { term: "Vertical", def: "Specific industry or market segment.", ex: "Healthcare vertical, fintech vertical, events vertical." },
          { term: "Marketplace", def: "Platform connecting buyers and sellers.", ex: "UNI connects event-goers with venues/organizers." },
          { term: "Value Proposition", def: "Why a user/customer chooses you over alternatives.", ex: "One app for everything IRL; faster from intent → action." },
          { term: "Client Relations", def: "Managing ongoing relationships with key accounts/customers.", ex: "Regular check-ins, feature requests, expansion opportunities." },
        ]
      },
      { 
        id: "l2c", 
        type: "vocab", 
        title: "Core Terms III", 
        terms: [
          { term: "Competitive Advantage", def: "An edge that's durable (data, distribution, brand, cost).", ex: "UNI's Social DNA + ACE personalization = higher conversion." },
          { term: "North Star Metric", def: "Single metric that best captures delivered value.", ex: "Weekly IRL actions per user (tickets, check-ins)." },
          { term: "Law of Diminishing Returns", def: "Each extra unit of input yields less output after a point.", ex: "Ad spend past $15k/week adds cheaper users first, then gets pricey." },
          { term: "Ethos", def: "Brand's character/voice that builds trust and loyalty.", ex: "UNI: fun, safe, IRL-first, zero-fluff, authentic connections." },
          { term: "Brand Halo", def: "Positive brand perception that extends to new products/features.", ex: "Strong UNI brand makes users try new event types they normally wouldn't." },
          { term: "Customer Acquisition", def: "Process of gaining new customers/users.", ex: "UNI acquires users through social ads, referrals, and partnerships." },
          { term: "Customer Retention", def: "Keeping existing customers engaged and active.", ex: "Monthly active users returning to book more events." },
          { term: "Churn", def: "Rate at which customers stop using your product.", ex: "5% monthly churn = losing 5% of users each month." },
          { term: "GTM", def: "Go-To-Market strategy for launching products.", ex: "UNI's GTM: influencer partnerships → viral growth → enterprise." },
          { term: "PMF", def: "Product-Market Fit; when your product satisfies market demand.", ex: "Strong PMF = users can't live without your product." }
        ]
      },
      { 
        id: "l2d", 
        type: "vocab", 
        title: "Fundraising Stages", 
        terms: [
          { term: "Pre-Seed", def: "Earliest funding stage for MVP and initial traction.", ex: "$100k-$500k from angels, friends & family to build prototype." },
          { term: "Seed", def: "First institutional round for product-market fit.", ex: "$500k-$3M from seed VCs to prove business model works." },
          { term: "Series A", def: "Scale proven business model with clear metrics.", ex: "$3M-$15M to hire team, expand market, optimize unit economics." },
          { term: "Series B", def: "Accelerate growth in proven markets.", ex: "$15M-$50M to expand geographically, add product lines." },
          { term: "Series C+", def: "Late-stage growth, acquisition, or pre-IPO preparation.", ex: "$50M+ for international expansion, strategic acquisitions." },
          { term: "IPO", def: "Initial Public Offering; company goes public on stock exchange.", ex: "Trade publicly, raise capital from public markets, liquidity for investors." },
          { term: "Bridge Round", def: "Short-term funding between major rounds.", ex: "$500k bridge to extend runway before Series A closes." },
          { term: "Down Round", def: "Fundraising at lower valuation than previous round.", ex: "Series B at $20M after Series A at $30M valuation." },
        ]
      },
      { id: "l3", type: "video", title: "Watch: Communicating Like a Founder", yt: "https://www.youtube.com/embed/Ni5vQ2P7Y2g" },
      { id: "l3b", type: "notepad", title: "Personal Notes & Insights", placeholder: "Jot down key insights, questions, or ideas as you learn..." },
      { id: "l3c", type: "help", title: "Ask Claude for Help", placeholder: "Ask me anything about startup concepts, strategies, or get clarification on any topic..." },
      { id: "l3d", type: "answers", title: "My Exam Answers", placeholder: "Review all your past exam responses and scores..." },
      { 
        id: "l4", 
        type: "quiz", 
        title: "Checkpoint Quiz", 
        qs: [
          { q: "If burn is $80k and cash is $560k, runway is…", options: ["7 months","8 months","6 months"], a: 1 },
          { q: "GM 70% on $200 revenue means COGS is…", options: ["$60","$140","$70"], a: 0 },
          { q: "Best LTV/CAC ratio below?", options: ["LTV $30 / CAC $15","LTV $90 / CAC $9","LTV $45 / CAC $15"], a: 1 },
          { q: "$5k ad spend produced $18k revenue. ROAS is…", options: ["2.6x","3.6x","4.6x"], a: 1 },
          { q: "A good North Star for UNI is…", options: ["Monthly site visits","Weekly IRL actions per user","Total impressions"], a: 1 }
        ]
      },
      { 
        id: "l5", 
        type: "vocab", 
        title: "Your Concepts", 
        terms: [
          {
            term: "Profitability Equilibrium",
            original: true,
            def: "Point where marginal revenue reliably covers marginal cost + growth spend.",
            ex: "Ads + subs mix yields steady >80% GM; scale while staying at or above equilibrium.",
          },
          { term: "Connective Ads", original: true, def: "Ad units that bridge intent to IRL action with closed-loop ROAS.", ex: "UNI places a sponsored event in your ranked feed; tap → ticket → attendance signal." },
          { term: "Social DNA", original: true, def: "First‑party behavior graph of taste, timing, tribe.", ex: "Patterns across venues, friends, time-of-day predict next best IRL move." },
        ]
      },
      { 
        id: "l6", 
        type: "exam", 
        title: "Written Exam: Vocabulary & Communication", 
        prompts: [
          { p: "Define Profitability Equilibrium and apply it to a consumer app with subs + affiliate revenue.", weight: 0.15 },
          { p: "Contrast TAM vs SOM, then size SOM for UNI in one city with your assumptions.", weight: 0.15 },
          { p: "Explain LTV/CAC to a non-technical cofounder in 3 sentences or fewer.", weight: 0.1 },
          { p: "Walk through the fundraising journey from Pre-Seed to Series A for a B2B SaaS startup. What metrics would investors want to see at each stage?", weight: 0.2 },
          { p: "Your startup has 30% monthly churn but strong customer acquisition. Diagnose the problem and propose 3 specific solutions.", weight: 0.15 },
          { p: "Compare marketplace vs vertical SaaS business models. Which would you choose for a food delivery startup and why?", weight: 0.15 },
          { p: "You have $500k ARR but burn is $200k/month. Calculate runway and explain your next 6-month strategy.", weight: 0.1 },
        ], 
        rubric: {
          criteria: [
            { name: "Accuracy", weight: 40 },
            { name: "Clarity", weight: 25 },
            { name: "Application", weight: 25 },
            { name: "Strategic Thinking", weight: 10 },
          ], 
          passing: 75,
        }
      },
      { 
        id: "l7", 
        type: "exam", 
        title: "Capstone: Founder Strategy Challenge", 
        prompts: [
          { p: "You're launching a B2B2C marketplace connecting fitness instructors with corporate wellness programs. Design your GTM strategy including target customer, wedge approach, and first 12 months.", weight: 0.3 },
          { p: "Your startup hit PMF at $2M ARR but growth is slowing. Churn is 5% monthly, CAC is $400, LTV is $2000. Analyze the situation and create a turnaround plan.", weight: 0.25 },
          { p: "A competitor with 10x your funding just launched. They're copying your features and undercutting prices. What's your defensive strategy? Consider moats, differentiation, and competitive positioning.", weight: 0.25 },
          { p: "Design a fundraising strategy: You need $5M to expand internationally. Current metrics: $800k ARR, 15% MoM growth, 90% gross margins, 18-month runway. Which round type, what valuation range, and key investor asks?", weight: 0.2 },
        ], 
        rubric: {
          criteria: [
            { name: "Strategic Vision", weight: 30 },
            { name: "Practical Execution", weight: 25 },
            { name: "Financial Understanding", weight: 20 },
            { name: "Market Knowledge", weight: 15 },
            { name: "Communication", weight: 10 },
          ], 
          passing: 80,
        }
      },
    ],
  },
];

function AuthGate({ onAuthed }){
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = useCallback(async () => {
    setErr("");
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const users = storage.get("fu_users", {});
    if (mode === "signup") {
      if (!email || !pw) {
        setErr("Enter email & password");
        setLoading(false);
        return;
      }
      if (users[email]) {
        setErr("Account exists. Sign in.");
        setLoading(false);
        return;
      }
      users[email] = { id: uid(), email, pw: hash(pw), createdAt: Date.now() };
      storage.set("fu_users", users);
      storage.set("fu_session", users[email]);
      onAuthed(users[email]);
    } else {
      const u = users[email];
      if (!u || u.pw !== hash(pw)) {
        setErr("Invalid credentials");
        setLoading(false);
        return;
      }
      storage.set("fu_session", u);
      onAuthed(u);
    }
    setLoading(false);
  }, [mode, email, pw, onAuthed]);

  return (
    <div className="container" style={{ padding: '20px 16px' }}>
      <style>{css}</style>
      <div className="hero fade-in">
        <div className="container">
          <div className="badge pulse-hover"><span className="dot"/> Founders University</div>
          <div className="h1">Level up your founder game</div>
          <p className="sub">A Duolingo‑style path for startup mastery. Vocab, videos, drills, and weekly exams with AI feedback.</p>
        </div>
      </div>
      <div className="grid-2 auth-grid slide-in" style={{ marginTop: 24 }}>
        <div className="card">
          <div className="label">Email</div>
          <input 
            className="input" 
            placeholder="you@domain.com" 
            value={email} 
            onChange={e=>setEmail(e.target.value)}
            disabled={loading}
          />
          <div className="label" style={{ marginTop: 12 }}>Password</div>
          <input 
            type="password" 
            className="input" 
            placeholder="••••••••" 
            value={pw} 
            onChange={e=>setPw(e.target.value)}
            disabled={loading}
            onKeyPress={e => e.key === 'Enter' && submit()}
          />
          {err && <div style={{color: palette.bad, marginTop: 10, fontSize: 13}}>{err}</div>}
          <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
            <button 
              className={`btn primary ${loading ? 'loading-shimmer' : ''}`} 
              onClick={submit}
              disabled={loading}
            >
              {loading ? 'Loading...' : (mode === 'signup' ? 'Create account' : 'Sign in')}
            </button>
            <button 
              className="btn ghost" 
              onClick={()=>setMode(mode==='signup'?'signin':'signup')}
              disabled={loading}
            >
              {mode==='signup' ? 'Have account? Sign in' : 'New? Create account'}
            </button>
          </div>
          <p style={{color: palette.muted, fontSize: 12, marginTop: 10}}>Demo auth stores credentials locally. Swap for Supabase/Clerk in prod.</p>
        </div>
        <div className="card">
          <div className="badge">Module 1</div>
          <h3 style={{margin:'8px 0 6px'}}>Vocabulary & Communication</h3>
          <p className="sub">Learn the language of building: runway, burn, LTV/CAC, ROAS, value proposition, client relations — and your originals like <b>Profitability Equilibrium</b> and <b>Connective Ads</b>.</p>
          <div className="kpi" style={{marginTop: 12}}>
            <div className="item pulse-hover"><div className="k">2–5 min</div><div className="l">per lesson</div></div>
            <div className="item pulse-hover"><div className="k">Weekly</div><div className="l">AI exam</div></div>
            <div className="item pulse-hover"><div className="k">XP</div><div className="l">& streaks</div></div>
            <div className="item pulse-hover"><div className="k">Badges</div><div className="l">for milestones</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function useSession(){
  const [user, setUser] = useState(() => storage.get("fu_session", null));
  
  useEffect(() => { 
    if (user) storage.set("fu_session", user); 
  }, [user]);
  
  return { user, setUser };
}

function useProgress(user){
  const key = user ? `fu_progress_${user.id}` : null;
  const [progress, setProgress] = useState(() => key ? storage.get(key, {}) : {});
  
  useEffect(() => { 
    if (key) storage.set(key, progress); 
  }, [key, progress]);
  
  const markDone = useCallback((lessonId, score=100) => {
    setProgress(p => ({ ...p, [lessonId]: { status: "done", score, ts: Date.now() } }));
  }, []);
  
  return { progress, markDone };
}

function useQuizProgress(user) {
  const key = user ? `quiz_progress_${user.id}` : null;
  const [quizProgress, setQuizProgress] = useState(() => key ? storage.get(key, {}) : {});
  
  useEffect(() => {
    if (key) storage.set(key, quizProgress);
  }, [key, quizProgress]);
  
  const saveQuizProgress = useCallback((lessonId, selections) => {
    setQuizProgress(p => ({ ...p, [lessonId]: { selections, savedAt: Date.now() } }));
  }, []);
  
  const clearQuizProgress = useCallback((lessonId) => {
    setQuizProgress(p => {
      const newProgress = { ...p };
      delete newProgress[lessonId];
      return newProgress;
    });
  }, []);
  
  return { quizProgress, saveQuizProgress, clearQuizProgress };
}

const Node = React.memo(({ lesson, progress, quizProgress, onOpen }) => {
  const locked = false;
  const completed = progress[lesson.id]?.status === 'done';
  const hasQuizProgress = lesson.type === 'quiz' && quizProgress[lesson.id] && Object.keys(quizProgress[lesson.id].selections || {}).length > 0;
  
  return (
    <div 
      className={`node gpu-accelerated ${locked ? 'locked' : ''} ${hasQuizProgress && !completed ? 'in-progress' : ''}`} 
      onClick={() => !locked && onOpen(lesson)} 
      style={{ cursor: locked ? 'not-allowed' : 'pointer' }}
    >
      <div className="title">{lesson.title}</div>
      <div className="meta">{lesson.type.toUpperCase()}</div>
      {completed && (
        <div style={{
          position: 'absolute',
          top: 8,
          right: 10,
          fontSize: 12,
          color: palette.good,
          animation: 'fadeInUp 0.5s ease-out'
        }}>
          ✓
        </div>
      )}
      {hasQuizProgress && !completed && (
        <div style={{
          position: 'absolute',
          top: 8,
          right: 10,
          fontSize: 12,
          color: palette.warn,
          animation: 'fadeInUp 0.5s ease-out'
        }}>
          ⚡
        </div>
      )}
    </div>
  );
});

function Flashcards({ lesson, onComplete }){
  const [i, setI] = useState(0);
  const term = lesson.terms[i];
  
  const nextTerm = useCallback(() => {
    setI(Math.min(lesson.terms.length - 1, i + 1));
  }, [i, lesson.terms.length]);
  
  const prevTerm = useCallback(() => {
    setI(Math.max(0, i - 1));
  }, [i]);

  return (
    <div className="card fade-in">
      <div className="badge">Flashcards • {i + 1} of {lesson.terms.length}</div>
      <h3 style={{margin:'8px 0 6px'}}>{lesson.title}</h3>
      
      <div style={{ marginTop: 16 }}>
        <div className="grid-2">
          <div className="card" style={{background:"rgba(255,255,255,.03)"}}>
            <div style={{fontSize:13,color:palette.muted}}>Term</div>
            <div style={{display:'flex',alignItems:'center',gap:10,marginTop:6,flexWrap:'wrap'}}>
              <div style={{fontSize:20,fontWeight:800}}>{term.term}</div>
              {term.original && <span className="badge" style={{color: palette.accent}}>Founder's Original</span>}
            </div>
            <div style={{marginTop:10,whiteSpace:'pre-wrap',lineHeight:1.5}}>{term.def}</div>
          </div>
          <div className="card" style={{background:"rgba(255,255,255,.03)"}}>
            <div style={{fontSize:13,color:palette.muted}}>Example</div>
            <div style={{marginTop:6,whiteSpace:'pre-wrap',lineHeight:1.5}}>{term.ex}</div>
          </div>
        </div>
      </div>
      
      <div style={{display:'flex',gap:10,marginTop:16,flexWrap:'wrap',justifyContent:'center'}}>
        <button className="btn ghost" onClick={prevTerm} disabled={i === 0}>← Previous</button>
        <button className="btn" onClick={nextTerm} disabled={i === lesson.terms.length - 1}>Next →</button>
        {i === lesson.terms.length - 1 && (
          <button className="btn primary pulse-hover" onClick={onComplete}>Complete ✓</button>
        )}
      </div>
    </div>
  );
}

function VideoLesson({ lesson, onComplete }){
  const [watched, setWatched] = useState(false);
  
  return (
    <div className="card fade-in">
      <h3 style={{margin:'8px 0 6px'}}>{lesson.title}</h3>
      <div style={{
        position:'relative',
        paddingTop:'56.25%',
        borderRadius:12,
        overflow:'hidden',
        border:'1px solid var(--ring)',
        marginTop: 16
      }}>
        <iframe 
          src={lesson.yt} 
          title="YouTube" 
          style={{position:'absolute',inset:0,width:'100%',height:'100%'}} 
          allowFullScreen 
          onLoad={() => setTimeout(() => setWatched(true), 3000)}
        />
      </div>
      <div style={{display:'flex',gap:10,marginTop:16,flexWrap:'wrap',alignItems:'center'}}>
        <button 
          className={`btn primary ${watched ? 'pulse-hover' : ''}`} 
          onClick={onComplete}
        >
          {watched ? '✓ Mark Complete' : 'I watched it'}
        </button>
        <span className="badge">💡 Tip: jot down 3 key takeaways</span>
      </div>
    </div>
  );
}

function Notepad({ lesson, onComplete }){
  const [notes, setNotes] = useState(() => storage.get(`notes_${lesson.id}`, ""));
  
  useEffect(() => {
    storage.set(`notes_${lesson.id}`, notes);
  }, [notes, lesson.id]);

  return (
    <div className="card fade-in">
      <div className="badge">Personal Notepad</div>
      <h3 style={{margin:'8px 0 6px'}}>{lesson.title}</h3>
      <p className="sub">Use this space to capture insights, questions, and key takeaways from your learning.</p>
      
      <textarea 
        className="input" 
        style={{
          minHeight:300,
          resize:'vertical',
          lineHeight:1.6,
          fontFamily:'inherit',
          marginTop:16
        }} 
        value={notes} 
        onChange={e => setNotes(e.target.value)} 
        placeholder={lesson.placeholder}
      />
      
      <div style={{fontSize:11, color:palette.muted, marginTop:8}}>
        {notes.length} characters • Auto-saved locally
      </div>
      
      <div style={{display:'flex',gap:10,marginTop:16,justifyContent:'center'}}>
        <button className="btn primary pulse-hover" onClick={onComplete}>
          Mark Complete ✓
        </button>
        <button 
          className="btn ghost" 
          onClick={() => {
            setNotes("");
            storage.set(`notes_${lesson.id}`, "");
          }}
        >
          Clear Notes
        </button>
      </div>
    </div>
  );
}

function HelpChatbot({ lesson, onComplete }){
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const prompt = `You are Claude, an AI assistant helping someone learn startup/founder concepts. The user is working through a Duolingo-style course covering terms like runway, burn, LTV/CAC, ROAS, PMF, fundraising stages, etc.

User question: "${userMessage}"

Provide a helpful, concise response that:
1. Directly answers their question
2. Uses startup terminology appropriately 
3. Gives practical examples when relevant
4. Keeps it conversational and encouraging
5. Maximum 3-4 sentences unless they ask for more detail

Be like a knowledgeable founder mentor, not a textbook.`;

      const response = await callClaudeAPI(prompt, 500);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry, I'm having trouble connecting right now. Try asking again in a moment!" 
      }]);
    }
    
    setLoading(false);
  };

  return (
    <div className="card fade-in">
      <div className="badge">Ask Claude for Help 🤖</div>
      <h3 style={{margin:'8px 0 6px'}}>{lesson.title}</h3>
      <p className="sub">Stuck on a concept? Need clarification? Ask me anything about startups, fundraising, metrics, or strategy!</p>
      
      <div style={{
        height: 300,
        overflowY: 'auto',
        background: 'rgba(255,255,255,.02)',
        borderRadius: 8,
        padding: 12,
        marginTop: 16,
        border: '1px solid var(--ring)'
      }}>
        {messages.length === 0 ? (
          <div style={{color: palette.muted, textAlign: 'center', paddingTop: 100}}>
            Ask me anything! Try "What's the difference between TAM and SOM?" or "How do I calculate runway?"
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} style={{marginBottom: 16}}>
              <div style={{
                fontSize: 12,
                color: palette.muted,
                marginBottom: 4,
                fontWeight: 600
              }}>
                {msg.role === 'user' ? 'You' : 'Claude'}
              </div>
              <div style={{
                background: msg.role === 'user' ? 'rgba(123,92,255,.1)' : 'rgba(255,255,255,.05)',
                padding: 10,
                borderRadius: 8,
                lineHeight: 1.5
              }}>
                {msg.content}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div style={{textAlign: 'center', color: palette.muted}}>
            Claude is thinking...
          </div>
        )}
      </div>
      
      <div style={{display: 'flex', gap: 10, marginTop: 12}}>
        <input
          className="input"
          style={{flex: 1}}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && sendMessage()}
          placeholder="Ask your question..."
          disabled={loading}
        />
        <button 
          className="btn primary" 
          onClick={sendMessage}
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </div>
      
      <div style={{display:'flex',gap:10,marginTop:16,justifyContent:'center'}}>
        <button className="btn primary pulse-hover" onClick={onComplete}>
          Mark Complete ✓
        </button>
      </div>
    </div>
  );
}

function MyAnswers({ lesson, onComplete }){
  const [examAnswers] = useState(() => storage.get("exam_answers", {}));
  const [selectedExam, setSelectedExam] = useState(null);
  
  const examLessons = MODULES[0].lessons.filter(l => l.type === 'exam');
  const hasAnswers = Object.keys(examAnswers).length > 0;

  return (
    <div className="card fade-in">
      <div className="badge">My Exam History 📝</div>
      <h3 style={{margin:'8px 0 6px'}}>{lesson.title}</h3>
      <p className="sub">Review all your past exam responses, scores, and feedback. Track your progress over time.</p>
      
      {!hasAnswers ? (
        <div style={{textAlign:'center', padding:40, color:palette.muted}}>
          <div style={{fontSize:48, marginBottom:16}}>📝</div>
          <div>No exam responses yet!</div>
          <div style={{fontSize:13, marginTop:8}}>Complete some exams to see your answers here.</div>
        </div>
      ) : (
        <div style={{marginTop:16}}>
          <div style={{marginBottom:16}}>
            <div style={{fontSize:13, color:palette.muted, marginBottom:8}}>Select an exam to review:</div>
            <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
              {examLessons.map(exam => {
                const hasData = examAnswers[exam.id];
                return (
                  <button
                    key={exam.id}
                    className={`btn ${selectedExam === exam.id ? 'primary' : 'ghost'}`}
                    onClick={() => setSelectedExam(selectedExam === exam.id ? null : exam.id)}
                    disabled={!hasData}
                    style={{opacity: hasData ? 1 : 0.5}}
                  >
                    {exam.title.replace('Written Exam: ', '').replace('Capstone: ', '')}
                    {hasData && <span style={{marginLeft:6}}>✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedExam && examAnswers[selectedExam] && (
            <div style={{marginTop:16}}>
              {examAnswers[selectedExam].map((attempt, attemptIdx) => (
                <div key={attemptIdx} style={{
                  marginBottom:24, 
                  padding:16, 
                  background:'rgba(255,255,255,.02)', 
                  borderRadius:12,
                  border:'1px solid var(--ring)'
                }}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
                    <div style={{fontWeight:700}}>
                      Attempt {attemptIdx + 1}
                    </div>
                    <div style={{display:'flex', gap:12, alignItems:'center'}}>
                      <div style={{fontSize:12, color:palette.muted}}>
                        {new Date(attempt.timestamp).toLocaleDateString()} at {new Date(attempt.timestamp).toLocaleTimeString()}
                      </div>
                      <div className="badge" style={{
                        color: attempt.score >= 85 ? palette.good : attempt.score >= 70 ? palette.warn : palette.bad
                      }}>
                        {attempt.score}%
                      </div>
                    </div>
                  </div>

                  {attempt.answers.map((answer, qIdx) => {
                    const exam = examLessons.find(e => e.id === selectedExam);
                    const question = exam?.prompts[qIdx];
                    if (!question) return null;
                    
                    return (
                      <div key={qIdx} style={{marginBottom:16}}>
                        <div style={{fontWeight:600, marginBottom:8, fontSize:14}}>
                          Q{qIdx + 1}: {question.p}
                        </div>
                        <div style={{
                          background:'rgba(255,255,255,.03)', 
                          padding:12, 
                          borderRadius:8,
                          whiteSpace:'pre-wrap',
                          lineHeight:1.5,
                          fontSize:14
                        }}>
                          {answer || <span style={{color:palette.muted, fontStyle:'italic'}}>No answer provided</span>}
                        </div>
                        <div style={{fontSize:11, color:palette.muted, marginTop:4}}>
                          {answer.length} characters • {answer.trim().split(/\s+/).length} words
                        </div>
                      </div>
                    );
                  })}

                  {attempt.feedback && (
                    <div style={{marginTop:16, padding:12, background:'rgba(67,230,210,.05)', borderRadius:8, border:`1px solid ${palette.p2}`}}>
                      <div style={{fontWeight:600, marginBottom:8, color:palette.p2}}>AI Feedback:</div>
                      {attempt.feedback.map((fb, fbIdx) => (
                        <div key={fbIdx} style={{fontSize:13, marginBottom:4, lineHeight:1.4}}>
                          {fb}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      <div style={{display:'flex',gap:10,marginTop:16,justifyContent:'center'}}>
        <button className="btn primary pulse-hover" onClick={onComplete}>
          Mark Complete ✓
        </button>
        {hasAnswers && (
          <button 
            className="btn ghost" 
            onClick={() => {
              if (confirm('This will delete ALL your exam history. Are you sure?')) {
                storage.set("exam_answers", {});
                window.location.reload();
              }
            }}
          >
            Clear History
          </button>
        )}
      </div>
    </div>
  );
}

function Quiz({ lesson, onComplete, user }){
  const { quizProgress, saveQuizProgress, clearQuizProgress } = useQuizProgress(user);
  const [sel, setSel] = useState(() => quizProgress[lesson.id]?.selections || {});
  const [score, setScore] = useState(null);
  const [showResults, setShowResults] = useState(false);
  
  useEffect(() => {
    if (Object.keys(sel).length > 0) {
      saveQuizProgress(lesson.id, sel);
    }
  }, [sel, lesson.id, saveQuizProgress]);
  
  const submit = useCallback(() => {
    let s = 0; 
    lesson.qs.forEach((q, qi) => { 
      if (sel[qi] === q.a) s++; 
    });
    const pct = Math.round(100 * s / lesson.qs.length);
    setScore(pct);
    setTimeout(() => setShowResults(true), 500);
    clearQuizProgress(lesson.id);
  }, [sel, lesson.qs, lesson.id, clearQuizProgress]);
  
  const allAnswered = useMemo(() => {
    return lesson.qs.every((_, qi) => sel[qi] !== undefined);
  }, [sel, lesson.qs]);

  const hasSavedProgress = Object.keys(sel).length > 0;

  return (
    <div className="card fade-in">
      <div className="badge">
        Checkpoint Quiz • {Object.keys(sel).length} of {lesson.qs.length} answered
        {hasSavedProgress && score === null && <span style={{marginLeft: 8, color: palette.warn}}>⚡ Saved</span>}
      </div>
      <h3 style={{margin:'8px 0 6px'}}>{lesson.title}</h3>
      
      {hasSavedProgress && score === null && (
        <div style={{
          marginBottom: 16,
          padding: 12,
          background: 'rgba(253,203,110,.1)',
          border: `1px solid ${palette.warn}`,
          borderRadius: 8,
          fontSize: 13
        }}>
          <div style={{fontWeight: 600, color: palette.warn}}>📄 Progress Restored</div>
          <div style={{marginTop: 4}}>Your previous answers have been restored. You can continue where you left off!</div>
        </div>
      )}
      
      {lesson.qs.map((q, qi) => (
        <div key={qi} style={{margin:'16px 0', padding:'12px', background:'rgba(255,255,255,.02)', borderRadius:'8px'}}>
          <div style={{fontWeight:700, marginBottom:8}}>{qi+1}. {q.q}</div>
          <div style={{display:'grid',gap:8}}>
            {q.options.map((opt, oi) => {
              const isSelected = sel[qi] === oi;
              return (
                <label 
                  key={oi} 
                  style={{
                    display:'flex',
                    gap:10,
                    alignItems:'center',
                    padding:'8px',
                    borderRadius:'6px',
                    cursor:'pointer',
                    transition:'all 0.2s ease',
                    backgroundColor: isSelected ? 'rgba(123,92,255,.1)' : 'transparent'
                  }}
                >
                  <input 
                    type="radio" 
                    name={`q${qi}`} 
                    checked={isSelected} 
                    onChange={() => setSel(v => ({...v, [qi]: oi}))}
                    style={{accentColor: palette.p1}}
                  />
                  <span>{opt}</span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
      
      {score == null ? (
        <div style={{display:'flex',gap:10,marginTop:16,justifyContent:'center',flexWrap:'wrap'}}>
          <button 
            className={`btn primary ${allAnswered ? 'pulse-hover' : ''}`} 
            onClick={submit}
            disabled={!allAnswered}
          >
            {allAnswered ? 'Submit Quiz' : `Answer ${lesson.qs.length - Object.keys(sel).length} more`}
          </button>
          {hasSavedProgress && (
            <button 
              className="btn warn" 
              onClick={() => {
                setSel({});
                clearQuizProgress(lesson.id);
              }}
            >
              🗑️ Clear Progress
            </button>
          )}
        </div>
      ) : (
        <div style={{marginTop:16, textAlign:'center'}} className={showResults ? 'fade-in' : ''}>
          <div 
            className="badge" 
            style={{
              color: score >= 80 ? palette.good : score >= 60 ? palette.warn : palette.bad,
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            Score: {score}% • {score >= 80 ? 'Excellent!' : score >= 60 ? 'Good job!' : 'Keep studying!'}
          </div>
          <div style={{display:'flex',gap:10,marginTop:16,justifyContent:'center'}}>
            <button className="btn primary pulse-hover" onClick={() => onComplete(score)}>
              Continue Learning →
            </button>
            {score < 80 && (
              <button className="btn ghost" onClick={() => {setScore(null); setSel({}); setShowResults(false);}}>
                Retry Quiz
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Exam({ lesson, onComplete }){
  const [answers, setAnswers] = useState(lesson.prompts.map(() => ""));
  const [res, setRes] = useState(null);
  const [grading, setGrading] = useState(false);
  const [useAI, setUseAI] = useState(true);

  const gradeWithAI = async () => {
    setGrading(true);
    
    try {
      const examContent = lesson.prompts.map((prompt, i) => 
        `Question ${i+1} (${Math.round(prompt.weight * 100)}% of grade): ${prompt.p}\n\nStudent Answer: ${answers[i]}\n\n`
      ).join('---\n\n');

      const gradingPrompt = `You are grading a startup/founder exam. Be strict and fair.

EXAM: ${lesson.title}
RUBRIC: ${lesson.rubric.criteria.map(c => `${c.name}: ${c.weight}%`).join(', ')}
PASSING: ${lesson.rubric.passing}%

QUESTIONS & ANSWERS:
${examContent}

Grade strictly. Spam/nonsense = 0%. Incomplete = low score. 

Respond ONLY with this exact JSON format:
{
  "overall_score": 85,
  "criteria_scores": {"Accuracy": 80, "Clarity": 90},
  "question_feedback": ["Q1: Good analysis but...", "Q2: Missing key concepts..."],
  "strengths": ["Clear writing", "Good examples"],
  "improvements": ["Study TAM/SOM", "Add more detail"]
}`;

      const response = await callClaudeAPI(gradingPrompt, 2000);
      
      try {
        const gradingResult = JSON.parse(response);
        setRes({
          score: gradingResult.overall_score,
          aiGrading: true,
          criteria: gradingResult.criteria_scores,
          feedback: gradingResult.question_feedback,
          strengths: gradingResult.strengths,
          improvements: gradingResult.improvements
        });
        
        saveExamAnswers(lesson.id, answers, gradingResult.overall_score, gradingResult.question_feedback);
      } catch (parseError) {
        console.error('JSON parse failed:', parseError);
        const lines = response.split('\n').filter(line => line.trim());
        const scoreMatch = response.match(/overall_score["\s]*:\s*(\d+)/i) || response.match(/(\d+)%/);
        const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;
        
        const feedbackLines = lines.filter(line => 
          line.includes('Q1:') || line.includes('Q2:') || 
          line.includes('Question') || line.includes('strengths') || 
          line.includes('improvements')
        );
        
        setRes({
          score: Math.max(0, Math.min(100, score)),
          aiGrading: true,
          feedback: feedbackLines.length > 0 ? feedbackLines : ["AI response format error - please try again"],
          strengths: ["Response received"],
          improvements: ["AI grading format needs fixing"]
        });
        
        saveExamAnswers(lesson.id, answers, score, feedbackLines);
      }
    } catch (error) {
      console.error('AI grading failed:', error);
      await gradeLocally();
    }
    
    setGrading(false);
  };

  const gradeLocally = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const keywordSets = [
      ["equilibrium","marginal","revenue","cost","subs","affiliate","profitability","balance"],
      ["TAM","SOM","assumption","city","population","penetration","market","size","GTM","PMF"],
      ["LTV","CAC","payback","gross margin","simple","lifetime","acquisition","retention","churn"],
      ["pre-seed","seed","series","metrics","investors","fundraising","valuation","runway"]
    ];
    
    let total = 0; 
    let feedback = [];
    
    answers.forEach((a, i) => {
      const keywords = keywordSets[i] || keywordSets[0];
      const found = keywords.reduce((acc, k) => acc + (a.toLowerCase().includes(k.toLowerCase()) ? 1 : 0), 0);
      const completeness = Math.min(100, (found / Math.max(4, keywords.length)) * 100);
      const lengthBonus = a.length > 200 ? 10 : a.length > 100 ? 5 : 0;
      const questionScore = Math.min(100, completeness + lengthBonus);
      
      const weight = lesson.prompts[i]?.weight || (1 / lesson.prompts.length);
      total += questionScore * weight;
      
      feedback.push(`Q${i+1}: ${Math.round(questionScore)}% - Used ${found}/${keywords.length} key concepts`);
    });
    
    const avgLength = answers.reduce((sum, a) => sum + a.length, 0) / answers.length;
    const clarityMultiplier = avgLength > 400 ? 1.1 : avgLength > 200 ? 1.05 : 0.95;
    total = Math.round(total * clarityMultiplier);
    
    setRes({ 
      score: total, 
      feedback, 
      aiGrading: false,
      strengths: ["Completed all questions"],
      improvements: ["Consider using AI grading for detailed feedback"]
    });
  };

  const grade = () => {
    if (useAI) {
      gradeWithAI();
    } else {
      gradeLocally();
    }
  };
  
  const allAnswered = useMemo(() => {
    return answers.every(a => a.trim().length > 50);
  }, [answers]);

  return (
    <div className="card fade-in">
      <div className="badge">Written Exam • {answers.filter(a => a.trim().length > 20).length} of {lesson.prompts.length} answered</div>
      <h3 style={{margin:'8px 0 6px'}}>{lesson.title}</h3>
      
      {lesson.prompts.map((pr, i) => (
        <div key={i} style={{marginTop:16}}>
          <div style={{fontWeight:700, marginBottom:8}}>
            {i+1}. {pr.p}
            <span style={{color:palette.muted, fontWeight:400, fontSize:12, marginLeft:8}}>
              ({Math.round(pr.weight * 100)}% of grade)
            </span>
          </div>
          <textarea 
            className="input" 
            style={{
              minHeight:120,
              resize:'vertical',
              lineHeight:1.5,
              border: answers[i].length > 50 ? `1px solid ${palette.good}` : '1px solid var(--ring)'
            }} 
            value={answers[i]} 
            onChange={e => setAnswers(v => { 
              const x = [...v]; 
              x[i] = e.target.value; 
              return x; 
            })} 
            placeholder="Write your detailed answer here..."
          />
          <div style={{fontSize:11, color:palette.muted, marginTop:4}}>
            {answers[i].length} characters • {answers[i].trim().split(/\s+/).length} words
          </div>
        </div>
      ))}
      
      {!res ? (
        <div style={{display:'flex',gap:10,marginTop:16,justifyContent:'center',flexWrap:'wrap'}}>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
            <input 
              type="checkbox" 
              checked={useAI} 
              onChange={e => setUseAI(e.target.checked)}
              style={{accentColor: palette.p1}}
            />
            <span style={{fontSize:13,color:palette.muted}}>Use AI Grading (Claude API)</span>
          </div>
          <button 
            className={`btn primary ${grading ? 'loading-shimmer' : allAnswered ? 'pulse-hover' : ''}`} 
            onClick={grade}
            disabled={!allAnswered || grading}
          >
            {grading ? (useAI ? 'Claude is grading...' : 'Grading...') : allAnswered ? (useAI ? 'Submit for AI Grading' : 'Submit for Local Grading') : 'Complete all answers first'}
          </button>
        </div>
      ) : (
        <div style={{marginTop:16}} className="fade-in">
          <div 
            className="badge" 
            style={{
              color: res.score >= 85 ? palette.good : res.score >= 70 ? palette.warn : palette.bad,
              padding:'10px 16px',
              fontSize:'16px',
              fontWeight:'bold'
            }}
          >
            Final Score: {res.score}% • {res.score >= 85 ? 'Outstanding!' : res.score >= 70 ? 'Well done!' : 'Keep improving!'}
            {res.aiGrading && <span style={{marginLeft:8,fontSize:12}}>🤖 AI Graded</span>}
          </div>
          
          {res.criteria && (
            <div style={{marginTop:12, padding:'12px', background:'rgba(255,255,255,.02)', borderRadius:'8px'}}>
              <div style={{fontWeight:600, marginBottom:8}}>Rubric Breakdown:</div>
              {Object.entries(res.criteria).map(([criterion, score]) => (
                <div key={criterion} style={{marginBottom:4, fontSize:13}}>
                  <span style={{color: score >= 85 ? palette.good : score >= 70 ? palette.warn : palette.bad}}>
                    {criterion}: {score}%
                  </span>
                </div>
              ))}
            </div>
          )}
          
          <div style={{marginTop:12, padding:'12px', background:'rgba(255,255,255,.02)', borderRadius:'8px'}}>
            <div style={{fontWeight:600, marginBottom:8}}>Detailed Feedback:</div>
            {res.feedback.map((f, idx) => (
              <div key={idx} style={{marginBottom:6, fontSize:13, lineHeight:1.4}}>
                {f}
              </div>
            ))}
          </div>

          {res.strengths && (
            <div style={{marginTop:12, padding:'12px', background:'rgba(29,209,161,.1)', borderRadius:'8px', border:`1px solid ${palette.good}`}}>
              <div style={{fontWeight:600, marginBottom:8, color:palette.good}}>Key Strengths:</div>
              {res.strengths.map((strength, idx) => (
                <div key={idx} style={{fontSize:13, marginBottom:4}}>• {strength}</div>
              ))}
            </div>
          )}

          {res.improvements && (
            <div style={{marginTop:12, padding:'12px', background:'rgba(255,94,167,.1)', borderRadius:'8px', border:`1px solid ${palette.accent}`}}>
              <div style={{fontWeight:600, marginBottom:8, color:palette.accent}}>Areas for Improvement:</div>
              {res.improvements.map((improvement, idx) => (
                <div key={idx} style={{fontSize:13, marginBottom:4}}>• {improvement}</div>
              ))}
            </div>
          )}
          
          <div style={{display:'flex',gap:10,marginTop:16,justifyContent:'center',flexWrap:'wrap'}}>
            <button className="btn primary pulse-hover" onClick={() => onComplete(res.score)}>
              Complete Exam ✓
            </button>
            {res.score < 75 && (
              <button className="btn ghost" onClick={() => {setRes(null); setGrading(false);}}>
                Revise Answers
              </button>
            )}
          </div>
        </div>
      )}
      
      <p style={{color: palette.muted, fontSize: 12, marginTop: 12, textAlign:'center'}}>
        {useAI ? 'AI grading provides detailed rubric-based feedback using Claude API.' : 'Local grading uses keyword matching. Enable AI grading for detailed feedback.'}
      </p>
    </div>
  );
}

function Dashboard({ user, progress, quizProgress, onOpen, onSignOut }){
  const mod = MODULES[0];
  const completed = Object.values(progress).filter(p => p.status === 'done').length;
  const total = mod.lessons.length;
  const pct = Math.round((completed / total) * 100);
  const streak = Math.max(1, Math.floor(completed / 2));
  const xp = completed * 50;
  
  const nextLesson = useMemo(() => {
    return mod.lessons.find(l => !progress[l.id]) || null;
  }, [mod.lessons, progress]);

  return (
    <div className="gpu-accelerated" style={{background: palette.bg, minHeight: '100vh'}}>
      <nav className="nav">
        <div className="container wrap">
          <div className="brand slide-in">
            <span className="dot"/> 
            <span>Founders University</span>
          </div>
          <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap'}}>
            <span className="badge">{user.email}</span>
            <button className="btn ghost pulse-hover" onClick={onSignOut}>Sign out</button>
          </div>
        </div>
      </nav>

      <div className="hero fade-in">
        <div className="container">
          <div className="h1">Your Learning Journey</div>
          <p className="sub">Module 1 • Vocabulary & Communication — {pct}% complete ({completed}/{total} lessons)</p>
          
          <div style={{
            marginTop:16,
            height:8,
            background:'rgba(255,255,255,.1)',
            borderRadius:4,
            overflow:'hidden'
          }}>
            <div style={{
              height:'100%',
              width:`${pct}%`,
              background:`linear-gradient(90deg, ${palette.p1}, ${palette.p2})`,
              transition:'width 0.8s ease-out',
              borderRadius:4
            }}/>
          </div>
          
          <div className="path" style={{marginTop:20}}>
            {mod.lessons.map((lsn, idx) => (
              <div key={lsn.id} style={{animationDelay:`${idx * 0.1}s`}} className="slide-in">
                <Node lesson={lsn} progress={progress} quizProgress={quizProgress} onOpen={onOpen} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{padding:'20px 16px 40px'}}>
        <div className="grid-3 fade-in">
          <div className="card pulse-hover">
            <div className="badge">🔥 Streak</div>
            <div style={{fontSize:24,fontWeight:800,marginTop:8,color:palette.accent}}>
              {streak} day{streak !== 1 ? 's' : ''}
            </div>
            <div className="sub">Keep the momentum! Daily practice builds mastery.</div>
          </div>
          
          <div className="card pulse-hover">
            <div className="badge">✨ XP Points</div>
            <div style={{fontSize:24,fontWeight:800,marginTop:8,color:palette.p2}}>
              {xp.toLocaleString()} XP
            </div>
            <div className="sub">
              {xp >= 500 ? '🏆 Badge unlocked!' : `${500-xp} XP until first badge`}
            </div>
          </div>
          
          <div className="card pulse-hover">
            <div className="badge">🎯 Next Up</div>
            <div style={{fontSize:14,fontWeight:700,marginTop:8,lineHeight:1.3}}>
              {nextLesson ? nextLesson.title : '🎉 Module Complete!'}
            </div>
            <div className="sub">
              {nextLesson 
                ? `${nextLesson.type.charAt(0).toUpperCase() + nextLesson.type.slice(1)} lesson` 
                : 'Ready for Module 2?'
              }
            </div>
          </div>
        </div>
        
        {completed >= 3 && (
          <div className="card fade-in" style={{marginTop:20}}>
            <div className="badge">🏅 Recent Achievements</div>
            <div style={{display:'flex',gap:12,marginTop:12,flexWrap:'wrap'}}>
              {completed >= 3 && (
                <div className="badge" style={{background:palette.p1,color:'white'}}>
                  📚 Vocab Master
                </div>
              )}
              {completed >= 5 && (
                <div className="badge" style={{background:palette.p2,color:'white'}}>
                  🎯 Quiz Champion  
                </div>
              )}
              {xp >= 500 && (
                <div className="badge" style={{background:palette.accent,color:'white'}}>
                  ⭐ Rising Founder
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function App(){
  const [ready, setReady] = useState(false);
  const { user, setUser } = useSession();
  const { progress, markDone } = useProgress(user || {id:"anon"});
  const { quizProgress } = useQuizProgress(user || {id:"anon"});
  const [active, setActive] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => { 
    setReady(true); 
  }, []);

  useEffect(() => {
    if (active) {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }, [active]);

  const openLesson = useCallback((lesson) => {
    setActive(lesson);
  }, []);

  const completeLesson = useCallback((score = 100) => {
    if (!active) return;
    markDone(active.id, score);
    setActive(null);
    setToast(`✅ ${active.title} completed! +50 XP`);
    setTimeout(() => setToast(""), 3000);
  }, [active, markDone]);

  const signOut = useCallback(() => {
    storage.set('fu_session', null);
    setUser(null);
    setActive(null);
  }, [setUser]);

  if (!ready) {
    return (
      <div style={{
        height:'100vh',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        background:palette.bg
      }}>
        <div className="loading-shimmer" style={{
          width:200,
          height:4,
          borderRadius:2
        }}/>
      </div>
    );
  }

  if (!user) {
    return <AuthGate onAuthed={setUser} />;
  }

  const renderLesson = () => {
    if (!active) return null;
    
    const commonProps = {
      lesson: active,
      onComplete: completeLesson,
      user: user
    };
    
    switch(active.type) {
      case 'vocab': return <Flashcards {...commonProps} />;
      case 'video': return <VideoLesson {...commonProps} />;
      case 'notepad': return <Notepad {...commonProps} />;
      case 'help': return <HelpChatbot {...commonProps} />;
      case 'answers': return <MyAnswers {...commonProps} />;
      case 'quiz': return <Quiz {...commonProps} />;
      case 'exam': return <Exam {...commonProps} />;
      default: return null;
    }
  };

  return (
    <div style={{background: palette.bg, minHeight: '100vh'}}>
      <style>{css}</style>
      {!active ? (
        <Dashboard 
          user={user} 
          progress={progress} 
          quizProgress={quizProgress}
          onOpen={openLesson} 
          onSignOut={signOut} 
        />
      ) : (
        <div className="container" style={{padding:'20px 16px'}}>
          <div style={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            marginBottom:16,
            flexWrap:'wrap',
            gap:10
          }} className="fade-in">
            <div className="badge">
              <span className="dot"/> {MODULES[0].title}
            </div>
            <button className="btn ghost pulse-hover" onClick={() => setActive(null)}>
              ← Back to roadmap
            </button>
          </div>
          {renderLesson()}
        </div>
      )}
      {toast && (
        <div className="toast slide-in">
          {toast}
        </div>
      )}
    </div>
  );
}

export default App;
export { App };
