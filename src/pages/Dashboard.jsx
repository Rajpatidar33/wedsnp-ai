import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function Dashboard() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      setUser(user);

      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Events loading error:", error);
      } else {
        setEvents(data || []);
      }

      setLoading(false);
    };

    loadDashboard();
  }, [navigate]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Logout nahi ho paya.");
      console.error(error);
      return;
    }

    navigate("/login");
  };

  const deleteEvent = async (id) => {
    const { error } = await supabase
      .from("events")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Event delete error:", error);
      alert("Event delete nahi ho paya.");
      return;
    }

    setEvents((previousEvents) =>
      previousEvents.filter((event) => event.id !== id)
    );
  };

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <p className="hero-badge">📊 WebSnpAI Dashboard</p>

        <h1>Your Events</h1>

        <p>
          Welcome back,{" "}
          {user?.user_metadata?.name || user?.email}
        </p>

        <div className="dashboard-actions">
          <Link to="/create-event" className="dashboard-btn">
            ➕ Create New Event
          </Link>

          <button onClick={handleLogout} className="delete-btn">
            🚪 Logout
          </button>
        </div>
      </section>

      <section className="dashboard-grid">
        {events.length === 0 ? (
          <div className="card empty-event">
            <h2>🎉 No Events Yet</h2>

            <p>
              Create your first event to start building your photo gallery.
            </p>

            <Link to="/create-event" className="dashboard-btn">
              Create Event
            </Link>
          </div>
        ) : (
          events.map((event) => (
            <div className="card event-card" key={event.id}>
              <div className="event-icon">🎉</div>

              <h2>{event.name}</h2>

              <p>🎯 Type: {event.event_type}</p>

              <p>
                 📅 Event Date:{" "}
                 {new Date(event.event_date).toLocaleDateString()}
              </p>

              <p>
                🕒 Created:{" "}
                {new Date(event.created_at).toLocaleDateString()}
              </p>

              <div className="event-actions">
                <Link
                to={`/gallery/${event.id}`}
                className="dashboard-btn"
                >
                  📸 Photos
                </Link>

                <button
                  className="delete-btn"
                  onClick={() => deleteEvent(event.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

export default Dashboard;