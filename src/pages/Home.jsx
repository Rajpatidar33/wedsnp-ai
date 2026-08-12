function Home() {
  return (
    <main className="home">
      <section className="hero">
        <p className="hero-badge">✨ AI-Powered Wedding Photography</p>

        <h1>
          Every Wedding Memory,
          <br />
          <span>One Smart Gallery.</span>
        </h1>

        <p className="hero-text">
          WebSnpAI automatically finds and organizes every guest's photos
          using AI, so everyone can find their memories in seconds.
        </p>

        <div className="hero-buttons">
          <button>Start Free</button>
          <button className="secondary-btn">View Demo</button>
        </div>
      </section>

      <section className="features-section">
        <h2>Everything Your Event Needs</h2>

        <div className="features-grid">
          <div className="card">
            <h3>🤖 AI Face Recognition</h3>
            <p>
              Guests can quickly find photos in which they appear.
            </p>
          </div>

          <div className="card">
            <h3>📱 WhatsApp Sharing</h3>
            <p>
              Share beautiful memories with friends and family instantly.
            </p>
          </div>

          <div className="card">
            <h3>☁️ Smart Cloud Gallery</h3>
            <p>
              Keep your event photos organized in one secure gallery.
            </p>
          </div>
        </div>
      </section>

      <section className="how-section">
        <h2>How It Works</h2>

        <div className="steps-grid">
          <div className="card">
            <span>01</span>
            <h3>Upload</h3>
            <p>Upload your event photos to WebSnpAI.</p>
          </div>

          <div className="card">
            <span>02</span>
            <h3>AI Finds Guests</h3>
            <p>Our AI organizes photos based on faces.</p>
          </div>

          <div className="card">
            <span>03</span>
            <h3>Share Memories</h3>
            <p>Guests instantly discover and share their photos.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;