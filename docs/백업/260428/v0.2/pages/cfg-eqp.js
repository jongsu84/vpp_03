// AUTO-GENERATED FROM index.html — page module: cfg-eqp
window.P = window.P || {};
/* ===== 설정: 설비관리 ===== */
window.P['cfg-eqp']=()=>`
<!-- 최상위 필터 바 (분류 → 상태 → 세부) -->
<div class="card fbar"><div class="fbar-row">
  <div class="fbar-item"><label class="fbar-lbl">설비 유형</label>
    <select class="fbar-sel" id="ceq-f-type" onchange="cfgEqpFilterApply()">
      <option value="">전체</option><option>인버터</option><option>PCS(ESS)</option><option>기상관측장비</option><option>RTU</option><option>계량기</option>
    </select></div>
  <div class="fbar-item"><label class="fbar-lbl">운전 상태</label>
    <select class="fbar-sel" id="ceq-f-stat" onchange="cfgEqpFilterApply()">
      <option value="">전체</option><option>가동</option><option>단절</option><option>점검</option>
    </select></div>
  <div class="fbar-item"><label class="fbar-lbl">상위 발전소</label>
    <select class="fbar-sel" id="ceq-f-plant" onchange="cfgEqpFilterApply()">
      <option value="">전체</option><option>광양항태양광</option><option>광양항4단계</option><option>온누리</option><option>금능1호</option><option>김주풍력</option>
    </select></div>
  <div class="fbar-item"><label class="fbar-lbl">제조사</label>
    <select class="fbar-sel" id="ceq-f-mfr" onchange="cfgEqpFilterApply()">
      <option value="">전체</option><option>SMA</option><option>삼성SDI</option><option>두산</option><option>LS일렉트릭</option>
    </select></div>
  <div class="fbar-item"><label class="fbar-lbl">프로토콜</label>
    <select class="fbar-sel" id="ceq-f-prot" onchange="cfgEqpFilterApply()">
      <option value="">전체</option><option>Modbus/TCP</option><option>DNP3.0</option><option>IEC 61850</option><option>IEC61400</option><option>MQTT</option>
    </select></div>
</div></div>

<div class="g4">
  <div class="card acc"><div class="ct">등록 설비 ${window.tip('등록 설비','발전소에 설치된 모든 측정/제어 설비 개수','COUNT(*) FROM equipment','인버터·PCS·기상관측·RTU·계량기 등 — 설비별 S/N 등록 필수')}</div><div class="kv" id="eqp-total">284<span class="ku">대</span></div></div>
  <div class="card"><div class="ct">인버터 ${window.tip('인버터 (Inverter)','DC를 AC로 변환하는 핵심 설비 수','유형 = 인버터','SMA·LS일렉트릭·두산 등 다양 — Modbus/TCP 또는 Sunspec 프로토콜')}</div><div class="kv">241<span class="ku">대</span></div></div>
  <div class="card"><div class="ct">ESS(PCS) ${window.tip('ESS PCS (Power Conversion System)','ESS 배터리의 충방전을 제어하는 전력변환 장치','유형 = PCS(ESS)','삼성SDI·LG에너지솔루션 등 — DNP3.0 또는 IEC 61850')}</div><div class="kv">8<span class="ku">대</span></div></div>
  <div class="card"><div class="ct">점검 필요 ${window.tip('점검 필요 설비','정기 점검 주기 도래 또는 이상 감지 설비 수','마지막 점검일 + 점검 주기 ≤ 오늘 OR 이상 감지','권장 주기: 인버터 6개월 / 배터리 3개월 / 기상관측 12개월')}</div><div class="kv" style="color:var(--acc3)">12<span class="ku">대</span></div></div>
</div>
<div class="card">
  <div class="sh"><div class="st">설비 목록</div><div style="display:flex;gap:6px;align-items:center"><input class="inp" placeholder="검색 (S/N·모델·발전소)" style="width:180px;height:32px;font-size:12px" oninput="eqpSearch(this.value)"><button class="cb p sm" onclick="openModal('modal-eqp-add')">설비 등록</button>${window.csvBtn('eqp-tbody','equipment_master','설비 목록')}</div></div>
  <table class="tbl"><thead><tr><th>설비 S/N</th><th>유형</th><th>제조사/모델</th><th>상위 발전소</th><th>프로토콜</th><th>FW 버전</th><th>운전 상태</th></tr></thead>
  <tbody id="eqp-tbody">
    <tr><td class="mono" style="font-size:9px;color:var(--acc2)">INV-GY-001</td><td>인버터</td><td>SMA/Sunny Tripower</td><td>광양항태양광</td><td class="mono" style="font-size:9px">Modbus/TCP</td><td class="mono">3.12.1</td><td><span class="badge ok">가동</span></td></tr>
    <tr><td class="mono" style="font-size:9px;color:var(--acc2)">INV-GY-003</td><td>인버터</td><td>SMA/Sunny Tripower</td><td>광양항태양광</td><td class="mono" style="font-size:9px">Modbus/TCP</td><td class="mono">3.11.2</td><td><span class="badge err">단절</span></td></tr>
    <tr><td class="mono" style="font-size:9px;color:var(--acc2)">PCS-GN-001</td><td>PCS(ESS)</td><td>삼성SDI/E5</td><td>금능1호</td><td class="mono" style="font-size:9px">DNP3.0</td><td class="mono">2.4.0</td><td><span class="badge ok">가동</span></td></tr>
    <tr><td class="mono" style="font-size:9px;color:var(--acc2)">INV-KJ-001</td><td>인버터</td><td>두산/WinDS</td><td>김주풍력</td><td class="mono" style="font-size:9px">IEC61400</td><td class="mono">5.2.1</td><td><span class="badge ok">가동</span></td></tr>
  </tbody></table>
</div>

<!-- 설비 등록 모달 -->
<div class="modal-backdrop" id="modal-eqp-add" style="display:none" onclick="closeModalBg(event,'modal-eqp-add')">
  <div class="modal">
    <div class="modal-hdr">
      <span class="modal-title">설비 신규 등록</span>
      <button class="modal-close" onclick="closeModal('modal-eqp-add')">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-section">설비 기본 정보</div>
      <div class="form-row">
        <div class="form-item"><label>설비 유형 *</label>
          <select class="sel" id="eqp-type"><option>인버터</option><option>PCS(ESS)</option><option>기상관측장비</option><option>RTU</option><option>계량기</option></select>
        </div>
        <div class="form-item"><label>제조사 *</label><input class="inp" placeholder="SMA, 삼성SDI, 두산..." id="eqp-maker"></div>
      </div>
      <div class="form-row">
        <div class="form-item"><label>모델명 *</label><input class="inp" placeholder="Sunny Tripower 25000TL" id="eqp-model"></div>
        <div class="form-item"><label>시리얼 번호 (S/N) *</label><input class="inp" placeholder="INV-GY-005" id="eqp-sn"></div>
      </div>
      <div class="form-row full">
        <div class="form-item"><label>상위 발전소 *</label>
          <select class="sel" id="eqp-plant">
            <option>광양항태양광</option><option>광양항4단계</option><option>온누리</option><option>금능1호</option><option>김주풍력</option>
          </select>
        </div>
      </div>
      <hr class="form-divider">
      <div class="form-section">통신 설정</div>
      <div class="form-row">
        <div class="form-item"><label>통신 프로토콜 *</label>
          <select class="sel" id="eqp-prot"><option>Modbus/TCP</option><option>DNP3.0</option><option>IEC 61850</option><option>IEC 61400</option><option>MQTT</option></select>
        </div>
        <div class="form-item"><label>IP 주소</label><input class="inp" placeholder="10.233.1.35" id="eqp-ip"></div>
      </div>
      <div class="form-row">
        <div class="form-item"><label>포트 번호</label><input class="inp" placeholder="502" id="eqp-port" type="number"></div>
        <div class="form-item"><label>데이터 수집 주기 (초)</label><input class="inp" value="60" type="number" id="eqp-interval"></div>
      </div>
      <hr class="form-divider">
      <div class="form-section">설비 사양</div>
      <div class="form-row">
        <div class="form-item"><label>정격 출력 (kW)</label><input class="inp" placeholder="25" type="number" id="eqp-rated"></div>
        <div class="form-item"><label>FW 버전</label><input class="inp" placeholder="3.12.1" id="eqp-fw"></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="cb n" onclick="closeModal('modal-eqp-add')">취소</button>
      <button class="cb p" onclick="saveEqp()">등록 완료</button>
    </div>
  </div>
</div>`;

window['I_cfg-eqp']=function(){
  window.eqpSearch=function(v){
    const rows=document.querySelectorAll('#eqp-tbody tr');
    rows.forEach(r=>{r.style.display=r.textContent.includes(v)?'':'none';});
  };
  window.cfgEqpFilterApply=function(){
    const type=document.getElementById('ceq-f-type')?.value||'';
    const stat=document.getElementById('ceq-f-stat')?.value||'';
    const plant=document.getElementById('ceq-f-plant')?.value||'';
    const mfr=document.getElementById('ceq-f-mfr')?.value||'';
    const prot=document.getElementById('ceq-f-prot')?.value||'';
    let total=0;
    document.querySelectorAll('#eqp-tbody tr').forEach(tr=>{
      const cType=tr.cells[1]?.textContent.trim();
      const cMfr=(tr.cells[2]?.textContent.trim()||'').split('/')[0];
      const cPlant=tr.cells[3]?.textContent.trim();
      const cProt=tr.cells[4]?.textContent.trim();
      const cStat=tr.querySelector('.badge')?.textContent.trim()||'';
      let show=true;
      if(type && cType!==type) show=false;
      if(stat && cStat!==stat) show=false;
      if(plant && cPlant!==plant) show=false;
      if(mfr && cMfr!==mfr) show=false;
      if(prot && cProt!==prot) show=false;
      tr.style.display=show?'':'none';
      if(show) total++;
    });
    const totEl=document.getElementById('eqp-total'); if(totEl) totEl.firstChild.nodeValue=total;
  };
  window.saveEqp=function(){
    const sn=document.getElementById('eqp-sn').value.trim();
    const maker=document.getElementById('eqp-maker').value.trim();
    const model=document.getElementById('eqp-model').value.trim();
    if(!sn||!maker||!model){toast('유형, 제조사, 모델명, S/N은 필수입니다.','warn');return;}
    const type=document.getElementById('eqp-type').value;
    const plant=document.getElementById('eqp-plant').value;
    const prot=document.getElementById('eqp-prot').value;
    const fw=document.getElementById('eqp-fw').value||'-';
    const tbody=document.getElementById('eqp-tbody');
    const tr=document.createElement('tr');
    tr.innerHTML=`<td class="mono" style="font-size:9px;color:var(--acc2)">${sn}</td><td>${type}</td><td>${maker}/${model}</td><td>${plant}</td><td class="mono" style="font-size:9px">${prot}</td><td class="mono">${fw}</td><td><span class="badge ok">가동</span></td>`;
    tbody.appendChild(tr);
    closeModal('modal-eqp-add');
    toast('설비가 등록되었습니다. (' + sn + ')');
  };
};

