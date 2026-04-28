import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        background: "#030712",
        color: "#ffffff",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        padding: "64px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-180px",
          right: "-160px",
          width: "520px",
          height: "520px",
          borderRadius: "520px",
          background: "rgba(255,107,0,0.20)",
          display: "flex",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "-180px",
          left: "-160px",
          width: "520px",
          height: "520px",
          borderRadius: "520px",
          background: "rgba(59,130,246,0.12)",
          display: "flex",
        }}
      />

      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "56px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "650px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              border: "1px solid rgba(255,107,0,0.35)",
              background: "rgba(255,107,0,0.10)",
              borderRadius: "999px",
              padding: "10px 18px",
              color: "#FB923C",
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            Pioneering African Innovation
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "32px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "70px",
                lineHeight: 0.98,
                fontWeight: 900,
                letterSpacing: "-4px",
                color: "#ffffff",
              }}
            >
              Transforming
            </div>

            <div
              style={{
                display: "flex",
                fontSize: "78px",
                lineHeight: 0.98,
                fontWeight: 900,
                letterSpacing: "-4px",
                color: "#FF6B00",
              }}
            >
              Digital Africa
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "30px",
              fontSize: "27px",
              lineHeight: 1.35,
              color: "#D1D5DB",
              maxWidth: "660px",
            }}
          >
            Custom software, mobile apps, AI-powered systems, and cloud
            solutions built for African businesses and global ambition.
          </div>

          <div
            style={{
              display: "flex",
              gap: "14px",
              marginTop: "42px",
            }}
          >
            {["Web Apps", "Mobile Apps", "AI Systems", "Cloud"].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: "999px",
                  padding: "12px 18px",
                  fontSize: "18px",
                  color: "#F9FAFB",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: "360px",
            height: "430px",
            borderRadius: "36px",
            border: "1px solid rgba(255,255,255,0.10)",
            background: "linear-gradient(145deg, #111827, #030712)",
            padding: "28px",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "82px",
                height: "82px",
                borderRadius: "24px",
                background: "linear-gradient(135deg, #FF6B00, #F97316)",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "40px",
                fontWeight: 900,
              }}
            >
              A
            </div>

            <div
              style={{
                display: "flex",
                marginTop: "24px",
                fontSize: "34px",
                fontWeight: 900,
                color: "#ffffff",
              }}
            >
              AkiliNova
            </div>

            <div
              style={{
                display: "flex",
                marginTop: "6px",
                fontSize: "22px",
                color: "#9CA3AF",
              }}
            >
              Technologies
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {["Software Development", "AI & Automation", "Cloud Solutions"].map(
              (item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid rgba(255,255,255,0.10)",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "18px",
                    padding: "14px 16px",
                    color: "#E5E7EB",
                    fontSize: "18px",
                  }}
                >
                  {item}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
