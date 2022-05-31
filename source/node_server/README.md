
**서버 환경 구현**

**Node.js API서버 구현 및  Android 통신**

API 서버로 AWS\_EC2 Ubuntu 환경에서 Non-blocking I/O와 단일 스레드 이벤트 루프를 통한 높은 처리 성능을 가지고 있는 node.js javascript 런타임 프로그램을 사용하였다. Node.js 서버 구축을 위한 웹 프레임 워크인 express 모듈을 사용 하여 효율적인 서버 구현이 가능하게 하였다. GET방식의 통신은 url에 데이터 소스가 유출되기 때문에 POST method 를 사용하였다. Android Application에서 접속하는 서버의 주소는 예측 불가한 서버 IP의 변경에 대비하기 위해 서버 DNS 주소로 접근하는 방식을 채택하였다. Express 모듈은 Android Application과 HTTP 통신만 가능할 뿐 요청받은 데이터를 서버에 업로드 할 수 없다. 이에 Android Application에서 전달받은 multipart/form-data를 다루는 node.js의 미들웨어인 multer 모듈을 사용 하였다. 전달받은 주행 데이터와 주행 영상을 분류한 뒤 Stroage 모듈을 사용해 각 파일별로 추출하는 과정을 거친다.
