// AUTO-GENERATED FROM index.html — page module: cfg-grp
window.P = window.P || {};
/* ===== 설정: 그룹관리 ===== */
window.P['cfg-grp']=()=>`
<!-- 최상위 필터 바 (분류 → 상태 → 세부) -->
<div class="card fbar"><div class="fbar-row">
  <div class="fbar-item"><label class="flabel">그룹 유형</label>
    <select class="fbar-sel" id="cgr-f-type" onchange="cfgGrpFilterApply()">
      <option value="">전체</option><option>집합자원</option><option>지역별</option><option>관리업체별</option>
    </select></div>
  <div class="fbar-item"><label class="flabel">상태</label>
    <select class="fbar-sel" id="cgr-f-stat" onchange="cfgGrpFilterApply()">
      <option value="">전체</option><option>운영중</option><option>일시정지</option>
    </select></div>
  <div class="fbar-item"><label class="flabel">담당 운영자</label>
    <select class="fbar-sel" id="cgr-f-mgr" onchange="cfgGrpFilterApply()">
      <option value="">전체</option><option>김운영</option><option>이제어</option><option>박기술</option>
    </select></div>
  <div class="fbar-item"><label class="flabel">용량</label>
    <select class="fbar-sel" id="cgr-f-cap" onchange="cfgGrpFilterApply()">
      <option value="">전체</option><option value="small">~ 5 MW</option><option value="mid">5 ~ 10 MW</option><option value="big">10 MW 이상</option>
    </select></div>
  <div class="fbar-item"><label class="flabel">일괄 제어</label>
    <select class="fbar-sel" id="cgr-f-ctrl" onchange="cfgGrpFilterApply()">
      <option value="">전체</option><option>허용</option><option>불가</option>
    </select></div>
</div></div>

<div class="g4">
  <div class="card acc"><div class="ct">전체 그룹 ${window.tip('전체 그룹','등록된 모든 자원 그룹 수','COUNT(*) FROM groups','집합자원·지역별·관리업체별 등 다양한 그룹 단위로 관리')}</div><div class="kv" id="grp-total">8<span class="ku">개</span></div></div>
  <div class="card"><div class="ct">집합자원(입찰용) ${window.tip('집합자원 그룹','KPX 입찰을 위해 묶인 자원 그룹','유형 = 집합자원(입찰용)','VPP-전남권·제주권·경북권 등 — 그룹 단위로 입찰 제출 (DA + RT)')}</div><div class="kv">3<span class="ku">개</span></div></div>
  <div class="card"><div class="ct">지역별 그룹 ${window.tip('지역별 그룹','지리적 위치 기반 자원 그룹','유형 = 지역별','지역 단위 모니터링·정비 일정 관리에 사용 (입찰 단위 아님)')}</div><div class="kv">4<span class="ku">개</span></div></div>
  <div class="card"><div class="ct">일시정지 그룹 ${window.tip('일시정지 그룹','입찰 또는 운영이 일시 중단된 그룹 수','상태 = 일시정지','계획 정비 / 시장 환경 / 정책 변경 등 사유 — 재개 시 KPX에 통보 필요')}</div><div class="kv" style="color:var(--acc3)">1<span class="ku">개</span></div></div>
</div>
<div class="g2">
  <div class="card mb">
    <div class="sh"><div class="st">그룹 목록</div>
      <div style="display:flex;gap:6px;align-items:center">
        ${window.csvBtn('grp-tbody','group_master','그룹 목록')}
        <button class="cb p" style="font-size:10px" onclick="openModal('modal-grp-add')">그룹 생성</button>
      </div>
    </div>
    <table class="tbl"><thead><tr><th>그룹명</th><th>유형</th><th>발전소 수</th><th>총 용량</th><th>상태</th></tr></thead>
    <tbody id="grp-tbody">
      <tr onclick="grpSelect('VPP-전남권','집합자원(입찰)','DA + RT','11.5 MW','허용','김운영',event)" style="cursor:pointer"><td>VPP-전남권</td><td>집합자원</td><td>9개소</td><td class="mono">11.5MW</td><td><span class="badge ok">운영중</span></td></tr>
      <tr onclick="grpSelect('VPP-제주권','집합자원(입찰)','DA + RT','1.1 MW','허용','이제어',event)" style="cursor:pointer"><td>VPP-제주권</td><td>집합자원</td><td>3개소</td><td class="mono">1.1MW</td><td><span class="badge warn">일시정지</span></td></tr>
      <tr onclick="grpSelect('VPP-경북권','집합자원(입찰)','DA + RT','10.2 MW','허용','김운영',event)" style="cursor:pointer"><td>VPP-경북권</td><td>집합자원</td><td>12개소</td><td class="mono">10.2MW</td><td><span class="badge ok">운영중</span></td></tr>
      <tr onclick="grpSelect('지역-전남','지역별','—','11.5 MW','허용','이제어',event)" style="cursor:pointer"><td>지역-전남</td><td>지역별</td><td>9개소</td><td class="mono">11.5MW</td><td><span class="badge ok">운영중</span></td></tr>
    </tbody></table>
  </div>
  <div class="card mb" id="grp-detail-card">
    <div class="sh"><div class="st" id="grp-detail-title">그룹 상세 — VPP-전남권</div></div>
    <div class="mr"><div class="ml">그룹 유형</div><div class="mv mono" id="grp-d-type">집합자원(입찰)</div></div>
    <div class="mr"><div class="ml">입찰 시장</div><div class="mv mono" id="grp-d-mkt">DA + RT</div></div>
    <div class="mr"><div class="ml">총 용량</div><div class="mv mono" id="grp-d-cap">11.5 MW</div></div>
    <div class="mr"><div class="ml">일괄 제어</div><div class="mv"><span class="badge ok" id="grp-d-ctrl">허용</span></div></div>
    <div class="mr" style="border:none"><div class="ml">담당 운영자</div><div class="mv mono" id="grp-d-mgr">김운영</div></div>
    <div class="sh" style="margin-top:10px"><div class="st">소속 자원 가중치</div></div>
    <div class="pr"><div class="pl" style="width:80px">광양항태양광</div><div class="pb"><div class="pf" style="width:56%;background:var(--acc)"></div></div><div class="pv">28.5%</div></div>
    <div class="pr"><div class="pl" style="width:80px">광양항4단계</div><div class="pb"><div class="pf" style="width:54%;background:var(--acc2)"></div></div><div class="pv">27.3%</div></div>
    <div class="pr"><div class="pl" style="width:80px">온누리</div><div class="pb"><div class="pf" style="width:24%;background:var(--acc3)"></div></div><div class="pv">12.4%</div></div>
  </div>
</div>

<!-- 그룹 생성 모달 -->
<div class="modal-backdrop" id="modal-grp-add" style="display:none" onclick="closeModalBg(event,'modal-grp-add')">
  <div class="modal">
    <div class="modal-hdr">
      <span class="modal-title">신규 그룹 생성</span>
      <button class="modal-close" onclick="closeModal('modal-grp-add')">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-section">그룹 기본 정보</div>
      <div class="form-row">
        <div class="form-item"><label>그룹명 *</label><input class="inp" placeholder="VPP-충남권" id="grp-name"></div>
        <div class="form-item"><label>그룹 유형 *</label>
          <select class="sel" id="grp-type"><option value="집합자원(입찰)">집합자원 (입찰용)</option><option value="지역별">지역별 관리</option><option value="관리업체별">관리업체별</option></select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-item"><label>담당 운영자</label>
          <select class="sel" id="grp-mgr"><option>김운영</option><option>이제어</option><option>박기술</option></select>
        </div>
        <div class="form-item"><label>일괄 제어 허용</label>
          <div style="display:flex;align-items:center;gap:8px;margin-top:8px"><label class="toggle"><input type="checkbox" id="grp-ctrl" checked><div class="ts"></div></label><span style="font-size:11px;color:var(--txt2)">그룹 단위 제어 허용</span></div>
        </div>
      </div>
      <hr class="form-divider">
      <div class="form-section">소속 발전소 선택 (다중 선택 가능)</div>
      <div class="badge-sel" id="grp-plant-sel"></div>
      <hr class="form-divider">
      <div class="form-section">입찰 설정 (집합자원 유형 시)</div>
      <div class="form-row">
        <div class="form-item"><label>참여 시장</label>
          <select class="sel" id="grp-mkt"><option>DA + RT (이중시장)</option><option>DA 전용</option><option>RT 전용</option></select>
        </div>
        <div class="form-item"><label>최소 입찰 단위 (kW)</label><input class="inp" value="100" type="number" id="grp-min-bid"></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="cb n" onclick="closeModal('modal-grp-add')">취소</button>
      <button class="cb p" onclick="saveGrp()">그룹 생성</button>
    </div>
  </div>
</div>`;

window['I_cfg-grp']=function(){
  function escHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  const plants=['광양항태양광','광양항4단계','온누리','해맞이','해바라기','금능1호','김주풍력','무들발전소','희정발전소'];
  const sel=document.getElementById('grp-plant-sel');
  if(sel){
    sel.innerHTML='';
    plants.forEach(function(n){
      const btn=document.createElement('button');
      btn.type='button';
      btn.className='badge-sel-btn';
      btn.textContent=n;
      btn.onclick=function(){this.classList.toggle('selected');};
      sel.appendChild(btn);
    });
  }
  function highlightRow(row){
    document.querySelectorAll('#grp-tbody tr').forEach(r=>r.style.background='');
    if(row) row.style.background='rgba(37,99,235,0.07)';
  }
  window.grpSelect=function(name,type,mkt,cap,ctrl,mgr,ev){
    const titleEl=document.getElementById('grp-detail-title');
    if(titleEl) titleEl.textContent='그룹 상세 — '+name;
    const ids={'grp-d-type':type,'grp-d-mkt':mkt,'grp-d-cap':cap,'grp-d-ctrl':ctrl,'grp-d-mgr':mgr};
    Object.keys(ids).forEach(id=>{const el=document.getElementById(id); if(el) el.textContent=ids[id];});
    const e=ev||window.event;
    highlightRow(e&&e.currentTarget);
  };
  function updateGrpKPI(){
    const t=document.getElementById('grp-total');
    if(t) t.innerHTML=document.querySelectorAll('#grp-tbody tr').length+'<span class="ku">개</span>';
  }
  function resetGrpForm(){
    const nm=document.getElementById('grp-name'); if(nm) nm.value='';
    document.querySelectorAll('#grp-plant-sel .badge-sel-btn').forEach(b=>b.classList.remove('selected'));
    const tp=document.getElementById('grp-type'); if(tp) tp.selectedIndex=0;
    const mg=document.getElementById('grp-mgr'); if(mg) mg.selectedIndex=0;
    const mk=document.getElementById('grp-mkt'); if(mk) mk.selectedIndex=0;
    const mb=document.getElementById('grp-min-bid'); if(mb) mb.value=100;
    const ct=document.getElementById('grp-ctrl'); if(ct) ct.checked=true;
  }
  window.saveGrp=function(){
    const nameEl=document.getElementById('grp-name');
    const typeEl=document.getElementById('grp-type');
    if(!nameEl||!typeEl){toast('폼을 불러올 수 없습니다.','err');return;}
    const name=nameEl.value.trim();
    if(!name){toast('그룹명은 필수입니다.','warn');return;}
    const type=typeEl.value;
    const selBtns=[...document.querySelectorAll('#grp-plant-sel .badge-sel-btn.selected')];
    if(selBtns.length===0){toast('소속 발전소를 1개 이상 선택하세요.','warn');return;}
    const tbody=document.getElementById('grp-tbody');
    if(!tbody){toast('목록을 찾을 수 없습니다.','err');return;}
    const mgrEl=document.getElementById('grp-mgr');
    const mktEl=document.getElementById('grp-mkt');
    const ctrlEl=document.getElementById('grp-ctrl');
    const mgr=mgrEl?mgrEl.value:'—';
    const mktFull=mktEl?mktEl.value:'DA + RT';
    const mkt=mktFull.split(' (')[0];
    const ctrlLabel=(ctrlEl&&ctrlEl.checked)?'허용':'불가';
    const typeLabel=type.replace('(입찰)','').trim();
    const tr=document.createElement('tr');
    tr.style.cursor='pointer';
    tr.onclick=function(ev){grpSelect(name,type,mkt,'—',ctrlLabel,mgr,ev);};
    tr.innerHTML='<td>'+escHtml(name)+'</td>'
      +'<td>'+escHtml(typeLabel)+'</td>'
      +'<td>'+selBtns.length+'개소</td>'
      +'<td class="mono">—</td>'
      +'<td><span class="badge ok">운영중</span></td>';
    tbody.appendChild(tr);
    updateGrpKPI();
    resetGrpForm();
    closeModal('modal-grp-add');
    toast('그룹이 생성되었습니다. ('+name+', '+selBtns.length+'개소)');
  };
};

