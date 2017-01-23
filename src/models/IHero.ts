interface IHero {
    id: string;
    name: string;
    aliases: Array<string>,
    occupation: string,
    height: { ft: number, in: number },
    hair: string,
    eyes: string,
    powers: Array<string>
}

export = IHero