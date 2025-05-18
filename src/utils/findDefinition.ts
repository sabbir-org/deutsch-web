import verb from "../assets/verb.json";
import pos from "../assets/pos.json";
import noun from "../assets/noun.json";

function findDefinition(cleanWord: string) {
  let def;
  const cleanVerb = cleanWord.toLowerCase();
  def = verb.find((obj) => {
    if (obj.infinitive === cleanVerb) {
      return obj;
    }

    if (obj?.conjugation?.perfect[1] === cleanVerb) {
      return obj;
    }

    const v = obj?.conjugation?.present.find((item) => item === cleanVerb);

    return v || obj?.conjugation?.past.find((item) => item === cleanVerb);
  });

  if (!def) {
    def = pos.find((obj) => {
      if (obj.word === cleanVerb) {
        return obj;
      }
    });
  }

  if (!def) {
    def = noun.find((obj) => {
      if (obj.word === cleanWord) {
        return obj;
      }
      if (obj.plural === cleanWord) {
        return obj;
      }
    });
  }

  return def;
}

export default findDefinition;
