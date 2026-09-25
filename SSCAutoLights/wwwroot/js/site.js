// SSC Auto Lights - Core Type Tabs

document.addEventListener("DOMContentLoaded", function () {

    // Get all tab buttons
    const coreTabs = document.querySelectorAll(".core-tab");

    // Get the elements we want to change
    const coreImage = document.getElementById("coreImage");
    const coreTitle = document.getElementById("coreTitle");
    const coreAccepted = document.getElementById("coreAccepted");
    const coreType = document.getElementById("coreType");
    const coreCondition = document.getElementById("coreCondition");
    const coreNote = document.getElementById("coreNote");


    // Information for each core type
    const coreData = {

        headlights: {
            title: "OEM Headlights",
            image: "/images/headlight.png",
            accepted: "Most makes and models",
            type: "LED, Xenon HID, and Halogen",
            condition: "Used, broken tabs, damaged housings, cracked lenses, and other damage may be accepted.",
            note: "Contact us with photos and information about the headlights you have."
        },

        taillights: {
            title: "OEM Taillights",
            image: "/images/taillight.png",
            accepted: "Most makes and models",
            type: "LED and standard OEM taillights",
            condition: "Used and damaged OEM taillights may be accepted.",
            note: "Contact us with photos and information about the taillights you have."
        },

        mirrors: {
            title: "OEM Side Mirrors",
            image: "/images/mirror.png",
            accepted: "Most makes and models",
            type: "Power, heated, camera, and sensor-equipped mirrors",
            condition: "Used and damaged OEM side mirrors may be accepted.",
            note: "Contact us with photos and information about the mirrors you have."
        },

        radar: {
            title: "OEM Front Radar Modules",
            image: "/images/radar.png",
            accepted: "Select makes and models",
            type: "OEM front radar and driver-assistance modules",
            condition: "Used OEM radar modules may be accepted depending on condition.",
            note: "Send us the part number and photos of the module."
        },

        blindspot: {
            title: "OEM Blind Spot Modules",
            image: "/images/blindspot.png",
            accepted: "Select makes and models",
            type: "OEM blind spot monitoring modules",
            condition: "Used OEM blind spot modules may be accepted depending on condition.",
            note: "Send us the part number and photos of the module."
        }

    };


    // Add click event to every tab
    coreTabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            // Find which tab was clicked
            const selectedCore = this.getAttribute("data-core");

            // Get that core's information
            const data = coreData[selectedCore];

            // Stop if no matching data exists
            if (!data) {
                return;
            }


            // Remove blue active color from every button
            coreTabs.forEach(function (button) {
                button.classList.remove("active");
            });


            // Make clicked button blue
            this.classList.add("active");


            // Change image
            coreImage.src = data.image;


            // Change information card
            coreTitle.textContent = data.title;
            coreAccepted.textContent = data.accepted;
            coreType.textContent = data.type;
            coreCondition.textContent = data.condition;
            coreNote.textContent = data.note;

        });

    });

});