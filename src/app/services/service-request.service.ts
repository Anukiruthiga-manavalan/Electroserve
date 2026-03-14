import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ServiceRequest } from '../models/interfaces';

@Injectable({ providedIn: 'root' })
export class ServiceRequestService {
    private api = inject(ApiService);

    getHistory() {
        return this.api.get<ServiceRequest[]>('/service-requests/history');
    }

    getStatus(id: number) {
        return this.api.get<{status: string}>(`/service-requests/${id}/status`);
    }

    updateStatus(id: number, status: string) {
        return this.api.put<ServiceRequest>(`/service-requests/${id}/status`, { status });
    }
}
