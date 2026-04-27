// AUTO-GENERATED FROM index.html — page module: cfg-bat
window.P = window.P || {};
/* ===== 설정: 배치관리 ===== */
window.P['cfg-bat']=()=>`
<!-- 최상위 필터 바 (분류 → 상태 → 세부) -->
<div class="card fbar"><div class="fbar-row">
  <div class="fbar-item"><label class="fbar-lbl">카테고리</label>
    <select class="fbar-sel" id="cba-f-cat" onchange="cfgBatFilterApply()">
      <option value="">전체</option><option value="예측">예측</option><option value="수집">수집</option><option value="정산">정산</option><option value="진단">진단</option><option value="알람">알람</option><option value="리포트">리포트</option><option value="동기화">동기화</option>
    </select></div>
  <div class="fbar-item"><label class="fbar-lbl">상태</label>
    <select class="fbar-sel" id="cba-f-stat" onchange="cfgBatFilterApply()">
      <option value="">전체</option><option>실행중</option><option>성공</option><option>실패</option><option>대기</option>
    </select></div>
  <div class="fbar-item"><label class="fbar-lbl">실행 결과 (24h)</label>
    <select class="fbar-sel" id="cba-f-res" onchange="cfgBatFilterApply()">
      <option value="">전체</option><option value="ok">성공만</option><option value="err">실패 포함</option>
    </select></div>
  <div class="fbar-item"><label class="fbar-lbl">우선순위</label>
    <select class="fbar-sel" id="cba-f-pri" onchange="cfgBatFilterApply()">
      <option value="">전체</option><option>1</option><option>2</option><option>3</option>
    </select></div>
  <div class="fbar-item"><label class="fbar-lbl">실행 주기</label>
    <select class="fbar-sel" id="cba-f-cron" onchange="cfgBatFilterApply()">
      <option value="">전체</option><option value="min1">1분 이내</option><option value="min15">5~15분</option><option value="hourly">시간 단위</option><option value="daily">일 단위</option>
    </select></div>
</div></div>

<div class="g4">
  <div class="card"><div class="ct">전체 배치 ${window.tip('전체 배치 작업','시스템에 등록된 모든 배치 작업 수','COUNT(*) FROM batch_jobs','예측·수집·정산·진단·알람 등 카테고리별 — Cron 표현식 기반 스케줄')}</div><div class="kv" id="bat-total">24<span class="ku">개</span></div></div>
  <div class="card acc"><div class="ct">실행중 ${window.tip('실행 중 배치','현재 동시에 실행 중인 배치 작업 수','상태 = 실행중','동시 실행 가능 — 우선순위 1(최고)이 자원 우선 점유')}</div><div class="kv" style="color:var(--acc)" id="bat-running">8<span class="ku">개</span></div></div>
  <div class="card"><div class="ct">실패 (24h) ${window.tip('24시간 실패 배치','최근 24시간 내 실패한 배치 작업 수','마지막 실행 결과 = 실패 AND 실행 시각 ≤ 24h','자동 재시도 3회 실패 후 카운트 — 실패 시 운영자 이메일 알림')}</div><div class="kv" style="color:var(--acc4)">1<span class="ku">개</span></div></div>
  <div class="card"><div class="ct">평균 실행시간 ${window.tip('평균 실행시간','전체 배치 작업의 평균 소요 시간','Σ(소요시간) ÷ 작업 수 [분]','5분 이상 작업은 우선순위 점검 / 실시간 작업(15분 주기)은 5분 이내 완료 필수')}</div><div class="kv">2.4<span class="ku">분</span></div></div>
</div>
<div class="card">
  <div class="sh"><div class="st">배치 작업 목록</div><div style="display:flex;gap:6px;align-items:center">
    <input class="inp" placeholder="검색 (작업 ID·작업명)" style="width:180px;height:32px;font-size:12px" oninput="batSearch(this.value)">
    <button class="cb p sm" onclick="openModal('modal-bat-run')">즉시 실행</button>
    <button class="cb n sm" onclick="openModal('modal-bat-add')">작업 추가</button>
    ${window.csvBtn('bat-tbody','batch_jobs','배치 작업 목록')}
  </div></div>
  <table class="tbl"><thead><tr><th>작업 ID</th><th>작업명</th><th>실행 주기 (Cron)</th><th>우선순위</th><th>마지막 실행</th><th>소요시간</th><th>상태</th><th>제어</th></tr></thead>
  <tbody id="bat-tbody">
    <tr><td class="mono" style="font-size:9px;color:var(--acc2)">RT_PRED_01</td><td>실시간 발전 예측</td><td class="mono" style="font-size:9px;color:var(--txt2)">*/15 * * * *</td><td class="mono" style="text-align:center">1</td><td class="mono" style="font-size:9px">14:15:00</td><td class="mono">1분 42초</td><td><span class="badge ok">실행중</span></td><td><button class="cb n" style="font-size:9px;padding:2px 6px" onclick="runSingle('RT_PRED_01',this)">▶</button></td></tr>
    <tr><td class="mono" style="font-size:9px;color:var(--acc2)">DA_PRED_01</td><td>하루전 입찰 예측</td><td class="mono" style="font-size:9px;color:var(--txt2)">0 9 * * *</td><td class="mono" style="text-align:center">1</td><td class="mono" style="font-size:9px">09:00:02</td><td class="mono">4분 11초</td><td><span class="badge ok">성공</span></td><td><button class="cb n" style="font-size:9px;padding:2px 6px" onclick="runSingle('DA_PRED_01',this)">▶</button></td></tr>
    <tr><td class="mono" style="font-size:9px;color:var(--acc2)">COLLECT_01</td><td>RTU 데이터 수집</td><td class="mono" style="font-size:9px;color:var(--txt2)">*/1 * * * *</td><td class="mono" style="text-align:center">1</td><td class="mono" style="font-size:9px">14:22:58</td><td class="mono">0분 12초</td><td><span class="badge ok">실행중</span></td><td><button class="cb n" style="font-size:9px;padding:2px 6px" onclick="runSingle('COLLECT_01',this)">▶</button></td></tr>
    <tr><td class="mono" style="font-size:9px;color:var(--acc2)">SETTLE_01</td><td>정산금 계산</td><td class="mono" style="font-size:9px;color:var(--txt2)">0 */4 * * *</td><td class="mono" style="text-align:center">2</td><td class="mono" style="font-size:9px">12:00:05</td><td class="mono">2분 33초</td><td><span class="badge ok">성공</span></td><td><button class="cb n" style="font-size:9px;padding:2px 6px" onclick="runSingle('SETTLE_01',this)">▶</button></td></tr>
    <tr><td class="mono" style="font-size:9px;color:var(--acc2)">HEALTH_01</td><td>설비 건전성 진단</td><td class="mono" style="font-size:9px;color:var(--txt2)">*/30 * * * *</td><td class="mono" style="text-align:center">3</td><td class="mono" style="font-size:9px">14:00:01</td><td class="mono">3분 20초</td><td><span class="badge ok">성공</span></td><td><button class="cb n" style="font-size:9px;padding:2px 6px" onclick="runSingle('HEALTH_01',this)">▶</button></td></tr>
    <tr><td class="mono" style="font-size:9px;color:var(--acc2)">MET_SYNC_01</td><td>기상 데이터 동기화</td><td class="mono" style="font-size:9px;color:var(--txt2)">*/5 * * * *</td><td class="mono" style="text-align:center">2</td><td class="mono" style="font-size:9px">14:20:00</td><td class="mono">0분 45초</td><td><span class="badge ok">실행중</span></td><td><button class="cb n" style="font-size:9px;padding:2px 6px" onclick="runSingle('MET_SYNC_01',this)">▶</button></td></tr>
    <tr><td class="mono" style="font-size:9px;color:var(--acc2)">ALARM_01</td><td>알람 배치 처리</td><td class="mono" style="font-size:9px;color:var(--txt2)">*/1 * * * *</td><td class="mono" style="text-align:center">1</td><td class="mono" style="font-size:9px">14:22:59</td><td class="mono">0분 08초</td><td><span class="badge ok">실행중</span></td><td><button class="cb n" style="font-size:9px;padding:2px 6px" onclick="runSingle('ALARM_01',this)">▶</button></td></tr>
    <tr><td class="mono" style="font-size:9px;color:var(--acc2)">REPORT_01</td><td>일일 정산 리포트</td><td class="mono" style="font-size:9px;color:var(--txt2)">0 23 * * *</td><td class="mono" style="text-align:center">3</td><td class="mono" style="font-size:9px">어제 23:00</td><td class="mono">6분 12초</td><td><span class="badge err">실패</span></td><td><button class="cb n" style="font-size:9px;padding:2px 6px" onclick="runSingle('REPORT_01',this)">▶</button></td></tr>
  </tbody></table>
</div>

<!-- 즉시 실행 모달 -->
<div class="modal-backdrop" id="modal-bat-run" style="display:none" onclick="closeModalBg(event,'modal-bat-run')">
  <div class="modal">
    <div class="modal-hdr">
      <span class="modal-title">배치 즉시 실행</span>
      <button class="modal-close" onclick="closeModal('modal-bat-run')">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-section">실행할 작업 선택</div>
      <div id="bat-run-list"></div>
      <div class="prog-wrap" id="bat-prog">
        <div class="prog-label-row"><span id="bat-run-st">준비 중...</span><span id="bat-run-pct">0%</span></div>
        <div class="prog-track"><div class="prog-run" id="bat-run-bar"></div></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="cb n" style="margin-right:auto;font-size:10px" onclick="document.querySelectorAll('.bat-run-chk').forEach(c=>c.checked=true)">전체 선택</button>
      <button class="cb n" onclick="closeModal('modal-bat-run')">닫기</button>
      <button class="cb p" id="bat-run-btn" onclick="runBatch()">즉시 실행</button>
    </div>
  </div>
</div>

<!-- 작업 추가 모달 -->
<div class="modal-backdrop" id="modal-bat-add" style="display:none" onclick="closeModalBg(event,'modal-bat-add')">
  <div class="modal">
    <div class="modal-hdr">
      <span class="modal-title">배치 작업 추가</span>
      <button class="modal-close" onclick="closeModal('modal-bat-add')">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-section">작업 기본 정보</div>
      <div class="form-row">
        <div class="form-item"><label>작업 ID *</label><input class="inp" placeholder="MY_JOB_01" id="bat-id"></div>
        <div class="form-item"><label>작업명 *</label><input class="inp" placeholder="예: 월간 발전 통계" id="bat-name"></div>
      </div>
      <div class="form-row full">
        <div class="form-item"><label>실행 모듈 경로 *</label><input class="inp" placeholder="/app/jobs/my_job.py" id="bat-path"></div>
      </div>
      <hr class="form-divider">
      <div class="form-section">스케줄 설정</div>
      <div class="form-row">
        <div class="form-item"><label>실행 주기 (Cron 표현식) *</label><input class="inp" placeholder="0 * * * *" id="bat-cron"></div>
        <div class="form-item"><label>우선순위</label>
          <select class="sel" id="bat-pri"><option value="1">1 — 최고</option><option value="2" selected>2 — 일반</option><option value="3">3 — 낮음</option></select>
        </div>
      </div>
      <div style="background:var(--bg4);border-radius:5px;padding:8px 10px;margin-top:4px;font-size:10px;color:var(--txt2)">
        <b style="color:var(--txt)">Cron 예시</b> &nbsp;
        <span style="color:var(--acc2)">*/15 * * * *</span> = 15분마다 &nbsp;
        <span style="color:var(--acc2)">0 9 * * *</span> = 매일 9시 &nbsp;
        <span style="color:var(--acc2)">0 0 1 * *</span> = 매월 1일
      </div>
      <hr class="form-divider">
      <div class="form-section">실패 처리 정책</div>
      <div class="form-row">
        <div class="form-item"><label>최대 재시도 횟수</label><input class="inp" value="3" type="number" id="bat-retry"></div>
        <div class="form-item"><label>재시도 간격 (초)</label><input class="inp" value="60" type="number" id="bat-retry-gap"></div>
      </div>
      <div class="form-row full">
        <div class="form-item"><label>실패 시 알림 이메일</label><input class="inp" placeholder="ops@60hz.kr" id="bat-alert"></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="cb n" onclick="closeModal('modal-bat-add')">취소</button>
      <button class="cb p" onclick="saveBat()">작업 추가</button>
    </div>
  </div>
</div>`;

window['I_cfg-bat']=function(){
  window.batSearch=function(v){
    const rows=document.querySelectorAll('#bat-tbody tr');
    rows.forEach(r=>{r.style.display=r.textContent.includes(v)?'':'none';});
  };
  // 즉시실행 모달 배치 목록 동적 생성 (중첩 백틱 방지)
  var batJobs=[
    ['RT_PRED_01','실시간 발전 예측','ok'],
    ['DA_PRED_01','하루전 입찰 예측','ok'],
    ['COLLECT_01','RTU 데이터 수집','ok'],
    ['SETTLE_01','정산금 계산','ok'],
    ['HEALTH_01','설비 건전성 진단','ok'],
    ['MET_SYNC_01','기상 데이터 동기화','ok'],
    ['ALARM_01','알람 배치 처리','ok'],
    ['REPORT_01','일일 정산 리포트','err']
  ];
  var list=document.getElementById('bat-run-list');
  if(list){
    list.innerHTML='';
    batJobs.forEach(function(row){
      var jid=row[0], jname=row[1], jst=row[2];
      var div=document.createElement('div');
      div.className='ota-item';
      div.innerHTML='<input type="checkbox" class="ota-check bat-run-chk" data-id="'+jid+'">'
        +'<div class="ota-info"><div class="ota-name">'+jid+'</div><div class="ota-ver">'+jname+'</div></div>'
        +'<span class="badge '+(jst==='ok'?'ok':'err')+' ota-badge">'+(jst==='ok'?'정상':'실패')+'</span>';
      list.appendChild(div);
    });
  }
  window.runSingle=function(id,btn){
    const orig=btn.textContent;
    btn.textContent='●';btn.style.color='var(--acc)';btn.disabled=true;
    toast(id + ' 즉시 실행 요청됨');
    setTimeout(()=>{btn.textContent=orig;btn.style.color='';btn.disabled=false;},2000);
  };
  window.runBatch=function(){
    const chk=[...document.querySelectorAll('.bat-run-chk:checked')];
    if(chk.length===0){toast('실행할 작업을 선택하세요.','warn');return;}
    const btn=document.getElementById('bat-run-btn');
    btn.disabled=true;btn.textContent='실행 중...';
    const prog=document.getElementById('bat-prog');
    prog.style.display='block';
    const bar=document.getElementById('bat-run-bar');
    const st=document.getElementById('bat-run-st');
    const pt=document.getElementById('bat-run-pct');
    let pct=0;let idx=0;
    const ids=chk.map(c=>c.getAttribute('data-id'));
    const iv=setInterval(()=>{
      pct+=100/ids.length*(0.4+Math.random()*0.3);
      if(pct>=100){pct=100;clearInterval(iv);btn.textContent='완료';toast(ids.length+'개 작업 즉시 실행 완료');}
      const cur=Math.min(Math.floor(pct/100*ids.length),ids.length-1);
      bar.style.width=Math.min(pct,100)+'%';
      pt.textContent=Math.round(Math.min(pct,100))+'%';
      st.textContent=ids[cur]+' 실행 중...';
    },400);
  };
  window.cfgBatFilterApply=function(){
    const cat=document.getElementById('cba-f-cat')?.value||'';
    const stat=document.getElementById('cba-f-stat')?.value||'';
    const res=document.getElementById('cba-f-res')?.value||'';
    const pri=document.getElementById('cba-f-pri')?.value||'';
    const cron=document.getElementById('cba-f-cron')?.value||'';
    const catMap={RT_PRED:'예측',DA_PRED:'예측',COLLECT:'수집',SETTLE:'정산',HEALTH:'진단',MET_SYNC:'동기화',ALARM:'알람',REPORT:'리포트'};
    const periodOf=(c)=>{
      if(/\*\/1 \* \* \* \*/.test(c)) return 'min1';
      if(/\*\/(5|15|30) /.test(c)) return 'min15';
      if(/^0 \*\/\d+ /.test(c)) return 'hourly';
      if(/^0 \d+ \* \* \*/.test(c)) return 'daily';
      return '';
    };
    let total=0,running=0,fail=0;
    document.querySelectorAll('#bat-tbody tr').forEach(tr=>{
      const id=tr.cells[0]?.textContent.trim();
      const cronExp=tr.cells[2]?.textContent.trim();
      const priVal=tr.cells[3]?.textContent.trim();
      const statBadge=tr.querySelector('.badge')?.textContent.trim()||'';
      let show=true;
      if(cat){
        const prefix=Object.keys(catMap).find(p=>id&&id.startsWith(p));
        if(catMap[prefix]!==cat) show=false;
      }
      if(stat && statBadge!==stat) show=false;
      if(res==='ok' && statBadge==='실패') show=false;
      if(res==='err' && statBadge!=='실패') show=false;
      if(pri && priVal!==pri) show=false;
      if(cron && periodOf(cronExp||'')!==cron) show=false;
      tr.style.display=show?'':'none';
      if(show){
        total++;
        if(statBadge==='실행중') running++;
        if(statBadge==='실패') fail++;
      }
    });
    const totEl=document.getElementById('bat-total'); if(totEl) totEl.firstChild.nodeValue=total;
    const runEl=document.getElementById('bat-running'); if(runEl) runEl.firstChild.nodeValue=running;
  };
  window.saveBat=function(){
    const id=document.getElementById('bat-id').value.trim();
    const name=document.getElementById('bat-name').value.trim();
    const cron=document.getElementById('bat-cron').value.trim();
    if(!id||!name||!cron){toast('작업 ID, 작업명, Cron 표현식은 필수입니다.','warn');return;}
    const pri=document.getElementById('bat-pri').value;
    const tbody=document.getElementById('bat-tbody');
    const now=new Date();
    const hm=now.getHours().toString().padStart(2,'0')+':'+now.getMinutes().toString().padStart(2,'0');
    const tr=document.createElement('tr');
    tr.innerHTML=`<td class="mono" style="font-size:9px;color:var(--acc2)">${id}</td><td>${name}</td><td class="mono" style="font-size:9px;color:var(--txt2)">${cron}</td><td class="mono" style="text-align:center">${pri}</td><td class="mono" style="font-size:9px">미실행</td><td class="mono">—</td><td><span class="badge inf">등록됨</span></td><td><button class="cb n" style="font-size:9px;padding:2px 6px" onclick="runSingle('${id}',this)">▶</button></td>`;
    tbody.appendChild(tr);
    closeModal('modal-bat-add');
    toast('배치 작업이 추가되었습니다. (' + id + ')');
  };
};

