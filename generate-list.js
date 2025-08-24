import fs from "fs";
import path from "path";

const folders = ["blur", "car", "girl"];
const result = {};

for (const folder of folders) {
  const dirPath = path.join(process.cwd(), "public", folder);
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

const outputPath = path.join(process.cwd(), "functions", "wallpapers.json");
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
console.log("✅ wallpapers.json 已生成到 functions 目录");
