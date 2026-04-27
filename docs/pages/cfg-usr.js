// AUTO-GENERATED FROM index.html — page module: cfg-usr
window.P = window.P || {};
/* ===== 설정: 사용자관리 ===== */
window.P['cfg-usr']=()=>`
<!-- 최상위 필터 바 (분류 → 상태 → 세부) -->
<div class="card fbar"><div class="fbar-row">
  <div class="fbar-item"><label class="flabel">유저 유형</label>
    <select class="fbar-sel" id="cu-f-type" onchange="cfgUsrFilterApply()">
      <option value="">전체</option><option>시스템관리자</option><option>운영관리자</option><option>자원소유자</option><option>연구진</option>
    </select></div>
  <div class="fbar-item"><label class="flabel">상태</label>
    <select class="fbar-sel" id="cu-f-stat" onchange="cfgUsrFilterApply()">
      <option value="">전체</option><option>활성</option><option>잠금</option>
    </select></div>
  <div class="fbar-item"><label class="flabel">소속</label>
    <select class="fbar-sel" id="cu-f-org" onchange="cfgUsrFilterApply()">
      <option value="">전체</option><option>60Hertz</option><option>동서발전</option><option>광양항태양광</option><option>온누리태양광</option><option>GIST</option><option>Fraunhofer</option><option>에기연</option>
    </select></div>
  <div class="fbar-item"><label class="flabel">MFA</label>
    <select class="fbar-sel" id="cu-f-mfa" onchange="cfgUsrFilterApply()">
      <option value="">전체</option><option>OTP</option><option>SMS</option><option>선택</option>
    </select></div>
  <div class="fbar-item"><label class="flabel">만료</label>
    <select class="fbar-sel" id="cu-f-exp" onchange="cfgUsrFilterApply()">
      <option value="">전체</option><option value="soon">30일 이내 임박</option><option value="perm">무기한</option>
    </select></div>
</div></div>

<!-- 정책 안내 카드 -->
<div class="card mb" style="border-left:3px solid var(--semantic-brand-primary);padding:14px 18px;background:var(--semantic-brand-primary-assistive);margin-bottom:12px">
  <div style="font-size:14px;font-weight:600;margin-bottom:4px">회원 및 권한 관리 정책</div>
  <div style="font-size:13px;line-height:20px;color:var(--semantic-label-normal)">
    4개 유저 유형 · MFA 필수(관리자급) · IP ACL 화이트리스트 · 세션 60분 타임아웃. 기능명세서 v0.3 "1) 회원 및 권한 관리 정책"을 근거로 운영됩니다.
  </div>
</div>

<div class="g4">
  <div class="card"><div class="ct">전체 계정 ${window.tip('전체 계정','시스템에 등록된 모든 사용자 계정 수','COUNT(*) FROM users','4개 유저 유형: 시스템관리자 / 운영관리자 / 자원소유자 / 연구진')}</div><div class="kv" id="usr-total">18<span class="ku">명</span></div><div class="kd neu">시스템 2 / 운영 4 / 자원소유자 10 / 연구진 2</div></div>
  <div class="card acc"><div class="ct">활성 ${window.tip('활성 계정','로그인 가능한 계정 수','상태 = 활성 인 계정','관리자급은 MFA 필수 / 연구진은 IP ACL 제한 / 세션 60분 자동 로그아웃')}</div><div class="kv" style="color:var(--semantic-positive-normal)" id="usr-active">14<span class="ku">명</span></div><div class="kd up">MFA 100% 적용</div></div>
  <div class="card"><div class="ct">잠금 · 만료 ${window.tip('잠금 · 만료 계정','로그인이 차단된 계정 수','상태 = 잠금 OR 만료 인 계정','잠금: 5회 로그인 실패 / 만료: 유효기간 경과 — 관리자 승인으로 해제')}</div><div class="kv" style="color:var(--semantic-negative-normal)" id="usr-locked">3<span class="ku">명</span></div><div class="kd neu">잠금 2 · 만료 1</div></div>
  <div class="card"><div class="ct">만료 임박 (30일 내) ${window.tip('만료 임박 계정','30일 이내 만료 예정인 계정 수','만료일 - 오늘 ≤ 30일','7일 전 / 1일 전 자동 알림 발송 — 연구진 임시 계정에 주로 발생')}</div><div class="kv" style="color:var(--palette-yellow-40)">1<span class="ku">명</span></div><div class="kd neu">연구진 임시 계정</div></div>
</div>

<div class="card">
  <div class="sh">
    <div class="st">계정 목록</div>
    <div style="display:flex;gap:8px;align-items:center">
      <select class="sel" style="width:140px;height:32px;font-size:12px">
        <option>전체 유형</option><option>시스템관리자</option><option>운영관리자</option><option>자원소유자</option><option>연구진</option>
      </select>
      <input class="inp" placeholder="검색 (성명·소속)" style="width:180px;height:32px;font-size:12px" oninput="usrSearch(this.value)">
      ${window.csvBtn('usr-tbody','user_accounts','계정 목록')}
      <button class="cb p sm" onclick="openModal('modal-usr-add')">계정 추가</button>
    </div>
  </div>
  <div style="overflow-x:auto">
  <table class="tbl"><thead><tr><th>성명</th><th>소속</th><th>유저 유형</th><th>접근 범위</th><th>MFA</th><th>IP ACL</th><th>유효기간</th><th>최근 접속</th><th>상태</th><th>관리</th></tr></thead>
  <tbody id="usr-tbody">
    <tr><td>김운영</td><td>60Hertz</td><td><span class="badge" style="background:var(--semantic-tag-bg-red);color:var(--semantic-tag-label-red)">시스템관리자</span></td><td class="mono" style="font-size:12px">전체 자원</td><td style="text-align:center;color:var(--semantic-positive-normal)">OTP</td><td class="mono" style="font-size:12px">사내망</td><td class="mono" style="font-size:12px">무기한</td><td class="mono" style="font-size:12px">14:21</td><td><span class="badge ok">활성</span></td><td><button class="cb n sm" onclick="openEditUsr('김운영')">편집</button></td></tr>
    <tr><td>최관제</td><td>60Hertz</td><td><span class="badge" style="background:var(--semantic-tag-bg-red);color:var(--semantic-tag-label-red)">시스템관리자</span></td><td class="mono" style="font-size:12px">전체 자원</td><td style="text-align:center;color:var(--semantic-positive-normal)">OTP</td><td class="mono" style="font-size:12px">사내망</td><td class="mono" style="font-size:12px">무기한</td><td class="mono" style="font-size:12px">13:58</td><td><span class="badge ok">활성</span></td><td><button class="cb n sm" onclick="openEditUsr('최관제')">편집</button></td></tr>
    <tr><td>이제어</td><td>동서발전</td><td><span class="badge inf">운영관리자</span></td><td class="mono" style="font-size:12px">VPP-전남·제주권</td><td style="text-align:center;color:var(--semantic-positive-normal)">OTP</td><td class="mono" style="font-size:12px">발전사망</td><td class="mono" style="font-size:12px">2026-12-31</td><td class="mono" style="font-size:12px">13:45</td><td><span class="badge ok">활성</span></td><td><button class="cb n sm" onclick="openEditUsr('이제어')">편집</button></td></tr>
    <tr><td>김발전</td><td>동서발전</td><td><span class="badge inf">운영관리자</span></td><td class="mono" style="font-size:12px">VPP-경북권</td><td style="text-align:center;color:var(--semantic-positive-normal)">SMS</td><td class="mono" style="font-size:12px">발전사망</td><td class="mono" style="font-size:12px">2026-12-31</td><td class="mono" style="font-size:12px">11:22</td><td><span class="badge ok">활성</span></td><td><button class="cb n sm" onclick="openEditUsr('김발전')">편집</button></td></tr>
    <tr><td>박소유</td><td>광양항태양광</td><td><span class="badge ok">자원소유자</span></td><td class="mono" style="font-size:12px">본인 자산 1건</td><td style="text-align:center;color:var(--semantic-label-alt)">선택</td><td class="mono" style="font-size:12px">-</td><td class="mono" style="font-size:12px">무기한</td><td class="mono" style="font-size:12px">어제</td><td><span class="badge ok">활성</span></td><td><button class="cb n sm" onclick="openEditUsr('박소유')">편집</button></td></tr>
    <tr><td>정사업</td><td>온누리태양광</td><td><span class="badge ok">자원소유자</span></td><td class="mono" style="font-size:12px">본인 자산 1건</td><td style="text-align:center;color:var(--semantic-label-alt)">선택</td><td class="mono" style="font-size:12px">-</td><td class="mono" style="font-size:12px">무기한</td><td class="mono" style="font-size:12px">09:11</td><td><span class="badge ok">활성</span></td><td><button class="cb n sm" onclick="openEditUsr('정사업')">편집</button></td></tr>
    <tr><td>박연구</td><td>GIST</td><td><span class="badge warn">연구진</span></td><td class="mono" style="font-size:12px">조회만 (전체)</td><td style="text-align:center;color:var(--semantic-positive-normal)">OTP</td><td class="mono" style="font-size:12px">연구망</td><td class="mono" style="font-size:12px;color:var(--palette-yellow-40)">2026-05-20 (27일 남음)</td><td class="mono" style="font-size:12px">12:30</td><td><span class="badge ok">활성</span></td><td><button class="cb n sm" onclick="openEditUsr('박연구')">편집</button></td></tr>
    <tr><td>Klein</td><td>Fraunhofer</td><td><span class="badge warn">연구진</span></td><td class="mono" style="font-size:12px">조회만 (전체)</td><td style="text-align:center;color:var(--semantic-positive-normal)">OTP</td><td class="mono" style="font-size:12px">연구망</td><td class="mono" style="font-size:12px">2026-09-15</td><td class="mono" style="font-size:12px">2일 전</td><td><span class="badge ok">활성</span></td><td><button class="cb n sm" onclick="openEditUsr('Klein')">편집</button></td></tr>
    <tr><td>정외부</td><td>에기연</td><td><span class="badge inf">운영관리자</span></td><td class="mono" style="font-size:12px">VPP-제주권</td><td style="text-align:center;color:var(--semantic-positive-normal)">OTP</td><td class="mono" style="font-size:12px">연구망</td><td class="mono" style="font-size:12px">2026-11-30</td><td class="mono" style="font-size:12px">어제</td><td><span class="badge err">잠금</span></td><td><button class="cb n sm" onclick="openEditUsr('정외부')">편집</button></td></tr>
  </tbody></table>
  </div>
</div>

<!-- 계정 추가 모달 -->
<div class="modal-backdrop" id="modal-usr-add" style="display:none" onclick="closeModalBg(event,'modal-usr-add')">
  <div class="modal">
    <div class="modal-hdr">
      <span class="modal-title">신규 계정 추가</span>
      <button class="modal-close" onclick="closeModal('modal-usr-add')">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-section">기본 정보</div>
      <div class="form-row">
        <div class="form-item"><label>성명 *</label><input class="inp" placeholder="홍길동" id="usr-name"></div>
        <div class="form-item"><label>소속 *</label><input class="inp" placeholder="60Hertz / 동서발전 / GIST 등" id="usr-org"></div>
      </div>
      <div class="form-row">
        <div class="form-item"><label>이메일 *</label><input class="inp" placeholder="user@60hz.kr" id="usr-email" type="email"></div>
        <div class="form-item"><label>연락처</label><input class="inp" placeholder="010-0000-0000" id="usr-phone"></div>
      </div>
      <hr class="form-divider">
      <div class="form-section">권한 설정</div>
      <div class="form-row">
        <div class="form-item"><label>유저 유형 *</label>
          <select class="sel" id="usr-role">
            <option>시스템관리자 (60Hz)</option>
            <option selected>운영관리자 (발전사)</option>
            <option>자원소유자 (일반 사용자)</option>
            <option>연구진 (서드파티 · 6개월)</option>
          </select>
        </div>
        <div class="form-item"><label>접근 범위 *</label>
          <select class="sel" id="usr-scope">
            <option>전체 자원</option>
            <option>VPP-전남권</option><option>VPP-제주권</option><option>VPP-경북권</option>
            <option>본인 자산만 (자원소유자)</option>
            <option>조회만 (연구진)</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-item"><label>유효기간 *</label>
          <select class="sel" id="usr-exp">
            <option>무기한 (관리자·자원소유자 기본)</option>
            <option>6개월 (연구진 기본)</option>
            <option>1년</option>
            <option>직접 지정…</option>
          </select>
        </div>
        <div class="form-item"><label>제어 등급</label>
          <select class="sel" id="usr-level">
            <option>Lv.0 — 조회만</option><option>Lv.1 — 설정변경</option><option selected>Lv.2 — 수동제어</option><option>Lv.3 — 비상정지</option>
          </select>
        </div>
      </div>
      <hr class="form-divider">
      <div class="form-section">보안 정책</div>
      <div class="form-row">
        <div class="form-item"><label>MFA 유형 *</label>
          <select class="sel" id="usr-mfa-type">
            <option selected>OTP (Google Authenticator 등)</option>
            <option>SMS 인증</option>
            <option>지문 인식 (모바일 앱)</option>
            <option>미적용 (자원소유자 선택 가능)</option>
          </select>
        </div>
        <div class="form-item"><label>IP ACL 대역 *</label>
          <select class="sel" id="usr-acl">
            <option>사내망 (60Hz · 10.10.0.0/16)</option>
            <option>발전사망 (동서발전 · 172.20.0.0/16)</option>
            <option>연구망 (GIST/Fraunhofer 등)</option>
            <option>제한 없음 (자원소유자)</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-item"><label>초기 비밀번호</label><input class="inp" type="password" placeholder="8자 이상" id="usr-pw"></div>
        <div class="form-item"><label>비밀번호 확인</label><input class="inp" type="password" placeholder="재입력" id="usr-pw2"></div>
      </div>
      <div style="padding:10px 12px;background:var(--semantic-background-2);border-radius:6px;font-size:11px;color:var(--semantic-label-alt);line-height:18px;margin-top:10px">
        ℹ 관리자급(시스템·운영)은 MFA 필수. 세션은 60분 미활동 시 자동 종료되며, 중복 로그인은 차단됩니다.
      </div>
    </div>
    <div class="modal-footer">
      <button class="cb n" onclick="closeModal('modal-usr-add')">취소</button>
      <button class="cb p" onclick="saveUsr()">계정 생성</button>
    </div>
  </div>
</div>

<!-- 계정 편집 모달 -->
<div class="modal-backdrop" id="modal-usr-edit" style="display:none" onclick="closeModalBg(event,'modal-usr-edit')">
  <div class="modal">
    <div class="modal-hdr">
      <span class="modal-title" id="usr-edit-title">계정 편집</span>
      <button class="modal-close" onclick="closeModal('modal-usr-edit')">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-section">계정 상태 변경</div>
      <div class="form-row">
        <div class="form-item"><label>계정 상태</label>
          <select class="sel" id="usr-edit-status"><option>활성</option><option>잠금</option><option>만료</option></select>
        </div>
        <div class="form-item"><label>제어 등급</label>
          <select class="sel"><option>Lv.0</option><option>Lv.1</option><option selected>Lv.2</option><option>Lv.3</option></select>
        </div>
      </div>
      <div class="form-row full">
        <div class="form-item"><label>비밀번호 초기화</label>
          <div style="display:flex;gap:8px"><input class="inp" type="password" placeholder="새 비밀번호 (변경 시에만 입력)"><button class="cb n" style="white-space:nowrap;font-size:10px">초기화</button></div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="cb d" style="margin-right:auto;font-size:10px" onclick="closeModal('modal-usr-edit')">계정 삭제</button>
      <button class="cb n" onclick="closeModal('modal-usr-edit')">취소</button>
      <button class="cb p" onclick="toast('계정이 수정되었습니다.');closeModal('modal-usr-edit')">저장</button>
    </div>
  </div>
</div>`;

window['I_cfg-usr']=function(){
  function escHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  window.usrSearch=function(v){
    const rows=document.querySelectorAll('#usr-tbody tr');
    rows.forEach(r=>{r.style.display=r.textContent.includes(v)?'':'none';});
  };
  window.cfgUsrFilterApply=function(){
    const type=document.getElementById('cu-f-type')?.value||'';
    const stat=document.getElementById('cu-f-stat')?.value||'';
    const org=document.getElementById('cu-f-org')?.value||'';
    const mfa=document.getElementById('cu-f-mfa')?.value||'';
    const exp=document.getElementById('cu-f-exp')?.value||'';
    let total=0,active=0,locked=0;
    document.querySelectorAll('#usr-tbody tr').forEach(tr=>{
      const cOrg=tr.cells[1]?.textContent.trim();
      const cType=tr.cells[2]?.textContent.trim();
      const cMfa=tr.cells[4]?.textContent.trim();
      const cExp=tr.cells[6]?.textContent.trim();
      const cStat=tr.cells[8]?.textContent.trim();
      let show=true;
      if(type && cType!==type) show=false;
      if(stat && cStat!==stat) show=false;
      if(org && cOrg!==org) show=false;
      if(mfa && cMfa!==mfa) show=false;
      if(exp){
        if(exp==='perm' && cExp!=='무기한') show=false;
        else if(exp==='soon'){
          const m=cExp.match(/(\d+)일\s*내/);
          if(!m || parseInt(m[1])>30) show=false;
        }
      }
      tr.style.display=show?'':'none';
      if(show){
        total++;
        if(cStat==='활성') active++;
        if(cStat==='잠금') locked++;
      }
    });
    const t=document.getElementById('usr-total'); if(t) t.firstChild.nodeValue=total;
    const a=document.getElementById('usr-active'); if(a) a.firstChild.nodeValue=active;
    const l=document.getElementById('usr-locked'); if(l) l.firstChild.nodeValue=locked;
  };
  window.openEditUsr=function(name){
    document.getElementById('usr-edit-title').textContent='계정 편집 — '+name;
    openModal('modal-usr-edit');
  };
  function updateUsrKPI(){
    const tot=document.querySelectorAll('#usr-tbody tr').length;
    const act=document.querySelectorAll('#usr-tbody .badge.ok').length;
    const lock=document.querySelectorAll('#usr-tbody .badge.err').length;
    const t=document.getElementById('usr-total');
    const a=document.getElementById('usr-active');
    const l=document.getElementById('usr-locked');
    if(t) t.innerHTML=tot+'<span class="ku">명</span>';
    if(a) a.innerHTML=act+'<span class="ku">명</span>';
    if(l) l.innerHTML=lock+'<span class="ku">명</span>';
  }
  function resetUsrForm(){
    ['usr-name','usr-org','usr-email','usr-phone','usr-pw','usr-pw2'].forEach(id=>{
      const el=document.getElementById(id); if(el) el.value='';
    });
    const mfa=document.getElementById('usr-mfa'); if(mfa) mfa.checked=true;
    const role=document.getElementById('usr-role'); if(role) role.selectedIndex=1;
    const lvl=document.getElementById('usr-level'); if(lvl) lvl.selectedIndex=2;
    const sc=document.getElementById('usr-scope'); if(sc) sc.selectedIndex=0;
  }
  window.saveUsr=function(){
    const nameEl=document.getElementById('usr-name');
    const orgEl=document.getElementById('usr-org');
    const pwEl=document.getElementById('usr-pw');
    const pw2El=document.getElementById('usr-pw2');
    const roleEl=document.getElementById('usr-role');
    const levelEl=document.getElementById('usr-level');
    if(!nameEl||!orgEl||!roleEl||!levelEl){toast('폼을 불러올 수 없습니다.','err');return;}
    const name=nameEl.value.trim();
    const org=orgEl.value.trim();
    const pw=pwEl?pwEl.value:'';
    const pw2=pw2El?pw2El.value:'';
    if(!name||!org){toast('성명과 소속은 필수 입력입니다.','warn');return;}
    if(pw&&pw!==pw2){toast('비밀번호가 일치하지 않습니다.','warn');return;}
    const tbody=document.getElementById('usr-tbody');
    if(!tbody){toast('목록을 찾을 수 없습니다.','err');return;}
    // 폼에서 모든 값 읽기
    const roleRaw=roleEl.value;  // "시스템관리자 (60Hz)" 등
    const role=roleRaw.split(' (')[0];
    const level=(levelEl.value||'').split(' ')[0]||'Lv.0';
    const scopeEl=document.getElementById('usr-scope');
    const expEl=document.getElementById('usr-exp');
    const mfaTypeEl=document.getElementById('usr-mfa-type');
    const aclEl=document.getElementById('usr-acl');
    const scopeRaw=scopeEl?scopeEl.value:'';
    const scope=scopeRaw.split(' (')[0]||scopeRaw;
    const expRaw=expEl?expEl.value:'';
    var expVal='무기한';
    if(/6개월/.test(expRaw)) expVal='6개월';
    else if(/1년/.test(expRaw)) expVal='1년';
    else if(/직접/.test(expRaw)) expVal='—';
    const mfaTypeRaw=mfaTypeEl?mfaTypeEl.value:'';
    var mfa='—', mfaColor='var(--semantic-label-alt)';
    if(/OTP/i.test(mfaTypeRaw)){ mfa='OTP'; mfaColor='var(--semantic-positive-normal)'; }
    else if(/SMS/i.test(mfaTypeRaw)){ mfa='SMS'; mfaColor='var(--semantic-positive-normal)'; }
    else if(/지문/.test(mfaTypeRaw)){ mfa='지문'; mfaColor='var(--semantic-positive-normal)'; }
    else if(/미적용/.test(mfaTypeRaw)){ mfa='선택'; }
    const aclRaw=aclEl?aclEl.value:'';
    var aclLabel=aclRaw.split(' (')[0]||'—';
    if(/제한 없음/.test(aclRaw)) aclLabel='—';
    // 유저 유형별 badge 색상
    var roleBadge='';
    if(role==='시스템관리자') roleBadge='<span class="badge" style="background:var(--semantic-tag-bg-red);color:var(--semantic-tag-label-red)">시스템관리자</span>';
    else if(role==='운영관리자') roleBadge='<span class="badge inf">운영관리자</span>';
    else if(role==='자원소유자') roleBadge='<span class="badge ok">자원소유자</span>';
    else if(role==='연구진') roleBadge='<span class="badge warn">연구진</span>';
    else roleBadge='<span class="badge">'+escHtml(role)+'</span>';
    const safeName=escHtml(name);
    const tr=document.createElement('tr');
    tr.innerHTML='<td>'+safeName+'</td>'
      +'<td>'+escHtml(org)+'</td>'
      +'<td>'+roleBadge+'</td>'
      +'<td class="mono" style="font-size:12px">'+escHtml(scope)+'</td>'
      +'<td style="text-align:center;color:'+mfaColor+'">'+mfa+'</td>'
      +'<td class="mono" style="font-size:12px">'+escHtml(aclLabel)+'</td>'
      +'<td class="mono" style="font-size:12px">'+expVal+'</td>'
      +'<td class="mono" style="font-size:12px">방금</td>'
      +'<td><span class="badge ok">활성</span></td>'
      +'<td><button class="cb n sm" type="button">편집</button></td>';
    const editBtn=tr.querySelector('button');
    if(editBtn) editBtn.onclick=function(){openEditUsr(name);};
    tbody.appendChild(tr);
    updateUsrKPI();
    resetUsrForm();
    closeModal('modal-usr-add');
    toast('계정이 생성되었습니다. ('+name+')');
  };
};

