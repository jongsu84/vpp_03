// AUTO-GENERATED FROM index.html — page module: dsh-health
window.P = window.P || {};
/* ===== 대시보드: 설비 건전성 ===== */
/* ===== 설비 건전성 진단 (P0: 통신 헬스 + AI 고장 예보 + 필터/드릴다운) ===== */
// AI 고장 예보 풀셋 (자원 레퍼런스 포함)
window.HF_FORECAST=[
  {res:'광양항태양광 01단계', part:'인버터 #3', prob:87, risk:'critical', lead:'3일 내', reason:'과열 징후 + 진동 상승', action:'즉시 점검'},
  {res:'금능1호 ESS', part:'배터리 뱅크 #2', prob:73, risk:'critical', lead:'7일 내', reason:'셀 전압 편차 확대 + SOH 급락', action:'셀 교체 준비'},
  {res:'김주풍력 01단계', part:'기어박스', prob:62, risk:'warn', lead:'14일 내', reason:'윤활유 온도 기준 초과 빈도 증가', action:'정비 예약'},
  {res:'여수 바이오매스', part:'연소실', prob:48, risk:'warn', lead:'21일 내', reason:'NOx 배출 baseline drift', action:'촉매 검사'},
  {res:'전남 V2G 허브', part:'통신 모듈', prob:38, risk:'info', lead:'30일+', reason:'응답시간 drift 감지', action:'정기 점검'},
];
// RUL 풀셋
window.HF_RUL=[
  {res:'광양항태양광 01단계', eq:'광양항 INV-03', part:'냉각팬', days:14, max:180, risk:'warn'},
  {res:'김주풍력 01단계', eq:'김주풍력 01 #3', part:'베어링', days:32, max:730, risk:'warn'},
  {res:'금능1호 ESS', eq:'금능1호 ESS', part:'배터리셀', days:2, max:1825, risk:'err'},
  {res:'여수 바이오매스', eq:'여수 바이오매스', part:'촉매 담체', days:45, max:365, risk:'ok'},
  {res:'광양항태양광 04단계', eq:'광양항 INV-01', part:'DC 링크 커패시터', days:120, max:730, risk:'ok'},
  {res:'김주풍력 02단계', eq:'김주풍력 02', part:'블레이드 피치', days:180, max:1095, risk:'ok'},
  {res:'제주 ESS허브', eq:'제주 ESS허브', part:'인버터', days:240, max:730, risk:'ok'},
];
// 이상 탐지 피드 풀셋
window.HF_ANOMALY=[
  {res:'광양항태양광 01단계', sev:'위험', desc:'INV-03 과열 (58°C, baseline +8°C)', time:'14:20'},
  {res:'금능1호 ESS', sev:'주의', desc:'셀 전압 편차 확대 (0.028V)', time:'14:08'},
  {res:'김주풍력 01단계', sev:'주의', desc:'기어박스 온도 소폭 상승 (61°C)', time:'13:42'},
  {res:'여수 바이오매스', sev:'관찰', desc:'NOx 배출 baseline drift (+4ppm)', time:'13:11'},
  {res:'전남 V2G 허브', sev:'관찰', desc:'OCPP 응답시간 증가', time:'12:45'},
];
// 통신 장애 이력 풀셋
window.HF_COMM_LOG=[
  {res:'광양항태양광 01단계', displayRes:'광양항태양광 01단계 INV-03', time:'14:23:08', type:'단절', duration:'15m+', recovery:'수동 대기', recoveryCls:'warn'},
  {res:'제주 ESS허브', displayRes:'제주 ESS허브', time:'11:42:18', type:'지연', duration:'1m 12s', recovery:'자동 복구', recoveryCls:'ok'},
  {res:'여수 바이오매스', displayRes:'여수 바이오매스', time:'09:15:02', type:'지연', duration:'38s', recovery:'자동 복구', recoveryCls:'ok'},
  {res:'금능1호 ESS', displayRes:'금능1호 ESS', time:'02:08:44', type:'단절', duration:'2m 48s', recovery:'자동 복구', recoveryCls:'ok'},
];
// 심각도 ← 자원 상태 매핑
const _hfSevMatch=(r,sev)=>{
  if(sev==='전체')return true;
  if(sev==='위험')return r.status==='off'||r.status==='warn';
  if(sev==='주의')return r.status==='warn';
  if(sev==='관찰')return r.status==='ok';
  return true;
};
const _hfReadFilters=()=>({
  type:document.getElementById('hf-f-type')?.value||'all',
  vpp:document.getElementById('hf-f-vpp')?.value||'전체',
  sev:document.getElementById('hf-f-sev')?.value||'전체',
  gen:document.getElementById('hf-f-gen-trig')?.dataset.value||'all',
});
const _hfFilterResources=(f)=>{
  if(f.gen!=='all')return (window.RS_ALL||[]).filter(r=>r.name===f.gen);
  return (window.RS_ALL||[]).filter(r=>{
    if(f.type!=='all'&&r.type!==f.type)return false;
    if(f.vpp!=='전체'&&r.vpp!==f.vpp)return false;
    if(!_hfSevMatch(r,f.sev))return false;
    return true;
  });
};
const _hfFilterBar=()=>{
  const groupHtml=Object.entries(window.GENERATORS_BY_TYPE||{}).map(([type,gens])=>{
    const items=gens.map(g=>{
      const safe=g.replace(/'/g,"\\'");
      return `<div class="hf-gen-item" onclick="selectHfGen('${safe}','${safe}')" style="padding:7px 14px;font-size:13px;cursor:pointer;border-bottom:1px solid var(--semantic-line-alt);white-space:nowrap;overflow:hidden;text-overflow:ellipsis" onmouseover="this.style.background='var(--semantic-background-2)'" onmouseout="this.style.background=''">${g}</div>`;
    }).join('');
    return `<div style="background:var(--semantic-background-3);padding:6px 12px;font-size:11px;font-weight:600;color:var(--semantic-label-strong);letter-spacing:0.3px;border-top:1px solid var(--semantic-line-normal);border-bottom:1px solid var(--semantic-line-normal)">${type} <span style="color:var(--semantic-label-alt);font-weight:400;margin-left:4px">(${gens.length})</span></div>${items}`;
  }).join('');
  return `<div class="card fbar" style="margin-bottom:10px">
    <div class="fbar-row">
      <div class="fbar-item"><span class="fbar-lbl">VPP 그룹</span>
        <select class="fbar-sel" id="hf-f-vpp" onchange="hfFilterChange()"><option>전체</option><option>VPP-전남권</option><option>VPP-제주권</option><option>VPP-경북권</option></select>
      </div>
      <div class="fbar-item"><span class="fbar-lbl">자원 유형</span>
        <select class="fbar-sel" id="hf-f-type" onchange="hfFilterChange()"><option value="all">전체</option><option>태양광</option><option>풍력</option><option>ESS</option><option>바이오</option><option>V2G</option></select>
      </div>
      <div class="fbar-item"><span class="fbar-lbl">심각도</span>
        <select class="fbar-sel" id="hf-f-sev" onchange="hfFilterChange()"><option>전체</option><option>위험</option><option>주의</option><option>관찰</option></select>
      </div>
      <div class="fbar-item" style="position:relative"><span class="fbar-lbl">개별 자원</span>
        <div id="hf-f-gen-trig" class="fbar-sel" data-value="all" tabindex="0" onclick="toggleHfGenDropdown(event)" style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none;overflow:hidden">
          <span id="hf-f-gen-label" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;min-width:0">전체 보기</span>
          <span style="font-size:10px;color:var(--semantic-label-alt);margin-left:6px;flex-shrink:0">▼</span>
        </div>
        <div id="hf-f-gen-panel" style="display:none;position:absolute;top:calc(100% + 4px);left:0;right:0;min-width:280px;max-height:380px;overflow-y:auto;background:var(--semantic-background-1);border:1px solid var(--semantic-line-normal);border-radius:6px;box-shadow:0 4px 12px rgba(0,0,0,0.08);z-index:50">
          <div class="hf-gen-item" onclick="selectHfGen('all','전체 보기')" style="padding:9px 14px;font-size:13px;font-weight:500;cursor:pointer;border-bottom:1px solid var(--semantic-line-normal);background:var(--semantic-brand-primary-assistive);color:var(--semantic-brand-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">전체 보기</div>
          ${groupHtml}
        </div>
      </div>
    </div>
  </div>`;
};
// Hero KPI (항상 전체 기준)
const _hfHeroKPI=()=>{
  const all=window.RS_ALL||[];
  const hbAll=all.map(r=>r.status==='off'?'err':r.status==='warn'?'warn':'ok');
  const okC=hbAll.filter(s=>s==='ok').length;
  const warnC=hbAll.filter(s=>s==='warn').length;
  const errC=hbAll.filter(s=>s==='err').length;
  const critCnt=(window.HF_FORECAST||[]).filter(f=>f.risk==='critical').length;
  const warnCnt=(window.HF_FORECAST||[]).filter(f=>f.risk==='warn').length;
  const rulNear=(window.HF_RUL||[]).filter(r=>r.days<=30).length;
  return `<div class="g5">
    <div class="card acc"><div class="ct">평균 건전성 점수 ${window.tip('평균 건전성 점수','전체 자원의 종합 건전성 점수 평균 (0~100)','Σ(통신 30% + 출력 25% + 진동 20% + 온도 15% + 효율 10%) ÷ 자원수','85+ 우수 / 70~85 정상 / 50~70 주의 / 50 미만 위험 — 50 미만 자원은 즉시 점검')}</div><div class="kv" style="color:var(--semantic-brand-primary)">82<span class="ku">/100</span></div><div class="kd up">전체 기준 · 정상 등급</div></div>
    <div class="card"><div class="ct">실시간 통신 상태 ${window.tip('실시간 통신 상태','RTU·인버터·PCS와의 통신 정상 자원 수 / 전체 자원 수','정상 = ACK 응답 + CRC 일치 + 응답 0.5초 이내','0.5초는 SLA 임계치 — 초과 시 통신 지연 알람 발생 / RTU 1초 폴링 기준')}</div><div class="kv" style="display:flex;align-items:center;gap:8px"><span class="hb-dot ok"></span>${okC}<span style="font-size:11px;color:var(--semantic-label-alt)">/${all.length}</span></div><div class="kd up">0.5초 주기 ${warnC+errC>0?'· ⚠️ '+(warnC+errC)+'건 이상':'· 전원 정상'}</div></div>
    <div class="card"><div class="ct">AI 진단 진행 ${window.tip('AI 진단 진행 상태','고장 사전 예보 ML 모델의 운영 상태','XGBoost 앙상블 모델 · 1시간 단위 재학습 · GPU 추론','정확도 94.2% (Recall 91% / Precision 96%) — 95% 미달 시 모델 재훈련 알람')}</div><div class="kv" style="color:var(--semantic-positive-normal)">RUN<span class="ku">정상</span></div><div class="kd up">정확도 94.2% · 업타임 100%</div></div>
    <div class="card"><div class="ct">고장 사전 예보 ${window.tip('고장 사전 예보','AI 모델이 향후 7일 내 고장 발생을 예측한 자원 건수','이상 점수 > 0.7 AND 잔여 일수 ≤ 7','즉시 정비 예약 권장 — 미조치 시 80%+ 확률로 실제 고장 발생 / "주의"는 0.4~0.7 점수')}</div><div class="kv" style="color:var(--semantic-negative-normal)">${critCnt}<span class="ku">건</span></div><div class="kd dn">7일 내 · 주의 ${warnCnt}건</div></div>
    <div class="card"><div class="ct">교체 임박 부품 ${window.tip('교체 임박 부품','RUL(잔여수명)이 30일 이내인 부품 개수','RUL ≤ 30일 인 부품 (배터리셀·블레이드·인버터 모듈 등)','30일 이전에 교체 부품 발주 권장 — 14일 내 교체 시 운영 차질 최소 / 배터리셀은 60일 lead time')}</div><div class="kv">${rulNear}<span class="ku">개</span></div><div class="kd neu">30일 내 잔여</div></div>
  </div>`;
};
// 필터 범위 외 위험 경고 배너
const _hfCheckWarning=(filters)=>{
  const all=window.RS_ALL||[];
  const allCrit=all.filter(r=>r.status==='warn'||r.status==='off');
  const visible=_hfFilterResources(filters);
  const visibleCrit=visible.filter(r=>r.status==='warn'||r.status==='off');
  const hidden=allCrit.length-visibleCrit.length;
  const el=document.getElementById('hf-warning');
  if(!el)return;
  if(hidden>0&&filters.gen==='all'){
    el.innerHTML=`<div class="card mb" style="border-left:3px solid var(--semantic-negative-normal);padding:10px 14px;background:var(--semantic-tag-bg-red);font-size:13px;margin-bottom:10px;display:flex;align-items:center;gap:10px">
      <span>⚠️ <b>필터 범위 외 위험 ${hidden}건</b> — 전체 보기로 확인 권장</span>
      <button class="cb n sm" style="margin-left:auto" onclick="hfReset()">전체 보기</button>
    </div>`;
    el.style.display='block';
  } else { el.innerHTML=''; el.style.display='none'; }
};
// 전체/범위 모드 Body
const _hfBodyFull=(filters)=>{
  filters=filters||{type:'all',vpp:'전체',sev:'전체',gen:'all'};
  const resources=_hfFilterResources(filters);
  const hb=resources.map(r=>{
    let state='ok', ms=Math.floor(Math.random()*15+8);
    if(r.status==='warn'){state='warn'; ms=Math.floor(Math.random()*80+60);}
    if(r.status==='off'){state='err'; ms=0;}
    return {name:r.name, state, ms};
  });
  const okC=hb.filter(h=>h.state==='ok').length;
  const warnC=hb.filter(h=>h.state==='warn').length;
  const errC=hb.filter(h=>h.state==='err').length;
  const resNames=new Set(resources.map(r=>r.name));
  const forecast=(window.HF_FORECAST||[]).filter(f=>resNames.has(f.res));
  const rul=(window.HF_RUL||[]).filter(r=>resNames.has(r.res));
  const anomaly=(window.HF_ANOMALY||[]).filter(a=>resNames.has(a.res));
  const commLog=(window.HF_COMM_LOG||[]).filter(c=>resNames.has(c.res));
  const riskBg={critical:'var(--semantic-negative-normal)',warn:'var(--palette-yellow-40)',info:'var(--semantic-brand-primary)'};
  const riskLabel={critical:'위험',warn:'주의',info:'관찰'};
  const rulColor={err:'var(--semantic-negative-normal)',warn:'var(--palette-yellow-40)',ok:'var(--semantic-positive-normal)'};
  const sevColor={'위험':'var(--semantic-negative-normal)','주의':'var(--palette-yellow-40)','관찰':'var(--semantic-brand-primary)'};
  const noData=(msg)=>`<div style="padding:30px;text-align:center;color:var(--semantic-label-alt);font-size:12px">${msg}</div>`;
  return `
<!-- 건전성 진단 탭 -->
<div style="display:flex;gap:24px;margin:14px 0 16px 0;border-bottom:1px solid var(--semantic-line-normal)">
  <div class="pg-tab active" onclick="pgHfTab(this,'comm')">통신 건전성</div>
  <div class="pg-tab" onclick="pgHfTab(this,'eqp')">설비 건전성</div>
</div>

<!-- ========== 탭 1: 통신 건전성 ========== -->
<div id="hf-tab-comm">
  <div style="font-size:11px;color:var(--semantic-label-alt);margin-bottom:10px;padding:8px 12px;background:var(--semantic-background-2);border-radius:6px;border-left:3px solid var(--semantic-brand-primary)">
    네트워크 계층 · TCP/IP heartbeat 기반 연결성 측정
  </div>
  <div class="g65">
    <div class="card mb"><div class="sh"><div class="st">🟢 통신 상태 (Heartbeat · 0.5초)</div>
      <div style="display:flex;gap:10px;font-size:11px;align-items:center">
        <span style="display:flex;align-items:center;gap:4px"><span class="hb-dot ok"></span>정상 ${okC}</span>
        <span style="display:flex;align-items:center;gap:4px"><span class="hb-dot warn"></span>지연 ${warnC}</span>
        <span style="display:flex;align-items:center;gap:4px"><span class="hb-dot err"></span>단절 ${errC}</span>
      </div></div>
      ${hb.length>0?`<div class="hb-grid">${hb.map(h=>`<div class="hb-cell"><span class="hb-dot ${h.state}"></span><span class="hb-name" title="${h.name}">${h.name.length>16?h.name.substring(0,15)+'…':h.name}</span><span class="hb-ms">${h.state==='err'?'— ms':h.ms+' ms'}</span></div>`).join('')}</div>`:noData('필터 조건에 맞는 자원 없음')}
    </div>
    <div class="card mb"><div class="sh"><div class="st">프로토콜별 상태</div></div>
      <div class="mr"><div class="ml"><span style="display:inline-flex;align-items:center;gap:6px"><span class="hb-dot ok" style="width:6px;height:6px"></span>Modbus TCP</span></div><div class="mv mono" style="font-size:12px">11 자원 · 평균 12ms</div></div>
      <div class="mr"><div class="ml"><span style="display:inline-flex;align-items:center;gap:6px"><span class="hb-dot ok" style="width:6px;height:6px"></span>IEC 60870-5-104</span></div><div class="mv mono" style="font-size:12px">2 자원 · 평균 18ms</div></div>
      <div class="mr" style="border:none"><div class="ml"><span style="display:inline-flex;align-items:center;gap:6px"><span class="hb-dot warn" style="width:6px;height:6px"></span>OCPP 1.6J (V2G)</span></div><div class="mv mono" style="font-size:12px">2 자원 · 평균 42ms</div></div>
    </div>
  </div>
  <div class="card mb"><div class="sh"><div class="st">자원별 응답시간 추이 (최근 60초)</div><span class="kpi-pill" style="font-size:11px">실시간 갱신</span></div>
    <div style="height:160px;position:relative"><canvas id="c-hb-trend" role="img"></canvas></div>
  </div>
  <div class="card mb"><div class="sh"><div class="st">통신 장애 이력 (최근 24시간)${commLog.length>0?' · '+commLog.length+'건':''}</div></div>
    ${commLog.length>0?`<table class="tbl"><thead><tr><th>시각</th><th>자원</th><th>유형</th><th>지속</th><th>복구</th></tr></thead><tbody>
      ${commLog.map(c=>`<tr><td class="mono" style="font-size:12px">${c.time}</td><td>${c.displayRes}</td><td><span class="badge ${c.type==='단절'?'err':'warn'}">${c.type}</span></td><td class="mono">${c.duration}</td><td><span class="badge ${c.recoveryCls}">${c.recovery}</span></td></tr>`).join('')}
    </tbody></table>`:noData('장애 이력 없음')}
  </div>
</div>

<!-- ========== 탭 2: 설비 건전성 ========== -->
<div id="hf-tab-eqp" style="display:none">
  <div style="font-size:11px;color:var(--semantic-label-alt);margin-bottom:10px;padding:8px 12px;background:var(--semantic-background-2);border-radius:6px;border-left:3px solid var(--palette-yellow-40)">
    데이터 계층 · 센서·출력 패턴 AI 분석
  </div>
  <div class="card mb"><div class="sh"><div class="st">운영 이상 탐지 피드 (센서·출력 패턴)${anomaly.length>0?' · '+anomaly.length+'건':''}</div><span class="kpi-pill" style="font-size:11px">AI 자동 탐지</span></div>
    ${anomaly.length>0?anomaly.map(a=>`<div class="al"><div class="ad" style="background:${sevColor[a.sev]};${a.sev==='위험'?'animation:hbPulse 1s infinite;color:'+sevColor[a.sev]:''}"></div><div class="am"><b style="color:${sevColor[a.sev]}">${a.sev}</b> ${a.res} · ${a.desc}</div><div class="at">${a.time}</div></div>`).join(''):noData('이상 징후 없음')}
  </div>
  <div class="g2">
    <div class="card mb"><div class="sh"><div class="st">AI 고장 사전 예보${forecast.length>0?' · '+forecast.length+'건':''}</div>${forecast.filter(f=>f.risk==='critical').length>0?`<span class="kpi-pill warn" style="font-size:11px">${forecast.filter(f=>f.risk==='critical').length}건 긴급</span>`:''}</div>
      ${forecast.length>0?`<table class="tbl"><thead><tr><th>순위</th><th>자원 · 부품</th><th>고장확률</th><th>예상 시점</th><th>조치</th></tr></thead><tbody>
      ${forecast.map((f,i)=>`<tr style="cursor:pointer" onclick="toast('${f.res} · ${f.part}: ${f.reason}')">
        <td><span class="badge" style="background:${riskBg[f.risk]}20;color:${riskBg[f.risk]};font-weight:600">#${i+1} ${riskLabel[f.risk]}</span></td>
        <td style="font-size:12px"><b>${f.res}</b><br><span style="color:var(--semantic-label-alt)">${f.part}</span></td>
        <td><div style="display:flex;align-items:center;gap:8px"><div style="flex:1;height:5px;background:var(--semantic-background-3);border-radius:3px;max-width:70px;overflow:hidden"><div style="width:${f.prob}%;height:100%;background:${riskBg[f.risk]}"></div></div><span class="mono" style="font-weight:600;color:${riskBg[f.risk]};font-size:12px">${f.prob}%</span></div></td>
        <td class="mono" style="font-size:12px">${f.lead}</td>
        <td style="font-size:12px;color:var(--semantic-brand-primary);font-weight:500">${f.action}</td>
      </tr>`).join('')}
      </tbody></table>`:noData('예보 대상 없음')}
    </div>
    <div class="card mb"><div class="sh"><div class="st">부품별 잔여 수명 (RUL)${rul.length>0?' · '+rul.length+'개':''}</div><button class="cb n sm" onclick="toast('부품 재고 확인')">재고 확인</button></div>
      ${rul.length>0?rul.map(r=>`<div class="rul-row">
        <div class="rul-label"><b style="font-weight:500">${r.eq}</b><br><span style="font-size:11px;color:var(--semantic-label-alt)">${r.part}</span></div>
        <div class="rul-bar"><div class="rul-fill" style="width:${Math.min(100,(r.days/r.max)*100).toFixed(1)}%;background:${rulColor[r.risk]}"></div></div>
        <div class="rul-days" style="color:${rulColor[r.risk]}">${r.days}일</div>
      </div>`).join(''):noData('대상 부품 없음')}
    </div>
  </div>
  <div class="card mb"><div class="sh"><div class="st">이상 징후 시계열 — 광양항태양광 INV-03 (온도 drift 감지)</div>
    <div style="display:flex;gap:10px;font-size:11px;align-items:center">
      <span style="display:flex;align-items:center;gap:4px"><span style="width:10px;height:2px;background:rgba(120,120,120,0.6);display:inline-block"></span>정상 baseline</span>
      <span style="display:flex;align-items:center;gap:4px"><span style="width:10px;height:2px;background:#0059ff;display:inline-block"></span>현재 24시간</span>
      <span style="display:flex;align-items:center;gap:4px"><span style="width:10px;height:10px;background:#ff243740;display:inline-block;border-radius:2px"></span>임계 구간</span>
    </div></div>
    <div style="height:200px;position:relative"><canvas id="c-hb-drift" role="img"></canvas></div>
    <div style="font-size:12px;color:var(--semantic-label-normal);margin-top:8px;padding:10px 12px;background:var(--semantic-tag-bg-red);border-radius:6px">
      ⚠️ <b>AI 판단:</b> 최근 4시간 모듈 온도가 정상 baseline 대비 평균 +6.2°C 상승 · 동시에 인버터 전류 변동성 증가 → <b>냉각 시스템 이상 가능성</b> (고장 3일 내 예보)
    </div>
  </div>
</div>`;
};
// 드릴다운 모드 Body (단일 자원 심층)
const _hfBodyDrill=(genName)=>{
  const r=(window.RS_ALL||[]).find(x=>x.name===genName);
  if(!r)return `<div class="card"><div style="padding:40px;text-align:center">선택된 자원을 찾을 수 없습니다.</div></div>`;
  const color=_rsColor(r.type);
  const forecast=(window.HF_FORECAST||[]).filter(f=>f.res===genName);
  const rul=(window.HF_RUL||[]).filter(x=>x.res===genName);
  const anomaly=(window.HF_ANOMALY||[]).filter(a=>a.res===genName);
  const commLog=(window.HF_COMM_LOG||[]).filter(c=>c.res===genName);
  const riskBg={critical:'var(--semantic-negative-normal)',warn:'var(--palette-yellow-40)',info:'var(--semantic-brand-primary)'};
  const riskLabel={critical:'위험',warn:'주의',info:'관찰'};
  const rulColor={err:'var(--semantic-negative-normal)',warn:'var(--palette-yellow-40)',ok:'var(--semantic-positive-normal)'};
  const sevColor={'위험':'var(--semantic-negative-normal)','주의':'var(--palette-yellow-40)','관찰':'var(--semantic-brand-primary)'};
  let hbState='ok', hbMs=Math.floor(Math.random()*15+8);
  if(r.status==='warn'){hbState='warn';hbMs=Math.floor(Math.random()*80+60);}
  if(r.status==='off'){hbState='err';hbMs=0;}
  const hScore=r.status==='ok'?Math.floor(Math.random()*10+85):r.status==='warn'?Math.floor(Math.random()*15+65):Math.floor(Math.random()*20+40);
  const noData=(msg)=>`<div style="padding:20px;text-align:center;color:var(--semantic-label-alt);font-size:12px">${msg}</div>`;
  return `
<!-- 드릴다운 Hero: 선택 자원 요약 -->
<div class="card mb" style="padding:0;margin-bottom:12px;overflow:hidden;border-left:4px solid ${color}">
  <div style="display:flex;align-items:stretch;flex-wrap:wrap">
    <div style="flex:1;min-width:280px;padding:16px 20px;display:flex;align-items:center;gap:14px">
      <div style="width:48px;height:48px;border-radius:10px;background:${color}1a;color:${color};display:flex;align-items:center;justify-content:center;flex-shrink:0">${_rsIcon(r.type)}</div>
      <div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap">
          <span style="font-size:17px;font-weight:700">${r.name}</span>
          <span class="badge" style="background:${color}20;color:${color};font-weight:500">${r.type}</span>
          <span style="font-size:11px;color:var(--semantic-label-alt);background:var(--semantic-background-2);padding:3px 8px;border-radius:4px">🔎 자원 상세 모드</span>
        </div>
        <div style="font-size:12px;color:var(--semantic-label-alt)">CBP ${r.cbp} · 용량 ${r.cap.toFixed(2)} MW · ${r.vpp} · ${r.loc}</div>
      </div>
    </div>
    <div style="width:1px;background:var(--semantic-line-alt)"></div>
    <div style="padding:16px 20px;display:flex;align-items:center;gap:14px">
      <div style="text-align:center">
        <div style="font-size:10px;color:var(--semantic-label-alt);margin-bottom:2px">건전성 점수</div>
        <div style="font-size:20px;font-weight:700;color:${hScore>=80?'var(--semantic-positive-normal)':hScore>=60?'var(--palette-yellow-40)':'var(--semantic-negative-normal)'};line-height:1">${hScore}<span style="font-size:11px;color:var(--semantic-label-alt);font-weight:500">/100</span></div>
      </div>
      <div style="width:1px;height:36px;background:var(--semantic-line-alt)"></div>
      <div style="text-align:center">
        <div style="font-size:10px;color:var(--semantic-label-alt);margin-bottom:2px">통신 응답</div>
        <div style="display:flex;align-items:center;gap:6px;font-size:14px;font-weight:600"><span class="hb-dot ${hbState}"></span>${hbState==='err'?'단절':hbMs+' ms'}</div>
      </div>
    </div>
  </div>
</div>

<!-- 통신 헬스 카드 2열 -->
<div class="g2">
  <div class="card mb"><div class="sh"><div class="st">통신 헬스 상세</div><span class="kpi-pill${hbState==='ok'?'':' warn'}" style="font-size:11px">${hbState==='ok'?'정상':hbState==='warn'?'지연':'단절'}</span></div>
    <div class="mr"><div class="ml">프로토콜</div><div class="mv mono" style="font-size:12px">${r.type==='V2G'?'OCPP 1.6J':r.type==='풍력'?'IEC 60870-5-104':'Modbus TCP'}</div></div>
    <div class="mr"><div class="ml">현재 응답 시간</div><div class="mv mono" style="color:${hbState==='ok'?'var(--semantic-positive-normal)':hbState==='warn'?'var(--palette-yellow-40)':'var(--semantic-negative-normal)'}">${hbState==='err'?'— 연결 없음':hbMs+' ms'}</div></div>
    <div class="mr"><div class="ml">패킷 손실률</div><div class="mv mono" style="color:var(--semantic-positive-normal)">${hbState==='err'?'100%':'0.02%'}</div></div>
    <div class="mr"><div class="ml">마지막 heartbeat</div><div class="mv mono">${hbState==='err'?'15분 전':'2초 전'}</div></div>
    <div class="mr" style="border:none"><div class="ml">IP · 포트</div><div class="mv mono" style="font-size:12px">10.20.${r.cbp.substring(0,1)}.${r.cbp.substring(1)} : 502</div></div>
  </div>
  <div class="card mb"><div class="sh"><div class="st">응답시간 추이 (최근 60초)</div><span class="kpi-pill" style="font-size:11px">실시간</span></div>
    <div style="height:200px;position:relative"><canvas id="c-hb-trend" role="img"></canvas></div>
  </div>
</div>

<!-- AI 예보 + RUL -->
<div class="g2">
  <div class="card mb"><div class="sh"><div class="st">이 자원의 AI 고장 예보</div>${forecast.filter(f=>f.risk==='critical').length>0?`<span class="kpi-pill warn" style="font-size:11px">${forecast.filter(f=>f.risk==='critical').length}건 긴급</span>`:''}</div>
    ${forecast.length>0?forecast.map(f=>`<div style="padding:12px;border:1px solid ${riskBg[f.risk]}40;background:${riskBg[f.risk]}0d;border-radius:6px;margin-bottom:8px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><span class="badge" style="background:${riskBg[f.risk]};color:#fff;font-weight:600">${riskLabel[f.risk]}</span><b style="font-size:13px">${f.part}</b><span style="margin-left:auto;font-size:11px;color:var(--semantic-label-alt)">${f.lead}</span></div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px"><div style="flex:1;height:6px;background:var(--semantic-background-3);border-radius:3px;overflow:hidden"><div style="width:${f.prob}%;height:100%;background:${riskBg[f.risk]}"></div></div><span class="mono" style="font-weight:700;color:${riskBg[f.risk]}">${f.prob}%</span></div>
      <div style="font-size:12px;color:var(--semantic-label-normal);line-height:18px">📍 ${f.reason}</div>
      <div style="font-size:12px;color:var(--semantic-brand-primary);margin-top:4px;font-weight:500">→ ${f.action}</div>
    </div>`).join(''):noData('현재 이 자원에 대한 예보 없음')}
  </div>
  <div class="card mb"><div class="sh"><div class="st">이 자원의 부품 RUL</div></div>
    ${rul.length>0?rul.map(x=>`<div class="rul-row">
      <div class="rul-label"><b style="font-weight:500">${x.eq}</b><br><span style="font-size:11px;color:var(--semantic-label-alt)">${x.part}</span></div>
      <div class="rul-bar"><div class="rul-fill" style="width:${Math.min(100,(x.days/x.max)*100).toFixed(1)}%;background:${rulColor[x.risk]}"></div></div>
      <div class="rul-days" style="color:${rulColor[x.risk]}">${x.days}일</div>
    </div>`).join(''):noData('등록된 부품 RUL 없음')}
  </div>
</div>

<!-- baseline drift (해당 자원 기준으로 표시) -->
<div class="card mb"><div class="sh"><div class="st">이상 징후 시계열 (이 자원 · 온도 drift)</div></div>
  <div style="height:200px;position:relative"><canvas id="c-hb-drift" role="img"></canvas></div>
</div>

<!-- 통신 장애 이력 + 이상 탐지 (이 자원) -->
<div class="g2">
  <div class="card mb"><div class="sh"><div class="st">이 자원의 통신 장애 이력</div></div>
    ${commLog.length>0?`<table class="tbl"><thead><tr><th>시각</th><th>유형</th><th>지속</th><th>복구</th></tr></thead><tbody>
      ${commLog.map(c=>`<tr><td class="mono" style="font-size:12px">${c.time}</td><td><span class="badge ${c.type==='단절'?'err':'warn'}">${c.type}</span></td><td class="mono">${c.duration}</td><td><span class="badge ${c.recoveryCls}">${c.recovery}</span></td></tr>`).join('')}
    </tbody></table>`:noData('이 자원 통신 장애 이력 없음')}
  </div>
  <div class="card mb"><div class="sh"><div class="st">이 자원의 이상 탐지</div></div>
    ${anomaly.length>0?anomaly.map(a=>`<div class="al"><div class="ad" style="background:${sevColor[a.sev]};${a.sev==='위험'?'animation:hbPulse 1s infinite;color:'+sevColor[a.sev]:''}"></div><div class="am"><b style="color:${sevColor[a.sev]}">${a.sev}</b> ${a.desc}</div><div class="at">${a.time}</div></div>`).join(''):noData('이 자원 이상 탐지 없음')}
  </div>
</div>`;
};
// 차트 초기화 (전체/범위/드릴다운 공통)
window._hfInitCharts=function(){
  const labels=Array.from({length:60},(_,i)=>(60-i)+'s');
  const baseLine=(ms,amp)=>Array.from({length:60},()=>ms+Math.floor((Math.random()-0.5)*amp));
  const trendEl=document.getElementById('c-hb-trend');
  if(trendEl){
    mkChart('c-hb-trend','line',labels,[
      {label:'광양항태양광 01단계 INV-03',data:baseLine(85,40),borderColor:'#ff2437',borderWidth:2,pointRadius:0,tension:0.3,fill:false},
      {label:'금능1호 ESS',data:baseLine(25,10),borderColor:'#ffca42',borderWidth:1.5,pointRadius:0,tension:0.3,fill:false},
      {label:'김주풍력 01단계',data:baseLine(18,6),borderColor:'#1f98ff',borderWidth:1.5,pointRadius:0,tension:0.3,fill:false},
      {label:'기타 자원 평균',data:baseLine(12,4),borderColor:'rgba(120,120,120,0.6)',borderWidth:1.5,pointRadius:0,tension:0.3,borderDash:[4,2],fill:false},
    ],{plugins:{legend:{display:true,position:'bottom',labels:{font:{size:11},boxWidth:10,padding:6}}},scales:{x:{ticks:{maxTicksLimit:10}},y:{title:{display:true,text:'응답시간 (ms)',color:'#666',font:{size:10}}}}});
  }
  const driftEl=document.getElementById('c-hb-drift');
  if(driftEl){
    const h=Array.from({length:24},(_,i)=>i+'h');
    const baseline=[38,38,37,37,36,36,38,40,42,44,46,48,50,51,50,49,48,46,44,42,40,39,38,38];
    const current=[38,38,37,38,37,38,40,43,46,49,52,54,56,58,57,55,53,50,46,43,41,40,39,38];
    mkChart('c-hb-drift','line',h,[
      {label:'정상 baseline',data:baseline,borderColor:'rgba(120,120,120,0.6)',borderWidth:1.5,pointRadius:0,tension:0.4,borderDash:[4,2],fill:false},
      {label:'현재 24시간',data:current,borderColor:'#0059ff',borderWidth:2,pointRadius:0,tension:0.4,fill:true,backgroundColor:'rgba(0,89,255,0.08)'},
      {label:'임계 구간 (> 55°C)',data:current.map(v=>v>55?v:null),borderColor:'#ff2437',borderWidth:3,pointRadius:4,pointBackgroundColor:'#ff2437',tension:0,fill:false,showLine:false},
    ],{plugins:{legend:{display:true,position:'bottom',labels:{font:{size:11},boxWidth:10,padding:6}}},scales:{y:{title:{display:true,text:'온도 (°C)',color:'#666',font:{size:10}}}}});
  }
};
window.pgHfTab=function(el,k){
  ['comm','eqp'].forEach(v=>{
    const d=document.getElementById('hf-tab-'+v);
    if(d) d.style.display=(v===k?'':'none');
  });
  if(el && el.parentElement){
    el.parentElement.querySelectorAll('.pg-tab').forEach(e=>e.classList.remove('active'));
    el.classList.add('active');
  }
  setTimeout(window._hfInitCharts,40);
};
window.hfFilterChange=function(){
  const f=_hfReadFilters();
  _hfCheckWarning(f);
  const body=document.getElementById('hf-body');
  if(!body)return;
  body.innerHTML=(f.gen!=='all')?_hfBodyDrill(f.gen):_hfBodyFull(f);
  setTimeout(window._hfInitCharts,40);
};
window.hfReset=function(){
  const ids={'hf-f-type':'all','hf-f-vpp':'전체','hf-f-sev':'전체'};
  Object.entries(ids).forEach(([id,val])=>{const el=document.getElementById(id);if(el)el.value=val;});
  const trig=document.getElementById('hf-f-gen-trig');
  if(trig) trig.dataset.value='all';
  const lbl=document.getElementById('hf-f-gen-label');
  if(lbl) lbl.textContent='전체 보기';
  window.hfFilterChange();
};
window.toggleHfGenDropdown=function(e){
  if(e) e.stopPropagation();
  const panel=document.getElementById('hf-f-gen-panel');
  if(!panel) return;
  panel.style.display=(panel.style.display==='none'||!panel.style.display)?'block':'none';
};
window.selectHfGen=function(value,label){
  const trig=document.getElementById('hf-f-gen-trig');
  const lbl=document.getElementById('hf-f-gen-label');
  if(trig) trig.dataset.value=value;
  if(lbl) lbl.textContent=label||value;
  const panel=document.getElementById('hf-f-gen-panel');
  if(panel) panel.style.display='none';
  if(typeof window.hfFilterChange==='function') window.hfFilterChange();
};
if(!window._hfDocClickBound){
  document.addEventListener('click',function(e){
    const panel=document.getElementById('hf-f-gen-panel');
    const trig=document.getElementById('hf-f-gen-trig');
    if(!panel||panel.style.display==='none') return;
    if(panel.contains(e.target)||(trig&&trig.contains(e.target))) return;
    panel.style.display='none';
  });
  window._hfDocClickBound=true;
}
window.P['dsh-health']=()=>{
  const defaultFilters={type:'all',vpp:'전체',sev:'전체',gen:'all'};
  return `
${_hfFilterBar()}
<div id="hf-warning"></div>
${_hfHeroKPI()}
<div id="hf-body">${_hfBodyFull(defaultFilters)}</div>`;
};
window['I_dsh-health']=function(){
  setTimeout(window._hfInitCharts,40);
};

