// AUTO-GENERATED FROM index.html — page module: ctl-cfg
window.P = window.P || {};
/* ===== 클릭제어: 출력제어설정 (지능형 최적 급전 + 수익 손실 최소화) ===== */
window.P['ctl-cfg']=()=>`
<!-- 지능형 배분 배너 -->
<div class="card" style="background:linear-gradient(90deg,#e8f2ff 0%,#f4f9ff 100%);border-left:4px solid #0059ff;margin-bottom:12px">
  <div style="display:flex;align-items:center;gap:12px;padding:8px 4px">
    <div style="font-size:22px">🎯</div>
    <div style="flex:1">
      <div style="font-size:13px;font-weight:700;color:#0b2a5b">최적 급전 알고리즘 (Merit-Order Curtailment) 가동 중</div>
      <div style="font-size:11px;color:#1b3c7a;margin-top:2px">한계수익이 낮은 자원부터 우선 감발 → 포트폴리오 수익 손실 최소화 · 운영자 Override 지원</div>
    </div>
  </div>
</div>

<!-- 최상위 필터 바 (VPP 그룹 → 자원 유형 → 정책/허용 → 세부) -->
<div class="card fbar"><div class="fbar-row">
  <div class="fbar-item"><label class="fbar-lbl">VPP 그룹</label>
    <select class="fbar-sel" id="cg-f-vpp" onchange="cgFilterApply()">
      <option value="">전체</option><option>VPP-전남권</option><option>VPP-제주권</option><option>VPP-경북권</option>
    </select>
  </div>
  <div class="fbar-item"><label class="fbar-lbl">자원 유형</label>
    <select class="fbar-sel" id="cg-f-type" onchange="cgFilterApply()">
      <option value="">전체</option><option>태양광</option><option>풍력</option><option>ESS</option><option>바이오</option><option>V2G</option>
    </select>
  </div>
  <div class="fbar-item"><label class="fbar-lbl">제어 허용</label>
    <select class="fbar-sel" id="cg-f-allow" onchange="cgFilterApply()">
      <option value="">전체</option><option value="ok">허용</option><option value="block">차단</option>
    </select>
  </div>
  <div class="fbar-item"><label class="fbar-lbl">제어 우선순위</label>
    <select class="fbar-sel" id="cg-f-pri" onchange="cgFilterApply()">
      <option value="">전체</option><option value="high">1~3 (최우선)</option><option value="mid">4~8 (중간)</option><option value="low">9+ (후순위)</option>
    </select>
  </div>
</div></div>

<!-- KPI 3종 -->
<div class="g3" style="margin-bottom:12px">
  <div class="card acc"><div class="ct">제어 가능 자원 ${window.tip('제어 가능 자원','현재 알고리즘에 포함된 자원 수','자원 동의 + 통신 OK + 운전 정상','정비/차단 자원은 자동 제외 — 그 자원의 감발량은 다른 자원으로 재분배')}</div><div class="kv" id="cg-kpi-allowed">11<span class="ku">/13</span></div></div>
  <div class="card"><div class="ct">총 감발 가용 ${window.tip('총 감발 가용 용량','허용 자원이 즉시 감발할 수 있는 최대 MW','Σ(자원 현재출력 × (1 - 제어하한))','감발 요구량이 이 값을 초과하면 시뮬레이션에서 부족 경고 표시')}</div><div class="kv" id="cg-kpi-cap">—<span class="ku">MW</span></div></div>
  <div class="card"><div class="ct">최근 재계산 ${window.tip('최근 Merit Order 재계산 시각','한계수익 기준 정렬을 다시 수행한 시각','SMP·CP·AS 변경 또는 정해진 주기마다 실행','15분 주기 권장 — 자주 재계산 시 부하 증가, 너무 길면 시장 반응 늦음')}</div><div class="kv" id="cg-kpi-recalc">2분 전</div></div>
</div>

<!-- 제어 배분 알고리즘 & 가중치 -->
<div class="g2">
  <div class="card mb">
    <div class="sh"><div class="st">제어 배분 알고리즘 ${window.tip('제어 배분 알고리즘','감발 요구량을 자원별로 분배하는 방식','수익 최적화 / 균등 / 순차 / 비례 4종 — 라디오로 선택','권장: 수익 최적화 — 균등 배분 대비 약 30% 손실 절감')}</div></div>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:12px">
      <label style="border:2px solid #0059ff;border-radius:8px;padding:10px;cursor:pointer;background:#f0f6ff">
        <input type="radio" name="algo" value="profit" checked style="margin-right:6px"><b style="font-size:12px">수익 최적화</b>
        <div style="font-size:10px;color:#666;margin-top:4px">한계수익 낮은 자원 우선 감발 → 포트폴리오 손실 최소화 (권장)</div>
      </label>
      <label style="border:1px solid #d0d6e0;border-radius:8px;padding:10px;cursor:pointer">
        <input type="radio" name="algo" value="equal" style="margin-right:6px"><b style="font-size:12px">균등 배분</b>
        <div style="font-size:10px;color:#666;margin-top:4px">전 자원에 동일 MW씩 분배 → 공평·단순 (기준 알고리즘)</div>
      </label>
      <label style="border:1px solid #d0d6e0;border-radius:8px;padding:10px;cursor:pointer">
        <input type="radio" name="algo" value="sequential" style="margin-right:6px"><b style="font-size:12px">순차 배분</b>
        <div style="font-size:10px;color:#666;margin-top:4px">우선순위 1번 자원부터 제어 하한까지 소진 후 다음 자원 (효율성)</div>
      </label>
      <label style="border:1px solid #d0d6e0;border-radius:8px;padding:10px;cursor:pointer">
        <input type="radio" name="algo" value="proportional" style="margin-right:6px"><b style="font-size:12px">비례 배분</b>
        <div style="font-size:10px;color:#666;margin-top:4px">현재 출력에 비례하여 감발 (대규모 자원 더 많이)</div>
      </label>
    </div>
    <div class="form-section" style="font-size:11px;color:#555;margin-top:10px">가중치 (합=1.0)</div>
    <div class="fg" style="display:flex;align-items:center;gap:8px"><label class="fl" style="min-width:120px">SMP 한계수익</label><input type="range" min="0" max="100" value="45" style="flex:1" id="cg-w-smp"><span class="mono" style="min-width:40px;text-align:right">0.45</span></div>
    <div class="fg" style="display:flex;align-items:center;gap:8px"><label class="fl" style="min-width:120px">용량정산금 (CP)</label><input type="range" min="0" max="100" value="25" style="flex:1" id="cg-w-cp"><span class="mono" style="min-width:40px;text-align:right">0.25</span></div>
    <div class="fg" style="display:flex;align-items:center;gap:8px"><label class="fl" style="min-width:120px">부가서비스 (AS)</label><input type="range" min="0" max="100" value="15" style="flex:1" id="cg-w-as"><span class="mono" style="min-width:40px;text-align:right">0.15</span></div>
    <div class="fg" style="display:flex;align-items:center;gap:8px"><label class="fl" style="min-width:120px">기타 (REC·마모)</label><input type="range" min="0" max="100" value="15" style="flex:1" id="cg-w-other"><span class="mono" style="min-width:40px;text-align:right">0.15</span></div>
  </div>

  <div class="card mb">
    <div class="sh"><div class="st">제약 조건 & 정책 파라미터 <span class="tip">ⓘ 운영자 결정 항목만 표시 — 시스템 파라미터(피드백·통신단절 등)는 시스템 관리자 영역</span></div></div>
    <div class="fg"><label class="fl">제어 우선순위 모드</label><select class="sel" id="cg-mode"><option>자동 우선 (KPX → VPP 알고리즘)</option><option>수동 우선 (운영자 → 알고리즘)</option><option>혼합 (비상시 수동)</option></select></div>
    <div class="fg" style="display:flex;gap:8px">
      <div style="flex:1"><label class="fl">최소 감발률 %</label><input class="inp" value="10" type="number" id="cg-min"></div>
      <div style="flex:1"><label class="fl">최대 감발률 %</label><input class="inp" value="90" type="number" id="cg-max"></div>
    </div>
    <div class="fg"><label class="fl">ESS 배터리 SoC 하한 %</label><input class="inp" value="20" type="number" id="cg-soc"></div>
    <div class="fg"><label class="fl">재계산 주기 (분)</label><input class="inp" value="15" type="number" id="cg-recalc-cycle"></div>
    <button class="cb p" style="width:100%;font-size:11px;margin-top:14px" onclick="cgSavePolicy()">정책 저장 · 재배포</button>
  </div>
</div>

<!-- 수익성 기반 제어 순서 (Merit Order) 테이블 -->
<div class="card mb" style="margin-top:12px">
  <div class="sh">
    <div class="st">수익성 기반 제어 순서 (Merit Order) <span class="tip">ⓘ 한계수익이 낮은 순으로 먼저 감발</span></div>
    <div style="display:flex;gap:8px;align-items:center">
      ${window.csvBtn('cg-merit-tbody','merit_order_curtailment','수익성 기반 제어 순서')}
      <button class="cb" style="font-size:10px" onclick="cgScrollToSim()">시뮬레이션 ▶</button>
      <button class="cb p" style="font-size:10px" onclick="cgRecalcMerit()">순위 재계산</button>
    </div>
  </div>
  <table class="tbl" id="cg-merit-tbl" data-no-sort="1">
    <thead><tr>
      <th>순위</th><th>자원명</th><th>유형</th><th>VPP</th>
      <th>현재 출력</th><th>한계수익<br>(원/kWh)</th><th>제어 하한</th><th>허용</th>
    </tr></thead>
    <tbody id="cg-merit-tbody">
      <tr data-type="태양광" data-vpp="VPP-전남권" data-allow="ok" data-pri="high"><td><b style="color:#d32">1</b></td><td>광양항태양광</td><td>태양광</td><td>전남권</td><td class="mono">18.2 MW</td><td class="mono"><b style="color:#d32">₩180</b></td><td class="mono">10%</td><td><span class="badge ok">허용</span></td></tr>
      <tr data-type="태양광" data-vpp="VPP-전남권" data-allow="ok" data-pri="high"><td><b style="color:#d32">2</b></td><td>광양항4단계</td><td>태양광</td><td>전남권</td><td class="mono">14.8 MW</td><td class="mono"><b style="color:#d32">₩190</b></td><td class="mono">10%</td><td><span class="badge ok">허용</span></td></tr>
      <tr data-type="태양광" data-vpp="VPP-제주권" data-allow="ok" data-pri="high"><td><b style="color:#e80">3</b></td><td>온누리</td><td>태양광</td><td>제주권</td><td class="mono">9.5 MW</td><td class="mono"><b style="color:#e80">₩200</b></td><td class="mono">15%</td><td><span class="badge ok">허용</span></td></tr>
      <tr data-type="태양광" data-vpp="VPP-경북권" data-allow="ok" data-pri="mid"><td>4</td><td>포항S1</td><td>태양광</td><td>경북권</td><td class="mono">7.3 MW</td><td class="mono">₩210</td><td class="mono">10%</td><td><span class="badge ok">허용</span></td></tr>
      <tr data-type="풍력" data-vpp="VPP-제주권" data-allow="ok" data-pri="mid"><td>5</td><td>김주풍력</td><td>풍력</td><td>제주권</td><td class="mono">8.1 MW</td><td class="mono">₩242</td><td class="mono">20%</td><td><span class="badge ok">허용</span></td></tr>
      <tr data-type="풍력" data-vpp="VPP-전남권" data-allow="ok" data-pri="mid"><td>6</td><td>신안풍력</td><td>풍력</td><td>전남권</td><td class="mono">11.4 MW</td><td class="mono">₩253</td><td class="mono">20%</td><td><span class="badge ok">허용</span></td></tr>
      <tr data-type="V2G" data-vpp="VPP-전남권" data-allow="ok" data-pri="mid"><td>7</td><td>광양V2G 허브</td><td>V2G</td><td>전남권</td><td class="mono">1.8 MW</td><td class="mono">₩267</td><td class="mono">0%</td><td><span class="badge ok">허용</span></td></tr>
      <tr data-type="V2G" data-vpp="VPP-제주권" data-allow="ok" data-pri="mid"><td>8</td><td>제주V2G 스테이션</td><td>V2G</td><td>제주권</td><td class="mono">0.9 MW</td><td class="mono">₩275</td><td class="mono">0%</td><td><span class="badge ok">허용</span></td></tr>
      <tr data-type="바이오" data-vpp="VPP-전남권" data-allow="ok" data-pri="low"><td>9</td><td>무안바이오</td><td>바이오</td><td>전남권</td><td class="mono">4.2 MW</td><td class="mono"><b style="color:#0a7">₩295</b></td><td class="mono">30%</td><td><span class="badge ok">허용</span></td></tr>
      <tr data-type="바이오" data-vpp="VPP-경북권" data-allow="ok" data-pri="low"><td>10</td><td>영덕바이오</td><td>바이오</td><td>경북권</td><td class="mono">3.8 MW</td><td class="mono"><b style="color:#0a7">₩303</b></td><td class="mono">30%</td><td><span class="badge ok">허용</span></td></tr>
      <tr data-type="ESS" data-vpp="VPP-제주권" data-allow="ok" data-pri="low"><td>11</td><td>금능1호 ESS</td><td>ESS</td><td>제주권</td><td class="mono">12.0 MW</td><td class="mono"><b style="color:#0a7">₩390</b></td><td class="mono">0%</td><td><span class="badge ok">허용</span></td></tr>
      <tr data-type="ESS" data-vpp="VPP-전남권" data-allow="block" data-pri="low"><td>—</td><td>광양2호 ESS</td><td>ESS</td><td>전남권</td><td class="mono">0 MW</td><td class="mono">—</td><td class="mono">0%</td><td><span class="badge err">정비중</span></td></tr>
      <tr data-type="태양광" data-vpp="VPP-전남권" data-allow="block" data-pri="low"><td>—</td><td>여수태양광</td><td>태양광</td><td>전남권</td><td class="mono">0 MW</td><td class="mono">—</td><td class="mono">10%</td><td><span class="badge err">차단</span></td></tr>
    </tbody>
  </table>
  <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;padding:8px 10px;background:#f6f8fb;border-radius:6px;font-size:11px">
    <span style="color:#555">빨강 = 우선 감발 (낮은 한계수익) · 초록 = 후순위 (높은 한계수익) · — = 제어 불가</span>
    <span style="color:#333"><b>총 감발 가용:</b> <b class="mono" style="color:#0059ff">84.1 MW</b> · <b>예상 수익 손실:</b> <b class="mono" style="color:#d32">₩ 0.82M</b></span>
  </div>
</div>

<!-- 감발 시나리오 시뮬레이션 -->
<div class="card mb">
  <div class="sh"><div class="st">감발 시나리오 시뮬레이션 <span class="tip">ⓘ 감발 요구량과 알고리즘 선택 후 ▶ 실행 — 운영자 Override 가능</span></div><div style="font-size:10px;color:var(--semantic-label-alt)" id="cg-sim-status">대기 중</div></div>
  <div class="fg" style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap">
    <div style="flex:1;min-width:140px"><label class="fl">감발 요구량 (MW)</label><input class="inp" value="30" type="number" min="0.1" step="0.1" id="cg-sim-mw"></div>
    <div style="flex:1;min-width:160px"><label class="fl">알고리즘</label><select class="sel" id="cg-sim-algo">
      <option value="profit">수익 최적화</option>
      <option value="equal">균등 배분</option>
      <option value="sequential">순차 배분</option>
      <option value="proportional">비례 배분</option>
    </select></div>
    <button class="cb p" style="font-size:11px" onclick="cgRunSimulation()">▶ 실행</button>
  </div>
  <table class="tbl" style="margin-top:10px" data-no-sort="1">
    <thead><tr><th style="width:36px;text-align:center">제외</th><th style="width:32px">#</th><th>자원</th><th class="mono">현재 (MW)</th><th class="mono">감발량 (MW)</th><th class="mono">감발 후 (MW)</th><th class="mono">손실</th></tr></thead>
    <tbody id="cg-sim-tbody">
      <tr><td colspan="7" style="text-align:center;color:var(--semantic-label-alt);padding:18px;font-size:11px">감발 요구량과 알고리즘을 선택한 후 [▶ 실행]을 눌러주세요</td></tr>
    </tbody>
  </table>
  <div id="cg-sim-summary" style="margin-top:8px;padding:8px 12px;background:var(--semantic-background-2);border-left:3px solid var(--semantic-line-strong);border-radius:4px;font-size:11px;line-height:18px">
    ※ Override 체크박스를 해제하면 해당 자원을 제외하고 다른 자원으로 자동 재배분됩니다. 실제 감발 가용량 부족 시 경고 표시.
  </div>
</div>

<!-- 감사이력 페이지 안내 -->
<div class="card mb" style="border-left:3px solid var(--semantic-brand-primary);background:var(--semantic-brand-primary-assistive);padding:14px 18px;display:flex;align-items:center;justify-content:space-between;gap:12px">
  <div>
    <div style="font-size:13px;font-weight:600;margin-bottom:2px">정책 변경 이력은 감사이력 페이지에서 확인할 수 있습니다</div>
    <div style="font-size:12px;color:var(--semantic-label-alt);line-height:18px">알고리즘·가중치·제약 조건 변경은 SHA-256 무결성 해시로 5년간 영구 보관됩니다. 변경자·시각·항목·사유를 통합 추적합니다.</div>
  </div>
  <button class="cb p sm" onclick="activate('his-aud')" style="white-space:nowrap;flex-shrink:0">감사이력 ↗</button>
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

// ===== 정책 저장·재배포 / 시뮬레이션 스크롤 / Merit Order 재계산 =====
function _cgReadWeights(){
  return {
    smp:(parseInt(document.getElementById('cg-w-smp')?.value,10)||0)/100,
    cp:(parseInt(document.getElementById('cg-w-cp')?.value,10)||0)/100,
    as:(parseInt(document.getElementById('cg-w-as')?.value,10)||0)/100,
    other:(parseInt(document.getElementById('cg-w-other')?.value,10)||0)/100
  };
}
function _cgPad2(n){return String(n).padStart(2,'0');}
function _cgFmtTime(d){return _cgPad2(d.getMonth()+1)+'-'+_cgPad2(d.getDate())+' '+_cgPad2(d.getHours())+':'+_cgPad2(d.getMinutes());}

window.cgSavePolicy=function(){
  // 1) 가중치 합 검증 (1.0 ± 0.05 허용)
  var w=_cgReadWeights();
  var sum=w.smp+w.cp+w.as+w.other;
  if(Math.abs(sum-1.0)>0.05){
    toast('가중치 합계가 1.0이 아닙니다 (현재 '+sum.toFixed(2)+'). 슬라이더를 조정하세요.','warn');
    return;
  }
  // 2) min/max 검증
  var minR=parseInt(document.getElementById('cg-min')?.value,10);
  var maxR=parseInt(document.getElementById('cg-max')?.value,10);
  if(isNaN(minR)||isNaN(maxR)||minR<0||maxR>100){toast('감발률은 0~100 범위여야 합니다.','warn');return;}
  if(minR>=maxR){toast('최소 감발률은 최대 감발률보다 작아야 합니다.','warn');return;}
  // 3) ESS SoC 검증
  var soc=parseInt(document.getElementById('cg-soc')?.value,10);
  if(isNaN(soc)||soc<0||soc>100){toast('ESS SoC 하한은 0~100% 범위여야 합니다.','warn');return;}
  // 4) 사용자 확인
  if(!confirm('정책을 저장하고 즉시 재배포하시겠습니까?\n변경 사항이 허용 자원에 즉시 적용되며, 감사이력에 영구 보관됩니다.')) return;
  // 5) 다음 버전 산정 (in-memory 상태 유지 — KPI 카드에서 분리됨)
  if(!window._cgPolicyVer) window._cgPolicyVer={major:2,minor:3};
  window._cgPolicyVer.minor+=1;
  var newVer='v'+window._cgPolicyVer.major+'.'+window._cgPolicyVer.minor;
  // 6) 알고리즘 라벨
  var algoEl=document.querySelector('input[name="algo"]:checked');
  var algoLabel=(algoEl && algoEl.parentElement && algoEl.parentElement.querySelector('b'))
    ? algoEl.parentElement.querySelector('b').textContent : '수익 최적화';
  // 7) 토스트로 변경 요약 (이력은 감사이력 페이지에 통합)
  var detail='알고리즘 '+algoLabel+' · 가중치(SMP·CP·AS·기타) '+w.smp.toFixed(2)+'·'+w.cp.toFixed(2)+'·'+w.as.toFixed(2)+'·'+w.other.toFixed(2);
  toast('정책 '+newVer+' 저장·재배포 — '+detail);
};

window.cgScrollToSim=function(){
  var target=document.getElementById('cg-sim-mw');
  if(!target){toast('시뮬레이션 영역을 찾을 수 없습니다.','err');return;}
  var card=target.closest('.card');
  if(card) card.scrollIntoView({behavior:'smooth',block:'start'});
  setTimeout(function(){ try{target.focus(); target.select();}catch(e){} },350);
  toast('감발 시나리오 시뮬레이션 영역으로 이동');
};

window.cgRecalcMerit=function(){
  var tbody=document.getElementById('cg-merit-tbody');
  if(!tbody){toast('Merit Order 테이블을 찾을 수 없습니다.','err');return;}
  var rows=Array.prototype.slice.call(tbody.querySelectorAll('tr'));
  var allowed=[], blocked=[];
  rows.forEach(function(tr){
    if(tr.getAttribute('data-allow')==='block'){ blocked.push(tr); return; }
    var cell=tr.cells[5];
    var m=cell?cell.textContent.match(/(\d+)/):null;
    var margin=m?parseInt(m[1],10):0;
    allowed.push({tr:tr,margin:margin});
  });
  // 한계수익 오름차순 (낮을수록 우선 감발)
  allowed.sort(function(a,b){return a.margin-b.margin;});
  // 재구성
  tbody.innerHTML='';
  allowed.forEach(function(item,i){
    var rank=i+1;
    var color=rank<=2?'#d32':(rank===3?'#e80':(rank>=9?'#0a7':''));
    var rankCell=item.tr.cells[0];
    if(rankCell) rankCell.innerHTML=color?('<b style="color:'+color+'">'+rank+'</b>'):String(rank);
    var marginCell=item.tr.cells[5];
    if(marginCell){
      if(color){
        marginCell.innerHTML='<b style="color:'+color+'">₩'+item.margin+'</b>';
      } else {
        marginCell.innerHTML='₩'+item.margin;
      }
    }
    tbody.appendChild(item.tr);
  });
  blocked.forEach(function(tr){ tbody.appendChild(tr); });
  // KPI 갱신
  var kpiRecalc=document.getElementById('cg-kpi-recalc');
  if(kpiRecalc) kpiRecalc.textContent='방금';
  toast('Merit Order 재계산 완료 — 한계수익 낮은 순 정렬 ('+allowed.length+'개 자원)');
};

// ===== 감발 시나리오 시뮬레이션 (Economic Dispatch + Override) =====
window._cgSimState=null; // {resources, totalMW, algorithm}

function _cgAlgoLabel(a){
  return a==='profit'?'수익 최적화'
       :a==='equal'?'균등 배분'
       :a==='sequential'?'순차 배분'
       :a==='proportional'?'비례 배분':'수익 최적화';
}

// Merit Order 테이블에서 허용 자원만 추출 (한계수익·현재출력·제어하한 포함)
function _cgReadMeritResources(){
  var rows=document.querySelectorAll('#cg-merit-tbody tr');
  var list=[];
  rows.forEach(function(tr){
    if(tr.getAttribute('data-allow')==='block') return;
    var name=(tr.cells[1]?tr.cells[1].textContent:'').trim();
    var type=(tr.cells[2]?tr.cells[2].textContent:'').trim();
    var vpp=(tr.cells[3]?tr.cells[3].textContent:'').trim();
    var curM=(tr.cells[4]?tr.cells[4].textContent.match(/[\d.]+/):null);
    var curMW=curM?parseFloat(curM[0]):0;
    var marM=(tr.cells[5]?tr.cells[5].textContent.match(/(\d+)/):null);
    var margin=marM?parseInt(marM[1],10):0;
    var minM=(tr.cells[6]?tr.cells[6].textContent.match(/(\d+)/):null);
    var minPct=minM?parseInt(minM[1],10):0;
    list.push({name:name,type:type,vpp:vpp,curMW:curMW,margin:margin,minPct:minPct,excluded:false,curtail:0,loss:0,maxCurtail:0});
  });
  return list;
}

// 감발량 분배 (4개 알고리즘, 제외 자원 반영)
function _cgDistribute(resources,totalMW,algorithm){
  resources.forEach(function(r){
    r.maxCurtail=r.curMW*(100-r.minPct)/100;
    if(r.maxCurtail<0) r.maxCurtail=0;
    r.curtail=0;
    r.loss=0;
  });
  var active=resources.filter(function(r){return !r.excluded;});
  var remaining=totalMW;

  if(algorithm==='profit'){
    var sorted=active.slice().sort(function(a,b){return a.margin-b.margin;});
    sorted.forEach(function(r){
      if(remaining<=0) return;
      var take=Math.min(remaining,r.maxCurtail);
      r.curtail=take; remaining-=take;
    });
  } else if(algorithm==='sequential'){
    // Merit Order 표시 순서대로 (현재 순위) 소진
    active.forEach(function(r){
      if(remaining<=0) return;
      var take=Math.min(remaining,r.maxCurtail);
      r.curtail=take; remaining-=take;
    });
  } else if(algorithm==='equal'){
    var perRes=totalMW/active.length;
    active.forEach(function(r){
      r.curtail=Math.min(perRes,r.maxCurtail);
      remaining-=r.curtail;
    });
    // 캡 도달 자원이 있으면 잔여를 다른 자원에 재분배
    var attempts=5;
    while(remaining>0.01 && attempts-->0){
      var flexible=active.filter(function(r){return r.curtail<r.maxCurtail-0.001;});
      if(flexible.length===0) break;
      var extra=remaining/flexible.length;
      flexible.forEach(function(r){
        var add=Math.min(extra,r.maxCurtail-r.curtail);
        r.curtail+=add; remaining-=add;
      });
    }
  } else if(algorithm==='proportional'){
    var totalCur=active.reduce(function(s,r){return s+r.curMW;},0);
    if(totalCur>0){
      active.forEach(function(r){
        var wanted=(r.curMW/totalCur)*totalMW;
        r.curtail=Math.min(wanted,r.maxCurtail);
        remaining-=r.curtail;
      });
      var attempts2=5;
      while(remaining>0.01 && attempts2-->0){
        var flexible2=active.filter(function(r){return r.curtail<r.maxCurtail-0.001;});
        if(flexible2.length===0) break;
        var totalCapLeft=flexible2.reduce(function(s,r){return s+r.curMW;},0);
        if(totalCapLeft<=0) break;
        flexible2.forEach(function(r){
          var wanted2=(r.curMW/totalCapLeft)*remaining;
          var add=Math.min(wanted2,r.maxCurtail-r.curtail);
          r.curtail+=add; remaining-=add;
        });
      }
    }
  }

  // 반올림 + 손실 계산 (공식: 감발MW × 한계수익(원/kWh) × 100)
  resources.forEach(function(r){
    r.curtail=Math.round(r.curtail*10)/10;
    r.loss=Math.round(r.curtail*r.margin*100);
  });
}

// 균등 배분 기준 baseline 계산 (제외 자원 무시 — 풀 셋 기준)
function _cgComputeEqualBaseline(totalMW,resources){
  var fullSet=resources.map(function(r){
    return {name:r.name,curMW:r.curMW,margin:r.margin,minPct:r.minPct,excluded:false,curtail:0,loss:0,maxCurtail:0};
  });
  _cgDistribute(fullSet,totalMW,'equal');
  return fullSet.reduce(function(s,r){return s+r.loss;},0);
}

window.cgRunSimulation=function(){
  var mwEl=document.getElementById('cg-sim-mw');
  var totalMW=parseFloat(mwEl?mwEl.value:'0');
  if(!totalMW||totalMW<=0){toast('감발 요구량은 0보다 커야 합니다.','warn');return;}
  var algoEl=document.getElementById('cg-sim-algo');
  var algorithm=algoEl?algoEl.value:'profit';

  // 신규 시뮬 (또는 알고리즘/MW 변경) — 자원 목록 새로 읽기
  var prev=window._cgSimState;
  if(!prev||prev.totalMW!==totalMW||prev.algorithm!==algorithm){
    window._cgSimState={
      resources:_cgReadMeritResources(),
      totalMW:totalMW,
      algorithm:algorithm
    };
  }
  _cgDistribute(window._cgSimState.resources,totalMW,algorithm);
  _cgRenderSimResults();
  toast('시뮬레이션 실행 — '+totalMW+'MW 감발 / '+_cgAlgoLabel(algorithm));
};

window.cgToggleExclude=function(name,checked){
  if(!window._cgSimState) return;
  var r=window._cgSimState.resources.find(function(x){return x.name===name;});
  if(!r) return;
  r.excluded=!checked;
  _cgDistribute(window._cgSimState.resources,window._cgSimState.totalMW,window._cgSimState.algorithm);
  _cgRenderSimResults();
};

function _cgRenderSimResults(){
  var state=window._cgSimState;
  if(!state) return;
  var resources=state.resources;
  var tbody=document.getElementById('cg-sim-tbody');
  if(!tbody) return;

  // 표시 순서: 활성→감발량 desc, 그 다음 제외
  var display=resources.slice().sort(function(a,b){
    if(a.excluded!==b.excluded) return a.excluded?1:-1;
    return b.curtail-a.curtail;
  });

  var totalCurtail=0, totalLoss=0;
  var rowsHtml=display.map(function(r,i){
    if(!r.excluded && r.curtail<=0.01) return '';
    if(!r.excluded){ totalCurtail+=r.curtail; totalLoss+=r.loss; }
    var after=(r.curMW-r.curtail).toFixed(1);
    var grayStyle=r.excluded?'opacity:0.45':'';
    var safeName=r.name.replace(/'/g,"\\'");
    return '<tr style="'+grayStyle+'">'
      +'<td style="text-align:center"><input type="checkbox" '+(r.excluded?'':'checked')+' onchange="cgToggleExclude(\''+safeName+'\',this.checked)" title="제외/포함"></td>'
      +'<td>'+(i+1)+'</td>'
      +'<td>'+r.name+'</td>'
      +'<td class="mono">'+r.curMW.toFixed(1)+'</td>'
      +'<td class="mono" style="color:'+(r.excluded?'var(--semantic-label-alt)':'#d32')+'">'+(r.excluded?'제외':'-'+r.curtail.toFixed(1))+'</td>'
      +'<td class="mono">'+(r.excluded?r.curMW.toFixed(1):after)+'</td>'
      +'<td class="mono" style="color:'+(r.excluded?'var(--semantic-label-alt)':'#d32')+'">'+(r.excluded?'—':'₩'+Math.round(r.loss/1000)+'k')+'</td>'
      +'</tr>';
  }).join('');

  rowsHtml+='<tr data-no-sort="1" style="background:#f0f6ff;font-weight:700">'
    +'<td colspan="4" style="text-align:right">합계</td>'
    +'<td class="mono" style="color:#d32">-'+totalCurtail.toFixed(1)+' MW</td>'
    +'<td>—</td>'
    +'<td class="mono" style="color:#d32">₩'+Math.round(totalLoss/1000)+'k</td>'
    +'</tr>';

  tbody.innerHTML=rowsHtml;

  // 상태 + 요약
  var statusEl=document.getElementById('cg-sim-status');
  if(statusEl) statusEl.textContent='실행 완료 · '+_cgAlgoLabel(state.algorithm)+' · '+state.totalMW+'MW';

  var summaryEl=document.getElementById('cg-sim-summary');
  if(!summaryEl) return;

  var equalLoss=_cgComputeEqualBaseline(state.totalMW,resources);
  var savings=equalLoss-totalLoss;
  var savingsPct=equalLoss>0?(savings/equalLoss*100):0;

  var html='';
  if(state.algorithm==='equal'){
    html='<b style="color:var(--semantic-label-alt)">균등 배분 기준 알고리즘:</b> 손실 <b class="mono">₩'+Math.round(totalLoss/1000)+'k</b> · 다른 알고리즘과의 절감 비교 기준입니다.';
  } else if(savings>0){
    html='<b style="color:#0a7">수익 보호 효과:</b> 균등 배분 대비 <b class="mono" style="color:#0a7">+₩'+Math.round(savings/1000)+'k</b> 손실 감소 ('+savingsPct.toFixed(1)+'% 절감)';
  } else if(savings<-1){
    html='<b style="color:#d32">⚠️ 균등 배분보다 손실이 큽니다 ('+Math.round(Math.abs(savings)/1000)+'k 증가) — 알고리즘 선택 재검토 필요</b>';
  } else {
    html='<b style="color:var(--semantic-label-alt)">균등 배분과 동등 수준 손실</b>';
  }
  // 감발 요구량 부족 경고
  if(totalCurtail<state.totalMW-0.5){
    html+='<br><b style="color:#d32">⚠️ 감발 요구량 부족: 요구 '+state.totalMW.toFixed(1)+'MW / 가용 '+totalCurtail.toFixed(1)+'MW — Override 해제 또는 정책 조정 필요</b>';
  }
  // 제외된 자원 표시
  var excludedNames=resources.filter(function(r){return r.excluded;}).map(function(r){return r.name;});
  if(excludedNames.length>0){
    html+='<br><span style="color:var(--semantic-label-alt)">Override 제외: '+excludedNames.join(', ')+'</span>';
  }
  // 스타일 변경 (수익 효과는 녹색 배경, 경고는 연빨강)
  if(state.algorithm==='equal'){
    summaryEl.style.background='var(--semantic-background-2)';
    summaryEl.style.borderLeftColor='var(--semantic-line-strong)';
  } else if(savings>0){
    summaryEl.style.background='#e8f4ed';
    summaryEl.style.borderLeftColor='#0a7';
  } else {
    summaryEl.style.background='var(--semantic-tag-bg-red)';
    summaryEl.style.borderLeftColor='var(--semantic-negative-normal)';
  }
  summaryEl.innerHTML=html;
}

// 총 감발 가용 KPI 갱신 (Σ 자원 현재출력 × (1 - 제어하한))
window.cgUpdateCapKPI=function(){
  var resources=_cgReadMeritResources();
  var totalCap=resources.reduce(function(s,r){
    var avail=r.curMW*(100-r.minPct)/100;
    return s+(avail>0?avail:0);
  },0);
  var elCap=document.getElementById('cg-kpi-cap');
  if(elCap) elCap.innerHTML=totalCap.toFixed(1)+'<span class="ku">MW</span>';
  var elAllowed=document.getElementById('cg-kpi-allowed');
  if(elAllowed){
    var total=document.querySelectorAll('#cg-merit-tbody tr').length;
    var allowed=document.querySelectorAll('#cg-merit-tbody tr[data-allow="ok"]').length;
    elAllowed.innerHTML=allowed+'<span class="ku">/'+total+'</span>';
  }
};

// 페이지 진입 시 자동 1회 실행 (운영자에게 즉시 시각적 피드백)
window['I_ctl-cfg']=function(){
  if(typeof window.cgFilterApply==='function') window.cgFilterApply();
  if(typeof window.cgUpdateCapKPI==='function') window.cgUpdateCapKPI();
  setTimeout(function(){ try{ window.cgRunSimulation(); }catch(e){} },50);
};

