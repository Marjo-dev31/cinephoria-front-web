import {
    Component,
    EventEmitter,
    input,
    OnChanges,
    output,
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
export class FormComponent implements OnChanges {
    readonly formModelConfig = input.required<DynamicControl[]>();
    readonly currentItem = input();
    @Output() outputForm = new EventEmitter();
    displayForm = output<boolean>();
    fileOutput = output<File>();

    formModel = new FormGroup({});

    selectedFile!: File;

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
        if (this.currentItem()) {
            this.formModel.patchValue(this.currentItem() as any);
        }
    }

    onSubmit() {
        this.outputForm.emit(structuredClone(this.formModel.value));
        if (this.selectedFile) {
            this.fileOutput.emit(this.selectedFile);
        }
        this.formModel.reset()
    }

    onClose() {
        this.displayForm.emit(false);
        this.formModel.reset();
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.type === 'file' && input.files && input.files.length > 0) {
            this.selectedFile = input.files[0];
        }
    }
}
