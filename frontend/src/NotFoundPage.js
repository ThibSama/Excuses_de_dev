import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white px-4">
      <h1 className="text-6xl md:text-8xl font-extrabold text-red-500 mb-4 animate-shake">
        Oups ! Erreur 404
      </h1>
      <p className="text-xl md:text-2xl text-center max-w-lg mb-8 animate-slide-up">
        Cette page est aussi perdue qu’un dev sans Stack Overflow !
      </p>
      <img
        src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif"
        alt="Erreur 404"
        className="w-48 h-48 md:w-64 md:h-64 rounded-lg shadow-lg mb-8"
      />
      <Link
        to="/"
        className="bg-indigo-500 text-white px-6 py-3 rounded-full hover:bg-indigo-600 transition transform hover:scale-105 shadow-lg">
        Retour à l’accueil
      </Link>
    </div>
  );
}

export default NotFoundPage;
