+++
title = "Sharp Stars at Every Zoom Level"
author = "Davide Ebner"
date = "2026-04-01"
description = "How auto-scaling keeps stars looking right no matter the zoom level or resolution.."
tags = [
    "Blender",
    "Atmosphere²",
    "shader",
    "stars",
]
+++

We wanted to share a quick progress update on stars, which have always been an important part of our atmosphere integrations.
For Physical Atmosphere², we want to make sure that stars feel better than ever. That means a range of visual improvements and new additions in the backend.

The system to distribute the stars was already covered [here on a Patreon post](https://www.patreon.com/posts/my-god-its-full-131064614?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=postshare_fan&utm_content=web_share), so I won't go into too much detail about it again here.

One of the most significant changes is how stars are now scaled, or more precisely, how they no longer "scale".
If you've used PSA at longer focal lengths, you've probably noticed stars growing large and blobby. That happened because their size was fixed in screen space regardless of zoom level, which isn't physically accurate. In reality, stars take up an extremely small angle in the sky and only appear as tiny dots even at bigger focal lengths.

To fix this, we implemented a system that scales star size based on both the FOV and the current screen resolution, keeping the visual size ratio consistent across all focal lengths. To match the realistic angular size of stars, we permanently scale them to merely a few pixels.

## Without auto-scaling
![Untitled](/blog/images/003-Stars/stars_scaling_bad.png)
## With auto-scaling
![Untitled](/blog/images/003-Stars/stars_scaling.png)

As you can see, the stars are scaled down proportionally to the zoom, instead of being rendered as big blobs that take up most of the screen.

The way this works is, that we read the viewport resolution (x,y) and view FOV (in radiants).
![Untitled](/blog/images/003-Stars/node_scene.png)
This allows us to dynamically change the scale of the stars based on the resolution, to keep the stars radius always only a few pixels wide and avoid "blobiness".
