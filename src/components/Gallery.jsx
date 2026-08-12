export default function Gallery() {
  return (
    <section className="gallery">
      <h2>Event Gallery</h2>
      <p className="gallery-subtitle">
        Beautiful memories from weddings, birthdays and corporate events.
      </p>

      <div className="gallery-grid">
        <div className="photo">💍 Wedding</div>
        <div className="photo">🎂 Birthday</div>
        <div className="photo">🏢 Corporate</div>
        <div className="photo">🎉 Reception</div>
        <div className="photo">👨‍👩‍👧 Family</div>
        <div className="photo">📸 Photographer</div>
      </div>
    </section>
  );
}