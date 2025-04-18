"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [templates, setTemplates] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchShaadiTemplates();
  }, [page]); // Fetch when page updates

  const fetchShaadiTemplates = async () => {
    setLoading(true);
    try {
        const response = await fetch(`/api/show-visiting-cards?page=${page}`);
        const data = await response.json();
    
        if (Array.isArray(data.templates)) {
          setTemplates((prev) => {
            const mergedTemplates = [...prev, ...data.templates];
    
            // Remove duplicates based on `_id`
            const uniqueTemplates = Array.from(new Map(mergedTemplates.map(t => [t._id, t])).values());
    
            return uniqueTemplates;
          });
        }
     } catch (error) {
      console.error("Error fetching poster templates:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Visiting card  Templates</h1>
      <div className="grid-container">
        {templates.map((template) => (
          <div key={template._id} className="template-card">
            <img src={template.display_pic} alt="Template Preview" className="template-image" />
            <p className="description">{template.description}</p>
            <p className="price">Price: ₹{template.price}</p>
            <Link href={`/Checkout?id=${template._id}`}>
              <button>Buy now</button>
            </Link>
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
