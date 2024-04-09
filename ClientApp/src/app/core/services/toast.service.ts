import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  error(textOrTpl: string | TemplateRef<any>) {
    this.toasts.push({ 
      textOrTpl,
      classname: 'bg-danger text-white',
      delay: 5000,
    });
  }

  success(textOrTpl: string | TemplateRef<any>) {
    this.toasts.push({ 
      textOrTpl,
      classname: 'bg-success text-white',
      delay: 5000,
    });
  }

  warning(textOrTpl: string | TemplateRef<any>) {
    this.toasts.push({ 
      textOrTpl,
      classname: 'bg-warning text-white',
      delay: 5000,
    });
  }


  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
