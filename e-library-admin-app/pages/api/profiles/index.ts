// pages/api/profiles/index.ts
import { NextApiResponse } from "next";
import { withApiAuth, makeApiAuthRequest } from "@/utils/auth/authApiHandler";

export default withApiAuth(async (req, res: NextApiResponse) => {
  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Call the backend endpoint for profiles using the authenticated access token.
    const response = await makeApiAuthRequest(
        req.accessToken,
      `/api/profiles`,
      {
        method: "GET",
        params: {},
      }
    );
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return res.status(500).json({
      message: "Failed to fetch profiles",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});
