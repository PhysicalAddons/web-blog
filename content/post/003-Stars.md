+++
title = "Star enhancements"
author = "Davide Ebner"
date = "2026-04-01"
description = "I am exploring polarised light and thin-film interference on a transparent body in Blender."
tags = [
    "shader",
    "stars",
]
+++

We want to share a little progeess update on stars, as they have been an essential part of our previous atmosphere integrations.

For Physical Atmosphere², we wanted to go make sure that the stars feel better then ever, which includes various visual tweaks and additions.

The system to distribute the stars was already discussed [here](https://www.patreon.com/posts/my-god-its-full-131064614?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=postshare_fan&utm_content=web_share)

One of the biggest changes to the stars is the scaling- or rather the lack thereof.
You have probably noticed in PSA, that at long focal lengths, the stars become larger and blobby, this is because they had a fixed size/scale in the sky, no matter the zoom. This is unrealistic, as in reality, the stars are much smaller in the sky.
So we decided to implement a system that scales the stars, to keep the visual size-ratio consistent, no matter what focal length you use.
## This is without the implementation
![Untitled](/blog/images/003-Stars/stars_scaling_bad.png)
## This is with the implementation
![Untitled](/blog/images/003-Stars/stars_scaling.png)
