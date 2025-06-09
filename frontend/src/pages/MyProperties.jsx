import { useState, useEffect } from "react";
import { fetchProperties, createProperty } from "../api/api";

export default function MyProperties({ token }) {
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({
    type: "agricultural",
    latitude: "",
    longitude: "",
    area: "",
    document_type: "",
    approx_price: "",
    amenities: "",
    interested_in_types: "",
    rating: 0,
    priority: 0,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    fetchProperties(token).then(setProperties).catch(() => setError("خطا در دریافت املاک"));
  }, [token]);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProperty(token, { ...form, rating: Number(form.rating), priority: Number(form.priority), latitude: Number(form.latitude), longitude: Number(form.longitude), area: Number(form.area), approx_price: Number(form.approx_price) });
      const updated = await fetchProperties(token);
      setProperties(updated);
    } catch {
      setError("خطا در ایجاد ملک");
    }
  };

  return (
    <div>
      <h2>املاک من</h2>
      <form onSubmit={handleSubmit}>
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="agricultural">کشاورزی</option>
          <option value="commercial">تجاری</option>
          <option value="residential">مسکونی</option>
        </select>
        <input name="latitude" placeholder="عرض جغرافیایی" value={form.latitude} onChange={handleChange} type="number" step="any" required />
        <input name="longitude" placeholder="طول جغرافیایی" value={form.longitude} onChange={handleChange} type="number" step="any" required />
        <input name="area" placeholder="متراژ" value={form.area} onChange={handleChange} type="number" step="any" required />
        <input name="document_type" placeholder="نوع سند" value={form.document_type} onChange={handleChange} />
        <input name="approx_price" placeholder="قیمت تقریبی" value={form.approx_price} onChange={handleChange} type="number" step="any" />
        <input name="amenities" placeholder="امکانات" value={form.amenities} onChange={handleChange} />
        <input name="interested_in_types" placeholder="علاقه‌مند به چه ملکی" value={form.interested_in_types} onChange={handleChange} />
        <input name="rating" placeholder="امتیاز" value={form.rating} onChange={handleChange} type="number" step="0.1" min="0" max="5" />
        <input name="priority" placeholder="اولویت" value={form.priority} onChange={handleChange} type="number" />
        <button type="submit">افزودن ملک</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>لیست املاک شما</h3>
      <ul>
        {properties.map((p) => (
          <li key={p.id}>
            {p.type} - متراژ: {p.area} - قیمت: {p.approx_price}
          </li>
        ))}
      </ul>
    </div>
  );
}
