// import { CdkStepper } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.scss',
})
export class AddDoctorComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  accountForm!: FormGroup;
  doctorInfoForm!: FormGroup;
  workInfoForm!: FormGroup;
  maxFileSize: number = 204932;
  accountForm_submitted: boolean = false;
  accountForm_valid: boolean = false;
  doctorInfoForm_submitted: boolean = false;
  doctorInfoForm_valid: boolean = false;

  workInfoForm_submitted: boolean = false;
  workInfoForm_valid: boolean = false;

  selectedIndex: number = 0;

  // Config department select
  Default = [
    { name: 'Choice 1', id: 1 },
    { name: 'Choice 2', id: 2 },
    { name: 'Choice 3', id: 3 },
  ];
  selectedAccount = this.Default[0].name;

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.accountForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    this.doctorInfoForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      nationalId: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['1', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      avatar: ['', [Validators.required, Validators.max(this.maxFileSize)]],
    });

    this.workInfoForm = this.formBuilder.group({
      speciality: ['', Validators.required],
      department: ['', Validators.required],
      workingStartDate: ['', Validators.required],
      workingEndDate: [''],
    });

    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Doctor Management' },
      { label: 'Create New Doctor', active: true },
    ];
  }

  get accountFormControl() {
    return this.accountForm.controls;
  }

  get workInfoFormControl() {
    return this.workInfoForm.controls;
  }

  get doctorInfoFormControl() {
    return this.doctorInfoForm.controls;
  }

  onSelectionChange(event: any) {
    if (event.selectedIndex > event.previouslySelectedIndex) {
      if (true) {
        event.preventDefault();
      }
    }
  }

  accountFormSubmit() {
    this.accountForm_submitted = true;
    if (this.accountForm.valid) {
      this.accountForm_valid = true;
      this.selectedIndex = 1;
    }
  }
  doctorInfoFormSubmit() {
    this.doctorInfoForm_submitted = true;
    if (this.doctorInfoForm.valid) {
      this.doctorInfoForm_valid = true;
      this.selectedIndex = 2;
    }
  }
  workInfoFormSubmit() {
    this.workInfoForm_submitted = true;
    if (this.workInfoForm.valid) {
      this.workInfoForm_valid = true;
    }
  }

  // nextStep() {
  //   if(this.selectedIndex === 0 && this.accountForm_valid){
  //     this.selectedIndex = 1;
  //     console.log(this.selectedIndex)

  //   } else if(this.selectedIndex === 1 && this.doctorInfoForm_valid) {
  //     this.selectedIndex = 2; 
  //     console.log(this.selectedIndex)

  //   }
  // }

  previousStep() {
    if(this.selectedIndex === 1) {
      this.selectedIndex = 0;
    } else if(this.selectedIndex === 2){
      this.selectedIndex = 1;
    }
    console.log(this.selectedIndex)
  }

}
