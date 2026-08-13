// =========================================================
// SOLAR GENERATION LOSS OPTIMIZER
// FORECASTING PAGE
// =========================================================

document.addEventListener("DOMContentLoaded", function () {


    // =====================================================
    // CONSTANTS
    // =====================================================

    const MAX_SOLAR = 191.40;

    const MAX_WIND = 204.75;

    const SCHEDULED_CURTAILMENT = 241.21;


    // =====================================================
    // SIDEBAR
    // =====================================================

    const menuBtn =
        document.getElementById("menuBtn");

    const sidebar =
        document.getElementById("sidebar");


    if (menuBtn && sidebar) {

        menuBtn.addEventListener("click", function (event) {

            event.stopPropagation();

            sidebar.classList.toggle("active");

        });

    }


    // =====================================================
    // PROFILE DROPDOWN
    // =====================================================

    const profileBtn =
        document.getElementById("profileBtn");

    const profileMenu =
        document.getElementById("profileMenu");


    if (profileBtn && profileMenu) {

        profileBtn.addEventListener("click", function (event) {

            event.stopPropagation();

            if (
                profileMenu.style.display === "block"
            ) {

                profileMenu.style.display = "none";

            } else {

                profileMenu.style.display = "block";

            }

        });


        document.addEventListener("click", function () {

            profileMenu.style.display = "none";

        });

    }


    // =====================================================
    // PRIORITY NOTIFICATION
    // =====================================================

    const checkScheduleBtn =
        document.getElementById("checkScheduleBtn");

    const priorityAlert =
        document.getElementById("priorityAlert");


    if (checkScheduleBtn) {

        checkScheduleBtn.addEventListener(
            "click",
            function () {

                if (priorityAlert) {

                    priorityAlert.style.display =
                        "none";

                }

                alert(
                    "Latest HO curtailment schedule:\n\n" +
                    "TRAS Down active — check AS schedule in WBES.\n\n" +
                    "After TRAS Down Total Schedule for " +
                    "13:45 - 14:00 = 241.21 MW"
                );

            }
        );

    }


    // =====================================================
    // CURTAILMENT ALARM
    // =====================================================

    const curtailmentAlarm =
        document.getElementById("curtailmentAlarm");

    const alarmMessage =
        document.getElementById("alarmMessage");


    function checkCurtailmentLimit() {

        const solarInput =
            document.getElementById("solarLoad");

        const windInput =
            document.getElementById("windLoad");


        if (!solarInput || !windInput) {

            return;

        }


        const solar =
            parseFloat(solarInput.value) || 0;

        const wind =
            parseFloat(windInput.value) || 0;


        const total =
            solar + wind;


        if (total > SCHEDULED_CURTAILMENT) {

            if (curtailmentAlarm) {

                curtailmentAlarm.classList.add("show");

            }


            if (alarmMessage) {

                alarmMessage.innerHTML =
                    "Solar + Wind load is " +
                    total.toFixed(2) +
                    " MW, which exceeds the scheduled " +
                    "curtailment limit of " +
                    SCHEDULED_CURTAILMENT.toFixed(2) +
                    " MW.";

            }

        } else {

            if (curtailmentAlarm) {

                curtailmentAlarm.classList.remove("show");

            }

        }

    }


    // =====================================================
    // LOAD VALIDATION
    // =====================================================

    const solarInput =
        document.getElementById("solarLoad");

    const windInput =
        document.getElementById("windLoad");

    const loadStatus =
        document.getElementById("loadStatus");


    function validateSolar() {

        if (!solarInput) {

            return false;

        }


        const value =
            parseFloat(solarInput.value);


        if (isNaN(value)) {

            return true;

        }


        if (value < 0) {

            solarInput.setCustomValidity(
                "Solar load cannot be negative."
            );

            return false;

        }


        if (value > MAX_SOLAR) {

            solarInput.setCustomValidity(
                "Maximum Solar load is 191.40 MW."
            );

            if (loadStatus) {

                loadStatus.innerHTML =
                    "⚠ Solar load cannot exceed 191.40 MW.";

                loadStatus.style.color =
                    "#d93025";

            }

            return false;

        }


        solarInput.setCustomValidity("");

        return true;

    }


    function validateWind() {

        if (!windInput) {

            return false;

        }


        const value =
            parseFloat(windInput.value);


        if (isNaN(value)) {

            return true;

        }


        if (value < 0) {

            windInput.setCustomValidity(
                "Wind load cannot be negative."
            );

            return false;

        }


        if (value > MAX_WIND) {

            windInput.setCustomValidity(
                "Maximum Wind load is 204.75 MW."
            );

            if (loadStatus) {

                loadStatus.innerHTML =
                    "⚠ Wind load cannot exceed 204.75 MW.";

                loadStatus.style.color =
                    "#d93025";

            }

            return false;

        }


        windInput.setCustomValidity("");

        return true;

    }


    if (solarInput) {

        solarInput.addEventListener(
            "input",
            function () {

                validateSolar();

                checkCurtailmentLimit();

            }
        );

    }


    if (windInput) {

        windInput.addEventListener(
            "input",
            function () {

                validateWind();

                checkCurtailmentLimit();

            }
        );

    }


    // =====================================================
    // SUBMIT LOAD
    // =====================================================

    const submitLoadBtn =
        document.getElementById("submitLoadBtn");


    if (submitLoadBtn) {

        submitLoadBtn.addEventListener(
            "click",
            function () {

                const solar =
                    parseFloat(
                        solarInput.value
                    );

                const wind =
                    parseFloat(
                        windInput.value
                    );


                // -----------------------------------------
                // Empty check
                // -----------------------------------------

                if (
                    solarInput.value === "" ||
                    windInput.value === ""
                ) {

                    loadStatus.innerHTML =
                        "⚠ Please enter both Solar and Wind load.";

                    loadStatus.style.color =
                        "#d93025";

                    return;

                }


                // -----------------------------------------
                // Solar maximum
                // -----------------------------------------

                if (solar > MAX_SOLAR) {

                    loadStatus.innerHTML =
                        "⚠ Solar load cannot exceed 191.40 MW.";

                    loadStatus.style.color =
                        "#d93025";

                    solarInput.focus();

                    return;

                }


                // -----------------------------------------
                // Wind maximum
                // -----------------------------------------

                if (wind > MAX_WIND) {

                    loadStatus.innerHTML =
                        "⚠ Wind load cannot exceed 204.75 MW.";

                    loadStatus.style.color =
                        "#d93025";

                    windInput.focus();

                    return;

                }


                // -----------------------------------------
                // Negative values
                // -----------------------------------------

                if (
                    solar < 0 ||
                    wind < 0
                ) {

                    loadStatus.innerHTML =
                        "⚠ Load cannot be negative.";

                    loadStatus.style.color =
                        "#d93025";

                    return;

                }


                // -----------------------------------------
                // Update summary
                // -----------------------------------------

                const summarySolar =
                    document.getElementById(
                        "summarySolar"
                    );

                const summaryWind =
                    document.getElementById(
                        "summaryWind"
                    );


                if (summarySolar) {

                    summarySolar.innerHTML =
                        solar.toFixed(2) + " MW";

                }


                if (summaryWind) {

                    summaryWind.innerHTML =
                        wind.toFixed(2) + " MW";

                }


                // -----------------------------------------
                // Check total curtailment
                // -----------------------------------------

                const total =
                    solar + wind;


                if (
                    total > SCHEDULED_CURTAILMENT
                ) {

                    loadStatus.innerHTML =
                        "⚠ Load entered, but Solar + Wind " +
                        "exceeds scheduled curtailment.";

                    loadStatus.style.color =
                        "#d93025";

                } else {

                    loadStatus.innerHTML =
                        "✓ Load successfully recorded for " +
                        "13:45 - 14:00.";

                    loadStatus.style.color =
                        "#27A5AD";

                }


                // -----------------------------------------
                // Save demo data
                // -----------------------------------------

                localStorage.setItem(
                    "forecastSolarLoad",
                    solar
                );

                localStorage.setItem(
                    "forecastWindLoad",
                    wind
                );


                checkCurtailmentLimit();

            }
        );

    }


    // =====================================================
    // RESTORE SAVED LOAD
    // =====================================================

    const savedSolar =
        localStorage.getItem(
            "forecastSolarLoad"
        );

    const savedWind =
        localStorage.getItem(
            "forecastWindLoad"
        );


    if (
        savedSolar &&
        solarInput
    ) {

        solarInput.value =
            savedSolar;

    }


    if (
        savedWind &&
        windInput
    ) {

        windInput.value =
            savedWind;

    }


    if (
        savedSolar ||
        savedWind
    ) {

        const summarySolar =
            document.getElementById(
                "summarySolar"
            );

        const summaryWind =
            document.getElementById(
                "summaryWind"
            );


        if (
            savedSolar &&
            summarySolar
        ) {

            summarySolar.innerHTML =
                Number(savedSolar).toFixed(2) +
                " MW";

        }


        if (
            savedWind &&
            summaryWind
        ) {

            summaryWind.innerHTML =
                Number(savedWind).toFixed(2) +
                " MW";

        }

    }


    checkCurtailmentLimit();


    // =====================================================
    // TAG HEAD OFFICE
    // =====================================================

    const tagHOBtn =
        document.getElementById("tagHOBtn");

    const tagModal =
        document.getElementById("tagModal");

    const closeTagModal =
        document.getElementById("closeTagModal");

    const sendHOMsg =
        document.getElementById("sendHOMsg");


    if (tagHOBtn && tagModal) {

        tagHOBtn.addEventListener(
            "click",
            function () {

                tagModal.classList.add("show");

            }
        );

    }


    if (closeTagModal) {

        closeTagModal.addEventListener(
            "click",
            function () {

                tagModal.classList.remove("show");

            }
        );

    }


    if (sendHOMsg) {

        sendHOMsg.addEventListener(
            "click",
            function () {

                const contact =
                    document.getElementById(
                        "hoContact"
                    ).value;

                const message =
                    document.getElementById(
                        "hoMessage"
                    ).value.trim();

                const status =
                    document.getElementById(
                        "hoStatus"
                    );


                if (contact === "") {

                    status.innerHTML =
                        "⚠ Please select a Head Office contact.";

                    status.style.color =
                        "#d93025";

                    return;

                }


                if (message === "") {

                    status.innerHTML =
                        "⚠ Please enter a message.";

                    status.style.color =
                        "#d93025";

                    return;

                }


                status.innerHTML =
                    "✓ Notification sent to Head Office.";

                status.style.color =
                    "#27A5AD";

            }
        );

    }


    // =====================================================
    // CHAT
    // =====================================================

    const chatHOBtn =
        document.getElementById("chatHOBtn");

    const chatModal =
        document.getElementById("chatModal");

    const closeChatModal =
        document.getElementById(
            "closeChatModal"
        );

    const sendChatBtn =
        document.getElementById(
            "sendChatBtn"
        );

    const chatMessage =
        document.getElementById(
            "chatMessage"
        );

    const chatWindow =
        document.getElementById(
            "chatWindow"
        );


    if (chatHOBtn) {

        chatHOBtn.addEventListener(
            "click",
            function () {

                chatModal.classList.add("show");

            }
        );

    }


    if (closeChatModal) {

        closeChatModal.addEventListener(
            "click",
            function () {

                chatModal.classList.remove("show");

            }
        );

    }


    function sendChatMessage() {

        const message =
            chatMessage.value.trim();


        if (message === "") {

            return;

        }


        const box =
            document.createElement("div");


        box.className =
            "chat-message sent";


        box.innerHTML =
            "<strong>Site Team</strong>" +
            "<p>" +
            escapeHTML(message) +
            "</p>" +
            "<span>Now</span>";


        chatWindow.appendChild(box);


        chatMessage.value = "";


        chatWindow.scrollTop =
            chatWindow.scrollHeight;

    }


    if (sendChatBtn) {

        sendChatBtn.addEventListener(
            "click",
            sendChatMessage
        );

    }


    if (chatMessage) {

        chatMessage.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    sendChatMessage();

                }

            }
        );

    }


    // =====================================================
    // PHOTO UPLOAD
    // =====================================================

    const uploadPhotoBtn =
        document.getElementById(
            "uploadPhotoBtn"
        );

    const sitePhotoInput =
        document.getElementById(
            "sitePhotoInput"
        );

    const selectedPhotoName =
        document.getElementById(
            "selectedPhotoName"
        );


    if (uploadPhotoBtn) {

        uploadPhotoBtn.addEventListener(
            "click",
            function () {

                sitePhotoInput.click();

            }
        );

    }


    if (sitePhotoInput) {

        sitePhotoInput.addEventListener(
            "change",
            function () {

                if (
                    !sitePhotoInput.files ||
                    sitePhotoInput.files.length === 0
                ) {

                    return;

                }


                const file =
                    sitePhotoInput.files[0];


                if (
                    !file.type.startsWith("image/")
                ) {

                    alert(
                        "Please select an image file."
                    );

                    sitePhotoInput.value = "";

                    return;

                }


                if (selectedPhotoName) {

                    selectedPhotoName.innerHTML =
                        "Selected: " +
                        file.name;

                }


                // Show uploaded photo

                const placeholder =
                    document.getElementById(
                        "photoPlaceholder1300"
                    );


                if (placeholder) {

                    const imageURL =
                        URL.createObjectURL(file);


                    placeholder.innerHTML = "";


                    const img =
                        document.createElement(
                            "img"
                        );


                    img.src =
                        imageURL;

                    img.alt =
                        "Uploaded site weather photograph";

                    img.style.width =
                        "100%";

                    img.style.height =
                        "100%";

                    img.style.objectFit =
                        "cover";

                    img.style.borderRadius =
                        "7px";


                    placeholder.appendChild(img);

                }

            }
        );

    }


    // =====================================================
    // WEATHER REPORTS
    // =====================================================

    setupWeatherSubmission(
        "sendWeather1315",
        "comment1315",
        "status1315",
        "13:15 - 13:30"
    );


    setupWeatherSubmission(
        "sendWeather1300",
        "comment1300",
        "status1300",
        "13:00 - 13:15"
    );


    function setupWeatherSubmission(
        buttonId,
        commentId,
        statusId,
        interval
    ) {

        const button =
            document.getElementById(buttonId);

        const comment =
            document.getElementById(commentId);

        const status =
            document.getElementById(statusId);


        if (!button) {

            return;

        }


        button.addEventListener(
            "click",
            function () {

                const text =
                    comment
                    ? comment.value.trim()
                    : "";


                if (text === "") {

                    status.innerHTML =
                        "⚠ Please add a comment before sending.";

                    status.style.color =
                        "#d93025";

                    return;

                }


                status.innerHTML =
                    "✓ Weather report submitted for " +
                    interval;

                status.style.color =
                    "#27A5AD";


                localStorage.setItem(
                    "weatherComment_" + interval,
                    text
                );

            }
        );

    }


    // =====================================================
    // CLOSE MODALS
    // =====================================================

    window.addEventListener(
        "click",
        function (event) {

            if (
                event.target === tagModal
            ) {

                tagModal.classList.remove("show");

            }


            if (
                event.target === chatModal
            ) {

                chatModal.classList.remove("show");

            }

        }
    );


    // =====================================================
    // ESC KEY
    // =====================================================

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                if (tagModal) {

                    tagModal.classList.remove("show");

                }

                if (chatModal) {

                    chatModal.classList.remove("show");

                }

                if (profileMenu) {

                    profileMenu.style.display =
                        "none";

                }

            }

        }
    );


    // =====================================================
    // HTML ESCAPE
    // =====================================================

    function escapeHTML(value) {

        return value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }

});
