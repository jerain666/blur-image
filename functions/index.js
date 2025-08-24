import wallpapers from "./wallpapers.json";

/**
 * 根路径随机返回图片
 */
export async function onRequest(context) {
  const host = context.request.headers.get("host") || "";

  let folder;
  if (host.startsWith("blur1.")) folder = "blur";
  else if (host.startsWith("car1.")) folder = "car";
  else if (host.startsWith("girl1.")) folder = "girl";
  else folder = "blur";

  const list = wallpapers[folder];
  if (!list || list.length === 0) {
    return new Response("No images found", { status: 404 });
  }

  const idx = Math.floor(Math.random() * list.length);
  const imagePath = list[idx];

  try {
    const resp = await fetch(new URL(imagePath, `https://${host}`));
    if (!resp.ok) return new Response("Failed to fetch image", { status: 500 });

    const blob = await resp.arrayBuffer();
    const contentType = resp.headers.get("Content-Type") || "image/jpeg";

    return new Response(blob, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600"
      }
    });
  } catch (err) {
    return new Response("Error fetching image: " + err.message, { status: 500 });
  }
}
