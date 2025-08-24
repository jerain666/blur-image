import fs from "fs";
import path from "path";

function getWallpapers(folder) {
  const dir = path.join(process.cwd(), folder);
  return fs.readdirSync(dir)
    .filter(f => f.endsWith(".png") || f.endsWith(".jpg"))
    .map(f => `/${folder}/${f}`);
}

export async function onRequest(context) {
  const host = context.request.headers.get("host");
  
  let folder;
  if (host.startsWith("blur1.")) folder = "blur";
  else if (host.startsWith("car1.")) folder = "car";
  else if (host.startsWith("girl.")) folder = "girl";
  else folder = "blur"; // 默认一个

  const wallpapers = getWallpapers(folder);

  // 随机一张
  const idx = Math.floor(Math.random() * wallpapers.length);
  const imagePath = wallpapers[idx];

  return Response.redirect(imagePath, 302);
}
