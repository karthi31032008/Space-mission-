const nasaResources = [
    {
        title: "NASA Mission Design",
        description: "Learn how space missions are planned.",
        url: "https://www.nasa.gov/"
    },
    {
        title: "NASA Solar System Exploration",
        description: "Explore planets, moons and the solar system.",
        url: "https://science.nasa.gov/solar-system/"
    },
    {
        title: "NASA Earth Science",
        description: "Learn about Earth using satellite observations.",
        url: "https://science.nasa.gov/earth/"
    },
    {
        title: "NASA Space Place",
        description: "Simple space science learning resources.",
        url: "https://spaceplace.nasa.gov/"
    }
];

export function setupNASAResources() {
    const databaseButton = document.getElementById("database");
    const infoPanel = document.getElementById("info");
    const closeButton = document.getElementById("closeDatabase");

    if (!databaseButton || !infoPanel || !closeButton) {
        console.warn("NASA panel HTML elements are missing.");
        return;
    }

    // Create resource list inside the existing panel
    let resourceContainer = document.getElementById("nasaResources");

    if (!resourceContainer) {
        resourceContainer = document.createElement("div");
        resourceContainer.id = "nasaResources";
        infoPanel.appendChild(resourceContainer);
    }

    function renderResources(unlocked) {
        resourceContainer.innerHTML = "";

        if (!unlocked) {
            resourceContainer.textContent =
                "Complete the Science Discovery mission to unlock NASA resources.";
            return;
        }

        nasaResources.forEach(resource => {
            const card = document.createElement("div");
            card.style.margin = "12px 0";

            const heading = document.createElement("h3");
            heading.textContent = resource.title;

            const description = document.createElement("p");
            description.textContent = resource.description;

            const link = document.createElement("a");
            link.href = resource.url;
            link.textContent = "Explore Resource";
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            card.append(heading, description, link);
            resourceContainer.appendChild(card);
        });
    }

    let resourcesUnlocked = false;

    renderResources(resourcesUnlocked);

    databaseButton.addEventListener("click", () => {
        infoPanel.style.display =
            infoPanel.style.display === "block" ? "none" : "block";
    });

    closeButton.addEventListener("click", () => {
        infoPanel.style.display = "none";
    });

    return {
        unlock() {
            resourcesUnlocked = true;
            renderResources(resourcesUnlocked);
        }
    };
}
