import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './layer/header/header.component';
import { MenuComponent } from './layer/menu/menu.component';
import { RouterOutlet } from '@angular/router'; // ✅ Ajouté
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppComponent, HeaderComponent, MenuComponent], // ✅ Correct
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title 'Guardian'`, () => {
    expect(component.title).toEqual('Guardian');
  });

  it('should contain the HeaderComponent', () => {
    const header = fixture.debugElement.query(By.directive(HeaderComponent));
    expect(header).toBeTruthy(); // ✅ Vérifie que le header est bien rendu
  });

  it('should contain the MenuComponent', () => {
    const menu = fixture.debugElement.query(By.directive(MenuComponent));
    expect(menu).toBeTruthy(); // ✅ Vérifie que le menu est bien rendu
  });

  it('should contain a router-outlet for dynamic views', () => {
    const routerOutlet = fixture.debugElement.query(By.directive(RouterOutlet)); // ✅ Corrigé
    expect(routerOutlet).toBeTruthy(); // ✅ Vérifie que `<router-outlet>` est bien présent
  });
});
