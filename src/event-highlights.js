
async function loadUpcomingEvents() {
  const grid = document.getElementById("upcoming-events-grid");

  if (!grid) return;

  try {
    const response = await fetch("/events.json");

    if (!response.ok) {
      throw new Error("Could not load events.json");
    }

    const events = await response.json();

    if (!Array.isArray(events) || events.length === 0) {
      grid.textContent = "No events available right now.";
      return;
    }

    grid.replaceChildren();

    events.forEach(function (event) {
      const card = document.createElement("article");
      card.className = "upcoming-event-card";

      if (event.image) {
        const image = document.createElement("img");
        image.className = "upcoming-event-image";
        image.src = event.image;
        image.alt = event.title || "Event image";
        image.loading = "lazy";

        image.addEventListener("error", function () {
          image.remove();
        });

        card.appendChild(image);
      }

      const content = document.createElement("div");
      content.className = "upcoming-event-content";

      const title = document.createElement("h4");
      title.className = "upcoming-event-title";
      title.textContent = event.title || "Untitled event";

      const details = document.createElement("p");
      details.className = "upcoming-event-details";
      details.textContent = [event.date, event.location]
        .filter(Boolean)
        .join(" • ");

      const description = document.createElement("p");
      description.className = "upcoming-event-description";
      description.textContent = event.description || "";

      const status = document.createElement("p");
      status.className = "upcoming-event-status";
      status.textContent = event.status || "Details to be announced";

      content.append(title, details, description, status);

      if (event.registrationUrl) {
        const link = document.createElement("a");
        link.className = "upcoming-event-register";
        link.href = event.registrationUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Register";

        content.appendChild(link);
      }

      card.appendChild(content);
      grid.appendChild(card);
    });

  } catch (error) {
    console.error("Event loading error:", error);
    grid.textContent =
      "Events could not be loaded. Please try again later.";
  }
}

loadUpcomingEvents();
