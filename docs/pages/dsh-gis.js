// AUTO-GENERATED FROM index.html — page module: dsh-gis
window.P = window.P || {};
/* ===== 대시보드: GIS 맵 ===== */
/* ===== 대시보드: GIS 맵 (Leaflet + OSM 실제 지도 기반) ===== */
// 13개 자원 실제 위·경도 좌표 (전남·경북·제주 실증 지역)
window.GIS_COORDS={
  '광양항태양광 01단계':[34.9450,127.7000],
  '광양항태양광 04단계':[34.9410,127.7060],
  '해맞이 태양광':[34.4850,126.2630],
  '온누리 태양광':[34.8000,126.6966],
  '금능1호 태양광':[33.3800,126.1800],
  '김주풍력 01단계':[35.8270,129.2600],
  '김주풍력 02단계':[35.8290,129.2620],
  '금능1호 ESS':[33.3810,126.1810],
  '제주 ESS허브':[33.4996,126.5312],
  '순천 바이오가스':[34.9504,127.4872],
  '여수 바이오매스':[34.7604,127.6622],
  '광주 V2G 스테이션':[35.1466,126.9187],
  '전남 V2G 허브':[35.0166,126.7108],
};
window.P['dsh-gis']=()=>{
  const total=(window.RS_ALL||[]).length;
  const op=(window.RS_ALL||[]).filter(r=>r.status==='ok').length;
  const warn=(window.RS_ALL||[]).filter(r=>r.status==='warn'||r.status==='off').length;
  const cap=(window.RS_ALL||[]).reduce((a,b)=>a+(b.cap||0),0);
  return `
<!-- 필터 바 (최상위) -->
<div class="card fbar" style="margin-bottom:12px">
  <div class="fbar-row">
    <div class="fbar-item">
      <span class="fbar-lbl">자원 유형</span>
      <select class="fbar-sel" id="gis-f-type" onchange="_gisApplyFilter()">
        <option value="all">전체</option><option>태양광</option><option>풍력</option><option>ESS</option><option>바이오</option><option>V2G</option>
      </select>
    </div>
    <div class="fbar-item">
      <span class="fbar-lbl">VPP 그룹</span>
      <select class="fbar-sel" id="gis-f-vpp" onchange="_gisApplyFilter()">
        <option>전체</option><option>VPP-전남권</option><option>VPP-제주권</option><option>VPP-경북권</option>
      </select>
    </div>
    <div class="fbar-item">
      <span class="fbar-lbl">운전 상태</span>
      <select class="fbar-sel" id="gis-f-op" onchange="_gisApplyFilter()">
        <option>전체</option><option>정상 가동</option><option>대기</option><option>정비</option><option>이상</option>
      </select>
    </div>
    <div class="fbar-item">
      <span class="fbar-lbl">용량 범위</span>
      <select class="fbar-sel" id="gis-f-cap" onchange="_gisApplyFilter()">
        <option value="all">전체</option><option value="0-1">&lt; 1 MW</option><option value="1-5">1~5 MW</option><option value="5-">5 MW 이상</option>
      </select>
    </div>
    <div class="fbar-item">
      <span class="fbar-lbl">지도 레이어</span>
      <select class="fbar-sel" id="gis-f-layer" onchange="_gisChangeLayer(this.value)">
        <option value="osm">표준 (OSM)</option><option value="sat">위성 (Esri)</option><option value="topo">지형 (OpenTopo)</option>
      </select>
    </div>
  </div>
</div>

<div class="g4">
  <div class="card acc"><div class="ct">전체 자원수 ${window.tip('전체 자원수','지도에 표시된 모든 발전·저장 자원의 개수','COUNT(자원) WHERE 필터 매칭','GPS 좌표가 등록된 자원만 집계 — 미등록 자원은 자원관리 메뉴에서 좌표 추가 필요')}</div><div class="kv">${total}<span class="ku">개소</span></div></div>
  <div class="card"><div class="ct">정상 가동 ${window.tip('정상 가동','통신·운전 상태 모두 정상이며 출력 중인 자원','상태 = 정상 AND 통신 = OK AND 출력 > 0','시운전 중·정비 중 자원은 제외 / 100% 가까울수록 양호')}</div><div class="kv" style="color:var(--semantic-positive-normal)">${op}<span class="ku">개소</span></div></div>
  <div class="card"><div class="ct">이상·장애 ${window.tip('이상·장애','통신 단절 또는 운전 이상이 감지된 자원','상태 = 단절 OR 경계 OR 이상','즉시 현장 점검 필요 — 클릭 시 해당 자원 상세 패널 확인 가능 / 알람이력에서 코드별 추적')}</div><div class="kv" style="color:var(--semantic-negative-normal)">${warn}<span class="ku">개소</span></div></div>
  <div class="card"><div class="ct">총 설치용량 ${window.tip('총 설치용량','필터 결과 자원의 정격 출력 합계 (Nameplate Capacity)','Σ(자원별 설치용량 kW) ÷ 1000 [MW]','실시간 출력과 다름 — 일사량/풍속/SoC에 따라 실제 출력은 변동')}</div><div class="kv">${cap.toFixed(1)}<span class="ku">MW</span></div></div>
</div>

<div class="g65">
  <div class="card mb">
    <div class="sh">
      <div class="st">전국 자원 맵 · OpenStreetMap</div>
      <div style="display:flex;gap:10px;font-size:11px;align-items:center;flex-wrap:wrap">
        <span style="display:flex;align-items:center;gap:4px"><span style="width:10px;height:10px;border-radius:50%;background:#0059ff"></span>태양광</span>
        <span style="display:flex;align-items:center;gap:4px"><span style="width:10px;height:10px;border-radius:50%;background:#1f98ff"></span>풍력</span>
        <span style="display:flex;align-items:center;gap:4px"><span style="width:10px;height:10px;border-radius:50%;background:#ffca42"></span>ESS</span>
        <span style="display:flex;align-items:center;gap:4px"><span style="width:10px;height:10px;border-radius:50%;background:#925fff"></span>바이오</span>
        <span style="display:flex;align-items:center;gap:4px"><span style="width:10px;height:10px;border-radius:50%;background:#00d4a8"></span>V2G</span>
        <span style="width:1px;height:14px;background:var(--semantic-line-normal)"></span>
        <span style="display:flex;align-items:center;gap:4px"><span style="width:10px;height:10px;border-radius:50%;border:2px solid #ff2437;background:#ffffff"></span>이상·장애</span>
      </div>
    </div>
    <div id="gis-map" style="height:500px;border-radius:6px;overflow:hidden;background:var(--semantic-background-3)"></div>
    <div style="font-size:11px;color:var(--semantic-label-alt);margin-top:8px">※ 마커 클릭 시 발전소 정보 · "상세 보기" 링크 → 자원별 상세관제 슬라이드</div>
  </div>
  <div class="card mb">
    <div class="sh"><div class="st">지역별 현황</div></div>
    <div class="pr"><div class="pl">전남권</div><div class="pb"><div class="pf" style="width:78%;background:var(--semantic-brand-primary)"></div></div><div class="pv">8개소 · 13.2MW</div></div>
    <div class="pr"><div class="pl">제주권</div><div class="pb"><div class="pf" style="width:52%;background:#1f98ff"></div></div><div class="pv">3개소 · 7.98MW</div></div>
    <div class="pr"><div class="pl">경북권</div><div class="pb"><div class="pf" style="width:88%;background:var(--palette-yellow-40)"></div></div><div class="pv">2개소 · 14.0MW</div></div>
    <div class="sh" style="margin-top:14px"><div class="st">유형별 분포</div></div>
    <table class="tbl"><thead><tr><th>유형</th><th>개소</th><th>용량 합</th><th>현재 출력</th></tr></thead><tbody>
      <tr><td><span class="badge inf">태양광</span></td><td class="mono">5</td><td class="mono">7.47 MW</td><td class="mono" style="color:var(--semantic-brand-primary)">+7.04 MW</td></tr>
      <tr><td><span class="badge" style="background:var(--semantic-tag-bg-blue);color:var(--semantic-tag-label-blue)">풍력</span></td><td class="mono">2</td><td class="mono">14.00 MW</td><td class="mono" style="color:var(--semantic-brand-primary)">+13.30 MW</td></tr>
      <tr><td><span class="badge" style="background:var(--semantic-tag-bg-yellow);color:var(--semantic-tag-label-yellow)">ESS</span></td><td class="mono">2</td><td class="mono">7.00 MW</td><td class="mono">+0.30 MW</td></tr>
      <tr><td><span class="badge" style="background:#e8defa;color:#6035cc">바이오</span></td><td class="mono">2</td><td class="mono">4.50 MW</td><td class="mono" style="color:var(--semantic-brand-primary)">+4.27 MW</td></tr>
      <tr><td><span class="badge" style="background:var(--semantic-tag-bg-green);color:var(--semantic-tag-label-green)">V2G</span></td><td class="mono">2</td><td class="mono">2.30 MW</td><td class="mono">+0.72 MW</td></tr>
    </tbody></table>
    <div class="sh" style="margin-top:14px"><div class="st">이상·장애 자원</div></div>
    <div class="al"><div class="ad" style="background:var(--palette-yellow-40)"></div><div class="am"><b>금능1호 태양광</b> · 효율 저하 82.4%</div><div class="at">제주</div></div>
    <div class="al" style="border:none"><div class="ad" style="background:var(--semantic-label-alt)"></div><div class="am"><b>전남 V2G 허브</b> · 정비 중</div><div class="at">전남</div></div>
  </div>
</div>`;
};
window.gisDetail=function(name,type){
  activate('dsh-res');
  setTimeout(()=>{if(window.rsOpenSlide)window.rsOpenSlide(name,type);},180);
};
window._gisApplyFilter=function(){
  const type=document.getElementById('gis-f-type')?.value||'all';
  const vpp=document.getElementById('gis-f-vpp')?.value||'전체';
  const op=document.getElementById('gis-f-op')?.value||'전체';
  const capRange=document.getElementById('gis-f-cap')?.value||'all';
  if(!window._gisMapInstance||!window._gisMarkers)return;
  window._gisMarkers.forEach(m=>{
    const r=m._rs;
    let show=true;
    if(type!=='all'&&r.type!==type)show=false;
    if(vpp!=='전체'&&r.vpp!==vpp)show=false;
    if(op!=='전체'&&r.op!==op)show=false;
    if(capRange==='0-1'&&r.cap>=1)show=false;
    if(capRange==='1-5'&&(r.cap<1||r.cap>=5))show=false;
    if(capRange==='5-'&&r.cap<5)show=false;
    if(show){if(!window._gisMapInstance.hasLayer(m))m.addTo(window._gisMapInstance);}
    else{if(window._gisMapInstance.hasLayer(m))m.remove();}
  });
};
window._gisChangeLayer=function(k){
  if(!window._gisMapInstance||!window.L)return;
  // 기존 타일 제거
  window._gisMapInstance.eachLayer(l=>{if(l instanceof window.L.TileLayer)window._gisMapInstance.removeLayer(l);});
  const tiles={
    'osm':['https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png','© OpenStreetMap contributors'],
    'sat':['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}','Tiles © Esri'],
    'topo':['https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png','© OpenTopoMap (CC-BY-SA)'],
  };
  const [url,attr]=tiles[k]||tiles['osm'];
  window.L.tileLayer(url,{attribution:attr,maxZoom:18}).addTo(window._gisMapInstance);
};
window._gisInitMap=function(){
  const el=document.getElementById('gis-map');
  if(!el||!window.L)return;
  // 기존 인스턴스 정리
  if(window._gisMapInstance){try{window._gisMapInstance.remove();}catch(e){}}
  const map=window.L.map('gis-map',{zoomControl:true,scrollWheelZoom:true}).setView([35.9,127.8],7);
  window._gisMapInstance=map;
  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution:'© OpenStreetMap contributors',
    maxZoom:18,
  }).addTo(map);
  window._gisMarkers=[];
  const cm={'태양광':'#0059ff','풍력':'#1f98ff','ESS':'#ffca42','바이오':'#925fff','V2G':'#00d4a8'};
  (window.RS_ALL||[]).forEach(r=>{
    const pos=window.GIS_COORDS[r.name];
    if(!pos)return;
    const color=cm[r.type]||'#0059ff';
    const radius=6+Math.log((r.cap||0.1)+1)*4;
    const isWarn=r.status==='warn'||r.status==='off';
    const m=window.L.circleMarker(pos,{
      radius:radius,
      color:isWarn?'#ff2437':color,
      weight:isWarn?2.5:2,
      fillColor:color,
      fillOpacity:0.6,
    });
    const cdHtml=r.cd?`<span style="color:#0059ff">${r.cd}</span> · `:'';
    const statusColor=r.status==='ok'?'#16a34a':r.status==='warn'?'#f59e0b':'#6b7280';
    m.bindPopup(`<div style="font-family:-apple-system,sans-serif;min-width:200px">
      <div style="font-weight:700;font-size:13px;margin-bottom:4px">${r.name}</div>
      <div style="font-size:11px;color:#888;margin-bottom:8px">${r.type} · CBP ${r.cbp} · ${r.vpp}</div>
      <div style="border-top:1px solid #eee;padding-top:8px;font-size:12px;line-height:1.7">
        <div><span style="color:#888">용량 ·</span> <b>${r.cap.toFixed(2)} MW</b></div>
        <div><span style="color:#888">현재 출력 ·</span> <b style="color:${r.out>=0?'#0059ff':'#ff2437'}">${r.out>=0?'+':''}${r.out.toFixed(2)} MW</b></div>
        <div><span style="color:#888">효율 ·</span> <b>${r.eff>0?r.eff.toFixed(1)+'%':'—'}</b></div>
        <div><span style="color:#888">상태 ·</span> ${cdHtml}<b style="color:${statusColor}">${r.op}</b></div>
      </div>
      <div style="margin-top:10px;text-align:right"><a href="#" onclick="window.gisDetail('${r.name}','${r.type}');return false" style="color:#0059ff;font-size:12px;font-weight:500;text-decoration:none">상세 보기 →</a></div>
    </div>`,{maxWidth:260});
    m._rs=r;
    m.addTo(map);
    window._gisMarkers.push(m);
  });
};
window['I_dsh-gis']=function(){
  // Leaflet CSS/JS 로드 (최초 1회)
  if(typeof window.L==='undefined'){
    if(!document.getElementById('leaflet-css')){
      const link=document.createElement('link');
      link.id='leaflet-css';link.rel='stylesheet';
      link.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
    const sc=document.createElement('script');
    sc.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    sc.onload=()=>{setTimeout(window._gisInitMap,50);};
    document.head.appendChild(sc);
  } else {
    setTimeout(window._gisInitMap,50);
  }
};


