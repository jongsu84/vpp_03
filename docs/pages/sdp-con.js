// AUTO-GENERATED FROM index.html — page module: sdp-con
window.P = window.P || {};
/* ===== 준중앙급전: 계약정보 ===== */
/* ===== 준중앙급전: 계약정보 (전용 마스터 데이터) ===== */
window.P['sdp-con']=()=>`
<!-- 최상위 필터 바 (VPP 그룹 · 자원 유형 · 계약 상태 · 원격 제어) -->
<div class="card fbar" style="margin-bottom:12px">
  <div class="fbar-row">
    <div class="fbar-item">
      <span class="fbar-lbl">VPP 그룹</span>
      <select class="fbar-sel" id="con-f-vpp" onchange="conFilterApply()">
        <option>전체</option><option>VPP-전남권</option><option>VPP-제주권</option><option>VPP-경북권</option>
      </select>
    </div>
    <div class="fbar-item">
      <span class="fbar-lbl">자원 유형</span>
      <select class="fbar-sel" id="con-f-type" onchange="conFilterApply()">
        <option value="all">전체</option><option>태양광</option><option>풍력</option><option>ESS</option><option>바이오</option><option>V2G</option>
      </select>
    </div>
    <div class="fbar-item">
      <span class="fbar-lbl">계약 상태</span>
      <select class="fbar-sel" id="con-f-state" onchange="conFilterApply()">
        <option>전체</option><option>활성</option><option>등록 대기</option><option>만료 임박</option><option>만료</option>
      </select>
    </div>
    <div class="fbar-item">
      <span class="fbar-lbl">원격 제어</span>
      <select class="fbar-sel" id="con-f-remote" onchange="conFilterApply()">
        <option>전체</option><option>동의</option><option>미등록</option>
      </select>
    </div>
  </div>
</div>

<!-- 필터 경고 배너 (기본 숨김) -->
<div id="con-warn"></div>

<!-- KPI 5종 -->
<div class="g5">
  <div class="card acc"><div class="ct">계약 자원수 ${window.tip('계약 자원수','준중앙급전 계약된 자원 수','상태 = 계약 인 자원 (활성 + 정비 포함)','정비 자원도 계약은 유지 — 정비 종료 시 자동 활성 복귀')}</div><div class="kv">9<span class="ku">개소</span></div><div class="kd neu">활성 8 · 정비 1</div></div>
  <div class="card"><div class="ct">총 계약 용량 ${window.tip('총 계약 용량','KPX에 등록된 계약 용량 합계','Σ(자원별 계약 MW) [MW]','실제 입찰 가능 용량 — 시운전·차단 자원 제외')}</div><div class="kv">11.45<span class="ku">MW</span></div><div class="kd up">KPX 등록 완료</div></div>
  <div class="card"><div class="ct">평균 가중치 ${window.tip('평균 가중치','자원별 정산 분배 가중치의 평균','Σ(자원별 가중치) ÷ 자원수 [%]','가중치는 계약 시 결정 — 자원 규모·입지·응답 속도에 따라 차등')}</div><div class="kv">11.1<span class="ku">%</span></div><div class="kd neu">자원당 · 최대 25.4%</div></div>
  <div class="card"><div class="ct">만료 임박 (90일) ${window.tip('만료 임박 계약','90일 이내 만료 예정인 계약 수','계약 종료일 - 오늘 ≤ 90일','60일 전 갱신 협상 시작 권장 — 30일 전 KPX에 갱신 의사 통보 필수')}</div><div class="kv" style="color:var(--palette-yellow-40)">1<span class="ku">건</span></div><div class="kd neu">금능1호 · 2026-07-15</div></div>
  <div class="card"><div class="ct">연 예상 수익 ${window.tip('연 예상 수익','계약 자원의 연간 정산금 추정','Σ(자원별 연 예상 정산금) [백만원]','이행률 99% 가정 — 실제 이행률에 따라 ±10% 변동')}</div><div class="kv">1,540<span class="ku">백만원</span></div><div class="kd up">이행률 99% 가정</div></div>
</div>

<!-- 참여 자원 마스터 테이블 -->
<div class="card mb">
  <div class="sh">
    <div class="st">참여 자원 마스터 <span id="con-res-cnt" style="font-size:11px;font-weight:400;color:var(--semantic-label-alt);margin-left:8px">9개소</span></div>
    <div style="display:flex;gap:6px">
      <button class="cb n sm" onclick="toast('자원 추가')">+ 자원 추가</button>
      <button class="cb n sm" onclick="toast('가중치 재계산')">가중치 재계산</button>
      ${window.csvBtn('con-res-tbody','contract_resources','준중앙급전 계약 자원')}
    </div>
  </div>
  <div style="overflow-x:auto"><table class="tbl">
    <thead><tr><th>순번</th><th>자원명</th><th>유형</th><th>VPP 그룹</th><th>개별 계약번호</th><th>계약 용량</th><th>가중치</th><th>응답 속도</th><th>계약 기간</th><th>원격 제어</th><th>상태</th><th>관리</th></tr></thead>
    <tbody id="con-res-tbody">
    ${[
      [1,'광양항태양광 01단계','태양광','VPP-전남권','CON-SUB-2026-01',2293,20.0,'3.5 MW/min','2026.01~12','동의','활성'],
      [2,'광양항태양광 04단계','태양광','VPP-전남권','CON-SUB-2026-02',2199,19.2,'3.5 MW/min','2026.01~12','동의','활성'],
      [3,'해맞이 태양광','태양광','VPP-전남권','CON-SUB-2026-03',996,8.7,'2.0 MW/min','2026.01~12','동의','활성'],
      [4,'온누리 태양광','태양광','VPP-전남권','CON-SUB-2026-04',996,8.7,'2.0 MW/min','2026.01~12','동의','활성'],
      [5,'금능1호 태양광','태양광','VPP-제주권','CON-SUB-2026-05',980,8.6,'2.0 MW/min','2025.07~2026.07','동의','만료 임박'],
      [6,'김주풍력 01단계','풍력','VPP-경북권','CON-SUB-2026-06',4000,25.4,'5.0 MW/min','2026.01~12','동의','활성'],
      [7,'김주풍력 02단계','풍력','VPP-경북권','CON-SUB-2026-07',10000,0,'5.0 MW/min','준비 단계','미등록','등록 대기'],
      [8,'금능1호 ESS','ESS','VPP-제주권','CON-SUB-2026-08',2000,9.4,'양방향 10 MW/min','2026.01~12','동의','활성'],
      [9,'제주 ESS허브','ESS','VPP-제주권','CON-SUB-2026-09',5000,0,'검증 중','준비 단계','동의','등록 대기'],
    ].map(r=>{
      const typeStyle=r[2]==='태양광'?'':r[2]==='풍력'?'background:var(--semantic-tag-bg-blue);color:var(--semantic-tag-label-blue)':r[2]==='ESS'?'background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow)':'';
      const state=r[10];
      const statusCls=state==='활성'?'ok':state==='만료 임박'?'warn':state==='만료'?'err':'off';
      const periodColor=state==='만료 임박'?'var(--palette-yellow-40)':'';
      return `<tr data-type="${r[2]}" data-vpp="${r[3]}" data-state="${state}" data-remote="${r[9]}"><td class="mono">${r[0]}</td><td><b>${r[1]}</b></td><td><span class="badge ${r[2]==='태양광'?'inf':''}" ${typeStyle?`style="${typeStyle}"`:''}>${r[2]}</span></td><td style="font-size:12px">${r[3]}</td><td class="mono" style="font-size:12px">${r[4]}</td><td class="mono">${(r[5]/1000).toFixed(2)} MW<br><span style="font-size:10px;color:var(--semantic-label-alt)">${r[5].toLocaleString()} kW</span></td><td class="mono" style="font-weight:600;color:var(--semantic-brand-primary)">${r[6].toFixed(1)}%</td><td class="mono" style="font-size:12px">${r[7]}</td><td style="font-size:12px;color:${periodColor}">${r[8]}</td><td><span class="badge ${r[9]==='동의'?'ok':'off'}">${r[9]}</span></td><td><span class="badge ${statusCls}">${state}</span></td><td><button class="cb n sm" onclick="toast('${r[1]} 편집')">편집</button></td></tr>`;
    }).join('')}
    </tbody>
  </table></div>
  <div style="font-size:11px;color:var(--semantic-label-alt);margin-top:10px;line-height:18px">
    ※ 가중치 합계 <b style="color:var(--semantic-brand-primary)">100.0%</b> (활성 자원 7 기준) · 미등록 자원 2개소(김주풍력 02단계 · 제주 ESS허브)는 등록 대기 중
  </div>
</div>

<!-- 계약 조건 상세 + 인센티브 구조 -->
<div class="g2">
  <div class="card mb"><div class="sh"><div class="st">계약 조건 상세</div><span class="kpi-pill" style="font-size:11px">KPX 규정 준수</span></div>
    <div class="mr"><div class="ml">계약 번호</div><div class="mv mono" style="font-size:12px">VPP-KPX-2026-0041</div></div>
    <div class="mr"><div class="ml">계약 주체</div><div class="mv" style="font-size:12px">EWP · 60Hertz</div></div>
    <div class="mr"><div class="ml">KPX 등록번호</div><div class="mv mono" style="font-size:12px">KPX-RSC-EWP-2026-A041</div></div>
    <div class="mr"><div class="ml">허용 오차 범위</div><div class="mv mono" style="color:var(--semantic-positive-normal)">±5.0 %</div></div>
    <div class="mr"><div class="ml">최소 응답 속도</div><div class="mv mono">5.0 MW/min (집합 기준)</div></div>
    <div class="mr"><div class="ml">지시 이행 기준</div><div class="mv mono" style="font-size:12px">수신 후 60초 이내 95% 달성</div></div>
    <div class="mr"><div class="ml">원격 제어 동의</div><div class="mv"><span class="badge ok">7/9 동의 · 2 등록 대기</span></div></div>
    <div class="mr" style="border:none"><div class="ml">위약금 조항</div><div class="mv mono" style="font-size:12px">미이행률 10% 초과 시 감액</div></div>
  </div>
  <div class="card mb"><div class="sh"><div class="st">인센티브 구조 (마스터 단가)</div><button class="cb n sm" onclick="toast('단가 편집 (승인 필요)')">단가 편집</button></div>
    <div style="padding:10px 0;border-bottom:1px solid var(--semantic-line-alt);margin-bottom:8px">
      <div style="font-size:11px;color:var(--semantic-label-alt);margin-bottom:6px;font-weight:600">보상 단가</div>
      <div class="mr" style="padding:6px 0;border:0"><div class="ml">이행 보상 단가 (SMP 연계)</div><div class="mv mono" style="color:var(--semantic-positive-normal);font-weight:600">+4.20 원/kWh</div></div>
      <div class="mr" style="padding:6px 0;border:0"><div class="ml">대기 보상 단가</div><div class="mv mono" style="color:var(--semantic-positive-normal)">+1.80 원/kWh</div></div>
      <div class="mr" style="padding:6px 0;border:0"><div class="ml">응답 속도 인센티브</div><div class="mv mono" style="color:var(--semantic-positive-normal)">+0.30 원/kWh</div></div>
      <div class="mr" style="padding:6px 0;border:0"><div class="ml">용량정산금 (CP) 단가</div><div class="mv mono" style="color:var(--semantic-positive-normal)">+6,500 원/kW·월</div></div>
    </div>
    <div style="padding:10px 0">
      <div style="font-size:11px;color:var(--semantic-label-alt);margin-bottom:6px;font-weight:600">패널티</div>
      <div class="mr" style="padding:6px 0;border:0"><div class="ml">허용범위 초과 시 (단회)</div><div class="mv mono" style="color:var(--semantic-negative-normal)">−2.50 원/kWh</div></div>
      <div class="mr" style="padding:6px 0;border:0"><div class="ml">월 미이행률 10% 초과</div><div class="mv mono" style="color:var(--semantic-negative-normal)">월 보상금 20% 감액</div></div>
      <div class="mr" style="padding:6px 0;border:0;border:none"><div class="ml">통신 장애 유발</div><div class="mv mono" style="color:var(--semantic-negative-normal)">−500천원/건 (3회 초과)</div></div>
    </div>
  </div>
</div>

<!-- 계약 기간 관리 + 변경 이력 -->
<div class="g2">
  <div class="card mb"><div class="sh"><div class="st">계약 기간 관리</div><button class="cb n sm" onclick="toast('갱신 알림 설정')">갱신 알림</button></div>
    <!-- 타임라인 시각화 -->
    <div style="padding:12px 0;border-bottom:1px solid var(--semantic-line-alt);margin-bottom:10px">
      <div style="display:flex;align-items:center;gap:8px;font-size:11px;margin-bottom:8px">
        <span style="color:var(--semantic-label-alt)">2026-01-01</span>
        <div style="flex:1;height:6px;background:var(--semantic-background-3);border-radius:3px;position:relative">
          <div style="width:31%;height:100%;background:var(--semantic-brand-primary);border-radius:3px"></div>
          <div style="position:absolute;left:31%;top:-3px;width:12px;height:12px;border-radius:50%;background:var(--semantic-brand-primary);border:2px solid var(--semantic-background-1);transform:translateX(-50%)"></div>
        </div>
        <span style="color:var(--semantic-label-alt)">2026-12-31</span>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:11px">
        <span>계약 시작</span>
        <span style="color:var(--semantic-brand-primary);font-weight:600">오늘 · 진행 31%</span>
        <span>만료 · 252일 후</span>
      </div>
    </div>
    <div class="mr"><div class="ml">자동 갱신 설정</div><div class="mv"><span class="badge off">수동 갱신</span></div></div>
    <div class="mr"><div class="ml">갱신 협의 개시 권장일</div><div class="mv mono">2026-10-01 (60일 전)</div></div>
    <div class="mr"><div class="ml">다음 갱신 예정</div><div class="mv mono">2027.01.01 ~ 2027.12.31 (협의 중)</div></div>
    <div class="mr" style="border:none"><div class="ml">만료 임박 자원</div><div class="mv"><span class="badge warn">금능1호 · 2026-07-15</span></div></div>
  </div>
  <div class="card mb"><div class="sh"><div class="st">계약 변경 이력 (감사 로그)</div><span class="kpi-pill" style="font-size:11px">SHA-256 무결성</span></div>
    <table class="tbl"><thead><tr><th>일자</th><th>버전</th><th>변경 항목</th><th>변경자</th><th>승인</th></tr></thead><tbody>
      <tr><td class="mono" style="font-size:12px">2026-04-10</td><td class="mono">v2.1</td><td style="font-size:12px">김주풍력 02단계 등록 대기 추가</td><td>이제어</td><td><span class="badge ok">완료</span></td></tr>
      <tr><td class="mono" style="font-size:12px">2026-03-22</td><td class="mono">v2.0</td><td style="font-size:12px">인센티브 단가 +0.30원 상향 (응답속도)</td><td>김운영</td><td><span class="badge ok">완료</span></td></tr>
      <tr><td class="mono" style="font-size:12px">2026-02-15</td><td class="mono">v1.2</td><td style="font-size:12px">해맞이 태양광 원격제어 동의 등록</td><td>이제어</td><td><span class="badge ok">완료</span></td></tr>
      <tr><td class="mono" style="font-size:12px">2026-01-08</td><td class="mono">v1.1</td><td style="font-size:12px">위약금 조항 추가 (10% 초과 시)</td><td>김운영</td><td><span class="badge ok">완료</span></td></tr>
      <tr><td class="mono" style="font-size:12px">2026-01-01</td><td class="mono">v1.0</td><td style="font-size:12px">초기 계약 체결 (EWP · 60Hertz)</td><td>김운영</td><td><span class="badge ok">완료</span></td></tr>
    </tbody></table>
  </div>
</div>

<!-- 하단 안내 -->
<div style="font-size:12px;color:var(--semantic-label-alt);margin-top:10px;padding:12px 14px;background:var(--semantic-background-2);border-radius:6px;line-height:20px">
  ℹ️ 본 계약 마스터는 준중앙급전 전용이며, 일반 전력입찰·정산 설정과는 <b>분리 관리</b>됩니다. 변경 시 KPX 감사 대응용으로 <b>SHA-256 해시 무결성 로그가 5년간 영구 보관</b>됩니다.<br>
  ⚠️ <b>자동 갱신 미설정</b> — 만료 60일 전(2026-10-01) 갱신 협의 개시 권장. 갱신 알림 버튼으로 자동 리마인더 설정 가능.
</div>`;
// 계약정보 자원 마스터 필터
window.conFilterApply=function(){
  const type=document.getElementById('con-f-type')?.value||'all';
  const vpp=document.getElementById('con-f-vpp')?.value||'전체';
  const state=document.getElementById('con-f-state')?.value||'전체';
  const remote=document.getElementById('con-f-remote')?.value||'전체';
  const rows=document.querySelectorAll('#con-res-tbody tr');
  let visible=0;
  rows.forEach(tr=>{
    let show=true;
    if(type!=='all' && tr.dataset.type!==type)show=false;
    if(vpp!=='전체' && tr.dataset.vpp!==vpp)show=false;
    if(state!=='전체' && tr.dataset.state!==state)show=false;
    if(remote!=='전체' && tr.dataset.remote!==remote)show=false;
    tr.style.display=show?'':'none';
    if(show)visible++;
  });
  const cnt=document.getElementById('con-res-cnt');
  if(cnt)cnt.textContent=visible+'개소';
  // 필터 적용 시 만료 임박·등록 대기 자원이 숨겨졌으면 경고 배너
  const warnEl=document.getElementById('con-warn');
  if(warnEl){
    const allCritical=Array.from(rows).filter(tr=>tr.dataset.state==='만료 임박'||tr.dataset.state==='등록 대기').length;
    const visibleCritical=Array.from(rows).filter(tr=>tr.style.display!=='none' && (tr.dataset.state==='만료 임박'||tr.dataset.state==='등록 대기')).length;
    const hidden=allCritical-visibleCritical;
    if(hidden>0){
      warnEl.style.display='block';
      warnEl.innerHTML=`<div style="border-left:3px solid var(--palette-yellow-40);padding:10px 14px;background:var(--semantic-tag-bg-yellow);font-size:12px;margin-bottom:10px;border-radius:4px;display:flex;align-items:center;gap:10px">
        <span>⚠️ <b>필터 범위 외 주의 자원 ${hidden}건</b> (만료 임박·등록 대기) — 전체 보기 권장</span>
        <button class="cb n sm" style="margin-left:auto" onclick="conReset()">전체 보기</button>
      </div>`;
    } else {
      warnEl.style.display='none';
      warnEl.innerHTML='';
    }
  }
};
window.conReset=function(){
  ['con-f-type','con-f-vpp','con-f-state','con-f-remote'].forEach(id=>{
    const el=document.getElementById(id);
    if(el)el.value=(id==='con-f-type')?'all':'전체';
  });
  window.conFilterApply();
};

