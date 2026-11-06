// Every outbound destination on the site, in one place.
//
// A value of null means "not connected yet". Links that resolve to null fall
// back to the most useful in-site destination where one exists, or announce
// that the link isn't connected yet — never a dead or invented URL.

const signup = (interest, src) => `/early-access/?interest=${interest}&src=${src}`;

export const SITE = {
  // Worlds that don't run inside The Codex yet. (Ocean Explorer does — its
  // lesson is wired in src/utils/worlds.js.)
  previews: {
    'orbit-atlas': null,
    'power-a-city': null,
  },

  // The early-access sign-up (public/early-access/, Netlify Forms).
  // `src` records which button a sign-up came from.
  signup,
  earlyAccessUrl: signup('early', 'homepage'),
  pilotUrl: signup('pilot', 'homepage'),
  workshopUrl: signup('workshop', 'homepage'),

  // The guide's photo, e.g. '/images/guide/devin.jpg'. Until it's set, the
  // "Your guide" section shows a neutral placeholder.
  guidePhoto: null,

  contactUrl: null,
  aboutUrl: null,
};
