import { useEffect, useState } from "react";
import { fetchUserProfile } from "../api/api";

export default function Profile({ token }) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserProfile(token).then(setProfile).catch(() => setError("خطا در دریافت پروفایل"));
  }, [token]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>پروفایل کاربر</h2>
      {profile ? (
        <div>
          <p>نام کاربری: {profile.username}</p>
          <p>ایمیل: {profile.email}</p>
        </div>
      ) : (
        <p>در حال بارگذاری...</p>
      )}
    </div>
  );
}
