import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


/* =========================================
   INIT
========================================= */

const initAnimations = () => {

    /* =========================================
       LENIS
    ========================================= */

    const isMobile = window.matchMedia(
        "(max-width: 768px)"
    ).matches;

    let lenis = null;

    if (!isMobile) {

        lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
            wheelMultiplier: 0.8,
        });

        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
    }


    /* =========================================
       HERO PARALLAX
    ========================================= */

    const heroImage =
        document.querySelector(".hero-art-image");

    if (heroImage) {

        if (!isMobile) {

            gsap.to(heroImage, {
                yPercent: 12,
                scale: 1.14,
                ease: "none",

                scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.2,
                },
            });

        }

    }


    /* =========================================
       HERO TITLE
    ========================================= */

    const heroTitle =
        document.querySelector(".hero-title");

    if (heroTitle) {

        gsap.to(heroTitle, {
            yPercent: -18,
            opacity: 0.75,
            ease: "none",

            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: 1,
            },
        });

    }


    /* =========================================
       PROFILE
    ========================================= */

    const profileTitle =
        document.querySelector(".intro-title");

    if (profileTitle) {

        gsap.from(profileTitle, {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out",

            scrollTrigger: {
                trigger: "#profile",
                start: "top 75%",
            },
        });

    }


    const profileImage =
        document.querySelector(".profile-image");

    if (profileImage) {

        gsap.from(profileImage, {
            scale: 1.15,
            opacity: 0,
            duration: 1.4,
            ease: "power3.out",

            scrollTrigger: {
                trigger: ".profile-image-wrap",
                start: "top 80%",
            },
        });

    }
    /* =========================================
    PROFILE PAGE REVEAL
    ========================================= */

    const profilePage =
        document.querySelector(".profile-page");

    if (profilePage) {

        /* =========================================
        PROFILE HERO
        ========================================= */

        const profileHero =
            profilePage.querySelector(".profile-hero");

        const profileMeta =
            profilePage.querySelector(".hero-meta");

        const profileContent =
            profilePage.querySelector(".profile-hero-content");

        const profileBottom =
            profilePage.querySelector(".hero-bottom");


        const profileHeroTimeline =
            gsap.timeline({
                delay: 0.15
            });


        if (profileMeta) {

            profileHeroTimeline.from(profileMeta, {
                y: 25,
                opacity: 0,
                duration: 0.8,
                ease: "power4.out"
            });

        }


        if (profileContent) {

            profileHeroTimeline.from(
                profileContent.querySelector(".eyebrow"),
                {
                    y: 30,
                    opacity: 0,
                    duration: 0.7,
                    ease: "power4.out"
                },
                "-=0.45"
            );


            profileHeroTimeline.from(
                profileContent.querySelector("h1"),
                {
                    y: 100,
                    opacity: 0,
                    scale: 0.96,
                    duration: 1.2,
                    ease: "power4.out"
                },
                "-=0.4"
            );


            profileHeroTimeline.from(
                profileContent.querySelector(".hero-description"),
                {
                    y: 25,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power4.out"
                },
                "-=0.6"
            );

        }


        if (profileBottom) {

            profileHeroTimeline.from(
                profileBottom,
                {
                    y: 20,
                    opacity: 0,
                    duration: 0.7,
                    ease: "power4.out"
                },
                "-=0.45"
            );

        }


        /* =========================================
        PROFILE SECTIONS
        ========================================= */

        gsap.utils
            .toArray(".profile-section")
            .forEach((section) => {

                const label =
                    section.querySelector(".section-label");

                const content =
                    section.querySelector(
                        ".about-grid, .artist-grid, .music-intro, .social-heading"
                    );


                const timeline =
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: section,
                            start: "top 78%",
                            once: true
                        }
                    });


                if (label) {

                    timeline.from(label, {
                        y: 25,
                        opacity: 0,
                        duration: 0.7,
                        ease: "power4.out"
                    });

                }


                if (content) {

                    timeline.from(
                        content,
                        {
                            y: 50,
                            opacity: 0,
                            duration: 1,
                            ease: "power4.out"
                        },
                        "-=0.35"
                    );

                }

            });


        /* =========================================
        ARTIST DETAILS
        ========================================= */

        gsap.utils
            .toArray(".detail-row")
            .forEach((row, index) => {

                gsap.from(row, {

                    x: 35,
                    opacity: 0,

                    duration: 0.7,

                    delay: index * 0.08,

                    ease: "power4.out",

                    scrollTrigger: {
                        trigger: row,
                        start: "top 85%",
                        once: true
                    }

                });

            });


        /* =========================================
        SOCIAL LINKS
        ========================================= */

        gsap.utils
            .toArray(".social-links a")
            .forEach((link, index) => {

                gsap.from(link, {

                    y: 35,
                    opacity: 0,

                    duration: 0.7,

                    delay: index * 0.1,

                    ease: "power4.out",

                    scrollTrigger: {
                        trigger: link,
                        start: "top 90%",
                        once: true
                    }

                });

            });

    }


    /* =========================================
       SECTION TITLES
    ========================================= */

    gsap.utils
        .toArray(".artist-title")
        .forEach((title) => {

            gsap.from(title, {
                y: 100,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",

                scrollTrigger: {
                    trigger: title,
                    start: "top 80%",
                },
            });

        });
    
    /* =========================================
    MUSIC TRACK REVEAL
    ========================================= */

    const musicTracks =
        gsap.utils.toArray(".track-item");

    if (musicTracks.length) {
        gsap.from(musicTracks, {
            y: 35,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",

            scrollTrigger: {
                trigger: "#music",
                start: "top 70%",
                once: true,
            },
        });
    }


    /* =========================================
        MUSIC ARTWORK INTERACTION
    ========================================= */

    const trackItems =
        document.querySelectorAll(".track-item");

    const musicPreviewImage =
        document.querySelector("#musicPreviewImage");


    trackItems.forEach((track) => {

        const updateArtwork = () => {

            const image =
                track.getAttribute("data-art");

            if (
                !image ||
                !musicPreviewImage
            ) {
                return;
            }


            // Jangan animasikan jika artwork sama
            if (
                musicPreviewImage.getAttribute("src") === image
            ) {
                return;
            }


            gsap.to(
                musicPreviewImage,
                {
                    opacity: 0,

                    scale: 1.02,

                    duration: 0.2,

                    ease: "power2.out",

                    onComplete: () => {

                        musicPreviewImage.src =
                            image;


                        gsap.fromTo(
                            musicPreviewImage,
                            {
                                opacity: 0,
                                scale: 1.02,
                            },
                            {
                                opacity: 1,
                                scale: 1,

                                duration: 0.45,

                                ease: "power2.out",
                            }
                        );

                    },
                }
            );

        };


        /* -----------------------------------------
        DESKTOP
        ----------------------------------------- */

        track.addEventListener(
            "mouseenter",
            () => {

                if (
                    window.matchMedia(
                        "(hover: hover)"
                    ).matches
                ) {
                    updateArtwork();
                }

            }
        );


        /* -----------------------------------------
        MOBILE / TOUCH
        ----------------------------------------- */

        track.addEventListener(
            "click",
            (event) => {

                if (
                    !window.matchMedia(
                        "(hover: hover)"
                    ).matches
                ) {

                    const image =
                        track.getAttribute("data-art");


                    const currentImage =
                        musicPreviewImage?.getAttribute(
                            "src"
                        );


                    if (
                        image &&
                        currentImage !== image
                    ) {

                        event.preventDefault();

                        updateArtwork();

                    }

                }

            }
        );

    });
    /* =========================================
    MUSIC PAGE REVEAL
    ========================================= */

    const musicPage =
        document.querySelector(".music-page");

    if (musicPage) {

        const meta =
            musicPage.querySelector(
                ".music-page-meta"
            );

        const kicker =
            musicPage.querySelector(
                ".music-page-kicker"
            );

        const title =
            musicPage.querySelector(
                ".music-page-title"
            );

        const note =
            musicPage.querySelector(
                ".music-page-note"
            );

        const tracks =
            musicPage.querySelectorAll(
                ".music-page-track"
            );

        const bottomNote =
            musicPage.querySelector(
                ".music-page-note-bottom"
            );


        /* -----------------------------------------
        HERO
        ----------------------------------------- */

        const heroTimeline =
            gsap.timeline({
                defaults: {
                    ease: "power4.out",
                },
            });


        if (meta) {

            heroTimeline.from(meta, {
                y: 25,
                opacity: 0,
                duration: 0.7,
            });

        }


        if (kicker) {

            heroTimeline.from(
                kicker,
                {
                    y: 25,
                    opacity: 0,
                    duration: 0.7,
                },
                "-=0.45"
            );

        }


        if (title) {

            heroTimeline.from(
                title,
                {
                    y: 80,
                    opacity: 0,
                    duration: 1.1,
                },
                "-=0.45"
            );

        }


        if (note) {

            heroTimeline.from(
                note,
                {
                    y: 25,
                    opacity: 0,
                    duration: 0.7,
                },
                "-=0.55"
            );

        }


        /* -----------------------------------------
        TRACK LIST
        ----------------------------------------- */

        if (tracks.length) {

            gsap.from(tracks, {

                y: 60,
                opacity: 0,

                duration: 0.9,

                stagger: 0.1,

                ease: "power4.out",

                scrollTrigger: {

                    trigger: ".music-page-list",

                    start: "top 80%",

                    once: true,

                },

            });

        }


        /* -----------------------------------------
        FOOTNOTE
        ----------------------------------------- */

        if (bottomNote) {

            gsap.from(bottomNote, {

                y: 25,
                opacity: 0,

                duration: 0.8,

                ease: "power3.out",

                scrollTrigger: {

                    trigger: bottomNote,

                    start: "top 90%",

                    once: true,

                },

            });

        }

    }
    /* =========================================
    XEN AUDIO PLAYER
    ========================================= */

    const audio =
        document.querySelector("#songAudio");

    const audioPlayer =
        document.querySelector(".xen-audio-player");

    const audioPlay =
        document.querySelector("#audioPlay");

    const audioProgressBar =
        document.querySelector("#audioProgressBar");

    const audioProgress =
        document.querySelector("#audioProgress");

    const audioCurrentTime =
        document.querySelector("#audioCurrentTime");

    const audioDuration =
        document.querySelector("#audioDuration");
    
    const artwork =
    document.querySelector(
        ".xen-audio-artwork img"
    );

    if (artwork) {

        gsap.to(artwork, {
            scale: 1.06,
            duration: 2,
            ease: "power2.out",
        });

    }


    if (
        audio &&
        audioPlay &&
        audioProgressBar &&
        audioProgress &&
        audioCurrentTime &&
        audioDuration
    ) {

        /* -----------------------------------------
        FORMAT TIME
        ----------------------------------------- */

        const formatTime = (seconds) => {

            if (!Number.isFinite(seconds)) {
                return "00:00";
            }

            const minutes =
                Math.floor(seconds / 60);

            const remainingSeconds =
                Math.floor(seconds % 60);

            return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;

        };


        /* -----------------------------------------
        PLAY / PAUSE
        ----------------------------------------- */

        audioPlay.addEventListener(
            "click",
            () => {

                if (audio.paused) {

                    audio.play();

                } else {

                    audio.pause();

                }

            }
        );


        /* -----------------------------------------
        PLAY STATE
        ----------------------------------------- */

        audio.addEventListener(
            "play",
            () => {

                audioPlay.innerHTML =
                    "<span>Ⅱ</span>";

                audioPlayer.classList.add(
                    "is-playing"
                );

                if (artwork) {

                    gsap.to(artwork, {
                        scale: 1.06,
                        duration: 1.2,
                        ease: "power3.out",
                    });

                }

            }
        );


        audio.addEventListener(
            "pause",
            () => {

                audioPlay.innerHTML =
                    "<span>▶</span>";

                audioPlayer.classList.remove(
                    "is-playing"
                );

                if (artwork) {

                    gsap.to(artwork, {
                        scale: 1,
                        duration: 1,
                        ease: "power3.out",
                    });

                }

            }
        );


        /* -----------------------------------------
        DURATION
        ----------------------------------------- */

        audio.addEventListener(
            "loadedmetadata",
            () => {

                audioDuration.textContent =
                    formatTime(audio.duration);

            }
        );


        /* -----------------------------------------
        PROGRESS
        ----------------------------------------- */

        audio.addEventListener(
            "timeupdate",
            () => {

                if (!audio.duration) return;

                const percentage =
                    (audio.currentTime / audio.duration) * 100;

                audioProgress.style.width =
                    `${percentage}%`;

                audioCurrentTime.textContent =
                    formatTime(audio.currentTime);

            }
        );


        /* -----------------------------------------
        CLICK PROGRESS
        ----------------------------------------- */

        audioProgressBar.addEventListener(
            "click",
            (event) => {

                if (!audio.duration) return;

                const rect =
                    audioProgressBar.getBoundingClientRect();

                const position =
                    (event.clientX - rect.left) /
                    rect.width;

                audio.currentTime =
                    position * audio.duration;

            }
        );


        /* -----------------------------------------
        RESET
        ----------------------------------------- */

        audio.addEventListener(
            "ended",
            () => {

                audio.currentTime = 0;

                audioProgress.style.width = "0%";

                audioCurrentTime.textContent =
                    "00:00";

                audioPlay.innerHTML =
                    "<span>▶</span>";

            }
        );

    }

    /* =========================================
        VIDEO PREVIEW
    ========================================= */

    const videoItems =
        document.querySelectorAll(".video-item");

    const videoPreviewImage =
        document.querySelector("#videoPreviewImage");

    const videoPreviewNumber =
        document.querySelector("#videoPreviewNumber");

    const videoPreviewType =
        document.querySelector("#videoPreviewType");

    const videoSection =
        document.querySelector(".video-section");

    if (videoSection) {

        gsap.to(videoSection, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power4.out",

            scrollTrigger: {
                trigger: videoSection,
                start: "top 85%",
                once: true,
            },
        });

    }


    let activeVideo = null;


    function updateVideoPreview(item) {

        const image =
            item.getAttribute("data-art");

        const number =
            item.getAttribute("data-video");

        const type =
            item.getAttribute("data-type");
        
        const videoURL =
            item.getAttribute("data-video-url");


        if (
            !image ||
            !videoPreviewImage
        ) {
            return;
        }
        selectedVideoURL =
            videoURL || "";


        // Jangan animasikan item yang sama
        if (activeVideo === item) {
            return;
        }


        activeVideo = item;


        gsap.to(
            videoPreviewImage,
            {
                opacity: 0,
                scale: 1.02,

                duration: 0.2,

                ease: "power2.out",

                onComplete: () => {

                    videoPreviewImage.src =
                        image;


                    if (videoPreviewNumber) {

                        videoPreviewNumber.textContent =
                            number || "";

                    }


                    if (videoPreviewType) {

                        videoPreviewType.textContent =
                            type || "";

                    }


                    gsap.fromTo(
                        videoPreviewImage,
                        {
                            opacity: 0,
                            scale: 1.02,
                        },
                        {
                            opacity: 1,
                            scale: 1,

                            duration: 0.45,

                            ease: "power2.out",
                        }
                    );

                },
            }
        );


        videoItems.forEach((video) => {

            video.classList.remove("active");

        });


        item.classList.add("active");
    }


    videoItems.forEach((item) => {

        /* -----------------------------------------
            DESKTOP — HOVER
        ----------------------------------------- */

        item.addEventListener(
            "mouseenter",
            () => {

                if (
                    window.matchMedia(
                        "(hover: hover)"
                    ).matches
                ) {
                    updateVideoPreview(item);
                }

            }
        );


        /* -----------------------------------------
        MOBILE — TOUCH
        ----------------------------------------- */

        item.addEventListener(
            "touchstart",
            () => {

                if (
                    !window.matchMedia(
                        "(hover: hover)"
                    ).matches
                ) {
                    updateVideoPreview(item);
                }

            },
            {
                passive: true
            }
        );

    });


    /* =========================================
    VIDEO MODAL
    ========================================= */

    const videoModal =
        document.querySelector("#videoModal");

    const videoModalClose =
        document.querySelector("#videoModalClose");

    const videoPlay =
        document.querySelector(".video-play");

    const videoPlayer =
        document.querySelector("#videoPlayer");

    let selectedVideoURL = "";
    if (videoItems.length > 0) {

        const firstVideo =
            videoItems[0];

        selectedVideoURL =
            firstVideo.getAttribute(
                "data-video-url"
            ) || "";

    }


    /* -----------------------------------------
    OPEN VIDEO
    ----------------------------------------- */

    videoPlay?.addEventListener(
        "click",
        () => {

            if (
                !selectedVideoURL ||
                !videoPlayer ||
                !videoModal
            ) {
                return;
            }


            videoPlayer.src =
                selectedVideoURL;


            videoModal.classList.add(
                "active"
            );


            document.body.style.overflow =
                "hidden";

        }
    );


    /* -----------------------------------------
    CLOSE VIDEO
    ----------------------------------------- */

    function closeVideoModal() {

        videoModal?.classList.remove(
            "active"
        );


        // Stop YouTube video
        if (videoPlayer) {

            videoPlayer.src = "";

        }


        document.body.style.overflow =
            "";

    }


    /* Close button */

    videoModalClose?.addEventListener(
        "click",
        closeVideoModal
    );


    /* Click outside player */

    videoModal?.addEventListener(
        "click",
        (event) => {

            if (
                event.target === videoModal
            ) {

                closeVideoModal();

            }

        }
    );


    /* =========================================
       SCHEDULE REVEAL
    ========================================= */

    gsap.utils
        .toArray(".schedule-item")
        .forEach((item, index) => {

            gsap.from(item, {

                y: 70,

                opacity: 0,

                duration: 1,

                delay: index * 0.08,

                ease: "power4.out",

                scrollTrigger: {
                    trigger: item,

                    start: "top 85%",
                },

            });

        });


    /* =========================================
       SCHEDULE YEAR PARALLAX
    ========================================= */

    const scheduleYear =
        document.querySelector(
            ".schedule-bg-year"
        );

    if (scheduleYear) {

        if (!isMobile) {
            gsap.to(scheduleYear, {

                yPercent: -15,

                ease: "none",

                scrollTrigger: {

                    trigger: "#schedule",

                    start: "top bottom",

                    end: "bottom top",

                    scrub: 1.5,

                },

            });
        }

    }
    /* =========================================
    SCHEDULE ITEM INTERACTION
    ========================================= */

    const scheduleItems =
        document.querySelectorAll(".schedule-item");


    scheduleItems.forEach((item) => {

        const arrow =
            item.querySelector(".schedule-arrow");


        item.addEventListener(
            "mouseenter",
            () => {

                if (
                    !window.matchMedia(
                        "(hover: hover)"
                    ).matches
                ) {
                    return;
                }


                gsap.to(item, {
                    x: 8,

                    duration: 0.45,

                    ease: "power3.out",
                });


                if (arrow) {

                    gsap.to(arrow, {
                        x: 6,
                        y: -6,
                        duration: 0.35,
                        ease: "power3.out",
                    });

                }

            }
        );


        item.addEventListener(
            "mouseleave",
            () => {

                if (
                    !window.matchMedia(
                        "(hover: hover)"
                    ).matches
                ) {
                    return;
                }


                gsap.to(item, {
                    x: 0,

                    duration: 0.45,

                    ease: "power3.out",
                });


                if (arrow) {

                    gsap.to(arrow, {
                        x: 0,
                        y: 0,

                        duration: 0.35,

                        ease: "power3.out",
                    });

                }

            }
        );

    });
    /* =========================================
    SCHEDULE PAGE REVEAL
    ========================================= */

    const schedulePage =
        document.querySelector(".schedule-page");

    if (schedulePage) {

        const hero =
            schedulePage.querySelector(
                ".schedule-page-hero"
            );

        const meta =
            schedulePage.querySelector(
                ".schedule-page-meta"
            );

        const kicker =
            schedulePage.querySelector(
                ".schedule-page-kicker"
            );

        const title =
            schedulePage.querySelector(
                ".schedule-page-title"
            );

        const year =
            schedulePage.querySelector(
                ".schedule-page-year"
            );

        const items =
            schedulePage.querySelectorAll(
                ".schedule-page-item"
            );

        const note =
            schedulePage.querySelector(
                ".schedule-page-note"
            );


        /* -----------------------------------------
        HERO
        ----------------------------------------- */

        const heroTimeline =
            gsap.timeline({
                defaults: {
                    ease: "power4.out",
                },
            });


        if (meta) {

            heroTimeline.from(meta, {
                y: 25,
                opacity: 0,
                duration: 0.7,
            });

        }


        if (kicker) {

            heroTimeline.from(
                kicker,
                {
                    y: 25,
                    opacity: 0,
                    duration: 0.7,
                },
                "-=0.45"
            );

        }


        if (title) {

            heroTimeline.from(
                title,
                {
                    y: 80,
                    opacity: 0,
                    duration: 1.1,
                    ease: "power4.out",
                },
                "-=0.45"
            );

        }


        if (year) {

            heroTimeline.from(
                year,
                {
                    x: 100,
                    opacity: 0,
                    duration: 1.4,
                    ease: "power3.out",
                },
                "-=0.9"
            );

        }


        /* -----------------------------------------
        EVENT LIST
        ----------------------------------------- */

        if (items.length) {

            gsap.from(items, {
                y: 60,
                opacity: 0,

                duration: 0.9,

                stagger: 0.1,

                ease: "power4.out",

                scrollTrigger: {
                    trigger: ".schedule-page-list",

                    start: "top 80%",

                    once: true,
                },
            });

        }


        /* -----------------------------------------
        FOOTNOTE
        ----------------------------------------- */

        if (note) {

            gsap.from(note, {
                y: 25,
                opacity: 0,

                duration: 0.8,

                ease: "power3.out",

                scrollTrigger: {
                    trigger: note,

                    start: "top 90%",

                    once: true,
                },
            });

        }

        /* =========================================
        YEAR PARALLAX
        ========================================= */

        if (year) {

            if (!isMobile) {

                gsap.to(year, {
                    yPercent: -12,
                    ease: "none",

                    scrollTrigger: {
                        trigger: schedulePage,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1.5,
                    },
                });

            }

        }

    }


    /* =========================================
       BACK TO TOP
    ========================================= */

    const backToTop =
        document.querySelector("#backToTop");

    backToTop?.addEventListener("click", () => {

        if (lenis) {
            lenis.scrollTo(0, {
                duration: 1.5,
            });
        } else {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }

    });



    /* =========================================
       MAGNETIC ELEMENTS
    ========================================= */

    const magneticElements =
        document.querySelectorAll(
            ".magnetic"
        );


    magneticElements.forEach(
        (element) => {

            element.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        element.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;


                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;


                    gsap.to(element, {

                        x: x * 0.18,

                        y: y * 0.18,

                        duration: 0.35,

                        ease: "power3.out",

                        overwrite: true,

                    });

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    gsap.to(element, {

                        x: 0,

                        y: 0,

                        duration: 0.6,

                        ease: "power3.out",

                        overwrite: true,

                    });

                }
            );

        }
    );


    /* =========================================
       SMOOTH ANCHOR
    ========================================= */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    lenis.scrollTo(
                        target,
                        {
                            offset: 0,
                            duration: 1.4,
                        }
                    );

                }
            );

        });


    /* =========================================
       REFRESH SCROLLTRIGGER
    ========================================= */

    ScrollTrigger.refresh();

};


/* =========================================
   START
========================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initAnimations
    );

} else {

    initAnimations();

}
/* =========================================
   VIDEO PAGE PLAYER
========================================= */

const videoPageItems =
    document.querySelectorAll(".video-page-item");

const videoPageModal =
    document.querySelector("#videoPageModal");

const videoPagePlayer =
    document.querySelector("#videoPagePlayer");

const videoPageModalClose =
    document.querySelector("#videoPageModalClose");


videoPageItems.forEach((item) => {

    item.addEventListener("click", (event) => {

        event.preventDefault();

        const videoId =
            item.getAttribute("data-video-id");

        if (
            !videoId ||
            !videoPageModal ||
            !videoPagePlayer
        ) {
            return;
        }


        videoPagePlayer.src =
            `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;


        videoPageModal.classList.add("active");

        document.body.style.overflow =
            "hidden";

    });

});


function closeVideoPageModal() {

    if (!videoPageModal || !videoPagePlayer) {
        return;
    }

    videoPageModal.classList.remove("active");

    videoPagePlayer.src = "";

    document.body.style.overflow = "";

}


videoPageModalClose?.addEventListener(
    "click",
    closeVideoPageModal
);


videoPageModal?.addEventListener(
    "click",
    (event) => {

        if (
            event.target === videoPageModal
        ) {

            closeVideoPageModal();

        }

    }
);


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            videoPageModal?.classList.contains("active")
        ) {

            closeVideoPageModal();

        }

    }
);
/* =========================================
   VIDEO PAGE REVEAL
========================================= */

const videoPage =
    document.querySelector(".video-page");

if (videoPage) {

    const meta =
        videoPage.querySelector(
            ".video-page-meta"
        );

    const kicker =
        videoPage.querySelector(
            ".video-page-kicker"
        );

    const title =
        videoPage.querySelector(
            ".video-page-title"
        );

    const note =
        videoPage.querySelector(
            ".video-page-note"
        );

    const videos =
        videoPage.querySelectorAll(
            ".video-page-item"
        );

    const bottomNote =
        videoPage.querySelector(
            ".video-page-note-bottom"
        );


    /* -----------------------------------------
       HERO
    ----------------------------------------- */

    const heroTimeline =
        gsap.timeline({
            defaults: {
                ease: "power4.out",
            },
        });


    if (meta) {

        heroTimeline.from(meta, {
            y: 25,
            opacity: 0,
            duration: 0.7,
        });

    }


    if (kicker) {

        heroTimeline.from(
            kicker,
            {
                y: 25,
                opacity: 0,
                duration: 0.7,
            },
            "-=0.45"
        );

    }


    if (title) {

        heroTimeline.from(
            title,
            {
                y: 80,
                opacity: 0,
                duration: 1.1,
            },
            "-=0.45"
        );

    }


    if (note) {

        heroTimeline.from(
            note,
            {
                y: 25,
                opacity: 0,
                duration: 0.7,
            },
            "-=0.55"
        );

    }


    /* -----------------------------------------
       VIDEO LIST
    ----------------------------------------- */

    if (videos.length) {

        gsap.from(videos, {

            y: 60,

            opacity: 0,

            duration: 0.9,

            stagger: 0.12,

            ease: "power4.out",

            scrollTrigger: {

                trigger:
                    ".video-page-list",

                start: "top 80%",

                once: true,

            },

        });

    }


    /* -----------------------------------------
       FOOTNOTE
    ----------------------------------------- */

    if (bottomNote) {

        gsap.from(bottomNote, {

            y: 25,

            opacity: 0,

            duration: 0.8,

            ease: "power3.out",

            scrollTrigger: {

                trigger: bottomNote,

                start: "top 90%",

                once: true,

            },

        });

    }

}
/* =========================================
   NAVIGATION ACTIVE STATE
========================================= */

const navLinks =
    document.querySelectorAll(
        ".desktop-nav .nav-link"
    );

const currentPath =
    window.location.pathname
        .replace(/\/$/, "") || "/";


/* =========================================
   INTERNAL PAGES
========================================= */

if (currentPath !== "/") {

    navLinks.forEach((link) => {

        const linkPath =
            new URL(
                link.href,
                window.location.origin
            ).pathname
                .replace(/\/$/, "") || "/";


        link.classList.toggle(
            "active",
            linkPath === currentPath
        );

    });

}


/* =========================================
   HOMEPAGE
========================================= */

if (currentPath === "/") {

    const sections = [];


    navLinks.forEach((link) => {

        const url =
            new URL(
                link.href,
                window.location.origin
            );


        /*
         * /profile → profile
         * /music   → music
         * /video   → video
         * /schedule → schedule
         */

        const sectionId =
            url.pathname
                .replace(/^\/|\/$/g, "");


        if (!sectionId) return;


        const section =
            document.getElementById(
                sectionId
            );


        if (!section) return;


        sections.push({
            link,
            section
        });

    });


    const updateNavigation = () => {

        const triggerPoint =
            window.innerHeight * 0.4;


        let activeSection = null;


        sections.forEach((item) => {

            const rect =
                item.section.getBoundingClientRect();


            if (
                rect.top <= triggerPoint &&
                rect.bottom > triggerPoint
            ) {

                activeSection = item;

            }

        });


        navLinks.forEach((link) => {

            link.classList.remove(
                "active"
            );

        });


        if (activeSection) {

            activeSection.link.classList.add(
                "active"
            );

        }

    };


    window.addEventListener(
        "scroll",
        updateNavigation,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        updateNavigation
    );


    updateNavigation();

}
/* =========================================
   PAGE TRANSITION
========================================= */

const pageTransition =
    document.querySelector("#pageTransition");

if (pageTransition) {

    /* -----------------------------------------
       INITIAL LOAD
    ----------------------------------------- */

    pageTransition.classList.add(
        "no-transition"
    );

    pageTransition.classList.add(
        "is-ready"
    );

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            pageTransition.classList.remove(
                "no-transition"
            );

        });

    });


    /* -----------------------------------------
       PAGE LINKS
    ----------------------------------------- */

    document
        .querySelectorAll("a[href]")
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const href =
                        link.getAttribute("href");

                    if (
                        !href ||
                        href.startsWith("#") ||
                        href.startsWith("mailto:") ||
                        href.startsWith("tel:") ||
                        link.target === "_blank"
                    ) {
                        return;
                    }

                    if (
                        link.origin !==
                        window.location.origin
                    ) {
                        return;
                    }

                    if (
                        link.href ===
                        window.location.href
                    ) {
                        return;
                    }

                    event.preventDefault();


                    /* --------------------------------
                       PAGE LEAVE
                    -------------------------------- */

                    pageTransition.classList.remove(
                        "is-ready"
                    );

                    pageTransition.classList.add(
                        "is-leaving"
                    );


                    const isMobile = window.matchMedia(
                        "(max-width: 768px)"
                    ).matches;

                    setTimeout(() => {
                        window.location.href =
                            link.href;
                    }, isMobile ? 400 : 650);

                }
            );

        });

}
// =========================================
// FINAL SCROLLTRIGGER REFRESH
// =========================================

if (typeof ScrollTrigger !== "undefined") {

    ScrollTrigger.refresh();

}

// =========================================
// MUSIC PLAYER
// =========================================

const musicAudio =
    document.querySelector("#musicAudio");

const musicPlayer =
    document.querySelector("#musicPlayer");

const musicPlayerArtwork =
    document.querySelector("#musicPlayerArtwork");

const musicPlayerNumber =
    document.querySelector("#musicPlayerNumber");

const musicPlayerTitle =
    document.querySelector("#musicPlayerTitle");

const musicPlayerArtist =
    document.querySelector("#musicPlayerArtist");

const musicPlayerToggle =
    document.querySelector("#musicPlayerToggle");

const musicPlayerClose =
    document.querySelector("#musicPlayerClose");

const musicPlayerProgress =
    document.querySelector("#musicPlayerProgress");

const musicPlayerCurrent =
    document.querySelector("#musicPlayerCurrent");

const musicPlayerDuration =
    document.querySelector("#musicPlayerDuration");

const musicPageTracks =
    document.querySelectorAll(
        ".music-page-track"
    );


if (
    musicAudio &&
    musicPlayer &&
    musicPageTracks.length
) {

    let currentTrack = null;


    /* -----------------------------------------
       FORMAT TIME
    ----------------------------------------- */

    const formatTime = (seconds) => {

        if (!Number.isFinite(seconds)) {
            return "00:00";
        }

        const minutes =
            Math.floor(seconds / 60);

        const remainingSeconds =
            Math.floor(seconds % 60);

        return `${String(minutes).padStart(2, "0")}:${String(
            remainingSeconds
        ).padStart(2, "0")}`;

    };


    /* -----------------------------------------
       LOAD TRACK
    ----------------------------------------- */

    const loadTrack = (track) => {

        const audio =
            track.dataset.audio;

        const artwork =
            track.dataset.art;

        const title =
            track.dataset.title;

        const artist =
            track.dataset.artist;

        const number =
            track.dataset.number;


        if (!audio) return;

        // Remove previous playing state
        musicPageTracks.forEach((item) => {
            item.classList.remove("is-playing");
        });

        currentTrack = track;


        musicAudio.src = audio;

        musicAudio.load();


        if (musicPlayerArtwork && artwork) {

            musicPlayerArtwork.src =
                artwork;

        }


        if (musicPlayerNumber) {

            musicPlayerNumber.textContent =
                number || "";

        }


        if (musicPlayerTitle) {

            musicPlayerTitle.textContent =
                title || "Unknown";

        }


        if (musicPlayerArtist) {

            musicPlayerArtist.textContent =
                artist || "XEN";

        }


        if (musicPlayerProgress) {

            musicPlayerProgress.value = 0;

        }


        if (musicPlayerCurrent) {

            musicPlayerCurrent.textContent =
                "00:00";

        }


        if (musicPlayerDuration) {

            musicPlayerDuration.textContent =
                "00:00";

        }


        musicPlayer.classList.add(
            "has-track"
        );

    };


    /* -----------------------------------------
       PLAY / PAUSE
    ----------------------------------------- */

    const togglePlay = async () => {

        if (!currentTrack) {

            const firstTrack =
                musicPageTracks[0];

            if (!firstTrack) return;

            loadTrack(firstTrack);

        }


        if (musicAudio.paused) {

            try {

                await musicAudio.play();

            } catch (error) {

                console.error(
                    "Unable to play audio:",
                    error
                );

            }

        } else {

            musicAudio.pause();

        }

    };


    /* -----------------------------------------
       TRACK CLICK
    ----------------------------------------- */

    musicPageTracks.forEach(
        (track) => {

            const playButton =
                track.querySelector(
                    "[data-play-track]"
                );


            playButton?.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();
                    event.stopPropagation();


                    if (
                        currentTrack !== track
                    ) {

                        loadTrack(track);

                    }


                    togglePlay();

                }
            );


            track.addEventListener(
                "click",
                (event) => {

                    /*
                     * Jangan memutar lagu ketika
                     * user menekan tombol detail.
                     */

                    if (
                        event.target.closest(
                            ".music-page-arrow"
                        )
                    ) {
                        return;
                    }

                }
            );

        }
    );


    /* -----------------------------------------
       MAIN PLAYER BUTTON
    ----------------------------------------- */

    musicPlayerToggle?.addEventListener(
        "click",
        () => {

            togglePlay();

        }
    );

    /* -----------------------------------------
    CLOSE / STOP PLAYER
    ----------------------------------------- */

    musicPlayerClose?.addEventListener(
        "click",
        () => {

            // Stop audio
            musicAudio.pause();

            // Reset audio position
            musicAudio.currentTime = 0;

            // Reset player state
            musicPlayer.classList.remove(
                "has-track",
                "is-playing"
            );

            // Reset play button
            if (musicPlayerToggle) {

                musicPlayerToggle.innerHTML =
                    '<i class="fa-solid fa-play"></i>';

                musicPlayerToggle.setAttribute(
                    "aria-label",
                    "Play music"
                );

            }

            // Reset progress
            if (musicPlayerProgress) {
                musicPlayerProgress.value = 0;
            }

            if (musicPlayerCurrent) {
                musicPlayerCurrent.textContent = "00:00";
            }

            if (musicPlayerDuration) {
                musicPlayerDuration.textContent = "00:00";
            }

            // Remove active state from tracks
            musicPageTracks.forEach(
                (track) => {

                    track.classList.remove(
                        "is-playing"
                    );

                }
            );

            currentTrack = null;

        }
    );


    /* -----------------------------------------
       AUDIO PLAY
    ----------------------------------------- */

    musicAudio.addEventListener(
        "play",
        () => {

            musicPlayer.classList.add(
                "is-playing"
            );


            if (musicPlayerToggle) {

                musicPlayerToggle.innerHTML =
                    '<i class="fa-solid fa-pause"></i>';

                musicPlayerToggle.setAttribute(
                    "aria-label",
                    "Pause music"
                );

            }


            if (currentTrack) {

                currentTrack.classList.add(
                    "is-playing"
                );

                const playButton =
                    currentTrack.querySelector(
                        ".music-page-play"
                    );

                if (playButton) {

                    playButton.innerHTML =
                        '<i class="fa-solid fa-pause"></i>';

                    playButton.setAttribute(
                        "aria-label",
                        "Pause music"
                    );

                }

            }

        }
    );


    /* -----------------------------------------
       AUDIO PAUSE
    ----------------------------------------- */

    musicAudio.addEventListener(
        "pause",
        () => {

            musicPlayer.classList.remove(
                "is-playing"
            );


            if (musicPlayerToggle) {

                musicPlayerToggle.innerHTML =
                    '<i class="fa-solid fa-play"></i>';

                musicPlayerToggle.setAttribute(
                    "aria-label",
                    "Play music"
                );

            }


            if (currentTrack) {

                const playButton =
                    currentTrack.querySelector(
                        ".music-page-play"
                    );

                if (playButton) {

                    playButton.innerHTML =
                        '<i class="fa-solid fa-play"></i>';

                    playButton.setAttribute(
                        "aria-label",
                        "Play music"
                    );

                }

            }

        }
    );

    /* -----------------------------------------
       DURATION
    ----------------------------------------- */

    musicAudio.addEventListener(
        "loadedmetadata",
        () => {

            if (musicPlayerDuration) {

                musicPlayerDuration.textContent =
                    formatTime(
                        musicAudio.duration
                    );

            }


            if (musicPlayerProgress) {

                musicPlayerProgress.max =
                    musicAudio.duration;

            }

        }
    );


    /* -----------------------------------------
       PROGRESS
    ----------------------------------------- */

    musicAudio.addEventListener(
        "timeupdate",
        () => {

            if (musicPlayerCurrent) {

                musicPlayerCurrent.textContent =
                    formatTime(
                        musicAudio.currentTime
                    );

            }


            if (musicPlayerProgress) {

                musicPlayerProgress.value =
                    musicAudio.currentTime;

            }

        }
    );


    /* -----------------------------------------
       SEEK
    ----------------------------------------- */

    musicPlayerProgress?.addEventListener(
        "input",
        () => {

            musicAudio.currentTime =
                Number(
                    musicPlayerProgress.value
                );

        }
    );


    /* -----------------------------------------
       TRACK ENDED
    ----------------------------------------- */

    musicAudio.addEventListener(
        "ended",
        () => {

            musicPlayer.classList.remove(
                "is-playing"
            );


            if (currentTrack) {

                currentTrack.classList.remove(
                    "is-playing"
                );

            }


            if (musicPlayerToggle) {

                musicPlayerToggle.innerHTML =
                    '<i class="fa-solid fa-play"></i>';

                musicPlayerToggle.setAttribute(
                    "aria-label",
                    "Play music"
                );

            }

        }
    );

}