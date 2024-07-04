# Consert Reservation API

## 요구사항
- 아래 5가지 API 를 구현합니다.
    - 유저 토큰 발급 API
    - 예약 가능 날짜 / 좌석 API
    - 좌석 예약 요청 API
    - 잔액 충전 / 조회 API
    - 결제 API
- 각 기능 및 제약사항에 대해 단위 테스트를 반드시 하나 이상 작성하도록 합니다.
- 다수의 인스턴스로 어플리케이션이 동작하더라도 기능에 문제가 없도록 작성하도록 합니다.
- 동시성 이슈를 고려하여 구현합니다.
- 대기열 개념을 고려해 구현합니다.

## Sequence Diagram

### 유저 토큰 발급 API

```mermaid
sequenceDiagram
  Actor U as User
  participant T as TokenService
  participant W as WaitingService
  U->>T: 토큰 발급 요청
  T->>+W: 현재 대기열 조회
  W-->>-T: 현재 대기열 정보 반환
  T->>T: 유저 정보로 토큰 생성
```

### 예약 가능 날짜 / 좌석 API

```mermaid
sequenceDiagram
  Actor U as User
  participant C as ConsertService
  participant S as SeatService
  U->>+C: 예약 가능 날짜 조회 요청
  C-->>-U: 예약 가능 날짜 반환
  U->>+C: 선택한 날짜에 예약 가능한 좌석 조회 요청
  C->>+S: 예약 가능 좌석 조회
  S-->>-C: 예약 가능 좌석 반환
  C-->>-U: 예약 가능 좌석 반환
```

### 잔액 충전 / 조회 API

```mermaid
sequenceDiagram
  Actor U as User
  participant S as AmountService
  U->>+S: 잔액 조회
  S-->>-U: 잔액 반환
  U->>+S: 잔액 충전 요청
  S-->>-U: 충전 결과 반환
```

### 좌석 예약 요청 API

```mermaid
sequenceDiagram
  Actor U as User
  participant S as SeatService
  participant R as ReservationService
  U->>S: 좌석 선택
  S->>+R: 해당 좌석 예약 정보 조회
  R-->>-S: 좌석 예약 정보 반환
  alt 예약 가능한 좌석
	  R->>R: 좌석 예약
	  R-->>S: 좌석 예약 완료
	else 이미 선택중인 좌석
	  S-->>U: 좌석 예약 실패
	end
```

### 결제 API

```mermaid
sequenceDiagram
  Actor U as User
  participant P as PaymentService
  participant S as SeatService
  participant A as AmoutService
  U->>+P: 결제 요청
  P->>+S: 좌석 예약 확인
  S-->>-P: 좌석 예약 정보 반환
  P->>+A: 유저 잔액 확인
  A-->>-P: 유저 잔액 정보 반환
  P->>P: 결제 정보 생성
  P-->>S: 좌석 예약 상태 해제
  P-->>A: 유저 잔액 차감
  P-->>-U: 결제 정보 반환
```

