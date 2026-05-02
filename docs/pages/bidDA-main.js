// AUTO-GENERATED FROM index.html — page module: bidDA-main
window.P = window.P || {};
/* ================================================================
   전략입찰 v2 — 상위 하루전(DA) / 실시간(RT) 분리 구조
   정책 출처: [AI-VPP] 기능명세서 v0.3 · '3) 전력시장 입찰 운영 정책'
   ================================================================ */

/* ===== 하루전 입찰 마감 정책 (KPX 고시) ===== */
window._DA_DEADLINES = { 1: '11:00', 2: '15:00' };

window._daMsUntilDeadline = function(round){
  const [hh,mm] = window._DA_DEADLINES[round].split(':').map(Number);
  const now = new Date();
  const dl = new Date(now); dl.setHours(hh, mm, 0, 0);
  return dl.getTime() - now.getTime();
};

window._daFmtCountdown = function(ms){
  if(ms <= 0) return '마감';
  const s = Math.floor(ms/1000);
  const h = String(Math.floor(s/3600)).padStart(2,'0');
  const m = String(Math.floor((s%3600)/60)).padStart(2,'0');
  const sec = String(s%60).padStart(2,'0');
  return `${h}:${m}:${sec}`;
};

/* ===== 자동 계산 골격 (실 알고리즘은 향후 엔진 모듈 연결) ===== */
window._forecast = window._forecast || {};

window.computeBidQty = function(resource, round){
  const f = window._forecast[resource];
  if(!f) return null;
  return round===1 ? f.qty1 : f.qty2;  // TODO: 실엔진 연계 시 ramp-rate 제약 반영
};

window.computeBidPrice = function(resource, round){
  const f = window._forecast[resource];
  if(!f) return null;
  return round===1 ? f.price1 : f.price2;  // TODO: SMP·Merit Order·전략모드 반영
};

window._initForecastMockup = function(){
  // 입찰 도표(line ~157-170) 자원 13개를 _forecast에 채워 자동 계산 흐름 표현
  const seed = [
    ['광양항태양광 01단계', 2.18, 115, 2.10, 118],
    ['광양항태양광 04단계', 2.09, 115, 2.02, 120],
    ['해맞이 태양광',       0.95, 120, 0.91, 122],
    ['온누리 태양광',       0.94, 120, 0.90, 122],
    ['금능1호 태양광',      0.88, 100, 0.84, 108],
    ['김주풍력 01단계',     3.80,  95, 3.85, 100],
    ['김주풍력 02단계',     9.50,  98, 9.55, 102],
    ['금능1호 ESS',         1.80, 105, 1.85, 110],
    ['제주 ESS허브',        4.70, 108, 4.65, 112],
    ['순천 바이오가스',     1.42, 135, 1.42, 138],
    ['여수 바이오매스',     2.85, 140, 2.85, 142],
    ['광주 V2G 스테이션',   0.72, 130, 0.70, 135],
    ['전남 V2G 허브',       1.35, 128, 1.32, 132],
  ];
  seed.forEach(([name,q1,p1,q2,p2])=>{
    window._forecast[name] = {qty1:q1, price1:p1, qty2:q2, price2:p2};
  });
};

/* ===== 자동 캡처 시각 (자동 모드: 입찰설정 모달의 스케줄에서 차수별 다음 미래 시각) ===== */
window._DA_DEFAULT_SCHEDULE = [
  {time:'09:00', round:1},{time:'09:55', round:1},{time:'10:00', round:1},{time:'13:50', round:1},
  {time:'14:00', round:2},{time:'16:00', round:2},{time:'16:55', round:2},{time:'19:50', round:2},
];
window._daScheduleList = window._daScheduleList || window._DA_DEFAULT_SCHEDULE.slice();

window._daSyncScheduleFromDom = function(){
  const rows = document.querySelectorAll('#bid-sch-list > div');
  if(rows.length === 0) return;
  const list = [];
  rows.forEach(row => {
    const timeInp = row.querySelector('input[type="time"]');
    if(!timeInp) return;
    const radios = row.querySelectorAll('input[type="radio"]');
    if(radios.length < 2) return;
    const sel = radios[1].checked ? 2 : 1;
    const v = timeInp.value || '';
    if(!v) return;
    list.push({time:v, round:sel});
  });
  if(list.length > 0) window._daScheduleList = list;
};

window._daNextCaptureTime = function(round){
  const list = window._daScheduleList || window._DA_DEFAULT_SCHEDULE;
  const now = new Date();
  let best = null;
  list.forEach(s => {
    if(s.round !== round) return;
    const [h,m] = s.time.split(':').map(Number);
    if(isNaN(h) || isNaN(m)) return;
    const d = new Date(now); d.setHours(h, m, 0, 0);
    if(d.getTime() > now.getTime() && (!best || d.getTime() < best.getTime())) best = d;
  });
  return best;
};

window._daFirstScheduleOfRound = function(round){
  const list = window._daScheduleList || window._DA_DEFAULT_SCHEDULE;
  const filtered = list.filter(s => s.round === round).map(s => s.time).sort();
  return filtered[0] || (round === 1 ? '09:00' : '14:00');
};

/* ===== 카운트다운 타이머 ===== */
window._daTimerId = null;
window.startDaCountdown = function(){
  if(window._daTimerId){ clearInterval(window._daTimerId); window._daTimerId=null; }
  const tick = ()=>{
    const round = window._daRound || 1;
    const ms = window._daMsUntilDeadline(round);
    const cnt = document.getElementById('k-deadline-cnt');
    if(!cnt){
      if(window._daTimerId){ clearInterval(window._daTimerId); window._daTimerId=null; }
      return;
    }
    cnt.textContent = window._daFmtCountdown(ms);
    cnt.style.color = ms <= 0 ? 'var(--semantic-label-alt)'
                    : ms < 5*60*1000 ? 'var(--semantic-negative-normal)'
                    : '';
  };
  tick();
  window._daTimerId = setInterval(tick, 1000);
};

/* 상단 크로스링크 스트립 — DA ↔ RT 간 빠른 이동 (입찰수익 > 이중정산 등) */
const _mkCross=(cur)=>{
  const L=[
    ['bidDA-main','입찰 현황','D-1 11:00'],
    ['bidDA-cap','입찰 용량','Ramp-rate'],
    ['bidDA-price','입찰 가격','Merit Order'],
    ['bidDA-log','입찰 이력','Fail-Safe'],
    ['bidDA-settle','정산 관리','DA 예상'],
    ['bidRT-main','실시간 현황','T-75분'],
    ['bidRT-dual','편차 관리','DA · RT'],
    ['bidRT-revenue','수익 시뮬','MEP/IMBP'],
    ['bidRT-mgmt','정산 관리','월 확정'],
  ];
  const isDA=cur.startsWith('bidDA');
  return `<div style="display:flex;gap:8px;margin-bottom:16px;padding:8px 10px;background:var(--semantic-background-1);border:1px solid var(--semantic-line-normal);border-radius:8px;align-items:center;flex-wrap:wrap">
    <span class="kpi-pill ${isDA?'':'warn'}" style="font-weight:600">${isDA?'하루전 입찰':'실시간 입찰'}</span>
    <span style="color:var(--semantic-label-alt);font-size:12px">${isDA?'D-1 11:00 마감 · 익일 24구간 선입찰':'T-75분 마감 · 15분 단위 갱신'}</span>
    <div style="margin-left:auto;display:flex;gap:4px;flex-wrap:wrap">
      ${L.filter(x=>x[0].startsWith(isDA?'bidDA':'bidRT')).map(x=>`<span onclick="activate('${x[0]}')" style="cursor:pointer;padding:3px 9px;border-radius:4px;font-size:12px;font-weight:500;background:${x[0]===cur?'var(--semantic-brand-primary-assistive)':'var(--semantic-background-2)'};color:${x[0]===cur?'var(--semantic-brand-primary)':'var(--semantic-label-normal)'}">${x[1]}</span>`).join('')}
      <span style="width:1px;height:20px;background:var(--semantic-line-normal);margin:0 4px"></span>
      ${L.filter(x=>!x[0].startsWith(isDA?'bidDA':'bidRT')).map(x=>`<span onclick="activate('${x[0]}')" style="cursor:pointer;padding:3px 9px;border-radius:4px;font-size:12px;background:transparent;color:var(--semantic-label-alt)" title="${x[2]}">↗ ${x[1]}</span>`).join('')}
    </div>
  </div>`;
};

/* 입찰 메뉴 전용 간소화 필터바 (VPP 그룹 · 자원 유형 · 발전기) */
const _mkBidFilter=(cfg)=>{
  cfg=cfg||{};
  const showGen=cfg.showGen!==false;
  const rightInfo=cfg.rightInfo||'';
  const px=cfg.prefix||'bf';
  const onCh=cfg.onChange||'';
  const oc=onCh?` onchange="${onCh}()"`:'';
  return `<div class="card fbar"><div class="fbar-row">
    <div class="fbar-item">
      <span class="fbar-lbl">VPP 그룹</span>
      <select class="fbar-sel" id="${px}-vpp"${oc}><option>전체</option><option>VPP-전남권</option><option>VPP-제주권</option><option>VPP-경북권</option></select>
    </div>
    <div class="fbar-item">
      <span class="fbar-lbl">자원 유형</span>
      <select class="fbar-sel" id="${px}-type"${oc}><option value="all">전체</option><option>태양광</option><option>풍력</option><option>ESS</option><option>바이오</option><option>V2G</option></select>
    </div>
    ${rightInfo?`<div class="fbar-item" style="margin-left:auto;align-items:flex-end"><span class="fbar-lbl" style="text-align:right">${rightInfo}</span></div>`:''}
  </div></div>`;
};

/* ===== 하루전입찰: 입찰 운영 (D-1 11:00) ===== */
window.P['bidDA-main']=()=>`
${_mkCross('bidDA-main')}

<!-- 필터바 (VPP 그룹 · 자원 유형 · 차수 탭) -->
<div class="card fbar"><div class="fbar-row">
  <div class="fbar-item">
    <span class="fbar-lbl">VPP 그룹</span>
    <select class="fbar-sel" id="bdm-vpp" onchange="bidDaMainApply()">
      <option>전체</option><option>VPP-전남권</option><option>VPP-제주권</option><option>VPP-경북권</option>
    </select>
  </div>
  <div class="fbar-item">
    <span class="fbar-lbl">자원 유형</span>
    <select class="fbar-sel" id="bdm-type" onchange="bidDaMainApply()">
      <option value="all">전체</option><option>태양광</option><option>풍력</option><option>ESS</option><option>바이오</option><option>V2G</option>
    </select>
  </div>
  <div class="fbar-item">
    <span class="fbar-lbl">차수</span>
    <select class="fbar-sel" id="bdm-round" onchange="selRound(parseInt(this.value,10), null)">
      <option value="1">1차</option>
      <option value="2">2차</option>
    </select>
  </div>
  <div class="fbar-item wide" style="margin-left:auto;align-items:flex-end">
    <span class="fbar-lbl" style="display:inline-flex;align-items:center;gap:6px">
      마지막 업데이트 <span id="bid-refresh-time" class="mono">14:25:08</span>
      <button onclick="refreshBidHistory()" title="입찰이력 새로고침" style="width:26px;height:26px;min-width:26px;padding:0;border-radius:50%;border:1px solid var(--semantic-line-normal);background:var(--semantic-background-1);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-size:14px;color:var(--semantic-label-normal);flex-shrink:0">↻</button>
    </span>
  </div>
</div></div>

<!-- 페이지 탭 -->
<div style="display:flex;gap:24px;margin-bottom:16px;border-bottom:1px solid var(--semantic-line-normal)">
  <div class="pg-tab active" onclick="pgTab(this,'today')">금일 입찰</div>
  <div class="pg-tab" onclick="pgTab(this,'forecast')">예측 현황</div>
  <div class="pg-tab" onclick="pgTab(this,'history')">입찰 내역</div>
</div>

<!-- ========== VIEW 1: 금일 입찰 ========== -->
<div id="pg-view-today">
  <!-- 액션 버튼 바 (금일 입찰 전용) -->
  <div style="display:flex;gap:8px;margin-bottom:16px;justify-content:flex-end;flex-wrap:wrap;align-items:center">
    <span id="bid-mode-badge" class="badge ok" style="margin-right:auto;font-size:11px">자동입찰 모드</span>
    <button class="cb n sm" onclick="openModal('modal-bid-settings')">입찰설정</button>
    <button class="cb n sm" onclick="openModal('modal-model-settings')">예측모델 설정</button>
    <button class="cb p sm" onclick="openImmBid()">즉시입찰</button>
  </div>
  <div class="g4">
    <div class="card acc"><div class="ct">다음 마감 ${window.tip('다음 입찰 마감 시각','KPX 하루전 시장 입찰 제출 마감까지 남은 시간','1차: 매일 11:00 / 2차: 매일 15:00 (KPX 고시)','마감 5분 전 알람 발송 — 자동 제출 또는 수동 검토 후 제출')}</div><div class="kv" id="k-deadline">11:00</div><div class="kd neu" id="k-deadline-sub"><span id="k-deadline-cnt" class="mono">--:--:--</span><span id="k-deadline-msg"> · 1차 KPX 자동전송</span></div></div>
    <div class="card"><div class="ct">차수별 낙찰용량 ${window.tip('차수별 낙찰용량','선택한 차수(1차/2차)에서 낙찰된 시간대별 평균 입찰량','Σ(시간대별 낙찰 MWh) ÷ 24 [MW]','입찰량 대비 낙찰률 = 낙찰용량 ÷ 제출용량 × 100')}</div><div class="kv" id="k-won">145.2<span class="ku">MW</span></div><div class="kd up">낙찰가 평균 122원</div></div>
    <div class="card"><div class="ct">예측 상태 ${window.tip('예측 상태','입찰에 사용된 예측 모델의 실행 상태','완료: 모든 시간대 예측 OK / 진행: 일부 누락 / 오류: 모델 실패','오류 시 fallback 모델(persistence) 자동 적용 — 정확도 ~30% 하락')}</div><div class="kv" style="color:var(--semantic-positive-normal)">완료</div><div class="kd up">NMAE 6.8% · 정상</div></div>
    <div class="card"><div class="ct">예상 MEP ${window.tip('예상 MEP (Market Expected Profit)','현재 입찰 조건으로 예상되는 시장 수익','Σ(낙찰량 × 시간대별 SMP) [백만원]','확정 정산은 익일 06:00 KPX 발표 — ±5% 변동 가능')}</div><div class="kv">17.7<span class="ku">백만원</span></div><div class="kd neu">하루전 SMP 기준</div></div>
  </div>
  <div class="card mb"><div class="sh"><div class="st">D-1 자동화 타임라인</div><span class="kpi-pill">매일 반복</span></div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:12px;padding:6px 2px;line-height:24px">
      <span class="badge" style="background:var(--semantic-brand-primary-assistive);color:var(--semantic-brand-primary);font-weight:600">1차</span>
      <span class="mono" style="color:var(--semantic-positive-normal)">✓ 09:00 예측</span>
      <span style="color:var(--semantic-label-alt)">→</span>
      <span class="mono" style="color:var(--semantic-positive-normal)">✓ 10:00 검토</span>
      <span style="color:var(--semantic-label-alt)">→</span>
      <span class="mono" style="color:var(--palette-yellow-40)">⏵ 11:00 <span id="tl-da1-desc">자동 제출</span></span>
      <span class="badge warn" id="tl-da1-badge" style="font-size:10px">진행중</span>
      <span style="color:var(--semantic-label-alt);margin:0 6px">│</span>
      <span class="badge" style="background:rgba(255,202,66,0.15);color:var(--palette-yellow-40);font-weight:600">2차</span>
      <span class="mono" style="color:var(--semantic-label-alt)">⏸ 14:00 예측</span>
      <span style="color:var(--semantic-label-alt)">→</span>
      <span class="mono" style="color:var(--semantic-label-alt)">⏸ 14:30 검토</span>
      <span style="color:var(--semantic-label-alt)">→</span>
      <span class="mono" style="color:var(--semantic-label-alt)">⏸ 15:00 <span id="tl-da2-desc">자동 제출</span></span>
      <span class="badge off" id="tl-da2-badge" style="font-size:10px">대기</span>
    </div>
  </div>
  <div id="manual-submit-warning" class="card mb" style="display:none;background:var(--semantic-tag-bg-yellow);border-left:3px solid var(--palette-yellow-40);padding:10px 14px;font-size:12px;line-height:18px;color:var(--semantic-label-strong)">
    ⚠ <b>수동입찰 모드 안내</b> — [수정 → 저장]만으로는 KPX 제출이 완료되지 않습니다. 반드시 우측 상단의 <b>[KPX 제출]</b> 버튼을 클릭해야 입찰이 KPX로 전송됩니다.
  </div>
  <div class="card mb">
    <div class="sh">
      <div class="st">금일 입찰 도표</div>
      <div style="display:flex;gap:10px;align-items:center">
        <span style="font-size:12px;color:var(--semantic-label-alt)" id="tbl-meta">1차 자동 · 2026-04-23 09:57 · 2회 입찰</span>
        <button class="cb n sm" id="btn-da-cancel" onclick="daCancelEdit()" style="display:none">취소</button>
        <button class="cb n sm" id="btn-da-edit" onclick="daToggleEdit()">수정</button>
        <button class="cb p sm" id="btn-submit-da" onclick="submitDaBid()" style="display:none">KPX 제출</button>
      </div>
    </div>
    <div style="overflow-x:auto">
    <table class="tbl">
      <thead><tr>
        <th rowspan="2" style="vertical-align:middle">순번</th>
        <th rowspan="2" style="vertical-align:middle">회원사명</th>
        <th rowspan="2" style="vertical-align:middle">자원명</th>
        <th rowspan="2" style="vertical-align:middle">발전기 명</th>
        <th rowspan="2" style="vertical-align:middle">CBP번호</th>
        <th rowspan="2" style="vertical-align:middle">발전원</th>
        <th rowspan="2" style="vertical-align:middle">지역</th>
        <th rowspan="2" style="vertical-align:middle">설비용량</th>
        <th colspan="2" style="text-align:center;color:var(--semantic-brand-primary)">1차 (D-1 11:00 마감)</th>
        <th colspan="2" style="text-align:center;color:var(--palette-yellow-40)">2차 (D-1 15:00 마감)</th>
        <th rowspan="2" style="vertical-align:middle">상태</th>
      </tr><tr>
        <th>입찰량</th><th>입찰가(원)</th>
        <th>입찰량</th><th>입찰가(원)</th>
      </tr></thead>
      <tbody>
      ${[
        ['광양항태양광','fgsl021','광양항태양광 01단계','1201','태양광','전남',2.29,2.18,115,2.10,118,'낙찰'],
        ['광양항4단계','fgsl022','광양항태양광 04단계','1203','태양광','전남',2.20,2.09,115,2.02,120,'낙찰'],
        ['해맞이','fgsl023','해맞이 태양광','1205','태양광','전남',1.00,0.95,120,0.91,122,'낙찰'],
        ['온누리','fgsl024','온누리 태양광','1207','태양광','전남',1.00,0.94,120,0.90,122,'낙찰'],
        ['금능1호','fgsl031','금능1호 태양광','1301','태양광','제주',0.98,0.88,100,0.84,108,'낙찰'],
        ['김주풍력','fgwp013','김주풍력 01단계','1598','풍력','경북',4.00,3.80,95,3.85,100,'낙찰'],
        ['김주풍력','fgwp014','김주풍력 02단계','1603','풍력','경북',10.00,9.50,98,9.55,102,'낙찰'],
        ['금능에너지','fges011','금능1호 ESS','8386','ESS','제주',2.00,1.80,105,1.85,110,'낙찰'],
        ['제주ESS','fges012','제주 ESS허브','8412','ESS','제주',5.00,4.70,108,4.65,112,'낙찰'],
        ['순천바이오','fgbio01','순천 바이오가스','2104','바이오','전남',1.50,1.42,135,1.42,138,'낙찰'],
        ['여수바이오','fgbio02','여수 바이오매스','2106','바이오','전남',3.00,2.85,140,2.85,142,'낙찰'],
        ['광주V2G','fgv2g01','광주 V2G 스테이션','3201','V2G','전남',0.80,0.72,130,0.70,135,'낙찰'],
        ['전남V2G','fgv2g02','전남 V2G 허브','3203','V2G','전남',1.50,1.35,128,1.32,132,'낙찰'],
      ].map((r,i)=>{
        const vppMap={'전남':'VPP-전남권','제주':'VPP-제주권','경북':'VPP-경북권'};
        const vpp=vppMap[r[5]]||'';
        return `<tr class="da-bid-row" data-resource="${r[2]}" data-vpp="${vpp}" data-type="${r[4]}"><td class="mono">${i+1}</td><td>${r[0]}</td><td class="mono">${r[1]}</td><td>${r[2]}</td><td class="mono">${r[3]}</td><td>${r[4]}</td><td>${r[5]}</td><td class="mono">${r[6]}MW</td><td class="mono da-bid-qty" data-round="1" style="color:var(--semantic-brand-primary)">${r[7]}MW</td><td class="mono da-bid-price" data-round="1">${r[8]}</td><td class="mono da-bid-qty" data-round="2" style="color:var(--palette-yellow-40)">${r[9]}MW</td><td class="mono da-bid-price" data-round="2">${r[10]}</td><td class="da-status-cell"><span class="badge ${r[11]==='낙찰'?'ok':'off'}">${r[11]}</span></td></tr>`;
      }).join('')}
      </tbody>
    </table>
    </div>
  </div>
</div>

<!-- ========== VIEW 2: 예측 현황 ========== -->
<div id="pg-view-forecast" style="display:none">
  <div class="g4">
    <div class="card acc"><div class="ct">1차 예측 상태 ${window.tip('1차 예측 상태','1차 입찰(09:00~12:00)에 사용된 예측 모델의 실행 결과','자원별 예측 성공/실패 집계 + NMAE 평균','완료: 모든 자원 OK / 진행: 일부 누락 / 오류: 모델 실패 → fallback 적용')}</div><div class="kv" style="color:var(--semantic-positive-normal)">완료</div><div class="kd up">성공 6/6 · NMAE 6.8%</div></div>
    <div class="card"><div class="ct">2차 예측 상태 ${window.tip('2차 예측 상태','2차 입찰(14:00~17:00)에 사용될 예측 모델의 실행 결과','14:00 자동 생성 — 1차 대비 실측 데이터 4시간 추가 반영','대기: 생성 전 / 완료: 정상 생성 / 오류: 1차 결과 재사용')}</div><div class="kv" style="color:var(--semantic-label-alt)">대기</div><div class="kd neu">14:00 생성 예정</div></div>
    <div class="card"><div class="ct">Fail-Safe 발동 ${window.tip('Fail-Safe 발동','예측 모델 실패 시 fallback(persistence) 모델로 자동 전환된 횟수','COUNT(*) FROM forecast_log WHERE fallback=true','발동 시 정확도 ~30% 하락 — 월 3회 초과 시 모델 점검 필요')}</div><div class="kv">0<span class="ku">회</span></div><div class="kd up">금일 / 월누적 1회</div></div>
    <div class="card"><div class="ct">정확도 Top 자원 ${window.tip('정확도 Top 자원','금일 NMAE가 가장 낮은(=가장 정확한) 자원','MIN(NMAE) FROM forecast_today GROUP BY resource','NMAE 5% 이내 = 우수 / 8% 이내 = 양호 / 10% 초과 = 모델 재학습 권장')}</div><div class="kv">광양항태양광</div><div class="kd up">NMAE 4.2%</div></div>
  </div>
  <div class="card mb"><div class="sh"><div class="st">자원별 예측 현황 (금일 생성분)</div><div style="display:flex;gap:8px;align-items:center"><span class="kpi-pill" style="font-size:11px">1차 10:00 생성</span><button class="cb n sm" onclick="toast('실패 자원 재예측을 실행합니다.')">실패 자원 재예측</button></div></div>
  <div style="overflow-x:auto">
  <table class="tbl">
    <thead><tr>
      <th>자원명</th><th>발전원</th>
      <th>1차 예측값(MWh)</th><th>1차 NMAE</th>
      <th>2차 예측값(MWh)</th><th>2차 NMAE</th>
      <th>사용 모델</th><th>상태</th><th>Fail-Safe</th>
    </tr></thead>
    <tbody>
    ${[
      ['광양항태양광 01단계','태양광','VPP-전남권',14.2,'4.2%','-','-','nwp-e_v3','성공',''],
      ['광양항태양광 04단계','태양광','VPP-전남권',13.6,'5.1%','-','-','nwp-e_v3','성공',''],
      ['해맞이 태양광','태양광','VPP-전남권',6.1,'6.8%','-','-','nwp-e_v2','성공',''],
      ['온누리 태양광','태양광','VPP-전남권',5.9,'7.4%','-','-','nwp-e_v2','성공',''],
      ['순천 바이오가스','바이오','VPP-전남권',8.5,'2.1%','-','-','baseline-v1','성공',''],
      ['여수 바이오매스','바이오','VPP-전남권',16.8,'2.8%','-','-','baseline-v1','성공',''],
      ['광주 V2G 스테이션','V2G','VPP-전남권',4.3,'10.5%','-','-','ocpp-stat','성공',''],
      ['전남 V2G 허브','V2G','VPP-전남권',8.1,'11.8%','-','-','ocpp-stat','주의',''],
      ['금능1호 태양광','태양광','VPP-제주권',5.2,'11.2%','-','-','nwp-e_v2','주의',''],
      ['금능1호 ESS','ESS','VPP-제주권',10.8,'5.5%','-','-','ess-cycle','성공',''],
      ['제주 ESS허브','ESS','VPP-제주권',15.0,'6.2%','-','-','ess-cycle','성공',''],
      ['김주풍력 01단계','풍력','VPP-경북권',24.8,'9.1%','-','-','ecmwf-ifs','성공',''],
      ['김주풍력 02단계','풍력','VPP-경북권',57.0,'8.2%','-','-','ecmwf-ifs','성공',''],
    ].map(r=>{
      const st=r[8]==='성공'?'ok':(r[8]==='주의'?'warn':'err');
      return `<tr class="da-fcst-row" data-vpp="${r[2]}" data-type="${r[1]}"><td>${r[0]}</td><td>${r[1]}</td><td class="mono">${r[3]}</td><td class="mono" style="color:${r[4]==='-'?'var(--semantic-label-alt)':(parseFloat(r[4])<7?'var(--semantic-positive-normal)':(parseFloat(r[4])<10?'var(--palette-yellow-40)':'var(--semantic-negative-normal)'))}">${r[4]}</td><td class="mono" style="color:var(--semantic-label-alt)">${r[5]}</td><td class="mono" style="color:var(--semantic-label-alt)">${r[6]}</td><td class="mono" style="font-size:12px">${r[7]}</td><td><span class="badge ${st}">${r[8]}</span></td><td class="mono" style="font-size:12px;color:var(--semantic-label-alt)">${r[9]||'-'}</td></tr>`;
    }).join('')}
    </tbody>
  </table>
  </div>
  </div>
  <div class="g2">
    <div class="card mb"><div class="sh"><div class="st">예측 vs 실측 비교 (금일 누적)</div></div>
      <div style="height:200px;position:relative"><canvas id="c-forecast-compare" role="img" aria-label="예측 vs 실측"></canvas></div>
    </div>
    <div class="card mb"><div class="sh"><div class="st">최근 Fail-Safe 발동 이력</div><span class="sa" onclick="activate('bidDA-log')">전체 이력 ↗</span></div>
      <div class="al"><div class="ad" style="background:var(--palette-yellow-40)"></div><div class="am"><b>2026-04-18</b> 1차 예측 실패 → 전일 평균치 자동 대체</div><div class="at">금능1호</div></div>
      <div class="al"><div class="ad" style="background:var(--semantic-positive-normal)"></div><div class="am"><b>2026-04-18</b> 11:00 제출 정상 완료 (Fail-Safe 적용 후)</div><div class="at">전 자원</div></div>
      <div class="al"><div class="ad" style="background:var(--semantic-line-strong)"></div><div class="am">이번 달 Fail-Safe 발동 총 1회 · 자동 복구 1건</div><div class="at">월 통계</div></div>
    </div>
  </div>
</div>

<!-- ========== VIEW 3: 입찰 내역 ========== -->
<div id="pg-view-history" style="display:none">
  <div class="g4">
    <div class="card acc"><div class="ct">최근 7일 제출 ${window.tip('최근 7일 제출','최근 7일간 KPX에 제출한 입찰 회차 수','COUNT(*) FROM bids WHERE submitted_at ≥ today-7','정상 운영 시 1차 7회 + 2차 7회 = 총 14회 / 마감 미준수 시 누락')}</div><div class="kv">14<span class="ku">회</span></div><div class="kd up">1차 7 / 2차 7</div></div>
    <div class="card"><div class="ct">평균 낙찰률 ${window.tip('평균 낙찰률','제출 입찰량 대비 낙찰된 비율의 7일 평균','AVG(낙찰량 ÷ 제출량 × 100) [%]','90% 이상 = 우수 / 70~90% = 양호 / 70% 미만 = 가격 전략 재검토 필요')}</div><div class="kv" style="color:var(--semantic-positive-normal)">93<span class="ku">%</span></div><div class="kd up">▲ +2.1%p 전주</div></div>
    <div class="card"><div class="ct">누적 DAES ${window.tip('누적 DAES (Day-Ahead Earned Settlement)','최근 7일간 하루전시장에서 확정된 정산 수익 누계','Σ(낙찰량 × 시간대별 SMP) [백만원]','SMP 변동 반영 / 실시간 편차정산(IBES)·페널티는 별도 차감')}</div><div class="kv">128.4<span class="ku">백만원</span></div><div class="kd up">7일 누계</div></div>
    <div class="card"><div class="ct">평균 NMAE ${window.tip('평균 NMAE (Normalized Mean Absolute Error)','7일간 예측값과 실측값의 정규화 평균 절대 오차','AVG(|예측-실측| ÷ 정격용량) × 100 [%]','목표 8% 이내 — 8% 초과 시 정산 페널티 / 12% 초과 시 모델 재학습')}</div><div class="kv">6.9<span class="ku">%</span></div><div class="kd up">목표 8% 내</div></div>
  </div>
  <div class="card"><div class="sh"><div class="st">최근 입찰 내역</div>${window.csvBtn('da-recent-tbody','da_recent_bids','최근 입찰 내역')}</div>
  <div style="overflow-x:auto">
  <table class="tbl">
    <thead><tr><th>제출일시</th><th>차수</th><th>VPP 그룹</th><th>입찰용량</th><th>낙찰용량</th><th>낙찰률</th><th>평균가(원)</th><th>DAES</th><th>상태</th></tr></thead>
    <tbody id="da-recent-tbody">
    ${[
      // 2026-04-22 (오늘 제출)
      ['2026-04-22 15:00','2차','VPP-전남권',142.7,138.5,97,128,'+18,240K','제출완료'],
      ['2026-04-22 15:00','2차','VPP-제주권',22.5,21.0,93,110,'+2,310K','제출완료'],
      ['2026-04-22 15:00','2차','VPP-경북권',30.2,28.2,93,122,'+3,440K','제출완료'],
      ['2026-04-22 11:00','1차','VPP-전남권',145.2,140.1,97,122,'+17,900K','제출완료'],
      ['2026-04-22 11:00','1차','VPP-제주권',22.8,21.5,94,105,'+2,260K','제출완료'],
      ['2026-04-22 11:00','1차','VPP-경북권',30.5,28.7,94,118,'+3,390K','제출완료'],
      // 2026-04-21
      ['2026-04-21 15:00','2차','VPP-전남권',141.8,132.4,93,130,'+17,560K','제출완료'],
      ['2026-04-21 15:00','2차','VPP-제주권',22.4,20.8,93,108,'+2,250K','제출완료'],
      ['2026-04-21 15:00','2차','VPP-경북권',29.8,27.5,92,124,'+3,410K','제출완료'],
      ['2026-04-21 11:00','1차','VPP-전남권',144.5,135.8,94,120,'+17,080K','제출완료'],
      ['2026-04-21 11:00','1차','VPP-제주권',22.6,21.0,93,103,'+2,180K','제출완료'],
      ['2026-04-21 11:00','1차','VPP-경북권',30.0,28.0,93,116,'+3,250K','제출완료'],
      // 2026-04-20
      ['2026-04-20 15:00','2차','VPP-전남권',143.2,128.9,90,132,'+17,310K','제출완료'],
      ['2026-04-20 15:00','2차','VPP-제주권',22.1,19.2,87,112,'+2,150K','제출완료'],
      ['2026-04-20 15:00','2차','VPP-경북권',29.5,26.8,91,126,'+3,380K','제출완료'],
      ['2026-04-20 11:00','1차','VPP-전남권',146.8,139.5,95,118,'+17,445K','제출완료'],
      ['2026-04-20 11:00','1차','VPP-제주권',22.5,21.2,94,102,'+2,160K','제출완료'],
      ['2026-04-20 11:00','1차','VPP-경북권',30.3,28.5,94,114,'+3,250K','제출완료'],
      // 2026-04-19
      ['2026-04-19 15:00','2차','VPP-전남권',140.1,126.3,90,135,'+17,120K','제출완료'],
      ['2026-04-19 15:00','2차','VPP-제주권',21.8,18.9,87,118,'+2,230K','제출완료'],
      ['2026-04-19 15:00','2차','VPP-경북권',29.2,26.5,91,128,'+3,390K','제출완료'],
      ['2026-04-19 11:00','1차','VPP-전남권',143.5,134.2,94,121,'+16,240K','제출완료'],
      ['2026-04-19 11:00','1차','VPP-제주권',22.0,20.5,93,107,'+2,190K','제출완료'],
      ['2026-04-19 11:00','1차','VPP-경북권',29.8,27.8,93,115,'+3,200K','제출완료'],
      // 2026-04-18 (Fail-Safe 발동일)
      ['2026-04-18 15:00','2차','VPP-전남권',139.5,123.8,89,138,'+17,090K','제출완료'],
      ['2026-04-18 15:00','2차','VPP-제주권',21.5,18.5,86,120,'+2,220K','제출완료'],
      ['2026-04-18 15:00','2차','VPP-경북권',29.0,26.0,90,130,'+3,380K','제출완료'],
      ['2026-04-18 11:00','1차','VPP-전남권',142.0,131.5,93,119,'+15,650K','제출완료'],
      ['2026-04-18 11:00','1차','VPP-제주권',21.7,20.0,92,105,'+2,100K','제출완료'],
      ['2026-04-18 11:00','1차','VPP-경북권',29.5,27.5,93,113,'+3,110K','제출완료'],
    ].map(r=>`<tr data-vpp="${r[2]}" data-round="${r[1]==='1차'?'1':'2'}"><td class="mono">${r[0]}</td><td><span class="badge ${r[1]==='1차'?'inf':''}" ${r[1]==='2차'?'style="background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow)"':''}>${r[1]}</span></td><td>${r[2]}</td><td class="mono">${r[3]}MW</td><td class="mono" style="color:var(--semantic-brand-primary)">${r[4]}MW</td><td class="mono">${r[5]}%</td><td class="mono">${r[6]}</td><td class="mono" style="color:var(--semantic-positive-normal)">${r[7]}</td><td><span class="badge ok">${r[8]}</span></td></tr>`).join('')}
    </tbody>
  </table>
  </div>
  </div>
</div>

<!-- ============ 모달 ① 입찰설정 ============ -->
<div class="modal-backdrop" id="modal-bid-settings" style="display:none" onclick="closeModalBg(event,'modal-bid-settings')">
  <div class="modal" style="max-height:min(78vh,720px);display:flex;flex-direction:column;overflow:hidden">
    <div class="modal-hdr" style="flex-shrink:0">
      <span class="modal-title">입찰 설정</span>
      <button class="modal-close" onclick="closeModal('modal-bid-settings')">✕</button>
    </div>
    <div class="modal-body" style="overflow-y:auto;flex:1 1 auto;min-height:0">
      <div style="padding:10px 12px;background:var(--semantic-brand-primary-assistive);border-radius:6px;margin-bottom:14px;font-size:12px;line-height:18px;color:var(--semantic-label-normal);border-left:3px solid var(--semantic-brand-primary)">
        📅 <b>하루전 시장 구조</b> &nbsp; <span class="mono">1시간 × 24구간/일</span> &nbsp;
        <span style="color:var(--semantic-label-alt)">(00시~23시 각 구간별 평균 발전량 MWh 입찰)</span><br>
        <span style="font-size:11px;color:var(--semantic-label-alt)">※ 아래 <b>입찰 시간 스케줄</b>은 KPX 제출 시각(1차/2차)을 의미하며, 24구간 데이터 단위와는 별개입니다.</span>
      </div>
      <div class="form-section">입찰 모드</div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px">
        <label style="display:flex;align-items:center;gap:10px;cursor:pointer"><input type="radio" name="bid-mode" value="manual"> 수동입찰 모드</label>
        <label style="display:flex;align-items:center;gap:10px;cursor:pointer"><input type="radio" name="bid-mode" value="auto" checked> 자동입찰 모드 (자동+수동)</label>
      </div>
      <hr class="form-divider">
      <div class="form-section" style="display:flex;align-items:center;justify-content:space-between">
        <span>입찰 시간 스케줄</span>
        <span style="font-size:11px;color:var(--semantic-label-alt);font-weight:400">시간 + 차수를 추가해 KPX 제출 스케줄을 구성합니다.</span>
      </div>
      <div id="bid-sch-list" style="display:flex;flex-direction:column;gap:8px;margin-bottom:10px;max-height:240px;overflow-y:auto;border:1px solid var(--semantic-line-alt);border-radius:6px;padding:8px"></div>
      <button class="cb n sm" onclick="addBidSchedule()">+ 스케줄 추가</button>
      <hr class="form-divider">
      <div class="form-section">참여 자원 선택 <span id="da-res-count" style="font-size:11px;font-weight:400;color:var(--semantic-label-alt);margin-left:8px">13/13 활성</span></div>
      <div style="font-size:11px;color:var(--semantic-label-alt);margin-bottom:8px">선택 해제된 자원은 입찰 도표에서 제외 처리되며 KPX 제출 시 합계에서 제외됩니다.</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-bottom:8px;font-size:11px;color:var(--semantic-label-alt)">
        <span>유형 필터:</span>
        <button class="cb p sm da-chip" data-filter="all" style="padding:3px 10px;font-size:11px;height:auto" onclick="toggleDaChip('all')">전체</button>
        <span style="color:var(--semantic-line-normal)">|</span>
        <button class="cb p sm da-chip" data-filter="태양광" style="padding:3px 10px;font-size:11px;height:auto" onclick="toggleDaChip('태양광')">태양광</button>
        <button class="cb p sm da-chip" data-filter="풍력" style="padding:3px 10px;font-size:11px;height:auto" onclick="toggleDaChip('풍력')">풍력</button>
        <button class="cb p sm da-chip" data-filter="ESS" style="padding:3px 10px;font-size:11px;height:auto" onclick="toggleDaChip('ESS')">ESS</button>
        <button class="cb p sm da-chip" data-filter="바이오" style="padding:3px 10px;font-size:11px;height:auto" onclick="toggleDaChip('바이오')">바이오</button>
        <button class="cb p sm da-chip" data-filter="V2G" style="padding:3px 10px;font-size:11px;height:auto" onclick="toggleDaChip('V2G')">V2G</button>
      </div>
      <div style="max-height:180px;overflow-y:auto;border:1px solid var(--semantic-line-alt);border-radius:6px;padding:8px 12px;margin-bottom:12px">
        ${[
          ['광양항태양광 01단계','태양광',true],
          ['광양항태양광 04단계','태양광',true],
          ['해맞이 태양광','태양광',true],
          ['온누리 태양광','태양광',true],
          ['금능1호 태양광','태양광',true],
          ['김주풍력 01단계','풍력',true],
          ['김주풍력 02단계','풍력',true],
          ['금능1호 ESS','ESS',true],
          ['제주 ESS허브','ESS',true],
          ['순천 바이오가스','바이오',true],
          ['여수 바이오매스','바이오',true],
          ['광주 V2G 스테이션','V2G',true],
          ['전남 V2G 허브','V2G',true],
        ].map(r=>`<div style="display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid var(--semantic-line-alt)">
          <label class="toggle"><input type="checkbox" class="da-res-toggle" data-resource="${r[0]}" ${r[2]?'checked':''} onchange="updateDaResCount();syncDaChips()"><div class="ts"></div></label>
          <span style="font-size:13px;flex:1">${r[0]}</span>
          <span class="badge ${r[1]==='태양광'?'inf':'ok'}">${r[1]}</span>
        </div>`).join('')}
      </div>
      <hr class="form-divider">
      <div class="form-section">제출 결과 통지</div>
      <div class="form-row">
        <div class="form-item"><label>운영자 이메일</label><input class="inp" value="president@ewp.co.kr"></div>
        <div class="form-item"><label>KPX 수신 이메일</label><input class="inp" value="renew-forecast@kpx.or.kr"></div>
      </div>
      <div class="form-row full">
        <div class="form-item"><label>문자 알림 번호 (선택)</label><input class="inp" placeholder="010-0000-0000"></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="cb n" onclick="closeModal('modal-bid-settings')">취소</button>
      <button class="cb p" id="btn-apply-da" onclick="applyBidMode()">적용</button>
    </div>
  </div>
</div>

<!-- ============ 모달 ② 예측모델 설정 ============ -->
<div class="modal-backdrop" id="modal-model-settings" style="display:none" onclick="closeModalBg(event,'modal-model-settings')">
  <div class="modal">
    <div class="modal-hdr">
      <span class="modal-title">예측모델 설정</span>
      <button class="modal-close" onclick="closeModal('modal-model-settings')">✕</button>
    </div>
    <div class="modal-body">
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px">
        <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer">
          <input type="radio" name="model-mode" value="latest" onchange="toggleDaModelMode()" style="margin-top:4px">
          <div><div style="font-weight:500">최신 예측값 사용</div><div style="font-size:11px;color:var(--semantic-label-alt);margin-top:2px">예측모델에 관계없이 발전기별 가장 최신 예측값을 사용합니다.</div></div>
        </label>
        <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer">
          <input type="radio" name="model-mode" value="per-gen" onchange="toggleDaModelMode()" checked style="margin-top:4px">
          <div><div style="font-weight:500">발전기별 예측모델 사용</div><div style="font-size:11px;color:var(--semantic-label-alt);margin-top:2px">각 발전기별 예측모델을 지정합니다.</div></div>
        </label>
      </div>
      <div id="da-model-per-gen-section">
      <hr class="form-divider">
      <div class="form-row">
        <div class="form-item"><label>1차 일괄선택</label><select class="sel"><option>1차 일괄선택</option><option>nwp-e_v3</option><option>nwp-e_v2</option><option>ecmwf-ifs</option></select></div>
        <div class="form-item"><label>2차 일괄선택</label><select class="sel"><option>2차 일괄선택</option><option>nwp-e_v3</option><option>nwp-e_v2</option><option>ecmwf-ifs</option></select></div>
      </div>
      <div class="form-row full"><div class="form-item"><label>발전기 검색</label><input class="inp" placeholder="🔍 발전기명 또는 자원코드"></div></div>
      <div style="max-height:260px;overflow-y:auto;border:1px solid var(--semantic-line-alt);border-radius:6px;padding:10px 14px">
        ${[
          ['광양항태양광 01단계','nwp-e_v3','nwp-e_v3'],
          ['광양항태양광 04단계','nwp-e_v3','nwp-e_v3'],
          ['해맞이 태양광','nwp-e_v2','nwp-e_v3'],
          ['온누리 태양광','nwp-e_v2','nwp-e_v3'],
          ['김주풍력 01단계','ecmwf-ifs','ecmwf-ifs'],
        ].map((r,i)=>`<div style="padding:10px 0;${i<4?'border-bottom:1px solid var(--semantic-line-alt);':''}">
          <div style="font-weight:500;margin-bottom:8px;font-size:13px">${r[0]}</div>
          <div style="display:grid;grid-template-columns:40px 1fr 40px 1fr;gap:8px;align-items:center">
            <span style="font-size:12px;color:var(--semantic-label-alt)">1차</span>
            <select class="sel" style="height:30px;font-size:12px"><option>${r[1]}</option><option>nwp-e_v2</option><option>ecmwf-ifs</option></select>
            <span style="font-size:12px;color:var(--semantic-label-alt)">2차</span>
            <select class="sel" style="height:30px;font-size:12px"><option>${r[2]}</option><option>nwp-e_v2</option><option>ecmwf-ifs</option></select>
          </div>
        </div>`).join('')}
      </div>
      </div>
      <div id="da-model-latest-info" style="display:none;padding:12px 14px;background:var(--semantic-brand-primary-assistive);border-radius:6px;font-size:12px;line-height:18px;color:var(--semantic-label-normal)">
        ℹ 발전기별 모델 지정을 건너뛰고, 각 자원의 최근 5분 이내 예측값을 자동 선택합니다. 모델 변경·검증 부담이 없는 대신 모델 일관성은 보장되지 않습니다.
      </div>
    </div>
    <div class="modal-footer">
      <button class="cb n" onclick="closeModal('modal-model-settings')">취소</button>
      <button class="cb p" onclick="toast('예측모델을 저장했습니다.');closeModal('modal-model-settings')">저장</button>
    </div>
  </div>
</div>

<!-- ============ 모달 ③ 즉시입찰 확인 ============ -->
<div class="modal-backdrop" id="modal-immediate-bid" style="display:none" onclick="closeModalBg(event,'modal-immediate-bid')">
  <div class="modal" style="width:440px">
    <div class="modal-hdr">
      <span class="modal-title">즉시입찰</span>
      <button class="modal-close" onclick="closeModal('modal-immediate-bid')">✕</button>
    </div>
    <div class="modal-body">
      <div style="padding:12px 14px;background:var(--semantic-tag-bg-yellow);border-radius:6px;font-size:13px;line-height:20px;color:var(--semantic-label-strong);margin-bottom:14px">
        ⚠ 즉시입찰은 스케줄과 무관하게 KPX에 바로 제출됩니다. 신중히 확인하세요.
      </div>
      <div id="imm-preview" style="background:var(--semantic-background-2);border:1px solid var(--semantic-line-alt);border-radius:6px;padding:10px 14px;margin-bottom:14px;font-size:12px;line-height:22px">
        <div style="display:flex;justify-content:space-between"><span style="color:var(--semantic-label-alt)">차수</span><b id="imm-prev-round">--</b></div>
        <div style="display:flex;justify-content:space-between"><span style="color:var(--semantic-label-alt)">대상 자원</span><b id="imm-prev-count">--</b></div>
        <div style="display:flex;justify-content:space-between"><span style="color:var(--semantic-label-alt)">합계 입찰량</span><b id="imm-prev-qty">--</b></div>
        <div style="display:flex;justify-content:space-between"><span style="color:var(--semantic-label-alt)">평균 입찰가</span><b id="imm-prev-price">--</b></div>
      </div>
      <div class="form-item">
        <label>입찰을 계속 진행하시려면 <b style="color:var(--semantic-brand-primary)">[즉시입찰]</b>을 입력해주세요.</label>
        <input class="inp" placeholder="즉시입찰" id="confirm-imm" oninput="chkImm(this.value)">
      </div>
    </div>
    <div class="modal-footer">
      <button class="cb n" onclick="closeModal('modal-immediate-bid')">취소</button>
      <button class="cb p" id="btn-imm" disabled onclick="toast('즉시입찰이 제출되었습니다.');closeModal('modal-immediate-bid');document.getElementById('confirm-imm').value=''">즉시입찰</button>
    </div>
  </div>
</div>

`;
window.bidDaMainApply=function(){
  const vpp=document.getElementById('bdm-vpp')?.value||'전체';
  const type=document.getElementById('bdm-type')?.value||'all';
  // 입찰 내역 탭 (VPP 기준)
  document.querySelectorAll('#da-recent-tbody tr').forEach(tr=>{
    let show=true;
    if(vpp!=='전체' && tr.dataset.vpp!==vpp) show=false;
    tr.style.display=show?'':'none';
  });
  // 금일 입찰 도표 (VPP + 자원유형 보기 필터)
  document.querySelectorAll('.da-bid-row').forEach(tr=>{
    let show=true;
    if(vpp!=='전체' && tr.dataset.vpp!==vpp) show=false;
    if(type!=='all' && tr.dataset.type!==type) show=false;
    tr.style.display=show?'':'none';
  });
  // 예측 현황 자원별 테이블 (VPP + 자원유형)
  document.querySelectorAll('.da-fcst-row').forEach(tr=>{
    let show=true;
    if(vpp!=='전체' && tr.dataset.vpp!==vpp) show=false;
    if(type!=='all' && tr.dataset.type!==type) show=false;
    tr.style.display=show?'':'none';
  });
};
window['I_bidDA-main']=function(){
  const list=document.getElementById('bid-sch-list');
  if(list && !list.dataset.init){
    list.dataset.init='1';
    ['09:00-1','09:55-1','10:00-1','13:50-1','14:00-2','16:00-2','16:55-2','19:50-2'].forEach(s=>{
      const [t,r]=s.split('-');
      window.addBidSchedule(t,r);
    });
  }
  if(!window._bidMode) window._bidMode='auto';
  if(!window._daRound) window._daRound=1;
  if(!window._daSettings){
    window._daSettings={resources:[
      '광양항태양광 01단계','광양항태양광 04단계','해맞이 태양광','온누리 태양광','금능1호 태양광',
      '김주풍력 01단계','김주풍력 02단계','금능1호 ESS','제주 ESS허브',
      '순천 바이오가스','여수 바이오매스','광주 V2G 스테이션','전남 V2G 허브'
    ].map(n=>({name:n,enabled:true}))};
  }
  if(typeof window.updateBidModeUI==='function') window.updateBidModeUI();
  if(typeof window.applyDaSettings==='function') window.applyDaSettings();
  if(typeof window._initForecastMockup==='function') window._initForecastMockup();
  if(typeof window.startDaCountdown==='function') window.startDaCountdown();
  if(typeof window.syncDaChips==='function') window.syncDaChips();
  if(typeof window.updateDaResCount==='function') window.updateDaResCount();
};
window.selRound=function(n,el){
  // 기존 .rd-tab 버튼 호환 (다른 페이지에서 사용 중이면 유지) + select 호출(el null) 모두 지원
  if(el){
    document.querySelectorAll('.rd-tab').forEach(e=>e.classList.remove('active'));
    el.classList.add('active');
  }
  // select 동기화
  var sel=document.getElementById('bdm-round');
  if(sel && parseInt(sel.value,10)!==n) sel.value=String(n);
  window._daRound=n;
  const Q=id=>document.getElementById(id);
  const isManual=(window._bidMode==='manual');
  if(n==1){
    if(Q('k-deadline'))Q('k-deadline').textContent='11:00';
    if(Q('k-won'))Q('k-won').innerHTML='145.2<span class="ku">MW</span>';
    if(Q('k-deadline-msg'))Q('k-deadline-msg').textContent=isManual?' · 1차 운영자 제출 필요':' · 1차 KPX 자동전송';
  } else {
    if(Q('k-deadline'))Q('k-deadline').textContent='15:00';
    if(Q('k-won'))Q('k-won').innerHTML='142.7<span class="ku">MW</span>';
    if(Q('k-deadline-msg'))Q('k-deadline-msg').textContent=isManual?' · 2차 운영자 제출 필요':' · 2차 KPX 자동전송';
  }
  if(typeof window.updateBidModeUI==='function') window.updateBidModeUI();
  if(typeof window.startDaCountdown==='function') window.startDaCountdown();
};
window.applyBidMode=function(){
  const sel=document.querySelector('input[name="bid-mode"]:checked');
  window._bidMode=sel?sel.value:'auto';
  window._daSubmitted=false;
  window._daSettings={
    resources: Array.from(document.querySelectorAll('.da-res-toggle')).map(el=>({name:el.dataset.resource,enabled:el.checked}))
  };
  if(typeof window._daSyncScheduleFromDom==='function') window._daSyncScheduleFromDom();
  window.updateBidModeUI();
  window.applyDaSettings();
  const enabled=window._daSettings.resources.filter(r=>r.enabled).length;
  const total=window._daSettings.resources.length;
  const modeTxt=window._bidMode==='manual'?'수동':'자동';
  toast('입찰 설정 저장 — '+modeTxt+' · '+enabled+'/'+total+'개 자원 활성');
  closeModal('modal-bid-settings');
};
window.applyDaSettings=function(){
  const s=window._daSettings;
  if(!s) return;
  const enabledSet=new Set(s.resources.filter(r=>r.enabled).map(r=>r.name));
  document.querySelectorAll('.da-bid-row').forEach(tr=>{
    const name=tr.dataset.resource;
    if(!name) return;
    const active=enabledSet.has(name);
    tr.style.opacity=active?'':'0.4';
    if(!active){
      const cell=tr.querySelector('.da-status-cell');
      if(cell) cell.innerHTML='<span class="badge off">제외</span>';
    }
  });
};
window.toggleDaChip=function(filter){
  if(filter==='all'){
    const allChip=document.querySelector('.da-chip[data-filter="all"]');
    const wasActive=!!(allChip && allChip.classList.contains('p'));
    const next=!wasActive;
    document.querySelectorAll('.da-chip').forEach(c=>{ c.className='cb '+(next?'p':'n')+' sm da-chip'; });
    document.querySelectorAll('.da-res-toggle').forEach(t=>{ t.checked=next; });
  } else {
    const chip=document.querySelector('.da-chip[data-filter="'+filter+'"]');
    if(!chip) return;
    const wasActive=chip.classList.contains('p');
    const next=!wasActive;
    chip.className='cb '+(next?'p':'n')+' sm da-chip';
    document.querySelectorAll('.da-res-toggle').forEach(t=>{
      const row=t.closest('div');
      const badge=row?row.querySelector('.badge'):null;
      const type=badge?badge.textContent.trim():'';
      if(type===filter) t.checked=next;
    });
  }
  if(typeof window.syncDaChips==='function') window.syncDaChips();
  if(typeof window.updateDaResCount==='function') window.updateDaResCount();
};
window.syncDaChips=function(){
  const types=['태양광','풍력','ESS','바이오','V2G'];
  types.forEach(type=>{
    let anyOn=false;
    document.querySelectorAll('.da-res-toggle').forEach(t=>{
      const row=t.closest('div');
      const badge=row?row.querySelector('.badge'):null;
      const tt=badge?badge.textContent.trim():'';
      if(tt===type && t.checked) anyOn=true;
    });
    const chip=document.querySelector('.da-chip[data-filter="'+type+'"]');
    if(chip) chip.className='cb '+(anyOn?'p':'n')+' sm da-chip';
  });
  const typeChips=document.querySelectorAll('.da-chip[data-filter]:not([data-filter="all"])');
  const allActive=Array.from(typeChips).every(c=>c.classList.contains('p'));
  const allChip=document.querySelector('.da-chip[data-filter="all"]');
  if(allChip) allChip.className='cb '+(allActive?'p':'n')+' sm da-chip';
};
window.updateDaResCount=function(){
  const total=document.querySelectorAll('.da-res-toggle').length;
  const checked=document.querySelectorAll('.da-res-toggle:checked').length;
  const el=document.getElementById('da-res-count');
  if(el){
    el.textContent=checked+'/'+total+' 활성';
    el.style.color = (checked===0) ? 'var(--semantic-negative-normal)' : '';
  }
  const apply=document.getElementById('btn-apply-da');
  if(apply){
    const off=(checked===0);
    apply.disabled=off;
    apply.style.opacity=off?'0.4':'';
    apply.style.cursor=off?'not-allowed':'';
    apply.style.pointerEvents=off?'none':'';
    apply.title=off?'참여 자원을 1개 이상 선택해야 적용할 수 있습니다':'';
  }
};
window.updateBidModeUI=function(){
  const mode=window._bidMode||'auto';
  const isManual=mode==='manual';
  const round=window._daRound||1;
  const Q=id=>document.getElementById(id);
  // Mode badge
  const badge=Q('bid-mode-badge');
  if(badge){
    badge.textContent=isManual?'수동입찰 모드':'자동입찰 모드';
    badge.className='badge '+(isManual?'warn':'ok');
  }
  // Submit button
  const btn=Q('btn-submit-da');
  if(btn){
    btn.style.display=isManual?'':'none';
    btn.disabled=!!window._daSubmitted;
    btn.textContent=window._daSubmitted?'제출 완료':'KPX 제출';
  }
  // Meta + deadline sub message (카운트다운 DOM은 보존, 메시지 자식만 갱신)
  const meta=Q('tbl-meta');
  const dmsg=Q('k-deadline-msg');
  if(isManual){
    if(meta){
      meta.textContent=window._daSubmitted
        ?(round==1?'1차 수동 · 제출 완료':'2차 수동 · 제출 완료')
        :(round==1?'1차 수동 · 제출 미완료':'2차 수동 · 제출 예정');
      meta.style.color=window._daSubmitted?'':'var(--palette-yellow-40)';
    }
    if(dmsg) dmsg.textContent=window._daSubmitted?' · 제출 완료 · KPX 응답 대기':(round==1?' · 1차 운영자 제출 필요':' · 2차 운영자 제출 필요');
  } else {
    if(meta){
      meta.textContent=round==1?'1차 자동 · KPX 자동전송':'2차 자동 · KPX 자동전송';
      meta.style.color='';
    }
    if(dmsg) dmsg.textContent=round==1?' · 1차 KPX 자동전송':' · 2차 KPX 자동전송';
  }
  // Timeline labels (compact)
  const d1d=Q('tl-da1-desc'),d1b=Q('tl-da1-badge'),d2d=Q('tl-da2-desc'),d2b=Q('tl-da2-badge');
  if(isManual){
    if(d1d) d1d.textContent='운영자 제출';
    if(d1b){ d1b.textContent=window._daSubmitted&&round==1?'제출 완료':'제출 필요'; d1b.className='badge '+(window._daSubmitted&&round==1?'ok':'warn'); d1b.style.fontSize='10px'; }
    if(d2d) d2d.textContent='운영자 제출';
    if(d2b){ d2b.textContent=window._daSubmitted&&round==2?'제출 완료':'대기'; d2b.className='badge '+(window._daSubmitted&&round==2?'ok':'off'); d2b.style.fontSize='10px'; }
  } else {
    if(d1d) d1d.textContent='자동 제출';
    if(d1b){ d1b.textContent='진행중'; d1b.className='badge warn'; d1b.style.fontSize='10px'; }
    if(d2d) d2d.textContent='자동 제출';
    if(d2b){ d2b.textContent='대기'; d2b.className='badge off'; d2b.style.fontSize='10px'; }
  }
  // Bid table status column
  document.querySelectorAll('.da-status-cell').forEach(c=>{
    if(isManual && !window._daSubmitted){
      c.innerHTML='<span class="badge warn">검토 대기</span>';
    } else if(isManual && window._daSubmitted){
      c.innerHTML='<span class="badge inf">제출 완료</span>';
    } else {
      c.innerHTML='<span class="badge ok">낙찰</span>';
    }
  });
  // 수동모드 경고 배너 (제출 전에만 노출)
  const warn=document.getElementById('manual-submit-warning');
  if(warn) warn.style.display=(isManual && !window._daSubmitted)?'':'none';
};
window.submitDaBid=function(){
  const round=window._daRound||1;
  // 마감 시간 가드 (Hard Block)
  const ms=window._daMsUntilDeadline(round);
  if(ms<=0){
    toast((round===1?'1차':'2차')+' 마감되어 제출할 수 없습니다.','err');
    return;
  }
  const cells=document.querySelectorAll('.da-bid-qty[data-round="'+round+'"]');
  let total=0,count=0;
  cells.forEach(c=>{
    const tr=c.closest('tr');
    if(tr && (tr.style.display==='none' || tr.style.opacity==='0.4')) return;
    const v=parseFloat(c.textContent.replace('MW','').trim());
    if(!isNaN(v)){ total+=v; count++; }
  });
  if(!confirm((round==1?'1차':'2차')+' 입찰을 KPX로 제출하시겠습니까?\n총 '+count+'개 자원 · 합계 '+total.toFixed(2)+' MW')) return;
  window._daSubmitted=true;
  window.updateBidModeUI();
  window.applyDaSettings();
  toast('KPX '+(round==1?'1차':'2차')+' 입찰이 제출되었습니다.');
};
window.daToggleEdit=function(){
  const editBtn=document.getElementById('btn-da-edit');
  const cancelBtn=document.getElementById('btn-da-cancel');
  const submitBtn=document.getElementById('btn-submit-da');
  if(!window._daEditMode){
    // 마감 시간 가드 (Hard Block) — 진입 시점에만 검증, 저장은 항상 허용
    const round=window._daRound||1;
    const ms=window._daMsUntilDeadline(round);
    if(ms<=0){
      toast((round===1?'1차':'2차')+' 마감되어 수정할 수 없습니다.','warn');
      return;
    }
    // Enter edit mode
    document.querySelectorAll('.da-bid-qty').forEach(td=>{
      const v=td.textContent.replace('MW','').trim();
      td.dataset.orig=v;
      td.innerHTML='<input type="number" step="0.01" min="0" class="inp" style="width:72px;height:28px;font-size:12px;text-align:right;padding:2px 6px" value="'+v+'">';
    });
    document.querySelectorAll('.da-bid-price').forEach(td=>{
      const v=td.textContent.trim();
      td.dataset.orig=v;
      td.innerHTML='<input type="number" step="1" min="0" class="inp" style="width:72px;height:28px;font-size:12px;text-align:right;padding:2px 6px" value="'+v+'">';
    });
    window._daEditMode=true;
    if(editBtn){editBtn.textContent='저장';editBtn.className='cb p sm';}
    if(cancelBtn) cancelBtn.style.display='';
    if(submitBtn) submitBtn.disabled=true;
    toast('입찰량·입찰가를 수정하고 저장을 누르세요.');
  } else {
    // Save
    let changed=0;
    document.querySelectorAll('.da-bid-qty').forEach(td=>{
      const inp=td.querySelector('input');
      const v=inp?inp.value:td.dataset.orig;
      if(v!==td.dataset.orig) changed++;
      td.innerHTML=v+'MW';
      delete td.dataset.orig;
    });
    document.querySelectorAll('.da-bid-price').forEach(td=>{
      const inp=td.querySelector('input');
      const v=inp?inp.value:td.dataset.orig;
      if(v!==td.dataset.orig) changed++;
      td.innerHTML=v;
      delete td.dataset.orig;
    });
    window._daEditMode=false;
    if(editBtn){editBtn.textContent='수정';editBtn.className='cb n sm';}
    if(cancelBtn) cancelBtn.style.display='none';
    if(submitBtn) submitBtn.disabled=false;
    toast(changed>0?changed+'개 항목이 수정되었습니다.':'변경사항이 없습니다.');
  }
};
window.toggleDaModelMode=function(){
  const sel=document.querySelector('input[name="model-mode"]:checked');
  const v=sel?sel.value:'per-gen';
  const perGen=document.getElementById('da-model-per-gen-section');
  const latest=document.getElementById('da-model-latest-info');
  if(perGen) perGen.style.display=(v==='per-gen')?'':'none';
  if(latest) latest.style.display=(v==='latest')?'':'none';
};
window.refreshBidHistory=function(){
  const el=document.getElementById('bid-refresh-time');
  if(el){
    const d=new Date();
    el.textContent=d.toTimeString().slice(0,8);
  }
  toast('입찰이력을 새로고침했습니다.');
};
window.daCancelEdit=function(){
  document.querySelectorAll('.da-bid-qty').forEach(td=>{
    if(td.dataset.orig!==undefined){td.innerHTML=td.dataset.orig+'MW';delete td.dataset.orig;}
  });
  document.querySelectorAll('.da-bid-price').forEach(td=>{
    if(td.dataset.orig!==undefined){td.innerHTML=td.dataset.orig;delete td.dataset.orig;}
  });
  window._daEditMode=false;
  const editBtn=document.getElementById('btn-da-edit');
  const cancelBtn=document.getElementById('btn-da-cancel');
  const submitBtn=document.getElementById('btn-submit-da');
  if(editBtn){editBtn.textContent='수정';editBtn.className='cb n sm';}
  if(cancelBtn) cancelBtn.style.display='none';
  if(submitBtn) submitBtn.disabled=false;
  toast('수정이 취소되었습니다.');
};
window.pgTab=function(el,k){
  document.querySelectorAll('.pg-tab').forEach(e=>e.classList.remove('active'));
  el.classList.add('active');
  ['today','forecast','history'].forEach(v=>{
    const d=document.getElementById('pg-view-'+v);
    if(d)d.style.display=(v===k?'':'none');
  });
  // 예측 현황 탭 선택 시 비교 차트 지연 초기화
  if(k==='forecast'){
    setTimeout(()=>{
      const h=Array.from({length:24},(_,i)=>i+'h');
      const frc=[0,0,0,0,0,0.1,1.5,3.8,6.8,9.2,10.5,11.0,10.9,10.4,9.8,10.0,9.3,7.8,5.2,2.6,0.8,0.1,0,0];
      const act=[0,0,0,0,0,0.05,1.3,3.5,6.5,8.9,10.1,10.7,10.8,10.1,9.5,9.7,9.0,7.5,4.9,2.4,0.7,0.05,0,0];
      mkChart('c-forecast-compare','line',h,[
        {label:'예측(1차)',data:frc,borderColor:'rgba(120,120,120,0.6)',borderWidth:1.5,pointRadius:0,tension:0.4,borderDash:[4,2],fill:false},
        {label:'실측(누적)',data:act,borderColor:'#0059ff',borderWidth:2,pointRadius:0,tension:0.4,fill:true,backgroundColor:'rgba(0,89,255,0.08)'},
      ],{plugins:{legend:{display:true,position:'bottom',labels:{font:{size:11},boxWidth:10,padding:8}}},scales:{y:{title:{display:true,text:'MW',color:'#666',font:{size:10}}}}});
    },50);
  }
};
window.addBidSchedule=function(t,r){
  const list=document.getElementById('bid-sch-list');
  if(!list)return;
  const idx=Date.now()+Math.floor(Math.random()*1000);
  const row=document.createElement('div');
  row.style.cssText='display:grid;grid-template-columns:140px 1fr 40px;gap:10px;align-items:center';
  row.innerHTML=`<input class="inp" type="time" value="${t||'10:00'}" style="height:34px">
    <div style="display:flex;gap:16px;align-items:center">
      <label style="display:flex;align-items:center;gap:4px;font-size:13px;cursor:pointer"><input type="radio" name="sch-${idx}" ${(!r||r==='1')?'checked':''}> 1차</label>
      <label style="display:flex;align-items:center;gap:4px;font-size:13px;cursor:pointer"><input type="radio" name="sch-${idx}" ${r==='2'?'checked':''}> 2차</label>
    </div>
    <button class="cb n sm" style="min-width:34px;padding:0;color:var(--semantic-negative-normal)" onclick="this.parentElement.remove()">✕</button>`;
  list.appendChild(row);
};
window.chkImm=function(v){
  const b=document.getElementById('btn-imm');
  if(b)b.disabled=(v!=='즉시입찰');
};
window.openImmBid=function(){
  const round=window._daRound||1;
  const qtyCells=document.querySelectorAll('.da-bid-qty[data-round="'+round+'"]');
  const priceCells=document.querySelectorAll('.da-bid-price[data-round="'+round+'"]');
  let totalQty=0, count=0, totalPrice=0, priceCount=0;
  qtyCells.forEach(c=>{
    const tr=c.closest('tr');
    if(tr && (tr.style.display==='none' || tr.style.opacity==='0.4')) return;
    const v=parseFloat(c.textContent.replace('MW','').trim());
    if(!isNaN(v)){ totalQty+=v; count++; }
  });
  priceCells.forEach(c=>{
    const tr=c.closest('tr');
    if(tr && (tr.style.display==='none' || tr.style.opacity==='0.4')) return;
    const v=parseFloat(c.textContent.trim());
    if(!isNaN(v)){ totalPrice+=v; priceCount++; }
  });
  const Q=id=>document.getElementById(id);
  if(Q('imm-prev-round')) Q('imm-prev-round').textContent = (round===1?'1차':'2차');
  if(Q('imm-prev-count')) Q('imm-prev-count').textContent = count + '개 자원';
  if(Q('imm-prev-qty')) Q('imm-prev-qty').textContent = totalQty.toFixed(2) + ' MW';
  if(Q('imm-prev-price')) Q('imm-prev-price').textContent = priceCount>0 ? Math.round(totalPrice/priceCount) + ' 원' : '--';
  openModal('modal-immediate-bid');
};

