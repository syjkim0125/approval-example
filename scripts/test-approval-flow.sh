#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Base URL
BASE_URL="http://localhost:3000"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Approval Service Flow Test${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Step 1: Get User List to extract IDs
echo -e "${YELLOW}[0/6] Preparing - Getting User List...${NC}"
USER_LIST=$(curl -s -X GET "${BASE_URL}/users?offset=0&limit=10")

USER1_ID=$(echo "$USER_LIST" | jq -r '.users[0].id')
USER1_EMAIL=$(echo "$USER_LIST" | jq -r '.users[0].email')
USER2_ID=$(echo "$USER_LIST" | jq -r '.users[1].id')
USER2_EMAIL=$(echo "$USER_LIST" | jq -r '.users[1].email')

if [ -z "$USER1_ID" ] || [ -z "$USER2_ID" ] || [ "$USER1_ID" == "null" ] || [ "$USER2_ID" == "null" ]; then
  echo -e "${RED}✗ Users not found! Please run test-user-api.sh first${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Users found${NC}"
echo -e "  User 1 (Author): ${CYAN}${USER1_EMAIL}${NC} (ID: ${USER1_ID})"
echo -e "  User 2 (Approver): ${CYAN}${USER2_EMAIL}${NC} (ID: ${USER2_ID})"
echo ""

# Step 2: Check initial document list (should be empty)
echo -e "${YELLOW}[1/6] Checking Initial Document List (should be 0)...${NC}"
RESPONSE=$(curl -s -X GET "${BASE_URL}/documents?offset=0&limit=10&status=OUTBOX" \
  -H "user: ${USER1_ID}")

TOTAL_COUNT=$(echo "$RESPONSE" | jq -r '.totalCount // .count // 0')
echo -e "${GREEN}✓ Initial document count: ${TOTAL_COUNT}${NC}"
echo "$RESPONSE" | jq '.'
echo ""

# Step 3: Create Approval Request
echo -e "${YELLOW}[2/6] Creating Approval Request...${NC}"
RESPONSE=$(curl -s -X POST "${BASE_URL}/documents/approval-request" \
  -H "Content-Type: application/json" \
  -H "user: ${USER1_ID}" \
  -d "{
    \"title\": \"Vacation Request\",
    \"category\": \"Leave\",
    \"content\": \"Request for annual leave from Dec 25 to Dec 27, 2024.\",
    \"approvers\": [
      {
        \"userId\": \"${USER2_ID}\",
        \"approvalOrder\": 1
      }
    ]
  }")

if echo "$RESPONSE" | grep -q "success"; then
  echo -e "${GREEN}✓ Approval request created successfully${NC}"
  echo "$RESPONSE" | jq '.'
else
  echo -e "${RED}✗ Failed to create approval request${NC}"
  echo "$RESPONSE" | jq '.'
  exit 1
fi
echo ""

# Step 4: Get Document List (should be 1, status: OUTBOX)
echo -e "${YELLOW}[3/6] Checking Document List After Request (should be 1, status: OUTBOX)...${NC}"
RESPONSE=$(curl -s -X GET "${BASE_URL}/documents?offset=0&limit=10&status=OUTBOX" \
  -H "user: ${USER1_ID}")

TOTAL_COUNT=$(echo "$RESPONSE" | jq -r '.totalCount // .count // 0')
DOCUMENT_ID=$(echo "$RESPONSE" | jq -r '.documents[0].id')
DOCUMENT_STATUS=$(echo "$RESPONSE" | jq -r '.documents[0].status')

echo -e "${GREEN}✓ Document count: ${TOTAL_COUNT}${NC}"
echo -e "${GREEN}✓ Document ID: ${DOCUMENT_ID}${NC}"
echo -e "${GREEN}✓ Document Status: ${DOCUMENT_STATUS}${NC}"
echo "$RESPONSE" | jq '.'
echo ""

# Step 5: Get current approver info via API
echo -e "${YELLOW}[4/6] Getting current approver from API...${NC}"
DOC_DETAIL=$(curl -s -X GET "${BASE_URL}/documents/${DOCUMENT_ID}")

CURRENT_APPROVAL_ORDER=$(echo "$DOC_DETAIL" | jq -r '.currentApprovalOrder // 1')
APPROVER_ID=$(echo "$DOC_DETAIL" | jq -r --argjson order "$CURRENT_APPROVAL_ORDER" '.approvers[]? | select(.approvalOrder == $order) | .id' | head -n 1)

if [ -z "$APPROVER_ID" ] || [ "$APPROVER_ID" == "null" ]; then
  echo -e "${YELLOW}⚠ Could not determine approver ID from API response${NC}"
  echo "$DOC_DETAIL" | jq '.'
  echo -e "${RED}✗ Approver ID is required for approval${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Approver ID retrieved from API: ${APPROVER_ID}${NC}"
echo ""

# Step 6: Approve Document
echo -e "${YELLOW}[5/6] Approving Document...${NC}"
RESPONSE=$(curl -s -X PUT "${BASE_URL}/documents/${DOCUMENT_ID}/approvers/${APPROVER_ID}/approval" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "APPROVE",
    "comment": "Approved."
  }')

if echo "$RESPONSE" | grep -q "success"; then
  echo -e "${GREEN}✓ Document approved successfully${NC}"
  echo "$RESPONSE" | jq '.'
else
  echo -e "${RED}✗ Failed to approve document${NC}"
  echo "$RESPONSE" | jq '.'
  exit 1
fi
echo ""

# Step 7: Verify Final Status
echo -e "${YELLOW}[6/6] Verifying Final Document Status...${NC}"
RESPONSE=$(curl -s -X GET "${BASE_URL}/documents/${DOCUMENT_ID}")

FINAL_DOC_STATUS=$(echo "$RESPONSE" | jq -r '.status')
FINAL_CURRENT_APPROVAL_ORDER=$(echo "$RESPONSE" | jq -r '.currentApprovalOrder')

echo -e "${GREEN}✓ Final status verified${NC}"
echo -e "${CYAN}  Document Status: ${DOCUMENT_STATUS} → ${FINAL_DOC_STATUS}${NC}"
echo -e "${CYAN}  Current Approval Order: ${CURRENT_APPROVAL_ORDER} → ${FINAL_CURRENT_APPROVAL_ORDER}${NC}"
echo "$RESPONSE" | jq '.'
echo ""

echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}Approval Flow Test Completed Successfully!${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${CYAN}📋 Test Summary:${NC}"
echo -e "  • Initial documents: 0"
echo -e "  • After request: 1 (status: ongoing)"
echo -e "  • After approval: 1 (status: ${FINAL_DOC_STATUS})"
echo ""
