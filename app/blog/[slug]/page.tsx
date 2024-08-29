"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { poppins } from "@/styles/font";
import axios from "axios";

interface Post {
  id: string;
  title: string;
  desc: string;
  img: string;
  date: string;
  content: string;
  author: string;
}

const DetailBlog: React.FC = () => {
  const { id } = useParams(); // Mengambil ID dari URL
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const BLOG_API_URL = `https://be-cps-laboratory.vercel.app/apiv1/blogs/${id}`;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(BLOG_API_URL, {
          headers: {
            Accept: "application/json",
          },
        });

        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = response.data;
        if (data) {
          const fetchedPost = {
            id: data.id,
            title: data.title || "No Title",
            author: data.author || "Unknown Author",
            desc: data.description || "No Description Available",
            content: data.content || "No Content Available",
            img: data.image_0 || "/default-image.jpg",
            date: data.create_at || "No Date",
          };
          setPost(fetchedPost);
        } else {
          setError("Post not found");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(`Error fetching post from API: ${err.message}`);
        } else {
          setError("An unknown error occurred.");
        }
        console.error("Error fetching post from API:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>{error}</p>;

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <section className={` ${poppins.className}`} style={{ marginTop: "130px", color: "#333" }}>
      <article style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <header>
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <p>{post.date} | {post.author}</p>
        </header>
        <div style={{ margin: "20px 0" }}>
          <img
            src={post.img}
            alt={post.title}
            width={1100}
            height={700}
            style={{ borderRadius: "8px" }}
          />
        </div>
        <section>
          <p>{post.desc}</p>
          <br />
          <p>{post.content}</p>
        </section>
      </article>
    </section>
  );
};

export default DetailBlog;
