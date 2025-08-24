import wallpapers from "../../wallpapers.json";

/**
 * Cloudflare Pages Function
 * 根据访问的子域名返回随机图片
 * 子域名规则：
 *   blur1.zntv.dpdns.org -> 返回 blur 文件夹的随机图片
 *   car1.zntv.dpdns.org  -> 返回 car 文件夹的随机图片
 *   girl1.zntv.dpdns.org -> 返回 girl 文件夹的随机图片
 */
export async function onRequest(context) {
  const host = context.request.headers.get("host") || "";

  let folder;
  if (host.startsWith("blur.")) folder = "blur";
  else if (host.startsWith("car.")) folder = "car";
  else if (host.startsWith("girl.")) folder = "girl";
  else folder = "blur"; // 默认用 blur

  const list = wallpapers[folder];

  if (!list || list.length === 0) {
    return new Response("No images found", { status: 404 });
  }

  // 随机选择一张图片
  const idx = Math.floor(Math.random() * list.length);
  const imagePath = list[idx];

  // 返回 302 重定向到图片
  return Response.redirect(imagePath, 302);
}
