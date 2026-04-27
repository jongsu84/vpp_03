// AUTO-GENERATED FROM index.html — page module: pre-mkt
window.P = window.P || {};
/* ===== 예측: 시장가/계통 ===== */
window.P['pre-mkt']=()=>`
${_mkFilterBar({showPeriod:false,interval:'1시간',showLevel:false,showTarget:false,extras:`
  <div class="fbar-item">
    <span class="fbar-lbl">데이터 소스</span>
    <select class="fbar-sel"><option>KPX SMP</option><option>계통 주파수</option><option>전력 수요</option><option>재생에너지 비중</option></select>
  </div>
  <div class="fbar-item">
    <span class="fbar-lbl">지역</span>
    <select class="fbar-sel"><option>전국</option><option>육지</option><option>제주</option></select>
  </div>`})}
<div class="g4">
  <div class="card acc"><div class="ct">현재 SMP ${window.tip('현재 SMP','System Marginal Price — 그 시점의 한계 발전기 가격','KPX 1시간 단위 결정 — 모든 정산의 기준 단가','국내 평균 110~130원/kWh — 봄가을 낮음, 여름·겨울 피크 시간 200원+ 가능')}</div><div class="kv">124.3<span class="ku">원/kWh</span></div><div class="kd up">▲ 전일 대비 +2.1원</div></div>
  <div class="card"><div class="ct">음(-)가격 위험 ${window.tip('음(-)가격 위험','SMP가 0 또는 음수가 될 가능성 (전력 과잉 공급)','과거 30일 데이터 기반 통계 모델 — 봄·가을 일요일 위험 ↑','음가격 시 발전소는 발전할수록 손실 — 출력 감축 또는 보조서비스 시장 전환 권장')}</div><div class="kv" style="color:var(--acc)">12<span class="ku">%</span></div></div>
  <div class="card"><div class="ct">계통 혼잡도 ${window.tip('계통 혼잡도','계통 송전선 사용률에 따른 혼잡 위험','한전 송전망 사용률 90%+ 시 혼잡 발생 → 우회 발전 단가 적용','혼잡 시 출력제어 가능성 ↑ — 입찰 단가 보수적 산정 권장')}</div><div class="kv" style="color:var(--acc3)">중<span class="ku">위험</span></div></div>
  <div class="card"><div class="ct">예비력 ${window.tip('계통 예비력','전력 수요 대비 공급 여유분 (예측 오차/사고 대응)','총 공급 능력 - 최대 부하 [GW]','5~10GW 정상 / 5GW 미만 위험 — 예비력 부족 시 SMP 급등 가능')}</div><div class="kv">8.2<span class="ku">GW</span></div></div>
</div>
<div class="card mb"><div class="sh"><div class="st">SMP 예측 (24시간)</div></div><div style="height:160px;position:relative"><canvas id="c-smp" role="img" aria-label="SMP 예측"></canvas></div></div>
<div class="g2">
  <div class="card mb">
    <div class="sh"><div class="st">계통 상태</div></div>
    <div class="mr"><div class="ml">계통 주파수</div><div class="mv mono" style="color:var(--acc)">60.02 Hz</div></div>
    <div class="mr"><div class="ml">전압</div><div class="mv mono">154.3 kV</div></div>
    <div class="mr"><div class="ml">지역 순부하</div><div class="mv mono">42.8 GW</div></div>
    <div class="mr" style="border:none"><div class="ml">재생에너지 비중</div><div class="mv mono">38.4%</div></div>
  </div>
  <div class="card mb">
    <div class="sh"><div class="st">ESS 충방전 스케줄 제안</div></div>
    <div class="al"><div class="ad" style="background:var(--acc2)"></div><div class="am">09~11시 SMP 낮음 → ESS 충전 권장</div><div class="at">예측</div></div>
    <div class="al"><div class="ad" style="background:var(--acc)"></div><div class="am">14~16시 SMP 피크 → 방전 수익 극대화</div><div class="at">권장</div></div>
    <div class="al"><div class="ad" style="background:var(--acc3)"></div><div class="am">18~19시 음가격 가능성 12% — 주의</div><div class="at">주의</div></div>
  </div>
</div>`;
window['I_pre-mkt']=function(){
  const smp=[110,108,105,103,100,98,102,115,124,131,135,128,126,129,132,135,138,132,125,118,112,108,106,104];
  mkChart('c-smp','line',Array.from({length:24},(_,i)=>i+'h'),[{data:smp,borderColor:'#ffca42',borderWidth:2,pointRadius:0,tension:0.4,fill:true,backgroundColor:'rgba(245,158,11,0.07)'}],{scales:{y:{title:{display:true,text:'원/kWh',color:'#666666',font:{size:9}}}}});
};

