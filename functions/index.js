import wallpapers from "./wallpapers.json";

/**
 * 根路径随机返回图片
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

  // 直接重定向到静态图片
  return Response.redirect(imagePath, 302);
}
