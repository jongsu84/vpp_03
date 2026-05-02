// AUTO-GENERATED FROM index.html — page module: bidDA-price
window.P = window.P || {};
/* ===== 하루전입찰: 가격 전략 ===== */
window.P['bidDA-price']=()=>`
${_mkCross('bidDA-price')}
${_mkBidFilter({prefix:'bdp',onChange:'bidPriceApply',rightInfo:'SMP 평균 138원/kWh · 변동비 12.8원 · 정확도 93.2%'})}
<div class="g4">
  <div class="card acc"><div class="ct">오늘 SMP 평균 ${window.tip('오늘 SMP 평균','금일 24시간 SMP의 가중 평균','Σ(시간대별 SMP × 거래량) ÷ Σ(거래량) [원/kWh]','전일 대비 ±5% 정상 변동 / 봄·가을 음가격 위험 / 여름·겨울 피크 200원+')}</div><div class="kv">138<span class="ku">원/kWh</span></div><div class="kd up">▲ +4.1%</div></div>
  <div class="card"><div class="ct">적용 하한가 ${window.tip('적용 하한가','입찰 가능한 최저 가격','육지 재생입찰: 0원/kWh — 음(-)가격 입찰 불가','재생에너지는 음가격 시장에서 출력 감축 또는 ESS 충전으로 대응')}</div><div class="kv">0<span class="ku">원/kWh</span></div><div class="kd neu">육지 재생입찰 기준</div></div>
  <div class="card"><div class="ct">변동비(O&amp;M) ${window.tip('변동비 (O&amp;M)','단위 발전량당 운영·유지비','연간 O&amp;M 비용 ÷ 연간 발전량 [원/kWh]','이 가격 이하로 입찰 시 역마진 — 변동비 미만 가격은 자동 차단')}</div><div class="kv">12.8<span class="ku">원/kWh</span></div><div class="kd neu">역마진 방지 기준선</div></div>
  <div class="card"><div class="ct">예측 정확도 평균 ${window.tip('Merit Order 예측 정확도','각 입찰 가격대별 낙찰 확률 모델의 정확도','Backtesting: 과거 30일 동안 예측한 낙찰가가 실제와 일치한 비율','90% 이상 정상 — 낮으면 가격 결정 모델 재학습 필요 / 시즌 변경 시 일시적 하락 가능')}</div><div class="kv" style="color:var(--semantic-positive-normal)">93.2<span class="ku">%</span></div><div class="kd up">Merit Order 기준</div></div>
</div>
<!-- 자원 유형별 가격 정책 (Option A) -->
<div class="card mb">
  <div class="sh">
    <div class="st">자원 유형별 가격 정책 ${window.tip('자원 유형별 가격 정책','5개 자원 유형(태양광·풍력·ESS·바이오·V2G)에 차등 적용되는 가격 산출 규칙','자원별 입찰가 = SMP_t × 가중치 (단, ≥ 변동비, ≤ 상한가)','각 유형의 변동비·SMP 가중치·상한가를 독립 설정 — 시장 정합성 70%↑ 달성 / 회사별/자원별 오버라이드는 Option C 확장에서 지원')}</div>
    <div style="display:flex;gap:6px;align-items:center">
      <span class="badge ok" style="font-size:10px">KPX 시장감시 로그 투명기록</span>
      <button class="cb p sm" onclick="bdpSavePolicy()" style="font-size:11px">정책 저장 · 재배포</button>
    </div>
  </div>
  <div class="g5" style="gap:10px">
    <!-- 태양광 -->
    <div class="card" style="padding:10px">
      <div style="font-weight:600;margin-bottom:8px"><span class="badge inf">태양광</span></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">변동비 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-sol-cost" value="5.2" step="0.1" min="0"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">SMP 가중치</label><input class="inp" type="number" id="bdp-pol-sol-w" value="0.95" step="0.01" min="0.50" max="1.50"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">상한가 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-sol-max" value="200" min="0"></div>
      <div style="font-size:10px;color:var(--semantic-label-alt);padding-top:6px;border-top:1px solid var(--semantic-line-alt);margin-top:4px" id="bdp-pol-sol-preview">예상가: 131원 (SMP×0.95)</div>
    </div>
    <!-- 풍력 -->
    <div class="card" style="padding:10px">
      <div style="font-weight:600;margin-bottom:8px"><span class="badge" style="background:var(--semantic-tag-bg-blue);color:var(--semantic-tag-label-blue)">풍력</span></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">변동비 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-win-cost" value="18.5" step="0.1" min="0"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">SMP 가중치</label><input class="inp" type="number" id="bdp-pol-win-w" value="0.88" step="0.01" min="0.50" max="1.50"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">상한가 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-win-max" value="200" min="0"></div>
      <div style="font-size:10px;color:var(--semantic-label-alt);padding-top:6px;border-top:1px solid var(--semantic-line-alt);margin-top:4px" id="bdp-pol-win-preview">예상가: 121원 (SMP×0.88)</div>
    </div>
    <!-- ESS -->
    <div class="card" style="padding:10px">
      <div style="font-weight:600;margin-bottom:8px"><span class="badge" style="background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow)">ESS</span></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">변동비 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-ess-cost" value="22.0" step="0.1" min="0"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">SMP 가중치</label><input class="inp" type="number" id="bdp-pol-ess-w" value="0.92" step="0.01" min="0.50" max="1.50"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">상한가 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-ess-max" value="220" min="0"></div>
      <div style="font-size:10px;color:var(--semantic-label-alt);padding-top:6px;border-top:1px solid var(--semantic-line-alt);margin-top:4px" id="bdp-pol-ess-preview">예상가: 127원 (SMP×0.92)</div>
    </div>
    <!-- 바이오 -->
    <div class="card" style="padding:10px">
      <div style="font-weight:600;margin-bottom:8px"><span class="badge" style="background:#e8defa;color:#6035cc">바이오</span></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">변동비 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-bio-cost" value="28.5" step="0.1" min="0"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">SMP 가중치</label><input class="inp" type="number" id="bdp-pol-bio-w" value="1.05" step="0.01" min="0.50" max="1.50"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">상한가 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-bio-max" value="250" min="0"></div>
      <div style="font-size:10px;color:var(--semantic-label-alt);padding-top:6px;border-top:1px solid var(--semantic-line-alt);margin-top:4px" id="bdp-pol-bio-preview">예상가: 145원 (SMP×1.05)</div>
    </div>
    <!-- V2G -->
    <div class="card" style="padding:10px">
      <div style="font-weight:600;margin-bottom:8px"><span class="badge" style="background:var(--semantic-tag-bg-green);color:var(--semantic-tag-label-green)">V2G</span></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">변동비 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-v2g-cost" value="8.0" step="0.1" min="0"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">SMP 가중치</label><input class="inp" type="number" id="bdp-pol-v2g-w" value="0.90" step="0.01" min="0.50" max="1.50"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">상한가 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-v2g-max" value="180" min="0"></div>
      <div style="font-size:10px;color:var(--semantic-label-alt);padding-top:6px;border-top:1px solid var(--semantic-line-alt);margin-top:4px" id="bdp-pol-v2g-preview">예상가: 124원 (SMP×0.90)</div>
    </div>
  </div>
  <div style="font-size:11px;color:var(--semantic-label-alt);margin-top:10px;line-height:18px;padding:8px 10px;background:var(--semantic-background-2);border-radius:4px">
    ℹ 각 자원 유형의 입찰가 = <b>max(변동비, min(SMP × 가중치, 상한가))</b> · 변동비 미만 자동 차단(역마진 방어). 시장 환경 변경 시 [정책 저장] 클릭 → 다음 입찰 차수부터 반영. 회사별/개별 자원 오버라이드는 Option C 확장에서 지원.
  </div>
</div>

<!-- 회사별 가중치 정책 (Option C) -->
<div class="card mb">
  <div class="sh">
    <div class="st">회사별 가중치 정책 ${window.tip('회사별 가중치 정책','자원 유형 정책 위에 회사 단위로 가중치 배수를 곱해 차등화','최종 가중치 = 자원 유형 가중치 × 회사 배수','자원 유형 5종이 정의된 후 회사별로 +/- 보정 (예: 신규 시설 ×1.05 마진 우선 / 안정 운영 ×0.95)')}</div>
    <span class="badge ok" style="font-size:10px">자원 유형 정책 × 회사 배수 = 최종</span>
  </div>
  <div style="overflow-x:auto"><table class="tbl" data-no-sort="1">
    <thead><tr><th>회사명</th><th>자원수</th><th>주요 자원 유형</th><th>가중치 배수 (×)</th><th>운영 정책</th></tr></thead>
    <tbody id="bdp-comp-tbody">
      <tr data-comp="순천바이오㈜"><td>순천바이오㈜</td><td class="mono">1</td><td><span class="badge" style="background:#e8defa;color:#6035cc">바이오</span></td><td><input type="number" class="inp" id="bdp-comp-소순천" value="1.10" step="0.01" min="0.85" max="1.15" style="width:70px;height:28px;font-size:11px"></td><td style="font-size:11px;color:var(--semantic-label-alt)">바이오 프리미엄 — 마진 우선</td></tr>
      <tr data-comp="여수바이오㈜"><td>여수바이오㈜</td><td class="mono">1</td><td><span class="badge" style="background:#e8defa;color:#6035cc">바이오</span></td><td><input type="number" class="inp" id="bdp-comp-여수바이오" value="1.05" step="0.01" min="0.85" max="1.15" style="width:70px;height:28px;font-size:11px"></td><td style="font-size:11px;color:var(--semantic-label-alt)">바이오 프리미엄</td></tr>
      <tr data-comp="광양항태양광㈜"><td>광양항태양광㈜</td><td class="mono">2</td><td><span class="badge inf">태양광</span></td><td><input type="number" class="inp" id="bdp-comp-광양항태양광" value="1.02" step="0.01" min="0.85" max="1.15" style="width:70px;height:28px;font-size:11px"></td><td style="font-size:11px;color:var(--semantic-label-alt)">신규 시설 마진 우선</td></tr>
      <tr data-comp="금능에너지㈜"><td>금능에너지㈜</td><td class="mono">1</td><td><span class="badge" style="background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow)">ESS</span></td><td><input type="number" class="inp" id="bdp-comp-금능에너지" value="1.00" step="0.01" min="0.85" max="1.15" style="width:70px;height:28px;font-size:11px"></td><td style="font-size:11px;color:var(--semantic-label-alt)">중립 (기본 정책 따름)</td></tr>
      <tr data-comp="해맞이㈜"><td>해맞이㈜</td><td class="mono">1</td><td><span class="badge inf">태양광</span></td><td><input type="number" class="inp" id="bdp-comp-해맞이" value="0.98" step="0.01" min="0.85" max="1.15" style="width:70px;height:28px;font-size:11px"></td><td style="font-size:11px;color:var(--semantic-label-alt)">노후 시설 보수적</td></tr>
      <tr data-comp="온누리㈜"><td>온누리㈜</td><td class="mono">1</td><td><span class="badge inf">태양광</span></td><td><input type="number" class="inp" id="bdp-comp-온누리" value="1.00" step="0.01" min="0.85" max="1.15" style="width:70px;height:28px;font-size:11px"></td><td style="font-size:11px;color:var(--semantic-label-alt)">중립</td></tr>
      <tr data-comp="김주풍력㈜"><td>김주풍력㈜</td><td class="mono">2</td><td><span class="badge" style="background:var(--semantic-tag-bg-blue);color:var(--semantic-tag-label-blue)">풍력</span></td><td><input type="number" class="inp" id="bdp-comp-김주풍력" value="0.95" step="0.01" min="0.85" max="1.15" style="width:70px;height:28px;font-size:11px"></td><td style="font-size:11px;color:var(--semantic-label-alt)">변동성 큼 — 안정 운영 우선</td></tr>
      <tr data-comp="광주V2G㈜"><td>광주V2G㈜</td><td class="mono">1</td><td><span class="badge" style="background:var(--semantic-tag-bg-green);color:var(--semantic-tag-label-green)">V2G</span></td><td><input type="number" class="inp" id="bdp-comp-광주V2G" value="1.00" step="0.01" min="0.85" max="1.15" style="width:70px;height:28px;font-size:11px"></td><td style="font-size:11px;color:var(--semantic-label-alt)">중립</td></tr>
      <tr data-comp="전남V2G㈜"><td>전남V2G㈜</td><td class="mono">1</td><td><span class="badge" style="background:var(--semantic-tag-bg-green);color:var(--semantic-tag-label-green)">V2G</span></td><td><input type="number" class="inp" id="bdp-comp-전남V2G" value="0.92" step="0.01" min="0.85" max="1.15" style="width:70px;height:28px;font-size:11px"></td><td style="font-size:11px;color:var(--semantic-label-alt)">통신 단절 이력 — 보수적</td></tr>
    </tbody>
  </table></div>
  <div style="font-size:11px;color:var(--semantic-label-alt);margin-top:10px;line-height:18px;padding:8px 10px;background:var(--semantic-background-2);border-radius:4px">
    ℹ 가중치 배수 0.85~1.15 범위 (자원 유형 정책 ±15% 조정). 위 [정책 저장] 버튼으로 자원 유형 + 회사 정책 일괄 저장. 더 세밀한 자원별 오버라이드는 아래 Merit Order 테이블의 [편집] 버튼.
  </div>
</div>

<!-- Merit Order (풀 폭) — Option C: 자원별 오버라이드 + 최종 입찰가 표시 -->
<div class="card mb"><div class="sh"><div class="st">Merit Order · 자원별 최종 입찰가 ${window.tip('Merit Order — 자원별 최종 입찰가','자원 유형 + 회사 + 자원 오버라이드 정책을 모두 적용한 최종 입찰가','우선순위: 자원 OR > 회사 배수 > 유형 정책 > 글로벌 fallback','각 행 [편집]으로 자원별 정책 오버라이드 (변동비/가중치/상한가)')}</div></div>
    <div style="overflow-x:auto"><table class="tbl"><thead><tr><th>우선</th><th>자원</th><th>유형</th><th>회사</th><th>NMAE</th><th>배정용량</th><th>최종 입찰가</th><th>정책 출처</th><th>편집</th></tr></thead><tbody id="bdp-merit-tbody">
      <tr data-name="순천 바이오가스" data-type="바이오" data-company="순천바이오㈜" data-nmae="2.1" data-cap="1.42"><td class="mono">1</td><td>순천 바이오가스</td><td><span class="badge" style="background:#e8defa;color:#6035cc">바이오</span></td><td style="font-size:11px">순천바이오㈜</td><td class="mono" style="color:var(--semantic-positive-normal)">2.1%</td><td class="mono">1.42MW</td><td class="mono bdp-final-price" style="font-weight:600;color:var(--semantic-brand-primary)">—</td><td class="bdp-final-source" style="font-size:10px;color:var(--semantic-label-alt)">—</td><td><button class="cb n sm" onclick="bdpOpenOverride(this)" style="font-size:10px">편집</button></td></tr>
      <tr data-name="여수 바이오매스" data-type="바이오" data-company="여수바이오㈜" data-nmae="2.8" data-cap="2.85"><td class="mono">2</td><td>여수 바이오매스</td><td><span class="badge" style="background:#e8defa;color:#6035cc">바이오</span></td><td style="font-size:11px">여수바이오㈜</td><td class="mono" style="color:var(--semantic-positive-normal)">2.8%</td><td class="mono">2.85MW</td><td class="mono bdp-final-price" style="font-weight:600;color:var(--semantic-brand-primary)">—</td><td class="bdp-final-source" style="font-size:10px;color:var(--semantic-label-alt)">—</td><td><button class="cb n sm" onclick="bdpOpenOverride(this)" style="font-size:10px">편집</button></td></tr>
      <tr data-name="광양항태양광 01단계" data-type="태양광" data-company="광양항태양광㈜" data-nmae="4.2" data-cap="2.18"><td class="mono">3</td><td>광양항태양광 01단계</td><td><span class="badge inf">태양광</span></td><td style="font-size:11px">광양항태양광㈜</td><td class="mono" style="color:var(--semantic-positive-normal)">4.2%</td><td class="mono">2.18MW</td><td class="mono bdp-final-price" style="font-weight:600;color:var(--semantic-brand-primary)">—</td><td class="bdp-final-source" style="font-size:10px;color:var(--semantic-label-alt)">—</td><td><button class="cb n sm" onclick="bdpOpenOverride(this)" style="font-size:10px">편집</button></td></tr>
      <tr data-name="광양항태양광 04단계" data-type="태양광" data-company="광양항태양광㈜" data-nmae="5.1" data-cap="2.09"><td class="mono">4</td><td>광양항태양광 04단계</td><td><span class="badge inf">태양광</span></td><td style="font-size:11px">광양항태양광㈜</td><td class="mono" style="color:var(--semantic-positive-normal)">5.1%</td><td class="mono">2.09MW</td><td class="mono bdp-final-price" style="font-weight:600;color:var(--semantic-brand-primary)">—</td><td class="bdp-final-source" style="font-size:10px;color:var(--semantic-label-alt)">—</td><td><button class="cb n sm" onclick="bdpOpenOverride(this)" style="font-size:10px">편집</button></td></tr>
      <tr data-name="금능1호 ESS" data-type="ESS" data-company="금능에너지㈜" data-nmae="5.5" data-cap="1.80"><td class="mono">5</td><td>금능1호 ESS</td><td><span class="badge" style="background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow)">ESS</span></td><td style="font-size:11px">금능에너지㈜</td><td class="mono">5.5%</td><td class="mono">1.80MW</td><td class="mono bdp-final-price" style="font-weight:600;color:var(--semantic-brand-primary)">—</td><td class="bdp-final-source" style="font-size:10px;color:var(--semantic-label-alt)">—</td><td><button class="cb n sm" onclick="bdpOpenOverride(this)" style="font-size:10px">편집</button></td></tr>
      <tr data-name="해맞이 태양광" data-type="태양광" data-company="해맞이㈜" data-nmae="6.8" data-cap="0.95"><td class="mono">6</td><td>해맞이 태양광</td><td><span class="badge inf">태양광</span></td><td style="font-size:11px">해맞이㈜</td><td class="mono">6.8%</td><td class="mono">0.95MW</td><td class="mono bdp-final-price" style="font-weight:600;color:var(--semantic-brand-primary)">—</td><td class="bdp-final-source" style="font-size:10px;color:var(--semantic-label-alt)">—</td><td><button class="cb n sm" onclick="bdpOpenOverride(this)" style="font-size:10px">편집</button></td></tr>
      <tr data-name="온누리 태양광" data-type="태양광" data-company="온누리㈜" data-nmae="7.4" data-cap="0.94"><td class="mono">7</td><td>온누리 태양광</td><td><span class="badge inf">태양광</span></td><td style="font-size:11px">온누리㈜</td><td class="mono">7.4%</td><td class="mono">0.94MW</td><td class="mono bdp-final-price" style="font-weight:600;color:var(--semantic-brand-primary)">—</td><td class="bdp-final-source" style="font-size:10px;color:var(--semantic-label-alt)">—</td><td><button class="cb n sm" onclick="bdpOpenOverride(this)" style="font-size:10px">편집</button></td></tr>
      <tr data-name="김주풍력 02단계" data-type="풍력" data-company="김주풍력㈜" data-nmae="8.2" data-cap="9.50"><td class="mono">8</td><td>김주풍력 02단계</td><td><span class="badge" style="background:var(--semantic-tag-bg-blue);color:var(--semantic-tag-label-blue)">풍력</span></td><td style="font-size:11px">김주풍력㈜</td><td class="mono">8.2%</td><td class="mono">9.50MW</td><td class="mono bdp-final-price" style="font-weight:600;color:var(--semantic-brand-primary)">—</td><td class="bdp-final-source" style="font-size:10px;color:var(--semantic-label-alt)">—</td><td><button class="cb n sm" onclick="bdpOpenOverride(this)" style="font-size:10px">편집</button></td></tr>
      <tr data-name="김주풍력 01단계" data-type="풍력" data-company="김주풍력㈜" data-nmae="9.1" data-cap="3.80"><td class="mono">9</td><td>김주풍력 01단계</td><td><span class="badge" style="background:var(--semantic-tag-bg-blue);color:var(--semantic-tag-label-blue)">풍력</span></td><td style="font-size:11px">김주풍력㈜</td><td class="mono" style="color:var(--palette-yellow-40)">9.1%</td><td class="mono">3.80MW</td><td class="mono bdp-final-price" style="font-weight:600;color:var(--semantic-brand-primary)">—</td><td class="bdp-final-source" style="font-size:10px;color:var(--semantic-label-alt)">—</td><td><button class="cb n sm" onclick="bdpOpenOverride(this)" style="font-size:10px">편집</button></td></tr>
      <tr data-name="광주 V2G 스테이션" data-type="V2G" data-company="광주V2G㈜" data-nmae="10.5" data-cap="0.72"><td class="mono">10</td><td>광주 V2G 스테이션</td><td><span class="badge" style="background:var(--semantic-tag-bg-green);color:var(--semantic-tag-label-green)">V2G</span></td><td style="font-size:11px">광주V2G㈜</td><td class="mono" style="color:var(--palette-yellow-40)">10.5%</td><td class="mono">0.72MW</td><td class="mono bdp-final-price" style="font-weight:600;color:var(--semantic-brand-primary)">—</td><td class="bdp-final-source" style="font-size:10px;color:var(--semantic-label-alt)">—</td><td><button class="cb n sm" onclick="bdpOpenOverride(this)" style="font-size:10px">편집</button></td></tr>
      <tr data-name="전남 V2G 허브" data-type="V2G" data-company="전남V2G㈜" data-nmae="11.8" data-cap="1.35"><td class="mono">11</td><td>전남 V2G 허브</td><td><span class="badge" style="background:var(--semantic-tag-bg-green);color:var(--semantic-tag-label-green)">V2G</span></td><td style="font-size:11px">전남V2G㈜</td><td class="mono" style="color:var(--palette-yellow-40)">11.8%</td><td class="mono">1.35MW</td><td class="mono bdp-final-price" style="font-weight:600;color:var(--semantic-brand-primary)">—</td><td class="bdp-final-source" style="font-size:10px;color:var(--semantic-label-alt)">—</td><td><button class="cb n sm" onclick="bdpOpenOverride(this)" style="font-size:10px">편집</button></td></tr>
    </tbody></table></div>
    <div style="font-size:12px;color:var(--semantic-label-alt);margin-top:8px;line-height:18px">※ <b>정책 출처</b>: <span style="color:#0a7">유형</span>(기본) / <span style="color:#e80">회사</span>(가중치 보정) / <span style="color:#d32">자원 OR</span>(개별 오버라이드)</div>
</div>

<!-- 자원별 오버라이드 모달 (Option C) -->
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
            <span>이 자원에 개별 정책 적용 (체크 해제 시 회사·유형 정책 따름)</span>
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
        ⚠ 자원별 오버라이드는 회사·유형 정책을 모두 무시합니다. 특수 자원(시범사업·계약 특례 등)에만 사용하세요.
      </div>
    </div>
    <div class="modal-footer">
      <button class="cb d" style="margin-right:auto;font-size:10px" onclick="bdpClearOverride()">오버라이드 해제</button>
      <button class="cb n" onclick="closeModal('modal-bdp-override')">취소</button>
      <button class="cb p" onclick="bdpSaveOverride()">저장</button>
    </div>
  </div>
</div>
<div class="card"><div class="sh"><div class="st">가격 민감도 분석</div></div><div style="height:160px;position:relative"><canvas id="c-price" role="img" aria-label="가격 민감도"></canvas></div></div>`;
// ===== 자원 유형별 가격 정책 (Option A) + 회사·자원 오버라이드 (Option C) =====
window.bdpPolicy=window.bdpPolicy||{
  태양광:{cost:5.2,w:0.95,max:200},
  풍력:{cost:18.5,w:0.88,max:200},
  ESS:{cost:22.0,w:0.92,max:220},
  바이오:{cost:28.5,w:1.05,max:250},
  V2G:{cost:8.0,w:0.90,max:180}
};
window.bdpCompanyPol=window.bdpCompanyPol||{};      // 회사별 가중치 배수 (Option C)
window.bdpResourceOverrides=window.bdpResourceOverrides||{}; // 자원별 오버라이드 (Option C)
window._bdpTypeMap={sol:'태양광',win:'풍력',ess:'ESS',bio:'바이오',v2g:'V2G'};

function _bdpReadCard(prefix){
  return {
    cost:parseFloat(document.getElementById('bdp-pol-'+prefix+'-cost')?.value)||0,
    w:parseFloat(document.getElementById('bdp-pol-'+prefix+'-w')?.value)||0,
    max:parseFloat(document.getElementById('bdp-pol-'+prefix+'-max')?.value)||0
  };
}

window.bdpUpdatePreview=function(){
  // KPI에서 SMP 평균 읽기 (138원 가정 — 첫 KPI 카드)
  var smpEl=document.querySelector('.g4 .card.acc .kv');
  var smp=smpEl?parseFloat(smpEl.textContent.match(/\d+/)?.[0]):138;
  if(!smp||isNaN(smp)) smp=138;
  Object.keys(window._bdpTypeMap).forEach(function(prefix){
    var p=_bdpReadCard(prefix);
    var raw=smp*p.w;
    var clamped=Math.max(p.cost,Math.min(p.max,raw));
    var pv=document.getElementById('bdp-pol-'+prefix+'-preview');
    if(pv){
      var note=raw<p.cost?' · 변동비 가드':raw>p.max?' · 상한 가드':'';
      pv.textContent='예상가: '+clamped.toFixed(0)+'원 (SMP×'+p.w.toFixed(2)+')'+note;
    }
  });
};

window.bdpSavePolicy=function(){
  // ① 자원 유형별 5개 카드 검증
  var errs=[];
  var newPol={};
  Object.keys(window._bdpTypeMap).forEach(function(prefix){
    var label=window._bdpTypeMap[prefix];
    var p=_bdpReadCard(prefix);
    if(p.cost<0) errs.push(label+': 변동비는 0 이상');
    if(p.w<0.5||p.w>1.5) errs.push(label+': 가중치는 0.50~1.50');
    if(p.max<=0) errs.push(label+': 상한가는 0 초과');
    if(p.max<p.cost) errs.push(label+': 상한가 < 변동비 (역마진)');
    newPol[label]=p;
  });
  if(errs.length>0){toast(errs[0],'warn');return;}
  // ② 회사별 가중치 배수 검증
  var newComp={};
  document.querySelectorAll('#bdp-comp-tbody tr[data-comp]').forEach(function(tr){
    var comp=tr.dataset.comp;
    var inp=tr.querySelector('input[type="number"]');
    if(!inp) return;
    var mul=parseFloat(inp.value);
    if(isNaN(mul)||mul<0.85||mul>1.15){errs.push(comp+': 가중치 배수는 0.85~1.15');return;}
    newComp[comp]=mul;
  });
  if(errs.length>0){toast(errs[0],'warn');return;}

  if(!confirm('가격 정책을 저장하고 다음 입찰 차수부터 적용하시겠습니까?\n\n· 자원 유형 정책 5종\n· 회사별 가중치 배수 '+Object.keys(newComp).length+'개\n· 자원별 오버라이드 '+Object.keys(window.bdpResourceOverrides).length+'건 (그대로 유지)\n\n변경 내역은 감사이력에 영구 보관됩니다.')) return;
  window.bdpPolicy=newPol;
  window.bdpCompanyPol=newComp;
  window.bdpUpdatePreview();
  window.bdpRenderMeritPrices();
  toast('정책 저장 완료 — 유형 5종 + 회사 '+Object.keys(newComp).length+'개 + 자원 OR '+Object.keys(window.bdpResourceOverrides).length+'건');
};

// ===== 정책 우선순위 해석 (자원 OR > 회사 > 유형) =====
window.bdpResolveResource=function(tr){
  if(!tr) return null;
  var name=tr.dataset.name;
  var type=tr.dataset.type;
  var company=tr.dataset.company;
  var typePol=window.bdpPolicy[type]||{cost:0,w:1,max:200};
  var compMul=window.bdpCompanyPol[company]||1;
  var resOR=window.bdpResourceOverrides[name];

  if(resOR && resOR.enabled){
    return {
      cost:resOR.cost!=null?resOR.cost:typePol.cost,
      w:resOR.w!=null?resOR.w:typePol.w*compMul,
      max:resOR.max!=null?resOR.max:typePol.max,
      source:'자원 OR'
    };
  }
  return {
    cost:typePol.cost,
    w:typePol.w*compMul,
    max:typePol.max,
    source:compMul!==1?'회사':'유형'
  };
};

window.bdpRenderMeritPrices=function(){
  var smpEl=document.querySelector('.g4 .card.acc .kv');
  var smp=smpEl?parseFloat(smpEl.textContent.match(/\d+/)?.[0]):138;
  if(!smp||isNaN(smp)) smp=138;
  document.querySelectorAll('#bdp-merit-tbody tr[data-name]').forEach(function(tr){
    var r=window.bdpResolveResource(tr);
    if(!r) return;
    var raw=smp*r.w;
    var clamped=Math.max(r.cost,Math.min(r.max,raw));
    var priceCell=tr.querySelector('.bdp-final-price');
    var sourceCell=tr.querySelector('.bdp-final-source');
    if(priceCell) priceCell.textContent=clamped.toFixed(0)+'원';
    if(sourceCell){
      var color=r.source==='자원 OR'?'#d32':r.source==='회사'?'#e80':'#0a7';
      sourceCell.innerHTML='<span style="color:'+color+';font-weight:600">'+r.source+'</span> · w='+r.w.toFixed(2);
    }
  });
};

// ===== 자원별 오버라이드 모달 (Option C) =====
window._bdpEditTr=null;
window.bdpOpenOverride=function(btn){
  var tr=btn.closest('tr');
  if(!tr) return;
  window._bdpEditTr=tr;
  var name=tr.dataset.name;
  var type=tr.dataset.type;
  var company=tr.dataset.company;
  var typePol=window.bdpPolicy[type]||{cost:0,w:1,max:200};
  var compMul=window.bdpCompanyPol[company]||1;
  var existing=window.bdpResourceOverrides[name]||{};

  document.getElementById('bdp-override-title').textContent='자원별 가격 정책 오버라이드 — '+name;
  document.getElementById('bdp-override-info').innerHTML=
    '<b>'+name+'</b> · <span class="badge" style="font-size:10px">'+type+'</span> · '+company+'<br>'
    +'<span style="color:var(--semantic-label-alt)">현재 적용 중: 변동비 '+typePol.cost+'원 / 가중치 '+(typePol.w*compMul).toFixed(2)+' (유형 '+typePol.w+' × 회사 '+compMul.toFixed(2)+') / 상한 '+typePol.max+'원</span>';
  document.getElementById('bdp-override-enabled').checked=!!existing.enabled;
  document.getElementById('bdp-override-cost').value=existing.cost!=null?existing.cost:'';
  document.getElementById('bdp-override-w').value=existing.w!=null?existing.w:'';
  document.getElementById('bdp-override-max').value=existing.max!=null?existing.max:'';
  document.getElementById('bdp-override-cost').placeholder=String(typePol.cost);
  document.getElementById('bdp-override-w').placeholder=(typePol.w*compMul).toFixed(2);
  document.getElementById('bdp-override-max').placeholder=String(typePol.max);
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
    if(w!=null && (w<0.5||w>1.5)){toast('가중치는 0.50~1.50 범위','warn');return;}
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
  if(!confirm(name+'의 오버라이드를 완전히 해제하시겠습니까?\n회사·유형 정책으로 복귀합니다.')) return;
  delete window.bdpResourceOverrides[name];
  window.bdpRenderMeritPrices();
  closeModal('modal-bdp-override');
  toast(name+' 오버라이드 해제됨 — 유형/회사 정책 적용');
  window._bdpEditTr=null;
};

window['I_bidDA-price']=function(){
  // 자원 유형 5개 카드 입력 변경 시 미리보기 + Merit 자동 갱신
  ['sol','win','ess','bio','v2g'].forEach(function(p){
    ['cost','w','max'].forEach(function(f){
      var el=document.getElementById('bdp-pol-'+p+'-'+f);
      if(el) el.addEventListener('input',function(){
        window.bdpUpdatePreview();
        // 유형 정책 미저장 변경분도 미리 반영하려면 임시로 수집 후 render — 단순화: 저장 후에만 반영
      });
    });
  });
  // 회사별 가중치 입력 변경 시 (저장 전 라이브 미리보기를 위해) — 단순화: 저장 후에만 반영. 입력 변경 시 안내만.
  document.querySelectorAll('#bdp-comp-tbody input[type="number"]').forEach(function(inp){
    inp.addEventListener('input',function(){
      var btn=document.querySelector('button[onclick="bdpSavePolicy()"]');
      if(btn && !btn.classList.contains('p-pulse')) btn.classList.add('p-pulse');
    });
  });
  // 초기 회사 정책 객체 채우기 (data-comp 속성 + 입력값 기반)
  document.querySelectorAll('#bdp-comp-tbody tr[data-comp]').forEach(function(tr){
    var inp=tr.querySelector('input[type="number"]');
    if(inp){
      var v=parseFloat(inp.value);
      if(!isNaN(v)) window.bdpCompanyPol[tr.dataset.comp]=v;
    }
  });
  window.bdpUpdatePreview();
  window.bdpRenderMeritPrices();
  mkChart('c-price','line',['-20%','-10%','0%','+10%','+20%'],[
    {label:'낙찰률',data:[62,78,89,93,95],borderColor:'#0059ff',borderWidth:2,pointRadius:3,tension:0.3,fill:false},
    {label:'순수익(백만원)',data:[14.2,18.1,22.5,24.3,24.9],borderColor:'#ffca42',borderWidth:2,pointRadius:3,tension:0.3,fill:false},
  ],{});
};
window.bidPriceApply=function(){
  const type=document.getElementById('bdp-type')?.value||'all';
  document.querySelectorAll('#bdp-merit-tbody tr').forEach(tr=>{
    const cType=tr.cells[2]?.textContent.trim();
    tr.style.display=(type==='all'||cType===type)?'':'none';
  });
};

