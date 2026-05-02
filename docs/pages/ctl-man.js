// AUTO-GENERATED FROM index.html — page module: ctl-man
window.P = window.P || {};
/* ===== 클릭제어: 수동출력제어 ===== */
/* ===== 클릭제어: 수동출력제어 (RTU 즉시 전송 + 원거리 제어) ===== */
window.P['ctl-man']=()=>`
<!-- 경고 배너 -->
<div style="background:var(--semantic-tag-bg-red);border-left:3px solid var(--semantic-negative-normal);border-radius:6px;padding:10px 14px;margin-bottom:12px;display:flex;align-items:center;gap:10px;font-size:12px;line-height:18px">
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style="flex-shrink:0"><path d="M10 2L18 16H2L10 2z" stroke="var(--semantic-negative-normal)" stroke-width="1.5" stroke-linejoin="round"/><path d="M10 8v4M10 14v.5" stroke="var(--semantic-negative-normal)" stroke-width="1.5" stroke-linecap="round"/></svg>
  <div><b style="color:var(--semantic-negative-normal)">⚠️ 원거리 즉시 제어 · 실 설비에 영향</b> — UI 제어값이 <b>RTU(Modbus TCP)</b>를 통해 현장 발전소에 실시간 전송됩니다. 비상 상황 외에는 KPX 자동 제어를 우선하세요.</div>
</div>

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
      <span class="fbar-lbl">자원 유형</span>
      <select class="fbar-sel" id="cm-f-type" onchange="cmFilterApply()">
        <option value="all">전체</option><option>태양광</option><option>풍력</option><option>ESS</option><option>바이오</option><option>V2G</option>
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
  </div>
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
      <button class="cb n sm" onclick="cmAllStop()" style="color:var(--semantic-negative-normal)">🚨 All Stop</button>
      <button class="cb n sm" onclick="cmAllRestore()">전체 복원</button>
      ${window.csvBtn('cm-res-tbody','manual_control_grid','자원별 즉시 제어')}
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
      ['제주 ESS허브','ESS','VPP-제주권',-1420,5000,-28,'ON','정상',6],
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
      return `<tr data-type="${r[1].trim()}" data-vpp="${r[2]}" data-state="${r[6]}" data-comm="${r[7]}" data-cap="${r[4]}" data-name="${r[0]}"><td><b style="font-size:12px">${r[0]}</b></td><td><span class="badge ${r[1].trim()==='태양광'?'inf':''}" ${typeStyle?`style="${typeStyle}"`:''}>${r[1].trim()}</span></td><td style="font-size:12px">${r[2].replace('VPP-','').replace('권','')}</td><td class="mono">${r[3]>=0?'+':''}${r[3].toLocaleString()} kW<br><span style="font-size:10px;color:var(--semantic-label-alt)">/ ${r[4].toLocaleString()} kW</span></td><td style="min-width:160px"><div style="display:flex;align-items:center;gap:8px"><input type="range" min="0" max="100" value="${r[5]}" style="flex:1;max-width:100px" ${canControl?'':'disabled'} oninput="this.nextElementSibling.textContent=this.value+'%'"><span class="mono" style="font-weight:600;color:var(--semantic-brand-primary);min-width:38px">${r[5]}%</span></div></td><td><label class="toggle"><input type="checkbox" ${r[6]==='ON'?'checked':''} ${canControl?'':'disabled'} onchange="cmToggle(this)"><div class="ts"></div></label></td><td><span class="badge ${commCls}" style="font-size:11px">${r[7]}${r[8]?' '+r[8]+'ms':''}</span></td><td><div style="display:flex;gap:4px"><button class="cb p sm" ${canControl?'':'disabled'} onclick="cmSend(this)">전송</button><button class="cb n sm" ${canControl?'':'disabled'} onclick="cmRowRestore(this)">↻</button></div></td></tr>`;
    }).join('')}
    </tbody>
  </table></div>
  <div style="font-size:11px;color:var(--semantic-label-alt);margin-top:10px;line-height:18px">
    ⚠️ 통신 단절 자원(전남 V2G 허브)은 제어 불가 · 금능1호 태양광은 지연 상태 — 응답시간 주의<br>
    ※ 슬라이더 조정 후 [전송] 클릭 시 즉시 RTU로 Modbus TCP 명령 전송 (응답 0.3초 이내)
  </div>
</div>

<!-- 감사이력 페이지 안내 -->
<div class="card mb" style="border-left:3px solid var(--semantic-brand-primary);background:var(--semantic-brand-primary-assistive);padding:14px 18px;display:flex;align-items:center;justify-content:space-between;gap:12px">
  <div>
    <div style="font-size:13px;font-weight:600;margin-bottom:2px">제어 명령 이력은 감사이력 페이지에서 확인할 수 있습니다</div>
    <div style="font-size:12px;color:var(--semantic-label-alt);line-height:18px">모든 제어 명령은 SHA-256 무결성 해시로 5년간 영구 보관됩니다. 운영자·시각·대상 자원·설정값·응답시간·결과를 통합 추적합니다.</div>
  </div>
  <button class="cb p sm" onclick="activate('his-aud')" style="white-space:nowrap;flex-shrink:0">감사이력 ↗</button>
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
      const slider=tr.querySelector('input[type="range"]');
      const sliderVal=slider?parseInt(slider.value,10):100;
      if(state==='ON (가동)' && st!=='ON')show=false;
      else if(state==='OFF (정지)' && st!=='OFF')show=false;
      else if(state==='제어 중'){
        // 제어 중 = ON 상태이며 슬라이더 100 미만 (운영자 감발)
        if(st!=='ON' || sliderVal===100) show=false;
      }
      else if(state==='이상'){
        // 이상 = 통신 지연/단절 (정상 통신은 제외)
        const c=tr.dataset.comm;
        if(c!=='지연' && c!=='단절') show=false;
      }
    }
    if(comm!=='전체' && tr.dataset.comm!==comm)show=false;
    tr.style.display=show?'':'none';
    if(show)visible++;
  });
  const cnt=document.getElementById('cm-res-cnt');
  if(cnt)cnt.textContent=visible+'건';
};

// ===== 즉시 제어 인터랙션 (All Stop / 전체 복원 / 행별 전송·복원·토글) =====
function _cmRowSetSlider(tr,val){
  const slider=tr.querySelector('input[type="range"]');
  if(!slider) return;
  slider.value=val;
  const span=slider.nextElementSibling;
  if(span) span.textContent=val+'%';
}
function _cmRowSetOutputCell(tr,kw,cap){
  const cell=tr.cells[3];
  if(!cell) return;
  const sign=kw>=0?'+':'';
  cell.innerHTML=sign+kw.toLocaleString()+' kW<br><span style="font-size:10px;color:var(--semantic-label-alt)">/ '+cap.toLocaleString()+' kW</span>';
}

window.cmAllStop=function(){
  if(!confirm('🚨 비상 All Stop 실행\n\n모든 활성 자원의 출력을 0%로 즉시 차단하고 OFF 상태로 전환합니다.\n실 설비에 즉시 영향을 미치며 KPX 자동 제어를 일시 차단합니다.\n\n계속하시겠습니까?')) return;
  const rows=document.querySelectorAll('#cm-res-tbody tr[data-type]');
  let cnt=0;
  rows.forEach(tr=>{
    if(tr.dataset.comm==='단절') return; // 통신 단절 자원은 제어 불가
    _cmRowSetSlider(tr,0);
    const toggle=tr.querySelector('input[type="checkbox"]');
    if(toggle){ toggle.checked=false; }
    const slider=tr.querySelector('input[type="range"]');
    if(slider) slider.disabled=true;
    tr.dataset.state='OFF';
    const cap=parseInt(tr.dataset.cap,10)||0;
    _cmRowSetOutputCell(tr,0,cap);
    cnt++;
  });
  toast('🚨 All Stop 실행 완료 — '+cnt+'개 자원 출력 차단','warn');
};

window.cmAllRestore=function(){
  if(!confirm('전체 100% 복원\n\n모든 활성 자원을 정격 출력 100%로 복원합니다.\n계속하시겠습니까?')) return;
  const rows=document.querySelectorAll('#cm-res-tbody tr[data-type]');
  let cnt=0;
  rows.forEach(tr=>{
    if(tr.dataset.comm==='단절') return;
    _cmRowSetSlider(tr,100);
    const toggle=tr.querySelector('input[type="checkbox"]');
    if(toggle){ toggle.checked=true; }
    const slider=tr.querySelector('input[type="range"]');
    if(slider) slider.disabled=false;
    tr.dataset.state='ON';
    const cap=parseInt(tr.dataset.cap,10)||0;
    _cmRowSetOutputCell(tr,cap,cap);
    cnt++;
  });
  toast('전체 복원 완료 — '+cnt+'개 자원 100% 출력');
};

window.cmSend=function(btn){
  const tr=btn.closest('tr');
  if(!tr) return;
  const slider=tr.querySelector('input[type="range"]');
  if(!slider){ toast('슬라이더를 찾을 수 없습니다','err'); return; }
  const target=parseInt(slider.value,10);
  const cap=parseInt(tr.dataset.cap,10);
  if(isNaN(cap)){ toast('정격 용량 정보가 없습니다','err'); return; }
  // 음수 출력(ESS 충전) 자원은 충/방전 모드 시뮬 — 슬라이더 0~100을 정격에 매핑
  // 단순화: target% × 정격 kW (양의 출력만 계산)
  const newKw=Math.round(cap*target/100);
  _cmRowSetOutputCell(tr,newKw,cap);
  // 통신 응답 시뮬 (배지 응답시간 갱신)
  const respMs=Math.floor(200+Math.random()*200); // 200~400ms
  const commCell=tr.cells[6];
  if(commCell){
    const badge=commCell.querySelector('.badge');
    if(badge){
      const c=tr.dataset.comm;
      const cls=c==='정상'?'ok':c==='지연'?'warn':'err';
      badge.className='badge '+cls;
      badge.textContent=c+' '+respMs+'ms';
    }
  }
  const name=tr.dataset.name||'자원';
  toast(name+' RTU 전송 완료 → '+target+'% ('+newKw.toLocaleString()+' kW · '+respMs+'ms)');
};

window.cmRowRestore=function(btn){
  const tr=btn.closest('tr');
  if(!tr) return;
  const slider=tr.querySelector('input[type="range"]');
  if(slider) slider.disabled=false;
  _cmRowSetSlider(tr,100);
  const toggle=tr.querySelector('input[type="checkbox"]');
  if(toggle) toggle.checked=true;
  tr.dataset.state='ON';
  const cap=parseInt(tr.dataset.cap,10)||0;
  _cmRowSetOutputCell(tr,cap,cap);
  const name=tr.dataset.name||'자원';
  toast(name+' 100% 복원 완료');
};

window.cmToggle=function(checkbox){
  const tr=checkbox.closest('tr');
  if(!tr) return;
  const slider=tr.querySelector('input[type="range"]');
  const cap=parseInt(tr.dataset.cap,10)||0;
  if(checkbox.checked){
    // ON 전환 → 슬라이더 활성화 + 100%
    if(slider){ slider.disabled=false; }
    _cmRowSetSlider(tr,100);
    tr.dataset.state='ON';
    _cmRowSetOutputCell(tr,cap,cap);
  } else {
    // OFF 전환 → 슬라이더 0% + 비활성화
    _cmRowSetSlider(tr,0);
    if(slider) slider.disabled=true;
    tr.dataset.state='OFF';
    _cmRowSetOutputCell(tr,0,cap);
  }
  const name=tr.dataset.name||'자원';
  toast(name+(checkbox.checked?' ON':' OFF')+' 전환');
};

