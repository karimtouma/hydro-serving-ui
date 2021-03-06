import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';

import { Store } from '@ngrx/store';
import { ApplicationsDialogBase } from '@shared/base/_index';
import * as HydroActions from '@modules/applications/actions/applications.actions';
import { ApplicationState, Application } from '@shared/models/_index';
import { FormsService } from '@shared/services/_index';



@Component({
    selector: 'hydro-dialog-add-service',
    templateUrl: './dialog-add-service.component.html',
    styleUrls: ['./dialog-add-service.component.scss'],
})
export class DialogAddServiceComponent extends ApplicationsDialogBase implements OnInit {

    public dialogType = 'Add';

    constructor(
        public fb: FormBuilder,
        public dialogRef: MdlDialogReference,
        public formsService: FormsService,
        public mdlSnackbarService: MdlSnackbarService,
        public store: Store<ApplicationState>,
    ) {
        super(
            fb,
            dialogRef,
            formsService,
            mdlSnackbarService,
            store
        );
    }

    ngOnInit() {
        this.createForm();
        this.initFormChangesListener();
    }

    onSubmit() {
        if (this.serviceForm.invalid) {
            return;
        }

        const serviceInfo = {
            name: this.serviceForm.value.applicationName,
            kafkaStreaming: this.isKafkaEnabled ? this.serviceForm.value.kafkaStreaming : [],
            executionGraph: {
                stages: this.prepareFormDataToSubmit()
            }
        };

        const application = new Application(serviceInfo);

        this.store.dispatch(new HydroActions.AddApplicationAction(application));
        this.dialogRef.hide();
    }

}
