import { Pipe, PipeTransform } from "@angular/core";
import { ReviewInterface } from "../../reviews/models/review.interface";

@Pipe({
  name:'averagePipe'
})
export class AveragePipe implements PipeTransform {
  transform(reviews: Pick<ReviewInterface, 'grade'>[]): number {
    if(reviews.length === 0) {
      return 0
    }
    const arrayGrades = reviews.map((review)=> review.grade)
     const average = arrayGrades.reduce((acc, cur)=> acc + cur, 
    0) / arrayGrades.length
     return average
  }
}
