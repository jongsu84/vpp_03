// AUTO-GENERATED FROM index.html — page module: his-dis
window.P = window.P || {};
/* ===== 이력: 총방전이력 ===== */
window.HIS_DIS_DATA=(function(){
  var rows=[];
  var ess=[
    {name:'금능1호 ESS', vpp:'VPP-제주권'},
    {name:'제주 ESS허브', vpp:'VPP-제주권'},
    {name:'광양2호 ESS', vpp:'VPP-전남권'}
  ];
  var dates=['2026-04-23','2026-04-22','2026-04-21','2026-04-20','2026-04-19','2026-04-18','2026-04-17','2026-04-16','2026-04-15'];
  var seed=24;
  function rnd(){seed=(seed*9301+49297)%233280;return seed/233280;}
  dates.forEach(function(d){
    ess.forEach(function(e){
      // 방전 1건
      var startSoc=70+Math.round(rnd()*20);
      var endSoc=Math.max(15,startSoc-20-Math.round(rnd()*30));
      var dod=startSoc-endSoc;
      var amt=+(dod*0.3+rnd()*5).toFixed(1);
      var rte=+(90+rnd()*5).toFixed(1);
      var rev=Math.round(amt*125);
      rows.push({type:'방전', date:d, name:e.name, vpp:e.vpp, st:'14:00', en:'14:45', amt:amt, ssoc:startSoc, esoc:endSoc, dod:dod, rte:rte, rev:rev});
      // 충전 1건
      var sSoc=Math.max(20,endSoc-Math.round(rnd()*5));
      var eSoc=Math.min(95,sSoc+25+Math.round(rnd()*15));
      var cAmt=+((eSoc-sSoc)*0.32+rnd()*4).toFixed(1);
      rows.push({type:'충전', date:d, name:e.name, vpp:e.vpp, st:'02:00', en:'04:30', amt:cAmt, ssoc:sSoc, esoc:eSoc, dod:eSoc-sSoc, rte:+(89+rnd()*4).toFixed(1), rev:0});
    });
  });
  return rows;
})();
window.P['his-dis']=()=>`
${_mkFilterBar({periodStart:'2026-04-15',periodEnd:'2026-04-23',interval:'일',prefix:'hd-f',onChange:'hisDisApply',extras:`
  <div class="fbar-item">
    <span class="fbar-lbl">충·방전 구분</span>
    <select class="fbar-sel" id="hd-f-mode" onchange="hisDisApply()"><option>전체</option><option>방전</option><option>충전</option></select>
  </div>
  <div class="fbar-item">
    <span class="fbar-lbl">DoD 범위</span>
    <select class="fbar-sel" id="hd-f-dod" onchange="hisDisApply()"><option value="">전체</option><option value="0-20">0~20%</option><option value="20-50">20~50%</option><option value="50-80">50~80%</option><option value="80+">80% 이상</option></select>
  </div>`})}
<div class="g4">
  <div class="card acc"><div class="ct">총 방전량 ${window.tip('총 방전량','조회 기간 내 모든 ESS의 방전 에너지 합계','Σ(방전 시작 SoC - 종료 SoC) × 배터리 용량 [MWh]','정상 운영: 일평균 25~50 MWh 수준')}</div><div class="kv" id="hd-kpi-dis">—<span class="ku">MWh</span></div></div>
  <div class="card"><div class="ct">평균 RTE ${window.tip('평균 RTE (Round-Trip Efficiency)','충방전 왕복 효율 — 충전한 에너지 대비 방전한 에너지의 비율','방전량 ÷ 충전량 × 100 [%]','신품 배터리 90%+ / 5년 사용 시 85% / 80% 미만은 노화 신호')}</div><div class="kv" id="hd-kpi-rte">—<span class="ku">%</span></div></div>
  <div class="card"><div class="ct">총 충전량 ${window.tip('총 충전량','조회 기간 내 모든 ESS의 충전 에너지 합계','Σ(종료 SoC - 시작 SoC) × 배터리 용량 [MWh]','일반적으로 방전량 × (1/RTE) — 손실분 포함')}</div><div class="kv" id="hd-kpi-chg">—<span class="ku">MWh</span></div></div>
  <div class="card"><div class="ct">방전 수익 ${window.tip('방전 수익','피크 시간대 방전으로 발생한 SMP 수익','Σ(방전량 × 시간대별 SMP) [천원]','피크 시간대 방전이 가장 수익성 높음 (SMP 차익 × 효율)')}</div><div class="kv" id="hd-kpi-rev">—<span class="ku">천원</span></div></div>
</div>
<div class="card mb"><div class="sh"><div class="st">방전량 추이</div></div><div style="height:160px;position:relative"><canvas id="c-dis" role="img" aria-label="방전 추이"></canvas></div></div>
<div class="card"><div class="sh"><div class="st">충방전 이력 상세 <span id="hd-cnt" style="font-size:11px;font-weight:400;color:var(--semantic-label-alt);margin-left:8px">— 건</span></div>${window.csvBtn('his-dis-tbody','discharge_history','충방전 이력 상세')}</div>
<table class="tbl"><thead><tr><th>일자</th><th>구분</th><th>자원</th><th>VPP</th><th>시작</th><th>종료</th><th>량(MWh)</th><th>시작SoC</th><th>종료SoC</th><th>DoD</th><th>RTE</th><th>수익(천원)</th></tr></thead><tbody id="his-dis-tbody"></tbody></table></div>`;
window.hisDisApply=function(){
  var grp=(document.getElementById('hd-f-grp')||{}).value||'전체';
  var from=(document.getElementById('hd-f-from')||{}).value||'';
  var to=(document.getElementById('hd-f-to')||{}).value||'';
  var mode=(document.getElementById('hd-f-mode')||{}).value||'전체';
  var dod=(document.getElementById('hd-f-dod')||{}).value||'';
  var data=(window.HIS_DIS_DATA||[]).filter(function(r){
    if(grp!=='전체' && r.vpp!==grp) return false;
    if(from && r.date<from) return false;
    if(to && r.date>to) return false;
    if(mode!=='전체' && r.type!==mode) return false;
    if(dod==='0-20' && !(r.dod<=20)) return false;
    if(dod==='20-50' && !(r.dod>20 && r.dod<=50)) return false;
    if(dod==='50-80' && !(r.dod>50 && r.dod<=80)) return false;
    if(dod==='80+' && !(r.dod>80)) return false;
    return true;
  });
  var tb=document.getElementById('his-dis-tbody');
  if(tb){
    tb.innerHTML=data.map(function(r){
      var typBadge=r.type==='방전'?'<span class="badge ok">방전</span>':'<span class="badge inf">충전</span>';
      return '<tr><td class="mono" style="font-size:11px">'+r.date+'</td><td>'+typBadge+'</td><td>'+r.name+'</td><td>'+r.vpp+'</td><td class="mono">'+r.st+'</td><td class="mono">'+r.en+'</td><td class="mono">'+r.amt+'</td><td class="mono">'+r.ssoc+'%</td><td class="mono">'+r.esoc+'%</td><td class="mono">'+r.dod+'%</td><td class="mono">'+r.rte+'%</td><td class="mono">'+(r.rev?r.rev.toLocaleString():'—')+'</td></tr>';
    }).join('');
  }
  var cnt=document.getElementById('hd-cnt'); if(cnt) cnt.textContent=data.length+' 건';
  var dis=data.filter(r=>r.type==='방전');
  var chg=data.filter(r=>r.type==='충전');
  var totalDis=dis.reduce(function(s,r){return s+r.amt;},0);
  var totalChg=chg.reduce(function(s,r){return s+r.amt;},0);
  var avgRte=data.length?data.reduce(function(s,r){return s+r.rte;},0)/data.length:0;
  var totalRev=dis.reduce(function(s,r){return s+r.rev;},0);
  var elD=document.getElementById('hd-kpi-dis'); if(elD) elD.innerHTML=totalDis.toFixed(1)+'<span class="ku">MWh</span>';
  var elC=document.getElementById('hd-kpi-chg'); if(elC) elC.innerHTML=totalChg.toFixed(1)+'<span class="ku">MWh</span>';
  var elR=document.getElementById('hd-kpi-rte'); if(elR) elR.innerHTML=avgRte.toFixed(1)+'<span class="ku">%</span>';
  var elV=document.getElementById('hd-kpi-rev'); if(elV) elV.innerHTML=totalRev.toLocaleString()+'<span class="ku">천원</span>';
  // 차트: 일자별 방전량
  var byDate={};
  dis.forEach(function(r){byDate[r.date]=(byDate[r.date]||0)+r.amt;});
  var dates=Object.keys(byDate).sort();
  if(dates.length){
    mkChart('c-dis','bar',dates.map(d=>d.slice(5)),[{label:'방전량',data:dates.map(d=>byDate[d]),backgroundColor:'rgba(255,202,66,0.7)',borderRadius:4,borderWidth:0}],{plugins:{legend:{display:false}}});
  }
};
window['I_his-dis']=function(){ hisDisApply(); };

