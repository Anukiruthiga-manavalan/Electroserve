import { Component, inject, signal, ViewChild, ElementRef, AfterViewChecked, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../services/chatbot.service';

interface Message {
  text: string;
  isUser: boolean;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.scss'
})
export class Chatbot implements AfterViewChecked {
  isOpen = signal(false);
  messages = signal<Message[]>([
    { text: 'Hi there! 👋 I\'m ServeBot, your AI assistant. I can help you with electrical and plumbing services, bookings, pricing, fault diagnosis, and more. Try voice input by clicking the 🎤 button!', isUser: false }
  ]);
  userInput = '';
  isTyping = signal(false);
  isListening = signal(false);
  voiceSupported = signal(false);

  quickReplies = [
    'Diagnose a fault',
    'Book a service',
    'Pricing info',
    'Find electrician',
    'Find plumber',
    'Emergency help'
  ];

  private chatbotService = inject(ChatbotService);
  private ngZone = inject(NgZone);
  private recognition: any = null;

  @ViewChild('chatBody') private chatBody!: ElementRef;

  constructor() {
    // Check for Web Speech API support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.voiceSupported.set(true);
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'en-IN';
      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      this.recognition.onresult = (event: any) => {
        this.ngZone.run(() => {
          const transcript = event.results[0][0].transcript;
          this.isListening.set(false);
          this.sendMessage(transcript);
        });
      };

      this.recognition.onerror = () => {
        this.ngZone.run(() => {
          this.isListening.set(false);
        });
      };

      this.recognition.onend = () => {
        this.ngZone.run(() => {
          this.isListening.set(false);
        });
      };
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleChat() {
    this.isOpen.update(v => !v);
  }

  startVoice() {
    if (!this.recognition) return;
    if (this.isListening()) {
      this.recognition.stop();
      this.isListening.set(false);
    } else {
      this.isListening.set(true);
      this.recognition.start();
    }
  }

  sendMessage(text?: string) {
    const msg = text || this.userInput;
    if (!msg.trim()) return;

    this.messages.update(m => [...m, { text: msg, isUser: true }]);
    this.userInput = '';
    this.isTyping.set(true);

    this.chatbotService.sendMessage(msg).subscribe({
      next: (reply) => {
        this.isTyping.set(false);
        this.messages.update(m => [...m, { text: reply, isUser: false }]);
      },
      error: () => {
        this.isTyping.set(false);
        this.messages.update(m => [...m, { text: 'Sorry, I\'m having trouble connecting right now. Please try again.', isUser: false }]);
      }
    });
  }

  sendQuickReply(reply: string) {
    this.sendMessage(reply);
  }

  private scrollToBottom() {
    try {
      if (this.chatBody?.nativeElement) {
        this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
      }
    } catch (err) { }
  }
}
