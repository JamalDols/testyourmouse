import { ImageResponse } from "next/og";

export const alt = "TestYourMouse - Professional Mouse Testing Tools";
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
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0f 0%, #12121a 100%)",
          position: "relative",
        }}
      >
        {/* Top gradient line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #0dcaf0 0%, #a855f7 100%)",
          }}
        />

        {/* Mouse icon circles */}
        <div
          style={{
            position: "absolute",
            top: "140px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              background: "rgba(13, 202, 240, 0.1)",
              position: "absolute",
            }}
          />
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "rgba(13, 202, 240, 0.2)",
              position: "absolute",
            }}
          />
          <div
            style={{
              width: "60px",
              height: "80px",
              borderRadius: "30px 30px 20px 20px",
              border: "4px solid #0dcaf0",
              background: "transparent",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "10px",
            }}
          >
            <div
              style={{
                width: "2px",
                height: "20px",
                background: "#0dcaf0",
              }}
            />
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "180px",
          }}
        >
          {/* Title */}
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              background: "linear-gradient(90deg, #0dcaf0 0%, #a855f7 100%)",
              backgroundClip: "text",
              color: "transparent",
              margin: "0 0 20px 0",
              letterSpacing: "-2px",
            }}
          >
            TestYourMouse
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "32px",
              color: "#8b949e",
              margin: "0 0 40px 0",
            }}
          >
            Professional Mouse Testing Tools
          </p>

          {/* Features */}
          <p
            style={{
              fontSize: "24px",
              color: "#6e7681",
              margin: 0,
            }}
          >
            CPS Test • Double Click • Tracking • Jitter • Scroll Test
          </p>
        </div>

        {/* Bottom gradient line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #0dcaf0 0%, #a855f7 100%)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
