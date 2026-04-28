// AUTO-GENERATED FROM index.html — page module: his-gen
window.P = window.P || {};
/* ================================================================
   공통 필터 바 (이력조회 5종 / 예측분석 4종에 사용)
   참고: Emax UI 벤치마크
   ================================================================ */
const _mkFilterBar=(cfg)=>{
  cfg=cfg||{};
  // 표준 5필터 + 메뉴별 extras — 조회수준/대상은 기본 비활성 (사용 빈도 낮음)
  const showLevel=cfg.showLevel===true;
  const showTarget=cfg.showTarget===true;
  const showInterval=cfg.showInterval!==false;
  const showPeriod=cfg.showPeriod!==false;
  const periodStart=cfg.periodStart||'2026-04-01';
  const periodEnd=cfg.periodEnd||'2026-04-23';
  const intervalDefault=cfg.interval||'1시간';
  const extras=cfg.extras||'';
  const levelLabel=cfg.levelLabel||'조회 수준';
  const levelOptions=cfg.levelOptions||`<option>발전기</option><option>발전자원</option><option>VPP 그룹</option><option>인버터·스트링</option>`;
  const targetLabel=cfg.targetLabel||'조회 대상';
  const targetPlaceholder=cfg.targetPlaceholder||'선택';
  const px=cfg.prefix||'';
  const onCh=cfg.onChange||'';
  const oc=onCh?` onchange="${onCh}()"`:'';
  const ocInput=onCh?` oninput="${onCh}()"`:'';
  const idAttr=function(suffix){ return px?` id="${px}-${suffix}"`:''; };
  return `
  <div class="fbar">
    <div class="fbar-row">
      <div class="fbar-item">
        <span class="fbar-lbl">그룹</span>
        <select class="fbar-sel"${idAttr('grp')}${oc}><option>전체</option><option>VPP-전남권</option><option>VPP-제주권</option><option>VPP-경북권</option></select>
      </div>
      ${extras}
      ${(function(){const gId='ms_gen_fb_'+(++window._msIdCnt);return `
      <div class="fbar-item">
        <span class="fbar-lbl">발전자원</span>
        ${_mkResMulti(gId)}
      </div>
      <div class="fbar-item">
        <span class="fbar-lbl">발전기</span>
        ${_mkGenMulti(gId)}
      </div>`;})()}
      ${showLevel?`<div class="fbar-item">
        <span class="fbar-lbl">${levelLabel}</span>
        <select class="fbar-sel"${idAttr('lvl')}${oc}>${levelOptions}</select>
      </div>`:''}
      ${showTarget?`<div class="fbar-item">
        <span class="fbar-lbl">${targetLabel}</span>
        <select class="fbar-sel"${idAttr('tgt')}${oc}><option>${targetPlaceholder}</option><option>선택 1개</option><option>선택 3개</option><option>전체</option></select>
      </div>`:''}
      ${showInterval?`<div class="fbar-item narrow">
        <span class="fbar-lbl">데이터 주기</span>
        <select class="fbar-sel"${idAttr('int')}${oc}>
          <option${intervalDefault==='1분'?' selected':''}>1분</option>
          <option${intervalDefault==='5분'?' selected':''}>5분</option>
          <option${intervalDefault==='15분'?' selected':''}>15분</option>
          <option${intervalDefault==='1시간'?' selected':''}>1시간</option>
          <option${intervalDefault==='일'?' selected':''}>일</option>
          <option${intervalDefault==='월'?' selected':''}>월</option>
        </select>
      </div>`:''}
      ${showPeriod?`<div class="fbar-item wide">
        <span class="fbar-lbl">조회 기간</span>
        <div class="fbar-period">
          <input class="fbar-inp" type="date" value="${periodStart}"${idAttr('from')}${ocInput}>
          <span class="fbar-period-sep">→</span>
          <input class="fbar-inp" type="date" value="${periodEnd}"${idAttr('to')}${ocInput}>
        </div>
      </div>`:''}
    </div>
  </div>`;
};

/* ===== 이력: 발전이력 ===== */
window.HIS_GEN_DATA=(function(){
  var rows=[];
  var vpps=['VPP-전남권','VPP-제주권','VPP-경북권'];
  var dates=['2026-04-23','2026-04-22','2026-04-21','2026-04-20','2026-04-19','2026-04-18','2026-04-17','2026-04-16','2026-04-15','2026-04-14','2026-04-13','2026-04-12','2026-04-11','2026-04-10','2026-04-09'];
  var seed=42;
  function rnd(){seed=(seed*9301+49297)%233280;return seed/233280;}
  dates.forEach(function(d){
    vpps.forEach(function(v){
      var base=v==='VPP-전남권'?280:(v==='VPP-제주권'?80:140);
      var sol=+(base+rnd()*40-20).toFixed(1);
      var win=+(base*0.3+rnd()*15).toFixed(1);
      var ess=+(base*0.15+rnd()*10).toFixed(1);
      var sum=+(sol+win+ess).toFixed(1);
      var smp=120+Math.round(rnd()*15);
      var rev=Math.round(sum*smp);
      rows.push({date:d, vpp:v, sol:sol, win:win, ess:ess, sum:sum, smp:smp, rev:rev});
    });
  });
  return rows;
})();
window.P['his-gen']=()=>`
${_mkFilterBar({periodStart:'2026-04-09',periodEnd:'2026-04-23',interval:'일',prefix:'hg-f',onChange:'hisGenApply'})}
<div class="g4" id="his-gen-kpi">
  <div class="card"><div class="ct">조회 기간 누적 ${window.tip('조회 기간 누적 발전량','필터 조건에 매칭되는 모든 데이터의 발전량 합계','Σ(태양광 + 풍력 + ESS) [MWh]','전체 포트폴리오 평균 ±10% 이내 정상')}</div><div class="kv" id="hg-kpi-sum">—<span class="ku">MWh</span></div><div class="kd up" id="hg-kpi-rows">— 건</div></div>
  <div class="card"><div class="ct">평균 일 발전량 ${window.tip('평균 일 발전량','조회 기간 내 일별 발전량의 평균값','조회 기간 누적 ÷ 일수 [MWh/일]','계절·기상 영향 — 동절기 60~70%, 하절기 100% 수준')}</div><div class="kv" id="hg-kpi-avg">—<span class="ku">MWh</span></div></div>
  <div class="card"><div class="ct">총 예상 수익 ${window.tip('총 예상 수익','조회 기간 내 발전량 × SMP 합계 (정산 전 추정)','Σ(일별 발전량 × 일별 SMP) [백만원]','정산 후 ±5% 변동 가능 (CP, AS, REC 가중치 별도)')}</div><div class="kv" id="hg-kpi-rev">—<span class="ku">백만원</span></div></div>
  <div class="card"><div class="ct">평균 SMP ${window.tip('평균 SMP','System Marginal Price — 계통 한계가격, 그 시점의 발전기 한계 비용','조회 기간 내 일별 SMP의 산술 평균 [원/kWh]','국내 평균 110~130원 — KPX 1시간 단위 고시')}</div><div class="kv" id="hg-kpi-smp">—<span class="ku">원/kWh</span></div></div>
</div>
<div class="card mb"><div class="sh"><div class="st">발전량 추이</div></div><div style="height:160px;position:relative"><canvas id="c-hgen" role="img" aria-label="발전량 추이"></canvas></div></div>
<div class="card"><div class="sh"><div class="st">발전 이력 상세 <span id="hg-cnt" style="font-size:11px;font-weight:400;color:var(--semantic-label-alt);margin-left:8px">— 건</span></div>${window.csvBtn('his-gen-tbody','generation_history','발전 이력 상세')}</div><table class="tbl"><thead><tr><th>일시</th><th>VPP</th><th>태양광(MWh)</th><th>풍력(MWh)</th><th>ESS(MWh)</th><th>합계(MWh)</th><th>SMP(원)</th><th>수익(천원)</th></tr></thead><tbody id="his-gen-tbody"></tbody></table></div>`;
window.hisGenApply=function(){
  var grp=(document.getElementById('hg-f-grp')||{}).value||'전체';
  var from=(document.getElementById('hg-f-from')||{}).value||'';
  var to=(document.getElementById('hg-f-to')||{}).value||'';
  var data=(window.HIS_GEN_DATA||[]).filter(function(r){
    if(grp!=='전체' && r.vpp!==grp) return false;
    if(from && r.date<from) return false;
    if(to && r.date>to) return false;
    return true;
  });
  var tb=document.getElementById('his-gen-tbody');
  if(tb){
    tb.innerHTML=data.map(function(r){
      return '<tr><td>'+r.date+'</td><td>'+r.vpp+'</td><td class="mono">'+r.sol.toFixed(1)+'</td><td class="mono">'+r.win.toFixed(1)+'</td><td class="mono">'+r.ess.toFixed(1)+'</td><td class="mono">'+r.sum.toFixed(1)+'</td><td class="mono">'+r.smp+'</td><td class="mono">'+r.rev.toLocaleString()+'</td></tr>';
    }).join('');
  }
  var cnt=document.getElementById('hg-cnt'); if(cnt) cnt.textContent=data.length+' 건';
  // KPI 재계산
  var totalSum=data.reduce(function(s,r){return s+r.sum;},0);
  var totalRev=data.reduce(function(s,r){return s+r.rev;},0);
  var avgDay=data.length?totalSum/(new Set(data.map(r=>r.date)).size):0;
  var avgSmp=data.length?data.reduce(function(s,r){return s+r.smp;},0)/data.length:0;
  var elS=document.getElementById('hg-kpi-sum'); if(elS) elS.innerHTML=totalSum.toFixed(0)+'<span class="ku">MWh</span>';
  var elR=document.getElementById('hg-kpi-rows'); if(elR) elR.textContent=data.length+' 건';
  var elA=document.getElementById('hg-kpi-avg'); if(elA) elA.innerHTML=avgDay.toFixed(0)+'<span class="ku">MWh</span>';
  var elV=document.getElementById('hg-kpi-rev'); if(elV) elV.innerHTML=(totalRev/1000).toFixed(1)+'<span class="ku">백만원</span>';
  var elM=document.getElementById('hg-kpi-smp'); if(elM) elM.innerHTML=avgSmp.toFixed(0)+'<span class="ku">원/kWh</span>';
  // 차트 재렌더 (날짜별 합계)
  var byDate={};
  data.forEach(function(r){byDate[r.date]=(byDate[r.date]||0)+r.sum;});
  var dates=Object.keys(byDate).sort();
  if(dates.length){
    mkChart('c-hgen','bar',dates.map(d=>d.slice(5)),[{label:'발전량',data:dates.map(d=>byDate[d]),backgroundColor:'rgba(0,89,255,0.6)',borderRadius:4,borderWidth:0}],{plugins:{legend:{display:false}}});
  }
};
window['I_his-gen']=function(){
  hisGenApply();
};

