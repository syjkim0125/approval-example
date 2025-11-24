예시용 결재 서비스입니다.

자세한 내용과 일정은 [[문서 결재 전략적 설계](https://conscious-newsprint-15e.notion.site/0683eabd64584cb795d5cc1afcf946e2)] 및 [[클럽하우스 이터레이션](https://app.shortcut.com/joshuatest/iterations)]를 참고하세요.

포스트맨 예시 API : [포스트맨 예시 문서](https://documenter.getpostman.com/view/7174063/2sB3dHWYQW)

- 클럽하우스 관련 내용은 팀원으로 가입해야만 볼 수 있습니다. 초대 링크를 첨부드립니다.
  ([클럽하우스 초대 링크](https://app.shortcut.com/invite-link/613859d9-e723-4038-b63c-80decb924baa))

#### 환경 세팅 커맨드(docker와 docker-compose가 설치되어있어야 합니다.)

1. `git clone https://github.com/syjkim0125/approval-example.git`
2. `docker compose build`
3. `docker compose up -d`

실행하고 난 후, API를 호출하면 됩니다.

#### 종료 커맨드

`docker compose down -v`

#### Database 접속 커맨드

`docker exec -it approval-mysql mysql -u root -ptest approvalservice`

`use approvalservice;`

`show tables;`

#### API 실행 순서(Auth 기능은 없으므로, 로그인 API는 무시해도 됩니다.)

회원 가입: 유저 가입 API 호출

문서 목록 보기: 유저 로그인 API 호출 -> 문서 목록 조회 API 호출 (querystring으로 status 변경)

결재 신청: 유저 로그인 API 호출 -> 문서 목록 조회 API 호출 -> 유저 목록 조회 API 호출 -> 결재 신청 API 호출

문서 결재: 유저 로그인 API 호출 -> 문서 목록 조회 API 호출 -> 문서 조회 API 호출 -> 결재 API 호출
