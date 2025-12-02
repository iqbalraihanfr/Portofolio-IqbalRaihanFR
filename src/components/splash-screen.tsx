"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

export function SplashScreen() {
  const [show, setShow] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cek apakah user sudah pernah visit di sesi ini
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (hasVisited) {
      setShow(false);
    } else {
      sessionStorage.setItem("hasVisited", "true");

      // Konteks GSAP untuk animasi masuk
      const ctx = gsap.context(() => {
        if (!containerRef.current) return;

        // Set initial state: pastikan posisi elemen benar saat invisible
        gsap.set(".char", { y: 20, rotateX: -90 });
        gsap.set(".author-box", { y: 20 });

        const tl = gsap.timeline({
          onComplete: () => {
            setShow(false);
          },
        });

        // Gunakan autoAlpha: 1 (set visibility: visible + opacity: 1)
        tl.to(".char", {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.03,
          duration: 1,
          ease: "power4.out",
        })
          .to(
            ".author-box",
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.5"
          )
          // --- CREATIVE EXIT: Curtain Reveal ---
          .to(
            ".splash-content", 
            {
              y: 200,
              autoAlpha: 0, // fade out + visibility hidden
              duration: 1,
              ease: "power2.in",
            },
            "+=1.5" 
          )
          .to(
            containerRef.current, 
            {
              yPercent: -100,
              borderBottomLeftRadius: "50% 20%", 
              borderBottomRightRadius: "50% 20%",
              duration: 1.2,
              ease: "expo.inOut",
            },
            "<" 
          );
      }, containerRef);

      return () => ctx.revert();
    }
  }, []);

  // Helper untuk memecah teks menjadi karakter
  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} className="char inline-block whitespace-pre invisible">
        {char}
      </span>
    ));
  };

  return (
    <AnimatePresence>
      {show && (
        <div
          ref={containerRef}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1a1a1a] text-white px-4 text-center overflow-hidden"
        >
          <div className="splash-content max-w-3xl perspective-[500px]">
            <div className="text-2xl md:text-4xl font-serif leading-relaxed mb-8 italic text-gray-200 tracking-wide">
              <div className="mb-2">
                {splitText("“Selama toko buku ada..")}
              </div>
              <div>
                {splitText("Selama itu pustaka bisa dibentuk kembali.”")}
              </div>
            </div>
            
            <div className="author-box flex flex-col items-center gap-2 invisible">
              <span className="w-16 h-[1px] bg-gray-500 mb-2"></span>
              <p className="text-base md:text-lg text-gray-300 font-medium tracking-wider">
                — Tan Malaka
              </p>
              <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest">
                Madilog (1943)
              </p>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
