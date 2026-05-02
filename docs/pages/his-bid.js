// AUTO-GENERATED FROM index.html — page module: his-bid
window.P = window.P || {};
/* ===== 이력: 입찰/제어 이력 ===== */
window.HIS_BID_DATA=(function(){
  var rows=[];
  var dates=['2026-04-23','2026-04-22','2026-04-21','2026-04-20','2026-04-19'];
  var seed=11;
  function rnd(){seed=(seed*9301+49297)%233280;return seed/233280;}
  dates.forEach(function(d,di){
    // DA 1차 + 2차 (2건)
    [1,2].forEach(function(rd){
      ['VPP-전남권','VPP-제주권','VPP-경북권'].forEach(function(v){
        var bid=+(80+rnd()*70).toFixed(1);
        var act=+(bid*(0.96+rnd()*0.05)).toFixed(1);
        var err=+(Math.abs(bid-act)/bid*100).toFixed(2);
        var res=err<3?'낙찰':'미낙찰';
        rows.push({date:d,time:rd===1?'09:00':'13:00',type:'DA 입찰',round:rd+'차',vpp:v,bid:bid,act:act,err:err,result:res});
      });
    });
    // RT 입찰 (4건)
    for(var i=0;i<3;i++){
      var hour=10+i*2;
      ['VPP-전남권','VPP-제주권'].forEach(function(v){
        var bid=+(40+rnd()*100).toFixed(1);
        var act=+(bid*(0.96+rnd()*0.06)).toFixed(1);
        var err=+(Math.abs(bid-act)/bid*100).toFixed(2);
        rows.push({date:d,time:hour+':45',type:'RT 입찰',round:'-',vpp:v,bid:bid,act:act,err:err,result:err<5?'낙찰':'미낙찰'});
      });
    }
    // 제어명령 (1~2건)
    if(rnd()>0.4){
      var amt=Math.round(70+rnd()*25);
      var actC=+(amt*(0.92+rnd()*0.08)).toFixed(1);
      rows.push({date:d,time:'13:30',type:'제어명령',round:'-',vpp:'전체',bid:amt+'%',act:actC+'%',err:+(Math.abs(amt-actC)/amt*100).toFixed(2),result:'성공'});
    }
  });
  return rows;
})();
window.P['his-bid']=()=>`
${_mkFilterBar({periodStart:'2026-04-19',periodEnd:'2026-04-23',interval:'일',prefix:'hb-f',onChange:'hisBidApply',extras:`
  <div class="fbar-item">
    <span class="fbar-lbl">구분</span>
    <select class="fbar-sel" id="hb-f-bidtype" onchange="hisBidApply()"><option>전체</option><option>DA 입찰</option><option>RT 입찰</option><option>제어명령</option></select>
  </div>
  <div class="fbar-item">
    <span class="fbar-lbl">차수 (DA)</span>
    <select class="fbar-sel" id="hb-f-round" onchange="hisBidApply()"><option>전체</option><option>1차</option><option>2차</option></select>
  </div>`})}
<div class="g4">
  <div class="card acc"><div class="ct">조회 결과 ${window.tip('조회 결과','현재 필터 조건에 매칭되는 입찰·제어 이력 건수','COUNT(*) WHERE 필터 매칭','DA 입찰 + RT 입찰 + 제어명령 합산')}</div><div class="kv" id="hb-kpi-total">—<span class="ku">건</span></div></div>
  <div class="card"><div class="ct">낙찰 성공률 ${window.tip('낙찰 성공률','제출한 입찰 중 낙찰된 비율','낙찰 건수 ÷ 전체 입찰 건수 × 100 [%]','95% 이상 정상 / 90~95% 주의 — 입찰가 조정 검토 필요')}</div><div class="kv" style="color:var(--acc)" id="hb-kpi-win">—<span class="ku">%</span></div></div>
  <div class="card"><div class="ct">평균 오차율 ${window.tip('평균 오차율','입찰량 대비 실측치의 평균 절대 편차','Σ |실측 - 입찰| ÷ 입찰 ÷ N × 100 [%]','3% 이하 우수 / 3~5% 정상 / 5~8% 주의 / 8% 초과 IMBP 페널티')}</div><div class="kv" id="hb-kpi-err">—<span class="ku">%</span></div></div>
  <div class="card"><div class="ct">제어 명령 ${window.tip('제어 명령','KPX 급전지시 또는 한전 계통제약에 의한 출력 제어 명령 횟수','구분 = 제어명령 인 건수 합계','KPX 출력제어는 보상 지급 / 한전 계통제약은 무상이 일반적')}</div><div class="kv" id="hb-kpi-ctrl">—<span class="ku">회</span></div></div>
</div>
<div class="card mb"><div class="sh"><div class="st">일자별 입찰 추이</div></div><div style="height:160px;position:relative"><canvas id="c-hbid" role="img" aria-label="입찰 추이"></canvas></div></div>
<div class="card"><div class="sh"><div class="st">입찰 · 제어 이력 <span id="hb-cnt" style="font-size:11px;font-weight:400;color:var(--semantic-label-alt);margin-left:8px">— 건</span></div>${window.csvBtn('his-bid-tbody','bid_control_history','입찰 · 제어 이력')}</div><table class="tbl"><thead><tr><th>일자</th><th>시각</th><th>구분</th><th>차수</th><th>VPP</th><th>입찰량</th><th>실측</th><th>오차율</th><th>결과</th></tr></thead><tbody id="his-bid-tbody"></tbody></table></div>`;
window.hisBidApply=function(){
  var grp=(document.getElementById('hb-f-grp')||{}).value||'전체';
  var from=(document.getElementById('hb-f-from')||{}).value||'';
  var to=(document.getElementById('hb-f-to')||{}).value||'';
  var typ=(document.getElementById('hb-f-bidtype')||{}).value||'전체';
  var rd=(document.getElementById('hb-f-round')||{}).value||'전체';
  var data=(window.HIS_BID_DATA||[]).filter(function(r){
    if(grp!=='전체' && r.vpp!==grp && r.vpp!=='전체') return false;
    if(from && r.date<from) return false;
    if(to && r.date>to) return false;
    if(typ!=='전체' && r.type!==typ) return false;
    if(rd!=='전체' && r.round!==rd) return false;
    return true;
  });
  window.paginate({
    tbodyId:'his-bid-tbody',data:data,pageSize:20,
    render:function(slice){
      var tb=document.getElementById('his-bid-tbody');
      if(tb) tb.innerHTML=slice.map(function(r){
        var typBadge=r.type==='DA 입찰'?'<span class="badge inf">DA 입찰</span>':(r.type==='RT 입찰'?'<span class="badge inf">RT 입찰</span>':'<span class="badge warn">제어명령</span>');
        var resBadge=r.result==='낙찰'||r.result==='성공'?'<span class="badge ok">'+r.result+'</span>':'<span class="badge off">'+r.result+'</span>';
        var bidTxt=typeof r.bid==='string'?r.bid:r.bid+'MW';
        var actTxt=typeof r.act==='string'?r.act:r.act+'MW';
        return '<tr><td class="mono" style="font-size:11px">'+r.date+'</td><td class="mono" style="font-size:11px">'+r.time+'</td><td>'+typBadge+'</td><td class="mono">'+r.round+'</td><td>'+r.vpp+'</td><td class="mono">'+bidTxt+'</td><td class="mono">'+actTxt+'</td><td class="mono">'+r.err+'%</td><td>'+resBadge+'</td></tr>';
      }).join('');
    }
  });
  var cnt=document.getElementById('hb-cnt'); if(cnt) cnt.textContent=data.length+' 건';
  var bids=data.filter(r=>r.type!=='제어명령');
  var ctrls=data.filter(r=>r.type==='제어명령');
  var won=bids.filter(r=>r.result==='낙찰').length;
  var winRate=bids.length?(won/bids.length*100):0;
  var avgErr=data.length?data.reduce(function(s,r){return s+r.err;},0)/data.length:0;
  var elT=document.getElementById('hb-kpi-total'); if(elT) elT.innerHTML=data.length+'<span class="ku">건</span>';
  var elW=document.getElementById('hb-kpi-win'); if(elW) elW.innerHTML=winRate.toFixed(1)+'<span class="ku">%</span>';
  var elE=document.getElementById('hb-kpi-err'); if(elE) elE.innerHTML=avgErr.toFixed(2)+'<span class="ku">%</span>';
  var elC=document.getElementById('hb-kpi-ctrl'); if(elC) elC.innerHTML=ctrls.length+'<span class="ku">회</span>';
  // 차트: 일자별 평균 오차율
  var byDate={};
  data.forEach(function(r){
    if(!byDate[r.date]) byDate[r.date]={errs:[],bids:0,acts:0};
    byDate[r.date].errs.push(r.err);
    if(typeof r.bid==='number') byDate[r.date].bids+=r.bid;
    if(typeof r.act==='number') byDate[r.date].acts+=r.act;
  });
  var dates=Object.keys(byDate).sort();
  if(dates.length){
    mkChart('c-hbid','line',dates.map(d=>d.slice(5)),[
      {label:'입찰량 합계(MW)',data:dates.map(d=>byDate[d].bids.toFixed(0)),borderColor:'#1f98ff',borderWidth:1.5,pointRadius:2,tension:0.3,borderDash:[4,2],fill:false},
      {label:'실측 합계(MW)',data:dates.map(d=>byDate[d].acts.toFixed(0)),borderColor:'#0059ff',borderWidth:2,pointRadius:2,tension:0.3,fill:false}
    ],{plugins:{legend:{display:true}}});
  }
};
window['I_his-bid']=function(){ hisBidApply(); };

