import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { UserFormComponent } from './user-form.component';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UserFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    AutoCompleteModule,
    ButtonModule,
    RippleModule,
  ],
})
export class UserFormModule {}
