import fs from "fs";
import path from "path";

const folders = ["blur", "car", "girl"];
const result = {};

for (const folder of folders) {
  const files = fs.readdirSync(folder)
    .filter(f => f.endsWith(".png") || f.endsWith(".jpg"))
    .map(f => `/${folder}/${f}`);
  result[folder] = files;
}

fs.writeFileSync("wallpapers.json", JSON.stringify(result, null, 2));
