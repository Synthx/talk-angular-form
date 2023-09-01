export interface Pokemon {
    id: number;
    name: string;
    weight: number;
    sprites: {
        front_default: string;
        front_shiny: string;
    };
    types: {
        slot: number;
        type: {
            name: string;
        };
    }[];
}
