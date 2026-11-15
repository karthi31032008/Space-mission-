
const nasaResources = [
    {
        title: "NASA Official Website",
        description: "Explore NASA missions and discoveries.",
        url: "https://www.nasa.gov/"
    },
    {
        title: "Solar System Exploration",
        description: "Explore planets, moons and space.",
        url: "https://science.nasa.gov/solar-system/"
    },
    {
        title: "NASA Images",
        description: "Discover space images and astronomy.",
        url: "https://images.nasa.gov/"
    },
    {
        title: "NASA Mars Exploration",
        description: "Learn about Mars missions.",
        url: "https://science.nasa.gov/mars/"
    }
];

export function setupNASAResources() {

    const container = document.createElement('div');

    container.id = 'nasa-resources';

    container.innerHTML = `
        <h3>NASA SPACE RESOURCES</h3>
        <ul>
            ${nasaResources.map(resource => `
                <li>
                    <a href="${resource.url}"
                       target="_blank"
                       rel="noopener noreferrer">
                        ${resource.title}
                    </a>
                    <p>${resource.description}</p>
                </li>
            `).join('')}
        </ul>
    `;

    container.style.position = 'absolute';
    container.style.right = '15px';
    container.style.top = '100px';
    container.style.zIndex = '5';
    container.style.padding = '15px';
    container.style.background = 'rgba(0,0,20,0.85)';
    container.style.color = 'white';
    container.style.border = '1px solid #00ccff';
    container.style.borderRadius = '10px';
    container.style.maxWidth = '220px';

    document.body.appendChild(container);

    return container;
}
