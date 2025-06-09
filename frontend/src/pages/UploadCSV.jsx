import { useState } from "react";
import { uploadCSV } from "../api/api";

export default function UploadCSV({ token }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("لطفا یک فایل انتخاب کنید");
      return;
    }
    try {
      const res = await uploadCSV(token, file);
      setMessage(`فایل با موفقیت آپلود شد. تعداد املاک: ${res.imported}`);
    } catch {
      setMessage("خطا در آپلود فایل");
    }
  };

  return (
    <div>
      <h2>آپلود فایل CSV املاک</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv,.xlsx" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">آپلود</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
