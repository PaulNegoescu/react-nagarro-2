import { Film } from "../features/Films/FilmTypes";

export class FilmRepository {
    private baseUrl = 'http://localhost:3210';

    public async getAllShallow(): Promise<Film[] | null> {
        const films = await fetch(`${this.baseUrl}/films`)
            .then((res) => res.json());

        if (!films) {
            return [];
        }

        return films;
    }

    public async getByIdFull(id: number): Promise<Film | null> {
        const film = await fetch(`${this.baseUrl}/films/${id}`)
            .then((res) => res.json());

        if (!film) {
            return null;
        }

        const filmWithExternalResources = await this.populateExternalResources(film);
        return filmWithExternalResources;
    }

    private async populateExternalResources(film: Film): Promise<Film> {
        const resourcesNames = [
            'characters',
            'starships',
            'vehicles',
            'planets',
            'species',
        ] as const;

        const relatedEntities: Partial<Record<(typeof resourcesNames)[number], any>> = {};

        for (const resourceName of resourcesNames) {
            const resourceId = film[resourceName];
            if (resourceId) {
                relatedEntities[resourceName] = await this.getResources(resourceName, resourceId);
            }
        }

        return { ...film, ...relatedEntities };
    }

    private getResources(resourceType: string, resourceIds: number[]) {
        const resourcePromises = [];

        for (const resId of resourceIds) {
            const promise = fetch(`${this.baseUrl}/${resourceType}/${resId}`)
                .then((res) => res.json());
            resourcePromises.push(promise);
        }

        return Promise.all(resourcePromises);
    }
}
