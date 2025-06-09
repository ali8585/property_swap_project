import { Link } from "react-router-dom";

export default function Navbar({ onLogout }) {
  return (
    <nav>
      <ul>
        <li><Link to="/dashboard">داشبورد</Link></li>
        <li><Link to="/my-properties">املاک من</Link></li>
        <li><Link to="/upload">آپلود CSV</Link></li>
        <li><Link to="/map">نقشه و پیشنهادها</Link></li>
        <li><Link to="/profile">پروفایل</Link></li>
        <li><button onClick={onLogout}>خروج</button></li>
      </ul>
    </nav>
  );
}
