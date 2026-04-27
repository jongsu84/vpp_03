// AUTO-GENERATED FROM index.html — page module: bidDA-main
window.P = window.P || {};
/* ================================================================
   전략입찰 v2 — 상위 하루전(DA) / 실시간(RT) 분리 구조
   정책 출처: [AI-VPP] 기능명세서 v0.3 · '3) 전력시장 입찰 운영 정책'
   ================================================================ */

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
  return `<div class="card mb" style="display:flex;gap:20px;align-items:center;padding:12px 16px;margin-bottom:12px;flex-wrap:wrap">
    <div style="display:flex;align-items:center;gap:8px">
      <span class="flabel">VPP 그룹</span>
      <select class="sel" style="min-width:130px;max-width:160px;height:32px;font-size:13px"><option>VPP-전남권</option><option>VPP-제주권</option><option>VPP-경북권</option></select>
    </div>
    ${(function(){const gId='ms_gen_bf_'+(++window._msIdCnt);return `
    <div style="display:flex;align-items:center;gap:8px">
      <span class="flabel">자원 유형</span>
      ${_mkResMulti(showGen?gId:null)}
    </div>
    ${showGen?`<div style="display:flex;align-items:center;gap:8px">
      <span class="flabel">발전기</span>
      ${_mkGenMulti(gId)}
    </div>`:''}`;})()}
    ${rightInfo?`<span style="margin-left:auto;color:var(--semantic-label-alt);font-size:12px">${rightInfo}</span>`:''}
  </div>`;
};

/* ===== 하루전입찰: 입찰 운영 (D-1 11:00) ===== */
window.P['bidDA-main']=()=>`
${_mkCross('bidDA-main')}

<!-- 필터바 (VPP 그룹 · 자원 유형 · 발전기 · 차수 탭) -->
<div class="card mb" style="display:flex;gap:20px;align-items:center;padding:12px 16px;margin-bottom:12px;flex-wrap:wrap">
  <div style="display:flex;align-items:center;gap:8px">
    <span class="flabel">VPP 그룹</span>
    <select class="sel" style="min-width:130px;max-width:160px;height:32px;font-size:13px">
      <option>VPP-전남권</option><option>VPP-제주권</option><option>VPP-경북권</option>
    </select>
  </div>
  ${(function(){const gId='ms_gen_bdm_'+(++window._msIdCnt);return `
  <div style="display:flex;align-items:center;gap:8px">
    <span class="flabel">자원 유형</span>
    ${_mkResMulti(gId)}
  </div>
  <div style="display:flex;align-items:center;gap:8px">
    <span class="flabel">발전기</span>
    ${_mkGenMulti(gId)}
  </div>`;})()}
  <div style="display:flex;align-items:center;gap:8px">
    <span class="flabel">차수</span>
    <div style="display:inline-flex;background:var(--semantic-background-3);padding:3px;border-radius:6px;gap:2px">
      <button class="rd-tab active" onclick="selRound(1,this)">1차</button>
      <button class="rd-tab" onclick="selRound(2,this)">2차</button>
    </div>
  </div>
  <span style="margin-left:auto;color:var(--semantic-label-alt);font-size:12px" id="bidda-round-info">1차 마감 11:00 · 익일 00~24시 선입찰</span>
</div>

<!-- 페이지 탭 -->
<div style="display:flex;gap:24px;margin-bottom:16px;border-bottom:1px solid var(--semantic-line-normal)">
  <div class="pg-tab active" onclick="pgTab(this,'today')">금일 입찰</div>
  <div class="pg-tab" onclick="pgTab(this,'forecast')">예측 현황</div>
  <div class="pg-tab" onclick="pgTab(this,'history')">입찰 내역</div>
</div>

<!-- 액션 버튼 바 (공통) -->
<div style="display:flex;gap:8px;margin-bottom:16px;justify-content:flex-end;flex-wrap:wrap">
  <button class="cb n sm" onclick="openModal('modal-bid-settings')">입찰설정</button>
  <button class="cb n sm" onclick="openModal('modal-model-settings')">예측모델 설정</button>
  <button class="cb n sm" onclick="toast('입찰 이력을 새로고침했습니다.')">입찰이력 새로고침</button>
  <button class="cb p sm" onclick="openModal('modal-immediate-bid')">즉시입찰</button>
</div>

<!-- ========== VIEW 1: 금일 입찰 ========== -->
<div id="pg-view-today">
  <div class="g4">
    <div class="card acc"><div class="ct">다음 마감 ${window.tip('다음 입찰 마감 시각','KPX 하루전 시장 입찰 제출 마감까지 남은 시간','1차: 매일 11:00 / 2차: 매일 17:00 (KPX 고시)','마감 5분 전 알람 발송 — 자동 제출 또는 수동 검토 후 제출')}</div><div class="kv" id="k-deadline">11:00</div><div class="kd neu" id="k-deadline-sub">남은 42분 · 1차 KPX 자동전송</div></div>
    <div class="card"><div class="ct">차수별 낙찰용량 ${window.tip('차수별 낙찰용량','선택한 차수(1차/2차)에서 낙찰된 시간대별 평균 입찰량','Σ(시간대별 낙찰 MWh) ÷ 24 [MW]','입찰량 대비 낙찰률 = 낙찰용량 ÷ 제출용량 × 100')}</div><div class="kv" id="k-won">145.2<span class="ku">MW</span></div><div class="kd up">낙찰가 평균 122원</div></div>
    <div class="card"><div class="ct">예측 상태 ${window.tip('예측 상태','입찰에 사용된 예측 모델의 실행 상태','완료: 모든 시간대 예측 OK / 진행: 일부 누락 / 오류: 모델 실패','오류 시 fallback 모델(persistence) 자동 적용 — 정확도 ~30% 하락')}</div><div class="kv" style="color:var(--semantic-positive-normal)">완료</div><div class="kd up">NMAE 6.8% · 정상</div></div>
    <div class="card"><div class="ct">예상 MEP ${window.tip('예상 MEP (Market Expected Profit)','현재 입찰 조건으로 예상되는 시장 수익','Σ(낙찰량 × 시간대별 SMP) [백만원]','확정 정산은 익일 06:00 KPX 발표 — ±5% 변동 가능')}</div><div class="kv">17.7<span class="ku">백만원</span></div><div class="kd neu">하루전 SMP 기준</div></div>
  </div>
  <div class="card mb"><div class="sh"><div class="st">D-1 자동화 타임라인 (1차 / 2차 통합)</div><span class="kpi-pill">매일 반복</span></div>
    <div style="font-size:12px;color:var(--semantic-brand-primary);margin-bottom:10px;font-weight:600">1차 — 익일 00~12시 발전예측량</div>
    <div class="al"><div class="ad" style="background:var(--semantic-positive-normal)"></div><div class="am"><b>09:00</b> — 기상 예보 수집 · 1차 예측값 생성</div><div class="at">완료 · 4분 11초</div></div>
    <div class="al"><div class="ad" style="background:var(--semantic-positive-normal)"></div><div class="am"><b>10:00</b> — 최종 검토 및 값 확정 (예측 vs 변동비 교차검증)</div><div class="at">완료</div></div>
    <div class="al"><div class="ad" style="background:var(--palette-yellow-40)"></div><div class="am"><b>11:00</b> — KPX 1차 자동 제출</div><div class="at">진행중</div></div>
    <div style="font-size:12px;color:var(--semantic-brand-primary);margin:16px 0 10px;font-weight:600">2차 — 익일 12~24시 발전예측량 재조정</div>
    <div class="al"><div class="ad" style="background:var(--semantic-line-strong)"></div><div class="am"><b>14:00</b> — 초단기 기상예보 재수집 · 2차 예측값 생성</div><div class="at">대기</div></div>
    <div class="al"><div class="ad" style="background:var(--semantic-line-strong)"></div><div class="am"><b>14:30</b> — 2차 최종 검토 및 값 확정</div><div class="at">대기</div></div>
    <div class="al"><div class="ad" style="background:var(--semantic-line-strong)"></div><div class="am"><b>15:00</b> — KPX 2차 자동 제출</div><div class="at">대기</div></div>
  </div>
  <div class="card mb">
    <div class="sh">
      <div class="st">금일 입찰 도표 · <span id="tbl-round">1차</span></div>
      <div style="display:flex;gap:10px;align-items:center">
        <span style="font-size:12px;color:var(--semantic-label-alt)" id="tbl-meta">1차 자동 · 2026-04-23 09:57 · 2회 입찰</span>
        <button class="cb n sm" onclick="toast('입찰 도표 편집 모드로 전환합니다.')">수정</button>
      </div>
    </div>
    <div style="overflow-x:auto">
    <table class="tbl">
      <thead><tr>
        <th>순번</th><th>회원사명</th><th>자원명</th><th>발전기 명</th>
        <th>CBP번호</th><th>발전원</th><th>지역</th>
        <th>설비용량</th><th>입찰량</th><th>입찰가(원)</th><th>상태</th>
      </tr></thead>
      <tbody>
      ${[
        ['광양항태양광','fgsl021','광양항태양광 01단계','1201','태양광','전남',2.29,2.18,115,'낙찰'],
        ['광양항4단계','fgsl022','광양항태양광 04단계','1203','태양광','전남',2.20,2.09,115,'낙찰'],
        ['해맞이','fgsl023','해맞이 태양광','1205','태양광','전남',1.00,0.95,120,'낙찰'],
        ['온누리','fgsl024','온누리 태양광','1207','태양광','전남',1.00,0.94,120,'낙찰'],
        ['금능1호','fgsl031','금능1호 태양광','1301','태양광','제주',0.98,0.88,100,'낙찰'],
        ['김주풍력','fgwp013','김주풍력 01단계','1598','풍력','경북',4.00,3.80,95,'낙찰'],
        ['김주풍력','fgwp014','김주풍력 02단계','1603','풍력','경북',10.00,9.50,98,'낙찰'],
        ['금능에너지','fges011','금능1호 ESS','8386','ESS','제주',2.00,1.80,105,'낙찰'],
        ['제주ESS','fges012','제주 ESS허브','8412','ESS','제주',5.00,4.70,108,'낙찰'],
        ['순천바이오','fgbio01','순천 바이오가스','2104','바이오','전남',1.50,1.42,135,'낙찰'],
        ['여수바이오','fgbio02','여수 바이오매스','2106','바이오','전남',3.00,2.85,140,'낙찰'],
        ['광주V2G','fgv2g01','광주 V2G 스테이션','3201','V2G','전남',0.80,0.72,130,'낙찰'],
        ['전남V2G','fgv2g02','전남 V2G 허브','3203','V2G','전남',1.50,1.35,128,'낙찰'],
      ].map((r,i)=>`<tr><td class="mono">${i+1}</td><td>${r[0]}</td><td class="mono">${r[1]}</td><td>${r[2]}</td><td class="mono">${r[3]}</td><td>${r[4]}</td><td>${r[5]}</td><td class="mono">${r[6]}MW</td><td class="mono" style="color:var(--semantic-brand-primary)">${r[7]}MW</td><td class="mono">${r[8]}</td><td><span class="badge ${r[9]==='낙찰'?'ok':'off'}">${r[9]}</span></td></tr>`).join('')}
      </tbody>
    </table>
    </div>
  </div>
  <div class="card"><div class="sh"><div class="st">시간대별 입찰량 곡선 (보조 뷰)</div><span class="sa" onclick="activate('bidDA-price')">가격 전략 ↗</span></div>
    <div style="height:170px;position:relative"><canvas id="c-bidcurve" role="img" aria-label="시간대별 입찰량"></canvas></div>
  </div>
</div>

<!-- ========== VIEW 2: 예측 현황 ========== -->
<div id="pg-view-forecast" style="display:none">
  <div class="g4">
    <div class="card acc"><div class="ct">1차 예측 상태</div><div class="kv" style="color:var(--semantic-positive-normal)">완료</div><div class="kd up">성공 6/6 · NMAE 6.8%</div></div>
    <div class="card"><div class="ct">2차 예측 상태</div><div class="kv" style="color:var(--semantic-label-alt)">대기</div><div class="kd neu">14:00 생성 예정</div></div>
    <div class="card"><div class="ct">Fail-Safe 발동</div><div class="kv">0<span class="ku">회</span></div><div class="kd up">금일 / 월누적 1회</div></div>
    <div class="card"><div class="ct">정확도 Top 자원</div><div class="kv">광양항태양광</div><div class="kd up">NMAE 4.2%</div></div>
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
      ['광양항태양광 01단계','태양광',14.2,'4.2%','-','-','nwp-e_v3','성공',''],
      ['광양항태양광 04단계','태양광',13.6,'5.1%','-','-','nwp-e_v3','성공',''],
      ['해맞이 태양광','태양광',6.1,'6.8%','-','-','nwp-e_v2','성공',''],
      ['온누리 태양광','태양광',5.9,'7.4%','-','-','nwp-e_v2','성공',''],
      ['금능1호 태양광','태양광',5.2,'11.2%','-','-','nwp-e_v2','주의',''],
      ['김주풍력 01단계','풍력',24.8,'9.1%','-','-','ecmwf-ifs','성공',''],
    ].map(r=>{
      const st=r[7]==='성공'?'ok':(r[7]==='주의'?'warn':'err');
      return `<tr><td>${r[0]}</td><td>${r[1]}</td><td class="mono">${r[2]}</td><td class="mono" style="color:${r[3]==='-'?'var(--semantic-label-alt)':(parseFloat(r[3])<7?'var(--semantic-positive-normal)':(parseFloat(r[3])<10?'var(--palette-yellow-40)':'var(--semantic-negative-normal)'))}">${r[3]}</td><td class="mono" style="color:var(--semantic-label-alt)">${r[4]}</td><td class="mono" style="color:var(--semantic-label-alt)">${r[5]}</td><td class="mono" style="font-size:12px">${r[6]}</td><td><span class="badge ${st}">${r[7]}</span></td><td class="mono" style="font-size:12px;color:var(--semantic-label-alt)">${r[8]||'-'}</td></tr>`;
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
    <div class="card acc"><div class="ct">최근 7일 제출</div><div class="kv">14<span class="ku">회</span></div><div class="kd up">1차 7 / 2차 7</div></div>
    <div class="card"><div class="ct">평균 낙찰률</div><div class="kv" style="color:var(--semantic-positive-normal)">93<span class="ku">%</span></div><div class="kd up">▲ +2.1%p 전주</div></div>
    <div class="card"><div class="ct">누적 DAES</div><div class="kv">128.4<span class="ku">백만원</span></div><div class="kd up">7일 누계</div></div>
    <div class="card"><div class="ct">평균 NMAE</div><div class="kv">6.9<span class="ku">%</span></div><div class="kd up">목표 8% 내</div></div>
  </div>
  <div class="card"><div class="sh"><div class="st">최근 입찰 내역</div>${window.csvBtn('da-recent-tbody','da_recent_bids','최근 입찰 내역')}</div>
  <div style="overflow-x:auto">
  <table class="tbl">
    <thead><tr><th>제출일시</th><th>차수</th><th>VPP 그룹</th><th>입찰용량</th><th>낙찰용량</th><th>낙찰률</th><th>평균가(원)</th><th>DAES</th><th>상태</th></tr></thead>
    <tbody id="da-recent-tbody">
    ${[
      ['2026-04-22 15:00','2차','VPP-전남권',142.7,138.5,97,128,'+18,240K','제출완료'],
      ['2026-04-22 11:00','1차','VPP-전남권',145.2,140.1,97,122,'+17,900K','제출완료'],
      ['2026-04-21 15:00','2차','VPP-전남권',141.8,132.4,93,130,'+17,560K','제출완료'],
      ['2026-04-21 11:00','1차','VPP-전남권',144.5,135.8,94,120,'+17,080K','제출완료'],
      ['2026-04-20 15:00','2차','VPP-전남권',143.2,128.9,90,132,'+17,310K','제출완료'],
      ['2026-04-20 11:00','1차','VPP-전남권',146.8,139.5,95,118,'+17,445K','제출완료'],
      ['2026-04-19 15:00','2차','VPP-전남권',140.1,126.3,90,135,'+17,120K','제출완료'],
    ].map(r=>`<tr><td class="mono">${r[0]}</td><td><span class="badge ${r[1]==='1차'?'inf':''}" ${r[1]==='2차'?'style="background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow)"':''}>${r[1]}</span></td><td>${r[2]}</td><td class="mono">${r[3]}MW</td><td class="mono" style="color:var(--semantic-brand-primary)">${r[4]}MW</td><td class="mono">${r[5]}%</td><td class="mono">${r[6]}</td><td class="mono" style="color:var(--semantic-positive-normal)">${r[7]}</td><td><span class="badge ok">${r[8]}</span></td></tr>`).join('')}
    </tbody>
  </table>
  </div>
  </div>
</div>

<!-- ============ 모달 ① 입찰설정 ============ -->
<div class="modal-backdrop" id="modal-bid-settings" style="display:none" onclick="closeModalBg(event,'modal-bid-settings')">
  <div class="modal">
    <div class="modal-hdr">
      <span class="modal-title">입찰 설정</span>
      <button class="modal-close" onclick="closeModal('modal-bid-settings')">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-section">입찰 모드</div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px">
        <label style="display:flex;align-items:center;gap:10px;cursor:pointer"><input type="radio" name="bid-mode"> 수동입찰 모드</label>
        <label style="display:flex;align-items:center;gap:10px;cursor:pointer"><input type="radio" name="bid-mode" checked> 자동입찰 모드 (자동+수동)</label>
      </div>
      <hr class="form-divider">
      <div class="form-section" style="display:flex;align-items:center;justify-content:space-between">
        <span>입찰 시간 스케줄</span>
        <span style="font-size:11px;color:var(--semantic-label-alt);font-weight:400">시간 + 차수를 추가해 KPX 제출 스케줄을 구성합니다.</span>
      </div>
      <div id="bid-sch-list" style="display:flex;flex-direction:column;gap:8px;margin-bottom:10px"></div>
      <button class="cb n sm" onclick="addBidSchedule()">+ 스케줄 추가</button>
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
      <button class="cb p" onclick="toast('입찰 설정을 저장했습니다.');closeModal('modal-bid-settings')">적용</button>
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
          <input type="radio" name="model-mode" style="margin-top:4px">
          <div><div style="font-weight:500">최신 예측값 사용</div><div style="font-size:11px;color:var(--semantic-label-alt);margin-top:2px">예측모델에 관계없이 발전기별 가장 최신 예측값을 사용합니다.</div></div>
        </label>
        <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer">
          <input type="radio" name="model-mode" checked style="margin-top:4px">
          <div><div style="font-weight:500">발전기별 예측모델 사용</div><div style="font-size:11px;color:var(--semantic-label-alt);margin-top:2px">각 발전기별 예측모델을 지정합니다.</div></div>
        </label>
      </div>
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
      <div style="padding:12px 14px;background:var(--semantic-tag-bg-yellow);border-radius:6px;font-size:13px;line-height:20px;color:var(--semantic-label-strong);margin-bottom:16px">
        ⚠ 즉시입찰은 스케줄과 무관하게 KPX에 바로 제출됩니다. 신중히 확인하세요.
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
window['I_bidDA-main']=function(){
  const h=['00','02','04','06','08','10','12','14','16','18','20','22'];
  mkChart('c-bidcurve','line',h,[
    {label:'1차 입찰량(MW)',data:[0,0,0.2,2.1,6.4,9.8,10.7,10.2,8.5,4.2,1.0,0],borderColor:'#0059ff',borderWidth:2,pointRadius:0,tension:0.4,fill:true,backgroundColor:'rgba(0,89,255,0.08)'},
    {label:'2차 갱신(MW)',data:[0,0,0.2,2.3,6.7,10.1,10.9,10.0,8.2,3.9,0.9,0],borderColor:'#ffca42',borderWidth:1.5,pointRadius:0,tension:0.4,borderDash:[4,2],fill:false},
  ],{});
  const list=document.getElementById('bid-sch-list');
  if(list && !list.dataset.init){
    list.dataset.init='1';
    ['09:00-1','09:55-1','10:00-1','13:50-1','14:00-2','16:00-2','16:55-2','19:50-2'].forEach(s=>{
      const [t,r]=s.split('-');
      window.addBidSchedule(t,r);
    });
  }
};
window.selRound=function(n,el){
  document.querySelectorAll('.rd-tab').forEach(e=>e.classList.remove('active'));
  el.classList.add('active');
  const Q=id=>document.getElementById(id);
  if(n==1){
    if(Q('tbl-round'))Q('tbl-round').textContent='1차';
    if(Q('tbl-meta'))Q('tbl-meta').textContent='1차 자동 · 2026-04-23 09:57 · 2회 입찰';
    if(Q('k-deadline'))Q('k-deadline').textContent='11:00';
    if(Q('k-deadline-sub'))Q('k-deadline-sub').textContent='남은 42분 · 1차 KPX 자동전송';
    if(Q('k-won'))Q('k-won').innerHTML='145.2<span class="ku">MW</span>';
    if(Q('bidda-round-info'))Q('bidda-round-info').textContent='1차 마감 11:00 · 익일 00~24시 선입찰';
  } else {
    if(Q('tbl-round'))Q('tbl-round').textContent='2차';
    if(Q('tbl-meta'))Q('tbl-meta').textContent='2차 자동 · 대기 · 제출 예정 15:00';
    if(Q('k-deadline'))Q('k-deadline').textContent='15:00';
    if(Q('k-deadline-sub'))Q('k-deadline-sub').textContent='남은 4시간 32분 · 2차 갱신';
    if(Q('k-won'))Q('k-won').innerHTML='142.7<span class="ku">MW</span>';
    if(Q('bidda-round-info'))Q('bidda-round-info').textContent='2차 마감 15:00 · 익일 12~24시 갱신 입찰';
  }
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

