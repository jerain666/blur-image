import wallpapers from "../../wallpapers.json";

export async function onRequest(context) {
  const host = context.request.headers.get("host");

  let folder;
  if (host.startsWith("blur1.")) folder = "blur";
  else if (host.startsWith("car1.")) folder = "car";
  else if (host.startsWith("girl1.")) folder = "girl";
  else folder = "blur"; // 默认用 blur

  const list = wallpapers[folder];
  if (!list || list.length === 0) {
    return new Response("No images found", { status: 404 });
  }

  const idx = Math.floor(Math.random() * list.length);
  return Response.redirect(list[idx], 302);
}
