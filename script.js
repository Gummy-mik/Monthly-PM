
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>PM Monthly Update Dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    :root { --brand:#00a6d6; --border:#555; --muted:#666; --bg:#fff; --stripe:#f7f9fb; }
    *{ box-sizing:border-box }
    body{ font-family:system-ui,Segoe UI,Arial,sans-serif; margin:16px; color:#111; background:var(--bg) }
    header{ display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; margin-bottom:12px }
    h1{ font-size:18px; margin:0 }
    .controls{ display:flex; align-items:center; gap:8px; flex-wrap:wrap }
    input[type="text"]{ padding:6px 8px; border:1px solid #aaa; border-radius:4px; min-width:220px }
    button{ padding:8px 12px; background:#0f62fe; color:#fff; border:1px solid #0f62fe; border-radius:6px; cursor:pointer; font-weight:600 }
    button.secondary{ background:#fff; color:#0f62fe }
    .table-wrap{ overflow:auto; border:1px solid var(--border); border-radius:6px }
    table{ border-collapse:collapse; width:100%; min-width:900px }
    thead th{ background:var(--brand); color:#fff; text-align:center; padding:10px 8px; border:1px solid var(--border); font-weight:700; font-size:14px }
    tbody td, tfoot td{ border:1px solid var(--border); padding:6px 8px; font-size:14px }
    .region-row td{ background:#e9eef3; font-weight:800; letter-spacing:.3px }
    .label-cell{ font-weight:600; white-space:nowrap }
    .right{ text-align:right } .center{ text-align:center }
    tbody tr:nth-child(even) td{ background:var(--stripe) }
    tfoot td{ font-weight:800; background:#f0f4f7 }
    .variance-pos{ color:#0b8457 } .variance-neg{ color:#b00020 }
    .pct-cell{ font-weight:700 }
    .meta{ margin-top:8px; color:var(--muted); font-size:13px }
    @media print{
      @page{ size:A4 landscape; margin:12mm }
      header,.meta{ display:none!important }
      body{ margin:0 } .table-wrap{ border:none }
      thead th{ -webkit-print-color-adjust:exact; print-color-adjust:exact }
    }
  </style>
</head>
<body>
  <header>
    <h1>MONTHLY UPDATE</h1>
    <div class="controls">
      <input type="text" id="dateRange" value="Feb 2 – Feb 5" />
      <button id="downloadPdfBtn">Download PDF</button>
      <button id="resetBtn" class="secondary">Reset Sample</button>
    </div>
  </header>

  <div class="table-wrap">
    <table id="pmTable" aria-label="PM Monthly Update Table">
      <thead>
        <tr>
          <th style="width:220px">&nbsp;</th>
          <th>TOTAL SITES</th>
          <th>REQUIRED VISIT</th>
          <th>QPM TOTAL</th>
          <th>PLANNED</th>
          <th>ACTUAL</th>
          <th>VARIANCE</th>
          <th>%</th>
        </tr>
      </thead>
      <tbody id="tbody"></tbody>
      <tfoot id="tfoot"></tfoot>
    </table>
  </div>

  <div class="meta" id="generatedNote"></div>

  <!-- increase v= number kapag nag-a-update ka para ma-bypass ang cache -->
  <script src="script.js?v=7"></script>
</body>
</html>
