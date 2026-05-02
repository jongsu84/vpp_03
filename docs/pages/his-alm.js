// AUTO-GENERATED FROM index.html — page module: his-alm
window.P = window.P || {};
/* ===== 이력: 알람이력 ===== */
window.HIS_ALM_DATA=[
  {code:'ALM-2041',name:'RTU 통신 단절 — 광양항',vpp:'VPP-전남권',res:'광양항태양광',date:'2026-04-23',start:'14:23',end:'',duration:'15m+',level:'Critical',status:'조치중'},
  {code:'ALM-2040',name:'IMBP 위험 구간 감지',vpp:'VPP-전남권',res:'전체',date:'2026-04-23',start:'14:15',end:'14:18',duration:'3m',level:'Major',status:'완료'},
  {code:'ALM-2039',name:'금능1호 SoC 18% 이하',vpp:'VPP-제주권',res:'금능1호 ESS',date:'2026-04-23',start:'14:08',end:'',duration:'30m+',level:'Major',status:'조치중'},
  {code:'ALM-2038',name:'인버터 #3 과열 (58°C)',vpp:'VPP-전남권',res:'광양항태양광',date:'2026-04-23',start:'13:45',end:'14:02',duration:'17m',level:'Major',status:'완료'},
  {code:'ALM-2037',name:'예측 오차율 5.2% 초과',vpp:'VPP-경북권',res:'김주풍력',date:'2026-04-23',start:'13:22',end:'13:38',duration:'16m',level:'Minor',status:'완료'},
  {code:'ALM-2036',name:'OCPP 응답시간 증가',vpp:'VPP-전남권',res:'광양V2G',date:'2026-04-23',start:'12:10',end:'12:28',duration:'18m',level:'Minor',status:'완료'},
  {code:'ALM-2035',name:'기상 데이터 수집 지연',vpp:'전체',res:'전체',date:'2026-04-23',start:'09:14',end:'09:21',duration:'7m',level:'Info',status:'완료'},
  {code:'ALM-2034',name:'배터리 셀 전압 편차 확대',vpp:'VPP-제주권',res:'금능1호 ESS',date:'2026-04-22',start:'22:15',end:'',duration:'미해제',level:'Major',status:'미처리'},
  {code:'ALM-2033',name:'풍력 블레이드 진동 상승',vpp:'VPP-경북권',res:'김주풍력',date:'2026-04-22',start:'18:42',end:'19:05',duration:'23m',level:'Major',status:'완료'},
  {code:'ALM-2032',name:'NOx 배출 baseline drift',vpp:'VPP-전남권',res:'무안바이오',date:'2026-04-22',start:'15:30',end:'16:12',duration:'42m',level:'Minor',status:'완료'},
  {code:'ALM-2031',name:'제주V2G 충전 세션 실패',vpp:'VPP-제주권',res:'제주V2G',date:'2026-04-22',start:'11:08',end:'11:14',duration:'6m',level:'Minor',status:'완료'},
  {code:'ALM-2030',name:'KPX 급전지시 수신 지연',vpp:'전체',res:'전체',date:'2026-04-22',start:'10:01',end:'10:08',duration:'7m',level:'Critical',status:'완료'},
  {code:'ALM-2029',name:'온누리 발전 급감',vpp:'VPP-전남권',res:'온누리',date:'2026-04-21',start:'14:45',end:'15:12',duration:'27m',level:'Major',status:'완료'},
  {code:'ALM-2028',name:'바이오 연소실 압력 이상',vpp:'VPP-경북권',res:'영덕바이오',date:'2026-04-21',start:'09:33',end:'10:01',duration:'28m',level:'Critical',status:'완료'},
  {code:'ALM-2027',name:'정산 데이터 동기화 실패',vpp:'전체',res:'전체',date:'2026-04-21',start:'02:00',end:'02:18',duration:'18m',level:'Critical',status:'완료'},
  {code:'ALM-2026',name:'광양2호 ESS 정비 시작',vpp:'VPP-전남권',res:'광양2호 ESS',date:'2026-04-20',start:'08:00',end:'',duration:'정비중',level:'Info',status:'미처리'},
  {code:'ALM-2025',name:'여수태양광 차단 (계통제약)',vpp:'VPP-전남권',res:'여수태양광',date:'2026-04-20',start:'13:20',end:'14:00',duration:'40m',level:'Minor',status:'완료'},
  {code:'ALM-2024',name:'포항S1 인버터 통신 일시 단절',vpp:'VPP-경북권',res:'포항S1',date:'2026-04-19',start:'16:50',end:'17:08',duration:'18m',level:'Major',status:'완료'}
];
window.P['his-alm']=()=>`
${_mkFilterBar({periodStart:'2026-04-19',periodEnd:'2026-04-23',interval:'일',prefix:'ha-f',onChange:'hisAlmApply',extras:`
  <div class="fbar-item">
    <span class="fbar-lbl">알람 등급</span>
    <select class="fbar-sel" id="ha-f-lvl" onchange="hisAlmApply()"><option>전체</option><option>Critical</option><option>Major</option><option>Minor</option><option>Info</option></select>
  </div>
  <div class="fbar-item">
    <span class="fbar-lbl">처리 상태</span>
    <select class="fbar-sel" id="ha-f-stat" onchange="hisAlmApply()"><option>전체</option><option>미처리</option><option>조치중</option><option>완료</option></select>
  </div>`})}
<div class="g4">
  <div class="card"><div class="ct">조회 결과 ${window.tip('조회 결과','현재 필터 조건에 매칭되는 알람 건수','COUNT(*) WHERE 필터 매칭','참고용 — 처리 진행 상황은 처리 완료/미해결 카드 참조')}</div><div class="kv" id="ha-kpi-total">—<span class="ku">건</span></div></div>
  <div class="card"><div class="ct">위급(Critical) ${window.tip('Critical 알람','즉각 대응이 필요한 시스템 위급 알람','등급 = Critical 인 알람 건수','RTU 단절 / KPX 통신 / 정산 동기화 실패 등 — 24시간 운영자 응대 필요')}</div><div class="kv" style="color:var(--acc4)" id="ha-kpi-crit">—<span class="ku">건</span></div></div>
  <div class="card"><div class="ct">처리 완료 ${window.tip('처리 완료','조치가 완료된 알람 건수','상태 = 완료 인 알람 건수','MTTR(평균 처리 시간) 12분 이내 권장')}</div><div class="kv" style="color:var(--acc)" id="ha-kpi-done">—<span class="ku">건</span></div></div>
  <div class="card"><div class="ct">미해결 ${window.tip('미해결 알람','아직 조치가 완료되지 않은 알람 (미처리 + 조치중)','상태 ≠ 완료 인 알람 건수','Critical 미해결 0건 유지 권장 / Major 4건 이상은 우선순위 재배치')}</div><div class="kv" style="color:var(--acc3)" id="ha-kpi-open">—<span class="ku">건</span></div></div>
</div>
<div class="g65">
  <div class="card mb"><div class="sh"><div class="st">등급별 분포</div></div><div style="height:140px;position:relative"><canvas id="c-alm" role="img" aria-label="알람 분포"></canvas></div></div>
  <div class="card mb">
    <div class="sh"><div class="st">유형 비중 (필터 결과 기준)</div></div>
    <div id="ha-cat-bars"></div>
  </div>
</div>
<div class="card"><div class="sh"><div class="st">알람 이력 <span id="ha-cnt" style="font-size:11px;font-weight:400;color:var(--semantic-label-alt);margin-left:8px">— 건</span></div>${window.csvBtn('his-alm-tbody','alarm_history','알람 이력')}</div><table class="tbl"><thead><tr><th>코드</th><th>알람명</th><th>VPP</th><th>자원</th><th>일자</th><th>발생</th><th>해제</th><th>지속</th><th>등급</th><th>처리</th></tr></thead><tbody id="his-alm-tbody"></tbody></table></div>`;
window.hisAlmApply=function(){
  var grp=(document.getElementById('ha-f-grp')||{}).value||'전체';
  var from=(document.getElementById('ha-f-from')||{}).value||'';
  var to=(document.getElementById('ha-f-to')||{}).value||'';
  var lvl=(document.getElementById('ha-f-lvl')||{}).value||'전체';
  var stat=(document.getElementById('ha-f-stat')||{}).value||'전체';
  var data=(window.HIS_ALM_DATA||[]).filter(function(r){
    if(grp!=='전체' && r.vpp!==grp && r.vpp!=='전체') return false;
    if(from && r.date<from) return false;
    if(to && r.date>to) return false;
    if(lvl!=='전체' && r.level!==lvl) return false;
    if(stat!=='전체' && r.status!==stat) return false;
    return true;
  });
  window.paginate({
    tbodyId:'his-alm-tbody',data:data,pageSize:20,
    render:function(slice){
      var tb=document.getElementById('his-alm-tbody');
      if(tb) tb.innerHTML=slice.map(function(r){
        var lvlCls=r.level==='Critical'?'err':(r.level==='Major'?'warn':(r.level==='Minor'?'inf':'off'));
        var stCls=r.status==='완료'?'ok':(r.status==='조치중'?'warn':'err');
        return '<tr><td class="mono" style="font-size:9px;color:var(--acc2)">'+r.code+'</td><td>'+r.name+'</td><td>'+r.vpp+'</td><td>'+r.res+'</td><td class="mono" style="font-size:11px">'+r.date+'</td><td class="mono" style="font-size:11px">'+r.start+'</td><td class="mono" style="font-size:11px">'+(r.end||'미해제')+'</td><td class="mono" style="font-size:11px">'+r.duration+'</td><td><span class="badge '+lvlCls+'">'+r.level+'</span></td><td><span class="badge '+stCls+'">'+r.status+'</span></td></tr>';
      }).join('');
    }
  });
  var cnt=document.getElementById('ha-cnt'); if(cnt) cnt.textContent=data.length+' 건';
  var crit=data.filter(r=>r.level==='Critical').length;
  var done=data.filter(r=>r.status==='완료').length;
  var open=data.filter(r=>r.status!=='완료').length;
  var elT=document.getElementById('ha-kpi-total'); if(elT) elT.innerHTML=data.length+'<span class="ku">건</span>';
  var elC=document.getElementById('ha-kpi-crit'); if(elC) elC.innerHTML=crit+'<span class="ku">건</span>';
  var elD=document.getElementById('ha-kpi-done'); if(elD) elD.innerHTML=done+'<span class="ku">건</span>';
  var elO=document.getElementById('ha-kpi-open'); if(elO) elO.innerHTML=open+'<span class="ku">건</span>';
  // 등급별 차트
  var byLvl={Critical:0,Major:0,Minor:0,Info:0};
  data.forEach(function(r){byLvl[r.level]=(byLvl[r.level]||0)+1;});
  mkChart('c-alm','bar',['Critical','Major','Minor','Info'],[{label:'건수',data:[byLvl.Critical,byLvl.Major,byLvl.Minor,byLvl.Info],backgroundColor:['#ff2437','#ffca42','#1f98ff','#999'],borderRadius:4,borderWidth:0}],{plugins:{legend:{display:false}}});
  // 카테고리 비중
  var cats={};
  data.forEach(function(r){
    var c='기타';
    if(/통신|RTU|단절/.test(r.name)) c='통신 단절';
    else if(/인버터|진동|과열/.test(r.name)) c='인버터·설비 장애';
    else if(/예측|오차/.test(r.name)) c='예측 오차';
    else if(/SoC|배터리|셀/.test(r.name)) c='ESS 이상';
    else if(/풍력|블레이드/.test(r.name)) c='풍력 이상';
    else if(/바이오|NOx|연소/.test(r.name)) c='바이오 이상';
    else if(/V2G|OCPP/.test(r.name)) c='V2G 이상';
    else if(/KPX|급전지시|정산/.test(r.name)) c='시장·시스템';
    cats[c]=(cats[c]||0)+1;
  });
  var catBars=document.getElementById('ha-cat-bars');
  if(catBars){
    var sorted=Object.keys(cats).map(k=>[k,cats[k]]).sort(function(a,b){return b[1]-a[1];});
    var total=data.length||1;
    catBars.innerHTML=sorted.slice(0,6).map(function(p){
      var pct=Math.round(p[1]/total*100);
      return '<div class="pr"><div class="pl">'+p[0]+'</div><div class="pb"><div class="pf" style="width:'+pct+'%;background:var(--semantic-brand-primary)"></div></div><div class="pv">'+p[1]+'건</div></div>';
    }).join('') || '<div style="font-size:11px;color:var(--semantic-label-alt);text-align:center;padding:20px">데이터 없음</div>';
  }
};
window['I_his-alm']=function(){ hisAlmApply(); };

