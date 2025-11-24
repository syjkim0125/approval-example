#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Base URL
BASE_URL="http://localhost:3000"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  User API Test Script${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Test 1: Register User 1
echo -e "${YELLOW}[1/5] Creating User 1 (Author)...${NC}"
RESPONSE=$(curl -s -X POST "${BASE_URL}/users/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Kim",
    "email": "kim@example.com",
    "password": "password123"
  }')

if echo "$RESPONSE" | grep -q "success"; then
  echo -e "${GREEN}✓ User 1 registered successfully${NC}"
  echo "$RESPONSE" | jq '.'
else
  echo -e "${RED}✗ Failed to register User 1${NC}"
  echo "$RESPONSE" | jq '.'
fi
echo ""

# Test 2: Register User 2
echo -e "${YELLOW}[2/5] Creating User 2 (Approver)...${NC}"
RESPONSE=$(curl -s -X POST "${BASE_URL}/users/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sarah Park",
    "email": "park@example.com",
    "password": "password123"
  }')

if echo "$RESPONSE" | grep -q "success"; then
  echo -e "${GREEN}✓ User 2 registered successfully${NC}"
  echo "$RESPONSE" | jq '.'
else
  echo -e "${RED}✗ Failed to register User 2${NC}"
  echo "$RESPONSE" | jq '.'
fi
echo ""

# Test 3: Login User 1
echo -e "${YELLOW}[3/5] User 1 Login...${NC}"
RESPONSE=$(curl -s -X POST "${BASE_URL}/users/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "kim@example.com",
    "password": "password123"
  }')

if echo "$RESPONSE" | grep -q "success"; then
  echo -e "${GREEN}✓ User 1 logged in successfully${NC}"
  echo "$RESPONSE" | jq '.'
else
  echo -e "${RED}✗ Failed to login User 1${NC}"
  echo "$RESPONSE" | jq '.'
fi
echo ""

# Test 4: Login User 2
echo -e "${YELLOW}[4/5] User 2 Login...${NC}"
RESPONSE=$(curl -s -X POST "${BASE_URL}/users/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "park@example.com",
    "password": "password123"
  }')

if echo "$RESPONSE" | grep -q "success"; then
  echo -e "${GREEN}✓ User 2 logged in successfully${NC}"
  echo "$RESPONSE" | jq '.'
else
  echo -e "${RED}✗ Failed to login User 2${NC}"
  echo "$RESPONSE" | jq '.'
fi
echo ""

# Test 5: Get User List
echo -e "${YELLOW}[5/5] Getting User List...${NC}"
RESPONSE=$(curl -s -X GET "${BASE_URL}/users?offset=0&limit=10")

echo -e "${GREEN}✓ User list retrieved${NC}"
echo "$RESPONSE" | jq '.'
echo ""

# Extract user IDs for later use
USER1_ID=$(echo "$RESPONSE" | jq -r '.users[0].id')
USER2_ID=$(echo "$RESPONSE" | jq -r '.users[1].id')

echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}User API Test Completed!${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}User 1 ID (Author): ${GREEN}${USER1_ID}${NC}"
echo -e "${BLUE}User 2 ID (Approver): ${GREEN}${USER2_ID}${NC}"
echo ""
echo -e "${YELLOW}💡 These IDs will be used in the approval flow test${NC}"
echo ""
