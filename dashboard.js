// ==========================
// Dashboard dashboardData (Demo)
window.onload=function(){

if(localStorage.getItem("theme")=="dark"){

document.body.classList.add("dark-mode");

}

};
// ==========================
const dashboarddashboardData = {

    yesterday:{

        expected:"1245 MWh",
        actual:"1182 MWh",
        loss:"63 MWh",
        pr:"82.6%",
        health:"96%",

        weather:{
            poa:"945 W/m²",
            ghi:"910 W/m²",
            temp:"35°C",
            wind:"5.2 m/s",
            humidity:"48%",
            rain:"0 mm"
        },

        highestLoss:"SCB",

        chart:[1180,1205,1215,1230,1228,1245]

    },

    week:{

        expected:"8410 MWh",
        actual:"8015 MWh",
        loss:"395 MWh",
        pr:"83.8%",
        health:"95%",

        weather:{
            poa:"928 W/m²",
            ghi:"892 W/m²",
            temp:"34°C",
            wind:"4.6 m/s",
            humidity:"52%",
            rain:"3 mm"
        },

        highestLoss:"Inverter",

        chart:[7700,7820,7905,7990,8015,8050]

    },

    month:{

        expected:"36500 MWh",
        actual:"35120 MWh",
        loss:"1380 MWh",
        pr:"84.5%",
        health:"96.5%",

        weather:{
            poa:"932 W/m²",
            ghi:"900 W/m²",
            temp:"33°C",
            wind:"5.1 m/s",
            humidity:"50%",
            rain:"15 mm"
        },

        highestLoss:"Transformer",

        chart:[33000,33800,34400,34750,35000,35120]

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

    updateDashboard(dashboardData.yesterday);

});

// ==========================
// Last Week
// ==========================
document.getElementById("btnWeek")
.addEventListener("click", function () {

    setActive(this);

    document.getElementById("customRange").style.display = "none";

    updateDashboard(dashboardData.week);

});

// ==========================
// Last Month
// ==========================
document.getElementById("btnMonth")
.addEventListener("click", function () {

    setActive(this);

    document.getElementById("customRange").style.display = "none";

    updateDashboard(dashboardData.month);

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
function updateWeather(weather){

document.getElementById("poa").innerHTML=weather.poa;

document.getElementById("ghi").innerHTML=weather.ghi;

document.getElementById("temp").innerHTML=weather.temp;

document.getElementById("wind").innerHTML=weather.wind;

document.getElementById("humidity").innerHTML=weather.humidity;

document.getElementById("rain").innerHTML=weather.rain;

}
// ==========================
function toggleSidebar() {

    const sidebar = document.getElementById("sidebar");

    if (!sidebar) return;

    sidebar.classList.toggle("expanded");

}

// ==========================
// Dark Mode
function updatePlantFlow(equipment){

document

.querySelectorAll(".plant-node")

.forEach(node=>{

node.classList.remove("danger");

});

const active=document.getElementById(equipment);

if(active){

active.classList.add("danger");

}

}
// ==========================
function toggleDarkMode() {

   document.body.classList.toggle("dark-mode");

localStorage.setItem(

"theme",

document.body.classList.contains("dark-mode")

? "dark"

: "light"

);

}
