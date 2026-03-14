import { Component, inject, signal, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
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
    { text: 'Hi there! I am ElectroBot. How can I help you with your electrical needs?', isUser: false }
  ]);
  userInput = '';
  isTyping = signal(false);

  private chatbotService = inject(ChatbotService);
  
  @ViewChild('chatBody') private chatBody!: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleChat() {
    this.isOpen.update(v => !v);
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    const userMsg = this.userInput;
    this.messages.update(m => [...m, { text: userMsg, isUser: true }]);
    this.userInput = '';
    this.isTyping.set(true);

    this.chatbotService.sendMessage(userMsg).subscribe({
      next: (reply) => {
        this.isTyping.set(false);
        this.messages.update(m => [...m, { text: reply, isUser: false }]);
      },
      error: () => {
        this.isTyping.set(false);
        this.messages.update(m => [...m, { text: 'Sorry, I am having trouble connecting right now.', isUser: false }]);
      }
    });
  }

  private scrollToBottom() {
    try {
      if (this.chatBody?.nativeElement) {
          this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
      }
    } catch(err) {}
  }
}
