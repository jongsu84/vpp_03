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
  <div class="card acc"><div class="ct">계약 자원수 ${window.tip('계약 자원수','준중앙급전 계약된 자원 수','상태 = 계약 인 자원 (활성 + 정비 포함)','정비 자원도 계약은 유지 — 정비 종료 시 자동 활성 복귀')}</div><div class="kv" id="con-kpi-cnt">9<span class="ku">개소</span></div><div class="kd neu" id="con-kpi-cnt-sub">활성 8 · 정비 1</div></div>
  <div class="card"><div class="ct">총 계약 용량 ${window.tip('총 계약 용량','KPX에 등록된 계약 용량 합계','Σ(자원별 계약 MW) [MW]','실제 입찰 가능 용량 — 시운전·차단 자원 제외')}</div><div class="kv" id="con-kpi-cap">11.45<span class="ku">MW</span></div><div class="kd up">KPX 등록 완료</div></div>
  <div class="card"><div class="ct">평균 가중치 ${window.tip('평균 가중치','자원별 정산 분배 가중치의 평균','Σ(자원별 가중치) ÷ 자원수 [%]','가중치는 계약 시 결정 — 자원 규모·입지·응답 속도에 따라 차등')}</div><div class="kv" id="con-kpi-wavg">11.1<span class="ku">%</span></div><div class="kd neu" id="con-kpi-wavg-sub">자원당 · 최대 25.4%</div></div>
  <div class="card"><div class="ct">만료 임박 (90일) ${window.tip('만료 임박 계약','90일 이내 만료 예정인 계약 수','계약 종료일 - 오늘 ≤ 90일','60일 전 갱신 협상 시작 권장 — 30일 전 KPX에 갱신 의사 통보 필수')}</div><div class="kv" id="con-kpi-exp" style="color:var(--palette-yellow-40)">1<span class="ku">건</span></div><div class="kd neu">금능1호 · 2026-07-15</div></div>
  <div class="card"><div class="ct">연 예상 수익 ${window.tip('연 예상 수익','계약 자원의 연간 정산금 추정','Σ(자원별 연 예상 정산금) [백만원]','이행률 99% 가정 — 실제 이행률에 따라 ±10% 변동')}</div><div class="kv">1,540<span class="ku">백만원</span></div><div class="kd up">이행률 99% 가정</div></div>
</div>

<!-- 참여 자원 마스터 테이블 -->
<div class="card mb">
  <div class="sh">
    <div class="st">참여 자원 마스터 <span id="con-res-cnt" style="font-size:11px;font-weight:400;color:var(--semantic-label-alt);margin-left:8px">9개소</span></div>
    <div style="display:flex;gap:6px">
      <button class="cb n sm" onclick="conPrepareAdd();openModal('modal-con-add')">+ 자원 추가</button>
      <button class="cb n sm" onclick="conRecalcWeights()">가중치 재계산</button>
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
      return `<tr data-type="${r[2]}" data-vpp="${r[3]}" data-state="${state}" data-remote="${r[9]}"><td class="mono">${r[0]}</td><td><b>${r[1]}</b></td><td><span class="badge ${r[2]==='태양광'?'inf':''}" ${typeStyle?`style="${typeStyle}"`:''}>${r[2]}</span></td><td style="font-size:12px">${r[3]}</td><td class="mono" style="font-size:12px">${r[4]}</td><td class="mono">${(r[5]/1000).toFixed(2)} MW<br><span style="font-size:10px;color:var(--semantic-label-alt)">${r[5].toLocaleString()} kW</span></td><td class="mono" style="font-weight:600;color:var(--semantic-brand-primary)">${r[6].toFixed(1)}%</td><td class="mono" style="font-size:12px">${r[7]}</td><td style="font-size:12px;color:${periodColor}">${r[8]}</td><td><span class="badge ${r[9]==='동의'?'ok':'off'}">${r[9]}</span></td><td><span class="badge ${statusCls}">${state}</span></td><td><button class="cb n sm" onclick="openConEdit(this)">편집</button></td></tr>`;
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
  <div class="card mb"><div class="sh"><div class="st">인센티브 구조 (마스터 단가)</div><button class="cb n sm" onclick="openPriceEdit()">단가 편집</button></div>
    <div style="padding:10px 0;border-bottom:1px solid var(--semantic-line-alt);margin-bottom:8px">
      <div style="font-size:11px;color:var(--semantic-label-alt);margin-bottom:6px;font-weight:600">보상 단가</div>
      <div class="mr" style="padding:6px 0;border:0"><div class="ml">이행 보상 단가 (SMP 연계)</div><div class="mv mono" style="color:var(--semantic-positive-normal);font-weight:600" id="con-price-perf">+4.20 원/kWh</div></div>
      <div class="mr" style="padding:6px 0;border:0"><div class="ml">대기 보상 단가</div><div class="mv mono" style="color:var(--semantic-positive-normal)" id="con-price-stby">+1.80 원/kWh</div></div>
      <div class="mr" style="padding:6px 0;border:0"><div class="ml">응답 속도 인센티브</div><div class="mv mono" style="color:var(--semantic-positive-normal)" id="con-price-resp">+0.30 원/kWh</div></div>
      <div class="mr" style="padding:6px 0;border:0"><div class="ml">용량정산금 (CP) 단가</div><div class="mv mono" style="color:var(--semantic-positive-normal)" id="con-price-cap">+6,500 원/kW·월</div></div>
    </div>
    <div style="padding:10px 0">
      <div style="font-size:11px;color:var(--semantic-label-alt);margin-bottom:6px;font-weight:600">패널티</div>
      <div class="mr" style="padding:6px 0;border:0"><div class="ml">허용범위 초과 시 (단회)</div><div class="mv mono" style="color:var(--semantic-negative-normal)" id="con-price-pen-over">−2.50 원/kWh</div></div>
      <div class="mr" style="padding:6px 0;border:0"><div class="ml">월 미이행률 10% 초과</div><div class="mv mono" style="color:var(--semantic-negative-normal)" id="con-price-pen-noncomp">월 보상금 20% 감액</div></div>
      <div class="mr" style="padding:6px 0;border:0;border:none"><div class="ml">통신 장애 유발</div><div class="mv mono" style="color:var(--semantic-negative-normal)" id="con-price-pen-comm">−500천원/건 (3회 초과)</div></div>
    </div>
  </div>
</div>

<!-- 계약 기간 관리 + 변경 이력 -->
<div class="g2">
  <div class="card mb"><div class="sh"><div class="st">계약 기간 관리</div><button class="cb n sm" onclick="openRenewalEdit()">갱신 알림</button></div>
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
    <div class="mr"><div class="ml">자동 갱신 설정</div><div class="mv" id="con-renew-mv"><span class="badge off">수동 갱신</span></div></div>
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
</div>

<!-- 자원 편집 모달 -->
<div class="modal-backdrop" id="modal-con-edit" style="display:none" onclick="closeModalBg(event,'modal-con-edit')">
  <div class="modal">
    <div class="modal-hdr">
      <span class="modal-title" id="con-edit-title">계약 자원 편집</span>
      <button class="modal-close" onclick="closeModal('modal-con-edit')">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-section">계약 마스터 (식별자 잠금)</div>
      <div class="form-row">
        <div class="form-item"><label>자원명</label><input class="inp" id="conE-name" disabled style="background:var(--semantic-background-2)"></div>
        <div class="form-item"><label>개별 계약번호</label><input class="inp" id="conE-contract" disabled style="background:var(--semantic-background-2)"></div>
      </div>
      <div class="form-row">
        <div class="form-item"><label>유형 *</label>
          <select class="sel" id="conE-type"><option>태양광</option><option>풍력</option><option>ESS</option><option>바이오</option><option>V2G</option></select>
        </div>
        <div class="form-item"><label>VPP 그룹 *</label>
          <select class="sel" id="conE-vpp"><option>VPP-전남권</option><option>VPP-제주권</option><option>VPP-경북권</option></select>
        </div>
      </div>
      <hr class="form-divider">
      <div class="form-section">계약 조건</div>
      <div class="form-row">
        <div class="form-item"><label>계약 용량 (kW) *</label><input class="inp" type="number" min="1" id="conE-cap"></div>
        <div class="form-item"><label>응답 속도 *</label><input class="inp" id="conE-resp"></div>
      </div>
      <div class="form-row">
        <div class="form-item"><label>계약 기간</label><input class="inp" id="conE-period"></div>
        <div class="form-item"></div>
      </div>
      <hr class="form-divider">
      <div class="form-section">운영 정보</div>
      <div class="form-row">
        <div class="form-item"><label>원격 제어</label>
          <select class="sel" id="conE-remote"><option>동의</option><option>미등록</option></select>
        </div>
        <div class="form-item"><label>상태</label>
          <select class="sel" id="conE-state"><option>활성</option><option>등록 대기</option><option>만료 임박</option><option>만료</option></select>
        </div>
      </div>
      <div style="padding:10px 12px;background:var(--semantic-background-2);border-radius:6px;font-size:11px;color:var(--semantic-label-alt);line-height:18px;margin-top:10px">
        ℹ 용량 변경 시 [가중치 재계산]을 실행해야 합계 100%가 유지됩니다. 자원명·계약번호는 KPX 등록 식별자로 변경 불가합니다.
      </div>
    </div>
    <div class="modal-footer">
      <button class="cb d" style="margin-right:auto;font-size:10px" onclick="deleteCon()">계약 자원 삭제</button>
      <button class="cb n" onclick="closeModal('modal-con-edit')">취소</button>
      <button class="cb p" onclick="updateCon()">저장</button>
    </div>
  </div>
</div>

<!-- 단가 편집 모달 -->
<div class="modal-backdrop" id="modal-con-price" style="display:none" onclick="closeModalBg(event,'modal-con-price')">
  <div class="modal">
    <div class="modal-hdr">
      <span class="modal-title">인센티브 단가 편집 <span style="font-size:11px;color:var(--semantic-label-alt);margin-left:6px">승인 필요</span></span>
      <button class="modal-close" onclick="closeModal('modal-con-price')">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-section">보상 단가 (양수)</div>
      <div class="form-row">
        <div class="form-item"><label>이행 보상 단가 (원/kWh)</label><input class="inp" type="number" step="0.01" id="conP-perf"></div>
        <div class="form-item"><label>대기 보상 단가 (원/kWh)</label><input class="inp" type="number" step="0.01" id="conP-stby"></div>
      </div>
      <div class="form-row">
        <div class="form-item"><label>응답 속도 인센티브 (원/kWh)</label><input class="inp" type="number" step="0.01" id="conP-resp"></div>
        <div class="form-item"><label>용량정산금 CP (원/kW·월)</label><input class="inp" type="number" step="1" id="conP-cap"></div>
      </div>
      <hr class="form-divider">
      <div class="form-section">패널티 (양수로 입력 — 표시는 음수/감액)</div>
      <div class="form-row">
        <div class="form-item"><label>허용범위 초과 (원/kWh)</label><input class="inp" type="number" step="0.01" id="conP-penOver"></div>
        <div class="form-item"><label>월 미이행률 감액률 (%)</label><input class="inp" type="number" step="1" min="0" max="100" id="conP-penNon"></div>
      </div>
      <div class="form-row">
        <div class="form-item"><label>통신 장애 (천원/건)</label><input class="inp" type="number" step="1" id="conP-penComm"></div>
        <div class="form-item"></div>
      </div>
      <div style="padding:10px 12px;background:var(--semantic-tag-bg-yellow);border-radius:6px;font-size:11px;color:var(--semantic-tag-label-yellow);line-height:18px;margin-top:10px">
        ⚠ 단가 변경은 KPX 정산에 직접 반영됩니다. 감사 로그(SHA-256)에 변경자·일시가 기록되며, 5년간 영구 보관됩니다.
      </div>
    </div>
    <div class="modal-footer">
      <button class="cb n" onclick="closeModal('modal-con-price')">취소</button>
      <button class="cb p" onclick="savePrice()">저장 (승인 요청)</button>
    </div>
  </div>
</div>

<!-- 갱신 알림 설정 모달 -->
<div class="modal-backdrop" id="modal-con-renewal" style="display:none" onclick="closeModalBg(event,'modal-con-renewal')">
  <div class="modal">
    <div class="modal-hdr">
      <span class="modal-title">갱신 알림 설정</span>
      <button class="modal-close" onclick="closeModal('modal-con-renewal')">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-section">자동 갱신</div>
      <div class="form-row">
        <div class="form-item"><label>자동 갱신 모드</label>
          <select class="sel" id="conR-auto"><option>수동 갱신</option><option>자동 갱신 ON</option></select>
        </div>
        <div class="form-item"><label>갱신 협상 개시 (만료 N일 전)</label>
          <select class="sel" id="conR-leadDays"><option>30</option><option selected>60</option><option>90</option></select>
        </div>
      </div>
      <hr class="form-divider">
      <div class="form-section">알림 시점 (D-Day, 다중 선택)</div>
      <div class="form-row full">
        <div class="form-item">
          <div style="display:flex;gap:14px;flex-wrap:wrap;padding:6px 0">
            <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer"><input type="checkbox" id="conR-d90" checked> 90일 전</label>
            <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer"><input type="checkbox" id="conR-d60" checked> 60일 전</label>
            <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer"><input type="checkbox" id="conR-d30" checked> 30일 전</label>
            <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer"><input type="checkbox" id="conR-d7"> 7일 전</label>
            <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer"><input type="checkbox" id="conR-d1"> 1일 전 (긴급)</label>
          </div>
        </div>
      </div>
      <hr class="form-divider">
      <div class="form-section">알림 채널</div>
      <div class="form-row full">
        <div class="form-item">
          <div style="display:flex;gap:14px;flex-wrap:wrap;padding:6px 0">
            <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer"><input type="checkbox" id="conR-mail" checked> 이메일</label>
            <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer"><input type="checkbox" id="conR-sms"> SMS</label>
            <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer"><input type="checkbox" id="conR-sys" checked> 시스템 알림</label>
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-item"><label>수신자 (이메일, 콤마 구분)</label><input class="inp" placeholder="ops@60hz.kr, lee@ewp.co.kr" id="conR-to" value="ops@60hz.kr"></div>
        <div class="form-item"></div>
      </div>
      <div style="padding:10px 12px;background:var(--semantic-background-2);border-radius:6px;font-size:11px;color:var(--semantic-label-alt);line-height:18px;margin-top:10px">
        ℹ 자동 갱신 ON 선택 시 만료일 24시간 전 KPX에 자동 갱신 신청됩니다. 단가·조건 변경이 필요한 경우 협상 개시일에 운영자가 수동 검토 후 승인합니다.
      </div>
    </div>
    <div class="modal-footer">
      <button class="cb n" onclick="closeModal('modal-con-renewal')">취소</button>
      <button class="cb p" onclick="saveRenewal()">저장</button>
    </div>
  </div>
</div>

<!-- 자원 추가 모달 -->
<div class="modal-backdrop" id="modal-con-add" style="display:none" onclick="closeModalBg(event,'modal-con-add')">
  <div class="modal">
    <div class="modal-hdr">
      <span class="modal-title">계약 자원 추가</span>
      <button class="modal-close" onclick="closeModal('modal-con-add')">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-section">계약 마스터</div>
      <div class="form-row">
        <div class="form-item"><label>자원명 *</label><input class="inp" placeholder="예: 광양항태양광 05단계" id="con-name"></div>
        <div class="form-item"><label>유형 *</label>
          <select class="sel" id="con-type">
            <option>태양광</option><option>풍력</option><option>ESS</option><option>바이오</option><option>V2G</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-item"><label>VPP 그룹 *</label>
          <select class="sel" id="con-vpp">
            <option>VPP-전남권</option><option>VPP-제주권</option><option>VPP-경북권</option>
          </select>
        </div>
        <div class="form-item"></div>
      </div>
      <hr class="form-divider">
      <div class="form-section">계약 조건</div>
      <div class="form-row">
        <div class="form-item"><label>개별 계약번호 *</label><input class="inp" placeholder="CON-SUB-2026-NN" id="con-contract"></div>
        <div class="form-item"><label>계약 용량 (kW) *</label><input class="inp" type="number" min="1" placeholder="예: 1500" id="con-cap"></div>
      </div>
      <div class="form-row">
        <div class="form-item"><label>응답 속도 *</label><input class="inp" placeholder="예: 3.0 MW/min" id="con-resp"></div>
        <div class="form-item"><label>계약 기간</label><input class="inp" placeholder="2026.01~12" id="con-period"></div>
      </div>
      <hr class="form-divider">
      <div class="form-section">운영 정보</div>
      <div class="form-row">
        <div class="form-item"><label>원격 제어</label>
          <select class="sel" id="con-remote">
            <option>동의</option><option>미등록</option>
          </select>
        </div>
        <div class="form-item"><label>상태</label>
          <select class="sel" id="con-state">
            <option>활성</option><option>등록 대기</option><option>만료 임박</option><option>만료</option>
          </select>
        </div>
      </div>
      <div style="padding:10px 12px;background:var(--semantic-background-2);border-radius:6px;font-size:11px;color:var(--semantic-label-alt);line-height:18px;margin-top:10px">
        ℹ 가중치는 0%로 시작하며, 추가 후 [가중치 재계산] 버튼으로 활성 자원 합계 100%가 되도록 재분배됩니다. 등록 대기 자원은 0% 유지.
      </div>
    </div>
    <div class="modal-footer">
      <button class="cb n" onclick="closeModal('modal-con-add')">취소</button>
      <button class="cb p" onclick="saveCon()">자원 추가</button>
    </div>
  </div>
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

// ===== 자원 추가 / 가중치 재계산 / KPI 갱신 =====
function _conEscHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

// 행 6번째 셀에서 kW 값 파싱
function _conParseCapKw(tr){
  const cell=tr.cells[5];
  if(!cell) return 0;
  const m=cell.textContent.match(/([\d,]+)\s*kW/);
  if(!m) return 0;
  return parseInt(m[1].replace(/,/g,''),10)||0;
}
// 행 7번째 셀에서 가중치 % 값 파싱
function _conParseWeight(tr){
  const cell=tr.cells[6];
  if(!cell) return 0;
  const m=cell.textContent.match(/([\d.]+)/);
  return m?parseFloat(m[1]):0;
}

// 모달 오픈 직전: 다음 계약번호 자동 제안
window.conPrepareAdd=function(){
  const n=document.querySelectorAll('#con-res-tbody tr').length+1;
  const nn=String(n).padStart(2,'0');
  const ct=document.getElementById('con-contract');
  if(ct && !ct.value) ct.placeholder='CON-SUB-2026-'+nn;
};

window.resetConForm=function(){
  ['con-name','con-contract','con-cap','con-resp','con-period'].forEach(id=>{
    const el=document.getElementById(id); if(el) el.value='';
  });
  const t=document.getElementById('con-type'); if(t) t.selectedIndex=0;
  const v=document.getElementById('con-vpp'); if(v) v.selectedIndex=0;
  const r=document.getElementById('con-remote'); if(r) r.selectedIndex=0;
  const s=document.getElementById('con-state'); if(s) s.selectedIndex=0;
};

window.saveCon=function(){
  const name=(document.getElementById('con-name')?.value||'').trim();
  const type=document.getElementById('con-type')?.value||'태양광';
  const vpp=document.getElementById('con-vpp')?.value||'VPP-전남권';
  const contract=(document.getElementById('con-contract')?.value||'').trim();
  const capStr=(document.getElementById('con-cap')?.value||'').trim();
  const resp=(document.getElementById('con-resp')?.value||'').trim();
  const period=(document.getElementById('con-period')?.value||'').trim()||'준비 단계';
  const remote=document.getElementById('con-remote')?.value||'동의';
  const state=document.getElementById('con-state')?.value||'활성';

  if(!name){toast('자원명은 필수입니다.','warn');return;}
  if(!contract){toast('개별 계약번호는 필수입니다.','warn');return;}
  if(!resp){toast('응답 속도는 필수입니다.','warn');return;}
  const cap=parseInt(capStr,10);
  if(!cap||cap<=0){toast('계약 용량(kW)은 1 이상의 정수여야 합니다.','warn');return;}

  const tbody=document.getElementById('con-res-tbody');
  if(!tbody){toast('테이블을 찾을 수 없습니다.','err');return;}

  // 유형별 배지 스타일 (기존 line 72 매핑과 동일)
  let typeStyle='';
  if(type==='풍력') typeStyle='background:var(--semantic-tag-bg-blue);color:var(--semantic-tag-label-blue)';
  else if(type==='ESS') typeStyle='background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow)';
  const typeBadgeCls=type==='태양광'?'inf':'';

  // 상태별 배지 클래스 (기존 line 74 매핑과 동일)
  const statusCls=state==='활성'?'ok':state==='만료 임박'?'warn':state==='만료'?'err':'off';
  const periodColor=state==='만료 임박'?'var(--palette-yellow-40)':'';

  const idx=tbody.querySelectorAll('tr').length+1;
  const safeName=_conEscHtml(name);
  const safeContract=_conEscHtml(contract);
  const safeResp=_conEscHtml(resp);
  const safePeriod=_conEscHtml(period);

  const tr=document.createElement('tr');
  tr.dataset.type=type;
  tr.dataset.vpp=vpp;
  tr.dataset.state=state;
  tr.dataset.remote=remote;
  tr.innerHTML=
    '<td class="mono">'+idx+'</td>'+
    '<td><b>'+safeName+'</b></td>'+
    '<td><span class="badge '+typeBadgeCls+'"'+(typeStyle?' style="'+typeStyle+'"':'')+'>'+_conEscHtml(type)+'</span></td>'+
    '<td style="font-size:12px">'+_conEscHtml(vpp)+'</td>'+
    '<td class="mono" style="font-size:12px">'+safeContract+'</td>'+
    '<td class="mono">'+(cap/1000).toFixed(2)+' MW<br><span style="font-size:10px;color:var(--semantic-label-alt)">'+cap.toLocaleString()+' kW</span></td>'+
    '<td class="mono" style="font-weight:600;color:var(--semantic-brand-primary)">0.0%</td>'+
    '<td class="mono" style="font-size:12px">'+safeResp+'</td>'+
    '<td style="font-size:12px'+(periodColor?';color:'+periodColor:'')+'">'+safePeriod+'</td>'+
    '<td><span class="badge '+(remote==='동의'?'ok':'off')+'">'+_conEscHtml(remote)+'</span></td>'+
    '<td><span class="badge '+statusCls+'">'+_conEscHtml(state)+'</span></td>'+
    '<td><button class="cb n sm" type="button">편집</button></td>';
  const editBtn=tr.querySelector('button');
  if(editBtn) editBtn.onclick=function(){window.openConEdit(editBtn);};
  tbody.appendChild(tr);

  window.updateConKPI();
  window.resetConForm();
  closeModal('modal-con-add');
  toast(name+' 추가됨 — 가중치 재계산을 권장합니다.');
};

window.conRecalcWeights=function(){
  const rows=Array.from(document.querySelectorAll('#con-res-tbody tr'));
  const active=rows.filter(tr=>tr.dataset.state!=='등록 대기');
  const pending=rows.filter(tr=>tr.dataset.state==='등록 대기');
  const totalCap=active.reduce((s,tr)=>s+_conParseCapKw(tr),0);
  if(totalCap<=0){toast('활성 자원 용량 합계가 0입니다.','warn');return;}

  // 1차 분배
  const raw=active.map(tr=>(_conParseCapKw(tr)/totalCap)*100);
  const rounded=raw.map(v=>Math.round(v*10)/10);
  // 합계 보정 → 가장 큰 항목에 차이 흡수
  const diff=Math.round((100-rounded.reduce((a,b)=>a+b,0))*10)/10;
  if(Math.abs(diff)>=0.05){
    let maxIdx=0;
    for(let i=1;i<rounded.length;i++) if(rounded[i]>rounded[maxIdx]) maxIdx=i;
    rounded[maxIdx]=Math.round((rounded[maxIdx]+diff)*10)/10;
  }
  // 셀 갱신
  active.forEach((tr,i)=>{
    const cell=tr.cells[6];
    if(cell) cell.innerHTML=rounded[i].toFixed(1)+'%';
  });
  pending.forEach(tr=>{
    const cell=tr.cells[6];
    if(cell) cell.innerHTML='0.0%';
  });

  window.updateConKPI();
  toast('가중치 재계산 완료 — 활성 '+active.length+'개 자원, 합계 100.0%');
};

window.updateConKPI=function(){
  const rows=Array.from(document.querySelectorAll('#con-res-tbody tr'));
  const active=rows.filter(tr=>tr.dataset.state==='활성');
  const expSoon=rows.filter(tr=>tr.dataset.state==='만료 임박');
  const totalCnt=rows.length;
  const totalCapKw=rows.reduce((s,tr)=>s+_conParseCapKw(tr),0);
  const totalCapMW=(totalCapKw/1000).toFixed(2);
  const activeWeights=rows.filter(tr=>tr.dataset.state!=='등록 대기').map(_conParseWeight);
  const wAvg=activeWeights.length?(activeWeights.reduce((a,b)=>a+b,0)/activeWeights.length):0;
  const wMax=activeWeights.length?Math.max.apply(null,activeWeights):0;

  const elCnt=document.getElementById('con-kpi-cnt');
  if(elCnt) elCnt.innerHTML=totalCnt+'<span class="ku">개소</span>';
  const elCntSub=document.getElementById('con-kpi-cnt-sub');
  if(elCntSub) elCntSub.textContent='활성 '+active.length+' · 등록대기 '+rows.filter(tr=>tr.dataset.state==='등록 대기').length;
  const elCap=document.getElementById('con-kpi-cap');
  if(elCap) elCap.innerHTML=totalCapMW+'<span class="ku">MW</span>';
  const elWavg=document.getElementById('con-kpi-wavg');
  if(elWavg) elWavg.innerHTML=wAvg.toFixed(1)+'<span class="ku">%</span>';
  const elWavgSub=document.getElementById('con-kpi-wavg-sub');
  if(elWavgSub) elWavgSub.textContent='자원당 · 최대 '+wMax.toFixed(1)+'%';
  const elExp=document.getElementById('con-kpi-exp');
  if(elExp) elExp.innerHTML=expSoon.length+'<span class="ku">건</span>';

  const cnt=document.getElementById('con-res-cnt');
  if(cnt) cnt.textContent=totalCnt+'개소';
};

// ===== 자원 편집 / 삭제 =====
window._conEditTr=null;

window.openConEdit=function(btn){
  const tr=btn && btn.closest ? btn.closest('tr') : null;
  if(!tr){toast('편집할 행을 찾을 수 없습니다.','err');return;}
  window._conEditTr=tr;
  const name=(tr.cells[1]?.textContent||'').trim();
  const type=(tr.cells[2]?.textContent||'').trim();
  const vpp=(tr.cells[3]?.textContent||'').trim();
  const contract=(tr.cells[4]?.textContent||'').trim();
  const cap=_conParseCapKw(tr);
  const resp=(tr.cells[7]?.textContent||'').trim();
  const period=(tr.cells[8]?.textContent||'').trim();
  const remote=(tr.cells[9]?.textContent||'').trim();
  const state=(tr.cells[10]?.textContent||'').trim();

  const setVal=(id,v)=>{const el=document.getElementById(id); if(el) el.value=v;};
  const setSel=(id,v)=>{
    const el=document.getElementById(id);
    if(!el) return;
    for(let i=0;i<el.options.length;i++){ if(el.options[i].text===v){ el.selectedIndex=i; return; } }
  };
  setVal('conE-name',name);
  setVal('conE-contract',contract);
  setSel('conE-type',type);
  setSel('conE-vpp',vpp);
  setVal('conE-cap',cap);
  setVal('conE-resp',resp);
  setVal('conE-period',period);
  setSel('conE-remote',remote);
  setSel('conE-state',state);
  const ttl=document.getElementById('con-edit-title');
  if(ttl) ttl.textContent='계약 자원 편집 — '+name;
  openModal('modal-con-edit');
};

window.updateCon=function(){
  const tr=window._conEditTr;
  if(!tr){toast('편집 대상이 없습니다.','err');closeModal('modal-con-edit');return;}
  const type=document.getElementById('conE-type')?.value||'태양광';
  const vpp=document.getElementById('conE-vpp')?.value||'VPP-전남권';
  const capStr=document.getElementById('conE-cap')?.value||'';
  const resp=(document.getElementById('conE-resp')?.value||'').trim();
  const period=(document.getElementById('conE-period')?.value||'').trim()||'준비 단계';
  const remote=document.getElementById('conE-remote')?.value||'동의';
  const state=document.getElementById('conE-state')?.value||'활성';
  const cap=parseInt(capStr,10);
  if(!cap||cap<=0){toast('계약 용량(kW)은 1 이상의 정수여야 합니다.','warn');return;}
  if(!resp){toast('응답 속도는 필수입니다.','warn');return;}

  let typeStyle='';
  if(type==='풍력') typeStyle='background:var(--semantic-tag-bg-blue);color:var(--semantic-tag-label-blue)';
  else if(type==='ESS') typeStyle='background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow)';
  const typeBadgeCls=type==='태양광'?'inf':'';
  const statusCls=state==='활성'?'ok':state==='만료 임박'?'warn':state==='만료'?'err':'off';
  const periodColor=state==='만료 임박'?'var(--palette-yellow-40)':'';

  // 가중치 셀은 보존(재계산 별도)
  const oldWeight=tr.cells[6]?.innerHTML||'0.0%';

  tr.dataset.type=type;
  tr.dataset.vpp=vpp;
  tr.dataset.state=state;
  tr.dataset.remote=remote;

  tr.cells[2].innerHTML='<span class="badge '+typeBadgeCls+'"'+(typeStyle?' style="'+typeStyle+'"':'')+'>'+_conEscHtml(type)+'</span>';
  tr.cells[3].innerHTML=_conEscHtml(vpp);
  tr.cells[5].innerHTML=(cap/1000).toFixed(2)+' MW<br><span style="font-size:10px;color:var(--semantic-label-alt)">'+cap.toLocaleString()+' kW</span>';
  tr.cells[6].innerHTML=oldWeight;
  tr.cells[7].innerHTML=_conEscHtml(resp);
  tr.cells[8].setAttribute('style','font-size:12px'+(periodColor?';color:'+periodColor:''));
  tr.cells[8].innerHTML=_conEscHtml(period);
  tr.cells[9].innerHTML='<span class="badge '+(remote==='동의'?'ok':'off')+'">'+_conEscHtml(remote)+'</span>';
  tr.cells[10].innerHTML='<span class="badge '+statusCls+'">'+_conEscHtml(state)+'</span>';

  window.updateConKPI();
  closeModal('modal-con-edit');
  const name=(tr.cells[1]?.textContent||'').trim();
  toast(name+' 변경 저장됨 — 용량 변경 시 가중치 재계산 권장');
  window._conEditTr=null;
};

window.deleteCon=function(){
  const tr=window._conEditTr;
  if(!tr){closeModal('modal-con-edit');return;}
  const name=(tr.cells[1]?.textContent||'').trim();
  if(!confirm('자원 "'+name+'"을(를) 삭제하시겠습니까?\n계약 데이터가 즉시 제거되며 되돌릴 수 없습니다.')) return;
  tr.remove();
  window._conEditTr=null;
  // 순번 재정렬
  document.querySelectorAll('#con-res-tbody tr').forEach((r,i)=>{ if(r.cells[0]) r.cells[0].textContent=String(i+1); });
  window.updateConKPI();
  closeModal('modal-con-edit');
  toast(name+' 삭제됨 — 가중치 재계산 권장','warn');
};

// ===== 단가 편집 =====
function _conParsePrice(id,negative){
  const el=document.getElementById(id);
  if(!el) return 0;
  const m=el.textContent.match(/[+-−]?([\d,]+\.?\d*)/);
  if(!m) return 0;
  return parseFloat(m[1].replace(/,/g,''))||0;
}

window.openPriceEdit=function(){
  document.getElementById('conP-perf').value=_conParsePrice('con-price-perf');
  document.getElementById('conP-stby').value=_conParsePrice('con-price-stby');
  document.getElementById('conP-resp').value=_conParsePrice('con-price-resp');
  document.getElementById('conP-cap').value=_conParsePrice('con-price-cap');
  document.getElementById('conP-penOver').value=_conParsePrice('con-price-pen-over');
  // 미이행률 감액률: "월 보상금 20% 감액"에서 20 추출
  const noncomp=document.getElementById('con-price-pen-noncomp');
  const mNon=noncomp?.textContent.match(/(\d+)\s*%/);
  document.getElementById('conP-penNon').value=mNon?mNon[1]:20;
  // 통신 장애: "−500천원/건"에서 500
  document.getElementById('conP-penComm').value=_conParsePrice('con-price-pen-comm');
  openModal('modal-con-price');
};

window.savePrice=function(){
  const perf=parseFloat(document.getElementById('conP-perf').value)||0;
  const stby=parseFloat(document.getElementById('conP-stby').value)||0;
  const resp=parseFloat(document.getElementById('conP-resp').value)||0;
  const cap=parseInt(document.getElementById('conP-cap').value,10)||0;
  const penOver=parseFloat(document.getElementById('conP-penOver').value)||0;
  const penNon=parseInt(document.getElementById('conP-penNon').value,10)||0;
  const penComm=parseInt(document.getElementById('conP-penComm').value,10)||0;
  if([perf,stby,resp,cap].some(v=>v<0)||[penOver,penNon,penComm].some(v=>v<0)){
    toast('단가는 0 이상이어야 합니다.','warn');return;
  }
  if(penNon>100){ toast('감액률은 100% 이하로 입력하세요.','warn'); return; }

  document.getElementById('con-price-perf').textContent='+'+perf.toFixed(2)+' 원/kWh';
  document.getElementById('con-price-stby').textContent='+'+stby.toFixed(2)+' 원/kWh';
  document.getElementById('con-price-resp').textContent='+'+resp.toFixed(2)+' 원/kWh';
  document.getElementById('con-price-cap').textContent='+'+cap.toLocaleString()+' 원/kW·월';
  document.getElementById('con-price-pen-over').textContent='−'+penOver.toFixed(2)+' 원/kWh';
  document.getElementById('con-price-pen-noncomp').textContent='월 보상금 '+penNon+'% 감액';
  document.getElementById('con-price-pen-comm').textContent='−'+penComm.toLocaleString()+'천원/건 (3회 초과)';

  closeModal('modal-con-price');
  toast('단가 변경 저장됨 — 감사 로그 기록(SHA-256), 승인 검토 대기');
};

// ===== 갱신 알림 =====
window._conRenewal={auto:false,leadDays:60,dDays:[90,60,30],channels:['mail','sys'],to:'ops@60hz.kr'};

window.openRenewalEdit=function(){
  const r=window._conRenewal||{};
  const setSel=(id,v)=>{const el=document.getElementById(id); if(!el) return; for(let i=0;i<el.options.length;i++){ if(el.options[i].text===String(v)){ el.selectedIndex=i; return; } }};
  setSel('conR-auto', r.auto?'자동 갱신 ON':'수동 갱신');
  setSel('conR-leadDays', r.leadDays||60);
  ['90','60','30','7','1'].forEach(d=>{
    const el=document.getElementById('conR-d'+d);
    if(el) el.checked=(r.dDays||[]).map(String).includes(d);
  });
  ['mail','sms','sys'].forEach(c=>{
    const el=document.getElementById('conR-'+c);
    if(el) el.checked=(r.channels||[]).includes(c);
  });
  const to=document.getElementById('conR-to'); if(to) to.value=r.to||'ops@60hz.kr';
  openModal('modal-con-renewal');
};

window.saveRenewal=function(){
  const auto=(document.getElementById('conR-auto')?.value||'')==='자동 갱신 ON';
  const leadDays=parseInt(document.getElementById('conR-leadDays')?.value,10)||60;
  const dDays=['90','60','30','7','1'].filter(d=>document.getElementById('conR-d'+d)?.checked).map(Number);
  const channels=['mail','sms','sys'].filter(c=>document.getElementById('conR-'+c)?.checked);
  const to=(document.getElementById('conR-to')?.value||'').trim();
  if(dDays.length===0){toast('알림 시점을 1개 이상 선택하세요.','warn');return;}
  if(channels.length===0){toast('알림 채널을 1개 이상 선택하세요.','warn');return;}
  if(channels.includes('mail') && !to){toast('이메일 채널 선택 시 수신자를 입력하세요.','warn');return;}

  window._conRenewal={auto:auto,leadDays:leadDays,dDays:dDays,channels:channels,to:to};

  const mv=document.getElementById('con-renew-mv');
  if(mv){
    if(auto){
      mv.innerHTML='<span class="badge ok">자동 갱신 ON</span> <span style="font-size:10px;color:var(--semantic-label-alt);margin-left:4px">D-'+dDays.join('/')+'일</span>';
    } else {
      mv.innerHTML='<span class="badge off">수동 갱신</span> <span style="font-size:10px;color:var(--semantic-label-alt);margin-left:4px">알림 D-'+dDays.join('/')+'일</span>';
    }
  }
  closeModal('modal-con-renewal');
  toast('갱신 알림 설정 저장됨 — '+(auto?'자동':'수동')+' / D-'+dDays.join(',')+'일 / '+channels.join('+'));
};

