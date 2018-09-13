# API 명세서

# Stamps

## 스탬프 조회

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
    "data": {
        "status": "guest/로그인 한 사람 이름",
        "place": [
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
              	"중간 생략..."  
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
}
```
#### INTERNAL SERVER ERROR

```json
{
    "message": "Internel Server Error",
    "data": null
}
```
------

