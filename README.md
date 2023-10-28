# 서버 운영 모니터링 및 빅데이터 기반 이상탐지 시스템
해당 서비스는 서버의 다양한 매트릭 정보와 엑세스 로그 정보의 데이터를 시각화한 모니터링 시스템을 제공한다.
또한 ML을 통해 정보의 추세 분석 후, 정상 범주에서 벗어난 이상 상황을 탐지한 후 사용자에게 위험 알림 서비스를 제공한다. 
위와 같이 지속적인 실시간 모니터링과 이상 탐지 알림을 통해 사용자의 안전한 시스템 운영을 도와준다.

## 1.프로젝트 개발 환경
1. OS : Linux(ubuntu20.04), Window
2. 개발환경(IDE) : VS Code, InteliJ
3. 개발 도구 : ELK, SpringBoot, MySQL, React
4. 개발 언어 : JAVA, JSX

## 2. 프로젝트 구성도 
![image](https://github.com/HwangYooHyun1/2023_Hanium_prj/assets/96932207/7ac501d0-7107-4f39-bb6f-ee40e7522f05)

1. back-end 역할
    1) 데이터 수집: Beats 및 Logstash 사용 로그 및 리소스 데이터 수집
    2) 모니터링 지원 : ElasticSearh 활용 수집 데이터 모니터링 기능 지원 
    3) 머신러닝을 통한 이상탐지 진행 
    4) 웹 취약점 스캐닝진행
    5) 회원 정보 및 서버 관리 

2. front-end 역할 
    1) 데이터 요청: 서버 정보 및 사용자 정보 요청 
    2) 데이터 전달: 요청된 데이터 전달
    3) 서비스 제공: 서버 모니터링, 이상탐지 결과, 웹 취약점 스캐닝 결과 제공

## 3. 프로젝트 기능 
1. 이용자 요청 부하 시스템 <br/>: 모델에 사용될 데이터를 수집하기 위해 이용자 요청을 부하시켜 다양한 자료데이터 생성
2. 부하 시스템 파일 분산 자동화 <br/>: 여러개의 ec2를 통해 분산시켜야하는 과정을 하나의 중계서버를 통해 자동화 진행
3. 데이터 수집기 <br/>: 이용자 요청 부하 시스템으로 생성된 많은 데이터를 모델에 필요한 데이터로 분류하고 수집
4. 이상 감지 예측 및 알림 <br/>: ML 학습(시계열 모델 기반)의 이상 감지 모델을 이용하여 이상 탐지 자동화 ,  이상 감지 예측 모델을 통해감지된 결과를 사용자에게 실시간으로 알림
5. API 서버 : 일간 기준 매트릭 정보의 average과 max를 반환 및 시간 기준 매트릭 정보의 data를 반환
6. 보고서
   1) 통합 보고서 : 사용자가 요청하는 기간의 서버 현황, 이상탐지 정보, 웹취약점 스캐닝에 대한 보고서 제공
   2) 통합 그래프 : 사용자가 요청하는 기간의 데이터들에 대한 정보를 시각화하여 제공
7. 모니터링 서비스
   1) 웹 액세스 모니터 : 웹 액세스에 관련된 모니터 대시보드 제공
   2) 리소스 모니터 : 소스 모니터 대시보드 : 리소스에 관련된 모니터 대시보드 제공, 서버의 CPU/Memory/Disk와 관련된 종합적인 정보를 출력 
8. 웹 취약점 스캐닝<br/> : 6가지의 취약점에 대한 점검 결과와 각각의 취약점에 대한 상세 정보와 해결 방안도 함께 제공


## 4. 결과
- 2023 한이음 ICT 공모전 입상 수상
- [시현 영상 URL](https://www.youtube.com/watch?v=diZPwZFIewU)
