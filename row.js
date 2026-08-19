// =====================================================
// SOLAR GENERATION LOSS OPTIMIZER
// ROW MONITORING JAVASCRIPT
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    // =================================================
    // PROFILE DROPDOWN
    // =================================================

    const profileBtn =
        document.getElementById("profileBtn");

    const profileMenu =
        document.getElementById("profileMenu");


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


        profileMenu.addEventListener("click", function (event) {

            event.stopPropagation();

        });

    }


    // =================================================
    // MENU BUTTON
    // =================================================
    //
    // The ROW page does not have a permanently open
    // sidebar. The button is kept to match Dashboard.
    //
    // If you later want the same temporary menu as
    // Dashboard, this section can be connected to it.
    // =================================================

    const menuBtn =
        document.getElementById("menuBtn");


    if (menuBtn) {

        menuBtn.addEventListener("click", function () {

            /*
             * No permanent sidebar on ROW page.
             *
             * The menu button is intentionally kept
             * in the top bar for consistency with
             * dashboard.html.
             */

        });

    }


    // =================================================
    // SEARCH LAND RECORDS
    // =================================================

    const searchInput =
        document.getElementById("searchInput");

    const rowTable =
        document.getElementById("rowTable");


    if (searchInput && rowTable) {

        searchInput.addEventListener(
            "input",
            function () {

                const searchValue =
                    this.value
                    .toLowerCase()
                    .trim();


                const rows =
                    rowTable.querySelectorAll(
                        "tbody tr"
                    );


                rows.forEach(function (row) {

                    const rowText =
                        row.textContent
                        .toLowerCase();


                    if (
                        rowText.includes(searchValue)
                    ) {

                        row.style.display = "";

                    } else {

                        row.style.display = "none";

                    }

                });

            }
        );

    }


    // =================================================
    // LAND DOCUMENT DATA
    // =================================================

    const landDocuments = {

        "ROW-001": {

            parcel: "Block-01",

            owner: "Ramesh Kumar",

            area: "0.35 Acres",

            status: "Leased",

            agreement: "Active",

            documents: [

                "Lease Agreement",

                "Land Ownership Record",

                "Farmer KYC",

                "Land Survey Document"

            ]

        },


        "ROW-002": {

            parcel: "Block-02",

            owner: "Suresh Patil",

            area: "0.42 Acres",

            status: "Purchased",

            agreement: "Active",

            documents: [

                "Sale Deed",

                "Land Ownership Record",

                "Farmer KYC",

                "Land Survey Document"

            ]

        },


        "ROW-003": {

            parcel: "Block-03",

            owner: "Anand Rao",

            area: "0.28 Acres",

            status: "Leased",

            agreement: "Active",

            documents: [

                "Lease Agreement",

                "Land Ownership Record",

                "Farmer KYC",

                "Land Survey Document"

            ]

        },


        "ROW-004": {

            parcel: "Block-04",

            owner: "Mahesh Gowda",

            area: "0.31 Acres",

            status: "Purchased",

            agreement: "Active",

            documents: [

                "Sale Deed",

                "Land Ownership Record",

                "Farmer KYC",

                "Land Survey Document"

            ]

        },


        "ROW-005": {

            parcel: "Block-05",

            owner: "Prakash Singh",

            area: "0.50 Acres",

            status: "Leased",

            agreement: "Renewal Due",

            documents: [

                "Lease Agreement",

                "Land Ownership Record",

                "Farmer KYC",

                "Renewal Document"

            ]

        }

    };


    // =================================================
    // DOCUMENT VIEW BUTTONS
    // =================================================

    const documentButtons =
        document.querySelectorAll(".doc-btn");

    const documentViewer =
        document.getElementById("documentViewer");


    documentButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const row =
                    this.closest("tr");


                if (!row) {

                    return;

                }


                const landNumber =
                    row.cells[0].textContent.trim();


                const land =
                    landDocuments[landNumber];


                if (!land) {

                    documentViewer.innerHTML =

                        "<p>" +
                        "No document information available." +
                        "</p>";

                    return;

                }


                // =====================================
                // DOCUMENT VIEWER
                // =====================================

                let documentHTML =

                    "<div class='document-details'>" +

                    "<h3>" +
                    land.parcel +
                    "</h3>" +

                    "<div class='document-info'>" +

                    "<p><strong>Land No.:</strong> " +
                    landNumber +
                    "</p>" +

                    "<p><strong>Owner:</strong> " +
                    land.owner +
                    "</p>" +

                    "<p><strong>Area:</strong> " +
                    land.area +
                    "</p>" +

                    "<p><strong>Status:</strong> " +
                    land.status +
                    "</p>" +

                    "<p><strong>Agreement:</strong> " +
                    land.agreement +
                    "</p>" +

                    "</div>" +

                    "<h4>Uploaded Documents</h4>" +

                    "<div class='document-list'>";


                land.documents.forEach(
                    function (documentName) {

                        documentHTML +=

                            "<div class='document-item'>" +

                            "<span>📄</span>" +

                            "<span>" +
                            documentName +
                            "</span>" +

                            "<button " +
                            "class='document-open-btn'>" +
                            "View" +
                            "</button>" +

                            "</div>";

                    }
                );


                documentHTML +=

                    "</div>" +

                    "</div>";


                documentViewer.innerHTML =
                    documentHTML;


                // =====================================
                // SCROLL TO DOCUMENTS
                // =====================================

                documentViewer.scrollIntoView({

                    behavior: "smooth",

                    block: "center"

                });


                // =====================================
                // DOCUMENT VIEW BUTTONS
                // =====================================

                const openButtons =
                    documentViewer.querySelectorAll(
                        ".document-open-btn"
                    );


                openButtons.forEach(
                    function (openButton) {

                        openButton.addEventListener(
                            "click",
                            function () {

                                alert(
                                    "Demo document viewer.\n\n" +
                                    "The actual uploaded " +
                                    "document can be connected " +
                                    "here."
                                );

                            }
                        );

                    }
                );

            }
        );

    });


    // =================================================
    // LAND ROW HIGHLIGHT
    // =================================================

    documentButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                documentButtons.forEach(
                    function (btn) {

                        btn.closest("tr")
                           .classList.remove(
                               "selected-row"
                           );

                    }
                );


                const selectedRow =
                    this.closest("tr");


                if (selectedRow) {

                    selectedRow.classList.add(
                        "selected-row"
                    );

                }

            }
        );

    });


});
