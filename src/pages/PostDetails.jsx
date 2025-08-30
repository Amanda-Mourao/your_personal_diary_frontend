import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById } from "../components/AllRequest";
import { BiArrowBack } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import Spinner from "../components/Spinner";

const categoryIcons = {
  Adventure: "🧗‍♂️",
  Relaxation: "🌴",
  Culture: "🏛️",
  Nature: "🌲",
};

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPostById(id);
        setPost(res.data.data);
      } catch (err) {
        console.error("Error loading post:", err);
        setError("Post not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading)
    return (
      <div className="text-center m-10">
        <Spinner size="large" />
      </div>
    );
  if (error) return <p className="text-gray-600 text-center m-10">{error}</p>;
  if (!post) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg border border-purple-200">
        <div className="space-y-6">
          {/* Header with title and edit button */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-600 leading-tight">
              {post.title}
            </h1>
            <button
              onClick={() => navigate(`/posts/${id}/edit`)}
              className="w-full sm:w-auto flex justify-center gap-2 font-bold items-center 
                         bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 
                         px-4 py-2 text-white rounded-lg transition-all duration-200 
                         transform hover:scale-105 shadow-lg"
            >
              <FiEdit size={18} />
              Edit
            </button>
          </div>

          {/* Author and Status info */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm sm:text-base">
            <span className="text-purple-600 font-bold">by {post.author}</span>
            <span className="text-gray-400">•</span>
            <span className="flex items-center gap-1 text-gray-600">
              📋 Post is{" "}
              <strong className="text-purple-600">{post.status}</strong>
            </span>
          </div>

          {/* Cover Image */}
          <div className="w-full">
            <img
              src={post.cover}
              alt={post.title}
              className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg border border-purple-300 shadow-md"
            />
          </div>

          {/* Content */}
          <div className="prose max-w-none">
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>

          {/* Category */}
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <span className="text-gray-600 font-bold">Category:</span>
            {post.category ? (
              <span className="flex items-center gap-1 text-purple-600 font-medium">
                {categoryIcons[post.category] || "❓"} {post.category}
              </span>
            ) : (
              <span className="text-gray-500">No category</span>
            )}
          </div>

          {/* Back Button */}
          <div className="pt-4 border-t border-purple-200">
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto flex justify-center gap-2 font-bold items-center 
                         bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 
                         px-6 py-3 text-white rounded-lg transition-all duration-200 
                         transform hover:scale-105 shadow-lg"
            >
              <BiArrowBack size={20} />
              Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
