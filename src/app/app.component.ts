import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TrelloComponent } from "./Component/trello/trello.component";
import { NavbarComponent } from "./Component/navbar/navbar.component";
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, MatSlideToggleModule, TrelloComponent, NavbarComponent]
})
export class AppComponent {

}
