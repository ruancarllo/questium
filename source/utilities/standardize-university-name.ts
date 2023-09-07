function standardizeUniversityName(nonStandardizedName: string): string {
  const characters = [...nonStandardizedName];

  for (let count = 0; count < characters.length; count++) {
    if (count === 0) {
      characters[count] = characters[count].toUpperCase();
    }

    else if (characters[count] === ' ' && characters[count + 1]) {
      characters[count + 1] = characters[count + 1].toUpperCase();
      count += 1;
    }

    else if (characters[count] === '-' && characters[count + 1] && characters[count + 2] && count + 2 === characters.length - 1) {
      characters[count + 1] = characters[count + 1].toUpperCase();
      characters[count + 2] = characters[count + 2].toUpperCase();
      count += 2;
    }

    else {
      characters[count] = characters[count].toLowerCase();
    }
  }

  return characters.join('');
}

export default standardizeUniversityName;