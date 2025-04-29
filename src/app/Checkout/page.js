"use client"

import { Suspense, useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import QRCode from "qrcode";

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [template, setTemplate] = useState(null);
  const [tid, setTid] = useState(""); // Transaction ID state
  const [message, setMessage] = useState(""); // Message state
  const qrRef = useRef(null); // Reference for QR code canvas

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

  const generateQR = () => {
    if (!template?.price) {
      console.error("Price is missing");
      return;
    }

    const payee = "7331819171@ybl";
    const pn = "PrintBala";
    const upiUri = `upi://pay?pa=${payee}&pn=${pn}&am=${template.price}&tn=${encodeURIComponent("Shaadi card template amount")}`;

    if (qrRef.current) {
      QRCode.toCanvas(qrRef.current, upiUri, (error) => {
        if (error) console.error("QR Code Error:", error);
      });
    } else {
      console.error("QR code canvas element not found.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tid || tid.length < 12 || tid.length > 20) {
      setMessage("Invalid Transaction ID");
      return;
    }

    try {
      const res = await fetch('/api/download-design', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId: template._id, transactionId: tid })
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
      <h1>Payment Page</h1>
      {template ? (
        <>
          <img src={template.display_pic} alt="Template" width="300px" />
          <h2>Price: ₹{template.price}</h2>

          {/* Flexbox for button and QR code alignment */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginTop: "20px" }}>
            <button
              style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", borderRadius: "5px", backgroundColor: "#007BFF", color: "white", border: "none" }}
              onClick={generateQR}
            >
              Generate QR Code
            </button>
            <canvas ref={qrRef} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "10px" }}></canvas>

            {/* Transaction ID Form */}
            <form onSubmit={handleSubmit} style={{ marginTop: "15px", display: "flex", flexDirection: "column", gap: "8px", width: "300px" }}>
              <label style={{ fontSize: "16px", fontWeight: "bold" }}>Transaction ID:</label>
              <input
                type="text"
                value={tid}
                onChange={(e) => setTid(e.target.value)}
                required
                style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "14px", textAlign: "center" }}
              />
              <button
                type="submit"
                style={{ padding: "10px", fontSize: "16px", cursor: "pointer", borderRadius: "5px", backgroundColor: "#28a745", color: "white", border: "none" }}
              >
                Get Template
              </button>
            </form>
            {message && <p style={{ color: "red", marginTop: "10px" }}>{message}</p>}
          </div>
        </>
      ) : (
        <p>Loading template...</p>
      )}
    </div>
  );
};

export default function PaymentWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentPage />
    </Suspense>
  );
}
