window.dataLayer = window.dataLayer || []
function gtag() {
    dataLayer.push(arguments)
}

function initializeAnalytics() {
    const script = document.createElement("script")
    script.async = true
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-VJQD6SC6Q1"
    document.head.appendChild(script)

    gtag("js", new Date())
    gtag("config", "G-VJQD6SC6Q1", { anonymize_ip: true })
}

function trackEvent(eventName, parameters = {}) {
    if (window.gtag && localStorage.getItem("cookieConsent") === "accepted") {
        gtag("event", eventName, parameters)
    }
}

function acceptCookies() {
    localStorage.setItem("cookieConsent", "accepted")
    initializeAnalytics()
    document.getElementById("cookie-banner").style.display = "none"

    setTimeout(() => {
        trackEvent("cookie_consent", { consent_action: "accepted" })
    }, 1000)
}

function declineCookies() {
    localStorage.setItem("cookieConsent", "declined")
    document.getElementById("cookie-banner").style.display = "none"
}

function setupEventTracking() {
    if (localStorage.getItem("cookieConsent") !== "accepted") return

    // Event 1: Page Load Timing
    const loadTimeMs = window.performance ? Math.round(performance.now()) : 0
    trackEvent("page_loaded", {
        load_time_ms: loadTimeMs,
        page_title: document.title,
        page_path: window.location.pathname,
    })

    // Event 2: Gallery Image Clicks
    const galleryImages = document.querySelectorAll(".gallery-item img")
    if (galleryImages.length > 0) {
        galleryImages.forEach((img, index) => {
            img.addEventListener("click", function () {
                trackEvent("gallery_image_click", {
                    image_index: index,
                    image_alt: this.alt || "Gallery image " + (index + 1),
                })
                console.log("Gallery image clicked:", index, this.alt) // Add this for testing
            })
        })
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const cookieBanner = document.getElementById("cookie-banner")
    const acceptButton = document.getElementById("accept-cookies")
    const declineButton = document.getElementById("decline-cookies")

    if (!localStorage.getItem("cookieConsent")) {
        cookieBanner.style.display = "block"
    } else if (localStorage.getItem("cookieConsent") === "accepted") {
        initializeAnalytics()
    }

    if (acceptButton) {
        acceptButton.addEventListener("click", acceptCookies)
    }

    if (declineButton) {
        declineButton.addEventListener("click", declineCookies)
    }

    setupEventTracking()
})