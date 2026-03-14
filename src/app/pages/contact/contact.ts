import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './contact.html',
    styleUrl: './contact.scss'
})
export class Contact {
    name = ''; email = ''; subject = ''; message = '';
    submitted = false;

    onSubmit() { this.submitted = true; }

    contactMethods = [
        { icon: 'location_on', title: 'Visit Us', detail: '123 Electric Avenue, Anna Nagar, Chennai 600040' },
        { icon: 'phone', title: 'Call Us', detail: '+91 98765 12345' },
        { icon: 'email', title: 'Email Us', detail: 'support@electroserve.in' },
        { icon: 'schedule', title: 'Working Hours', detail: 'Mon – Sat: 8 AM – 9 PM' }
    ];
}
