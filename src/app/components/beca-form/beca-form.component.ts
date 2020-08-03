import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Beca } from 'src/app/models/beca';
import { BecaService } from 'src/app/services/beca.service';
import { faUserTie, faChalkboardTeacher, faAward, faUniversity, faCalendarAlt, faBookReader, faSave,faTimes} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-beca-form',
  templateUrl: './beca-form.component.html',
  styleUrls: ['./beca-form.component.css']
})
export class BecaFormComponent implements OnInit {
  
  title = "Nuevo registro de Beca";

beca : Beca = new Beca();
faUserTie= faUserTie;
faChalkboardTeacher= faChalkboardTeacher;
faUniversity= faUniversity;
faAward=faAward;
faCalendarAlt= faCalendarAlt;
faBookReader=faBookReader;
faTimes=faTimes;
faSave=faSave;
form: FormGroup;  

constructor(private becaService: BecaService, 
  private formBuilder: FormBuilder, 
  private activatedRoute : ActivatedRoute, 
  private router: Router) { }

ngOnInit(): void {
  this.form = this.formBuilder.group({
    solicitante: ['', [Validators.required]],
    tipo_beca: ['',[Validators.required]],
    semestre: ['',[Validators.required]],      
    fecha_pedido: ['',[Validators.required]],      
    promedio_general: ['',[Validators.required]],      
  });  

  this.activatedRoute.params.subscribe(
    params => {
      if(params['id']){
        this.becaService.retrieve(params['id']).subscribe(
            result =>
            { 
              this.beca = result;
              this.title = "Actualizando el registro de " + this.beca.solicitante;
            }
        )
      }
    }
  );

}


onSubmit() : void {
  if(this.form.invalid){
    console.error('Error en formulario');
    return;
  }

  console.log(this.beca);

  this.becaService.save(this.beca).subscribe(
    result => {
      console.log(result);   
      this.router.navigate(['beca/list']);

    }
  );
}

onReset() : void {   
  this.form.reset();    
}


}
