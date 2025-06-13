import React, { useState, useEffect } from "react";

function MainPage() {
  const [excuse, setExcuse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastExcuseId, setLastExcuseId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ tag_id: "", message: "" });
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const [notification, setNotification] = useState(null);

  const fetchRandomExcuse = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await fetch("http://localhost:3001/api/excuses");
        const excuses = await response.json();
        let randomExcuse;
        do {
          randomExcuse = excuses[Math.floor(Math.random() * excuses.length)];
        } while (randomExcuse.id === lastExcuseId && excuses.length > 1);
        setExcuse(randomExcuse);
        setLastExcuseId(randomExcuse.id);
        setLoading(false);
      } catch (error) {
        setExcuse({ message: "Erreur lors du chargement" });
        setLoading(false);
      }
    }, Math.random() * 4000 + 1000);
  };

  const fetchTags = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/tags");
      if (!response.ok) throw new Error("Erreur lors du chargement des tags");
      const data = await response.json();
      setTags(data);
    } catch (error) {
      console.error("Erreur lors du chargement des tags:", error);
      setError("Impossible de charger les tags");
    }
  };

  const handleAddExcuse = async (e) => {
    e.preventDefault();
    if (!formData.tag_id || !formData.message) {
      setError("Tous les champs sont requis");
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/api/excuses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tag_id: parseInt(formData.tag_id),
          message: formData.message,
        }),
      });
      if (!response.ok) throw new Error("Erreur lors de l’ajout");
      const newExcuse = await response.json();
      setIsModalOpen(false);
      setFormData({ tag_id: "", message: "" });
      setError(null);
      setExcuse(newExcuse);
      setLastExcuseId(newExcuse.id);
      setNotification({
        type: "success",
        message: "Excuse ajoutée avec succès !",
      });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      setError("Erreur lors de l’ajout de l’excuse");
      setNotification({
        type: "error",
        message: "Erreur lors de l’ajout de l’excuse",
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  useEffect(() => {
    fetchRandomExcuse();
    fetchTags();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".title")?.classList.add("fade-in");
      setTimeout(() => {
        document.querySelector(".title")?.classList.add("move-up");
        document.querySelector(".button-container")?.classList.add("fade-in");
      }, 2000);
    }, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <h1 className="title text-5xl md:text-6xl font-extrabold tracking-tight text-center">
        Les Excuses de Dev
      </h1>
      {loading ? (
        <div className="loader mt-8 w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <p className="excuse text-xl md:text-2xl mt-8 text-center max-w-xl px-4 animate-slide-up">
          {excuse ? excuse.message : "Aucune excuse disponible"}
        </p>
      )}
      <div className="button-container mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          className="bg-indigo-500 text-white px-6 py-3 rounded-full hover:bg-indigo-600 transition transform hover:scale-105 shadow-lg"
          onClick={fetchRandomExcuse}>
          Générer une autre excuse
        </button>
        <button
          className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition transform hover:scale-105 shadow-lg"
          onClick={() => setIsModalOpen(true)}>
          Ajouter une excuse
        </button>
      </div>

      {notification && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-full-lg shadow-lg text-white animate-slide-in ${
            notification.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}>
          {notification.message}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Ajouter une nouvelle excuse
            </h2>
            <form onSubmit={handleAddExcuse}>
              <div className="mb-4">
                <label htmlFor="tag_id" className="block text-gray-300">
                  Tag
                </label>
                <select
                  id="tag_id"
                  name="tag_id"
                  value={formData.tag_id}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-600 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">Sélectionnez un tag</option>
                  {tags.length > 0 ? (
                    tags.map((tag) => (
                      <option key={tag.id} value={tag.id}>
                        {tag.name}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      Chargement des tags...
                    </option>
                  )}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-600 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Ex. Test excuse"
                />
              </div>
              {error && <p className="text-red-400 mb-4">{error}</p>}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition"
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormData({ tag_id: "", message: "" });
                    setError(null);
                  }}>
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition">
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;
