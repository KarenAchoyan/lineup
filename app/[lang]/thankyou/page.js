export default function ThankYouPage({ searchParams, params }) {
  const orderId = searchParams?.order_id || "";
  const userId = searchParams?.user_id || "";
  const email = searchParams?.email || "";
  const lang = params?.lang || "en";

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-2">Thank you!</h1>
      <p className="text-gray-700 mb-4">Your payment was received successfully.</p>

      {orderId ? (
        <div className="mb-4 text-sm text-gray-600">
          <div><span className="font-medium">Order ID:</span> {orderId}</div>
          {userId ? <div><span className="font-medium">User ID:</span> {userId}</div> : null}
          {email ? <div><span className="font-medium">Email:</span> {email}</div> : null}
        </div>
      ) : null}

      <a
        href={`/${lang}`}
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Home
      </a>
    </div>
  );
}


