import { AsyncPipe, JsonPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BehaviorSubject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Pokemon } from './pokemon.model';
import { PokemonService } from './pokemon.service';

@Component({
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NgIf,
        AsyncPipe,
        JsonPipe,
        NgOptimizedImage,
        MatProgressSpinnerModule,
    ],
    providers: [PokemonService],
})
export class AppComponent implements OnInit {
    control = this.fb.control('', [Validators.required]);

    loading$ = new BehaviorSubject<boolean>(false);
    pokemon$ = new BehaviorSubject<Pokemon | undefined>(undefined);

    constructor(
        private readonly pokemonService: PokemonService,
        private readonly fb: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.loading$.next(true);
        // random integer from 1 to 1000
        const randomId = Math.floor(Math.random() * 1000) + 1;
        this.control.setValue(`${randomId}`);
        this.pokemonService.findById(randomId).subscribe(pokemon => {
            this.pokemon$.next(pokemon);
            this.loading$.next(false);
        });

        // listen keywordControl changes and update pokemon
        this.control.valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                switchMap(id => this.pokemonService.findById(id as string)),
            )
            .subscribe(pokemon => {
                this.pokemon$.next(pokemon);
            });
    }
}
