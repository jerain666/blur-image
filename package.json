import fs from "fs";
import path from "path";

const folders = ["blur", "car", "girl"];
const result = {};

for (const folder of folders) {
  const dirPath = path.join(process.cwd(), folder);
  const files = fs.readdirSync(dirPath).filter(f =>
    /\.(jpg|jpeg|png|gif|webp)$/i.test(f)
  );
  result[folder] = files.map(f => `/${folder}/${f}`);
}

fs.writeFileSync("wallpapers.json", JSON.stringify(result, null, 2));
console.log("✅ wallpapers.json 已生成");
