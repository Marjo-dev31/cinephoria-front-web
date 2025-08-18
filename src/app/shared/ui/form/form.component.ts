import {
    Component,
    EventEmitter,
    input,

    Output,
    SimpleChanges,
} from '@angular/core';
import { DynamicControl } from '../../models/form.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-form',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './form.component.html',
})
export class FormComponent {
   formModelConfig = input<DynamicControl[]>();
    @Output() outputForm = new EventEmitter();

    formModel = new FormGroup({});

    ngOnChanges(changes: SimpleChanges) {
        if (changes['formModelConfig']) {
            this.formModel = new FormGroup({});
            this.formModelConfig()?.
            forEach((control: DynamicControl) =>
                this.formModel.addControl(
                    control.controlKey,
                    new FormControl(control.defaultValue, {
                        updateOn: control.updateOn,
                        validators: control.validators,
                    }),
                ),
            );
          }
            
        };

    onSubmit() {
        this.outputForm.emit(structuredClone(this.formModel.value));
        this.formModel.reset();
    }

}
