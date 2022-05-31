**통신 환경 구현**

**Retrofit2 기술을 이용한 Android api 서버 통신(파일 전송)**

![](https://github.com/simjeongsoo/Team_Easy_dashcam/blob/00e2b34c3ba28ad3c5e12cb00a858229606b1ed0/images/Aspose.Words.5c7d2168-29a5-489c-a6c5-384ee98ca096.006.jpeg)

  - (그림) Android – Server 파일 전송

Android Application에서 백 앤드 서버와 HTTP 통신하기 위해서는 통신 라이브러리를 사용해야 한다. 자바를 활용한다면 별도의 라이브러리를 활용할 필요 없이 Java.net에 내장되어 있는 HttpURLConnection을 사용하면 되지만 연결, 캐싱, 실패한 요청을 재시도, Threading, 응답 분석, 오류 처리 등 고려해야 할 것 들이 많기 때문에 효율적인 유지/보수를 위해 HttpClient 라이브러리를 사용하였다. 여러 라이브러리들이 존재하지만 성능면에서 우수한 Retrofit 라이브러리를 채택하였다. 이는 Rest 기반의 웹서비스를 통해 JSON 구조의 데이터를 쉽게 가져오고 업로드할 수 있다. Android Application을 네트워크에 연결하기 위해 인터페이스를 이용하여 Service 객체를 획득 한 후 네트워킹이 필요할 때 Call 객체를 획득하여 이용한다.본 논문에서는 binary file(video) 전송을 위해 body에 part 형식으로 데이터를 담고, HTTP method로는 Multipart 어노테이션을 사용해 서버 측으로 전송하였다. JSON 데이터를 GsonConverter가 자동으로 VO 객체를 생성하기 위해서 Model 클래스를 정의하였다. 서버와 통신할 데이터 타입에 맞는 컨버터를 GsonConverterFactory로 지정하였기 때문에 JSON 데이터를 Gson 라이브러리로 파싱하고 그 데이터를 Model에 자동으로 담아준다. 직접적인 네트워킹 시도를 위해 Call 객체의 함수를 호출하면서 Callback 클래스의 객체를 매개변수로 지정하면 네트워킹을 시도하고 서버에서 정상적으로 결과를 받았을 때와 서버 연동에 실패했을 때 동작할 함수를 지정할 수 있다.


**Retrofit2 기술을 이용한 Android api 서버 통신 (파일 수신)**

파일 전송 기술과 마찬가지로 retrofit2 라이브러리를 사용한다. 파일 전송부와 기술적으로 다른 부분은 인터페이스 구현 시 Multipart 어노테이션이 아닌 Streaming 어노테이션을 사용한다는 것이다. 파일 다운로드를 위해 GET 어노테이션 상단에 Streaming 어노테이션 주석을 사용한다. 그렇지 않으면 Retrofit이 전체 파일을 메모리로 이동한다. Streaming 어노테이션 을 사용하면 현재 메모리를 소모하지 않고 바이트에 액세스할 수 있다. Streaming 어노테이션 을 사용할 때 다운로드한 데이터를 쓰는 코드를 별도의 스레드에 추가해야 한다. enqueue 메소드를 사용하여 요청을 시작할 수 있다. 그 안에 AsyncTask를 만들거나 Rxjava를 사용해야 한다. 본 논문에서는 AsyncTask를 사용하였다.

