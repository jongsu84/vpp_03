// AUTO-GENERATED FROM index.html — page module: bidRT-dual
window.P = window.P || {};
/* ===== 실시간입찰: 이중정산 (DA↔RT) ===== */
window.P['bidRT-dual']=()=>`
${_mkCross('bidRT-dual')}
${_mkBidFilter({rightInfo:'편차(Imbalance) · IMBP 정산 기준'})}
<div class="card mb" style="border-left:3px solid var(--semantic-brand-primary);padding:16px 20px;background:var(--semantic-brand-primary-assistive)">
  <div style="font-size:14px;font-weight:600;color:var(--semantic-label-strong);margin-bottom:6px">이중정산 구조 (Dual Settlement)</div>
  <div style="font-size:13px;line-height:20px;color:var(--semantic-label-normal)">
    <b>DAES</b>(하루전 에너지정산) = DA 낙찰량 × DA SMP &nbsp;＋&nbsp; <b>RTES</b>(실시간 편차정산) = (실측 − DA 낙찰량) × RT SMP &nbsp;−&nbsp; <b>IMBP</b>(불균형 페널티)<br>
    <span style="color:var(--semantic-label-alt)">※ DA 입찰 → RT 영향 O, RT 입찰 → DA 영향 X. 본 메뉴에서는 RT 단계에서의 편차/정산을 관리합니다.</span>
  </div>
</div>
<div class="g4">
  <div class="card acc"><div class="ct">금일 DAES ${window.tip('DAES (Day-Ahead Energy Settlement)','하루전 시장에서 낙찰된 발전량의 정산금','Σ(낙찰량 × 낙찰가 × 24h 분배) [백만원]','시장 1차 정산 — 익일 06:00 KPX 확정')}</div><div class="kv">+17.73<span class="ku">백만원</span></div><div class="kd up">DA 낙찰 성공</div></div>
  <div class="card"><div class="ct">금일 RTES ${window.tip('RTES (Real-Time Energy Settlement)','실시간 시장에서 발생한 편차 정산금','Σ(실측 - DA 낙찰량) × RT SMP [백만원]','DA 부족 → +RTES (추가 수익) / DA 초과 → -RTES (감산 손실)')}</div><div class="kv">+1.88<span class="ku">백만원</span></div><div class="kd up">편차 순이익</div></div>
  <div class="card"><div class="ct">IMBP 페널티 ${window.tip('IMBP (Imbalance Penalty)','입찰 vs 실측 오차가 임계치 초과 시 부과되는 페널티','Σ(허용오차 초과 편차 × SMP × 1.2배) [백만원]','오차 8% 초과 시 SMP의 1.2배로 부과 — 운영자 부담')}</div><div class="kv" style="color:var(--semantic-negative-normal)">-0.48<span class="ku">백만원</span></div><div class="kd dn">허용오차 초과 2건</div></div>
  <div class="card"><div class="ct">합산 순수익 ${window.tip('합산 순수익','이중 정산 항목 합계','DAES + RTES - IMBP [백만원]','정산 시뮬레이션 — 익일 06:00 KPX 확정 후 변동 가능 (±5%)')}</div><div class="kv" style="color:var(--semantic-brand-primary)">19.13<span class="ku">백만원</span></div></div>
</div>
<div class="g2">
  <div class="card mb"><div class="sh"><div class="st">시간대별 DA 낙찰 vs 실측 · 편차</div></div><div style="height:200px;position:relative"><canvas id="c-imb" role="img" aria-label="DA vs 실측"></canvas></div></div>
  <div class="card mb"><div class="sh"><div class="st">편차율 분포 (IMBP 구간)</div></div><div style="height:200px;position:relative"><canvas id="c-imbdist" role="img" aria-label="편차 분포"></canvas></div></div>
</div>
<div class="card"><div class="sh"><div class="st">이중정산 상세 · 오늘</div><button class="cb p sm">상세 리포트</button></div>
<table class="tbl"><thead><tr><th>시각</th><th>DA 낙찰(MW)</th><th>실측(MW)</th><th>편차(%)</th><th>DA SMP</th><th>RT SMP</th><th>DAES</th><th>RTES</th><th>IMBP</th></tr></thead><tbody>
  <tr><td class="mono">13:00</td><td class="mono">10.7</td><td class="mono">10.9</td><td class="mono" style="color:var(--semantic-positive-normal)">+1.9%</td><td class="mono">122</td><td class="mono">128</td><td class="mono" style="color:var(--semantic-positive-normal)">+1,305</td><td class="mono" style="color:var(--semantic-positive-normal)">+25</td><td class="mono">0</td></tr>
  <tr><td class="mono">14:00</td><td class="mono">10.9</td><td class="mono">11.0</td><td class="mono" style="color:var(--semantic-positive-normal)">+0.9%</td><td class="mono">125</td><td class="mono">130</td><td class="mono" style="color:var(--semantic-positive-normal)">+1,362</td><td class="mono" style="color:var(--semantic-positive-normal)">+13</td><td class="mono">0</td></tr>
  <tr><td class="mono">15:00</td><td class="mono">10.5</td><td class="mono">9.7</td><td class="mono" style="color:var(--semantic-negative-normal)">-7.6%</td><td class="mono">132</td><td class="mono">135</td><td class="mono" style="color:var(--semantic-positive-normal)">+1,386</td><td class="mono" style="color:var(--semantic-negative-normal)">-108</td><td class="mono" style="color:var(--semantic-negative-normal)">-240</td></tr>
  <tr><td class="mono">16:00</td><td class="mono">10.1</td><td class="mono">9.2</td><td class="mono" style="color:var(--semantic-negative-normal)">-8.9%</td><td class="mono">140</td><td class="mono">138</td><td class="mono" style="color:var(--semantic-positive-normal)">+1,414</td><td class="mono" style="color:var(--semantic-negative-normal)">-124</td><td class="mono" style="color:var(--semantic-negative-normal)">-240</td></tr>
</tbody></table></div>`;
window['I_bidRT-dual']=function(){
  const h=['09','10','11','12','13','14','15','16','17'];
  mkChart('c-imb','bar',h,[
    {label:'DA 낙찰',data:[5.8,8.1,9.8,10.7,10.9,10.5,10,10.1,9.6],backgroundColor:'rgba(120,120,120,0.35)',borderWidth:0},
    {label:'실측',data:[6.0,8.3,10.0,10.9,11.0,9.7,9.2,10.3,9.4],backgroundColor:'rgba(0,89,255,0.55)',borderWidth:0},
  ],{});
  mkChart('c-imbdist','bar',['-10%↓','-5~-10%','±5%','+5~+10%','+10%↑'],[
    {data:[1,2,18,3,0],backgroundColor:['rgba(239,68,68,0.55)','rgba(245,158,11,0.55)','rgba(0,212,168,0.55)','rgba(245,158,11,0.55)','rgba(239,68,68,0.55)'],borderWidth:0}
  ],{});
};

