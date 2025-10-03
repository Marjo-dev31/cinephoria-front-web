import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MoviesService } from '../../../data-access/movies.service';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
Chart.register(...registerables);

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [],
    template: `
        <div class="flex flex-col justify-center items-center ml-96 w-2/3">
            <h2 class="text-center text-4xl font-bold font-roboto p-4">
                Suivi des ventes
            </h2>
            <div
                class="w-3/4 h-96 border-2 border-primary rounded-lg p-4 mb-10"
            >
                <canvas id="myChart">{{ chart }}</canvas>
            </div>
        </div>
    `,
})
export class DashboardComponent implements OnInit {
    private readonly movieService = inject(MoviesService);
    private readonly destroyRef = inject(DestroyRef);
    

    chart!: Chart;

    ngOnInit(): void {
        this.movieService
            .getAllSales()
            .pipe(
                map((movies) =>
                    movies.filter((movie) => {
                        const now = new Date();
                        const sevenDaysAgo = new Date();
                        sevenDaysAgo.setDate(now.getDate() - 7);
                        return new Date(movie.create_At) >= sevenDaysAgo;
                    }),
                ),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe((moviesFiltered) => {
                const salesByMovie = moviesFiltered.reduce<Record<string, number>>((acc, movie) => {
                    acc[movie.title] = (acc[movie.title] || 0) + movie.nbOfSales;
                    return acc;
                }, {});
                const config: ChartConfiguration = {
                    type: 'bar',
                    data: {
                        labels: Object.keys(salesByMovie),
                        datasets: [
                            {
                                label: 'Vente des 7 derniers jours par films',
                                data: Object.values(salesByMovie),
                                backgroundColor: ['rgba(61, 90, 128, 0.2)'],
                                borderColor: ['rgb(61, 90, 128)'],
                                borderWidth: 2,
                            },
                        ],
                    },
                    options: {
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                beginAtZero: true,
                                ticks: {
                                    maxTicksLimit: 6,
                                },
                            },
                        },
                    },
                };
                this.chart = new Chart('myChart', config);
            });
    }
}
