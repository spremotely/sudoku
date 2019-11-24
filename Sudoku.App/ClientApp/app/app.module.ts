import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { JoinComponent } from './game/join/join.component';
import { FieldComponent } from './game/field/field.component';
import { GameComponent } from './game/game.component';
import { UsersComponent } from './game/users/users.component';

@NgModule({
	imports: [BrowserModule, FormsModule],
	declarations: [
		AppComponent,
		FieldComponent,
		JoinComponent,
		UsersComponent,
		GameComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}