// =========================================================
// SOLAR GENERATION LOSS OPTIMIZER
// FORECASTING PAGE JAVASCRIPT
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // SIDEBAR
    // =====================================================

    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");

    if (menuBtn && sidebar) {

        menuBtn.addEventListener("click", function (event) {

            event.stopPropagation();

            sidebar.classList.toggle("active");

        });

    }


    // =====================================================
    // PROFILE DROPDOWN
    // =====================================================

    const profileBtn = document.getElementById("profileBtn");
    const profileMenu = document.getElementById("profileMenu");

    if (profileBtn && profileMenu) {

        profileBtn.addEventListener("click", function (event) {

            event.stopPropagation();

            if (profileMenu.style.display === "block") {

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

        checkScheduleBtn.addEventListener("click", function () {

            if (priorityAlert) {

                priorityAlert.style.display = "none";

            }

            alert(
                "Latest HO curtailment schedule opened.\n\n" +
                "TRAS Down active — check AS schedule in WBES.\n" +
                "13:15 - 13:30 = 241 MW"
            );

        });

    }


    // =====================================================
    // TAG HEAD OFFICE MODAL
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

        tagHOBtn.addEventListener("click", function () {

            tagModal.classList.add("show");

        });

    }


    if (closeTagModal && tagModal) {

        closeTagModal.addEventListener("click", function () {

            tagModal.classList.remove("show");

        });

    }


    if (sendHOMsg) {

        sendHOMsg.addEventListener("click", function () {

            const contact =
                document.getElementById("hoContact").value;

            const message =
                document.getElementById("hoMessage").value.trim();

            const status =
                document.getElementById("hoStatus");


            if (contact === "") {

                status.innerHTML =
                    "⚠ Please select a Head Office contact.";

                status.style.color = "#d93025";

                return;

            }


            if (message === "") {

                status.innerHTML =
                    "⚠ Please enter a message.";

                status.style.color = "#d93025";

                return;

            }


            status.innerHTML =
                "✓ Notification sent to Head Office.";

            status.style.color = "#27A5AD";


            document.getElementById("hoMessage").value = "";

        });

    }


    // =====================================================
    // CHAT WITH HEAD OFFICE
    // =====================================================

    const chatHOBtn =
        document.getElementById("chatHOBtn");

    const chatModal =
        document.getElementById("chatModal");

    const closeChatModal =
        document.getElementById("closeChatModal");

    const sendChatBtn =
        document.getElementById("sendChatBtn");

    const chatMessage =
        document.getElementById("chatMessage");

    const chatWindow =
        document.getElementById("chatWindow");


    if (chatHOBtn && chatModal) {

        chatHOBtn.addEventListener("click", function () {

            chatModal.classList.add("show");

            if (chatMessage) {

                setTimeout(function () {

                    chatMessage.focus();

                }, 100);

            }

        });

    }


    if (closeChatModal && chatModal) {

        closeChatModal.addEventListener("click", function () {

            chatModal.classList.remove("show");

        });

    }


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


        messageBox.innerHTML =

            "<strong>Site Team</strong>" +

            "<p>" +
            escapeHTML(message) +
            "</p>" +

            "<span>Now</span>";


        chatWindow.appendChild(messageBox);


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
    // 15-MINUTE SOLAR/WIND LOAD ENTRY
    // =====================================================

    const submitLoadBtn =
        document.getElementById("submitLoadBtn");


    if (submitLoadBtn) {

        submitLoadBtn.addEventListener(
            "click",
            function () {

                const solarInput =
                    document.getElementById("solarLoad");

                const windInput =
                    document.getElementById("windLoad");

                const status =
                    document.getElementById("loadStatus");


                const solar =
                    solarInput.value.trim();

                const wind =
                    windInput.value.trim();


                if (solar === "" || wind === "") {

                    status.innerHTML =
                        "⚠ Please enter both Solar and Wind load.";

                    status.style.color = "#d93025";

                    return;

                }


                if (
                    Number(solar) < 0 ||
                    Number(wind) < 0
                ) {

                    status.innerHTML =
                        "⚠ Load cannot be negative.";

                    status.style.color = "#d93025";

                    return;

                }


                // Update summary

                const summarySolar =
                    document.getElementById("summarySolar");

                const summaryWind =
                    document.getElementById("summaryWind");


                if (summarySolar) {

                    summarySolar.innerHTML =
                        solar + " MW";

                }


                if (summaryWind) {

                    summaryWind.innerHTML =
                        wind + " MW";

                }


                status.innerHTML =
                    "✓ Load successfully recorded for 13:15 - 13:30.";

                status.style.color = "#27A5AD";


                // Save locally for demo

                localStorage.setItem(
                    "forecastSolarLoad",
                    solar
                );

                localStorage.setItem(
                    "forecastWindLoad",
                    wind
                );

            }
        );

    }


    // =====================================================
    // RESTORE PREVIOUS LOAD
    // =====================================================

    const savedSolar =
        localStorage.getItem("forecastSolarLoad");

    const savedWind =
        localStorage.getItem("forecastWindLoad");


    if (savedSolar) {

        const solarInput =
            document.getElementById("solarLoad");

        const summarySolar =
            document.getElementById("summarySolar");


        if (solarInput) {

            solarInput.value = savedSolar;

        }


        if (summarySolar) {

            summarySolar.innerHTML =
                savedSolar + " MW";

        }

    }


    if (savedWind) {

        const windInput =
            document.getElementById("windLoad");

        const summaryWind =
            document.getElementById("summaryWind");


        if (windInput) {

            windInput.value = savedWind;

        }


        if (summaryWind) {

            summaryWind.innerHTML =
                savedWind + " MW";

        }

    }


    // =====================================================
    // UPLOAD SITE PHOTO
    // =====================================================

    const uploadPhotoBtn =
        document.getElementById("uploadPhotoBtn");

    const sitePhotoInput =
        document.getElementById("sitePhotoInput");

    const selectedPhotoName =
        document.getElementById("selectedPhotoName");


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


                if (!file.type.startsWith("image/")) {

                    alert("Please select an image file.");

                    sitePhotoInput.value = "";

                    return;

                }


                if (selectedPhotoName) {

                    selectedPhotoName.innerHTML =
                        "Selected: " + file.name;

                }


                // Show uploaded image in the empty
                // 13:00 - 13:15 weather slot

                const placeholder =
                    document.getElementById(
                        "photoPlaceholder1300"
                    );


                if (placeholder) {

                    const imageURL =
                        URL.createObjectURL(file);


                    placeholder.innerHTML = "";


                    const img =
                        document.createElement("img");


                    img.src = imageURL;

                    img.alt =
                        "Uploaded site weather photograph";


                    img.style.width = "100%";

                    img.style.height = "100%";

                    img.style.objectFit = "cover";

                    img.style.borderRadius = "7px";


                    placeholder.appendChild(img);

                }

            }
        );

    }


    // =====================================================
    // WEATHER REPORT SUBMISSION
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

                    if (status) {

                        status.innerHTML =
                            "⚠ Please add a comment before sending.";

                        status.style.color =
                            "#d93025";

                    }

                    return;

                }


                if (status) {

                    status.innerHTML =
                        "✓ Weather photograph and comment submitted for " +
                        interval;

                    status.style.color =
                        "#27A5AD";

                }


                // Save demo comment locally

                localStorage.setItem(
                    "weatherComment_" + interval,
                    text
                );

            }
        );

    }


    // =====================================================
    // CLOSE MODALS WHEN CLICKING OUTSIDE
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
    // ESCAPE KEY
    // =====================================================

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key !== "Escape") {

                return;

            }


            if (tagModal) {

                tagModal.classList.remove("show");

            }


            if (chatModal) {

                chatModal.classList.remove("show");

            }


            if (profileMenu) {

                profileMenu.style.display = "none";

            }

        }
    );


    // =====================================================
    // SIMPLE HTML ESCAPE FUNCTION
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
