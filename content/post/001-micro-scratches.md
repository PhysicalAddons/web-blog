+++
title = "Micro scratches"
author = "Martins Upitis"
date = "2022-02-12"
description = "I want to achieve realistic microscratching on shiny surfaces. This is my first test. I am not entirely satisfied, but I am getting there eventually."
tags = [
    "microscratches",
    "voronoi",
    "shader",
]
+++

# 001 Micro-scratches

Goal for this experiment is again automotive shader related - I want to achieve realistic microscratching on shiny surfaces. This is my first test. I am not entirely satisfied, but I am getting there eventually.

![Untitled](/blog/images/001-micro-scratches/red-scratches.jpeg)

In order to get the anisotropic reflections, you need to calculate the scratch normals.
Initially I started with a V shape groove, but a U shape gave me more ‘stable’ results with less sampling. Now only the groove direction towards the light source lights up.

![Untitled](/blog/images/001-micro-scratches/particles-as-liquid.jpeg)

The first micro-scratches (swirlmarks, spiderwebbing) render results I am near-satisfied with in [#Blender3D](https://twitter.com/hashtag/Blender3D?src=hashtag_click) rendered in Eevee.

I am now looking for ways to improve anti-aliasing and keep the scratch texture passes lower.

![Untitled](/blog/images/001-micro-scratches/scratches-on-porsche.jpeg)

![Untitled](/blog/images/001-micro-scratches/scratches-on-hood.jpeg)

Notice that I tried a naive scratch iridescence. It was done with the thin-film interference LUT approach I used on car headlights few posts ago. 

Input the scratch depth into ‘thickness’ slot and it resulted to this. I am quite happy with it, even though it is wrong :)

![Untitled](/blog/images/001-micro-scratches/scratch-thickness.jpeg)

Few more screenshots.
There is a lot of room for improvement visually and performance-wise.

The current 16 procedural Voronoi scratch texture passes are slow.
~300 render samples to finally start make out the scratches instead of noise is also not ideal.

![Untitled](/blog/images/001-micro-scratches/voronoi-scratch-1.jpeg)

![Untitled](/blog/images/001-micro-scratches/voronoi-scratch-2.jpeg)

![Untitled](/blog/images/001-micro-scratches/voronoi-scratch-3.jpeg)