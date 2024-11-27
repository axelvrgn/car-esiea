import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { caretBack } from 'ionicons/icons';
import { Router } from '@angular/router';
import { CarService, ICar } from 'src/app/core/services/car/car.service';
import { REQUIRED_FIELD_MESSAGE } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.page.html',
  styleUrls: ['./new-car.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
})
export class NewCarPage implements OnInit {
  public carForm = new FormGroup({
    marque: new FormControl('', [Validators.required, Validators.minLength(2)]),
    model: new FormControl('', [Validators.required, Validators.minLength(2)]),
    plate: new FormControl('', [Validators.required, Validators.minLength(2)]),
    frontPicture: new FormControl('', [Validators.required]),
    backPicture: new FormControl('', [Validators.required]),
  });
  public requiredFieldMessage = REQUIRED_FIELD_MESSAGE;

  constructor(private carService: CarService, private router: Router) {
    addIcons({ caretBack });
  }

  ngOnInit() {}

  public onSave(): void {
    this.carService
      .saveCar(this.carForm.value as unknown as ICar)
      .then(() => {
        this.router.navigate(['/car']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
