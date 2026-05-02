// AUTO-GENERATED FROM index.html — page module: bidRT-dual
window.P = window.P || {};
/* ===== 실시간입찰: 이중정산 (DA↔RT) ===== */

/* KPI 4종 + 이중정산 상세 표의 베이스 데이터 (전체 기준 — 필터 시 mul 적용) */
window._BRD_BASE_KPI={daes:17.73, rtes:1.88, imbp:-0.48, total:19.13};
window._BRD_BASE_TABLE=[
  {time:'13:00', da:10.7, meas:10.9, daSmp:122, rtSmp:128, daes:1305, rtes:25,   imbp:0},
  {time:'14:00', da:10.9, meas:11.0, daSmp:125, rtSmp:130, daes:1362, rtes:13,   imbp:0},
  {time:'15:00', da:10.5, meas:9.7,  daSmp:132, rtSmp:135, daes:1386, rtes:-108, imbp:-240},
  {time:'16:00', da:10.1, meas:9.2,  daSmp:140, rtSmp:138, daes:1414, rtes:-124, imbp:-240}
];

window.P['bidRT-dual']=()=>`
${_mkCross('bidRT-dual')}
<div class="card mb" style="border-left:3px solid var(--semantic-brand-primary);padding:16px 20px;background:var(--semantic-brand-primary-assistive)">
  <div style="font-size:14px;font-weight:600;color:var(--semantic-label-strong);margin-bottom:6px">이중정산 구조 (Dual Settlement)</div>
  <div style="font-size:13px;line-height:20px;color:var(--semantic-label-normal)">
    <b>DAES</b>(하루전 에너지정산) = DA 낙찰량 × DA SMP &nbsp;＋&nbsp; <b>RTES</b>(실시간 편차정산) = (실측 − DA 낙찰량) × RT SMP &nbsp;−&nbsp; <b>IMBP</b>(불균형 페널티)<br>
    <span style="color:var(--semantic-label-alt)">※ DA 입찰 → RT 영향 O, RT 입찰 → DA 영향 X. 본 메뉴에서는 RT 단계에서의 편차/정산을 관리합니다.</span>
  </div>
</div>
${_mkBidFilter({prefix:'brd',onChange:'bidRtDualApply',rightInfo:'금일 합산 +19.13M · IMBP -0.48M · 편차 2건'})}
<div class="g4">
  <div class="card acc"><div class="ct">금일 DAES ${window.tip('DAES (Day-Ahead Energy Settlement)','하루전 시장에서 낙찰된 발전량의 정산금','Σ(낙찰량 × 낙찰가 × 24h 분배) [백만원]','시장 1차 정산 — 익일 06:00 KPX 확정')}</div><div class="kv" id="brd-kpi-daes">+17.73<span class="ku">백만원</span></div><div class="kd up" id="brd-kpi-daes-sub">DA 낙찰 성공</div></div>
  <div class="card"><div class="ct">금일 RTES ${window.tip('RTES (Real-Time Energy Settlement)','실시간 시장에서 발생한 편차 정산금','Σ(실측 - DA 낙찰량) × RT SMP [백만원]','DA 부족 → +RTES (추가 수익) / DA 초과 → -RTES (감산 손실)')}</div><div class="kv" id="brd-kpi-rtes">+1.88<span class="ku">백만원</span></div><div class="kd up" id="brd-kpi-rtes-sub">편차 순이익</div></div>
  <div class="card"><div class="ct">IMBP 페널티 ${window.tip('IMBP (Imbalance Penalty)','입찰 vs 실측 오차가 임계치 초과 시 부과되는 페널티','Σ(허용오차 초과 편차 × SMP × 1.2배) [백만원]','오차 8% 초과 시 SMP의 1.2배로 부과 — 운영자 부담')}</div><div class="kv" style="color:var(--semantic-negative-normal)" id="brd-kpi-imbp">-0.48<span class="ku">백만원</span></div><div class="kd dn" id="brd-kpi-imbp-sub">허용오차 초과 2건</div></div>
  <div class="card"><div class="ct">합산 순수익 ${window.tip('합산 순수익','이중 정산 항목 합계','DAES + RTES - IMBP [백만원]','정산 시뮬레이션 — 익일 06:00 KPX 확정 후 변동 가능 (±5%)')}</div><div class="kv" style="color:var(--semantic-brand-primary)" id="brd-kpi-total">19.13<span class="ku">백만원</span></div><div class="kd up" id="brd-kpi-total-sub">필터 적용 순수익</div></div>
</div>
<div class="g2">
  <div class="card mb"><div class="sh"><div class="st">시간대별 DA 낙찰 vs 실측 · 편차</div></div><div style="height:200px;position:relative"><canvas id="c-imb" role="img" aria-label="DA vs 실측"></canvas></div></div>
  <div class="card mb"><div class="sh"><div class="st">편차율 분포 (IMBP 구간)</div></div><div style="height:200px;position:relative"><canvas id="c-imbdist" role="img" aria-label="편차 분포"></canvas></div></div>
</div>
<div class="card"><div class="sh"><div class="st">이중정산 상세 · 오늘 <span style="font-size:11px;color:var(--semantic-label-alt);font-weight:400" id="brd-detail-ctx">전체</span></div><button class="cb p sm">상세 리포트</button></div>
<table class="tbl"><thead><tr><th>시각</th><th>DA 낙찰(MW)</th><th>실측(MW)</th><th>편차(%)</th><th>DA SMP</th><th>RT SMP</th><th>DAES</th><th>RTES</th><th>IMBP</th></tr></thead><tbody id="brd-detail-tbody"></tbody></table></div>`;
window['I_bidRT-dual']=function(){
  window._brdRender();
};

// KPI 4종 동적 갱신 (vMul × tMul 적용)
window._brdUpdateKPI=function(mul,vpp,type){
  var k=window._BRD_BASE_KPI;
  var daes=k.daes*mul, rtes=k.rtes*mul, imbp=k.imbp*mul, total=daes+rtes+imbp;
  var fmt=function(v){return (v>=0?'+':'')+v.toFixed(2);};
  var Q=function(id){return document.getElementById(id);};
  if(Q('brd-kpi-daes')) Q('brd-kpi-daes').innerHTML=fmt(daes)+'<span class="ku">백만원</span>';
  if(Q('brd-kpi-rtes')) Q('brd-kpi-rtes').innerHTML=fmt(rtes)+'<span class="ku">백만원</span>';
  if(Q('brd-kpi-imbp')) Q('brd-kpi-imbp').innerHTML=imbp.toFixed(2)+'<span class="ku">백만원</span>';
  if(Q('brd-kpi-total')) Q('brd-kpi-total').innerHTML=total.toFixed(2)+'<span class="ku">백만원</span>';
  // 부속 텍스트
  var ctxLabel=(vpp==='전체'?'전체':vpp)+(type==='all'?'':' · '+type);
  if(Q('brd-kpi-daes-sub')) Q('brd-kpi-daes-sub').textContent=ctxLabel+' 낙찰 정산';
  if(Q('brd-kpi-rtes-sub')) Q('brd-kpi-rtes-sub').textContent=rtes>=0?'편차 순이익':'편차 손실';
  if(Q('brd-kpi-imbp-sub')) Q('brd-kpi-imbp-sub').textContent=imbp<0?'허용오차 초과':'페널티 없음';
  if(Q('brd-kpi-total-sub')) Q('brd-kpi-total-sub').textContent=ctxLabel+' 합산';
  if(Q('brd-detail-ctx')) Q('brd-detail-ctx').textContent='— '+ctxLabel;
};

// 이중정산 상세 표 동적 렌더
window._brdRenderTable=function(mul){
  var tb=document.getElementById('brd-detail-tbody');
  if(!tb) return;
  tb.innerHTML=window._BRD_BASE_TABLE.map(function(r){
    var da=r.da*mul, meas=r.meas*mul, daes=r.daes*mul, rtes=r.rtes*mul, imbp=r.imbp*mul;
    var dev=da>0?((meas-da)/da*100):0;
    var devColor=dev>0?'var(--semantic-positive-normal)':(dev<0?'var(--semantic-negative-normal)':'var(--semantic-label-alt)');
    var devSign=dev>0?'+':'';
    var daesColor=daes>=0?'var(--semantic-positive-normal)':'var(--semantic-negative-normal)';
    var rtesColor=rtes>=0?'var(--semantic-positive-normal)':'var(--semantic-negative-normal)';
    var imbpColor=imbp<0?'var(--semantic-negative-normal)':'var(--semantic-label-alt)';
    var fmt=function(n){return (n>=0?'+':'')+Math.round(n).toLocaleString();};
    return '<tr>'
      +'<td class="mono">'+r.time+'</td>'
      +'<td class="mono">'+da.toFixed(2)+'</td>'
      +'<td class="mono">'+meas.toFixed(2)+'</td>'
      +'<td class="mono" style="color:'+devColor+'">'+devSign+dev.toFixed(1)+'%</td>'
      +'<td class="mono">'+r.daSmp+'</td>'
      +'<td class="mono">'+r.rtSmp+'</td>'
      +'<td class="mono" style="color:'+daesColor+'">'+fmt(daes)+'</td>'
      +'<td class="mono" style="color:'+rtesColor+'">'+fmt(rtes)+'</td>'
      +'<td class="mono" style="color:'+imbpColor+'">'+(imbp===0?'0':fmt(imbp))+'</td>'
      +'</tr>';
  }).join('');
};

window._brdRender=function(){
  const vpp=document.getElementById('brd-vpp')?.value||'전체';
  const type=document.getElementById('brd-type')?.value||'all';
  const vMul={'전체':1.0,'VPP-전남권':0.62,'VPP-제주권':0.18,'VPP-경북권':0.20}[vpp]||1.0;
  const tMul={'all':1.0,'태양광':0.55,'풍력':0.30,'ESS':0.08,'바이오':0.05,'V2G':0.02}[type]||1.0;
  const mul=vMul*tMul;
  // KPI 4종 + 이중정산 상세 표 동적 갱신
  window._brdUpdateKPI(mul,vpp,type);
  window._brdRenderTable(mul);
  // 차트 (기존 로직)
  const h=['09','10','11','12','13','14','15','16','17'];
  const da=[5.8,8.1,9.8,10.7,10.9,10.5,10,10.1,9.6].map(v=>+(v*mul).toFixed(2));
  const meas=[6.0,8.3,10.0,10.9,11.0,9.7,9.2,10.3,9.4].map(v=>+(v*mul).toFixed(2));
  mkChart('c-imb','bar',h,[
    {label:'DA 낙찰',data:da,backgroundColor:'rgba(120,120,120,0.35)',borderWidth:0},
    {label:'실측',data:meas,backgroundColor:'rgba(0,89,255,0.55)',borderWidth:0},
  ],{});
  mkChart('c-imbdist','bar',['-10%↓','-5~-10%','±5%','+5~+10%','+10%↑'],[
    {data:[1,2,18,3,0],backgroundColor:['rgba(239,68,68,0.55)','rgba(245,158,11,0.55)','rgba(0,212,168,0.55)','rgba(245,158,11,0.55)','rgba(239,68,68,0.55)'],borderWidth:0}
  ],{});
};
window.bidRtDualApply=function(){ window._brdRender(); };

