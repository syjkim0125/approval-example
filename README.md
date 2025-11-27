예시용 결재 서비스입니다.

자세한 내용과 일정은 [[문서 결재 전략적 설계](https://conscious-newsprint-15e.notion.site/0683eabd64584cb795d5cc1afcf946e2)] 및 [[Shortcut 이터레이션](https://app.shortcut.com/joshuatest/iterations)]를 참고하세요.

Iteration Example Image


<img width="300" height="450" alt="스크린샷 2025-11-27 오후 7 19 34" src="https://github.com/user-attachments/assets/8e85b969-7082-40ca-8c75-4d741523228d" /> <img width="450" height="500" alt="스크린샷 2025-11-27 오후 7 19 45" src="https://github.com/user-attachments/assets/42abe5f0-ab7d-48e2-b64a-196cbc9304ee" />


포스트맨 예시 API : [포스트맨 예시 문서](https://documenter.getpostman.com/view/7174063/2sB3dHWYQW)

- Shortcut 관련 내용은 팀원으로 가입해야만 볼 수 있습니다. 초대 링크를 첨부드립니다.
  ([Shortcut 초대 링크](https://app.shortcut.com/invite-link/613859d9-e723-4038-b63c-80decb924baa))

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

#### 자동 테스트 스크립트

Docker 컨테이너 내부에서 API를 자동으로 테스트할 수 있는 셸 스크립트를 제공합니다.

**전체 플로우 자동 테스트**

```bash
docker exec approval-app /scripts/test-all.sh
```

**개별 테스트 실행**

```bash
# 1. 유저 API 테스트 (회원가입 2명 → 로그인 → 유저 목록 조회)
docker exec approval-app /scripts/test-user-api.sh

# 2. 결재 플로우 테스트 (문서 목록 조회 → 결재 신청 → 결재 처리 → 상태 확인)
docker exec approval-app /scripts/test-approval-flow.sh
```

**참고**: 테스트 스크립트는 Docker 이미지 빌드 시 자동으로 포함되며, `jq`와 `curl`이 사전 설치되어 있습니다.

#### API 실행 순서 (수동 테스트)

**1. 유저 관련 API**

- 유저 가입 (2명) → 유저 목록 조회 → 유저 로그인

**2. 결재 서비스 API**

- 문서 목록 조회(0건) → 결재 신청 → 문서 목록 조회(1건, status: ongoing) → 결재 처리 → 문서 조회(1건, status: approved/rejected)

#### 예외 처리

모든 예외 메시지는 `src/constant/exception.ts`에 정의되어 있습니다:

```typescript
- DOCUMENT_NOT_FOUND: 'Document not found'
- APPROVER_NOT_FOUND: 'Approver not found'
- USER_NOT_FOUND: 'User not found'
- INVALID_USER: 'Invalid user'
- DOCUMENT_STATUS_IS_NOT_ON_GOING: 'Document status is not on going'
- APPROVAL_STATUS_CANNOT_BE_ON_GOING: 'Approval status cannot be on going'
- APPROVER_IS_NOT_CURRENT_APPROVAL_ORDER: 'approver is not current approval order'
- INVALID_PASSWORD: 'Invalid password'
- USER_ALREADY_EXIST: 'User already exist'
```
