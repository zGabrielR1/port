/**
 * Simple Pig Latin translator function for testing
 */
function translateToPigLatin(text: string): string {
  // Split the text into words and preserve spaces
  const words = text.toLowerCase().match(/\w+|\s+|[^\w\s]/g) || [];

  const translatedWords = words.map(word => {
    // If it's punctuation, return it as-is
    if (!/\w/.test(word)) {
      return word;
    }

    // Rule 1: Words starting with vowels (a, e, i, o, u) or "xr"/"yt" add "ay"
    if (/^[aeiou]|^xr|^yt/.test(word)) {
      return word + 'ay';
    }

    // Rule 2: Words with "qu" after consonants - move consonants + "qu" to end
    if (/^[^aeiou]qu/.test(word)) {
      const match = word.match(/^([^aeiou])qu(.*)$/);
      if (match) {
        return match[2] + match[1] + 'quay';
      }
    }

    // Rule 3: Words with "y" after consonants - move consonants before "y" to end
    if (/^[^aeiou]+y/.test(word)) {
      const match = word.match(/^([^aeiou]+)y(.*)$/);
      if (match) {
        return 'y' + match[2] + match[1] + 'ay';
      }
    }

    // Rule 4: Regular consonant clusters - move all consonants to end
    if (/^[^aeiou]+/.test(word)) {
      const match = word.match(/^([^aeiou]+)(.*)$/);
      if (match) {
        return match[2] + match[1] + 'ay';
      }
    }

    // Default case (shouldn't reach here)
    return word + 'ay';
  });

  // Join words back together
  return translatedWords.join('');
}

console.log('Testing Pig Latin translator...');

// Test cases from the requirements
console.log('apple ->', translateToPigLatin('apple')); // appleay
console.log('ear ->', translateToPigLatin('ear')); // earay
console.log('igloo ->', translateToPigLatin('igloo')); // iglooay
console.log('object ->', translateToPigLatin('object')); // objectay
console.log('under ->', translateToPigLatin('under')); // underay
console.log('pig ->', translateToPigLatin('pig')); // igpay
console.log('latin ->', translateToPigLatin('latin')); // atinlay
console.log('banana ->', translateToPigLatin('banana')); // ananabay
console.log('xrays ->', translateToPigLatin('xrays')); // xraysay
console.log('yttria ->', translateToPigLatin('yttria')); // yttriaay
console.log('yellow ->', translateToPigLatin('yellow')); // ellowyay
console.log('rhythm ->', translateToPigLatin('rhythm')); // ythmrhay
console.log('queen ->', translateToPigLatin('queen')); // eenquay
console.log('square ->', translateToPigLatin('square')); // aresquay
console.log('therapy ->', translateToPigLatin('therapy')); // erapythay
console.log('thrush ->', translateToPigLatin('thrush')); // ushthray
console.log('school ->', translateToPigLatin('school')); // oolschay
console.log('quick fast run ->', translateToPigLatin('quick fast run')); // ickquay astfay unray