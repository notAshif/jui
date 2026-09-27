import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "JUI — Tactile 8-Bit & 16-Bit Game UI Primitives for Indie Games & Web RPGs";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#FFF8F0",
          backgroundImage:
            "linear-gradient(to right, #F5E8D8 2px, transparent 2px), linear-gradient(to bottom, #F5E8D8 2px, transparent 2px)",
          backgroundSize: "32px 32px",
          border: "16px solid #4B2E2B",
          padding: "48px 64px",
          fontFamily: "monospace",
        }}
      >
        {/* Top Header Row */}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo + Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#FFF8F0",
                border: "4px solid #4B2E2B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "4px 4px 0px #4B2E2B",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  backgroundColor: "#C08552",
                  border: "3px solid #4B2E2B",
                }}
              />
            </div>
            <span
              style={{
                fontSize: "36px",
                fontWeight: "900",
                color: "#4B2E2B",
                letterSpacing: "4px",
              }}
            >
              JUI
            </span>
          </div>

          {/* Badge */}
          <div
            style={{
              display: "flex",
              backgroundColor: "#C08552",
              color: "#FFF8F0",
              padding: "8px 20px",
              fontSize: "18px",
              fontWeight: "bold",
              border: "3px solid #4B2E2B",
              boxShadow: "3px 3px 0px #4B2E2B",
            }}
          >
            v0.1.0 • REACT 19 & TAILWIND v4
          </div>
        </div>

        {/* Center Hero Block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "960px",
            backgroundColor: "#FFFFFF",
            border: "6px solid #4B2E2B",
            boxShadow: "10px 10px 0px #4B2E2B",
            padding: "36px 48px",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#8C5A3C",
              letterSpacing: "3px",
              marginBottom: "12px",
            }}
          >
            ⚔️ TACTILE RETRO GAME UI PRIMITIVES
          </div>
          <div
            style={{
              fontSize: "52px",
              fontWeight: "900",
              color: "#4B2E2B",
              lineHeight: 1.15,
              marginBottom: "16px",
            }}
          >
            TACTILE 8-BIT & 16-BIT UI FOR WEB RPGS & INDIE GAMES
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#8C5A3C",
              lineHeight: 1.4,
              maxWidth: "800px",
            }}
          >
            28+ pixel-beveled components, keyboard/gamepad navigation, chiptune sound engine,
            and Jev AI decision layer for live game events.
          </div>
        </div>

        {/* Footer Meta Row */}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#4B2E2B",
          }}
        >
          <div style={{ display: "flex", gap: "24px" }}>
            <span>▶ 28 Components</span>
            <span>▶ Jev AI Engine</span>
            <span>▶ npx jui add</span>
          </div>
          <div>github.com/notAshif/jui</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
