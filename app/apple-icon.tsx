import { ImageResponse } from "next/og"
import { Logo } from "@/components/logo-static"

// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = "image/png"

// Image generation
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: "50%",
      }}
    >
      <Logo size={160} />
    </div>,
    {
      ...size,
    },
  )
}
