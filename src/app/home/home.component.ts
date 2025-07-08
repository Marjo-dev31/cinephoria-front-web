import { Component, inject, OnInit } from '@angular/core';
import { CarouselComponent } from '../shared/ui/carrousel';
import { MoviesService } from '../movies/movies.service';

@Component({
  selector: 'app-home',
  imports: [CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private readonly moviesService = inject(MoviesService)

  moviesback!: any

  ngOnInit(): void {
    this.getAllMovies()
  }
  getAllMovies() {
    this.moviesService.getAllMovies().subscribe((response)=>{
      this.moviesback = response
    })
  }
}
