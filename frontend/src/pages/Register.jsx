import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate("/login");
    } catch {
      setError("ثبت‌نام موفق نبود");
    }
  };

  return (
    <div>
      <h2>ثبت‌نام</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="نام کاربری" value={username} onChange={e => setUsername(e.target.value)} required />
        <input placeholder="ایمیل" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input placeholder="رمز عبور" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">ثبت‌نام</button>
      </form>
      {error && <p style={{color: "red"}}>{error}</p>}
      <p>حساب دارید؟ <Link to="/login">ورود</Link></p>
    </div>
  );
}
