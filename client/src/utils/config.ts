import * as yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

// 读取并解析 YAML 文件
const loadConfig = () => {
  const filePath = path.resolve(__dirname, '../../config.yaml');
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = yaml.load(fileContents);
    return data;
  } catch (e) {
    console.error(e);
    return {};
  }
};

export default loadConfig;
