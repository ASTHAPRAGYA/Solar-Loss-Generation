// ============================================================
// SOLAR GENERATION LOSS OPTIMIZER
// FORECASTING JAVASCRIPT
// ============================================================

document.addEventListener("DOMContentLoaded", function () {


    // ========================================================
    // CONSTANTS
    // ========================================================

    const SOLAR_MAX = 191.40;
    const WIND_MAX = 204.75;
    const SCHEDULED_CURTAILMENT = 241.21;


    // ========================================================
    // ELEMENTS
    // ========================================================

    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");

    const profileBtn = document.getElementById("profileBtn");
    const profileMenu = document.getElementById("profileMenu");

    const solarInput = document.getElementById("solarLoad");
    const windInput = document.getElementById("windLoad");

    const summarySolar = document.getElementById("summarySolar");
    const summaryWind = document.getElementById("summaryWind");

    const loadStatus = document.getElementById("loadStatus");
    const curtailmentAlarm = document.getElementById("curtailmentAlarm");
    const alarmMessage = document.getElementById("alarmMessage");

    const submitLoadBtn = document.getElementById("submitLoadBtn");

    const uploadPhotoBtn = document.getElementById("uploadPhotoBtn");
    const sitePhotoInput = document.getElementById("sitePhotoInput");
    const selectedPhotoName =
        document.getElementById("selectedPhotoName");

    const tagHOBtn = document.getElementById("tagHOBtn");
    const chatHOBtn = document.getElementById("chatHOBtn");

    const tagModal = document.getElementById("tagModal");
    const chatModal = document.getElementById("chatModal");

    const closeTagModal =
        document.getElementById("closeTagModal");

    const closeChatModal =
        document.getElementById("closeChatModal");

    const sendHOMsg =
        document.getElementById("sendHOMsg");

    const hoStatus =
        document.getElementById("hoStatus");

    const sendChatBtn =
        document.getElementById("sendChatBtn");

    const chatMessage =
        document.getElementById("chatMessage");

    const chatWindow =
        document.getElementById("chatWindow");



    // ========================================================
    // SIDEBAR
    // ========================================================

    if (menuBtn && sidebar) {

        menuBtn.addEventListener("click", function (event) {

            event.stopPropagation();

            sidebar.classList.toggle("active");

        });

    }


    // Close sidebar when clicking outside

    document.addEventListener("click", function (event) {

        if (!sidebar || !menuBtn) return;

        if (
            sidebar.classList.contains("active") &&
            !sidebar.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {

            sidebar.classList.remove("active");

        }

    });



    // ========================================================
    // PROFILE DROPDOWN
    // ========================================================

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

    }


    document.addEventListener("click", function () {

        if (profileMenu) {

            profileMenu.style.display = "none";

        }

    });



    // ========================================================
    // LOAD VALIDATION
    // ========================================================

    function getNumber(input) {

        if (!input) return 0;

        const value = parseFloat(input.value);

        if (isNaN(value)) {

            return 0;

        }

        return value;

    }


    function validateSolar() {

        if (!solarInput) return true;

        const value = getNumber(solarInput);

        if (value > SOLAR_MAX) {

            solarInput.classList.add("input-error");

            showLoadError(
                "Solar load cannot exceed 191.40 MW."
            );

            return false;

        }

        if (value < 0) {

            solarInput.classList.add("input-error");

            showLoadError(
                "Solar load cannot be negative."
            );

            return false;

        }

        solarInput.classList.remove("input-error");

        return true;

    }


    function validateWind() {

        if (!windInput) return true;

        const value = getNumber(windInput);

        if (value > WIND_MAX) {

            windInput.classList.add("input-error");

            showLoadError(
                "Wind load cannot exceed 204.75 MW."
            );

            return false;

        }

        if (value < 0) {

            windInput.classList.add("input-error");

            showLoadError(
                "Wind load cannot be negative."
            );

            return false;

        }

        windInput.classList.remove("input-error");

        return true;

    }



    // ========================================================
    // LOAD ERROR
    // ========================================================

    function showLoadError(message) {

        if (!loadStatus) return;

        loadStatus.innerHTML =
            "⚠ " + message;

        loadStatus.classList.add("error");

    }


    function clearLoadError() {

        if (!loadStatus) return;

        loadStatus.innerHTML = "";

        loadStatus.classList.remove("error");

    }



    // ========================================================
    // UPDATE CURTAILMENT SUMMARY
    // ========================================================

    function updateCurtailmentSummary() {

        const solar = getNumber(solarInput);
        const wind = getNumber(windInput);

        const total = solar + wind;


        if (summarySolar) {

            summarySolar.textContent =
                solar.toFixed(2) + " MW";

        }


        if (summaryWind) {

            summaryWind.textContent =
                wind.toFixed(2) + " MW";

        }


        checkCurtailmentAlarm(
            solar,
            wind,
            total
        );

    }



    // ========================================================
    // CURTAILMENT ALARM
    // ========================================================

    function checkCurtailmentAlarm(
        solar,
        wind,
        total
    ) {

        if (!curtailmentAlarm) return;


        if (total > SCHEDULED_CURTAILMENT) {

            curtailmentAlarm.classList.add("show");


            if (alarmMessage) {

                alarmMessage.textContent =
                    "Solar + Wind load is " +
                    total.toFixed(2) +
                    " MW, which exceeds the scheduled " +
                    "curtailment of " +
                    SCHEDULED_CURTAILMENT.toFixed(2) +
                    " MW.";

            }

        } else {

            curtailmentAlarm.classList.remove("show");

        }

    }



    // ========================================================
    // REAL-TIME INPUT VALIDATION
    // ========================================================

    if (solarInput) {

        solarInput.addEventListener(
            "input",
            function () {

                validateSolar();

                validateWind();

                updateCurtailmentSummary();

            }
        );

    }


    if (windInput) {

        windInput.addEventListener(
            "input",
            function () {

                validateSolar();

                validateWind();

                updateCurtailmentSummary();

            }
        );

    }



    // ========================================================
    // ENTER LOAD
    // ========================================================

    if (submitLoadBtn) {

        submitLoadBtn.addEventListener(
            "click",
            function () {

                clearLoadError();


                const solarValid =
                    validateSolar();

                const windValid =
                    validateWind();


                if (!solarValid || !windValid) {

                    return;

                }


                const solar =
                    getNumber(solarInput);

                const wind =
                    getNumber(windInput);

                const total =
                    solar + wind;


                if (total > SCHEDULED_CURTAILMENT) {

                    checkCurtailmentAlarm(
                        solar,
                        wind,
                        total
                    );

                    return;

                }


                if (loadStatus) {

                    loadStatus.innerHTML =
                        "✓ Load successfully recorded: " +
                        solar.toFixed(2) +
                        " MW Solar + " +
                        wind.toFixed(2) +
                        " MW Wind = " +
                        total.toFixed(2) +
                        " MW";

                    loadStatus.classList.remove(
                        "error"
                    );

                    loadStatus.classList.add(
                        "success"
                    );

                }


                localStorage.setItem(
                    "solarLoad",
                    solar
                );

                localStorage.setItem(
                    "windLoad",
                    wind
                );

            }
        );

    }



    // ========================================================
    // UPLOAD SITE PHOTO
    // ========================================================

    if (uploadPhotoBtn && sitePhotoInput) {

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

                    selectedPhotoName.textContent =
                        file.name;

                }


                /*
                 * Display uploaded image
                 * in the latest weather slot.
                 */

                const reader =
                    new FileReader();


                reader.onload =
                    function (event) {

                        displayWeatherPhoto(
                            "photoPlaceholder1345",
                            event.target.result,
                            file.name
                        );

                    };


                reader.readAsDataURL(file);

            }
        );

    }



    // ========================================================
    // DISPLAY WEATHER PHOTO
    // ========================================================

    function displayWeatherPhoto(
        containerId,
        imageSource,
        fileName
    ) {

        const container =
            document.getElementById(containerId);


        if (!container) return;


        container.innerHTML = "";


        const image =
            document.createElement("img");


        image.src = imageSource;

        image.alt =
            "Site weather photograph";


        image.className =
            "weather-photo";


        container.appendChild(image);


        container.dataset.fileName =
            fileName;

    }



    // ========================================================
    // LOAD EXISTING WEATHER PHOTO
    //
    // Your weather-site-1315.jpg is in the SAME folder
    // as forecasting.html.
    // ========================================================

    const photo1315 =
        document.getElementById(
            "photoPlaceholder1315"
        );


    if (photo1315) {

        photo1315.innerHTML = "";


        const existingImage =
            document.createElement("img");


        existingImage.src =
            "weather-site-1315.jpg";


        existingImage.alt =
            "Site weather photograph - 13:15 to 13:30";


        existingImage.className =
            "weather-photo";


        existingImage.onerror =
            function () {

                photo1315.innerHTML =
                    '<div class="photo-placeholder">' +
                    '<div class="photo-icon">📷</div>' +
                    '<span>Unable to load weather-site-1315.jpg</span>' +
                    '</div>';

            };


        photo1315.appendChild(
            existingImage
        );

    }



    // ========================================================
    // WEATHER PHOTO COMMENTS
    // ========================================================

    function setupWeatherSend(
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


        if (!button) return;


        button.addEventListener(
            "click",
            function () {


                const commentText =
                    comment
                    ? comment.value.trim()
                    : "";


                if (
                    commentText === ""
                ) {

                    if (status) {

                        status.textContent =
                            "⚠ Please add a comment before sending.";

                        status.className =
                            "weather-status error";

                    }

                    return;

                }


                if (status) {

                    status.textContent =
                        "✓ Weather photo and comment " +
                        "sent for " +
                        interval +
                        ".";

                    status.className =
                        "weather-status success";

                }


                /*
                 * Demo storage.
                 * In the final connected version,
                 * this will send the information
                 * to the backend/database.
                 */

                localStorage.setItem(
                    "weatherComment_" + interval,
                    commentText
                );

            }
        );

    }



    // ========================================================
    // INITIALISE WEATHER PHOTO SEND BUTTONS
    // ========================================================

    setupWeatherSend(
        "sendWeather1345",
        "comment1345",
        "status1345",
        "13:45 - 14:00"
    );


    setupWeatherSend(
        "sendWeather1330",
        "comment1330",
        "status1330",
        "13:30 - 13:45"
    );


    setupWeatherSend(
        "sendWeather1315",
        "comment1315",
        "status1315",
        "13:15 - 13:30"
    );


    setupWeatherSend(
        "sendWeather1300",
        "comment1300",
        "status1300",
        "13:00 - 13:15"
    );



    // ========================================================
    // TAG HEAD OFFICE
    // ========================================================

    if (tagHOBtn && tagModal) {

        tagHOBtn.addEventListener(
            "click",
            function () {

                tagModal.classList.add("show");

            }
        );

    }


    if (closeTagModal && tagModal) {

        closeTagModal.addEventListener(
            "click",
            function () {

                tagModal.classList.remove(
                    "show"
                );

            }
        );

    }



    // ========================================================
    // SEND HEAD OFFICE NOTIFICATION
    // ========================================================

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


                if (!contact) {

                    if (hoStatus) {

                        hoStatus.textContent =
                            "⚠ Please select a Head Office team.";

                    }

                    return;

                }


                if (!message) {

                    if (hoStatus) {

                        hoStatus.textContent =
                            "⚠ Please enter a message.";

                    }

                    return;

                }


                if (hoStatus) {

                    hoStatus.textContent =
                        "✓ Notification sent to Head Office.";

                    hoStatus.className =
                        "modal-status success";

                }


                document.getElementById(
                    "hoMessage"
                ).value = "";


                setTimeout(
                    function () {

                        if (tagModal) {

                            tagModal.classList.remove(
                                "show"
                            );

                        }

                    },
                    1200
                );

            }
        );

    }



    // ========================================================
    // HEAD OFFICE CHAT
    // ========================================================

    if (chatHOBtn && chatModal) {

        chatHOBtn.addEventListener(
            "click",
            function () {

                chatModal.classList.add("show");

                if (chatMessage) {

                    chatMessage.focus();

                }

            }
        );

    }


    if (closeChatModal && chatModal) {

        closeChatModal.addEventListener(
            "click",
            function () {

                chatModal.classList.remove(
                    "show"
                );

            }
        );

    }



    // ========================================================
    // SEND CHAT MESSAGE
    // ========================================================

    function sendChatMessage() {

        if (!chatMessage || !chatWindow) {
            return;
        }


        const message =
            chatMessage.value.trim();


        if (message === "") {
            return;
        }


        const messageBox =
            document.createElement("div");


        messageBox.className =
            "chat-message sent";


        const currentTime =
            new Date().toLocaleTimeString(
                [],
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );


        messageBox.innerHTML =
            "<strong>Site Team</strong>" +
            "<p>" +
            escapeHTML(message) +
            "</p>" +
            "<span>" +
            currentTime +
            "</span>";


        chatWindow.appendChild(
            messageBox
        );


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

                if (
                    event.key === "Enter" &&
                    !event.shiftKey
                ) {

                    event.preventDefault();

                    sendChatMessage();

                }

            }
        );

    }



    // ========================================================
    // CLOSE MODALS WHEN CLICKING OUTSIDE
    // ========================================================

    window.addEventListener(
        "click",
        function (event) {

            if (
                event.target === tagModal
            ) {

                tagModal.classList.remove(
                    "show"
                );

            }


            if (
                event.target === chatModal
            ) {

                chatModal.classList.remove(
                    "show"
                );

            }

        }
    );



    // ========================================================
    // SCHEDULE BUTTONS
    // ========================================================

    const scheduleButtons =
        document.querySelectorAll(
            "#checkScheduleBtn, #checkScheduleBtn2"
        );


    scheduleButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    alert(
                        "AS Schedule: " +
                        "TRAS Down Total Schedule " +
                        "for 13:45 - 14:00 = " +
                        "241.21 MW"
                    );

                }
            );

        }
    );



    // ========================================================
    // SECURITY / HTML ESCAPE
    // ========================================================

    function escapeHTML(text) {

        const div =
            document.createElement("div");

        div.textContent = text;

        return div.innerHTML;

    }



    // ========================================================
    // RESTORE PREVIOUS LOAD
    // ========================================================

    const savedSolar =
        localStorage.getItem("solarLoad");

    const savedWind =
        localStorage.getItem("windLoad");


    if (
        savedSolar !== null &&
        solarInput
    ) {

        solarInput.value =
            savedSolar;

    }


    if (
        savedWind !== null &&
        windInput
    ) {

        windInput.value =
            savedWind;

    }


    updateCurtailmentSummary();



    // ========================================================
    // INITIALISE
    // ========================================================

    if (curtailmentAlarm) {

        curtailmentAlarm.classList.remove(
            "show"
        );

    }


    console.log(
        "Forecasting page loaded successfully."
    );

});
