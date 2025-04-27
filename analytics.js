window.dataLayer = window.dataLayer || []
function gtag() {
    dataLayer.push(arguments)
}

function initializeAnalytics() {
    const script = document.createElement("script")
    script.async = true
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
    document.head.appendChild(script)

    gtag("js", new Date())
    gtag("config", "G-XXXXXXXXXX", { anonymize_ip: true })
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

    const loadTimeMs = window.performance ? Math.round(performance.now()) : 0

    trackEvent("page_loaded", {
        load_time_ms: loadTimeMs,
        page_title: document.title,
        page_path: window.location.pathname,
    })

    const galleryImages = document.querySelectorAll(".gallery-item img")
    if (galleryImages.length > 0) {
        galleryImages.forEach((img, index) => {
            img.addEventListener("click", function () {
                trackEvent("gallery_image_click", {
                    image_index: index,
                    image_alt: this.alt || "Gallery image " + (index + 1),
                })
            })

            if ("IntersectionObserver" in window) {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                trackEvent("gallery_image_view", {
                                    image_index: index,
                                    image_alt: img.alt || "Gallery image " + (index + 1),
                                })
                                observer.unobserve(img)
                            }
                        })
                    },
                    { threshold: 0.7 },
                )

                observer.observe(img)
            }
        })
    }

    const navLinks = document.querySelectorAll(".footer-nav a, header a")
    navLinks.forEach((link) => {
        link.addEventListener("click", function () {
            trackEvent("navigation_click", {
                link_text: this.textContent.trim(),
                link_url: this.href,
                link_location: this.closest("header") ? "header" : "footer",
            })
        })
    })

    const allLinks = document.querySelectorAll("a")
    allLinks.forEach((link) => {
        if (link.hostname !== window.location.hostname && !link.classList.contains("tracked")) {
            link.addEventListener("click", function () {
                trackEvent("external_link_click", {
                    link_text: this.textContent.trim(),
                    link_url: this.href,
                })
            })
            link.classList.add("tracked")
        }
    })

    const scrollMarkers = [25, 50, 75, 90]
    const scrollMarkerTriggered = new Array(scrollMarkers.length).fill(false)

    window.addEventListener(
        "scroll",
        () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
            const scrollPercentage = (scrollTop / scrollHeight) * 100

            scrollMarkers.forEach((marker, i) => {
                if (scrollPercentage >= marker && !scrollMarkerTriggered[i]) {
                    trackEvent("scroll_depth", {
                        depth_percentage: marker,
                        page_title: document.title,
                        page_path: window.location.pathname,
                    })
                    scrollMarkerTriggered[i] = true
                }
            })
        },
        { passive: true },
    )

    const startTime = new Date()
    const timeIntervals = [30, 60, 120, 300]
    const intervalIds = []

    timeIntervals.forEach((interval) => {
        const timerId = setTimeout(() => {
            trackEvent("time_on_page", {
                duration_seconds: interval,
                page_title: document.title,
                page_path: window.location.pathname,
            })
        }, interval * 1000)

        intervalIds.push(timerId)
    })

    window.addEventListener("beforeunload", () => {
        const timeSpent = Math.round((new Date() - startTime) / 1000)
        trackEvent("page_exit", {
            duration_seconds: timeSpent,
            page_title: document.title,
            page_path: window.location.pathname,
        })

        intervalIds.forEach((id) => clearTimeout(id))
    })
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
