const menuButton = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".site-nav");

if (menuButton && navMenu) {
    const closeMenu = () => {
        navMenu.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Открыть меню");
    };

    menuButton.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("is-open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
        if (isOpen) navMenu.querySelector("a")?.focus();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && navMenu.classList.contains("is-open")) {
            closeMenu();
            menuButton.focus();
        }
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".site-header")) closeMenu();
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1100) closeMenu();
    });
}

// ==========================
// Турнирная таблица
// ==========================

async function loadStandings() {

    const table = document.getElementById("standings-body");

    // Если таблицы нет на странице — ничего не делаем
    if (!table) return;

    try {

        const response = await fetch("data/championship.json");
        const pilots = await response.json();

        // считаем сумму очков
        const standings = pilots.map(pilot => {

            const total = pilot.stages.reduce((sum, points) => sum + points, 0);

            return {
                name: pilot.pilot,
                total: total
            };

        });

        // сортировка
        standings.sort((a, b) => b.total - a.total);

        table.innerHTML = "";

        standings.forEach((pilot, index) => {

            table.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${pilot.name}</td>
                    <td>${pilot.total}</td>
                </tr>
            `;

        });

    } catch (error) {

        console.error("Ошибка загрузки championship.json", error);

    }

}
loadStandings();
