import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './about.html',
    styleUrl: './about.scss'
})
export class About {
    stats = [
        { value: '500+', label: 'Verified Electricians' },
        { value: '10,000+', label: 'Bookings Completed' },
        { value: '50+', label: 'Cities Covered' },
        { value: '4.8★', label: 'Customer Rating' }
    ];

    values = [
        { icon: 'verified_user', title: 'Trust & Safety', description: 'Every electrician on our platform is verified with background checks and license validation.' },
        { icon: 'schedule', title: 'On-Time Guarantee', description: 'We guarantee punctual arrivals. Your time matters, and we respect it.' },
        { icon: 'payments', title: 'Fair Pricing', description: 'Transparent pricing with no hidden charges. What you see is what you pay.' },
        { icon: 'support_agent', title: '24/7 Support', description: 'Our support team is available round the clock to assist you with any issues.' }
    ];

    team = [
        { name: 'Arun Shankar', role: 'Founder & CEO', icon: 'person' },
        { name: 'Priya Lakshmi', role: 'Head of Operations', icon: 'person' },
        { name: 'Karthik Raja', role: 'CTO', icon: 'person' },
        { name: 'Deepa Venkat', role: 'Customer Success Lead', icon: 'person' }
    ];
}
