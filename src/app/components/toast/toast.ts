import { Component, inject, HostBinding } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toasts',
  standalone: true,
  templateUrl: './toast.html',
  styleUrl: './toast.scss'
})
export class ToastComponent {
  toastService = inject(ToastService);
}
