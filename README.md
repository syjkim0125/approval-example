# Approval Service Example

This is a small internal-style document approval service:

- **Document Creation & Approval Flow**: Users can create documents and request sequential approvals from multiple approvers.
- **Approval Processing**: Approvers can approve or reject documents, and the document status updates accordingly throughout the approval chain.
- **Development Focus**: Requirements → Domain Modeling → API Design → Implementation.

For detailed information and schedules, please refer to:
- [[Document Approval Strategic Design](https://conscious-newsprint-15e.notion.site/0683eabd64584cb795d5cc1afcf946e2)]
- [[Shortcut Iterations](https://app.shortcut.com/joshuatest/iterations)]

**Iteration Example Images:**

<img width="300" height="450" alt="Screenshot 2025-11-27" src="https://github.com/user-attachments/assets/8e85b969-7082-40ca-8c75-4d741523228d" /> <img width="450" height="500" alt="Screenshot 2025-11-27" src="https://github.com/user-attachments/assets/42abe5f0-ab7d-48e2-b64a-196cbc9304ee" />

**Postman API Documentation:** [Postman Example Documentation](https://documenter.getpostman.com/view/7174063/2sB3dHWYQW)

> **Note:** Shortcut content requires team membership to view. Here's the invitation link:
> [Shortcut Invitation Link](https://app.shortcut.com/invite-link/613859d9-e723-4038-b63c-80decb924baa)


---


## 🚀 Environment Setup

**Prerequisites:** Docker and Docker Compose must be installed.

1. Clone the repository:
   ```bash
   git clone https://github.com/syjkim0125/approval-example.git
   ```

2. Build the Docker images:
   ```bash
   docker compose build
   ```

3. Start the containers:
   ```bash
   docker compose up -d
   ```

After running these commands, you can start making API calls.


---


## 🛑 Shutdown Commands

To stop and remove all containers:

```bash
docker compose down -v
```


---


## 💾 Database Access

To access the MySQL database:

```bash
docker exec -it approval-mysql mysql -u root -ptest approvalservice
```

Then switch to the approval service database:

```sql
use approvalservice;
```


---


## 🧪 Automated Test Scripts

Shell scripts are provided to automatically test APIs inside the Docker container.

### **Full Flow Automated Test**

```bash
docker exec approval-app /scripts/test-all.sh
```

### **Individual Test Execution**

```bash
# 1. User API Test (Register 2 users → Login → List users)
docker exec approval-app /scripts/test-user-api.sh

# 2. Approval Flow Test (List documents → Request approval → Process approval → Check status)
docker exec approval-app /scripts/test-approval-flow.sh
```

> **Note:** Test scripts are automatically included during Docker image build, with `jq` and `curl` pre-installed.


---


## 📝 API Execution Order (Manual Testing)

### **1. User-Related APIs**

- Register users (2 users) → List users → User login

### **2. Approval Service APIs**

- List documents (0 documents) → Request approval → List documents (1 document, status: ongoing) → Process approval → View document (1 document, status: approved/rejected)


---


## ⚠️ Exception Handling

All exception messages are defined in `src/constant/exception.ts`:

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
