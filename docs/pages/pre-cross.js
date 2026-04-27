// AUTO-GENERATED FROM index.html — page module: pre-cross
window.P = window.P || {};
/* ===== 예측: 교차분석 ===== */
window.P['pre-cross']=()=>`
${_mkFilterBar({periodStart:'2026-03-23',periodEnd:'2026-04-23',interval:'1시간',extras:`
  <div class="fbar-item">
    <span class="fbar-lbl">비교 기준</span>
    <select class="fbar-sel"><option>예측 vs 실측</option><option>기상변수 vs 발전량</option><option>모델 A vs B</option></select>
  </div>`})}
<div class="g4">
  <div class="card acc"><div class="ct">일사량과 발전량 상관계수 ${window.tip('일사량과 발전량 상관계수','일사량과 태양광 발전량의 Pearson 상관계수','Σ((x-x̄)(y-ȳ)) / √(Σ(x-x̄)²·Σ(y-ȳ)²) [-1 ~ 1]','0.9 이상: 강한 양의 상관 (예측 가능) / 0.7 미만: 다른 변수 영향 큼')}</div><div class="kv" style="color:var(--acc)">0.94</div><div class="kd up">강한 양의 상관</div></div>
  <div class="card"><div class="ct">온도와 효율 상관계수 ${window.tip('외기 온도와 효율 상관계수','온도가 인버터/PV 셀 효율에 미치는 영향','음의 상관: 온도 높을수록 효율 ↓','-0.7 이하: 강한 음의 상관 — 온도 보정 필수 / 셀 온도 25°C 기준 1°C당 -0.4% 효율 감소')}</div><div class="kv" style="color:var(--acc3)">-0.72</div><div class="kd dn">음의 상관</div></div>
  <div class="card"><div class="ct">풍속과 풍력 상관계수 ${window.tip('풍속과 풍력 발전량 상관계수','풍속과 풍력 발전량의 상관 (3승 비례 관계 검증)','이론상 P ∝ v³ — 실제 측정값 검증','0.85+ 정상 / 0.75 미만 시 블레이드 마모·기어박스 이상 점검')}</div><div class="kv" style="color:var(--acc2)">0.88</div></div>
  <div class="card"><div class="ct">주요 오차 원인 ${window.tip('주요 예측 오차 원인','SHAP 분석 기반 가장 큰 오차 기여 변수','SHAP value 절대값 합산 → 변수별 기여도 비교','이 변수의 예측 정확도를 개선하면 전체 모델 오차의 70%를 줄일 수 있음')}</div><div class="kv" style="font-size:14px">일사량</div><div class="kd neu">기여도 70%</div></div>
</div>
<div class="g65">
  <div class="card mb"><div class="sh"><div class="st">산점도 — 일사량 vs 발전량</div></div><div style="height:200px;position:relative"><canvas id="c-scatter" role="img" aria-label="산점도"></canvas></div></div>
  <div class="card mb">
    <div class="sh"><div class="st">기상 변수 기여도 (SHAP)</div></div>
    <div class="pr"><div class="pl">일사량</div><div class="pb"><div class="pf" style="width:70%;background:var(--acc)"></div></div><div class="pv">70%</div></div>
    <div class="pr"><div class="pl">외기 온도</div><div class="pb"><div class="pf" style="width:20%;background:var(--acc3)"></div></div><div class="pv">20%</div></div>
    <div class="pr"><div class="pl">풍속</div><div class="pb"><div class="pf" style="width:7%;background:var(--acc2)"></div></div><div class="pv">7%</div></div>
    <div class="pr"><div class="pl">습도</div><div class="pb"><div class="pf" style="width:3%;background:var(--txt3)"></div></div><div class="pv">3%</div></div>
    <div class="sh" style="margin-top:10px"><div class="st">분석 설정</div></div>
    <div class="fg"><label class="fl">X축 변수</label><select class="sel"><option>일사량 (W/m²)</option><option>외기 온도 (°C)</option></select></div>
    <div class="fg"><label class="fl">Y축 변수</label><select class="sel"><option>발전량 (kWh)</option><option>인버터 효율 (%)</option></select></div>
    <button class="cb p" style="width:100%;font-size:11px">분석 실행</button>
  </div>
</div>`;
window['I_pre-cross']=function(){
  const pts=Array.from({length:60},()=>({x:Math.random()*900+100,y:Math.random()*1200+100}));
  mkChart('c-scatter','scatter',null,[{data:pts,backgroundColor:'rgba(0,212,168,0.5)',pointRadius:4}],{scales:{x:{title:{display:true,text:'일사량 (W/m²)',color:'#666666',font:{size:9}}},y:{title:{display:true,text:'발전량 (kWh)',color:'#666666',font:{size:9}}}}});
};

