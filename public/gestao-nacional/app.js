const monthlyTarget = 5180000;
const daysElapsed = 17;
const daysInMonth = 30;

const monthly = [
  { label: "Jan", attended: 2719830.66, requested: 2757517.87 },
  { label: "Fev", attended: 2359416.33, requested: 2379530.1 },
  { label: "Mar", attended: 2677570.31, requested: 2687697.91 },
  { label: "Abr", attended: 3641693.63, requested: 3671452.65 },
  { label: "Mai", attended: 3005037.94, requested: 3038851.65 },
  { label: "Jun", attended: 3141326.39, requested: 3198941.17 },
  { label: "Jul", attended: 2728295.72, requested: 2765385.49 },
  { label: "Ago", attended: 3743199.9, requested: 3768487.63 },
  { label: "Set*", attended: 1114393.8, requested: 1120585.59 }
];

const periods = {
  sep: {
    label: "Setembro 2026 · até 17/09",
    target: monthlyTarget,
    projection: 1966577.29,
    metrics: { attended: 1114393.8, requested: 1120585.59, clients: 392, rcas: 30, orders: 503 }
  },
  ytd: {
    label: "Acumulado 2026 · jan–set",
    target: monthlyTarget * 9,
    projection: 25982948.17,
    metrics: { attended: 25130764.68, requested: 25388450.06, clients: 2114, rcas: 109, orders: 7816 }
  }
};

const scopes = {
  sep: {
    states: {
      CE: { attended: 914891.62, requested: 920595.96, clients: 373, rcas: 23, orders: 482 },
      PE: { attended: 91880.68, requested: 92368.13, clients: 6, rcas: 3, orders: 7 },
      PB: { attended: 30545.35, requested: 30545.35, clients: 2, rcas: 1, orders: 2 },
      SP: { attended: 25253.42, requested: 25253.42, clients: 3, rcas: 2, orders: 3 },
      BA: { attended: 16788.58, requested: 16788.58, clients: 2, rcas: 2, orders: 2 }
    },
    cities: {
      FORTALEZA: { attended: 499897.45, requested: 501833.1, clients: 190, rcas: 18, orders: 261, state: "CE" },
      CAUCAIA: { attended: 64643.51, requested: 65438.48, clients: 25, rcas: 10, orders: 30, state: "CE" },
      EUSEBIO: { attended: 37830.93, requested: 38400.18, clients: 21, rcas: 12, orders: 38, state: "CE" },
      MARACANAU: { attended: 19093.77, requested: 19107.13, clients: 16, rcas: 9, orders: 16, state: "CE" },
      RECIFE: { attended: 56294.77, requested: 56782.22, clients: 4, rcas: 1, orders: 5, state: "PE" }
    },
    sellers: {
      "FELIPE INTERNO": { attended: 166117.12, requested: 167001.55, clients: 33, rcas: 1, orders: 59 },
      "ALVES INTERNO": { attended: 85635.72, requested: 86723.07, clients: 31, rcas: 1, orders: 43 },
      "WELLINGTON INTERNO": { attended: 85261.27, requested: 85522.28, clients: 40, rcas: 1, orders: 55 },
      "NERIS INTERNO": { attended: 79046.01, requested: 79066.71, clients: 45, rcas: 2, orders: 54 }
    },
    supervisors: {
      "COMERCIAL INTERNO": { attended: 811833.72, requested: 816346.27, clients: 357, rcas: 16, orders: 466 },
      "SUPERVISOR NORDESTE 05 (CE - EXTERNO)": { attended: 93849.52, requested: 95041.31, clients: 17, rcas: 4, orders: 18 },
      "SUPERVISOR NORDESTE 03 (PE)": { attended: 63911.08, requested: 64398.53, clients: 5, rcas: 2, orders: 6 },
      "SUPERVISOR NORDESTE 02 (PB,AL,RN)": { attended: 51304.35, requested: 51304.35, clients: 4, rcas: 2, orders: 4 }
    },
    owners: {
      interno: { attended: 811833.72, requested: 816346.27, clients: 357, rcas: 16, orders: 466 },
      externo: { attended: 302560.08, requested: 304239.32, clients: 35, rcas: 14, orders: 37 }
    }
  },
  ytd: {
    states: {
      CE: { attended: 17493184.39, requested: 17662743.77, clients: 1804, rcas: 55, orders: 7176 },
      PE: { attended: 1459168.68, requested: 1471806.78, clients: 69, rcas: 19, orders: 141 },
      PB: { attended: 1708080.11, requested: 1737967.94, clients: 42, rcas: 13, orders: 99 },
      SP: { attended: 1305841.78, requested: 1312296.85, clients: 18, rcas: 10, orders: 50 },
      BA: { attended: 693601.83, requested: 700727.21, clients: 40, rcas: 11, orders: 69 }
    },
    cities: {
      FORTALEZA: { attended: 7524380.65, requested: 7582415.49, clients: 840, rcas: 41, orders: 3743, state: "CE" },
      CAUCAIA: { attended: 775930.78, requested: 784961.72, clients: 121, rcas: 25, orders: 410, state: "CE" },
      EUSEBIO: { attended: 727777.95, requested: 735212.76, clients: 90, rcas: 26, orders: 481, state: "CE" },
      MARACANAU: { attended: 2082751.78, requested: 2122737.78, clients: 79, rcas: 29, orders: 353, state: "CE" },
      RECIFE: { attended: 453475.87, requested: 456718.85, clients: 18, rcas: 7, orders: 46, state: "PE" }
    },
    sellers: {
      "FELIPE INTERNO": { attended: 1255390.16, requested: 1270292.69, clients: 144, rcas: 2, orders: 789 },
      "ALVES INTERNO": { attended: 1190202.34, requested: 1201086.46, clients: 140, rcas: 2, orders: 568 },
      "WELLINGTON INTERNO": { attended: 1062903.8, requested: 1070520.14, clients: 162, rcas: 2, orders: 667 },
      "NERIS INTERNO": { attended: 1938219.12, requested: 1953283.36, clients: 202, rcas: 2, orders: 878 }
    },
    supervisors: {
      "COMERCIAL INTERNO": { attended: 13232998.29, requested: 13342283.14, clients: 1724, rcas: 31, orders: 6911 },
      "SUPERVISOR NORDESTE 05 (CE - EXTERNO)": { attended: 2248276.07, requested: 2288578.1, clients: 145, rcas: 20, orders: 311 },
      "SUPERVISOR NORDESTE 03 (PE)": { attended: 1288614.31, requested: 1300798.81, clients: 58, rcas: 8, orders: 118 },
      "SUPERVISOR NORDESTE 02 (PB,AL,RN)": { attended: 1101246.58, requested: 1112979.72, clients: 67, rcas: 9, orders: 117 }
    },
    owners: {
      interno: { attended: 13232998.29, requested: 13342283.14, clients: 1724, rcas: 31, orders: 6911 },
      externo: { attended: 11897766.39, requested: 12046166.92, clients: 424, rcas: 78, orders: 905 }
    }
  }
};

const stateNames = { CE: "Ceará", PE: "Pernambuco", PB: "Paraíba", SP: "São Paulo", BA: "Bahia" };
const cityNames = { FORTALEZA: "Fortaleza", CAUCAIA: "Caucaia", EUSEBIO: "Eusébio", MARACANAU: "Maracanaú", RECIFE: "Recife" };
const ownerNames = { interno: "Comercial interno", externo: "Canais externos" };

const tables = {
  sep: {
    sellers: [
      ["FELIPE INTERNO", "COMERCIAL INTERNO", 166117.12, 167001.55, 33],
      ["ALVES INTERNO", "COMERCIAL INTERNO", 85635.72, 86723.07, 31],
      ["WELLINGTON INTERNO", "COMERCIAL INTERNO", 85261.27, 85522.28, 40],
      ["NERIS INTERNO", "COMERCIAL INTERNO", 79046.01, 79066.71, 45],
      ["CAROLINA INTERNO", "COMERCIAL INTERNO", 76113.68, 76447.65, 28],
      ["VICTOR INTERNO", "COMERCIAL INTERNO", 69612.29, 70573.39, 22],
      ["LUCAS INTERNO", "COMERCIAL INTERNO", 68243.81, 68449.75, 45],
      ["DAYVIDSON INTERNO", "COMERCIAL INTERNO", 60136.33, 60137.03, 34],
      ["NETO - PE", "SUPERVISOR NORDESTE 03 (PE)", 56294.77, 56782.22, 4],
      ["ROBSON RSV REPRESENTAÇÕES", "SUPERVISOR NORDESTE 05 (CE - EXTERNO)", 47144.69, 47144.69, 2]
    ],
    cities: [
      ["FORTALEZA", "CE", 499897.45, 190], ["CAUCAIA", "CE", 64643.51, 25], ["RECIFE", "PE", 56294.77, 4], ["EUSÉBIO", "CE", 37830.93, 21], ["CABEDELO", "PB", 30545.35, 2], ["JABOATÃO DOS GUARARAPES", "PE", 27969.6, 1], ["JUAZEIRO DO NORTE", "CE", 22570.75, 4], ["MARACANAÚ", "CE", 19093.77, 16]
    ]
  },
  ytd: {
    sellers: [
      ["NERIS INTERNO", "COMERCIAL INTERNO", 1938219.12, 1953283.36, 202],
      ["MARIO ROBERTO DA SILVA", "SUPERVISOR GRANDES CONTAS", 1840871.32, 1861940.38, 20],
      ["CAROLINA INTERNO", "COMERCIAL INTERNO", 1568481.52, 1582390.38, 131],
      ["VICTOR INTERNO", "COMERCIAL INTERNO", 1460207.91, 1468166.7, 110],
      ["FELIPE INTERNO", "COMERCIAL INTERNO", 1255390.16, 1270292.69, 144],
      ["ALVES INTERNO", "COMERCIAL INTERNO", 1190202.34, 1201086.46, 140],
      ["ANGELICA - PB", "SUPERVISOR CRISTIAN REPS CE", 1151516.97, 1164855.8, 3],
      ["CRISTIAN BELTRAN SPOSITO", "SUPERVISOR CRISTIAN BELTRAN", 1080412.44, 1095376.36, 15],
      ["WELLINGTON INTERNO", "COMERCIAL INTERNO", 1062903.8, 1070520.14, 162],
      ["DAYVIDSON INTERNO", "COMERCIAL INTERNO", 849106.75, 853270.27, 142]
    ],
    cities: [
      ["FORTALEZA", "CE", 7524380.65, 840], ["MARACANAÚ", "CE", 2082751.78, 79], ["SÃO PAULO", "SP", 977007.53, 8], ["ESPERANÇA", "PB", 840491.04, 7], ["CAUCAIA", "CE", 775930.78, 121], ["EUSÉBIO", "CE", 727777.95, 90], ["JUAZEIRO DO NORTE", "CE", 583887.85, 37], ["SOBRAL", "CE", 553352.91, 29], ["HORIZONTE", "CE", 496702.33, 25], ["RECIFE", "PE", 453475.87, 18]
    ]
  }
};

const rankings = {
  states: [
    ["CE", "Ceará", 17493184.39], ["PB", "Paraíba", 1708080.11], ["PE", "Pernambuco", 1459168.68], ["SP", "São Paulo", 1305841.78], ["BA", "Bahia", 693601.83]
  ],
  cities: [
    ["Fortaleza", 7524380.65], ["Maracanaú", 2082751.78], ["Caucaia", 775930.78], ["Eusébio", 727777.95], ["Juazeiro do Norte", 583887.85]
  ]
};

const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const number = new Intl.NumberFormat("pt-BR");
const moneyShort = (value) => {
  if (value >= 1000000) return `R$ ${(value / 1000000).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} mi`;
  if (value >= 1000) return `R$ ${(value / 1000).toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} mil`;
  return money.format(value);
};
const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);

const els = {
  period: document.getElementById("periodFilter"),
  state: document.getElementById("stateFilter"),
  city: document.getElementById("cityFilter"),
  seller: document.getElementById("sellerFilter"),
  supervisor: document.getElementById("supervisorFilter"),
  owner: document.getElementById("ownerFilter"),
  scope: document.getElementById("scopeLabel"),
  actual: document.getElementById("actualValue"),
  actualDetail: document.getElementById("actualDetail"),
  clients: document.getElementById("clientValue"),
  clientsDetail: document.getElementById("clientDetail"),
  rcas: document.getElementById("rcaValue"),
  rcasDetail: document.getElementById("rcaDetail"),
  positivization: document.getElementById("positivationValue"),
  ticket: document.getElementById("ticketValue"),
  ticketDetail: document.getElementById("ticketDetail"),
  projection: document.getElementById("projectionValue"),
  projectionDetail: document.getElementById("projectionDetail"),
  goalPercentage: document.getElementById("goalPercentage"),
  goalRing: document.getElementById("goalRing"),
  target: document.getElementById("targetValue"),
  goalProjection: document.getElementById("goalProjectionValue"),
  shortfall: document.getElementById("shortfallValue"),
  healthActive: document.getElementById("healthActive"),
  team: document.getElementById("teamTable"),
  cities: document.getElementById("citiesTable"),
  statesRanking: document.getElementById("stateRanking"),
  citiesRanking: document.getElementById("cityRanking"),
  trend: document.getElementById("trendChart"),
  toast: document.getElementById("toast")
};

function currentFilters() {
  return {
    period: els.period.value,
    state: els.state.value,
    city: els.city.value,
    seller: els.seller.value,
    supervisor: els.supervisor.value,
    owner: els.owner.value
  };
}

function selectedScope(filters) {
  const source = scopes[filters.period];
  if (filters.city !== "all" && source.cities[filters.city]) return { metrics: source.cities[filters.city], label: cityNames[filters.city], kind: "cidade" };
  if (filters.seller !== "all" && source.sellers[filters.seller]) return { metrics: source.sellers[filters.seller], label: titleCase(filters.seller), kind: "vendedor" };
  if (filters.supervisor !== "all" && source.supervisors[filters.supervisor]) return { metrics: source.supervisors[filters.supervisor], label: titleCase(filters.supervisor.replace("SUPERVISOR ", "")), kind: "supervisor" };
  if (filters.owner !== "all" && source.owners[filters.owner]) return { metrics: source.owners[filters.owner], label: ownerNames[filters.owner], kind: "responsável" };
  if (filters.state !== "all" && source.states[filters.state]) return { metrics: source.states[filters.state], label: stateNames[filters.state], kind: "estado" };
  return { metrics: periods[filters.period].metrics, label: "Brasil", kind: "nacional" };
}

function titleCase(value) {
  return value.toLocaleLowerCase("pt-BR").replace(/(^|\s|-)\S/g, (letter) => letter.toLocaleUpperCase("pt-BR"));
}

function projectionForScope(scope, period) {
  if (scope.kind === "nacional") return periods[period].projection;
  if (period === "sep") return scope.metrics.attended * (daysInMonth / daysElapsed);
  const projectedRatio = periods.ytd.projection / periods.ytd.metrics.attended;
  return scope.metrics.attended * projectedRatio;
}

function updateSummary() {
  const filters = currentFilters();
  const scope = selectedScope(filters);
  const metrics = scope.metrics;
  const ticket = metrics.clients ? metrics.attended / metrics.clients : 0;
  const projection = projectionForScope(scope, filters.period);
  const isGlobal = scope.kind === "nacional";
  const meta = periods[filters.period];
  const goalProgress = (meta.metrics.attended / meta.target) * 100;

  els.scope.textContent = `Visão: ${periods[filters.period].label} · ${scope.label}`;
  els.actual.textContent = moneyShort(metrics.attended);
  els.actualDetail.textContent = `${number.format(metrics.orders)} pedidos atendidos`;
  els.clients.textContent = number.format(metrics.clients);
  els.clientsDetail.textContent = `Compradores na visão de ${scope.kind}`;
  els.rcas.textContent = number.format(metrics.rcas);
  els.rcasDetail.textContent = `RCA com pedido no período`;
  els.positivization.textContent = number.format(metrics.clients);
  els.ticket.textContent = money.format(ticket);
  els.ticketDetail.textContent = `Realizado por cliente ativo`;
  els.projection.textContent = moneyShort(projection);
  els.projectionDetail.textContent = isGlobal ? "Ritmo setembro · 17 dias" : "Extrapolação do recorte";
  els.healthActive.textContent = number.format(metrics.clients);

  els.goalPercentage.textContent = `${goalProgress.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`;
  els.goalRing.style.background = `conic-gradient(var(--cyan) 0 ${Math.min(goalProgress, 100)}%, rgba(40, 81, 119, 0.55) ${Math.min(goalProgress, 100)}% 100%)`;
  els.goalRing.setAttribute("aria-label", `Atingimento da meta corporativa de ${goalProgress.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} por cento`);
  els.target.textContent = moneyShort(meta.target);
  els.goalProjection.textContent = moneyShort(meta.projection);
  els.shortfall.textContent = moneyShort(Math.max(meta.target - meta.projection, 0));

  renderTables(filters, scope);
}

function serviceLabel(attended, requested) {
  const rate = requested ? (attended / requested) * 100 : 100;
  if (rate < 98.8) return ["alert", `${rate.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`];
  if (rate < 99.4) return ["watch", `${rate.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`];
  return ["", `${rate.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`];
}

function renderTables(filters, scope) {
  let sellerRows = tables[filters.period].sellers;
  if (filters.seller !== "all") sellerRows = sellerRows.filter(([seller]) => seller === filters.seller);
  if (filters.supervisor !== "all") sellerRows = sellerRows.filter(([, supervisor]) => supervisor === filters.supervisor);
  if (filters.owner === "interno") sellerRows = sellerRows.filter(([, supervisor]) => supervisor === "COMERCIAL INTERNO");
  if (filters.owner === "externo") sellerRows = sellerRows.filter(([, supervisor]) => supervisor !== "COMERCIAL INTERNO");
  if (!sellerRows.length) sellerRows = tables[filters.period].sellers;
  els.team.innerHTML = sellerRows.slice(0, 10).map(([seller, supervisor, attended, requested, clients], index) => {
    const [tone, label] = serviceLabel(attended, requested);
    return `<tr>
      <td class="rank">${String(index + 1).padStart(2, "0")}</td>
      <td><span class="person">${escapeHtml(titleCase(seller))}</span></td>
      <td class="secondary-cell">${escapeHtml(titleCase(supervisor.replace("SUPERVISOR ", "")))}</td>
      <td class="number">${money.format(attended)}</td>
      <td class="number">${money.format(requested)}</td>
      <td class="number">${number.format(clients)}</td>
      <td class="number">${money.format(attended / clients)}</td>
      <td><span class="service-status ${tone}"><i></i>${label}</span></td>
    </tr>`;
  }).join("");

  let cityRows = tables[filters.period].cities;
  if (filters.state !== "all") cityRows = cityRows.filter(([, state]) => state === filters.state);
  if (filters.city !== "all") cityRows = cityRows.filter(([city]) => city.normalize("NFD").replace(/[\u0300-\u036f]/g, "") === filters.city);
  if (!cityRows.length) cityRows = tables[filters.period].cities;
  els.cities.innerHTML = cityRows.map(([city, state, attended, clients], index) => {
    const ticket = attended / clients;
    const signal = index === 0 ? "Liderança" : index < 3 ? "Potencial" : "Monitorar";
    const signalClass = index === 0 ? "" : index < 3 ? "watch" : "";
    return `<tr>
      <td class="rank">${String(index + 1).padStart(2, "0")}</td>
      <td><span class="person">${escapeHtml(titleCase(city))}</span></td>
      <td class="number">${state}</td>
      <td class="number">${money.format(attended)}</td>
      <td class="number">${number.format(clients)}</td>
      <td class="number">${money.format(ticket)}</td>
      <td><span class="review-pill">Em revisão</span></td>
      <td><span class="service-status ${signalClass}"><i></i>${signal}</span></td>
    </tr>`;
  }).join("");
}

function renderRanking(container, entries, type) {
  const max = entries[0][entries[0].length - 1];
  container.innerHTML = entries.map((entry, index) => {
    const [code, name, amount] = type === "state" ? entry : ["", entry[0], entry[1]];
    const label = type === "state" ? `${code} · ${name}` : name;
    const percentage = Math.max((amount / max) * 100, 3);
    const share = (amount / max) * 100;
    return `<div class="ranking-row">
      <span class="rank">${index + 1}</span>
      <div class="ranking-name"><span><b>${escapeHtml(label)}</b><small>${share.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%</small></span><div class="ranking-track"><i style="width:${percentage}%"></i></div></div>
      <span class="ranking-value">${moneyShort(amount)}</span>
    </div>`;
  }).join("");
}

function buildTrendChart() {
  const width = 760;
  const height = 300;
  const left = 50;
  const right = 20;
  const top = 24;
  const bottom = 38;
  const chartWidth = width - left - right;
  const chartHeight = height - top - bottom;
  const maxValue = 5600000;
  const xStep = chartWidth / monthly.length;
  const y = (value) => top + chartHeight - (value / maxValue) * chartHeight;
  const x = (index) => left + xStep * index + xStep / 2;
  const gridValues = [0, 1000000, 2000000, 3000000, 4000000, 5000000];
  const grid = gridValues.map((value) => {
    const position = y(value);
    const label = value === 0 ? "R$ 0" : `R$ ${value / 1000000} mi`;
    return `<g><line x1="${left}" y1="${position}" x2="${width - right}" y2="${position}" stroke="rgba(131,174,207,.18)" stroke-dasharray="3 6"/><text x="${left - 10}" y="${position + 4}" fill="#7fa2ba" font-size="10" text-anchor="end" font-family="DM Mono, monospace">${label}</text></g>`;
  }).join("");
  const bars = monthly.map((item, index) => {
    const barWidth = Math.min(40, xStep * 0.55);
    const heightValue = chartHeight - (y(item.attended) - top);
    return `<g><rect x="${x(index) - barWidth / 2}" y="${y(item.attended)}" width="${barWidth}" height="${heightValue}" rx="4" fill="url(#barGradient)" opacity=".96"><title>${item.label}: atendido ${money.format(item.attended)}</title></rect><text x="${x(index)}" y="${height - 12}" fill="#a4bed0" font-size="10" text-anchor="middle" font-family="DM Mono, monospace">${item.label}</text></g>`;
  }).join("");
  const requestedPoints = monthly.map((item, index) => `${x(index)},${y(item.requested)}`).join(" ");
  const points = monthly.map((item, index) => `<circle cx="${x(index)}" cy="${y(item.requested)}" r="4" fill="#ff55c2" stroke="#ffd2ec" stroke-width="1.4"><title>${item.label}: pedido ${money.format(item.requested)}</title></circle>`).join("");
  const targetY = y(monthlyTarget);
  els.trend.innerHTML = `
    <defs>
      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16dfff"/><stop offset="1" stop-color="#0870e8"/></linearGradient>
      <filter id="pinkGlow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    ${grid}
    <line x1="${left}" y1="${targetY}" x2="${width - right}" y2="${targetY}" stroke="#bdc8d2" stroke-width="1" stroke-dasharray="5 5" opacity=".65"/>
    <text x="${width - right}" y="${Math.max(targetY - 7, 12)}" fill="#bfcbd6" font-size="9" text-anchor="end" font-family="DM Mono, monospace">META MENSAL R$ 5,18 MI</text>
    ${bars}
    <polyline points="${requestedPoints}" fill="none" stroke="#ff48bd" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" filter="url(#pinkGlow)"/>
    ${points}
  `;
}

function showToast(message) {
  window.clearTimeout(showToast.timeout);
  els.toast.textContent = message;
  els.toast.classList.add("show");
  showToast.timeout = window.setTimeout(() => els.toast.classList.remove("show"), 2600);
}

function clearFilters() {
  els.period.value = "sep";
  [els.state, els.city, els.seller, els.supervisor, els.owner].forEach((element) => { element.value = "all"; });
  updateSummary();
  showToast("Filtros limpos. Visão nacional de setembro restaurada.");
}

Object.values(els).filter((element) => element && element.matches && element.matches("select")).forEach((element) => {
  element.addEventListener("change", () => {
    updateSummary();
    const scope = selectedScope(currentFilters());
    showToast(`Filtro aplicado: ${scope.label}.`);
  });
});
document.getElementById("clearFilters").addEventListener("click", clearFilters);

renderRanking(els.statesRanking, rankings.states, "state");
renderRanking(els.citiesRanking, rankings.cities, "city");
buildTrendChart();
updateSummary();
