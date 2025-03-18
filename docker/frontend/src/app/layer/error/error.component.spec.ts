import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorComponent } from './error.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ErrorComponent], // ✅ Ajout du module de test du router
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { data: { message: 'Page not found' } }, // ✅ Simule un message d'erreur
            paramMap: of({ get: () => '404' }), // ✅ Simule un paramètre d'URL
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
