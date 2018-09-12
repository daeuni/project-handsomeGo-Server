# API 명세서

# Stamp

## 회원 조회

| 메소드 | 경로    | 짧은 설명               |
| ------ | ------- | ----------------------- |
| GET    | /stamps | 모든 장소의 스탬프 조회 |

### 효청 헤더

```
Content-Type: application/json
Authorization: token값(존재하지 않으면 게스트 로그인으로 간주)
```

### 응답 바디

#### 회원 조회 성공

```json
{
    "message": "Successful Get Stamp Status Data",
    "data": [
        {
            "place_id": 1,
            "place_name": "덕수궁돌담길",
            "place_address": "",
            "place_star": 1,
            "place_pic": "",
            "stamp_status": 0
        },
        {
            "place_id": 2,
            "place_name": "문화비축기지",
            "place_address": "",
            "place_star": 1,
            "place_pic": "",
            "stamp_status": 0
        },
        {
            "place_id": 20,
            "place_name": "다시 세운",
            "place_address": "",
            "place_star": 5,
            "place_pic": "",
            "stamp_status": 0
        }
    ]
}
```
#### 회원 조회 실패

```json
{
    "statusCode": 404,
    "responseMessage": "Not Find User",
    "responseData": null
}
```
#### INTERNAL SERVER ERROR

```json
{
    "statusCode": 500,
    "responseMessage": "Fail",
    "responseData": null
}
```
------
## 회원 가입

| 메소드 | 경로       | 짧은 설명 |
| ------ | ---------- | --------- |
| POST   | /api/users | 회원 가입 |

### 요청 헤더

```
Content-Type: application/json
```

### 요청 바디

```json
{
    "email": "bghgu@naver.com",
    "password": "1234",
    "name" : "배다슬"
}
```

### 응답 바디

#### 회원 등록 성공

```json
{
    "statusCode": 201,
    "responseMessage": "Success Save User",
    "responseData": null
}
```
#### 중복된 이메일

```json
{
    "statusCode": 204,
    "responseMessage": "Already User",
    "responseData": null
}
```
#### INTERNAL SERVER ERROR

```json
{
    "statusCode": 500,
    "responseMessage": "Fail",
    "responseData": null
}
```
------