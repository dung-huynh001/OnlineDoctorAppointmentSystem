import { AbstractControl, ValidationErrors } from "@angular/forms";

export function compareValidator(controlToCompare: AbstractControl): ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value !== controlToCompare.value) {
        return { compare: true }; // Error key for comparing values
      }
      return null; // Return null for valid comparison
    };
  }