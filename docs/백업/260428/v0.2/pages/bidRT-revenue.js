// AUTO-GENERATED FROM index.html — page module: bidRT-revenue
window.P = window.P || {};
/* ===== 실시간입찰: 입찰수익 시뮬 ===== */
window.P['bidRT-revenue']=()=>`
${_mkCross('bidRT-revenue')}
${_mkBidFilter({prefix:'brv',onChange:'bidRtRevApply',rightInfo:'금일 순수익 +19.13M · DAES 17.73M · IMBP -0.48M'})}
<div class="g4">
  <div class="card acc"><div class="ct">예상 순수익(금일) ${window.tip('금일 예상 순수익','오늘 발생한 모든 정산 항목의 합산','DAES + RTES - IMBP [백만원]','시장 마감 전 추정값 — KPX 06:00 확정 후 ±5% 변동 가능')}</div><div class="kv" id="brv-net">19.13<span class="ku">백만원</span></div><div class="kd up">DAES+RTES-IMBP</div></div>
  <div class="card"><div class="ct">DAES (하루전 매출) ${window.tip('DAES (하루전 매출)','하루전 시장 낙찰 정산금','Σ(낙찰량 × 낙찰가) [백만원]','전체 매출의 가장 큰 비중 — 보통 80~90%')}</div><div class="kv" id="brv-daes">17.73<span class="ku">백만원</span></div></div>
  <div class="card"><div class="ct">RTES (실시간 편차) ${window.tip('RTES (실시간 편차)','RT 시장에서 발생한 편차 정산','Σ(실측 - DA 낙찰량) × RT SMP [백만원]','+ 또는 - 가능 / DA 부족 시 +수익, DA 초과 시 -손실')}</div><div class="kv" id="brv-rtes">1.88<span class="ku">백만원</span></div></div>
  <div class="card"><div class="ct">IMBP (페널티) ${window.tip('IMBP 페널티','허용오차 초과 시 부과되는 페널티','Σ(초과 편차 × SMP × 1.2) [백만원]','오차 8% 이내로 관리 시 0원 — 예측 정확도가 핵심')}</div><div class="kv" id="brv-imbp" style="color:var(--semantic-negative-normal)">0.48<span class="ku">백만원</span></div></div>
</div>
<div class="g2">
  <div class="card mb"><div class="sh"><div class="st">전략 시나리오 비교</div></div><div style="height:170px;position:relative"><canvas id="c-scenario" role="img" aria-label="시나리오 비교"></canvas></div></div>
  <div class="card mb"><div class="sh"><div class="st">RT SMP 민감도 분석</div></div><div style="height:170px;position:relative"><canvas id="c-sens" role="img" aria-label="민감도"></canvas></div></div>
</div>
<div class="card"><div class="sh"><div class="st">가상 정산 내역 · 이중정산 기준</div><div style="display:flex;gap:6px"><button class="cb n sm" onclick="rtvOpenPreview()">미리보기</button><button class="cb p sm" onclick="rtvDownloadPDF()">PDF 다운로드</button></div></div>
<table class="tbl"><thead><tr><th>정산 항목</th><th>산식</th><th>금액</th><th>비고</th></tr></thead><tbody>
  <tr><td>DA 에너지정산금 DAES</td><td class="mono" style="font-size:12px">DA 낙찰량 × DA SMP × h</td><td class="mono" style="color:var(--semantic-positive-normal)">+15,842천원</td><td>DA 기준</td></tr>
  <tr><td>RT 편차정산금 RTES</td><td class="mono" style="font-size:12px">(실측 − DA 낙찰) × RT SMP</td><td class="mono" style="color:var(--semantic-positive-normal)">+1,883천원</td><td>실시간 편차</td></tr>
  <tr><td>용량정산금 CP</td><td class="mono" style="font-size:12px">가용용량 × CP 단가</td><td class="mono">+3,120천원</td><td>월 정산</td></tr>
  <tr><td>IMBP 페널티</td><td class="mono" style="font-size:12px">오차량(|Δ|&gt;5%) × 페널티단가</td><td class="mono" style="color:var(--semantic-negative-normal)">-480천원</td><td>차감</td></tr>
  <tr style="font-weight:600"><td>합계 순수익</td><td></td><td class="mono" style="color:var(--semantic-brand-primary)">+20,365천원</td><td></td></tr>
</tbody></table></div>

<!-- 실시간 입찰 가상 정산서 미리보기 / PDF 모달 -->
<div class="modal-backdrop" id="modal-rtv-doc" style="display:none" onclick="closeModalBg(event,'modal-rtv-doc')">
  <div class="modal" style="width:760px;max-height:min(82vh,820px);display:flex;flex-direction:column;overflow:hidden">
    <div class="modal-hdr no-print" style="flex-shrink:0;background:var(--semantic-background-1);position:relative;z-index:2">
      <span class="modal-title">실시간 입찰 가상 정산서</span>
      <button class="modal-close" onclick="closeModal('modal-rtv-doc')" aria-label="닫기">✕</button>
    </div>
    <div class="modal-body" id="rtv-doc-body" style="overflow-y:auto;flex:1 1 auto;min-height:0">
      <div style="text-align:center;padding-bottom:18px;border-bottom:2px solid var(--semantic-label-strong);margin-bottom:20px">
        <div style="font-size:11px;color:var(--semantic-label-alt);letter-spacing:1px">60Hz · VPP 집합운영자</div>
        <div style="font-size:22px;font-weight:700;margin-top:6px">실시간 입찰 가상 정산서</div>
        <div style="font-size:12px;color:var(--semantic-label-alt);margin-top:4px">STL-2026-04-RTV · 시뮬레이션 · 발행일 2026-04-28</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px 24px;font-size:12px;margin-bottom:20px;line-height:20px">
        <div><b style="color:var(--semantic-label-normal)">정산 기준일</b> &nbsp; 2026.04.28 (금일)</div>
        <div><b style="color:var(--semantic-label-normal)">확정 예정</b> &nbsp; 2026-04-29 06:00 (KPX)</div>
        <div><b style="color:var(--semantic-label-normal)">정산 모드</b> &nbsp; 이중정산 (DA + RT)</div>
        <div><b style="color:var(--semantic-label-normal)">대상 자원</b> &nbsp; 13개소</div>
      </div>
      <div style="font-size:13px;font-weight:600;margin-bottom:8px">정산 산식 상세</div>
      <table class="tbl" style="margin-bottom:18px">
        <thead><tr><th>정산 항목</th><th>산식</th><th style="text-align:right">금액</th></tr></thead>
        <tbody>
          <tr><td><b>① DA 에너지정산금 (DAES)</b></td><td class="mono" style="font-size:11px">DA 낙찰량 × DA SMP × h</td><td class="mono" style="text-align:right;color:var(--semantic-positive-normal);font-weight:600">+15.84M</td></tr>
          <tr><td><b>② RT 편차정산금 (RTES)</b></td><td class="mono" style="font-size:11px">(실측 − DA 낙찰) × RT SMP</td><td class="mono" style="text-align:right;color:var(--semantic-positive-normal)">+1.88M</td></tr>
          <tr><td><b>③ 용량정산금 (CP)</b></td><td class="mono" style="font-size:11px">가용용량(11.4MW) × CP 단가</td><td class="mono" style="text-align:right;color:var(--semantic-positive-normal)">+3.12M</td></tr>
          <tr style="background:var(--semantic-tag-bg-green)"><td><b>소계</b></td><td class="mono" style="font-size:11px">① + ② + ③</td><td class="mono" style="text-align:right;color:var(--semantic-positive-normal);font-weight:700">+20.84M</td></tr>
          <tr><td>④ IMBP 페널티</td><td class="mono" style="font-size:11px">오차량(|Δ|&gt;5%) × SMP × 1.2</td><td class="mono" style="text-align:right;color:var(--semantic-negative-normal)">-0.48M</td></tr>
          <tr><td>⑤ 운영 수수료 (5%)</td><td class="mono" style="font-size:11px">소계 × 5%</td><td class="mono" style="text-align:right;color:var(--semantic-negative-normal)">-1.04M</td></tr>
          <tr style="background:var(--semantic-brand-primary-assistive);font-weight:700"><td colspan="2">최종 순 지급액</td><td class="mono" style="text-align:right;font-size:16px;color:var(--semantic-brand-primary)">+19.32M</td></tr>
        </tbody>
      </table>
      <div style="font-size:13px;font-weight:600;margin-bottom:8px">자원별 명세 (요약)</div>
      <table class="tbl" style="margin-bottom:18px">
        <thead><tr><th>자원</th><th>유형</th><th>실측(MWh)</th><th style="text-align:right">순 지급</th></tr></thead>
        <tbody>
          <tr><td>광양항태양광 01단계</td><td>태양광</td><td class="mono">23.4</td><td class="mono" style="text-align:right;color:var(--semantic-brand-primary)">+2.65M</td></tr>
          <tr><td>광양항태양광 04단계</td><td>태양광</td><td class="mono">22.6</td><td class="mono" style="text-align:right;color:var(--semantic-brand-primary)">+2.55M</td></tr>
          <tr><td>해맞이 태양광</td><td>태양광</td><td class="mono">10.3</td><td class="mono" style="text-align:right;color:var(--semantic-brand-primary)">+1.16M</td></tr>
          <tr><td>온누리 태양광</td><td>태양광</td><td class="mono">10.1</td><td class="mono" style="text-align:right;color:var(--semantic-brand-primary)">+1.14M</td></tr>
          <tr><td>금능1호 태양광</td><td>태양광</td><td class="mono">8.4</td><td class="mono" style="text-align:right;color:var(--semantic-brand-primary)">+0.95M</td></tr>
          <tr><td>김주풍력 01단계</td><td>풍력</td><td class="mono">42.6</td><td class="mono" style="text-align:right;color:var(--semantic-brand-primary)">+4.81M</td></tr>
          <tr><td>김주풍력 02단계</td><td>풍력</td><td class="mono">52.8</td><td class="mono" style="text-align:right;color:var(--semantic-brand-primary)">+5.96M</td></tr>
          <tr><td>금능1호 ESS</td><td>ESS</td><td class="mono">9.1</td><td class="mono" style="text-align:right;color:var(--semantic-brand-primary)">+1.03M</td></tr>
          <tr style="background:var(--semantic-background-2);font-weight:600"><td colspan="2">합계</td><td class="mono">179.3 MWh</td><td class="mono" style="text-align:right;color:var(--semantic-brand-primary)">+19.32M</td></tr>
        </tbody>
      </table>
      <div style="font-size:11px;color:var(--semantic-label-alt);line-height:18px;padding-top:14px;border-top:1px solid var(--semantic-line-alt)">
        ※ 본 정산서는 <b>이중정산 (DAES + RTES)</b> 시뮬레이션이며 KPX 익일 06:00 확정 후 ±5% 변동 가능<br>
        ※ IMBP 페널티는 시간대별 편차율 5% 초과 구간 합산 (SMP × 1.2 단가 적용)<br>
        ※ 운영 수수료는 60Hz VPP 집합운영 보수 (계약 5% 적용)<br>
        ※ 실시간 시장 정산은 익월 10일 사업자 계좌로 자동 입금 — 분쟁 시 14일 이내 이의신청<br>
        ※ SHA-256 해시 무결성 로그와 함께 5년 영구 보관
      </div>
    </div>
    <div class="modal-footer no-print" style="flex-shrink:0;background:var(--semantic-background-1);position:relative;z-index:2">
      <button class="cb n" onclick="closeModal('modal-rtv-doc')">닫기</button>
      <button class="cb p" onclick="rtvDownloadPDF()">PDF 다운로드</button>
    </div>
  </div>
</div>`;
window['I_bidRT-revenue']=function(){
  mkChart('c-scenario','bar',['DAES','RTES','CP','IMBP','순수익'],[
    {label:'안정형',data:[15.8,1.9,3.1,-0.5,20.3],backgroundColor:'rgba(0,212,168,0.45)',borderWidth:0},
    {label:'공격형',data:[19.4,2.4,3.1,-2.1,22.8],backgroundColor:'rgba(245,158,11,0.45)',borderWidth:0},
  ],{scales:{y:{ticks:{callback:v=>v+'M'}}}});
  mkChart('c-sens','line',['-20%','-10%','0%','+10%','+20%'],[{data:[16.3,18.2,20.3,22.4,24.5],borderColor:'#0059ff',borderWidth:2,pointRadius:3,tension:0.3,fill:true,backgroundColor:'rgba(0,89,255,0.07)'}],{});
};
window.rtvOpenPreview=function(){ openModal('modal-rtv-doc'); };
window.rtvDownloadPDF=function(){
  const wasOpen=document.getElementById('modal-rtv-doc')?.style.display==='flex';
  if(!wasOpen) openModal('modal-rtv-doc');
  const prevTitle=document.title;
  document.title='실시간_입찰_가상정산서_2026-04-28';
  setTimeout(()=>{
    window.print();
    document.title=prevTitle;
  },wasOpen?50:250);
};
window.bidRtRevApply=function(){
  const vpp=document.getElementById('brv-vpp')?.value||'전체';
  const type=document.getElementById('brv-type')?.value||'all';
  const vMul={'전체':1.0,'VPP-전남권':0.62,'VPP-제주권':0.18,'VPP-경북권':0.20}[vpp]||1.0;
  const tMul={'all':1.0,'태양광':0.55,'풍력':0.30,'ESS':0.08,'바이오':0.05,'V2G':0.02}[type]||1.0;
  const m=vMul*tMul;
  const Q=id=>document.getElementById(id);
  if(Q('brv-net')) Q('brv-net').innerHTML=(19.13*m).toFixed(2)+'<span class="ku">백만원</span>';
  if(Q('brv-daes')) Q('brv-daes').innerHTML=(17.73*m).toFixed(2)+'<span class="ku">백만원</span>';
  if(Q('brv-rtes')) Q('brv-rtes').innerHTML=(1.88*m).toFixed(2)+'<span class="ku">백만원</span>';
  if(Q('brv-imbp')) Q('brv-imbp').innerHTML=(0.48*m).toFixed(2)+'<span class="ku">백만원</span>';
};

