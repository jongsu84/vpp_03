// AUTO-GENERATED FROM index.html — page module: bidRT-mgmt
window.P = window.P || {};
/* ===== 실시간입찰: 정산·배분 관리 ===== */
window.P['bidRT-mgmt']=()=>`
${_mkCross('bidRT-mgmt')}
<div class="card mb" style="border-left:3px solid var(--semantic-positive-normal);padding:14px 18px;background:var(--semantic-tag-bg-green);margin-bottom:12px">
  <div style="font-size:14px;font-weight:600;margin-bottom:4px">실시간 확정 정산 (최종)</div>
  <div style="font-size:13px;line-height:20px;color:var(--semantic-label-normal)">
    실측·RT SMP·IMBP가 반영된 <b>최종 확정 정산</b>입니다. DA 시점 예상 정산은 <span onclick="activate('bidDA-settle')" style="color:var(--semantic-brand-primary);cursor:pointer;font-weight:500">하루전 입찰 → 정산 관리 ↗</span>에서 확인하세요.
  </div>
  <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-top:10px;padding:8px 10px;background:var(--semantic-background-1);border:1px solid var(--semantic-line-normal);border-radius:6px;font-size:12px">
    <span style="font-size:11px;color:var(--semantic-label-alt);font-weight:600;margin-right:2px">정산 사슬</span>
    <span style="padding:3px 8px;background:var(--semantic-tag-bg-blue);color:var(--semantic-tag-label-blue);border-radius:4px;font-weight:500">발전사</span>
    <span style="color:var(--semantic-label-alt)">실측 발전 실적</span>
    <span style="color:var(--semantic-label-alt)">→</span>
    <span style="padding:3px 8px;background:var(--semantic-tag-bg-violet,#e8defa);color:#6035cc;border-radius:4px;font-weight:500">KPX</span>
    <span style="color:var(--semantic-label-alt)">실측 × SMP 정산금 산정·명세 발행</span>
    <span style="color:var(--semantic-label-alt)">→</span>
    <span style="padding:3px 8px;background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow);border-radius:4px;font-weight:500">한전</span>
    <span style="color:var(--semantic-label-alt)">익월 10일 현금 입금</span>
    <span style="color:var(--semantic-label-alt)">→</span>
    <span style="padding:3px 8px;background:var(--semantic-positive-assistive,rgba(0,212,168,0.15));color:var(--semantic-positive-normal);border-radius:4px;font-weight:500">60Hz / 사업자</span>
    <span style="color:var(--semantic-label-alt)">운영 수수료 5% 차감 후 자원별 배분</span>
  </div>
</div>
${_mkBidFilter({prefix:'brg',onChange:'bidRtMgmtApply',rightInfo:'이번 달 270.5M 배분 · 발행 38/42건 · 다음 입금 5/10'})}
<div class="g4">
  <div class="card acc"><div class="ct">이번 달 확정 정산금 ${window.tip('이번 달 확정 정산금','당월 누적 KPX 확정 정산금','Σ(일별 DAES + RTES - IMBP) [백만원]','매월 1일~말일 누적 — 익월 10일 사업자 입금 기준')}</div><div class="kv">284.7<span class="ku">백만원</span></div><div class="kd up">DAES+RTES 기준</div></div>
  <div class="card"><div class="ct">운영 수수료 (5%) ${window.tip('운영 수수료','60Hz가 사업자로부터 수취하는 수수료','확정 정산금 × 5% [백만원]','계약 기본 5% — 자원 규모/계약 조건에 따라 ±2% 조정 가능')}</div><div class="kv">14.2<span class="ku">백만원</span></div></div>
  <div class="card"><div class="ct">사업자 배분 합계 ${window.tip('사업자 배분 합계','수수료 차감 후 사업자에게 지급되는 총액','확정 정산금 - 운영 수수료 [백만원]','자원별 가중치에 따라 분배 — 입찰수익 메뉴에서 자원별 명세 확인')}</div><div class="kv">270.5<span class="ku">백만원</span></div></div>
  <div class="card"><div class="ct">정산서 발행 현황 ${window.tip('정산서 발행 현황','이번 달 사업자별 정산서 발행 / 전체 비율','발행 완료 건 / 전체 사업자 건','매월 5일까지 일괄 발행 — 미발행분은 운영자 검토 대기 (오류·이의신청 등)')}</div><div class="kv"><span style="color:var(--semantic-positive-normal)">38</span><span style="font-size:12px;color:var(--semantic-label-alt)">/42건</span></div></div>
</div>
<div class="card mb"><div class="sh"><div class="st">월별 정산 추이 (DAES / RTES 분리)</div></div><div style="height:160px;position:relative"><canvas id="c-settle2" role="img" aria-label="정산 추이"></canvas></div></div>
<div class="card"><div class="sh"><div class="st">사업자별 정산 명세 (이중정산 분해)</div>${window.csvBtn('rt-mgmt-settle-tbody','rt_settlement_breakdown','사업자별 정산 명세 (이중정산 분해)')}</div>
<table class="tbl"><thead><tr><th>발전소명</th><th>발전량(MWh)</th><th>DAES</th><th>RTES</th><th>IMBP</th><th>총배분액</th><th>지급액</th><th>상태</th></tr></thead><tbody id="rt-mgmt-settle-tbody">
  <tr data-vpp="VPP-전남권" data-type="태양광"><td>광양항태양광</td><td class="mono">298.4</td><td class="mono">32.1M</td><td class="mono">3.4M</td><td class="mono" style="color:var(--semantic-negative-normal)">-0.2M</td><td class="mono">35.3M</td><td class="mono">33.5M</td><td><span class="badge ok">완료</span></td></tr>
  <tr data-vpp="VPP-전남권" data-type="태양광"><td>광양항4단계</td><td class="mono">312.7</td><td class="mono">33.8M</td><td class="mono">3.4M</td><td class="mono" style="color:var(--semantic-negative-normal)">-0.2M</td><td class="mono">37.0M</td><td class="mono">35.2M</td><td><span class="badge ok">완료</span></td></tr>
  <tr data-vpp="VPP-전남권" data-type="태양광"><td>온누리</td><td class="mono">143.2</td><td class="mono">15.5M</td><td class="mono">1.6M</td><td class="mono" style="color:var(--semantic-negative-normal)">-0.2M</td><td class="mono">16.9M</td><td class="mono">16.1M</td><td><span class="badge warn">대기</span></td></tr>
  <tr data-vpp="VPP-경북권" data-type="풍력"><td>김주풍력</td><td class="mono">421.8</td><td class="mono">45.2M</td><td class="mono">4.8M</td><td class="mono" style="color:var(--semantic-negative-normal)">-0.2M</td><td class="mono">49.8M</td><td class="mono">47.3M</td><td><span class="badge ok">완료</span></td></tr>
</tbody></table></div>`;
window['I_bidRT-mgmt']=function(){
  mkChart('c-settle2','bar',['11월','12월','1월','2월','3월','4월'],[
    {label:'DAES',data:[220,240,210,260,245,260],backgroundColor:'rgba(0,89,255,0.35)',borderWidth:0,stack:'s'},
    {label:'RTES',data:[25,28,21,29,26,25],backgroundColor:'rgba(0,212,168,0.45)',borderWidth:0,stack:'s'},
  ],{scales:{y:{stacked:true,ticks:{callback:v=>v+'M'}},x:{stacked:true}}});
};
window.bidRtMgmtApply=function(){
  const vpp=document.getElementById('brg-vpp')?.value||'전체';
  const type=document.getElementById('brg-type')?.value||'all';
  document.querySelectorAll('#rt-mgmt-settle-tbody tr').forEach(tr=>{
    let show=true;
    if(vpp!=='전체' && tr.dataset.vpp!==vpp) show=false;
    if(type!=='all' && tr.dataset.type!==type) show=false;
    tr.style.display=show?'':'none';
  });
};

