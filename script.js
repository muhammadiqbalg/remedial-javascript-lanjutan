async function getStarshipName(characterId) {
    const response = await fetch(`https://swapi.dev/api/people/${characterId}/`);
    const character = await response.json();
    const starshipUrls = character.starships;
    const starshipNames = [];
    for (const url of starshipUrls) {
      const response = await fetch(url);
      const starship = await response.json();
      starshipNames.push(starship.name);
    }
    return starshipNames;
  }