import { Pipe, PipeTransform } from '@angular/core';
import { ReviewInterface } from '../../../reviews/models/review.interface';

@Pipe({
    name: 'hoursDisplay',
})
export class HoursDisplayPipe implements PipeTransform {
    transform(hours: string): string {
        return hours.slice(0, -3);
    }
}
