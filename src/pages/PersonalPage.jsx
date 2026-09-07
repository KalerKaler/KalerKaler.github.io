import React, { useState, useEffect } from "react";
import { useMusic } from "../context/MusicContext";

// ─── Palette ──────────────────────────────────────────────────────────────────
const C = {
  bg:     "#322a27",
  card:   "#1c1410",
  card2:  "#241a15",
  pink:   "#ff6eb4",
  teal:   "#00ffcc",
  amber:  "#ffaa40",
  purple: "#c084fc",
  red:    "#ff4455",
  text:   "#ffe8c8",
  muted:  "#7a5f50",
  dim:    "#4a3a30",
};

const F = {
  pixel:   "'VT323', monospace",
  display: "'Fraunces', Georgia, serif",
  mono:    "'DM Mono', monospace",
  body:    "'DM Sans', system-ui, sans-serif",
};

// ─── Injected CSS ─────────────────────────────────────────────────────────────
const CSS = `
  @keyframes glitch {
    0%,88%,100% { text-shadow:none; transform:skewX(0) translateX(0); }
    89%  { text-shadow: 3px 0 ${C.pink},-3px 0 ${C.teal}; transform:skewX(-2deg) translateX(2px); }
    90%  { text-shadow:-4px 0 ${C.pink}, 4px 0 ${C.teal}; transform:skewX(1deg) translateX(-2px); }
    91%  { text-shadow: 2px 0 ${C.pink},-2px 0 ${C.teal}; transform:skewX(0) translateX(0); }
    92%  { text-shadow:none; }
  }
  @keyframes scanmove {
    0%   { top: -4%; opacity: 0.7; }
    100% { top: 110%; opacity: 0; }
  }
  @keyframes blink  { 0%,49%{opacity:1} 50%,100%{opacity:0} }
  @keyframes eq     { 0%,100%{transform:scaleY(0.2)} 50%{transform:scaleY(1)} }
  @keyframes float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
  @keyframes spin   { to{transform:rotate(360deg)} }
  @keyframes hue    { 0%{filter:hue-rotate(0deg)} 100%{filter:hue-rotate(360deg)} }
  @keyframes marquee-loop { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  @keyframes flicker {
    0%,96%,100%{opacity:1}
    97%{opacity:0.94}
    98%{opacity:1}
    99%{opacity:0.96}
  }
  @keyframes ping-dot {
    0%   { box-shadow: 0 0 0 0 rgba(0,255,136,0.5); }
    70%  { box-shadow: 0 0 0 10px rgba(0,255,136,0); }
    100% { box-shadow: 0 0 0 0  rgba(0,255,136,0); }
  }
  .glitch  { animation: glitch 6s infinite; }
  .blk     { animation: blink 1s step-start infinite; }
  .flt     { animation: float 3.5s ease-in-out infinite; }
  .flickr  { animation: flicker 9s infinite; }
  .scanlines {
    background: repeating-linear-gradient(
      0deg, transparent, transparent 3px,
      rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px
    );
    pointer-events: none;
  }
  a { text-decoration: none; }
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Corners({ color = C.pink, size = 14, t = 2 }) {
  const half = size;
  const b = `${t}px solid ${color}`;
  const pos = { position: "absolute", width: half, height: half };
  return (
    <>
      <div style={{ ...pos, top: -1, left: -1, borderTop: b, borderLeft: b }} />
      <div style={{ ...pos, top: -1, right: -1, borderTop: b, borderRight: b }} />
      <div style={{ ...pos, bottom: -1, left: -1, borderBottom: b, borderLeft: b }} />
      <div style={{ ...pos, bottom: -1, right: -1, borderBottom: b, borderRight: b }} />
    </>
  );
}

function PixelLabel({ children, color = C.pink }) {
  return (
    <span
      style={{
        fontFamily: F.pixel,
        fontSize: 13,
        color,
        letterSpacing: 3,
        background: `${color}18`,
        border: `1px solid ${color}44`,
        padding: "1px 8px",
      }}
    >
      {children}
    </span>
  );
}

function SectionHead({ label, color = C.pink }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
      <span style={{ fontFamily: F.pixel, fontSize: 24, color }}>{">"}</span>
      <span style={{ fontFamily: F.pixel, fontSize: 22, color, letterSpacing: 3 }}>{label}</span>
      <span className="blk" style={{ fontFamily: F.pixel, fontSize: 22, color }}>_</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${color}55, transparent)` }} />
    </div>
  );
}

function EqBars({ color = C.pink, active = false, count = 7 }) {
  const h = [0.5, 1, 0.65, 0.9, 0.4, 0.8, 0.55];
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 20 }}>
      {h.slice(0, count).map((v, i) => (
        <div
          key={i}
          style={{
            width: 3,
            height: v * 20,
            background: color,
            borderRadius: 1,
            transformOrigin: "bottom",
            animation: active ? `eq ${0.35 + i * 0.1}s ease-in-out ${i * 0.06}s infinite alternate` : "none",
          }}
        />
      ))}
    </div>
  );
}

function BlockBar({ val, max, color = C.pink }) {
  const filled = Math.round(Math.min(1, val / max) * 10);
  return (
    <span style={{ fontFamily: F.pixel, fontSize: 18, color, letterSpacing: 1, userSelect: "none" }}>
      {"▓".repeat(filled)}<span style={{ opacity: 0.2 }}>{"░".repeat(10 - filled)}</span>
    </span>
  );
}

// ─── Scanning line effect ─────────────────────────────────────────────────────
function ScanBeam() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 98, pointerEvents: "none", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: 120,
          background: `linear-gradient(to bottom, transparent, rgba(255,110,180,0.025) 50%, transparent)`,
          animation: "scanmove 8s linear infinite",
        }}
      />
    </div>
  );
}

// ─── Now Playing ──────────────────────────────────────────────────────────────
function NowPlaying({ track }) {
  const [playing, setPlaying] = useState(track.isNowPlaying);

  return (
    <div style={{ position: "relative", background: C.card, border: `1px solid ${C.pink}44`, marginBottom: 20 }}>
      <Corners color={C.pink} size={16} t={2} />

      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 20px",
          borderBottom: `1px solid ${C.pink}22`,
          background: `${C.pink}0d`,
        }}
      >
        <EqBars color={C.pink} active={playing} />
        <span style={{ fontFamily: F.pixel, fontSize: 16, color: C.pink, letterSpacing: 3, flex: 1 }}>
          {track.isNowPlaying ? "NOW PLAYING" : "LAST SCROBBLE"}
        </span>
        <a href={track.url} target="_blank"
          style={{
            background: "transparent",
            border: `1px solid ${C.pink}88`,
            color: C.pink,
            fontFamily: F.pixel,
            fontSize: 18,
            padding: "2px 14px",
            cursor: "pointer",
            letterSpacing: 2,
            transition: "all .15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `${C.pink}22`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          ▶
        </a>
      </div>

      {/* Body */}
      <div style={{ display: "flex", gap: 20, padding: 20, alignItems: "center" }}>
        {/* Art */}
        <div style={{ position: "relative", flexShrink: 0, width: 96, height: 96 }}>
          <div
            style={{
              width: "100%",
              height: "100%",
              border: `2px solid ${C.pink}66`,
              boxShadow: `0 0 24px ${C.pink}44, inset 0 0 12px rgba(0,0,0,0.4)`,
              overflow: "hidden",
            }}
          >
            {track.albumArt ? (
              <img src={track.albumArt} alt="album" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `${C.pink}22`,
                  fontFamily: F.pixel,
                  fontSize: 36,
                  color: C.pink,
                }}
              >
                ♪
              </div>
            )}
          </div>
          <div className="scanlines" style={{ position: "absolute", inset: 0 }} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              overflow: "hidden",
              marginBottom: 6,
            }}
          >
            <div style={{ display: "inline-flex", whiteSpace: "nowrap" }}>
              <span style={{ fontFamily: F.display, fontSize: "1.5rem", color: C.text, fontWeight: 300, paddingRight: 48 }}>
                {track.name}
              </span>
            </div>
          </div>

          <p style={{ fontFamily: F.mono, fontSize: "0.85rem", color: C.muted, margin: "0 0 14px", letterSpacing: 1 }}>
            {track.artist}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Top Artists ──────────────────────────────────────────────────────────────
const RANK_COLORS = [C.amber, "#c0c0c0", "#cd7f32", C.teal, C.pink];
const RANK_GLYPHS = ["①", "②", "③", "④", "⑤"];

function TopArtists({ artists = [] }) {
  const max = Math.max(...artists.map((a) => Number(a.playCount) || 0), 1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {artists.slice(0, 5).map((a, i) => {
        const col = RANK_COLORS[i] ?? C.muted;
        return (
          <div
            key={i}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "10px 16px",
              background: i === 0 ? `${C.amber}0c` : "rgba(0,0,0,0.2)",
              border: `1px solid ${i === 0 ? C.amber + "44" : "rgba(255,255,255,0.05)"}`,
            }}
          >
            {i === 0 && <Corners color={C.amber} size={10} t={1} />}
            <span style={{ fontFamily: F.pixel, fontSize: 24, color: col, minWidth: 28, userSelect: "none" }}>
              {RANK_GLYPHS[i]}
            </span>
            <div style={{ width: 38, height: 38, flexShrink: 0, overflow: "hidden", border: `1px solid ${col}55` }}>
              {a.image ? (
                <img src={a.image} alt={a.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `${col}22`,
                    fontFamily: F.pixel,
                    color: col,
                    fontSize: 20,
                  }}
                >
                  ♫
                </div>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: F.body, fontSize: "0.85rem", color: C.text, margin: "0 0 2px", fontWeight: 500 }}>
                {a.name}
              </p>
              <BlockBar val={Number(a.playCount) || 0} max={max} color={col} />
            </div>
            <span style={{ fontFamily: F.pixel, fontSize: 16, color: C.muted, flexShrink: 0 }}>
              {Number(a.playCount).toLocaleString()}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Neuro Panel ──────────────────────────────────────────────────────────────

function NeuroPanel() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 90);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ position: "relative", background: C.card, border: `1px solid ${C.purple}55` }}>
      <Corners color={C.purple} size={18} t={2} />

      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 22px",
          borderBottom: `1px dashed ${C.purple}44`,
          background: `${C.purple}0c`,
        }}
      >
        <span className="flt" style={{ fontSize: 28, userSelect: "none", width: "3rem" }}><img src="./nuroThumb.jpg"/></span>
        <div>
          <p style={{ fontFamily: F.pixel, fontSize: 22, color: C.purple, margin: 0, letterSpacing: 3 }}>NEURO-SAMA</p>
          <p style={{ fontFamily: F.mono, fontSize: "0.65rem", color: C.muted, margin: 0, letterSpacing: 2 }}>
            AI VTUBER · VEDAL987 · EST. 2019
          </p>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#00ff88", animation: "ping-dot 1.8s infinite" }} />
          <span style={{ fontFamily: F.pixel, fontSize: 16, color: "#00ff88", letterSpacing: 3 }}>LIVE</span>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 1,
          background: `${C.purple}18`,
          border: `1px solid ${C.purple}18`,
          margin: "1px 0",
        }}
      >
      </div>

      {/* Spinner row */}
      <div style={{ padding: "14px 22px", borderTop: `1px dashed ${C.purple}33` }}>

        <a
          href="https://twitch.tv/vedal987"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "8px 22px",
            border: `1px solid ${C.purple}99`,
            color: C.purple,
            fontFamily: F.pixel,
            fontSize: 18,
            letterSpacing: 3,
            transition: "all .15s",
            background: "transparent",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = `${C.purple}28`;
            el.style.boxShadow = `0 0 20px ${C.purple}55`;
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background = "transparent";
            el.style.boxShadow = "none";
          }}
        >
          {"[ TUNE IN ]"}
        </a>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ name, bio, avatarUrl, githubUrl, linkedinUrl }) {
  return (
    <section style={{ padding: "40px 0 32px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "flex-start" }}>
        {/* Avatar */}
        <div style={{ position: "relative", flexShrink: 0, animation: "float 4s ease-in-out infinite" }}>
          <div
            style={{
              width: 128,
              height: 128,
              border: `2px solid ${C.pink}`,
              boxShadow: `0 0 0 5px ${C.pink}1a, 0 0 40px ${C.pink}55`,
              overflow: "hidden",
            }}
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `linear-gradient(135deg, ${C.pink}33, ${C.teal}22)`,
                  fontFamily: F.pixel,
                  fontSize: 44,
                  color: C.pink,
                }}
              >
                ✦
              </div>
            )}
          </div>
          <Corners color={C.teal} size={18} t={2} />
          {/* Live dot */}
          <div
            style={{
              position: "absolute",
              bottom: 5,
              right: 5,
              width: 13,
              height: 13,
              borderRadius: "50%",
              background: "#00ff88",
              border: `2px solid ${C.card}`,
              animation: "ping-dot 2s infinite",
            }}
          />
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
            <PixelLabel color={C.teal}>CSE STUDENT</PixelLabel>
            <PixelLabel color={C.amber}>MUSIC ENJOYER</PixelLabel>
            <PixelLabel color={C.purple}>NEURO FAN</PixelLabel>
          </div>
          <h1
            className="glitch"
            style={{
              fontFamily: F.display,
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 300,
              color: C.text,
              margin: "0 0 14px",
              lineHeight: 1.05,
            }}
          >
            {name}
          </h1>
          <p style={{ fontFamily: F.mono, fontSize: "0.8rem", color: C.muted, margin: 0, lineHeight: 1.8 }}>
            <span style={{ color: C.pink }}>{">"}</span> {bio}
            <span className="blk" style={{ color: C.pink }}> ▌</span>
          </p>
        </div>
      </div>

      {/* Stat bar */}
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: 28, border: `1px solid ${C.dim}`, overflow: "hidden" }}>
        {[
          { label: "MAJOR",     val: "CS/ENG",     col: C.teal },
          { label: "MUSIC",     val: "ACTIVE",      col: C.pink },
          { label: "CERTS",     val: "STACKED",     col: C.amber },
          { label: "NEURO FAN", val: "CERTIFIED ✦", col: C.purple },
        ].map((s, i, arr) => (
          <div
            key={s.label}
            style={{
              flex: 1,
              minWidth: 100,
              padding: "12px 16px",
              background: i % 2 === 0 ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.15)",
              borderRight: i < arr.length - 1 ? `1px solid ${C.dim}` : "none",
            }}
          >
            <p style={{ fontFamily: F.pixel, fontSize: 11, color: C.muted, margin: "0 0 3px", letterSpacing: 3 }}>{s.label}</p>
            <p style={{ fontFamily: F.pixel, fontSize: 18, color: s.col, margin: 0 }}>{s.val}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
// function Nav({ githubUrl, linkedinUrl }) {
//   return (
    
//   );
// }

// ─── Divider ─────────────────────────────────────────────────────────────────
function Divider({ colors = [C.pink, C.teal] }) {
  return (
    <div
      style={{
        height: 1,
        margin: "12px 0 36px",
        background: `linear-gradient(to right, transparent, ${colors[0]}77, ${colors[1]}55, transparent)`,
      }}
    />
  );
}

// ─── Exports ──────────────────────────────────────────────────────────────────
export function PersonalPage({
  name = "Rajveer Singh Kaler",
  bio = "A passionate and continuously learning student who does not back down from hard work.",
  recentTrack,
  topArtists = [],
  avatarUrl = "./my pfp.png",
  githubUrl = "#",
  linkedinUrl = "#",
}) {
  return (
    <div className="flickr" style={{ position: "relative", minHeight: "100vh", background: C.bg, color: C.text, fontFamily: F.body }}>
      <style>{CSS}</style>

      {/* Overlays */}
      <div className="scanlines" style={{ position: "fixed", inset: 0, zIndex: 100, pointerEvents: "none" }} />
      <ScanBeam />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 97,
          pointerEvents: "none",
          background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Background grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `linear-gradient(${C.pink}09 1px, transparent 1px), linear-gradient(90deg, ${C.pink}09 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
        }}
      />

      {/* Noise grain */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          opacity: 0.4,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      />

      <main style={{ position: "relative", zIndex: 2, maxWidth: "80vw", margin: "0 auto", padding: "0 24px 60px" }}>
        <Hero name={name} bio={bio} avatarUrl={avatarUrl} githubUrl={githubUrl} linkedinUrl={linkedinUrl} />

        <Divider colors={[C.pink, C.teal]} />

        {/* Music Section (Now Playing + Top Artists side-by-side) */}
        <section style={{ marginBottom: 48 }}>
          <SectionHead label="MUSIC.LOG" color={C.pink} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 20,
              alignItems: "stretch",
            }}
          >
            {/* Left Column: Player */}
            <div>
              {recentTrack && <NowPlaying track={recentTrack} />}
            </div>

            {/* Right Column: Top Artists */}
            {topArtists.length > 0 && (
              <div>
                <p style={{ fontFamily: F.pixel, fontSize: 14, color: C.muted, letterSpacing: 3, margin: "0 0 10px" }}>
                  // TOP ARTISTS — ALL TIME
                </p>
                <TopArtists artists={topArtists} />
              </div>
            )}
          </div>
        </section>

        <Divider colors={[C.purple, C.teal]} />

        {/* Neuro */}
        <section>
          <SectionHead label="NEURO.EXE (MY OBSESSION)" color={C.purple} />
          <NeuroPanel />
        </section>
      </main>
    </div>
  );
}

// ─── Preview / dev ────────────────────────────────────────────────────────────
export default function Personal() {
  const { tracks, artists, loading } = useMusic();
  return (
    <>
    <PersonalPage
      recentTrack = {tracks[0]}
      topArtists={artists}
    />
    </>
  );
}
