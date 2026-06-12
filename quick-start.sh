#!/bin/bash

# ShopCart Project - Quick Start Setup Script
# This script helps you set up the project quickly

echo "🚀 ShopCart Quick Start Setup"
echo "===================================="
echo ""

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  .env file not found!${NC}"
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo -e "${GREEN}✓ .env file created${NC}"
    echo ""
    echo "📝 Please edit .env and add your credentials:"
    echo "   - NEXT_PUBLIC_SANITY_PROJECT_ID"
    echo "   - SANITY_API_TOKEN"
    echo "   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
    echo "   - CLERK_SECRET_KEY"
    echo "   - STRIPE_SECRET_KEY"
    echo "   - STRIPE_WEBHOOK_SECRET"
    echo ""
    exit 1
fi

echo -e "${GREEN}✓ .env file found${NC}"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}📦 Installing dependencies...${NC}"
    pnpm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}✗ Failed to install dependencies${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ Dependencies installed${NC}"
else
    echo -e "${GREEN}✓ Dependencies already installed${NC}"
fi

echo ""
echo -e "${BLUE}📚 Project Structure:${NC}"
echo "  - /app           → Next.js pages and routes"
echo "  - /components    → React components"
echo "  - /actions       → Server actions"
echo "  - /lib           → Utility functions"
echo "  - /sanity        → CMS configuration"
echo "  - /public        → Static assets"
echo ""

echo -e "${BLUE}📄 Important Files:${NC}"
echo "  - SETUP_GUIDE.md       → Step-by-step setup instructions"
echo "  - SETUP_CHECKLIST.md   → Progress tracking checklist"
echo "  - API_REFERENCE.md     → API endpoints documentation"
echo "  - .env.example         → Environment variables template"
echo ""

echo -e "${BLUE}🎯 Next Steps:${NC}"
echo ""
echo "1️⃣  Follow SETUP_GUIDE.md to create accounts:"
echo "   - Sanity CMS (database)"
echo "   - Clerk (authentication)"
echo "   - Stripe (payments)"
echo ""
echo "2️⃣  Update your .env file with credentials from those services"
echo ""
echo "3️⃣  Start development server:"
echo "   ${YELLOW}pnpm dev${NC}"
echo ""
echo "4️⃣  Access your store:"
echo "   🛍️  Store:    http://localhost:3000"
echo "   🏗️  Studio:   http://localhost:3000/studio"
echo ""
echo "5️⃣  Use SETUP_CHECKLIST.md to track progress"
echo ""

echo -e "${GREEN}===================================="
echo "Ready to start! 🚀${NC}"
echo ""

# Optional: Ask user if they want to start dev server now
read -p "Start development server now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}Starting dev server...${NC}"
    pnpm dev
fi
