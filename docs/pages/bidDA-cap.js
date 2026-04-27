// AUTO-GENERATED FROM index.html — page module: bidDA-cap
window.P = window.P || {};
/* ===== 하루전입찰: 용량 · 물리제약 ===== */
window.P['bidDA-cap']=()=>`
${_mkCross('bidDA-cap')}
${_mkBidFilter({prefix:'bdc',onChange:'bidCapApply',rightInfo:'Feasible 10.9MW · 정비 제외 0.5MW · Ramp 2.8MW/min'})}
<div class="g4">
  <div class="card acc"><div class="ct">총 설비용량 ${window.tip('총 설비용량','VPP 그룹의 모든 자원 정격 용량 합','Σ(자원별 정격 kW) ÷ 1000 [MW]','Nameplate Capacity 기준 — 시운전·정비 자원 모두 포함')}</div><div class="kv">11.4<span class="ku">MW</span></div><div class="kd neu">실증 · 태양광 9개소</div></div>
  <div class="card"><div class="ct">가용 입찰용량 ${window.tip('가용 입찰용량','실제 입찰에 제출 가능한 최대 용량','총 설비용량 - 정비 - 안전마진(5%)','5% 안전마진 — 일사·풍속 변동성 반영 / 마진 적용 후 IMBP 페널티 회피')}</div><div class="kv" style="color:var(--semantic-positive-normal)">10.9<span class="ku">MW</span></div><div class="kd up">안전마진 5% 적용</div></div>
  <div class="card"><div class="ct">고장·정비 제외 ${window.tip('고장·정비 제외 용량','정비/고장으로 입찰에서 제외된 용량','상태 = 정비 OR 고장 인 자원 용량 합계','정비 일정은 발전기관리에서 사전 등록 → 자동 입찰 제외')}</div><div class="kv" style="color:var(--palette-yellow-40)">0.5<span class="ku">MW</span></div><div class="kd neu">광양항 4단계 정비</div></div>
  <div class="card"><div class="ct">Ramp-rate 한계 ${window.tip('Ramp-rate 한계','단위 시간당 출력 변동 가능 최대치','Σ(자원별 Ramp Rate) [MW/min]','입찰 시 시간대 간 차이가 이 값을 초과하면 거부됨 — 인버터·PCS 사양에 의해 결정')}</div><div class="kv">2.8<span class="ku">MW/min</span></div><div class="kd neu">인버터 기준</div></div>
</div>
<div class="g65">
  <div class="card mb"><div class="sh"><div class="st">시간대별 가용 용량 예측 (익일)</div><span class="kpi-pill">Feasible 기준</span></div><div style="height:180px;position:relative"><canvas id="c-cap" role="img" aria-label="가용용량 예측"></canvas></div></div>
  <div class="card mb"><div class="sh"><div class="st">물리제약 파라미터</div></div>
    <div class="fg"><label class="fl">안전 마진율 (%)</label><input class="inp" value="5.0" type="number"></div>
    <div class="fg"><label class="fl">Ramp-rate 상한 (MW/min)</label><input class="inp" value="2.8" type="number" step="0.1"></div>
    <div class="fg"><label class="fl">최소 운전시간 Min Run-time (분)</label><input class="inp" value="30" type="number"></div>
    <div class="fg"><label class="fl">최소 정지시간 Min Down-time (분)</label><input class="inp" value="20" type="number"></div>
    <button class="cb p" style="width:100%">Feasible 입찰값 재계산</button>
  </div>
</div>
<div class="card"><div class="sh"><div class="st">ESS SOC 제약 <span class="kpi-pill warn" style="margin-left:6px">확장 로드맵</span></div></div>
  <div style="padding:10px 0;font-size:13px;color:var(--semantic-label-normal);line-height:20px">
    본 과제 실증 자원(동서발전 준중앙 11.4MW)은 <b>전량 태양광·ESS 미연계</b>이므로 SOC/방전가능량/과충전 방지 마진 조항은 이종자원 편입 단계에서 적용합니다.<br>
    확장 단계 파라미터: <span class="mono">SOC 실시간 체크 · 방전 가능량 · 안전 마진 5~10%</span>
  </div>
</div>`;
window['I_bidDA-cap']=function(){
  window._bdcRender();
};
window._bdcRender=function(){
  const vpp=document.getElementById('bdc-vpp')?.value||'전체';
  const type=document.getElementById('bdc-type')?.value||'all';
  const vMul={'전체':1.0,'VPP-전남권':0.62,'VPP-제주권':0.18,'VPP-경북권':0.20}[vpp]||1.0;
  const tMul={'all':1.0,'태양광':0.55,'풍력':0.30,'ESS':0.08,'바이오':0.05,'V2G':0.02}[type]||1.0;
  const mul=vMul*tMul;
  const h=Array.from({length:24},(_,i)=>i+'h');
  const base=[0,0,0,0,0,1,1.2,3.1,5.8,8.1,9.8,10.7,10.9,10.5,10,10.1,9.6,8.5,6.1,3.8,1.9,0.5,0,0];
  const av=base.map(v=>+(v*mul).toFixed(2));
  mkChart('c-cap','line',h,[
    {label:'이론 최대',data:av.map(v=>+(v*1.05).toFixed(2)),borderColor:'rgba(120,120,120,0.5)',borderWidth:1.5,pointRadius:0,tension:0.4,borderDash:[4,2],fill:false},
    {label:'Feasible (안전마진 적용)',data:av,borderColor:'#0059ff',borderWidth:2,pointRadius:0,tension:0.4,fill:true,backgroundColor:'rgba(0,89,255,0.08)'}
  ],{});
};
window.bidCapApply=function(){ window._bdcRender(); };

