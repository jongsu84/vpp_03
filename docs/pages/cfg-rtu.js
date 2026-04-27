// AUTO-GENERATED FROM index.html — page module: cfg-rtu
window.P = window.P || {};
/* ===== 설정: RTU관리 ===== */
window.P['cfg-rtu']=()=>`
<!-- 최상위 필터 바 (분류 → 상태 → 세부) -->
<div class="card fbar"><div class="fbar-row">
  <div class="fbar-item"><label class="flabel">연결 발전소</label>
    <select class="fbar-sel" id="crt-f-plant" onchange="cfgRtuFilterApply()">
      <option value="">전체</option><option>광양항태양광</option><option>광양항4단계</option><option>온누리</option><option>금능1호</option><option>김주풍력</option>
    </select></div>
  <div class="fbar-item"><label class="flabel">상태</label>
    <select class="fbar-sel" id="crt-f-stat" onchange="cfgRtuFilterApply()">
      <option value="">전체</option><option>정상</option><option>장애</option><option>초기화중</option>
    </select></div>
  <div class="fbar-item"><label class="flabel">VPN</label>
    <select class="fbar-sel" id="crt-f-vpn" onchange="cfgRtuFilterApply()">
      <option value="">전체</option><option>연결</option><option>단절</option>
    </select></div>
  <div class="fbar-item"><label class="flabel">상위 프로토콜</label>
    <select class="fbar-sel" id="crt-f-prot" onchange="cfgRtuFilterApply()">
      <option value="">전체</option><option>MQTT</option><option>DNP3.0</option><option>Modbus/TCP</option><option>HTTP(REST)</option>
    </select></div>
  <div class="fbar-item"><label class="flabel">폴링 주기</label>
    <select class="fbar-sel" id="crt-f-poll" onchange="cfgRtuFilterApply()">
      <option value="">전체</option><option>30</option><option>60</option><option>300</option>
    </select></div>
</div></div>

<div class="g4">
  <div class="card acc"><div class="ct">등록 RTU ${window.tip('등록 RTU (Remote Terminal Unit)','현장 데이터 수집·제어 단말기 수','COUNT(*) FROM rtu','발전소당 1~2대 — VPN 그룹별로 묶여 KT·SKT 5G/LTE 라인 사용')}</div><div class="kv" id="rtu-total">47<span class="ku">대</span></div></div>
  <div class="card"><div class="ct">통신 정상 ${window.tip('통신 정상 RTU','마지막 폴링이 정상 응답한 RTU 수','마지막 폴링 시각 ≤ 1분 이내','폴링 주기 30~60초 / 5분 미응답 시 통신 장애로 분류')}</div><div class="kv" style="color:var(--acc)" id="rtu-ok">44<span class="ku">대</span></div></div>
  <div class="card"><div class="ct">통신 장애 ${window.tip('통신 장애 RTU','5분 이상 응답 없는 RTU 수','마지막 폴링 시각 > 5분 전','즉시 현장 점검 — VPN·전원·하드웨어 순으로 진단 / 평균 복구 시간 12분')}</div><div class="kv" style="color:var(--acc4)" id="rtu-err">2<span class="ku">대</span></div></div>
  <div class="card"><div class="ct">FW 업데이트 필요 ${window.tip('FW (펌웨어) 업데이트 필요','최신 펌웨어보다 구버전인 RTU 수','RTU FW 버전 < 배포 가능 최신 버전','OTA 업데이트로 일괄 배포 가능 — 단, 업데이트 중 통신 일시 중단')}</div><div class="kv" style="color:var(--acc3)">5<span class="ku">대</span></div></div>
</div>
<div class="card mb">
  <div class="sh"><div class="st">RTU 목록</div><div style="display:flex;gap:6px;align-items:center">
    ${window.csvBtn('rtu-tbody','rtu_master','RTU 목록')}
    <button class="cb p" style="font-size:10px" onclick="openModal('modal-rtu-add')">RTU 등록</button>
    <button class="cb n" style="font-size:10px" onclick="openModal('modal-rtu-ota')">OTA 업데이트</button>
  </div></div>
  <table class="tbl"><thead><tr><th>RTU ID</th><th>연결 발전소</th><th>IP 주소</th><th>상위 프로토콜</th><th>폴링(초)</th><th>VPN</th><th>CPU</th><th>상태</th></tr></thead>
  <tbody id="rtu-tbody">
    <tr><td class="mono" style="font-size:9px;color:var(--acc2)">RTU-GY-01</td><td>광양항태양광</td><td class="mono" style="font-size:9px">10.233.1.31</td><td class="mono" style="font-size:9px">MQTT</td><td class="mono">60</td><td><span class="badge ok">연결</span></td><td class="mono">23%</td><td><span class="badge ok">정상</span></td></tr>
    <tr><td class="mono" style="font-size:9px;color:var(--acc2)">RTU-GY-02</td><td>광양항4단계</td><td class="mono" style="font-size:9px">10.233.1.32</td><td class="mono" style="font-size:9px">MQTT</td><td class="mono">60</td><td><span class="badge ok">연결</span></td><td class="mono">18%</td><td><span class="badge ok">정상</span></td></tr>
    <tr><td class="mono" style="font-size:9px;color:var(--acc2)">RTU-GN-01</td><td>금능1호(제주)</td><td class="mono" style="font-size:9px">10.240.3.51</td><td class="mono" style="font-size:9px">DNP3.0</td><td class="mono">30</td><td><span class="badge ok">연결</span></td><td class="mono">42%</td><td><span class="badge ok">정상</span></td></tr>
    <tr><td class="mono" style="font-size:9px;color:var(--acc2)">RTU-KJ-01</td><td>김주풍력</td><td class="mono" style="font-size:9px">10.233.3.21</td><td class="mono" style="font-size:9px">MQTT</td><td class="mono">30</td><td><span class="badge err">단절</span></td><td class="mono">—</td><td><span class="badge err">장애</span></td></tr>
  </tbody></table>
</div>

<!-- RTU 등록 모달 -->
<div class="modal-backdrop" id="modal-rtu-add" style="display:none" onclick="closeModalBg(event,'modal-rtu-add')">
  <div class="modal">
    <div class="modal-hdr">
      <span class="modal-title">RTU 신규 등록</span>
      <button class="modal-close" onclick="closeModal('modal-rtu-add')">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-section">RTU 식별 정보</div>
      <div class="form-row">
        <div class="form-item"><label>RTU ID *</label><input class="inp" placeholder="RTU-XX-01" id="rtu-id"></div>
        <div class="form-item"><label>제조사</label><input class="inp" placeholder="인코어드, LS일렉트릭..." id="rtu-maker"></div>
      </div>
      <div class="form-row full">
        <div class="form-item"><label>연결 발전소 *</label>
          <select class="sel" id="rtu-plant">
            <option>광양항태양광</option><option>광양항4단계</option><option>온누리</option><option>금능1호</option><option>김주풍력</option><option>신규발전소</option>
          </select>
        </div>
      </div>
      <hr class="form-divider">
      <div class="form-section">네트워크 설정</div>
      <div class="form-row">
        <div class="form-item"><label>고정 IP 주소 *</label><input class="inp" placeholder="10.233.1.35" id="rtu-ip"></div>
        <div class="form-item"><label>서브넷 마스크</label><input class="inp" value="255.255.255.0" id="rtu-mask"></div>
      </div>
      <div class="form-row">
        <div class="form-item"><label>상위 통신 프로토콜 *</label>
          <select class="sel" id="rtu-uprot"><option>MQTT</option><option>DNP3.0</option><option>Modbus/TCP</option><option>HTTP(REST)</option></select>
        </div>
        <div class="form-item"><label>하위 통신 프로토콜</label>
          <select class="sel" id="rtu-dprot"><option>Modbus RTU (RS485)</option><option>Modbus/TCP</option><option>LoRa</option><option>Zigbee</option></select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-item"><label>폴링 주기 (초) *</label><input class="inp" value="60" type="number" id="rtu-poll"></div>
        <div class="form-item"><label>VPN 그룹 ID</label><input class="inp" placeholder="VPN-GRP-001" id="rtu-vpn"></div>
      </div>
      <hr class="form-divider">
      <div class="form-section">보안 인증</div>
      <div class="form-row">
        <div class="form-item"><label>API Key</label><input class="inp" placeholder="자동 생성" id="rtu-key" readonly></div>
        <div class="form-item" style="justify-content:flex-end;padding-top:18px">
          <button class="cb n" style="font-size:10px" onclick="document.getElementById('rtu-key').value='RTU-'+Math.random().toString(36).substr(2,16).toUpperCase()">키 생성</button>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="cb n" onclick="closeModal('modal-rtu-add')">취소</button>
      <button class="cb p" onclick="saveRtu()">등록 완료</button>
    </div>
  </div>
</div>

<!-- OTA 업데이트 모달 -->
<div class="modal-backdrop" id="modal-rtu-ota" style="display:none" onclick="closeModalBg(event,'modal-rtu-ota')">
  <div class="modal">
    <div class="modal-hdr">
      <span class="modal-title">OTA 펌웨어 업데이트</span>
      <button class="modal-close" onclick="closeModal('modal-rtu-ota')">✕</button>
    </div>
    <div class="modal-body">
      <div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.3);border-radius:6px;padding:9px 12px;margin-bottom:14px;font-size:11px;color:var(--acc3)">
        ⚠ OTA 업데이트 중 RTU 통신이 일시 중단됩니다. 업데이트 전 현장 상황을 확인하세요.
      </div>
      <div class="form-row">
        <div class="form-item"><label>배포 FW 버전</label><input class="inp" value="v2.5.0" id="ota-ver"></div>
        <div class="form-item"><label>업데이트 서버</label><input class="inp" value="ota.60hz.kr" id="ota-server"></div>
      </div>
      <div class="form-section" style="margin-top:8px">업데이트 대상 RTU 선택</div>
      <div id="ota-list">
        <div class="ota-item"><input type="checkbox" class="ota-check" checked id="ota-r1"><div class="ota-info"><div class="ota-name">RTU-GY-01 — 광양항태양광</div><div class="ota-ver">현재: v2.4.1 → v2.5.0</div></div><span class="badge inf ota-badge">업데이트 가능</span></div>
        <div class="ota-item"><input type="checkbox" class="ota-check" id="ota-r2"><div class="ota-info"><div class="ota-name">RTU-GY-02 — 광양항4단계</div><div class="ota-ver">현재: v2.5.0 (최신)</div></div><span class="badge ok ota-badge">최신</span></div>
        <div class="ota-item"><input type="checkbox" class="ota-check" checked id="ota-r3"><div class="ota-info"><div class="ota-name">RTU-GN-01 — 금능1호(제주)</div><div class="ota-ver">현재: v2.3.2 → v2.5.0</div></div><span class="badge warn ota-badge">구버전</span></div>
        <div class="ota-item" style="opacity:0.5"><input type="checkbox" class="ota-check" disabled><div class="ota-info"><div class="ota-name">RTU-KJ-01 — 김주풍력</div><div class="ota-ver">통신 단절 — 업데이트 불가</div></div><span class="badge err ota-badge">장애</span></div>
      </div>
      <div class="prog-wrap" id="ota-progress">
        <div class="prog-label-row"><span id="ota-status-txt">업데이트 준비 중...</span><span id="ota-pct-txt">0%</span></div>
        <div class="prog-track"><div class="prog-run" id="ota-bar"></div></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="cb n" onclick="closeModal('modal-rtu-ota')">닫기</button>
      <button class="cb p" id="ota-start-btn" onclick="startOta()">업데이트 시작</button>
    </div>
  </div>
</div>`;

window['I_cfg-rtu']=function(){
  window.saveRtu=function(){
    const id=document.getElementById('rtu-id').value.trim();
    const ip=document.getElementById('rtu-ip').value.trim();
    const plant=document.getElementById('rtu-plant').value;
    if(!id||!ip){toast('RTU ID와 IP 주소는 필수입니다.','warn');return;}
    const prot=document.getElementById('rtu-uprot').value;
    const poll=document.getElementById('rtu-poll').value;
    const tbody=document.getElementById('rtu-tbody');
    const tr=document.createElement('tr');
    tr.innerHTML=`<td class="mono" style="font-size:9px;color:var(--acc2)">${id}</td><td>${plant}</td><td class="mono" style="font-size:9px">${ip}</td><td class="mono" style="font-size:9px">${prot}</td><td class="mono">${poll}</td><td><span class="badge ok">연결</span></td><td class="mono">—</td><td><span class="badge inf">초기화중</span></td>`;
    tbody.appendChild(tr);
    closeModal('modal-rtu-add');
    toast('RTU가 등록되었습니다. (' + id + ')');
  };
  window.startOta=function(){
    const checked=[...document.querySelectorAll('.ota-check:checked:not(:disabled)')];
    if(checked.length===0){toast('업데이트할 RTU를 선택하세요.','warn');return;}
    const btn=document.getElementById('ota-start-btn');
    btn.disabled=true;btn.textContent='업데이트 중...';
    const prog=document.getElementById('ota-progress');
    prog.style.display='block';
    const bar=document.getElementById('ota-bar');
    const st=document.getElementById('ota-status-txt');
    const pt=document.getElementById('ota-pct-txt');
    const steps=['펌웨어 파일 검증 중...','RTU 연결 확인 중...','패키지 전송 중...','설치 및 재부팅 중...','통신 복구 확인 중...','완료'];
    let pct=0;
    const iv=setInterval(()=>{
      pct+=Math.random()*18+5;
      if(pct>=100){pct=100;clearInterval(iv);btn.textContent='완료';toast('OTA 업데이트가 완료되었습니다. ('+checked.length+'대)');}
      bar.style.width=Math.min(pct,100)+'%';
      pt.textContent=Math.round(Math.min(pct,100))+'%';
      st.textContent=steps[Math.min(Math.floor(pct/20),5)];
    },500);
  };
};

