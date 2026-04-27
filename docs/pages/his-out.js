// AUTO-GENERATED FROM index.html — page module: his-out
window.P = window.P || {};
/* ===== 이력: 출력제어 이력 ===== */
window.HIS_OUT_DATA=[
  {date:'2026-04-23',start:'14:00',end:'14:45',org:'KPX',type:'KPX 급전지시',vpp:'전체',amt:8.2,perf:98.4,paid:'유상',loss:0.34},
  {date:'2026-04-23',start:'12:15',end:'12:45',org:'한전',type:'한전 계통제약',vpp:'VPP-전남권',amt:15.0,perf:94.1,paid:'무상',loss:0.92},
  {date:'2026-04-22',start:'15:30',end:'16:15',org:'KPX',type:'KPX 급전지시',vpp:'VPP-제주권',amt:6.5,perf:97.2,paid:'유상',loss:0.28},
  {date:'2026-04-22',start:'10:00',end:'11:30',org:'운영자',type:'수동 제어',vpp:'VPP-전남권',amt:12.4,perf:99.5,paid:'무상',loss:1.86},
  {date:'2026-04-21',start:'13:45',end:'14:30',org:'KPX',type:'KPX 급전지시',vpp:'VPP-경북권',amt:9.8,perf:96.5,paid:'유상',loss:0.41},
  {date:'2026-04-21',start:'09:20',end:'09:55',org:'시스템',type:'자동 제어',vpp:'전체',amt:4.2,perf:100,paid:'무상',loss:0.15},
  {date:'2026-04-20',start:'14:00',end:'15:00',org:'한전',type:'한전 계통제약',vpp:'VPP-전남권',amt:18.5,perf:92.3,paid:'무상',loss:1.24},
  {date:'2026-04-20',start:'11:00',end:'11:40',org:'KPX',type:'KPX 급전지시',vpp:'VPP-제주권',amt:5.8,perf:98.7,paid:'유상',loss:0.22},
  {date:'2026-04-19',start:'16:20',end:'17:10',org:'운영자',type:'수동 제어',vpp:'VPP-경북권',amt:7.1,perf:100,paid:'무상',loss:0.55},
  {date:'2026-04-19',start:'13:00',end:'13:45',org:'KPX',type:'KPX 급전지시',vpp:'전체',amt:10.4,perf:97.8,paid:'유상',loss:0.48},
  {date:'2026-04-18',start:'14:30',end:'15:30',org:'한전',type:'한전 계통제약',vpp:'VPP-전남권',amt:14.2,perf:93.5,paid:'무상',loss:0.98},
  {date:'2026-04-18',start:'10:30',end:'11:00',org:'시스템',type:'자동 제어',vpp:'VPP-제주권',amt:3.5,perf:100,paid:'무상',loss:0.11},
  {date:'2026-04-17',start:'15:00',end:'15:50',org:'KPX',type:'KPX 급전지시',vpp:'VPP-경북권',amt:11.6,perf:96.1,paid:'유상',loss:0.52},
  {date:'2026-04-17',start:'09:45',end:'10:15',org:'운영자',type:'수동 제어',vpp:'VPP-전남권',amt:6.3,perf:100,paid:'무상',loss:0.31},
  {date:'2026-04-16',start:'13:20',end:'14:00',org:'한전',type:'한전 계통제약',vpp:'전체',amt:16.8,perf:91.7,paid:'무상',loss:1.41},
  {date:'2026-04-16',start:'10:00',end:'10:30',org:'KPX',type:'KPX 급전지시',vpp:'VPP-제주권',amt:5.2,perf:99.0,paid:'유상',loss:0.18},
  {date:'2026-04-15',start:'14:15',end:'15:00',org:'KPX',type:'KPX 급전지시',vpp:'VPP-전남권',amt:12.7,perf:95.4,paid:'유상',loss:0.62},
  {date:'2026-04-15',start:'11:30',end:'12:10',org:'시스템',type:'자동 제어',vpp:'전체',amt:4.8,perf:100,paid:'무상',loss:0.20}
];
window.P['his-out']=()=>`
${_mkFilterBar({periodStart:'2026-04-15',periodEnd:'2026-04-23',interval:'일',prefix:'ho-f',onChange:'hisOutApply',extras:`
  <div class="fbar-item">
    <span class="fbar-lbl">제어 유형</span>
    <select class="fbar-sel" id="ho-f-type" onchange="hisOutApply()"><option>전체</option><option>KPX 급전지시</option><option>한전 계통제약</option><option>수동 제어</option><option>자동 제어</option></select>
  </div>
  <div class="fbar-item">
    <span class="fbar-lbl">보상 여부</span>
    <select class="fbar-sel" id="ho-f-paid" onchange="hisOutApply()"><option>전체</option><option>유상</option><option>무상</option></select>
  </div>`})}
<div class="g4">
  <div class="card acc"><div class="ct">제어 건수 ${window.tip('출력제어 건수','KPX·한전·운영자에 의한 출력 감축 명령 횟수','COUNT(*) WHERE 필터 매칭','월평균 20~30건 / 그 이상은 시장 변동성 또는 계통 불안 신호')}</div><div class="kv" id="ho-kpi-total">—<span class="ku">건</span></div></div>
  <div class="card"><div class="ct">평균 이행률 ${window.tip('평균 이행률','지시량 대비 실제 감축한 비율의 평균','Σ(실제 감축량 ÷ 지시 감축량) ÷ N × 100 [%]','95% 이상 정상 / 90~95% 주의 / 90% 미만 SLA 위반 페널티')}</div><div class="kv" style="color:var(--acc)" id="ho-kpi-perf">—<span class="ku">%</span></div></div>
  <div class="card"><div class="ct">미생산 발전량 ${window.tip('미생산 발전량','출력제어로 인해 생산하지 못한 에너지의 합','Σ(제어 시간 × 감축 출력) [MWh]','계통제약(무상)이 KPX 급전지시(유상)보다 손실 비중이 큼')}</div><div class="kv" style="color:var(--acc3)" id="ho-kpi-amt">—<span class="ku">MWh</span></div></div>
  <div class="card"><div class="ct">기회비용 손실 ${window.tip('기회비용 손실','미생산 발전량을 SMP 기준으로 환산한 손실 금액','미생산 발전량 × 시간대별 SMP [백만원]','한전 계통제약은 손실 보상 없음 — 단, KPX 출력제어는 일부 보상')}</div><div class="kv" style="color:var(--acc4)" id="ho-kpi-loss">—<span class="ku">백만원</span></div></div>
</div>
<div class="card mb"><div class="sh"><div class="st">일자별 제어량 추이</div></div><div style="height:160px;position:relative"><canvas id="c-hout" role="img" aria-label="제어량 추이"></canvas></div></div>
<div class="card"><div class="sh"><div class="st">출력제어 상세 <span id="ho-cnt" style="font-size:11px;font-weight:400;color:var(--semantic-label-alt);margin-left:8px">— 건</span></div><div style="display:flex;gap:6px"><button class="cb n sm" style="font-size:11px">확인서 PDF 발급</button>${window.csvBtn('his-out-tbody','curtailment_history','출력제어 이력')}</div></div>
<table class="tbl"><thead><tr><th>일자</th><th>시작</th><th>종료</th><th>지시기관</th><th>유형</th><th>VPP</th><th>제어량(MW)</th><th>이행률</th><th>보상</th><th>손실(백만)</th></tr></thead><tbody id="his-out-tbody"></tbody></table></div>`;
window.hisOutApply=function(){
  var grp=(document.getElementById('ho-f-grp')||{}).value||'전체';
  var from=(document.getElementById('ho-f-from')||{}).value||'';
  var to=(document.getElementById('ho-f-to')||{}).value||'';
  var typ=(document.getElementById('ho-f-type')||{}).value||'전체';
  var paid=(document.getElementById('ho-f-paid')||{}).value||'전체';
  var data=(window.HIS_OUT_DATA||[]).filter(function(r){
    if(grp!=='전체' && r.vpp!==grp && r.vpp!=='전체') return false;
    if(from && r.date<from) return false;
    if(to && r.date>to) return false;
    if(typ!=='전체' && r.type!==typ) return false;
    if(paid!=='전체' && r.paid!==paid) return false;
    return true;
  });
  var tb=document.getElementById('his-out-tbody');
  if(tb){
    tb.innerHTML=data.map(function(r){
      var paidBadge=r.paid==='유상'?'<span class="badge ok">유상</span>':'<span class="badge off">무상</span>';
      return '<tr><td class="mono" style="font-size:11px">'+r.date+'</td><td class="mono" style="font-size:11px">'+r.start+'</td><td class="mono" style="font-size:11px">'+r.end+'</td><td>'+r.org+'</td><td>'+r.type+'</td><td>'+r.vpp+'</td><td class="mono">'+r.amt+'</td><td class="mono">'+r.perf+'%</td><td>'+paidBadge+'</td><td class="mono">'+r.loss.toFixed(2)+'</td></tr>';
    }).join('');
  }
  var cnt=document.getElementById('ho-cnt'); if(cnt) cnt.textContent=data.length+' 건';
  var totalAmt=data.reduce(function(s,r){return s+r.amt;},0);
  var avgPerf=data.length?data.reduce(function(s,r){return s+r.perf;},0)/data.length:0;
  var totalLoss=data.reduce(function(s,r){return s+r.loss;},0);
  var elT=document.getElementById('ho-kpi-total'); if(elT) elT.innerHTML=data.length+'<span class="ku">건</span>';
  var elP=document.getElementById('ho-kpi-perf'); if(elP) elP.innerHTML=avgPerf.toFixed(1)+'<span class="ku">%</span>';
  var elA=document.getElementById('ho-kpi-amt'); if(elA) elA.innerHTML=totalAmt.toFixed(1)+'<span class="ku">MWh</span>';
  var elL=document.getElementById('ho-kpi-loss'); if(elL) elL.innerHTML=totalLoss.toFixed(2)+'<span class="ku">백만원</span>';
  // 차트: 일자별 제어량 합계
  var byDate={};
  data.forEach(function(r){byDate[r.date]=(byDate[r.date]||0)+r.amt;});
  var dates=Object.keys(byDate).sort();
  if(dates.length){
    mkChart('c-hout','bar',dates.map(d=>d.slice(5)),[{label:'제어량(MW)',data:dates.map(d=>byDate[d].toFixed(1)),backgroundColor:'rgba(255,202,66,0.7)',borderRadius:4,borderWidth:0}],{plugins:{legend:{display:false}}});
  }
};
window['I_his-out']=function(){ hisOutApply(); };

