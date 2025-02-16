// pages/api/book-likes/[id]/status.ts
import { NextApiResponse } from "next";
import { withApiAuth, makeApiAuthRequest } from "@/utils/auth/authApiHandler";

export default withApiAuth(async (req, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const bookId = req.query.id as string;
  if (!bookId) {
    return res.status(400).json({ message: "Book ID is required" });
  }

  try {
    const response = await makeApiAuthRequest(
      req.accessToken,
      `/api/book-likes/${bookId}/status`,
      {
        method: "GET",
        params: {},
      }
    );
    return res.status(200).json(response);
  } catch (error) {
    console.error(`Error checking book like status:`, error);
    return res.status(500).json({
      message: "Failed to check like status",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});