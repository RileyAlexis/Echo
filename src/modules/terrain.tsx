interface BuildingMap {
    building: Buildings,
    x: number,
    y: number
}

type Buildings =
    'keep' |
    'house01' |
    'house06'


export const groundMap01: Number[][] =
    [
        [1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 2, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1]
    ];

export const groundMap02: Number[][] =
    [
        [0, 1],
        [1, 0]
    ]

export const buildingMap01: BuildingMap[] =
    [
        { building: 'keep', x: 1, y: 1 },
        { building: 'house01', x: 2, y: 1 },
        { building: 'house06', x: 4, y: 1 }

    ]

