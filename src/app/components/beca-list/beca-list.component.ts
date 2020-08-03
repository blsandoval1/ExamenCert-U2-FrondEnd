import { Component, OnInit } from '@angular/core';
import { Beca } from 'src/app/models/beca';
import { BecaService } from 'src/app/services/beca.service';
import Swal from 'sweetalert2';
import { faPlus, faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-beca-list',
  templateUrl: './beca-list.component.html',
  styleUrls: ['./beca-list.component.css']
})
export class BecaListComponent implements OnInit {
  
  faEye = faEye;
  faPlus = faPlus;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;

  becas : Beca[];
  constructor(private becaService : BecaService) { }

  ngOnInit(): void {
    this.list();
  }

  list() : void {
    this.becaService.list().subscribe(result => this.becas = result);
  }

  
  delete(b:Beca) :void {
    Swal.fire({
      title: '¿Está seguro de continuar?',
      text: "El registro de " + b.solicitante + " será eliminado.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.becaService.delete(b).subscribe(
          result => {
            console.log(result);
            this.list();
          }
        )
      }
    })
  }


}
