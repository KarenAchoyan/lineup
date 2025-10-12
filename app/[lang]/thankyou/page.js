export default function ThankYouPage({ params }) {
  const lang = params?.lang || "en";

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-2">Thank you!</h1>
      <p className="text-gray-700 mb-4">Thank you for contacting us. We will get back to you soon.</p>

      <a
        href={`/${lang}`}
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Home
      </a>
    </div>
  );
}


