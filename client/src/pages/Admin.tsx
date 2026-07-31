import { useState } from "react";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("yapay-zeka");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px" }}>
      <h1>AIPUSULA Admin Paneli</h1>

      <input
        placeholder="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: "12px", marginBottom: "15px" }}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ width: "100%", padding: "12px", marginBottom: "15px" }}
      >
        <option value="yapay-zeka">Yapay Zeka</option>
        <option value="ai-araclari">AI Araçları</option>
        <option value="ai-ile-kazanc">AI ile Kazanç</option>
        <option value="dijital-dunya">Dijital Dünya</option>
        <option value="siber-guvenlik">Siber Güvenlik</option>
      </select>

      <textarea
        placeholder="Özet"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        rows={4}
        style={{ width: "100%", padding: "12px", marginBottom: "15px" }}
      />

      <textarea
        placeholder="İçerik"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={12}
        style={{ width: "100%", padding: "12px", marginBottom: "20px" }}
      />

      <button
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Yayınla
      </button>
    </div>
  );
}
