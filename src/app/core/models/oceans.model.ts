export interface Ocean {
    name: string;
    position: {
      latitude: number;
      longitude: number;
    };
    info: string;
    QCM: {
      title: string;
      questions: string[];
      answers: string[];
      correctAnswerIndex: number;
    }[];
    anecdotes: string[];
  }


  export const OCEANS: Ocean[] = [
    {
      name: "Océan Pacifique",
      position: {
        latitude: 0,
        longitude: -160
      },
      info: "Plus grand et plus profond océan de la Terre, couvrant environ 46% de la surface maritime.",
      QCM: [
        {
          title: "Quel est l'océan le plus grand du monde ?",
          questions: [
            "Océan Pacifique",
            "Océan Atlantique",
            "Océan Indien",
            "Océan Arctique"
          ],
          answers: [
            "Océan Pacifique",
            "Océan Atlantique",
            "Océan Indien",
            "Océan Arctique"
          ],
          correctAnswerIndex: 0
        },
        {
          title: "Où se situe l'Océan Pacifique ?",
          questions: [
            "Entoure l'Antarctique",
            "Sépare l'Asie et l'Afrique",
            "Couvre une large partie du Pacifique",
            "Est situé entre l'Amérique du Nord et du Sud"
          ],
          answers: [
            "Entoure l'Antarctique",
            "Sépare l'Asie et l'Afrique",
            "Couvre une large partie du Pacifique",
            "Est situé entre l'Amérique du Nord et du Sud"
          ],
          correctAnswerIndex: 2
        }
      ],
      anecdotes: [
        "Le Pacifique tire son nom du mot latin 'pacificus', qui signifie 'paisible'.",
        "Il couvre plus de 63 millions de kilomètres carrés, soit environ 46% de la surface océanique terrestre."
      ]
    },
    {
      name: "Océan Atlantique",
      position: {
        latitude: 0,
        longitude: -30
      },
      info: "Deuxième plus grand océan, séparant les Amériques de l'Europe et de l'Afrique.",
      QCM: [
        {
          title: "Quel océan sépare l'Europe et l'Afrique des Amériques ?",
          questions: [
            "Océan Pacifique",
            "Océan Atlantique",
            "Océan Indien",
            "Océan Arctique"
          ],
          answers: [
            "Océan Pacifique",
            "Océan Atlantique",
            "Océan Indien",
            "Océan Arctique"
          ],
          correctAnswerIndex: 1
        }
      ],
      anecdotes: [
        "L'Océan Atlantique est le deuxième plus grand océan après l'Océan Pacifique.",
        "L'Atlantique a été le site de nombreux événements historiques, dont les traversées des premiers explorateurs européens."
      ]
    },
    {
      name: "Océan Indien",
      position: {
        latitude: 0,
        longitude: 80
      },
      info: "Troisième plus grand océan, bordé par l'Asie du Sud, l'Afrique et l'Australie.",
      QCM: [
        {
          title: "Quel océan borde l'Asie du Sud, l'Afrique et l'Australie ?",
          questions: [
            "Océan Pacifique",
            "Océan Atlantique",
            "Océan Indien",
            "Océan Arctique"
          ],
          answers: [
            "Océan Pacifique",
            "Océan Atlantique",
            "Océan Indien",
            "Océan Arctique"
          ],
          correctAnswerIndex: 2
        }
      ],
      anecdotes: [
        "L'Océan Indien est essentiel pour le commerce mondial, reliant l'Asie, l'Afrique et l'Australie.",
        "Cet océan est riche en biodiversité marine, avec de nombreuses espèces endémiques."
      ]
    },
    {
      name: "Océan Austral",
      position: {
        latitude: -60,
        longitude: 0
      },
      info: "Entoure l'Antarctique et s'étend du 60e parallèle sud jusqu'au continent.",
      QCM: [
        {
          title: "Où se situe l'Océan Austral ?",
          questions: [
            "Entoure l'Antarctique",
            "Couvre le pôle nord",
            "Entre l'Asie et l'Afrique",
            "Autour du continent austral"
          ],
          answers: [
            "Entoure l'Antarctique",
            "Couvre le pôle nord",
            "Entre l'Asie et l'Afrique",
            "Autour du continent austral"
          ],
          correctAnswerIndex: 0
        }
      ],
      anecdotes: [
        "L'Océan Austral est le seul océan qui n'a pas de limites naturelles comme des continents.",
        "Il joue un rôle crucial dans la régulation du climat mondial en influençant les courants océaniques."
      ]
    },
    {
      name: "Océan Arctique",
      position: {
        latitude: 90,
        longitude: 0
      },
      info: "Plus petit et moins profond des océans, largement entouré par les terres.",
      QCM: [
        {
          title: "Quel est l'océan le plus petit du monde ?",
          questions: [
            "Océan Pacifique",
            "Océan Atlantique",
            "Océan Indien",
            "Océan Arctique"
          ],
          answers: [
            "Océan Pacifique",
            "Océan Atlantique",
            "Océan Indien",
            "Océan Arctique"
          ],
          correctAnswerIndex: 3
        }
      ],
      anecdotes: [
        "L'Océan Arctique est principalement couvert de glace pendant une grande partie de l'année.",
        "L'Arctique est l'habitat d'espèces uniques comme l'ours polaire et le phoque du Groenland."
      ]
    }
  ];
  