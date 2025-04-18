"use client";

import { useState, useEffect } from "react";
import Link from "next/link"; // ✅ Import Link
import { useInView } from "react-intersection-observer";

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([]); // Store templates
  const [page, setPage] = useState(1); // Track current page
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Check if more templates exist

  // Detect when user reaches the bottom
  const { ref, inView } = useInView({ threshold: 1 });

  // Fetch Templates on Page Load or Scroll
  useEffect(() => {
    const fetchTemplates = async () => {
      if (!hasMore || loading) return; // Stop if no more templates

      setLoading(true);
      try {
        const res = await fetch(`/api/download-design?page=${page}&limit=10`);
        
        if (!res.ok) throw new Error("Failed to fetch templates");

        const data = await res.json();
        if (data.success) {
          setTemplates((prev) => [...prev, ...data.templates]); // Append new templates
          setHasMore(data.templates.length > 0); // If no new templates, stop
          setPage((prev) => prev + 1); // Increment page
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
      } finally {
        setLoading(false);
      }
    };

    if (inView) fetchTemplates(); // ✅ Only fetch when inView is true
  }, [inView, page]); // ✅ Added `page` dependency

  return (
    <div>
      <h1>Wedding Card Templates</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
        {templates.map((template, index) => (
          <div key={index} style={{ border: "1px solid #ddd", padding: "10px" }}>
            <img src={template.display_pic} alt={template.name} style={{ width: "100%" }} />
            <p>{template.description}</p>
            <Link href={`/Checkout?id=${template._id}`}>
              <button>Buy Now</button>
            </Link>
          </div>
        ))}
      </div>

      {/* Loading Spinner */}
      {loading && <p>Loading more templates...</p>}

      {/* Scroll Trigger */}
      <div ref={ref} style={{ height: "10px", background: "transparent" }}></div>
    </div>
  );
}
