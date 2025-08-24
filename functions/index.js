import wallpapers from "./wallpapers.json";

/**
 * 根路径随机返回图片内容
 * 子域名规则：
 *   blur1.zntv.dpdns.org -> blur
 *   car1.zntv.dpdns.org  -> car
 *   girl1.zntv.dpdns.org -> girl
 */
export async function onRequest(context) {
  const host = context.request.headers.get("host") || "";

  let folder;
  if (host.startsWith("blur1.")) folder = "blur";
  else if (host.startsWith("car1.")) folder = "car";
  else if (host.startsWith("girl1.")) folder = "girl";
  else folder = "blur"; // 默认

  const list = wallpapers[folder];
  if (!list || list.length === 0) {
    return new Response("No images found", { status: 404 });
  }

  const idx = Math.floor(Math.random() * list.length);
  const imagePath = list[idx];

  try {
    // 使用 Pages 提供的 fetch 静态资源
    const resp = await fetch(new URL(imagePath, context.env.PUBLIC_URL || "https://"+host));
    if (!resp.ok) {
      return new Response("Failed to fetch image", { status: 500 });
    }

    // 返回图片二进制数据
    const blob = await resp.arrayBuffer();
    const contentType = resp.headers.get("Content-Type") || "image/jpeg";

    return new Response(blob, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600" // 可选：缓存 1 小时
      }
    });
  } catch (err) {
    return new Response("Error fetching image: " + err.message, { status: 500 });
  }
}
