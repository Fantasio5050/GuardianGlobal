import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MenuComponent], // ✅ Ajout de `RouterTestingModule` pour éviter les erreurs de `routerLink`
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 navigation links', () => {
    const links = fixture.debugElement.queryAll(By.css('a[routerLink]'));
    expect(links.length).toBe(6); // ✅ Vérifie qu'il y a bien 6 liens
  });

  it('should contain a link to Dashboard', () => {
    const link = fixture.debugElement.query(By.css('a[routerLink="/"]'));
    expect(link).toBeTruthy();
    expect(link.nativeElement.textContent).toContain('Dashboard'); // ✅ Vérifie le bon texte
  });

  it('should contain a link to Blacklist', () => {
    const link = fixture.debugElement.query(By.css('a[routerLink="/blacklist"]'));
    expect(link).toBeTruthy();
    expect(link.nativeElement.textContent).toContain('Blacklist'); // ✅ Vérifie le bon texte
  });

  it('should contain a link to Whitelist', () => {
    const link = fixture.debugElement.query(By.css('a[routerLink="/whitelist"]'));
    expect(link).toBeTruthy();
    expect(link.nativeElement.textContent).toContain('Whitelist'); // ✅ Vérifie le bon texte
  });

  it('should contain a link to Notifications', () => {
    const link = fixture.debugElement.query(By.css('a[routerLink="/notification"]'));
    expect(link).toBeTruthy();
    expect(link.nativeElement.textContent).toContain('Notifications'); // ✅ Vérifie le bon texte
  });

  it('should contain a link to Logs & Historique', () => {
    const link = fixture.debugElement.query(By.css('a[routerLink="/logsAndHistory"]'));
    expect(link).toBeTruthy();
    expect(link.nativeElement.textContent).toContain('Logs & Historique'); // ✅ Vérifie le bon texte
  });

  it('should contain a link to Paramètres', () => {
    const link = fixture.debugElement.query(By.css('a[routerLink="/settings"]'));
    expect(link).toBeTruthy();
    expect(link.nativeElement.textContent).toContain('Paramètres'); // ✅ Vérifie le bon texte
  });
});
