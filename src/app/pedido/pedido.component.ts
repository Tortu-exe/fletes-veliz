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
  origenAltura: number = 0;
  origenBarrio: string = '';

  destino: string = '';
  destinoAltura: number = 0;
  destinoBarrio: string = '';

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
  tiposDeFlete: string[] = ['Flete', 'Mudanza'];
  //tipoDeVivienda: string[] = ['Casa', 'Departamento'];
  ayudantes: boolean = false;

  //viviendaSeleccionada: string = '';
  horarioSeleccionado: string = '';
  metodoPagoSeleccionado: string = '';
  mensaje: string = '';
  fleteSeleccionado: string = '';
  fechaMinima: string = '';
  fechaSeparada: string[] = [];

  //Métodos
  ngOnInit() {
    const hoy = new Date();
    this.fechaMinima = hoy.toISOString().split('T')[0]; // Formato: yyyy-mm-dd
  }

  enviarPorWhatsApp() {
    this.fechaSeparada = this.fecha.split('-');

    const origenCompleto = `${this.origen} ${this.origenAltura}, ${this.origenBarrio}`;
    const destinoCompleto = `${this.destino} ${this.destinoAltura}, ${this.destinoBarrio}`;

    const origenEncoded = encodeURIComponent(origenCompleto);
    const destinoEncoded = encodeURIComponent(destinoCompleto);

    const rutaUrl = `https://www.google.com/maps/dir/${origenEncoded}/${destinoEncoded}`;


    this.mensaje = `*Nombre del Cliente:* ${this.nombre}
*Lugar de Origen:* ${this.origen} ${this.origenAltura}, ${this.origenBarrio}
*Lugar de Destino:* ${this.destino} ${this.destinoAltura}, ${this.destinoBarrio}
*Tipo de Traslado:* ${this.fleteSeleccionado}
*¿Qué desea trasladar?:* ${this.elementosATransladar}
*Lo necesito para el día:* ${this.fechaSeparada[2]}-${this.fechaSeparada[1]}, ${this.fechaSeparada[0]}
*Horario:* ${this.horarioSeleccionado}
*Método de Pago:* ${this.metodoPagoSeleccionado}
*Posible Ruta:*
${rutaUrl}`;

    if (this.ayudantes) {
      this.mensaje += ' *Voy a necesitar ayuda para mover las cosas.*';
    }
    const mensajeEncoded = encodeURIComponent(this.mensaje);
    const numeroWhatsApp = '5493513856158';
    const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensajeEncoded}`;
    window.open(url, '_blank');
  }
}
