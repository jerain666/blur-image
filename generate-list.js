import fs from "fs";
import path from "path";

// 你三个文件夹
const folders = ["blur", "car", "girl"];
const result = {};

for (const folder of folders) {
  const dirPath = path.join(process.cwd(), folder);
  if (!fs.existsSync(dirPath)) {
    console.warn(`⚠️ 文件夹不存在: ${folder}`);
    result[folder] = [];
    continue;
  }

  const files = fs.readdirSync(dirPath).filter(f =>
    /\.(jpg|jpeg|png|gif|webp)$/i.test(f)
  );

  result[folder] = files.map(f => `/${folder}/${f}`);
}

// 写入 wallpapers.json
fs.writeFileSync("wallpapers.json", JSON.stringify(result, null, 2));
console.log("✅ wallpapers.json 已生成");
