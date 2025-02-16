// pages/user/index.tsx
import React, { useEffect, useState } from "react";

type Profile = {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  user_role: string;
};

const Home = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("/api/profiles", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setProfiles(data);
      } catch (error: unknown) {
        console.error("Error fetching profiles:", error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-white dark:bg-gray-900 p-8">
        <h1 className="text-black dark:text-white text-2xl">
          Loading profiles...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center bg-white dark:bg-gray-900 p-8">
        <h1 className="text-black dark:text-white text-2xl">Error: {error}</h1>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-8">
      <h1 className="text-black dark:text-white text-2xl mb-4">Profiles</h1>
      {profiles.map((profile) => (
        <div
          key={profile.id}
          className="mb-4 p-4 border rounded shadow-sm bg-gray-50 dark:bg-gray-800"
        >
          <p className="text-black dark:text-white">
            <strong>Email:</strong> {profile.email}
          </p>
          <p className="text-black dark:text-white">
            <strong>Role:</strong> {profile.user_role}
          </p>
          <p className="text-black dark:text-white">
            <strong>Created at:</strong>{" "}
            {new Date(profile.created_at).toLocaleString()}
          </p>
          <p className="text-black dark:text-white">
            <strong>Updated at:</strong>{" "}
            {new Date(profile.updated_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Home;
