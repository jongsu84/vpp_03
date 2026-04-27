// AUTO-GENERATED FROM index.html — page module: ctl-man
window.P = window.P || {};
/* ===== 클릭제어: 수동출력제어 ===== */
/* ===== 클릭제어: 수동출력제어 (RTU 즉시 전송 + 원거리 제어) ===== */
window.P['ctl-man']=()=>`
<!-- 최상위 필터 바 -->
<div class="card fbar" style="margin-bottom:12px">
  <div class="fbar-row">
    <div class="fbar-item">
      <span class="fbar-lbl">VPP 그룹</span>
      <select class="fbar-sel" id="cm-f-vpp" onchange="cmFilterApply()">
        <option>전체</option><option>VPP-전남권</option><option>VPP-제주권</option><option>VPP-경북권</option>
      </select>
    </div>
    <div class="fbar-item">
      <span class="fbar-lbl">운전 상태</span>
      <select class="fbar-sel" id="cm-f-state" onchange="cmFilterApply()">
        <option>전체</option><option>ON (가동)</option><option>OFF (정지)</option><option>제어 중</option><option>이상</option>
      </select>
    </div>
    <div class="fbar-item">
      <span class="fbar-lbl">통신 상태</span>
      <select class="fbar-sel" id="cm-f-comm" onchange="cmFilterApply()">
        <option>전체</option><option>정상</option><option>지연</option><option>단절</option>
      </select>
    </div>
    <div class="fbar-item">
      <span class="fbar-lbl">자원 유형</span>
      <select class="fbar-sel" id="cm-f-type" onchange="cmFilterApply()">
        <option value="all">전체</option><option>태양광</option><option>풍력</option><option>ESS</option><option>바이오</option><option>V2G</option>
      </select>
    </div>
    <div class="fbar-item">
      <span class="fbar-lbl">제어 권한</span>
      <select class="fbar-sel" id="cm-f-auth" onchange="cmFilterApply()">
        <option>전체</option><option>Lv.2 수동제어 이상</option><option>Lv.3 비상정지 전용</option>
      </select>
    </div>
  </div>
</div>

<!-- 경고 배너 -->
<div style="background:var(--semantic-tag-bg-red);border-left:3px solid var(--semantic-negative-normal);border-radius:6px;padding:10px 14px;margin-bottom:12px;display:flex;align-items:center;gap:10px;font-size:12px;line-height:18px">
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style="flex-shrink:0"><path d="M10 2L18 16H2L10 2z" stroke="var(--semantic-negative-normal)" stroke-width="1.5" stroke-linejoin="round"/><path d="M10 8v4M10 14v.5" stroke="var(--semantic-negative-normal)" stroke-width="1.5" stroke-linecap="round"/></svg>
  <div><b style="color:var(--semantic-negative-normal)">⚠️ 원거리 즉시 제어 · 실 설비에 영향</b> — UI 제어값이 <b>RTU(Modbus TCP)</b>를 통해 현장 발전소에 실시간 전송됩니다. 비상 상황 외에는 KPX 자동 제어를 우선하세요.</div>
</div>

<!-- KPI 5종 -->
<div class="g5">
  <div class="card acc"><div class="ct">제어 가능 자원 ${window.tip('제어 가능 자원','원격 제어가 가능한 자원 수 / 전체 자원 수','자원 동의 + 통신 정상 + 운전 상태 OK','정비 중 또는 통신 단절 자원은 제외 / 100%(13/13) 유지 권장')}</div><div class="kv">11<span class="ku">/13개소</span></div><div class="kd neu">원격 제어 동의 + 통신 정상</div></div>
  <div class="card"><div class="ct">ON 상태 ${window.tip('ON 상태 자원','현재 출력을 내고 있는 자원 수','출력 > 0 인 자원 카운트','태양광은 일조 시간 동안만 ON / ESS는 운영 모드에 따라 변동')}</div><div class="kv" style="color:var(--semantic-positive-normal)">10<span class="ku">개소</span></div><div class="kd up">가동 중</div></div>
  <div class="card"><div class="ct">OFF 상태 ${window.tip('OFF 상태 자원','현재 출력 0인 자원 수','출력 = 0 인 자원 카운트','정비 / 수동 정지 / 일조 부족(태양광) / 풍속 부족(풍력)')}</div><div class="kv" style="color:var(--semantic-label-alt)">2<span class="ku">개소</span></div><div class="kd neu">정비 1 · 수동 1</div></div>
  <div class="card"><div class="ct">제어 중 ${window.tip('제어 중 자원','운영자가 출력 감축 또는 ON/OFF를 명령한 상태','수동 제어 활성 자원 수','자동 모드로 복원 가능 — 복원 시간(분)은 출력제어설정 참조')}</div><div class="kv" style="color:var(--semantic-brand-primary)">1<span class="ku">개소</span></div><div class="kd neu">광양항 01 · 70%</div></div>
  <div class="card"><div class="ct">금일 제어 건수 ${window.tip('금일 제어 건수','금일 운영자가 발송한 제어 명령 횟수','COUNT(*) WHERE date = today','이행률은 명령 대비 실제 RTU 응답 비율 — 95% 이상 정상')}</div><div class="kv">14<span class="ku">건</span></div><div class="kd neu">이행률 92.9%</div></div>
</div>

<!-- 자원별 즉시 제어 그리드 -->
<div class="card mb">
  <div class="sh">
    <div class="st">자원별 즉시 제어 <span id="cm-res-cnt" style="font-size:11px;font-weight:400;color:var(--semantic-label-alt);margin-left:8px">11건</span></div>
    <div style="display:flex;gap:6px;align-items:center">
      ${window.csvBtn('cm-res-tbody','manual_control_grid','자원별 즉시 제어')}
      <button class="cb n sm" onclick="toast('비상 All Stop — 확인 필요')" style="color:var(--semantic-negative-normal)">🚨 All Stop</button>
      <button class="cb n sm" onclick="toast('전체 100% 복원')">전체 복원</button>
    </div>
  </div>
  <div style="overflow-x:auto"><table class="tbl">
    <thead><tr><th>자원명</th><th>유형</th><th>VPP</th><th>현재 출력</th><th>목표 (%)</th><th>ON/OFF</th><th>통신</th><th>제어 명령</th></tr></thead>
    <tbody id="cm-res-tbody">
    ${[
      ['광양항태양광 01단계','태양광','VPP-전남권',2180,2293,70,'ON','정상',12],
      ['광양항태양광 04단계','태양광','VPP-전남권',2090,2199,100,'ON','정상',11],
      ['해맞이 태양광','태양광','VPP-전남권',950,996,100,'ON','정상',14],
      ['온누리 태양광','태양광','VPP-전남권',940,996,100,'ON','정상',13],
      ['금능1호 태양광','태양광','VPP-제주권',720,980,100,'ON','지연',null],
      ['김주풍력 01단계','풍력','VPP-경북권',3720,4000,100,'ON','정상',8],
      ['김주풍력 02단계','풍력','VPP-경북권',9500,10000,100,'ON','정상',9],
      ['금능1호 ESS','ESS','VPP-제주권',1760,2000,88,'ON','정상',5],
      ['제주 ESS허브',' ESS','VPP-제주권',-1420,5000,-28,'ON','정상',6],
      ['순천 바이오가스','바이오','VPP-전남권',1400,1500,100,'ON','정상',4],
      ['여수 바이오매스','바이오','VPP-전남권',2850,3000,100,'ON','정상',4],
      ['광주 V2G 스테이션','V2G','VPP-전남권',700,800,90,'ON','정상',12],
      ['전남 V2G 허브','V2G','VPP-전남권',0,1500,0,'OFF','단절',null],
    ].map((r,i)=>{
      const typeStyle=r[1].trim()==='태양광'?'':r[1].trim()==='풍력'?'background:var(--semantic-tag-bg-blue);color:var(--semantic-tag-label-blue)':r[1].trim()==='ESS'?'background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow)':r[1].trim()==='바이오'?'background:#e8defa;color:#6035cc':r[1].trim()==='V2G'?'background:var(--semantic-tag-bg-green);color:var(--semantic-tag-label-green)':'';
      const commCls=r[7]==='정상'?'ok':r[7]==='지연'?'warn':'err';
      const onCls=r[6]==='ON'?'ok':'off';
      const ratio=(r[3]/r[4]*100).toFixed(0);
      const canControl=r[7]!=='단절';
      return `<tr data-type="${r[1].trim()}" data-vpp="${r[2]}" data-state="${r[6]}" data-comm="${r[7]}"><td><b style="font-size:12px">${r[0]}</b></td><td><span class="badge ${r[1].trim()==='태양광'?'inf':''}" ${typeStyle?`style="${typeStyle}"`:''}>${r[1].trim()}</span></td><td style="font-size:12px">${r[2].replace('VPP-','').replace('권','')}</td><td class="mono">${r[3]>=0?'+':''}${r[3].toLocaleString()} kW<br><span style="font-size:10px;color:var(--semantic-label-alt)">/ ${r[4].toLocaleString()} kW</span></td><td style="min-width:160px"><div style="display:flex;align-items:center;gap:8px"><input type="range" min="0" max="100" value="${r[5]}" style="flex:1;max-width:100px" ${canControl?'':'disabled'} oninput="this.nextElementSibling.textContent=this.value+'%'"><span class="mono" style="font-weight:600;color:var(--semantic-brand-primary);min-width:38px">${r[5]}%</span></div></td><td><label class="toggle"><input type="checkbox" ${r[6]==='ON'?'checked':''} ${canControl?'':'disabled'}><div class="ts"></div></label></td><td><span class="badge ${commCls}" style="font-size:11px">${r[7]}${r[8]?' '+r[8]+'ms':''}</span></td><td><div style="display:flex;gap:4px"><button class="cb p sm" ${canControl?'':'disabled'} onclick="toast('${r[0]} 제어 명령 RTU 전송')">전송</button><button class="cb n sm" onclick="toast('${r[0]} 100% 복원')">↻</button></div></td></tr>`;
    }).join('')}
    </tbody>
  </table></div>
  <div style="font-size:11px;color:var(--semantic-label-alt);margin-top:10px;line-height:18px">
    ⚠️ 통신 단절 자원(전남 V2G 허브)은 제어 불가 · 금능1호 태양광은 지연 상태 — 응답시간 주의<br>
    ※ 슬라이더 조정 후 [전송] 클릭 시 즉시 RTU로 Modbus TCP 명령 전송 (응답 0.3초 이내)
  </div>
</div>

<!-- 제어 신호 피드백 + 최근 제어 이력 -->
<div class="g2">
  <div class="card mb"><div class="sh"><div class="st">RTU 통신 로그 (실시간)</div><span class="kpi-pill" style="font-size:11px">Modbus TCP</span></div>
    <div style="background:var(--semantic-background-2);border-radius:5px;padding:12px;font-family:var(--mono);font-size:11px;line-height:1.8">
      <div style="color:var(--semantic-brand-primary)">[14:23:01] SESSION: CTL-20260419-0087</div>
      <div style="color:var(--semantic-label-alt)">  └ USER: 이제어 (Lv.2 운영관리자)</div>
      <div style="color:var(--semantic-label-alt)">  └ TARGET: 광양항태양광 01단계</div>
      <div style="color:var(--semantic-label-alt)">TX → MODBUS WRITE FC16: 0x0041 = 4480 (70%)</div>
      <div style="color:var(--semantic-label-alt)">  → RTU [10.20.5.21 : 502] via KT 게이트웨이</div>
      <div style="color:var(--semantic-positive-normal)">[14:23:02] ACK ✓ 응답시간 0.31s</div>
      <div style="color:var(--semantic-brand-primary)">[14:23:05] FEEDBACK: 실측 1,605 kW → TARGET 도달 ✓</div>
      <div style="color:var(--semantic-label-alt)">  └ 편차 2.2% · Ramp-rate 2.4 MW/min (준수)</div>
      <div style="color:var(--semantic-label-alt)">[14:23:10] AUDIT: 제어 이력 감사 로그 기록 완료</div>
      <div style="color:var(--semantic-label-alt)">  └ SHA-256: a3f91c82b04d...</div>
    </div>
    <div style="font-size:11px;color:var(--semantic-label-alt);margin-top:8px">※ 모든 제어 명령은 감사 로그 영구 보관 (5년)</div>
  </div>
  <div class="card mb"><div class="sh"><div class="st">최근 제어 이력 (24h)</div>${window.csvBtn('cm-ctrl-hist-tbody','manual_control_history_24h','최근 제어 이력 (24h)')}</div>
    <div style="overflow-x:auto"><table class="tbl">
      <thead><tr><th>일시</th><th>운영자</th><th>대상</th><th>설정값</th><th>응답</th><th>결과</th></tr></thead><tbody id="cm-ctrl-hist-tbody">
      <tr><td class="mono" style="font-size:11px">14:23:05</td><td>이제어</td><td>광양항태양광 01</td><td class="mono">70%</td><td class="mono" style="color:var(--semantic-positive-normal)">0.31s</td><td><span class="badge ok">성공</span></td></tr>
      <tr><td class="mono" style="font-size:11px">14:00:07</td><td>(system)</td><td>전체 (5개소)</td><td class="mono">95%</td><td class="mono" style="color:var(--semantic-positive-normal)">0.42s</td><td><span class="badge ok">성공</span></td></tr>
      <tr><td class="mono" style="font-size:11px">13:30:12</td><td>이제어</td><td>광양항태양광 04</td><td class="mono">85%</td><td class="mono" style="color:var(--semantic-positive-normal)">0.28s</td><td><span class="badge ok">성공</span></td></tr>
      <tr><td class="mono" style="font-size:11px">12:15:44</td><td>김발전</td><td>금능1호 태양광</td><td class="mono">100%</td><td class="mono" style="color:var(--palette-yellow-40)">1.82s</td><td><span class="badge warn">지연</span></td></tr>
      <tr><td class="mono" style="font-size:11px">11:00:08</td><td>김운영</td><td>전남 V2G 허브</td><td class="mono">OFF</td><td class="mono">—</td><td><span class="badge off">정비 전환</span></td></tr>
      <tr><td class="mono" style="font-size:11px">09:55:33</td><td>이제어</td><td>제주 ESS허브</td><td class="mono">충전 시작</td><td class="mono" style="color:var(--semantic-positive-normal)">0.18s</td><td><span class="badge ok">성공</span></td></tr>
    </tbody></table></div>
  </div>
</div>

`;
window.cmFilterApply=function(){
  const vpp=document.getElementById('cm-f-vpp')?.value||'전체';
  const type=document.getElementById('cm-f-type')?.value||'all';
  const state=document.getElementById('cm-f-state')?.value||'전체';
  const comm=document.getElementById('cm-f-comm')?.value||'전체';
  const rows=document.querySelectorAll('#cm-res-tbody tr[data-type]');
  let visible=0;
  rows.forEach(tr=>{
    let show=true;
    if(type!=='all' && tr.dataset.type!==type)show=false;
    if(vpp!=='전체' && tr.dataset.vpp!==vpp)show=false;
    if(state!=='전체'){
      const st=tr.dataset.state;
      if(state==='ON (가동)' && st!=='ON')show=false;
      if(state==='OFF (정지)' && st!=='OFF')show=false;
    }
    if(comm!=='전체' && tr.dataset.comm!==comm)show=false;
    tr.style.display=show?'':'none';
    if(show)visible++;
  });
  const cnt=document.getElementById('cm-res-cnt');
  if(cnt)cnt.textContent=visible+'건';
};

