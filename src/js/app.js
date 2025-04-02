/**
 * Tableau des choix possibles dans le jeu.
 * @type {string[]}
 */
const choice = ["pierre", "feuille", "ciseaux"];

/**
 * Objet contenant les règles du jeu, définissant quelle main bat une autre.
 * @type {Object}
 */
const winingChoice = {
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
};

/**
 * Détermine si l'humain gagne, perd ou fait match nul.
 *
 * @param {string} robotChoice Le choix du robot.
 * @param {string} humanChoice Le choix de l'humain.
 * @returns {boolean|null} Retourne `true` si l'humain gagne, `false` si l'humain perd
 * et `null` s'il y a match nul.
 */
function doesHumanWin(robotChoice, humanChoice) {
  const humanWiningHand = winingChoice[humanChoice];
  const doesHumanWin = humanWiningHand[robotChoice];

  // Déterminer si c'est un match nul
  if (typeof doesHumanWin === "undefined") {
    return null;
  }

  return doesHumanWin;
}

/**
 * Génère un choix aléatoire pour le robot.
 *
 * @returns {string} Le choix du robot, sélectionné parmi "pierre", "feuille" ou "ciseaux".
 */
function getRobotChoice() {
  const randomIndex = Math.floor(Math.random() * choice.length);
  return choice[randomIndex];
}

/**
 * La fonction principale qui dirige le jeu "Pierre, Feuille, Ciseaux".
 */
function playGame() {
  // Demander le nombre de manches à jouer
  const promptRoundResponse = prompt("Combien de manches pour cette partie ? (supérieur à zéro)");
  const maxRound = Number(promptRoundResponse);

  // Vérifier si l'entrée est un nombre valide
  if (isNaN(maxRound) || maxRound <= 0) {
    alert("Veuillez saisir un nombre valide supérieur à zéro !");
    return;
  }

  let currentRound = 0; // Compteur de manches
  let humanWin = 0; // Score de l'humain
  let robotWin = 0; // Score du robot

  // Boucle principale du jeu
  while (currentRound < maxRound) {
    const robotChoice = getRobotChoice();
    console.log(robotChoice);

    // Demander le choix de l'utilisateur
    const promptResponse = prompt("Ton choix ? (pierre, feuille, ciseaux)");

    // Si l'utilisateur annule, quitter le jeu
    if (promptResponse === null) {
      alert("Merci d'avoir joué ! À bientôt !");
      break;
    }

    // Vérifier si le choix de l'utilisateur est valide
    if (!choice.includes(promptResponse)) {
      alert("Choix invalide. Merci de choisir entre : pierre, feuille, ou ciseaux.");
      continue; // Recommencer la boucle pour demander un choix valide
    }

    // Déterminer le vainqueur de cette manche
    const isHumanWin = doesHumanWin(robotChoice, promptResponse);

    // Vérifier les résultats de la manche
    switch (isHumanWin) {
      case null:
        alert(`Match nul ! Robot : ${robotChoice}, Humain : ${promptResponse}`);
        break;
      case true:
        humanWin++;
        alert(`Vous avez gagné cette manche ! Robot : ${robotChoice}, Humain : ${promptResponse}`);
        break;
      case false:
        robotWin++;
        alert(`Le robot a gagné cette manche. Robot : ${robotChoice}, Humain : ${promptResponse}`);
        break;
      default:
        throw new Error("Problème inattendu dans la détermination du gagnant !");
    }

    // Afficher le score actuel
    alert(`Score actuel : Humain ${humanWin} - Robot ${robotWin}`);

    currentRound++; // Passer à la manche suivante
  }

  // Déterminer et afficher le résultat final
  if (humanWin > robotWin) {
    alert(`Félicitations ! Vous remportez la partie ! Score final : Humain ${humanWin} - Robot ${robotWin}`);
  } else if (robotWin > humanWin) {
    alert(`Le robot a gagné la partie. Score final : Robot ${robotWin} - Humain ${humanWin}`);
  } else {
    alert(`Égalité ! Score final : Humain ${humanWin} - Robot ${robotWin}`);
  }
}

// Lancer le jeu
playGame();

// Offrir de rejouer une nouvelle partie
if (confirm("Voulez-vous rejouer une nouvelle partie ?")) {
  playGame();
} else {
  alert("Merci d'avoir joué ! À bientôt !");
}
