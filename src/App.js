import { useState } from "react";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [words, setWords] = useState("");
  const [options, setOptions] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const convertToOptions = () => {
    const wordsArray = words.split(/[,\n]/);
    const optionsArray = wordsArray.map((word) => ({
      label: word.trim(),
      value: word.trim().toLowerCase().replace(/\s+/g, "-"),
    }));
    setOptions(optionsArray);
  };
  const handleClearClick = () => {
    setWords("");
    setOptions([]);
  };
  const handleCopy = () => {
    copy(JSON.stringify(options, null, 2));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  const handleModeChange = () => {
    setIsDarkMode(!isDarkMode);
  };
  const handlePaste = (event) => {
    const pastedText = event.clipboardData.getData("text/plain");
    if (/[^\w\s&]/.test(pastedText)) {
      toast.error("Special symbols are not allowed");
      event.preventDefault();
    }
  };

  return (
    <div
      className={`flex flex-col h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <header className="bg-black dark:bg-gray-800 p-4 flex justify-center items-center">
        <h1 className="text-lg font-semibold text-white dark:text-white italic transform hover:-translate-y-0.5 hover:shadow-lg transition-all">
          Words to Option Converter
        </h1>
      </header>
      <main className="flex-grow flex flex-col md:flex-row p-4">
        <div className="flex-1 p-2">
          <textarea
            className="w-full h-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-white"
            placeholder="Enter words separated by commas or new lines"
            value={words}
            onPaste={handlePaste}
            onChange={(e) => setWords(e.target.value)}
          />
        </div>
        <div className="flex-1 p-2 overflow-auto">
          <pre className="overflow-y-scroll h-96 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg p-2 whitespace-pre-wrap">
            {JSON.stringify(options, null, 2)}
          </pre>
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-md shadow-md transition-colors duration-300 ease-in-out"
            onClick={convertToOptions}
          >
            Convert
          </button>
          {options.length > 0 || words ? (
            <button
              class="ml-2 px-4 mr-2 py-2 bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-white rounded-md shadow-md transition-colors duration-300 ease-in-out"
              onClick={handleClearClick}
            >
              Clear
            </button>
          ) : (
            <div></div>
          )}
          {options.length > 0 ? (
            <button
              className={`mt-2 py-2 px-4 rounded-md bg-blue-500 text-white focus:outline-none hover:bg-blue-600 ${
                isCopied ? "bg-green-500" : ""
              } shadow-lg hover:shadow-xl transition duration-300 transform-gpu ${
                isCopied ? "translate-y-0.5" : ""
              }`}
              onClick={handleCopy}
            >
              {isCopied ? "Copied!" : "Copy to Clipboard"}
              {/* <ClipboardIcon className="inline-block w-4 h-4 ml-2" /> */}
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </main>
      <footer className="text-center py-4 bg-black dark:bg-gray-900">
        <p className="font-bold italic text-white transform hover:translate-y-px hover:shadow-lg hover:duration-300">
          Developed by Shubham Sahu
        </p>
      </footer>
      <button
        className={`fixed bottom-4 right-4 rounded-full bg-gray-200 dark:bg-gray-700 p-2 focus:outline-none shadow-md ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}
        onClick={handleModeChange}
      >
        {isDarkMode ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v.01M18 12l-6-6M6 12l6-6M8.5 15a3.5 3.5 0 110-7 3.5 3.5 0 010 7z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
export default App;
