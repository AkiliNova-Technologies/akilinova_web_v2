#!/bin/bash

# SEO Meta Tag Testing Script
# This script checks if your meta tags are properly configured

echo "======================================"
echo "SEO Meta Tag Testing Script"
echo "======================================"
echo ""

# Set your domain
DOMAIN="https://akilinovatech.com"

# Color codes for better readability
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Testing domain: $DOMAIN${NC}"
echo ""

# Function to check if a meta tag exists
check_meta_tag() {
    local url=$1
    local tag=$2
    local description=$3
    
    result=$(curl -s "$url" | grep -o "$tag" 2>/dev/null || echo "NOT FOUND")
    
    if [ "$result" != "NOT FOUND" ]; then
        echo -e "${GREEN}✓${NC} $description: FOUND"
        return 0
    else
        echo -e "${RED}✗${NC} $description: NOT FOUND"
        return 1
    fi
}

# Function to check if image exists
check_image() {
    local url=$1
    local description=$2
    
    status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$status" = "200" ]; then
        echo -e "${GREEN}✓${NC} $description: EXISTS (HTTP $status)"
        return 0
    else
        echo -e "${RED}✗${NC} $description: MISSING (HTTP $status)"
        return 1
    fi
}

echo -e "${YELLOW}1. Checking Homepage Meta Tags...${NC}"
echo "-----------------------------------"
check_meta_tag "$DOMAIN" 'property="og:title"' "Open Graph Title"
check_meta_tag "$DOMAIN" 'property="og:description"' "Open Graph Description"
check_meta_tag "$DOMAIN" 'property="og:image"' "Open Graph Image"
check_meta_tag "$DOMAIN" 'property="og:url"' "Open Graph URL"
check_meta_tag "$DOMAIN" 'name="twitter:card"' "Twitter Card"
check_meta_tag "$DOMAIN" 'name="twitter:title"' "Twitter Title"
check_meta_tag "$DOMAIN" 'name="twitter:image"' "Twitter Image"
echo ""

echo -e "${YELLOW}2. Checking Blog Page Meta Tags...${NC}"
echo "-----------------------------------"
check_meta_tag "$DOMAIN/blog" 'property="og:title"' "Blog OG Title"
check_meta_tag "$DOMAIN/blog" 'property="og:image"' "Blog OG Image"
check_meta_tag "$DOMAIN/blog" 'name="twitter:card"' "Blog Twitter Card"
echo ""

echo -e "${YELLOW}3. Checking Contact Page Meta Tags...${NC}"
echo "--------------------------------------"
check_meta_tag "$DOMAIN/contact" 'property="og:title"' "Contact OG Title"
check_meta_tag "$DOMAIN/contact" 'property="og:image"' "Contact OG Image"
echo ""

echo -e "${YELLOW}4. Checking Image Files...${NC}"
echo "--------------------------"
check_image "$DOMAIN/og-image.png" "Main OG Image"
check_image "$DOMAIN/og-contact.jpg" "Contact OG Image"
check_image "$DOMAIN/Logo.png" "Logo Image"
echo ""

echo -e "${YELLOW}5. Checking Structured Data...${NC}"
echo "-------------------------------"
check_meta_tag "$DOMAIN" 'application/ld+json' "JSON-LD Schema"
check_meta_tag "$DOMAIN" '"@type":"Organization"' "Organization Schema"
check_meta_tag "$DOMAIN" '"@type":"WebSite"' "Website Schema"
echo ""

echo -e "${YELLOW}6. Checking SEO Files...${NC}"
echo "------------------------"
check_image "$DOMAIN/robots.txt" "robots.txt"
check_image "$DOMAIN/sitemap.xml" "sitemap.xml"
echo ""

echo "======================================"
echo -e "${GREEN}Testing Complete!${NC}"
echo "======================================"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo "1. Fix any items marked with ✗"
echo "2. Test your URLs with:"
echo "   ${YELLOW}Facebook Debugger:${NC} https://developers.facebook.com/tools/debug/"
echo "   ${YELLOW}Twitter Validator:${NC} https://cards-dev.twitter.com/validator"
echo "   ${YELLOW}LinkedIn Inspector:${NC} https://www.linkedin.com/post-inspector/"
echo ""
echo "3. To view actual meta tag content, run:"
echo "   ${YELLOW}curl -s https://akilinovatech.com | grep 'og:' | head -10${NC}"
echo ""
echo "4. After fixes, clear social media caches using the tools above"
echo ""