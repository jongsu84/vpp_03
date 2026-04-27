// AUTO-GENERATED FROM index.html — page module: ctl-mon
window.P = window.P || {};
/* ===== 클릭제어: 제어신호 모니터링 (패킷 무결성 · ACK · 0.5s SLA) ===== */
window.P['ctl-mon']=()=>`
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

<!-- KPI 6종 -->
<div class="g6" style="display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin-bottom:12px">
  <div class="card acc"><div class="ct">활성 세션 ${window.tip('활성 제어 세션','현재 처리 중인 제어 명령 세션 수','진행중 + 완료 미확인 세션 합계','동시 다중 세션 정상 — 평균 1~3개 / 5개 이상은 부하 점검 필요')}</div><div class="kv">3<span class="ku">개</span></div></div>
  <div class="card"><div class="ct">평균 응답 지연 ${window.tip('평균 응답 지연','SCADA 명령 송신 → ACK 수신까지의 평균 왕복 시간','Σ(ACK 시각 - 송신 시각) ÷ N [s] · 24시간 기준','중앙값(p50): 0.28s / p95: 0.42s / p99: 0.85s — 이상 시 RTU 통신 점검')}</div><div class="kv" style="color:#0a7">0.31<span class="ku">s</span></div><div class="kd neu">중앙값 0.28s</div></div>
  <div class="card"><div class="ct">500ms SLA 준수율 ${window.tip('500ms SLA 준수율','응답 지연이 500ms 이내인 비율','COUNT(지연 ≤ 500ms) ÷ COUNT(*) × 100 [%]','준중앙급전 SLA: 99% 이상 / 미달 시 보상금 차감 대상')}</div><div class="kv" style="color:#0a7">99.4<span class="ku">%</span></div><div class="kd up">24h</div></div>
  <div class="card"><div class="ct">패킷 무결성 (CRC) ${window.tip('패킷 무결성 (CRC)','CRC 검증을 통과한 패킷 비율','CRC 일치 패킷 ÷ 전체 패킷 × 100 [%]','100% 정상 / 99% 미만 시 통신 라인 노이즈 또는 RTU 펌웨어 점검')}</div><div class="kv" style="color:#0a7">100<span class="ku">%</span></div><div class="kd neu">3,842 / 3,842</div></div>
  <div class="card"><div class="ct">ACK 응답률 ${window.tip('ACK 응답률','명령 송신 후 정상 ACK를 받은 비율','ACK 수신 ÷ 송신 패킷 × 100 [%]','99.5% 이상 정상 / 미수신 시 자동 재전송 (최대 3회)')}</div><div class="kv" style="color:#0a7">99.7<span class="ku">%</span></div><div class="kd neu">재전송 2건</div></div>
  <div class="card"><div class="ct">제어 실패 (24h) ${window.tip('24시간 제어 실패 건수','3회 재전송에도 실패한 제어 명령 건수','COUNT(*) WHERE 최종 결과 = 실패','즉시 현장 점검 — 통신 단절·장비 오프라인·전원 장애 가능성')}</div><div class="kv" style="color:#d32">1<span class="ku">건</span></div><div class="kd down">CTL-0085 타임아웃</div></div>
</div>

<!-- 종단간 지연 추이 차트 -->
<div class="card mb">
  <div class="sh">
    <div class="st">종단간 지연 추이 (최근 30분) <span class="tip">ⓘ 500ms SLA 기준선 · 명령 송신 → ACK 수신까지</span></div>
    <div style="display:flex;gap:12px;font-size:10px;color:#666">
      <span><span style="display:inline-block;width:10px;height:3px;background:#0059ff;vertical-align:middle"></span> E2E 지연</span>
      <span><span style="display:inline-block;width:10px;height:3px;background:#d32;vertical-align:middle;border-top:2px dashed #d32"></span> 500ms SLA</span>
    </div>
  </div>
  <div style="height:160px;position:relative"><canvas id="c-latency" role="img" aria-label="지연 추이"></canvas></div>
</div>

<!-- 활성 제어 세션 (상세) + 패킷 무결성 -->
<div class="g2">
  <div class="card mb">
    <div class="sh"><div class="st">제어 세션 추적 (최근 20건)</div>${window.csvBtn('cm2-sess-tbody','control_signal_sessions','제어 세션 추적 (최근 20건)')}</div>
    <table class="tbl" id="cm2-sess-tbl">
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
    </table>
  </div>

  <div class="card mb">
    <div class="sh"><div class="st">패킷 무결성 & ACK 모니터 (실시간)</div></div>
    <table class="tbl" style="margin-bottom:10px">
      <thead><tr><th>항목</th><th>값</th><th>상태</th></tr></thead>
      <tbody>
        <tr><td>송신 패킷 (24h)</td><td class="mono">3,842</td><td><span class="badge ok">정상</span></td></tr>
        <tr><td>CRC 검증 성공</td><td class="mono" style="color:#0a7">3,842 / 3,842</td><td><span class="badge ok">100%</span></td></tr>
        <tr><td>CRC 오류</td><td class="mono">0</td><td><span class="badge ok">정상</span></td></tr>
        <tr><td>ACK 수신</td><td class="mono" style="color:#0a7">3,830 / 3,842</td><td><span class="badge ok">99.69%</span></td></tr>
        <tr><td>ACK 타임아웃</td><td class="mono" style="color:#d32">2 / 3,842</td><td><span class="badge err">0.05%</span></td></tr>
        <tr><td>재전송 성공</td><td class="mono">10 / 12</td><td><span class="badge ok">83.3%</span></td></tr>
        <tr><td>평균 ACK 지연</td><td class="mono">0.18s</td><td><span class="badge ok">SLA 이내</span></td></tr>
        <tr><td>최대 ACK 지연</td><td class="mono">1.45s</td><td><span class="badge warn">SLA 초과</span></td></tr>
      </tbody>
    </table>
    <div class="form-section" style="font-size:11px;color:#555">채널 상태</div>
    <div class="mr"><div class="ml">VPN 터널</div><div class="mv"><span class="badge ok">정상</span></div></div>
    <div class="mr"><div class="ml">LTE 신호 (평균)</div><div class="mv mono">-72 dBm</div></div>
    <div class="mr"><div class="ml">포트 502 (Modbus)</div><div class="mv"><span class="badge ok">열림</span></div></div>
    <div class="mr"><div class="ml">포트 2404 (IEC-104)</div><div class="mv"><span class="badge ok">열림</span></div></div>
    <div class="mr"><div class="ml">MQTT 브로커</div><div class="mv"><span class="badge ok">연결</span></div></div>
    <div class="mr" style="border:none"><div class="ml">DMZ 프록시</div><div class="mv"><span class="badge ok">정상</span></div></div>
  </div>
</div>

<!-- 실패/재전송 이력 -->
<div class="card mb">
  <div class="sh"><div class="st">패킷 실패 · 재전송 이력 (24h)</div></div>
  <table class="tbl" data-no-sort="1">
    <thead><tr><th>시각</th><th>세션</th><th>자원</th><th>실패 원인</th><th>재전송</th><th>최종 결과</th><th>조치</th></tr></thead>
    <tbody>
      <tr><td class="mono">14:18:22</td><td class="mono">CTL-0082</td><td>신안풍력</td><td><span class="badge err">ACK 타임아웃 (3s)</span></td><td class="mono">3회</td><td><span class="badge err">실패</span></td><td>현장 점검 요청</td></tr>
      <tr><td class="mono">11:42:08</td><td class="mono">CTL-0073</td><td>금능1호 ESS</td><td><span class="badge warn">응답 지연 (1.2s)</span></td><td class="mono">1회</td><td><span class="badge ok">복구</span></td><td>자동 재전송</td></tr>
      <tr><td class="mono">09:05:41</td><td class="mono">CTL-0059</td><td>광양항4단계</td><td><span class="badge warn">패킷 지연</span></td><td class="mono">1회</td><td><span class="badge ok">복구</span></td><td>자동 재전송</td></tr>
      <tr><td class="mono">04:28:19</td><td class="mono">CTL-0031</td><td>김주풍력</td><td><span class="badge warn">LTE 신호 저하</span></td><td class="mono">2회</td><td><span class="badge ok">복구</span></td><td>재라우팅</td></tr>
    </tbody>
  </table>
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
window['I_ctl-mon']=function(){
  const lat=Array.from({length:30},()=>+(0.18+Math.random()*0.22).toFixed(2));
  lat[14]=1.2;lat[15]=0.95;lat[22]=0.68;
  mkChart('c-latency','line',Array.from({length:30},(_,i)=>i+'m'),[
    {data:lat,label:'E2E 지연',borderColor:'#0059ff',borderWidth:1.5,pointRadius:0,tension:0.3,fill:true,backgroundColor:'rgba(37,99,235,0.07)'},
    {data:Array(30).fill(0.5),label:'500ms SLA',borderColor:'#d32',borderWidth:1.5,borderDash:[4,4],pointRadius:0,fill:false}
  ],{scales:{y:{min:0,max:1.5,title:{display:true,text:'초(s)',color:'#666666',font:{size:9}}}}});
};

