// =====================================================
// SOLAR GENERATION LOSS OPTIMIZER
// PLANT CLEANING OPTIMISATION JAVASCRIPT
// =====================================================

document.addEventListener("DOMContentLoaded", function () {


    // =====================================================
    // CONSTANTS
    // =====================================================

    const CLEANING_START_HOUR = 0;
    const MORNING_END_HOUR = 6;

    const EVENING_START_HOUR = 18;
    const CLEANING_END_HOUR = 24;


    // =====================================================
    // SIDEBAR
    // =====================================================

    const menuBtn =
        document.getElementById("menuBtn");

    const sidebar =
        document.getElementById("sidebar");


    if (menuBtn && sidebar) {

        menuBtn.addEventListener(
            "click",
            function () {

                sidebar.classList.toggle("active");

            }
        );

    }


    // =====================================================
    // PROFILE DROPDOWN
    // =====================================================

    const profileBtn =
        document.getElementById("profileBtn");

    const profileMenu =
        document.getElementById("profileMenu");


    if (profileBtn && profileMenu) {

        profileBtn.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                profileMenu.style.display =
                    profileMenu.style.display === "block"
                    ? "none"
                    : "block";

            }
        );

    }


    document.addEventListener(
        "click",
        function () {

            if (profileMenu) {

                profileMenu.style.display = "none";

            }

        }
    );


    // =====================================================
    // CLEANING SCHEDULE
    // =====================================================

    /*
        Demo schedule.

        This can later be replaced with actual
        block-wise cleaning data from your plant.
    */

    const cleaningSchedule = [

        {
            id: 1,
            block: "Block 15",
            activity: "Module Cleaning",
            dueDate: "18 Aug 2026",
            reason: "Soiling accumulation",
            status: "due"
        },

        {
            id: 2,
            block: "Block 15",
            activity: "Grass Cutting",
            dueDate: "18 Aug 2026",
            reason: "Vegetation near module rows",
            status: "due"
        },

        {
            id: 3,
            block: "Block 12",
            activity: "Module Cleaning",
            dueDate: "19 Aug 2026",
            reason: "Cleaning cycle due",
            status: "due"
        },

        {
            id: 4,
            block: "Block 8",
            activity: "Grass Cutting",
            dueDate: "20 Aug 2026",
            reason: "Vegetation growth",
            status: "due"
        },

        {
            id: 5,
            block: "Block 20",
            activity: "Module Cleaning",
            dueDate: "21 Aug 2026",
            reason: "High soiling risk",
            status: "due"
        },

        {
            id: 6,
            block: "Block 7",
            activity: "Grass Cutting",
            dueDate: "22 Aug 2026",
            reason: "ROW vegetation",
            status: "due"
        }

    ];


    // =====================================================
    // FORECASTING CONNECTION
    // =====================================================

    function getSolarGeneration() {

        const savedSolar =
            localStorage.getItem(
                "forecastSolarLoad"
            );


        if (
            savedSolar === null ||
            savedSolar === ""
        ) {

            return 0;

        }


        const value =
            parseFloat(savedSolar);


        return isNaN(value)
            ? 0
            : value;

    }


    // =====================================================
    // CHECK CLEANING TIME
    // =====================================================

    function isCleaningTime() {

        const now =
            new Date();

        const hour =
            now.getHours();


        /*
            Allowed:
            00:00 - 05:59
            18:00 - 23:59
        */

        return (
            hour < MORNING_END_HOUR ||
            hour >= EVENING_START_HOUR
        );

    }


    // =====================================================
    // CHECK WHETHER CLEANING CAN BE PROCESSED
    // =====================================================

    function canProcessCleaning() {

        const solarGeneration =
            getSolarGeneration();


        /*
            BOTH conditions must be satisfied:

            1. Solar generation = 0
            2. Current time is permitted
        */

        return (
            solarGeneration <= 0 &&
            isCleaningTime()
        );

    }


    // =====================================================
    // GENERATION ALERT
    // =====================================================

    function updateGenerationStatus() {

        const solarGeneration =
            getSolarGeneration();


        const forecastStatus =
            document.getElementById(
                "forecastStatus"
            );


        const currentSolar =
            document.getElementById(
                "currentSolarGeneration"
            );


        const generationAlert =
            document.getElementById(
                "generationAlert"
            );


        const alertTitle =
            document.getElementById(
                "generationAlertTitle"
            );


        const alertMessage =
            document.getElementById(
                "generationAlertMessage"
            );


        if (currentSolar) {

            currentSolar.textContent =
                solarGeneration.toFixed(2) +
                " MW";

        }


        /*
            CASE 1:
            Solar generation > 0
        */

        if (solarGeneration > 0) {

            if (forecastStatus) {

                forecastStatus.textContent =
                    solarGeneration.toFixed(2) +
                    " MW — GENERATING";

                forecastStatus.style.color =
                    "#d9534f";

            }


            if (generationAlert) {

                generationAlert.classList.add("show");

            }


            if (alertTitle) {

                alertTitle.textContent =
                    "Cleaning cannot be processed currently";

            }


            if (alertMessage) {

                alertMessage.textContent =
                    "Cleaning for the due areas cannot be processed now due to high generation. Cleaning is permitted only when solar generation is 0 MW.";

            }

        }

        /*
            CASE 2:
            Solar generation = 0
        */

        else {

            if (forecastStatus) {

                forecastStatus.textContent =
                    "0.00 MW — NO GENERATION";

                forecastStatus.style.color =
                    "#2e9d65";

            }


            if (generationAlert) {

                generationAlert.classList.remove("show");

            }

        }

    }


    // =====================================================
    // RENDER CLEANING TABLE
    // =====================================================

    function renderCleaningTable() {

        const tbody =
            document.getElementById(
                "cleaningTableBody"
            );


        if (!tbody) {

            return;

        }


        tbody.innerHTML = "";


        const solarGeneration =
            getSolarGeneration();


        const cleaningAllowed =
            canProcessCleaning();


        let dueCount = 0;

        let moduleCount = 0;

        let grassCount = 0;

        let completedCount = 0;


        cleaningSchedule.forEach(
            function (item) {


                /*
                    Check whether this particular
                    activity has already been completed.
                */

                const completed =
                    localStorage.getItem(
                        "cleaningCompleted_" +
                        item.id
                    ) === "true";


                if (completed) {

                    completedCount++;

                }


                if (!completed) {

                    dueCount++;


                    if (
                        item.activity ===
                        "Module Cleaning"
                    ) {

                        moduleCount++;

                    }


                    if (
                        item.activity ===
                        "Grass Cutting"
                    ) {

                        grassCount++;

                    }

                }


                const row =
                    document.createElement("tr");


                // -----------------------------------------
                // STATUS
                // -----------------------------------------

                let statusHTML = "";

                let actionHTML = "";


                if (completed) {

                    statusHTML =
                        '<span class="status-pill status-ready">' +
                        '<i class="fas fa-check"></i>' +
                        ' Completed' +
                        '</span>';


                    actionHTML =
                        '<button class="clean-btn" disabled>' +
                        'Completed' +
                        '</button>';

                }

                else if (
                    solarGeneration > 0
                ) {

                    statusHTML =
                        '<span class="status-pill status-blocked">' +
                        '<i class="fas fa-ban"></i>' +
                        ' Blocked — Generation' +
                        '</span>';


                    actionHTML =
                        '<button class="clean-btn" disabled>' +
                        'Generation > 0' +
                        '</button>';

                }

                else if (
                    !isCleaningTime()
                ) {

                    statusHTML =
                        '<span class="status-pill status-blocked">' +
                        '<i class="fas fa-clock"></i>' +
                        ' Outside Window' +
                        '</span>';


                    actionHTML =
                        '<button class="clean-btn" disabled>' +
                        'Wait for Window' +
                        '</button>';

                }

                else {

                    statusHTML =
                        '<span class="status-pill status-due">' +
                        '<i class="fas fa-exclamation-circle"></i>' +
                        ' Due — Ready' +
                        '</span>';


                    actionHTML =
                        '<button class="clean-btn process-cleaning" ' +
                        'data-id="' +
                        item.id +
                        '">' +
                        'Mark Completed' +
                        '</button>';

                }


                // -----------------------------------------
                // ROW
                // -----------------------------------------

                row.innerHTML =

                    "<td>" +
                    "<strong>" +
                    item.block +
                    "</strong>" +
                    "</td>" +

                    "<td>" +
                    item.activity +
                    "</td>" +

                    "<td>" +
                    item.dueDate +
                    "</td>" +

                    "<td>" +
                    item.reason +
                    "</td>" +

                    "<td>" +
                    statusHTML +
                    "</td>" +

                    "<td>" +
                    actionHTML +
                    "</td>";


                tbody.appendChild(row);

            }
        );


        // =================================================
        // SUMMARY
        // =================================================

        const totalDue =
            document.getElementById(
                "totalDue"
            );

        const moduleDue =
            document.getElementById(
                "moduleDue"
            );

        const grassDue =
            document.getElementById(
                "grassDue"
            );

        const completedElement =
            document.getElementById(
                "completedCount"
            );


        if (totalDue) {

            totalDue.textContent =
                dueCount;

        }


        if (moduleDue) {

            moduleDue.textContent =
                moduleCount;

        }


        if (grassDue) {

            grassDue.textContent =
                grassCount;

        }


        if (completedElement) {

            completedElement.textContent =
                completedCount;

        }


        // =================================================
        // BUTTON EVENTS
        // =================================================

        const buttons =
            document.querySelectorAll(
                ".process-cleaning"
            );


        buttons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const id =
                            this.dataset.id;


                        const solar =
                            getSolarGeneration();


                        /*
                            Double-check generation
                            before allowing completion.
                        */

                        if (solar > 0) {

                            alert(
                                "Cleaning cannot be processed because solar generation is currently " +
                                solar.toFixed(2) +
                                " MW.\n\nCleaning is permitted only when generation is 0 MW."
                            );

                            updateGenerationStatus();

                            renderCleaningTable();

                            return;

                        }


                        if (!isCleaningTime()) {

                            alert(
                                "Cleaning can only be carried out before 06:00 AM or after 06:00 PM."
                            );

                            return;

                        }


                        localStorage.setItem(
                            "cleaningCompleted_" +
                            id,
                            "true"
                        );


                        addActivityToHistory(
                            id,
                            solar
                        );


                        renderCleaningTable();

                    }
                );

            }
        );

    }


    // =====================================================
    // ADD ACTIVITY TO HISTORY
    // =====================================================

    function addActivityToHistory(
        id,
        generation
    ) {

        const item =
            cleaningSchedule.find(
                function (record) {

                    return (
                        record.id ==
                        id
                    );

                }
            );


        if (!item) {

            return;

        }


        const history =
            document.getElementById(
                "activityHistory"
            );


        if (!history) {

            return;

        }


        const row =
            document.createElement("tr");


        const now =
            new Date();


        const date =
            now.toLocaleDateString(
                "en-GB",
                {
                    day:"2-digit",
                    month:"short",
                    year:"numeric"
                }
            );


        row.innerHTML =

            "<td>" +
            date +
            "</td>" +

            "<td>" +
            item.block +
            "</td>" +

            "<td>" +
            item.activity +
            "</td>" +

            "<td>" +
            "Sidduppa Bohvi" +
            "</td>" +

            "<td>" +
            generation.toFixed(2) +
            " MW" +
            "</td>" +

            '<td>' +
            '<span class="status-completed">' +
            'Completed' +
            '</span>' +
            '</td>';


        history.insertBefore(
            row,
            history.firstChild
        );

    }


    // =====================================================
    // INITIALISE
    // =====================================================

    updateGenerationStatus();

    renderCleaningTable();


    // =====================================================
    // AUTO REFRESH FORECASTING DATA
    // =====================================================

    /*
        Forecasting can be changed in another tab.

        Therefore, periodically check localStorage
        for changes.

        This means the Cleaning page automatically
        updates when the forecasting load changes.
    */

    setInterval(
        function () {

            updateGenerationStatus();

            renderCleaningTable();

        },
        5000
    );


    // =====================================================
    // STORAGE EVENT
    // =====================================================

    /*
        If Forecasting is open in another browser tab,
        this catches the localStorage update immediately.
    */

    window.addEventListener(
        "storage",
        function (event) {

            if (
                event.key ===
                "forecastSolarLoad"
            ) {

                updateGenerationStatus();

                renderCleaningTable();

            }

        }
    );


});
