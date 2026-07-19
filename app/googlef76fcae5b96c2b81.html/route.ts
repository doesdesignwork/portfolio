const verificationText = "google-site-verification: googlef76fcae5b96c2b81.html";

export function GET() {
  return new Response(verificationText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
