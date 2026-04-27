// AUTO-GENERATED FROM index.html — page module: bidRT-revenue
window.P = window.P || {};
/* ===== 실시간입찰: 입찰수익 시뮬 ===== */
window.P['bidRT-revenue']=()=>`
${_mkCross('bidRT-revenue')}
${_mkBidFilter({rightInfo:'DAES + RTES - IMBP 기준'})}
<div class="g4">
  <div class="card acc"><div class="ct">예상 순수익(금일) ${window.tip('금일 예상 순수익','오늘 발생한 모든 정산 항목의 합산','DAES + RTES - IMBP [백만원]','시장 마감 전 추정값 — KPX 06:00 확정 후 ±5% 변동 가능')}</div><div class="kv">19.13<span class="ku">백만원</span></div><div class="kd up">DAES+RTES-IMBP</div></div>
  <div class="card"><div class="ct">DAES (하루전 매출) ${window.tip('DAES (하루전 매출)','하루전 시장 낙찰 정산금','Σ(낙찰량 × 낙찰가) [백만원]','전체 매출의 가장 큰 비중 — 보통 80~90%')}</div><div class="kv">17.73<span class="ku">백만원</span></div></div>
  <div class="card"><div class="ct">RTES (실시간 편차) ${window.tip('RTES (실시간 편차)','RT 시장에서 발생한 편차 정산','Σ(실측 - DA 낙찰량) × RT SMP [백만원]','+ 또는 - 가능 / DA 부족 시 +수익, DA 초과 시 -손실')}</div><div class="kv">1.88<span class="ku">백만원</span></div></div>
  <div class="card"><div class="ct">IMBP (페널티) ${window.tip('IMBP 페널티','허용오차 초과 시 부과되는 페널티','Σ(초과 편차 × SMP × 1.2) [백만원]','오차 8% 이내로 관리 시 0원 — 예측 정확도가 핵심')}</div><div class="kv" style="color:var(--semantic-negative-normal)">0.48<span class="ku">백만원</span></div></div>
</div>
<div class="g2">
  <div class="card mb"><div class="sh"><div class="st">전략 시나리오 비교</div></div><div style="height:170px;position:relative"><canvas id="c-scenario" role="img" aria-label="시나리오 비교"></canvas></div></div>
  <div class="card mb"><div class="sh"><div class="st">RT SMP 민감도 분석</div></div><div style="height:170px;position:relative"><canvas id="c-sens" role="img" aria-label="민감도"></canvas></div></div>
</div>
<div class="card"><div class="sh"><div class="st">가상 정산 내역 · 이중정산 기준</div><button class="cb p sm">PDF 발행</button></div>
<table class="tbl"><thead><tr><th>정산 항목</th><th>산식</th><th>금액</th><th>비고</th></tr></thead><tbody>
  <tr><td>DA 에너지정산금 DAES</td><td class="mono" style="font-size:12px">DA 낙찰량 × DA SMP × h</td><td class="mono" style="color:var(--semantic-positive-normal)">+15,842천원</td><td>DA 기준</td></tr>
  <tr><td>RT 편차정산금 RTES</td><td class="mono" style="font-size:12px">(실측 − DA 낙찰) × RT SMP</td><td class="mono" style="color:var(--semantic-positive-normal)">+1,883천원</td><td>실시간 편차</td></tr>
  <tr><td>용량정산금 CP</td><td class="mono" style="font-size:12px">가용용량 × CP 단가</td><td class="mono">+3,120천원</td><td>월 정산</td></tr>
  <tr><td>IMBP 페널티</td><td class="mono" style="font-size:12px">오차량(|Δ|&gt;5%) × 페널티단가</td><td class="mono" style="color:var(--semantic-negative-normal)">-480천원</td><td>차감</td></tr>
  <tr style="font-weight:600"><td>합계 순수익</td><td></td><td class="mono" style="color:var(--semantic-brand-primary)">+20,365천원</td><td></td></tr>
</tbody></table></div>`;
window['I_bidRT-revenue']=function(){
  mkChart('c-scenario','bar',['DAES','RTES','CP','IMBP','순수익'],[
    {label:'안정형',data:[15.8,1.9,3.1,-0.5,20.3],backgroundColor:'rgba(0,212,168,0.45)',borderWidth:0},
    {label:'공격형',data:[19.4,2.4,3.1,-2.1,22.8],backgroundColor:'rgba(245,158,11,0.45)',borderWidth:0},
  ],{scales:{y:{ticks:{callback:v=>v+'M'}}}});
  mkChart('c-sens','line',['-20%','-10%','0%','+10%','+20%'],[{data:[16.3,18.2,20.3,22.4,24.5],borderColor:'#0059ff',borderWidth:2,pointRadius:3,tension:0.3,fill:true,backgroundColor:'rgba(0,89,255,0.07)'}],{});
};

