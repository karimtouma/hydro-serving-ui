import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';

import { SelectModule } from 'ng2-select';

// Pipes
import {
    SidebarFilterPipe,
    ModelStatusPipe,
    PositiveNumbersPipe,
    SearchPipe,
    SortByPipe,
    UtcToLocalPipe,
    IterateAsArrayPipe,
    RemoveDublicatesPipe
} from './pipes/_index';

// Components
import {
    InputTextComponent,
    HydroSelectComponent,
    TextareaComponent,
    SidebarComponent,
    ListInfoComponent,
    SignaturesComponent,
} from './components/_index';



@NgModule({
    imports: [
        MdlSelectModule,
        BrowserModule,
        CommonModule,
        MdlModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MomentModule,
        SelectModule,
    ],
    declarations: [
        // Pipes
        SidebarFilterPipe,
        ModelStatusPipe,
        PositiveNumbersPipe,
        SearchPipe,
        SortByPipe,
        UtcToLocalPipe,
        IterateAsArrayPipe,
        RemoveDublicatesPipe,
        // Components
        InputTextComponent,
        TextareaComponent,
        HydroSelectComponent,
        SidebarComponent,
        ListInfoComponent,
        SignaturesComponent,
    ],
    exports: [
        // Pipes
        SidebarFilterPipe,
        ModelStatusPipe,
        PositiveNumbersPipe,
        SearchPipe,
        SortByPipe,
        UtcToLocalPipe,
        IterateAsArrayPipe,
        RemoveDublicatesPipe,
        // Components
        InputTextComponent,
        TextareaComponent,
        HydroSelectComponent,
        SidebarComponent,
        ListInfoComponent,
        SignaturesComponent,
    ]
})
export class SharedModule { }
