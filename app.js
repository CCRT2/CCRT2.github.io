const svg = document.querySelector("#knowledge-tree");
const viewport = document.querySelector("#tree-viewport");
const branchLayer = document.querySelector("#branch-layer");
const nodeLayer = document.querySelector("#node-layer");
const panel = document.querySelector("#info-panel");
const panelTitle = document.querySelector("#panel-title");
const panelKicker = document.querySelector("#panel-kicker");
const panelDescription = document.querySelector("#panel-description");
const panelTech = document.querySelector("#panel-tech");
const panelLinks = document.querySelector("#panel-links");
const panelMedia = document.querySelector("#panel-media");
const closePanelButton = document.querySelector(".panel-close");
const particleCanvas = document.querySelector("#particle-canvas");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const fallbackTree = {
  id: "cohen-cox",
  label: "Cohen Cox",
  type: "root",
  children: [
    { id: "about", label: "About", type: "branch", children: [{ id: "biography", label: "Biography", type: "leaf" }] },
    { id: "projects", label: "Projects", type: "branch", children: [{ id: "active-directory", label: "Active Directory", type: "leaf" }] },
    { id: "certifications", label: "Certifications", type: "branch", children: [{ id: "a-plus", label: "A+", type: "leaf" }] },
    { id: "homelab", label: "Homelab", type: "branch", children: [{ id: "servers", label: "Servers", type: "leaf" }] },
    { id: "contact", label: "Contact", type: "leaf" }
  ]
};

const state = {
  tree: null,
  expanded: new Set(["cohen-cox"]),
  width: 0,
  height: 0,
  panX: 0,
  panY: 0,
  scale: 1,
  dragging: false,
  dragStart: { x: 0, y: 0 },
  panStart: { x: 0, y: 0 }
};

async function loadTree() {
  try {
    const response = await fetch("tree-data.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Tree data did not load.");
    return await response.json();
  } catch (error) {
    console.warn("Using fallback tree data:", error);
    return fallbackTree;
  }
}

function hasChildren(node) {
  return Array.isArray(node.children) && node.children.length > 0;
}

function isExpanded(node) {
  return state.expanded.has(node.id);
}

function computeLayout(root) {
  const nodes = [];
  const links = [];
  const mobile = state.width < 760;
  const leafGap = mobile ? 132 : 188;
  const levelGap = mobile ? 132 : 164;
  const yOffset = mobile ? -170 : -230;
  const positions = new Map();

  measure(root);
  place(root, 0, 0);

  function visibleChildren(node) {
    return hasChildren(node) && isExpanded(node) ? node.children : [];
  }

  function measure(node) {
    const children = visibleChildren(node);
    if (!children.length) {
      node._layoutWidth = leafGap;
      return node._layoutWidth;
    }

    node._layoutWidth = Math.max(leafGap, children.reduce((total, child) => total + measure(child), 0));
    return node._layoutWidth;
  }

  function place(node, depth, left) {
    const children = visibleChildren(node);
    const x = left + node._layoutWidth / 2;
    const y = yOffset + depth * levelGap;
    const entry = { node, parent: null, depth, x, y };
    nodes.push(entry);
    positions.set(node.id, entry);

    let childLeft = left;
    children.forEach((child) => {
      place(child, depth + 1, childLeft);
      const childEntry = positions.get(child.id);
      links.push({
        parent: node,
        node: child,
        depth: depth + 1,
        from: { x, y },
        to: { x: childEntry.x, y: childEntry.y }
      });
      childLeft += child._layoutWidth;
    });
  }

  const centerOffset = root._layoutWidth / 2;
  nodes.forEach((entry) => {
    entry.x -= centerOffset;
  });
  links.forEach((link) => {
    link.from.x -= centerOffset;
    link.to.x -= centerOffset;
  });

  return { nodes, links };
}

function branchPath(link) {
  const midY = link.from.y + (link.to.y - link.from.y) * 0.52;
  return `M ${link.from.x} ${link.from.y + 36} V ${midY} H ${link.to.x} V ${link.to.y - 32}`;
}

function updateViewport() {
  viewport.setAttribute(
    "transform",
    `translate(${state.width / 2 + state.panX} ${state.height / 2 + state.panY}) scale(${state.scale})`
  );
}

function renderTree() {
  const { nodes, links } = computeLayout(state.tree);
  branchLayer.replaceChildren();
  nodeLayer.replaceChildren();

  links.forEach((link, index) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("class", `branch depth-${Math.min(link.depth, 4)}`);
    path.setAttribute("d", branchPath(link));
    path.setAttribute("pathLength", "1");
    path.style.animationDelay = `${Math.min(index * 0.035, 0.42)}s`;
    branchLayer.append(path);
  });

  nodes.forEach((entry, index) => {
    nodeLayer.append(createNodeElement(entry, index));
  });
}

function createNodeElement(entry, index) {
  const { node, depth, x, y } = entry;
  const canExpand = hasChildren(node);
  const isPlaceholder = node.details?.status === "placeholder";
  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  group.setAttribute("class", `node ${depth === 0 ? "root" : ""} ${isPlaceholder ? "placeholder-node" : ""}`);
  group.setAttribute("transform", `translate(${x} ${y})`);
  group.style.animationDelay = `${Math.min(index * 0.035, 0.36)}s`;

  const button = document.createElementNS("http://www.w3.org/2000/svg", "g");
  button.setAttribute("class", "node-button");
  button.setAttribute("role", "button");
  button.setAttribute("tabindex", "0");
  button.setAttribute("aria-label", `${node.label}${canExpand ? isExpanded(node) ? ", collapse branch" : ", expand branch" : ", open details"}`);
  button.dataset.id = node.id;

  const size = depth === 0 ? 35 : canExpand ? 25 : 21;
  const hit = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  hit.setAttribute("class", "node-hit");
  hit.setAttribute("r", size + 28);

  const ring = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  ring.setAttribute("class", "node-ring");
  ring.setAttribute("r", size);

  const core = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  core.setAttribute("class", "node-core");
  core.setAttribute("r", depth === 0 ? 14 : 9);

  const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
  label.setAttribute("class", "node-label");
  label.setAttribute("y", size + 24);
  label.textContent = node.label;

  const meta = document.createElementNS("http://www.w3.org/2000/svg", "text");
  meta.setAttribute("class", "node-meta");
  meta.setAttribute("y", size + 41);
  meta.textContent = canExpand ? (isExpanded(node) ? "Expanded" : "Click to grow") : isPlaceholder ? "Soon" : "Open";

  button.append(hit, ring, core, label, meta);
  group.append(button);
  return group;
}

function findNodeById(id, root = state.tree) {
  if (root.id === id) return root;
  if (!hasChildren(root)) return null;
  for (const child of root.children) {
    const match = findNodeById(id, child);
    if (match) return match;
  }
  return null;
}

function handleNodeAction(id) {
  const node = findNodeById(id);
  if (!node) return;

  if (hasChildren(node)) {
    if (state.expanded.has(id) && id !== state.tree.id) {
      collapseBranch(node);
    } else {
      state.expanded.add(id);
    }
    closePanel();
    renderTree();
    return;
  }

  openPanel(node);
}

function collapseBranch(node) {
  state.expanded.delete(node.id);
  if (!hasChildren(node)) return;
  node.children.forEach((child) => collapseBranch(child));
}

function openPanel(node) {
  const details = node.details || {};
  const isPlaceholder = details.status === "placeholder";
  panelTitle.textContent = details.title || node.label;
  panelKicker.textContent = isPlaceholder ? "Future Branch" : node.type === "leaf" ? "Portfolio Leaf" : "Portfolio Branch";
  panelDescription.textContent = details.description || "Details for this part of the portfolio are ready to expand as the knowledge tree grows.";
  panelTech.replaceChildren(...(details.technologies || []).map((tech) => {
    const item = document.createElement("span");
    item.textContent = tech;
    return item;
  }));
  panelLinks.replaceChildren(...createPanelLinks(details));
  panelMedia.replaceChildren();

  const image = details.images?.[0];
  if (image?.src) {
    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt || "";
    panelMedia.append(img);
  } else {
    panelMedia.append(createMediaPlaceholder(details.title || node.label));
  }

  panel.classList.add("open");
  panel.setAttribute("aria-hidden", "false");
  closePanelButton.focus({ preventScroll: true });
}

function createPanelLinks(details) {
  const links = [];
  if (details.github) links.push({ label: "GitHub", href: details.github });
  if (details.documentation) links.push({ label: "Documentation", href: details.documentation });
  return links.map((link) => {
    if (!link.href || link.href === "#") {
      const item = document.createElement("span");
      item.className = "placeholder-link";
      item.textContent = `${link.label} pending`;
      return item;
    }

    const anchor = document.createElement("a");
    anchor.href = link.href;
    anchor.textContent = link.label;
    anchor.target = link.href.startsWith("#") || link.href.startsWith("mailto:") ? "_self" : "_blank";
    anchor.rel = "noreferrer";
    return anchor;
  });
}

function createMediaPlaceholder(label) {
  const placeholder = document.createElement("div");
  placeholder.className = "panel-placeholder";
  placeholder.innerHTML = `
    <span class="placeholder-grid" aria-hidden="true"></span>
    <strong>${label}</strong>
    <small>Image placeholder</small>
  `;
  return placeholder;
}

function closePanel() {
  panel.classList.remove("open");
  panel.setAttribute("aria-hidden", "true");
}

function resize() {
  state.width = window.innerWidth;
  state.height = window.innerHeight;
  svg.setAttribute("viewBox", `0 0 ${state.width} ${state.height}`);
  state.scale = Math.min(Math.max(state.scale, state.width < 760 ? 0.72 : 0.82), 1.9);
  updateViewport();
  renderTree();
}

function recenter() {
  state.panX = 0;
  state.panY = 0;
  state.scale = state.width < 760 ? 0.82 : 1;
  updateViewport();
}

function zoomAt(delta, clientX = state.width / 2, clientY = state.height / 2) {
  const nextScale = Math.min(2.2, Math.max(0.48, state.scale * delta));
  const worldX = (clientX - state.width / 2 - state.panX) / state.scale;
  const worldY = (clientY - state.height / 2 - state.panY) / state.scale;
  state.panX = clientX - state.width / 2 - worldX * nextScale;
  state.panY = clientY - state.height / 2 - worldY * nextScale;
  state.scale = nextScale;
  updateViewport();
}

function bindTreeInteractions() {
  nodeLayer.addEventListener("click", (event) => {
    const button = event.target.closest(".node-button");
    if (button) handleNodeAction(button.dataset.id);
  });

  nodeLayer.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const button = event.target.closest(".node-button");
    if (!button) return;
    event.preventDefault();
    handleNodeAction(button.dataset.id);
  });

  svg.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".node-button")) return;
    state.dragging = true;
    state.dragStart = { x: event.clientX, y: event.clientY };
    state.panStart = { x: state.panX, y: state.panY };
    svg.setPointerCapture(event.pointerId);
  });

  svg.addEventListener("pointermove", (event) => {
    if (!state.dragging) return;
    state.panX = state.panStart.x + event.clientX - state.dragStart.x;
    state.panY = state.panStart.y + event.clientY - state.dragStart.y;
    updateViewport();
  });

  svg.addEventListener("pointerup", () => {
    state.dragging = false;
  });

  svg.addEventListener("wheel", (event) => {
    event.preventDefault();
    zoomAt(event.deltaY > 0 ? 0.9 : 1.1, event.clientX, event.clientY);
  }, { passive: false });

  svg.addEventListener("dblclick", recenter);

  document.querySelector("[data-action='zoom-in']").addEventListener("click", () => zoomAt(1.14));
  document.querySelector("[data-action='zoom-out']").addEventListener("click", () => zoomAt(0.86));
  document.querySelector("[data-action='recenter']").addEventListener("click", recenter);
  closePanelButton.addEventListener("click", closePanel);
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePanel();
  });
  window.addEventListener("resize", resize);
}

function startParticles() {
  const ctx = particleCanvas.getContext("2d");
  let width = 0;
  let height = 0;
  let ratio = 1;
  let particles = [];

  function resizeParticles() {
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    particleCanvas.width = Math.floor(width * ratio);
    particleCanvas.height = Math.floor(height * ratio);
    particleCanvas.style.width = `${width}px`;
    particleCanvas.style.height = `${height}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    particles = Array.from({ length: Math.min(110, Math.floor((width * height) / 14000)) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: -0.1 + Math.random() * 0.2,
      vy: 0.05 + Math.random() * 0.18,
      size: 0.6 + Math.random() * 1.8,
      alpha: 0.18 + Math.random() * 0.52
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((particle, index) => {
      particle.x += reducedMotion ? 0 : particle.vx;
      particle.y += reducedMotion ? 0 : particle.vy;
      if (particle.y > height + 12) particle.y = -12;
      if (particle.x < -12) particle.x = width + 12;
      if (particle.x > width + 12) particle.x = -12;

      ctx.fillStyle = `rgba(70, 212, 140, ${particle.alpha})`;
      ctx.shadowColor = "rgba(70, 212, 140, 0.8)";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();

      const neighbor = particles[index + 1];
      if (neighbor && Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y) < 130) {
        ctx.strokeStyle = "rgba(229, 181, 103, 0.06)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(neighbor.x, neighbor.y);
        ctx.stroke();
      }
    });
    ctx.shadowBlur = 0;
    if (!reducedMotion) requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resizeParticles);
  resizeParticles();
  draw();
}

async function init() {
  state.tree = await loadTree();
  bindTreeInteractions();
  resize();
  recenter();
  startParticles();
}

init();
