#!/bin/bash

# Quick Deployment Script for StreamPay Contract
# Usage: ./quick-deploy.sh

echo "🚀 StreamPay Contract Deployment"
echo "=================================="
echo ""

# Check if private key is set
if [ -z "$PRIVATE_KEY" ]; then
    echo "⚠️  PRIVATE_KEY environment variable not set"
    echo ""
    echo "Please set it using:"
    echo "  export PRIVATE_KEY='your_private_key_here'"
    echo ""
    echo "Or run with:"
    echo "  PRIVATE_KEY='your_key' ./quick-deploy.sh"
    echo ""
    exit 1
fi

# Configuration
NETWORK="https://sepolia-rollup.arbitrum.io/rpc"
CHAIN_ID=421614

echo "📋 Configuration:"
echo "  Network: Arbitrum Sepolia"
echo "  Chain ID: $CHAIN_ID"
echo "  RPC: $NETWORK"
echo ""

# Step 1: Check compilation
echo "Step 1/5: Checking contract compilation..."
cargo stylus check --endpoint=$NETWORK

if [ $? -ne 0 ]; then
    echo "❌ Compilation check failed"
    exit 1
fi
echo "✅ Compilation check passed"
echo ""

# Step 2: Deploy contract
echo "Step 2/5: Deploying contract..."
DEPLOY_OUTPUT=$(cargo stylus deploy --endpoint=$NETWORK --private-key=$PRIVATE_KEY --no-verify 2>&1)

if [ $? -ne 0 ]; then
    echo "❌ Deployment failed"
    echo "$DEPLOY_OUTPUT"
    exit 1
fi

# Extract contract address
CONTRACT_ADDRESS=$(echo "$DEPLOY_OUTPUT" | grep -oP '0x[a-fA-F0-9]{40}' | head -1)

if [ -z "$CONTRACT_ADDRESS" ]; then
    echo "❌ Could not extract contract address"
    echo "$DEPLOY_OUTPUT"
    exit 1
fi

echo "✅ Contract deployed!"
echo "📍 Address: $CONTRACT_ADDRESS"
echo ""

# Step 3: Export ABI
echo "Step 3/5: Exporting ABI..."
cargo stylus export-abi > abi.json
echo "✅ ABI exported to abi.json"
echo ""

# Step 4: Initialize contract
echo "Step 4/5: Initializing contract..."
INIT_OUTPUT=$(cast send $CONTRACT_ADDRESS "initialize()" --private-key $PRIVATE_KEY --rpc-url $NETWORK 2>&1)

if [ $? -ne 0 ]; then
    echo "❌ Initialization failed"
    echo "$INIT_OUTPUT"
    exit 1
fi
echo "✅ Contract initialized"
echo ""

# Step 5: Verify initialization
echo "Step 5/5: Verifying deployment..."
ADMIN=$(cast call $CONTRACT_ADDRESS "admin()(address)" --rpc-url $NETWORK 2>&1)

if [ $? -eq 0 ]; then
    echo "✅ Verification successful"
    echo "   Admin address: $ADMIN"
else
    echo "⚠️  Could not verify admin (contract may still be valid)"
fi
echo ""

# Save deployment info
echo "💾 Saving deployment info..."
cat > deployment-info.txt << EOF
Deployment Information
======================
Date: $(date)
Network: Arbitrum Sepolia
Chain ID: $CHAIN_ID
RPC URL: $NETWORK

Contract Address: $CONTRACT_ADDRESS
Admin: $ADMIN

Explorer: https://sepolia.arbiscan.io/address/$CONTRACT_ADDRESS

Next Steps:
1. Update frontend config: src/contracts/contractconfig.ts
2. Update subgraph config: subgraph/subgraph.yaml
3. Copy ABI: cp smart-contract/abi.json complete-abi.json
4. Test contract functions
5. Redeploy subgraph
EOF

echo "✅ Deployment info saved to deployment-info.txt"
echo ""

# Summary
echo "🎉 Deployment Complete!"
echo "======================="
echo ""
echo "📍 Contract Address: $CONTRACT_ADDRESS"
echo "🌐 Network: Arbitrum Sepolia"
echo "📄 ABI: abi.json"
echo "📋 Details: deployment-info.txt"
echo ""
echo "🔗 View on Explorer:"
echo "   https://sepolia.arbiscan.io/address/$CONTRACT_ADDRESS"
echo ""
echo "📝 Next Steps:"
echo "   1. Update CONTRACT_ADDRESS in src/contracts/contractconfig.ts"
echo "   2. Update contract address in subgraph/subgraph.yaml"
echo "   3. Test the contract with test scripts"
echo "   4. Redeploy the subgraph"
echo ""
