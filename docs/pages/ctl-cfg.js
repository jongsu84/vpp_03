// AUTO-GENERATED FROM index.html — page module: ctl-cfg
window.P = window.P || {};
/* ===== 클릭제어: 출력제어설정 (지능형 최적 급전 + 수익 손실 최소화) ===== */
window.P['ctl-cfg']=()=>`
<!-- 최상위 필터 바 (그룹 → 정책/허용 → 세부) -->
<div class="card fbar"><div class="fbar-row">
  <div class="fbar-item"><label class="flabel">VPP 그룹</label>
    <select class="fbar-sel" id="cg-f-vpp" onchange="cgFilterApply()">
      <option value="">전체</option><option>VPP-전남권</option><option>VPP-제주권</option><option>VPP-경북권</option>
    </select>
  </div>
  <div class="fbar-item"><label class="flabel">배분 정책</label>
    <select class="fbar-sel" id="cg-f-policy" onchange="cgFilterApply()">
      <option value="">전체</option><option value="profit">수익 최적화</option><option value="equal">균등 배분</option><option value="manual">수동 순서</option>
    </select>
  </div>
  <div class="fbar-item"><label class="flabel">제어 허용</label>
    <select class="fbar-sel" id="cg-f-allow" onchange="cgFilterApply()">
      <option value="">전체</option><option value="ok">허용</option><option value="block">차단</option>
    </select>
  </div>
  <div class="fbar-item"><label class="flabel">자원 유형</label>
    <select class="fbar-sel" id="cg-f-type" onchange="cgFilterApply()">
      <option value="">전체</option><option>태양광</option><option>풍력</option><option>ESS</option><option>바이오</option><option>V2G</option>
    </select>
  </div>
  <div class="fbar-item"><label class="flabel">제어 우선순위</label>
    <select class="fbar-sel" id="cg-f-pri" onchange="cgFilterApply()">
      <option value="">전체</option><option value="high">1~3 (최우선)</option><option value="mid">4~8 (중간)</option><option value="low">9+ (후순위)</option>
    </select>
  </div>
</div></div>

<!-- 지능형 배분 배너 -->
<div class="card" style="background:linear-gradient(90deg,#e8f2ff 0%,#f4f9ff 100%);border-left:4px solid #0059ff;margin-bottom:12px">
  <div style="display:flex;align-items:center;gap:12px;padding:8px 4px">
    <div style="font-size:22px">🎯</div>
    <div style="flex:1">
      <div style="font-size:13px;font-weight:700;color:#0b2a5b">최적 급전 알고리즘 (Merit-Order Curtailment) 가동 중</div>
      <div style="font-size:11px;color:#1b3c7a;margin-top:2px">SMP · CP · AS 기여도를 종합해 한계수익이 낮은 자원부터 우선 감발 → 포트폴리오 수익 손실 최소화</div>
    </div>
    <div style="text-align:right">
      <div style="font-size:10px;color:#5a7cc4">예상 수익 보호</div>
      <div style="font-size:16px;font-weight:800;color:#0059ff">₩ 3.42M<span style="font-size:10px;color:#5a7cc4">/일</span></div>
    </div>
  </div>
</div>

<!-- KPI 5종 -->
<div class="g5" style="margin-bottom:12px">
  <div class="card acc"><div class="ct">현재 알고리즘 ${window.tip('현재 적용 알고리즘','감발 요구량을 자원에 분배하는 방식','수익 최적화: 한계수익 낮은 자원 우선 / 균등: 공평 / 수동: 운영자 지정','수익 최적화 권장 — 일반 균등 배분 대비 30% 손실 절감 가능')}</div><div class="kv">수익 최적화<span class="ku">v2.3</span></div></div>
  <div class="card"><div class="ct">제어 우선순위 모드 ${window.tip('제어 우선순위 모드','KPX 급전지시와 운영자 수동 제어 간 우선순위','자동 우선: KPX → VPP 알고리즘 / 수동 우선: 운영자 → 알고리즘','자동 우선 기본 — 비상시(설비 이상)는 수동 우선으로 일시 변경')}</div><div class="kv">자동 우선</div></div>
  <div class="card"><div class="ct">제어 가능 자원 ${window.tip('제어 가능 자원','현재 알고리즘에 포함된 자원 수','자원 동의 + 통신 OK + 운전 정상','정비/차단 자원은 자동 제외 — 그 자원의 감발량은 다른 자원으로 재분배')}</div><div class="kv">11<span class="ku">/13</span></div></div>
  <div class="card"><div class="ct">배분 정책 버전 ${window.tip('배분 정책 버전','현재 적용 중인 가중치·정책 버전','SMP·CP·AS·REC·마모비용 가중치 + 제약 조건','정책 변경 시 자동 버전업 — 감사 로그에 변경자/사유 기록')}</div><div class="kv">v2.3<span class="ku">2026-04-20</span></div></div>
  <div class="card"><div class="ct">최근 재계산 ${window.tip('최근 알고리즘 재계산 시각','Merit Order(제어 순서) 재계산 시각','SMP·CP·AS 변경 시 또는 정해진 주기마다 자동 실행','15분 주기 권장 — 자주 재계산 시 부하 증가, 너무 길면 시장 반응 늦음')}</div><div class="kv">2분 전</div></div>
</div>

<!-- 제어 배분 알고리즘 & 가중치 -->
<div class="g2">
  <div class="card mb">
    <div class="sh"><div class="st">제어 배분 알고리즘 <span class="tip">ⓘ 감발 요구량을 자원별로 분배하는 방식</span></div></div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px">
      <label style="border:2px solid #0059ff;border-radius:8px;padding:10px;cursor:pointer;background:#f0f6ff">
        <input type="radio" name="algo" checked style="margin-right:6px"><b style="font-size:12px">수익 최적화</b>
        <div style="font-size:10px;color:#666;margin-top:4px">한계수익 낮은 자원 우선 감발<br>손실 최소화 (권장)</div>
      </label>
      <label style="border:1px solid #d0d6e0;border-radius:8px;padding:10px;cursor:pointer">
        <input type="radio" name="algo" style="margin-right:6px"><b style="font-size:12px">균등 배분</b>
        <div style="font-size:10px;color:#666;margin-top:4px">전 자원 동일 비율 감발<br>공평·단순</div>
      </label>
      <label style="border:1px solid #d0d6e0;border-radius:8px;padding:10px;cursor:pointer">
        <input type="radio" name="algo" style="margin-right:6px"><b style="font-size:12px">수동 순서</b>
        <div style="font-size:10px;color:#666;margin-top:4px">운영자 지정 순서 사용<br>강제 제어</div>
      </label>
    </div>
    <div class="form-section" style="font-size:11px;color:#555;margin-top:10px">가중치 (합=1.0)</div>
    <div class="fg" style="display:flex;align-items:center;gap:8px"><label class="fl" style="min-width:120px">SMP 한계수익</label><input type="range" min="0" max="100" value="45" style="flex:1"><span class="mono" style="min-width:40px;text-align:right">0.45</span></div>
    <div class="fg" style="display:flex;align-items:center;gap:8px"><label class="fl" style="min-width:120px">용량정산금 (CP)</label><input type="range" min="0" max="100" value="25" style="flex:1"><span class="mono" style="min-width:40px;text-align:right">0.25</span></div>
    <div class="fg" style="display:flex;align-items:center;gap:8px"><label class="fl" style="min-width:120px">부가서비스 (AS)</label><input type="range" min="0" max="100" value="15" style="flex:1"><span class="mono" style="min-width:40px;text-align:right">0.15</span></div>
    <div class="fg" style="display:flex;align-items:center;gap:8px"><label class="fl" style="min-width:120px">REC·인센티브</label><input type="range" min="0" max="100" value="10" style="flex:1"><span class="mono" style="min-width:40px;text-align:right">0.10</span></div>
    <div class="fg" style="display:flex;align-items:center;gap:8px"><label class="fl" style="min-width:120px">설비 마모 비용</label><input type="range" min="0" max="100" value="5" style="flex:1"><span class="mono" style="min-width:40px;text-align:right">0.05</span></div>
  </div>

  <div class="card mb">
    <div class="sh"><div class="st">제약 조건 & 정책 파라미터</div></div>
    <div class="fg"><label class="fl">제어 우선순위 모드</label><select class="sel"><option>자동 우선 (KPX → VPP 알고리즘)</option><option>수동 우선 (운영자 → 알고리즘)</option><option>혼합 (비상시 수동)</option></select></div>
    <div class="fg"><label class="fl">최소 감발률 (자원 단위) %</label><input class="inp" value="10" type="number"></div>
    <div class="fg"><label class="fl">최대 감발률 (자원 단위) %</label><input class="inp" value="90" type="number"></div>
    <div class="fg"><label class="fl">ESS 배터리 SoC 하한 %</label><input class="inp" value="20" type="number"></div>
    <div class="fg"><label class="fl">수동 제어 복귀 시간 (분)</label><input class="inp" value="30" type="number"></div>
    <div class="fg"><label class="fl">피드백 확인 주기 (초)</label><input class="inp" value="5" type="number"></div>
    <div class="fg"><label class="fl">재계산 주기 (분)</label><input class="inp" value="15" type="number"></div>
    <div class="fg"><label class="fl">비상 정지 온도 임계치 (°C)</label><input class="inp" value="70" type="number"></div>
    <div class="fg"><label class="fl">통신 단절 허용 시간 (초)</label><input class="inp" value="30" type="number"></div>
    <button class="cb p" style="width:100%;font-size:11px;margin-top:8px">정책 저장 · 재배포</button>
  </div>
</div>

<!-- 수익성 기반 제어 순서 (Merit Order) 테이블 -->
<div class="card mb" style="margin-top:12px">
  <div class="sh">
    <div class="st">수익성 기반 제어 순서 (Merit Order) <span class="tip">ⓘ 한계수익이 낮은 순으로 먼저 감발</span></div>
    <div style="display:flex;gap:8px;align-items:center">
      ${window.csvBtn('cg-merit-tbody','merit_order_curtailment','수익성 기반 제어 순서')}
      <button class="cb" style="font-size:10px">시뮬레이션 ▶</button>
      <button class="cb p" style="font-size:10px">순위 재계산</button>
    </div>
  </div>
  <table class="tbl" id="cg-merit-tbl" data-no-sort="1">
    <thead><tr>
      <th>순위</th><th>자원명</th><th>유형</th><th>VPP</th>
      <th>현재 출력</th><th>SMP 수익</th><th>CP 수익</th><th>AS 수익</th>
      <th>한계수익<br>(원/kWh)</th><th>제어 하한</th><th>Ramp Rate</th><th>허용</th>
    </tr></thead>
    <tbody id="cg-merit-tbody">
      <tr data-type="태양광" data-vpp="VPP-전남권" data-allow="ok" data-pri="high"><td><b style="color:#d32">1</b></td><td>광양항태양광</td><td>태양광</td><td>전남권</td><td class="mono">18.2 MW</td><td class="mono">₩142</td><td class="mono">₩38</td><td class="mono">₩0</td><td class="mono"><b style="color:#d32">₩180</b></td><td class="mono">10%</td><td class="mono">5MW/min</td><td><span class="badge ok">허용</span></td></tr>
      <tr data-type="태양광" data-vpp="VPP-전남권" data-allow="ok" data-pri="high"><td><b style="color:#d32">2</b></td><td>광양항4단계</td><td>태양광</td><td>전남권</td><td class="mono">14.8 MW</td><td class="mono">₩148</td><td class="mono">₩42</td><td class="mono">₩0</td><td class="mono"><b style="color:#d32">₩190</b></td><td class="mono">10%</td><td class="mono">5MW/min</td><td><span class="badge ok">허용</span></td></tr>
      <tr data-type="태양광" data-vpp="VPP-제주권" data-allow="ok" data-pri="high"><td><b style="color:#e80">3</b></td><td>온누리</td><td>태양광</td><td>제주권</td><td class="mono">9.5 MW</td><td class="mono">₩155</td><td class="mono">₩45</td><td class="mono">₩0</td><td class="mono"><b style="color:#e80">₩200</b></td><td class="mono">15%</td><td class="mono">3MW/min</td><td><span class="badge ok">허용</span></td></tr>
      <tr data-type="태양광" data-vpp="VPP-경북권" data-allow="ok" data-pri="mid"><td>4</td><td>포항S1</td><td>태양광</td><td>경북권</td><td class="mono">7.3 MW</td><td class="mono">₩162</td><td class="mono">₩48</td><td class="mono">₩0</td><td class="mono">₩210</td><td class="mono">10%</td><td class="mono">4MW/min</td><td><span class="badge ok">허용</span></td></tr>
      <tr data-type="풍력" data-vpp="VPP-제주권" data-allow="ok" data-pri="mid"><td>5</td><td>김주풍력</td><td>풍력</td><td>제주권</td><td class="mono">8.1 MW</td><td class="mono">₩175</td><td class="mono">₩55</td><td class="mono">₩12</td><td class="mono">₩242</td><td class="mono">20%</td><td class="mono">4MW/min</td><td><span class="badge ok">허용</span></td></tr>
      <tr data-type="풍력" data-vpp="VPP-전남권" data-allow="ok" data-pri="mid"><td>6</td><td>신안풍력</td><td>풍력</td><td>전남권</td><td class="mono">11.4 MW</td><td class="mono">₩180</td><td class="mono">₩58</td><td class="mono">₩15</td><td class="mono">₩253</td><td class="mono">20%</td><td class="mono">5MW/min</td><td><span class="badge ok">허용</span></td></tr>
      <tr data-type="V2G" data-vpp="VPP-전남권" data-allow="ok" data-pri="mid"><td>7</td><td>광양V2G 허브</td><td>V2G</td><td>전남권</td><td class="mono">1.8 MW</td><td class="mono">₩185</td><td class="mono">₩0</td><td class="mono">₩82</td><td class="mono">₩267</td><td class="mono">0%</td><td class="mono">즉시</td><td><span class="badge ok">허용</span></td></tr>
      <tr data-type="V2G" data-vpp="VPP-제주권" data-allow="ok" data-pri="mid"><td>8</td><td>제주V2G 스테이션</td><td>V2G</td><td>제주권</td><td class="mono">0.9 MW</td><td class="mono">₩190</td><td class="mono">₩0</td><td class="mono">₩85</td><td class="mono">₩275</td><td class="mono">0%</td><td class="mono">즉시</td><td><span class="badge ok">허용</span></td></tr>
      <tr data-type="바이오" data-vpp="VPP-전남권" data-allow="ok" data-pri="low"><td>9</td><td>무안바이오</td><td>바이오</td><td>전남권</td><td class="mono">4.2 MW</td><td class="mono">₩195</td><td class="mono">₩72</td><td class="mono">₩28</td><td class="mono"><b style="color:#0a7">₩295</b></td><td class="mono">30%</td><td class="mono">2MW/min</td><td><span class="badge ok">허용</span></td></tr>
      <tr data-type="바이오" data-vpp="VPP-경북권" data-allow="ok" data-pri="low"><td>10</td><td>영덕바이오</td><td>바이오</td><td>경북권</td><td class="mono">3.8 MW</td><td class="mono">₩198</td><td class="mono">₩75</td><td class="mono">₩30</td><td class="mono"><b style="color:#0a7">₩303</b></td><td class="mono">30%</td><td class="mono">2MW/min</td><td><span class="badge ok">허용</span></td></tr>
      <tr data-type="ESS" data-vpp="VPP-제주권" data-allow="ok" data-pri="low"><td>11</td><td>금능1호 ESS</td><td>ESS</td><td>제주권</td><td class="mono">12.0 MW</td><td class="mono">₩210</td><td class="mono">₩85</td><td class="mono">₩95</td><td class="mono"><b style="color:#0a7">₩390</b></td><td class="mono">0%</td><td class="mono">10MW/min</td><td><span class="badge ok">허용</span></td></tr>
      <tr data-type="ESS" data-vpp="VPP-전남권" data-allow="block" data-pri="low"><td>—</td><td>광양2호 ESS</td><td>ESS</td><td>전남권</td><td class="mono">0 MW</td><td class="mono">—</td><td class="mono">—</td><td class="mono">—</td><td class="mono">—</td><td class="mono">0%</td><td class="mono">10MW/min</td><td><span class="badge err">정비중</span></td></tr>
      <tr data-type="태양광" data-vpp="VPP-전남권" data-allow="block" data-pri="low"><td>—</td><td>여수태양광</td><td>태양광</td><td>전남권</td><td class="mono">0 MW</td><td class="mono">—</td><td class="mono">—</td><td class="mono">—</td><td class="mono">—</td><td class="mono">10%</td><td class="mono">5MW/min</td><td><span class="badge err">차단</span></td></tr>
    </tbody>
  </table>
  <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;padding:8px 10px;background:#f6f8fb;border-radius:6px;font-size:11px">
    <span style="color:#555">빨강 = 우선 감발 (낮은 한계수익) · 초록 = 후순위 (높은 한계수익) · — = 제어 불가</span>
    <span style="color:#333"><b>총 감발 가용:</b> <b class="mono" style="color:#0059ff">84.1 MW</b> · <b>예상 수익 손실:</b> <b class="mono" style="color:#d32">₩ 0.82M</b></span>
  </div>
</div>

<!-- 시나리오 시뮬레이션 + 정책 변경 이력 -->
<div class="g2">
  <div class="card mb">
    <div class="sh"><div class="st">감발 시나리오 시뮬레이션 <span class="tip">ⓘ 감발 요구량 입력 시 예상 제어 배분 미리보기</span></div></div>
    <div class="fg" style="display:flex;gap:8px;align-items:flex-end">
      <div style="flex:1"><label class="fl">감발 요구량 (MW)</label><input class="inp" value="30" type="number" id="cg-sim-mw"></div>
      <div style="flex:1"><label class="fl">알고리즘</label><select class="sel"><option>수익 최적화 (현재)</option><option>균등 배분</option></select></div>
      <button class="cb p" style="font-size:11px">▶ 실행</button>
    </div>
    <table class="tbl" style="margin-top:10px">
      <thead><tr><th>순위</th><th>자원</th><th>현재</th><th>감발량</th><th>감발 후</th><th>손실</th></tr></thead>
      <tbody>
        <tr><td>1</td><td>광양항태양광</td><td class="mono">18.2</td><td class="mono" style="color:#d32">-8.2</td><td class="mono">10.0</td><td class="mono">₩148k</td></tr>
        <tr><td>2</td><td>광양항4단계</td><td class="mono">14.8</td><td class="mono" style="color:#d32">-6.7</td><td class="mono">8.1</td><td class="mono">₩127k</td></tr>
        <tr><td>3</td><td>온누리</td><td class="mono">9.5</td><td class="mono" style="color:#d32">-4.3</td><td class="mono">5.2</td><td class="mono">₩86k</td></tr>
        <tr><td>4</td><td>포항S1</td><td class="mono">7.3</td><td class="mono" style="color:#d32">-3.3</td><td class="mono">4.0</td><td class="mono">₩69k</td></tr>
        <tr><td>5</td><td>김주풍력</td><td class="mono">8.1</td><td class="mono" style="color:#d32">-3.7</td><td class="mono">4.4</td><td class="mono">₩90k</td></tr>
        <tr><td>6</td><td>신안풍력</td><td class="mono">11.4</td><td class="mono" style="color:#d32">-3.8</td><td class="mono">7.6</td><td class="mono">₩96k</td></tr>
        <tr data-no-sort="1" style="background:#f0f6ff;font-weight:700"><td colspan="3" style="text-align:right">합계</td><td class="mono" style="color:#d32">-30.0 MW</td><td>—</td><td class="mono" style="color:#d32">₩616k</td></tr>
      </tbody>
    </table>
    <div style="margin-top:8px;padding:6px 10px;background:#e8f4ed;border-left:3px solid #0a7;border-radius:4px;font-size:11px">
      <b style="color:#0a7">수익 보호 효과:</b> 균등 배분 대비 <b class="mono" style="color:#0a7">+₩ 284k</b> 손실 감소 (31.6% 절감)
    </div>
  </div>

  <div class="card mb">
    <div class="sh"><div class="st">정책 변경 이력</div></div>
    <table class="tbl" data-no-sort="1">
      <thead><tr><th>시각</th><th>버전</th><th>변경자</th><th>항목</th><th>사유</th></tr></thead>
      <tbody>
        <tr><td class="mono">04-24 14:32</td><td><span class="badge ok">v2.3</span></td><td>김운영</td><td>CP 가중치 0.20→0.25</td><td>Q2 CP 단가 상승 반영</td></tr>
        <tr><td class="mono">04-20 09:15</td><td>v2.2</td><td>박정책</td><td>ESS SoC 하한 15→20%</td><td>배터리 수명 보호</td></tr>
        <tr><td class="mono">04-15 16:48</td><td>v2.1</td><td>김운영</td><td>알고리즘: 수익 최적화 전환</td><td>균등→수익 (P&amp;L 개선)</td></tr>
        <tr><td class="mono">04-10 11:03</td><td>v2.0</td><td>이기획</td><td>AS 가중치 신설 (0.15)</td><td>보조서비스 시장 진입</td></tr>
        <tr><td class="mono">04-05 08:22</td><td>v1.9</td><td>박정책</td><td>Ramp Rate 상한 조정</td><td>풍력 급변 대응</td></tr>
      </tbody>
    </table>
  </div>
</div>`;
window.cgFilterApply=function(){
  var vpp=(document.getElementById('cg-f-vpp')||{}).value||'';
  var tp=(document.getElementById('cg-f-type')||{}).value||'';
  var al=(document.getElementById('cg-f-allow')||{}).value||'';
  var pr=(document.getElementById('cg-f-pri')||{}).value||'';
  var tb=document.getElementById('cg-merit-tbody'); if(!tb)return;
  [].forEach.call(tb.querySelectorAll('tr'),function(tr){
    var ok=true;
    if(vpp && tr.getAttribute('data-vpp')!==vpp) ok=false;
    if(tp && tr.getAttribute('data-type')!==tp) ok=false;
    if(al && tr.getAttribute('data-allow')!==al) ok=false;
    if(pr && tr.getAttribute('data-pri')!==pr) ok=false;
    tr.style.display=ok?'':'none';
  });
};

