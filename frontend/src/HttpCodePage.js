import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";

function HttpCodePage() {
  const { http_code } = useParams();
  const [excuse, setExcuse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  console.log("HttpCodePage chargé avec http_code :", http_code); // Log initial

  useEffect(() => {
    const fetchExcuse = async () => {
      try {
        console.log("Recherche pour http_code :", http_code);
        const response = await fetch("http://localhost:3001/api/excuses");
        if (!response.ok)
          throw new Error("Erreur lors du chargement des excuses");
        const excuses = await response.json();
        console.log("Excuses récupérées :", excuses);
        const code = parseInt(http_code, 10);
        if (isNaN(code)) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        const foundExcuse = excuses.find((e) => {
          const excuseCode = parseInt(e.http_code, 10);
          console.log(
            `Comparaison : e.http_code=${
              e.http_code
            }, code=${code}, types : ${typeof e.http_code} vs ${typeof code}`
          );
          return excuseCode === code;
        });
        console.log("Excuse trouvée :", foundExcuse);
        if (!foundExcuse) {
          setNotFound(true);
        } else {
          setExcuse(foundExcuse);
        }
        setLoading(false);
      } catch (error) {
        console.error("Erreur:", error);
        setNotFound(true);
        setLoading(false);
      }
    };
    fetchExcuse();
  }, [http_code]);

  if (notFound) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-slide-up">
        Code HTTP {http_code}
      </h1>
      {loading ? (
        <div className="loader mt-8 w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <p className="text-xl md:text-2xl mt-4 text-center max-w-xl px-4 animate-slide-up">
          {excuse ? excuse.message : "Aucune excuse disponible"}
        </p>
      )}
      <Link
        to="/"
        className="mt-6 bg-indigo-500 text-white px-6 py-3 rounded-full hover:bg-indigo-600 transition transform hover:scale-105 shadow-lg">
        Retour à l’accueil
      </Link>
    </div>
  );
}

export default HttpCodePage;
