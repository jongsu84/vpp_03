// AUTO-GENERATED FROM index.html — page module: bidDA-price
window.P = window.P || {};
/* ===== 하루전입찰: 가격 전략 ===== */
window.P['bidDA-price']=()=>`
${_mkCross('bidDA-price')}
${_mkBidFilter({rightInfo:'가격 전략 · 자원별 Merit Order 적용'})}
<div class="g4">
  <div class="card acc"><div class="ct">오늘 SMP 평균 ${window.tip('오늘 SMP 평균','금일 24시간 SMP의 가중 평균','Σ(시간대별 SMP × 거래량) ÷ Σ(거래량) [원/kWh]','전일 대비 ±5% 정상 변동 / 봄·가을 음가격 위험 / 여름·겨울 피크 200원+')}</div><div class="kv">138<span class="ku">원/kWh</span></div><div class="kd up">▲ +4.1%</div></div>
  <div class="card"><div class="ct">적용 하한가 ${window.tip('적용 하한가','입찰 가능한 최저 가격','육지 재생입찰: 0원/kWh — 음(-)가격 입찰 불가','재생에너지는 음가격 시장에서 출력 감축 또는 ESS 충전으로 대응')}</div><div class="kv">0<span class="ku">원/kWh</span></div><div class="kd neu">육지 재생입찰 기준</div></div>
  <div class="card"><div class="ct">변동비(O&amp;M) ${window.tip('변동비 (O&amp;M)','단위 발전량당 운영·유지비','연간 O&amp;M 비용 ÷ 연간 발전량 [원/kWh]','이 가격 이하로 입찰 시 역마진 — 변동비 미만 가격은 자동 차단')}</div><div class="kv">12.8<span class="ku">원/kWh</span></div><div class="kd neu">역마진 방지 기준선</div></div>
  <div class="card"><div class="ct">예측 정확도 평균 ${window.tip('Merit Order 예측 정확도','각 입찰 가격대별 낙찰 확률 모델의 정확도','Backtesting: 과거 30일 동안 예측한 낙찰가가 실제와 일치한 비율','90% 이상 정상 — 낮으면 가격 결정 모델 재학습 필요 / 시즌 변경 시 일시적 하락 가능')}</div><div class="kv" style="color:var(--semantic-positive-normal)">93.2<span class="ku">%</span></div><div class="kd up">Merit Order 기준</div></div>
</div>
<div class="g2">
  <div class="card mb"><div class="sh"><div class="st">입찰 가격대 설정</div></div>
    <div class="fg"><label class="fl">입찰 하한가 (원/kWh) · 제주 -500 / 육지 0 구간</label><input class="inp" value="0" type="number"></div>
    <div class="fg"><label class="fl">입찰 상한가 (원/kWh)</label><input class="inp" value="200" type="number"></div>
    <div class="fg"><label class="fl">전략 모드</label>
      <select class="sel"><option>균형형 (우선순위 확보)</option><option>안정형 (IMBP 최소화)</option><option>공격형 (낙찰률 극대화)</option></select>
    </div>
    <div class="mr"><div class="ml">역마진 방어선</div><div class="mv mono" style="color:var(--semantic-negative-normal)">&lt; 12.8 원/kWh 차단</div></div>
    <div class="mr" style="border:none"><div class="ml">KPX 시장감시 규정 준수</div><div class="mv"><span class="badge ok">로그 투명기록</span></div></div>
  </div>
  <div class="card mb"><div class="sh"><div class="st">Merit Order · 예측정확도 기준 투찰 우선순위</div></div>
    <table class="tbl"><thead><tr><th>우선</th><th>자원</th><th>유형</th><th>NMAE</th><th>배정용량</th><th>투찰 가중치</th></tr></thead><tbody>
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
</div>
<div class="card"><div class="sh"><div class="st">가격 민감도 분석</div></div><div style="height:160px;position:relative"><canvas id="c-price" role="img" aria-label="가격 민감도"></canvas></div></div>`;
window['I_bidDA-price']=function(){
  mkChart('c-price','line',['-20%','-10%','0%','+10%','+20%'],[
    {label:'낙찰률',data:[62,78,89,93,95],borderColor:'#0059ff',borderWidth:2,pointRadius:3,tension:0.3,fill:false},
    {label:'순수익(백만원)',data:[14.2,18.1,22.5,24.3,24.9],borderColor:'#ffca42',borderWidth:2,pointRadius:3,tension:0.3,fill:false},
  ],{});
};

