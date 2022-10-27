const findFnord = (s) => s.indexOf('fnord');

const stringContains = (s, ss) => s.indexOf(ss) > -1;

const firstAndLast = (s) => {
  return s[0] + s[s.length - 1];
};

const swapFrontAndBack = (s) => {
  return s.substring(s.length / 2) + s.substring(0, s.length / 2);
};

const simplePigLatin = (s, firstVowel) => {
  return s.substring(firstVowel) + s.substring(0, firstVowel) + 'ay';
};

const randomCharacter = (s) => {
  return s[rand(s.length)];
};

const randomCharacterUpDown = (s) => {
  const i = rand(s.length);
  return s[i].toUpperCase() + s[i].toLowerCase();
};

const isAllUpperCase = (s) => {
  return s === s.toUpperCase();
};

const sameIgnoringCase = (s1, s2) => {
  return s1.toLowerCase() === s2.toLowerCase();
};