// ==========================
// Dashboard Data (Demo)
// ==========================
const data = {
    yesterday: {
        expected: "1245 MWh",
        actual: "1182 MWh",
        loss: "63 MWh",
        pr: "82.6%",
        health: "96%"
    },

    week: {
        expected: "8410 MWh",
        actual: "8015 MWh",
        loss: "395 MWh",
        pr: "83.8%",
        health: "95%"
    },

    month: {
        expected: "36500 MWh",
        actual: "35120 MWh",
        loss: "1380 MWh",
        pr: "84.5%",
        health: "96.5%"
    }
};

// ==========================
// Activate Selected Button
// ==========================
function setActive(button) {

    document.querySelectorAll(".filter-btn")
        .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

}

// ==========================
// Animate KPI Update
// ==========================
function animateValue(id, value) {

    const el = document.getElementById(id);

    if (!el) return;

    el.classList.add("fade");

    setTimeout(() => {

        el.innerHTML = value;

        el.classList.remove("fade");

    }, 200);

}

// ==========================
// Update Dashboard
// ==========================
function updateDashboard(d) {

    animateValue("expected", d.expected);
    animateValue("actual", d.actual);
    animateValue("loss", d.loss);
    animateValue("pr", d.pr);
    animateValue("health", d.health);

}

// ==========================
// Yesterday
// ==========================
document.getElementById("btnYesterday")
.addEventListener("click", function () {

    setActive(this);

    document.getElementById("customRange").style.display = "none";

    updateDashboard(data.yesterday);

});

// ==========================
// Last Week
// ==========================
document.getElementById("btnWeek")
.addEventListener("click", function () {

    setActive(this);

    document.getElementById("customRange").style.display = "none";

    updateDashboard(data.week);

});

// ==========================
// Last Month
// ==========================
document.getElementById("btnMonth")
.addEventListener("click", function () {

    setActive(this);

    document.getElementById("customRange").style.display = "none";

    updateDashboard(data.month);

});

// ==========================
// Custom Date
// ==========================
document.getElementById("btnCustom")
.addEventListener("click", function () {

    setActive(this);

    document.getElementById("customRange").style.display = "flex";

});

// ==========================
// Apply Custom Range
// ==========================
document.getElementById("applyRange")
.addEventListener("click", function () {

    const start = document.getElementById("startDate").value;
    const end = document.getElementById("endDate").value;

    if (start === "" || end === "") {

        alert("Please select both dates.");

        return;

    }

    // Demo values
    updateDashboard({

        expected: "5120 MWh",
        actual: "4890 MWh",
        loss: "230 MWh",
        pr: "84.1%",
        health: "95.8%"

    });

});

// ==========================
// Notification Drawer
// ==========================
function toggleNotification() {

    const panel = document.getElementById("notificationPanel");

    if (!panel) return;

    panel.classList.toggle("show");

}

// ==========================
// Sidebar
// ==========================
function toggleSidebar() {

    const sidebar = document.getElementById("sidebar");

    if (!sidebar) return;

    sidebar.classList.toggle("open");

}

// ==========================
// Dark Mode
// ==========================
function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

}
