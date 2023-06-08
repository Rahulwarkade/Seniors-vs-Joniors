function init(){
        gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
init();

let tl = gsap.timeline();
tl.from("#p1left",{
    left : "-50%",
    // ease : "power2.inOut",
    duration : 1,
},"alpha")
.from("#p1right",{
    right : "-50%",
    // ease : "power1.inOut", 
    duration : 1,   
},"alpha")
.from("#bottom-nav",{
    bottom : "-50%",
    // ease : "power1.inOut", 
    duration : 2,   
},"alpha")

gsap.to("#p1left",{
    scrollTrigger : {
        scroller : "#main",
        trigger : "#page2",
        scrub : 2,
        start : "30% 100%",
        end : "100% 50%",
    },
    y : -800,
})
gsap.to("#p1right",{
    scrollTrigger : {
        scroller : "#main",
        trigger : "#page2",
        scrub : 2,
        start : "30% 100%",
        end : "100% 50%",
    },
    y : -800,
})
gsap.to("#bottom-nav",{
    scrollTrigger : {
        scroller : "#main",
        trigger : "#page2",
        scrub : 2,
        start : "30% 100%",
        end : "100% 50%",
    },
    delay : 1,
    y : -400,
})
gsap.from("#page2 #p2left",{
    scrollTrigger : {
        scroller : "#main",
        trigger : "#page2",
        scrub : 2,
        start : "0px 100%",
        end : "100px 180px"
    },
    scale : .3,
    y : 50,
    x : -50,
})
gsap.from("#page3 #p3right",{
    scrollTrigger : {
        scroller : "#main",
        trigger : "#page3",
        scrub : 2,
        start : "0px 100%",
        end : "100px 180px"
    },
    scale : .3,
    y : 50,
    x : 50,
})