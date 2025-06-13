import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LostPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 animate-slide-up">
        I’m lost
      </h1>
      <img
        src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzcwcXlzdGw0b25pYjJhYmsxZzc3b3p6cTdmd3ltb3ZhaTJwZXBjaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7aCTPPm4OHfRLSH6/giphy.gif"
        alt="Lost GIF"
        className="w-64 h-64 rounded-lg shadow-lg"
      />
    </div>
  );
}

export default LostPage;
