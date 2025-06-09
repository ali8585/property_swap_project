import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <h2>داشبورد</h2>
      <ul>
        <li><Link to="/my-properties">املاک من</Link></li>
        <li><Link to="/upload">آپلود CSV</Link></li>
        <li><Link to="/map">نقشه و پیشنهادها</Link></li>
        <li><Link to="/profile">پروفایل</Link></li>
      </ul>
    </div>
  );
}
