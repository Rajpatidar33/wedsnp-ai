import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

function CreateEvent() {
  const navigate = useNavigate();

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventType, setEventType] = useState("Wedding");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventName || !eventDate) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    const { error } = await supabase.from("events").insert([
      {
        name: eventName,
        event_type: eventType,
        event_date: eventDate,
        user_id: user.id,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error("Event creation error:", error);
      alert(error.message);
      return;
    }

    alert(`Event "${eventName}" created successfully!`);

    navigate("/dashboard");
  };

  return (
    <main className="create-event-page">
      <section className="event-form-container">
        <p className="hero-badge">🎉 Create Your Event</p>

        <h1>Create Event</h1>

        <p className="form-subtitle">
          Create a new event and start collecting beautiful memories.
        </p>

        <form onSubmit={handleSubmit} className="event-form">
          <label>Event Name</label>

          <input
            type="text"
            placeholder="Enter event name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />

          <label>Event Type</label>

          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option>Wedding</option>
            <option>Birthday</option>
            <option>Engagement</option>
            <option>Corporate Event</option>
            <option>Other</option>
          </select>

          <label>Event Date</label>

          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default CreateEvent;