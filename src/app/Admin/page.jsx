"use client";

import { Arapey } from "next/font/google";
import { useState,useEffect } from "react";
import Link from "next/link";

export default function Upload() {
  const [displayPic, setDisplayPic] = useState(null);
  const [template, setTemplate] = useState(null);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [cardtype, setcardType] = useState("Select")

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setDisplayPic(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleTemplateChange = (e) => {
    setTemplate(e.target.files?.[0]);
  };

  const handleTypeChange = (e) => {
    setcardType(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!displayPic || !template || !price || !description ||cardtype=="Select" || !cardtype) {
      alert("All fields are required!");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", displayPic);
    formData.append("template", template);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("cardtype", cardtype)
     console.log({type:cardtype});


    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Template uploaded successfully!");
        setDisplayPic(null);
        setTemplate(null);
        setPrice("");
        setcardType("")
        setDescription("");
        setPreview(null);
      } else {
        alert(data.message || "Upload failed!");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Something went wrong!");
    } finally {
      setIsUploading(false);
    }
  };
  
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
  return (
    <div className="container">
      <h2>Upload Template</h2>

      <form onSubmit={handleSubmit}>
        {/* Display Picture Upload */}
        <label>Display Picture</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        {/* Image Preview */}
        {preview && <img src={preview} alt="Preview" className="preview-img" />}

        {/* Template File Upload */}
        <label>Template File</label>
        <input type="file" onChange={handleTemplateChange} />

        {/* Selecting type of card */}
        <label>Choose card type</label>
        <select onChange={handleTypeChange} value={cardtype} defaultValue={"Select"}>
          <option value="Select" >Select</option>
          <option value="Shaadi-card">Shaadi-card</option>
          <option value="Visiting-card">Visiting card</option>
          <option value="Greeting-card">Greeting card</option>
          <option value="Poster">Poster</option>
          
        </select>

        {/* Price Input */}
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
        />

        {/* Description Input */}
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />

        {/* Submit Button */}
        <button type="submit" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload Template"}
        </button>
      </form>
      <button type="button">Delete all templates</button>
      <div>
        <div className="grid-container">
          {templates.map((template) => (
            <div key={template._id} className="template-card"> {/* ✅ Use unique `_id` */}
              <img src={template.display_pic} alt="Template Preview" className="template-image" />
              <p className="description">{template.description}</p>
              <p className="salesCount" style={{textAlign:'center'}}>Sold copies: {template.salesCount}</p>
              <p className="price">Price: ₹{template.price}</p>
              <Link href={`/removeDelTemp?id=${template._id}`}>
                <button>Delete now</button>
              </Link>
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
            @media screen and (max-width:700px){
             .grid-container{
             display: grid;
             grid-template-columns: repeat(1,1fr);
             }
            }
        `}</style>
      </div>
    </div>
  
);
}
