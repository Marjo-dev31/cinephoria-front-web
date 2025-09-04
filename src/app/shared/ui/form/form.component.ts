import {
    Component,
    EventEmitter,
    input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import { DynamicControl } from '../../models/form.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RoomInterface } from '../../../room/models/room.interface';

@Component({
    selector: 'app-form',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './form.component.html',
})
export class FormComponent implements OnChanges {
    readonly formModelConfig = input.required<DynamicControl[]>();
    readonly currentItem = input<RoomInterface>();
    @Output() outputForm = new EventEmitter();

    formModel = new FormGroup({});

    ngOnChanges(changes: SimpleChanges) {
        if (changes['formModelConfig']) {
            this.formModel = new FormGroup({});
            this.formModelConfig()?.forEach((control: DynamicControl) =>
                this.formModel.addControl(
                    control.controlKey,
                    new FormControl(control.defaultValue, {
                        updateOn: control.updateOn,
                        validators: control.validators,
                    }),
                ),
            );
        }
        if(this.currentItem()){
          this.formModel.patchValue(this.currentItem() as any)
          console.log(this.formModel.value)
        }
        
    }

    onSubmit() {
        this.outputForm.emit(structuredClone(this.formModel.value));
        this.formModel.reset();
    }


}
