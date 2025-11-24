#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo -e "${MAGENTA}========================================${NC}"
echo -e "${MAGENTA}  Full API Test Suite${NC}"
echo -e "${MAGENTA}========================================${NC}\n"

# Check if server is running
echo -e "${YELLOW}Checking if server is running...${NC}"
if curl -s http://localhost:3000 > /dev/null 2>&1; then
  echo -e "${GREEN}✓ Server is running${NC}\n"
else
  echo -e "${RED}✗ Server is not running!${NC}"
  echo -e "${YELLOW}Please run: docker compose up -d${NC}\n"
  exit 1
fi

# Check if jq is installed (required)
if ! command -v jq &> /dev/null; then
  echo -e "${RED}✗ jq is not installed!${NC}"
  echo -e "${YELLOW}Please install jq:${NC}"
  echo -e "  macOS: brew install jq"
  echo -e "  Linux: apt-get install jq or yum install jq\n"
  exit 1
fi

# Run User API tests
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Phase 1: User API Tests${NC}"
echo -e "${BLUE}========================================${NC}\n"
bash "${SCRIPT_DIR}/test-user-api.sh"

if [ $? -ne 0 ]; then
  echo -e "${RED}✗ User API tests failed${NC}\n"
  exit 1
fi

echo -e "${YELLOW}Waiting 2 seconds before approval flow tests...${NC}\n"
sleep 2

# Run Approval Flow tests
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Phase 2: Approval Flow Tests${NC}"
echo -e "${BLUE}========================================${NC}\n"
bash "${SCRIPT_DIR}/test-approval-flow.sh"

if [ $? -ne 0 ]; then
  echo -e "${RED}✗ Approval flow tests failed${NC}\n"
  exit 1
fi

# Final summary
echo -e "${MAGENTA}========================================${NC}"
echo -e "${MAGENTA}  All Tests Completed Successfully!${NC}"
echo -e "${MAGENTA}========================================${NC}\n"
echo -e "${GREEN}✓ User registration and login${NC}"
echo -e "${GREEN}✓ User list retrieval${NC}"
echo -e "${GREEN}✓ Approval request creation${NC}"
echo -e "${GREEN}✓ Document status tracking${NC}"
echo -e "${GREEN}✓ Approval processing${NC}"
echo -e "${GREEN}✓ Status change verification${NC}\n"
