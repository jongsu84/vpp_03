// AUTO-GENERATED FROM index.html — page module: bidDA-log
window.P = window.P || {};
/* ===== 하루전입찰: 입찰 이력 (자원별 + Fail-Safe) ===== */

/* 자원별 입찰 이력 데이터 — 5일 × 2차수 × 자원 11개 ≈ 110행 */
window.BDL_BID_DATA=(function(){
  var rows=[];
  var resources=[
    {name:'순천 바이오가스',type:'바이오',vpp:'VPP-전남권',cap:1.42,nmae:2.1},
    {name:'여수 바이오매스',type:'바이오',vpp:'VPP-전남권',cap:2.85,nmae:2.8},
    {name:'광양항태양광 01단계',type:'태양광',vpp:'VPP-전남권',cap:2.18,nmae:4.2},
    {name:'광양항태양광 04단계',type:'태양광',vpp:'VPP-전남권',cap:2.09,nmae:5.1},
    {name:'금능1호 ESS',type:'ESS',vpp:'VPP-제주권',cap:1.80,nmae:5.5},
    {name:'제주 ESS허브',type:'ESS',vpp:'VPP-제주권',cap:2.50,nmae:6.2},
    {name:'해맞이 태양광',type:'태양광',vpp:'VPP-전남권',cap:0.95,nmae:6.8},
    {name:'온누리 태양광',type:'태양광',vpp:'VPP-전남권',cap:0.94,nmae:7.4},
    {name:'김주풍력 02단계',type:'풍력',vpp:'VPP-경북권',cap:9.50,nmae:8.2},
    {name:'김주풍력 01단계',type:'풍력',vpp:'VPP-경북권',cap:3.80,nmae:9.1},
    {name:'광주 V2G 스테이션',type:'V2G',vpp:'VPP-전남권',cap:0.72,nmae:10.5},
    {name:'전남 V2G 허브',type:'V2G',vpp:'VPP-전남권',cap:1.35,nmae:11.8}
  ];
  var dates=['2026-04-22','2026-04-21','2026-04-20','2026-04-19','2026-04-18'];
  var seed=37;
  function rnd(){seed=(seed*9301+49297)%233280;return seed/233280;}
  dates.forEach(function(d){
    [1,2].forEach(function(rd){
      resources.forEach(function(r){
        // 입찰량 = 정격 × (0.85~1.0) (예측 정확도 고려)
        var bid=+(r.cap*(0.85+rnd()*0.15)).toFixed(2);
        // 실제 낙찰량
        var act=+(bid*(0.95+rnd()*0.06)).toFixed(2);
        var err=+(Math.abs(bid-act)/bid*100).toFixed(2);
        // 입찰가 산출 (자원 유형별 차등 + SMP 138 가정)
        var w=r.type==='바이오'?1.05:r.type==='ESS'?0.92:r.type==='V2G'?0.90:r.type==='풍력'?0.88:0.95;
        var price=Math.round(138*w*(0.97+rnd()*0.06));
        // 결과 (낙찰/미낙찰)
        var result=err<5?'낙찰':(err<8?'부분 낙찰':'미낙찰');
        rows.push({
          date:d,round:rd,vpp:r.vpp,name:r.name,type:r.type,
          bid:bid,act:act,price:price,err:err,result:result
        });
      });
    });
  });
  return rows;
})();

window.P['bidDA-log']=()=>`
${_mkCross('bidDA-log')}

<!-- 필터 바 (VPP·유형·차수·기간) -->
<div class="card fbar"><div class="fbar-row">
  <div class="fbar-item">
    <span class="fbar-lbl">VPP 그룹</span>
    <select class="fbar-sel" id="bdl-vpp" onchange="bdlApply()"><option>전체</option><option>VPP-전남권</option><option>VPP-제주권</option><option>VPP-경북권</option></select>
  </div>
  <div class="fbar-item">
    <span class="fbar-lbl">자원 유형</span>
    <select class="fbar-sel" id="bdl-type" onchange="bdlApply()"><option value="all">전체</option><option>태양광</option><option>풍력</option><option>ESS</option><option>바이오</option><option>V2G</option></select>
  </div>
  <div class="fbar-item">
    <span class="fbar-lbl">차수</span>
    <select class="fbar-sel" id="bdl-round" onchange="bdlApply()"><option value="all">전체</option><option value="1">1차</option><option value="2">2차</option></select>
  </div>
  <div class="fbar-item">
    <span class="fbar-lbl">결과</span>
    <select class="fbar-sel" id="bdl-result" onchange="bdlApply()"><option>전체</option><option>낙찰</option><option>부분 낙찰</option><option>미낙찰</option></select>
  </div>
  <div class="fbar-item wide">
    <span class="fbar-lbl">기간</span>
    <div class="fbar-period">
      <input class="fbar-inp" type="date" value="2026-04-18" id="bdl-from" oninput="bdlApply()">
      <span class="fbar-period-sep">→</span>
      <input class="fbar-inp" type="date" value="2026-04-22" id="bdl-to" oninput="bdlApply()">
    </div>
  </div>
</div></div>

<!-- KPI 4종 -->
<div class="g4">
  <div class="card acc"><div class="ct">조회 결과 ${window.tip('조회 결과 건수','현재 필터 조건에 매칭되는 자원별 입찰 이력 건수','COUNT(*) FROM bid_log WHERE 필터','5일 × 2차수 × 12자원 = 최대 120건')}</div><div class="kv" id="bdl-kpi-total">—<span class="ku">건</span></div></div>
  <div class="card"><div class="ct">낙찰 성공률 ${window.tip('낙찰 성공률','낙찰(부분 포함) 비율','(낙찰 + 부분 낙찰) ÷ 전체 × 100 [%]','95% 이상 우수 / 90% 미만 시 가격 정책 재검토')}</div><div class="kv" style="color:var(--semantic-positive-normal)" id="bdl-kpi-win">—<span class="ku">%</span></div></div>
  <div class="card"><div class="ct">평균 오차율 ${window.tip('평균 입찰 오차율','입찰량 대비 실 낙찰량의 평균 절대 편차','AVG(|입찰-낙찰| ÷ 입찰) × 100 [%]','3% 이하 우수 / 5% 이상 IMBP 페널티 위험')}</div><div class="kv" id="bdl-kpi-err">—<span class="ku">%</span></div></div>
  <div class="card"><div class="ct">평균 낙찰가 ${window.tip('평균 낙찰가','낙찰된 입찰의 평균 가격','AVG(낙찰가) WHERE 결과=낙찰 [원/kWh]','SMP 평균 ±10% 이내 정상')}</div><div class="kv" id="bdl-kpi-price">—<span class="ku">원/kWh</span></div></div>
</div>

<!-- 자원별 입찰 이력 (메인) -->
<div class="card mb">
  <div class="sh">
    <div class="st">자원별 입찰 이력 ${window.tip('자원별 입찰 이력','VPP 그룹별·자원 유형별 입찰 결과 추적','각 행 = 1개 자원 × 1개 차수 × 1일','입찰량·낙찰량·낙찰가·결과 + KPX 감사 추적용 SHA-256 해시')}</div>
    ${window.csvBtn('bdl-tbody','bid_history_resource','자원별 입찰 이력')}
  </div>
  <div style="overflow-x:auto"><table class="tbl">
    <thead><tr><th>일자</th><th>차수</th><th>VPP</th><th>자원</th><th>유형</th><th>입찰량(MW)</th><th>낙찰량(MW)</th><th>낙찰가(원)</th><th>오차율</th><th>결과</th></tr></thead>
    <tbody id="bdl-tbody"></tbody>
  </table></div>
</div>

<!-- Fail-Safe 추적 (감사 로그) -->
<div class="g2">
  <div class="card mb">
    <div class="sh"><div class="st">Fail-Safe 추적 로그 (그룹 단위 제출) ${window.tip('Fail-Safe 추적 로그','VPP 그룹 단위로 KPX에 제출한 입찰의 단계별 로그','예측 → 검토 → 제출 단계별 SHA-256 해시 보관','Fail-Safe 발동 시 자동 복구 추적 (전일 평균 대체 / 재시도 등)')}</div></div>
    <div style="overflow-x:auto"><table class="tbl">
      <thead><tr><th>일자</th><th>차수</th><th>단계</th><th>결과</th><th>Fail-Safe</th><th>해시</th></tr></thead>
      <tbody>
        <tr><td class="mono">2026-04-22</td><td><span class="badge inf">1차</span></td><td>11:00 제출</td><td><span class="badge ok">성공</span></td><td class="mono">-</td><td class="mono" style="font-size:11px">a3f91c82b04d</td></tr>
        <tr><td class="mono">2026-04-22</td><td><span class="badge inf">1차</span></td><td>10:00 검토</td><td><span class="badge ok">성공</span></td><td class="mono">-</td><td class="mono" style="font-size:11px">7b2e5f019a3c</td></tr>
        <tr><td class="mono">2026-04-22</td><td><span class="badge inf">1차</span></td><td>09:00 예측</td><td><span class="badge ok">성공</span></td><td class="mono">-</td><td class="mono" style="font-size:11px">c1d48a67f2b0</td></tr>
        <tr><td class="mono">2026-04-22</td><td><span class="badge" style="background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow)">2차</span></td><td>15:00 제출</td><td><span class="badge ok">성공</span></td><td class="mono">-</td><td class="mono" style="font-size:11px">e4d27b915af2</td></tr>
        <tr><td class="mono">2026-04-22</td><td><span class="badge" style="background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow)">2차</span></td><td>14:30 검토</td><td><span class="badge ok">성공</span></td><td class="mono">-</td><td class="mono" style="font-size:11px">b812fa40c9e6</td></tr>
        <tr><td class="mono">2026-04-18</td><td><span class="badge inf">1차</span></td><td>09:00 예측</td><td><span class="badge warn">실패</span></td><td class="mono" style="color:var(--semantic-brand-primary)">전일평균 대체</td><td class="mono" style="font-size:11px">f9e210c34a7d</td></tr>
        <tr><td class="mono">2026-04-18</td><td><span class="badge inf">1차</span></td><td>11:00 제출</td><td><span class="badge ok">성공</span></td><td class="mono" style="color:var(--semantic-positive-normal)">자동 복구</td><td class="mono" style="font-size:11px">83b6c0d1ef45</td></tr>
      </tbody>
    </table></div>
    <div style="font-size:11px;color:var(--semantic-label-alt);margin-top:8px;line-height:18px">※ 입찰 제출은 VPP 그룹 단위로 이루어지며, 각 단계 SHA-256 해시는 KPX 감사 대응용 5년 보관</div>
  </div>

  <div class="card mb">
    <div class="sh"><div class="st">Fail-Safe 정책 상태</div></div>
    <div class="mr"><div class="ml">10:00 1차 예측 실패 → 전일 동시간 평균치 자동 사용</div><div class="mv"><span class="badge ok">활성</span></div></div>
    <div class="mr"><div class="ml">10:30 최종 검토 실패 → 알림 및 수동 개입 전환</div><div class="mv"><span class="badge ok">활성</span></div></div>
    <div class="mr"><div class="ml">11:00 제출 실패 → SMS/Slack 알림 · 재시도 3회</div><div class="mv"><span class="badge ok">활성</span></div></div>
    <div class="mr"><div class="ml">SHA-256 해시 무결성 · KPX 감사 대응</div><div class="mv"><span class="badge ok">검증</span></div></div>
    <div class="mr" style="border:none"><div class="ml">로그 보관 기간 (전기사업법 시행령)</div><div class="mv mono">5년 의무</div></div>
  </div>
</div>`;

window.bdlApply=function(){
  var vpp=document.getElementById('bdl-vpp')?.value||'전체';
  var type=document.getElementById('bdl-type')?.value||'all';
  var round=document.getElementById('bdl-round')?.value||'all';
  var result=document.getElementById('bdl-result')?.value||'전체';
  var from=document.getElementById('bdl-from')?.value||'';
  var to=document.getElementById('bdl-to')?.value||'';

  var data=(window.BDL_BID_DATA||[]).filter(function(r){
    if(vpp!=='전체' && r.vpp!==vpp) return false;
    if(type!=='all' && r.type!==type) return false;
    if(round!=='all' && String(r.round)!==round) return false;
    if(result!=='전체' && r.result!==result) return false;
    if(from && r.date<from) return false;
    if(to && r.date>to) return false;
    return true;
  });

  // 정렬 (날짜 desc, 차수, 자원)
  data.sort(function(a,b){
    if(a.date!==b.date) return b.date.localeCompare(a.date);
    if(a.round!==b.round) return a.round-b.round;
    return a.name.localeCompare(b.name);
  });

  // KPI
  var winCount=data.filter(function(r){return r.result==='낙찰'||r.result==='부분 낙찰';}).length;
  var winRate=data.length?(winCount/data.length*100):0;
  var avgErr=data.length?data.reduce(function(s,r){return s+r.err;},0)/data.length:0;
  var winData=data.filter(function(r){return r.result==='낙찰';});
  var avgPrice=winData.length?winData.reduce(function(s,r){return s+r.price;},0)/winData.length:0;

  var elT=document.getElementById('bdl-kpi-total'); if(elT) elT.innerHTML=data.length+'<span class="ku">건</span>';
  var elW=document.getElementById('bdl-kpi-win'); if(elW) elW.innerHTML=winRate.toFixed(1)+'<span class="ku">%</span>';
  var elE=document.getElementById('bdl-kpi-err'); if(elE) elE.innerHTML=avgErr.toFixed(2)+'<span class="ku">%</span>';
  var elP=document.getElementById('bdl-kpi-price'); if(elP) elP.innerHTML=avgPrice.toFixed(0)+'<span class="ku">원/kWh</span>';

  // 페이지네이션 + 렌더
  window.paginate({
    tbodyId:'bdl-tbody',data:data,pageSize:20,
    render:function(slice){
      var tb=document.getElementById('bdl-tbody');
      if(!tb) return;
      tb.innerHTML=slice.map(function(r){
        var typeBadge=r.type==='바이오'?'<span class="badge" style="background:#e8defa;color:#6035cc">바이오</span>'
          :r.type==='ESS'?'<span class="badge" style="background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow)">ESS</span>'
          :r.type==='풍력'?'<span class="badge" style="background:var(--semantic-tag-bg-blue);color:var(--semantic-tag-label-blue)">풍력</span>'
          :r.type==='V2G'?'<span class="badge" style="background:var(--semantic-tag-bg-green);color:var(--semantic-tag-label-green)">V2G</span>'
          :'<span class="badge inf">태양광</span>';
        var rdBadge=r.round===1?'<span class="badge inf">1차</span>':'<span class="badge" style="background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow)">2차</span>';
        var resBadge=r.result==='낙찰'?'<span class="badge ok">낙찰</span>'
          :r.result==='부분 낙찰'?'<span class="badge warn">부분</span>'
          :'<span class="badge off">미낙찰</span>';
        var errColor=r.err<3?'color:var(--semantic-positive-normal)':r.err<5?'color:var(--palette-yellow-40)':'color:var(--semantic-negative-normal)';
        return '<tr>'
          +'<td class="mono" style="font-size:11px">'+r.date+'</td>'
          +'<td>'+rdBadge+'</td>'
          +'<td style="font-size:11px">'+r.vpp.replace('VPP-','').replace('권','')+'</td>'
          +'<td style="font-size:12px">'+r.name+'</td>'
          +'<td>'+typeBadge+'</td>'
          +'<td class="mono">'+r.bid.toFixed(2)+'</td>'
          +'<td class="mono">'+r.act.toFixed(2)+'</td>'
          +'<td class="mono">'+r.price+'</td>'
          +'<td class="mono" style="'+errColor+'">'+r.err.toFixed(2)+'%</td>'
          +'<td>'+resBadge+'</td>'
          +'</tr>';
      }).join('');
    }
  });
};

window['I_bidDA-log']=function(){ window.bdlApply(); };
