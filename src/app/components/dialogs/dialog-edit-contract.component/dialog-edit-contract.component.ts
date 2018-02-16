import { Component, OnInit, Inject, InjectionToken } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';
// import { MdlSnackbarService } from '@angular-mdl/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/display/placeholder.js';


import { Signature } from '@shared/models/_index';

import { ContractsService } from '@shared/services/_index';

import { DialogBase } from '@shared/base/_index';
// import { environment } from 'environments/environment';
// import { Location } from '@angular/common';


export let injectableModelId = new InjectionToken<object>('injectableModelId');

@Component({
    selector: 'hydro-dialog-edit-contract',
    templateUrl: './dialog-edit-contract.component.html',
    styleUrls: ['./dialog-edit-contract.component.scss']
})
export class DialogEditContractComponent extends DialogBase implements OnInit {
    public injectableModelId;
    public model;
    
    
    public input: {};
    public output: {};
    public testBtn: string;
    public testTitle: string;
    public requestBody: string;
    // private port;
    // private apiUrl;

    public signatures: Signature[];
    public contractsForm: FormGroup;
    public inputOptions = {
        matchBrackets: true,
        autoCloseBrackets: true,
        mode: { name: 'javascript', json: true },
        lineWrapping: true,
        readOnly: false,
        scrollbarStyle: 'null'
    };
    public outputOptions = {
        matchBrackets: true,
        autoCloseBrackets: true,
        mode: { name: 'javascript', json: true },
        lineWrapping: true,
        readOnly: false,
        scrollbarStyle: 'null'
    };

    constructor( 
        @Inject(injectableModelId) injectableModelId,
        public dialogRef: MdlDialogReference,
        private fb: FormBuilder,
        private contractsService: ContractsService
    ) {
        super(
            dialogRef
        );
        this.injectableModelId = injectableModelId;
    }


    ngOnInit() {
        this.createContractsForm();
        this.initFormChangesListener();
        this.contractsService.getModelContracts(this.injectableModelId)
            .subscribe(data => {
                console.log(data.signatures);
                this.signatures = data.signatures;
                this.updateContractsFormValues(this.signatures ? this.signatures : null);
            });
    }

    public addSignatureToContract() {
        const control = <FormArray>this.contractsForm.controls['signatures'];
        control.push(this.addSignature());
    }

    public removeSignatureFromContract(index: number) {
        const control = <FormArray>this.contractsForm.controls['signatures'];
        control.removeAt(index);
    }

    private updateContractsFormValues(signatures: Signature[]) {
        for (let i = 0; i < signatures.length - 1; i++) {
            this.addSignatureToContract();
        }
        
        this.contractsForm.patchValue({
            signatures: signatures
        });
    }

    private initFormChangesListener() {
        this.contractsForm.valueChanges
            .subscribe(form => {
                console.log(form);
            });
    }

    private createContractsForm() {
        this.contractsForm = this.fb.group({
            signatures: this.fb.array([this.addSignature()])
        });
    }

    private addSignature() {
        return this.fb.group({
            signatureName: [ '' ],
            inputs: this.fb.array([this.addSignatureField()]),
            outputs: this.fb.array([this.addSignatureField()]),
        });
    }

    private addSignatureField() {
        return this.fb.group({
            fieldName: [ '' ], 
            dataType: [ '' ], 
            shape: [ '' ]
        });
    }

    public onSubmit() {
        this.contractsService.updateModelContract(this.injectableModelId, { signatures: this.contractsForm.value.signatures })
            .subscribe(response => {
                console.log(response);
                this.dialogRef.hide();
                // this.mdlSnackbarService.showSnackbar({
                //     message: 'Contracts was successfully updated',
                //     timeout: 5000
                // });
            });
    }
}
