// =====================================================
// SOLAR GENERATION LOSS OPTIMIZER
// UNPLANNED MAINTENANCE JAVASCRIPT
// =====================================================

document.addEventListener("DOMContentLoaded", function () {
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



    // =================================================
    // PRIORITY MAINTENANCE
    // APPROVE / DISAPPROVE
    // =================================================

    const approveBtn =
        document.getElementById("approveMaintenance");

    const declineBtn =
        document.getElementById("declineMaintenance");

    const priorityStatus =
        document.getElementById("priorityStatus");


    if (approveBtn) {

        approveBtn.addEventListener("click", function () {

            priorityStatus.textContent =
                "Maintenance approved";

            priorityStatus.style.color =
                "#2e9d65";

            approveBtn.disabled = true;

            if (declineBtn) {

                declineBtn.disabled = true;

            }

        });

    }


    if (declineBtn) {

        declineBtn.addEventListener("click", function () {

            priorityStatus.textContent =
                "Maintenance prediction declined";

            priorityStatus.style.color =
                "#d9534f";

            declineBtn.disabled = true;

            if (approveBtn) {

                approveBtn.disabled = true;

            }

        });

    }


    // =================================================
    // MAINTENANCE PROBABILITY CHART
    // =================================================

    const probabilityCanvas =
        document.getElementById(
            "maintenanceProbabilityChart"
        );


    if (probabilityCanvas) {

        new Chart(

            probabilityCanvas,

            {

                type: "bar",

                data: {

                    labels: [

                        "Inverter",
                        "HT Panel",
                        "ICOG",
                        "Transformer",
                        "Cables",
                        "SCB",
                        "Solar Modules"

                    ],

                    datasets: [

                        {

                            label:
                                "Maintenance Risk Probability (%)",

                            data: [

                                72,
                                48,
                                36,
                                28,
                                31,
                                64,
                                69

                            ],

                            borderWidth: 1,

                            borderRadius: 6

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    animation: {

                        duration: 800

                    },

                    scales: {

                        y: {

                            beginAtZero: true,

                            max: 100,

                            ticks: {

                                callback: function (value) {

                                    return value + "%";

                                }

                            },

                            title: {

                                display: true,

                                text:
                                    "Probability (%)"

                            }

                        },

                        x: {

                            title: {

                                display: true,

                                text:
                                    "Equipment"

                            }

                        }

                    },

                    plugins: {

                        legend: {

                            display: false

                        },

                        tooltip: {

                            callbacks: {

                                label: function (context) {

                                    return (
                                        " Risk: " +
                                        context.raw +
                                        "%"
                                    );

                                }

                            }

                        }

                    }

                }

            }

        );

    }


    // =================================================
    // PIE CHART FUNCTION
    // =================================================

    function createPieChart(
        canvasId,
        labels,
        values
    ) {

        const canvas =
            document.getElementById(canvasId);

        if (!canvas) {

            return;

        }


        new Chart(

            canvas,

            {

                type: "doughnut",

                data: {

                    labels: labels,

                    datasets: [

                        {

                            data: values,

                            borderWidth: 2

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    cutout: "58%",

                    plugins: {

                        legend: {

                            position: "bottom",

                            labels: {

                                boxWidth: 10,

                                padding: 8,

                                font: {

                                    size: 9

                                }

                            }

                        }

                    }

                }

            }

        );

    }


    // =================================================
    // INVERTER
    // =================================================

    createPieChart(

        "inverterPie",

        [

            "Communication Loss",
            "DC Fault",
            "Temperature",
            "Control Card",
            "Other"

        ],

        [

            35,
            25,
            18,
            14,
            8

        ]

    );


    // =================================================
    // HT PANEL
    // =================================================

    createPieChart(

        "htPanelPie",

        [

            "Protection Trip",
            "Breaker Issue",
            "Relay Issue",
            "Electrical Fault",
            "Other"

        ],

        [

            28,
            23,
            20,
            19,
            10

        ]

    );


    // =================================================
    // ICOG
    // =================================================

    createPieChart(

        "icogPie",

        [

            "Communication",
            "Control Issue",
            "Electrical Fault",
            "Auxiliary Supply",
            "Other"

        ],

        [

            31,
            24,
            22,
            13,
            10

        ]

    );


    // =================================================
    // TRANSFORMER
    // =================================================

    createPieChart(

        "transformerPie",

        [

            "Temperature",
            "Oil Related",
            "Protection",
            "Bushing",
            "Other"

        ],

        [

            30,
            24,
            21,
            15,
            10

        ]

    );


    // =================================================
    // CABLES
    // =================================================

    createPieChart(

        "cablesPie",

        [

            "Insulation",
            "Joint Issue",
            "Physical Damage",
            "Overheating",
            "Other"

        ],

        [

            29,
            25,
            20,
            16,
            10

        ]

    );


    // =================================================
    // SCB
    // =================================================

    createPieChart(

        "scbPie",

        [

            "Fuse Failure",
            "String Issue",
            "Communication",
            "DC Connection",
            "Other"

        ],

        [

            32,
            27,
            18,
            14,
            9

        ]

    );


    // =================================================
    // SOLAR MODULES
    // =================================================

    createPieChart(

        "modulesPie",

        [

            "Physical Crack",
            "Hotspot",
            "PID",
            "Junction Box",
            "Other"

        ],

        [

            34,
            24,
            17,
            15,
            10

        ]

    );


    // =================================================
    // ADMIN MAINTENANCE LOG
    // =================================================

    const addLogBtn =
        document.getElementById(
            "addMaintenanceLog"
        );


    if (addLogBtn) {

        addLogBtn.addEventListener(
            "click",
            function () {

                const date =
                    document.getElementById(
                        "maintenanceDate"
                    ).value;

                const equipment =
                    document.getElementById(
                        "maintenanceEquipment"
                    ).value;

                const issue =
                    document.getElementById(
                        "maintenanceIssue"
                    ).value.trim();

                const action =
                    document.getElementById(
                        "maintenanceAction"
                    ).value.trim();

                const loss =
                    document.getElementById(
                        "maintenanceLoss"
                    ).value;


                const status =
                    document.getElementById(
                        "adminLogStatus"
                    );


                // -------------------------------------
                // VALIDATION
                // -------------------------------------

                if (
                    date === "" ||
                    equipment === "" ||
                    issue === ""
                ) {

                    status.textContent =
                        "Please complete the required fields.";

                    status.style.color =
                        "#d9534f";

                    return;

                }


                // -------------------------------------
                // TABLE
                // -------------------------------------

                const table =
                    document.getElementById(
                        "adminLogTable"
                    );


                const tbody =
                    table.querySelector("tbody");


                const row =
                    document.createElement("tr");


                const formattedDate =
                    formatDate(date);


                row.innerHTML =

                    "<td>" +
                    formattedDate +
                    "</td>" +

                    "<td>" +
                    equipment +
                    "</td>" +

                    "<td>" +
                    (loss || "0") +
                    " MWh" +
                    "</td>";


                tbody.insertBefore(
                    row,
                    tbody.firstChild
                );


                // -------------------------------------
                // SUCCESS MESSAGE
                // -------------------------------------

                status.textContent =
                    "Maintenance log added.";

                status.style.color =
                    "#2e9d65";


                // -------------------------------------
                // CLEAR FORM
                // -------------------------------------

                document.getElementById(
                    "maintenanceDate"
                ).value = "";

                document.getElementById(
                    "maintenanceEquipment"
                ).value = "";

                document.getElementById(
                    "maintenanceIssue"
                ).value = "";

                document.getElementById(
                    "maintenanceAction"
                ).value = "";

                document.getElementById(
                    "maintenanceLoss"
                ).value = "";


                // -------------------------------------
                // REMOVE MESSAGE
                // -------------------------------------

                setTimeout(function () {

                    status.textContent = "";

                }, 3000);

            }
        );

    }


    // =================================================
    // DATE FORMAT
    // =================================================

    function formatDate(dateString) {

        const date =
            new Date(dateString + "T00:00:00");


        const day =
            String(
                date.getDate()
            ).padStart(2, "0");


        const month =
            date.toLocaleString(
                "en-US",
                {
                    month: "short"
                }
            );


        return day + " " + month;

    }


    // =================================================
    // PREVENT FUTURE MAINTENANCE LOG DATES
    // =================================================

    const maintenanceDate =
        document.getElementById(
            "maintenanceDate"
        );


    if (maintenanceDate) {

        const today =
            new Date()
            .toISOString()
            .split("T")[0];

        maintenanceDate.max = today;

    }


});
