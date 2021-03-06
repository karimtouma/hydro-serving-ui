import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { MdlDialogOutletService } from '@angular-mdl/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from '@shared/models/_index';
import * as Actions from '@shared/actions/_index';
import { GetApplicationsAction } from '@modules/applications/actions/applications.actions';



@Component({
    selector: 'hydro-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(
        private dialogOutletService: MdlDialogOutletService,
        private viewConatinerRef: ViewContainerRef,
        private store: Store<ApplicationState>,
    ) {
        this.dialogOutletService.setDefaultViewContainerRef(this.viewConatinerRef);
    }

    ngOnInit() {
        this.store.dispatch(new Actions.GetModelsAction);
        this.store.dispatch(new GetApplicationsAction);
        this.store.dispatch({ type: Actions.GET_RUNTIMES });
        this.store.dispatch({ type: Actions.GET_ENVIRONMENTS });
        this.store.dispatch(new Actions.GetModelVersionsAction);
    }
}
