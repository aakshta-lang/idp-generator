// test-env.js
require('dotenv').config({ path: '.env.local' });

function verifyEnv() {
  const keys = ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_SESSION_TOKEN'];
  
  console.log("--- Environment Variable Check ---");
  
  keys.forEach(key => {
    const value = process.env[key];
    if (value) {
      // Print the first 5 characters to confirm it's loaded without leaking the whole secret
      console.log(`✅ ${key}: Found (Starts with: ${value.substring(0, 5)}...)`);
    } else {
      console.log(`❌ ${key}: NOT FOUND`);
    }
  });

  if (!process.env.AWS_SESSION_TOKEN) {
    console.warn("\n⚠️ WARNING: AWS_SESSION_TOKEN is missing. Your Bedrock call will fail with 'UnrecognizedClientException' if using SSO.");
  }
}

verifyEnv();