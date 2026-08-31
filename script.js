:root {
    --bg: #05070b;
    --surface: #0b0f16;
    --surface-light: #101722;

    --text: #f4f7fb;
    --muted: #8b98aa;
    --muted-light: #aeb9c8;

    --line: rgba(255, 255, 255, 0.09);

    --accent: #5aa7ff;
    --accent-strong: #2f7df4;

    --success: #65d69a;

    --max-width: 1160px;
}


/* ------------------------------
   Reset
------------------------------ */

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    scroll-behavior: smooth;
}

body {
    min-height: 100vh;
    background: var(--bg);
    color: var(--text);

    font-family: "Inter", sans-serif;
    line-height: 1.7;

    overflow-x: hidden;
}

a {
    color: inherit;
}


/* ------------------------------
   Background
------------------------------ */

.background-grid {
    position: fixed;
    inset: 0;

    pointer-events: none;

    opacity: 0.28;

    background-image:
        linear-gradient(
            rgba(255, 255, 255, 0.025) 1px,
            transparent 1px
        ),
        linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.025) 1px,
            transparent 1px
        );

    background-size: 48px 48px;

    mask-image: linear-gradient(
        to bottom,
        black,
        transparent 80%
    );

    z-index: -3;
}

.background-glow {
    position: fixed;

    width: 500px;
    height: 500px;

    border-radius: 50%;

    filter: blur(130px);

    opacity: 0.11;

    pointer-events: none;

    z-index: -2;
}

.glow-one {
    background: #2374e1;

    top: -250px;
    right: -180px;
}

.glow-two {
    background: #1852a5;

    bottom: 5%;
    left: -300px;
}


/* ------------------------------
   Global
------------------------------ */

.container {
    width: min(
        var(--max-width),
        calc(100% - 48px)
    );

    margin: 0 auto;
}

.section {
    position: relative;

    padding: 120px 0;
}

.section-border {
    border-top: 1px solid var(--line);
}


/* ------------------------------
   Navigation
------------------------------ */

.site-header {
    position: fixed;

    top: 0;
    left: 0;

    width: 100%;

    z-index: 100;

    background: rgba(5, 7, 11, 0.72);

    backdrop-filter: blur(18px);

    border-bottom: 1px solid transparent;

    transition:
        border-color 0.25s ease,
        background 0.25s ease;
}

.site-header.scrolled {
    border-color: var(--line);

    background: rgba(5, 7, 11, 0.88);
}

.nav-container {
    height: 76px;

    display: flex;

    align-items: center;
    justify-content: space-between;
}

.logo {
    text-decoration: none;

    font-size: 1.25rem;
    font-weight: 800;

    letter-spacing: -0.05em;
}

.logo span {
    color: var(--accent);
}

.nav {
    display: flex;

    align-items: center;

    gap: 28px;
}

.nav a {
    color: #aeb9c8;

    text-decoration: none;

    font-size: 0.86rem;
    font-weight: 600;

    transition:
        color 0.2s ease;
}

.nav a:hover,
.nav a.active {
    color: white;
}

.resume-btn {
    padding: 9px 15px;

    border: 1px solid var(--line);

    border-radius: 8px;

    background: rgba(255, 255, 255, 0.04);
}

.menu-toggle {
    display: none;

    border: 0;

    background: transparent;

    cursor: pointer;
}

.menu-toggle span {
    display: block;

    width: 24px;
    height: 2px;

    margin: 5px;

    background: white;
}


/* ------------------------------
   Hero
------------------------------ */

.hero {
    min-height: 100vh;

    display: flex;
    align-items: center;

    padding-top: 150px;
}

.hero-layout {
    display: grid;

    grid-template-columns:
        1.15fr
        0.85fr;

    gap: 80px;

    align-items: center;
}

.status {
    display: inline-flex;

    align-items: center;

    gap: 9px;

    padding: 7px 11px;

    border: 1px solid var(--line);

    border-radius: 999px;

    color: #b7c1ce;

    background: rgba(255, 255, 255, 0.025);

    font-family: "JetBrains Mono", monospace;
    font-size: 0.72rem;
    font-weight: 500;

    margin-bottom: 28px;
}

.status-dot {
    width: 7px;
    height: 7px;

    border-radius: 50%;

    background: var(--success);

    box-shadow:
        0 0 14px rgba(101, 214, 154, 0.65);
}

.eyebrow {
    margin-bottom: 18px;

    color: var(--accent);

    font-family: "JetBrains Mono", monospace;

    font-size: 0.72rem;
    font-weight: 600;

    letter-spacing: 0.13em;

    text-transform: uppercase;
}

.hero h1 {
    max-width: 850px;

    font-size: clamp(
        3.2rem,
        6vw,
        5.7rem
    );

    line-height: 0.98;

    letter-spacing: -0.065em;
}

.hero h1 span,
.section-heading h2 span,
.contact-box h2 span {
    color: var(--accent);
}

.hero-text {
    max-width: 650px;

    margin-top: 28px;

    color: var(--muted);

    font-size: 1.08rem;
}

.hero-actions {
    display: flex;

    gap: 12px;

    margin-top: 38px;
}

.button {
    display: inline-flex;

    align-items: center;
    justify-content: center;

    gap: 18px;

    padding: 13px 18px;

    border-radius: 9px;

    text-decoration: none;

    font-size: 0.86rem;
    font-weight: 700;

    transition:
        transform 0.2s ease,
        background 0.2s ease,
        border-color 0.2s ease;
}

.button:hover {
    transform: translateY(-2px);
}

.button-primary {
    color: white;

    background: var(--accent-strong);

    box-shadow:
        0 12px 35px rgba(47, 125, 244, 0.2);
}

.button-primary:hover {
    background: #4390ff;
}

.button-secondary {
    color: #dbe3ed;

    border: 1px solid var(--line);

    background: rgba(255, 255, 255, 0.025);
}

.quick-links {
    display: flex;

    gap: 20px;

    margin-top: 26px;
}

.quick-links a {
    color: #7f8da0;

    text-decoration: none;

    font-family: "JetBrains Mono", monospace;

    font-size: 0.76rem;
    font-weight: 500;
}

.quick-links a:hover {
    color: white;
}


/* ------------------------------
   Terminal
------------------------------ */

.terminal {
    overflow: hidden;

    border: 1px solid var(--line);

    border-radius: 16px;

    background: rgba(11, 15, 22, 0.78);

    box-shadow:
        0 30px 100px rgba(0, 0, 0, 0.35);
}

.terminal-header {
    height: 42px;

    display: flex;

    align-items: center;

    gap: 10px;

    padding: 0 15px;

    border-bottom: 1px solid var(--line);

    background: rgba(255, 255, 255, 0.025);
}

.terminal-dots {
    display: flex;

    gap: 7px;
}

.terminal-dots span {
    width: 8px;
    height: 8px;

    border-radius: 50%;

    background: #667181;
}

.terminal-title {
    color: #667181;

    font-family: "JetBrains Mono", monospace;

    font-size: 0.68rem;
}

.terminal-body {
    padding: 28px;

    color: #aab6c5;

    font-family: "JetBrains Mono", monospace;

    font-size: 0.8rem;

    line-height: 2;
}

.prompt {
    color: var(--accent);
}

.terminal-output {
    padding-left: 16px;

    color: #e5ebf3;
}

.terminal-output.success {
    color: var(--success);
}

.cursor {
    display: inline-block;

    width: 7px;
    height: 14px;

    vertical-align: middle;

    background: var(--accent);

    animation: blink 1s infinite;
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}


/* ------------------------------
   Sections
------------------------------ */

.two-column {
    display: grid;

    grid-template-columns:
        0.8fr
        1.2fr;

    gap: 100px;
}

.section-heading h2 {
    font-size: clamp(
        2.3rem,
        4vw,
        4rem
    );

    line-height: 1.05;

    letter-spacing: -0.055em;
}

.section-intro {
    max-width: 580px;

    margin-top: 18px;

    color: var(--muted);
}

.about-content {
    color: #aab5c4;

    font-size: 1rem;
}

.about-content p + p {
    margin-top: 18px;
}

.about-stats {
    display: flex;

    gap: 45px;

    margin-top: 40px;
}

.about-stats div {
    display: flex;

    flex-direction: column;
}

.about-stats strong {
    color: var(--accent);

    font-family: "JetBrains Mono", monospace;

    font-size: 0.72rem;
}

.about-stats span {
    margin-top: 4px;

    color: #d7dee8;

    font-size: 0.85rem;
}


/* ------------------------------
   Projects
------------------------------ */

.project-grid {
    display: grid;

    grid-template-columns:
        repeat(2, 1fr);

    gap: 18px;

    margin-top: 55px;
}

.project-card {
    position: relative;

    min-height: 360px;

    padding: 30px;

    border: 1px solid var(--line);

    border-radius: 14px;

    background:
        linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.035),
            rgba(255, 255, 255, 0.012)
        );

    transition:
        transform 0.25s ease,
        border-color 0.25s ease,
        background 0.25s ease;
}

.project-card:hover {
    transform: translateY(-5px);

    border-color:
        rgba(90, 167, 255, 0.32);

    background:
        rgba(255, 255, 255, 0.045);
}

.project-card.featured {
    grid-column: span 2;

    min-height: 320px;
}

.project-number {
    color: #3c4757;

    font-family: "JetBrains Mono", monospace;

    font-size: 0.72rem;
    font-weight: 600;
}

.project-content {
    margin-top: 45px;
}

.project-meta {
    display: flex;

    justify-content: space-between;

    gap: 20px;

    color: #687587;

    font-family: "JetBrains Mono", monospace;

    font-size: 0.68rem;

    text-transform: uppercase;
}

.project-content h3 {
    margin: 10px 0;

    font-size: 1.65rem;

    letter-spacing: -0.035em;
}

.project-content p {
    max-width: 620px;

    color: var(--muted);

    font-size: 0.9rem;
}

.tags {
    display: flex;

    flex-wrap: wrap;

    gap: 7px;

    margin-top: 20px;
}

.tags span {
    padding: 4px 8px;

    border: 1px solid var(--line);

    border-radius: 5px;

    color: #98a5b6;

    font-family: "JetBrains Mono", monospace;

    font-size: 0.65rem;
}

.project-link {
    display: inline-block;

    margin-top: 25px;

    color: #dce7f6;

    text-decoration: none;

    font-size: 0.78rem;
    font-weight: 700;
}

.project-link:hover {
    color: var(--accent);
}


/* ------------------------------
   Experience
------------------------------ */

.timeline {
    margin-top: 50px;

    border-top: 1px solid var(--line);
}

.timeline-item {
    display: grid;

    grid-template-columns: 150px 1fr;

    gap: 40px;

    padding: 34px 0;

    border-bottom: 1px solid var(--line);
}

.timeline-date {
    color: #667384;

    font-family: "JetBrains Mono", monospace;

    font-size: 0.68rem;

    text-transform: uppercase;
}

.timeline-item h3 {
    font-size: 1.2rem;
}

.company {
    margin: 2px 0 12px;

    color: var(--accent);

    font-size: 0.78rem;

    font-weight: 600;
}

.timeline-item p:not(.company) {
    max-width: 700px;

    color: var(--muted);

    font-size: 0.88rem;
}


/* ------------------------------
   Skills
------------------------------ */

.skills-grid {
    display: grid;

    grid-template-columns:
        repeat(2, 1fr);

    gap: 1px;

    margin-top: 55px;

    border: 1px solid var(--line);

    background: var(--line);
}

.skill-group {
    padding: 30px;

    background: var(--bg);
}

.skill-label {
    margin-bottom: 17px;

    color: #667384;

    font-family: "JetBrains Mono", monospace;

    font-size: 0.68rem;
    font-weight: 600;

    text-transform: uppercase;
}

.skill-list {
    display: flex;

    flex-wrap: wrap;

    gap: 9px;
}

.skill-list span {
    color: #dce3ec;

    font-size: 0.82rem;
}


/* ------------------------------
   Contact
------------------------------ */

.contact-section {
    padding-bottom: 140px;
}

.contact-box {
    padding: 80px 20px;

    text-align: center;

    border: 1px solid var(--line);

    border-radius: 16px;

    background:
        radial-gradient(
            circle at center,
            rgba(47, 125, 244, 0.09),
            transparent 55%
        );
}

.contact-box h2 {
    font-size: clamp(
        2.5rem,
        5vw,
        4.7rem
    );

    line-height: 1;

    letter-spacing: -0.06em;
}

.contact-box > p:not(.eyebrow) {
    margin: 22px auto 30px;

    color: var(--muted);
}


/* ------------------------------
   Footer
------------------------------ */

footer {
    padding: 24px 0;

    border-top: 1px solid var(--line);

    color: #657183;

    font-family: "JetBrains Mono", monospace;

    font-size: 0.65rem;
}

.footer-inner {
    display: flex;

    justify-content: space-between;

    gap: 20px;
}


/* ------------------------------
   Back to Top
------------------------------ */

.back-top {
    position: fixed;

    right: 22px;
    bottom: 22px;

    width: 42px;
    height: 42px;

    border: 1px solid var(--line);

    border-radius: 9px;

    background: rgba(11, 15, 22, 0.88);

    color: white;

    cursor: pointer;

    opacity: 0;

    pointer-events: none;

    transform: translateY(10px);

    transition: 0.2s;
}

.back-top.visible {
    opacity: 1;

    pointer-events: auto;

    transform: none;
}


/* ------------------------------
   Animations / Accessibility
------------------------------ */

.reveal {
    opacity: 0;

    transform: translateY(18px);

    transition:
        opacity 0.7s ease,
        transform 0.7s ease;
}

.reveal.show {
    opacity: 1;

    transform: none;
}

:focus-visible {
    outline: 2px solid var(--accent);

    outline-offset: 4px;
}


/* ------------------------------
   Tablet
------------------------------ */

@media (max-width: 850px) {

    .nav {
        display: none;

        position: absolute;

        top: 76px;
        left: 0;
        right: 0;

        padding: 20px 24px 25px;

        flex-direction: column;

        align-items: flex-start;

        background: rgba(5, 7, 11, 0.97);

        border-bottom: 1px solid var(--line);
    }

    .nav.open {
        display: flex;
    }

    .menu-toggle {
        display: block;
    }

    .hero-layout,
    .two-column {
        grid-template-columns: 1fr;

        gap: 55px;
    }

    .hero {
        padding-top: 125px;
    }

    .hero-card {
        max-width: 650px;
    }

    .project-card.featured {
        grid-column: span 1;
    }
}


/* ------------------------------
   Mobile
------------------------------ */

@media (max-width: 600px) {

    .container {
        width:
            min(
                var(--max-width),
                calc(100% - 32px)
            );
    }

    .section {
        padding: 85px 0;
    }

    .hero h1 {
        font-size: 3.1rem;
    }

    .hero-actions {
        flex-direction: column;

        align-items: stretch;
    }

    .project-grid,
    .skills-grid {
        grid-template-columns: 1fr;
    }

    .timeline-item {
        grid-template-columns: 1fr;

        gap: 8px;
    }

    .about-stats {
        gap: 25px;
    }

    .footer-inner {
        flex-direction: column;
    }
}


/* ------------------------------
   Reduced Motion
------------------------------ */

@media (prefers-reduced-motion: reduce) {

    html {
        scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }

}
