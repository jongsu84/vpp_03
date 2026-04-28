// AUTO-GENERATED FROM index.html — page module: bidRT-main
window.P = window.P || {};

/* ===== 실시간 마감 정책 (KPX 고시: T-75분 / 15분 슬롯) ===== */
window._rtNextDeadline = function(){
  const now = Date.now();
  let cand = new Date(now + 75*60*1000);
  cand.setSeconds(0, 0);
  const m = cand.getMinutes();
  if(m % 15 !== 0) cand.setMinutes(Math.ceil(m/15)*15);
  let dl = new Date(cand.getTime() - 75*60*1000);
  if(dl.getTime() <= now){
    cand.setMinutes(cand.getMinutes() + 15);
    dl = new Date(cand.getTime() - 75*60*1000);
  }
  return {slotStart: cand, deadline: dl};
};
window._rtMsUntilDeadline = function(){
  return window._rtNextDeadline().deadline.getTime() - Date.now();
};

/* ===== Imbalance 실시간 시뮬레이션 (자동 갱신 트리거 표현) ===== */
window._rtImbCurrent = 1.8;
window._rtImbAlertedAt = 0;
window._rtImbTimerId = null;
window.startRtImbalanceSim = function(){
  if(window._rtImbTimerId){ clearInterval(window._rtImbTimerId); window._rtImbTimerId=null; }
  const tick = ()=>{
    const mode = window._rtMode || 'auto';
    if(mode === 'off') return;
    const kv = document.getElementById('rt-kpi-imb');
    if(!kv){
      if(window._rtImbTimerId){ clearInterval(window._rtImbTimerId); window._rtImbTimerId=null; }
      return;
    }
    const noise = (Math.random()-0.5)*0.8;
    const spike = Math.random()<0.08 ? (Math.random()*4+2) : 0;
    window._rtImbCurrent = Math.max(0.5, Math.min(12, window._rtImbCurrent + noise + spike));
    const t = window._rtSettings?.threshold || 5;
    kv.innerHTML = window._rtImbCurrent.toFixed(1)+'<span class="ku">%</span>';
    kv.style.color = window._rtImbCurrent>t
      ? 'var(--semantic-negative-normal)'
      : (window._rtImbCurrent>3 ? 'var(--palette-yellow-40)' : 'var(--semantic-positive-normal)');
    const sub = document.getElementById('rt-kpi-imb-sub');
    if(sub){
      sub.textContent = (window._rtImbCurrent<=t ? '허용 범위 내' : '⚠ 임계 초과 — 갱신 필요')+' (임계 '+t+'%)';
      sub.style.color = window._rtImbCurrent>t ? 'var(--semantic-negative-normal)' : '';
    }
    if(window._rtImbCurrent>t && Date.now()-window._rtImbAlertedAt>30000){
      window._rtImbAlertedAt = Date.now();
      const head = 'Imbalance '+window._rtImbCurrent.toFixed(1)+'% — 임계('+t+'%) 초과';
      if(mode==='auto') toast(head+' · 자동 갱신 트리거','warn');
      else if(mode==='manual') toast(head+' · [현재 슬롯 제출] 권장','warn');
    }
  };
  tick();
  window._rtImbTimerId = setInterval(tick, 5000);
};

/* ===== T-75 카운트다운 ===== */
window._rtCountdownTimerId = null;
window.startRtCountdown = function(){
  if(window._rtCountdownTimerId){ clearInterval(window._rtCountdownTimerId); window._rtCountdownTimerId=null; }
  const fmt = (ms)=>{
    if(ms <= 0) return '마감';
    const s = Math.floor(ms/1000);
    const h = String(Math.floor(s/3600)).padStart(2,'0');
    const m = String(Math.floor((s%3600)/60)).padStart(2,'0');
    const sec = String(s%60).padStart(2,'0');
    return `${h}:${m}:${sec}`;
  };
  const tick = ()=>{
    const cnt = document.getElementById('rt-kpi-deadline-cnt');
    if(!cnt){
      if(window._rtCountdownTimerId){ clearInterval(window._rtCountdownTimerId); window._rtCountdownTimerId=null; }
      return;
    }
    const mode = window._rtMode || 'auto';
    if(mode === 'off'){
      cnt.textContent = '중단';
      cnt.style.color = 'var(--semantic-negative-normal)';
      const sub = document.getElementById('rt-kpi-deadline-sub');
      if(sub) sub.textContent = '실시간 입찰 OFF';
      return;
    }
    const {slotStart, deadline} = window._rtNextDeadline();
    const ms = deadline.getTime() - Date.now();
    cnt.textContent = fmt(ms);
    cnt.style.color = ms <= 0 ? 'var(--semantic-label-alt)'
                    : ms < 5*60*1000 ? 'var(--semantic-negative-normal)' : '';
    const sub = document.getElementById('rt-kpi-deadline-sub');
    if(sub){
      const slotStr = slotStart.toTimeString().slice(0,5);
      const alertMin = (window._rtSettings && window._rtSettings.alert) || '10';
      sub.textContent = '슬롯 ' + slotStr + ' · ' + alertMin + '분 전 알림';
    }
  };
  tick();
  window._rtCountdownTimerId = setInterval(tick, 1000);
};

/* ===== 실시간입찰: 입찰 운영 (T-75분) ===== */
window.P['bidRT-main']=()=>`
${_mkCross('bidRT-main')}
${_mkBidFilter({prefix:'brm',onChange:'bidRtMainApply',rightInfo:'<span style="display:inline-flex;align-items:center;gap:6px">마지막 업데이트 <span id="rt-refresh-time" class="mono">14:25:08</span><button onclick="refreshRtHistory()" title="실시간 이력 새로고침" style="width:26px;height:26px;min-width:26px;padding:0;border-radius:50%;border:1px solid var(--semantic-line-normal);background:var(--semantic-background-1);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-size:14px;color:var(--semantic-label-normal);flex-shrink:0">↻</button></span>'})}

<!-- 페이지 탭 -->
<div style="display:flex;gap:24px;margin-bottom:16px;border-bottom:1px solid var(--semantic-line-normal)">
  <div class="pg-tab active" onclick="pgRtTab(this,'today')">실시간 현황</div>
  <div class="pg-tab" onclick="pgRtTab(this,'forecast')">단기 예측 현황</div>
  <div class="pg-tab" onclick="pgRtTab(this,'history')">실시간 내역</div>
</div>

<!-- ========== VIEW 1: 실시간 현황 ========== -->
<div id="pg-rt-view-today">
  <!-- 액션 버튼 바 (실시간 현황 전용) -->
  <div style="display:flex;gap:8px;margin-bottom:16px;justify-content:flex-end;flex-wrap:wrap;align-items:center">
    <span id="rt-mode-badge" class="badge ok" style="margin-right:auto;font-size:11px">자동 갱신 모드</span>
    <button class="cb n sm" onclick="openModal('modal-rt-settings')">실시간 설정</button>
    <button class="cb n sm" onclick="openModal('modal-model-settings-rt')">예측모델 설정</button>
    <button class="cb p sm" onclick="openRtRefresh()">즉시 갱신</button>
  </div>
  <div class="g4">
    <div class="card acc"><div class="ct">다음 마감 ${window.tip('실시간 입찰 다음 마감','T-75 (실시간 75분 전) 입찰 제출 마감까지 남은 시간','15분 단위 96회/일 입찰 — 매시 00·15·30·45분 마감','자동 제출 기본 — 마감 5분 전 수동 개입 가능')}</div><div class="kv"><span id="rt-kpi-deadline-cnt" class="mono">--:--:--</span></div><div class="kd neu" id="rt-kpi-deadline-sub">슬롯 -- · 10분 전 알림</div></div>
    <div class="card"><div class="ct">현재 입찰 상태 ${window.tip('현재 입찰 상태','금회 차수의 입찰 진행 상태','진행중: 예측 갱신 중 / 제출완료: KPX 전송 완료 / 낙찰: 결과 확정','오류 발생 시 직전 차수 입찰값 재사용 (fallback)')}</div><div class="kv" id="rt-kpi-state" style="color:var(--semantic-brand-primary)">진행중</div><div class="kd neu" id="rt-kpi-state-sub">초단기 예보 반영</div></div>
    <div class="card"><div class="ct">DA 대비 갱신폭 ${window.tip('DA 대비 갱신폭','전일 하루전(DA) 입찰량 대비 실시간 갱신량의 차이','RT 입찰량 - DA 입찰량 [MW]','±5MW 이내 정상 / ±10MW 초과 시 IMBP 위험 — 사유 점검 필요')}</div><div class="kv">+2.1<span class="ku">MW</span></div><div class="kd up">실측 상향 반영</div></div>
    <div class="card"><div class="ct">현재 Imbalance ${window.tip('현재 Imbalance','입찰량 대비 실측 발전량의 절대 편차율','|실측 - 입찰| ÷ 입찰 × 100 [%]','5% 이하 정상 / 5~10% 주의 / 10% 초과 IMBP 페널티 발생 (kWh당 SMP의 1.2배)')}</div><div class="kv" id="rt-kpi-imb" style="color:var(--palette-yellow-40)">1.8<span class="ku">%</span></div><div class="kd neu" id="rt-kpi-imb-sub">허용 범위 내 (임계 5%)</div></div>
  </div>
  <div class="card mb" id="rt-tl-card"><div class="sh"><div class="st">RT 갱신 로직</div><div style="display:flex;gap:6px;align-items:center"><span class="kpi-pill" id="rt-tl-cycle">15분 갱신</span><span class="kpi-pill">T-75분 마감</span></div></div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:12px;padding:6px 2px;line-height:24px">
      <span class="mono" style="color:var(--semantic-positive-normal)">✓ T-90 실측 수집</span>
      <span style="color:var(--semantic-label-alt)">→</span>
      <span class="mono" style="color:var(--semantic-positive-normal)">✓ T-85 <span id="rt-tl-source">[hybrid]</span> 예보 결합</span>
      <span style="color:var(--semantic-label-alt)">→</span>
      <span class="mono" style="color:var(--palette-yellow-40)">⏵ T-80 Imbalance 검증</span>
      <span class="badge warn" style="font-size:10px">진행중</span>
      <span style="color:var(--semantic-label-alt)">→</span>
      <span class="mono" style="color:var(--semantic-label-alt)">⏸ T-75 <span id="tl-rt-desc">KPX 실시간 시장 제출</span></span>
      <span class="badge off" id="tl-rt-badge" style="font-size:10px">18분 후</span>
    </div>
  </div>

  <div id="manual-submit-warning-rt" class="card mb" style="display:none;background:var(--semantic-tag-bg-yellow);border-left:3px solid var(--palette-yellow-40);padding:10px 14px;font-size:12px;line-height:18px;color:var(--semantic-label-strong)">
    ⚠ <b>수동 모드 안내</b> — [수정 → 저장]만으로는 KPX 제출이 완료되지 않습니다. 반드시 우측 상단의 <b>[현재 슬롯 제출]</b> 버튼을 클릭해야 RT 입찰이 KPX로 전송됩니다.
  </div>
  <div id="off-mode-warning-rt" class="card mb" style="display:none;background:var(--semantic-tag-bg-red, rgba(255,36,55,0.08));border-left:3px solid var(--semantic-negative-normal);padding:10px 14px;font-size:12px;line-height:18px;color:var(--semantic-label-strong)">
    ⛔ <b>실시간 입찰 OFF 상태</b> — 갱신·제출이 모두 중단되며, DA 확정 입찰값으로만 운영됩니다. <b style="color:var(--semantic-negative-normal)">Imbalance 임계 초과 시 IMBP 페널티</b>가 부과될 수 있습니다.
  </div>
  <!-- 금회 슬롯 자원별 입찰 도표 -->
  <div class="card mb" id="rt-bid-card">
    <div class="sh">
      <div class="st">금회 슬롯 자원별 입찰 <span style="font-size:12px;color:var(--semantic-label-alt);font-weight:400;margin-left:8px">15:15 슬롯 · T-75 제출</span></div>
      <div style="display:flex;gap:10px;align-items:center">
        <span style="font-size:12px;color:var(--semantic-label-alt)" id="rt-tbl-meta">자동 갱신 · 14:25:08 · DA 대비 +2.1 MW</span>
        <button class="cb n sm" id="btn-rt-cancel" onclick="rtCancelEdit()" style="display:none">취소</button>
        <button class="cb n sm" id="btn-rt-edit" onclick="rtToggleEdit()">수정</button>
        <button class="cb p sm" id="btn-submit-rt" onclick="submitRtBid()" style="display:none">현재 슬롯 제출</button>
      </div>
    </div>
    <div style="font-size:11px;color:var(--semantic-label-alt);padding:0 0 8px 2px;line-height:18px">
      ※ <b>입찰가</b>는 D-1 확정값을 그대로 사용합니다. 실시간 갱신은 <b>입찰량(MW)만</b> 변경됩니다.
    </div>
    <div style="overflow-x:auto">
    <table class="tbl">
      <thead><tr>
        <th>순번</th><th>자원명</th><th>발전원</th><th>지역</th>
        <th>설비용량</th>
        <th style="color:var(--semantic-label-alt)">DA 입찰량</th>
        <th style="color:var(--semantic-brand-primary)">RT 갱신량</th>
        <th>편차(Δ)</th>
        <th>갱신 사유</th>
        <th>상태</th>
      </tr></thead>
      <tbody>
      ${[
        ['광양항태양광 01단계','태양광','전남',2.29,2.18,2.45,'실측 상향'],
        ['광양항태양광 04단계','태양광','전남',2.20,2.09,2.30,'실측 상향'],
        ['해맞이 태양광','태양광','전남',1.00,0.95,1.05,'실측 상향'],
        ['온누리 태양광','태양광','전남',1.00,0.94,1.02,'실측 상향'],
        ['금능1호 태양광','태양광','제주',0.98,0.88,0.78,'운량 증가'],
        ['김주풍력 01단계','풍력','경북',4.00,3.80,4.20,'풍속 강화'],
        ['김주풍력 02단계','풍력','경북',10.00,9.50,10.50,'풍속 강화'],
        ['금능1호 ESS','ESS','제주',2.00,1.80,1.90,'SOC 활용'],
        ['제주 ESS허브','ESS','제주',5.00,4.70,4.60,'정기 갱신'],
        ['순천 바이오가스','바이오','전남',1.50,1.42,1.42,'변동 없음'],
        ['여수 바이오매스','바이오','전남',3.00,2.85,2.85,'변동 없음'],
        ['광주 V2G 스테이션','V2G','전남',0.80,0.72,0.72,'변동 없음'],
        ['전남 V2G 허브','V2G','전남',1.50,1.35,1.35,'변동 없음'],
      ].map((r,i)=>{
        const delta=(r[5]-r[4]).toFixed(2);
        const dNum=parseFloat(delta);
        const dColor=dNum>0?'var(--semantic-positive-normal)':(dNum<0?'var(--semantic-negative-normal)':'var(--semantic-label-alt)');
        const dSign=dNum>0?'+':'';
        return `<tr class="rt-res-row" data-resource="${r[0]}"><td class="mono">${i+1}</td><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td class="mono">${r[3].toFixed(2)} MW</td><td class="mono" style="color:var(--semantic-label-alt)">${r[4].toFixed(2)} MW</td><td class="mono rt-bid-qty" style="color:var(--semantic-brand-primary)">${r[5].toFixed(2)} MW</td><td class="mono" style="color:${dColor}">${dSign}${delta} MW</td><td>${r[6]}</td><td class="rt-status-cell"><span class="badge ok">제출완료</span></td></tr>`;
      }).join('')}
      </tbody>
    </table>
    </div>
  </div>
</div>

<!-- ========== VIEW 2: 단기 예측 현황 ========== -->
<div id="pg-rt-view-forecast" style="display:none">
  <div class="g4">
    <div class="card acc"><div class="ct">앙상블 신뢰도</div><div class="kv" style="color:var(--semantic-positive-normal)">96.4<span class="ku">%</span></div><div class="kd up">hybrid-ensemble 기본</div></div>
    <div class="card"><div class="ct">+15분 horizon NMAE</div><div class="kv">4.2<span class="ku">%</span></div><div class="kd up">최근 24시간</div></div>
    <div class="card"><div class="ct">+30분 horizon NMAE</div><div class="kv">5.8<span class="ku">%</span></div><div class="kd neu">최근 24시간</div></div>
    <div class="card"><div class="ct">+60분 horizon NMAE</div><div class="kv" style="color:var(--palette-yellow-40)">8.1<span class="ku">%</span></div><div class="kd neu">정확도 하락 영역</div></div>
  </div>
  <div class="card mb"><div class="sh"><div class="st">초단기 예보 모델 상태</div><span class="kpi-pill" style="font-size:11px">2분 이내 수신</span></div>
    <table class="tbl"><thead><tr><th>모델</th><th>종류</th><th>응답시간</th><th>최종 수신</th><th>신뢰도</th><th>NMAE (최근 24h)</th><th>상태</th></tr></thead><tbody>
      <tr><td class="mono">hybrid-ensemble</td><td>앙상블 (기본)</td><td class="mono">2.1s</td><td class="mono">2분 전</td><td class="mono" style="color:var(--semantic-positive-normal)">96.4%</td><td class="mono">5.3%</td><td><span class="badge ok">정상</span></td></tr>
      <tr><td class="mono">nowcast-v2</td><td>자체 초단기</td><td class="mono">1.2s</td><td class="mono">2분 전</td><td class="mono">96.2%</td><td class="mono">5.8%</td><td><span class="badge ok">정상</span></td></tr>
      <tr><td class="mono">kma-ultrashort</td><td>기상청 초단기</td><td class="mono">0.8s</td><td class="mono">1분 전</td><td class="mono">94.8%</td><td class="mono">6.9%</td><td><span class="badge ok">정상</span></td></tr>
    </tbody></table>
  </div>
  <div class="card mb"><div class="sh"><div class="st">자원별 단기 예측값 (15/30/60분 horizon)</div><button class="cb n sm" onclick="toast('자원별 예측값을 재생성합니다.')">재생성</button></div>
  <div style="overflow-x:auto">
  <table class="tbl"><thead><tr><th>자원명</th><th>발전원</th><th>현재 출력</th><th>+15분 예측</th><th>+30분 예측</th><th>+60분 예측</th><th>사용 모델</th><th>신뢰도</th></tr></thead><tbody id="brm-fcst-tbody">
    ${[
      ['광양항태양광 01단계','태양광',2.18,2.22,2.16,1.95,'hybrid-ensemble',96.8],
      ['광양항태양광 04단계','태양광',2.09,2.14,2.08,1.88,'hybrid-ensemble',96.2],
      ['해맞이 태양광','태양광',0.95,0.96,0.93,0.82,'nowcast-v2',95.1],
      ['온누리 태양광','태양광',0.94,0.95,0.91,0.80,'nowcast-v2',94.8],
      ['금능1호 태양광','태양광',0.88,0.85,0.82,0.72,'nowcast-v2',91.4],
      ['김주풍력 01단계','풍력',3.80,3.95,4.10,4.25,'kma-ultrashort',93.6],
    ].map(r=>`<tr data-type="${r[1]}"><td>${r[0]}</td><td>${r[1]}</td><td class="mono">${r[2]} MW</td><td class="mono" style="color:var(--semantic-brand-primary)">${r[3]} MW</td><td class="mono">${r[4]} MW</td><td class="mono" style="color:var(--semantic-label-alt)">${r[5]} MW</td><td class="mono" style="font-size:12px">${r[6]}</td><td class="mono" style="color:${r[7]>=95?'var(--semantic-positive-normal)':(r[7]>=92?'var(--palette-yellow-40)':'var(--semantic-negative-normal)')}">${r[7]}%</td></tr>`).join('')}
  </tbody></table>
  </div>
  </div>
  <div class="g2">
    <div class="card mb"><div class="sh"><div class="st">모델 신뢰도 추이 (최근 24시간)</div></div><div style="height:200px;position:relative"><canvas id="c-rt-model-trust" role="img" aria-label="모델 신뢰도"></canvas></div></div>
    <div class="card mb"><div class="sh"><div class="st">RT Fail-Safe 이력</div><span class="sa" onclick="activate('bidDA-log')">전체 이력 ↗</span></div>
      <div class="al"><div class="ad" style="background:var(--palette-yellow-40)"></div><div class="am"><b>13:15</b> kma-ultrashort 응답 지연(3.2s) → hybrid-ensemble 단독 사용</div><div class="at">자동 전환</div></div>
      <div class="al"><div class="ad" style="background:var(--semantic-positive-normal)"></div><div class="am"><b>09:42</b> 예보 결측 1건 → 직전 실측값 linear 보간 처리</div><div class="at">자동 복구</div></div>
      <div class="al"><div class="ad" style="background:var(--semantic-line-strong)"></div><div class="am">금일 RT Fail-Safe 발동 총 2회 · 모두 자동 복구</div><div class="at">누적 통계</div></div>
    </div>
  </div>
</div>

<!-- ========== VIEW 3: 실시간 내역 ========== -->
<div id="pg-rt-view-history" style="display:none">
  <div class="g4">
    <div class="card acc"><div class="ct">금일 T-75 제출</div><div class="kv">62<span class="ku">/96회</span></div><div class="kd up">계획 대비 100%</div></div>
    <div class="card"><div class="ct">평균 Imbalance</div><div class="kv" style="color:var(--semantic-positive-normal)">2.1<span class="ku">%</span></div><div class="kd up">임계 5% 내</div></div>
    <div class="card"><div class="ct">재입찰률</div><div class="kv">18<span class="ku">%</span></div><div class="kd neu">11/62회 임계 초과 갱신</div></div>
    <div class="card"><div class="ct">누적 RTES</div><div class="kv" style="color:var(--semantic-brand-primary)">+4.2<span class="ku">백만원</span></div><div class="kd up">금일 실시간 편차정산</div></div>
  </div>
  <div class="card mb"><div class="sh"><div class="st">금일 Imbalance 시계열 (15분 단위 × 96구간)</div><span class="kpi-pill warn" style="font-size:11px">임계 5% 초과 6건</span></div>
    <div style="height:200px;position:relative"><canvas id="c-rt-imb-series" role="img" aria-label="Imbalance 시계열"></canvas></div>
  </div>
  <div class="card"><div class="sh"><div class="st">금일 T-75 제출 이력</div><div style="display:flex;gap:8px;align-items:center"><span class="sa" onclick="activate('bidRT-dual')">편차 관리 ↗</span>${window.csvBtn('rt-t75-tbody','rt_t75_history','금일 T-75 제출 이력')}</div></div>
  <div style="overflow-x:auto">
  <table class="tbl"><thead><tr><th>제출시각</th><th>입찰량(MW)</th><th>DA 대비</th><th>갱신 사유</th><th>Imbalance</th><th>사용 모델</th><th>상태</th></tr></thead><tbody id="rt-t75-tbody">
    ${[
      ['15:15',141.2,'+2.1','실측 상향 · 일사량 증가','1.8%','hybrid-ensemble','제출'],
      ['15:00',140.8,'+1.7','정기 갱신','2.1%','hybrid-ensemble','제출완료'],
      ['14:45',138.5,'-0.6','정기 갱신','1.2%','hybrid-ensemble','제출완료'],
      ['14:30',142.1,'+3.0','실측 급변 · 재입찰','5.8%','hybrid-ensemble','제출완료 · 임계↑'],
      ['14:15',139.4,'+0.3','정기 갱신','3.2%','hybrid-ensemble','제출완료'],
      ['14:00',139.1,'0.0','정기 갱신 (변동 없음)','1.5%','nowcast-v2','제출완료'],
      ['13:45',139.8,'+0.7','정기 갱신','2.4%','nowcast-v2','제출완료'],
      ['13:30',138.2,'-0.9','운량 증가 반영','0.9%','hybrid-ensemble','제출완료'],
      ['13:15',143.7,'+4.6','실측 급증 · 재입찰','6.1%','hybrid-ensemble','제출완료 · 임계↑'],
      ['13:00',140.5,'+1.4','정기 갱신','2.8%','hybrid-ensemble','제출완료'],
    ].map(r=>{
      const over=r[6].includes('임계');
      const cur=r[0]==='15:15';
      return `<tr${cur?' style="background:var(--semantic-brand-primary-assistive)"':''}><td class="mono">${r[0]}${cur?' <span class="badge inf" style="margin-left:4px">진행중</span>':''}</td><td class="mono">${r[1]}</td><td class="mono" style="color:${parseFloat(r[2])>0?'var(--semantic-positive-normal)':(parseFloat(r[2])<0?'var(--semantic-negative-normal)':'var(--semantic-label-alt)')}">${r[2]>0?'+':''}${r[2]} MW</td><td>${r[3]}</td><td class="mono" style="color:${parseFloat(r[4])>5?'var(--semantic-negative-normal)':(parseFloat(r[4])>3?'var(--palette-yellow-40)':'var(--semantic-positive-normal)')}">${r[4]}</td><td class="mono" style="font-size:12px">${r[5]}</td><td><span class="badge ${cur?'inf':(over?'warn':'ok')}">${r[6]}</span></td></tr>`;
    }).join('')}
  </tbody></table>
  </div>
  <div style="font-size:11px;color:var(--semantic-label-alt);margin-top:10px;line-height:18px">※ "재입찰"은 Imbalance 임계값(5%) 초과 시 자동 갱신된 경우입니다. 편차 결과·IMBP 정산은 <span onclick="activate('bidRT-dual')" style="color:var(--semantic-brand-primary);cursor:pointer">편차 관리</span>에서 확인하세요.</div>
  </div>
</div>

<!-- ============ 모달 ① 실시간 설정 ============ -->
<div class="modal-backdrop" id="modal-rt-settings" style="display:none" onclick="closeModalBg(event,'modal-rt-settings')">
  <div class="modal" style="max-height:min(78vh,720px);display:flex;flex-direction:column;overflow:hidden">
    <div class="modal-hdr" style="flex-shrink:0">
      <span class="modal-title">실시간 입찰 설정</span>
      <button class="modal-close" onclick="closeModal('modal-rt-settings')">✕</button>
    </div>
    <div class="modal-body" style="overflow-y:auto;flex:1 1 auto;min-height:0">
      <div style="padding:10px 12px;background:var(--semantic-tag-bg-yellow);border-radius:6px;margin-bottom:14px;font-size:12px;line-height:18px;color:var(--semantic-label-normal);border-left:3px solid var(--palette-yellow-40)">
        ⚡ <b>실시간 시장 구조</b> &nbsp; <span class="mono">15분 × 96구간/일</span> &nbsp;
        <span style="color:var(--semantic-label-alt)">(DA 1시간 평균을 4분할하여 정밀 갱신 · T-75분 마감)</span><br>
        <span style="font-size:11px;color:var(--semantic-label-alt)">※ 갱신 주기를 30분/60분으로 늘리면 구간 수가 비례해 줄어들며 (48/24구간), 정밀도는 낮아지지만 운영 부담은 감소합니다.</span>
      </div>
      <div class="form-section">실시간 모드</div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:12px">
        <label style="display:flex;align-items:center;gap:10px;cursor:pointer"><input type="radio" name="rt-mode" value="auto" checked> 자동 갱신 모드 (기본)</label>
        <label style="display:flex;align-items:center;gap:10px;cursor:pointer"><input type="radio" name="rt-mode" value="manual"> 수동 모드 (운영자 직접 실행)</label>
        <label style="display:flex;align-items:center;gap:10px;cursor:pointer"><input type="radio" name="rt-mode" value="off"> OFF (실시간 입찰 중단)</label>
      </div>
      <hr class="form-divider">
      <div class="form-section">갱신 주기 · 임계값</div>
      <div class="form-row">
        <div class="form-item"><label>갱신 주기</label>
          <select class="sel" id="rt-cycle"><option value="15" selected>15분 단위 × 96구간/일 (권장)</option><option value="30">30분 단위 × 48구간/일</option><option value="60">60분 단위 × 24구간/일 (DA 동기)</option></select>
        </div>
        <div class="form-item"><label>T-75 사전 알림</label>
          <select class="sel" id="rt-alert"><option value="5">5분 전</option><option value="10" selected>10분 전</option><option value="15">15분 전</option></select>
        </div>
      </div>
      <div class="form-row full">
        <div class="form-item">
          <label>자동 재입찰 임계값 — Imbalance <b id="rt-thr-v" style="color:var(--semantic-brand-primary)">5</b>% 초과 시 자동 갱신</label>
          <input type="range" id="rt-thr-input" min="0" max="15" step="0.5" value="5" oninput="document.getElementById('rt-thr-v').textContent=this.value" style="width:100%">
          <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--semantic-label-alt);margin-top:2px">
            <span>0% (Aggressive)</span><span>5% (Balanced)</span><span>15% (Conservative)</span>
          </div>
        </div>
      </div>
      <hr class="form-divider">
      <div class="form-section">초단기 예보 소스</div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:12px">
        <label style="display:flex;align-items:center;gap:10px;cursor:pointer"><input type="radio" name="rt-src" value="kma"> KMA 초단기실황 (기상청)</label>
        <label style="display:flex;align-items:center;gap:10px;cursor:pointer"><input type="radio" name="rt-src" value="nwp"> 자체 nwp-e</label>
        <label style="display:flex;align-items:center;gap:10px;cursor:pointer"><input type="radio" name="rt-src" value="hybrid" checked> 하이브리드 (KMA + nwp-e 앙상블 · 권장)</label>
      </div>
      <hr class="form-divider">
      <div class="form-section">참여 자원 선택 <span id="rt-res-count" style="font-size:11px;font-weight:400;color:var(--semantic-label-alt);margin-left:8px">12/13 활성</span></div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-bottom:8px;font-size:11px;color:var(--semantic-label-alt)">
        <span>유형 필터:</span>
        <button class="cb p sm rt-chip" data-filter="all" style="padding:3px 10px;font-size:11px;height:auto" onclick="toggleRtChip('all')">전체</button>
        <span style="color:var(--semantic-line-normal)">|</span>
        <button class="cb p sm rt-chip" data-filter="태양광" style="padding:3px 10px;font-size:11px;height:auto" onclick="toggleRtChip('태양광')">태양광</button>
        <button class="cb p sm rt-chip" data-filter="풍력" style="padding:3px 10px;font-size:11px;height:auto" onclick="toggleRtChip('풍력')">풍력</button>
        <button class="cb p sm rt-chip" data-filter="ESS" style="padding:3px 10px;font-size:11px;height:auto" onclick="toggleRtChip('ESS')">ESS</button>
        <button class="cb p sm rt-chip" data-filter="바이오" style="padding:3px 10px;font-size:11px;height:auto" onclick="toggleRtChip('바이오')">바이오</button>
        <button class="cb p sm rt-chip" data-filter="V2G" style="padding:3px 10px;font-size:11px;height:auto" onclick="toggleRtChip('V2G')">V2G</button>
      </div>
      <div style="max-height:180px;overflow-y:auto;border:1px solid var(--semantic-line-alt);border-radius:6px;padding:8px 12px;margin-bottom:12px">
        ${[
          ['광양항태양광 01단계','태양광',true],
          ['광양항태양광 04단계','태양광',true],
          ['해맞이 태양광','태양광',true],
          ['온누리 태양광','태양광',true],
          ['금능1호 태양광','태양광',false],
          ['김주풍력 01단계','풍력',true],
          ['김주풍력 02단계','풍력',true],
          ['금능1호 ESS','ESS',true],
          ['제주 ESS허브','ESS',true],
          ['순천 바이오가스','바이오',true],
          ['여수 바이오매스','바이오',true],
          ['광주 V2G 스테이션','V2G',true],
          ['전남 V2G 허브','V2G',true],
        ].map(r=>`<div style="display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid var(--semantic-line-alt)">
          <label class="toggle"><input type="checkbox" class="rt-res-toggle" data-resource="${r[0]}" ${r[2]?'checked':''} onchange="updateRtResCount();syncRtChips()"><div class="ts"></div></label>
          <span style="font-size:13px;flex:1">${r[0]}</span>
          <span class="badge ${r[1]==='태양광'?'inf':'ok'}">${r[1]}</span>
        </div>`).join('')}
      </div>
      <hr class="form-divider">
      <div class="form-section">제출 결과 통지</div>
      <div class="form-row">
        <div class="form-item"><label>운영자 이메일</label><input class="inp" id="rt-email" value="president@ewp.co.kr"></div>
        <div class="form-item"><label>문자 알림 번호</label><input class="inp" id="rt-sms" placeholder="010-0000-0000"></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="cb n" onclick="closeModal('modal-rt-settings')">취소</button>
      <button class="cb p" id="btn-apply-rt" onclick="applyRtMode()">적용</button>
    </div>
  </div>
</div>

<!-- ============ 모달 ② 예측모델 설정 (RT 전용 인스턴스) ============ -->
<div class="modal-backdrop" id="modal-model-settings-rt" style="display:none" onclick="closeModalBg(event,'modal-model-settings-rt')">
  <div class="modal">
    <div class="modal-hdr">
      <span class="modal-title">예측모델 설정 (실시간)</span>
      <button class="modal-close" onclick="closeModal('modal-model-settings-rt')">✕</button>
    </div>
    <div class="modal-body">
      <div style="padding:12px 14px;background:var(--semantic-brand-primary-assistive);border-radius:6px;font-size:12px;line-height:18px;color:var(--semantic-label-normal);margin-bottom:16px">
        ℹ 실시간 입찰에서는 초단기(0~6시간) 예보 모델을 사용합니다. 하루전 모델 설정과는 별도입니다.
      </div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px">
        <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer">
          <input type="radio" name="rt-model-mode" value="latest" onchange="toggleRtModelMode()" style="margin-top:4px">
          <div><div style="font-weight:500">최신 실측값 기반</div><div style="font-size:11px;color:var(--semantic-label-alt);margin-top:2px">예측모델 없이 직전 15분 실측 평균값으로 재입찰합니다.</div></div>
        </label>
        <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer">
          <input type="radio" name="rt-model-mode" value="per-gen" onchange="toggleRtModelMode()" checked style="margin-top:4px">
          <div><div style="font-weight:500">발전기별 초단기 예측모델 사용</div><div style="font-size:11px;color:var(--semantic-label-alt);margin-top:2px">각 발전기별로 초단기 모델을 지정합니다.</div></div>
        </label>
      </div>
      <div id="rt-model-per-gen-section">
      <hr class="form-divider">
      <div class="form-row full"><div class="form-item"><label>전체 일괄선택</label><select class="sel"><option>전체 일괄선택</option><option>nowcast-v2 (기본)</option><option>kma-ultrashort</option><option>hybrid-ensemble</option></select></div></div>
      <div class="form-row full"><div class="form-item"><label>발전기 검색</label><input class="inp" placeholder="🔍 발전기명 또는 자원코드"></div></div>
      <div style="max-height:220px;overflow-y:auto;border:1px solid var(--semantic-line-alt);border-radius:6px;padding:10px 14px">
        ${[
          ['광양항태양광 01단계','hybrid-ensemble'],
          ['광양항태양광 04단계','hybrid-ensemble'],
          ['해맞이 태양광','nowcast-v2'],
          ['온누리 태양광','nowcast-v2'],
          ['김주풍력 01단계','kma-ultrashort'],
        ].map((r,i)=>`<div style="padding:10px 0;${i<4?'border-bottom:1px solid var(--semantic-line-alt);':''}">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;align-items:center">
            <span style="font-size:13px;font-weight:500">${r[0]}</span>
            <select class="sel" style="height:30px;font-size:12px"><option>${r[1]}</option><option>nowcast-v2</option><option>kma-ultrashort</option><option>hybrid-ensemble</option></select>
          </div>
        </div>`).join('')}
      </div>
      </div>
      <div id="rt-model-latest-info" style="display:none;padding:12px 14px;background:var(--semantic-brand-primary-assistive);border-radius:6px;font-size:12px;line-height:18px;color:var(--semantic-label-normal)">
        ℹ 발전기별 모델 지정 없이, 직전 15분 실측 평균값(persistence)을 RT 갱신 입찰량으로 사용합니다. 예측 실패·모델 응답 지연 시 fallback 용도로도 활용됩니다.
      </div>
    </div>
    <div class="modal-footer">
      <button class="cb n" onclick="closeModal('modal-model-settings-rt')">취소</button>
      <button class="cb p" onclick="toast('실시간 예측모델을 저장했습니다.');closeModal('modal-model-settings-rt')">저장</button>
    </div>
  </div>
</div>

<!-- ============ 모달 ③ 즉시 갱신 확인 ============ -->
<div class="modal-backdrop" id="modal-rt-refresh" style="display:none" onclick="closeModalBg(event,'modal-rt-refresh')">
  <div class="modal" style="width:440px">
    <div class="modal-hdr">
      <span class="modal-title">즉시 갱신</span>
      <button class="modal-close" onclick="closeModal('modal-rt-refresh')">✕</button>
    </div>
    <div class="modal-body">
      <div style="padding:12px 14px;background:var(--semantic-tag-bg-yellow);border-radius:6px;font-size:13px;line-height:20px;color:var(--semantic-label-strong);margin-bottom:14px">
        ⚠ 갱신 주기(15분)를 기다리지 않고 즉시 초단기 예보를 재수집하여 RT 입찰을 다시 계산·제출합니다.
      </div>
      <div id="rtref-preview" style="background:var(--semantic-background-2);border:1px solid var(--semantic-line-alt);border-radius:6px;padding:10px 14px;margin-bottom:14px;font-size:12px;line-height:22px">
        <div style="display:flex;justify-content:space-between"><span style="color:var(--semantic-label-alt)">대상 슬롯</span><b id="rtref-prev-slot">--</b></div>
        <div style="display:flex;justify-content:space-between"><span style="color:var(--semantic-label-alt)">대상 자원</span><b id="rtref-prev-count">--</b></div>
        <div style="display:flex;justify-content:space-between"><span style="color:var(--semantic-label-alt)">RT 합계</span><b id="rtref-prev-qty">--</b></div>
        <div style="display:flex;justify-content:space-between"><span style="color:var(--semantic-label-alt)">DA 대비</span><b id="rtref-prev-delta">--</b></div>
      </div>
      <div class="form-item">
        <label>실행하시려면 <b style="color:var(--semantic-brand-primary)">[즉시갱신]</b>을 입력해주세요.</label>
        <input class="inp" placeholder="즉시갱신" id="confirm-rtref" oninput="chkRtRef(this.value)">
      </div>
    </div>
    <div class="modal-footer">
      <button class="cb n" onclick="closeModal('modal-rt-refresh')">취소</button>
      <button class="cb p" id="btn-rtref" disabled onclick="execRtRefresh()">즉시 갱신</button>
    </div>
  </div>
</div>`;
window.bidRtMainApply=function(){
  const type=document.getElementById('brm-type')?.value||'all';
  document.querySelectorAll('#brm-fcst-tbody tr').forEach(tr=>{
    const cType=tr.dataset.type;
    tr.style.display=(type==='all'||cType===type)?'':'none';
  });
};
window['I_bidRT-main']=function(){
  if(!window._rtMode) window._rtMode='auto';
  if(!window._rtSettings){
    window._rtSettings={
      cycle:'15',alert:'10',threshold:5,source:'hybrid',email:'',sms:'',
      resources:[
        ['광양항태양광 01단계',true],['광양항태양광 04단계',true],['해맞이 태양광',true],['온누리 태양광',true],
        ['금능1호 태양광',false],['김주풍력 01단계',true],['김주풍력 02단계',true],['금능1호 ESS',true],
        ['제주 ESS허브',true],['순천 바이오가스',true],['여수 바이오매스',true],['광주 V2G 스테이션',true],['전남 V2G 허브',true]
      ].map(r=>({name:r[0],enabled:r[1]}))
    };
  }
  if(typeof window.updateRtModeUI==='function') window.updateRtModeUI();
  if(typeof window.applyRtSettings==='function') window.applyRtSettings();
  if(typeof window.startRtImbalanceSim==='function') window.startRtImbalanceSim();
  if(typeof window.startRtCountdown==='function') window.startRtCountdown();
  if(typeof window.syncRtChips==='function') window.syncRtChips();
  if(typeof window.updateRtResCount==='function') window.updateRtResCount();
};
window.applyRtMode=function(){
  const Q=id=>document.getElementById(id);
  const sel=document.querySelector('input[name="rt-mode"]:checked');
  window._rtMode=sel?sel.value:'auto';
  window._rtSubmitted=false;
  // Read all settings
  const srcSel=document.querySelector('input[name="rt-src"]:checked');
  window._rtSettings={
    cycle: Q('rt-cycle')?.value||'15',
    alert: Q('rt-alert')?.value||'10',
    threshold: parseFloat(Q('rt-thr-input')?.value||'5'),
    source: srcSel?srcSel.value:'hybrid',
    email: Q('rt-email')?.value||'',
    sms: Q('rt-sms')?.value||'',
    resources: Array.from(document.querySelectorAll('.rt-res-toggle')).map(el=>({name:el.dataset.resource,enabled:el.checked}))
  };
  window.updateRtModeUI();
  window.applyRtSettings();
  const enabled=window._rtSettings.resources.filter(r=>r.enabled).length;
  const total=window._rtSettings.resources.length;
  const modeTxt={auto:'자동 갱신',manual:'수동',off:'OFF · 중단'}[window._rtMode];
  toast('실시간 설정 저장 — '+modeTxt+' · 임계 '+window._rtSettings.threshold+'% · '+enabled+'/'+total+'개 자원');
  closeModal('modal-rt-settings');
};
window.applyRtSettings=function(){
  const s=window._rtSettings;
  if(!s) return;
  const Q=id=>document.getElementById(id);
  // Imbalance threshold KPI sub
  const imbSub=Q('rt-kpi-imb-sub');
  if(imbSub){
    const cur=1.8;
    const within=cur<=s.threshold;
    imbSub.textContent=(within?'허용 범위 내':'임계 초과')+' (임계 '+s.threshold+'%)';
  }
  // Deadline alert KPI sub
  const dlSub=Q('rt-kpi-deadline-sub');
  if(dlSub) dlSub.textContent=s.alert+'분 전 알림 · 15:15 제출';
  // Cycle pill
  const cyclePill=Q('rt-tl-cycle');
  if(cyclePill) cyclePill.textContent=s.cycle+'분 갱신';
  // Forecast source label
  const srcEl=Q('rt-tl-source');
  if(srcEl){
    const map={kma:'[KMA]',nwp:'[nwp-e]',hybrid:'[hybrid]'};
    srcEl.textContent=map[s.source]||'[hybrid]';
  }
  // Resource filter on bid table
  const enabledSet=new Set(s.resources.filter(r=>r.enabled).map(r=>r.name));
  document.querySelectorAll('.rt-res-row').forEach(tr=>{
    const name=tr.dataset.resource;
    if(name) tr.style.display=enabledSet.has(name)?'':'none';
  });
};
window.toggleRtChip=function(filter){
  if(filter==='all'){
    const allChip=document.querySelector('.rt-chip[data-filter="all"]');
    const wasActive=!!(allChip && allChip.classList.contains('p'));
    const next=!wasActive;
    document.querySelectorAll('.rt-chip').forEach(c=>{ c.className='cb '+(next?'p':'n')+' sm rt-chip'; });
    document.querySelectorAll('.rt-res-toggle').forEach(t=>{ t.checked=next; });
  } else {
    const chip=document.querySelector('.rt-chip[data-filter="'+filter+'"]');
    if(!chip) return;
    const wasActive=chip.classList.contains('p');
    const next=!wasActive;
    chip.className='cb '+(next?'p':'n')+' sm rt-chip';
    document.querySelectorAll('.rt-res-toggle').forEach(t=>{
      const row=t.closest('div');
      const badge=row?row.querySelector('.badge'):null;
      const type=badge?badge.textContent.trim():'';
      if(type===filter) t.checked=next;
    });
  }
  if(typeof window.syncRtChips==='function') window.syncRtChips();
  if(typeof window.updateRtResCount==='function') window.updateRtResCount();
};
window.syncRtChips=function(){
  const types=['태양광','풍력','ESS','바이오','V2G'];
  types.forEach(type=>{
    let anyOn=false;
    document.querySelectorAll('.rt-res-toggle').forEach(t=>{
      const row=t.closest('div');
      const badge=row?row.querySelector('.badge'):null;
      const tt=badge?badge.textContent.trim():'';
      if(tt===type && t.checked) anyOn=true;
    });
    const chip=document.querySelector('.rt-chip[data-filter="'+type+'"]');
    if(chip) chip.className='cb '+(anyOn?'p':'n')+' sm rt-chip';
  });
  const typeChips=document.querySelectorAll('.rt-chip[data-filter]:not([data-filter="all"])');
  const allActive=Array.from(typeChips).every(c=>c.classList.contains('p'));
  const allChip=document.querySelector('.rt-chip[data-filter="all"]');
  if(allChip) allChip.className='cb '+(allActive?'p':'n')+' sm rt-chip';
};
window.updateRtResCount=function(){
  const total=document.querySelectorAll('.rt-res-toggle').length;
  const checked=document.querySelectorAll('.rt-res-toggle:checked').length;
  const el=document.getElementById('rt-res-count');
  if(el){
    el.textContent=checked+'/'+total+' 활성';
    el.style.color = (checked===0) ? 'var(--semantic-negative-normal)' : '';
  }
  const apply=document.getElementById('btn-apply-rt');
  if(apply){
    const off=(checked===0);
    apply.disabled=off;
    apply.style.opacity=off?'0.4':'';
    apply.style.cursor=off?'not-allowed':'';
    apply.style.pointerEvents=off?'none':'';
    apply.title=off?'참여 자원을 1개 이상 선택해야 적용할 수 있습니다':'';
  }
};
window.updateRtModeUI=function(){
  const mode=window._rtMode||'auto';
  const Q=id=>document.getElementById(id);
  // Mode badge
  const badge=Q('rt-mode-badge');
  if(badge){
    if(mode==='manual'){badge.textContent='수동 모드';badge.className='badge warn';}
    else if(mode==='off'){badge.textContent='OFF · 실시간 중단';badge.className='badge err';}
    else {badge.textContent='자동 갱신 모드';badge.className='badge ok';}
  }
  // Submit button
  const btn=Q('btn-submit-rt');
  if(btn){
    btn.style.display=(mode==='manual')?'':'none';
    btn.disabled=!!window._rtSubmitted;
    btn.textContent=window._rtSubmitted?'제출 완료':'현재 슬롯 제출';
  }
  // KPI: 현재 입찰 상태
  const kv=Q('rt-kpi-state'),ks=Q('rt-kpi-state-sub');
  if(kv && ks){
    if(mode==='manual'){
      kv.textContent=window._rtSubmitted?'제출 완료':'검토 대기';
      kv.style.color=window._rtSubmitted?'var(--semantic-brand-primary)':'var(--palette-yellow-40)';
      ks.textContent=window._rtSubmitted?'KPX 응답 대기':'운영자 제출 필요';
    } else if(mode==='off'){
      kv.textContent='중단'; kv.style.color='var(--semantic-negative-normal)';
      ks.textContent='실시간 입찰 중지됨';
    } else {
      kv.textContent='진행중'; kv.style.color='var(--semantic-brand-primary)';
      ks.textContent='초단기 예보 반영';
    }
  }
  // Timeline T-75 step
  const td=Q('tl-rt-desc'),tb=Q('tl-rt-badge');
  if(td && tb){
    if(mode==='manual'){
      td.textContent='운영자 제출 마감';
      tb.textContent=window._rtSubmitted?'제출 완료':'제출 필요';
      tb.className='badge '+(window._rtSubmitted?'ok':'warn');
    } else if(mode==='off'){
      td.textContent='KPX 제출 중단됨';
      tb.textContent='OFF'; tb.className='badge err';
    } else {
      td.textContent='KPX 실시간 시장 제출';
      tb.textContent='18분 후'; tb.className='badge off';
    }
    tb.style.fontSize='10px';
  }
  // RT bid table meta + status
  const meta=Q('rt-tbl-meta');
  if(meta){
    if(mode==='manual'){
      meta.textContent=window._rtSubmitted?'수동 · 운영자 김운영 · 제출 완료':'수동 · 운영자 검토 대기 · 미제출';
      meta.style.color=window._rtSubmitted?'':'var(--palette-yellow-40)';
    } else if(mode==='off'){
      meta.textContent='실시간 입찰 중단됨';
      meta.style.color='var(--semantic-negative-normal)';
    } else {
      const slot=window._rtNextDeadline?window._rtNextDeadline().slotStart:null;
      const slotStr=slot?slot.toTimeString().slice(0,5):'--';
      meta.textContent='자동 갱신 모드 · 다음 갱신 슬롯: '+slotStr+' · DA 대비 +2.1 MW';
      meta.style.color='';
    }
  }
  document.querySelectorAll('.rt-status-cell').forEach(c=>{
    if(mode==='off') c.innerHTML='<span class="badge err">중단</span>';
    else if(mode==='manual' && !window._rtSubmitted) c.innerHTML='<span class="badge warn">검토 대기</span>';
    else if(mode==='manual' && window._rtSubmitted) c.innerHTML='<span class="badge inf">제출 완료</span>';
    else c.innerHTML='<span class="badge ok">제출완료</span>';
  });
  // OFF: dim timeline card + bid table card
  const tlCard=Q('rt-tl-card');
  if(tlCard) tlCard.style.opacity=(mode==='off')?'0.55':'';
  const bidCard=Q('rt-bid-card');
  if(bidCard) bidCard.style.opacity=(mode==='off')?'0.55':'';
  // 수동/OFF 모드 경고 배너
  const wManual=Q('manual-submit-warning-rt');
  if(wManual) wManual.style.display=(mode==='manual' && !window._rtSubmitted)?'':'none';
  const wOff=Q('off-mode-warning-rt');
  if(wOff) wOff.style.display=(mode==='off')?'':'none';
};
window.submitRtBid=function(){
  // OFF 모드 가드
  if(window._rtMode==='off'){
    toast('실시간 입찰이 OFF 상태이므로 제출할 수 없습니다.','err');
    return;
  }
  // T-75 마감 가드
  const ms=window._rtMsUntilDeadline();
  if(ms<=0){
    toast('현재 슬롯 T-75 마감되어 제출할 수 없습니다.','err');
    return;
  }
  const cells=document.querySelectorAll('.rt-bid-qty');
  let total=0,count=0;
  cells.forEach(c=>{
    const tr=c.closest('tr');
    if(tr && tr.style.display==='none') return;
    const v=parseFloat(c.textContent.replace('MW','').trim());
    if(!isNaN(v)){ total+=v; count++; }
  });
  if(!confirm('현재 RT 슬롯(15:15)을 KPX로 제출하시겠습니까?\n총 '+count+'개 자원 · 합계 '+total.toFixed(2)+' MW')) return;
  window._rtSubmitted=true;
  window.updateRtModeUI();
  toast('RT 슬롯 제출 완료');
};
window.rtToggleEdit=function(){
  const editBtn=document.getElementById('btn-rt-edit');
  const cancelBtn=document.getElementById('btn-rt-cancel');
  const submitBtn=document.getElementById('btn-submit-rt');
  if(!window._rtEditMode){
    // OFF 모드 가드
    if(window._rtMode==='off'){
      toast('실시간 입찰이 OFF 상태입니다. 설정에서 모드를 변경하세요.','warn');
      return;
    }
    // T-75 마감 가드 (Hard Block)
    const ms=window._rtMsUntilDeadline();
    if(ms<=0){
      toast('현재 슬롯 T-75 마감되어 수정할 수 없습니다.','warn');
      return;
    }
    document.querySelectorAll('.rt-bid-qty').forEach(td=>{
      const v=td.textContent.replace('MW','').trim();
      td.dataset.orig=v;
      td.innerHTML='<input type="number" step="0.01" min="0" class="inp" style="width:80px;height:28px;font-size:12px;text-align:right;padding:2px 6px" value="'+v+'">';
    });
    window._rtEditMode=true;
    if(editBtn){editBtn.textContent='저장';editBtn.className='cb p sm';}
    if(cancelBtn) cancelBtn.style.display='';
    if(submitBtn) submitBtn.disabled=true;
    toast('RT 갱신량을 수정하고 저장을 누르세요.');
  } else {
    let changed=0;
    document.querySelectorAll('.rt-bid-qty').forEach(td=>{
      const inp=td.querySelector('input');
      const v=inp?inp.value:td.dataset.orig;
      if(v!==td.dataset.orig) changed++;
      td.innerHTML=v+' MW';
      delete td.dataset.orig;
    });
    window._rtEditMode=false;
    if(editBtn){editBtn.textContent='수정';editBtn.className='cb n sm';}
    if(cancelBtn) cancelBtn.style.display='none';
    if(submitBtn) submitBtn.disabled=false;
    toast(changed>0?changed+'개 항목이 수정되었습니다.':'변경사항이 없습니다.');
  }
};
window.rtCancelEdit=function(){
  document.querySelectorAll('.rt-bid-qty').forEach(td=>{
    if(td.dataset.orig!==undefined){td.innerHTML=td.dataset.orig+' MW';delete td.dataset.orig;}
  });
  window._rtEditMode=false;
  const editBtn=document.getElementById('btn-rt-edit');
  const cancelBtn=document.getElementById('btn-rt-cancel');
  const submitBtn=document.getElementById('btn-submit-rt');
  if(editBtn){editBtn.textContent='수정';editBtn.className='cb n sm';}
  if(cancelBtn) cancelBtn.style.display='none';
  if(submitBtn) submitBtn.disabled=false;
  toast('수정이 취소되었습니다.');
};
window.toggleRtModelMode=function(){
  const sel=document.querySelector('input[name="rt-model-mode"]:checked');
  const v=sel?sel.value:'per-gen';
  const perGen=document.getElementById('rt-model-per-gen-section');
  const latest=document.getElementById('rt-model-latest-info');
  if(perGen) perGen.style.display=(v==='per-gen')?'':'none';
  if(latest) latest.style.display=(v==='latest')?'':'none';
};
window.refreshRtHistory=function(){
  const el=document.getElementById('rt-refresh-time');
  if(el){
    const d=new Date();
    el.textContent=d.toTimeString().slice(0,8);
  }
  toast('실시간 이력을 새로고침했습니다.');
};
window.chkRtRef=function(v){
  const b=document.getElementById('btn-rtref');
  if(b)b.disabled=(v!=='즉시갱신');
};
window.openRtRefresh=function(){
  if(window._rtMode==='off'){
    toast('실시간 입찰이 OFF 상태이므로 즉시 갱신할 수 없습니다.','warn');
    return;
  }
  const ms=window._rtMsUntilDeadline();
  if(ms<=0){
    toast('현재 슬롯 T-75 마감되어 즉시 갱신할 수 없습니다.','warn');
    return;
  }
  // 미리보기 채우기
  let totalRt=0, totalDa=0, count=0;
  document.querySelectorAll('.rt-res-row').forEach(tr=>{
    if(tr.style.display==='none') return;
    const tds=tr.querySelectorAll('td');
    if(tds.length<7) return;
    const da=parseFloat((tds[5].textContent||'').replace('MW','').trim());
    const rt=parseFloat((tds[6].textContent||'').replace('MW','').trim());
    if(!isNaN(da)) totalDa+=da;
    if(!isNaN(rt)){ totalRt+=rt; count++; }
  });
  const delta=totalRt-totalDa;
  const slot=window._rtNextDeadline?window._rtNextDeadline().slotStart.toTimeString().slice(0,5):'--';
  const Q=id=>document.getElementById(id);
  if(Q('rtref-prev-slot')) Q('rtref-prev-slot').textContent = slot + ' 슬롯';
  if(Q('rtref-prev-count')) Q('rtref-prev-count').textContent = count + '개';
  if(Q('rtref-prev-qty')) Q('rtref-prev-qty').textContent = totalRt.toFixed(2) + ' MW';
  if(Q('rtref-prev-delta')){
    const sign = delta>=0 ? '+' : '';
    Q('rtref-prev-delta').textContent = sign + delta.toFixed(2) + ' MW';
    Q('rtref-prev-delta').style.color = delta>0 ? 'var(--semantic-positive-normal)' : (delta<0 ? 'var(--semantic-negative-normal)' : 'var(--semantic-label-alt)');
  }
  openModal('modal-rt-refresh');
};
window.execRtRefresh=function(){
  if(window._rtMode==='off'){
    toast('OFF 상태에서는 즉시 갱신할 수 없습니다.','err');
    return;
  }
  toast('즉시 갱신이 실행되었습니다.');
  closeModal('modal-rt-refresh');
  const inp=document.getElementById('confirm-rtref');
  if(inp) inp.value='';
  const btn=document.getElementById('btn-rtref');
  if(btn) btn.disabled=true;
};
window.pgRtTab=function(el,k){
  ['today','forecast','history'].forEach(v=>{
    const d=document.getElementById('pg-rt-view-'+v);
    if(d)d.style.display=(v===k?'':'none');
  });
  el.parentElement.querySelectorAll('.pg-tab').forEach(e=>e.classList.remove('active'));
  el.classList.add('active');
  if(k==='forecast'){
    setTimeout(()=>{
      const h=Array.from({length:24},(_,i)=>i+'h');
      // Confidence % over 24h for each model
      const he=[95.2,95.8,96.1,96.4,96.2,95.9,96.5,96.8,96.4,96.2,95.8,96.0,96.3,96.5,96.4,96.1,95.9,96.2,96.6,96.4,96.3,95.8,95.4,96.4];
      const nc=[94.8,95.1,95.6,95.9,95.7,95.3,96.0,96.2,96.0,95.7,95.4,95.6,95.8,96.1,96.2,95.8,95.4,95.8,96.0,95.9,95.7,95.3,94.9,96.2];
      const km=[93.2,93.8,94.1,94.4,94.0,93.6,94.5,94.8,94.4,94.1,93.7,93.9,94.2,94.5,94.8,94.2,93.8,94.2,94.6,94.4,94.2,93.6,93.2,94.8];
      mkChart('c-rt-model-trust','line',h,[
        {label:'hybrid-ensemble',data:he,borderColor:'#0059ff',borderWidth:2,pointRadius:0,tension:0.4,fill:false},
        {label:'nowcast-v2',data:nc,borderColor:'#1f98ff',borderWidth:1.5,pointRadius:0,tension:0.4,fill:false},
        {label:'kma-ultrashort',data:km,borderColor:'#ffca42',borderWidth:1.5,pointRadius:0,tension:0.4,fill:false},
      ],{plugins:{legend:{display:true,position:'bottom',labels:{font:{size:11},boxWidth:10,padding:8}}},scales:{y:{min:90,max:100,title:{display:true,text:'%',color:'#666',font:{size:10}}}}});
    },50);
  } else if(k==='history'){
    setTimeout(()=>{
      // 15분 단위 96구간 중 운영시간(06:00~15:00) 37구간 표시
      const labels=[];
      for(let h=6;h<=15;h++){
        for(let m=0;m<60;m+=15){
          if(h===15&&m>0)break;
          labels.push((h<10?'0':'')+h+':'+(m<10?'0':'')+m);
        }
      }
      const imb=[
        1.1,1.3,1.5,1.6,  // 06:00~06:45
        1.8,1.9,2.1,2.3,  // 07:00~07:45
        2.4,2.3,2.2,2.1,  // 08:00~08:45
        2.1,2.0,1.9,1.9,  // 09:00~09:45
        1.9,2.0,2.1,2.2,  // 10:00~10:45
        2.3,2.5,2.7,2.9,  // 11:00~11:45
        3.1,3.6,4.4,5.3,  // 12:00~12:45 (마지막 슬롯 임계 초과)
        6.1,6.3,6.0,5.9,  // 13:00~13:45 (4개 임계 초과)
        5.8,5.0,3.8,2.5,  // 14:00~14:45 (1개 임계 초과)
        1.8              // 15:00
      ];
      mkChart('c-rt-imb-series','line',labels,[
        {label:'Imbalance(%)',data:imb,borderColor:'#0059ff',borderWidth:2,pointRadius:imb.map(v=>v>5?3:1),pointBackgroundColor:imb.map(v=>v>5?'#ff2437':'#0059ff'),tension:0.3,fill:true,backgroundColor:'rgba(0,89,255,0.08)'},
        {label:'임계값 5%',data:Array(labels.length).fill(5),borderColor:'#ff2437',borderWidth:1,pointRadius:0,borderDash:[4,4],fill:false},
      ],{plugins:{legend:{display:true,position:'bottom',labels:{font:{size:11},boxWidth:10,padding:8}}},scales:{y:{title:{display:true,text:'%',color:'#666',font:{size:10}}},x:{ticks:{maxRotation:0,autoSkip:true,maxTicksLimit:10,font:{size:10}}}}});
    },50);
  }
};

