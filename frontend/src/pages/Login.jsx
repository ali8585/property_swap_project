import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/api";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      onLogin(data.access_token);
      navigate("/dashboard");
    } catch {
      setError("نام کاربری یا رمز عبور اشتباه است");
    }
  };

  return (
    <div>
      <h2>ورود</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="نام کاربری" value={username} onChange={e => setUsername(e.target.value)} required />
        <input placeholder="رمز عبور" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">ورود</button>
      </form>
      {error && <p style={{color: "red"}}>{error}</p>}
      <p>حساب کاربری ندارید؟ <Link to="/register">ثبت‌نام</Link></p>
    </div>
  );
}
