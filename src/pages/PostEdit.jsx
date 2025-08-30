import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost } from "../components/AllRequest";
import { MdSave } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import Swal from "sweetalert2";
import Spinner from "../components/Spinner";

const categoryIcons = {
  Adventure: "🧗‍♂️",
  Relaxation: "🌴",
  Culture: "🏛️",
  Nature: "🌲",
};

export default function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    cover: "",
    content: "",
    category: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPostById(id);
        setPost(res.data.data);
        setFormData({
          title: res.data.data.title,
          author: res.data.data.author,
          cover: res.data.data.cover,
          content: res.data.data.content,
          category: res.data.data.category,
          status: res.data.data.status,
        });
      } catch (err) {
        console.error("Error loading post:", err);
        setError("Post not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.author ||
      !formData.title ||
      !formData.content ||
      !formData.cover ||
      !formData.status
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      await updatePost(id, formData);
      setError(null);
      setSuccess(true);

      setTimeout(() => setSuccess(false), 3000);

      Swal.fire({
        toast: true,
        position: "center",
        icon: "success",
        title: "Post has been updated",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });

      navigate("/");
    } catch (err) {
      console.error("Error updating:", err);
      setError("Update failed.");
    }
  };

  if (loading)
    return (
      <div className="text-center m-10">
        <Spinner size="large" />
      </div>
    );
  if (error && !formData.title)
    return <p className="text-purple-600 text-center m-10">{error}</p>;
  if (!post) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <form
        className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg border border-purple-200"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-6 text-xl sm:text-2xl font-bold text-gray-600 text-center">
          Edit post
        </h2>

        {error && <p className="text-purple-600 mb-4 text-center">{error}</p>}

        <div className="space-y-4">
          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Autor*in"
            className="w-full border border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                       text-gray-600 px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-all duration-200"
          />

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Titel"
            required
            className="w-full border border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                       text-gray-600 px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-all duration-200"
          />

          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Inhalt"
            required
            rows={4}
            className="w-full border border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                       text-gray-600 px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-all duration-200 resize-vertical"
          />

          <input
            name="cover"
            value={formData.cover}
            onChange={handleChange}
            placeholder="Bild-URL"
            required
            className="w-full border border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                       text-gray-600 px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-all duration-200"
          />

          {formData.cover && (
            <div className="mt-4">
              <img
                src={formData.cover}
                alt="Preview"
                className="w-full h-48 sm:h-52 md:h-64 object-cover border border-purple-300 rounded-lg"
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="category"
                className="text-gray-600 block font-bold mb-2"
              >
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                           text-purple-600 px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-all duration-200"
              >
                <option value="">-- Select Category --</option>
                {Object.entries(categoryIcons).map(([cat, icon]) => (
                  <option key={cat} value={cat}>
                    {icon} {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="status"
                className="text-gray-600 block font-bold mb-2"
              >
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full border border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                           text-purple-600 px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-all duration-200"
              >
                <option value="">-- Select Status --</option>
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-purple-200 mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto flex justify-center gap-2 font-bold items-center 
                       bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 
                       px-6 py-3 text-white rounded-lg transition-all duration-200 
                       transform hover:scale-105 shadow-lg"
          >
            <BiArrowBack size={20} />
            Go back
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto flex justify-center gap-2 font-bold items-center 
                       bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 
                       px-6 py-3 text-white rounded-lg transition-all duration-200 
                       transform hover:scale-105 shadow-lg"
          >
            <MdSave size={20} />
            Save
          </button>
        </div>

        {success && (
          <p className="text-purple-600 text-lg font-semibold text-center mt-4">
            Post updated successfully!
          </p>
        )}
      </form>
    </div>
  );
}
