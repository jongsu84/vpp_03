// AUTO-GENERATED FROM index.html — page module: bidDA-price
window.P = window.P || {};
/* ===== 하루전입찰: 가격 전략 ===== */
window.P['bidDA-price']=()=>`
${_mkCross('bidDA-price')}
${_mkBidFilter({prefix:'bdp',onChange:'bidPriceApply',rightInfo:'SMP 평균 138원/kWh · 변동비 12.8원 · 정확도 93.2%'})}
<div class="g4">
  <div class="card acc"><div class="ct">오늘 SMP 평균 ${window.tip('오늘 SMP 평균','금일 24시간 SMP의 가중 평균','Σ(시간대별 SMP × 거래량) ÷ Σ(거래량) [원/kWh]','전일 대비 ±5% 정상 변동 / 봄·가을 음가격 위험 / 여름·겨울 피크 200원+')}</div><div class="kv">138<span class="ku">원/kWh</span></div><div class="kd up">▲ +4.1%</div></div>
  <div class="card"><div class="ct">적용 하한가 ${window.tip('적용 하한가','입찰 가능한 최저 가격','육지 재생입찰: 0원/kWh — 음(-)가격 입찰 불가','재생에너지는 음가격 시장에서 출력 감축 또는 ESS 충전으로 대응')}</div><div class="kv">0<span class="ku">원/kWh</span></div><div class="kd neu">육지 재생입찰 기준</div></div>
  <div class="card"><div class="ct">변동비(O&amp;M) ${window.tip('변동비 (O&amp;M)','단위 발전량당 운영·유지비','연간 O&amp;M 비용 ÷ 연간 발전량 [원/kWh]','이 가격 이하로 입찰 시 역마진 — 변동비 미만 가격은 자동 차단')}</div><div class="kv">12.8<span class="ku">원/kWh</span></div><div class="kd neu">역마진 방지 기준선</div></div>
  <div class="card"><div class="ct">예측 정확도 평균 ${window.tip('Merit Order 예측 정확도','각 입찰 가격대별 낙찰 확률 모델의 정확도','Backtesting: 과거 30일 동안 예측한 낙찰가가 실제와 일치한 비율','90% 이상 정상 — 낮으면 가격 결정 모델 재학습 필요 / 시즌 변경 시 일시적 하락 가능')}</div><div class="kv" style="color:var(--semantic-positive-normal)">93.2<span class="ku">%</span></div><div class="kd up">Merit Order 기준</div></div>
</div>
<!-- 자원 유형별 가격 정책 (Option A) -->
<div class="card mb">
  <div class="sh">
    <div class="st">자원 유형별 가격 정책 ${window.tip('자원 유형별 가격 정책','5개 자원 유형(태양광·풍력·ESS·바이오·V2G)에 차등 적용되는 가격 산출 규칙','자원별 입찰가 = SMP_t × 가중치 (단, ≥ 변동비, ≤ 상한가)','각 유형의 변동비·SMP 가중치·상한가를 독립 설정 — 시장 정합성 70%↑ 달성 / 회사별/자원별 오버라이드는 Option C 확장에서 지원')}</div>
    <div style="display:flex;gap:6px;align-items:center">
      <span class="badge ok" style="font-size:10px">KPX 시장감시 로그 투명기록</span>
      <button class="cb p sm" onclick="bdpSavePolicy()" style="font-size:11px">정책 저장 · 재배포</button>
    </div>
  </div>
  <div class="g5" style="gap:10px">
    <!-- 태양광 -->
    <div class="card" style="padding:10px">
      <div style="font-weight:600;margin-bottom:8px"><span class="badge inf">태양광</span></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">변동비 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-sol-cost" value="5.2" step="0.1" min="0"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">SMP 가중치</label><input class="inp" type="number" id="bdp-pol-sol-w" value="0.95" step="0.01" min="0.50" max="1.50"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">상한가 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-sol-max" value="200" min="0"></div>
      <div style="font-size:10px;color:var(--semantic-label-alt);padding-top:6px;border-top:1px solid var(--semantic-line-alt);margin-top:4px" id="bdp-pol-sol-preview">예상가: 131원 (SMP×0.95)</div>
    </div>
    <!-- 풍력 -->
    <div class="card" style="padding:10px">
      <div style="font-weight:600;margin-bottom:8px"><span class="badge" style="background:var(--semantic-tag-bg-blue);color:var(--semantic-tag-label-blue)">풍력</span></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">변동비 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-win-cost" value="18.5" step="0.1" min="0"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">SMP 가중치</label><input class="inp" type="number" id="bdp-pol-win-w" value="0.88" step="0.01" min="0.50" max="1.50"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">상한가 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-win-max" value="200" min="0"></div>
      <div style="font-size:10px;color:var(--semantic-label-alt);padding-top:6px;border-top:1px solid var(--semantic-line-alt);margin-top:4px" id="bdp-pol-win-preview">예상가: 121원 (SMP×0.88)</div>
    </div>
    <!-- ESS -->
    <div class="card" style="padding:10px">
      <div style="font-weight:600;margin-bottom:8px"><span class="badge" style="background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow)">ESS</span></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">변동비 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-ess-cost" value="22.0" step="0.1" min="0"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">SMP 가중치</label><input class="inp" type="number" id="bdp-pol-ess-w" value="0.92" step="0.01" min="0.50" max="1.50"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">상한가 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-ess-max" value="220" min="0"></div>
      <div style="font-size:10px;color:var(--semantic-label-alt);padding-top:6px;border-top:1px solid var(--semantic-line-alt);margin-top:4px" id="bdp-pol-ess-preview">예상가: 127원 (SMP×0.92)</div>
    </div>
    <!-- 바이오 -->
    <div class="card" style="padding:10px">
      <div style="font-weight:600;margin-bottom:8px"><span class="badge" style="background:#e8defa;color:#6035cc">바이오</span></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">변동비 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-bio-cost" value="28.5" step="0.1" min="0"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">SMP 가중치</label><input class="inp" type="number" id="bdp-pol-bio-w" value="1.05" step="0.01" min="0.50" max="1.50"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">상한가 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-bio-max" value="250" min="0"></div>
      <div style="font-size:10px;color:var(--semantic-label-alt);padding-top:6px;border-top:1px solid var(--semantic-line-alt);margin-top:4px" id="bdp-pol-bio-preview">예상가: 145원 (SMP×1.05)</div>
    </div>
    <!-- V2G -->
    <div class="card" style="padding:10px">
      <div style="font-weight:600;margin-bottom:8px"><span class="badge" style="background:var(--semantic-tag-bg-green);color:var(--semantic-tag-label-green)">V2G</span></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">변동비 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-v2g-cost" value="8.0" step="0.1" min="0"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">SMP 가중치</label><input class="inp" type="number" id="bdp-pol-v2g-w" value="0.90" step="0.01" min="0.50" max="1.50"></div>
      <div class="fg" style="margin-bottom:6px"><label class="fl" style="font-size:11px">상한가 (원/kWh)</label><input class="inp" type="number" id="bdp-pol-v2g-max" value="180" min="0"></div>
      <div style="font-size:10px;color:var(--semantic-label-alt);padding-top:6px;border-top:1px solid var(--semantic-line-alt);margin-top:4px" id="bdp-pol-v2g-preview">예상가: 124원 (SMP×0.90)</div>
    </div>
  </div>
  <div style="font-size:11px;color:var(--semantic-label-alt);margin-top:10px;line-height:18px;padding:8px 10px;background:var(--semantic-background-2);border-radius:4px">
    ℹ 각 자원 유형의 입찰가 = <b>max(변동비, min(SMP × 가중치, 상한가))</b> · 변동비 미만 자동 차단(역마진 방어). 시장 환경 변경 시 [정책 저장] 클릭 → 다음 입찰 차수부터 반영. 회사별/개별 자원 오버라이드는 Option C 확장에서 지원.
  </div>
</div>

<!-- Merit Order (풀 폭) -->
<div class="card mb"><div class="sh"><div class="st">Merit Order · 예측정확도 기준 투찰 우선순위</div></div>
    <table class="tbl"><thead><tr><th>우선</th><th>자원</th><th>유형</th><th>NMAE</th><th>배정용량</th><th>투찰 가중치</th></tr></thead><tbody id="bdp-merit-tbody">
      <tr><td class="mono">1</td><td>순천 바이오가스</td><td><span class="badge" style="background:var(--semantic-tag-bg-violet,#e8defa);color:#6035cc">바이오</span></td><td class="mono" style="color:var(--semantic-positive-normal)">2.1%</td><td class="mono">1.42MW</td><td><span class="badge ok">100%</span></td></tr>
      <tr><td class="mono">2</td><td>여수 바이오매스</td><td><span class="badge" style="background:var(--semantic-tag-bg-violet,#e8defa);color:#6035cc">바이오</span></td><td class="mono" style="color:var(--semantic-positive-normal)">2.8%</td><td class="mono">2.85MW</td><td><span class="badge ok">100%</span></td></tr>
      <tr><td class="mono">3</td><td>광양항태양광 01단계</td><td><span class="badge inf">태양광</span></td><td class="mono" style="color:var(--semantic-positive-normal)">4.2%</td><td class="mono">2.18MW</td><td><span class="badge ok">100%</span></td></tr>
      <tr><td class="mono">4</td><td>광양항태양광 04단계</td><td><span class="badge inf">태양광</span></td><td class="mono" style="color:var(--semantic-positive-normal)">5.1%</td><td class="mono">2.09MW</td><td><span class="badge ok">100%</span></td></tr>
      <tr><td class="mono">5</td><td>금능1호 ESS</td><td><span class="badge" style="background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow)">ESS</span></td><td class="mono">5.5%</td><td class="mono">1.80MW</td><td><span class="badge ok">98%</span></td></tr>
      <tr><td class="mono">6</td><td>해맞이 태양광</td><td><span class="badge inf">태양광</span></td><td class="mono">6.8%</td><td class="mono">0.95MW</td><td><span class="badge inf">95%</span></td></tr>
      <tr><td class="mono">7</td><td>온누리 태양광</td><td><span class="badge inf">태양광</span></td><td class="mono">7.4%</td><td class="mono">0.94MW</td><td><span class="badge inf">90%</span></td></tr>
      <tr><td class="mono">8</td><td>김주풍력 02단계</td><td><span class="badge" style="background:var(--semantic-tag-bg-blue);color:var(--semantic-tag-label-blue)">풍력</span></td><td class="mono">8.2%</td><td class="mono">9.50MW</td><td><span class="badge inf">88%</span></td></tr>
      <tr><td class="mono">9</td><td>김주풍력 01단계</td><td><span class="badge" style="background:var(--semantic-tag-bg-blue);color:var(--semantic-tag-label-blue)">풍력</span></td><td class="mono" style="color:var(--palette-yellow-40)">9.1%</td><td class="mono">3.80MW</td><td><span class="badge warn">80%</span></td></tr>
      <tr><td class="mono">10</td><td>광주 V2G 스테이션</td><td><span class="badge" style="background:var(--semantic-tag-bg-green);color:var(--semantic-tag-label-green)">V2G</span></td><td class="mono" style="color:var(--palette-yellow-40)">10.5%</td><td class="mono">0.72MW</td><td><span class="badge warn">75%</span></td></tr>
      <tr><td class="mono">11</td><td>전남 V2G 허브</td><td><span class="badge" style="background:var(--semantic-tag-bg-green);color:var(--semantic-tag-label-green)">V2G</span></td><td class="mono" style="color:var(--palette-yellow-40)">11.8%</td><td class="mono">1.35MW</td><td><span class="badge warn">70%</span></td></tr>
    </tbody></table>
    <div style="font-size:12px;color:var(--semantic-label-alt);margin-top:8px;line-height:18px">※ 예측 정확도 높은 자원을 우선 투찰해 집합 전체 IMBP 페널티 리스크를 분산합니다.</div>
</div>
<div class="card"><div class="sh"><div class="st">가격 민감도 분석</div></div><div style="height:160px;position:relative"><canvas id="c-price" role="img" aria-label="가격 민감도"></canvas></div></div>`;
// ===== 자원 유형별 가격 정책 (Option A) =====
window.bdpPolicy=window.bdpPolicy||{
  태양광:{cost:5.2,w:0.95,max:200},
  풍력:{cost:18.5,w:0.88,max:200},
  ESS:{cost:22.0,w:0.92,max:220},
  바이오:{cost:28.5,w:1.05,max:250},
  V2G:{cost:8.0,w:0.90,max:180}
};
window._bdpTypeMap={sol:'태양광',win:'풍력',ess:'ESS',bio:'바이오',v2g:'V2G'};

function _bdpReadCard(prefix){
  return {
    cost:parseFloat(document.getElementById('bdp-pol-'+prefix+'-cost')?.value)||0,
    w:parseFloat(document.getElementById('bdp-pol-'+prefix+'-w')?.value)||0,
    max:parseFloat(document.getElementById('bdp-pol-'+prefix+'-max')?.value)||0
  };
}

window.bdpUpdatePreview=function(){
  // KPI에서 SMP 평균 읽기 (138원 가정 — 첫 KPI 카드)
  var smpEl=document.querySelector('.g4 .card.acc .kv');
  var smp=smpEl?parseFloat(smpEl.textContent.match(/\d+/)?.[0]):138;
  if(!smp||isNaN(smp)) smp=138;
  Object.keys(window._bdpTypeMap).forEach(function(prefix){
    var p=_bdpReadCard(prefix);
    var raw=smp*p.w;
    var clamped=Math.max(p.cost,Math.min(p.max,raw));
    var pv=document.getElementById('bdp-pol-'+prefix+'-preview');
    if(pv){
      var note=raw<p.cost?' · 변동비 가드':raw>p.max?' · 상한 가드':'';
      pv.textContent='예상가: '+clamped.toFixed(0)+'원 (SMP×'+p.w.toFixed(2)+')'+note;
    }
  });
};

window.bdpSavePolicy=function(){
  // 5개 카드 검증
  var errs=[];
  var newPol={};
  Object.keys(window._bdpTypeMap).forEach(function(prefix){
    var label=window._bdpTypeMap[prefix];
    var p=_bdpReadCard(prefix);
    if(p.cost<0) errs.push(label+': 변동비는 0 이상');
    if(p.w<0.5||p.w>1.5) errs.push(label+': 가중치는 0.50~1.50');
    if(p.max<=0) errs.push(label+': 상한가는 0 초과');
    if(p.max<p.cost) errs.push(label+': 상한가 < 변동비 (역마진)');
    newPol[label]=p;
  });
  if(errs.length>0){toast(errs[0],'warn');return;}
  if(!confirm('자원 유형별 가격 정책 5종을 저장하고 다음 입찰 차수부터 적용하시겠습니까?\n\n변경 내역은 감사이력에 영구 보관됩니다.')) return;
  window.bdpPolicy=newPol;
  window.bdpUpdatePreview();
  toast('정책 저장 완료 — 5개 자원 유형 (태양광·풍력·ESS·바이오·V2G) 적용');
};

window['I_bidDA-price']=function(){
  // 5개 카드 입력 변경 시 미리보기 자동 갱신
  ['sol','win','ess','bio','v2g'].forEach(function(p){
    ['cost','w','max'].forEach(function(f){
      var el=document.getElementById('bdp-pol-'+p+'-'+f);
      if(el) el.addEventListener('input',window.bdpUpdatePreview);
    });
  });
  window.bdpUpdatePreview();
  mkChart('c-price','line',['-20%','-10%','0%','+10%','+20%'],[
    {label:'낙찰률',data:[62,78,89,93,95],borderColor:'#0059ff',borderWidth:2,pointRadius:3,tension:0.3,fill:false},
    {label:'순수익(백만원)',data:[14.2,18.1,22.5,24.3,24.9],borderColor:'#ffca42',borderWidth:2,pointRadius:3,tension:0.3,fill:false},
  ],{});
};
window.bidPriceApply=function(){
  const type=document.getElementById('bdp-type')?.value||'all';
  document.querySelectorAll('#bdp-merit-tbody tr').forEach(tr=>{
    const cType=tr.cells[2]?.textContent.trim();
    tr.style.display=(type==='all'||cType===type)?'':'none';
  });
};

