import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Un disque de 25 kg vu de face : rouge compétition, moyeu papier.
export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent" }}>
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            background: "#d3272b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#f3f0e8", border: "4px solid #17150f" }} />
        </div>
      </div>
    ),
    size,
  );
}
