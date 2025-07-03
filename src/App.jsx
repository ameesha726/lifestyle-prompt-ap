import React, { useState, useRef, useEffect } from 'react';
import './index.css';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [caption, setCaption] = useState('');
  const [captionHistory, setCaptionHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setCaption('');
    if (file) setPreview(URL.createObjectURL(file));
  };

  const clearAll = () => {
    setImage(null);
    setPreview('');
    setCaption('');
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const generateCaption = async () => {
    if (!image) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch("http://localhost:5000/caption", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setCaption(data.caption || 'Could not generate caption.');
      setCaptionHistory(prev => [data.caption, ...prev.slice(0, 2)]);
    } catch (err) {
      console.error("Caption generation error:", err);
      setCaption("❌ Failed to generate caption. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 
      ${darkMode 
        ? 'bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-800' 
        : 'bg-gradient-to-tr from-purple-100 via-white to-pink-100'}
      flex items-center justify-center px-4 py-10`}>

      <div className="w-full max-w-md bg-white dark:bg-zinc-800 text-black dark:text-white 
                      rounded-3xl shadow-2xl p-6 space-y-4 
                      transition-all duration-500 animate-fly-in border-2 dark:border-white">

        <div className="flex justify-between items-center">
          <h1 className="text-xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-purple-400 dark:to-pink-500">
            Lifestyle Prompt Generator
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="p-2 rounded-full border border-gray-300 dark:border-zinc-500 
              bg-slate-200 dark:bg-zinc-700 text-gray-800 dark:text-white 
              hover:bg-slate-300 dark:hover:bg-zinc-600 
              transition-all duration-300 ease-in-out shadow-md relative w-10 h-10 flex items-center justify-center"
          >
            <AnimatePresence mode="wait" initial={false}>
              {darkMode ? (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className="absolute"
                >
                  <Sun className="w-5 h-5" strokeWidth={2} />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className="absolute"
                >
                  <Moon className="w-5 h-5" strokeWidth={2} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageUpload}
          ref={fileInputRef}
          className="w-full text-sm border-2 border-gray-300 dark:border-white rounded px-3 py-1 text-black dark:text-white 
                    file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 
                    file:bg-gray-200 file:text-gray-700 
                    dark:file:bg-zinc-600 dark:file:text-white 
                    hover:file:bg-gray-300 dark:hover:file:bg-zinc-500"
        />

        {preview && (
          <div className="rounded-lg overflow-hidden shadow">
            <img src={preview} alt="Preview" className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300" />
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={generateCaption}
            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-4 rounded-full hover:from-blue-600 hover:to-indigo-600 shadow-md transition-all duration-300"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
          <button
            onClick={clearAll}
            className="bg-red-100 text-red-600 py-2 px-4 rounded-full hover:bg-red-200 transition"
          >
            Clear
          </button>
        </div>

        {caption && (
          <div className="bg-slate-100 dark:bg-zinc-700 p-3 rounded-lg text-sm italic mt-2 transition-all">
            {caption}
          </div>
        )}

        {captionHistory.length > 1 && (
          <div className="mt-4 text-xs text-left">
            <h3 className="font-semibold mb-1 text-gray-600 dark:text-gray-300">Previous Captions:</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-500 dark:text-gray-300">
              {captionHistory.slice(1).map((c, idx) => (
                <li key={idx}>{c}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;