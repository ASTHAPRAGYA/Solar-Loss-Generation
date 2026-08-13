// ============================================================
// SOLAR GENERATION LOSS OPTIMIZER
// FORECASTING JAVASCRIPT
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    // ========================================================
    // CONFIGURATION
    // ========================================================

    const MAX_SOLAR_LOAD = 191.40;
    const MAX_WIND_LOAD = 204.75;

    // Current TRAS Down scheduled curtailment
    const SCHEDULED_CURTAILMENT = 241.21;


    // ========================================================
    // GET ELEMENTS
    // ========================================================

    const solarInput =
        document.getElementById("solarLoad");

    const windInput =
        document.getElementById("windLoad");

    const solarError =
        document.getElementById("solarError");

    const windError =
        document.getElementById("windError");

    const summarySolar =
        document.getElementById("summarySolar");

    const summaryWind =
        document.getElementById("summaryWind");

    const summaryTotal =
        document.getElementById("summaryTotal");

    const loadAlarm =
        document.getElementById("loadAlarm");

    const enterLoad =
        document.getElementById("enterLoad");

    const priorityNotification =
        document.getElementById("priorityNotification");

    const priorityMessage =
        document.getElementById("priorityMessage");


    // ========================================================
    // CHATBOT ELEMENTS
    // ========================================================

    const hoChatButton =
        document.getElementById("hoChatButton");

    const hoChatWindow =
        document.getElementById("hoChatWindow");

    const hoChatClose =
        document.getElementById("hoChatClose");

    const hoChatBadge =
        document.getElementById("hoChatBadge");

    const replyHOButton =
        document.getElementById("replyHOButton");

    const hoReplyArea =
        document.getElementById("hoReplyArea");

    const hoReplyText =
        document.getElementById("hoReplyText");

    const sendHOReply =
        document.getElementById("sendHOReply");


    // ========================================================
    // PROFILE
    // ========================================================

    const profileBtn =
        document.getElementById("profileBtn");

    const profileMenu =
        document.getElementById("profileMenu");


    // ========================================================
    // HO TAGGING
    // ========================================================

    const tagHOButton =
        document.getElementById("tagHOButton");

    const chatHOButton =
        document.getElementById("chatHOButton");

    const tagBox =
        document.getElementById("tagBox");

    const sendTag =
        document.getElementById("sendTag");

    const hoPerson =
        document.getElementById("hoPerson");


    // ========================================================
    // WEATHER PHOTO UPLOAD
    // ========================================================

    const uploadPhotoButton =
        document.getElementById("uploadPhotoButton");

    const sitePhotoInput =
        document.getElementById("sitePhotoInput");

    const selectedPhotoName =
        document.getElementById("selectedPhotoName");

    const uploadCommentBox =
        document.getElementById("uploadCommentBox");

    const submitWeatherPhoto =
        document.getElementById("submitWeatherPhoto");


    // ========================================================
    // LOAD VALIDATION
    // ========================================================

    function validateSolarLoad() {

        if (!solarInput) {
            return true;
        }

        const value =
            solarInput.value.trim();

        if (value === "") {

            if (solarError) {
                solarError.textContent = "";
            }

            solarInput.classList.remove("input-invalid");

            return true;
        }

        const solar =
            parseFloat(value);


        if (
            isNaN(solar) ||
            solar < 0 ||
            solar > MAX_SOLAR_LOAD
        ) {

            if (solarError) {

                solarError.textContent =
                    "Maximum Solar Load is 191.40 MW.";

            }

            solarInput.classList.add("input-invalid");

            return false;

        }


        if (solarError) {
            solarError.textContent = "";
        }

        solarInput.classList.remove("input-invalid");

        return true;

    }


    // ========================================================
    // WIND VALIDATION
    // ========================================================

    function validateWindLoad() {

        if (!windInput) {
            return true;
        }

        const value =
            windInput.value.trim();


        if (value === "") {

            if (windError) {
                windError.textContent = "";
            }

            windInput.classList.remove("input-invalid");

            return true;

        }


        const wind =
            parseFloat(value);


        if (
            isNaN(wind) ||
            wind < 0 ||
            wind > MAX_WIND_LOAD
        ) {

            if (windError) {

                windError.textContent =
                    "Maximum Wind Load is 204.75 MW.";

            }

            windInput.classList.add("input-invalid");

            return false;

        }


        if (windError) {
            windError.textContent = "";
        }

        windInput.classList.remove("input-invalid");

        return true;

    }


    // ========================================================
    // GET CURRENT LOAD
    // ========================================================

    function getCurrentLoads() {

        const solarValue =
            solarInput
                ? solarInput.value.trim()
                : "";

        const windValue =
            windInput
                ? windInput.value.trim()
                : "";


        return {

            solarEntered:
                solarValue !== "",

            windEntered:
                windValue !== "",

            solar:
                solarValue === ""
                    ? null
                    : parseFloat(solarValue),

            wind:
                windValue === ""
                    ? null
                    : parseFloat(windValue)

        };

    }


    // ========================================================
    // UPDATE SUMMARY
    // ========================================================

    function updateLoadSummary() {

        const loads =
            getCurrentLoads();


        // ------------------------------
        // Solar
        // ------------------------------

        if (
            loads.solarEntered &&
            !isNaN(loads.solar)
        ) {

            summarySolar.textContent =
                loads.solar.toFixed(2) + " MW";

        } else {

            summarySolar.textContent =
                "—";

        }


        // ------------------------------
        // Wind
        // ------------------------------

        if (
            loads.windEntered &&
            !isNaN(loads.wind)
        ) {

            summaryWind.textContent =
                loads.wind.toFixed(2) + " MW";

        } else {

            summaryWind.textContent =
                "—";

        }


        // ------------------------------
        // Total
        // ------------------------------

        if (
            loads.solarEntered &&
            loads.windEntered &&
            !isNaN(loads.solar) &&
            !isNaN(loads.wind)
        ) {

            const total =
                loads.solar + loads.wind;


            summaryTotal.textContent =
                total.toFixed(2) + " MW";


            checkCurtailmentAlarm(total);


        } else {

            summaryTotal.textContent =
                "—";


            hideCurtailmentAlarm();

        }

    }


    // ========================================================
    // CURTAILMENT ALARM
    // ========================================================

    function checkCurtailmentAlarm(totalLoad) {

        if (!loadAlarm) {
            return;
        }


        if (
            totalLoad >
            SCHEDULED_CURTAILMENT
        ) {

            loadAlarm.style.display =
                "flex";


            if (priorityNotification) {

                priorityNotification.style.display =
                    "flex";

            }


            if (priorityMessage) {

                priorityMessage.textContent =
                    "Actual Solar + Wind Load (" +
                    totalLoad.toFixed(2) +
                    " MW) is greater than the scheduled curtailment of " +
                    SCHEDULED_CURTAILMENT.toFixed(2) +
                    " MW. Please check immediately.";

            }

        } else {

            hideCurtailmentAlarm();

        }

    }


    // ========================================================
    // HIDE CURTAILMENT ALARM
    // ========================================================

    function hideCurtailmentAlarm() {

        if (loadAlarm) {

            loadAlarm.style.display =
                "none";

        }


        if (priorityNotification) {

            priorityNotification.style.display =
                "none";

        }

    }


    // ========================================================
    // LOW GENERATION CHATBOT ALERT
    // ========================================================

    function checkLowGenerationAlert() {

        if (
            !solarInput ||
            !windInput ||
            !hoChatBadge
        ) {
            return;
        }


        const solarValue =
            solarInput.value.trim();

        const windValue =
            windInput.value.trim();


        // IMPORTANT:
        // Do not treat blank fields as zero.
        // Both loads must actually be entered.

        if (
            solarValue === "" ||
            windValue === ""
        ) {

            hoChatBadge.style.display =
                "none";

            return;

        }


        const solar =
            parseFloat(solarValue);

        const wind =
            parseFloat(windValue);


        if (
            isNaN(solar) ||
            isNaN(wind)
        ) {

            hoChatBadge.style.display =
                "none";

            return;

        }


        const combinedLoad =
            solar + wind;


        // HO notification if combined load
        // is below 70 MW.

        if (combinedLoad < 70) {

            hoChatBadge.style.display =
                "flex";

        } else {

            hoChatBadge.style.display =
                "none";

        }

    }


    // ========================================================
    // INPUT EVENTS
    // ========================================================

    if (solarInput) {

        solarInput.addEventListener(
            "input",
            function () {

                validateSolarLoad();

                updateLoadSummary();

                checkLowGenerationAlert();

            }
        );

    }


    if (windInput) {

        windInput.addEventListener(
            "input",
            function () {

                validateWindLoad();

                updateLoadSummary();

                checkLowGenerationAlert();

            }
        );

    }


    // ========================================================
    // ENTER LOAD BUTTON
    // ========================================================

    if (enterLoad) {

        enterLoad.addEventListener(
            "click",
            function () {


                const solarValid =
                    validateSolarLoad();


                const windValid =
                    validateWindLoad();


                if (
                    !solarValid ||
                    !windValid
                ) {

                    return;

                }


                const loads =
                    getCurrentLoads();


                if (
                    !loads.solarEntered ||
                    !loads.windEntered
                ) {

                    alert(
                        "Please enter both Solar and Wind load."
                    );

                    return;

                }


                updateLoadSummary();

                checkLowGenerationAlert();


                alert(
                    "Load updated successfully.\n\n" +
                    "Solar: " +
                    loads.solar.toFixed(2) +
                    " MW\n" +
                    "Wind: " +
                    loads.wind.toFixed(2) +
                    " MW\n" +
                    "Total: " +
                    (
                        loads.solar +
                        loads.wind
                    ).toFixed(2) +
                    " MW"
                );

            }
        );

    }


    // ========================================================
    // CHATBOT OPEN
    // ========================================================

    if (hoChatButton) {

        hoChatButton.addEventListener(
            "click",
            function () {

                if (hoChatWindow) {

                    hoChatWindow.classList.toggle(
                        "show"
                    );

                }

            }
        );

    }


    // ========================================================
    // CHATBOT CLOSE
    // ========================================================

    if (hoChatClose) {

        hoChatClose.addEventListener(
            "click",
            function () {

                if (hoChatWindow) {

                    hoChatWindow.classList.remove(
                        "show"
                    );

                }

            }
        );

    }


    // ========================================================
    // REPLY BUTTON
    // ========================================================

    if (replyHOButton) {

        replyHOButton.addEventListener(
            "click",
            function () {

                if (!hoReplyArea) {
                    return;
                }


                hoReplyArea.classList.toggle(
                    "show"
                );


                if (
                    hoReplyArea.classList.contains(
                        "show"
                    )
                ) {

                    if (hoReplyText) {

                        hoReplyText.focus();

                    }

                }

            }
        );

    }


    // ========================================================
    // SEND HO REPLY
    // ========================================================

    if (sendHOReply) {

        sendHOReply.addEventListener(
            "click",
            function () {

                if (!hoReplyText) {
                    return;
                }


                const message =
                    hoReplyText.value.trim();


                if (message === "") {

                    alert(
                        "Please enter a reply."
                    );

                    return;

                }


                alert(
                    "Reply sent to Forecasting Team — HO."
                );


                hoReplyText.value = "";


                if (hoReplyArea) {

                    hoReplyArea.classList.remove(
                        "show"
                    );

                }

            }
        );

    }


    // ========================================================
    // TAG HO
    // ========================================================

    if (tagHOButton) {

        tagHOButton.addEventListener(
            "click",
            function () {

                if (!tagBox) {
                    return;
                }


                if (
                    tagBox.style.display ===
                    "none" ||
                    tagBox.style.display === ""
                ) {

                    tagBox.style.display =
                        "block";

                } else {

                    tagBox.style.display =
                        "none";

                }

            }
        );

    }


    // ========================================================
    // CHAT WITH HO
    // ========================================================

    if (chatHOButton) {

        chatHOButton.addEventListener(
            "click",
            function () {

                if (hoChatWindow) {

                    hoChatWindow.classList.add(
                        "show"
                    );

                }

            }
        );

    }


    // ========================================================
    // SEND TAG
    // ========================================================

    if (sendTag) {

        sendTag.addEventListener(
            "click",
            function () {

                if (
                    !hoPerson ||
                    hoPerson.value === ""
                ) {

                    alert(
                        "Please select an HO contact."
                    );

                    return;

                }


                alert(
                    "Notification tagged to " +
                    hoPerson.value +
                    "."
                );


                if (tagBox) {

                    tagBox.style.display =
                        "none";

                }

            }
        );

    }


    // ========================================================
    // PROFILE MENU
    // ========================================================

    if (profileBtn && profileMenu) {

        profileBtn.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                if (
                    profileMenu.style.display ===
                    "block"
                ) {

                    profileMenu.style.display =
                        "none";

                } else {

                    profileMenu.style.display =
                        "block";

                }

            }
        );


        document.addEventListener(
            "click",
            function () {

                profileMenu.style.display =
                    "none";

            }
        );


        profileMenu.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

            }
        );

    }


    // ========================================================
    // WEATHER PHOTO UPLOAD
    // ========================================================

    if (uploadPhotoButton && sitePhotoInput) {

        uploadPhotoButton.addEventListener(
            "click",
            function () {

                sitePhotoInput.click();

            }
        );

    }


    // ========================================================
    // PHOTO SELECTED
    // ========================================================

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


                if (selectedPhotoName) {

                    selectedPhotoName.textContent =
                        file.name;

                }


                if (uploadCommentBox) {

                    uploadCommentBox.style.display =
                        "block";

                }

            }
        );

    }


    // ========================================================
    // SUBMIT WEATHER PHOTO
    // ========================================================

    if (submitWeatherPhoto) {

        submitWeatherPhoto.addEventListener(
            "click",
            function () {

                if (
                    !sitePhotoInput ||
                    !sitePhotoInput.files ||
                    sitePhotoInput.files.length === 0
                ) {

                    alert(
                        "Please select a site photo first."
                    );

                    return;

                }


                const file =
                    sitePhotoInput.files[0];


                const commentElement =
                    document.getElementById(
                        "uploadPhotoComment"
                    );


                const comment =
                    commentElement
                        ? commentElement.value.trim()
                        : "";


                alert(
                    "Weather photo uploaded successfully." +
                    (
                        comment !== ""
                            ? "\nComment attached successfully."
                            : ""
                    )
                );


                if (commentElement) {

                    commentElement.value =
                        "";

                }


                if (uploadCommentBox) {

                    uploadCommentBox.style.display =
                        "none";

                }


                if (selectedPhotoName) {

                    selectedPhotoName.textContent =
                        file.name +
                        " ✓ Uploaded";

                }

            }
        );

    }


    // ========================================================
    // PHOTO COMMENTS
    // ========================================================

    const commentButtons =
        document.querySelectorAll(
            ".send-photo-comment"
        );


    commentButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const slot =
                        button.dataset.slot;


                    const commentElement =
                        document.getElementById(
                            "comment" + slot
                        );


                    if (!commentElement) {
                        return;
                    }


                    const comment =
                        commentElement.value.trim();


                    if (comment === "") {

                        alert(
                            "Please enter a comment first."
                        );

                        return;

                    }


                    alert(
                        "Comment sent with weather report."
                    );


                    commentElement.value =
                        "";

                }
            );

        }
    );


    // ========================================================
    // EXCEL SCHEDULE BUTTON
    // ========================================================

    const excelScheduleBtn =
        document.getElementById(
            "excelScheduleBtn"
        );


    if (excelScheduleBtn) {

        excelScheduleBtn.addEventListener(
            "click",
            function () {

                alert(
                    "AS Schedule / WBES schedule will open here."
                );

            }
        );

    }


    // ========================================================
    // INITIAL STATE
    // ========================================================

    // Do NOT show chatbot notification on page load.
    // It will appear only after both loads are entered.

    if (hoChatBadge) {

        hoChatBadge.style.display =
            "none";

    }


    // Keep summary blank initially.

    if (summarySolar) {

        summarySolar.textContent =
            "—";

    }


    if (summaryWind) {

        summaryWind.textContent =
            "—";

    }


    if (summaryTotal) {

        summaryTotal.textContent =
            "—";

    }


    hideCurtailmentAlarm();

});
