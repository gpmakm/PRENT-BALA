"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import QRCode from "qrcode";

export default function Payment() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [template, setTemplate] = useState(null);
  const [tid, setTid] = useState(""); // Transaction ID state
  const [message, setMessage] = useState(""); // Message state
  const qrRef = useRef(null); // Reference for QR code canvas

  // ⛔️ DELETE FUNCTION
  const deleteTemplate = async () => {
    try {
      const res = await fetch("/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: template._id }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Template deleted successfully.");
        setTemplate(null); // Clear the template from UI
      } else {
        setMessage(data.message || "❌ Failed to delete template.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      setMessage("⚠️ Something went wrong while deleting.");
    }
  };

  // 🧠 Fetching template based on ID
  useEffect(() => {
    if (id) {
      fetch(`/api/designs?page=1&limit=100`)
        .then((res) => res.json())
        .then((data) => {
          const selectedTemplate = data.templates.find((t) => t._id === id);
          if (selectedTemplate) {
            setTemplate(selectedTemplate);
          } else {
            console.error("Template not found for ID:", id);
          }
        })
        .catch((error) => console.error("Error fetching template:", error));
    }
  }, [id]);

  // 🧾 Form submission for download
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/download-design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: template._id,
          transactionId: tid,
        }),
      });

      const response = await res.json();

      if (res.ok) {
        window.location.href = response.downloadUrl; // Direct download
      } else {
        setMessage(response.message || "Error processing request");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server error, please try again later.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Delete Template</h1>
      {template ? (
        <>
          <img src={template.display_pic} alt="Template" width="300px" />
          <h2>Price: ₹{template.price}</h2>

         
            <input
              type="text"
              value={tid}
              onChange={(e) => setTid(e.target.value)}
              required
              style={{
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontSize: "14px",
                textAlign: "center",
              }}
            />

           
          
          <button
            onClick={deleteTemplate}
            style={{
              marginTop: "20px",
              padding: "10px",
              fontSize: "16px",
              cursor: "pointer",
              borderRadius: "5px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
            }}
          >
            Delete Template
          </button>

          {message && (
            <p style={{ color: "red", marginTop: "10px" }}>{message}</p>
          )}
        </>
      ) : (
        <p>Loading template...</p>
      )}
    </div>
  );
}
