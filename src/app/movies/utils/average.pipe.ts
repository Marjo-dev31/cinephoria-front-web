import { Pipe, PipeTransform } from "@angular/core";
import { ReviewInterface } from "../models/review.interface";

@Pipe({
  name:'averagePipe'
})
export class AveragePipe implements PipeTransform {
  transform(reviews: ReviewInterface[]): number {
    if(reviews.length === 0) {
      return 0
    }
    const arrayGrades = reviews.map((review)=> review.grade)
     const average = arrayGrades.reduce((acc, cur)=> acc + cur, 
    0) / arrayGrades.length
     return average
  }
}
