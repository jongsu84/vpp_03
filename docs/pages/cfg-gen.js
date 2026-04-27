// AUTO-GENERATED FROM index.html — page module: cfg-gen
window.P = window.P || {};
/* ===== 설정: 발전기관리 ===== */
window.P['cfg-gen']=()=>`
<!-- 최상위 필터 바 (분류 → 상태 → 세부) -->
<div class="card fbar"><div class="fbar-row">
  <div class="fbar-item"><label class="flabel">자원 유형</label>
    <select class="fbar-sel" id="cge-f-type" onchange="cfgGenFilterApply()">
      <option value="">전체</option><option>태양광</option><option>풍력</option><option>ESS</option><option>바이오</option><option>V2G</option>
    </select></div>
  <div class="fbar-item"><label class="flabel">상태</label>
    <select class="fbar-sel" id="cge-f-stat" onchange="cfgGenFilterApply()">
      <option value="">전체</option><option>활성</option><option>시운전</option><option>정비</option>
    </select></div>
  <div class="fbar-item"><label class="flabel">지역</label>
    <select class="fbar-sel" id="cge-f-reg" onchange="cfgGenFilterApply()">
      <option value="">전체</option><option>전남</option><option>전북</option><option>경남</option><option>경북</option><option>충남</option><option>제주</option><option>강원</option>
    </select></div>
  <div class="fbar-item"><label class="flabel">REC 가중치</label>
    <select class="fbar-sel" id="cge-f-rec" onchange="cfgGenFilterApply()">
      <option value="">전체</option><option>1.0</option><option>1.2</option><option>1.5</option><option>2.0</option>
    </select></div>
  <div class="fbar-item"><label class="flabel">제어</label>
    <select class="fbar-sel" id="cge-f-ctrl" onchange="cfgGenFilterApply()">
      <option value="">전체</option><option>가능</option><option>불가</option>
    </select></div>
</div></div>

<div class="g4">
  <div class="card acc"><div class="ct">등록 발전소 ${window.tip('등록 발전소','시스템에 등록된 모든 발전 자원 수','COUNT(*) FROM generators','5종 자원: 태양광·풍력·ESS·바이오·V2G — 발전기관리에서 신규 등록')}</div><div class="kv" id="gen-total">47<span class="ku">개소</span></div></div>
  <div class="card"><div class="ct">총 설치용량 ${window.tip('총 설치용량','등록된 모든 발전소의 정격 출력 합계','Σ(설치용량 kW) ÷ 1000 [MW]','Nameplate Capacity — 실제 출력은 일사·풍속·SoC에 따라 변동')}</div><div class="kv">150.2<span class="ku">MW</span></div></div>
  <div class="card"><div class="ct">준중앙 등록 ${window.tip('준중앙급전 등록 자원','KPX 준중앙급전 자원으로 등록된 발전소 수','등록 상태 = 준중앙급전','준중앙 등록 시 +18% 단가 가산 / 단, 급전지시 이행 의무 발생')}</div><div class="kv">9<span class="ku">개소</span></div></div>
  <div class="card"><div class="ct">입찰 참여 중 ${window.tip('입찰 참여 중 자원','현재 KPX 입찰에 참여 중인 자원 수','입찰 상태 = 활성 인 자원','시운전·정비·차단 자원 제외 / 등록은 됐으나 입찰 미참여 자원 = 4개소')}</div><div class="kv" style="color:var(--acc)">43<span class="ku">개소</span></div></div>
</div>
<div class="card">
  <div class="sh"><div class="st">발전기 목록</div><div style="display:flex;gap:6px;align-items:center">
    <select class="sel" style="width:auto;font-size:10px" onchange="genFilter(this.value)"><option value="">전체</option><option>태양광</option><option>풍력</option><option>ESS</option><option>바이오</option><option>V2G</option></select>
    ${window.csvBtn('gen-tbody','generator_master','발전기 목록')}
    <button class="cb p" style="font-size:10px" onclick="openModal('modal-gen-add')">발전소 등록</button>
  </div></div>
  <table class="tbl"><thead><tr><th>발전소명</th><th>유형</th><th>지역</th><th>설치용량</th><th>COD</th><th>REC가중치</th><th>제어</th><th>상태</th></tr></thead>
  <tbody id="gen-tbody">
    <tr><td>광양항태양광 01단계</td><td><span class="badge inf">태양광</span></td><td>전남</td><td class="mono">2,293kW</td><td class="mono">2021-03</td><td class="mono">1.2</td><td><span class="badge ok">가능</span></td><td><span class="badge ok">활성</span></td></tr>
    <tr><td>광양항태양광 04단계</td><td><span class="badge inf">태양광</span></td><td>전남</td><td class="mono">2,199kW</td><td class="mono">2022-07</td><td class="mono">1.2</td><td><span class="badge ok">가능</span></td><td><span class="badge ok">활성</span></td></tr>
    <tr><td>해맞이 태양광</td><td><span class="badge inf">태양광</span></td><td>전남</td><td class="mono">996kW</td><td class="mono">2021-08</td><td class="mono">1.0</td><td><span class="badge ok">가능</span></td><td><span class="badge ok">활성</span></td></tr>
    <tr><td>온누리 태양광</td><td><span class="badge inf">태양광</span></td><td>전남</td><td class="mono">996kW</td><td class="mono">2020-11</td><td class="mono">1.0</td><td><span class="badge ok">가능</span></td><td><span class="badge ok">활성</span></td></tr>
    <tr><td>금능1호 태양광</td><td><span class="badge inf">태양광</span></td><td>제주</td><td class="mono">980kW</td><td class="mono">2023-04</td><td class="mono">1.5</td><td><span class="badge ok">가능</span></td><td><span class="badge ok">활성</span></td></tr>
    <tr><td>김주풍력 01단계</td><td><span class="badge" style="background:var(--semantic-tag-bg-blue);color:var(--semantic-tag-label-blue)">풍력</span></td><td>경북</td><td class="mono">4,000kW</td><td class="mono">2023-12</td><td class="mono">1.0</td><td><span class="badge ok">가능</span></td><td><span class="badge ok">활성</span></td></tr>
    <tr><td>김주풍력 02단계</td><td><span class="badge" style="background:var(--semantic-tag-bg-blue);color:var(--semantic-tag-label-blue)">풍력</span></td><td>경북</td><td class="mono">10,000kW</td><td class="mono">2024-01</td><td class="mono">1.0</td><td><span class="badge ok">가능</span></td><td><span class="badge ok">활성</span></td></tr>
    <tr><td>금능1호 ESS</td><td><span class="badge" style="background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow)">ESS</span></td><td>제주</td><td class="mono">2,000kW</td><td class="mono">2023-04</td><td class="mono">-</td><td><span class="badge ok">가능</span></td><td><span class="badge ok">활성</span></td></tr>
    <tr><td>제주 ESS허브</td><td><span class="badge" style="background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow)">ESS</span></td><td>제주</td><td class="mono">5,000kW</td><td class="mono">2024-06</td><td class="mono">-</td><td><span class="badge ok">가능</span></td><td><span class="badge warn">시운전</span></td></tr>
    <tr><td>순천 바이오가스</td><td><span class="badge" style="background:var(--semantic-tag-bg-violet,#e8defa);color:#6035cc">바이오</span></td><td>전남</td><td class="mono">1,500kW</td><td class="mono">2022-11</td><td class="mono">2.0</td><td><span class="badge ok">가능</span></td><td><span class="badge ok">활성</span></td></tr>
    <tr><td>여수 바이오매스</td><td><span class="badge" style="background:var(--semantic-tag-bg-violet,#e8defa);color:#6035cc">바이오</span></td><td>전남</td><td class="mono">3,000kW</td><td class="mono">2023-05</td><td class="mono">1.5</td><td><span class="badge ok">가능</span></td><td><span class="badge ok">활성</span></td></tr>
    <tr><td>광주 V2G 스테이션</td><td><span class="badge" style="background:var(--semantic-tag-bg-green);color:var(--semantic-tag-label-green)">V2G</span></td><td>전남</td><td class="mono">800kW</td><td class="mono">2025-02</td><td class="mono">-</td><td><span class="badge ok">가능</span></td><td><span class="badge ok">활성</span></td></tr>
    <tr><td>전남 V2G 허브</td><td><span class="badge" style="background:var(--semantic-tag-bg-green);color:var(--semantic-tag-label-green)">V2G</span></td><td>전남</td><td class="mono">1,500kW</td><td class="mono">2025-08</td><td class="mono">-</td><td><span class="badge ok">가능</span></td><td><span class="badge warn">시운전</span></td></tr>
  </tbody></table>
</div>

<!-- 발전소 등록 모달 -->
<div class="modal-backdrop" id="modal-gen-add" style="display:none" onclick="closeModalBg(event,'modal-gen-add')">
  <div class="modal">
    <div class="modal-hdr">
      <span class="modal-title">발전소 신규 등록</span>
      <button class="modal-close" onclick="closeModal('modal-gen-add')">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-section">기본 정보</div>
      <div class="form-row">
        <div class="form-item"><label>발전소명 *</label><input class="inp" placeholder="예: 신안해상태양광" id="gen-name"></div>
        <div class="form-item"><label>발전소 유형 *</label>
          <select class="sel" id="gen-type"><option>태양광</option><option>풍력</option><option>ESS</option><option>태양광+ESS</option><option>바이오</option><option>V2G</option></select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-item"><label>지역 *</label>
          <select class="sel" id="gen-region"><option>전남</option><option>전북</option><option>경남</option><option>경북</option><option>충남</option><option>제주</option><option>강원</option></select>
        </div>
        <div class="form-item"><label>상세 주소</label><input class="inp" placeholder="전남 신안군 압해읍..." id="gen-addr"></div>
      </div>
      <div class="form-row">
        <div class="form-item"><label>위도</label><input class="inp" placeholder="34.8452" id="gen-lat" type="number"></div>
        <div class="form-item"><label>경도</label><input class="inp" placeholder="126.3214" id="gen-lng" type="number"></div>
      </div>
      <hr class="form-divider">
      <div class="form-section">설비 사양</div>
      <div class="form-row">
        <div class="form-item"><label>설치용량 (kW) *</label><input class="inp" placeholder="1000" id="gen-cap" type="number"></div>
        <div class="form-item"><label>상업운전일 (COD) *</label><input class="inp" type="month" id="gen-cod"></div>
      </div>
      <div class="form-row">
        <div class="form-item"><label>REC 가중치</label>
          <select class="sel" id="gen-rec"><option value="1.0">1.0 (일반)</option><option value="1.2">1.2 (건축물)</option><option value="1.5">1.5 (ESS연계)</option><option value="2.0">2.0 (수상)</option></select>
        </div>
        <div class="form-item"><label>사업자 정산 요율 (%)</label><input class="inp" value="5.0" type="number" id="gen-rate"></div>
      </div>
      <hr class="form-divider">
      <div class="form-section">제어 설정</div>
      <div class="form-row">
        <div class="form-item"><label>원격 출력 제어</label>
          <select class="sel" id="gen-ctrl"><option>가능</option><option>불가</option></select>
        </div>
        <div class="form-item"><label>소속 그룹</label>
          <select class="sel" id="gen-grp"><option>VPP-전남권</option><option>VPP-제주권</option><option>VPP-경북권</option><option>미배정</option></select>
        </div>
      </div>
      <div class="form-row full">
        <div class="form-item"><label>현장 담당자 연락처</label><input class="inp" placeholder="010-0000-0000" id="gen-contact"></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="cb n" onclick="closeModal('modal-gen-add')">취소</button>
      <button class="cb p" onclick="saveGen()">등록 완료</button>
    </div>
  </div>
</div>`;

window['I_cfg-gen']=function(){
  window.genFilter=function(v){
    document.querySelectorAll('#gen-tbody tr').forEach(r=>{
      r.style.display=(!v||r.cells[1].textContent.includes(v))?'':'none';
    });
  };
  window.cfgGenFilterApply=function(){
    const type=document.getElementById('cge-f-type')?.value||'';
    const stat=document.getElementById('cge-f-stat')?.value||'';
    const reg=document.getElementById('cge-f-reg')?.value||'';
    const rec=document.getElementById('cge-f-rec')?.value||'';
    const ctrl=document.getElementById('cge-f-ctrl')?.value||'';
    let total=0;
    document.querySelectorAll('#gen-tbody tr').forEach(tr=>{
      const cType=tr.cells[1]?.textContent.trim();
      const cReg=tr.cells[2]?.textContent.trim();
      const cRec=tr.cells[5]?.textContent.trim();
      const cCtrl=tr.cells[6]?.textContent.trim();
      const cStat=tr.cells[7]?.textContent.trim();
      let show=true;
      if(type && cType!==type) show=false;
      if(stat && cStat!==stat) show=false;
      if(reg && cReg!==reg) show=false;
      if(rec && cRec!==rec) show=false;
      if(ctrl && cCtrl!==ctrl) show=false;
      tr.style.display=show?'':'none';
      if(show) total++;
    });
    const totEl=document.getElementById('gen-total'); if(totEl) totEl.firstChild.nodeValue=total;
  };
  window.saveGen=function(){
    const name=document.getElementById('gen-name').value.trim();
    const cap=document.getElementById('gen-cap').value;
    const cod=document.getElementById('gen-cod').value;
    if(!name||!cap||!cod){toast('발전소명, 용량, 운전일은 필수 입력입니다.','warn');return;}
    const type=document.getElementById('gen-type').value;
    const region=document.getElementById('gen-region').value;
    const rec=document.getElementById('gen-rec').value;
    const ctrlEl=document.getElementById('gen-ctrl');
    const ctrl=ctrlEl?ctrlEl.value:'가능';
    // 자원 유형별 badge 컬러
    var typeBadge='';
    if(type==='태양광') typeBadge='<span class="badge inf">태양광</span>';
    else if(type==='풍력') typeBadge='<span class="badge" style="background:var(--semantic-tag-bg-blue);color:var(--semantic-tag-label-blue)">풍력</span>';
    else if(type==='ESS') typeBadge='<span class="badge" style="background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow)">ESS</span>';
    else if(type==='바이오') typeBadge='<span class="badge" style="background:var(--semantic-tag-bg-violet,#e8defa);color:#6035cc">바이오</span>';
    else if(type==='V2G') typeBadge='<span class="badge" style="background:var(--semantic-tag-bg-green);color:var(--semantic-tag-label-green)">V2G</span>';
    else typeBadge='<span class="badge inf">'+type+'</span>';
    var ctrlBadge=ctrl==='가능'?'<span class="badge ok">가능</span>':'<span class="badge off">불가</span>';
    const tbody=document.getElementById('gen-tbody');
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>${name}</td><td>${typeBadge}</td><td>${region}</td><td class="mono">${Number(cap).toLocaleString()}kW</td><td class="mono">${cod}</td><td class="mono">${rec}</td><td>${ctrlBadge}</td><td><span class="badge warn">시운전</span></td>`;
    tbody.appendChild(tr);
    closeModal('modal-gen-add');
    toast('발전소가 등록되었습니다. (' + name + ')');
  };
};

