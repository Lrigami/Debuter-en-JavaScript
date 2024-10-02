function retournerMessageScore (score, nbrMots) {
//    let affichageScore = score + " sur " + nbrMots  ***** même chose que : 
    let affichageScore = ` ${score} / ${nbrMots} `    // interpolation plus sûre que concaténation 
    let zoneScore = document.querySelector(".zoneScore span")

    let html = `${affichageScore}`

    zoneScore.innerText = html // fonctionne aussi avec innerHTML mais comme ici il ne s'agit que de texte et non pas de structure HTML, on utilise innerText 
}


// *** ancienne fonction lorsqu'on travaillait avec le prompt : ***
// function ChoisirMotsOuPhrases() {
//     let choix = prompt("Ecrivez 'mots' pour écrire des mots, ou 'phrases' pour écrire des phrases : ")
//     while (choix !== "mots" && choix !== "phrases") {
//         choix = prompt("Ecrivez 'mots' pour écrire des mots, ou 'phrases' pour écrire des phrases : ")
//     }
//     return choix
// // && parce que la condition doit être différent de A ET de B, alors que || condition ne diffère que de A OU de B 
// }

// *** ancienne fonction. Maintenant c'est l'utilisateur qui fera office de boucle en passant au mot suivant en cliquant sur "envoyer"
// function LancerBoucleJeu(listeProposée) {
//     let score = 0
//     for(const propositions of listeProposée) {
//         let motTape = prompt("Ecrivez : " + propositions)
//         if (motTape === propositions) { // remplace : while(motTape !== propositions)
//             score++ // remplace : motTape = prompt("Ecrivez : " + propositions)
//             }
//         // score++
//     }   
//     return score
// }

function afficherProposition(proposition) {
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerText = proposition
}


/**
 * Cette fonction construit et affiche l'email. 
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @param {string} score : le score. 
 */
function afficherEmail(email, sujet, message) {
    let mailto = `mailto:${email}?subject=${sujet}&body=${message}`
    location.href = mailto
}


function LancerJeu() {
 //   let choix = ChoisirMotsOuPhrases()
    let score = 0
    initAddEventListenerPopup()

    // *** permet de récupérer toute touche qui a été enfoncée au clavier
    // document.addEventListener('keydown', (event) => {
    //     console.log(event.key);
    // });

    // *** ancien if/else quand on voulait que le jeu se lance en fonction du choix fait par l'utilisateur sur le prompt :
    // if (choix === "mots") {
    //  score = LancerBoucleJeu(listeMots)
    //      nbrMots = listeMots.length
    // } else {
    //     score = LancerBoucleJeu(listePhrases)
    //     nbrMots = listePhrases.length
    // }

    let texteEcrit = document.getElementById("inputEcriture")
    let boutonValidation = document.getElementById("btnValiderMot")
    let listeProposition = listeMots

    let motOuPhrase = document.querySelectorAll(".optionSource input")
    for (let j = 0 ; j < motOuPhrase.length ; j++) {
        motOuPhrase[j].addEventListener("change", (event) => {
            console.log(event.target.value)
            if (j === 1) {            // on peut aussi mettre if (event.target.value === "1")
                listeProposition = listePhrases
            } else {
                listeProposition = listeMots
            }
            afficherProposition(listeProposition[i])
        })
    }

    boutonValidation.addEventListener("click", () => {
        console.log("J'ai cliqué !")
        console.log(texteEcrit.value)
        console.log(listeProposition[i]) 
        if (texteEcrit.value === listeProposition[i]) {
            score++
        }
        i++
        retournerMessageScore(score, i)
        // *** ça marche mais la correction est en-dessous
        // if (i>=listeMots.length) {
        //     let zoneProposition = document.querySelector(".zoneProposition")
        //     zoneProposition.innerText = "Le jeu est fini"
        //     boutonValidation.disabled = true 
        //  }
        if (listeProposition[i] === undefined) {
            afficherProposition("Le jeu est fini")
            boutonValidation.disabled = true
        } else {
            afficherProposition(listeProposition[i])
        }

        texteEcrit.value = null
        console.log(score)
    })

    retournerMessageScore(score, i)
    gererFormulaire(score, i)
}

function gererFormulaire(score, i) {
    const form = document.querySelector("form")
    const baliseNom = document.getElementById("nom")
    let nom = baliseNom.value
    const baliseEmail = document.getElementById("email")
    let email = baliseEmail.value

    baliseNom.addEventListener("input", () => {
        validerNom(baliseNom)
    })

    baliseEmail.addEventListener("input", () => {
        validerEmail(baliseEmail)
    })


    form.addEventListener("submit", (event) => {
        event.preventDefault()

        let scoreEmail = `${score} / ${i}`
        let sujet = `Partage du score Azertype`
        let message = `Salut, je suis ${nom} et je viens de réaliser le score de ${scoreEmail} sur le site d'Azertype !`
    
        try {
            validerNom(baliseNom)
            validerEmail(baliseEmail)
            afficherEmail(email, sujet, message)
            afficherMsgErreur("")
        } catch(erreur) {
            console.log(erreur)
            afficherMsgErreur(erreur)
        }
    })
}

function validerNom(balise) {
    let nomRegExp = new RegExp("[a-zA-Z]{2}")
    if (nomRegExp.test(balise.value)) {
    } else {
        throw new Error(`Le nom est trop court.`)
    }
}

function validerEmail(balise) {
    let emailRegExp = new RegExp("[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9._-]+")
    if (emailRegExp.test(balise.value)) {
    } else {
        throw new Error(`L'email n'est pas valide`)
    }
}

function afficherMsgErreur(erreur) {
    let newSpan = document.getElementById("msgErreur")
    if (!newSpan) {
        let popup = document.querySelector(".popup")
        newSpan = document.createElement("span")
        newSpan.id = "msgErreur"
        popup.append(newSpan)
    } 
    newSpan.innerHTML = `${erreur}`
}