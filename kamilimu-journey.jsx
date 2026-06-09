import { useState, useEffect, useRef } from "react";

const LESSONS = [
  {
    id: 1, emoji: "📄", color: "#DDA0DD",
    title: "Resume Training I",
    session: "Session 1 · Collins Wanjohi",
    content: "Your first KamiLimu session dove straight into the job market. A resume is a 1-2 page tailored document showcasing your best work for a specific opportunity — not a diary of everything you've ever done. Before writing anything, research the organisation's mission, vision, and values, and read the job advert carefully. Your resume should directly address their pain points. The goal is to get you an interview, not the job itself. Collins also walked through the KamiLimu Slack setup, the peer mentor model, and the overall programme structure.",
    summary: "A resume is a marketing document, not a life story. Tailor it, quantify it, and make every line answer: 'Why you?'",
    keyPoints: [
      "Resume = 1-2 pages tailored to the role; CV = full historical record (much longer)",
      "Formats: chronological (solid history), functional (gaps/career change), or combined",
      "Include: title/contact, professional summary, education, experience, skills, certifications",
      "Exclude: marital status, age, gender, photo, religion, primary school details",
      "Quantify achievements: not 'improved performance' but 'reduced load time by 40%'",
      "Use action verbs to open every bullet: designed, built, reduced, led, improved",
      "Add KamiLimu now: 'Accepted as 1 of 40 students into KamiLimu fellowship'",
      "Referees: write 'available on request' — never include personal details",
    ],
  },
  {
    id: 2, emoji: "🧠", color: "#FF6B6B",
    title: "How to Learn",
    session: "Session 2 · Dr. Chao Mbogho",
    content: "Your brain is always under construction! Learning means building new neural connections — every time you practise, synapses strengthen. Sleep is not optional; it's the save button. During sleep your brain consolidates short-term memory into long-term storage. Stress shrinks your learning capacity (cortisol impairs the hippocampus), while curiosity triggers dopamine release and primes your brain to absorb information more effectively. KamiLimu is designed around this science — sessions teach rather than lecture, psychological safety lets you relax while learning, and the peer model, dashboard, and competitions each target a different stage of memory formation.",
    summary: "Your brain learns through focused effort AND diffuse rest. Use both deliberately. Study, then sleep, then recall.",
    keyPoints: [
      "Focused mode = deliberate concentrated attention (chunking, retrieval practice, Pomodoro)",
      "Diffuse mode = relaxed background processing during breaks and sleep — where insights form",
      "Chunking: break big material into bite-sized units; working memory holds ~4 items at once",
      "Retrieval practice: close your notes and recall — even failed attempts strengthen memory",
      "Pomodoro: 25 min focused work → 5 min break, repeat",
      "Play is not a reward for finishing — it IS a learning mechanism (activates diffuse mode)",
      "Sleep is the brain's save button — never skip it before an exam",
      "Curiosity triggers dopamine — staying genuinely interested makes you learn faster",
    ],
  },
  {
    id: 3, emoji: "✉️", color: "#F0A500",
    title: "Resume & Cover Letters",
    session: "Session 3 · Collins Wanjohi",
    content: "Part two of the career writing series went deeper on cover letters and resume quality. A cover letter is not a repeat of your resume — it tells a story. Pick 2-3 skills from your resume and explain them in greater detail, showing impact and linking it to what the organisation needs. Research the company's mission, recent projects, and values, and show how your own work connects to them. Your cover letter reveals your communication style, so every sentence matters. Collins also covered ATS systems — how employers use automated scoring to shortlist before a human ever reads your application.",
    summary: "A cover letter is your one chance to speak directly to the hiring manager. Make it personal, specific, and outcome-focused.",
    keyPoints: [
      "Cover letter structure: header → professional salutation → 2-3 body paragraphs → confident closing",
      "Do not repeat the resume — tell the story behind 2-3 key achievements",
      "Research the company: connect your work to their mission and recent projects",
      "Quantify and qualify: use numbers and timelines to show real impact",
      "Close by reiterating interest in the role and confirming availability for interview",
      "Customise every letter — 'find and replace' letters are instantly spotted by recruiters",
      "No work experience? Use technical projects, clubs, or volunteer work instead",
      "ATS systems score your CV automatically before a human reads it — keyword matching matters",
    ],
  },
  {
    id: 4, emoji: "💻", color: "#4ECDC4",
    title: "Version Control Part 1",
    session: "Session 4 · Dorcas Litunya & Mark Tanui",
    content: "The command line is a text interface to your computer — faster, more powerful, and more precise than clicking with a mouse. On Windows open Command Prompt or PowerShell; on Mac/Linux open Terminal. This session also introduced version control: a system that records changes to files over time so you can review history, undo mistakes, and collaborate without chaos. Without it, projects become a graveyard of files named 'final_FINAL_v2_ACTUALLY_FINAL.docx'. Every change is tracked with a timestamp and author.",
    summary: "The command line gives you direct, precise control. Version control gives your work a time machine. Master both and everything else gets easier.",
    keyPoints: [
      "pwd — show current directory; ls — list contents; ls -l for detailed view",
      "cd folderName — move into folder; cd .. — go up one level",
      "mkdir name — create directory; touch file.txt — create empty file",
      "echo 'text' > file — write to file; echo 'text' >> file — append without overwriting",
      "cp source dest — copy; mv source dest — move or rename; rm -r folder — delete recursively",
      "grep pattern file — search inside files; cat file — display contents",
      "Version control records every change, who made it, and when — full auditable history",
      "GitHub and GitLab add structure: pull requests, code reviews, and issue tracking",
    ],
  },
  {
    id: 5, emoji: "🔁", color: "#45B7D1",
    title: "Version Control Part 2",
    session: "Session 5 · Dorcas Litunya & Mark Tanui",
    content: "With the command line under your belt, this session introduced Git — the distributed version control system created by Linus Torvalds in 2005 for the Linux kernel. 'Distributed' means every contributor has a full copy of the entire history. The core Git workflow is: initialise a repository, stage your changes, commit them with a message. Branching allows isolated feature work — you can try anything without touching the main codebase. The session also covered how to stash work, compare versions with git diff, and undo mistakes safely.",
    summary: "Git is the industry-standard tool for tracking code changes. Learn these commands and you'll never lose work again.",
    keyPoints: [
      "git init — start tracking a folder; git status — see what has changed",
      "git add filename — stage for next commit; git commit -m 'message' — save a snapshot",
      "git log --oneline — compact history; git log --all — full history",
      "git diff branchA branchB — compare two versions side by side",
      "git revert HEAD — undo last commit safely without destroying history",
      "git checkout SHA filename — restore one file to a specific older version",
      "git checkout -b branchName — create and switch to a new branch in one step",
      "git stash — temporarily shelve changes; git stash pop — restore them",
    ],
  },
  {
    id: 6, emoji: "🐙", color: "#96CEB4",
    title: "Git & GitHub Session 3",
    session: "Session 6 · Mark Tanui & Beryl Kanali",
    content: "The final Git session covered the crucial difference between git merge and git rebase, then opened up into the world of open source. Merge concatenates histories and creates a merge commit when branches diverge. Rebase rewrites your local history by replaying your commits on top of the latest remote commits — producing a cleaner linear history. The golden rule: never rebase already-pushed code. Beryl then drew on her experience with PYMC, Astropy, and OpenMRS to explain how open source is funded, governed, and why Africans should be builders, not just consumers.",
    summary: "Merge preserves history, rebase linearises it. Same destination, different path. And open source runs the world — go build something for it.",
    keyPoints: [
      "git merge: run from destination branch; fast-forward when no divergence; merge commit when diverged",
      "git rebase: replays your commits on top of latest remote commits — cleaner linear history",
      "Golden rule: NEVER rebase already-pushed/shared code — it rewrites history others depend on",
      "Forking copies a repo to your GitHub account; pull request sends your changes back upstream",
      "git remote add origin <URL> — link local repo to GitHub",
      "Permissive licenses (MIT) allow commercialisation; copyleft (GPL) requires staying open",
      "Good contributor habits: read the docs, write clear PRs, quality over quantity",
      "Fellowships: Outreachy ($7,000/3 months), Google Summer of Code — structured entry points",
    ],
  },
  {
    id: 7, emoji: "📢", color: "#FFD1DC",
    title: "Storytelling I",
    session: "Session 7 · Dr. Chao Mbogho",
    content: "Storytelling is the act of framing an idea as a narrative to inform, illuminate, and inspire. There is a story, a good story, and a great or transformative story — aim for the third. The brain is wired for stories: emotional engagement starts in the amygdala. That is why you can watch a film until 3 a.m. Master storytelling and public speaking, scholarship writing, pitching, and interviews all improve. Four finalist speeches from KamiLimu Cohort 9 — Amanda, Elaine, Manase, and Bridgette — were analysed in detail. The opening of a speech is a contract: what you promise in the first 60 seconds, the body must keep.",
    summary: "Specificity is the muscle of vividness. Name the thing. Don't describe it — show it. And always keep the promise your opening makes.",
    keyPoints: [
      "Five storytelling skills: Reflection, Note Jotting, Whole and Parts, Writing & Review, Read/Watch/Listen",
      "Heart Test: True story, Yours to tell, Worth working tirelessly on, Meets the theme",
      "3 story tests: Emotive (does it move you?), Relevant (can they see themselves?), Timely (speaks to now?)",
      "Five Sticky Notes arc: Heart → Challenge → Things to Describe → Resolution → Call to Action",
      "Four-part opening: Hook → Context → Personal Stake → Promise (this is a contract)",
      "The Echo Principle: plant an image in the opening; the ending calls it back — speech becomes a circle",
      "Specificity beats adjectives: not 'an old radio' but 'a Sony CFS-715S with two big knobs...'",
      "Ethical boundaries (The Moth): never use another person's identity as a punchline or prop",
    ],
  },
  {
    id: 8, emoji: "⏰", color: "#87CEEB",
    title: "Work & Time Management",
    session: "Session 8 · Lynet Kosgey & Bridgette Musango",
    content: "You always have time. After sleep (8h), essentials (4h), and classes (8h), 4 hours remain daily — 28 recoverable hours per week. Time management is really priority management: focus on what matters, not what is loud. The Eisenhower Matrix gives you a framework to categorise every task by importance and urgency. Before you can prioritise tasks, define your life mission across 8 dimensions: health, spirituality, finances, family, career, education, social, and personal development. Use a calendar as your single source of truth — if it is not on your calendar, it does not exist.",
    summary: "You don't lack time — you lack clarity on priorities. Put your Big Rocks in first or they will never fit.",
    keyPoints: [
      "Eisenhower Matrix: Q1 (urgent+important) = Do now; Q2 (important, not urgent) = Schedule; Q3 = Delegate; Q4 = Delete",
      "Spend more time in Q2 — it naturally shrinks Q4 without fighting distractions",
      "Time blocking: use a calendar as your single source of truth for all commitments",
      "Define Done: write the exact criteria for 'finished' before starting — prevents Parkinson's Law",
      "2 Minute Rule: if it takes less than 2 minutes, do it NOW — don't add it to a list",
      "Stack Time Rule: set a max stuck-time (e.g. 20 min), then ask for help — no guilt",
      "Draft Zero: start ugly — a bad draft beats a blank page every time",
      "Weekly review: track KPIs for monthly goals; notice drift and course-correct",
    ],
  },
  {
    id: 9, emoji: "🏢", color: "#98D8C8",
    title: "ICT Track Orientation",
    session: "Session 9 · Beryl Kanali & KamiLimu Committee",
    content: "The first official ICT session oriented all mentees to the four technical tracks: Data Science (16 students), Cyber Security (10), Software Engineering (8), and Cloud (6). Teams of 3-4 are formed by mentors — not self-selected — based on experience level, gender balance, and complementary strengths. All mentees must build, deploy, and host a working product regardless of whether they reach the finals. GitHub is the primary tool for hosting projects and marking submissions. Responsible AI principles are integrated across all ICT tracks.",
    summary: "The ICT competition is where everything converges: your code, your pitch, your teamwork, your product. Build something real. Deploy it. Be proud of it.",
    keyPoints: [
      "4 tracks: Data Science (16), Cyber Security (10), Software Engineering (8), Cloud (6)",
      "Teams formed by mentors — criteria: experience level, gender balance, complementary skills",
      "Track size does NOT give advantage — a small track can dominate the finals",
      "ALL teams must deploy a working product to a portfolio, even without reaching finals",
      "Industry partners provide case study problems, tools/API access, and may serve as judges",
      "At least 1-2 industry visits per mentee; Savannah Informatics visit planned for all tracks",
      "GitHub hosts all sessions, notebooks, and project submissions under 'ICT Tracks 2026'",
      "LLM-generated code has licensing implications — understand before using in open-source projects",
    ],
  },
  {
    id: 10, emoji: "🌿", color: "#FFEAA7",
    title: "Contributing to Open Source",
    session: "Session 10 · Mark Tanui & Beryl Kanali",
    content: "This session marked the conclusion of the Git series, with a deep dive into contributing to real open source projects. Mark led hands-on GitHub workflows — forking, cloning, pushing, and creating pull requests. Beryl drew on her work across PYMC, Astropy, and OpenMRS to explain how open source is funded and governed. The PEPFAR/OpenMRS funding cuts under the Trump administration nearly returned African hospitals to pen-and-paper systems — a stark reminder of why digital sovereignty matters. Africans should be builders of open source technology, not just consumers.",
    summary: "Contributing to open source is less about raw technical skill and more about consistency, communication, and community. Build in public. Quality over quantity.",
    keyPoints: [
      "Fork a repo → clone it → make changes → push → open pull request back to upstream",
      "git remote add origin <URL> — link local repo to GitHub upstream",
      "Set git config pull.rebase true for clean linear history when pulling shared repos",
      "Permissive licenses (MIT): full use including commercialisation. Copyleft (GPL): must stay open",
      "Funding sources: grants (Google, NSF), foundations (Gates, CZI), Outreachy, Google Summer of Code",
      "Good contributor: read the docs, write clear PR descriptions, ask questions openly, be patient",
      "Start with: OSCA, Oscar Nairobi, Masakhane (NLP), Deep Learning Indaba (data science)",
      "Class goal: contribute to at least one open source project before the end of the 8-month cohort",
    ],
  },
  {
    id: 11, emoji: "💡", color: "#F9C784",
    title: "Principles of Innovation",
    session: "Session 11 · Beryl Kanali",
    content: "Innovation is the practical implementation of ideas that results in the introduction of new, or improvement of existing, goods and services. Two core types: Incremental (improving what exists — easier to adopt) and Radical (changes market behaviour — riskier, slower to penetrate). Pioneers of radical innovation bear the highest costs and risks, but later entrants learn from their mistakes. M-Pesa is the canonical African radical innovation. Creativity asks 'What could be?' — Innovation asks 'What works for people?' Without implementation, an idea stays a creative thought.",
    summary: "Spend more time sitting with the problem than you think you need to. A clear, well-understood problem makes finding and building the solution far easier.",
    keyPoints: [
      "Innovation = idea + implementation + value creation — without all three, it stays a thought",
      "Incremental: improves what exists (easier adoption); Radical: changes market behaviour (riskier)",
      "Good innovation has: Need, Value, Feasibility, Adoption, Scalability, and Responsibility",
      "Demand Pull: a real need pulls for a solution; Technology Push: new capability forces new uses",
      "Opportunity Sweet Spot: Need + Capability + Commitment + Context + Learning + Team",
      "Start from the problem — work toward the solution, never the reverse",
      "Innovation impact can be positive or negative, intended or unintended — measure both",
      "Not every innovation must be a startup: nonprofit, open source, B2C, and one-off all count",
    ],
  },
  {
    id: 12, emoji: "🎤", color: "#E8C5E5",
    title: "Stage Presence & Speaking",
    session: "Session 12 · KamiLimu Workshop",
    content: "Technical excellence in computing must be matched by the ability to explain, pitch, and inspire. The winning team at a hackathon often isn't the one with the best code — it's the team with the best pitch. Body language accounts for 55% of communication impact, vocal delivery 38%, and actual words only 7% (Mehrabian formula). Power gestures that work: open palms (honesty), steeple hands (confidence), wide stance (stability). Reframe nervousness: 'I'm nervous' → 'I'm excited'. The P.R.E.P. framework gives you a rescue structure for any impromptu moment.",
    summary: "Your body communicates before you say a word. Silence is not weakness — a deliberate pause signals confidence and gives the audience time to absorb your message.",
    keyPoints: [
      "Mehrabian formula: 7% words, 38% vocal delivery, 55% body language — your presence speaks first",
      "Triangle technique: scan left → centre → right every 3-5 seconds so everyone feels included",
      "Stage zones: Power Zone (centre, key messages), Connection Zone (near audience), Transition Zone (sides)",
      "Voice modulation: vary volume and pace; drop to a whisper for impact; Power Pause (2-3 sec) = confidence",
      "P.R.E.P.: Point → Reason → Example → Point (restated) — structured in 30-60 seconds",
      "Confidence hacks: Power Pose (2 min before), Box Breathing (4-4-4-4), memorise your cold open",
      "Lessons: Jobs (one idea per slide), Brené Brown (vulnerability = courage), Obama (master the pause)",
      "Daily challenge: random topic, 10 sec prep, speak 60 sec using P.R.E.P. Record. Repeat 14 days.",
    ],
  },
  {
    id: 13, emoji: "🤔", color: "#B5D5C5",
    title: "Critical Thinking with AI",
    session: "Session 13 · Dr. Chao Mbogho",
    content: "Critical thinking is the art of analysing and evaluating reasoning with a view to improving it (Paul & Elder, 2002). The Paul-Elder framework has three components: Elements of Reasoning (what you reason WITH), Intellectual Standards (how you judge QUALITY), and Intellectual Traits (who you BECOME). Apply it in three phases with AI: BEFORE (clarify your real question), DURING (apply clarity/relevance/honesty standards to the output), and AFTER (correct AI loudly and ask: did I learn or just produce?). AI confidence is a style, not a guarantee of accuracy — hallucinations are especially common with African scholarship.",
    summary: "You are the critical thinker in the loop. AI can draft, summarise, and suggest. Only you can validate, contextualise, and own the work.",
    keyPoints: [
      "Paul-Elder: Elements (purpose, question, assumptions) + Standards (clarity, accuracy, logic) + Traits (humility, integrity)",
      "BEFORE: clarify your real question; decide what AI does NOT touch; ask if this is work you should do yourself",
      "DURING: Clarity (can I restate it?), Relevance (did it stay on topic?), Honesty (are sources real?)",
      "AFTER: correct AI loudly and quickly; ask 'did I learn or just produce?'",
      "AI hallucinations especially common with African scholarship — underrepresented in training data",
      "AI gives the world's average answer; your situation is specific — trust your acquired knowledge first",
      "Bring the substance (your thinking); use AI for the craft (polish, structure, comparison)",
      "KamiLimu never uses AI for: essay reviews, judging, recommendation letters, wellbeing conversations",
    ],
  },
  {
    id: 14, emoji: "🤖", color: "#FFB347",
    title: "Responsible AI for Jobs",
    session: "Session 14 · Collins Wanjohi",
    content: "AI tools are powerful job application assistants — but only if you use them responsibly. Large Language Models are 'stochastic parrots': they predict the next word based on patterns, not understanding. This means they can hallucinate credentials, use outdated company information, or produce dangerously generic content. The golden rule: YOU bring the substance (your experiences, voice, and values) — AI provides the craft (polish, structure, and ATS-optimised language). Always validate AI outputs manually before submitting.",
    summary: "AI is a refinement tool, not an author. You bring the substance — your lived experience, your voice, your truth. AI just polishes the craft.",
    keyPoints: [
      "AI workflow: Before (manual prep) → During (AI refinement) → After (human validation & submission)",
      "Before: manually deconstruct the job advert; research company mission and leadership yourself",
      "During: use AI to refine language, suggest action verbs, structure bullet points",
      "After: validate every claim — AI may hallucinate certifications or use stale company data",
      "ATS formatting: Calibri/Arial 10-12pt, no tables/images/columns, use standard section headings",
      "Prompt framework: 'Act as a technical recruiter. Here is the job advert: [...] Here is my CV: [...]'",
      "Never let AI invent experiences — you must explain every line in an interview",
      "Privacy: remove personal contact details before uploading your CV to any AI platform",
    ],
  },
  {
    id: 15, emoji: "🔬", color: "#C3B1E1",
    title: "Research Skills",
    session: "Session 15 · Dr. Chao Mbogho",
    content: "Research is not just for publishing papers — it's how you back your claims, guide your innovation, and avoid building solutions in the dark. The research funnel starts broad (global problem) and narrows to a specific, validated, local problem statement. Good research uses peer-reviewed sources from ACM and IEEE, checks for a DOI, and targets Q1/Q2 journals. Innovation documents should follow the same academic framework: introduction, literature review, methods, results, and discussion. Never cite a paper you've only read the abstract of.",
    summary: "Research is an engine for credible innovation. A specific, evidence-backed problem statement is irrefutable — and that makes your solution unstoppable.",
    keyPoints: [
      "Research funnel: start global → narrow to local context → identify the specific gap",
      "Triangulate your personal experience with existing data to validate your problem statement",
      "Google Scholar tips: 'exact phrases' in quotes; OR for alternatives; Cited By for recent work",
      "Green flags: ACM, IEEE sources; presence of a DOI; Q1/Q2 journal ranking",
      "Red flags: Wikipedia, personal blogs, social media, AI-generated text, arXiv preprints",
      "5-minute scan: title → abstract → conclusion → figures → headings before reading fully",
      "Problem statements must be specific and narrow — backed by evidence, not opinions",
      "Innovation doc framework: Introduction → Literature Review → Methods → Results → Discussion",
    ],
  },
  {
    id: 16, emoji: "🐍", color: "#A8E6CF",
    title: "Intro to Python",
    session: "Session 16 · Ronnie Leon & Catherine Wanjiru (Data Science Track)",
    content: "Python is a dynamically typed, human-readable language that dominates data science, machine learning, and AI. Unlike statically typed languages like C, Python's interpreter handles data types automatically. It's used by Google, Microsoft, Safaricom, and Equity Bank for fraud detection, traffic visualisation, and food security tracking. The Data Science track covers Python fundamentals, SQL, data manipulation with pandas, visualisation with Matplotlib/Seaborn, statistics, and machine learning algorithms including decision trees, random forests, and K-means clustering.",
    summary: "Python is the language of data. Learn its fundamentals well and the rest of the data science stack will follow naturally.",
    keyPoints: [
      "Variables: use underscore_naming; large numbers: 1_000_000 for readability",
      "Data types: int, float, str, bool — collections: list [], tuple (), dict {key: value}",
      "Lists are mutable (.append()); tuples are immutable; dicts store key-value pairs",
      "Loops: for item in list; for key, value in dict.items() — no manual counters needed",
      "F-strings: f'Density: {pop/area:.2f}' — standard for dynamic string formatting",
      "Control flow: if / elif / else; type casting: int(input()) to use user input in maths",
      "Key built-ins: len(), max(), sum(), round(), print() — no imports needed",
      "Arithmetic operators: // (floor division), % (modulo), ** (exponentiation)",
    ],
  },
  {
    id: 17, emoji: "📊", color: "#FF8B94",
    title: "Data Science ICT Training 2",
    session: "Session 17 · Ronnie Leon & Catherine Wanjiru (Data Science Track)",
    content: "The second data science session went deeper into the full curriculum roadmap and Python fundamentals through live coding. The track covers: Python basics → SQL (BigQuery, MongoDB) → data manipulation (pandas) → visualisation (Matplotlib, Seaborn) → statistics → machine learning (supervised, unsupervised, reinforcement learning). Algorithms covered include logistic regression, decision trees, random forests, and K-means clustering. Feature engineering is critical for model performance. Evaluation metrics include F1 score, recall, precision, and RMSE. Tools: VS Code + Jupyter notebooks, or Google Colab.",
    summary: "Data science is a pipeline: clean data in, meaningful insight out. Python is your Swiss Army knife for every step of that journey.",
    keyPoints: [
      "Full track roadmap: Python → SQL → pandas → Matplotlib/Seaborn → statistics → ML algorithms",
      "Use Miniconda (lighter than Anaconda) + Jupyter notebooks inside VS Code as your environment",
      "pandas: data cleaning, preprocessing, handling missing data; key library throughout the track",
      "Machine learning types: supervised (labelled data), unsupervised (clustering), reinforcement (rewards)",
      "Algorithms: logistic regression, decision trees, random forests, K-means, hierarchical clustering",
      "Evaluation metrics: F1 score, recall, precision, RMSE — choose based on the problem type",
      "Feature engineering is critical — the quality of your features determines model performance",
      "Teams will build a working UI for their data science product to present to judges",
    ],
  },
];

const STORAGE_KEY = "kl_journey_v4";
function getVisited() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
}
function markVisited(id) {
  const v = getVisited();
  if (!v.includes(id)) { v.push(id); localStorage.setItem(STORAGE_KEY, JSON.stringify(v)); }
}
function clearVisited() {
  localStorage.removeItem(STORAGE_KEY);
}

function buildNodes(count) {
  const nodes = [];
  const cols = [70, 195, 320, 445, 570];
  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / 5);
    const col = i % 5;
    const x = row % 2 === 0 ? cols[col] : cols[4 - col];
    const y = 510 - row * 95 + (col % 2 === 0 ? 0 : -28);
    nodes.push({ x: Math.min(620, Math.max(50, x)), y: Math.max(40, y) });
  }
  return nodes;
}
const NODES = buildNodes(LESSONS.length);

// ── Confetti ──────────────────────────────────────────────────────────────────
function Confetti({ active }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const pieces = useRef([]);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#FF6B6B","#FFD700","#4ECDC4","#DDA0DD","#96CEB4","#FF8B94","#F9C784","#87CEEB","#FFB347","#A8E6CF"];
    pieces.current = Array.from({ length: 180 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      w: Math.random() * 12 + 6,
      h: Math.random() * 7 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 3,
      vy: Math.random() * 4 + 2,
      vr: (Math.random() - 0.5) * 0.15,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.current.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      pieces.current = pieces.current.filter(p => p.y < canvas.height + 20);
      if (pieces.current.length > 0) {
        animRef.current = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    animRef.current = requestAnimationFrame(draw);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [active]);

  if (!active) return null;
  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      pointerEvents: "none", zIndex: 9999
    }}/>
  );
}

// ── Completion Overlay ────────────────────────────────────────────────────────
function CompletionOverlay({ onReset }) {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 100); }, []);
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,.65)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, fontFamily: "'Comic Sans MS','Chalkboard SE',cursive",
      opacity: show ? 1 : 0, transition: "opacity .4s"
    }}>
      <div style={{
        background: "white", borderRadius: 28, padding: "40px 36px", textAlign: "center",
        maxWidth: 480, width: "90%", border: "5px solid #FFD700",
        boxShadow: "0 8px 0 #CC6600, 0 16px 40px rgba(0,0,0,.4)",
        transform: show ? "scale(1)" : "scale(.85)", transition: "transform .4s"
      }}>
        <div style={{ fontSize: 64, marginBottom: 8 }}>🏆</div>
        <h1 style={{ fontSize: 28, color: "#5D3A00", margin: "0 0 8px", lineHeight: 1.1 }}>
          Journey Complete!
        </h1>
        <p style={{ fontSize: 14, color: "#555", lineHeight: 1.6, margin: "0 0 10px" }}>
          You've explored all <strong>17 KamiLimu sessions</strong>.<br/>
          You're not just a student — you're a builder. 🚀
        </p>
        <div style={{
          background: "#FFF9E6", border: "3px dashed #FFD700", borderRadius: 16,
          padding: "12px 18px", marginBottom: 24, fontSize: 13, color: "#7D5A00", fontStyle: "italic"
        }}>
          "More sessions are coming — the journey isn't over yet. Stay curious, stay building!"
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <div style={{
            background: "#E0E0E0", border: "3px solid #BDBDBD", borderRadius: 14,
            padding: "11px 22px", fontSize: 13, fontWeight: 900, color: "#888",
            boxShadow: "0 3px 0 #BDBDBD", cursor: "not-allowed", userSelect: "none"
          }}>
            🔒 Next Level — Coming Soon
          </div>
          <button onClick={onReset} style={{
            background: "#FF6B6B", border: "3px solid #CC0000", borderRadius: 14,
            padding: "11px 22px", fontSize: 13, fontWeight: 900, color: "white",
            boxShadow: "0 4px 0 #990000", cursor: "pointer", fontFamily: "inherit"
          }}>
            🔄 Restart Journey
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Map Page ──────────────────────────────────────────────────────────────────
function MapPage({ onSelectLesson, visited, onReset }) {
  const [hovered, setHovered] = useState(null);
  const total = LESSONS.length;
  const allDone = visited.length === total;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#87CEEB", fontFamily: "'Comic Sans MS','Chalkboard SE',cursive" }}>
      <aside style={{
        width: 215, flexShrink: 0,
        background: "linear-gradient(180deg,#4CAF50 0%,#2E7D32 100%)",
        borderRight: "4px solid #1B5E20",
        padding: "14px 10px", display: "flex", flexDirection: "column", gap: 4,
        overflowY: "auto", boxShadow: "4px 0 12px rgba(0,0,0,.2)"
      }}>
        <div style={{ background:"#FFD700", borderRadius:14, padding:"8px 10px", border:"3px solid #FF8C00", textAlign:"center", marginBottom:8, boxShadow:"0 4px 0 #CC6600", flexShrink:0 }}>
          <div style={{ fontSize:9, fontWeight:900, color:"#5D3A00", textTransform:"uppercase", letterSpacing:1 }}>KamiLimu Journey</div>
          <div style={{ fontSize:22, fontWeight:900, color:"#5D3A00" }}>{visited.length}/{total}</div>
          <div style={{ fontSize:9, color:"#7D5A00" }}>{allDone ? "🎉 All done!" : "sessions explored!"}</div>
        </div>
        <div style={{ background:"#1B5E20", borderRadius:20, height:12, border:"3px solid #FF8C00", marginBottom:6, overflow:"hidden", flexShrink:0 }}>
          <div style={{ background:"linear-gradient(90deg,#FFD700,#FF8C00)", height:"100%", borderRadius:20, width:`${(visited.length/total)*100}%`, transition:"width 0.5s" }}/>
        </div>
        {LESSONS.map((l) => {
          const done = visited.includes(l.id);
          return (
            <button key={l.id} onClick={() => onSelectLesson(l.id)} style={{
              background: done ? l.color : "rgba(255,255,255,.15)",
              border: `2px solid ${done ? "white" : "rgba(255,255,255,.25)"}`,
              borderRadius:9, cursor:"pointer", textAlign:"left",
              padding:"5px 8px", display:"flex", alignItems:"center", gap:6,
              color: done ? "#1a1a1a" : "rgba(255,255,255,.85)",
              fontSize:9.5, fontWeight:700, transition:"transform .15s",
              boxShadow: done ? "0 2px 0 rgba(0,0,0,.25)" : "none", fontFamily:"inherit"
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <span style={{ fontSize:13 }}>{done ? "✅" : l.emoji}</span>
              <span style={{ lineHeight:1.2 }}>{l.id}. {l.title}</span>
            </button>
          );
        })}
        {/* Reset button at bottom of sidebar */}
        <button onClick={onReset} style={{
          marginTop:8, background:"rgba(255,255,255,.15)", border:"2px dashed rgba(255,255,255,.4)",
          borderRadius:9, padding:"7px 8px", cursor:"pointer", color:"rgba(255,255,255,.7)",
          fontSize:9.5, fontWeight:700, fontFamily:"inherit", flexShrink:0
        }}>🔄 Reset Journey</button>
      </aside>

      <main style={{ flex:1, padding:"16px 10px", display:"flex", flexDirection:"column", alignItems:"center", position:"relative", overflow:"hidden" }}>
        {[[50,22,1],[370,12,1],[610,38,.55],[180,8,.55],[490,24,.7]].map(([x,y,s],i) => (
          <svg key={i} style={{ position:"absolute", top:y, left:x, opacity:0.4, pointerEvents:"none" }} width={s*80} height={s*45} viewBox="0 0 80 45">
            <circle cx="20" cy="25" r="15" fill="white"/><circle cx="38" cy="18" r="20" fill="white"/>
            <circle cx="58" cy="25" r="14" fill="white"/><circle cx="28" cy="33" r="13" fill="white"/><circle cx="48" cy="33" r="12" fill="white"/>
          </svg>
        ))}

        <div style={{ textAlign:"center", marginBottom:12, position:"relative", zIndex:2 }}>
          <div style={{ display:"inline-block", background:"#FF6B6B", border:"4px solid #CC0000", borderRadius:18, padding:"4px 16px", color:"white", fontSize:9, fontWeight:900, letterSpacing:2, boxShadow:"0 4px 0 #990000", marginBottom:4, textTransform:"uppercase" }}>
            KamiLimu Cohort 10 · 2026
          </div>
          <h1 style={{ fontFamily:"inherit", fontSize:28, margin:0, color:"white", lineHeight:1.1, textShadow:"3px 3px 0 #1B5E20,-1px -1px 0 #1B5E20,1px -1px 0 #1B5E20,-1px 1px 0 #1B5E20" }}>
            🗺️ The Learning Map
          </h1>
          <p style={{ color:"white", textShadow:"1px 1px 0 #1B5E20", marginTop:4, fontSize:11 }}>
            17 sessions in order · Click any node!
          </p>
        </div>

        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:80, background:"linear-gradient(180deg,#66BB6A 0%,#2E7D32 100%)", borderTop:"4px solid #1B5E20" }}/>
        {[15,70,500,565,620].map((x,i) => (
          <div key={i} style={{ position:"absolute", bottom:55, left:x, fontSize:26 }}>🌳</div>
        ))}

        <div style={{ position:"relative", width:"100%", maxWidth:700, flex:1 }}>
          <svg viewBox="0 0 680 580" style={{ width:"100%", height:"100%", overflow:"visible", maxHeight:"72vh" }}>
            {NODES.slice(0,-1).map((n,i) => {
              const nx = NODES[i+1];
              const done = visited.includes(i+1) && visited.includes(i+2);
              return <line key={i} x1={n.x} y1={n.y} x2={nx.x} y2={nx.y}
                stroke={done?"#FFD700":"#8BC34A"} strokeWidth={done?7:5}
                strokeDasharray={done?"none":"10 6"} strokeLinecap="round"
                style={{ filter:done?"drop-shadow(0 0 4px #FFD700)":"none" }}
              />;
            })}
            {NODES.map((pos,i) => {
              const lesson = LESSONS[i];
              if (!lesson) return null;
              const done = visited.includes(lesson.id);
              const isHov = hovered === lesson.id;
              const r = isHov ? 30 : 26;
              const labelLeft = i % 5 < 2.5;
              return (
                <g key={i} style={{ cursor:"pointer" }}
                  onClick={() => onSelectLesson(lesson.id)}
                  onMouseEnter={() => setHovered(lesson.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <circle cx={pos.x+3} cy={pos.y+4} r={r} fill="rgba(0,0,0,.18)"/>
                  <circle cx={pos.x} cy={pos.y} r={r}
                    fill={done?lesson.color:"white"} stroke={done?"white":"#CCC"} strokeWidth={done?3.5:2.5}
                    style={{ transition:"r .15s", filter:done?`drop-shadow(0 0 6px ${lesson.color})`:"none" }}
                  />
                  <text x={pos.x} y={pos.y+1} textAnchor="middle" dominantBaseline="middle"
                    fontSize={isHov?"17":"15"} style={{ userSelect:"none" }}>{lesson.emoji}</text>
                  <circle cx={pos.x+18} cy={pos.y-18} r={9} fill={done?"#FFD700":"#555"} stroke="white" strokeWidth="1.5"/>
                  <text x={pos.x+18} y={pos.y-18} textAnchor="middle" dominantBaseline="middle"
                    fontSize="8" fontWeight="900" fill={done?"#5D3A00":"white"} fontFamily="inherit">{lesson.id}</text>
                  <text x={pos.x+(labelLeft?35:-35)} y={pos.y-2}
                    textAnchor={labelLeft?"start":"end"} fontSize="8" fontWeight="900"
                    fill={done?"#1B5E20":"#444"} fontFamily="inherit"
                    stroke="white" strokeWidth="2.5" paintOrder="stroke"
                  >{lesson.title}</text>
                  {isHov && (
                    <g>
                      <rect x={pos.x-52} y={pos.y+32} width={104} height={18} rx={6} fill={lesson.color} stroke="white" strokeWidth="1.5"/>
                      <text x={pos.x} y={pos.y+44} textAnchor="middle" fontSize="7.5" fontWeight="900" fill="white" fontFamily="inherit">
                        {done?"✨ Replay!":"👆 Click me!"}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
            <line x1={NODES[0].x} y1={NODES[0].y+28} x2={NODES[0].x} y2={NODES[0].y} stroke="#FF6B6B" strokeWidth="2.5"/>
            <polygon points={`${NODES[0].x},${NODES[0].y} ${NODES[0].x+20},${NODES[0].y+8} ${NODES[0].x},${NODES[0].y+16}`} fill="#FF6B6B"/>
            <text x={NODES[0].x} y={NODES[0].y+40} textAnchor="middle" fontSize="7.5" fontWeight="900" fill="white" fontFamily="inherit" stroke="#1B5E20" strokeWidth="2" paintOrder="stroke">START!</text>
            <line x1={NODES[NODES.length-1].x} y1={NODES[NODES.length-1].y+28} x2={NODES[NODES.length-1].x} y2={NODES[NODES.length-1].y} stroke="#FFD700" strokeWidth="2.5"/>
            <polygon points={`${NODES[NODES.length-1].x},${NODES[NODES.length-1].y} ${NODES[NODES.length-1].x+20},${NODES[NODES.length-1].y+8} ${NODES[NODES.length-1].x},${NODES[NODES.length-1].y+16}`} fill="#FFD700"/>
            <text x={NODES[NODES.length-1].x} y={NODES[NODES.length-1].y+40} textAnchor="middle" fontSize="7.5" fontWeight="900" fill="#FFD700" fontFamily="inherit" stroke="white" strokeWidth="2" paintOrder="stroke">⭐ SUMMIT</text>
          </svg>
        </div>
      </main>
    </div>
  );
}

// ── Lesson Page ───────────────────────────────────────────────────────────────
function LessonPage({ lessonId, onBack, onNext, onComplete }) {
  const lesson = LESSONS.find(l => l.id === lessonId);
  const isLast = lessonId === LESSONS.length;
  const nextLesson = LESSONS.find(l => l.id === lessonId + 1);

  return (
    <div style={{ minHeight:"100vh", background:"#F0F8FF", fontFamily:"'Comic Sans MS','Chalkboard SE',cursive" }}>
      <div style={{ background:lesson.color, borderBottom:"5px solid rgba(0,0,0,.2)", padding:"12px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:"0 4px 12px rgba(0,0,0,.2)" }}>
        <button onClick={onBack} style={{ background:"white", border:"3px solid rgba(0,0,0,.25)", borderRadius:11, padding:"6px 13px", cursor:"pointer", fontWeight:900, fontSize:11, fontFamily:"inherit", boxShadow:"0 3px 0 rgba(0,0,0,.2)" }}>← Map</button>
        <div style={{ textAlign:"center", flex:1, padding:"0 10px" }}>
          <div style={{ fontSize:9, fontWeight:900, color:"rgba(255,255,255,.95)", textTransform:"uppercase", letterSpacing:1.5, lineHeight:1.3 }}>{lesson.session}</div>
        </div>
        <div style={{ background:"white", border:"3px solid rgba(0,0,0,.2)", borderRadius:18, padding:"3px 11px", fontSize:10, fontWeight:900, flexShrink:0 }}>{lesson.id}/{LESSONS.length}</div>
      </div>

      <div style={{ display:"flex", justifyContent:"center", gap:4, padding:"8px 8px", background:"rgba(0,0,0,.05)", flexWrap:"wrap" }}>
        {LESSONS.map(l => (
          <div key={l.id} style={{ width:l.id===lessonId?20:8, height:8, borderRadius:4, background:l.id<=lessonId?lesson.color:"#DDD", transition:"all .3s", border:"1.5px solid rgba(0,0,0,.1)" }}/>
        ))}
      </div>

      <div style={{ maxWidth:760, margin:"0 auto", padding:"24px 20px" }}>
        <div style={{ background:"white", border:`5px solid ${lesson.color}`, borderRadius:20, padding:"20px 24px", boxShadow:`6px 6px 0 ${lesson.color}`, marginBottom:18 }}>
          <div style={{ fontSize:44, marginBottom:6 }}>{lesson.emoji}</div>
          <h1 style={{ fontFamily:"inherit", fontSize:26, margin:"0 0 4px", color:"#1a1a1a", lineHeight:1.1 }}>{lesson.title}</h1>
          <div style={{ fontSize:10, color:"#666", fontWeight:700 }}>{lesson.session}</div>
        </div>

        <div style={{ background:"white", border:"3px solid #DDD", borderRadius:16, padding:"18px 22px", marginBottom:16, boxShadow:"4px 4px 0 #DDD" }}>
          <div style={{ fontSize:9, fontWeight:900, color:lesson.color, textTransform:"uppercase", letterSpacing:2, marginBottom:10 }}>📖 What You'll Learn</div>
          <p style={{ fontSize:13.5, lineHeight:1.8, color:"#333", margin:0 }}>{lesson.content}</p>
        </div>

        <div style={{ background:lesson.color, border:"3px solid rgba(0,0,0,.15)", borderRadius:16, padding:"14px 20px", marginBottom:16, boxShadow:"4px 4px 0 rgba(0,0,0,.15)" }}>
          <div style={{ fontSize:9, fontWeight:900, color:"rgba(255,255,255,.9)", textTransform:"uppercase", letterSpacing:2, marginBottom:8 }}>💡 The Big Idea</div>
          <p style={{ fontSize:13.5, lineHeight:1.65, color:"white", margin:0, fontStyle:"italic", fontWeight:700 }}>"{lesson.summary}"</p>
        </div>

        <div style={{ background:"white", border:"3px solid #DDD", borderRadius:16, padding:"18px 22px", marginBottom:24, boxShadow:"4px 4px 0 #DDD" }}>
          <div style={{ fontSize:9, fontWeight:900, color:lesson.color, textTransform:"uppercase", letterSpacing:2, marginBottom:14 }}>⭐ Key Takeaways</div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {lesson.keyPoints.map((pt,i) => (
              <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                <div style={{ width:24, height:24, borderRadius:"50%", flexShrink:0, background:lesson.color, color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:900, border:"2px solid rgba(0,0,0,.15)", marginTop:1 }}>{i+1}</div>
                <span style={{ fontSize:12.5, lineHeight:1.65, color:"#333", paddingTop:3 }}>{pt}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={onBack} style={{ background:"white", border:"3px solid #CCC", borderRadius:13, padding:"10px 20px", fontWeight:900, fontSize:12, cursor:"pointer", fontFamily:"inherit", boxShadow:"0 3px 0 #CCC", color:"#555" }}>🗺️ Back to Map</button>
          {!isLast ? (
            <button onClick={onNext} style={{ background:lesson.color, border:"3px solid rgba(0,0,0,.2)", borderRadius:13, padding:"10px 22px", fontWeight:900, fontSize:12, cursor:"pointer", fontFamily:"inherit", color:"white", boxShadow:"0 4px 0 rgba(0,0,0,.2)" }}>
              Next: {nextLesson?.title} {nextLesson?.emoji} →
            </button>
          ) : (
            <button onClick={onComplete} style={{ background:"#FFD700", border:"3px solid #CC6600", borderRadius:13, padding:"10px 22px", fontWeight:900, fontSize:12, cursor:"pointer", fontFamily:"inherit", color:"#5D3A00", boxShadow:"0 4px 0 #CC6600" }}>
              🏆 Complete the Journey!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [currentLesson, setCurrentLesson] = useState(null);
  const [visited, setVisited] = useState([]);
  const [showCompletion, setShowCompletion] = useState(false);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => { setVisited(getVisited()); }, []);

  function handleSelect(id) {
    markVisited(id); setVisited(getVisited()); setCurrentLesson(id); window.scrollTo(0,0);
  }
  function handleBack() { setCurrentLesson(null); setVisited(getVisited()); }
  function handleNext() { const n = currentLesson + 1; if (n <= LESSONS.length) handleSelect(n); }

  function handleComplete() {
    setConfetti(true);
    setShowCompletion(true);
    setCurrentLesson(null);
    setTimeout(() => setConfetti(false), 5000);
  }

  function handleReset() {
    clearVisited();
    setVisited([]);
    setShowCompletion(false);
    setConfetti(false);
    setCurrentLesson(null);
  }

  return (
    <>
      <Confetti active={confetti} />
      {showCompletion && <CompletionOverlay onReset={handleReset} />}
      {currentLesson
        ? <LessonPage lessonId={currentLesson} onBack={handleBack} onNext={handleNext} onComplete={handleComplete} />
        : <MapPage onSelectLesson={handleSelect} visited={visited} onReset={handleReset} />
      }
    </>
  );
}
