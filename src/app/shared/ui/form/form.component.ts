import {
    Component,
    EventEmitter,
    Input,
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
    @Input() formModelConfig: DynamicControl[] = [];
    @Output() outputForm = new EventEmitter();

    formModel = new FormGroup({});

    ngOnChange(changes: SimpleChanges) {
        if (changes['formModelConfig'] && this.formModelConfig.length) {
          setTimeout(()=>{
            this.formModel = new FormGroup({});
            this.formModelConfig
            .forEach((control) =>
                this.formModel.addControl(
                    control.controlKey,
                    new FormControl(control.defaultValue, {
                        updateOn: control.updateOn,
                        validators: control.validators,
                    }),
                ),
            );
          }, 3000)
            
        }
    }

    onSubmit() {
        this.outputForm.emit(structuredClone(this.formModel.value));
        // this.formModel.reset();
    }
}
