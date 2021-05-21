import { CompanyService } from './../../companies/company/company.service';
import { Company } from './../../companies/company/company';
import { UserService } from './../user/user.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  first,
  map,
  switchMap,
} from 'rxjs/operators';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  filteredCompanies: Company[];
  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      username: new FormControl(
        '',
        [Validators.required],
        [this.usernameAlreadyInUse.bind(this)]
      ),
      password: new FormControl('', [Validators.required]),
      profile: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
    });
  }

  hasError(inputName: string, errorCode: string = 'required'): boolean {
    const input = this.userForm.get(inputName);
    return (
      input !== null && input.touched && input.errors && input.errors[errorCode]
    );
  }

  usernameAlreadyInUse(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    if (!control.value /*|| control.value === this.loadedUser?.username*/) {
      return of(null);
    }
    return control.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value: string) =>
        this.userService.usernameAlreadyInUse(value)
      ),
      map((alreadyInUse: boolean) => {
        return alreadyInUse ? { alreadyInUse: true } : null;
      }),
      first()
    );
  }

  filterCompanies(event: any): void {
    this.companyService
      .getCompanies(event.query)
      .subscribe((companies) => (this.filteredCompanies = companies));
  }

  onSubmit(): void {
    console.log(this.userForm);
    this.userForm.markAllAsTouched();
  }
}
