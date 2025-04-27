"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SidePic from '../app/Images/SidePic.jpg';
export default function Home() {
  const [templates, setTemplates] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, [page]); // ✅ Runs when `page` updates

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/designs?page=${page}`);
      const data = await response.json();

      if (Array.isArray(data.templates)) {
        // ✅ Prevent duplicates
        const newTemplates = data.templates.filter(
          (template) => !templates.some((t) => t._id === template._id)
        );
        setTemplates((prev) => [...prev, ...newTemplates]);
      } else {
        console.error("Invalid data format:", data);
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
    setLoading(false);
  };
//console.log(process.env.NODE_ENV);

  return (
    <div>
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '0', margin: '0'}}>
  <div id="companyName">
    <h1>PrentBala</h1>
  </div>
  <div style={{display: 'flex', alignItems: 'center'}} className="poster-container">
    <Image src={SidePic} width={800} height={200} alt="Poster" id="posterImage"/>
  </div>
</div>

      <h1>Templates</h1>
      <div className="grid-container">
        {templates.map((template) => (
          <div key={template._id} className="template-card"> {/* ✅ Use unique `_id` */}
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
          max-width: 100vw;
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
          @media screen and (max-width:768px){
          .grid-container{
          grid-template-columns:repeat(2,1fr);
          }
          .template-card{
          border: 2px solid grey;
          border-radius: 25px;
          width: 40vw;
          gap: 1px;
          }
          }
      `}</style>
    </div>
  );
}
