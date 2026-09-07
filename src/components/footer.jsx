export default function Footer({ C, F }){
    return (
        
        <footer
        style={{
            position: "relative",
            zIndex: 2,
            padding: "16px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
        }}
        >
            <img
            style={{width: "110vw"}}
            id="bannerDark"
            src="/bannerDark.jpg"
            alt="Banner"
        />
        <span style={{ fontFamily: F.pixel, fontSize: 14, color: C.muted, letterSpacing: 2 }}>
          © {new Date().getFullYear()} {name.toUpperCase()}
        </span>
        <span style={{ fontFamily: F.pixel, fontSize: 14, color: C.purple, letterSpacing: 2 }}>
          ✦ NEURO APPROVED ✦
        </span>
      </footer>
    )
}