import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  docsSidebar: [{ type: "autogenerated", dirName: "docs" }],
  apiSidebar: [
    {
      type: "doc",
      label: "API Overview",
      id: "api/index",
    },
    {
      type: "category",
      label: "Emitter",
      items: ["api/classes/Emitter", "api/classes/PixiDustEmitter"],
    },
    {
      type: "category",
      label: "Spawn Shapes",
      items: [
        "api/classes/Shape",
        "api/classes/Circle",
        "api/classes/Spot",
        "api/classes/Square",
      ],
    },
    {
      type: "category",
      label: "Particle",
      items: ["api/classes/Particle", "api/classes/PixiDustParticle"],
    },
    {
      type: "category",
      label: "Particle Modifiers",
      items: ["api/classes/Modifier", "api/classes/Tint"],
    },
    {
      type: "category",
      label: "Particle Zones",
      items: ["api/classes/Zone", "api/classes/Kill"],
    },
    {
      type: "category",
      label: "Environmental Effects",
      items: [
        "api/classes/Environment",
        "api/classes/Gravity",
        "api/classes/Wind",
      ],
    },
    {
      type: "category",
      label: "Utilities",
      items: [
        "api/classes/Vector",
        "api/functions/gaussianRandom",
        "api/type-aliases/Constructable",
        "api/type-aliases/FromTo",
      ],
    },
    {
      type: "category",
      label: "Data Types",
      items: [
        "api/interfaces/EmitterConfig",
        "api/interfaces/EmitterOptions",
        "api/interfaces/GravityConfig",
        "api/interfaces/Material",
        "api/interfaces/ParticleConfig",
        "api/interfaces/ParticleOptions",
        "api/enumerations/EmitterEvents",
        "api/enumerations/ParticleEvents",
      ],
    },
  ],
};

export default sidebars;
