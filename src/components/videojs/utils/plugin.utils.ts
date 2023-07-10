import {
  VideoJsPlugin,
  VideoJsBasicPlugin,
  VideoJsManualPlugin,
} from '../models/videoJs-plugin.model';


export class PluginUtils {

  static isManualPlugin(element: any): element is VideoJsManualPlugin {
    return element.plugin !== undefined;
  }

  static classify(plugins: VideoJsPlugin[])
    : { auto: VideoJsBasicPlugin[], manual: VideoJsManualPlugin[] } {

    const autoPlugins: VideoJsBasicPlugin[] = [];
    const manualPlugins: VideoJsManualPlugin[] = [];

    plugins.map(element => {
      if (PluginUtils.isManualPlugin(element)) {
        manualPlugins.push(element);
      } else {
        autoPlugins.push(element);
      }
    });

    return { auto: autoPlugins, manual: manualPlugins };
  }
}
