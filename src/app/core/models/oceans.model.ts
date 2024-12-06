export interface Ocean {
  _id: string;
  name: string;
  position: {
    latitude: number;
    longitude: number;
  };
  info: string;
  QCM: QCM[];
  anecdotes: Anecdote[];
  createdAt: string;
  updatedAt: string;
}

export interface QCM {
  _id: string;
  title: string;
  questions: Question[];
}

export interface Question {
  _id: string;
  question: string;
  answers: string[];
  correctAnswerIndex: number;
}

export interface Anecdote {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  sources: string[];
}



export const OCEANS: Ocean[] = [
  {
    _id: "6752371474e5aa96aa09e5cc",
    name: "Océan Pacifique",
    position: {
      latitude: 0,
      longitude: -160
    },
    info: "Le plus grand et le plus profond des océans, couvrant environ 46% de la surface maritime mondiale. Comme le cœur humain qui pompe le sang dans tout le corps, l'océan Pacifique joue un rôle central dans la circulation océanique mondiale. Sa profondeur moyenne est de 4000 mètres, avec un point le plus profond à 11 034 mètres dans la fosse des Mariannes, comparable aux réseaux complexes de vaisseaux sanguins dans le corps humain.",
    QCM: [
      {
        _id: "6752371474e5aa96aa09e5ce",
        title: "Le Pacifique et le Système Circulatoire",
        questions: [
          {
            _id: "6752371474e5aa96aa09e5cf",
            question: "Quelle fonction du corps humain peut être comparée au rôle du Pacifique dans la régulation de la température mondiale ?",
            answers: [
              "Le système circulatoire sanguin",
              "Le système digestif",
              "Le système respiratoire",
              "Le système lymphatique"
            ],
            correctAnswerIndex: 0
          },
          {
            _id: "6752371474e5aa96aa09e5d0",
            question: "Comme le cœur qui bat à un rythme régulier, le Pacifique possède des courants qui se renouvellent tous les :",
            answers: [
              "12 heures",
              "24 heures",
              "7 jours",
              "30 jours"
            ],
            correctAnswerIndex: 1
          },
          {
            _id: "6752371474e5aa96aa09e5d1",
            question: "Quel pourcentage du volume sanguin total le cœur pompe-t-il chaque minute, similaire au pourcentage d'eau que le Pacifique fait circuler dans les océans ?",
            answers: [
              "5%",
              "25%",
              "50%",
              "100%"
            ],
            correctAnswerIndex: 2
          }
        ]
      },
      {
        _id: "6752371474e5aa96aa09e5d2",
        title: "Biodiversité et Écosystèmes",
        questions: [
          {
            _id: "6752371474e5aa96aa09e5d3",
            question: "Combien d'espèces marines différentes estime-t-on vivre dans le Pacifique ?",
            answers: [
              "Environ 50 000",
              "Environ 100 000",
              "Plus de 250 000",
              "Plus de 500 000"
            ],
            correctAnswerIndex: 2
          },
          {
            _id: "6752371474e5aa96aa09e5d4",
            question: "Quelle proportion des récifs coralliens mondiaux se trouve dans le Pacifique ?",
            answers: [
              "25%",
              "40%",
              "52%",
              "65%"
            ],
            correctAnswerIndex: 2
          }
        ]
      }
    ],
    anecdotes: [
      {
        _id: "6752371474e5aa96aa09e5d5",
        title: "Le Grand Tapis Roulant Océanique",
        subtitle: "Le cœur de la circulation mondiale",
        description: "La circulation thermohaline du Pacifique fonctionne comme le système circulatoire humain. Tout comme le cœur pompe environ 7500 litres de sang par jour, le Pacifique déplace quotidiennement environ 16 millions de mètres cubes d'eau par seconde. Cette circulation influence le climat mondial comme le sang régule la température corporelle.",
        sources: [
          "National Ocean Service",
          "NOAA Ocean Exploration",
          "Woods Hole Oceanographic Institution"
        ]
      },
      {
        _id: "6752371474e5aa96aa09e5d6",
        title: "Les Fosses Abyssales",
        subtitle: "Les artères profondes de l'océan",
        description: "Les fosses abyssales du Pacifique, comme la fosse des Mariannes, fonctionnent comme les artères profondes du corps. Ces fosses abritent des écosystèmes uniques adaptés à des pressions extrêmes, similaires aux adaptations des cellules sanguines pour traverser les plus petits vaisseaux.",
        sources: [
          "Scripps Institution of Oceanography",
          "Nature Journal - Deep Sea Research"
        ]
      },
      {
        _id: "6752371474e5aa96aa09e5d7",
        title: "Le Cycle du Carbone",
        subtitle: "L'équivalent de la respiration cellulaire",
        description: "Le Pacifique absorbe et relâche du CO2 comme nos cellules lors de la respiration cellulaire. Il capture environ 25% du CO2 atmosphérique émis par les activités humaines, jouant un rôle crucial dans la régulation du climat, similaire à la façon dont notre sang transporte le CO2 vers nos poumons.",
        sources: [
          "Global Carbon Project",
          "Pacific Marine Environmental Laboratory"
        ]
      }
    ],
    createdAt: "2024-12-05T23:28:20.524Z",
    updatedAt: "2024-12-05T23:28:20.524Z"
  },
  // Ajoutez ici les autres océans en suivant la même structure
];
