export type VideoJsBasicPlugin = {
  name: string;
  options: object;
}

export type VideoJsManualPlugin = {
  plugin: (option: object) => void;
} & VideoJsBasicPlugin;

export type VideoJsPlugin = VideoJsBasicPlugin | VideoJsManualPlugin;
