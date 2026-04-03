import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ChatMessage } from '../models/interfaces';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatbotService {
    private api = inject(ApiService);

    sendMessage(message: string): Observable<string> {
        return this.api.post<{reply: string}>('/chatbot/message', { message }).pipe(
            map(res => res.reply)
        );
    }
}
