import { Component } from '@angular/core';
import { PedidoComponent } from "./pedido/pedido.component";

@Component({
  selector: 'app-root',
  imports: [PedidoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fletes-veliz';
}
