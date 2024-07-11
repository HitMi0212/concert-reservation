# Concert Reservation API

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

<details>
<summary>Sequence Diagram</summary>

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
  participant C as ConcertService
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

</details>

## ERD
```mermaid
erDiagram
  USER {
    UUID id PK
    CHAR name
    DECIMAL balance "default: 0"
  }

  QUEUE {
    INT id PK "AutoIncrement"
    UUID user_id FK
    INT concert_id FK
    INT position
    DATETIME created_at "default: CURRENT_TIMESTAMP"
  }

	CONCERT {
		INT id PK "AutoIncrement"
		CHAR name
	}

	CONCERT_DETAIL {
		INT id PK "AutoIncrement"
		INT concert_id FK
    INT seats
    DATETIME concert_date
    DATETIME reservation_date
	}

  SEAT {
    INT id PK "AutoIncrement"
    INT concert_id FK
    INT seat_number
    DECIMAL price
    ENUM status "AVAILABLE, RESERVED, COMPLETED"
  }

	SEAT_RESERVATION {
    INT id PK "AutoIncrement"
    INT concert_id FK
    INT seat_id FK
    UUID user_id FK
    DATETIME created_at "default: CURRENT_TIMESTAMP"
    DATETIME deleted_at "NULLABLE"
  }

  PAYMENT {
    INT id PK "AutoIncrement"
    UUID user_id FK
    INT reservation_id FK
    DATETIME created_at "default: CURRENT_TIMESTAMP"
    DATETIME deleted_at "NULLABLE"
  }

  PAYMENT_DETAIL {
    INT payment_id PK
    UUID user_id
    INT concert_id
    INT seat_id
    CHAR concert_name
    DATETIME concert_date
    INT seat_number
    INT price
  }

  USER ||--o{ QUEUE: has
  USER ||--o{ SEAT_RESERVATION: makes
  USER ||--o{ PAYMENT: performs
  PAYMENT |o--|| SEAT_RESERVATION: includes
  PAYMENT ||--|| PAYMENT_DETAIL: meta
  CONCERT ||--|{ CONCERT_DETAIL: meta
  CONCERT ||--o{ SEAT: has
  CONCERT ||--o{ QUEUE: make
  SEAT_RESERVATION }o--|| SEAT: has
```

## API DOCS
🏋️‍♀️[POSTMAN API DOCS](https://documenter.getpostman.com/view/36695726/2sA3dxCrRx)

<details>
<summary>API DOCS</summary>

### 콘서트 목록 조회
`GET /concerts`
- 콘서트 목록을 조회

**Example Request**
```
GET /concerts HTTP/1.1
Host: {{url}}
```

**Example Response**
```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "statusCode": 200,
  "message" : "success",
  "data": [
    {
        concert
      Id: 1,
        concert
      Name: "에스파 콘서트",
        seats: 50,
        concert
      Date: "2024-07-08 18:00:00"
    },
    {
        concert
      Id: 2,
        concert
      Name: "뉴진스 콘서트",
        seats: 50,
        concert
      Date: "2024-07-09 15:00:00"
    }
  ]
}
```
```
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "statusCode": 404,
  "message" : "Not Found"
}
```

### 입력한 날짜의 콘서트 목록 조회
`GET /concerts/:date`
- 입력한 날짜에 진행하는 콘서트 목록을 조회

**Parameter**
| 키 | 타입 | 설명 |
| --- | --- | --- |
| date | string | 콘서트 날짜 |

**Example Request**
```
GET /concerts/2024-07-08 18:00:00 HTTP/1.1
Host: {{url}}
```

**Example Response**
```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "statusCode": 200,
  "message" : "success",
  "data": [
    {
        concert
      Id: 1,
        concert
      Name: "에스파 콘서트",
        seats: 50,
        concert
      Date: "2024-07-08 18:00:00"
    }
  ]
}
```
```
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "statusCode": 404,
  "message" : "Not Found"
  "error" : "해당 날짜에 예약 가능한 콘서트가 없습니다."
}
```

### 예약 가능 좌석 조회
`GET /concerts/seats/:id`
- 입력한 날짜에 진행하는 콘서트 목록을 조회

**Parameter**
| 키 | 타입 | 설명 |
| --- | --- | --- |
| id | number | 콘서트ID |

**Example Request**
```
GET /concerts/seats/:id HTTP/1.1
Host: {{url}}
```

**Example Response**
```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "statusCode": 200,
  "message" : "success",
  "data": [
    {
        seatId: 1,
        concert
      Id: 1,
        price: 50000,
        payment: "N"
    }
  ]
}
```
```
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "statusCode": 404,
  "message" : "Not Found"
  "error" : "예약 가능한 좌석이 없습니다."
}
```

### 사용자 잔액 조회
`GET /payment/balance/:id`
- 사용자 잔액 조회

**Parameter**
| 키 | 타입 | 설명 |
| --- | --- | --- |
| id | number | 사용자ID |

**Example Request**
```
GET /payment/balance/12 HTTP/1.1
Host: {{url}}
```

**Example Response**
```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "statusCode": 200,
  "message" : "success",
  "data": {
    userId: 12,
    userName: "최승준",
    amount: 15000
   }
}
```
```
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "statusCode": 404,
  "message" : "Not Found"
  "error" : "해당 사용자 정보가 없습니다."
}
```

### 사용자 잔액 충전
`PATCH /payment/charge`
- 사용자 잔액 조회

**Request Body**
| 키 | 타입 | 설명 |
| --- | --- | --- |
| id | number | 사용자ID |
| amount | number | 충전할 금액 |

**Example Request**
```
PATCH /payment/charge HTTP/1.1
Host: {{url}}
Content-Type: application/json
Content-Length: 36

{
    id: 12,
    amount: 40000
}
```

**Example Response**
```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "statusCode": 200,
  "message" : "success",
  "data": {
    userId: 12,
    userName: "최승준",
    amount: 15000
   }
}
```
```
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "statusCode": 404,
  "message" : "Not Found"
  "error" : "해당 사용자 정보가 없습니다."
}
```

### 사용자 토큰 발급
`POST /auth/token`
- 사용자 토큰 발급

**Request Body**
| 키 | 타입 | 설명 |
| --- | --- | --- |
| userId | number | 사용자ID |
| concertId | number | 사용자ID |

**Example Request**
```
POST /auth/token HTTP/1.1
Host: {{url}}
Content-Type: application/json
Content-Length: 39

{
    userId: 12,
    concert
  Id: 1
}
```

**Example Response**
```
HTTP/1.1 201 Created
Content-Type: application/json

{
  "statusCode": 201,
  "message" : "Created",
  "data": {
    userId: 12,
    userToken: "...",
    issueDate: 2024-07-04 21:00:23
   }
}
```
```
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "statusCode": 402,
  "message" : "Forbidden"
  "error" : "해당 사용자 정보가 없습니다."
}
```

### 좌석예약
`POST /concerts/seats/reservation`
- 좌석 임시 예약

**Authorization**  
`Bearer {userToken}`

**Request Body**
| 키 | 타입 | 설명 |
| --- | --- | --- |
| userId | number | 사용자ID |
| concertId | number | 콘서트ID |
| seatId | number | 좌석ID |

**Example Request**
```
POST /reservation/seat HTTP/1.1
Host: {{url}}
Content-Type: application/json
Content-Length: 56

{
    userId: 12,
    concertId: 1,
    seatId: 11
}
```

**Example Response**
```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "statusCode": 200,
  "message" : "success",
  "data": {
    userId: 12,
    concertId: 1,
    seatId: 11,
    reservationDate: "2024-07-03 11:46:23"
  }
}
```
```
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "statusCode": 404,
  "message" : "Not Found"
  "error" : "해당 좌석 정보가 없습니다."
}
```
```
HTTP/1.1 409 Conflict
Content-Type: application/json

{
  "statusCode": 409,
  "message" : "Conflict"
  "error" : "이미 선택중인 좌석입니다."
}
```

### 결제
`POST /payment`
- 콘서트 좌석 결제

**Authorization**  
`Bearer {userToken}`

**Request Body**
| 키 | 타입 | 설명 |
| --- | --- | --- |
| userId | number | 사용자ID |
| concertId | number | 콘서트ID |
| seatId | number | 좌석ID |

**Example Request**
```
POST /reservation/seat HTTP/1.1
Host: {{url}}
Content-Type: application/json
Content-Length: 56

{
    userId: 12,
    concertId: 1,
    seatId: 11
}
```

**Example Response**
```
HTTP/1.1 201 Created
Content-Type: application/json

{
  "statusCode": 201,
  "message" : "Created",
  "data": {
    paymentId; 1,
    userId: 12,
    concertId: 1,
    seatId: 11,
    concertName: "에스파 콘서트",
    concertDate: "2024-07-08",
    price: 50000,
    paymentDate: "2024-07-03"
  }
}
```
```
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "statusCode": 404,
  "message" : "Not Found"
  "error" : "해당 콘서트 좌석 정보가 없습니다."
}
```

</details>

## Swagger

![swagger_list](src/docs/image/swagger_list.png)

<details>
<summary>전체 캡쳐</summary>

![swagger_all](src/docs/image/swagger_all.png)

</details>
