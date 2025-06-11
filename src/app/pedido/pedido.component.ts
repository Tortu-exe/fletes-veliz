import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css',
})
export class PedidoComponent implements OnInit {
  //Variables
  nombre: string = '';
  origen: string = '';
  destino: string = '';
  elementosATransladar: string = '';
  fecha: string = '';
  horariosDelDia: string[] = [
    'Lo antes posible',
    'Durante la mañana',
    'Durante el mediodía',
    'Durante la tarde',
    'Durante la noche',
  ];
  metodosPago: string[] = ['Efectivo', 'Transferencia'];
  tiposDeFlete: string[] = ["Flete", "Mudanza"];
  tipoDeVivienda:string [] = ["Casa", "Departamento"];
  ayudantes : boolean = false;

  viviendaSeleccionada :string = '';
  horarioSeleccionado: string = '';
  metodoPagoSeleccionado: string = '';
  mensaje: string = '';
  fleteSeleccionado :string = '';
  fechaMinima: string = '';
  fechaSeparada: string[] = [];

  //Métodos
  ngOnInit() {
    
    const hoy = new Date();
    this.fechaMinima = hoy.toISOString().split('T')[0]; // Formato: yyyy-mm-dd
  }

  enviarPorWhatsApp() {
    this.fechaSeparada = this.fecha.split('-');

    this.mensaje = `¡Hola! Mi nombre es ${this.nombre}.\nMe gustaría cotizar un flete desde ${this.origen} hasta ${this.destino} para trasladar ${this.elementosATransladar}. Lo necesito para el día ${this.fechaSeparada[2]}-${this.fechaSeparada[1]}-${this.fechaSeparada[0]}.\nEl tipo de translado será ${this.fleteSeleccionado}, y el tipo de vivienda es ${this.viviendaSeleccionada}.\nPrefiero que la entrega sea ${this.horarioSeleccionado}.\nEl pago lo realizaré en ${this.metodoPagoSeleccionado}.`;
    if(this.ayudantes){
      this.mensaje += " Voy a necesitar ayuda para mover las cosas."
    }
    const mensajeEncoded = encodeURIComponent(this.mensaje);
    const numeroWhatsApp = '5493513856158';
    const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensajeEncoded}`;
    window.open(url, '_blank');
  }
}
