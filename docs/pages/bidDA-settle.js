// AUTO-GENERATED FROM index.html — page module: bidDA-settle
window.P = window.P || {};
/* ===== 하루전입찰: 정산 관리 (DA 예상 기반) ===== */
window.P['bidDA-settle']=()=>`
${_mkCross('bidDA-settle')}

<!-- 안내 카드 -->
<div class="card mb" style="border-left:3px solid var(--semantic-brand-primary);padding:14px 18px;background:var(--semantic-brand-primary-assistive);margin-bottom:12px">
  <div style="font-size:14px;font-weight:600;margin-bottom:4px">하루전 정산 관리 (예측 기반)</div>
  <div style="font-size:13px;line-height:20px;color:var(--semantic-label-normal)">
    DA 낙찰 시점에 확정된 <b>DAES + CP</b> 기반 예상 수익을 관리합니다.
    최종 확정 정산(RTES·IMBP 포함)은 <span onclick="activate('bidRT-mgmt')" style="color:var(--semantic-brand-primary);cursor:pointer;font-weight:500">실시간 입찰 → 정산 관리 ↗</span>에서 확인하세요.
  </div>
</div>

<!-- VPP 그룹 · 자원 유형 · 차수 · 기간 필터 -->
<div class="card fbar"><div class="fbar-row">
  <div class="fbar-item">
    <span class="fbar-lbl">VPP 그룹</span>
    <select class="fbar-sel" id="bds-vpp" onchange="stlUpdateInfo()"><option>전체</option><option>VPP-전남권</option><option>VPP-제주권</option><option>VPP-경북권</option></select>
  </div>
  <div class="fbar-item">
    <span class="fbar-lbl">자원 유형</span>
    <select class="fbar-sel" id="bds-type" onchange="stlUpdateInfo()"><option value="all">전체</option><option>태양광</option><option>풍력</option><option>ESS</option><option>바이오</option><option>V2G</option></select>
  </div>
  <div class="fbar-item" style="width:auto">
    <span class="fbar-lbl">차수</span>
    <div style="display:inline-flex;background:var(--semantic-background-3);padding:3px;border-radius:6px;gap:2px;height:34px;align-items:center;white-space:nowrap">
      <button class="rd-tab active" onclick="selStlRound('all',this)">통합</button>
      <button class="rd-tab" onclick="selStlRound('1',this)">1차</button>
      <button class="rd-tab" onclick="selStlRound('2',this)">2차</button>
    </div>
  </div>
  <div class="fbar-item">
    <span class="fbar-lbl">기간</span>
    <select class="fbar-sel" id="bds-period" onchange="stlUpdateInfo()"><option>2026년 4월</option><option>2026년 3월</option><option>2026년 2월</option></select>
  </div>
  <div class="fbar-item" style="margin-left:auto;justify-content:flex-end">
    <span class="fbar-lbl" id="stl-filter-info" style="text-align:right">통합 · 금일 + 월누계</span>
  </div>
</div></div>

<!-- KPI 4종 -->
<div class="g4">
  <div class="card acc"><div class="ct">예상 DAES (금일) ${window.tip('DAES (Day-Ahead Energy Settlement)','하루전 시장 낙찰분에 대한 정산금','Σ(낙찰량 × 낙찰가) [백만원]','DA 낙찰가 = 1차/2차 평균 — 익일 06:00 KPX 발표 후 확정')}</div><div class="kv" id="stl-daes">17.73<span class="ku">백만원</span></div><div class="kd up">DA 낙찰가 평균 122원</div></div>
  <div class="card"><div class="ct">CP 예상 (월간) ${window.tip('CP 예상 (월간)','이번 달 누적 CP 정산 추정','가용용량 × 월 CP 단가 [백만원]','월 고정 — SMP 변동 무관 / 정비·차단 시간만큼 차감')}</div><div class="kv">3.12<span class="ku">백만원</span></div><div class="kd neu">가용용량 × CP 단가</div></div>
  <div class="card"><div class="ct">예상 순수익 (DA 기준) ${window.tip('예상 순수익 (DA 기준)','DA 정산만 고려한 추정 순수익','DAES + CP - 변동비 - 수수료 [백만원]','RT 갱신·IMBP·인센티브 제외 — 보수적 추정값')}</div><div class="kv" style="color:var(--semantic-brand-primary)" id="stl-net">20.85<span class="ku">백만원</span></div><div class="kd up">DAES + CP</div></div>
  <div class="card"><div class="ct">낙찰률 ${window.tip('낙찰률','입찰 제출량 대비 낙찰 결정량 비율','낙찰량 ÷ 제출량 × 100 [%]','95% 이상 정상 / 85~95% 주의 — 낮으면 입찰가 너무 높거나 시장 경쟁 심화')}</div><div class="kv" style="color:var(--semantic-positive-normal)" id="stl-rate">94<span class="ku">%</span></div><div class="kd up">1차 96% / 2차 91%</div></div>
</div>

<!-- 차수별 정산 분해 + 기여도 -->
<div class="g2">
  <div class="card mb"><div class="sh"><div class="st">차수별 DA 정산 분해</div></div>
    <div style="font-size:11px;color:var(--semantic-brand-primary);margin-bottom:4px;font-weight:600">1차 (D-1 11:00 제출)</div>
    <div class="mr"><div class="ml">1차 DAES</div><div class="mv mono" style="color:var(--semantic-positive-normal)">+10,450천원</div></div>
    <div class="mr"><div class="ml">1차 낙찰용량</div><div class="mv mono">145.2 MW</div></div>
    <div class="mr"><div class="ml">1차 낙찰가 평균</div><div class="mv mono">122 원/kWh</div></div>
    <div style="font-size:11px;color:var(--semantic-brand-primary);margin:16px 0 4px;font-weight:600">2차 (D-1 15:00 제출)</div>
    <div class="mr"><div class="ml">2차 DAES</div><div class="mv mono" style="color:var(--semantic-positive-normal)">+7,280천원</div></div>
    <div class="mr"><div class="ml">2차 낙찰용량</div><div class="mv mono">142.7 MW</div></div>
    <div class="mr"><div class="ml">2차 낙찰가 평균</div><div class="mv mono">128 원/kWh</div></div>
    <div class="mr" style="border:none;padding-top:10px;margin-top:6px;border-top:1px solid var(--semantic-line-normal)"><div class="ml" style="font-weight:600">합산 DAES</div><div class="mv" style="font-size:15px;color:var(--semantic-brand-primary)">+17,730천원</div></div>
  </div>
  <div class="card mb"><div class="sh"><div class="st">차수 기여도</div></div>
    <div style="height:220px;position:relative"><canvas id="c-da-stl-pie" role="img" aria-label="차수 기여도"></canvas></div>
  </div>
</div>

<!-- 월간 DA 정산 추이 -->
<div class="card mb"><div class="sh"><div class="st">월간 DA 정산 추이 (RTES 제외한 DA 단독 기준)</div><span class="sa" onclick="activate('bidRT-mgmt')">확정 정산 ↗</span></div>
  <div style="height:170px;position:relative"><canvas id="c-da-stl-trend" role="img" aria-label="월간 DA 추이"></canvas></div>
</div>

<!-- 자원별 DA 배분 시뮬 -->
<div class="card"><div class="sh"><div class="st">자원별 DA 배분 시뮬레이션 (금일 예상)</div>${window.csvBtn('da-alloc-tbody','da_allocation','자원별 DA 배분 시뮬레이션')}</div>
<table class="tbl"><thead><tr><th>발전소명</th><th>발전원</th><th>1차 낙찰(MWh)</th><th>2차 낙찰(MWh)</th><th>1차 DAES</th><th>2차 DAES</th><th>CP 배분</th><th>합산 예상</th><th>기여율</th></tr></thead><tbody id="da-alloc-tbody">
  <tr><td>광양항태양광</td><td>태양광</td><td class="mono">9.2</td><td class="mono">7.1</td><td class="mono" style="color:var(--semantic-positive-normal)">+1,122K</td><td class="mono" style="color:var(--semantic-positive-normal)">+909K</td><td class="mono">+398K</td><td class="mono" style="color:var(--semantic-brand-primary)">+2,429K</td><td class="mono">13.7%</td></tr>
  <tr><td>광양항4단계</td><td>태양광</td><td class="mono">8.8</td><td class="mono">6.9</td><td class="mono" style="color:var(--semantic-positive-normal)">+1,074K</td><td class="mono" style="color:var(--semantic-positive-normal)">+883K</td><td class="mono">+382K</td><td class="mono" style="color:var(--semantic-brand-primary)">+2,339K</td><td class="mono">13.2%</td></tr>
  <tr><td>해맞이</td><td>태양광</td><td class="mono">4.0</td><td class="mono">3.1</td><td class="mono">+488K</td><td class="mono">+397K</td><td class="mono">+174K</td><td class="mono">+1,059K</td><td class="mono">6.0%</td></tr>
  <tr><td>온누리</td><td>태양광</td><td class="mono">3.8</td><td class="mono">2.9</td><td class="mono">+464K</td><td class="mono">+371K</td><td class="mono">+165K</td><td class="mono">+1,000K</td><td class="mono">5.6%</td></tr>
  <tr><td>금능1호</td><td>태양광</td><td class="mono">3.5</td><td class="mono">2.6</td><td class="mono">+351K</td><td class="mono">+268K</td><td class="mono">+152K</td><td class="mono">+771K</td><td class="mono">4.4%</td></tr>
  <tr><td>김주풍력</td><td>풍력</td><td class="mono">15.2</td><td class="mono">14.8</td><td class="mono" style="color:var(--semantic-positive-normal)">+1,444K</td><td class="mono" style="color:var(--semantic-positive-normal)">+1,420K</td><td class="mono">+628K</td><td class="mono" style="color:var(--semantic-brand-primary)">+3,492K</td><td class="mono">19.7%</td></tr>
  <tr data-no-sort="1" style="font-weight:600;background:var(--semantic-background-2)"><td colspan="2">합계</td><td class="mono">44.5</td><td class="mono">37.4</td><td class="mono">+4,943K</td><td class="mono">+4,248K</td><td class="mono">+1,899K</td><td class="mono" style="color:var(--semantic-brand-primary)">+11,090K</td><td class="mono">62.6%</td></tr>
</tbody></table>
<div style="font-size:11px;color:var(--semantic-label-alt);margin-top:10px;line-height:18px">※ 본 명세는 <b>DA 낙찰 확정 기반 예측치</b>입니다. RT 실측·IMBP 반영된 최종 배분은 실시간 입찰 → 정산 관리 페이지를 참고하세요.</div>
</div>`;
window['I_bidDA-settle']=function(){
  mkChart('c-da-stl-pie','doughnut',['1차 DAES','2차 DAES','CP'],[
    {data:[10.45,7.28,3.12],backgroundColor:['rgba(0,89,255,0.6)','rgba(255,202,66,0.65)','rgba(0,212,168,0.5)'],borderWidth:0}
  ],{plugins:{legend:{display:true,position:'bottom',labels:{font:{size:11}}}}});
  mkChart('c-da-stl-trend','bar',['11월','12월','1월','2월','3월','4월'],[
    {label:'1차 DAES',data:[145,152,128,162,155,168],backgroundColor:'rgba(0,89,255,0.45)',borderWidth:0,stack:'d'},
    {label:'2차 DAES',data:[95,108,85,112,99,115],backgroundColor:'rgba(255,202,66,0.55)',borderWidth:0,stack:'d'},
    {label:'CP',data:[31,32,30,31,30,31],backgroundColor:'rgba(0,212,168,0.45)',borderWidth:0,stack:'d'},
  ],{scales:{y:{stacked:true,ticks:{callback:v=>v+'M'}},x:{stacked:true}},plugins:{legend:{display:true,position:'bottom',labels:{font:{size:11}}}}});
};
window.selStlRound=function(r,el){
  document.querySelectorAll('#pages .rd-tab').forEach(e=>e.classList.remove('active'));
  el.classList.add('active');
  window._stlRound=r;
  window.stlUpdateInfo();
};
window.stlUpdateInfo=function(){
  const r=window._stlRound||'all';
  const vpp=document.getElementById('bds-vpp')?.value||'전체';
  const type=document.getElementById('bds-type')?.value||'all';
  const period=document.getElementById('bds-period')?.value||'2026년 4월';
  const Q=id=>document.getElementById(id);
  const info=Q('stl-filter-info');
  // 차수 + VPP·자원유형별 정산금액 (시뮬레이션 — 그룹별 가중치 적용)
  const vppMul={'전체':1.0,'VPP-전남권':0.62,'VPP-제주권':0.18,'VPP-경북권':0.20}[vpp]||1.0;
  const typeMul={'all':1.0,'태양광':0.55,'풍력':0.30,'ESS':0.08,'바이오':0.05,'V2G':0.02}[type]||1.0;
  const mul=vppMul*typeMul;
  let daes,net,rate,base;
  if(r==='all'){ daes=17.73; net=20.85; rate=94; base='통합'; }
  else if(r==='1'){ daes=10.45; net=13.57; rate=96; base='1차 기준 · D-1 11:00 제출'; }
  else { daes=7.28; net=10.40; rate=91; base='2차 기준 · D-1 15:00 제출'; }
  if(Q('stl-daes')) Q('stl-daes').innerHTML=(daes*mul).toFixed(2)+'<span class="ku">백만원</span>';
  if(Q('stl-net')) Q('stl-net').innerHTML=(net*mul).toFixed(2)+'<span class="ku">백만원</span>';
  if(Q('stl-rate')) Q('stl-rate').innerHTML=rate+'<span class="ku">%</span>';
  if(info){
    const parts=[base];
    if(vpp!=='전체') parts.push(vpp);
    if(type!=='all') parts.push(type);
    if(period!=='2026년 4월') parts.push(period);
    info.textContent=parts.join(' · ');
  }
};

