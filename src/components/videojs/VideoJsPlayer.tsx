import React, { FunctionComponent } from 'react';
import { useEffect, useRef } from 'react';

import videoJs from 'video.js';
import { VideoJsPlayerResources } from './models/videoJs-player-resources.model';
import { VideoJsInstance } from './models/videoJs-instance.model';
import { VideoJsPlayerOptions } from './models/videoJs-player-options.model';
import { VideoJsPluginsOptions } from './models/videoJs-plugins-options.model';
import { VideoJsBasicPlugin, VideoJsManualPlugin } from './models/videoJs-plugin.model';

import { PluginUtils } from './utils/plugin.utils';

import 'video.js/dist/video-js.css';

type VideoJsPlayerProps = {
  className?: string;
  resources?: VideoJsPlayerResources;
  options?: VideoJsPlayerOptions;
  plugins?: VideoJsPluginsOptions;

  onReady?: (player: VideoJsInstance) => void;
}

export const VideoJsPlayer: FunctionComponent<VideoJsPlayerProps>
  = (props: VideoJsPlayerProps) => {

    const player: React.RefObject<VideoJsInstance> = useRef<VideoJsInstance>(null);
    const playerRef: React.RefObject<HTMLVideoElement> = useRef<HTMLVideoElement>(null);

    let autoPlugins: VideoJsBasicPlugin[] = [];
    let manualPlugins: VideoJsManualPlugin[] = [];

    if (props.plugins !== undefined) {
      const filteredPlugins = PluginUtils.classify(props.plugins);

      autoPlugins = filteredPlugins.auto;
      manualPlugins = filteredPlugins.manual;
    }

    const playerOptions: videoJs.PlayerOptions = {
      ...props.resources,
      ...props.options,
      plugins: undefined,
    };

    useEffect(() => {
      if (player.current === null) {
        const instance = videoJs(playerRef.current, playerOptions);

        // Option initialization of auto plugins
        autoPlugins.map(element => {
          instance[element.name](element.options);
        });

        // Registration and Option initialization of manual plugins
        manualPlugins.map(element => {
          videoJs.registerPlugin(
            element.name,
            element.plugin,
          );
          instance[element.name](player, element.options);
        });

        if (props.onReady) {
          props.onReady(instance);
        }

        (player as React.MutableRefObject<VideoJsInstance>).current = instance;
      }

      return () => { player.current && player.current.dispose(); };
    }, []);

    return (
      <div data-vjs-player>
        <video ref={playerRef} className={`video-js ${props.className}`} />
      </div>
    );
  }
