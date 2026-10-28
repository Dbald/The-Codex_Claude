// Every outbound destination on the site, in one place.
//
// A value of null means "not connected yet". Links that resolve to null fall
// back to the most useful in-site destination where one exists (usually the
// course overview), or announce that the link isn't connected yet — never a
// dead or invented URL.

export const SITE = {
  // Where each 3D world is hosted. Used by "Try the reef now",
  // "Explore the world first", and the door cards' world links.
  worlds: {
    'ocean-explorer': null,
    'orbit-atlas': null,
    'power-a-city': null,
  },

  // "Get early access" — falls back to the Ocean Explorer course overview.
  earlyAccessUrl: null,

  // Teachers & schools section.
  pilotUrl: null,
  contactUrl: null,

  // Footer.
  aboutUrl: null,
};
