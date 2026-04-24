# 🔌 AI-VPP 플랫폼 구축 프로젝트 컨텍스트

이 문서는 `/vpp` 슬래시 명령으로 호출되며, **60Hertz × EWP(동서발전) AI-VPP 통합 플랫폼 구축** 작업 시 Claude가 사전에 숙지해야 할 프로젝트 배경, 아키텍처, 일정, KPI, 리스크를 정리한 상시 참조 자료입니다.

> **사용 규칙:** 본 명령이 호출되면 Claude는 아래 내용을 프로젝트 기본 컨텍스트로 전제하고 응답합니다. 사용자가 특정 모듈/컴포넌트/산출물을 지시하면 해당 섹션을 우선 참조합니다. 문서 원본이 필요한 경우 [8. 참고 자료 경로](#8-참고-자료-경로)에서 해당 파일을 열어 재확인합니다.

---

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **플랫폼명** | AI-VPP 통합 플랫폼 (한국형 VPP 실증) |
| **공동 추진** | 60Hertz × EWP(한국동서발전) |
| **과제명** | 적응형 AI 기반 최적 급전운영 기술개발 |
| **주관** | 한국에너지기술평가원 (에기평) 국책과제 |
| **현재 단계** | **3차년도 (v1.0, 2026.04 기준)** |
| **국제 협력** | 한국-독일 공동연구 (프라운호퍼 IEE) |
| **문서 버전 기준일** | 2026.04 |

### 1.1 컨소시엄 구성 (4개 기관)
- **60Hertz** — AI 제어 알고리즘 및 VPP 플랫폼 구현 (주관)
- **EWP(동서발전)** — E-Max 내부망 운영, 실증 자원 제공
- **GIST** — GNN 기반 AC-OPF 최적 급전 알고리즘
- **KIER** — 급전 최적화 알고리즘, P-HILS 사전 검증
- **프라운호퍼 IEE (독일)** — Smart-Dispatch 로직 자문, 실증 결과 교차 검증

### 1.2 핵심 목표 수치
- **실증 목표 용량**: 150MW (3차년도), 500MW (4차년도 목표)
- **제어 지시 주기**: 1분 단위 실시간 급전 제어
- **임밸런스 오차율 목표**: 5% 미만
- **VPP 통합 제어 정확도 목표**: 75% 이상
- **현재 확보 자원**: 전남 태양광 9개소 총 11.4MW (준중앙급전)

### 1.3 핵심 도킹 전략 ⚠️ (프로젝트 성공의 핵심)
외부망 보안 한계를 극복하기 위해 **60Hz AI 제어 알고리즘 전체를 EWP VPP 내부망(신재생 업무망)에 Docker 컨테이너로 직접 탑재**.
- 60Hz → 알고리즘 소유권 확보
- EWP → 데이터 주권 확보

---

## 2. 시스템 아키텍처 (6-Layer)

```
[외부 시스템]                [60Hz AI-VPP 플랫폼]              [EWP E-Max 시스템]
─────────────────            ────────────────────             ────────────────────
KPX 전력거래소     ─TLS/MQTT→ L6 시장 연동 레이어   ↔ DMZ(HAProxy) ↔ 신재생 업무망
기상청/기상 API    ─REST───→  L5 AI 최적화 엔진            │         VPP 서버 #1/#2/#3
GIST/KIER 알고리즘 ─Docker→   L4 제어 관제 레이어            │         (Rocky Linux 9)
프라운호퍼 IEE     ─자문───→  L3 데이터 파이프라인           │         E-Max 핵심 서비스
                              L2 API 서버                   │         (EMQX 4.2, iDERMS-API,
                              L1 운영 대시보드                         Biding-Controller)
                                                                       ↓
                                                           현장 자원 (RTU + Modbus + P-LTE)
```

### 2.1 60Hz AI-VPP 플랫폼 레이어 상세

| Layer | 이름 | 책임 | 기술 스택 |
|-------|------|------|----------|
| **L6** | 시장 연동 (Market Interface) | KPX 급전지시 수신, 배분 계획 수립, 하루 전 입찰(1일 2회), 준중앙급전 이행 | KPX REST, MQTT, 입찰관리 |
| **L5** | AI 최적화 엔진 (Dispatch Optimization) | GIST GNN-OPF + KIER 급전 알고리즘 호출, 1분 단위 자원별 Setpoint 산출 | Python Docker, REST API |
| **L4** | 제어 관제 (Control & Dispatch) | Setpoint → E-Max 제어명령 변환, Fail-safe, Closed-loop 검증, Ramp-rate 보정 | Node.js, EMQX MQTT |
| **L3** | 데이터 파이프라인 | RTU 실시간 발전량 수집(1분), 시계열 정규화, 이상 감지, KPI 집계 | MongoDB, EMQX, Modbus |
| **L2** | API 서버 (Backend) | VPP 운영 REST API, 대시보드 API, Docker 오케스트레이션, JWT 인증 | Node.js, Java/Spring, Docker |
| **L1** | 운영 대시보드 (Frontend) | 실시간 VPP 제어 현황 시각화, KPI 모니터링, 자원별 출력 맵 | React, Nginx, WebSocket |

### 2.2 EWP E-Max 시스템 구성 (도킹 대상)
- **신재생 업무망 (내부)**: VPP 서버 #1(메인) / #2(DB) / #3(예측배치) — Rocky Linux 9, Docker 29.0
- **E-Max 핵심 서비스**: EMQX 4.2 (MQTT 브로커), iDERMS-API (Node.js), Biding-Controller, iderms-mqtt-collector
- **DMZ 서버**: HAProxy, Nginx, KPX TLS 게이트웨이 (Ubuntu 24)
- **현장 자원**: 전남 태양광 9개소 11.4MW, iDERMS-RTU 설치, Modbus TCP + P-LTE, 출력 Curtailment 가능

---

## 3. 핵심 컴포넌트 8종

| # | 컴포넌트 | 주요 책임 | 스택 |
|---|---------|----------|------|
| 01 | **급전 제어 엔진** | KPX 급전지시 파싱, AI Setpoint 호출(1분), 자원별 출력 명령, Fail-safe ±15% 차단, 피드백 검증 | Node.js, EMQX MQTT, Docker |
| 02 | **AI 최적화 서비스** | GIST GNN-OPF + KIER 알고리즘 호스팅, 자원별 최적 Setpoint 벡터 산출, AC-OPF 외부용역 연동(8~9월) | Python 3.11, Docker, REST |
| 03 | **발전량 예측 서비스** | 기상청·GFS 수집·처리, 자원별 익일 시간대 예측, KPX 입찰용 1일 2회 제출, 예측 오차 모니터링 | Python, Docker, Batch |
| 04 | **데이터 수집·파이프라인** | RTU→EMQX→MongoDB 실시간, 1분 주기 인버터 발전량, KPX 계량값 1시간, 이상값 처리 | EMQX, MongoDB, Node.js |
| 05 | **KPX 시장 연동 모듈** | e-Power Market API(TLS), 중개거래 입찰 자동 제출, 급전지시 채널, SMP·낙찰량 수집, 준중앙급전 이행 | TLS/MQTT, HAProxy, Node.js |
| 06 | **실증 KPI 측정 엔진** | Precision Score, 임밸런스 오차, 응답 지연, 제어 오차율, 에기평 공인 데이터 추출 | Python, MongoDB, MySQL |
| 07 | **운영 대시보드** | 실시간 VPP 시각화, 자원 지도, KPI 게이지, 알림 센터, 실증 리포트 자동 생성 | React, WebSocket, Nginx |
| 08 | **보안·망 연계 레이어** | 신재생 업무망 ↔ 60Hz 도킹 보안, KISA 시큐어코딩, KPX TLS 상호인증, Docker 격리, DMZ 정책 | TLS 1.3, HAProxy, DMZ |

---

## 4. 데이터 흐름

### 4.1 실시간 제어 루프 (1분 주기)
```
① RTU 발전량 수집    → 현장 인버터 → Modbus TCP → P-LTE → EMQX
② 데이터 저장         → EMQX → mqtt-collector → MongoDB(시계열)
③ AI 최적화 ★        → 60Hz AI 엔진(Docker 내부망) → GNN-OPF 호출 → Setpoint 산출
④ Fail-safe 검사 ★   → 임계값 검증 → ±15% 초과 시 자동 차단
⑤ 제어 명령 전송     → MongoDB Write → EMQX MQTT → RTU 1분 폴링 → 인버터 제어
⑥ 피드백 수집        → 실제 출력 확인 → KPI 측정 → 오차율 계산 → 알림
```

### 4.2 KPX 급전지시 수신 흐름
1. KPX → DMZ 서버(HAProxy) — MQTT over TLS, Port 31883/38883
2. DMZ → VPP 메인 서버 (망연계 통과, 신재생 업무망 진입)
3. VPP 서버 → MongoDB 저장 (급전지시 Document + 타임스탬프)
4. EMQX → 급전지시 Topic 발행 (RTU 1분 폴링으로 수신)
5. 60Hz AI 엔진 → 배분 최적화 (총 급전지시량 → 자원별 Setpoint 분해)

### 4.3 예측 입찰 제출 흐름 (1일 2회)
1. 기상 데이터 수집 (기상청 단기예보 + 인코어드 API + GFS)
2. AI 발전량 예측 배치 실행 (Python Docker, 자원별 익일 24시간)
3. 집합자원 예측값 집계 (MongoDB 저장, 입찰 포맷 변환)
4. KPX 중개거래 API 제출 (DMZ HAProxy 경유, TLS, Port 443)
5. 입찰 결과 수신·저장 (낙찰량/SMP 15분 주기)

### 4.4 DB 설계

**MongoDB (시계열)**
| 컬렉션 | 필드 |
|--------|------|
| `generation_realtime` | plant_id, timestamp, power_kw, inverter_status |
| `dispatch_commands` | cmd_id, plant_id, setpoint_kw, issued_at, ack_at, status |
| `kpx_dispatch_instructions` | instruction_id, target_mw, period, received_at |
| `generation_forecast` | plant_id, forecast_dt, predicted_kw, weather_snapshot |
| `kpi_snapshots` | period, precision_score, imbalance_rate, delay_score |

**MySQL (마스터)**
| 테이블 | 필드 |
|--------|------|
| `plants` (발전소 기준정보) | plant_id, name, region, capacity_kw, rtm_type, control_enabled |
| `vpp_resources` (집합자원) | vpp_id, kpx_vpp_id, total_capacity, participation_type |
| `bidding_settings` (입찰설정) | vpp_id, strategy, safety_margin, auto_bid_enabled |
| `failsafe_rules` (안전장치) | rule_id, plant_id, max_ramp_kw, threshold_pct, action |
| `settlement_records` (정산) | month, vpp_id, predicted_mwh, actual_mwh, settlement_krw |

---

## 5. 3차년도 개발 마일스톤

| Phase | 기간 | 주요 작업 |
|-------|------|----------|
| **Phase 1 — 사전 연동 준비** | 4월~5월 | E-Max API 규격 교환, 150MW 실증 자원 리스트 확정, 방화벽 협의, AI-OPF 외부용역 킥오프, 플랫폼 아키텍처 확정, DB 스키마·Docker 설계 완료 |
| **Phase 2 — 내부 개발 & 샌드박스** | 6월~7월 | 60Hz 플랫폼 코어 개발, KIER/GIST 알고리즘 Docker 통합, E-Max Testbed 연동 테스트, Dummy 제어 테스트, Fail-safe 검증, KIER P-HILS 사전 검증 |
| **Phase 3 — 시스템 도킹 & 커미셔닝** | 8월 | 운영서버 배포·도킹, 자원별 통신 정합성, 수집 주기 검증, E-Max↔60Hz E2E 테스트, KPI 시스템 검증 (P-HILS 결과 따라 1~2주 버퍼) |
| **Phase 4 — 실증 운영 & 보고** | 9월~11월 | 150MW 실증 운영, 시나리오별 급전지시, 5대 KPI 수집·분석, 프라운호퍼 교차 검증, 공인시험성적서 발급, 에기평 연차보고서 제출(11월) |

> **병행 Track — AI-OPF 외부용역**: 4월 초 발주·킥오프 → 8~9월 1차 API 연동 → 10월 모의계통 검증 완료. 메인 실증에 병목되지 않도록 별도 관리.

---

## 6. 실증 성공 기준 — 5대 KPI

| # | 지표 | 목표 | 정의 |
|---|------|------|------|
| 1 | **VPP 통합 정확도** (Precision Score) | **≥ 75%** | KPX 목표 제어 궤적 대비 실제 출력의 15분 평균 정확도 |
| 2 | **임밸런스 오차율** | **< 5%** | 하루 전 입찰 예측량 대비 실시간 실제 발전량 차이. 페널티 회피 핵심 |
| 3 | **응답 지연 시간** | **≤ 5분** | 기상 이변 발생 후 백업 자원 투입까지. Time Delay Score ≥ 0.75 |
| 4 | **제어 응동 속도** | **1분 응동** | 급전지시 수신 후 RTU 제어 시작까지. 물리적 제어 시작 기준 |
| 5 | **최종 제어 오차율** | **≤ 5%** | RTU 통신 단절 돌발 상황에서도 15분 후 총 감축량 달성도 |

### 6.1 주요 산출 수식
```
[KPI 1] VPP 통합 정확도
Precision_Score = 1 - (1/n) * Σ |Xi - Yi| / Xi
  Xi : KPX 목표 제어 지시량 (매 분)
  Yi : VPP 실제 출력량 (매 분)
  n  : 평가 시간 (15분)
  목표 : ≥ 0.75

[KPI 2] 임밸런스 오차율
Imbalance_Rate = |Σ(Forecast_MWh - Actual_MWh)| / Σ Forecast_MWh
  목표 : < 0.05 (5% 미만)
```

---

## 7. 보안 아키텍처 및 리스크

### 7.1 3-Zone 보안 구조

| Zone | 영역 | 구성 요소 | 비고 |
|------|------|----------|------|
| **A** | 인터넷망 (외부) | KPX e-Power Market(TLS 1.3), 기상 API(HTTPS), Naver SMS/메일, Nginx+TLS | 완비 |
| **B** | DMZ (망연계) | HAProxy 역프록시, KPX MQTT 브로커, 60Hz Docker 접근 정책, 방화벽 | 방화벽 정책 진행 중 ⚠️ |
| **C** | 신재생 업무망 (내부) | 60Hz Docker 컨테이너(신규), 내부 EMQX, MongoDB ReplicaSet, AI 알고리즘 격리 | 설계/구성 필요 ⚠️ |

> **도킹 보안 전략**: 60Hz 플랫폼은 신재생 업무망 내 격리된 Docker 네트워크에서만 동작. **외부 데이터 반출 금지**, 제어 명령은 E-Max EMQX를 통해서만 전달. **KISA 시큐어코딩 개발가이드 필수 준수**.

### 7.2 리스크 레지스터 (주요 항목)

| 등급 | 구분 | 리스크 | 대응 | 담당 |
|------|------|--------|------|------|
| 🔴 HIGH | 기술 | E-Max 내부망 Docker 접근 보안 협의 지연 | Phase 1 최우선, 4월 내 방화벽 개방 정책 확정 | 60Hz × EWP IT |
| 🔴 HIGH | 자원 | 150MW 실증 자원 확정 지연 (현재 11.4MW) | 준중앙 외 자원 포함 협의, 5월 자원 리스트 Fix, 4차년도 500MW 연계 | EWP 자원팀 |
| 🔴 HIGH | 기술 | KIER P-HILS 사전 검증 지연 → 8월 도킹 영향 | 7월 결과 따라 시나리오 유연 조정, 1~2주 버퍼 | KIER × 60Hz |
| 🟠 MID | 통신 | Closed-loop 피드백 로직 미구축 | Phase 1 E-Max 담당자 확인, 필요시 60Hz 자체 확인 로직 추가 | 60Hz Dev |
| 🟠 MID | 알고리즘 | GIST/KIER Docker 통합 인터페이스 미확정 | 5월까지 API 스펙 문서화, 공동 워킹그룹 운영 | 60Hz × GIST × KIER |
| 🟠 MID | 제도 | 준중앙급전제도 도입으로 시나리오 재설계 | 준중앙 자원 배분 로직 별도 구현, KPX 지시→내부 최적 배분 | 60Hz × KPX |
| 🟢 LOW | 성능 | 600MW 확장 시 On-Premise 서버 한계 | 4차년도 500MW 서버 증설 계획, 수평 확장 설계 | EWP × 60Hz |
| 🟢 LOW | CI/CD | E-Max CI/CD 미구축 → 배포 중단 리스크 | Blue/Green 수동 배포부터, 장기 파이프라인 로드맵 | EWP × 60Hz |

---

## 8. 참고 자료 경로

> Claude가 세부 원문 확인이 필요할 때 참조할 파일 경로입니다.

### 8.1 핵심 설계 문서
- **[종합 설계서 HTML]** [VPP구축방향.html](C:\60hz\02.VPP(관련문서)\00.[VPP]구축방향\VPP구축방향.html) — 본 md의 원본, 전체 플랫폼 설계서
- **[구축 방향성 다이어그램]** [VPP구축방향성.png](C:\60hz\02.VPP(관련문서)\00.[VPP]구축방향\VPP구축방향성.png)
- **[핵심 기능 다이어그램]** [VPP핵심기능.png](C:\60hz\02.VPP(관련문서)\00.[VPP]구축방향\VPP핵심기능.png)
- **[역할 분담 다이어그램]** [역할분담.png](C:\60hz\02.VPP(관련문서)\00.[VPP]구축방향\역할분담.png)

### 8.2 VPP 관련자료
- **[iDERMS 사용자 메뉴얼]** [4-5-1__iDERMS_사용자 메뉴얼 manual.pdf](C:\60hz\02.VPP(관련문서)\01.[VPP]관련자료\iDERMS\iDERMS\4-5-1__iDERMS_사용자%20메뉴얼%20manual.pdf)
- **[아이덤스 API 명세 (KOMIPO)]** [아이덤스 API (for KOMIPO).pdf](C:\60hz\02.VPP(관련문서)\01.[VPP]관련자료\iDERMS\iDERMS\아이덤스%20API%20(for%20KOMIPO).pdf)
- **[분산에너지 활성화 특별법]** [C:\60hz\02.VPP(관련문서)\01.[VPP]관련자료\분산에너지\](C:\60hz\02.VPP(관련문서)\01.[VPP]관련자료\분산에너지\)
- **[제주 시범사업 4종 자료]** [C:\60hz\02.VPP(관련문서)\01.[VPP]관련자료\입찰정산\제주시범사업자료\](C:\60hz\02.VPP(관련문서)\01.[VPP]관련자료\입찰정산\제주시범사업자료\) (개요, Q&A, 입찰교육, 정산교육)
- **[중부발전 VPP UI/사용자매뉴얼]** [C:\60hz\02.VPP(관련문서)\01.[VPP]관련자료\제주시범사업자료\중부발전(사용자메뉴얼)\](C:\60hz\02.VPP(관련문서)\01.[VPP]관련자료\제주시범사업자료\중부발전(사용자메뉴얼)\) (UI 설계서, 사용자매뉴얼)
- **[EWP 통합발전소 시스템 구성안]** [EWP VPP 통합 발전소 시스템 구성안.pptx](C:\60hz\02.VPP(관련문서)\01.[VPP]관련자료\중부발전(사용자메뉴얼)\통합발전소%20시스템구성안\EWP%20VPP%20통합%20발전소%20시스템%20구성안.pptx)

### 8.3 운영 규칙
- **[전력시장운영규칙 전문 260318]** [[붙임2] 전력시장운영규칙전문(260318)_PDF.pdf](C:\60hz\02.VPP(관련문서)\02.[VPP]운영규칙\[붙임2]%20전력시장운영규칙전문(260318)_PDF.pdf) — KPX 규칙 원문

### 8.4 스터디 자료
- **[60Hz 솔루션 현황 요약]** [현황파악.txt](C:\60hz\02.VPP(관련문서)\03.[VPP]스터디\현황파악.txt) — Energy Scrum, 햇빛바람지도, EMS, Energy Forecasting, DR
- **[스터디 이미지]** [C:\60hz\02.VPP(관련문서)\03.[VPP]스터디\](C:\60hz\02.VPP(관련문서)\03.[VPP]스터디\)

### 8.5 킥오프 & 워크숍
- **[26.04.15 AI VPP Kickoff Meeting]** [26.04.15 AI VPP Project Kick off Meeting_vf.pptx](C:\60hz\02.VPP(관련문서)\04.[VPP]킥오프(워크숍)\26.04.15%20AI%20VPP%20Project%20Kick%20off%20Meeting_vf.pptx)
- **[26.04.13 60Hertz × EWP 워크숍]** [26.04.13 60Hertz and EWP 워크숍(수정본).pptx](C:\60hz\02.VPP(관련문서)\04.[VPP]킥오프(워크숍)\26.04.13%2060Hertz%20and%20EWP%20워크숍(수정본).pptx)
- **[26.04.08 내부 워크숍]** [26.04.08 내부워크샵.pdf](C:\60hz\02.VPP(관련문서)\04.[VPP]킥오프(워크숍)\26.04.08%20내부워크샵.pdf)
- **[26.03.26 KPX 발주 사전회의]** [26.03.26 KPX 발주 사전 회의.pptx](C:\60hz\02.VPP(관련문서)\04.[VPP]킥오프(워크숍)\26.03.26%20KPX%20발주%20사전%20회의.pptx)
- **[26.03.26 동서발전 E-Max 워크샵]** [26.03.26 동서발전 E-max 워크샵을 위한 마일스톤 및 안건 제안 (time table edtion).pptx](C:\60hz\02.VPP(관련문서)\04.[VPP]킥오프(워크숍)\26.03.26%20동서발전%20E-max%20워크샵을%20위한%20마일스톤%20및%20안건%20제안%20(time%20table%20edtion).pptx)
- **[26.03.26 프라운호퍼 3차년도 과제 회의 준비]** [AI-VPP 프라운호퍼 3차년도 과제 회의 준비.pptx](C:\60hz\02.VPP(관련문서)\04.[VPP]킥오프(워크숍)\AI-VPP%20프라운호퍼%203차년도%20과제%20준비.pptx)
- **[EWP 통합발전소 플랫폼 구축 추진(안) Rev1]** [EWP 통합 발전소 플랫폼 구축 추진(안)_Rev1.hwp](C:\60hz\02.VPP(관련문서)\04.[VPP]킥오프(워크숍)\EWP%20통합%20발전소%20플랫폼%20구축%20추진(안)_Rev1.hwp)
- **[VPP 설명자료 배포용]** [VPP설명자료_배포용_20260403.xlsx](C:\60hz\02.VPP(관련문서)\04.[VPP]킥오프(워크숍)\VPP설명자료_배포용_20260403.xlsx)
- **[26 춘계 KSES 초록]** [26 춘계 KSES 초록_ver.0_조현석.pdf](C:\60hz\02.VPP(관련문서)\04.[VPP]킥오프(워크숍)\26%20춘계%20KSES%20초록_ver.0_조현석.pdf)
- **[60Hz 에너지스크럼 솔루션 소개 2401]** [식스티헤르츠_에너지스크럼_솔루션 소개_2401.pdf](C:\60hz\02.VPP(관련문서)\04.[VPP]킥오프(워크숍)\식스티헤르츠_에너지스크럼_솔루션%20소개_2401.pdf)

### 8.6 관련 슬래시 명령
- `/vpp-dashboard` — AI-VPP 2.0 대시보드(index.html) 수정 규칙

---

## 9. 60Hz 기존 솔루션 (계승 대상)

| 솔루션 | 설명 | AI-VPP 연계 |
|--------|------|------------|
| **Energy Scrum** | 다양한 소규모 에너지 자원을 하나의 발전소처럼 통합·제어, 전력 수급 조정 | AI-VPP의 기본 집합자원 운용 엔진 |
| **햇빛바람지도** | 국내 유일 재생에너지 발전량 예측 공개 서비스. AI 기반 태양광·풍력 미래 발전량 예측 | 발전량 예측 서비스(MODULE 03) 기반 |
| **EMS** | 분산자원 모니터링·운영, 실시간 발전 정보, 이상 진단, 출력 제어, SDR 패키지 | L3 데이터 파이프라인 기반 |
| **Energy Forecasting** | AI 전력기상 수요 예측. 실시간 위성 영상·기상 융합, 초단기 발전량 예측, GIS 일사량, Ramp Rate 감지 | L5 AI 최적화 엔진에 통합 |
| **Demand Response** | 대규모 전기차 수요자원화 기술·서비스 생태계, 안정적 전력 공급과 DR 관리 | 향후 4차년도 확장 시 고려 |

---

## 10. 작업 지침 (Claude에게)

이 명령이 활성화된 상태에서 사용자가 VPP 관련 작업을 요청하면:

1. **맥락 유지**: 위 모든 내용을 프로젝트 기본 전제로 수용. 동일 내용 재확인 불필요.
2. **용어 표준**: KPX·E-Max·iDERMS·EMQX·준중앙급전·Setpoint·Fail-safe 등 용어는 위 정의 그대로 사용.
3. **모듈 번호 참조**: 기능 언급 시 **[MODULE 01~08]** 번호와 레이어 **[L1~L6]** 표기를 활용.
4. **문서 산출물 요청 시**: 사용자가 요구사항정의서/기능정의서/정책서/IA 작성을 요청하면, `/requirements`, `/features`, `/policy`, `/ia` 템플릿 구조를 따르되 본 VPP 프로젝트 컨텍스트를 반영해 작성.
5. **원문 확인이 필요하면**: [8. 참고 자료 경로](#8-참고-자료-경로)에서 해당 파일을 열어 재검증. 특히 [VPP구축방향.html](C:\60hz\02.VPP(관련문서)\00.[VPP]구축방향\VPP구축방향.html)이 본 md의 원본이므로 상세값·수치 확인 시 우선 참조.
6. **불명확한 내용**: 본 문서에 없는 내용은 추측하지 말고 사용자에게 확인 요청. 특히 **자원 리스트, 방화벽 정책, API 스펙**은 Phase 1 협의 진행 중이므로 임의 가정 금지.
7. **대시보드(index.html) 수정 작업**: `/vpp-dashboard` 규칙을 함께 적용.

---

**문서 버전**: v1.0 (2026-04-24 작성)
**다음 업데이트 트리거**: Phase 1 완료(5월 말), 자원 리스트 Fix(5월), P-HILS 검증 결과(7월), 에기평 연차보고서(11월)
