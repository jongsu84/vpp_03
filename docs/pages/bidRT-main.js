// AUTO-GENERATED FROM index.html — page module: bidRT-main
window.P = window.P || {};
/* ===== 실시간입찰: 입찰 운영 (T-75분) ===== */
window.P['bidRT-main']=()=>`
${_mkCross('bidRT-main')}
${_mkBidFilter({rightInfo:'T-75분 마감 · 15분 단위 갱신'})}

<!-- 페이지 탭 -->
<div style="display:flex;gap:24px;margin-bottom:16px;border-bottom:1px solid var(--semantic-line-normal)">
  <div class="pg-tab active" onclick="pgRtTab(this,'today')">실시간 현황</div>
  <div class="pg-tab" onclick="pgRtTab(this,'forecast')">단기 예측 현황</div>
  <div class="pg-tab" onclick="pgRtTab(this,'history')">실시간 내역</div>
</div>

<!-- 액션 버튼 바 (공통) -->
<div style="display:flex;gap:8px;margin-bottom:16px;justify-content:flex-end;flex-wrap:wrap">
  <button class="cb n sm" onclick="openModal('modal-rt-settings')">실시간 설정</button>
  <button class="cb n sm" onclick="openModal('modal-model-settings-rt')">예측모델 설정</button>
  <button class="cb n sm" onclick="toast('실시간 이력을 새로고침했습니다.')">이력 새로고침</button>
  <button class="cb p sm" onclick="openModal('modal-rt-refresh')">즉시 갱신</button>
</div>

<!-- ========== VIEW 1: 실시간 현황 ========== -->
<div id="pg-rt-view-today">
  <div class="g4">
    <div class="card acc"><div class="ct">다음 마감 ${window.tip('실시간 입찰 다음 마감','T-75 (실시간 75분 전) 입찰 제출 마감까지 남은 시간','15분 단위 96회/일 입찰 — 매시 00·15·30·45분 마감','자동 제출 기본 — 마감 5분 전 수동 개입 가능')}</div><div class="kv">T-75<span class="ku">분</span></div><div class="kd neu">18분 전 · 15:15 제출</div></div>
    <div class="card"><div class="ct">현재 입찰 상태 ${window.tip('현재 입찰 상태','금회 차수의 입찰 진행 상태','진행중: 예측 갱신 중 / 제출완료: KPX 전송 완료 / 낙찰: 결과 확정','오류 발생 시 직전 차수 입찰값 재사용 (fallback)')}</div><div class="kv" style="color:var(--semantic-brand-primary)">진행중</div><div class="kd neu">초단기 예보 반영</div></div>
    <div class="card"><div class="ct">DA 대비 갱신폭 ${window.tip('DA 대비 갱신폭','전일 하루전(DA) 입찰량 대비 실시간 갱신량의 차이','RT 입찰량 - DA 입찰량 [MW]','±5MW 이내 정상 / ±10MW 초과 시 IMBP 위험 — 사유 점검 필요')}</div><div class="kv">+2.1<span class="ku">MW</span></div><div class="kd up">실측 상향 반영</div></div>
    <div class="card"><div class="ct">현재 Imbalance ${window.tip('현재 Imbalance','입찰량 대비 실측 발전량의 절대 편차율','|실측 - 입찰| ÷ 입찰 × 100 [%]','5% 이하 정상 / 5~10% 주의 / 10% 초과 IMBP 페널티 발생 (kWh당 SMP의 1.2배)')}</div><div class="kv" style="color:var(--palette-yellow-40)">1.8<span class="ku">%</span></div><div class="kd neu">허용 범위 내 (임계 5%)</div></div>
  </div>
  <div class="card mb"><div class="sh"><div class="st">15분 단위 RT 갱신 로직 현황</div><span class="kpi-pill">T-75분 마감</span></div>
    <div class="al"><div class="ad" style="background:var(--semantic-positive-normal)"></div><div class="am"><b>T-90</b> 최근 15분 현장 실측값 수집 완료</div><div class="at">15분 전</div></div>
    <div class="al"><div class="ad" style="background:var(--semantic-positive-normal)"></div><div class="am"><b>T-85</b> 초단기 기상 예보 결합 · 입찰값 재계산</div><div class="at">10분 전</div></div>
    <div class="al"><div class="ad" style="background:var(--semantic-brand-primary)"></div><div class="am"><b>T-80</b> DA 대비 Imbalance 검증 · 페널티 시뮬</div><div class="at">진행중</div></div>
    <div class="al"><div class="ad" style="background:var(--semantic-line-strong)"></div><div class="am"><b>T-75</b> KPX 실시간 시장 제출</div><div class="at">18분 후</div></div>
  </div>
  <div class="g2">
    <div class="card mb"><div class="sh"><div class="st">DA 입찰값 vs RT 갱신값 · 금일</div><span class="sa" onclick="activate('bidRT-dual')">편차 관리 ↗</span></div><div style="height:180px;position:relative"><canvas id="c-rtbid" role="img" aria-label="DA vs RT"></canvas></div></div>
    <div class="card mb"><div class="sh"><div class="st">초단기 예보 입력</div></div>
      <div class="mr"><div class="ml">일사량 (15분)</div><div class="mv mono">782 W/㎡</div></div>
      <div class="mr"><div class="ml">운량</div><div class="mv mono">32%</div></div>
      <div class="mr"><div class="ml">기온</div><div class="mv mono">22.4 ℃</div></div>
      <div class="mr"><div class="ml">풍속</div><div class="mv mono">3.2 m/s</div></div>
      <div class="mr" style="border:none"><div class="ml">모델 신뢰도</div><div class="mv"><span class="badge ok">96.4%</span></div></div>
    </div>
  </div>
</div>

<!-- ========== VIEW 2: 단기 예측 현황 ========== -->
<div id="pg-rt-view-forecast" style="display:none">
  <div class="g4">
    <div class="card acc"><div class="ct">앙상블 신뢰도</div><div class="kv" style="color:var(--semantic-positive-normal)">96.4<span class="ku">%</span></div><div class="kd up">hybrid-ensemble 기본</div></div>
    <div class="card"><div class="ct">+15분 horizon NMAE</div><div class="kv">4.2<span class="ku">%</span></div><div class="kd up">최근 24시간</div></div>
    <div class="card"><div class="ct">+30분 horizon NMAE</div><div class="kv">5.8<span class="ku">%</span></div><div class="kd neu">최근 24시간</div></div>
    <div class="card"><div class="ct">+60분 horizon NMAE</div><div class="kv" style="color:var(--palette-yellow-40)">8.1<span class="ku">%</span></div><div class="kd neu">정확도 하락 영역</div></div>
  </div>
  <div class="card mb"><div class="sh"><div class="st">초단기 예보 모델 상태</div><span class="kpi-pill" style="font-size:11px">2분 이내 수신</span></div>
    <table class="tbl"><thead><tr><th>모델</th><th>종류</th><th>응답시간</th><th>최종 수신</th><th>신뢰도</th><th>NMAE (최근 24h)</th><th>상태</th></tr></thead><tbody>
      <tr><td class="mono">hybrid-ensemble</td><td>앙상블 (기본)</td><td class="mono">2.1s</td><td class="mono">2분 전</td><td class="mono" style="color:var(--semantic-positive-normal)">96.4%</td><td class="mono">5.3%</td><td><span class="badge ok">정상</span></td></tr>
      <tr><td class="mono">nowcast-v2</td><td>자체 초단기</td><td class="mono">1.2s</td><td class="mono">2분 전</td><td class="mono">96.2%</td><td class="mono">5.8%</td><td><span class="badge ok">정상</span></td></tr>
      <tr><td class="mono">kma-ultrashort</td><td>기상청 초단기</td><td class="mono">0.8s</td><td class="mono">1분 전</td><td class="mono">94.8%</td><td class="mono">6.9%</td><td><span class="badge ok">정상</span></td></tr>
    </tbody></table>
  </div>
  <div class="card mb"><div class="sh"><div class="st">자원별 단기 예측값 (15/30/60분 horizon)</div><button class="cb n sm" onclick="toast('자원별 예측값을 재생성합니다.')">재생성</button></div>
  <div style="overflow-x:auto">
  <table class="tbl"><thead><tr><th>자원명</th><th>발전원</th><th>현재 출력</th><th>+15분 예측</th><th>+30분 예측</th><th>+60분 예측</th><th>사용 모델</th><th>신뢰도</th></tr></thead><tbody>
    ${[
      ['광양항태양광 01단계','태양광',2.18,2.22,2.16,1.95,'hybrid-ensemble',96.8],
      ['광양항태양광 04단계','태양광',2.09,2.14,2.08,1.88,'hybrid-ensemble',96.2],
      ['해맞이 태양광','태양광',0.95,0.96,0.93,0.82,'nowcast-v2',95.1],
      ['온누리 태양광','태양광',0.94,0.95,0.91,0.80,'nowcast-v2',94.8],
      ['금능1호 태양광','태양광',0.88,0.85,0.82,0.72,'nowcast-v2',91.4],
      ['김주풍력 01단계','풍력',3.80,3.95,4.10,4.25,'kma-ultrashort',93.6],
    ].map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td class="mono">${r[2]} MW</td><td class="mono" style="color:var(--semantic-brand-primary)">${r[3]} MW</td><td class="mono">${r[4]} MW</td><td class="mono" style="color:var(--semantic-label-alt)">${r[5]} MW</td><td class="mono" style="font-size:12px">${r[6]}</td><td class="mono" style="color:${r[7]>=95?'var(--semantic-positive-normal)':(r[7]>=92?'var(--palette-yellow-40)':'var(--semantic-negative-normal)')}">${r[7]}%</td></tr>`).join('')}
  </tbody></table>
  </div>
  </div>
  <div class="g2">
    <div class="card mb"><div class="sh"><div class="st">모델 신뢰도 추이 (최근 24시간)</div></div><div style="height:200px;position:relative"><canvas id="c-rt-model-trust" role="img" aria-label="모델 신뢰도"></canvas></div></div>
    <div class="card mb"><div class="sh"><div class="st">RT Fail-Safe 이력</div><span class="sa" onclick="activate('bidDA-log')">전체 이력 ↗</span></div>
      <div class="al"><div class="ad" style="background:var(--palette-yellow-40)"></div><div class="am"><b>13:15</b> kma-ultrashort 응답 지연(3.2s) → hybrid-ensemble 단독 사용</div><div class="at">자동 전환</div></div>
      <div class="al"><div class="ad" style="background:var(--semantic-positive-normal)"></div><div class="am"><b>09:42</b> 예보 결측 1건 → 직전 실측값 linear 보간 처리</div><div class="at">자동 복구</div></div>
      <div class="al"><div class="ad" style="background:var(--semantic-line-strong)"></div><div class="am">금일 RT Fail-Safe 발동 총 2회 · 모두 자동 복구</div><div class="at">누적 통계</div></div>
    </div>
  </div>
</div>

<!-- ========== VIEW 3: 실시간 내역 ========== -->
<div id="pg-rt-view-history" style="display:none">
  <div class="g4">
    <div class="card acc"><div class="ct">금일 T-75 제출</div><div class="kv">62<span class="ku">/96회</span></div><div class="kd up">계획 대비 100%</div></div>
    <div class="card"><div class="ct">평균 Imbalance</div><div class="kv" style="color:var(--semantic-positive-normal)">2.1<span class="ku">%</span></div><div class="kd up">임계 5% 내</div></div>
    <div class="card"><div class="ct">재입찰률</div><div class="kv">18<span class="ku">%</span></div><div class="kd neu">11/62회 임계 초과 갱신</div></div>
    <div class="card"><div class="ct">누적 RTES</div><div class="kv" style="color:var(--semantic-brand-primary)">+4.2<span class="ku">백만원</span></div><div class="kd up">금일 실시간 편차정산</div></div>
  </div>
  <div class="card mb"><div class="sh"><div class="st">금일 Imbalance 시계열 (15분 단위)</div><span class="kpi-pill warn" style="font-size:11px">임계 5% 초과 2건</span></div>
    <div style="height:200px;position:relative"><canvas id="c-rt-imb-series" role="img" aria-label="Imbalance 시계열"></canvas></div>
  </div>
  <div class="card"><div class="sh"><div class="st">금일 T-75 제출 이력</div><div style="display:flex;gap:8px;align-items:center"><span class="sa" onclick="activate('bidRT-dual')">편차 관리 ↗</span>${window.csvBtn('rt-t75-tbody','rt_t75_history','금일 T-75 제출 이력')}</div></div>
  <div style="overflow-x:auto">
  <table class="tbl"><thead><tr><th>제출시각</th><th>입찰량(MW)</th><th>DA 대비</th><th>갱신 사유</th><th>Imbalance</th><th>사용 모델</th><th>상태</th></tr></thead><tbody id="rt-t75-tbody">
    ${[
      ['15:15',141.2,'+2.1','실측 상향 · 일사량 증가','1.8%','hybrid-ensemble','제출'],
      ['15:00',140.8,'+1.7','정기 갱신','2.1%','hybrid-ensemble','제출완료'],
      ['14:45',138.5,'-0.6','정기 갱신','1.2%','hybrid-ensemble','제출완료'],
      ['14:30',142.1,'+3.0','실측 급변 · 재입찰','5.8%','hybrid-ensemble','제출완료 · 임계↑'],
      ['14:15',139.4,'+0.3','정기 갱신','3.2%','hybrid-ensemble','제출완료'],
      ['14:00',139.1,'0.0','정기 갱신 (변동 없음)','1.5%','nowcast-v2','제출완료'],
      ['13:45',139.8,'+0.7','정기 갱신','2.4%','nowcast-v2','제출완료'],
      ['13:30',138.2,'-0.9','운량 증가 반영','0.9%','hybrid-ensemble','제출완료'],
      ['13:15',143.7,'+4.6','실측 급증 · 재입찰','6.1%','hybrid-ensemble','제출완료 · 임계↑'],
      ['13:00',140.5,'+1.4','정기 갱신','2.8%','hybrid-ensemble','제출완료'],
    ].map(r=>{
      const over=r[6].includes('임계');
      const cur=r[0]==='15:15';
      return `<tr${cur?' style="background:var(--semantic-brand-primary-assistive)"':''}><td class="mono">${r[0]}${cur?' <span class="badge inf" style="margin-left:4px">진행중</span>':''}</td><td class="mono">${r[1]}</td><td class="mono" style="color:${parseFloat(r[2])>0?'var(--semantic-positive-normal)':(parseFloat(r[2])<0?'var(--semantic-negative-normal)':'var(--semantic-label-alt)')}">${r[2]>0?'+':''}${r[2]} MW</td><td>${r[3]}</td><td class="mono" style="color:${parseFloat(r[4])>5?'var(--semantic-negative-normal)':(parseFloat(r[4])>3?'var(--palette-yellow-40)':'var(--semantic-positive-normal)')}">${r[4]}</td><td class="mono" style="font-size:12px">${r[5]}</td><td><span class="badge ${cur?'inf':(over?'warn':'ok')}">${r[6]}</span></td></tr>`;
    }).join('')}
  </tbody></table>
  </div>
  <div style="font-size:11px;color:var(--semantic-label-alt);margin-top:10px;line-height:18px">※ "재입찰"은 Imbalance 임계값(5%) 초과 시 자동 갱신된 경우입니다. 편차 결과·IMBP 정산은 <span onclick="activate('bidRT-dual')" style="color:var(--semantic-brand-primary);cursor:pointer">편차 관리</span>에서 확인하세요.</div>
  </div>
</div>

<!-- ============ 모달 ① 실시간 설정 ============ -->
<div class="modal-backdrop" id="modal-rt-settings" style="display:none" onclick="closeModalBg(event,'modal-rt-settings')">
  <div class="modal">
    <div class="modal-hdr">
      <span class="modal-title">실시간 입찰 설정</span>
      <button class="modal-close" onclick="closeModal('modal-rt-settings')">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-section">실시간 모드</div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px">
        <label style="display:flex;align-items:center;gap:10px;cursor:pointer"><input type="radio" name="rt-mode" checked> 자동 갱신 모드 (기본)</label>
        <label style="display:flex;align-items:center;gap:10px;cursor:pointer"><input type="radio" name="rt-mode"> 수동 모드 (운영자 직접 실행)</label>
        <label style="display:flex;align-items:center;gap:10px;cursor:pointer"><input type="radio" name="rt-mode"> OFF (실시간 입찰 중단)</label>
      </div>
      <hr class="form-divider">
      <div class="form-section">갱신 주기 · 임계값</div>
      <div class="form-row">
        <div class="form-item"><label>갱신 주기</label>
          <select class="sel"><option selected>15분 (권장)</option><option>30분</option><option>60분</option></select>
        </div>
        <div class="form-item"><label>T-75 사전 알림</label>
          <select class="sel"><option>5분 전</option><option selected>10분 전</option><option>15분 전</option></select>
        </div>
      </div>
      <div class="form-row full">
        <div class="form-item">
          <label>자동 재입찰 임계값 — Imbalance <b id="rt-thr-v" style="color:var(--semantic-brand-primary)">5</b>% 초과 시 자동 갱신</label>
          <input type="range" min="0" max="15" step="0.5" value="5" oninput="document.getElementById('rt-thr-v').textContent=this.value" style="width:100%">
          <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--semantic-label-alt);margin-top:2px">
            <span>0% (Aggressive)</span><span>5% (Balanced)</span><span>15% (Conservative)</span>
          </div>
        </div>
      </div>
      <hr class="form-divider">
      <div class="form-section">초단기 예보 소스</div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px">
        <label style="display:flex;align-items:center;gap:10px;cursor:pointer"><input type="radio" name="rt-src"> KMA 초단기실황 (기상청)</label>
        <label style="display:flex;align-items:center;gap:10px;cursor:pointer"><input type="radio" name="rt-src"> 자체 nwp-e</label>
        <label style="display:flex;align-items:center;gap:10px;cursor:pointer"><input type="radio" name="rt-src" checked> 하이브리드 (KMA + nwp-e 앙상블 · 권장)</label>
      </div>
      <hr class="form-divider">
      <div class="form-section">참여 자원 선택</div>
      <div style="max-height:180px;overflow-y:auto;border:1px solid var(--semantic-line-alt);border-radius:6px;padding:10px 14px;margin-bottom:16px">
        ${[
          ['광양항태양광 01단계','태양광',true],
          ['광양항태양광 04단계','태양광',true],
          ['해맞이 태양광','태양광',true],
          ['온누리 태양광','태양광',true],
          ['금능1호 태양광','태양광',false],
          ['김주풍력 01단계','풍력',true],
        ].map(r=>`<div style="display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid var(--semantic-line-alt)">
          <label class="toggle"><input type="checkbox" ${r[2]?'checked':''}><div class="ts"></div></label>
          <span style="font-size:13px;flex:1">${r[0]}</span>
          <span class="badge ${r[1]==='태양광'?'inf':'ok'}">${r[1]}</span>
        </div>`).join('')}
      </div>
      <hr class="form-divider">
      <div class="form-section">제출 결과 통지</div>
      <div class="form-row">
        <div class="form-item"><label>운영자 이메일</label><input class="inp" value="president@ewp.co.kr"></div>
        <div class="form-item"><label>문자 알림 번호</label><input class="inp" placeholder="010-0000-0000"></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="cb n" onclick="closeModal('modal-rt-settings')">취소</button>
      <button class="cb p" onclick="toast('실시간 설정을 저장했습니다.');closeModal('modal-rt-settings')">적용</button>
    </div>
  </div>
</div>

<!-- ============ 모달 ② 예측모델 설정 (RT 전용 인스턴스) ============ -->
<div class="modal-backdrop" id="modal-model-settings-rt" style="display:none" onclick="closeModalBg(event,'modal-model-settings-rt')">
  <div class="modal">
    <div class="modal-hdr">
      <span class="modal-title">예측모델 설정 (실시간)</span>
      <button class="modal-close" onclick="closeModal('modal-model-settings-rt')">✕</button>
    </div>
    <div class="modal-body">
      <div style="padding:12px 14px;background:var(--semantic-brand-primary-assistive);border-radius:6px;font-size:12px;line-height:18px;color:var(--semantic-label-normal);margin-bottom:16px">
        ℹ 실시간 입찰에서는 초단기(0~6시간) 예보 모델을 사용합니다. 하루전 모델 설정과는 별도입니다.
      </div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px">
        <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer">
          <input type="radio" name="rt-model-mode" style="margin-top:4px">
          <div><div style="font-weight:500">최신 실측값 기반</div><div style="font-size:11px;color:var(--semantic-label-alt);margin-top:2px">예측모델 없이 직전 15분 실측 평균값으로 재입찰합니다.</div></div>
        </label>
        <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer">
          <input type="radio" name="rt-model-mode" checked style="margin-top:4px">
          <div><div style="font-weight:500">발전기별 초단기 예측모델 사용</div><div style="font-size:11px;color:var(--semantic-label-alt);margin-top:2px">각 발전기별로 초단기 모델을 지정합니다.</div></div>
        </label>
      </div>
      <hr class="form-divider">
      <div class="form-row full"><div class="form-item"><label>전체 일괄선택</label><select class="sel"><option>전체 일괄선택</option><option>nowcast-v2 (기본)</option><option>kma-ultrashort</option><option>hybrid-ensemble</option></select></div></div>
      <div class="form-row full"><div class="form-item"><label>발전기 검색</label><input class="inp" placeholder="🔍 발전기명 또는 자원코드"></div></div>
      <div style="max-height:220px;overflow-y:auto;border:1px solid var(--semantic-line-alt);border-radius:6px;padding:10px 14px">
        ${[
          ['광양항태양광 01단계','hybrid-ensemble'],
          ['광양항태양광 04단계','hybrid-ensemble'],
          ['해맞이 태양광','nowcast-v2'],
          ['온누리 태양광','nowcast-v2'],
          ['김주풍력 01단계','kma-ultrashort'],
        ].map((r,i)=>`<div style="padding:10px 0;${i<4?'border-bottom:1px solid var(--semantic-line-alt);':''}">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;align-items:center">
            <span style="font-size:13px;font-weight:500">${r[0]}</span>
            <select class="sel" style="height:30px;font-size:12px"><option>${r[1]}</option><option>nowcast-v2</option><option>kma-ultrashort</option><option>hybrid-ensemble</option></select>
          </div>
        </div>`).join('')}
      </div>
    </div>
    <div class="modal-footer">
      <button class="cb n" onclick="closeModal('modal-model-settings-rt')">취소</button>
      <button class="cb p" onclick="toast('실시간 예측모델을 저장했습니다.');closeModal('modal-model-settings-rt')">저장</button>
    </div>
  </div>
</div>

<!-- ============ 모달 ③ 즉시 갱신 확인 ============ -->
<div class="modal-backdrop" id="modal-rt-refresh" style="display:none" onclick="closeModalBg(event,'modal-rt-refresh')">
  <div class="modal" style="width:440px">
    <div class="modal-hdr">
      <span class="modal-title">즉시 갱신</span>
      <button class="modal-close" onclick="closeModal('modal-rt-refresh')">✕</button>
    </div>
    <div class="modal-body">
      <div style="padding:12px 14px;background:var(--semantic-tag-bg-yellow);border-radius:6px;font-size:13px;line-height:20px;color:var(--semantic-label-strong);margin-bottom:16px">
        ⚠ 갱신 주기(15분)를 기다리지 않고 즉시 초단기 예보를 재수집하여 RT 입찰을 다시 계산·제출합니다.
      </div>
      <div class="form-item">
        <label>실행하시려면 <b style="color:var(--semantic-brand-primary)">[즉시갱신]</b>을 입력해주세요.</label>
        <input class="inp" placeholder="즉시갱신" id="confirm-rtref" oninput="chkRtRef(this.value)">
      </div>
    </div>
    <div class="modal-footer">
      <button class="cb n" onclick="closeModal('modal-rt-refresh')">취소</button>
      <button class="cb p" id="btn-rtref" disabled onclick="toast('즉시 갱신이 실행되었습니다.');closeModal('modal-rt-refresh');document.getElementById('confirm-rtref').value=''">즉시 갱신</button>
    </div>
  </div>
</div>`;
window['I_bidRT-main']=function(){
  const h=['09','10','11','12','13','14','15','16','17'];
  mkChart('c-rtbid','line',h,[
    {label:'DA 입찰',data:[5.8,8.1,9.8,10.7,10.9,10.5,10,10.1,9.6],borderColor:'rgba(120,120,120,0.6)',borderWidth:1.5,pointRadius:0,tension:0.4,borderDash:[4,2],fill:false},
    {label:'RT 갱신',data:[6.1,8.4,10.1,10.9,11.0,10.4,9.8,10.3,9.7],borderColor:'#0059ff',borderWidth:2,pointRadius:0,tension:0.4,fill:true,backgroundColor:'rgba(0,89,255,0.08)'},
  ],{});
};
window.chkRtRef=function(v){
  const b=document.getElementById('btn-rtref');
  if(b)b.disabled=(v!=='즉시갱신');
};
window.pgRtTab=function(el,k){
  ['today','forecast','history'].forEach(v=>{
    const d=document.getElementById('pg-rt-view-'+v);
    if(d)d.style.display=(v===k?'':'none');
  });
  el.parentElement.querySelectorAll('.pg-tab').forEach(e=>e.classList.remove('active'));
  el.classList.add('active');
  if(k==='forecast'){
    setTimeout(()=>{
      const h=Array.from({length:24},(_,i)=>i+'h');
      // Confidence % over 24h for each model
      const he=[95.2,95.8,96.1,96.4,96.2,95.9,96.5,96.8,96.4,96.2,95.8,96.0,96.3,96.5,96.4,96.1,95.9,96.2,96.6,96.4,96.3,95.8,95.4,96.4];
      const nc=[94.8,95.1,95.6,95.9,95.7,95.3,96.0,96.2,96.0,95.7,95.4,95.6,95.8,96.1,96.2,95.8,95.4,95.8,96.0,95.9,95.7,95.3,94.9,96.2];
      const km=[93.2,93.8,94.1,94.4,94.0,93.6,94.5,94.8,94.4,94.1,93.7,93.9,94.2,94.5,94.8,94.2,93.8,94.2,94.6,94.4,94.2,93.6,93.2,94.8];
      mkChart('c-rt-model-trust','line',h,[
        {label:'hybrid-ensemble',data:he,borderColor:'#0059ff',borderWidth:2,pointRadius:0,tension:0.4,fill:false},
        {label:'nowcast-v2',data:nc,borderColor:'#1f98ff',borderWidth:1.5,pointRadius:0,tension:0.4,fill:false},
        {label:'kma-ultrashort',data:km,borderColor:'#ffca42',borderWidth:1.5,pointRadius:0,tension:0.4,fill:false},
      ],{plugins:{legend:{display:true,position:'bottom',labels:{font:{size:11},boxWidth:10,padding:8}}},scales:{y:{min:90,max:100,title:{display:true,text:'%',color:'#666',font:{size:10}}}}});
    },50);
  } else if(k==='history'){
    setTimeout(()=>{
      const labels=['06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00'];
      const imb=[1.1,1.8,2.4,2.1,1.9,2.3,3.1,6.1,5.8,1.8];
      mkChart('c-rt-imb-series','line',labels,[
        {label:'Imbalance(%)',data:imb,borderColor:'#0059ff',borderWidth:2,pointRadius:3,pointBackgroundColor:imb.map(v=>v>5?'#ff2437':'#0059ff'),tension:0.3,fill:true,backgroundColor:'rgba(0,89,255,0.08)'},
        {label:'임계값 5%',data:Array(labels.length).fill(5),borderColor:'#ff2437',borderWidth:1,pointRadius:0,borderDash:[4,4],fill:false},
      ],{plugins:{legend:{display:true,position:'bottom',labels:{font:{size:11},boxWidth:10,padding:8}}},scales:{y:{title:{display:true,text:'%',color:'#666',font:{size:10}}}}});
    },50);
  }
};

