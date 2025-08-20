/**
 * Translates English text to Pig Latin
 * @param text - The English text to translate
 * @returns The Pig Latin translation
 */
export function translateToPigLatin(text: string): string {
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