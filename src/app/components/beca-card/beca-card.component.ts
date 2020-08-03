import { Component, OnInit } from '@angular/core';
import { Beca } from 'src/app/models/beca';
import { BecaService } from 'src/app/services/beca.service';
import { ActivatedRoute } from '@angular/router';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleLeft,faUserTie, faChalkboardTeacher, faAward, faUniversity, faCalendarAlt, faBookReader, faSave,faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-beca-card',
  templateUrl: './beca-card.component.html',
  styleUrls: ['./beca-card.component.css']
})
export class BecaCardComponent implements OnInit {
  
  faListAlt = faListAlt;
  faUserTie= faUserTie;
  faChalkboardTeacher= faChalkboardTeacher;
  faUniversity= faUniversity;
  faAward=faAward;
  faCalendarAlt= faCalendarAlt;
  faBookReader=faBookReader;
  faTimes=faTimes;
  faSave=faSave;
  faArrowAltCircleLeft=faArrowAltCircleLeft;
  beca : Beca;

  constructor(private becaService : BecaService, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if(params['id']){
          this.becaService.retrieve(params['id']).subscribe(
            result => this.beca = result
          )
        }
      }
    );
  }

}
