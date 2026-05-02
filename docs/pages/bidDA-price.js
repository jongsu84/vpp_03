// AUTO-GENERATED FROM index.html — page module: bidDA-price
window.P = window.P || {};
/* ===== 하루전입찰: 가격 전략 — VPP 그룹 중심 3단계 정책 (Option α) ===== */

/* 시장 규정 (지역별 차등) */
window.MARKET_RULES={
  'VPP-전남권':{region:'육지',minPrice:0,smpAvg:138,label:'전남권',types:['태양광','풍력','바이오','V2G']},
  'VPP-제주권':{region:'제주',minPrice:-500,smpAvg:92,label:'제주권 (음가격 가능)',types:['태양광','ESS','V2G']},
  'VPP-경북권':{region:'육지',minPrice:0,smpAvg:135,label:'경북권',types:['태양광','풍력','바이오']}
};

/* VPP 그룹 × 자원 유형별 가격 정책 (그룹 컨텍스트로 차등) */
window.bdpPolicy=window.bdpPolicy||{
  'VPP-전남권':{
    '태양광':{cost:5.2,w:0.95,max:200},
    '풍력':{cost:18.5,w:0.88,max:200},
    'ESS':{cost:22.0,w:0.92,max:220},
    '바이오':{cost:28.5,w:1.05,max:250},
    'V2G':{cost:8.0,w:0.90,max:180}
  },
  'VPP-제주권':{
    '태양광':{cost:5.5,w:0.92,max:180},
    '풍력':{cost:18.5,w:0.85,max:180},
    'ESS':{cost:22.0,w:0.95,max:220},
    '바이오':{cost:28.5,w:1.05,max:250},
    'V2G':{cost:8.0,w:0.92,max:180}
  },
  'VPP-경북권':{
    '태양광':{cost:5.2,w:0.96,max:200},
    '풍력':{cost:18.5,w:0.90,max:200},
    'ESS':{cost:22.0,w:0.92,max:220},
    '바이오':{cost:28.5,w:1.08,max:250},
    'V2G':{cost:8.0,w:0.90,max:180}
  }
};

/* 자원별 오버라이드 (특수 케이스) */
window.bdpResourceOverrides=window.bdpResourceOverrides||{};

/* 현재 선택된 VPP 그룹 (필터 상태) */
window._bdpCurrentVPP='VPP-전남권';

/* 자원 유형 → ID prefix 매핑 */
window._bdpTypeMap={'태양광':'sol','풍력':'win','ESS':'ess','바이오':'bio','V2G':'v2g'};

window.P['bidDA-price']=()=>`
${_mkCross('bidDA-price')}
${_mkBidFilter({prefix:'bdp',onChange:'bidPriceApply',rightInfo:'필터 변경 시 화면 전체가 해당 그룹 정책으로 동적 갱신됩니다'})}

<!-- 컨텍스트 배너 (현재 선택된 그룹 표시) -->
<div class="card" id="bdp-ctx-banner" style="background:linear-gradient(90deg,#e8f2ff 0%,#f4f9ff 100%);border-left:4px solid #0059ff;margin-bottom:12px;padding:10px 14px">
  <div style="display:flex;align-items:center;gap:12px">
    <div style="font-size:20px">🏷️</div>
    <div style="flex:1">
      <div style="font-size:13px;font-weight:700;color:#0b2a5b" id="bdp-ctx-title">현재 정책 컨텍스트: VPP-전남권 (육지)</div>
      <div style="font-size:11px;color:#1b3c7a;margin-top:2px" id="bdp-ctx-sub">SMP 평균 138원 · 하한가 0원 · 자원 유형 4종 (태양광·풍력·바이오·V2G)</div>
    </div>
    <span class="badge" id="bdp-ctx-region" style="font-size:11px">육지</span>
  </div>
</div>

<!-- KPI 4종 (그룹별 동적 데이터) -->
<div class="g4">
  <div class="card acc"><div class="ct">SMP 평균 ${window.tip('SMP 평균','선택한 VPP 그룹의 24시간 SMP 가중 평균','Σ(시간대별 SMP × 거래량) ÷ Σ(거래량) [원/kWh]','육지 평균 130~140원 / 제주 평균 70~100원 (음가격 빈번)')}</div><div class="kv" id="bdp-kpi-smp">138<span class="ku">원/kWh</span></div><div class="kd up" id="bdp-kpi-smp-sub">육지 시장</div></div>
  <div class="card"><div class="ct">적용 하한가 ${window.tip('적용 하한가','선택한 VPP 그룹의 시장 규정상 최저 입찰가','육지: 0원/kWh · 제주: −500원/kWh (음가격 입찰 가능)','제주는 출력제어 빈번 → 음가격 시장에서 ESS 충전·V2G 활용 권장')}</div><div class="kv" id="bdp-kpi-min">0<span class="ku">원/kWh</span></div><div class="kd neu" id="bdp-kpi-min-sub">육지 재생입찰</div></div>
  <div class="card"><div class="ct">평균 변동비 ${window.tip('평균 변동비 (가중평균)','그룹 내 자원의 변동비를 자원 유형 비중으로 가중평균','Σ(유형 변동비 × 그룹 내 비중) [원/kWh]','이 값보다 낮은 입찰가는 역마진 — 자동 차단')}</div><div class="kv" id="bdp-kpi-cost">12.8<span class="ku">원/kWh</span></div><div class="kd neu" id="bdp-kpi-cost-sub">역마진 방지선</div></div>
  <div class="card"><div class="ct">예측 정확도 ${window.tip('예측 정확도 평균','그룹 내 자원의 NMAE 가중평균','Σ(자원별 NMAE × 자원 용량) ÷ Σ(자원 용량) [%]','5% 이내 우수 / 8% 이내 양호 / 10% 초과 시 모델 재학습 검토')}</div><div class="kv" style="color:var(--semantic-positive-normal)" id="bdp-kpi-acc">93.2<span class="ku">%</span></div><div class="kd up" id="bdp-kpi-acc-sub">Merit Order 기준</div></div>
</div>

<!-- 자원 유형별 가격 정책 (현재 그룹 컨텍스트) -->
<div class="card mb">
  <div class="sh">
    <div class="st">자원 유형별 가격 정책 <span style="font-size:11px;color:var(--semantic-label-alt);font-weight:400" id="bdp-pol-ctx-label">— VPP-전남권 컨텍스트</span> ${window.tip('자원 유형별 가격 정책','선택한 VPP 그룹 내에서 자원 유형별로 차등 적용되는 가격 산출 규칙','입찰가 = max(변동비, min(SMP × 가중치, 상한가))','VPP 그룹 필터 변경 시 해당 그룹의 정책으로 자동 로드. 그룹 내 없는 자원 유형은 비활성 표시')}</div>
    <div style="display:flex;gap:6px;align-items:center">
      <span class="badge ok" style="font-size:10px">KPX 시장감시 로그 투명기록</span>
      <button class="cb p sm" onclick="bdpSavePolicy()" style="font-size:11px">정책 저장 · 재배포</button>
    </div>
  </div>
  <div class="g5" style="gap:10px" id="bdp-pol-cards">
    <div class="card bdp-pol-card" data-type="태양광" style="padding:10px">
      <div style="font-weight:600;margin-bottom:8px"><span class="badge inf">태양광</span></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">변동비 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-sol-cost" step="0.1" min="0"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">SMP 가중치</label><input class="inp" type="number" id="bdp-pol-sol-w" step="0.01" min="0.50" max="1.50"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">상한가 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-sol-max" min="0"></div>
      <div style="font-size:10px;color:var(--semantic-label-alt);padding-top:6px;border-top:1px solid var(--semantic-line-alt);margin-top:4px" id="bdp-pol-sol-preview">예상가: —</div>
    </div>
    <div class="card bdp-pol-card" data-type="풍력" style="padding:10px">
      <div style="font-weight:600;margin-bottom:8px"><span class="badge" style="background:var(--semantic-tag-bg-blue);color:var(--semantic-tag-label-blue)">풍력</span></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">변동비 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-win-cost" step="0.1" min="0"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">SMP 가중치</label><input class="inp" type="number" id="bdp-pol-win-w" step="0.01" min="0.50" max="1.50"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">상한가 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-win-max" min="0"></div>
      <div style="font-size:10px;color:var(--semantic-label-alt);padding-top:6px;border-top:1px solid var(--semantic-line-alt);margin-top:4px" id="bdp-pol-win-preview">예상가: —</div>
    </div>
    <div class="card bdp-pol-card" data-type="ESS" style="padding:10px">
      <div style="font-weight:600;margin-bottom:8px"><span class="badge" style="background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow)">ESS</span></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">변동비 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-ess-cost" step="0.1" min="0"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">SMP 가중치</label><input class="inp" type="number" id="bdp-pol-ess-w" step="0.01" min="0.50" max="1.50"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">상한가 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-ess-max" min="0"></div>
      <div style="font-size:10px;color:var(--semantic-label-alt);padding-top:6px;border-top:1px solid var(--semantic-line-alt);margin-top:4px" id="bdp-pol-ess-preview">예상가: —</div>
    </div>
    <div class="card bdp-pol-card" data-type="바이오" style="padding:10px">
      <div style="font-weight:600;margin-bottom:8px"><span class="badge" style="background:#e8defa;color:#6035cc">바이오</span></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">변동비 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-bio-cost" step="0.1" min="0"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">SMP 가중치</label><input class="inp" type="number" id="bdp-pol-bio-w" step="0.01" min="0.50" max="1.50"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">상한가 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-bio-max" min="0"></div>
      <div style="font-size:10px;color:var(--semantic-label-alt);padding-top:6px;border-top:1px solid var(--semantic-line-alt);margin-top:4px" id="bdp-pol-bio-preview">예상가: —</div>
    </div>
    <div class="card bdp-pol-card" data-type="V2G" style="padding:10px">
      <div style="font-weight:600;margin-bottom:8px"><span class="badge" style="background:var(--semantic-tag-bg-green);color:var(--semantic-tag-label-green)">V2G</span></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">변동비 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-v2g-cost" step="0.1" min="0"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">SMP 가중치</label><input class="inp" type="number" id="bdp-pol-v2g-w" step="0.01" min="0.50" max="1.50"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">상한가 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-v2g-max" min="0"></div>
      <div style="font-size:10px;color:var(--semantic-label-alt);padding-top:6px;border-top:1px solid var(--semantic-line-alt);margin-top:4px" id="bdp-pol-v2g-preview">예상가: —</div>
    </div>
  </div>
  <div style="font-size:11px;color:var(--semantic-label-alt);margin-top:10px;line-height:18px;padding:8px 10px;background:var(--semantic-background-2);border-radius:4px">
    ℹ 입찰가 = <b>max(변동비, min(SMP × 가중치, 상한가))</b> · 변동비 미만 자동 차단 · 정책 우선순위: <b>자원 OR > VPP 그룹 정책 > 글로벌 fallback</b>
  </div>
</div>

<!-- Merit Order (현재 그룹 자원만 표시) -->
<div class="card mb">
  <div class="sh">
    <div class="st">Merit Order · 자원별 최종 입찰가 <span style="font-size:11px;color:var(--semantic-label-alt);font-weight:400" id="bdp-merit-ctx-label">— VPP-전남권 자원</span> ${window.tip('Merit Order — 자원별 최종 입찰가','선택한 VPP 그룹의 자원만 표시. VPP 그룹 정책 + 자원 OR을 종합한 최종 입찰가','우선순위: 자원 OR > VPP 그룹 정책','각 행 [편집]으로 자원별 정책 오버라이드 (특수 케이스용)')}</div>
  </div>
  <div style="overflow-x:auto"><table class="tbl"><thead><tr><th>우선</th><th>자원</th><th>유형</th><th>회사</th><th>NMAE</th><th>배정용량</th><th>최종 입찰가</th><th>정책 출처</th><th>편집</th></tr></thead><tbody id="bdp-merit-tbody">
    <tr data-name="순천 바이오가스" data-type="바이오" data-company="순천바이오㈜" data-vpp="VPP-전남권" data-nmae="2.1" data-cap="1.42"><td class="mono">1</td><td>순천 바이오가스</td><td><span class="badge" style="background:#e8defa;color:#6035cc">바이오</span></td><td style="font-size:11px">순천바이오㈜</td><td class="mono" style="color:var(--semantic-positive-normal)">2.1%</td><td class="mono">1.42MW</td><td class="mono bdp-final-price" style="font-weight:600;color:var(--semantic-brand-primary)">—</td><td class="bdp-final-source" style="font-size:10px;color:var(--semantic-label-alt)">—</td><td><button class="cb n sm" onclick="bdpOpenOverride(this)" style="font-size:10px">편집</button></td></tr>
    <tr data-name="여수 바이오매스" data-type="바이오" data-company="여수바이오㈜" data-vpp="VPP-전남권" data-nmae="2.8" data-cap="2.85"><td class="mono">2</td><td>여수 바이오매스</td><td><span class="badge" style="background:#e8defa;color:#6035cc">바이오</span></td><td style="font-size:11px">여수바이오㈜</td><td class="mono" style="color:var(--semantic-positive-normal)">2.8%</td><td class="mono">2.85MW</td><td class="mono bdp-final-price" style="font-weight:600;color:var(--semantic-brand-primary)">—</td><td class="bdp-final-source" style="font-size:10px;color:var(--semantic-label-alt)">—</td><td><button class="cb n sm" onclick="bdpOpenOverride(this)" style="font-size:10px">편집</button></td></tr>
    <tr data-name="광양항태양광 01단계" data-type="태양광" data-company="광양항태양광㈜" data-vpp="VPP-전남권" data-nmae="4.2" data-cap="2.18"><td class="mono">3</td><td>광양항태양광 01단계</td><td><span class="badge inf">태양광</span></td><td style="font-size:11px">광양항태양광㈜</td><td class="mono" style="color:var(--semantic-positive-normal)">4.2%</td><td class="mono">2.18MW</td><td class="mono bdp-final-price" style="font-weight:600;color:var(--semantic-brand-primary)">—</td><td class="bdp-final-source" style="font-size:10px;color:var(--semantic-label-alt)">—</td><td><button class="cb n sm" onclick="bdpOpenOverride(this)" style="font-size:10px">편집</button></td></tr>
    <tr data-name="광양항태양광 04단계" data-type="태양광" data-company="광양항태양광㈜" data-vpp="VPP-전남권" data-nmae="5.1" data-cap="2.09"><td class="mono">4</td><td>광양항태양광 04단계</td><td><span class="badge inf">태양광</span></td><td style="font-size:11px">광양항태양광㈜</td><td class="mono" style="color:var(--semantic-positive-normal)">5.1%</td><td class="mono">2.09MW</td><td class="mono bdp-final-price" style="font-weight:600;color:var(--semantic-brand-primary)">—</td><td class="bdp-final-source" style="font-size:10px;color:var(--semantic-label-alt)">—</td><td><button class="cb n sm" onclick="bdpOpenOverride(this)" style="font-size:10px">편집</button></td></tr>
    <tr data-name="금능1호 ESS" data-type="ESS" data-company="금능에너지㈜" data-vpp="VPP-제주권" data-nmae="5.5" data-cap="1.80"><td class="mono">5</td><td>금능1호 ESS</td><td><span class="badge" style="background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow)">ESS</span></td><td style="font-size:11px">금능에너지㈜</td><td class="mono">5.5%</td><td class="mono">1.80MW</td><td class="mono bdp-final-price" style="font-weight:600;color:var(--semantic-brand-primary)">—</td><td class="bdp-final-source" style="font-size:10px;color:var(--semantic-label-alt)">—</td><td><button class="cb n sm" onclick="bdpOpenOverride(this)" style="font-size:10px">편집</button></td></tr>
    <tr data-name="제주 ESS허브" data-type="ESS" data-company="제주ESS㈜" data-vpp="VPP-제주권" data-nmae="6.2" data-cap="2.50"><td class="mono">6</td><td>제주 ESS허브</td><td><span class="badge" style="background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow)">ESS</span></td><td style="font-size:11px">제주ESS㈜</td><td class="mono">6.2%</td><td class="mono">2.50MW</td><td class="mono bdp-final-price" style="font-weight:600;color:var(--semantic-brand-primary)">—</td><td class="bdp-final-source" style="font-size:10px;color:var(--semantic-label-alt)">—</td><td><button class="cb n sm" onclick="bdpOpenOverride(this)" style="font-size:10px">편집</button></td></tr>
    <tr data-name="해맞이 태양광" data-type="태양광" data-company="해맞이㈜" data-vpp="VPP-전남권" data-nmae="6.8" data-cap="0.95"><td class="mono">7</td><td>해맞이 태양광</td><td><span class="badge inf">태양광</span></td><td style="font-size:11px">해맞이㈜</td><td class="mono">6.8%</td><td class="mono">0.95MW</td><td class="mono bdp-final-price" style="font-weight:600;color:var(--semantic-brand-primary)">—</td><td class="bdp-final-source" style="font-size:10px;color:var(--semantic-label-alt)">—</td><td><button class="cb n sm" onclick="bdpOpenOverride(this)" style="font-size:10px">편집</button></td></tr>
    <tr data-name="온누리 태양광" data-type="태양광" data-company="온누리㈜" data-vpp="VPP-전남권" data-nmae="7.4" data-cap="0.94"><td class="mono">8</td><td>온누리 태양광</td><td><span class="badge inf">태양광</span></td><td style="font-size:11px">온누리㈜</td><td class="mono">7.4%</td><td class="mono">0.94MW</td><td class="mono bdp-final-price" style="font-weight:600;color:var(--semantic-brand-primary)">—</td><td class="bdp-final-source" style="font-size:10px;color:var(--semantic-label-alt)">—</td><td><button class="cb n sm" onclick="bdpOpenOverride(this)" style="font-size:10px">편집</button></td></tr>
    <tr data-name="김주풍력 02단계" data-type="풍력" data-company="김주풍력㈜" data-vpp="VPP-경북권" data-nmae="8.2" data-cap="9.50"><td class="mono">9</td><td>김주풍력 02단계</td><td><span class="badge" style="background:var(--semantic-tag-bg-blue);color:var(--semantic-tag-label-blue)">풍력</span></td><td style="font-size:11px">김주풍력㈜</td><td class="mono">8.2%</td><td class="mono">9.50MW</td><td class="mono bdp-final-price" style="font-weight:600;color:var(--semantic-brand-primary)">—</td><td class="bdp-final-source" style="font-size:10px;color:var(--semantic-label-alt)">—</td><td><button class="cb n sm" onclick="bdpOpenOverride(this)" style="font-size:10px">편집</button></td></tr>
    <tr data-name="김주풍력 01단계" data-type="풍력" data-company="김주풍력㈜" data-vpp="VPP-경북권" data-nmae="9.1" data-cap="3.80"><td class="mono">10</td><td>김주풍력 01단계</td><td><span class="badge" style="background:var(--semantic-tag-bg-blue);color:var(--semantic-tag-label-blue)">풍력</span></td><td style="font-size:11px">김주풍력㈜</td><td class="mono" style="color:var(--palette-yellow-40)">9.1%</td><td class="mono">3.80MW</td><td class="mono bdp-final-price" style="font-weight:600;color:var(--semantic-brand-primary)">—</td><td class="bdp-final-source" style="font-size:10px;color:var(--semantic-label-alt)">—</td><td><button class="cb n sm" onclick="bdpOpenOverride(this)" style="font-size:10px">편집</button></td></tr>
    <tr data-name="광주 V2G 스테이션" data-type="V2G" data-company="광주V2G㈜" data-vpp="VPP-전남권" data-nmae="10.5" data-cap="0.72"><td class="mono">11</td><td>광주 V2G 스테이션</td><td><span class="badge" style="background:var(--semantic-tag-bg-green);color:var(--semantic-tag-label-green)">V2G</span></td><td style="font-size:11px">광주V2G㈜</td><td class="mono" style="color:var(--palette-yellow-40)">10.5%</td><td class="mono">0.72MW</td><td class="mono bdp-final-price" style="font-weight:600;color:var(--semantic-brand-primary)">—</td><td class="bdp-final-source" style="font-size:10px;color:var(--semantic-label-alt)">—</td><td><button class="cb n sm" onclick="bdpOpenOverride(this)" style="font-size:10px">편집</button></td></tr>
    <tr data-name="전남 V2G 허브" data-type="V2G" data-company="전남V2G㈜" data-vpp="VPP-전남권" data-nmae="11.8" data-cap="1.35"><td class="mono">12</td><td>전남 V2G 허브</td><td><span class="badge" style="background:var(--semantic-tag-bg-green);color:var(--semantic-tag-label-green)">V2G</span></td><td style="font-size:11px">전남V2G㈜</td><td class="mono" style="color:var(--palette-yellow-40)">11.8%</td><td class="mono">1.35MW</td><td class="mono bdp-final-price" style="font-weight:600;color:var(--semantic-brand-primary)">—</td><td class="bdp-final-source" style="font-size:10px;color:var(--semantic-label-alt)">—</td><td><button class="cb n sm" onclick="bdpOpenOverride(this)" style="font-size:10px">편집</button></td></tr>
  </tbody></table></div>
  <div style="font-size:12px;color:var(--semantic-label-alt);margin-top:8px;line-height:18px">※ <b>정책 출처</b>: <span style="color:#0a7">VPP 그룹</span>(기본) / <span style="color:#d32">자원 OR</span>(개별 오버라이드)</div>
</div>

<!-- 가격 민감도 분석 -->
<div class="card"><div class="sh"><div class="st">가격 민감도 분석 ${window.tip('가격 민감도 분석','선택 그룹의 SMP 가중치 변동(±20%)에 따른 낙찰률·순수익 추정','시뮬: SMP × (가중치 ± 20%)','+10% 부근이 일반적 스위트 스팟 — 그룹별로 다를 수 있음')}</div></div><div style="height:160px;position:relative"><canvas id="c-price" role="img" aria-label="가격 민감도"></canvas></div></div>

<!-- 자원별 오버라이드 모달 -->
<div class="modal-backdrop" id="modal-bdp-override" style="display:none" onclick="closeModalBg(event,'modal-bdp-override')">
  <div class="modal">
    <div class="modal-hdr">
      <span class="modal-title" id="bdp-override-title">자원별 가격 정책 오버라이드</span>
      <button class="modal-close" onclick="closeModal('modal-bdp-override')">✕</button>
    </div>
    <div class="modal-body">
      <div style="padding:10px 12px;background:var(--semantic-background-2);border-radius:6px;font-size:11px;line-height:18px;margin-bottom:14px" id="bdp-override-info">자원 정보 로딩...</div>
      <div class="form-section">오버라이드 활성화</div>
      <div class="form-row">
        <div class="form-item">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
            <input type="checkbox" id="bdp-override-enabled">
            <span>이 자원에 개별 정책 적용 (체크 해제 시 VPP 그룹 정책 따름)</span>
          </label>
        </div>
      </div>
      <hr class="form-divider">
      <div class="form-section">오버라이드 값 (체크 시에만 적용)</div>
      <div class="form-row">
        <div class="form-item"><label>변동비 (원/kWh)</label><input class="inp" type="number" id="bdp-override-cost" step="0.1" min="0"></div>
        <div class="form-item"><label>SMP 가중치</label><input class="inp" type="number" id="bdp-override-w" step="0.01" min="0.50" max="1.50"></div>
      </div>
      <div class="form-row">
        <div class="form-item"><label>입찰 상한가 (원/kWh)</label><input class="inp" type="number" id="bdp-override-max" min="0"></div>
        <div class="form-item"></div>
      </div>
      <div style="padding:10px 12px;background:var(--semantic-tag-bg-yellow);border-radius:6px;font-size:11px;color:var(--semantic-tag-label-yellow);line-height:18px;margin-top:10px">
        ⚠ 자원별 오버라이드는 VPP 그룹 정책을 무시합니다. 특수 자원(시범사업·계약 특례 등)에만 사용하세요.
      </div>
    </div>
    <div class="modal-footer">
      <button class="cb d" style="margin-right:auto;font-size:10px" onclick="bdpClearOverride()">오버라이드 해제</button>
      <button class="cb n" onclick="closeModal('modal-bdp-override')">취소</button>
      <button class="cb p" onclick="bdpSaveOverride()">저장</button>
    </div>
  </div>
</div>`;

// ===== 컨텍스트 배너 + KPI 갱신 =====
window.bdpRenderContext=function(){
  var vpp=window._bdpCurrentVPP;
  var rule=window.MARKET_RULES[vpp];
  if(!rule) return;
  var ttl=document.getElementById('bdp-ctx-title');
  var sub=document.getElementById('bdp-ctx-sub');
  var rgn=document.getElementById('bdp-ctx-region');
  if(ttl) ttl.textContent='현재 정책 컨텍스트: '+vpp+' ('+rule.region+')';
  if(sub) sub.textContent='SMP 평균 '+rule.smpAvg+'원 · 하한가 '+rule.minPrice+'원 · 자원 유형 '+rule.types.length+'종 ('+rule.types.join('·')+')';
  if(rgn){
    rgn.textContent=rule.region;
    if(rule.region==='제주'){ rgn.className='badge warn'; rgn.style.fontSize='11px'; }
    else { rgn.className='badge'; rgn.style.fontSize='11px'; rgn.style.background='var(--semantic-tag-bg-blue)'; rgn.style.color='var(--semantic-tag-label-blue)'; }
  }
  // KPI
  var smpEl=document.getElementById('bdp-kpi-smp');
  if(smpEl) smpEl.innerHTML=rule.smpAvg+'<span class="ku">원/kWh</span>';
  var smpSub=document.getElementById('bdp-kpi-smp-sub');
  if(smpSub) smpSub.textContent=rule.region+' 시장';
  var minEl=document.getElementById('bdp-kpi-min');
  if(minEl){
    var color=rule.minPrice<0?'color:var(--semantic-negative-normal)':'';
    minEl.innerHTML='<span style="'+color+'">'+rule.minPrice+'</span><span class="ku">원/kWh</span>';
  }
  var minSub=document.getElementById('bdp-kpi-min-sub');
  if(minSub) minSub.textContent=rule.region==='제주'?'음(-)가격 입찰 가능':'육지 재생입찰';
  // 변동비 평균 (그룹 내 자원 유형의 가중평균 — 자원 수 기준)
  var pol=window.bdpPolicy[vpp];
  if(pol){
    var rows=Array.from(document.querySelectorAll('#bdp-merit-tbody tr[data-vpp="'+vpp+'"]'));
    var totalCap=0,sumCost=0,sumNmae=0;
    rows.forEach(function(tr){
      var cap=parseFloat(tr.dataset.cap)||0;
      var typ=tr.dataset.type;
      var nm=parseFloat(tr.dataset.nmae)||0;
      if(pol[typ]){ sumCost+=pol[typ].cost*cap; sumNmae+=nm*cap; totalCap+=cap; }
    });
    var avgCost=totalCap>0?(sumCost/totalCap):0;
    var avgNmae=totalCap>0?(sumNmae/totalCap):0;
    var ce=document.getElementById('bdp-kpi-cost');
    if(ce) ce.innerHTML=avgCost.toFixed(1)+'<span class="ku">원/kWh</span>';
    var ceSub=document.getElementById('bdp-kpi-cost-sub');
    if(ceSub) ceSub.textContent=rows.length+'개 자원 가중평균';
    var ae=document.getElementById('bdp-kpi-acc');
    if(ae) ae.innerHTML=(100-avgNmae).toFixed(1)+'<span class="ku">%</span>';
    var aeSub=document.getElementById('bdp-kpi-acc-sub');
    if(aeSub) aeSub.textContent='Merit Order 기준 ('+rows.length+'자원)';
  }
};

// ===== 자원 유형 카드 갱신 (그룹 컨텍스트 + 자원 수 표시) =====
window.bdpRenderTypeCards=function(){
  var vpp=window._bdpCurrentVPP;
  var rule=window.MARKET_RULES[vpp];
  var pol=window.bdpPolicy[vpp];
  if(!rule||!pol) return;
  // 컨텍스트 라벨
  var ctxLbl=document.getElementById('bdp-pol-ctx-label');
  if(ctxLbl) ctxLbl.textContent='— '+vpp+' 컨텍스트';
  // 그룹 내 자원 유형별 카운트
  var typeCount={};
  document.querySelectorAll('#bdp-merit-tbody tr[data-vpp="'+vpp+'"]').forEach(function(tr){
    var t=tr.dataset.type;
    typeCount[t]=(typeCount[t]||0)+1;
  });
  // 5개 카드: 모두 활성화 (사전 정책 설정 가능) + 자원 수 배지 표시
  Object.keys(window._bdpTypeMap).forEach(function(type){
    var prefix=window._bdpTypeMap[type];
    var card=document.querySelector('.bdp-pol-card[data-type="'+type+'"]');
    if(card){
      card.style.opacity='1';
      card.style.pointerEvents='auto';
      // 자원 수 배지 추가/갱신
      var countBadge=card.querySelector('.bdp-type-count');
      if(!countBadge){
        countBadge=document.createElement('span');
        countBadge.className='bdp-type-count';
        countBadge.style.cssText='font-size:9px;font-weight:400;margin-left:6px;padding:1px 6px;border-radius:8px';
        var titleDiv=card.querySelector('div[style*="font-weight:600"]');
        if(titleDiv) titleDiv.appendChild(countBadge);
      }
      var n=typeCount[type]||0;
      if(n>0){
        countBadge.textContent=n+'자원';
        countBadge.style.background='var(--semantic-positive-assistive,#e8f4ed)';
        countBadge.style.color='var(--semantic-positive-normal,#0a7)';
        card.title='';
      } else {
        countBadge.textContent='사전 설정';
        countBadge.style.background='var(--semantic-background-3,#f0f0f5)';
        countBadge.style.color='var(--semantic-label-alt,#888)';
        card.title='이 그룹에 현재 해당 자원 없음 — 사전 정책 설정 가능 (향후 자원 추가 대비)';
      }
    }
    var p=pol[type];
    if(!p) return;
    var costEl=document.getElementById('bdp-pol-'+prefix+'-cost'); if(costEl) costEl.value=p.cost;
    var wEl=document.getElementById('bdp-pol-'+prefix+'-w'); if(wEl) wEl.value=p.w;
    var maxEl=document.getElementById('bdp-pol-'+prefix+'-max'); if(maxEl) maxEl.value=p.max;
  });
  window.bdpUpdatePreview();
};

function _bdpReadCard(prefix){
  return {
    cost:parseFloat(document.getElementById('bdp-pol-'+prefix+'-cost')?.value)||0,
    w:parseFloat(document.getElementById('bdp-pol-'+prefix+'-w')?.value)||0,
    max:parseFloat(document.getElementById('bdp-pol-'+prefix+'-max')?.value)||0
  };
}

window.bdpUpdatePreview=function(){
  var vpp=window._bdpCurrentVPP;
  var rule=window.MARKET_RULES[vpp];
  if(!rule) return;
  var smp=rule.smpAvg;
  Object.keys(window._bdpTypeMap).forEach(function(type){
    var prefix=window._bdpTypeMap[type];
    var p=_bdpReadCard(prefix);
    var raw=smp*p.w;
    var clamped=Math.max(p.cost,Math.min(p.max,raw));
    var pv=document.getElementById('bdp-pol-'+prefix+'-preview');
    if(pv){
      var note=raw<p.cost?' · 변동비 가드':raw>p.max?' · 상한 가드':'';
      pv.textContent='예상가: '+clamped.toFixed(0)+'원 (SMP '+smp+'×'+p.w.toFixed(2)+')'+note;
    }
  });
};

// ===== 정책 우선순위 해석 (자원 OR > VPP 그룹) =====
window.bdpResolveResource=function(tr){
  if(!tr) return null;
  var name=tr.dataset.name;
  var type=tr.dataset.type;
  var vpp=tr.dataset.vpp;
  var pol=window.bdpPolicy[vpp]&&window.bdpPolicy[vpp][type];
  var rule=window.MARKET_RULES[vpp];
  if(!pol||!rule) return null;
  var resOR=window.bdpResourceOverrides[name];
  if(resOR && resOR.enabled){
    return {
      cost:resOR.cost!=null?resOR.cost:pol.cost,
      w:resOR.w!=null?resOR.w:pol.w,
      max:resOR.max!=null?resOR.max:pol.max,
      smp:rule.smpAvg,
      minPrice:rule.minPrice,
      source:'자원 OR'
    };
  }
  return {cost:pol.cost,w:pol.w,max:pol.max,smp:rule.smpAvg,minPrice:rule.minPrice,source:'VPP 그룹'};
};

// ===== Merit Order 렌더 (현재 그룹 자원만) =====
window.bdpRenderMeritPrices=function(){
  var vpp=window._bdpCurrentVPP;
  var ctxLbl=document.getElementById('bdp-merit-ctx-label');
  if(ctxLbl) ctxLbl.textContent='— '+vpp+' 자원';
  var idx=0;
  document.querySelectorAll('#bdp-merit-tbody tr[data-name]').forEach(function(tr){
    var matchVpp=tr.dataset.vpp===vpp;
    tr.style.display=matchVpp?'':'none';
    if(!matchVpp) return;
    idx++;
    if(tr.cells[0]) tr.cells[0].textContent=idx;
    var r=window.bdpResolveResource(tr);
    if(!r) return;
    var raw=r.smp*r.w;
    var clamped=Math.max(r.cost,Math.max(r.minPrice,Math.min(r.max,raw)));
    var priceCell=tr.querySelector('.bdp-final-price');
    var sourceCell=tr.querySelector('.bdp-final-source');
    if(priceCell) priceCell.textContent=clamped.toFixed(0)+'원';
    if(sourceCell){
      var color=r.source==='자원 OR'?'#d32':'#0a7';
      sourceCell.innerHTML='<span style="color:'+color+';font-weight:600">'+r.source+'</span> · w='+r.w.toFixed(2);
    }
  });
};

// ===== 정책 저장 (현재 그룹 — 5개 유형 모두 검증·저장) =====
window.bdpSavePolicy=function(){
  var vpp=window._bdpCurrentVPP;
  var rule=window.MARKET_RULES[vpp];
  if(!rule){toast('VPP 그룹을 선택하세요.','warn');return;}
  var errs=[];
  var newPol={};
  // 그룹 내 자원 유형별 카운트 (사전 설정 vs 즉시 적용 구분 안내용)
  var typeCount={};
  document.querySelectorAll('#bdp-merit-tbody tr[data-vpp="'+vpp+'"]').forEach(function(tr){
    var t=tr.dataset.type;
    typeCount[t]=(typeCount[t]||0)+1;
  });
  var activeTypes=0, preconfTypes=0;
  Object.keys(window._bdpTypeMap).forEach(function(type){
    var prefix=window._bdpTypeMap[type];
    var p=_bdpReadCard(prefix);
    if(p.cost<0) errs.push(type+': 변동비 0 이상');
    if(p.w<0.5||p.w>1.5) errs.push(type+': 가중치 0.50~1.50');
    if(p.max<=0) errs.push(type+': 상한가 0 초과');
    if(p.max<p.cost) errs.push(type+': 상한가 < 변동비 (역마진)');
    newPol[type]=p;
    if((typeCount[type]||0)>0) activeTypes++; else preconfTypes++;
  });
  if(errs.length>0){toast(errs[0],'warn');return;}
  if(!confirm(vpp+' 그룹의 가격 정책을 저장하고 다음 입찰 차수부터 적용하시겠습니까?\n\n· 즉시 적용: '+activeTypes+'개 유형 (그룹 내 자원 존재)\n· 사전 설정: '+preconfTypes+'개 유형 (향후 자원 추가 시 자동 적용)\n· '+rule.region+' 시장 규정 (하한가 '+rule.minPrice+'원)\n\n변경 내역은 감사이력에 영구 보관됩니다.')) return;
  window.bdpPolicy[vpp]=newPol;
  window.bdpUpdatePreview();
  window.bdpRenderMeritPrices();
  window.bdpRenderContext();
  toast(vpp+' 정책 저장 — 즉시 적용 '+activeTypes+'개 + 사전 설정 '+preconfTypes+'개 유형');
};

// ===== 자원별 오버라이드 모달 =====
window._bdpEditTr=null;
window.bdpOpenOverride=function(btn){
  var tr=btn.closest('tr');
  if(!tr) return;
  window._bdpEditTr=tr;
  var name=tr.dataset.name;
  var type=tr.dataset.type;
  var vpp=tr.dataset.vpp;
  var company=tr.dataset.company;
  var pol=window.bdpPolicy[vpp]&&window.bdpPolicy[vpp][type];
  var rule=window.MARKET_RULES[vpp];
  if(!pol||!rule) return;
  var existing=window.bdpResourceOverrides[name]||{};
  document.getElementById('bdp-override-title').textContent='자원별 가격 정책 오버라이드 — '+name;
  document.getElementById('bdp-override-info').innerHTML=
    '<b>'+name+'</b> · <span class="badge" style="font-size:10px">'+type+'</span> · '+company+' · '+vpp+'<br>'
    +'<span style="color:var(--semantic-label-alt)">VPP 그룹 정책: 변동비 '+pol.cost+'원 / 가중치 '+pol.w.toFixed(2)+' / 상한 '+pol.max+'원 (SMP '+rule.smpAvg+'원, 하한 '+rule.minPrice+'원)</span>';
  document.getElementById('bdp-override-enabled').checked=!!existing.enabled;
  document.getElementById('bdp-override-cost').value=existing.cost!=null?existing.cost:'';
  document.getElementById('bdp-override-w').value=existing.w!=null?existing.w:'';
  document.getElementById('bdp-override-max').value=existing.max!=null?existing.max:'';
  document.getElementById('bdp-override-cost').placeholder=String(pol.cost);
  document.getElementById('bdp-override-w').placeholder=pol.w.toFixed(2);
  document.getElementById('bdp-override-max').placeholder=String(pol.max);
  openModal('modal-bdp-override');
};

window.bdpSaveOverride=function(){
  var tr=window._bdpEditTr;
  if(!tr) return;
  var name=tr.dataset.name;
  var enabled=document.getElementById('bdp-override-enabled').checked;
  var costVal=document.getElementById('bdp-override-cost').value;
  var wVal=document.getElementById('bdp-override-w').value;
  var maxVal=document.getElementById('bdp-override-max').value;
  var cost=costVal===''?null:parseFloat(costVal);
  var w=wVal===''?null:parseFloat(wVal);
  var max=maxVal===''?null:parseFloat(maxVal);
  if(enabled){
    if(w!=null && (w<0.5||w>1.5)){toast('가중치는 0.50~1.50','warn');return;}
    if(cost!=null && cost<0){toast('변동비는 0 이상','warn');return;}
    if(max!=null && max<=0){toast('상한가는 0 초과','warn');return;}
  }
  window.bdpResourceOverrides[name]={enabled:enabled,cost:cost,w:w,max:max};
  window.bdpRenderMeritPrices();
  closeModal('modal-bdp-override');
  toast(name+' 오버라이드 '+(enabled?'활성화':'비활성화')+' 저장됨');
  window._bdpEditTr=null;
};

window.bdpClearOverride=function(){
  var tr=window._bdpEditTr;
  if(!tr) return;
  var name=tr.dataset.name;
  if(!confirm(name+' 오버라이드 해제 — VPP 그룹 정책으로 복귀합니다.')) return;
  delete window.bdpResourceOverrides[name];
  window.bdpRenderMeritPrices();
  closeModal('modal-bdp-override');
  toast(name+' 오버라이드 해제');
  window._bdpEditTr=null;
};

// ===== 필터 핸들러 (화면 전체 동적 갱신) =====
window.bidPriceApply=function(){
  var vppSel=document.getElementById('bdp-vpp');
  var typeSel=document.getElementById('bdp-type');
  var vppVal=vppSel?vppSel.value:'VPP-전남권';
  var typeVal=typeSel?typeSel.value:'all';
  // VPP 그룹 변경 (옵션 4개 모두 유효한 그룹 — 전체 옵션 제거됨)
  if(window.MARKET_RULES[vppVal] && window._bdpCurrentVPP!==vppVal){
    window._bdpCurrentVPP=vppVal;
    window.bdpRenderContext();
    window.bdpRenderTypeCards();
    window.bdpRenderMeritPrices();
  }
  // 자원 유형 필터 (Merit Order 추가 좁히기)
  document.querySelectorAll('#bdp-merit-tbody tr[data-name]').forEach(function(tr){
    var matchVpp=tr.dataset.vpp===window._bdpCurrentVPP;
    var matchType=(typeVal==='all'||tr.dataset.type===typeVal);
    tr.style.display=(matchVpp&&matchType)?'':'none';
  });
  // 자원 유형 카드 강조 (선택된 유형만)
  if(typeVal && typeVal!=='all'){
    document.querySelectorAll('.bdp-pol-card').forEach(function(c){
      var t=c.dataset.type;
      c.style.outline=t===typeVal?'2px solid #0059ff':'';
    });
  } else {
    document.querySelectorAll('.bdp-pol-card').forEach(function(c){c.style.outline='';});
  }
};

window['I_bidDA-price']=function(){
  // VPP 그룹 필터에서 "전체" 옵션 제거 (페이지가 그룹 컨텍스트 단위로 동작)
  var vppSel=document.getElementById('bdp-vpp');
  if(vppSel){
    Array.from(vppSel.options).forEach(function(o){
      if(o.text==='전체'||o.value==='전체') o.remove();
    });
    vppSel.value=window._bdpCurrentVPP;
  }
  // 정책 카드 입력 변경 시 미리보기 갱신
  ['sol','win','ess','bio','v2g'].forEach(function(p){
    ['cost','w','max'].forEach(function(f){
      var el=document.getElementById('bdp-pol-'+p+'-'+f);
      if(el) el.addEventListener('input',window.bdpUpdatePreview);
    });
  });
  // 초기 렌더
  window.bdpRenderContext();
  window.bdpRenderTypeCards();
  window.bdpRenderMeritPrices();
  mkChart('c-price','line',['-20%','-10%','0%','+10%','+20%'],[
    {label:'낙찰률',data:[62,78,89,93,95],borderColor:'#0059ff',borderWidth:2,pointRadius:3,tension:0.3,fill:false},
    {label:'순수익(백만원)',data:[14.2,18.1,22.5,24.3,24.9],borderColor:'#ffca42',borderWidth:2,pointRadius:3,tension:0.3,fill:false},
  ],{});
};
