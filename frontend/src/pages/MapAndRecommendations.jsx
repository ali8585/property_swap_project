import { useEffect, useState } from "react";
import { fetchRecommendations } from "../api/api";

export default function MapAndRecommendations({ token }) {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRecommendations(token)
      .then(setRecommendations)
      .catch(() => setError("خطا در دریافت پیشنهادها"));
  }, [token]);

  return (
    <div>
      <h2>نقشه و پیشنهادها</h2>
      {error && <p>{error}</p>}

      {/* اینجا می‌توانید نقشه با Mapbox یا Leaflet اضافه کنید */}
      <div style={{ width: "100%", height: "400px", backgroundColor: "#eee" }}>
        {/* مپ اینجا */}
        <p>نقشه در این قسمت قرار می‌گیرد (در آینده اضافه می‌شود)</p>
      </div>

      <h3>پیشنهادها</h3>
      <ul>
        {recommendations.map((p) => (
          <li key={p.id}>
            {p.type} - متراژ: {p.area} - قیمت: {p.approx_price}
          </li>
        ))}
      </ul>
    </div>
  );
}
