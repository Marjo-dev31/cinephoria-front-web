import { NgStyle } from '@angular/common';
import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { DatatableComponent } from '../../../shared/ui/datatable/datatable.component';
import { FormComponent } from '../../../shared/ui/form/form.component';
import { MoviesService } from '../../data-access/movies.service';
import {
    MovieCreateInterface,
    MovieDisplayFormInterface,
    MovieInterface,
    MovieUpdateInterface,
} from '../../models/movie.interface';
import { DynamicControl } from '../../../shared/models/form.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { GenreService } from '../../../shared/data-access/genre.service';
import { Validators } from '@angular/forms';
import { UploadService } from '../../../shared/data-access/upload.service';

@Component({
    selector: 'app-moviebackoffice',
    standalone: true,
    imports: [NgStyle, DatatableComponent, FormComponent],
    templateUrl: './movie.backoffice.component.html',
})
export class MovieBackofficeComponent {
    private readonly movieService = inject(MoviesService);
    private readonly genreService = inject(GenreService);
    private readonly uploadService = inject(UploadService);
    private readonly destroyRef = inject(DestroyRef);

    movies: MovieInterface[] = [];
    isDisplayAddForm = signal(false);
    isDiplayEditForm = signal(false);
    currentMovie = signal<MovieInterface>({
        id: '',
        title: '',
        description: '',
        minimun_Age: 0,
        image_Url: '',
        genre: { id: '', title: '' },
        reviews: [],
        showing: [],
        is_Favorite: false,
        create_At: new Date(),
    });

    currentMovieDisplayOnForm = computed<MovieDisplayFormInterface>(() => {
        return {
            title: this.currentMovie().title,
            description: this.currentMovie().description,
            minimun_Age: this.currentMovie().minimun_Age,
            genre: this.currentMovie().genre.title,
            is_Favorite:
                this.currentMovie().is_Favorite === true ? 'oui' : 'non',
            image_Url: this.currentMovie().image_Url
        };
    });

    formModelConfig!: DynamicControl[];

    onDisplayForm() {
        this.isDisplayAddForm.update((value) => !value);
    }

    handleDeleteMovie(id: string) {
        this.movieService
            .deleteMovie(id)
            .pipe(
                tap(() => this.getAllMovies()),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe();
    }

    handleEditMovie(movie: unknown) {
        this.isDiplayEditForm.set(true);
        this.currentMovie.set(movie as MovieInterface);
    }

    handleAddMovie(movie: MovieDisplayFormInterface) {
        const image_Url = movie.image_Url.split('\\').pop() || ''
        this.genreService
            .getAllGenre()
            .pipe(
                tap(() => this.getAllMovies()),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe((genres) => {
                const genre = genres.find(
                    (genre) => genre.title === movie.genre,
                );
                if (genre) {
                    const newMovie: MovieCreateInterface = {
                        title: movie.title,
                        description: movie.description,
                        minimun_Age: +movie.minimun_Age,
                        genre: genre,
                        is_Favorite: movie.is_Favorite === 'oui' ? true : false,
                        image_Url: image_Url
                    };
                    this.movieService
                        .createMovie(newMovie)
                        .pipe(
                            tap(() => this.getAllMovies()),
                            takeUntilDestroyed(this.destroyRef),
                        )
                        .subscribe();
                }
            });
    }

    handleUploadFile(file: File){
        const formData = new FormData();
        formData.append('file', file);
        this.uploadService.addImage(formData).pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();
    }

    handleUpdateMovie(movie: MovieDisplayFormInterface) {
        this.genreService
            .getAllGenre()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((genres) => {
                const genre = genres.find(
                    (genre) => genre.title === movie.genre,
                );
                if (genre) {
                    const updatedMovie: MovieUpdateInterface = {
                        id: this.currentMovie().id,
                        title: movie.title,
                        description: movie.description,
                        minimun_Age: movie.minimun_Age,
                        genre: genre,
                        is_Favorite: movie.is_Favorite === 'oui' ? true : false,
                        image_Url: movie.image_Url
                    };
                    this.movieService
                        .updateMovie(updatedMovie)
                        .pipe(
                            tap(() => this.getAllMovies()),
                            takeUntilDestroyed(this.destroyRef),
                        )
                        .subscribe();
                }
            });
    }

    handleCloseForm(close: boolean){
        this.isDiplayEditForm.set(close);
        this.isDisplayAddForm.set(close);
    }

    getAllMovies() {
        return this.movieService
            .getAllMovies()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((movies) => (this.movies = movies));
    }

    ngOnInit(): void {
        this.getAllMovies();
        this.genreService
            .getAllGenre()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((genres) => {
                const genreOptions = genres.map((genre) => genre.title);
                this.formModelConfig = [
                    {
                        controlKey: 'title',
                        formFieldType: 'input',
                        label: 'titre',
                        defaultValue: '',
                        validators: [Validators.required],
                    },
                    {
                        controlKey: 'description',
                        formFieldType: 'textarea',
                        label: 'description',
                        rows:10,
                        validators: [Validators.required],
                    },
                    {
                        controlKey: 'minimun_Age',
                        formFieldType: 'input',
                        inputType: 'number',
                        label: 'age minimun',
                        min: 0,
                        validators: [
                            Validators.required,
                            Validators.pattern(/^[0-9]\d*$/),
                        ],
                    },
                    {
                        controlKey: 'genre',
                        formFieldType: 'select',
                        label: 'genre',
                        defaultValue: '',
                        selectOptions: genreOptions,
                        validators: [Validators.required],
                    },
                    {
                        controlKey: 'is_Favorite',
                        formFieldType: 'select',
                        label: 'coup de coeur',
                        defaultValue: '',
                        selectOptions: ['oui', 'non'],
                        validators: [Validators.required],
                    },
                    {
                        controlKey: 'image_Url',
                        formFieldType: 'input',
                        inputType:'file',
                        accept:'image/png, image/jpeg, image/jpg, image/webp',
                        label: 'affiche',
                        defaultValue: '',
                        selectOptions: ['oui', 'non'],
                        validators: [Validators.required],
                    },
                ];
            });
    }

    displayColumns = signal([
        {
            key: 'title',
            label: 'titre',
            accessor: (row: MovieInterface) => row.title,
        },
        {
            key: 'description',
            label: 'description',
            accessor: (row: MovieInterface) => row.description,
        },
        {
            key: 'minimun_Age',
            label: 'age minimun',
            accessor: (row: MovieInterface) => row.minimun_Age,
        },
        {
            key: 'genre',
            label: 'genre',
            accessor: (row: MovieInterface) => row.genre.title,
        },
        {
            key: 'is_Favorite',
            label: 'coup de coeur',
            accessor: (row: MovieInterface) => row.is_Favorite,
        },
        {
            key: 'image_Url',
            label: 'affiche',
            accessor: (row: MovieInterface) => row.image_Url,
        },
    ]);
}
