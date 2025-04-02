const choice = ["pierre", "feuille", "ciseaux"]
type _choice = "pierre" | "feuille" | "ciseaux";

const winingChoice: IWiningChoice = {
  pierre: {
    ciseaux: true,
    feuille: false,
  },
  feuille: {
    ciseaux: false,
    pierre: true,
  },
  ciseaux: {
    feuille: true,
    pierre: false,
  },
}

interface IWiningChoice {
  pierre: IWiningHand,
  feuille: IWiningHand,
  ciseaux: IWiningHand,
}

interface IWiningHand {
  pierre?: boolean;
  feuille?: boolean;
  ciseaux?: boolean;
}

/**
 *
 * @param robotChoice Le choix du robot
 * @param humanChoice Le choix de l'humain
 * @return Retourne vrai si l'humain as gagné et null si match null
 */
function doesHumanWin(robotChoice: string, humanChoice: string): boolean | null {
  const humanWiningHand = winingChoice[humanChoice] as IWiningHand;
  const doesHumanWin = humanWiningHand[robotChoice] as boolean | undefined;
  if (typeof doesHumanWin === "undefined") {
    // Match nul
    return null
  }
  return doesHumanWin;
}

function getRobotChoice() {
  const maxIndex = choice.length - 1
  //générer un nombre entre 0 et choice.length - 1
  const randomIndex = (Math.floor(Math.random() * maxIndex))
  console.log(choice[randomIndex])
  return choice[randomIndex] as string;
}


const promptRoundResponse = prompt("Combien de manche pour cette partie ? (supérieur à zero)");
const maxRound = Number(promptRoundResponse);
if (maxRound === 0) {
  alert("bah pas zero mec ...")
  location.reload();
}

let currentRound = 0;
let humanWin = 0;
let robotWin = 0;

//boucle métier

while (currentRound <= maxRound) {
  const robotChoice = getRobotChoice()
  const promptResponse = prompt("Ton choix ?");
  const isUserChoiceValid = choice.includes(promptResponse);
  if (!isUserChoiceValid) {
    alert("Choix invalide. Merci de choisir entre : pierre, feuille, ou ciseaux.");
    break;
  }
  const isHumanWin = doesHumanWin(robotChoice, promptResponse);

  switch (isHumanWin as boolean | null) {
    case null:
      //Match null
      break;
    case true:
      // L'humain gagne
      humanWin++;
      break;
    case false:
      // L'humain perd
      robotWin++;
      break;
    default:
      throw new Error("Oups !")
  }
  alert(`Score : Humain ${humanWin} / ${robotWin} Robot`);

  currentRound++
}

if (humanWin > robotWin) {
  alert(`Félicitations ! Vous remportez la partie ! Score final : Humain ${humanWin} - Robot ${robotWin}`);
} else if (robotWin > humanWin) {
  alert(`Le robot a gagné la partie. Score final : Robot ${robotWin} - Humain ${humanWin}`);
} else {
  alert(`Égalité ! Personne ne gagne. Score final : Humain ${humanWin} - Robot ${robotWin}`);
}

// Offre de rejouer une nouvelle partie
if (confirm("Voulez-vous rejouer une nouvelle partie ?")) {
  location.reload(); // Recharge l'application
} else {
  alert("Merci d'avoir joué ! À bientôt !");
}
