// AUTO-GENERATED FROM index.html — page module: pre-model
window.P = window.P || {};
/* ===== 예측: 모델 비교 ===== */
window.P['pre-model']=()=>`
${_mkFilterBar({periodStart:'2026-04-01',periodEnd:'2026-04-23',interval:'1시간',extras:`
  <div class="fbar-item">
    <span class="fbar-lbl">비교 모델</span>
    <select class="fbar-sel"><option>전체 (5개)</option><option>D1_min + D3_min</option><option>LSTM 계열</option><option>NWP 계열</option></select>
  </div>
  <div class="fbar-item">
    <span class="fbar-lbl">지표</span>
    <select class="fbar-sel"><option>NMAE</option><option>RMSE</option><option>MAPE</option><option>연산시간</option></select>
  </div>`})}
<div class="g4">
  <div class="card acc"><div class="ct">추천 입찰 모델 ${window.tip('추천 입찰 모델','현재 NMAE10이 가장 낮은 챔피언 모델','자동 선택: 최근 7일 NMAE10 평균이 가장 낮은 모델','챔피언 모델은 매 시간 자동 재평가 — 7일 내 다른 모델이 우수해지면 자동 교체')}</div><div class="kv" style="color:var(--acc)" id="chmp-rec-model">D1_min</div><div class="kd up" id="chmp-rec-sub">NMAE 6.8% 최우수</div></div>
  <div class="card"><div class="ct">비교 모델 수 ${window.tip('비교 모델 수','동시 운영 중인 후보 모델 개수','등록된 모델 - 폐기/비활성','최소 3개 권장 — 모델 다양성 확보로 한 모델 실패 시 안정성 확보')}</div><div class="kv">5<span class="ku">개</span></div></div>
  <div class="card"><div class="ct">모델 드리프트 ${window.tip('모델 드리프트','시간이 지나면서 모델 성능이 저하되는 현상','최근 1주일 NMAE - 학습 시점 NMAE > 2%p → "감지"','드리프트 감지 시 자동 재학습 트리거 — 계절 변화·설비 노화·기상 패턴 변화 영향')}</div><div class="kv" style="color:var(--acc)">정상</div></div>
  <div class="card"><div class="ct">마지막 재학습 ${window.tip('마지막 재학습','챔피언 모델이 마지막으로 재학습된 시점','자동: 1주일 주기 또는 드리프트 감지 시 / 수동: 운영자 트리거','재학습은 GPU 인스턴스에서 약 30분 소요 — 백그라운드 진행 / 운영 중단 없음')}</div><div class="kv">3일 전</div></div>
</div>
<div class="card mb"><div class="sh"><div class="st">모델별 예측 곡선 비교</div></div><div style="height:170px;position:relative"><canvas id="c-mcomp" role="img" aria-label="모델 비교"></canvas></div></div>
<div class="card"><div class="sh"><div class="st">모델 성능 순위</div><button class="cb p sm" id="chmp-select-btn" onclick="chmpToggleSelect()">대표모델 설정</button></div>
<table class="tbl"><thead><tr><th>순위</th><th>모델 ID</th><th>알고리즘</th><th>NMAE</th><th>RMSE</th><th>연산시간</th><th>상태</th></tr></thead><tbody id="chmp-tbody">
  <tr data-model="D1_min" data-status="champion"><td class="mono" style="color:var(--acc)">1위</td><td class="mono" style="color:var(--acc2)">D1_min</td><td>LSTM+Ensemble</td><td class="mono" style="color:var(--acc)">6.8%</td><td class="mono">0.042</td><td class="mono">1분 12초</td><td class="chmp-status"><span class="badge ok">챔피언</span></td></tr>
  <tr data-model="D3_min" data-status="standby"><td class="mono" style="color:var(--txt2)">2위</td><td class="mono" style="color:var(--acc2)">D3_min</td><td>XGBoost</td><td class="mono" style="color:var(--acc2)">7.4%</td><td class="mono">0.051</td><td class="mono">0분 48초</td><td class="chmp-status"><span class="badge inf">대기</span></td></tr>
  <tr data-model="MWP_v2" data-status="standby"><td class="mono" style="color:var(--txt2)">3위</td><td class="mono" style="color:var(--acc2)">MWP_v2</td><td>Random Forest</td><td class="mono" style="color:var(--acc3)">8.1%</td><td class="mono">0.059</td><td class="mono">0분 32초</td><td class="chmp-status"><span class="badge inf">대기</span></td></tr>
  <tr data-model="ECMWF" data-status="standby"><td class="mono" style="color:var(--txt2)">4위</td><td class="mono" style="color:var(--acc2)">ECMWF</td><td>NWP모델</td><td class="mono" style="color:var(--acc4)">8.9%</td><td class="mono">0.067</td><td class="mono">4분 20초</td><td class="chmp-status"><span class="badge inf">대기</span></td></tr>
  <tr data-model="SARIMA" data-status="inactive"><td class="mono" style="color:var(--txt2)">5위</td><td class="mono" style="color:var(--acc2)">SARIMA</td><td>통계모델</td><td class="mono" style="color:var(--acc4)">11.2%</td><td class="mono">0.089</td><td class="mono">0분 18초</td><td class="chmp-status"><span class="badge off">비활성</span></td></tr>
</tbody></table></div>`;
// 챔피언 모델 변경 — 같은 셀에서 배지 ↔ 지정 버튼만 교체 (레이아웃 유지)
window._chmpSelectMode=false;
window._chmpBadges={
  champion:'<span class="badge ok">챔피언</span>',
  standby :'<span class="badge inf">대기</span>',
  inactive:'<span class="badge off">비활성</span>',
};
window._chmpRenderStatuses=function(){
  document.querySelectorAll('#chmp-tbody tr').forEach(tr=>{
    const cell=tr.querySelector('.chmp-status');
    if(!cell) return;
    const status=tr.dataset.status;
    if(window._chmpSelectMode && status!=='champion'){
      cell.innerHTML='<span class="badge-act" role="button" tabindex="0" onclick="chmpPromote(\''+tr.dataset.model+'\')">지정</span>';
    } else {
      cell.innerHTML=window._chmpBadges[status]||'';
    }
  });
};
window.chmpToggleSelect=function(){
  window._chmpSelectMode=!window._chmpSelectMode;
  const btn=document.getElementById('chmp-select-btn');
  if(btn) btn.textContent=window._chmpSelectMode?'취소':'대표모델 설정';
  window._chmpRenderStatuses();
};
window.chmpPromote=function(modelId){
  const newRow=document.querySelector('tr[data-model="'+modelId+'"]');
  if(!newRow) return;
  if(newRow.dataset.status==='champion'){
    window._chmpSelectMode=false;
    const btn=document.getElementById('chmp-select-btn');
    if(btn) btn.textContent='대표모델 설정';
    window._chmpRenderStatuses();
    if(window.toast) toast(modelId+'은(는) 이미 챔피언입니다','warn');
    return;
  }
  // 기존 챔피언 → 대기, 새 모델 → 챔피언
  document.querySelectorAll('#chmp-tbody tr').forEach(tr=>{
    if(tr.dataset.status==='champion') tr.dataset.status='standby';
  });
  newRow.dataset.status='champion';
  // KPI 카드 갱신
  const recEl=document.getElementById('chmp-rec-model');
  if(recEl) recEl.textContent=modelId;
  const nmaeCell=newRow.querySelectorAll('td')[3];
  const nmae=nmaeCell?nmaeCell.textContent.trim():'';
  const subEl=document.getElementById('chmp-rec-sub');
  if(subEl) subEl.textContent='NMAE '+nmae+' (수동 지정)';
  // 선택 모드 종료
  window._chmpSelectMode=false;
  const btn=document.getElementById('chmp-select-btn');
  if(btn) btn.textContent='대표모델 설정';
  window._chmpRenderStatuses();
  if(window.toast) toast('챔피언 모델 변경 — '+modelId);
};
window['I_pre-model']=function(){
  const h=Array.from({length:24},(_,i)=>i+'h');
  const act=[0,0,0,0,0,1,17,43,80,112,131,139,146,141,134,138,143,141,128,103,70,39,15,3];
  mkChart('c-mcomp','line',h,[
    {data:act,borderColor:'rgba(255,255,255,0.4)',borderWidth:2,pointRadius:0,tension:0.4,fill:false},
    {data:act.map(v=>v*(0.96+Math.random()*0.08)),borderColor:'#0059ff',borderWidth:1.5,pointRadius:0,tension:0.4,fill:false},
    {data:act.map(v=>v*(0.93+Math.random()*0.1)),borderColor:'#ffca42',borderWidth:1,pointRadius:0,tension:0.4,borderDash:[4,2],fill:false},
  ],{});
};

