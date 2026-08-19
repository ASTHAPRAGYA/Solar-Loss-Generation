// =====================================================
// SOLAR GENERATION LOSS OPTIMIZER
// UNPLANNED MAINTENANCE JAVASCRIPT
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // CONSTANTS
    // =====================================================

    const BRAND_COLOR = "#27A5AD";
    const SUCCESS_COLOR = "#2e9d65";
    const DANGER_COLOR = "#d9534f";

    // =====================================================
    // ELEMENT REFERENCES
    // =====================================================

    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");

    const profileBtn = document.getElementById("profileBtn");
    const profileMenu = document.getElementById("profileMenu");

    // =====================================================
    // SIDEBAR
    // =====================================================

    if (menuBtn && sidebar) {

        menuBtn.addEventListener("click", function (event) {

            event.stopPropagation();

            sidebar.classList.toggle("active");

        });

    }

    // =====================================================
    // SIDEBAR ACTIVE PAGE
    // =====================================================

    if (sidebar) {

        const sidebarLinks =
            sidebar.querySelectorAll("a");

        sidebarLinks.forEach(function (link) {

            const href =
                link.getAttribute("href");

            if (
                href &&
                href.toLowerCase().includes("maintenance.html")
            ) {

                link.classList.add("active");

            }

            // Close sidebar after selecting a page
            link.addEventListener("click", function () {

                if (window.innerWidth <= 1000) {

                    sidebar.classList.remove("active");

                }

            });

        });

    }

    // =====================================================
    // PROFILE DROPDOWN
    // =====================================================

    if (profileBtn && profileMenu) {

        profileBtn.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                const isOpen =
                    profileMenu.classList.contains("show");

                profileMenu.classList.toggle(
                    "show",
                    !isOpen
                );

                // Compatibility with old CSS
                profileMenu.style.display =
                    !isOpen ? "block" : "none";

            }
        );

    }

    // =====================================================
    // CLICK OUTSIDE
    // =====================================================

    document.addEventListener(
        "click",
        function (event) {

            // Close profile menu
            if (
                profileMenu &&
                profileBtn &&
                !profileMenu.contains(event.target) &&
                !profileBtn.contains(event.target)
            ) {

                profileMenu.classList.remove("show");

                profileMenu.style.display = "none";

            }

            // Close sidebar
            if (
                sidebar &&
                menuBtn &&
                sidebar.classList.contains("active") &&
                !sidebar.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {

                sidebar.classList.remove("active");

            }

        }
    );

    // =====================================================
    // ESCAPE KEY
    // =====================================================

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key !== "Escape") {
                return;
            }

            if (sidebar) {

                sidebar.classList.remove("active");

            }

            if (profileMenu) {

                profileMenu.classList.remove("show");

                profileMenu.style.display = "none";

            }

        }
    );


    // =====================================================
    // PRIORITY MAINTENANCE
    // APPROVE / DECLINE
    // =====================================================

    const approveBtn =
        document.getElementById(
            "approveMaintenance"
        );

    const declineBtn =
        document.getElementById(
            "declineMaintenance"
        );

    const priorityStatus =
        document.getElementById(
            "priorityStatus"
        );


    if (approveBtn) {

        approveBtn.addEventListener(
            "click",
            function () {

                if (priorityStatus) {

                    priorityStatus.textContent =
                        "✓ Maintenance prediction approved";

                    priorityStatus.style.color =
                        SUCCESS_COLOR;

                }

                approveBtn.disabled = true;

                if (declineBtn) {

                    declineBtn.disabled = true;

                }

            }
        );

    }


    if (declineBtn) {

        declineBtn.addEventListener(
            "click",
            function () {

                if (priorityStatus) {

                    priorityStatus.textContent =
                        "Maintenance prediction declined";

                    priorityStatus.style.color =
                        DANGER_COLOR;

                }

                declineBtn.disabled = true;

                if (approveBtn) {

                    approveBtn.disabled = true;

                }

            }
        );

    }


    // =====================================================
    // MAINTENANCE PROBABILITY CHART
    // =====================================================

    const probabilityCanvas =
        document.getElementById(
            "maintenanceProbabilityChart"
        );


    if (
        probabilityCanvas &&
        typeof Chart !== "undefined"
    ) {

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

                            borderRadius: 6,

                            backgroundColor:
                                "rgba(39,165,173,0.75)",

                            borderColor:
                                BRAND_COLOR

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    animation: {

                        duration: 700

                    },

                    scales: {

                        y: {

                            beginAtZero: true,

                            max: 100,

                            ticks: {

                                callback:
                                    function (value) {

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

                                label:
                                    function (context) {

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


    // =====================================================
    // DOUGHNUT CHART FUNCTION
    // =====================================================

    function createPieChart(
        canvasId,
        labels,
        values
    ) {

        const canvas =
            document.getElementById(canvasId);

        if (
            !canvas ||
            typeof Chart === "undefined"
        ) {

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

                            borderWidth: 2,

                            hoverOffset: 5

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    cutout: "58%",

                    animation: {

                        duration: 700

                    },

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

                        },

                        tooltip: {

                            callbacks: {

                                label:
                                    function (context) {

                                        const label =
                                            context.label || "";

                                        const value =
                                            context.raw || 0;

                                        return (
                                            " " +
                                            label +
                                            ": " +
                                            value +
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


    // =====================================================
    // INVERTER
    // =====================================================

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


    // =====================================================
    // HT PANEL
    // =====================================================

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


    // =====================================================
    // ICOG
    // =====================================================

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


    // =====================================================
    // TRANSFORMER
    // =====================================================

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


    // =====================================================
    // CABLES
    // =====================================================

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


    // =====================================================
    // SCB
    // =====================================================

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


    // =====================================================
    // SOLAR MODULES
    // =====================================================

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


    // =====================================================
    // ADMIN MAINTENANCE LOG
    // =====================================================

    const addLogBtn =
        document.getElementById(
            "addMaintenanceLog"
        );

    const maintenanceDate =
        document.getElementById(
            "maintenanceDate"
        );

    const maintenanceEquipment =
        document.getElementById(
            "maintenanceEquipment"
        );

    const maintenanceIssue =
        document.getElementById(
            "maintenanceIssue"
        );

    const maintenanceAction =
        document.getElementById(
            "maintenanceAction"
        );

    const maintenanceLoss =
        document.getElementById(
            "maintenanceLoss"
        );

    const adminLogStatus =
        document.getElementById(
            "adminLogStatus"
        );

    const adminLogTable =
        document.getElementById(
            "adminLogTable"
        );


    // =====================================================
    // PREVENT FUTURE DATES
    // =====================================================

    if (maintenanceDate) {

        const today =
            new Date();

        const year =
            today.getFullYear();

        const month =
            String(
                today.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                today.getDate()
            ).padStart(2, "0");

        maintenanceDate.max =
            `${year}-${month}-${day}`;

    }


    // =====================================================
    // ADD MAINTENANCE LOG
    // =====================================================

    if (addLogBtn) {

        addLogBtn.addEventListener(
            "click",
            function () {

                const date =
                    maintenanceDate
                    ? maintenanceDate.value
                    : "";

                const equipment =
                    maintenanceEquipment
                    ? maintenanceEquipment.value
                    : "";

                const issue =
                    maintenanceIssue
                    ? maintenanceIssue.value.trim()
                    : "";

                const action =
                    maintenanceAction
                    ? maintenanceAction.value.trim()
                    : "";

                const loss =
                    maintenanceLoss
                    ? maintenanceLoss.value
                    : "";


                // =================================================
                // REQUIRED FIELD VALIDATION
                // =================================================

                if (
                    date === "" ||
                    equipment === "" ||
                    issue === ""
                ) {

                    showAdminStatus(
                        "⚠ Please complete the required fields.",
                        DANGER_COLOR
                    );

                    return;

                }


                // =================================================
                // FUTURE DATE VALIDATION
                // =================================================

                const selectedDate =
                    new Date(
                        date + "T00:00:00"
                    );

                const today =
                    new Date();

                today.setHours(
                    0,
                    0,
                    0,
                    0
                );


                if (selectedDate > today) {

                    showAdminStatus(
                        "⚠ Future maintenance dates are not allowed.",
                        DANGER_COLOR
                    );

                    return;

                }


                // =================================================
                // LOSS VALIDATION
                // =================================================

                if (loss !== "") {

                    const lossValue =
                        Number(loss);

                    if (
                        isNaN(lossValue) ||
                        lossValue < 0
                    ) {

                        showAdminStatus(
                            "⚠ Loss must be a valid positive value.",
                            DANGER_COLOR
                        );

                        return;

                    }

                }


                // =================================================
                // GET TABLE
                // =================================================

                if (!adminLogTable) {

                    showAdminStatus(
                        "⚠ Maintenance log table not found.",
                        DANGER_COLOR
                    );

                    return;

                }


                const tbody =
                    adminLogTable.querySelector(
                        "tbody"
                    );


                if (!tbody) {

                    showAdminStatus(
                        "⚠ Maintenance log table is invalid.",
                        DANGER_COLOR
                    );

                    return;

                }


                // =================================================
                // CREATE ROW
                // =================================================

                const row =
                    document.createElement("tr");


                const formattedDate =
                    formatDate(date);


                row.innerHTML =

                    "<td>" +
                    escapeHTML(formattedDate) +
                    "</td>" +

                    "<td>" +
                    escapeHTML(equipment) +
                    "</td>" +

                    "<td>" +
                    escapeHTML(
                        loss !== ""
                            ? Number(loss).toFixed(2)
                            : "0.00"
                    ) +
                    " MWh</td>";


                // =================================================
                // ADD TO TOP
                // =================================================

                tbody.insertBefore(
                    row,
                    tbody.firstChild
                );


                // =================================================
                // SUCCESS
                // =================================================

                showAdminStatus(
                    "✓ Maintenance log added successfully.",
                    SUCCESS_COLOR
                );


                // =================================================
                // CLEAR FORM
                // =================================================

                if (maintenanceDate) {

                    maintenanceDate.value = "";

                }

                if (maintenanceEquipment) {

                    maintenanceEquipment.value = "";

                }

                if (maintenanceIssue) {

                    maintenanceIssue.value = "";

                }

                if (maintenanceAction) {

                    maintenanceAction.value = "";

                }

                if (maintenanceLoss) {

                    maintenanceLoss.value = "";

                }


                // =================================================
                // CLEAR STATUS
                // =================================================

                setTimeout(
                    function () {

                        if (adminLogStatus) {

                            adminLogStatus.textContent =
                                "";

                        }

                    },
                    3000
                );

            }
        );

    }


    // =====================================================
    // ADMIN STATUS FUNCTION
    // =====================================================

    function showAdminStatus(
        message,
        color
    ) {

        if (!adminLogStatus) {

            return;

        }

        adminLogStatus.textContent =
            message;

        adminLogStatus.style.color =
            color;

    }


    // =====================================================
    // DATE FORMAT
    // =====================================================

    function formatDate(
        dateString
    ) {

        const date =
            new Date(
                dateString + "T00:00:00"
            );


        if (
            isNaN(
                date.getTime()
            )
        ) {

            return dateString;

        }


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


        return (
            day +
            " " +
            month
        );

    }


    // =====================================================
    // ESCAPE HTML
    // =====================================================

    function escapeHTML(value) {

        return String(value)

            .replace(
                /&/g,
                "&amp;"
            )

            .replace(
                /</g,
                "&lt;"
            )

            .replace(
                />/g,
                "&gt;"
            )

            .replace(
                /"/g,
                "&quot;"
            )

            .replace(
                /'/g,
                "&#039;"
            );

    }


    // =====================================================
    // INITIAL PAGE STATE
    // =====================================================

    // Keep maintenance page visible correctly
    // after loading.

    if (sidebar) {

        sidebar.classList.remove("active");

    }

    if (profileMenu) {

        profileMenu.classList.remove("show");

        profileMenu.style.display = "none";

    }


});
