import { Component, OnInit, Inject, InjectionToken, HostListener } from '@angular/core';
import { MdlDialogReference, MdlDialogService } from '@angular-mdl/core';
import { MdlSnackbarService } from '@angular-mdl/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModelStore } from '@stores/model.store';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/display/placeholder.js';
import { Model, ModelService, Service } from '@shared/models/_index';
import { ServicesService, ModelServicesService } from '@shared/services/_index';

export let injectableModelBuildOptions = new InjectionToken<object>('injectableModelBuildOptions');

@Component({
  selector: 'hydro-dialog-test-model',
  templateUrl: './dialog-test.component.html',
  styleUrls: ['./dialog-test.component.scss'],
  providers: [MdlSnackbarService, FormBuilder]
})
export class DialogTestComponent implements OnInit {
  public data;
  public model;
  public testForm: FormGroup;
  public codeMirrorInputOptions: {};
  public codeMirrorOutputOptions: {};
  public output: {};
  public testBtn: string;
  public testTitle: string;

  constructor( @Inject(injectableModelBuildOptions) data,
    public dialogRef: MdlDialogReference,
    private fb: FormBuilder,
    private modelStore: ModelStore,
    private mdlSnackbarService: MdlSnackbarService,
    private modelServicesService: ModelServicesService,
    private servicesService: ServicesService
  ) {
    this.model = data;
  }

  ngOnInit() {
    if (!this.model.id) {
      this.testTitle = `Test model #${this.model.serviceId}`;
      this.testBtn = 'Test model';
    } else {
      this.testTitle = `Test service "${this.model.serviceName}"`;
      this.testBtn = `Test service`;
    }
    this.createTestForm();
    this.codeMirrorInputOptions = {
      matchBrackets: true,
      autoCloseBrackets: true,
      mode: { name: 'javascript', json: true },
      lineWrapping: true,
      readOnly: false,
      scrollbarStyle: 'null'
    };
    this.codeMirrorOutputOptions = {
      matchBrackets: true,
      autoCloseBrackets: true,
      mode: { name: 'javascript', json: true },
      lineWrapping: true,
      readOnly: true,
      scrollbarStyle: 'null'
    };
  }

  @HostListener('keydown.esc')
  public onEsc(): void {
    this.dialogRef.hide();
  }

  private createTestForm() {
    this.testForm = this.fb.group({
      data: [this.extractModelInputFields(this.model), [Validators.required]],
      path: ['/serve', [Validators.required]],
    });
  }

  private extractModelInputFields(model): string {
    let inputFields;
    if (model.inputFields) {
      inputFields = model.inputFields;
    } else if (model.modelRuntime && model.modelRuntime.inputFields) {
      inputFields = model.modelRuntime.inputFields;
    } else {
      return JSON.stringify([{}]);
    }
    return JSON.stringify(inputFields.map(field => ({[field]: ''})), undefined, 2);
  }

  submitTestForm(form) {
    let apiUrl;
    let snackbarSuccessMsg;
    const controls = form.controls;
    const data = JSON.parse(controls.data.value);
    const testOptions = {
      id: this.model.id || this.model.serviceId,
      path: controls.path.value,
      data: data
    };

    if (this.model instanceof Model) {
      apiUrl = this.modelStore.testModel.bind(this.modelStore);
      snackbarSuccessMsg = 'Model test was successful';
    } else {
      if (this.model instanceof Service) {
        apiUrl = this.servicesService.serveService.bind(this.servicesService);
        snackbarSuccessMsg = 'Service test was successful';
      } else {
        apiUrl = this.modelServicesService.serveModelService.bind(this.modelServicesService);
        snackbarSuccessMsg = 'Model test was successful';
      }
    }

    console.log(apiUrl);
    console.log(JSON.stringify(testOptions));

    apiUrl(JSON.stringify(testOptions))
      .subscribe(res => {
          this.output = JSON.stringify(res, undefined, 2);
          this.mdlSnackbarService.showSnackbar({
            message: snackbarSuccessMsg,
            timeout: 5000
          });
        },
        (error) => {
          this.mdlSnackbarService.showSnackbar({
            message: `Error: ${error}`,
            timeout: 5000
          });
        });
  }
}
