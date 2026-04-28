// AUTO-GENERATED FROM index.html — page module: pre-main
window.P = window.P || {};
/* ===== 예측: 예측분석 ===== */
window.P['pre-main']=()=>`
${_mkFilterBar({showPeriod:false,interval:'1시간',prefix:'pm',onChange:'pmFilterApply',extras:`
  <div class="fbar-item">
    <span class="fbar-lbl">예측 horizon</span>
    <select class="fbar-sel" id="pm-horizon" onchange="pmFilterApply()"><option>하루전 (D+1)</option><option>초단기 (0~6h)</option><option>단기 (1~3일)</option><option>중기 (1~2주)</option></select>
  </div>`})}
<div class="g4">
  <div class="card acc"><div class="ct">NMAE10 오차율 ${window.tip('NMAE10 오차율','Normalized Mean Absolute Error (10% 컷오프) — 정격용량 대비 평균 절대 오차','Σ |예측 - 실측| ÷ 정격용량 × 100 (10% 미만 구간 제외) [%]','KPX 정산 기준: 8% 이하 정상 / 8~10% 주의 / 10% 초과 시 정산금 차감')}</div><div class="kv" id="pm-nmae" style="color:var(--acc)">6.8<span class="ku">%</span></div><div class="kd up" id="pm-nmae-sub">기준 8% 이하 ✓</div></div>
  <div class="card"><div class="ct">예측 정확도 등급 ${window.tip('예측 정확도 등급','NMAE10 기반 KPX 등급 분류','NMAE10 ≤ 6% A / 6~8% B / 8~10% C / 10%+ D','A·B 등급은 정산금 가산, C·D 등급은 차감')}</div><div class="kv" id="pm-grade" style="color:var(--acc2)">A<span class="ku">등급</span></div></div>
  <div class="card"><div class="ct">적용 모델 ${window.tip('적용 예측 모델','현재 입찰에 사용 중인 ML 모델','D1_min: 하루전 분 단위 / RT_15: 실시간 15분 단위 / hybrid-ensemble: 통합','자원·시간대별 자동 모델 선택 — 정확도 높은 모델 우선')}</div><div class="kv" id="pm-model">D1_min</div></div>
  <div class="card"><div class="ct">예측 정산금 추정 ${window.tip('예측 정산금 추정','NMAE10 등급 기반 예상 정산금 (가산금 - 차감금)','등급 × 발전량 × 정산 단가 [원/kWh]','A 등급: +3~4원/kWh 가산 / D 등급: -2원/kWh 차감')}</div><div class="kv" id="pm-settle">3.2<span class="ku">원/kWh</span></div></div>
</div>
<div class="card mb"><div class="sh"><div class="st">예측 vs 실측 (금일 24시간)</div></div><div style="height:190px;position:relative"><canvas id="c-pred" role="img" aria-label="예측 vs 실측 비교"></canvas></div></div>
<div class="g2">
  <div class="card"><div class="ct">오차 분포 히스토그램</div><div style="height:130px;position:relative"><canvas id="c-errd" role="img" aria-label="오차 분포"></canvas></div></div>
  <div class="card">
    <div class="pr"><div class="pl">00~06시</div><div class="pb"><div class="pf" style="width:15%;background:var(--acc)"></div></div><div class="pv">1.2%</div></div>
    <div class="pr"><div class="pl">06~12시</div><div class="pb"><div class="pf" style="width:62%;background:var(--acc2)"></div></div><div class="pv">4.8%</div></div>
    <div class="pr"><div class="pl">12~18시</div><div class="pb"><div class="pf" style="width:88%;background:var(--acc3)"></div></div><div class="pv">6.8%</div></div>
    <div class="pr"><div class="pl">18~24시</div><div class="pb"><div class="pf" style="width:35%;background:var(--acc)"></div></div><div class="pv">2.7%</div></div>
  </div>
</div>`;
window['I_pre-main']=function(){
  const h=Array.from({length:24},(_,i)=>i+'h');
  const p=[0,0,0,0,0,2,18,45,82,115,134,142,148,145,138,143,150,147,132,108,74,42,18,4];
  const a=[0,0,0,0,0,1,17,43,80,112,131,139,146,141,134,138,143,141,128,103,70,39,15,3];
  mkChart('c-pred','line',h,[{data:p,borderColor:'#1f98ff',borderWidth:1.5,pointRadius:0,tension:0.4,borderDash:[4,2],fill:false},{data:a,borderColor:'#0059ff',borderWidth:2,pointRadius:0,tension:0.4,fill:false}],{});
  mkChart('c-errd','bar',['-10','-8','-6','-4','-2','0','2','4','6','8'],[{data:[2,5,12,23,31,29,18,9,4,1],backgroundColor:'rgba(0,153,255,0.4)',borderColor:'#1f98ff',borderWidth:1}],{});
};
window.pmFilterApply=function(){
  const horizon=document.getElementById('pm-horizon')?.value||'하루전 (D+1)';
  const profiles={
    '하루전 (D+1)':{nmae:6.8,grade:'A',model:'D1_min',settle:'+3.2',scale:1.00,errBins:[2,5,12,23,31,29,18,9,4,1]},
    '초단기 (0~6h)':{nmae:4.2,grade:'A',model:'RT_15',settle:'+4.0',scale:0.98,errBins:[1,3,8,18,38,42,22,5,2,1]},
    '단기 (1~3일)':{nmae:8.5,grade:'B',model:'hybrid-ensemble',settle:'+1.6',scale:1.05,errBins:[5,9,15,22,26,24,18,12,8,3]},
    '중기 (1~2주)':{nmae:12.4,grade:'C',model:'NWP-blend',settle:'-0.8',scale:1.12,errBins:[10,14,16,18,20,18,16,14,10,8]}
  };
  const p=profiles[horizon]||profiles['하루전 (D+1)'];
  const colorOf=v=>v<=6?'var(--semantic-positive-normal)':v<=8?'var(--semantic-brand-primary)':v<=10?'var(--palette-yellow-40)':'var(--semantic-negative-normal)';
  const gradeColor={A:'var(--semantic-positive-normal)',B:'var(--semantic-brand-primary)',C:'var(--palette-yellow-40)',D:'var(--semantic-negative-normal)'};
  const settleColor=p.settle.startsWith('+')?'var(--semantic-positive-normal)':'var(--semantic-negative-normal)';
  const nmaeEl=document.getElementById('pm-nmae');
  if(nmaeEl){ nmaeEl.innerHTML=p.nmae.toFixed(1)+'<span class="ku">%</span>'; nmaeEl.style.color=colorOf(p.nmae); }
  const subEl=document.getElementById('pm-nmae-sub');
  if(subEl){ subEl.textContent=p.nmae<=8?'기준 8% 이하 ✓':'기준 8% 초과 — 주의'; subEl.className=p.nmae<=8?'kd up':'kd dn'; }
  const grEl=document.getElementById('pm-grade');
  if(grEl){ grEl.innerHTML=p.grade+'<span class="ku">등급</span>'; grEl.style.color=gradeColor[p.grade]; }
  const mdEl=document.getElementById('pm-model'); if(mdEl) mdEl.textContent=p.model;
  const stEl=document.getElementById('pm-settle');
  if(stEl){ stEl.innerHTML=p.settle+'<span class="ku">원/kWh</span>'; stEl.style.color=settleColor; }
  // 차트 재렌더 — horizon 별 정확도 변화 반영
  const h=Array.from({length:24},(_,i)=>i+'h');
  const base=[0,0,0,0,0,1,17,43,80,112,131,139,146,141,134,138,143,141,128,103,70,39,15,3];
  const pred=base.map(v=>Math.round(v*p.scale*(0.95+Math.random()*0.1)));
  if(window.mkChart){
    mkChart('c-pred','line',h,[{data:pred,borderColor:'#1f98ff',borderWidth:1.5,pointRadius:0,tension:0.4,borderDash:[4,2],fill:false},{data:base,borderColor:'#0059ff',borderWidth:2,pointRadius:0,tension:0.4,fill:false}],{});
    mkChart('c-errd','bar',['-10','-8','-6','-4','-2','0','2','4','6','8'],[{data:p.errBins,backgroundColor:'rgba(0,153,255,0.4)',borderColor:'#1f98ff',borderWidth:1}],{});
  }
};

