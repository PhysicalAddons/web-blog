+++
title = "Star rendering enhancements"
author = "Davide Ebner"
date = "2026-04-01"
description = "We worked on improving the visual fidelity of the stars for Physical Atmosphere²."
tags = [
    "shader",
    "stars",
]
+++

We want to share a little progeess update on stars, as they have been an essential part of our previous atmosphere integrations.

For Physical Atmosphere², we wanted to make sure that the stars feel better then ever, which includes various visual tweaks and additions.

The system to distribute the stars was already discussed [here on a Patreon post](https://www.patreon.com/posts/my-god-its-full-131064614?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=postshare_fan&utm_content=web_share).

One of the biggest changes to the stars is the scaling- or rather the lack thereof.
You have probably noticed in PSA that at long focal lengths the stars become larger and blobby, this is because they had a fixed size/scale in the sky, no matter the zoom. This is unrealistic, as in reality, the stars are visually much smaller in the sky.
So we decided to implement a system that scales the stars based on the FOV and screen resolution, to keep the visual size-ratio consistent, no matter what focal length you use.

## Without auto-scaling
![Untitled](/blog/images/003-Stars/stars_scaling_bad.png)
## With auto-scaling
![Untitled](/blog/images/003-Stars/stars_scaling.png)

As you can see, the stars are scaled down proportionally to the zoom, instead of being rendered as big blobs thate take up most of the screen.

The way this works, is that we read the viewport resolution (x,y) and view FOV (in radiants).
![Untitled](/blog/images/003-Stars/node_scene.png)
This allows us to dynamically change the scale of the stars based on the resolution, to keep the stars radius always only a few pixels wide and avoid "blobiness".
