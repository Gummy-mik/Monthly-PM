
/* PM Monthly Update Dashboard – v7 */
const $ = (id) => document.getElementById(id);
const fmt = (n) => new Intl.NumberFormat('en-PH').format(n);
const pct = (num, den) => (den > 0 ? (num / den) * 100 : 0);

// ---------- DATA (EDIT HERE) ----------
let regions = [];

function loadSample() {
  // NORTH LUZON with sub-rows: AJSL - BC, AJSL - CC, AJSL - PLC
  regions = [
    {
      name: 'NORTH LUZON',
      rows: [
        { label: 'AJSL - BC',  totalSites: 57, required: 114, qpm: 3, planned: 26, actual: 26 },
        { label: 'AJSL - CC',  totalSites: 3,  required: 6,   qpm: 0, planned:  6, actual:  2 },
        { label: 'AJSL - PLC', totalSites: 5,  required: 10,  qpm: 0, planned: 10, actual:  1 },
      ]
    }
  ];
}
// -------------------------------------

function computeRegionTotals(region) {
  const t = { totalSites: 0, required: 0, qpm: 0, planned: 0, actual: 0 };
  for (const r of region.rows) {
    t.totalSites += r.totalSites || 0;
    t.required   += r.required   || 0;
    t.qpm        += r.qpm        || 0;
    t.planned    += r.planned    || 0;
    t.actual     += r.actual     || 0;
  }
  t.variance = t.planned - t.actual;
  t.percent = pct(t.actual, t.required);
  return t;
}

function computeGrandTotals(data) {
  const t = { totalSites: 0, required: 0, qpm: 0, planned: 0, actual: 0 };
  for (const region of data) {
    const rt = computeRegionTotals(region);
    t.totalSites += rt.totalSites;
    t.required   += rt.required;
    t.qpm        += rt.qpm;
    t.planned    += rt.planned;
    t.actual     += rt.actual;
  }
  t.variance = t.planned - t.actual;
  t.percent = pct(t.actual, t.required);
  return t;
}

function render() {
  const tbody = $("tbody");
  const tfoot = $("tfoot");
  tbody.innerHTML = "";
  tfoot.innerHTML = "";

  // Regions
  for (const region of regions) {
    const rt = computeRegionTotals(region);

    // Region header row
    const rHead = document.createElement("tr");
    rHead.className = "region-row";
    rHead.innerHTML = `
      <td class="label-cell">${region.name}</td>
      <td class="right">${fmt(rt.totalSites)}</td>
      <td class="right">${fmt(rt.required)}</td>
      <td class="right">${fmt(rt.qpm)}</td>
      <td class="right">${fmt(rt.planned)}</td>
      <td class="right">${fmt(rt.actual)}</td>
      <td class="right ${rt.variance >= 0 ? 'variance-pos' : 'variance-neg'}">${fmt(rt.variance)}</td>
      <td class="right pct-cell">${rt.percent.toFixed(1)}%</td>
    `;
    tbody.appendChild(rHead);

    // Sub-rows (e.g., AJSL - BC / CC / PLC)
    for (const row of region.rows) {
      const variance = (row.planned || 0) - (row.actual || 0);
      const percent = pct(row.actual || 0, row.required || 0);
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="label-cell">${row.label}</td>
        <td class="right">${fmt(row.totalSites || 0)}</td>
        <td class="right">${fmt(row.required || 0)}</td>
        <td class="right">${fmt(row.qpm || 0)}</td>
        <td class="right">${fmt(row.planned || 0)}</td>
        <td class="right">${fmt(row.actual || 0)}</td>
        <td class="right ${variance >= 0 ? 'variance-pos' : 'variance-neg'}">${fmt(variance)}</td>
        <td class="right pct-cell">${percent.toFixed(1)}%</td>
      `;
      tbody.appendChild(tr);
    }
  }

  // Grand total (footer)
  const g = computeGrandTotals(regions);
  const trf = document.createElement("tr");
  trf.innerHTML = `
    <td class="label-cell">TOTAL</td>
    <td class="right">${fmt(g.totalSites)}</td>
    <td class="right">${fmt(g.required)}</td>
    <td class="right">${fmt(g.qpm)}</td>
    <td class="right">${fmt(g.planned)}</td>
    <td class="right">${fmt(g.actual)}</td>
    <td class="right ${g.variance >= 0 ? 'variance-pos' : 'variance-neg'}">${fmt(g.variance)}</td>
    <td class="right pct-cell">${g.percent.toFixed(1)}%</td>
  `;
  tfoot.appendChild(trf);

  // Note
  const dateRange = $("dateRange").value || "";
  $("generatedNote").textContent = `Period: ${dateRange} • Generated: ${new Date().toLocaleString('en-PH')}`;
}

function handlePdf() { window.print(); }

function wireEvents() {
  $("downloadPdfBtn").addEventListener("click", handlePdf);
  $("dateRange").addEventListener("change", render);
  $("resetBtn").addEventListener("click", () => { loadSample(); render(); });
}

(function init() {
  loadSample();
  wireEvents();
  render();
})();
