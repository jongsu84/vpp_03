// AUTO-GENERATED FROM index.html — page module: bidDA-log
window.P = window.P || {};
/* ===== 하루전입찰: 자동화 · 로그 (Fail-Safe) ===== */
window.P['bidDA-log']=()=>`
${_mkCross('bidDA-log')}

<!-- VPP 그룹 · 자원 유형 · 차수 · 기간 필터 -->
<div class="card mb" style="display:flex;gap:14px;align-items:center;padding:12px 16px;margin-bottom:12px;flex-wrap:wrap">
  <div style="display:flex;align-items:center;gap:8px">
    <span class="flabel">VPP 그룹</span>
    <select class="sel" style="min-width:130px;max-width:160px;height:32px;font-size:13px"><option>VPP-전남권</option><option>VPP-제주권</option><option>VPP-경북권</option></select>
  </div>
  <div style="display:flex;align-items:center;gap:8px">
    <span class="flabel">자원 유형</span>
    ${_mkResMulti()}
  </div>
  <div style="display:flex;align-items:center;gap:8px">
    <span class="flabel">차수</span>
    <div style="display:inline-flex;background:var(--semantic-background-3);padding:3px;border-radius:6px;gap:2px">
      <button class="rd-tab active" onclick="logFilter('all',this)">전체</button>
      <button class="rd-tab" onclick="logFilter('1',this)">1차</button>
      <button class="rd-tab" onclick="logFilter('2',this)">2차</button>
    </div>
  </div>
  <div style="display:flex;align-items:center;gap:6px">
    <span class="flabel">기간</span>
    <input class="inp" type="date" style="min-width:130px;max-width:160px;height:32px;font-size:13px" value="2026-04-01">
    <span style="color:var(--semantic-label-alt)">~</span>
    <input class="inp" type="date" style="min-width:130px;max-width:160px;height:32px;font-size:13px" value="2026-04-23">
  </div>
  <span style="margin-left:auto;color:var(--semantic-label-alt);font-size:12px" id="log-filter-info">전체 기록 · 45건</span>
</div>

<div class="g4">
  <div class="card acc"><div class="ct">최근 30일 제출 성공률 ${window.tip('최근 30일 제출 성공률','입찰 제출이 KPX에 정상 접수된 비율','정상 접수 ÷ 시도 × 100 [%]','99% 이상 정상 / Fail-Safe 발동 시 자동 재시도 (최대 3회) / 100% 미달 시 운영 점검')}</div><div class="kv" style="color:var(--semantic-positive-normal)">100<span class="ku">%</span></div><div class="kd up">Fail-Safe 0회 발동</div></div>
  <div class="card"><div class="ct">평균 제출 지연 ${window.tip('평균 제출 지연','마감 시각 대비 입찰 제출 시각','제출 시각 - 마감 시각 [분 단위, 음수 = 마감 전 제출]','-3~-5분 권장 / 마감 임박 제출 시 KPX 서버 부하로 실패 위험 증가')}</div><div class="kv">-4<span class="ku">분 전</span></div><div class="kd up">마감 대비</div></div>
  <div class="card"><div class="ct">KPX 제도 개정 모니터링 ${window.tip('KPX 제도 개정 모니터링','다음 KPX 정산 규정 검토 시점','분기별 KPX 운영규정 변경 자동 점검','신규 시장(보조서비스, 출력제어 보상 등) 도입 시 입찰 전략 영향 — 사전 검토 필수')}</div><div class="kv">2026 Q2</div><div class="kd neu">분기별 점검</div></div>
  <div class="card"><div class="ct">로그 보관 기간 ${window.tip('로그 보관 기간','입찰 제출·정산 로그의 법적 보관 기간','전기사업법 시행령 — 5년 의무 보관','SHA-256 해시 체인으로 무결성 보장 — 분쟁 시 KPX·금감원 제출 가능')}</div><div class="kv">5<span class="ku">년</span></div><div class="kd neu">SHA-256 무결성</div></div>
</div>
<div class="card mb"><div class="sh"><div class="st">Fail-Safe 정책 상태</div></div>
  <div class="mr"><div class="ml">10:00 1차 예측 실패 → 전일 동시간 평균치 자동 사용</div><div class="mv"><span class="badge ok">활성</span></div></div>
  <div class="mr"><div class="ml">10:30 최종 검토 실패 → 알림 및 수동 개입 전환</div><div class="mv"><span class="badge ok">활성</span></div></div>
  <div class="mr"><div class="ml">11:00 제출 실패 → 즉시 SMS/Slack 알림 · 재시도 3회</div><div class="mv"><span class="badge ok">활성</span></div></div>
  <div class="mr"><div class="ml">입찰 로그 SHA-256 해시 · KPX 감사 대응</div><div class="mv"><span class="badge ok">무결성 검증</span></div></div>
  <div class="mr" style="border:none"><div class="ml">T-75분 마감 시간 · KPX 제도 개정 모니터링 주기</div><div class="mv mono">분기별 자동 점검</div></div>
</div>
<div class="card"><div class="sh"><div class="st">최근 입찰 로그 (감사 추적)</div>${window.csvBtn('log-tbody','bid_audit_log','최근 입찰 로그 (감사 추적)')}</div>
<table class="tbl"><thead><tr><th>일자</th><th>차수</th><th>단계</th><th>결과</th><th>Fail-Safe</th><th>SHA-256 (앞 12자리)</th><th>조치</th></tr></thead><tbody id="log-tbody">
  <tr data-round="1"><td class="mono">2026-04-22</td><td><span class="badge inf">1차</span></td><td>11:00 제출</td><td><span class="badge ok">성공</span></td><td class="mono">-</td><td class="mono" style="font-size:12px">a3f91c82b04d</td><td>-</td></tr>
  <tr data-round="1"><td class="mono">2026-04-22</td><td><span class="badge inf">1차</span></td><td>10:00 검토</td><td><span class="badge ok">성공</span></td><td class="mono">-</td><td class="mono" style="font-size:12px">7b2e5f019a3c</td><td>-</td></tr>
  <tr data-round="1"><td class="mono">2026-04-22</td><td><span class="badge inf">1차</span></td><td>09:00 예측</td><td><span class="badge ok">성공</span></td><td class="mono">-</td><td class="mono" style="font-size:12px">c1d48a67f2b0</td><td>-</td></tr>
  <tr data-round="2"><td class="mono">2026-04-22</td><td><span class="badge" style="background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow)">2차</span></td><td>15:00 제출</td><td><span class="badge ok">성공</span></td><td class="mono">-</td><td class="mono" style="font-size:12px">e4d27b915af2</td><td>-</td></tr>
  <tr data-round="2"><td class="mono">2026-04-22</td><td><span class="badge" style="background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow)">2차</span></td><td>14:30 검토</td><td><span class="badge ok">성공</span></td><td class="mono">-</td><td class="mono" style="font-size:12px">b812fa40c9e6</td><td>-</td></tr>
  <tr data-round="2"><td class="mono">2026-04-22</td><td><span class="badge" style="background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow)">2차</span></td><td>14:00 예측</td><td><span class="badge ok">성공</span></td><td class="mono">-</td><td class="mono" style="font-size:12px">d25a091fb478</td><td>-</td></tr>
  <tr data-round="1"><td class="mono">2026-04-18</td><td><span class="badge inf">1차</span></td><td>09:00 예측</td><td><span class="badge warn">실패</span></td><td class="mono" style="color:var(--semantic-brand-primary)">전일평균 대체</td><td class="mono" style="font-size:12px">f9e210c34a7d</td><td>자동복구</td></tr>
  <tr data-round="1"><td class="mono">2026-04-18</td><td><span class="badge inf">1차</span></td><td>11:00 제출</td><td><span class="badge ok">성공</span></td><td class="mono">-</td><td class="mono" style="font-size:12px">83b6c0d1ef45</td><td>-</td></tr>
</tbody></table></div>`;
window['I_bidDA-log']=function(){};
window.logFilter=function(r,el){
  document.querySelectorAll('#pages .rd-tab').forEach(e=>e.classList.remove('active'));
  el.classList.add('active');
  const rows=document.querySelectorAll('#log-tbody tr');
  let shown=0;
  rows.forEach(tr=>{
    const show=(r==='all'||tr.dataset.round===r);
    tr.style.display=show?'':'none';
    if(show)shown++;
  });
  const info=document.getElementById('log-filter-info');
  if(info){
    const label=r==='all'?'전체 기록':(r+'차 기록');
    info.textContent=`${label} · ${shown}건`;
  }
};

