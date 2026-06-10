import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Revenue Ladder",
    short_name: "Revenue Ladder",
    description: "Welsh web design & automation agency based in Bangor, North Wales.",
    start_url: "/",
    display: "standalone",
    background_color: "#EDEAE5",
    theme_color: "#1A4D2E",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  }
}
