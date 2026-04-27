// AUTO-GENERATED FROM index.html — page module: sdp-del
window.P = window.P || {};
/* ===== 준중앙급전: 발전량인도 ===== */
/* ===== 준중앙급전: 발전량인도 (P0 · 실시간 대조 + 감발/증발 + 필터) ===== */
window.P['sdp-del']=()=>`
<!-- 필터 바 (VPP 그룹 · 자원 유형 · 지시 유형 · 이행 상태 · 시간 범위) -->
<div class="card fbar" style="margin-bottom:10px">
  <div class="fbar-row">
    <div class="fbar-item">
      <span class="fbar-lbl">VPP 그룹</span>
      <select class="fbar-sel" id="sdp-f-vpp" onchange="sdpFilterApply()">
        <option>전체</option><option>VPP-전남권</option><option>VPP-제주권</option><option>VPP-경북권</option>
      </select>
    </div>
    <div class="fbar-item">
      <span class="fbar-lbl">자원 유형</span>
      <select class="fbar-sel" id="sdp-f-type" onchange="sdpFilterApply()">
        <option value="all">전체</option><option>태양광</option><option>풍력</option><option>ESS</option><option>바이오</option><option>V2G</option>
      </select>
    </div>
    <div class="fbar-item">
      <span class="fbar-lbl">지시 유형</span>
      <select class="fbar-sel" id="sdp-f-dsp" onchange="sdpFilterApply()">
        <option>전체</option><option>증발</option><option>감발</option><option>정출력</option>
      </select>
    </div>
    <div class="fbar-item">
      <span class="fbar-lbl">이행 상태</span>
      <select class="fbar-sel" id="sdp-f-status" onchange="sdpFilterApply()">
        <option>전체</option><option>허용범위 내</option><option>허용범위 초과</option><option>실패·제외</option>
      </select>
    </div>
    <div class="fbar-item">
      <span class="fbar-lbl">시간 범위</span>
      <select class="fbar-sel" id="sdp-f-time" onchange="sdpFilterApply()">
        <option>실시간</option><option>최근 1시간</option><option>최근 24시간</option><option>최근 7일</option>
      </select>
    </div>
  </div>
</div>

<!-- Hero: 현재 급전지시 상태 -->
<div class="card mb" style="padding:0;overflow:hidden;border-left:4px solid var(--semantic-brand-primary);margin-bottom:12px">
  <div style="display:flex;align-items:stretch;flex-wrap:wrap">
    <div style="flex:1;min-width:320px;padding:18px 22px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span class="badge" style="background:var(--semantic-tag-bg-red);color:var(--semantic-tag-label-red);font-weight:600">▼ 감발</span>
        <span style="font-size:11px;color:var(--semantic-label-alt)">KPX 급전지시 · 수신 14:00:03</span>
        <span style="margin-left:auto;font-size:11px;color:var(--semantic-label-alt);font-family:var(--mono)">ID: DSP-20260423-142</span>
      </div>
      <div style="display:flex;align-items:baseline;gap:10px;margin-bottom:6px">
        <span style="font-size:13px;color:var(--semantic-label-normal)">목표 출력</span>
        <span class="mono" style="font-size:28px;font-weight:700;color:var(--semantic-label-strong);line-height:1">135.0</span>
        <span style="font-size:14px;color:var(--semantic-label-alt)">MW</span>
        <span style="font-size:13px;color:var(--semantic-label-alt);margin-left:12px">(이전 142.0 MW → <b style="color:var(--semantic-negative-normal)">-7.0 MW</b> 감소)</span>
      </div>
      <div style="font-size:12px;color:var(--semantic-label-normal);line-height:20px">
        💬 <b>"7 MW 감발하여 135 MW 유지"</b> — 계통 주파수 조정 목적
      </div>
    </div>
    <div style="width:1px;background:var(--semantic-line-alt)"></div>
    <div style="padding:18px 22px;min-width:240px">
      <div style="font-size:11px;color:var(--semantic-label-alt);margin-bottom:6px">이행 진행률</div>
      <div style="display:flex;align-items:baseline;gap:6px;margin-bottom:6px">
        <span class="mono" style="font-size:22px;font-weight:700;color:var(--semantic-positive-normal);line-height:1">98.4</span>
        <span style="font-size:12px;color:var(--semantic-label-alt)">%</span>
        <span class="badge ok" style="font-size:11px;margin-left:8px">허용범위 ±5% 내</span>
      </div>
      <div style="width:100%;height:6px;background:var(--semantic-background-3);border-radius:3px;overflow:hidden;margin-bottom:8px">
        <div style="width:98.4%;height:100%;background:linear-gradient(to right,var(--semantic-positive-normal),var(--semantic-brand-primary))"></div>
      </div>
      <div style="font-size:11px;color:var(--semantic-label-alt)">응답시간 <b style="color:var(--semantic-label-normal)">12s</b> / 기준 60s · Ramp-rate <b style="color:var(--semantic-positive-normal)">준수</b></div>
    </div>
  </div>
</div>

<!-- KPI 5종 -->
<div class="g5">
  <div class="card acc"><div class="ct">급전지시값 (KPX) ${window.tip('급전지시값 (KPX)','KPX가 송신한 가장 최근 출력 지시값','TR-DST 메시지 (IEC 60870-5-104) — 5분 단위 갱신','준중앙급전 자원에 한해 발송 — 즉시 이행 의무')}</div><div class="kv" style="color:var(--semantic-negative-normal)">135.0<span class="ku">MW</span></div><div class="kd dn">▼ 감발 · 수신 14:00:03</div></div>
  <div class="card"><div class="ct">현재 실측 출력 ${window.tip('현재 실측 출력','13개 자원의 RTU 측정 출력 합계','Σ(자원별 실측 kW) ÷ 1000 [MW] · 1초 폴링','지시값 대비 ±5% 이내 정상 — 그 이상은 페널티')}</div><div class="kv">132.9<span class="ku">MW</span></div><div class="kd dn">▼ 편차 -1.55%</div></div>
  <div class="card"><div class="ct">이행률 ${window.tip('지시 이행률','지시값 대비 실측 출력의 비율','min(실측 ÷ 지시, 지시 ÷ 실측) × 100 [%]','95% 이상 정상 / 90~95% 주의 / 90% 미만 SLA 위반 페널티')}</div><div class="kv" style="color:var(--semantic-positive-normal)">98.4<span class="ku">%</span></div><div class="kd up">허용 ±5% 내</div></div>
  <div class="card"><div class="ct">금일 지시 이력 ${window.tip('금일 지시 이력','금일 00:00부터 수신한 KPX 급전지시 건수','COUNT(*) WHERE date = today','일평균 5~10건 — 그 이상은 계통 불안 또는 시장 변동성 신호')}</div><div class="kv">7<span class="ku">건</span></div><div class="kd neu">증발 3 · 감발 3 · 정출력 1</div></div>
  <div class="card"><div class="ct">이행 보상금 (추정) ${window.tip('이행 보상금 (추정)','준중앙급전 자원에 지급되는 이행 보상 (KPX 정산)','Σ(시간대별 이행 MWh × 보상 단가) [백만원]','지시 이행률 95% 이상 시 100% 지급 / 90% 미만 시 차감 또는 0')}</div><div class="kv">5.4<span class="ku">백만원</span></div><div class="kd up">금월 누계 128.7</div></div>
</div>

<!-- 실시간 대조 차트 + 허용 오차 밴드 -->
<div class="card mb"><div class="sh"><div class="st">실시간 지시 vs 실측 대조 (최근 5분)</div>
  <div style="display:flex;gap:12px;font-size:11px;align-items:center">
    <span style="display:flex;align-items:center;gap:4px"><span style="width:10px;height:2px;background:#ff2437;display:inline-block"></span>KPX 지시값</span>
    <span style="display:flex;align-items:center;gap:4px"><span style="width:10px;height:2px;background:#0059ff;display:inline-block"></span>실측 출력</span>
    <span style="display:flex;align-items:center;gap:4px"><span style="width:10px;height:10px;background:rgba(0,212,168,0.2);display:inline-block;border-radius:2px"></span>허용 ±5% 밴드</span>
  </div></div>
  <div style="height:220px;position:relative"><canvas id="c-sdp-live" role="img" aria-label="실시간 대조"></canvas></div>
</div>

<!-- 자원별 Set-point 분배표 -->
<div class="card mb"><div class="sh"><div class="st">자원별 Set-point 분배 현황 <span id="sdp-res-cnt" style="font-size:11px;font-weight:400;color:var(--semantic-label-alt);margin-left:8px">13건</span></div><div style="display:flex;gap:6px;align-items:center"><span class="kpi-pill" style="font-size:11px">총 지시 135.0 MW 분배</span>${window.csvBtn('sdp-res-tbody','setpoint_allocation','자원별 Set-point 분배 현황')}</div></div>
<div style="overflow-x:auto"><table class="tbl">
  <thead><tr><th>자원명</th><th>유형</th><th>VPP 그룹</th><th>할당 Set-point</th><th>현재 실측</th><th>편차</th><th>이행률</th><th>응답시간</th><th>상태</th></tr></thead>
  <tbody id="sdp-res-tbody">
  ${[
    ['광양항태양광 01단계','태양광','VPP-전남권',2.10,2.08,-0.95,99.0,'10s','정상','허용범위 내'],
    ['광양항태양광 04단계','태양광','VPP-전남권',2.00,1.96,-2.00,98.0,'11s','정상','허용범위 내'],
    ['해맞이 태양광','태양광','VPP-전남권',0.92,0.86,-6.52,93.5,'14s','주의','허용범위 초과'],
    ['온누리 태양광','태양광','VPP-전남권',0.92,0.87,-5.43,94.6,'13s','정상','허용범위 초과'],
    ['금능1호 태양광','태양광','VPP-제주권',0.85,0.72,-15.29,84.7,'—','제외','실패·제외'],
    ['김주풍력 01단계','풍력','VPP-경북권',3.75,3.72,-0.80,99.2,'8s','정상','허용범위 내'],
    ['김주풍력 02단계','풍력','VPP-경북권',9.40,9.38,-0.21,99.8,'9s','정상','허용범위 내'],
    ['금능1호 ESS','ESS','VPP-제주권',1.75,1.76,+0.57,100.6,'5s','정상','허용범위 내'],
    ['제주 ESS허브','ESS','VPP-제주권',-1.40,-1.42,-1.43,98.6,'6s','정상','허용범위 내'],
    ['순천 바이오가스','바이오','VPP-전남권',1.40,1.40,0.00,100.0,'4s','정상','허용범위 내'],
    ['여수 바이오매스','바이오','VPP-전남권',2.85,2.85,0.00,100.0,'4s','정상','허용범위 내'],
    ['광주 V2G 스테이션','V2G','VPP-전남권',0.72,0.70,-2.78,97.2,'12s','정상','허용범위 내'],
    ['전남 V2G 허브','V2G','VPP-전남권',0,0,0,0,'—','정비 제외','실패·제외'],
  ].map(r=>{
    const statusCls=r[8]==='정상'?'ok':r[8]==='주의'?'warn':r[8]==='제외'||r[8]==='정비 제외'?'err':'off';
    const deviationColor=Math.abs(r[5])<=3?'var(--semantic-positive-normal)':Math.abs(r[5])<=5?'var(--palette-yellow-40)':'var(--semantic-negative-normal)';
    const effColor=r[6]>=95?'var(--semantic-positive-normal)':r[6]>=90?'var(--palette-yellow-40)':'var(--semantic-negative-normal)';
    const typeStyle=r[1]==='풍력'?'background:var(--semantic-tag-bg-blue);color:var(--semantic-tag-label-blue)':r[1]==='ESS'?'background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow)':r[1]==='바이오'?'background:#e8defa;color:#6035cc':r[1]==='V2G'?'background:var(--semantic-tag-bg-green);color:var(--semantic-tag-label-green)':'';
    return `<tr data-type="${r[1]}" data-vpp="${r[2]}" data-status="${r[9]}"><td>${r[0]}</td><td><span class="badge ${r[1]==='태양광'?'inf':''}" ${typeStyle?`style="${typeStyle}"`:''}>${r[1]}</span></td><td style="font-size:12px">${r[2]}</td><td class="mono" style="color:${r[3]<0?'var(--semantic-negative-normal)':''}">${r[3]>=0?'+':''}${r[3].toFixed(2)} MW</td><td class="mono" style="color:${r[4]<0?'var(--semantic-negative-normal)':''}">${r[4]>=0?'+':''}${r[4].toFixed(2)} MW</td><td class="mono" style="color:${deviationColor}">${r[5]>0?'+':''}${r[5].toFixed(2)}%</td><td class="mono" style="color:${effColor}">${r[6]>0?r[6].toFixed(1)+'%':'—'}</td><td class="mono" style="font-size:12px">${r[7]}</td><td><span class="badge ${statusCls}">${r[8]}</span></td></tr>`;
  }).join('')}
  </tbody>
</table></div>
<div style="font-size:11px;color:var(--semantic-label-alt);margin-top:10px;line-height:18px">
  ⚠️ <b>금능1호 태양광 이행 불가</b> (효율 저하) · 제외 처리 후 <b>해맞이·온누리</b>에 재분배 완료<br>
  ⚠️ <b>전남 V2G 허브 정비 중</b> · 할당 0 MW 처리
</div>
</div>

<!-- 24h 지시 이력 로그 + 수동 개입 경고 -->
<div class="g2">
  <div class="card mb"><div class="sh"><div class="st">24시간 지시 이력 <span id="sdp-hist-cnt" style="font-size:11px;font-weight:400;color:var(--semantic-label-alt);margin-left:8px">7건</span></div>${window.csvBtn('sdp-hist-tbody','sdp_24h_history','24시간 지시 이력')}</div>
  <div style="overflow-x:auto"><table class="tbl" data-no-sort="1">
    <thead><tr><th>수신 시각</th><th>지시 ID</th><th>유형</th><th>지시값</th><th>실측</th><th>오차</th><th>이행률</th><th>상태</th></tr></thead>
    <tbody id="sdp-hist-tbody">
    ${[
      ['14:00:03','DSP-142','감발',135.0,132.9,-1.55,98.4,'완료'],
      ['13:00:12','DSP-141','증발',148.0,147.2,-0.54,99.5,'완료'],
      ['12:00:08','DSP-140','증발',150.0,149.1,-0.60,99.4,'완료'],
      ['11:00:00','DSP-139','정출력',145.0,143.2,-1.24,98.8,'완료'],
      ['10:00:04','DSP-138','증발',142.0,140.8,-0.85,99.2,'완료'],
      ['09:00:15','DSP-137','감발',128.0,130.5,+1.95,98.1,'완료'],
      ['08:00:22','DSP-136','감발',115.0,114.2,-0.70,99.3,'완료'],
    ].map(r=>{
      const typeStyle=r[2]==='감발'?'background:var(--semantic-tag-bg-red);color:var(--semantic-tag-label-red)':r[2]==='증발'?'background:var(--semantic-tag-bg-green);color:var(--semantic-tag-label-green)':'';
      return `<tr data-dsp="${r[2]}"><td class="mono" style="font-size:12px">${r[0]}</td><td class="mono" style="font-size:12px">${r[1]}</td><td><span class="badge" style="${typeStyle}">${r[2]}</span></td><td class="mono">${r[3].toFixed(1)} MW</td><td class="mono">${r[4].toFixed(1)} MW</td><td class="mono" style="color:${Math.abs(r[5])<=3?'var(--semantic-positive-normal)':'var(--palette-yellow-40)'}">${r[5]>0?'+':''}${r[5].toFixed(2)}%</td><td class="mono">${r[6].toFixed(1)}%</td><td><span class="badge ok">${r[7]}</span></td></tr>`;
    }).join('')}
    </tbody>
  </table></div>
  <div style="font-size:11px;color:var(--semantic-label-alt);margin-top:10px">※ 감사 추적용 영구 보관 (SHA-256 해시 · 5년)</div>
  </div>
  <div class="card mb"><div class="sh"><div class="st">이행 이벤트 로그 (실시간)</div></div>
    <div class="al"><div class="ad" style="background:var(--semantic-brand-primary)"></div><div class="am"><b>이행 성공</b> · DSP-142 · 오차 -1.55% (허용 범위 내)</div><div class="at">14:00:28</div></div>
    <div class="al"><div class="ad" style="background:var(--palette-yellow-40)"></div><div class="am">금능1호 태양광 응답 지연 (5s+) · <b>대체 자원 자동 재분배</b></div><div class="at">14:00:14</div></div>
    <div class="al"><div class="ad" style="background:var(--semantic-positive-normal)"></div><div class="am">Set-point 전송 완료 · 13개 자원 (정비 1 제외)</div><div class="at">14:00:07</div></div>
    <div class="al"><div class="ad" style="background:var(--semantic-brand-primary)"></div><div class="am"><b>KPX 급전지시 수신</b> · 감발 7 MW (142→135 MW)</div><div class="at">14:00:03</div></div>
    <div class="al" style="border:none"><div class="ad" style="background:var(--semantic-line-strong)"></div><div class="am">금일 지시 7건 · 평균 이행률 98.9% · 평균 응답시간 23s</div><div class="at">누계</div></div>
    <div style="margin-top:14px;padding:10px 12px;background:var(--semantic-tag-bg-green);border-radius:6px;font-size:12px">
      ✓ <b>KPX 통신 상태:</b> 정상 · 다음 지시 예상 15:00 전후
    </div>
  </div>
</div>`;
window['I_sdp-del']=function(){
  // 최근 5분 실시간 대조 차트 (정적 데이터)
  const lbl=Array.from({length:30},(_,i)=>(i*10)+'s');
  const kpxCmd=[142,142,142,142,142,142,140,138,136.5,135.5,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135];
  const actual=[141.8,141.9,142.1,142.0,141.9,141.5,140.2,138.5,136.8,135.9,135.2,134.5,133.8,133.2,132.8,132.5,132.8,133.1,132.9,132.7,132.9,133.0,132.8,132.9,132.8,132.9,132.9,132.8,132.9,132.9];
  const bandUp=kpxCmd.map(v=>v*1.05);
  const bandDown=kpxCmd.map(v=>v*0.95);
  mkChart('c-sdp-live','line',lbl,[
    {label:'허용 상한 (+5%)',data:bandUp,borderColor:'rgba(0,212,168,0.3)',backgroundColor:'rgba(0,212,168,0.15)',borderWidth:1,pointRadius:0,tension:0.1,fill:'+1'},
    {label:'허용 하한 (-5%)',data:bandDown,borderColor:'rgba(0,212,168,0.3)',borderWidth:1,pointRadius:0,tension:0.1,fill:false},
    {label:'KPX 지시값',data:kpxCmd,borderColor:'#ff2437',borderWidth:2,pointRadius:0,tension:0.1,fill:false,borderDash:[0]},
    {label:'실측 출력',data:actual,borderColor:'#0059ff',borderWidth:2.5,pointRadius:0,tension:0.3,fill:false},
  ],{
    plugins:{legend:{display:false}},
    scales:{
      x:{ticks:{maxTicksLimit:10,font:{size:10}}},
      y:{min:128,max:148,title:{display:true,text:'출력 (MW)',color:'#666',font:{size:10}}}
    }
  });
};
// 필터 적용 (자원별 Set-point 분배표 + 24시간 지시 이력 행 필터링)
window.sdpFilterApply=function(){
  const vpp=document.getElementById('sdp-f-vpp')?.value||'전체';
  const type=document.getElementById('sdp-f-type')?.value||'all';
  const dsp=document.getElementById('sdp-f-dsp')?.value||'전체';
  const status=document.getElementById('sdp-f-status')?.value||'전체';
  // 자원별 분배표 필터링 (자원 유형 · 이행 상태)
  document.querySelectorAll('#sdp-res-tbody tr').forEach(tr=>{
    let show=true;
    const rowType=tr.dataset.type||'';
    const rowVpp=tr.dataset.vpp||'';
    const rowStatus=tr.dataset.status||'';
    if(type!=='all' && rowType!==type)show=false;
    if(vpp!=='전체' && rowVpp!==vpp)show=false;
    if(status!=='전체' && rowStatus!==status)show=false;
    tr.style.display=show?'':'none';
  });
  // 지시 이력 필터링 (지시 유형)
  document.querySelectorAll('#sdp-hist-tbody tr').forEach(tr=>{
    let show=true;
    const rowDsp=tr.dataset.dsp||'';
    if(dsp!=='전체' && rowDsp!==dsp)show=false;
    tr.style.display=show?'':'none';
  });
  // 건수 갱신
  const visRes=Array.from(document.querySelectorAll('#sdp-res-tbody tr')).filter(t=>t.style.display!=='none').length;
  const visHist=Array.from(document.querySelectorAll('#sdp-hist-tbody tr')).filter(t=>t.style.display!=='none').length;
  const resCnt=document.getElementById('sdp-res-cnt');
  const histCnt=document.getElementById('sdp-hist-cnt');
  if(resCnt)resCnt.textContent=visRes+'건';
  if(histCnt)histCnt.textContent=visHist+'건';
};
window.sdpReset=function(){
  ['sdp-f-vpp','sdp-f-type','sdp-f-dsp','sdp-f-status','sdp-f-time'].forEach((id,i)=>{
    const el=document.getElementById(id);
    if(el)el.value=(id==='sdp-f-type'?'all':(id==='sdp-f-time'?'실시간':'전체'));
  });
  window.sdpFilterApply();
};

