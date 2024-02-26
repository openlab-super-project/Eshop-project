import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
})
export class ContactPageComponent {
  contactForm = new FormGroup({
    nameSurname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email, this.emailValidator]),
    problem: new FormControl('', Validators.required),
  });
  onSubmit() {
    console.log(this.contactForm.value);
  }
  emailValidator(control: any) {
    const email = control.value;
    if (email && email.indexOf('@') === -1 && email.indexOf('.') === -1) {
      return { invalidEmail: true };
    }
    return null;
  }
}

