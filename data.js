const PRONOUNS = ["je", "tu", "il", "nous", "vous", "ils"];

const VERBS = {
  "aller": ["vais", "vas", "va", "allons", "allez", "vont"],
  "avoir": ["ai", "as", "a", "avons", "avez", "ont"],
  "boire": ["bois", "bois", "boit", "buvons", "buvez", "boivent"],
  "connaître": ["connais", "connais", "connaît", "connaissons", "connaissez", "connaissent"],
  "croire": ["crois", "crois", "croit", "croyons", "croyez", "croient"],
  "devoir": ["dois", "dois", "doit", "devons", "devez", "doivent"],
  "écrire": ["écris", "écris", "écrit", "écrivons", "écrivez", "écrivent"],
  "entendre": ["entends", "entends", "entend", "entendons", "entendez", "entendent"],
  "faire": ["fais", "fais", "fait", "faisons", "faites", "font"],
  "dire": ["dis", "dis", "dit", "disons", "dites", "disent"],
  "mettre": ["mets", "mets", "met", "mettons", "mettez", "mettent"],
  "ouvrir": ["ouvre", "ouvres", "ouvre", "ouvrons", "ouvrez", "ouvrent"],
  "partir": ["pars", "pars", "part", "partons", "partez", "partent"],
  "pouvoir": ["peux", "peux", "peut", "pouvons", "pouvez", "peuvent"],
  "prendre": ["prends", "prends", "prend", "prenons", "prenez", "prennent"],
  "savoir": ["sais", "sais", "sait", "savons", "savez", "savent"],
  "suivre": ["suis", "suis", "suit", "suivons", "suivez", "suivent"],
  "venir": ["viens", "viens", "vient", "venons", "venez", "viennent"],
  "voir": ["vois", "vois", "voit", "voyons", "voyez", "voient"],
  "vouloir": ["veux", "veux", "veut", "voulons", "voulez", "veulent"],
  "être": ["suis", "es", "est", "sommes", "êtes", "sont"],
  "dormir": ["dors", "dors", "dort", "dormons", "dormez", "dorment"],
  "envoyer": ["envoie", "envoies", "envoie", "envoyons", "envoyez", "envoient"],
  "recevoir": ["reçois", "reçois", "reçoit", "recevons", "recevez", "reçoivent"],
  "commencer": ["commence", "commences", "commence", "commençons", "commencez", "commencent"],
  "manger": ["mange", "manges", "mange", "mangeons", "mangez", "mangent"],
  "vivre": ["vis", "vis", "vit", "vivons", "vivez", "vivent"],
  "produire": ["produis", "produis", "produit", "produisons", "produisez", "produisent"],
  "finir": ["finis", "finis", "finit", "finissons", "finissez", "finissent"],
  "choisir": ["choisis", "choisis", "choisit", "choisissons", "choisissez", "choisissent"]
};

const VOCAB_GROUPS = [
  {
    name: "Les membres de la famille",
    pairs: [
      ["Un demi-frère", "Un hermanastro"],
      ["Une demi-sœur", "Una hermanastra"],
      ["Le beau-père", "El suegro / El padrastro"],
      ["La belle-mère", "La suegra / La madrastra"],
      ["La belle famille", "La familia política"],
      ["Le beau-fils", "El yerno"],
      ["La belle-fille", "La nuera"],
      ["Le beau-frère", "El cuñado"],
      ["La belle-sœur", "La cuñada"],
      ["Un jumeau", "Un gemelo"],
      ["Un faux-jumeau", "Un mellizo"],
      ["Une jumelle", "Una gemela"],
      ["Les enfants", "Los hijos / Los niños"],
      ["L'époux", "El esposo"],
      ["L'épouse", "La esposa"],
      ["Le mari", "El marido"],
      ["La femme", "La mujer"],
      ["La famille monoparentale", "La familia monoparental"],
      ["Les triplés", "Los trillizos"],
      ["La famille recomposée", "La familia recompuesta"],
      ["Un orphelin", "Un huérfano"],
      ["Les parents adoptifs", "Los padres adoptivos"],
      ["Un proche", "Un pariente"],
      ["Une fausse jumelle", "Una melliza"],
      ["Les petits enfants", "Los nietos"]
    ]
  },
  {
    name: "L'état civil",
    pairs: [
      ["Célibataire", "Soltero"],
      ["Marié", "Casado"],
      ["Divorcé", "Divorciado"],
      ["Veuf", "Viudo"],
      ["Un livret de famille", "Un libro de familia"],
      ["Un acte de naissance", "Un acta de nacimiento"]
    ]
  },
  {
    name: "Les verbes",
    pairs: [
      ["Éduquer", "Educar"],
      ["Se marier", "Casarse"],
      ["Divorcer", "Divorciarse"],
      ["Élever", "Criar"],
      ["Tomber enceinte", "Quedarse embarazada"],
      ["Être enceinte", "Estar embarazada"],
      ["Adopter", "Adoptar"],
      ["Refaire sa vie", "Rehacer su vida"],
      ["S'occuper de", "Ocuparse de"],
      ["Quitter quelqu'un", "Dejar a alguien"],
      ["Partager", "Compartir"],
      ["Fréquenter quelqu'un", "Verse con alguien"],
      ["Tomber amoureux", "Enamorarse"],
      ["Vivre ensemble", "Vivir juntos"],
      ["Draguer", "Ligar"],
      ["Se pacser", "Unirse (administrativamente)"],
      ["Déménager", "Mudarse (irse)"],
      ["Se souvenir, se rappeler", "Acordarse"],
      ["Accoucher", "Dar a luz"],
      ["S'entendre bien avec", "Llevarse bien con alguien"],
      ["S'entendre mal avec", "Llevarse mal con alguien"],
      ["Se réconcilier", "Reconciliarse"],
      ["Épouser", "Contraer matrimonio con"],
      ["Se disputer", "Discutir"],
      ["Se charger de", "Hacerse cargo de"],
      ["Se séparer", "Separarse"],
      ["Vivre en colocation", "Compartir vivienda con"],
      ["Décéder", "Fallecer"],
      ["Vieillir", "Envejecer"],
      ["Se confier à quelqu'un", "Hacerle confidencias a"],
      ["Grandir", "Crecer"],
      ["Se fâcher", "Enfadarse"],
      ["Séduire", "Seducir"],
      ["Sortir avec quelqu'un", "Salir con alguien"],
      ["Rendre visite à quelqu'un", "Visitar a alguien"],
      ["Emménager", "Mudarse (instalarse)"],
      ["Rire, rigoler", "Reirse"]
    ]
  },
  {
    name: "Vocabulaire complémentaire",
    pairs: [
      ["Une personne âgée", "Un(a) anciano(a)"],
      ["Un foyer", "Un hogar"],
      ["Un copain", "Un amigo"],
      ["Une copine", "Una amiga"],
      ["Un ennemi", "Un enemigo"],
      ["Un couple", "Una pareja (los dos)"],
      ["La grossesse", "El embarazo"],
      ["Le mariage civil", "La boda civil"],
      ["Un coup de foudre", "Un flechazo"],
      ["L'amitié", "La amistad"]
    ]
  },
  {
    name: "La description morale",
    pairs: [
      ["Ouvert", "Abierto"],
      ["Réservé", "Reservado / Callado"],
      ["Attaché à", "Apegado a"],
      ["Sociable", "Sociable"],
      ["Fier", "Orgulloso"],
      ["Timide", "Tímido"],
      ["À l'écoute", "Atento"],
      ["De bonne humeur", "De buen humor"],
      ["Nostalgique", "Nostálgico"],
      ["Perfectionniste", "Perfeccionista"],
      ["Flexible", "Flexible"],
      ["Multitâche", "Multitarea"],
      ["Idéaliste", "Idealista"],
      ["Enthousiaste", "Entusiasta"],
      ["Mobile", "Móvil"],
      ["Inventif", "Inventivo / Creativo"],
      ["Efficace", "Eficaz"],
      ["Indépendant", "Independiente"],
      ["Collaboratif", "Colaborativo"],
      ["Individualiste", "Individualista"],
      ["Multiculturel", "Multicultural"],
      ["Formel", "Formado / Con formación"],
      ["Réaliste", "Realista"],
      ["Progressiste", "Progresista"],
      ["Froid", "Frío"],
      ["Choquant", "Chocante"],
      ["Partial", "Parcial"],
      ["Distant", "Distante"],
      ["Bizarre", "Raro"],
      ["Direct", "Directo"],
      ["Familier", "Familiar"],
      ["Hors de soi", "Fuera de sí"],
      ["Autonome", "Autónomo"],
      ["Solitaire", "Solitario"],
      ["Rigoureux", "Riguroso"],
      ["Altruiste", "Altruista"]
    ]
  },
  {
    name: "Les étapes de la vie",
    pairs: [
      ["La naissance", "El nacimiento"],
      ["L'enfance", "La infancia"],
      ["L'adolescence", "La adolescencia"],
      ["L'âge adulte", "La edad adulta"],
      ["La vieillesse", "La vejez"],
      ["La mort", "La muerte"]
    ]
  },
  {
    name: "B2 — les verbes",
    pairs: [
      ["Soutenir", "Apoyar"],
      ["Guider", "Guiar"],
      ["Transmettre", "Transmitir"],
      ["Renforcer", "Reforzar"],
      ["Unir, rassembler", "Unir"],
      ["Surveiller", "Vigilar"],
      ["Hériter", "Heredar"],
      ["Fonder une famille", "Fundar una familia"],
      ["Gâter, chouchouter", "Mimar"],
      ["Se bagarrer", "Pelearse / Luchar"],
      ["Apaiser un conflit", "Apaciguar un conflicto"],
      ["Être le confident", "Ser el confidente"],
      ["S'éloigner", "Alejarse"],
      ["Surprotéger", "Sobreproteger"],
      ["Rivaliser", "Rivalizar"],
      ["S'épanouir", "Realizarse"],
      ["Faire preuve de (patience)", "Mostrar paciencia"]
    ]
  },
  {
    name: "B2 — les adjectifs",
    pairs: [
      ["Fusionnel", "Fusional"],
      ["Complice", "Cómplice"],
      ["Sévère", "Estricto"],
      ["Affectueux", "Afectuoso"],
      ["Permissif", "Permisivo"],
      ["Autoritaire", "Autoritario"],
      ["Compréhensif", "Comprensivo"],
      ["Neutre", "Neutro"],
      ["Mature", "Maduro"],
      ["Soucieux", "Preocupado"],
      ["Pragmatique", "Pragmático"],
      ["Désenchanté", "Desencantado"],
      ["Laxiste", "Laxista"],
      ["Intransigeant", "Intransigente"],
      ["Indulgent", "Indulgente"],
      ["Bienveillant", "Benevolente"],
      ["Rigide", "Rígido"]
    ]
  },
  {
    name: "B2 — les noms",
    pairs: [
      ["Le soutien", "El apoyo"],
      ["La complicité", "La complicidad"],
      ["La fratrie", "La hermandad"],
      ["L'autorité", "La autoridad"],
      ["La garde", "La custodia"],
      ["Les liens du sang", "Los lazos de la sangre"],
      ["Le fossé générationnel", "La brecha generacional"],
      ["L'absence", "La ausencia"],
      ["Le manque de disponibilité", "La falta de disponibilidad"],
      ["La rivalité", "La rivalidad"],
      ["La neutralité", "La neutralidad"],
      ["Une source d'affection", "Una fuente de afecto"],
      ["Une oreille compréhensive", "Un apoyo"],
      ["Le bonheur", "La felicidad"],
      ["L'épanouissement", "La realización (personal)"],
      ["Une éducation permissive", "Una educación permisiva"]
    ]
  }
];

const VOCAB = VOCAB_GROUPS.flatMap((g) => g.pairs);

/* Connecteurs : fichas por función + ejercicios de hueco único.
   En cada ejercicio, "___" marca el hueco; "a" es la respuesta;
   "alt" acepta otras respuestas válidas. */
const CONNECTEURS = [
  { group: "Chronologie", es: "Orden temporal", words: "d'abord, puis, ensuite, après, enfin, avant" },
  { group: "Addition", es: "Añadir ideas", words: "et, aussi, de plus, en outre, également" },
  { group: "Opposition", es: "Contrastar", words: "mais, pourtant, cependant, par contre, en revanche, alors que" },
  { group: "Cause", es: "Expresar causa", words: "parce que, car, puisque, comme, à cause de, grâce à" },
  { group: "Conséquence", es: "Expresar consecuencia", words: "donc, alors, ainsi, c'est pourquoi, par conséquent" },
  { group: "But", es: "Expresar finalidad", words: "pour, afin de, pour que, afin que" },
  { group: "Exemple", es: "Dar ejemplos", words: "par exemple, comme, notamment, c'est-à-dire" },
  { group: "Conclusion", es: "Concluir", words: "en conclusion, pour conclure, bref, en somme, enfin" }
];

/* Ejercicio: cada item = { pre: "texto antes", post: "texto después", a: respuesta, alt: [otras válidas], distract: [3 opciones falsas] } */
const CONN_EXERCISES = [
  { pre: "Il fait ses devoirs, ___", post: "il regarde la télé.", a: "ensuite", alt: ["puis", "après"], distract: ["pourtant", "parce que", "donc"] },
  { pre: "J'aime le sport, ___", post: "je déteste courir.", a: "mais", alt: ["pourtant"], distract: ["donc", "ensuite", "parce que"] },
  { pre: "Il pleut, ___", post: "je reste à la maison.", a: "donc", alt: ["alors", "ainsi", "c'est pourquoi"], distract: ["mais", "parce que", "d'abord"] },
  { pre: "___ la pluie, le match a été annulé.", a: "À cause de", alt: [], distract: ["Grâce à", "Pourtant", "Donc"] },
  { pre: "___ j'écoute le professeur, puis je prends des notes.", a: "D'abord", alt: [], distract: ["Donc", "Mais", "Enfin"] },
  { pre: "Mon frère joue au foot ___", post: "au tennis.", a: "et", alt: ["ainsi que"], distract: ["mais", "donc", "car"] },
  { pre: "Elle travaille dur ___", post: "réussir l'examen.", a: "pour", alt: ["afin de"], distract: ["parce que", "pourtant", "donc"] },
  { pre: "Il est fatigué ; ___", post: "il va se coucher.", a: "donc", alt: ["alors", "par conséquent", "ainsi", "c'est pourquoi"], distract: ["mais", "parce que", "d'abord"] },
  { pre: "Tu peux faire beaucoup de sports, ___", post: "le football, le tennis et la natation.", a: "par exemple", alt: ["comme", "notamment"], distract: ["pourtant", "donc", "d'abord"] },
  { pre: "___ sa sœur adore lire, il déteste les livres.", a: "Alors que", alt: ["Tandis que"], distract: ["Donc", "Ensuite", "Parce que"] },
  { pre: "___, il est sorti avec ses amis malgré la pluie.", a: "Pourtant", alt: ["Cependant"], distract: ["Ensuite", "Donc", "Parce que"] },
  { pre: "___ avoir fini ses devoirs, il joue à la console.", a: "Après", alt: [], distract: ["Avant", "Pourtant", "Donc"] },
  { pre: "J'aime la musique, ___", post: "je préfère le cinéma.", a: "cependant", alt: ["pourtant", "mais", "en revanche"], distract: ["donc", "parce que", "ensuite"] },
  { pre: "Il mange beaucoup de fruits ___", post: "rester en bonne santé.", a: "pour", alt: ["afin de"], distract: ["parce que", "donc", "mais"] },
  { pre: "___, la France est un beau pays.", a: "En conclusion", alt: ["Pour conclure", "En somme", "Bref"], distract: ["D'abord", "Pourtant", "Par exemple"] },
  { pre: "___ son travail, elle a gagné le concours.", a: "Grâce à", alt: [], distract: ["À cause de", "Mais", "Donc"] },
  { pre: "Elle est partie tôt ___", post: "ne pas rater le train.", a: "pour", alt: ["afin de"], distract: ["parce que", "donc", "mais"] },
  { pre: "___ je me suis couché tard, je suis fatigué.", a: "Comme", alt: ["Parce que", "Puisque"], distract: ["Donc", "Pourtant", "Ensuite"] }
];

/* Homophones : s = oración con ___ ; a = opción correcta */
const HOMO_EXERCISES = [
  { s: "___ mon meilleur ami, Thomas.", a: "C'est" },
  { s: "Il ___ levé à sept heures ce matin.", a: "s'est" },
  { s: "Elle range ___ affaires dans sa chambre.", a: "ses" },
  { s: "___ enfants jouent dans le jardin.", a: "Ces" },
  { s: "Je ___ que tu as raison.", a: "sais" },
  { s: "Il ___ très bien nager.", a: "sait" },
  { s: "___ une bonne idée d'aller au parc.", a: "C'est" },
  { s: "Marie ___ cassé la jambe en skiant.", a: "s'est" },
  { s: "Paul et ___ copains arrivent demain.", a: "ses" },
  { s: "___ chaussures sont trop petites.", a: "Ces" },
  { s: "Tu ___ la réponse, n'est-ce pas ?", a: "sais" },
  { s: "Personne ne ___ où il est.", a: "sait" },
  { s: "___ là que nous habitons.", a: "C'est" },
  { s: "Elle ___ disputée avec son frère.", a: "s'est" },
  { s: "Il a invité tous ___ cousins.", a: "ses" },
  { s: "___ exercices sont difficiles.", a: "Ces" },
  { s: "Elle ___ parfaitement parler anglais.", a: "sait" },
  { s: "___ le meilleur film de l'année !", a: "C'est" },
  { s: "Il ___ trompé de chemin.", a: "s'est" },
  { s: "___ garçons sont mes neveux.", a: "Ces" },
  { s: "Elle part avec ___ amies ce week-end.", a: "ses" },
  { s: "Je ___ qu'il va gagner.", a: "sais" }
];
/* Opciones fijas del ejercicio (savons/savez se añaden como distractores raros) */
const HOMO_OPTIONS = ["c'est", "s'est", "ses", "ces", "sais", "sait"];

/* Actes de parole : situación + opciones; a = índice correcto.
   Las frases son las de la fiche de clase (« Exercices en interaction »). */
const ACTES_EXERCISES = [
  {
    s: "Tu veux inviter un ami au cinéma. Pour proposer, tu dis :",
    o: ["Ça te dit d'aller au cinéma ?", "Je t'assure que le film est génial.", "Il ne faut pas rater ce film.", "C'est important pour moi, viens !"],
    a: 0, expl: "« Ça te dit de… ? » sert à proposer."
  },
  {
    s: "Ton ami hésite à venir à ta fête. Pour le convaincre :",
    o: ["Tu verras, ça sera une expérience formidable !", "Ça te dit de venir à ma fête ?", "On pourrait faire une fête.", "Je te propose de venir."],
    a: 0, expl: "« Tu verras, ça sera… » sert à convaincre."
  },
  {
    s: "Tu proposes une sortie à la plage :",
    o: ["Pourquoi on n'irait pas à la plage ?", "Je crois que c'est une bonne occasion pour bronzer.", "Tu sais que j'adore la plage.", "Il faut que tu comprennes que j'aime la plage."],
    a: 0, expl: "« Pourquoi on ne… pas ? » (au conditionnel) sert à proposer."
  },
  {
    s: "Pour convaincre ta sœur de choisir le restaurant italien :",
    o: ["Je crois que c'est une bonne occasion pour goûter la vraie pizza.", "Je te propose de manger italien.", "Qu'est-ce que tu penses de l'italien ?", "On pourrait manger italien."],
    a: 0, expl: "« Je crois que c'est une bonne occasion pour… » sert à convaincre."
  },
  {
    s: "Tu veux proposer un match de foot samedi :",
    o: ["On pourrait jouer au foot samedi.", "Tu verras, le foot c'est super.", "J'insiste parce que sincèrement je crois que tu aimes le foot.", "Je sais que c'est beaucoup demander mais viens."],
    a: 0, expl: "« On pourrait + inf. » sert à proposer."
  },
  {
    s: "Ton copain ne veut pas sortir. Tu insistes :",
    o: ["Il ne faut pas rater cette opportunité !", "Je te propose de sortir.", "Ça pourrait être une bonne idée de sortir.", "Qu'est-ce que tu penses de sortir ?"],
    a: 0, expl: "« Il ne faut pas rater cette opportunité » sert à convaincre."
  },
  {
    s: "Tu veux proposer une idée pour le week-end :",
    o: ["Ça pourrait être une bonne idée d'aller à la montagne.", "Mais tu ne crois pas que la montagne c'est bien ?", "Je t'assure que tu vas adorer.", "Tu sais que la montagne c'est joli."],
    a: 0, expl: "« Ça pourrait être une bonne idée de… » sert à proposer."
  },
  {
    s: "Pour convaincre ton amie timide de participer au spectacle :",
    o: ["Mais tu ne crois pas que tu peux le faire ?", "Je te propose de participer.", "On pourrait participer ensemble.", "Qu'est-ce que tu penses du spectacle ?"],
    a: 0, expl: "« Mais tu ne crois pas que… ? » sert à convaincre."
  },
  {
    s: "Tu demandes l'avis de ton ami sur ton idée :",
    o: ["Qu'est-ce que tu penses de faire un pique-nique ?", "J'aimerais tellement que tu viennes.", "Tu sais que j'adore les pique-niques.", "Je t'assure que ce sera super."],
    a: 0, expl: "« Qu'est-ce que tu penses de… ? » sert à proposer."
  },
  {
    s: "Tu veux vraiment qu'il accepte de venir (convaincre) :",
    o: ["J'aimerais tellement que tu acceptes.", "On pourrait accepter.", "Ça te dit d'accepter ?", "Je te propose d'accepter."],
    a: 0, expl: "« J'aimerais tellement que tu + subjonctif » sert à convaincre."
  },
  {
    s: "Il a déjà dit non deux fois. Tu insistes poliment :",
    o: ["Je sais que c'est beaucoup demander mais viens, s'il te plaît !", "On pourrait y aller.", "Ça te dit d'y aller ?", "Qu'est-ce que tu penses d'y aller ?"],
    a: 0, expl: "« Je sais que c'est beaucoup demander mais… » sert à convaincre."
  },
  {
    s: "Pour proposer ton aide à un camarade :",
    o: ["Je te propose de t'aider avec les devoirs.", "Tu verras, tu vas réussir.", "Mais tu ne crois pas que tu peux le faire seul ?", "J'insiste parce que sincèrement je crois que tu vas échouer."],
    a: 0, expl: "« Je te propose de + inf. » sert à proposer."
  }
];

/* Avoir du mal à : (sujet, infinitif) → frase completa */
const AVDM_EXERCISES = [
  { sujet: "Je", verb: "comprendre la grammaire.", a: "J'ai du mal à comprendre la grammaire." },
  { sujet: "Tu", verb: "parler français.", a: "Tu as du mal à parler français." },
  { sujet: "Il", verb: "s'exprimer en public.", a: "Il a du mal à s'exprimer en public." },
  { sujet: "Elle", verb: "mémoriser les verbes.", a: "Elle a du mal à mémoriser les verbes." },
  { sujet: "Nous", verb: "finir les devoirs à temps.", a: "Nous avons du mal à finir les devoirs à temps." },
  { sujet: "Vous", verb: "prononcer les mots difficiles.", a: "Vous avez du mal à prononcer les mots difficiles." },
  { sujet: "Ils", verb: "se concentrer en classe.", a: "Ils ont du mal à se concentrer en classe." },
  { sujet: "Ma sœur", verb: "écrire sans fautes.", a: "Ma sœur a du mal à écrire sans fautes." },
  { sujet: "Mon frère et moi", verb: "nous lever tôt.", a: "Mon frère et moi avons du mal à nous lever tôt." },
  { sujet: "Les élèves", verb: "conjuguer les verbes irréguliers.", a: "Les élèves ont du mal à conjuguer les verbes irréguliers." },
  { sujet: "Je", verb: "retenir le vocabulaire.", a: "J'ai du mal à retenir le vocabulaire." },
  { sujet: "On", verb: "entendre le professeur.", a: "On a du mal à entendre le professeur." }
];
