+++
title = "Clouds 01: Research"
author = "Davide Ebner"
date = "2026-05-13"
description = "How we collected research and reference for a cloud shader"
tags = [
    "Blender",
    "Atmosphere²",
    "shader",
    "clouds",
    "research",
]
+++

## Volumetric Clouds in Atmosphere² - Where We Started
 
One of the long-standing goals for Atmosphere² has been a real-time volumetric cloud system, fully integrated into the world shader instead of relying on the render engine. 
The challenge was always feasibility: clouds done right are expensive, both in rendering cost and development time. But as work on Atmosphere² ramped up, it became clear they weren't optional. Believable skies need believable clouds.

So, where do you actually begin with something like this?
 
## Looking at Existing Implementations
The most grounded starting point is always to study what's already out there.
Research papers are plentiful, but practical references matter just as much as theory. 
A particularly useful one turned up when Rocket Werkz released a free pre-alpha of [Kitten Space Agency](https://ahwoo.com/app/100000/kitten-space-agency). 
It's a work in progress, but their cloud system is already impressive, especially in how it handles full planetary coverage and the shape-generation of cloud volumes. 
With shader code accessible, it gave us a usable reference for how those ideas translate into a real implementation.
 
![Untitled](/blog/images/clouds_research/ksa.webp)
 
Guerrilla Games also published a [detailed writeup on their cloud rendering approach](https://www.guerrilla-games.com/read/synthesizing-realistic-clouds-for-video-games), which is thorough and worth reading, though it leans heavily theoretical and doesn't map cleanly onto a practical system without significant interpretation.

Another awesome reference source is [GeoSpacal clouds](https://takram-design-engineering.github.io/three-geospatial/?path=/story/clouds-3d-tiles-renderer-integration--fuji), which is apart of the [Geospatial Rendering](https://github.com/takram-design-engineering/three-geospatial/) library.

![Untitled](/blog/images/clouds_research/Storybook.webp)

The speed and customizability of the clouds is very impressive.
 
## Digital ground-truth via pathtracing
 
Technical approaches only get you so far. The more fundamental question is: what does a correct result actually look like?

Real clouds aren't uniform. Luminance varies with density: denser regions scatter more light and appear brighter, while hazier and less dense clouds shift towards grey. 
Godrays, silver linings, backscattering (the way clouds glow from behind), are all things that make it believable. 
A system that ignores them will look fake no matter how technically advanced the raymarch is.

Cycles already handles this correctly through pathtracing, so we used it as a ground-truth digital reference, rendering volumetric clouds and studying exactly how luminance distributes across different density profiles.

- Front-lit render (high to low density / left-to-right)

![Untitled](/blog/images/clouds_research/cycles_front.webp)

- Back-lit render (mirrored low to high density / left-to-right)

![Untitled](/blog/images/clouds_research/cycles_back.webp)

As you can see in the front-lit image, the lower the density, the greyer it appears. This is because there are less water droplets to refract the light.
In return, a denser cloud appears brighter due to more refraction.

For the back-lit image, the light can travel deeper into the hazier / less dense cloud. The denser clouds have less backscattering and show sharper details.

## Looking at Reality

We also have access to a surprisingly good real-world reference source: a pilot, who provided photos and observational data covering a wide range of conditions and altitudes. 
That kind of reference, looking at clouds from above, from within, from the cockpit during approach and fly-thoughs, is hard to replicate otherwise and has directly influenced what we're building toward.
 
![Untitled](/blog/images/clouds_research/photo_anvil.webp)

![Untitled](/blog/images/clouds_research/photo_big.webp)

![Untitled](/blog/images/clouds_research/photo_haze.webp)

![Untitled](/blog/images/clouds_research/photo_sunset.webp)

## What it looks like in practice
It is very important to mention that this is still work in progress and all current prototypes are made in shadertoy.

The progress is visible nonetheless, as you can see in the comparison below.

The old approach without proper reference adherence:

![Untitled](/blog/images/clouds_research/shader_old.webp)

The new approach, using more sophisticated functions to further approximate the references as close as possible.

![Untitled](/blog/images/clouds_research/shader_new.webp)


And here is Mārtiņš observing clouds on the roof

![Untitled](/blog/images/clouds_research/IMG_6025.jpg)
