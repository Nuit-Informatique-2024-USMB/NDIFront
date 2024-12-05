export interface Ocean {
    name: string;
    position: {
        latitude: number;
        longitude: number;
    };
    info: string;
}

export const OCEANS: Ocean[] = [
    {
        name: "Océan Pacifique",
        position: {
            latitude: 0,
            longitude: -160
        },
        info: "Plus grand et plus profond océan de la Terre, couvrant environ 46% de la surface maritime."
    },
    {
        name: "Océan Atlantique",
        position: {
            latitude: 0,
            longitude: -30
        },
        info: "Deuxième plus grand océan, séparant les Amériques de l'Europe et de l'Afrique."
    },
    {
        name: "Océan Indien",
        position: {
            latitude: 0,
            longitude: 80
        },
        info: "Troisième plus grand océan, bordé par l'Asie du Sud, l'Afrique et l'Australie."
    },
    {
        name: "Océan Austral",
        position: {
            latitude: -60,
            longitude: 0
        },
        info: "Entoure l'Antarctique et s'étend du 60e parallèle sud jusqu'au continent."
    },
    {
        name: "Océan Arctique",
        position: {
            latitude: 90,
            longitude: 0
        },
        info: "Plus petit et moins profond des océans, largement entouré par les terres."
    }
];
