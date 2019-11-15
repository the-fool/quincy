import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { ToolboxComponent } from './toolbox/toolbox.component';
import { CircuitComponent } from './circuit/circuit.component';
import { GateComponent } from './gate/gate.component';
import { InitialQubitComponent } from './circuit/initial-qubit/initial-qubit.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolboxComponent,
    CircuitComponent,
    GateComponent,
    InitialQubitComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
