import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

export async function generateIDPAnalysis(prompt) {
  // CONFIGURATION: 
  // Even if you are in Mumbai, "us." model IDs MUST use a US region endpoint.
  const REGION = "us-east-1"; 
  const MODEL_ID = "us.anthropic.claude-sonnet-4-5-20250929-v1:0";

  const client = new BedrockRuntimeClient({
    region: REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      sessionToken: process.env.AWS_SESSION_TOKEN,
    },
  });

  const payload = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: [{ type: "text", text: prompt }],
      },
    ],
  };

  try {
    const command = new InvokeModelCommand({
      modelId: MODEL_ID,
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify(payload),
    });

    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    
    return responseBody.content[0].text;

  } catch (error) {
    console.error('Bedrock Error Details:', error);
    
    // Provide clear feedback for common SSO/Region errors
    if (error.name === "UnrecognizedClientException") {
      throw new Error("AWS Session expired or invalid. Please refresh your SSO credentials.");
    }
    if (error.name === "AccessDeniedException") {
      throw new Error(`Model access denied. Check if Claude 4.5 is enabled in ${REGION}.`);
    }
    
    throw new Error(`LLM Error: ${error.message}`);
  }
}