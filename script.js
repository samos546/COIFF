/* =========================
   NOIR BARBER STUDIO
   PREMIUM INTERACTIONS
========================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       LOADER
    ========================= */

    document.body.classList.add("loading");

    window.addEventListener("load", () => {

        const loader = document.getElementById("loader");

        setTimeout(() => {

            if (loader) {
                loader.classList.add("hide");
            }

            document.body.classList.remove("loading");

        }, 650);

    });


    /* =========================
       MOBILE MENU
    ========================= */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("active");
            navLinks.classList.toggle("open");

        });

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");
                navLinks.classList.remove("open");

            });

        });

    }


    /* =========================
       NAVBAR
    ========================= */

    const navbar = document.querySelector(".navbar");

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 60) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    updateNavbar();


    /* =========================
       CUSTOM CURSOR
    ========================= */

    const cursor = document.querySelector(".cursor");
    const cursorRing = document.querySelector(".cursor-ring");

    const desktopPointer =
        window.matchMedia("(pointer: fine)").matches;

    if (cursor && cursorRing && desktopPointer) {

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let ringX = mouseX;
        let ringY = mouseY;

        document.addEventListener("mousemove", event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;

        });

        function animateCursor() {

            ringX += (mouseX - ringX) * 0.16;
            ringY += (mouseY - ringY) * 0.16;

            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;

            requestAnimationFrame(animateCursor);

        }

        animateCursor();


        const interactiveElements =
            document.querySelectorAll(
                "a, button, .service, .gallery-card"
            );

        interactiveElements.forEach(element => {

            element.addEventListener("mouseenter", () => {
                cursorRing.classList.add("hover");
            });

            element.addEventListener("mouseleave", () => {
                cursorRing.classList.remove("hover");
            });

        });

    }


    /* =========================
       HERO MOUSE MOVEMENT
       No button interference
    ========================= */

    const hero = document.querySelector(".hero");
    const heroHead = document.querySelector(".hero-head");

    if (hero && heroHead && desktopPointer) {

        let ticking = false;

        hero.addEventListener("mousemove", event => {

            if (ticking) return;

            ticking = true;

            requestAnimationFrame(() => {

                const rect = hero.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width - 0.5;

                const y =
                    (event.clientY - rect.top) /
                    rect.height - 0.5;

                heroHead.style.transform =
                    `translate3d(${x * -14}px, ${y * -10}px, 0) scale(1.04)`;

                ticking = false;

            });

        });

        hero.addEventListener("mouseleave", () => {

            heroHead.style.transform =
                "translate3d(0,0,0) scale(1.04)";

        });

    }


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements =
        document.querySelectorAll(
            ".services, .statement, .about, .gallery, .booking, .contact"
        );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show");

                            observer.unobserve(entry.target);

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("show");
        });

    }


    /* =========================
       IMAGE PARALLAX
    ========================= */

    const parallaxImages =
        document.querySelectorAll(
            ".statement-image img, .booking-bg img"
        );

    function updateParallax() {

        if (window.innerWidth <= 800) return;

        const viewportHeight = window.innerHeight;

        parallaxImages.forEach(image => {

            const parent = image.parentElement;

            if (!parent) return;

            const rect =
                parent.getBoundingClientRect();

            if (
                rect.bottom < 0 ||
                rect.top > viewportHeight
            ) {
                return;
            }

            const progress =
                (viewportHeight - rect.top) /
                (viewportHeight + rect.height);

            const movement =
                (progress - 0.5) * 25;

            image.style.transform =
                `scale(1.08) translateY(${movement}px)`;

        });

    }

    let parallaxTicking = false;

    window.addEventListener("scroll", () => {

        if (parallaxTicking) return;

        parallaxTicking = true;

        requestAnimationFrame(() => {

            updateParallax();

            parallaxTicking = false;

        });

    }, {
        passive: true
    });

    updateParallax();


    /* =========================
       GALLERY 3D EFFECT
    ========================= */

    const galleryCards =
        document.querySelectorAll(".gallery-card");

    if (desktopPointer) {

        galleryCards.forEach(card => {

            card.addEventListener("mousemove", event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width - 0.5;

                const y =
                    (event.clientY - rect.top) /
                    rect.height - 0.5;

                card.style.transform =
                    `perspective(900px)
                     rotateX(${y * -2.5}deg)
                     rotateY(${x * 2.5}deg)
                     scale(1.015)`;

            });

            card.addEventListener("mouseleave", () => {

                card.style.transform = "";

            });

        });

    }


    /* =========================
       SERVICE HOVER
    ========================= */

    const services =
        document.querySelectorAll(".service");

    services.forEach((service, index) => {

        service.style.transitionDelay =
            `${index * 0.025}s`;

    });


    /* =========================
       SMOOTH ANCHOR LINKS
    ========================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const navbarHeight =
                navbar ? navbar.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =========================
       BUTTON PRESS FEEDBACK
       Fast and clean
    ========================= */

    const buttons =
        document.querySelectorAll(
            ".primary-button, .book-button"
        );

    buttons.forEach(button => {

        button.addEventListener("mousedown", () => {
            button.style.transform =
                "translateY(-1px) scale(0.97)";
        });

        button.addEventListener("mouseup", () => {
            button.style.transform = "";
        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "";
        });

    });


    /* =========================
       RESIZE
    ========================= */

    window.addEventListener("resize", () => {

        if (
            window.innerWidth <= 800 &&
            heroHead
        ) {

            heroHead.style.transform =
                "translate3d(0,0,0) scale(1.04)";

        }

    });

});