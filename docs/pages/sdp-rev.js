// AUTO-GENERATED FROM index.html — page module: sdp-rev
window.P = window.P || {};
/* ===== 준중앙급전: 입찰수익 ===== */
/* ===== 준중앙급전: 입찰수익 (전용 수익 분석 + 필터) ===== */
window.P['sdp-rev']=()=>`
<!-- 안내 -->
<div style="font-size:12px;color:var(--semantic-label-normal);padding:10px 14px;background:var(--semantic-brand-primary-assistive);border-radius:6px;margin-bottom:12px;line-height:20px">
  💡 <b>준중앙급전 전용 수익 분석</b> — KPX 낙찰 결과 기반 · 일반 입찰(DAES/RTES)과 분리 집계. SMP(이행보상) · CP(용량) · AS(부가) 3-tier 정산 구조.
</div>

<!-- 최상위 필터 바 (VPP 그룹 · 자원 유형 · 조회 기간 · 단위 · 정산 항목) -->
<div class="card fbar" style="margin-bottom:12px">
  <div class="fbar-row">
    <div class="fbar-item">
      <span class="fbar-lbl">VPP 그룹</span>
      <select class="fbar-sel" id="sr-f-vpp" onchange="srFilterApply()">
        <option>전체</option><option>VPP-전남권</option><option>VPP-제주권</option><option>VPP-경북권</option>
      </select>
    </div>
    <div class="fbar-item">
      <span class="fbar-lbl">자원 유형</span>
      <select class="fbar-sel" id="sr-f-type" onchange="srFilterApply()">
        <option value="all">전체</option><option>태양광</option><option>풍력</option><option>ESS</option><option>바이오</option><option>V2G</option>
      </select>
    </div>
    <div class="fbar-item wide">
      <span class="fbar-lbl">조회 기간</span>
      <div class="fbar-period">
        <input class="fbar-inp" type="date" value="2026-01-01" id="sr-f-from" onchange="srFilterApply()">
        <span class="fbar-period-sep">→</span>
        <input class="fbar-inp" type="date" value="2026-04-23" id="sr-f-to" onchange="srFilterApply()">
      </div>
    </div>
    <div class="fbar-item">
      <span class="fbar-lbl">조회 단위</span>
      <select class="fbar-sel" id="sr-f-unit" onchange="srFilterApply()">
        <option value="month">월별</option><option value="day">일별</option>
      </select>
    </div>
    <div class="fbar-item">
      <span class="fbar-lbl">정산 항목</span>
      <select class="fbar-sel" id="sr-f-item" onchange="srFilterApply()">
        <option value="all">전체</option><option value="smp">이행 보상금 (SMP)</option><option value="cp">용량정산금 (CP)</option><option value="as">부가정산금 (AS)</option>
      </select>
    </div>
  </div>
</div>

<!-- KPI 5종 (준중앙급전 전용) -->
<div class="g5">
  <div class="card acc"><div class="ct">금월 준중앙 총 수익 ${window.tip('금월 준중앙 총 수익','준중앙급전 자원에서 발생한 모든 정산 항목의 합계','SMP 보상 + CP 용량 + AS 부가서비스 + 인센티브 [백만원]','전월 대비 ±10% 변동 정상 — SMP 시장 단가 + 가용 시간 영향')}</div><div class="kv" id="sr-kpi-total">87.4<span class="ku">백만원</span></div><div class="kd up">▲ +12.3% 전월 대비</div></div>
  <div class="card"><div class="ct">이행 보상금 (SMP) ${window.tip('이행 보상금 (SMP 기반)','KPX 급전지시 이행에 따른 시장 한계 가격 보상','Σ(이행 MWh × SMP) [백만원] · 이행률 95% 이상 시 100% 지급','전체 수익의 60% 내외 — 가장 큰 수익원 / SMP 변동에 민감')}</div><div class="kv" id="sr-kpi-smp" style="color:var(--semantic-positive-normal)">52.8<span class="ku">백만원</span></div><div class="kd up">60.4% 비중</div></div>
  <div class="card"><div class="ct">용량정산금 (CP) ${window.tip('용량정산금 (CP)','Capacity Payment — 가용 용량 단순 보유에 대한 월 고정 보상','계약 용량(MW) × 월 CP 단가 (시간당 약 4,500원)','월 고정 — SMP 변동과 무관 / 정비 시간 비례 차감')}</div><div class="kv" id="sr-kpi-cp">24.6<span class="ku">백만원</span></div><div class="kd neu">28.1% 비중 · 월 고정</div></div>
  <div class="card"><div class="ct">부가정산금 (AS) ${window.tip('부가정산금 (AS - Ancillary Services)','보조서비스 시장 참여로 인한 추가 정산 (주파수 조정, 예비력 등)','Σ(서비스 제공 시간 × AS 단가) [백만원]','월별 변동 큰 항목 — 시장 참여 모드(FR·SR·OR)에 따라 단가 차이')}</div><div class="kv" id="sr-kpi-as" style="color:var(--semantic-brand-primary)">10.0<span class="ku">백만원</span></div><div class="kd neu">11.5% · 가정산</div></div>
  <div class="card"><div class="ct">준중앙 Premium ${window.tip('준중앙 Premium','일반 입찰 자원 대비 준중앙급전의 추가 수익률','(준중앙 단가 - 일반 단가) ÷ 일반 단가 × 100 [%]','평균 +15~20% 가산 — KPX 지시 이행 의무 부담의 대가')}</div><div class="kv" style="color:var(--semantic-positive-normal)">+18.4<span class="ku">%</span></div><div class="kd up">일반 입찰 대비 단가↑</div></div>
</div>

<!-- 월별/일별 수익 추이 + 일반 대비 비교 -->
<div class="g2">
  <div class="card mb"><div class="sh"><div class="st" id="sr-trend-title">월별 준중앙 수익 추이 (6개월)</div><span class="kpi-pill" style="font-size:11px">SMP + CP + AS stacked</span></div>
    <div style="height:200px;position:relative"><canvas id="c-sr-trend" role="img"></canvas></div>
  </div>
  <div class="card mb"><div class="sh"><div class="st">준중앙 vs 일반 입찰 수익 비교</div><span class="kpi-pill" style="font-size:11px">단가 기준</span></div>
    <div style="height:200px;position:relative"><canvas id="c-sr-compare" role="img"></canvas></div>
    <div style="font-size:12px;color:var(--semantic-label-normal);margin-top:8px;padding:10px;background:var(--semantic-background-2);border-radius:6px;line-height:18px">
      💰 준중앙급전은 <b>이행보상 + 용량정산 + 부가정산</b> 3중 구조로 일반 DAES 단일 대비 평균 <b style="color:var(--semantic-positive-normal)">+18.4%</b> 단가 프리미엄
    </div>
  </div>
</div>

<!-- 자원별 준중앙 수익 기여도 -->
<div class="card mb"><div class="sh"><div class="st">자원별 준중앙 수익 기여도 <span id="sr-res-cnt" style="font-size:11px;font-weight:400;color:var(--semantic-label-alt);margin-left:8px">9개소</span></div><div style="display:flex;gap:6px;align-items:center"><button class="cb p sm" onclick="srDownloadPDF()">PDF 다운로드</button>${window.csvBtn('sr-res-tbody','revenue_contribution','자원별 준중앙 수익 기여도')}</div></div>
<div style="overflow-x:auto"><table class="tbl">
  <thead><tr><th>자원명</th><th>유형</th><th>VPP 그룹</th><th>가중치</th><th>이행 SMP</th><th>용량 CP</th><th>부가 AS</th><th>금월 합계</th><th>YTD 누적</th></tr></thead>
  <tbody id="sr-res-tbody">
  ${[
    ['광양항태양광 01단계','태양광','VPP-전남권',20.0,10.56,4.92,2.00,17.48,65.2],
    ['광양항태양광 04단계','태양광','VPP-전남권',19.2,10.14,4.72,1.92,16.78,62.8],
    ['해맞이 태양광','태양광','VPP-전남권',8.7,4.59,2.14,0.87,7.60,28.4],
    ['온누리 태양광','태양광','VPP-전남권',8.7,4.59,2.14,0.87,7.60,28.4],
    ['금능1호 태양광','태양광','VPP-제주권',8.6,4.54,2.12,0.86,7.52,28.1],
    ['김주풍력 01단계','풍력','VPP-경북권',25.4,13.41,6.25,2.54,22.20,82.9],
    ['금능1호 ESS','ESS','VPP-제주권',9.4,4.97,2.31,0.94,8.22,30.7],
    ['순천 바이오가스','바이오','VPP-전남권',0,0,0,0,0,0],
    ['여수 바이오매스','바이오','VPP-전남권',0,0,0,0,0,0],
  ].map(r=>{
    const typeStyle=r[1]==='태양광'?'':r[1]==='풍력'?'background:var(--semantic-tag-bg-blue);color:var(--semantic-tag-label-blue)':r[1]==='ESS'?'background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow)':r[1]==='바이오'?'background:#e8defa;color:#6035cc':r[1]==='V2G'?'background:var(--semantic-tag-bg-green);color:var(--semantic-tag-label-green)':'';
    const isZero=r[7]===0;
    return `<tr data-type="${r[1]}" data-vpp="${r[2]}"><td>${r[0]}</td><td><span class="badge ${r[1]==='태양광'?'inf':''}" ${typeStyle?`style="${typeStyle}"`:''}>${r[1]}</span></td><td style="font-size:12px">${r[2]}</td><td class="mono" style="font-weight:600;color:var(--semantic-brand-primary)">${r[3].toFixed(1)}%</td><td class="mono" style="color:${isZero?'var(--semantic-label-alt)':'var(--semantic-positive-normal)'}">${r[4].toFixed(2)}M</td><td class="mono" style="color:${isZero?'var(--semantic-label-alt)':''}">${r[5].toFixed(2)}M</td><td class="mono" style="color:${isZero?'var(--semantic-label-alt)':'var(--semantic-brand-primary)'}">${r[6].toFixed(2)}M</td><td class="mono" style="font-weight:600;color:${isZero?'var(--semantic-label-alt)':'var(--semantic-label-strong)'}">${isZero?'—':'+'+r[7].toFixed(2)+'M'}</td><td class="mono" style="color:var(--semantic-label-alt)">${isZero?'—':r[8].toFixed(1)+'M'}</td></tr>`;
  }).join('')}
  <tr data-no-sort="1" style="font-weight:600;background:var(--semantic-background-2)"><td colspan="3">합계</td><td class="mono">100.0%</td><td class="mono">52.80M</td><td class="mono">24.60M</td><td class="mono">10.00M</td><td class="mono" style="color:var(--semantic-brand-primary)">+87.40M</td><td class="mono">326.5M</td></tr>
  </tbody>
</table></div>
<div style="font-size:11px;color:var(--semantic-label-alt);margin-top:10px;line-height:18px">※ 바이오 2개 자원은 준중앙급전 미참여 (0 수익) · 일반 입찰 수익은 <span onclick="activate('bidRT-mgmt')" style="color:var(--semantic-brand-primary);cursor:pointer;font-weight:500">실시간 입찰 → 정산 관리 ↗</span>에서 별도 확인</div>
</div>

<!-- 정산 항목 분해 + 낙찰 연동 내역 -->
<div class="g2">
  <div class="card mb"><div class="sh"><div class="st">정산 항목 상세 (3-tier 구조)</div></div>
    <table class="tbl" data-no-sort="1"><thead><tr><th>항목</th><th>산식</th><th>금월</th><th>YTD</th><th>상태</th></tr></thead><tbody id="sr-item-tbody">
      <tr data-item="smp"><td><b>이행 보상금 (SMP)</b></td><td class="mono" style="font-size:12px">이행량 × SMP 시간별</td><td class="mono" style="color:var(--semantic-positive-normal);font-weight:600">+52.80M</td><td class="mono">+198.4M</td><td><span class="badge ok">확정</span></td></tr>
      <tr data-item="cp"><td><b>용량정산금 (CP)</b></td><td class="mono" style="font-size:12px">계약용량 × CP단가(6,500원/kW·월)</td><td class="mono" style="font-weight:600">+24.60M</td><td class="mono">+92.1M</td><td><span class="badge ok">확정</span></td></tr>
      <tr data-item="as"><td><b>부가정산금 (AS)</b></td><td class="mono" style="font-size:12px">주파수 · 응답속도 기여도</td><td class="mono" style="color:var(--semantic-brand-primary);font-weight:600">+10.00M</td><td class="mono">+38.2M</td><td><span class="badge warn">가정산</span></td></tr>
      <tr data-item="bonus"><td>응답속도 인센티브</td><td class="mono" style="font-size:12px">이행시간 &lt; 60s 보너스</td><td class="mono" style="color:var(--semantic-positive-normal)">+1.50M</td><td class="mono">+5.4M</td><td><span class="badge ok">확정</span></td></tr>
      <tr data-item="penalty"><td>미이행 패널티</td><td class="mono" style="font-size:12px">허용범위 초과 차감</td><td class="mono" style="color:var(--semantic-negative-normal)">-1.50M</td><td class="mono">-4.2M</td><td><span class="badge warn">월 마감 시 확정</span></td></tr>
      <tr style="font-weight:600;background:var(--semantic-background-2)"><td colspan="2">총 수익 합계</td><td class="mono" style="color:var(--semantic-brand-primary)">+87.40M</td><td class="mono" style="color:var(--semantic-brand-primary)">+329.9M</td><td>—</td></tr>
    </tbody></table>
  </div>
  <div class="card mb"><div class="sh"><div class="st">낙찰 결과 연동 (최근 10건)</div><span class="kpi-pill" style="font-size:11px">KPX 급전지시 연계</span></div>
    <div style="overflow-x:auto"><table class="tbl">
      <thead><tr><th>일시</th><th>지시 ID</th><th>유형</th><th>낙찰량</th><th>이행률</th><th>정산 수익</th></tr></thead><tbody>
        <tr><td class="mono" style="font-size:12px">04-23 14:00</td><td class="mono" style="font-size:11px">DSP-142</td><td><span class="badge" style="background:var(--semantic-tag-bg-red);color:var(--semantic-tag-label-red)">감발</span></td><td class="mono">135.0 MW</td><td class="mono" style="color:var(--semantic-positive-normal)">98.4%</td><td class="mono" style="color:var(--semantic-positive-normal)">+5.42M</td></tr>
        <tr><td class="mono" style="font-size:12px">04-23 13:00</td><td class="mono" style="font-size:11px">DSP-141</td><td><span class="badge" style="background:var(--semantic-tag-bg-green);color:var(--semantic-tag-label-green)">증발</span></td><td class="mono">148.0 MW</td><td class="mono" style="color:var(--semantic-positive-normal)">99.5%</td><td class="mono" style="color:var(--semantic-positive-normal)">+5.87M</td></tr>
        <tr><td class="mono" style="font-size:12px">04-23 12:00</td><td class="mono" style="font-size:11px">DSP-140</td><td><span class="badge" style="background:var(--semantic-tag-bg-green);color:var(--semantic-tag-label-green)">증발</span></td><td class="mono">150.0 MW</td><td class="mono" style="color:var(--semantic-positive-normal)">99.4%</td><td class="mono" style="color:var(--semantic-positive-normal)">+5.95M</td></tr>
        <tr><td class="mono" style="font-size:12px">04-23 11:00</td><td class="mono" style="font-size:11px">DSP-139</td><td><span class="badge">정출력</span></td><td class="mono">145.0 MW</td><td class="mono" style="color:var(--semantic-positive-normal)">98.8%</td><td class="mono" style="color:var(--semantic-positive-normal)">+5.71M</td></tr>
        <tr><td class="mono" style="font-size:12px">04-23 10:00</td><td class="mono" style="font-size:11px">DSP-138</td><td><span class="badge" style="background:var(--semantic-tag-bg-green);color:var(--semantic-tag-label-green)">증발</span></td><td class="mono">142.0 MW</td><td class="mono" style="color:var(--semantic-positive-normal)">99.2%</td><td class="mono" style="color:var(--semantic-positive-normal)">+5.61M</td></tr>
        <tr><td class="mono" style="font-size:12px">04-22 15:00</td><td class="mono" style="font-size:11px">DSP-135</td><td><span class="badge" style="background:var(--semantic-tag-bg-red);color:var(--semantic-tag-label-red)">감발</span></td><td class="mono">128.0 MW</td><td class="mono" style="color:var(--palette-yellow-40)">94.1%</td><td class="mono" style="color:var(--palette-yellow-40)">+4.82M</td></tr>
        <tr><td class="mono" style="font-size:12px">04-22 14:00</td><td class="mono" style="font-size:11px">DSP-134</td><td><span class="badge" style="background:var(--semantic-tag-bg-green);color:var(--semantic-tag-label-green)">증발</span></td><td class="mono">140.0 MW</td><td class="mono" style="color:var(--semantic-positive-normal)">98.9%</td><td class="mono" style="color:var(--semantic-positive-normal)">+5.52M</td></tr>
      </tbody>
    </table></div>
  </div>
</div>

<!-- 하단 안내 -->
<div style="font-size:12px;color:var(--semantic-label-alt);margin-top:10px;padding:12px 14px;background:var(--semantic-background-2);border-radius:6px;line-height:20px">
  ℹ️ 준중앙급전 수익은 <b>EWP 당사자 계약 기반</b>으로 집계되며, 자원소유자별 배분은 <span onclick="activate('sdp-set')" style="color:var(--semantic-brand-primary);cursor:pointer;font-weight:500">수익정산 메뉴 ↗</span>에서 관리합니다.<br>
  ※ 부가정산금(AS)은 KPX 월 마감(익월 10일) 후 확정 — 현재 가정산 상태
</div>

<!-- 정산 근거 PDF 모달 -->
<div class="modal-backdrop" id="modal-sr-doc" style="display:none" onclick="closeModalBg(event,'modal-sr-doc')">
  <div class="modal" style="width:760px;max-height:min(82vh,820px);display:flex;flex-direction:column;overflow:hidden">
    <div class="modal-hdr no-print" style="flex-shrink:0;background:var(--semantic-background-1);position:relative;z-index:2">
      <span class="modal-title">준중앙급전 정산 근거서</span>
      <button class="modal-close" onclick="closeModal('modal-sr-doc')" aria-label="닫기">✕</button>
    </div>
    <div class="modal-body" id="sr-doc-body" style="overflow-y:auto;flex:1 1 auto;min-height:0">
      <div style="text-align:center;padding-bottom:18px;border-bottom:2px solid var(--semantic-label-strong);margin-bottom:20px">
        <div style="font-size:11px;color:var(--semantic-label-alt);letter-spacing:1px">60Hz · VPP 집합운영자</div>
        <div style="font-size:22px;font-weight:700;margin-top:6px">준중앙급전 정산 근거서</div>
        <div style="font-size:12px;color:var(--semantic-label-alt);margin-top:4px">STL-2026-04-SDP-REV · 가정산 · 발행일 2026-04-28</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px 24px;font-size:12px;margin-bottom:20px;line-height:20px">
        <div><b style="color:var(--semantic-label-normal)">정산 기간</b> &nbsp; 2026.04.01 ~ 2026.04.30</div>
        <div><b style="color:var(--semantic-label-normal)">확정 예정</b> &nbsp; 2026-05-15 (KPX)</div>
        <div><b style="color:var(--semantic-label-normal)">정산 구조</b> &nbsp; 3-tier (SMP + CP + AS)</div>
        <div><b style="color:var(--semantic-label-normal)">대상 자원</b> &nbsp; 9개소 (참여 7 · 미참여 2)</div>
      </div>
      <div style="font-size:13px;font-weight:600;margin-bottom:8px">정산 항목 상세 (3-tier 구조)</div>
      <table class="tbl" style="margin-bottom:18px">
        <thead><tr><th>정산 항목</th><th>산식</th><th style="text-align:right">금월</th><th style="text-align:right">YTD</th></tr></thead>
        <tbody>
          <tr><td><b>① 이행 보상금 (SMP)</b></td><td class="mono" style="font-size:11px">이행량 × SMP 시간별</td><td class="mono" style="text-align:right;color:var(--semantic-positive-normal);font-weight:600">+52.80M</td><td class="mono" style="text-align:right">+198.40M</td></tr>
          <tr><td><b>② 용량정산금 (CP)</b></td><td class="mono" style="font-size:11px">계약용량 × 6,500원/kW·월</td><td class="mono" style="text-align:right;color:var(--semantic-positive-normal)">+24.60M</td><td class="mono" style="text-align:right">+92.10M</td></tr>
          <tr><td><b>③ 부가정산금 (AS)</b></td><td class="mono" style="font-size:11px">주파수 · 응답속도 기여도</td><td class="mono" style="text-align:right;color:var(--semantic-positive-normal)">+10.00M</td><td class="mono" style="text-align:right">+38.20M</td></tr>
          <tr><td>④ 응답속도 인센티브</td><td class="mono" style="font-size:11px">이행시간 &lt; 60s 보너스</td><td class="mono" style="text-align:right;color:var(--semantic-positive-normal)">+1.50M</td><td class="mono" style="text-align:right">+5.40M</td></tr>
          <tr style="background:var(--semantic-tag-bg-green)"><td><b>소계</b></td><td class="mono" style="font-size:11px">① + ② + ③ + ④</td><td class="mono" style="text-align:right;color:var(--semantic-positive-normal);font-weight:700">+88.90M</td><td class="mono" style="text-align:right;font-weight:700">+334.10M</td></tr>
          <tr><td>⑤ 미이행 페널티</td><td class="mono" style="font-size:11px">허용범위 초과 차감</td><td class="mono" style="text-align:right;color:var(--semantic-negative-normal)">-1.50M</td><td class="mono" style="text-align:right;color:var(--semantic-negative-normal)">-4.20M</td></tr>
          <tr style="background:var(--semantic-brand-primary-assistive);font-weight:700"><td colspan="2">총 수익 합계</td><td class="mono" style="text-align:right;font-size:16px;color:var(--semantic-brand-primary)">+87.40M</td><td class="mono" style="text-align:right;font-size:14px;color:var(--semantic-brand-primary)">+329.90M</td></tr>
        </tbody>
      </table>
      <div style="font-size:13px;font-weight:600;margin-bottom:8px">자원별 기여도 (요약)</div>
      <table class="tbl" style="margin-bottom:18px">
        <thead><tr><th>자원</th><th>유형</th><th style="text-align:right">가중치</th><th style="text-align:right">금월</th><th style="text-align:right">YTD</th></tr></thead>
        <tbody>
          <tr><td>광양항태양광 01단계</td><td>태양광</td><td class="mono" style="text-align:right">20.0%</td><td class="mono" style="text-align:right;color:var(--semantic-brand-primary)">+17.48M</td><td class="mono" style="text-align:right">65.20M</td></tr>
          <tr><td>광양항태양광 04단계</td><td>태양광</td><td class="mono" style="text-align:right">19.2%</td><td class="mono" style="text-align:right;color:var(--semantic-brand-primary)">+16.78M</td><td class="mono" style="text-align:right">62.80M</td></tr>
          <tr><td>해맞이 태양광</td><td>태양광</td><td class="mono" style="text-align:right">8.7%</td><td class="mono" style="text-align:right;color:var(--semantic-brand-primary)">+7.60M</td><td class="mono" style="text-align:right">28.40M</td></tr>
          <tr><td>온누리 태양광</td><td>태양광</td><td class="mono" style="text-align:right">8.7%</td><td class="mono" style="text-align:right;color:var(--semantic-brand-primary)">+7.60M</td><td class="mono" style="text-align:right">28.40M</td></tr>
          <tr><td>금능1호 태양광</td><td>태양광</td><td class="mono" style="text-align:right">8.6%</td><td class="mono" style="text-align:right;color:var(--semantic-brand-primary)">+7.52M</td><td class="mono" style="text-align:right">28.10M</td></tr>
          <tr><td>김주풍력 01단계</td><td>풍력</td><td class="mono" style="text-align:right">25.4%</td><td class="mono" style="text-align:right;color:var(--semantic-brand-primary)">+22.20M</td><td class="mono" style="text-align:right">82.90M</td></tr>
          <tr><td>금능1호 ESS</td><td>ESS</td><td class="mono" style="text-align:right">9.4%</td><td class="mono" style="text-align:right;color:var(--semantic-brand-primary)">+8.22M</td><td class="mono" style="text-align:right">30.70M</td></tr>
          <tr style="background:var(--semantic-background-2);font-weight:600"><td colspan="2">합계 (참여 7개소)</td><td class="mono" style="text-align:right">100.0%</td><td class="mono" style="text-align:right;color:var(--semantic-brand-primary)">+87.40M</td><td class="mono" style="text-align:right">326.50M</td></tr>
        </tbody>
      </table>
      <div style="font-size:11px;color:var(--semantic-label-alt);line-height:18px;padding-top:14px;border-top:1px solid var(--semantic-line-alt)">
        ※ 본 정산 근거서는 <b>준중앙급전 3-tier 구조 (SMP + CP + AS)</b> 기반 가정산이며 KPX 월 마감(익월 10일) 후 확정<br>
        ※ AS(부가정산금)는 주파수 조정 · 응답속도 기여도 기반 — 시장 참여 모드(FR·SR·OR)별 단가 차등 적용<br>
        ※ 일반 입찰(DAES) 대비 평균 +18.4% 단가 프리미엄 — KPX 급전지시 이행 의무 부담의 대가<br>
        ※ 자원소유자별 배분 명세는 [수익정산] 메뉴 참조 · SHA-256 해시 무결성 로그와 함께 5년 영구 보관
      </div>
    </div>
    <div class="modal-footer no-print" style="flex-shrink:0;background:var(--semantic-background-1);position:relative;z-index:2">
      <button class="cb n" onclick="closeModal('modal-sr-doc')">닫기</button>
      <button class="cb p" onclick="srDownloadPDF()">PDF 다운로드</button>
    </div>
  </div>
</div>`;
window['I_sdp-rev']=function(){
  setTimeout(window._srInitCharts,40);
};
window._srInitCharts=function(){
  const unit=document.getElementById('sr-f-unit')?.value||'month';
  let labels,smp,cp,as;
  if(unit==='day'){
    // 일별 (최근 23일)
    labels=Array.from({length:23},(_,i)=>(i+1)+'일');
    smp=[1.5,1.6,1.7,1.5,1.8,2.0,1.9,1.7,1.8,1.9,2.1,2.0,1.8,2.1,2.3,2.2,2.0,1.9,2.1,2.3,2.5,2.4,2.2];
    cp=Array(23).fill(0.82);
    as=[0.32,0.34,0.35,0.33,0.38,0.42,0.40,0.36,0.38,0.40,0.44,0.42,0.38,0.44,0.48,0.46,0.42,0.40,0.44,0.48,0.52,0.50,0.46];
  } else {
    // 월별 (최근 6개월)
    labels=['11월','12월','1월','2월','3월','4월'];
    smp=[44,52,48,56,51,52.8];
    cp=[22,24,23,24,24,24.6];
    as=[8,9,8,10,9,10];
  }
  mkChart('c-sr-trend','bar',labels,[
    {label:'이행 보상금 (SMP)',data:smp,backgroundColor:'rgba(0,212,168,0.55)',borderWidth:0,stack:'r'},
    {label:'용량정산금 (CP)',data:cp,backgroundColor:'rgba(0,153,255,0.55)',borderWidth:0,stack:'r'},
    {label:'부가정산금 (AS)',data:as,backgroundColor:'rgba(146,95,255,0.55)',borderWidth:0,stack:'r'},
  ],{plugins:{legend:{display:true,position:'bottom',labels:{font:{size:11},boxWidth:10,padding:6}}},scales:{x:{stacked:true,ticks:{maxTicksLimit:12}},y:{stacked:true,ticks:{callback:v=>v+'M'},title:{display:true,text:unit==='day'?'백만원/일':'백만원/월',color:'#666',font:{size:10}}}}});
  // 준중앙 vs 일반 비교
  mkChart('c-sr-compare','bar',['이행 보상','용량정산','부가정산','총 수익'],[
    {label:'일반 입찰 (DAES)',data:[46.8,0,0,46.8],backgroundColor:'rgba(120,120,120,0.5)',borderWidth:0},
    {label:'준중앙급전',data:[52.8,24.6,10.0,87.4],backgroundColor:'rgba(0,89,255,0.6)',borderWidth:0},
  ],{plugins:{legend:{display:true,position:'bottom',labels:{font:{size:11},boxWidth:10,padding:6}}},scales:{y:{ticks:{callback:v=>v+'M'},title:{display:true,text:'백만원',color:'#666',font:{size:10}}}}});
};
// 필터 적용: 자원 테이블 + 정산 항목 + 추이 차트 재렌더
window.srFilterApply=function(){
  const unit=document.getElementById('sr-f-unit')?.value||'month';
  const type=document.getElementById('sr-f-type')?.value||'all';
  const vpp=document.getElementById('sr-f-vpp')?.value||'전체';
  const item=document.getElementById('sr-f-item')?.value||'all';
  // 자원 테이블 필터
  const rows=document.querySelectorAll('#sr-res-tbody tr[data-type]');
  let visible=0;
  rows.forEach(tr=>{
    let show=true;
    if(type!=='all' && tr.dataset.type!==type)show=false;
    if(vpp!=='전체' && tr.dataset.vpp!==vpp)show=false;
    tr.style.display=show?'':'none';
    if(show)visible++;
  });
  const cnt=document.getElementById('sr-res-cnt');
  if(cnt)cnt.textContent=visible+'개소';
  // 정산 항목 필터
  document.querySelectorAll('#sr-item-tbody tr[data-item]').forEach(tr=>{
    tr.style.display=(item==='all'||tr.dataset.item===item||(item!=='all'&&tr.dataset.item==='bonus')||(item!=='all'&&tr.dataset.item==='penalty'))?'':'none';
  });
  // 차트 제목 갱신
  const title=document.getElementById('sr-trend-title');
  if(title)title.textContent=(unit==='day'?'일별 준중앙 수익 추이 (4월 1~23일)':'월별 준중앙 수익 추이 (6개월)');
  // 차트 재렌더
  setTimeout(window._srInitCharts,30);
};
window.srDownloadPDF=function(){
  const wasOpen=document.getElementById('modal-sr-doc')?.style.display==='flex';
  if(!wasOpen) openModal('modal-sr-doc');
  const prevTitle=document.title;
  document.title='준중앙급전_정산근거서_2026-04';
  setTimeout(()=>{
    window.print();
    document.title=prevTitle;
  },wasOpen?50:250);
};
window.srReset=function(){
  const defaults={'sr-f-from':'2026-01-01','sr-f-to':'2026-04-23','sr-f-unit':'month','sr-f-type':'all','sr-f-vpp':'전체','sr-f-item':'all'};
  Object.entries(defaults).forEach(([id,val])=>{const el=document.getElementById(id);if(el)el.value=val;});
  window.srFilterApply();
};

