// // Disable scroll

// // left: 37, up: 38, right: 39, down: 40,
// // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
// var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

// function preventDefault(e) {
//   e.preventDefault();
// }

// function preventDefaultForScrollKeys(e) {
//   if (keys[e.keyCode]) {
//     preventDefault(e);
//     return false;
//   }
// }

// // modern Chrome requires { passive: false } when adding event
// var supportsPassive = false;
// try {
//   window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
//     get: function () { supportsPassive = true; }
//   }));
// } catch (e) { }

// var wheelOpt = supportsPassive ? { passive: false } : false;
// var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// // call this to Disable
// function disableScroll() {
//   window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
//   window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
//   window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
//   window.addEventListener('keydown', preventDefaultForScrollKeys, false);
// }

// // call this to Enable
// function enableScroll() {
//   window.removeEventListener('DOMMouseScroll', preventDefault, false);
//   window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
//   window.removeEventListener('touchmove', preventDefault, wheelOpt);
//   window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
// }

// if (document.getElementsByClassName("home-animation").length) {
//   window.disableScroll()
// }

// Selectively remove lazy loading based on class. Set the ".no-lazy" class on the <figure> element to have this work.

// document.querySelectorAll('.no-lazy img').forEach(function (img) {
//   img.loading = "eager";
// });

document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("load", function () {
    // GSAP

    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(SplitText);

    let mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width: 1000px)",
        isDesktop: "(min-width: 1001px)",
      },
      (context) => {
        let { isMobile, isDesktop } = context.conditions;

        // ALL TWEENS

        // Basic fade up

        gsap.utils.toArray(".fade-up").forEach((element) => {
          gsap.to(element, {
            y: 0,
            autoAlpha: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
            },
          });
        });

        // Logo swipe

        const logos = gsap.utils.toArray(".site-logo");

        logos.forEach((logo, index) => {
          // Update gradient ID to be unique
          const gradient = logo.querySelector("linearGradient");
          const uniqueId = `shimmer-${index}`;
          gradient.id = uniqueId;

          // Update the path to reference the new unique gradient
          const path = logo.querySelector("path");
          path.setAttribute("fill", `url(#${uniqueId})`);

          const tl = gsap.timeline({ paused: true });

          // Animate gradient points
          tl.to(gradient, {
            attr: { x1: 1, x2: 2 },
          });

          logo.addEventListener("mouseenter", () => tl.play());
          logo.addEventListener("mouseleave", () => tl.reverse());
        });

        // Home hero split text

        const homeHero = document.querySelector(".home-hero-h1");
        const heroSplit = new SplitText(homeHero, { type: "words" });

        homeHero.style.visibility = "visible";

        gsap.from(heroSplit.words, {
          y: 50,
          autoAlpha: 0,
          stagger: 0.05,
        });

        // Green cover section wave

        const topCurve = document.querySelector(".top-curve path");
        const topCurveTl = gsap.timeline({ repeat: -1, yoyo: true });

        topCurveTl.to(topCurve, {
          attr: {
            d: "M0 250 0 20C626 368 795-125 1438 121L1440 250Z",
          },
          duration: 15,
          ease: "sine.inOut",
        });

        const bottomCurve = document.querySelector(".bottom-curve path");
        const bottomCurveTl = gsap.timeline({ repeat: -1, yoyo: true });

        bottomCurveTl.to(bottomCurve, {
          attr: {
            d: "M0 0V92C360 202 1083 202 1440 92V0",
          },
          duration: 10,
          ease: "sine.inOut",
        });

        // Logo slider

        const track = document.querySelector(".logo-slide");
        const iconLogos = gsap.utils.toArray(".logo");

        if (track) {
          // Clone logos
          iconLogos.forEach((logo) => {
            track.appendChild(logo.cloneNode(true));
          });

          const baseSpeed = 10;

          const anim = gsap.to(".logo-slide", {
            x: "-100%",
            duration: baseSpeed,
            ease: "none",
            repeat: -1,
          });

          // Handle arrow hovers
          const leftArrow = document.querySelector(".left-arrow");
          const rightArrow = document.querySelector(".right-arrow");

          leftArrow.addEventListener("mouseenter", () => {
            gsap.to(anim, { timeScale: -2, duration: 0.3 });
          });

          leftArrow.addEventListener("mouseleave", () => {
            gsap.to(anim, { timeScale: 1, duration: 0.3 });
          });

          rightArrow.addEventListener("mouseenter", () => {
            gsap.to(anim, { timeScale: 2, duration: 0.3 });
          });

          rightArrow.addEventListener("mouseleave", () => {
            gsap.to(anim, { timeScale: 1, duration: 0.3 });
          });
        }

        if (isDesktop) {
        }
      },
      false
    );
  });
});
