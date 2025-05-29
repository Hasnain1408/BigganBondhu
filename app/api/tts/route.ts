// app/api/tts/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const subscriptionKey = process.env.AZURE_TTS_KEY

  const response = await fetch("https://southeastasia.api.cognitive.microsoft.com/sts/v1.0/issueToken", {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": subscriptionKey!,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to get token" }, { status: 500 })
  }

  const token = await response.text()
  return NextResponse.json({ token })
}
