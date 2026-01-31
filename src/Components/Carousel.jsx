import { useState, useEffect } from "react";

const ModernCarousel = () => {
  const images = [
    "/assets/img/wallpa2.avif",
    "/assets/img/wallpa1.jpg",
    "/assets/img/wallpa3.avif",
    "/assets/img/wallpa4.jpeg",
  ];

  // ✅ FIXED: Remove HTML tags, use plain text
  const typingTexts = [
    "Delicious meals crafted with love.",
    "Taste that brings joy.",
    "Fresh. Flavorful. Fabulous.",
    "Food that brightens your day."
  ];

  const [index, setIndex] = useState(0);
  const [blur, setBlur] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  // Auto-slide image every 5 seconds
  useEffect(() => {
    const slideTimer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(slideTimer);
  }, [index]);

  // Auto typing effect
  useEffect(() => {
    const text = typingTexts[index];

    if (charIndex < text.length) {
      const typingTimer = setTimeout(() => {
        setTypedText((prev) => prev + text[charIndex]);
        setCharIndex(charIndex + 1);
      }, 120);

      return () => clearTimeout(typingTimer);
    }
  }, [charIndex, index]);

  const nextSlide = () => {
    setBlur(true);

    setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length);
      setTypedText("");
      setCharIndex(0);
      setBlur(false);
    }, 500);
  };

  return (
    <div style={styles.wrapper}>
      {/* Background Image */}
      <img
        src={images[index]}
        alt="slide"
        style={{
          ...styles.image,
          filter: blur ? "blur(10px)" : "blur(0px)",
          opacity: blur ? 0.4 : 1,
          transform: blur ? "scale(1.05)" : "scale(1)",
          transition: "all 0.6s ease-in-out",
        }}
      />

      {/* ✅ FIXED: Typing Text with conditional styling */}
      <div style={styles.textBox}>
        <span style={index === 0 ? styles.firstText : styles.normalText}>
          {typedText}
        </span>
        <span style={styles.cursor}>|</span>
      </div>
    </div>
  );
};

export default ModernCarousel;

const styles = {
  wrapper: {
    width: "100vw",
    height: "620px",
    marginLeft: "calc(50% - 50vw)",
    position: "relative",
    overflow: "hidden",
    marginTop: 0,
    paddingTop: 0,
  },

  image: {
    width: "100vw",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  textBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "2.6rem",
    fontWeight: "bold",
    textAlign: "center",
    width: "90%",
    maxWidth: "1000px",
    whiteSpace: "normal",
  },

  // ✅ Style for FIRST sentence only
  firstText: {
    color: "#9c0a9eff",
    fontWeight: "900",
    textShadow: "0 0 90px rgba(248, 5, 5, 0.88)",
  },

  // ✅ Style for OTHER sentences
  normalText: {
    color: "#f0f9ff",
    fontWeight: "900",
    textShadow: "0 0 80px rgba(29, 243, 247, 0.88)",
  },

  cursor: {
    display: "inline-block",
    marginLeft: "4px",
    animation: "blink 1s infinite",
    opacity: 0.8,
    color: "#f0f9ff",
  },
};