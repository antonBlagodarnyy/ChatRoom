import { Routes } from '@angular/router';
import { WelcomeComponent } from './Pages/welcome/welcome.component';
import { ChatComponent } from './Pages/chat/chat.component';
import { chatGuard } from './Guards/chat.guard';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'chat', component: ChatComponent, canActivate: [chatGuard] },
];
