import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators  } from '@angular/forms';
import { AppService } from '../app.service'
import { Training} from './training-model'
@Component({
  selector: 'app-training-form',
  templateUrl: './training-form.component.html',
  styleUrls: ['./training-form.component.css']
})
export class TrainingFormComponent implements OnInit {
errorMessage:any;
TrainingModel:Training;
errorMessageDisplay:any;
successMessageDisplay:any;
trainingForm = new FormGroup({
    trainingName: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required)

  

  });
  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  onSubmit() {

    this.errorMessageDisplay=null;
    this.successMessageDisplay=null;

    let trainingNameVal = this.trainingForm.controls.trainingName.value;
    let startDateVal = this.trainingForm.controls.startDate.value;
    let endDateVal = this.trainingForm.controls.endDate.value;

     
    this.TrainingModel = {
      trainingName: trainingNameVal,
      startDate: startDateVal,
      endDate: endDateVal,
      dayDiff:null
    }


    //   this.appService.getTrainings().subscribe(res => {
    //     console.log(res)
    //   }, (err) => {
    //     console.log(err);
    //   }
    // );

    this.appService.postTraining(this.TrainingModel).subscribe(res => {
      console.log(res)
      this.TrainingModel=res;
      this.successMessageDisplay=res.DayDiff;
    }, (err) => {
      this.errorMessage=JSON.parse(err._body)
      this.errorMessageDisplay=this.errorMessage.ModelState[4004];
      console.log(JSON.parse(err._body));
    }
    );
  }

}
