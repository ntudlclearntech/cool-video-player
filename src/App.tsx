import React, { FC } from 'react';

import Grid from '@mui/material/Unstable_Grid2';

import { VideoPlayer } from 'src/components/video-player/VideoPlayer';
import { VideoType } from './models/video-type.enum';

export const App: FC = () => {
  const video = {
    videoType: VideoType.UserUploaded,
    thumbnailPath: 'https://placehold.co/600x400',
    // This sample video can not seek.
    sourceUri: 'https://filesamples.com/samples/video/mp4/sample_1280x720.mp4',
    altSourceUri: 'https://filesamples.com/samples/video/mp4/sample_1280x720.mp4',
  }

  const comments = [
    {
      id: 1,
      videoTime: 10,
      content: '123',
      username: 'test',
    },
    {
      id: 2,
      videoTime: 20,
      content: '123',
      username: 'test',
    }
  ]

  return (
    <Grid container>
      <Grid xs={10} xsOffset={1}>
        <VideoPlayer video={video} comments={comments} />
      </Grid>
    </Grid>
  );
}
