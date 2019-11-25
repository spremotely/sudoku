import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { JoinComponent } from './game/join/join.component';
import { FieldComponent } from './game/field/field.component';
import { UsersComponent } from './game/users/users.component';
import { EndComponent } from './game/end/end.component';
import { TopComponent } from './top/top.component';

@NgModule({
	imports: [BrowserModule, FormsModule],
	declarations: [
		AppComponent,
		FieldComponent,
		JoinComponent,
		UsersComponent,
		EndComponent,
		TopComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}