import { useState } from "react";
import { publishPost } from "../lib/publishPost";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("yapay-zeka");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function submitPost() {
    if (submitting) return;
    setSubmitting(true);
    setFeedback("");
    try {
      const result = await publishPost({ title, category, summary, content });
      setFeedback(result.message);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "İstek başarısız oldu.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px" }}>
      <h1>AIPUSULA Admin Paneli</h1>

      <label htmlFor="post-title">Başlık</label>
      <input
        id="post-title"
        placeholder="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: "12px", marginBottom: "15px" }}
      />

      <label htmlFor="post-category">Kategori</label>
      <select
        id="post-category"
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

      <label htmlFor="post-summary">Özet</label>
      <textarea
        id="post-summary"
        placeholder="Özet"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        rows={4}
        style={{ width: "100%", padding: "12px", marginBottom: "15px" }}
      />

      <label htmlFor="post-content">İçerik</label>
      <textarea
        id="post-content"
        placeholder="İçerik"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={12}
        style={{ width: "100%", padding: "12px", marginBottom: "20px" }}
      />

      <button
        onClick={submitPost}
        disabled={submitting}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        {submitting ? "Gönderiliyor..." : "API’ye Gönder"}
      </button>
      <p role="status" aria-live="polite">{feedback}</p>
    </div>
  );
}
