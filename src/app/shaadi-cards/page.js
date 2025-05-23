"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [templates, setTemplates] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchShaadiTemplates();
  }, [page]); // ✅ Fetch only when page updates

  const fetchShaadiTemplates = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/show-shaadi-cards?page=${page}`);
      const data = await response.json();

      if (Array.isArray(data.templates)) {
        // ✅ Prevent duplicates
        setTemplates((prev) => {
          const newTemplates = data.templates.filter(
            (template) => !prev.some((t) => t._id === template._id)
          );
          return [...prev, ...newTemplates];
        });
      } else {
        console.error("Invalid data format:", data);
      }
    } catch (error) {
      console.error("Error fetching Shaadi templates:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Shaadi Card Templates</h1>
      <div className="grid-container">
        {templates.map((template) => (
          <div key={template._id} className="template-card"> {/* ✅ Ensures unique key */}
            <img src={template.display_pic} alt="Template Preview" className="template-image" />
            <p className="description">{template.description}</p>
            <p className="price">Price: ₹{template.price}</p>
            <a href={`/Checkout?id=${template._id}`}>
              <button>Buy now</button>
            </a>
          </div>
        ))}
      </div>

      <button onClick={() => setPage((prev) => prev + 1)} disabled={loading} className="load-more">
        {loading ? "Loading..." : "Load More"}
      </button>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: auto;
          text-align: center;
          padding: 20px;
        }
        .grid-container {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
          justify-content: center;
        }
        .template-card {
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 15px;
          width: 14vw;
          text-align: center;
          background: #fff;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .template-image {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 5px;
        }
        .description {
          font-size: 14px;
          color: #333;
          margin-top: 10px;
        }
        .price {
          font-size: 16px;
          font-weight: bold;
          color: #007bff;
        }
        .load-more {
          margin-top: 20px;
          padding: 10px 20px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }
        .load-more:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
