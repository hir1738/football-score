import Fixtures from "./components/Fixtures";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
          Football Fixtures
        </h1>
        <div className="shadow-2xl rounded-2xl overflow-hidden">
          <Fixtures />
        </div>
      </div>
    </div>
  );
}
