import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ToHoursPipe } from './pipes/to-hours.pipe';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoadingSpinnerComponent,
    ToHoursPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
