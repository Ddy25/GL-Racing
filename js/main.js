const menuButton = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

menuButton.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    if(navMenu.classList.contains("active")){
        menuButton.textContent="✕";
    }else{
        menuButton.textContent="☰";
    }

});

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