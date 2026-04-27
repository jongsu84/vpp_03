// AUTO-GENERATED FROM index.html — page module: dsh-main
window.P = window.P || {};
/* ===== 대시보드: 통합 운영 ===== */
window.P['dsh-main']=()=>`
<!-- 데이터 최신성 인디케이터 -->
<div class="card" style="display:flex;align-items:center;gap:14px;padding:10px 16px;margin-bottom:12px;font-size:12px;flex-wrap:wrap">
  <div style="display:flex;align-items:center;gap:6px">
    <span style="width:8px;height:8px;border-radius:50%;background:var(--semantic-positive-normal);animation:pulse 2s infinite"></span>
    <span style="color:var(--semantic-label-normal);font-weight:500">실시간 연동 정상</span>
  </div>
  <span style="width:1px;height:14px;background:var(--semantic-line-normal)"></span>
  <span style="color:var(--semantic-label-alt)">현재시간 <span class="mono" style="color:var(--semantic-label-strong)" id="dsh-now">2026-04-23 10:54:27</span></span>
  <span style="color:var(--semantic-label-alt)">DB 최종 업데이트 <span class="mono" style="color:var(--semantic-label-strong)" id="dsh-db">10:54:18</span></span>
  <span class="kpi-pill" style="font-size:11px" id="dsh-lag">지연 9초</span>
  <span style="margin-left:auto;color:var(--semantic-label-alt);font-size:11px">5초마다 자동 갱신</span>
</div>

<!-- 기존 KPI 4종 -->
<div class="g4">
  <div class="card acc"><div class="ct">실시간 총 출력 ${window.tip('실시간 총 출력','13개 모든 발전·저장 자원의 현재 출력값 합산','Σ(자원별 현재 출력 kW) ÷ 1000 [MW] · RTU 60초 폴링','목표 대비 95% 이상 정상 / 90~95% 주의 / 90% 미만 경계')}</div><div class="kv">148.7<span class="ku">MW</span></div><div class="kd up">▲ 목표 대비 99.1%</div></div>
  <div class="card"><div class="ct">금일 누적 발전량 ${window.tip('금일 누적 발전량','자정(00:00)부터 현재까지 13개 자원이 생산한 총 전력량','Σ ∫ P(t) dt (00:00 → 현재) [MWh]','전일 대비 ±5% 이내 정상')}</div><div class="kv">623.4<span class="ku">MWh</span></div><div class="kd up">▲ +3.2% 전일 대비</div></div>
  <div class="card"><div class="ct">금일 예상 수익 ${window.tip('금일 예상 수익','발전량과 SMP를 곱해 산출한 금일 예상 매출 (정산 전)','발전량(MWh) × SMP(원/kWh) × 1000 + REC·CP·AS','SMP 변동 영향 — 시장 단가에 따라 ±10% 변동 가능')}</div><div class="kv">47.2<span class="ku">백만원</span></div><div class="kd neu">~ SMP 124원/kWh</div></div>
  <div class="card"><div class="ct">IMBP 위험 구간 ${window.tip('IMBP 위험 구간','Imbalance Penalty — 입찰 vs 실측 오차가 임계치를 초과한 시간 구간 수','집계: |실측 - 입찰| / 입찰 × 100 > 8% 인 구간 카운트','0~1구간 정상 / 2~3구간 주의 / 4구간 이상 위험 (페널티 발생)')}</div><div class="kv" style="color:var(--acc3)">2<span class="ku">구간</span></div><div class="kd dn">▼ 오차 11.4% 초과</div></div>
</div>

<!-- 집합 자원 요약 KPIs 행 -->
<div class="card" style="padding:16px 20px;margin-bottom:16px">
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:24px">
    <div>
      <div style="font-size:12px;color:var(--semantic-label-alt);margin-bottom:6px">총 발전소</div>
      <div style="display:flex;align-items:baseline;gap:4px"><span class="mono" style="font-size:20px;font-weight:700;color:var(--semantic-label-strong)">42</span><span style="font-size:12px;color:var(--semantic-label-alt)">개소</span></div>
    </div>
    <div>
      <div style="font-size:12px;color:var(--semantic-label-alt);margin-bottom:6px">주요 설비</div>
      <div style="display:flex;align-items:baseline;gap:4px"><span class="mono" style="font-size:20px;font-weight:700;color:var(--semantic-label-strong)">67</span><span style="font-size:12px;color:var(--semantic-label-alt)">대 (인버터·터빈·ESS)</span></div>
    </div>
    <div>
      <div style="font-size:12px;color:var(--semantic-label-alt);margin-bottom:6px">총 설비용량</div>
      <div style="display:flex;align-items:baseline;gap:4px"><span class="mono" style="font-size:20px;font-weight:700;color:var(--semantic-label-strong)">150.2</span><span style="font-size:12px;color:var(--semantic-label-alt)">MW</span></div>
    </div>
    <div>
      <div style="font-size:12px;color:var(--semantic-label-alt);margin-bottom:6px">금일 발전시간</div>
      <div style="display:flex;align-items:baseline;gap:4px"><span class="mono" style="font-size:20px;font-weight:700;color:var(--semantic-label-strong)">4.15</span><span style="font-size:12px;color:var(--semantic-label-alt)">Hrs</span></div>
    </div>
    <div>
      <div style="font-size:12px;color:var(--semantic-label-alt);margin-bottom:6px">금일 CO₂ 저감</div>
      <div style="display:flex;align-items:baseline;gap:4px"><span class="mono" style="font-size:20px;font-weight:700;color:var(--semantic-positive-normal)">293.0</span><span style="font-size:12px;color:var(--semantic-label-alt)">톤 · 623MWh 기반</span></div>
    </div>
  </div>
</div>

<div class="g65">
  <div class="card mb"><div class="sh"><div class="st">실시간 발전 곡선 (예측 vs 실측)</div><div class="sa">96구간</div></div><div style="height:200px;position:relative"><canvas id="c-dmain" role="img" aria-label="예측 vs 실측 비교"></canvas></div></div>
  <div class="card mb"><div class="sh"><div class="st">자원 구성</div></div><div style="height:180px;position:relative"><canvas id="c-donut" role="img" aria-label="에너지원 비중"></canvas></div></div>
</div>

<!-- 시간축 비교 차트 3종 -->
<div class="card mb"><div class="sh"><div class="st">월간 발전량 · 예상수익 (2026년)</div><span class="kpi-pill" style="font-size:11px">자원별 · 누적 stacked</span></div>
  <div style="height:200px;position:relative"><canvas id="c-mth" role="img" aria-label="월간 발전량"></canvas></div>
</div>
<div class="g2">
  <div class="card mb"><div class="sh"><div class="st">일간 발전량 · 수익 (이번달)</div></div><div style="height:200px;position:relative"><canvas id="c-day" role="img" aria-label="일간 발전량"></canvas></div></div>
  <div class="card mb">
    <div class="sh">
      <div class="st">전일 발전기별 실적 (발전 vs 예측)</div>
      <div style="display:flex;gap:8px;align-items:center">
        <span class="kpi-pill" style="font-size:11px;background:rgba(10,167,120,0.08);color:#0a7;border:1px solid rgba(10,167,120,0.2)">MAPE 2.96%</span>
        <span class="sa" onclick="pdOpenSheet()">상세 →</span>
      </div>
    </div>
    <!-- 미니 스탯 스트립 -->
    <div style="display:flex;gap:16px;padding:2px 2px 10px;font-size:11px;color:var(--semantic-label-alt);border-bottom:1px dashed var(--semantic-line-alt);margin-bottom:10px">
      <span>총 실적 <b class="mono" style="color:var(--semantic-label-strong);font-size:12px">19,146</b> <span style="color:var(--semantic-label-alt)">kWh</span></span>
      <span>총 예측 <b class="mono" style="color:var(--semantic-label-alt);font-size:12px">19,730</b> <span style="color:var(--semantic-label-alt)">kWh</span></span>
      <span>오차 <b class="mono" style="color:#d32;font-size:12px">-584</b> <span style="color:var(--semantic-label-alt)">kWh (-2.96%)</span></span>
      <span style="margin-left:auto">이상 <b class="mono" style="color:#e80;font-size:12px">1건</b> · 경계 <b class="mono" style="color:#e80;font-size:12px">2건</b> · 정상 <b class="mono" style="color:#0a7;font-size:12px">5건</b></span>
    </div>
    <div style="height:220px;position:relative"><canvas id="c-prev" role="img" aria-label="전일 발전기별"></canvas></div>
  </div>
</div>

<div class="g2">
  <div class="card mb">
    <div class="sh"><div class="st">자원별 가동</div></div>
    <div class="pr"><div class="pl">태양광</div><div class="pb"><div class="pf" style="width:91%;background:var(--acc)"></div></div><div class="pv">86.3MW</div></div>
    <div class="pr"><div class="pl">풍력</div><div class="pb"><div class="pf" style="width:73%;background:var(--acc2)"></div></div><div class="pv">23.8MW</div></div>
    <div class="pr"><div class="pl">ESS 방전</div><div class="pb"><div class="pf" style="width:60%;background:var(--acc3)"></div></div><div class="pv">17.8MW</div></div>
    <div class="pr"><div class="pl">바이오</div><div class="pb"><div class="pf" style="width:82%;background:var(--acc5)"></div></div><div class="pv">11.9MW</div></div>
    <div class="pr"><div class="pl">V2G</div><div class="pb"><div class="pf" style="width:68%;background:#00d4a8"></div></div><div class="pv">8.9MW</div></div>
  </div>
  <div class="card mb">
    <div class="sh"><div class="st">활성 알람</div></div>
    <div class="al"><div class="ad" style="background:var(--acc4)"></div><div class="am">광양항태양광 인버터 #3 통신 단절</div><div class="at">14:23</div></div>
    <div class="al"><div class="ad" style="background:var(--acc3)"></div><div class="am">IMBP 위험: 14~15시 오차 11.4%</div><div class="at">14:15</div></div>
    <div class="al"><div class="ad" style="background:var(--acc3)"></div><div class="am">금능1호 ESS SoC 18% 부족</div><div class="at">14:08</div></div>
    <div class="al"><div class="ad" style="background:var(--acc2)"></div><div class="am">KPX 급전지시 수신 142 MW</div><div class="at">14:00</div></div>
  </div>
</div>
<div class="card">
  <div class="sh"><div class="st">발전자원 실시간 리스트</div>${window.csvBtn('dsh-rs-tbody','dsh_resources','발전자원 실시간 리스트')}</div>
  <table class="tbl"><thead><tr><th>발전소명</th><th>유형</th><th>설치용량</th><th>현재출력</th><th>가동률</th><th>통신</th><th>상태</th></tr></thead><tbody id="dsh-rs-tbody">
    <tr><td>광양항태양광</td><td>태양광</td><td>2,293kW</td><td>2,147kW</td><td>93.6%</td><td><span class="badge err">단절</span></td><td><span class="badge warn">주의</span></td></tr>
    <tr><td>광양항4단계지붕</td><td>태양광</td><td>2,199kW</td><td>2,031kW</td><td>92.4%</td><td><span class="badge ok">정상</span></td><td><span class="badge ok">정상</span></td></tr>
    <tr><td>온누리 발전소</td><td>태양광</td><td>996kW</td><td>912kW</td><td>91.6%</td><td><span class="badge ok">정상</span></td><td><span class="badge ok">정상</span></td></tr>
    <tr><td>금능1호 (ESS)</td><td>태양광+ESS</td><td>495kW</td><td>481kW</td><td>97.2%</td><td><span class="badge ok">정상</span></td><td><span class="badge warn">SoC 18%</span></td></tr>
    <tr><td>김주풍력 02단계</td><td>풍력</td><td>10,000kW</td><td>7,840kW</td><td>78.4%</td><td><span class="badge ok">정상</span></td><td><span class="badge ok">정상</span></td></tr>
  </tbody></table>
</div>

<!-- 전일 발전기별 실적 상세 — 우측 슬라이드 시트 -->
<div class="rs-slide" id="pd-sheet">
  <div class="rs-slide-backdrop" onclick="pdCloseSheet()"></div>
  <div class="rs-slide-panel" style="width:920px">
    <div class="rs-slide-header">
      <div>
        <div style="font-size:16px;font-weight:600;color:var(--semantic-label-strong)">전일 발전기별 실적 상세</div>
        <div style="font-size:11px;color:var(--semantic-label-alt);margin-top:3px">2026-04-23 (목) · 계획 대비 실적 정합성 검증 · 8개 자원 · 전체 포트폴리오</div>
      </div>
      <button class="rs-slide-close" onclick="pdCloseSheet()" aria-label="닫기">✕</button>
    </div>
    <div class="rs-slide-body">
      <!-- 1. KPI 4종 -->
      <div class="g4" style="margin-bottom:14px">
        <div class="card"><div class="ct">총 실적 ${window.tip('총 실적','조회 일자에 8개 자원이 실제 생산한 발전량 합계','Σ(자원별 실측 kWh) — RTU 1분 폴링 적분','RTU 데이터 기반 — 통신 단절 자원은 보간 처리')}</div><div class="kv">19,146<span class="ku">kWh</span></div><div class="kd up">▲ 가동률 88.4%</div></div>
        <div class="card"><div class="ct">총 예측 ${window.tip('총 예측','입찰·운영 계획에 사용된 예측 발전량 합계','Σ(자원별 예측 kWh) — D-1 21시 시점 hybrid-ensemble 모델','MongoDB prod-mart/actual_vs_forecast_{date} 컬렉션 기준')}</div><div class="kv" style="color:var(--semantic-label-alt)">19,730<span class="ku">kWh</span></div><div class="kd neu">MongoDB 원본</div></div>
        <div class="card"><div class="ct">절대 오차 ${window.tip('절대 오차','실적 - 예측 (음수: 과대 예측, 양수: 과소 예측)','실적 - 예측 [kWh] · 비율: 실적/예측 - 1','정산 SLA: ±5% 이내 정상 / 5~10% 경계 / 10% 이상 IMBP 페널티')}</div><div class="kv" style="color:#d32">-584<span class="ku">kWh</span></div><div class="kd down">-2.96%</div></div>
        <div class="card acc"><div class="ct">MAPE (가중) ${window.tip('MAPE (가중)','Mean Absolute Percentage Error — 가중 평균 절대 백분율 오차','Σ |실측 - 예측| × 가중치 ÷ Σ 예측 × 100 [%]','SLA: 5% 이내 정상 / 5~8% 경계 / 8% 초과 시 정산 페널티 발생')}</div><div class="kv" style="color:#0a7">2.96<span class="ku">%</span></div><div class="kd up">SLA 5% 이내</div></div>
      </div>

      <!-- 2. TOP 3 과대/과소 예측 -->
      <div class="g2" style="margin-bottom:14px">
        <div class="card mb" style="border-left:3px solid #d32">
          <div class="sh"><div class="st">과대 예측 TOP 3 <span style="font-size:10px;color:var(--semantic-label-alt);font-weight:400">· 예측 &gt; 실적</span></div></div>
          <div class="mr"><div class="ml">김주풍력</div><div class="mv"><span class="mono" style="color:#d32">-348 kWh (-4.46%)</span></div></div>
          <div class="mr"><div class="ml">광양항태양광</div><div class="mv"><span class="mono" style="color:#d32">-82 kWh (-3.91%)</span></div></div>
          <div class="mr" style="border:none"><div class="ml">온누리</div><div class="mv"><span class="mono" style="color:#e80">-28 kWh (-2.98%)</span></div></div>
        </div>
        <div class="card mb" style="border-left:3px solid #0a7">
          <div class="sh"><div class="st">과소 예측 TOP 3 <span style="font-size:10px;color:var(--semantic-label-alt);font-weight:400">· 예측 &lt; 실적</span></div></div>
          <div class="mr"><div class="ml">삼성솔라2호</div><div class="mv"><span class="mono" style="color:#0a7">+0 kWh (0.0%)</span></div></div>
          <div class="mr"><div class="ml">해맞이</div><div class="mv"><span class="mono" style="color:#0a7">-6 kWh (-0.67%)</span></div></div>
          <div class="mr" style="border:none"><div class="ml">백학</div><div class="mv"><span class="mono" style="color:#0a7">-34 kWh (-0.97%)</span></div></div>
        </div>
      </div>

      <!-- 3. 24h 발전 프로파일 -->
      <div class="card mb">
        <div class="sh">
          <div class="st">24시간 발전 프로파일 (실적 vs 예측)</div>
          <select id="pd-res-sel" onchange="pdSwitchRes(this.value)" style="font-size:11px;padding:4px 8px;border:1px solid var(--semantic-line-normal);border-radius:5px">
            <option value="all">전체 포트폴리오</option>
            <option value="0">광양항태양광</option><option value="1">광양항4단계</option><option value="2">해맞이</option><option value="3">온누리</option>
            <option value="4">금능1호</option><option value="5">김주풍력</option><option value="6">백학</option><option value="7">삼성솔라2호</option>
          </select>
        </div>
        <div style="height:200px;position:relative"><canvas id="c-pd-profile"></canvas></div>
      </div>

      <!-- 4. 자원별 상세 테이블 -->
      <div class="card mb">
        <div class="sh"><div class="st">자원별 정합성 검증</div><span style="font-size:10px;color:var(--semantic-label-alt)">판정: ≤3% 정상 · 3~5% 경계 · &gt;5% 이상</span></div>
        <table class="tbl">
          <thead><tr><th>자원명</th><th>유형</th><th>용량</th><th>실적(kWh)</th><th>예측(kWh)</th><th>오차(kWh)</th><th>오차율</th><th>수익(원)</th><th>판정</th></tr></thead>
          <tbody id="pd-detail-tbody">
            <tr><td>광양항태양광</td><td>태양광</td><td class="mono">2,293 kW</td><td class="mono">2,018</td><td class="mono">2,100</td><td class="mono" style="color:#d32">-82</td><td class="mono" style="color:#e80">-3.91%</td><td class="mono">250,232</td><td><span class="badge warn">경계</span></td></tr>
            <tr><td>광양항4단계</td><td>태양광</td><td class="mono">2,199 kW</td><td class="mono">1,952</td><td class="mono">1,980</td><td class="mono" style="color:#d32">-28</td><td class="mono" style="color:#0a7">-1.41%</td><td class="mono">242,048</td><td><span class="badge ok">정상</span></td></tr>
            <tr><td>해맞이</td><td>태양광</td><td class="mono">996 kW</td><td class="mono">894</td><td class="mono">900</td><td class="mono" style="color:#d32">-6</td><td class="mono" style="color:#0a7">-0.67%</td><td class="mono">110,856</td><td><span class="badge ok">정상</span></td></tr>
            <tr><td>온누리</td><td>태양광</td><td class="mono">996 kW</td><td class="mono">912</td><td class="mono">940</td><td class="mono" style="color:#d32">-28</td><td class="mono" style="color:#0a7">-2.98%</td><td class="mono">113,088</td><td><span class="badge ok">정상</span></td></tr>
            <tr style="background:rgba(226,51,51,0.04)"><td>금능1호</td><td>ESS</td><td class="mono">495 kW</td><td class="mono">441</td><td class="mono">460</td><td class="mono" style="color:#d32">-19</td><td class="mono" style="color:#d32">-4.13%</td><td class="mono">54,684</td><td><span class="badge warn">경계</span></td></tr>
            <tr style="background:rgba(226,51,51,0.06)"><td>김주풍력</td><td>풍력</td><td class="mono">10,000 kW</td><td class="mono">7,452</td><td class="mono">7,800</td><td class="mono" style="color:#d32">-348</td><td class="mono" style="color:#d32">-4.46%</td><td class="mono">924,048</td><td><span class="badge err">이상</span></td></tr>
            <tr><td>백학</td><td>태양광</td><td>3,500 kW</td><td class="mono">3,466</td><td class="mono">3,500</td><td class="mono" style="color:#d32">-34</td><td class="mono" style="color:#0a7">-0.97%</td><td class="mono">429,784</td><td><span class="badge ok">정상</span></td></tr>
            <tr><td>삼성솔라2호</td><td>태양광</td><td class="mono">3,020 kW</td><td class="mono">3,011</td><td class="mono">3,050</td><td class="mono" style="color:#d32">-39</td><td class="mono" style="color:#0a7">-1.28%</td><td class="mono">373,364</td><td><span class="badge ok">정상</span></td></tr>
            <tr data-no-sort="1" style="background:rgba(0,89,255,0.04);font-weight:700"><td colspan="3" style="text-align:right">합계</td><td class="mono">19,146</td><td class="mono">19,730</td><td class="mono" style="color:#d32">-584</td><td class="mono" style="color:#e80">-2.96%</td><td class="mono">2,498,104</td><td><span class="badge warn">경계</span></td></tr>
          </tbody>
        </table>
      </div>

      <!-- 5. 하단 액션 & 원본 -->
      <div class="card" style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px">
        <div style="font-size:11px;color:var(--semantic-label-alt)">
          데이터 원본: MongoDB <span class="mono" style="color:var(--semantic-brand-primary)">prod-mart/actual_vs_forecast_2026-04-23</span>
        </div>
        <div style="display:flex;gap:8px">
          <button class="cb n sm" onclick="pdGoSettle()">정산 상세 →</button>
          ${window.csvBtn('pd-detail-tbody','actual_vs_forecast_20260423','자원별 정합성 검증 (2026-04-23)')}
        </div>
      </div>
    </div>
  </div>
</div>`;
window['I_dsh-main']=function(){
  const h=Array.from({length:24},(_,i)=>i+':00');
  const p=[0,0,0,0,0,2,18,45,82,115,134,142,148,145,138,143,150,147,132,108,74,42,18,4];
  const a=[0,0,0,0,0,1,17,43,80,112,131,139,146,141,134,138,143,141,128,103,70,39,15,3];
  mkChart('c-dmain','line',h,[{data:p,borderColor:'#1f98ff',borderWidth:1.5,pointRadius:0,tension:0.4,borderDash:[4,2],fill:false},{data:a,borderColor:'#0059ff',borderWidth:2,pointRadius:0,tension:0.4,fill:true,backgroundColor:'rgba(37,99,235,0.07)'}],{scales:{x:{ticks:{maxTicksLimit:8}},y:{title:{display:true,text:'MW',color:'#666666',font:{size:9}}}}});
  mkChart('c-donut','doughnut',['태양광 58%','풍력 16%','ESS 12%','바이오 8%','V2G 6%'],[{data:[58,16,12,8,6],backgroundColor:['#0059ff','#1f98ff','#ffca42','#925fff','#00d4a8'],borderWidth:0}],{cutout:'68%',plugins:{legend:{display:true,position:'bottom',labels:{font:{size:10},boxWidth:10,boxHeight:10,padding:8,usePointStyle:true,pointStyle:'rectRounded'}}}});

  // 월간 — 12개월 stacked bar + revenue line (dual y-axis)
  const mLab=['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
  mkChart('c-mth','bar',mLab,[
    {type:'bar',label:'태양광(GWh)',data:[11.2,13.4,16.1,18.7,0,0,0,0,0,0,0,0],backgroundColor:'rgba(0,89,255,0.6)',stack:'g',yAxisID:'y'},
    {type:'bar',label:'풍력(GWh)',data:[5.8,6.2,5.4,4.9,0,0,0,0,0,0,0,0],backgroundColor:'rgba(31,152,255,0.6)',stack:'g',yAxisID:'y'},
    {type:'bar',label:'ESS(GWh)',data:[1.9,2.1,2.3,2.4,0,0,0,0,0,0,0,0],backgroundColor:'rgba(255,202,66,0.7)',stack:'g',yAxisID:'y'},
    {type:'bar',label:'바이오(GWh)',data:[1.2,1.2,1.3,1.3,0,0,0,0,0,0,0,0],backgroundColor:'rgba(146,95,255,0.6)',stack:'g',yAxisID:'y'},
    {type:'bar',label:'V2G(GWh)',data:[0.8,0.9,1.1,1.2,0,0,0,0,0,0,0,0],backgroundColor:'rgba(0,212,168,0.65)',stack:'g',yAxisID:'y'},
    {type:'line',label:'예상수익(억원)',data:[25.1,28.7,32.4,37.8,null,null,null,null,null,null,null,null],borderColor:'#0a0a0a',borderWidth:2,pointRadius:3,pointBackgroundColor:'#0a0a0a',borderDash:[2,2],tension:0.3,fill:false,yAxisID:'y1'}
  ],{
    scales:{
      x:{stacked:true},
      y:{stacked:true,position:'left',title:{display:true,text:'GWh',color:'#666',font:{size:10}}},
      y1:{position:'right',grid:{drawOnChartArea:false},title:{display:true,text:'억원',color:'#666',font:{size:10}}}
    },
    plugins:{legend:{display:true,position:'bottom',labels:{font:{size:10},boxWidth:10,padding:8}}}
  });

  // 일간 — 이번달 일자별 stacked bar + revenue line
  const dLab=Array.from({length:23},(_,i)=>(i+1)+'일');
  const sol=[0.18,0.19,0.21,0.2,0.22,0.24,0.25,0.26,0.23,0.21,0.26,0.28,0.3,0.32,0.31,0.29,0.28,0.3,0.33,0.34,0.36,0.38,0.62];
  const win=[0.11,0.12,0.1,0.11,0.13,0.14,0.12,0.11,0.13,0.14,0.12,0.11,0.13,0.14,0.15,0.13,0.12,0.14,0.15,0.16,0.14,0.13,0.24];
  mkChart('c-day','bar',dLab,[
    {type:'bar',label:'태양광',data:sol,backgroundColor:'rgba(0,89,255,0.6)',stack:'d',yAxisID:'y'},
    {type:'bar',label:'풍력',data:win,backgroundColor:'rgba(31,152,255,0.6)',stack:'d',yAxisID:'y'},
    {type:'line',label:'수익(백만원)',data:sol.map((s,i)=>Math.round((s+win[i])*160*10)/10),borderColor:'#0a0a0a',borderWidth:1.5,pointRadius:2,tension:0.3,borderDash:[2,2],fill:false,yAxisID:'y1'}
  ],{
    scales:{
      x:{stacked:true,ticks:{maxTicksLimit:12}},
      y:{stacked:true,position:'left',title:{display:true,text:'GWh',color:'#666',font:{size:10}}},
      y1:{position:'right',grid:{drawOnChartArea:false},title:{display:true,text:'백만원',color:'#666',font:{size:10}}}
    },
    plugins:{legend:{display:true,position:'bottom',labels:{font:{size:10},boxWidth:10,padding:8}}}
  });

  // 전일 — 발전기별 horizontal bar (발전 vs 예측)
  const pLab=['광양항태양광','광양항4단계','해맞이','온누리','금능1호','김주풍력','백학','삼성솔라2호'];
  const act=[2018,1952,894,912,441,7452,3466,3011];
  const frc=[2100,1980,900,940,460,7800,3500,3050];
  window._pLab=pLab; window._pAct=act; window._pFrc=frc;
  mkChart('c-prev','bar',pLab,[
    {label:'실적',data:act,backgroundColor:'#0059ff',borderRadius:4,borderWidth:0,barPercentage:0.78,categoryPercentage:0.72},
    {label:'예측',data:frc,backgroundColor:'rgba(0,89,255,0.12)',borderColor:'#8ba5d6',borderWidth:1,borderRadius:4,barPercentage:0.78,categoryPercentage:0.72}
  ],{
    indexAxis:'y',
    scales:{
      x:{
        title:{display:true,text:'kWh',color:'var(--semantic-label-alt,#7d8590)',font:{size:10}},
        grid:{color:'rgba(0,0,0,0.05)',drawBorder:false},
        ticks:{color:'var(--semantic-label-alt,#7d8590)',font:{size:10},callback:v=>v.toLocaleString()}
      },
      y:{
        grid:{display:false,drawBorder:false},
        ticks:{color:'var(--semantic-label-strong,#1a1a1a)',font:{size:11,weight:'500'}}
      }
    },
    plugins:{
      legend:{display:true,position:'bottom',align:'end',labels:{font:{size:11},boxWidth:10,boxHeight:10,padding:10,usePointStyle:true,pointStyle:'rectRounded'}},
      tooltip:{
        backgroundColor:'rgba(26,26,26,0.95)',padding:10,titleFont:{size:12,weight:'600'},bodyFont:{size:11},
        callbacks:{
          afterBody:function(items){
            if(!items||!items[0])return '';
            var i=items[0].dataIndex;
            var a=act[i], f=frc[i];
            var diff=a-f;
            var pct=(diff/f*100).toFixed(1);
            return ['오차: '+(diff>=0?'+':'')+diff.toLocaleString()+' kWh ('+(diff>=0?'+':'')+pct+'%)'];
          }
        }
      }
    }
  });

  // 상세 모달 — 24시간 프로파일 차트 (resource switcher 대응)
  // 기본: 전체 포트폴리오 sum of 8 resources
  const pdHours=Array.from({length:24},(_,i)=>i+':00');
  // 자원별 24h 프로파일 (실적)
  window._pdProfilesAct={
    all:[0,0,0,0,0,45,320,820,1420,1940,2280,2340,2260,2120,1940,1660,1240,720,250,80,10,2,0,0],
    0:[0,0,0,0,0,8,42,106,182,248,292,304,295,276,246,210,158,94,38,12,0,0,0,0],
    1:[0,0,0,0,0,7,40,100,175,238,281,292,284,266,237,202,152,91,37,12,0,0,0,0],
    2:[0,0,0,0,0,4,18,46,80,109,128,133,130,122,109,92,69,41,17,5,0,0,0,0],
    3:[0,0,0,0,0,4,19,47,82,112,131,136,132,124,111,94,70,42,17,5,0,0,0,0],
    4:[0,0,0,0,0,2,9,22,39,54,63,65,64,60,53,45,34,20,8,2,0,0,0,0],
    5:[5,5,5,5,5,28,185,420,680,910,1080,1120,1080,1010,920,760,560,320,98,28,5,1,0,0],
    6:[0,0,0,0,0,7,38,95,166,226,267,277,269,252,225,192,144,87,35,12,0,0,0,0],
    7:[0,0,0,0,0,6,33,82,145,197,232,241,234,220,196,167,125,75,31,10,0,0,0,0]
  };
  window._pdProfilesFrc={};
  Object.keys(window._pdProfilesAct).forEach(function(k){
    window._pdProfilesFrc[k]=window._pdProfilesAct[k].map(v=>Math.round(v*1.03)); // 3% 과대 예측 가정
  });
  function _pdRender(key){
    var act=window._pdProfilesAct[key]||window._pdProfilesAct.all;
    var frc=window._pdProfilesFrc[key]||window._pdProfilesFrc.all;
    mkChart('c-pd-profile','line',pdHours,[
      {label:'실적',data:act,borderColor:'#0059ff',borderWidth:2,pointRadius:0,tension:0.3,fill:true,backgroundColor:'rgba(0,89,255,0.08)'},
      {label:'예측',data:frc,borderColor:'#8ba5d6',borderWidth:1.5,borderDash:[4,4],pointRadius:0,tension:0.3,fill:false}
    ],{
      scales:{
        x:{grid:{display:false},ticks:{color:'var(--semantic-label-alt,#7d8590)',font:{size:9},maxTicksLimit:12}},
        y:{grid:{color:'rgba(0,0,0,0.05)'},ticks:{color:'var(--semantic-label-alt,#7d8590)',font:{size:10},callback:v=>v.toLocaleString()},title:{display:true,text:'kWh',color:'#666',font:{size:9}}}
      },
      plugins:{legend:{display:true,position:'bottom',align:'end',labels:{font:{size:11},boxWidth:10,boxHeight:10,padding:8,usePointStyle:true}}}
    });
  }
  window.pdSwitchRes=function(v){
    _pdRender(v);
    // 자원별 상세 테이블 동기화 — 선택 자원만 표시 (전체 시 모두)
    const names=['광양항태양광','광양항4단계','해맞이','온누리','금능1호','김주풍력','백학','삼성솔라2호'];
    const target=v==='all'?null:names[parseInt(v,10)];
    document.querySelectorAll('#pd-detail-tbody tr').forEach(tr=>{
      if(tr.dataset.noSort) return; // 합계 행 유지
      const name=tr.cells[0]?.textContent.trim();
      tr.style.display=(!target||name===target)?'':'none';
    });
  };
  window.pdOpenSheet=function(){
    var el=document.getElementById('pd-sheet'); if(!el) return;
    el.classList.add('open');
    document.body.style.overflow='hidden';
    setTimeout(function(){ _pdRender('all'); var s=document.getElementById('pd-res-sel'); if(s) s.value='all'; },60);
  };
  window.pdCloseSheet=function(){
    var el=document.getElementById('pd-sheet'); if(!el) return;
    el.classList.remove('open');
    document.body.style.overflow='';
  };
  // 정산 상세로 이동 (해당 일자 컨텍스트)
  window.pdGoSettle=function(){
    pdCloseSheet();
    setTimeout(function(){
      try{ window._pdSettleDate='2026-04-23'; }catch(e){}
      activate('sdp-set');
      toast('수익정산 메뉴로 이동 — 2026-04-23 기준');
    },180);
  };
  // CSV (UTF-8 BOM) 다운로드 — Excel 호환
  window.pdExportCsv=function(){
    var rows=[
      ['자원명','유형','용량(kW)','실적(kWh)','예측(kWh)','오차(kWh)','오차율(%)','수익(원)','판정'],
      ['광양항태양광','태양광',2293,2018,2100,-82,-3.91,250232,'경계'],
      ['광양항4단계','태양광',2199,1952,1980,-28,-1.41,242048,'정상'],
      ['해맞이','태양광',996,894,900,-6,-0.67,110856,'정상'],
      ['온누리','태양광',996,912,940,-28,-2.98,113088,'정상'],
      ['금능1호','ESS',495,441,460,-19,-4.13,54684,'경계'],
      ['김주풍력','풍력',10000,7452,7800,-348,-4.46,924048,'이상'],
      ['백학','태양광',3500,3466,3500,-34,-0.97,429784,'정상'],
      ['삼성솔라2호','태양광',3020,3011,3050,-39,-1.28,373364,'정상'],
      ['합계','',23499,19146,19730,-584,-2.96,2498104,'경계']
    ];
    var meta=[
      ['# AI-VPP 발전기별 실적 vs 예측'],
      ['# 일자: 2026-04-23 (목)'],
      ['# 데이터 원본: prod-mart/actual_vs_forecast_2026-04-23'],
      ['# MAPE(가중): 2.96%  · 절대오차: -584 kWh  · 총실적: 19,146 kWh  · 총예측: 19,730 kWh'],
      ['']
    ];
    var esc=function(v){
      var s=String(v==null?'':v);
      if(/[",\n]/.test(s)) s='"'+s.replace(/"/g,'""')+'"';
      return s;
    };
    var csv=meta.concat(rows).map(function(r){return r.map(esc).join(',');}).join('\r\n');
    var bom='\ufeff';
    var blob=new Blob([bom+csv],{type:'text/csv;charset=utf-8'});
    var url=URL.createObjectURL(blob);
    var a=document.createElement('a');
    a.href=url; a.download='actual_vs_forecast_20260423.csv';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function(){ URL.revokeObjectURL(url); },500);
    toast('CSV 다운로드 완료 — actual_vs_forecast_20260423.csv');
  };
};

