export default function Pricing() {
  return (
    <section className="pricing">
      <h2>Simple Pricing</h2>
      <p className="pricing-subtitle">
        Choose the perfect plan for your event.
      </p>

      <div className="pricing-grid">

        <div className="card">
          <h3>Basic</h3>
          <h1>₹999</h1>
          <p>✔ Up to 500 Photos</p>
          <p>✔ AI Face Search</p>
          <p>✔ 7 Days Gallery</p>

          <button>Select Plan</button>
        </div>

        <div className="card premium">
          <span className="badge">Most Popular</span>

          <h3>Premium</h3>
          <h1>₹2499</h1>

          <p>✔ Unlimited Photos</p>
          <p>✔ AI Face Search</p>
          <p>✔ WhatsApp Sharing</p>
          <p>✔ QR Code Access</p>
          <p>✔ 1 Year Gallery</p>

          <button>Select Plan</button>
        </div>

      </div>
    </section>
  );
}