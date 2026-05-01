
import { useEffect, useRef } from "react";
import imageSrc from "../../assets/together.png";

export default function Banner() {
  return (
    <>
      <style>{`

        .hero-banner {
          position: relative;
          width: 100%;
          background: linear-gradient(180deg, rgb(32 57 54) 0%, rgb(43 99 80) 54%);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 200px;
          padding: 36px 48px 36px 52px;
          box-sizing: border-box;
        }

        /* subtle radial glow top-right */
        .hero-banner::before {
          content: '';
          position: absolute;
          top: -60px;
          right: 200px;
          width: 420px;
          height: 420px;
          background: radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        /* noise texture overlay */
        .hero-banner::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.35;
        }

        .hero-text {
          position: relative;
          z-index: 2;
          flex: 1;
        }

        .hero-eyebrow {
          color:#fff;
          font-size:35px;
          font-weight: 400;
          letter-spacing: 0.01em;
          margin-bottom: 4px;
        }

        .hero-heading {
          font-size: clamp(48px, 9vw, 110px);
          font-weight: 900;
          color: #ffffff;
          line-height: 1;
          margin: 0;
          letter-spacing: -0.02em;
          display: flex;
          align-items: flex-end;
          gap: 0;
          flex-wrap: wrap;
        }

        /* The highlighted "e" in Together */
        .hero-highlight {
          display: inline-block;
          position: relative;
        }

        .hero-highlight .underbox {
          display: inline-block;
          background:#fff;
          color:#408A71;
          border: 2px solid rgba(255,255,255,0.35);
          border-radius: 10px;
          padding-bottom: 10px;
          
        }

        .hero-image {
          position: relative;
          z-index: 2;
          flex-shrink: 0;
          display: flex;
          align-items: flex-end;
          height: 300px;
        }

        .hero-image img {
          height: 300px;
          width: auto;
          object-fit: contain;
          display: block;
          filter: drop-shadow(0 12px 32px rgba(0,0,0,0.28));
        }

        @media (max-width: 640px) {
          .hero-banner { padding: 28px 24px; flex-direction: column; gap: 24px; }
          .hero-eyebrow { font-size: 18px; }
          .hero-highlight .underbox { padding-bottom: 5px; }
          .hero-image { height: 130px; }
          .hero-image img { height: 130px; }
          .hero-heading { font-size: 42px; }
        }
      `}</style>

      <div className="hero-banner">
        {/* Left — text */}
        <div className="hero-text">
          <p className="hero-eyebrow">Drive Into Moments</p>
          <h1 className="hero-heading">
            {/* "To" */}
            <span>To</span>
            {/* highlighted "g" */}
            <span className="hero-highlight">
              <span className="underbox">ge</span>
            </span>
            {/* "ether" */}
            <span>ther</span>
          </h1>
        </div>

        {/* Right — car PNG */}
        <div className="hero-image">
          <img src={imageSrc} alt="Couple in a convertible car" />
        </div>
      </div>
    </>
  );
}