import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    username!: string;

    password!: string;

    constructor(public layoutService: LayoutService, private messageService: MessageService, private router: Router) { }

    // navigateIfMatch(): void {

    //     if (this.username === 'hamilton' && this.password === 'hamilton') {
    //         // Navigate to /#
    //         this.router.navigate(['/dashboard']);
    //     }
    // }

    navigateIfMatch(): void {
        switch (true) {
            // case this.username === 'hamilton' && this.password === 'hamilton':
            //     // Navigate to /dashboard if username and password are both 'hamilton'
            //     this.router.navigate(['/dashboard']);
            //     break;

            case this.username === 'admin' && this.password === 'admin':
                // Navigate to another route if username and password match another combination
                this.router.navigate(['/dashboard']);
                break;

            case this.username === 'superuser' && this.password === 'superuser':
                // Navigate to another route if username and password match another combination
                this.router.navigate(['/dashboard']);
                break;

            case this.username === 'shindengen' && this.password === 'shindengen@123':
                // Navigate to another route if username and password match another combination
                this.router.navigate(['/dashboard']);
                break;

            default:
                // Handle the case when none of the conditions are met
                console.log('Invalid username or password');
                this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: 'Invalid username or password' });
                // Optionally, you can navigate to an error route or show a message to the user.
                break;
        }
    }


}
