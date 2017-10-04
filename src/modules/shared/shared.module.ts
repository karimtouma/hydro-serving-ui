import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MdlModule } from '@angular-mdl/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Services
import {
    HttpWeightedServicesService,
    BuildModelService,
    FormsService,
    HttpModelRuntimeService,
    HttpModelServiceService,
    HttpModelsService,
    HttpRuntimeTypesService,
    HttpService,
    LoaderStateService,
    ServicesService,
    ModelsService,
    ModelRuntimesService,
    ModelServicesService,
    CheckServiceExistService
} from './services/_index';

// Stores
// import {
//     WeightedServiceStore,
//     ModelRuntimeStore,
//     ModelServiceStore,
//     ModelStore
// } from './stores/_index';

// Pipes
import {
    ModelStatusPipe,
    PositiveNumbersPipe,
    SearchPipe,
    SortByPipe,
    UtcToLocalPipe
} from './pipes/_index';

// Components
import {
    InputTextComponent,
    LoaderComponent,
    NavbarComponent,
    SidebarComponent,
    ContentComponent,
    TableComponent,
    ContentHeaderComponent
} from './components/_index';

// Builders
import {
  ModelBuilder,
  ModelRuntimeBuilder,
  RuntimeTypeBuilder,
  ModelCurrentServicesBuilder,
  ModelBuildBuilder,
  ServiceBuilder,
} from './builders/_index';

// Guards
import {
    RedirectToServicesGuard
} from './guards/_index';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        MdlModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: [
        // Pipes
        ModelStatusPipe,
        PositiveNumbersPipe,
        SearchPipe,
        SortByPipe,
        UtcToLocalPipe,
        // Components
        InputTextComponent,
        SidebarComponent,
        ContentComponent,
        TableComponent,
        ContentHeaderComponent
    ],
    providers: [
        // Services
        HttpWeightedServicesService,
        BuildModelService,
        FormsService,
        HttpModelRuntimeService,
        HttpModelServiceService,
        HttpModelsService,
        HttpRuntimeTypesService,
        HttpService,
        LoaderStateService,
        ServicesService,
        ModelRuntimesService,
        ModelsService,
        ModelServicesService,
        CheckServiceExistService,
        // Stores
        // WeightedServiceStore,
        // ModelRuntimeStore,
        // ModelServiceStore,
        // ModelStore,
        // Builders
        ModelBuilder,
        ModelRuntimeBuilder,
        RuntimeTypeBuilder,
        ModelCurrentServicesBuilder,
        ModelBuildBuilder,
        ServiceBuilder,
        // Guards
        RedirectToServicesGuard
    ],
    exports: [
        // Pipes
        ModelStatusPipe,
        PositiveNumbersPipe,
        SearchPipe,
        SortByPipe,
        UtcToLocalPipe,
        // Components
        InputTextComponent,
        SidebarComponent,
        ContentComponent,
        TableComponent,
        ContentHeaderComponent
    ]
})
export class SharedModule { }
