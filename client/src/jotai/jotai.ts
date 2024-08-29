import { atom } from 'jotai';
import * as yaml from 'js-yaml';
import { SiteConfig } from '../types/types';

interface Config {
    site: SiteConfig;
}

// 解析 YAML 配置
const configData = yaml.load(process.env.CONFIG || '{}') as Config;

// 定义全局配置的 atom
export const configAtom = atom<Config | null>(configData);
export const animationStageAtom = atom("open");