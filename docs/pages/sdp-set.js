// AUTO-GENERATED FROM index.html — page module: sdp-set
window.P = window.P || {};
/* ===== 준중앙급전: 수익정산 ===== */
/* ===== 준중앙급전: 수익정산 (전용 정산 산식 + 정산서) ===== */
window.P['sdp-set']=()=>`
<!-- 전용 정산 산식 안내 -->
<div style="font-size:12px;color:var(--semantic-label-normal);padding:10px 14px;background:var(--semantic-brand-primary-assistive);border-radius:6px;margin-bottom:12px;line-height:20px">
  💡 <b>준중앙급전 전용 정산 산식</b> — <span class="mono">이행 정산금(SMP×이행량) + 용량정산금(CP) + 부가정산금(AS) + 응답속도 인센티브 − 미이행 페널티 − 운영 수수료(5%) = 최종 순 지급액</span><br>
  일반 VPP 정산(DAES/RTES/IMBP)과 분리 처리 · KPX 월 마감 후 <b>익월 15일</b> 확정 · <b>지시 이행 보상금 자동 정산</b>
</div>

<!-- 최상위 필터 바 -->
<div class="card fbar" style="margin-bottom:12px">
  <div class="fbar-row">
    <div class="fbar-item">
      <span class="fbar-lbl">VPP 그룹</span>
      <select class="fbar-sel" id="ss-f-vpp" onchange="ssFilterApply()">
        <option>전체</option><option>VPP-전남권</option><option>VPP-제주권</option><option>VPP-경북권</option>
      </select>
    </div>
    <div class="fbar-item">
      <span class="fbar-lbl">자원 유형</span>
      <select class="fbar-sel" id="ss-f-type" onchange="ssFilterApply()">
        <option value="all">전체</option><option>태양광</option><option>풍력</option><option>ESS</option><option>바이오</option><option>V2G</option>
      </select>
    </div>
    <div class="fbar-item">
      <span class="fbar-lbl">정산 월</span>
      <select class="fbar-sel" id="ss-f-month" onchange="ssFilterApply()">
        <option>2026-04</option><option>2026-03</option><option>2026-02</option><option>2026-01</option>
      </select>
    </div>
    <div class="fbar-item">
      <span class="fbar-lbl">정산 상태</span>
      <select class="fbar-sel" id="ss-f-state" onchange="ssFilterApply()">
        <option>전체</option><option>확정</option><option>가정산</option><option>발행 대기</option>
      </select>
    </div>
    <div class="fbar-item">
      <span class="fbar-lbl">지급 상태</span>
      <select class="fbar-sel" id="ss-f-pay" onchange="ssFilterApply()">
        <option>전체</option><option>지급 완료</option><option>지급 대기</option><option>보류</option>
      </select>
    </div>
  </div>
</div>

<!-- 정산서 Hero -->
<div class="card mb" style="padding:0;overflow:hidden;border-left:4px solid var(--semantic-brand-primary);margin-bottom:12px">
  <div style="display:flex;align-items:stretch;flex-wrap:wrap">
    <div style="flex:1;min-width:320px;padding:18px 22px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span class="badge warn" style="font-weight:600">가정산</span>
        <span class="kpi-pill" style="font-size:11px">STL-2026-04-SDP</span>
        <span style="font-size:11px;color:var(--semantic-label-alt);margin-left:8px">확정 예정 2026-05-15</span>
      </div>
      <div style="font-size:17px;font-weight:700;color:var(--semantic-label-strong);margin-bottom:6px">2026년 4월 준중앙급전 정산서</div>
      <div style="font-size:12px;color:var(--semantic-label-alt);line-height:20px">
        <b style="color:var(--semantic-label-normal)">정산 기간:</b> 2026.04.01 ~ 2026.04.30 · <b style="color:var(--semantic-label-normal)">확정 물량:</b> 4,821 MWh · <b style="color:var(--semantic-label-normal)">대상 자원:</b> 7개소
      </div>
    </div>
    <div style="width:1px;background:var(--semantic-line-alt)"></div>
    <div style="padding:18px 22px;min-width:220px;text-align:right">
      <div style="font-size:11px;color:var(--semantic-label-alt);margin-bottom:6px">최종 순 지급액</div>
      <div style="display:flex;align-items:baseline;gap:4px;justify-content:flex-end;margin-bottom:4px">
        <span class="mono" style="font-size:26px;font-weight:700;color:var(--semantic-brand-primary);line-height:1">83.03</span>
        <span style="font-size:13px;color:var(--semantic-label-alt)">백만원</span>
      </div>
      <div style="font-size:11px;color:var(--semantic-label-alt)">수수료·페널티 차감 후</div>
    </div>
    <div style="padding:14px 18px;display:flex;align-items:center;gap:8px">
      <button class="cb n sm" onclick="ssOpenPreview()">미리보기</button>
      <button class="cb p sm" onclick="ssDownloadPDF()">PDF 다운로드</button>
    </div>
  </div>
</div>

<!-- KPI 5종 -->
<div class="g5">
  <div class="card acc"><div class="ct">확정 정산 수량 ${window.tip('확정 정산 수량','금월 KPX가 확정한 정산 대상 발전량','Σ(시간대별 검침 발전량) [MWh] · M+1월 06:00 KPX 확정','이행 성공량과 차이 = 미이행량 (페널티 대상)')}</div><div class="kv">4,821<span class="ku">MWh</span></div><div class="kd up">이행 성공 4,721</div></div>
  <div class="card"><div class="ct">이행 보상금 ${window.tip('이행 보상금','이행한 발전량에 SMP를 곱한 시장 보상','Σ(이행 MWh × 시간대별 SMP) [백만원]','전체 정산의 가장 큰 비중 — SMP 변동에 따라 ±10% 변동')}</div><div class="kv" style="color:var(--semantic-positive-normal)">+52.80<span class="ku">백만원</span></div><div class="kd up">SMP × 이행량</div></div>
  <div class="card"><div class="ct">인센티브 합계 ${window.tip('인센티브 합계','월 고정/가변 인센티브의 총 합 (CP + AS + 응답속도 보너스)','CP(용량) + AS(부가서비스) + 속도 인센티브 [백만원]','속도 인센티브: 30초 이내 응답 시 추가 1~2% 가산')}</div><div class="kv" style="color:var(--semantic-brand-primary)">+36.10<span class="ku">백만원</span></div><div class="kd up">CP 24.6 + AS 10.0 + 속도 1.5</div></div>
  <div class="card"><div class="ct">페널티·수수료 ${window.tip('페널티·수수료','정산금에서 차감되는 미이행 페널티 + 사업자 수수료','미이행 페널티(KPX) + 운영 수수료(60Hz, 5%) [백만원]','이행률 95% 미만 시 페널티 급증 — 90% 미만은 다음월 가산')}</div><div class="kv" style="color:var(--semantic-negative-normal)">-5.87<span class="ku">백만원</span></div><div class="kd dn">미이행 0.84 + 수수료 5.03</div></div>
  <div class="card"><div class="ct">최종 순 지급액 ${window.tip('최종 순 지급액','사업자에게 실제 지급되는 금액','이행 보상 + 인센티브 - 페널티 - 수수료 [백만원]','M+2월 10일 사업자 계좌로 자동 입금 — 분쟁 시 14일 이내 이의신청')}</div><div class="kv" style="color:var(--semantic-brand-primary)">83.03<span class="ku">백만원</span></div><div class="kd up">이행률 98.2%</div></div>
</div>

<!-- 정산 산식 상세 + 자원 기여도 -->
<div class="g2">
  <div class="card mb"><div class="sh"><div class="st">정산 산식 상세 (자동 계산)</div><span class="kpi-pill" style="font-size:11px">준중앙급전 전용</span></div>
    <table class="tbl"><thead><tr><th>정산 항목</th><th>산식</th><th>금액</th></tr></thead><tbody>
      <tr><td><b>① 이행 보상금</b></td><td class="mono" style="font-size:11px">이행량(4,721 MWh) × SMP(11.18원)</td><td class="mono" style="color:var(--semantic-positive-normal);font-weight:600">+52.80M</td></tr>
      <tr><td><b>② 용량정산금 (CP)</b></td><td class="mono" style="font-size:11px">계약용량(3.78 MW) × 6,500원/kW·월</td><td class="mono" style="color:var(--semantic-positive-normal)">+24.60M</td></tr>
      <tr><td><b>③ 부가정산금 (AS)</b></td><td class="mono" style="font-size:11px">주파수 기여도 × 1,250원/MWh</td><td class="mono" style="color:var(--semantic-positive-normal)">+10.00M</td></tr>
      <tr><td>④ 응답속도 인센티브</td><td class="mono" style="font-size:11px">평균 25s · 60s 기준 보너스</td><td class="mono" style="color:var(--semantic-positive-normal)">+1.50M</td></tr>
      <tr style="background:var(--semantic-tag-bg-green)"><td><b>소계 (보상 + 인센티브)</b></td><td class="mono" style="font-size:11px">① + ② + ③ + ④</td><td class="mono" style="color:var(--semantic-positive-normal);font-weight:700">+88.90M</td></tr>
      <tr><td>⑤ 미이행 페널티</td><td class="mono" style="font-size:11px">미이행량(100 MWh) × -2.5원/kWh</td><td class="mono" style="color:var(--semantic-negative-normal)">-0.84M</td></tr>
      <tr><td>⑥ 운영 수수료 (5%)</td><td class="mono" style="font-size:11px">(① + ② + ③ + ④) × 5%</td><td class="mono" style="color:var(--semantic-negative-normal)">-5.03M</td></tr>
      <tr style="background:var(--semantic-brand-primary-assistive);font-weight:700"><td colspan="2">최종 순 지급액</td><td class="mono" style="font-size:15px;color:var(--semantic-brand-primary)">+83.03M</td></tr>
    </tbody></table>
    <div style="font-size:11px;color:var(--semantic-label-alt);margin-top:10px;line-height:18px">
      ※ AS(부가정산금)는 KPX 월 마감 후 확정 — 현재 가정산 상태<br>
      ※ 운영 수수료는 60Hz VPP 집합운영 보수 (계약 5% 적용)
    </div>
  </div>
  <div class="card mb"><div class="sh"><div class="st">자원 기여도 지수</div></div>
    <div style="height:220px;position:relative"><canvas id="c-ss-contrib" role="img"></canvas></div>
    <div style="font-size:11px;color:var(--semantic-label-alt);margin-top:8px">※ 이행 가중치 + 실 이행 실적 기반 기여도 자동 산출</div>
  </div>
</div>

<!-- 사업자별 정산 명세 -->
<div class="card mb"><div class="sh">
  <div class="st">사업자별 정산 명세 <span id="ss-res-cnt" style="font-size:11px;font-weight:400;color:var(--semantic-label-alt);margin-left:8px">7건</span></div>
  <div style="display:flex;gap:6px">
    <button class="cb n sm" onclick="toast('일괄 정산서 발행')">일괄 발행</button>
    ${window.csvBtn('ss-res-tbody','settlement_breakdown','사업자별 정산 명세')}
  </div>
</div>
<div style="overflow-x:auto"><table class="tbl">
  <thead><tr><th>사업자명</th><th>자원명</th><th>유형</th><th>VPP 그룹</th><th>이행량</th><th>이행 보상</th><th>CP + AS</th><th>페널티</th><th>수수료 (5%)</th><th>순 지급액</th><th>정산서</th><th>지급</th></tr></thead>
  <tbody id="ss-res-tbody">
  ${[
    ['광양에너지(주)','광양항태양광 01단계','태양광','VPP-전남권',915,10.24,6.92,-0.12,-0.86,16.18,'발행','완료'],
    ['광양에너지(주)','광양항태양광 04단계','태양광','VPP-전남권',878,9.82,6.64,-0.12,-0.82,15.52,'발행','완료'],
    ['㈜해맞이솔라','해맞이 태양광','태양광','VPP-전남권',398,4.45,3.01,-0.05,-0.37,7.04,'발행','완료'],
    ['(주)온누리E&C','온누리 태양광','태양광','VPP-전남권',398,4.45,3.01,-0.05,-0.37,7.04,'발행','완료'],
    ['금능태양광협동조합','금능1호 태양광','태양광','VPP-제주권',392,4.38,2.97,-0.05,-0.37,6.93,'미발행','대기'],
    ['김주풍력㈜','김주풍력 01단계','풍력','VPP-경북권',1158,12.94,8.75,-0.22,-1.07,20.40,'발행','완료'],
    ['제주에너지㈜','금능1호 ESS','ESS','VPP-제주권',582,6.52,4.40,-0.23,-0.54,10.15,'미발행','보류'],
  ].map(r=>{
    const typeStyle=r[2]==='태양광'?'':r[2]==='풍력'?'background:var(--semantic-tag-bg-blue);color:var(--semantic-tag-label-blue)':r[2]==='ESS'?'background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow)':r[2]==='바이오'?'background:#e8defa;color:#6035cc':r[2]==='V2G'?'background:var(--semantic-tag-bg-green);color:var(--semantic-tag-label-green)':'';
    const invStatus=r[10]==='발행'?'ok':'warn';
    const payStatus=r[11]==='완료'?'ok':r[11]==='대기'?'warn':'err';
    return `<tr data-type="${r[2]}" data-vpp="${r[3]}" data-inv="${r[10]}" data-pay="${r[11]}"><td><b style="font-size:12px">${r[0]}</b></td><td style="font-size:12px">${r[1]}</td><td><span class="badge ${r[2]==='태양광'?'inf':''}" ${typeStyle?`style="${typeStyle}"`:''}>${r[2]}</span></td><td style="font-size:12px">${r[3]}</td><td class="mono">${r[4].toLocaleString()} MWh</td><td class="mono" style="color:var(--semantic-positive-normal)">+${r[5].toFixed(2)}M</td><td class="mono" style="color:var(--semantic-brand-primary)">+${r[6].toFixed(2)}M</td><td class="mono" style="color:var(--semantic-negative-normal)">${r[7].toFixed(2)}M</td><td class="mono" style="color:var(--semantic-negative-normal)">${r[8].toFixed(2)}M</td><td class="mono" style="font-weight:600;color:var(--semantic-brand-primary)">+${r[9].toFixed(2)}M</td><td><span class="badge ${invStatus}">${r[10]}</span></td><td><span class="badge ${payStatus}">${r[11]}</span></td></tr>`;
  }).join('')}
  <tr data-no-sort="1" style="font-weight:600;background:var(--semantic-background-2)"><td colspan="4">합계</td><td class="mono">4,721 MWh</td><td class="mono">+52.80M</td><td class="mono">+35.70M</td><td class="mono">-0.84M</td><td class="mono">-4.40M</td><td class="mono" style="color:var(--semantic-brand-primary)">+83.26M</td><td>—</td><td>—</td></tr>
  </tbody>
</table></div>
</div>

<!-- 월별 정산 추이 + 정산서 발행 이력 -->
<div class="g2">
  <div class="card mb"><div class="sh"><div class="st">월별 정산 추이 (6개월)</div></div>
    <div style="height:200px;position:relative"><canvas id="c-ss-trend" role="img"></canvas></div>
  </div>
  <div class="card mb"><div class="sh"><div class="st">정산서 발행 이력</div><button class="cb n sm" onclick="toast('일괄 다운로드')">전체 ↓</button></div>
    <table class="tbl"><thead><tr><th>정산월</th><th>총액</th><th>상태</th><th>발행일</th><th>확정일</th><th>PDF</th></tr></thead><tbody>
      <tr><td class="mono">2026-04</td><td class="mono" style="color:var(--semantic-brand-primary);font-weight:600">83.03M</td><td><span class="badge warn">가정산</span></td><td class="mono">—</td><td class="mono">2026-05-15 예정</td><td><span style="color:var(--semantic-label-alt)">—</span></td></tr>
      <tr><td class="mono">2026-03</td><td class="mono">91.44M</td><td><span class="badge ok">확정</span></td><td class="mono">2026-04-15</td><td class="mono">2026-04-15</td><td><span class="sa" onclick="toast('PDF 열기')">PDF ↓</span></td></tr>
      <tr><td class="mono">2026-02</td><td class="mono">79.31M</td><td><span class="badge ok">확정</span></td><td class="mono">2026-03-15</td><td class="mono">2026-03-15</td><td><span class="sa" onclick="toast('PDF 열기')">PDF ↓</span></td></tr>
      <tr><td class="mono">2026-01</td><td class="mono">72.18M</td><td><span class="badge ok">확정</span></td><td class="mono">2026-02-15</td><td class="mono">2026-02-15</td><td><span class="sa" onclick="toast('PDF 열기')">PDF ↓</span></td></tr>
      <tr><td class="mono">2025-12</td><td class="mono">84.90M</td><td><span class="badge ok">확정</span></td><td class="mono">2026-01-15</td><td class="mono">2026-01-15</td><td><span class="sa" onclick="toast('PDF 열기')">PDF ↓</span></td></tr>
    </tbody></table>
  </div>
</div>

<!-- 하단 안내 -->
<div style="font-size:12px;color:var(--semantic-label-alt);margin-top:10px;padding:12px 14px;background:var(--semantic-background-2);border-radius:6px;line-height:20px">
  ℹ️ 준중앙급전 정산서는 <b>EWP 당사자 계약 기반 자동 생성</b>되며 SHA-256 해시 무결성 로그와 함께 5년 영구 보관됩니다.<br>
  ※ <b>지시 이행 보상금</b>은 <span onclick="activate('sdp-del')" style="color:var(--semantic-brand-primary);cursor:pointer">발전량인도 ↗</span> 이행률 집계에서 자동 산출되며 · <b>인센티브 단가</b>는 <span onclick="activate('sdp-con')" style="color:var(--semantic-brand-primary);cursor:pointer">계약정보 ↗</span> 마스터 값 참조
</div>

<!-- 정산서 미리보기 / PDF 모달 -->
<div class="modal-backdrop" id="modal-ss-doc" style="display:none" onclick="closeModalBg(event,'modal-ss-doc')">
  <div class="modal" style="width:760px;max-height:min(82vh,820px);display:flex;flex-direction:column;overflow:hidden">
    <div class="modal-hdr no-print" style="flex-shrink:0;background:var(--semantic-background-1);position:relative;z-index:2">
      <span class="modal-title">정산서 미리보기</span>
      <button class="modal-close" onclick="closeModal('modal-ss-doc')" aria-label="닫기">✕</button>
    </div>
    <div class="modal-body" id="ss-doc-body" style="overflow-y:auto;flex:1 1 auto;min-height:0">
      <div style="text-align:center;padding-bottom:18px;border-bottom:2px solid var(--semantic-label-strong);margin-bottom:20px">
        <div style="font-size:11px;color:var(--semantic-label-alt);letter-spacing:1px">60Hz · VPP 집합운영자</div>
        <div style="font-size:22px;font-weight:700;margin-top:6px">준중앙급전 정산서</div>
        <div style="font-size:12px;color:var(--semantic-label-alt);margin-top:4px">STL-2026-04-SDP · 가정산 · 발행일 2026-04-27</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px 24px;font-size:12px;margin-bottom:20px;line-height:20px">
        <div><b style="color:var(--semantic-label-normal)">정산 기간</b> &nbsp; 2026.04.01 ~ 2026.04.30</div>
        <div><b style="color:var(--semantic-label-normal)">확정 예정</b> &nbsp; 2026-05-15</div>
        <div><b style="color:var(--semantic-label-normal)">확정 물량</b> &nbsp; 4,821 MWh</div>
        <div><b style="color:var(--semantic-label-normal)">대상 자원</b> &nbsp; 7개소</div>
      </div>
      <div style="font-size:13px;font-weight:600;margin-bottom:8px">정산 산식 상세</div>
      <table class="tbl" style="margin-bottom:18px">
        <thead><tr><th>정산 항목</th><th>산식</th><th style="text-align:right">금액</th></tr></thead>
        <tbody>
          <tr><td><b>① 이행 보상금</b></td><td class="mono" style="font-size:11px">이행량(4,721 MWh) × SMP(11.18원)</td><td class="mono" style="text-align:right;color:var(--semantic-positive-normal);font-weight:600">+52.80M</td></tr>
          <tr><td><b>② 용량정산금 (CP)</b></td><td class="mono" style="font-size:11px">계약용량(3.78 MW) × 6,500원/kW·월</td><td class="mono" style="text-align:right;color:var(--semantic-positive-normal)">+24.60M</td></tr>
          <tr><td><b>③ 부가정산금 (AS)</b></td><td class="mono" style="font-size:11px">주파수 기여도 × 1,250원/MWh</td><td class="mono" style="text-align:right;color:var(--semantic-positive-normal)">+10.00M</td></tr>
          <tr><td>④ 응답속도 인센티브</td><td class="mono" style="font-size:11px">평균 25s · 60s 기준 보너스</td><td class="mono" style="text-align:right;color:var(--semantic-positive-normal)">+1.50M</td></tr>
          <tr style="background:var(--semantic-tag-bg-green)"><td><b>소계</b></td><td class="mono" style="font-size:11px">① + ② + ③ + ④</td><td class="mono" style="text-align:right;color:var(--semantic-positive-normal);font-weight:700">+88.90M</td></tr>
          <tr><td>⑤ 미이행 페널티</td><td class="mono" style="font-size:11px">미이행량(100 MWh) × -2.5원/kWh</td><td class="mono" style="text-align:right;color:var(--semantic-negative-normal)">-0.84M</td></tr>
          <tr><td>⑥ 운영 수수료 (5%)</td><td class="mono" style="font-size:11px">소계 × 5%</td><td class="mono" style="text-align:right;color:var(--semantic-negative-normal)">-5.03M</td></tr>
          <tr style="background:var(--semantic-brand-primary-assistive);font-weight:700"><td colspan="2">최종 순 지급액</td><td class="mono" style="text-align:right;font-size:16px;color:var(--semantic-brand-primary)">+83.03M</td></tr>
        </tbody>
      </table>
      <div style="font-size:13px;font-weight:600;margin-bottom:8px">사업자별 명세 (요약)</div>
      <table class="tbl" style="margin-bottom:18px">
        <thead><tr><th>사업자 / 자원</th><th>유형</th><th>이행</th><th style="text-align:right">순 지급</th></tr></thead>
        <tbody>
          <tr><td>광양에너지(주) — 광양항태양광 01단계</td><td>태양광</td><td class="mono">915 MWh</td><td class="mono" style="text-align:right;color:var(--semantic-brand-primary)">+16.18M</td></tr>
          <tr><td>광양에너지(주) — 광양항태양광 04단계</td><td>태양광</td><td class="mono">878 MWh</td><td class="mono" style="text-align:right;color:var(--semantic-brand-primary)">+15.52M</td></tr>
          <tr><td>㈜해맞이솔라 — 해맞이 태양광</td><td>태양광</td><td class="mono">398 MWh</td><td class="mono" style="text-align:right;color:var(--semantic-brand-primary)">+7.04M</td></tr>
          <tr><td>(주)온누리E&C — 온누리 태양광</td><td>태양광</td><td class="mono">398 MWh</td><td class="mono" style="text-align:right;color:var(--semantic-brand-primary)">+7.04M</td></tr>
          <tr><td>금능태양광협동조합 — 금능1호 태양광</td><td>태양광</td><td class="mono">392 MWh</td><td class="mono" style="text-align:right;color:var(--semantic-brand-primary)">+6.93M</td></tr>
          <tr><td>김주풍력㈜ — 김주풍력 01단계</td><td>풍력</td><td class="mono">1,158 MWh</td><td class="mono" style="text-align:right;color:var(--semantic-brand-primary)">+20.40M</td></tr>
          <tr><td>제주에너지㈜ — 금능1호 ESS</td><td>ESS</td><td class="mono">582 MWh</td><td class="mono" style="text-align:right;color:var(--semantic-brand-primary)">+10.15M</td></tr>
          <tr style="background:var(--semantic-background-2);font-weight:600"><td colspan="2">합계</td><td class="mono">4,721 MWh</td><td class="mono" style="text-align:right;color:var(--semantic-brand-primary)">+83.26M</td></tr>
        </tbody>
      </table>
      <div style="font-size:11px;color:var(--semantic-label-alt);line-height:18px;padding-top:14px;border-top:1px solid var(--semantic-line-alt)">
        ※ AS(부가정산금)는 KPX 월 마감 후 확정 — 현재 가정산 상태<br>
        ※ 운영 수수료는 60Hz VPP 집합운영 보수 (계약 5% 적용)<br>
        ※ M+2월 10일 사업자 계좌로 자동 입금 — 분쟁 시 14일 이내 이의신청<br>
        ※ SHA-256 해시 무결성 로그와 함께 5년 영구 보관
      </div>
    </div>
    <div class="modal-footer no-print" style="flex-shrink:0;background:var(--semantic-background-1);position:relative;z-index:2">
      <button class="cb n" onclick="closeModal('modal-ss-doc')">닫기</button>
      <button class="cb p" onclick="ssDownloadPDF()">PDF 다운로드</button>
    </div>
  </div>
</div>`;
window['I_sdp-set']=function(){
  setTimeout(window._ssInitCharts,40);
};
window.ssOpenPreview=function(){ openModal('modal-ss-doc'); };
window.ssDownloadPDF=function(){
  const wasOpen=document.getElementById('modal-ss-doc')?.style.display==='flex';
  if(!wasOpen) openModal('modal-ss-doc');
  const prevTitle=document.title;
  document.title='준중앙급전 정산서_2026-04';
  setTimeout(()=>{
    window.print();
    document.title=prevTitle;
  },wasOpen?50:250);
};
window._ssInitCharts=function(){
  // 기여도 도넛
  mkChart('c-ss-contrib','doughnut',['광양항태양광 01','광양항태양광 04','김주풍력 01','금능1호 ESS','기타'],[
    {data:[19.5,18.7,24.5,12.2,25.1],backgroundColor:['#0059ff','#1f98ff','#1f98ff','#ffca42','#999999'],borderWidth:0}
  ],{cutout:'62%',plugins:{legend:{display:true,position:'bottom',labels:{font:{size:10},boxWidth:10,padding:6}}}});
  // 월별 추이
  mkChart('c-ss-trend','bar',['11월','12월','1월','2월','3월','4월'],[
    {label:'이행 보상',data:[48,52,44,46,53,52.8],backgroundColor:'rgba(0,212,168,0.55)',borderWidth:0,stack:'s'},
    {label:'인센티브 (CP+AS)',data:[32,34,30,31,35,36.1],backgroundColor:'rgba(0,89,255,0.55)',borderWidth:0,stack:'s'},
    {label:'페널티·수수료',data:[-3.9,-4.5,-3.8,-2.0,-5.3,-5.87],backgroundColor:'rgba(239,68,68,0.5)',borderWidth:0,stack:'s'},
  ],{plugins:{legend:{display:true,position:'bottom',labels:{font:{size:11},boxWidth:10,padding:6}}},scales:{x:{stacked:true},y:{stacked:true,ticks:{callback:v=>v+'M'},title:{display:true,text:'백만원',color:'#666',font:{size:10}}}}});
};
// 필터 적용
window.ssFilterApply=function(){
  const vpp=document.getElementById('ss-f-vpp')?.value||'전체';
  const type=document.getElementById('ss-f-type')?.value||'all';
  const state=document.getElementById('ss-f-state')?.value||'전체';
  const pay=document.getElementById('ss-f-pay')?.value||'전체';
  const rows=document.querySelectorAll('#ss-res-tbody tr[data-type]');
  let visible=0;
  rows.forEach(tr=>{
    let show=true;
    if(type!=='all' && tr.dataset.type!==type)show=false;
    if(vpp!=='전체' && tr.dataset.vpp!==vpp)show=false;
    if(state!=='전체'){
      const invState=tr.dataset.inv;
      if(state==='확정' && invState!=='발행')show=false;
      if(state==='발행 대기' && invState!=='미발행')show=false;
    }
    if(pay!=='전체'){
      const payState=tr.dataset.pay;
      if(pay==='지급 완료' && payState!=='완료')show=false;
      if(pay==='지급 대기' && payState!=='대기')show=false;
      if(pay==='보류' && payState!=='보류')show=false;
    }
    tr.style.display=show?'':'none';
    if(show)visible++;
  });
  const cnt=document.getElementById('ss-res-cnt');
  if(cnt)cnt.textContent=visible+'건';
};

