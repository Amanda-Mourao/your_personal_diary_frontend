import { useState } from "react";
import { createPost } from "../components/AllRequest";
import { MdSave } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function PostForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    content: "",
    cover: "",
    status: "",
    category: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const categoryIcons = {
    Adventure: "🧗‍♂️",
    Relaxation: "🌴",
    Culture: "🏛️",
    Nature: "🌲",
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
      const response = await createPost(formData);
      setFormData((prev) => ({ ...prev, ...response.data }));

      setError(null);
      setSuccess(true);
      if (onSuccess) onSuccess();

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error creating:", error);
      setError("Creation failed.");
    }
    Swal.fire({
      toast: true,
      position: "center",
      icon: "success",
      title: "Your form has been submitten",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <form
        className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg border border-purple-200"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-6 text-xl sm:text-2xl font-bold text-gray-600 text-center">
          Create new post
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

        <div className="pt-6 border-t border-purple-200 mt-6">
          <button
            onClick={() => navigate(-1)}
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
            Post saved successfully!
          </p>
        )}
      </form>
    </div>
  );
}
