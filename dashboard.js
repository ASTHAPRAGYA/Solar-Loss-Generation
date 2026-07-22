// ==========================================
// SOLAR GENERATION LOSS OPTIMIZER
// Dashboard JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ===========================
    // Demo Dashboard Data
    // ===========================

    const dashboardData = {

        yesterday:{

            expected:1245,
            actual:1182,
            pr:"84.2%",
            pa:"98.6%",

            weather:{
                poa:"945 W/m²",
                ghi:"910 W/m²",
                temp:"35°C",
                humidity:"48%",
                wind:"5.2 m/s",
                rain:"0 mm"
            }

        },

        week:{

            expected:8420,
            actual:8115,
            pr:"84.8%",
            pa:"98.4%",

            weather:{
                poa:"938 W/m²",
                ghi:"901 W/m²",
                temp:"34°C",
                humidity:"51%",
                wind:"4.8 m/s",
                rain:"2 mm"
            }

        },

        month:{

            expected:36520,
            actual:35210,
            pr:"85.1%",
            pa:"98.9%",

            weather:{
                poa:"928 W/m²",
                ghi:"895 W/m²",
                temp:"33°C",
                humidity:"56%",
                wind:"5.4 m/s",
                rain:"16 mm"
            }

        }

    };

    // ===========================
    // Disable Future Dates
    // ===========================

    const today = new Date().toISOString().split("T")[0];

    document.getElementById("startDate").max = today;
    document.getElementById("endDate").max = today;

    // ===========================
    // Sidebar
    // ===========================

    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");

    menuBtn.addEventListener("click",()=>{

        sidebar.classList.toggle("active");

    });

    // ===========================
    // Profile Dropdown
    // ===========================

    const profileBtn = document.getElementById("profileBtn");
    const profileMenu = document.getElementById("profileMenu");

    profileBtn.addEventListener("click",(e)=>{

        e.stopPropagation();

        profileMenu.style.display =
        profileMenu.style.display==="block"
        ? "none"
        : "block";

    });

    document.addEventListener("click",()=>{

        profileMenu.style.display="none";

    });

    // ===========================
    // Buttons
    // ===========================

    const filters=document.querySelectorAll(".filter");

    filters.forEach(button=>{

        button.addEventListener("click",()=>{

            filters.forEach(btn=>btn.classList.remove("active"));

            button.classList.add("active");

        });

    });

    // ===========================
    // Dashboard Update
    // ===========================

    function updateDashboard(data){

        document.getElementById("expectedGeneration").innerHTML =
        data.expected + " MWh";

        document.getElementById("actualGeneration").innerHTML =
        data.actual + " MWh";

        document.getElementById("generationLoss").innerHTML =
        (data.expected-data.actual)+" MWh";

        document.getElementById("pr").innerHTML =
        data.pr;

        document.getElementById("pa").innerHTML =
        data.pa;

        document.getElementById("poa").innerHTML =
        data.weather.poa;

        document.getElementById("ghi").innerHTML =
        data.weather.ghi;

        document.getElementById("temperature").innerHTML =
        data.weather.temp;

        document.getElementById("humidity").innerHTML =
        data.weather.humidity;

        document.getElementById("wind").innerHTML =
        data.weather.wind;

        document.getElementById("rain").innerHTML =
        data.weather.rain;

    }

    // ===========================
    // Yesterday
    // ===========================

    document.getElementById("btnYesterday")
    .addEventListener("click",()=>{

        document.getElementById("customDateBox").style.display="none";

        updateDashboard(dashboardData.yesterday);

    });

    // ===========================
    // Last Week
    // ===========================

    document.getElementById("btnWeek")
    .addEventListener("click",()=>{

        document.getElementById("customDateBox").style.display="none";

        updateDashboard(dashboardData.week);

    });

    // ===========================
    // Last Month
    // ===========================

    document.getElementById("btnMonth")
    .addEventListener("click",()=>{

        document.getElementById("customDateBox").style.display="none";

        updateDashboard(dashboardData.month);

    });

    // ===========================
    // Custom Date
    // ===========================

    document.getElementById("btnCustom")
    .addEventListener("click",()=>{

        document.getElementById("customDateBox").style.display="flex";

    });
function validateDate(input){

    const today = new Date();

    today.setHours(0,0,0,0);

    const selected = new Date(input.value);

    if(selected > today){

        alert("Future dates cannot be selected.");

        input.value="";

        return false;

    }

    return true;

}
    document.getElementById("startDate")
.addEventListener("change",function(){

    validateDate(this);

});

document.getElementById("endDate")
.addEventListener("change",function(){

    validateDate(this);

});
    // ===========================
    // Apply Custom Date
    // ===========================

    document.getElementById("applyDate")
    .addEventListener("click",()=>{

        const start=document.getElementById("startDate").value;
        const end=document.getElementById("endDate").value;

        if(start==="" || end===""){

            alert("Please select both dates.");

            return;

        }

        if(start>end){

            alert("End Date cannot be before Start Date.");

            return;

        }

        // Demo values
        updateDashboard({

            expected:5220,
            actual:5010,
            pr:"84.5%",
            pa:"98.2%",

            weather:{
                poa:"930 W/m²",
                ghi:"900 W/m²",
                temp:"34°C",
                humidity:"50%",
                wind:"4.7 m/s",
                rain:"5 mm"
            }

        });

    });

    // ===========================
    // Default Dashboard
    // ===========================

    updateDashboard(dashboardData.yesterday);

});
