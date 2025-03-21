import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [RouterModule],
  template: `
    <!-- Dust particles -->
    <div>
      <div class="starsec"></div>
      <div class="starthird"></div>
      <div class="starfourth"></div>
      <div class="starfifth"></div>
    </div>
    <!-- Dust particle end -->

    <div class="lamp__wrap">
      <div class="lamp">
        <div class="cable"></div>
        <div class="cover"></div>
        <div class="in-cover">
          <div class="bulb"></div>
        </div>
        <div class="light"></div>
      </div>
    </div>
    <!-- END Lamp -->
    
    <section class="error">
      <!-- Content -->
      <div class="error__content">
        <div class="error__message message">
          <h1 class="message__title">Page Not Found</h1>
          <p class="message__text">We're sorry, the page you were looking for isn't found here. The link you followed may either be broken or no longer exists. Please try again, or take a look at our <a routerLink="/">homepage</a>.</p>
        </div>
        <a routerLink="/">
          <div class="error__nav e-nav">
            <a routerLink="/" class="e-nav__link">Go to Home</a>
          </div>
        </a>
      </div>
      <!-- END Content -->
    </section>
  `,
  styleUrl: './error.component.css'
})
export class ErrorComponent {

}
