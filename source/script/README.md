**추출 영상 관리**

![](https://github.com/simjeongsoo/Team_Easy_dashcam/blob/b52a939a9fe4f1a0c5bb1e946229da4762095899/images/Aspose.Words.5c7d2168-29a5-489c-a6c5-384ee98ca096.007.jpeg)

 - (그림) 배치 프로그램

추출된 하이라이트 영상은 client가 언제든 요청 할 수 있도록 전 과정을 스크립트 배치 프로그램을 이용하여 자동화 작업을 수행한다. 자동화 스크립트는 nohup 프로그램을 통해 데몬 형태로 실행되며 터미널이 끊기더라도 실행을 멈추지 않고 동작한다. Android Application 에서 전달받은 주행 데이터와 주행 영상을 기반으로 파일이 매치하는지 분석한 뒤 충돌, 끼어들기 등의 하이라이트를 추출하게 된다. 이렇게 추출된 영상들의 정보는 DB에 입력되며 모든 영상의 업로드 및 삭제는 DB를 통해 이루어지게 된다. 이렇게 추출된 하이라이트들은 client가 요청 시 언제든 파일 송신이 가능하다.

