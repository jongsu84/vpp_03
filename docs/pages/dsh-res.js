// AUTO-GENERATED FROM index.html — page module: dsh-res
window.P = window.P || {};
/* ===== 대시보드: 자원별 상세 ===== */
/* ===== 자원별 상세 관제 (자원 유형 적응형) ===== */
// 자원 유형별 아이콘 SVG
const _rsIcon=(type)=>({
  '태양광':'<svg viewBox="0 0 24 24" width="22" height="22" fill="none"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  '풍력':'<svg viewBox="0 0 24 24" width="22" height="22" fill="none"><path d="M12 12V3M12 12l-7 4M12 12l7 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="12" r="1.8" fill="currentColor"/><path d="M12 20v2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  'ESS':'<svg viewBox="0 0 24 24" width="22" height="22" fill="none"><rect x="4" y="6" width="14" height="12" rx="1.5" stroke="currentColor" stroke-width="1.8"/><path d="M18 10v4h2v-4h-2z" fill="currentColor"/><path d="M8 10v4M12 10v4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  '바이오':'<svg viewBox="0 0 24 24" width="22" height="22" fill="none"><path d="M12 3c-3.5 3-6 6.5-6 10a6 6 0 0012 0c0-3.5-2.5-7-6-10z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 13c0 2 1 3 2.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  'V2G':'<svg viewBox="0 0 24 24" width="22" height="22" fill="none"><rect x="3" y="9" width="14" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/><circle cx="7" cy="18" r="1.8" stroke="currentColor" stroke-width="1.6"/><circle cx="14" cy="18" r="1.8" stroke="currentColor" stroke-width="1.6"/><path d="M17 11l3 1v2l-3 1M6 9V6h8v3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
}[type]||'');
// 자원 유형별 색상 (hero bar · icon)
const _rsColor=(type)=>({
  '태양광':'#0059ff','풍력':'#1f98ff','ESS':'#ffca42','바이오':'#925fff','V2G':'#00d4a8'
}[type]||'#0059ff');
// 프로그레스 바 컴포넌트
const _rsBar=(pct,color)=>`<div style="width:100%;height:4px;background:var(--semantic-background-3);border-radius:2px;overflow:hidden;margin-top:8px"><div style="width:${pct}%;height:100%;background:${color||'var(--semantic-brand-primary)'};border-radius:2px"></div></div>`;
// 자원 유형별 핵심 메트릭 카드 HTML 생성 (KPI + bar) + 2-col 부속 측정값
const _rsMetrics=(type,name)=>{
  const mkCard=(c)=>{
    const barHtml=c.bar!==undefined?_rsBar(c.bar,c.barColor):'';
    const tipHtml=(c.tip&&window.tip)?(' '+window.tip(c.tip[0],c.tip[1],c.tip[2],c.tip[3])):'';
    return `<div class="card ${c.accent?'acc':''}"><div class="ct">${c.title}${tipHtml}</div><div class="kv"${c.color?' style="color:'+c.color+'"':''}>${c.val}${c.unit?'<span class="ku">'+c.unit+'</span>':''}</div>${c.sub?'<div class="kd '+(c.subKind||'neu')+'">'+c.sub+'</div>':''}${barHtml}</div>`;
  };
  const mk=(cards)=>`<div class="g4">${cards.map(mkCard).join('')}</div>`;
  const sub=(rows)=>`<div class="card mb"><div class="sh"><div class="st">부속 측정값 · 실시간</div><span class="kpi-pill" style="font-size:11px">1초 갱신</span></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0 24px">
      ${rows.map((r,i)=>`<div class="mr"${(i>=rows.length-2)?' style="border-bottom:0"':''}><div class="ml">${r[0]}</div><div class="mv mono">${r[1]}</div></div>`).join('')}
    </div></div>`;
  if(type==='태양광'){
    return mk([
      {title:'현재 출력',val:'2,147',unit:'kW',accent:true,sub:'목표 2,293kW 대비 93.6%',subKind:'up',bar:93.6,barColor:'var(--semantic-brand-primary)',tip:['현재 출력','인버터 측정 실시간 AC 출력','RTU 1초 폴링 → AC kW 합산','정격 대비 80% 이상 정상 / 50% 미만은 일사·인버터 점검']},
      {title:'인버터 효율',val:'96.8',unit:'%',sub:'평균 대비 +0.4%p',subKind:'up',bar:96.8,barColor:'var(--semantic-positive-normal)',tip:['인버터 효율','DC→AC 변환 효율','AC 출력 ÷ DC 입력 × 100 [%]','95% 이상 정상 / 90% 미만 시 인버터 노후·먼지 점검']},
      {title:'모듈 온도',val:'42.3',unit:'°C',color:'var(--palette-yellow-40)',sub:'과열 임계 65°C',bar:65,barColor:'var(--palette-yellow-40)',tip:['모듈 온도','PV 셀 후면 표면 온도','백시트 온도 센서 (모듈당 1개)','25°C 기준 1°C당 -0.4% 효율 / 65°C 과열 임계 → 자동 출력 제한']},
      {title:'일사량',val:'782',unit:'W/㎡',sub:'가동 조건 양호',subKind:'up',bar:78,barColor:'var(--palette-yellow-40)',tip:['일사량','모듈 면 단위면적당 입사 태양에너지','피라노미터(2등급) 1초 측정 [W/㎡]','600 이상 정상 발전 / 200 미만 출력 급감 / 1000 = STC 기준']},
    ])+sub([['전압 (DC)','389.4 V'],['전류 (DC)','55.2 A'],['외기 온도','21.3 °C'],['이슬점','9.8 °C'],['습도','62%'],['바람','남동 1.2 m/s'],['운량','18%'],['통신 상태','<span class="badge ok">연결 · 12ms</span>']]);
  }
  if(type==='풍력'){
    return mk([
      {title:'현재 출력',val:'7,840',unit:'kW',accent:true,sub:'정격 10,000kW 대비 78.4%',subKind:'up',bar:78.4,barColor:'var(--semantic-brand-primary)',tip:['현재 출력','발전기 단자 실시간 AC 출력','RTU 1초 폴링 → AC kW','정격 대비 70%+ 정상 / 풍속 3m/s 미만 정지(컷인) / 25m/s 초과 비상 정지']},
      {title:'로터 RPM',val:'14.2',unit:'rpm',sub:'정상 범위 12~16',subKind:'up',bar:71,barColor:'var(--semantic-positive-normal)',tip:['로터 RPM','블레이드 회전 속도','광학 인코더 측정 [rpm]','12~16 정상 / 18 초과 시 자동 정지 / 풍속 12m/s 이상 정격 회전 유지']},
      {title:'피치각',val:'4.8',unit:'°',sub:'자동 제어 작동',bar:24,barColor:'var(--semantic-brand-primary)',tip:['피치각','블레이드 받음각','자동 피치 제어 시스템 [°]','0~30° 자동 조정 / 풍속 12m/s 이상에서 출력 제한용 피치 증가']},
      {title:'Yaw 방향',val:'192',unit:'°',sub:'NNE 풍향 추종',bar:53,barColor:'#1f98ff',tip:['Yaw 방향','나셀(rotor head) 방위각','풍향계 추종 자동 제어 [°]','풍향과 5° 이내 정렬 정상 / 추종 지연 시 출력 손실 발생']},
    ])+sub([['풍속 (허브 80m)','11.3 m/s'],['풍속 (10m)','9.8 m/s'],['풍향','NNE · 35°'],['기어박스 온도','58.4 °C'],['베어링 진동','0.8 mm/s'],['외기 온도','18.7 °C'],['공기 밀도','1.22 kg/㎥'],['통신 상태','<span class="badge ok">연결 · 18ms</span>']]);
  }
  if(type==='ESS'){
    return mk([
      {title:'현재 출력',val:'+1,650',unit:'kW',accent:true,color:'var(--semantic-brand-primary)',sub:'방전 중 (정격 대비 82.5%)',subKind:'up',bar:82.5,barColor:'var(--semantic-brand-primary)',tip:['현재 출력','PCS 실시간 충/방전 출력','양수 = 방전 / 음수 = 충전 [kW]','정격 대비 90% 이내 권장 / 100% 장시간 운전 시 셀 온도 상승']},
      {title:'SOC',val:'72',unit:'%',sub:'충전 여유 28%',bar:72,barColor:'var(--semantic-positive-normal)',tip:['SOC (State of Charge)','배터리 잔여 충전량 비율','Σ(충전 - 방전) ÷ 정격용량 × 100 [%]','20~80% 권장 운전 구간 / 0% 또는 100% 장시간 유지 시 수명 단축']},
      {title:'SOH',val:'96',unit:'%',sub:'교체까지 4~5년',subKind:'up',bar:96,barColor:'var(--semantic-positive-normal)',tip:['SOH (State of Health)','초기 대비 잔존 용량 비율','현재 가용 용량 ÷ 초기 정격 × 100 [%]','80% 미만 시 교체 검토 / 매일 자동 측정 / EOL = 70%']},
      {title:'누적 사이클',val:'458',unit:'회',color:'var(--palette-yellow-40)',sub:'정격 6,000 중 7.6%',bar:7.6,barColor:'var(--palette-yellow-40)',tip:['누적 사이클','1 사이클 = 100% 충전 + 100% 방전','Σ(부분 사이클 등가 환산) [회]','LFP 6,000 사이클 = 약 10년 수명 / DoD 80% 운전 시 사이클 가속']},
    ])+sub([['배터리 평균 온도','28.4 °C'],['셀 온도 편차','±1.2 °C'],['DoD (금일)','48%'],['RTE (최근 7일)','93.2%'],['셀 전압 편차','0.015 V'],['컨버터 효율','98.1%'],['누적 방전량','12.4 MWh'],['통신 상태','<span class="badge ok">연결 · 10ms</span>']]);
  }
  if(type==='바이오'){
    return mk([
      {title:'현재 출력',val:'1,380',unit:'kW',accent:true,sub:'정격 1,500kW 대비 92%',subKind:'up',bar:92,barColor:'var(--semantic-brand-primary)',tip:['현재 출력','발전기 단자 실시간 AC 출력','RTU 폴링 → AC kW','정격 대비 85%+ 권장 / 베이스로드 운전 → 일정 출력 유지']},
      {title:'연료 투입량',val:'245',unit:'Nm³/h',sub:'바이오가스 LPG 혼합',bar:68,barColor:'#925fff',tip:['연료 투입량','시간당 바이오가스 + LPG 혼합 투입','유량계 실시간 측정 [Nm³/h]','출력 비례 자동 조절 / 메탄 함량 60%+ 시 안정 연소']},
      {title:'연소 효율',val:'89.2',unit:'%',sub:'최적 구간',subKind:'up',bar:89.2,barColor:'var(--semantic-positive-normal)',tip:['연소 효율','투입 열량 대비 발전 변환 효율','발전 출력 ÷ (연료 유량 × 발열량) × 100 [%]','85% 이상 정상 / 80% 미만 시 버너 정비 필요']},
      {title:'발전기 RPM',val:'1,800',unit:'rpm',sub:'60Hz 동기 고정',bar:100,barColor:'var(--semantic-positive-normal)',tip:['발전기 RPM','동기 발전기 회전 속도','60Hz × 60 = 1,800 rpm 고정 [rpm]','±0.5 rpm 이내 정상 / 변동 시 계통 동기화 점검 필요']},
    ])+sub([['배기가스 온도','412 °C'],['NOx 배출','78 ppm'],['SOx 배출','11 ppm'],['CO 배출','32 ppm'],['냉각수 온도','78 °C'],['윤활유 압력','4.2 bar'],['발전기 권선 온도','92 °C'],['통신 상태','<span class="badge ok">연결 · 15ms</span>']]);
  }
  if(type==='V2G'){
    return mk([
      {title:'현재 총 출력',val:'+720',unit:'kW',accent:true,color:'var(--semantic-brand-primary)',sub:'방전 주도 (스테이션 정격 800kW)',subKind:'up',bar:90,barColor:'var(--semantic-brand-primary)',tip:['현재 총 출력','연결된 모든 차량의 충방전 합계','Σ(차량별 출력) 양수=방전, 음수=충전 [kW]','정격 800kW 이내 운영 / V2G 동의 차량만 방전 가능']},
      {title:'연결 차량',val:'18',unit:'/24 대',sub:'정원 75% 활용',bar:75,barColor:'#00d4a8',tip:['연결 차량','동시 연결된 EV 수 / 스테이션 정원','OCPP 활성 세션 차량 수','24대 정원 75%+ 정상 / 24V 충전기 전용 8대 + V2G 16대 구성']},
      {title:'가용 용량',val:'840',unit:'kWh',sub:'평균 SOC 68%',bar:68,barColor:'var(--semantic-positive-normal)',tip:['가용 용량','연결 차량의 방전 가능 누적 에너지','Σ(차량 SOC × 배터리 용량) [kWh]','평균 SOC 60%+ 시 충분 / 30% 미만 시 V2G 자동 중단']},
      {title:'활성 세션',val:'14',unit:'건',sub:'충전 4 · 방전 10',bar:78,barColor:'#00d4a8',tip:['활성 세션','충전 또는 방전 중인 OCPP 세션 수','OCPP 1.6J StartTransaction 기준','대기 차량 = 연결 - 활성 / 평균 세션 시간 2~4시간']},
    ])+sub([['평균 SOC (연결 차량)','68%'],['평균 SOH','94%'],['충전 중','4대 · +180kW 흡수'],['방전 중','10대 · -900kW 방출'],['대기 (V2G 비동의)','4대'],['스테이션 효율','93.5%'],['누적 제공 에너지','154 kWh'],['통신 상태','<span class="badge ok">OCPP 1.6J</span>']]);
  }
  return '';
};
// 자원 유형별 상세 테이블
const _rsDetail=(type,name)=>{
  const rnd=(a,b)=>(Math.random()*(b-a)+a).toFixed(1);
  if(type==='태양광'){
    return `<div class="card"><div class="sh"><div class="st">인버터 스트링별 상태 (6개)</div></div>
    <table class="tbl"><thead><tr><th>인버터</th><th>출력(kW)</th><th>전압(V)</th><th>전류(A)</th><th>효율(%)</th><th>온도(°C)</th><th>상태</th></tr></thead><tbody>
    ${[1,2,3,4,5,6].map(i=>`<tr><td class="mono">INV-0${i}</td><td class="mono">${rnd(320,360)}</td><td class="mono">${rnd(385,392)}</td><td class="mono">${rnd(53,58)}</td><td class="mono">${rnd(95,98)}</td><td class="mono">${rnd(40,46)}</td><td>${i===3?'<span class="badge err">통신 단절</span>':'<span class="badge ok">정상</span>'}</td></tr>`).join('')}
    </tbody></table></div>`;
  }
  if(type==='풍력'){
    return `<div class="card"><div class="sh"><div class="st">터빈별 상태 (3기)</div></div>
    <table class="tbl"><thead><tr><th>터빈</th><th>출력(kW)</th><th>RPM</th><th>피치각</th><th>Yaw</th><th>기어박스(°C)</th><th>진동(mm/s)</th><th>상태</th></tr></thead><tbody>
    ${[1,2,3].map(i=>`<tr><td class="mono">T-0${i}</td><td class="mono">${rnd(2400,2800)}</td><td class="mono">${rnd(13.5,14.8)}</td><td class="mono">${rnd(3,6)}°</td><td class="mono">${rnd(188,196)}°</td><td class="mono">${rnd(55,62)}</td><td class="mono">${rnd(0.5,1.2)}</td><td><span class="badge ok">정상</span></td></tr>`).join('')}
    </tbody></table></div>`;
  }
  if(type==='ESS'){
    return `<div class="card"><div class="sh"><div class="st">배터리 뱅크별 상태 (4뱅크)</div></div>
    <table class="tbl"><thead><tr><th>뱅크</th><th>SOC(%)</th><th>SOH(%)</th><th>전압(V)</th><th>전류(A)</th><th>평균온도(°C)</th><th>사이클</th><th>상태</th></tr></thead><tbody>
    ${[1,2,3,4].map(i=>`<tr><td class="mono">BANK-0${i}</td><td class="mono">${rnd(70,74)}</td><td class="mono">${rnd(95,97)}</td><td class="mono">${rnd(820,840)}</td><td class="mono">${rnd(380,420)}</td><td class="mono">${rnd(27,30)}</td><td class="mono">${458+i}</td><td><span class="badge ok">정상</span></td></tr>`).join('')}
    </tbody></table></div>`;
  }
  if(type==='바이오'){
    return `<div class="card"><div class="sh"><div class="st">발전 유닛별 상태 (2유닛)</div></div>
    <table class="tbl"><thead><tr><th>유닛</th><th>출력(kW)</th><th>RPM</th><th>연료량(Nm³/h)</th><th>연소효율(%)</th><th>NOx(ppm)</th><th>배기온도(°C)</th><th>상태</th></tr></thead><tbody>
    ${[1,2].map(i=>`<tr><td class="mono">GEN-0${i}</td><td class="mono">${rnd(680,720)}</td><td class="mono">1,800</td><td class="mono">${rnd(115,130)}</td><td class="mono">${rnd(88,90)}</td><td class="mono">${rnd(72,82)}</td><td class="mono">${rnd(405,420)}</td><td><span class="badge ok">정상</span></td></tr>`).join('')}
    </tbody></table></div>`;
  }
  if(type==='V2G'){
    return `<div class="card"><div class="sh"><div class="st">연결 차량별 세션 (요약 8대 · 전체 18대)</div><button class="cb n sm">전체 보기</button></div>
    <table class="tbl"><thead><tr><th>차종</th><th>차량ID</th><th>SOC(%)</th><th>동작</th><th>현재 전력</th><th>누적(kWh)</th><th>세션 시간</th><th>상태</th></tr></thead><tbody>
      <tr><td>Hyundai IONIQ6</td><td class="mono">EV-1021</td><td class="mono">78</td><td><span class="badge warn">방전</span></td><td class="mono">-50kW</td><td class="mono">12.4</td><td class="mono">25분</td><td><span class="badge ok">활성</span></td></tr>
      <tr><td>Kia EV6</td><td class="mono">EV-1045</td><td class="mono">82</td><td><span class="badge warn">방전</span></td><td class="mono">-45kW</td><td class="mono">8.7</td><td class="mono">18분</td><td><span class="badge ok">활성</span></td></tr>
      <tr><td>Tesla Model 3</td><td class="mono">EV-1088</td><td class="mono">42</td><td><span class="badge inf">충전</span></td><td class="mono">+35kW</td><td class="mono">15.2</td><td class="mono">42분</td><td><span class="badge ok">활성</span></td></tr>
      <tr><td>Hyundai IONIQ5</td><td class="mono">EV-1134</td><td class="mono">65</td><td><span class="badge warn">방전</span></td><td class="mono">-60kW</td><td class="mono">21.8</td><td class="mono">38분</td><td><span class="badge ok">활성</span></td></tr>
      <tr><td>Kia Niro EV</td><td class="mono">EV-1201</td><td class="mono">58</td><td><span class="badge warn">방전</span></td><td class="mono">-40kW</td><td class="mono">10.3</td><td class="mono">22분</td><td><span class="badge ok">활성</span></td></tr>
      <tr><td>Tesla Model Y</td><td class="mono">EV-1256</td><td class="mono">88</td><td><span class="badge off">대기</span></td><td class="mono">0kW</td><td class="mono">0</td><td class="mono">-</td><td><span class="badge off">비동의</span></td></tr>
    </tbody></table></div>`;
  }
  return '';
};
/* ===== 자원별 상세관제: 새로운 아키텍처 (탭 + 7필터 + 2모드 + 슬라이드 상세) ===== */
// 자원 유형 배지 스타일
const _rsBadge=(type)=>({'태양광':'','풍력':'style="background:var(--semantic-tag-bg-blue);color:var(--semantic-tag-label-blue)"','ESS':'style="background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow)"','바이오':'style="background:#e8defa;color:#6035cc"','V2G':'style="background:var(--semantic-tag-bg-green);color:var(--semantic-tag-label-green)"'}[type]||'');
// 13개 자원 전체 데이터 (Mode A 통합 테이블용)
window.RS_ALL=[
  {name:'광양항태양광 01단계',type:'태양광',code:'fgsl021',cbp:'1201',vpp:'VPP-전남권',loc:'전남',cap:2.29,out:2.18,eff:93.6,op:'정상 가동',cd:'',status:'ok'},
  {name:'광양항태양광 04단계',type:'태양광',code:'fgsl022',cbp:'1203',vpp:'VPP-전남권',loc:'전남',cap:2.20,out:2.09,eff:94.1,op:'정상 가동',cd:'',status:'ok'},
  {name:'해맞이 태양광',type:'태양광',code:'fgsl023',cbp:'1205',vpp:'VPP-전남권',loc:'전남',cap:1.00,out:0.95,eff:92.3,op:'정상 가동',cd:'',status:'ok'},
  {name:'온누리 태양광',type:'태양광',code:'fgsl024',cbp:'1207',vpp:'VPP-전남권',loc:'전남',cap:1.00,out:0.94,eff:91.8,op:'정상 가동',cd:'',status:'ok'},
  {name:'금능1호 태양광',type:'태양광',code:'fgsl031',cbp:'1301',vpp:'VPP-제주권',loc:'제주',cap:0.98,out:0.88,eff:82.4,op:'이상',cd:'',status:'warn'},
  {name:'김주풍력 01단계',type:'풍력',code:'fgwp013',cbp:'1598',vpp:'VPP-경북권',loc:'경북',cap:4.00,out:3.80,eff:78.4,op:'정상 가동',cd:'',status:'ok'},
  {name:'김주풍력 02단계',type:'풍력',code:'fgwp014',cbp:'1603',vpp:'VPP-경북권',loc:'경북',cap:10.00,out:9.50,eff:80.1,op:'정상 가동',cd:'',status:'ok'},
  {name:'금능1호 ESS',type:'ESS',code:'fges011',cbp:'8386',vpp:'VPP-제주권',loc:'제주',cap:2.00,out:1.80,eff:93.2,op:'정상 가동',cd:'방전 중',status:'ok'},
  {name:'제주 ESS허브',type:'ESS',code:'fges012',cbp:'8412',vpp:'VPP-제주권',loc:'제주',cap:5.00,out:-1.50,eff:92.8,op:'대기',cd:'충전 중',status:'info'},
  {name:'순천 바이오가스',type:'바이오',code:'fgbio01',cbp:'2104',vpp:'VPP-전남권',loc:'전남',cap:1.50,out:1.42,eff:89.2,op:'정상 가동',cd:'',status:'ok'},
  {name:'여수 바이오매스',type:'바이오',code:'fgbio02',cbp:'2106',vpp:'VPP-전남권',loc:'전남',cap:3.00,out:2.85,eff:89.4,op:'정상 가동',cd:'',status:'ok'},
  {name:'광주 V2G 스테이션',type:'V2G',code:'fgv2g01',cbp:'3201',vpp:'VPP-전남권',loc:'전남',cap:0.80,out:0.72,eff:93.5,op:'정상 가동',cd:'방전 중',status:'ok'},
  {name:'전남 V2G 허브',type:'V2G',code:'fgv2g02',cbp:'3203',vpp:'VPP-전남권',loc:'전남',cap:1.50,out:0.00,eff:0,op:'정비',cd:'유휴',status:'off'},
];
// 상단 탭 HTML
const _rsTabs=(current)=>{
  const counts={all:window.RS_ALL.length};
  for(const r of window.RS_ALL){counts[r.type]=(counts[r.type]||0)+1;}
  const tabs=[['all','전체'],['태양광','태양광'],['풍력','풍력'],['ESS','ESS'],['바이오','바이오'],['V2G','V2G']];
  return `<div class="rs-tab-bar">${tabs.map(([k,l])=>`<button class="rs-tab${current===k?' active':''}" onclick="rsSelectType('${k}')" data-type="${k}">${k!=='all'?`<span style="color:${_rsColor(k)};display:inline-flex;align-items:center">${_rsIcon(k)}</span>`:''}${l}<span class="rs-tab-cnt">${counts[k]||0}</span></button>`).join('')}</div>`;
};
// 7필터 바
const _rsFilterBar=()=>`<div class="card fbar" style="margin-bottom:16px">
  <div class="fbar-row">
    <div class="fbar-item"><span class="fbar-lbl">자원 유형</span><select class="fbar-sel" id="rf-type" onchange="rsFilterApply()"><option value="all">전체</option><option>태양광</option><option>풍력</option><option>ESS</option><option>바이오</option><option>V2G</option></select></div>
    <div class="fbar-item"><span class="fbar-lbl">VPP 그룹</span><select class="fbar-sel" id="rf-vpp" onchange="rsFilterApply()"><option>전체</option><option>VPP-전남권</option><option>VPP-제주권</option><option>VPP-경북권</option></select></div>
    <div class="fbar-item"><span class="fbar-lbl">운전 상태</span><select class="fbar-sel" id="rf-op" onchange="rsFilterApply()"><option>전체</option><option>정상 가동</option><option>대기</option><option>정비</option><option>이상</option></select></div>
    <div class="fbar-item"><span class="fbar-lbl">충·방전 상태</span><select class="fbar-sel" id="rf-cd" onchange="rsFilterApply()" title="ESS·V2G 자원에 적용 (다른 유형은 해당 없음)"><option>전체</option><option>충전 중</option><option>방전 중</option><option>유휴</option></select></div>
    <div class="fbar-item"><span class="fbar-lbl">시간 범위</span><select class="fbar-sel" id="rf-time" onchange="rsFilterApply()"><option>실시간</option><option>최근 1시간</option><option>최근 24시간</option><option>최근 7일</option></select></div>
    <div class="fbar-item"><span class="fbar-lbl">효율 임계</span><select class="fbar-sel" id="rf-eff" onchange="rsFilterApply()"><option>전체</option><option>임계 이하 (&lt; 85%)</option><option>상위 10%</option></select></div>
    <div class="fbar-item"><span class="fbar-lbl">정렬</span><select class="fbar-sel" id="rf-sort" onchange="rsFilterApply()"><option>이름순</option><option>효율↓</option><option>용량↓</option><option>이상도↓</option></select></div>
  </div>
</div>`;
// 자원 유형별 요약 카드 (Mode A에 사용)
const _rsTypeSummary=(type)=>{
  const rs=window.RS_ALL.filter(r=>r.type===type);
  const total=rs.reduce((a,b)=>a+(b.cap||0),0);
  const curOut=rs.reduce((a,b)=>a+(b.out||0),0);
  const avgEff=rs.length?rs.reduce((a,b)=>a+(b.eff||0),0)/rs.length:0;
  const op=rs.filter(r=>r.status==='ok').length;
  const warn=rs.filter(r=>r.status==='warn'||r.status==='off').length;
  const color=_rsColor(type);
  const opLabel={태양광:'가동 중',풍력:'가동 중',ESS:'충·방전',바이오:'가동 중',V2G:'세션 운영'}[type]||'가동 중';
  const extraInfo={태양광:'평균 모듈 42°C',풍력:'평균 풍속 11.3m/s',ESS:'평균 SOC 71%',바이오:'연소 효율 89%',V2G:'연결 18/24 차량'}[type]||'';
  return `<div class="rs-sum-card" style="border-top-color:${color}" onclick="rsSelectType('${type}')">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
      <div style="width:26px;height:26px;border-radius:6px;background:${color}1a;color:${color};display:flex;align-items:center;justify-content:center">${_rsIcon(type)}</div>
      <span style="font-size:13px;font-weight:600;color:var(--semantic-label-strong)">${type}</span>
      <span style="margin-left:auto;font-size:11px;color:var(--semantic-label-alt);font-weight:500">${rs.length}기</span>
    </div>
    <div style="display:flex;align-items:baseline;gap:3px;margin-bottom:2px">
      <span class="mono" style="font-size:20px;font-weight:700;line-height:1;color:var(--semantic-label-strong)">${curOut>=0?curOut.toFixed(2):curOut.toFixed(2)}</span>
      <span style="font-size:11px;color:var(--semantic-label-alt)">MW <span style="margin-left:4px">/ 용량 ${total.toFixed(1)}MW</span></span>
    </div>
    <div style="font-size:11px;color:var(--semantic-label-alt);margin-bottom:10px">${extraInfo}</div>
    <div style="display:flex;justify-content:space-between;font-size:11px;padding:4px 0;border-top:1px solid var(--semantic-line-alt)">
      <span style="color:var(--semantic-label-alt)">상태</span>
      <span>${op>0?`<span style="color:var(--semantic-positive-normal);font-weight:500">정상 ${op}</span>`:''}${warn>0?` <span style="color:var(--semantic-negative-normal);font-weight:500">이상 ${warn}</span>`:''}</span>
    </div>
    <div style="margin-top:6px">
      ${_rsBar(avgEff,color)}
      <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--semantic-label-alt);margin-top:3px"><span>평균 효율</span><span class="mono" style="font-weight:600">${avgEff.toFixed(1)}%</span></div>
    </div>
  </div>`;
};
// 통합 자원 테이블 행 (Mode A & 유형별 공용)
const _rsTableRows=(rows)=>rows.map(r=>{
  const cdBadge=r.cd?`<span class="badge ${r.cd==='충전 중'?'inf':r.cd==='방전 중'?'ok':'off'}" style="font-size:10px">${r.cd}</span>`:'<span style="color:var(--semantic-label-alt)">—</span>';
  const opCls=r.status==='ok'?'ok':r.status==='warn'?'warn':r.status==='info'?'inf':'off';
  const effColor=r.eff>=90?'var(--semantic-positive-normal)':r.eff>=85?'var(--semantic-label-strong)':r.eff>0?'var(--palette-yellow-40)':'var(--semantic-label-alt)';
  return `<tr class="rs-row-clickable" onclick="rsOpenSlide('${r.name}','${r.type}')">
    <td>${r.name}</td>
    <td><span class="badge" ${_rsBadge(r.type)}>${r.type}</span></td>
    <td class="mono" style="font-size:12px">${r.cbp}</td>
    <td>${r.vpp}</td>
    <td class="mono">${r.cap.toFixed(2)} MW</td>
    <td class="mono" style="color:${r.out>=0?'var(--semantic-brand-primary)':'var(--semantic-negative-normal)'}">${r.out>=0?'+':''}${r.out.toFixed(2)} MW</td>
    <td class="mono" style="color:${effColor}">${r.eff>0?r.eff.toFixed(1)+'%':'—'}</td>
    <td>${cdBadge}</td>
    <td><span class="badge ${opCls}">${r.op}</span></td>
  </tr>`;
}).join('');
// Mode A: 이기종 통합 뷰 (자원 유형 = 전체)
const _rsModeA=()=>`
<!-- 5종 요약 카드 -->
<div class="g5">
  ${['태양광','풍력','ESS','바이오','V2G'].map(t=>_rsTypeSummary(t)).join('')}
</div>
<!-- 통합 차트 -->
<div class="g2">
  <div class="card mb"><div class="sh"><div class="st">5종 자원 실시간 출력</div><span class="kpi-pill" style="font-size:11px">24h · 15분</span></div>
    <div style="height:210px;position:relative"><canvas id="c-rs-all-out" role="img" aria-label="5종 자원 출력"></canvas></div>
  </div>
  <div class="card mb"><div class="sh"><div class="st">자원 유형별 효율·가동률 비교</div></div>
    <div style="height:210px;position:relative"><canvas id="c-rs-all-radar" role="img" aria-label="효율 Radar"></canvas></div>
  </div>
</div>
<!-- 통합 테이블 -->
<div class="card"><div class="sh"><div class="st">통합 자원 목록 <span id="rs-list-cnt" style="font-size:11px;font-weight:400;color:var(--semantic-label-alt);margin-left:8px">${window.RS_ALL.length}건</span></div>${window.csvBtn('rs-tbody','rs_unified','통합 자원 목록')}</div>
<div style="overflow-x:auto"><table class="tbl"><thead><tr><th>자원명</th><th>유형</th><th>CBP번호</th><th>VPP 그룹</th><th>용량</th><th>현재 출력</th><th>효율</th><th>충·방전</th><th>운전 상태</th></tr></thead><tbody id="rs-tbody">${_rsTableRows(window.RS_ALL)}</tbody></table></div>
<div style="font-size:11px;color:var(--semantic-label-alt);margin-top:10px">※ 행 클릭 시 우측 상세 패널 열림</div>
</div>`;
// Mode B: 특정 유형 선택 시 (유형별 심화 뷰)
const _rsModeB=(type)=>{
  const rs=window.RS_ALL.filter(r=>r.type===type);
  const total=rs.reduce((a,b)=>a+(b.cap||0),0);
  const curOut=rs.reduce((a,b)=>a+(b.out||0),0);
  const avgEff=rs.length?rs.reduce((a,b)=>a+(b.eff||0),0)/rs.length:0;
  const color=_rsColor(type);
  const cdActive=(type==='ESS'||type==='V2G');
  return `
<!-- Hero: 선택된 유형 요약 -->
<div class="card mb" style="padding:0;margin-bottom:12px;overflow:hidden;border-left:4px solid ${color}">
  <div style="display:flex;align-items:stretch;flex-wrap:wrap">
    <div style="flex:1;min-width:280px;padding:16px 20px;display:flex;align-items:center;gap:14px">
      <div style="width:48px;height:48px;border-radius:10px;background:${color}1a;color:${color};display:flex;align-items:center;justify-content:center;flex-shrink:0">${_rsIcon(type)}</div>
      <div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
          <span style="font-size:17px;font-weight:700">${type} 자원</span>
          <span class="badge" ${_rsBadge(type)}>${rs.length}기</span>
        </div>
        <div style="font-size:12px;color:var(--semantic-label-alt)">총 용량 <b style="color:var(--semantic-label-normal);font-weight:600">${total.toFixed(2)} MW</b> · 현재 출력 <b style="color:${curOut>=0?'var(--semantic-brand-primary)':'var(--semantic-negative-normal)'};font-weight:600">${curOut>=0?'+':''}${curOut.toFixed(2)} MW</b> · 평균 효율 <b style="color:var(--semantic-label-normal);font-weight:600">${avgEff.toFixed(1)}%</b></div>
      </div>
    </div>
    <div style="width:1px;background:var(--semantic-line-alt)"></div>
    <div style="padding:16px 20px;display:flex;align-items:center;gap:14px">
      <div style="text-align:center">
        <div style="font-size:10px;color:var(--semantic-label-alt);margin-bottom:2px">유형 상태</div>
        <div style="display:flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:var(--semantic-positive-normal)">
          <span style="width:8px;height:8px;border-radius:50%;background:var(--semantic-positive-normal);animation:pulse 2s infinite"></span>
          정상 운영
        </div>
      </div>
    </div>
  </div>
</div>
<!-- 유형 특화 KPI (기존 _rsMetrics 재사용) -->
${_rsMetrics(type,rs[0]?.name||'')}
<!-- 유형별 차트 -->
<div class="g2">
  <div class="card mb"><div class="sh"><div class="st">${type} 실시간 ${cdActive?'충·방전':'출력'} 프로파일 (24h)</div></div><div style="height:200px;position:relative"><canvas id="c-rs-type" role="img" aria-label="${type} 프로파일"></canvas></div></div>
  <div class="card mb"><div class="sh"><div class="st">${type} 자원 효율 분포</div></div><div style="height:200px;position:relative"><canvas id="c-rs-type-eff" role="img" aria-label="효율 분포"></canvas></div></div>
</div>
<!-- 유형 자원 테이블 -->
<div class="card"><div class="sh"><div class="st">${type} 자원 상세 <span id="rs-list-cnt" style="font-size:11px;font-weight:400;color:var(--semantic-label-alt);margin-left:8px">${rs.length}기</span></div>${window.csvBtn('rs-tbody','rs_'+type,'${type} 자원 상세')}</div>
<div style="overflow-x:auto"><table class="tbl"><thead><tr><th>자원명</th><th>유형</th><th>CBP번호</th><th>VPP 그룹</th><th>용량</th><th>현재 출력</th><th>효율</th><th>충·방전</th><th>운전 상태</th></tr></thead><tbody id="rs-tbody">${_rsTableRows(rs)}</tbody></table></div>
<div style="font-size:11px;color:var(--semantic-label-alt);margin-top:10px">※ 행 클릭 시 우측 상세 패널 열림</div>
</div>`;
};
// 우측 슬라이드 패널: 자원 상세 (기존 dsh-res 내용 대부분을 포함)
const _rsDetailPanel=(name,type)=>{
  const color=_rsColor(type);
  const info={'태양광':{cap:'2,293 kW',cod:'2021-03',loc:'전남 광양',vpp:'VPP-전남권'},'풍력':{cap:'10,000 kW',cod:'2024-01',loc:'경북 김주',vpp:'VPP-경북권'},'ESS':{cap:'2,000 kW',cod:'2023-04',loc:'제주 금능',vpp:'VPP-제주권'},'바이오':{cap:'1,500 kW',cod:'2022-11',loc:'전남 순천',vpp:'VPP-전남권'},'V2G':{cap:'800 kW',cod:'2025-02',loc:'전남 광주',vpp:'VPP-전남권'}}[type]||{};
  return `
<div class="rs-slide-header">
  <div style="width:42px;height:42px;border-radius:10px;background:${color}1a;color:${color};display:flex;align-items:center;justify-content:center;flex-shrink:0">${_rsIcon(type)}</div>
  <div style="flex:1;min-width:0">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:2px">
      <span style="font-size:16px;font-weight:700">${name}</span>
      <span class="badge" ${_rsBadge(type)}>${type}</span>
    </div>
    <div style="font-size:12px;color:var(--semantic-label-alt)">${info.cap||'—'} · ${info.cod||'—'} · ${info.loc||'—'} · ${info.vpp||'—'}</div>
  </div>
  <button class="rs-slide-close" onclick="rsCloseSlide()">✕</button>
</div>
<div class="rs-slide-body">
  ${_rsMetrics(type,name)}
  <div class="card mb"><div class="sh"><div class="st">당일 발전 추이</div></div><div style="height:170px;position:relative"><canvas id="c-slide-profile"></canvas></div></div>
  <div class="g2">
    <div class="card mb"><div class="sh"><div class="st">예측 정확도</div></div>
      <div style="display:flex;align-items:flex-end;gap:16px;padding:6px 0 12px;border-bottom:1px solid var(--semantic-line-alt)">
        <div><div style="font-size:11px;color:var(--semantic-label-alt);margin-bottom:4px">금일 NMAE</div><div style="display:flex;align-items:baseline;gap:4px"><span class="mono" style="font-size:26px;font-weight:700;color:var(--semantic-positive-normal);line-height:1">4.8</span><span style="font-size:13px;color:var(--semantic-label-alt)">%</span></div></div>
        <div style="padding-bottom:4px"><span class="badge ok" style="font-size:11px">A등급</span></div>
        <div style="margin-left:auto;display:flex;gap:14px;font-size:11px">
          <div><div style="color:var(--semantic-label-alt);margin-bottom:2px">7일 RMSE</div><div class="mono" style="font-size:13px;font-weight:600">0.042</div></div>
          <div><div style="color:var(--semantic-label-alt);margin-bottom:2px">집합 순위</div><div class="mono" style="font-size:13px;font-weight:600;color:var(--semantic-brand-primary)">3/13</div></div>
        </div>
      </div>
    </div>
    <div class="card mb"><div class="sh"><div class="st">수익 기여도</div></div>
      <div class="mr" style="padding:6px 0"><div class="ml">월 누계</div><div class="mv mono" style="color:var(--semantic-label-strong);font-weight:600">28.47 백만원</div></div>
      <div class="mr" style="padding:6px 0"><div class="ml">금일 DAES</div><div class="mv mono" style="color:var(--semantic-positive-normal)">+1,122,000원</div></div>
      <div class="mr" style="padding:6px 0"><div class="ml">금일 RTES</div><div class="mv mono" style="color:var(--semantic-positive-normal)">+92,000원</div></div>
      <div class="mr" style="padding:6px 0;border:none"><div class="ml">집합 내 기여율</div><div class="mv mono" style="color:var(--semantic-brand-primary);font-weight:600">13.7%</div></div>
    </div>
  </div>
  ${_rsDetail(type,name)}
  <div class="g2" style="margin-top:16px">
    <div class="card mb"><div class="sh"><div class="st">정비·보수</div></div>
      <div style="padding:4px 0 12px;border-bottom:1px solid var(--semantic-line-alt);margin-bottom:8px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px"><span style="font-size:12px;color:var(--semantic-label-normal);font-weight:500">설비 상태 점수</span><div><span class="mono" style="font-size:22px;font-weight:700;color:var(--semantic-positive-normal)">92</span><span style="font-size:11px;color:var(--semantic-label-alt);margin-left:4px">/ 100</span></div></div>
        <div style="width:100%;height:5px;background:var(--semantic-background-3);border-radius:3px;overflow:hidden"><div style="width:92%;height:100%;background:linear-gradient(to right,var(--semantic-positive-normal),#0059ff)"></div></div>
      </div>
      <div class="mr"><div class="ml">마지막 정비</div><div class="mv mono">2026-03-15</div></div>
      <div class="mr"><div class="ml">다음 예정</div><div class="mv mono" style="color:var(--palette-yellow-40)">2026-07-15</div></div>
      <div class="mr" style="border:none"><div class="ml">누적 가동</div><div class="mv mono">28,940 hrs</div></div>
    </div>
    <div class="card mb"><div class="sh"><div class="st">통신·RTU</div><span class="kpi-pill">정상</span></div>
      <div class="mr"><div class="ml">프로토콜</div><div class="mv mono" style="font-size:12px">Modbus TCP</div></div>
      <div class="mr"><div class="ml">응답시간</div><div class="mv mono" style="color:var(--semantic-positive-normal)">12ms</div></div>
      <div class="mr"><div class="ml">패킷 손실</div><div class="mv mono" style="color:var(--semantic-positive-normal)">0.02%</div></div>
      <div class="mr" style="border:none"><div class="ml">IP:포트</div><div class="mv mono" style="font-size:12px">10.20.5.21:502</div></div>
    </div>
  </div>
  <div class="card" style="margin-top:16px"><div class="sh"><div class="st">알람 이력 (최근 7일)</div></div>
    <div class="al"><div class="ad" style="background:var(--semantic-negative-normal)"></div><div class="am">INV-03 통신 단절 · 해제 대기</div><div class="at">14:23</div></div>
    <div class="al"><div class="ad" style="background:var(--palette-yellow-40)"></div><div class="am">모듈 온도 과열 (48.2°C) · 자동 해제</div><div class="at">13:45</div></div>
    <div class="al" style="border:none"><div class="ad" style="background:var(--semantic-line-strong)"></div><div class="am">주 누적 7건 · Critical 1 · Major 2</div><div class="at">통계</div></div>
  </div>
</div>`;
};
window.P['dsh-res']=()=>{
  window._rsCurrentType='all';
  return `
${_rsFilterBar()}
<div id="rs-body">${_rsModeA()}</div>

<!-- 우측 슬라이드 패널 -->
<div class="rs-slide" id="rs-slide" style="display:none">
  <div class="rs-slide-backdrop" onclick="rsCloseSlide()"></div>
  <div class="rs-slide-panel" id="rs-slide-content"></div>
</div>
`;
};
window.rsSelectType=function(type){
  window._rsCurrentType=type;
  // 탭 동기화
  document.querySelectorAll('.rs-tab').forEach(t=>t.classList.toggle('active',t.dataset.type===type));
  // 필터 동기화
  const ft=document.getElementById('rf-type');
  if(ft)ft.value=(type==='all')?'all':type;
  // 충·방전 필터: 항상 활성 (자원의 cd 값으로 필터됨)
  // 본문 렌더링
  const body=document.getElementById('rs-body');
  if(body){
    body.innerHTML=(type==='all')?_rsModeA():_rsModeB(type);
    setTimeout(()=>window._rsInitCharts(type),40);
  }
};
window.rsFilterApply=function(){
  const type=document.getElementById('rf-type').value;
  const vpp=document.getElementById('rf-vpp').value;
  const op=document.getElementById('rf-op').value;
  const cd=document.getElementById('rf-cd').value;
  const effThr=document.getElementById('rf-eff').value;
  const sort=document.getElementById('rf-sort').value;
  // 유형 변경 시 탭 동기화
  if(type!==window._rsCurrentType){
    window.rsSelectType(type==='all'?'all':type);
  }
  // 테이블 행 필터링
  let rows=window.RS_ALL.slice();
  if(type!=='all')rows=rows.filter(r=>r.type===type);
  if(vpp!=='전체')rows=rows.filter(r=>r.vpp===vpp);
  if(op!=='전체')rows=rows.filter(r=>r.op===op);
  if(cd!=='전체')rows=rows.filter(r=>r.cd===cd);
  if(effThr==='임계 이하 (< 85%)')rows=rows.filter(r=>r.eff<85 && r.eff>0);
  else if(effThr==='상위 10%'){const th=[...window.RS_ALL].sort((a,b)=>b.eff-a.eff)[Math.floor(window.RS_ALL.length*0.1)].eff;rows=rows.filter(r=>r.eff>=th);}
  if(sort==='효율↓')rows.sort((a,b)=>b.eff-a.eff);
  else if(sort==='용량↓')rows.sort((a,b)=>b.cap-a.cap);
  else if(sort==='이상도↓')rows.sort((a,b)=>(a.status==='warn'||a.status==='off'?-1:1)-(b.status==='warn'||b.status==='off'?-1:1));
  else rows.sort((a,b)=>a.name.localeCompare(b.name));
  const tbody=document.getElementById('rs-tbody');
  if(tbody)tbody.innerHTML=_rsTableRows(rows);
  const cnt=document.getElementById('rs-list-cnt');
  if(cnt)cnt.textContent=rows.length+'건';
};
window.rsOpenSlide=function(name,type){
  const c=document.getElementById('rs-slide-content');
  const s=document.getElementById('rs-slide');
  if(!c||!s)return;
  c.innerHTML=_rsDetailPanel(name,type);
  s.style.display='block';
  setTimeout(()=>s.classList.add('open'),10);
  // Slide 내 차트 초기화
  setTimeout(()=>{
    const profiles={'태양광':[0,0,0,0,0,0,45,280,610,980,1320,1680,2050,2100,2080,2040,1890,1620,1180,780,420,180,60,0],'풍력':[4800,5100,5400,5600,5800,6000,6500,7100,7600,7800,7900,8100,7840,7700,7500,7300,7000,6800,6500,6200,5800,5400,5100,4900],'ESS':[-800,-1200,-1500,-1600,-1600,-1500,-1200,-600,0,400,800,1200,1650,1700,1700,1650,1400,900,500,0,-400,-800,-1000,-900],'바이오':[1350,1360,1370,1380,1380,1380,1380,1380,1380,1380,1380,1380,1380,1380,1380,1380,1380,1380,1380,1380,1370,1360,1350,1350],'V2G':[100,150,180,200,220,250,280,320,400,500,600,650,720,700,680,650,600,550,500,450,400,350,250,150]};
    const d=profiles[type]||profiles['태양광'];
    mkChart('c-slide-profile','line',Array.from({length:24},(_,i)=>i+'h'),[{label:'실측',data:d,borderColor:_rsColor(type),borderWidth:2,pointRadius:0,tension:0.4,fill:true,backgroundColor:_rsColor(type)+'14'}],{plugins:{legend:{display:false}}});
  },50);
};
window.rsCloseSlide=function(){
  const s=document.getElementById('rs-slide');
  if(!s)return;
  s.classList.remove('open');
  setTimeout(()=>s.style.display='none',320);
};
window._rsInitCharts=function(type){
  if(type==='all'){
    // 5종 자원 실시간 출력 (누적 라인)
    const h=Array.from({length:24},(_,i)=>i+'h');
    const datasets=[
      {label:'태양광',data:[0,0,0,0,0,0,2.5,15,34,56,75,92,110,107,104,100,90,75,50,30,15,5,1,0],borderColor:'#0059ff',borderWidth:2,pointRadius:0,tension:0.4,fill:false},
      {label:'풍력',data:[8,9,9.5,10,10.5,11,12,13,13.5,13.8,13.5,13.2,13,13.2,13.5,13.3,13,12.8,12.5,12,11,10,9.5,9],borderColor:'#1f98ff',borderWidth:2,pointRadius:0,tension:0.4,fill:false},
      {label:'ESS',data:[-1.2,-1.5,-1.7,-1.8,-1.7,-1.5,-1,-0.3,0.5,1.2,2,2.7,3.3,3.5,3.5,3.3,2.7,2,1,0,-0.5,-1,-1.3,-1.4],borderColor:'#ffca42',borderWidth:2,pointRadius:0,tension:0.4,fill:false},
      {label:'바이오',data:[4.2,4.2,4.25,4.27,4.28,4.28,4.28,4.28,4.28,4.28,4.28,4.27,4.27,4.27,4.27,4.27,4.27,4.27,4.27,4.27,4.25,4.22,4.2,4.2],borderColor:'#925fff',borderWidth:1.5,pointRadius:0,tension:0.4,fill:false},
      {label:'V2G',data:[0.1,0.15,0.2,0.25,0.3,0.4,0.5,0.55,0.6,0.65,0.68,0.7,0.72,0.7,0.68,0.65,0.6,0.55,0.5,0.45,0.4,0.35,0.25,0.15],borderColor:'#00d4a8',borderWidth:1.5,pointRadius:0,tension:0.4,fill:false},
    ];
    mkChart('c-rs-all-out','line',h,datasets,{plugins:{legend:{display:true,position:'bottom',labels:{font:{size:11},boxWidth:10,padding:8}}},scales:{y:{title:{display:true,text:'MW',color:'#666',font:{size:10}}}}});
    // Radar
    mkChart('c-rs-all-radar','radar',['효율','가동률','예측정확도','응답속도','용량활용'],[
      {label:'태양광',data:[93.6,95,95.2,92,94],borderColor:'#0059ff',backgroundColor:'rgba(0,89,255,0.12)',borderWidth:2,pointRadius:3},
      {label:'풍력',data:[78.4,90,90.9,85,80],borderColor:'#1f98ff',backgroundColor:'rgba(31,152,255,0.08)',borderWidth:1.5,pointRadius:2},
      {label:'ESS',data:[93.2,88,94,97,85],borderColor:'#ffca42',backgroundColor:'rgba(255,202,66,0.1)',borderWidth:1.5,pointRadius:2},
      {label:'바이오',data:[89.2,100,97,98,95],borderColor:'#925fff',backgroundColor:'rgba(146,95,255,0.08)',borderWidth:1.5,pointRadius:2},
      {label:'V2G',data:[93.5,75,88,90,90],borderColor:'#00d4a8',backgroundColor:'rgba(0,212,168,0.1)',borderWidth:1.5,pointRadius:2},
    ],{plugins:{legend:{display:true,position:'bottom',labels:{font:{size:10},boxWidth:10,padding:6}}},scales:{r:{beginAtZero:true,max:100,ticks:{display:false}}}});
  } else {
    // 유형별 프로파일
    const profiles={'태양광':[0,0,0,0,0,0,2.5,15,34,56,75,92,110,107,104,100,90,75,50,30,15,5,1,0],'풍력':[8,9,9.5,10,10.5,11,12,13,13.5,13.8,13.5,13.2,13,13.2,13.5,13.3,13,12.8,12.5,12,11,10,9.5,9],'ESS':[-1.2,-1.5,-1.7,-1.8,-1.7,-1.5,-1,-0.3,0.5,1.2,2,2.7,3.3,3.5,3.5,3.3,2.7,2,1,0,-0.5,-1,-1.3,-1.4],'바이오':[4.2,4.2,4.25,4.27,4.28,4.28,4.28,4.28,4.28,4.28,4.28,4.27,4.27,4.27,4.27,4.27,4.27,4.27,4.27,4.27,4.25,4.22,4.2,4.2],'V2G':[0.1,0.15,0.2,0.25,0.3,0.4,0.5,0.55,0.6,0.65,0.68,0.7,0.72,0.7,0.68,0.65,0.6,0.55,0.5,0.45,0.4,0.35,0.25,0.15]};
    const d=profiles[type]||profiles['태양광'];
    const col=_rsColor(type);
    mkChart('c-rs-type','line',Array.from({length:24},(_,i)=>i+'h'),[{label:type,data:d,borderColor:col,borderWidth:2,pointRadius:0,tension:0.4,fill:true,backgroundColor:col+'14'}],{plugins:{legend:{display:false}},scales:{y:{title:{display:true,text:'MW',color:'#666',font:{size:10}}}}});
    // 유형별 자원 효율 막대
    const rs=window.RS_ALL.filter(r=>r.type===type);
    mkChart('c-rs-type-eff','bar',rs.map(r=>r.name.replace(type,'').replace('단계','').trim()||r.name.substring(0,8)),[{label:'효율(%)',data:rs.map(r=>r.eff),backgroundColor:rs.map(r=>r.eff>=90?col+'b0':r.eff>=85?col+'70':'#ff24374d'),borderWidth:0}],{plugins:{legend:{display:false}},scales:{y:{min:0,max:100,title:{display:true,text:'%',color:'#666',font:{size:10}}},x:{ticks:{font:{size:10}}}}});
  }
};
window['I_dsh-res']=function(){
  window._rsInitCharts('all');
};
