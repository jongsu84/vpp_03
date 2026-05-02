// AUTO-GENERATED FROM index.html — page module: ctl-mon
window.P = window.P || {};
/* ===== 클릭제어: 제어신호 모니터링 (패킷 무결성 · ACK · 0.5s SLA) ===== */
window.P['ctl-mon']=()=>`
<!-- SLA 배너 -->
<div class="card" style="background:linear-gradient(90deg,#eaf6ec 0%,#f5fbf6 100%);border-left:4px solid #0a7;margin-bottom:12px">
  <div style="display:flex;align-items:center;gap:12px;padding:8px 4px">
    <div style="font-size:22px">⚡</div>
    <div style="flex:1">
      <div style="font-size:13px;font-weight:700;color:#0a3d22">제어 신뢰성 SLA: <b style="color:#0a7">≤ 500ms 도달 확인 · CRC 무결성 100% · ACK 응답 필수</b></div>
      <div style="font-size:11px;color:#2b5a3c;margin-top:2px">운영자 명령 → Gateway → RTU → 장비 적용 → ACK까지 전 과정을 엔드투엔드 모니터링하여 제어 신호 도달을 보장합니다.</div>
    </div>
    <div style="text-align:right">
      <div style="font-size:10px;color:#4a7a5d">오늘 SLA 준수율</div>
      <div style="font-size:18px;font-weight:800;color:#0a7">99.4%</div>
    </div>
  </div>
</div>

<!-- 최상위 필터 바 (그룹 → 상태 → 세부) -->
<div class="card fbar"><div class="fbar-row">
  <div class="fbar-item"><label class="fbar-lbl">VPP 그룹</label>
    <select class="fbar-sel" id="cm2-f-vpp" onchange="cmonFilterApply()">
      <option value="">전체</option><option>VPP-전남권</option><option>VPP-제주권</option><option>VPP-경북권</option>
    </select>
  </div>
  <div class="fbar-item"><label class="fbar-lbl">세션 상태</label>
    <select class="fbar-sel" id="cm2-f-stat" onchange="cmonFilterApply()">
      <option value="">전체</option><option value="ok">완료</option><option value="warn">지연</option><option value="err">실패</option><option value="prog">진행중</option>
    </select>
  </div>
  <div class="fbar-item"><label class="fbar-lbl">응답 지연</label>
    <select class="fbar-sel" id="cm2-f-lat" onchange="cmonFilterApply()">
      <option value="">전체</option><option value="sla">SLA 준수 (≤500ms)</option><option value="over">SLA 초과 (&gt;500ms)</option>
    </select>
  </div>
  <div class="fbar-item"><label class="fbar-lbl">패킷 무결성</label>
    <select class="fbar-sel" id="cm2-f-int" onchange="cmonFilterApply()">
      <option value="">전체</option><option value="ok">OK (CRC 일치)</option><option value="err">오류 (CRC 불일치)</option>
    </select>
  </div>
  <div class="fbar-item"><label class="fbar-lbl">프로토콜</label>
    <select class="fbar-sel" id="cm2-f-proto" onchange="cmonFilterApply()">
      <option value="">전체</option><option>Modbus TCP</option><option>IEC-104</option><option>OCPP</option><option>MQTT</option>
    </select>
  </div>
</div></div>

<!-- KPI 5종 -->
<div class="g5" style="margin-bottom:12px">
  <div class="card acc"><div class="ct">활성 세션 ${window.tip('활성 제어 세션','현재 처리 중인 제어 명령 세션 수','진행중 + 완료 미확인 세션 합계','동시 다중 세션 정상 — 평균 1~3개 / 5개 이상은 부하 점검 필요')}</div><div class="kv">3<span class="ku">개</span></div><div class="kd neu">진행중 2 · 미확인 1</div></div>
  <div class="card"><div class="ct">평균 응답 지연 ${window.tip('평균 응답 지연 + 500ms SLA 준수율','SCADA 명령 송신 → ACK 수신까지의 평균 왕복 시간 + SLA 준수 비율','평균 = Σ(ACK 시각 - 송신 시각) ÷ N · SLA = COUNT(지연 ≤ 500ms) ÷ COUNT(*)','중앙값(p50): 0.28s / p95: 0.42s / p99: 0.85s · 준중앙급전 SLA 99% 이상 필수 (미달 시 보상금 차감)')}</div><div class="kv" style="color:#0a7">0.31<span class="ku">s</span></div><div class="kd up">SLA 99.4% · p50 0.28s</div></div>
  <div class="card"><div class="ct">패킷 무결성 (CRC) ${window.tip('패킷 무결성 (CRC)','CRC 검증을 통과한 패킷 비율','CRC 일치 패킷 ÷ 전체 패킷 × 100 [%]','100% 정상 / 99% 미만 시 통신 라인 노이즈 또는 RTU 펌웨어 점검')}</div><div class="kv" style="color:#0a7">100<span class="ku">%</span></div><div class="kd neu">3,842 / 3,842</div></div>
  <div class="card"><div class="ct">ACK 응답률 ${window.tip('ACK 응답률 + 재전송 성공률','명령 송신 후 정상 ACK를 받은 비율 + 재전송 시도 성공률','ACK = 수신 ÷ 송신 × 100 / 재전송 = 성공 ÷ 시도 × 100','99.5% 이상 정상 / 미수신 시 자동 재전송 최대 3회 / 평균 ACK 0.18s · 최대 1.45s')}</div><div class="kv" style="color:#0a7">99.7<span class="ku">%</span></div><div class="kd neu">평균 ACK 0.18s · 재전송 10/12</div></div>
  <div class="card"><div class="ct">제어 실패 (24h) ${window.tip('24시간 제어 실패 건수','3회 재전송에도 실패한 제어 명령 건수','COUNT(*) WHERE 최종 결과 = 실패','즉시 현장 점검 — 통신 단절·장비 오프라인·전원 장애 가능성')}</div><div class="kv" style="color:#d32">1<span class="ku">건</span></div><div class="kd down">CTL-0085 타임아웃</div></div>
</div>

<!-- 제어 세션 추적 (풀 폭) -->
<div class="card mb">
  <div class="sh"><div class="st">제어 세션 추적 (최근 20건) ${window.tip('제어 세션 추적','운영자 제어 명령의 송신 → 응답 → ACK → 도달 전 과정을 세션 단위로 추적','상태(진행중/완료/지연/실패) · 응답시간(s) · CRC 무결성 · ACK 수신 · 도달 확인','세션당 SLA: 응답 ≤ 500ms / CRC 일치 / ACK 수신 / 도달 확인 — 4종 모두 OK 시 ✓ 도달')}</div>${window.csvBtn('cm2-sess-tbody','control_signal_sessions','제어 세션 추적 (최근 20건)')}</div>
  <div style="overflow-x:auto"><table class="tbl" id="cm2-sess-tbl">
    <thead><tr><th>세션 ID</th><th>자원</th><th>프로토콜</th><th>상태</th><th>응답</th><th>CRC</th><th>ACK</th><th>도달</th></tr></thead>
    <tbody id="cm2-sess-tbody">
      <tr data-vpp="VPP-전남권" data-proto="Modbus TCP" data-stat="prog" data-lat="sla" data-int="ok"><td class="mono" style="font-size:9px">CTL-0089</td><td>광양항태양광</td><td class="mono" style="font-size:10px">Modbus TCP</td><td><span class="badge warn">진행중</span></td><td class="mono">0.12s</td><td>✓</td><td>⏳</td><td>—</td></tr>
      <tr data-vpp="VPP-전남권" data-proto="IEC-104" data-stat="prog" data-lat="sla" data-int="ok"><td class="mono" style="font-size:9px">CTL-0088</td><td>광양항4단계</td><td class="mono" style="font-size:10px">IEC-104</td><td><span class="badge warn">진행중</span></td><td class="mono">0.08s</td><td>✓</td><td>⏳</td><td>—</td></tr>
      <tr data-vpp="VPP-전남권" data-proto="Modbus TCP" data-stat="ok" data-lat="sla" data-int="ok"><td class="mono" style="font-size:9px">CTL-0087</td><td>전체 VPP-전남</td><td class="mono" style="font-size:10px">Modbus TCP</td><td><span class="badge ok">완료</span></td><td class="mono" style="color:#0a7">0.31s</td><td>✓</td><td>✓</td><td><span class="badge ok">✓</span></td></tr>
      <tr data-vpp="VPP-전남권" data-proto="Modbus TCP" data-stat="ok" data-lat="sla" data-int="ok"><td class="mono" style="font-size:9px">CTL-0086</td><td>광양항태양광</td><td class="mono" style="font-size:10px">Modbus TCP</td><td><span class="badge ok">완료</span></td><td class="mono" style="color:#0a7">0.28s</td><td>✓</td><td>✓</td><td><span class="badge ok">✓</span></td></tr>
      <tr data-vpp="VPP-제주권" data-proto="Modbus TCP" data-stat="warn" data-lat="over" data-int="ok"><td class="mono" style="font-size:9px">CTL-0085</td><td>금능1호 ESS</td><td class="mono" style="font-size:10px">Modbus TCP</td><td><span class="badge warn">지연</span></td><td class="mono" style="color:#e80">1.20s</td><td>✓</td><td>✓</td><td><span class="badge warn">△</span></td></tr>
      <tr data-vpp="VPP-제주권" data-proto="OCPP" data-stat="ok" data-lat="sla" data-int="ok"><td class="mono" style="font-size:9px">CTL-0084</td><td>제주V2G</td><td class="mono" style="font-size:10px">OCPP 1.6J</td><td><span class="badge ok">완료</span></td><td class="mono" style="color:#0a7">0.19s</td><td>✓</td><td>✓</td><td><span class="badge ok">✓</span></td></tr>
      <tr data-vpp="VPP-제주권" data-proto="Modbus TCP" data-stat="ok" data-lat="sla" data-int="ok"><td class="mono" style="font-size:9px">CTL-0083</td><td>온누리</td><td class="mono" style="font-size:10px">Modbus TCP</td><td><span class="badge ok">완료</span></td><td class="mono" style="color:#0a7">0.24s</td><td>✓</td><td>✓</td><td><span class="badge ok">✓</span></td></tr>
      <tr data-vpp="VPP-전남권" data-proto="IEC-104" data-stat="err" data-lat="over" data-int="err"><td class="mono" style="font-size:9px">CTL-0082</td><td>신안풍력</td><td class="mono" style="font-size:10px">IEC-104</td><td><span class="badge err">실패</span></td><td class="mono" style="color:#d32">Timeout</td><td><span style="color:#d32">✗</span></td><td><span style="color:#d32">✗</span></td><td><span class="badge err">✗</span></td></tr>
      <tr data-vpp="VPP-경북권" data-proto="Modbus TCP" data-stat="ok" data-lat="sla" data-int="ok"><td class="mono" style="font-size:9px">CTL-0081</td><td>포항S1</td><td class="mono" style="font-size:10px">Modbus TCP</td><td><span class="badge ok">완료</span></td><td class="mono" style="color:#0a7">0.22s</td><td>✓</td><td>✓</td><td><span class="badge ok">✓</span></td></tr>
      <tr data-vpp="VPP-전남권" data-proto="Modbus TCP" data-stat="ok" data-lat="sla" data-int="ok"><td class="mono" style="font-size:9px">CTL-0080</td><td>무안바이오</td><td class="mono" style="font-size:10px">Modbus TCP</td><td><span class="badge ok">완료</span></td><td class="mono" style="color:#0a7">0.35s</td><td>✓</td><td>✓</td><td><span class="badge ok">✓</span></td></tr>
    </tbody>
  </table></div>
</div>

<!-- 감사이력 페이지 안내 -->
<div class="card mb" style="border-left:3px solid var(--semantic-brand-primary);background:var(--semantic-brand-primary-assistive);padding:14px 18px;display:flex;align-items:center;justify-content:space-between;gap:12px">
  <div>
    <div style="font-size:13px;font-weight:600;margin-bottom:2px">통신 장애·재전송 이력은 감사이력 페이지에서 확인할 수 있습니다</div>
    <div style="font-size:12px;color:var(--semantic-label-alt);line-height:18px">SHA-256 무결성 해시로 5년간 영구 보관 · 시각·세션 ID·자원·실패 원인·재전송·최종 결과 통합 추적. 채널 인프라 상태(VPN·LTE·MQTT·DMZ)는 운영관제 알람 시스템에서 별도 통보됩니다.</div>
  </div>
  <button class="cb p sm" onclick="activate('his-aud')" style="white-space:nowrap;flex-shrink:0">감사이력 ↗</button>
</div>`;
window.cmonFilterApply=function(){
  var vpp=(document.getElementById('cm2-f-vpp')||{}).value||'';
  var pr=(document.getElementById('cm2-f-proto')||{}).value||'';
  var st=(document.getElementById('cm2-f-stat')||{}).value||'';
  var lt=(document.getElementById('cm2-f-lat')||{}).value||'';
  var it=(document.getElementById('cm2-f-int')||{}).value||'';
  var tb=document.getElementById('cm2-sess-tbody'); if(!tb)return;
  [].forEach.call(tb.querySelectorAll('tr'),function(tr){
    var ok=true;
    if(vpp && tr.getAttribute('data-vpp')!==vpp) ok=false;
    if(pr && tr.getAttribute('data-proto')!==pr) ok=false;
    if(st && tr.getAttribute('data-stat')!==st) ok=false;
    if(lt && tr.getAttribute('data-lat')!==lt) ok=false;
    if(it && tr.getAttribute('data-int')!==it) ok=false;
    tr.style.display=ok?'':'none';
  });
};

