import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from './pokemon.model';

@Injectable()
export class PokemonService {
    constructor(private readonly http: HttpClient) {}

    findById(id: string | number): Observable<Pokemon | undefined> {
        return this.http.get<Pokemon | undefined>(`https://pokeapi.co/api/v2/pokemon/${id}`);
    }
}
