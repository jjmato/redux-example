import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './../environments/environment.prod';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { AppReducers } from './app.reducer';
import { AuthModule } from './auth/auth.module';
import { MovesModule } from './moves/moves.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
    // LoginComponent,
    // RegisterComponent,
    // DashboardComponent,
    // FooterComponent,
    // NavbarComponent,
    // SidebarComponent,
    // MovesComponent,
    // DetailComponent,
    // StatisticsComponent,
    // SortMovesPipe
  ],
  imports: [
    BrowserModule,
    AuthModule,
    SharedModule,
    MovesModule,
    AppRoutingModule,
    DashboardRoutingModule,
    // FormsModule,
    // ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    // AngularFireAuthModule,
    StoreModule.forRoot(AppReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
    // ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
