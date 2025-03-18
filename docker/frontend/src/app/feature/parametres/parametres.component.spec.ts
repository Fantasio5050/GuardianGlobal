import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParametresComponent } from './parametres.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('ParametresComponent', () => {
  let component: ParametresComponent;
  let fixture: ComponentFixture<ParametresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametresComponent, FormsModule], // ✅ Ajout de FormsModule pour ngModel
    }).compileComponents();

    fixture = TestBed.createComponent(ParametresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear(); // ✅ Nettoyage du localStorage après chaque test
    jest.restoreAllMocks(); // ✅ Réinitialisation des mocks après chaque test
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default settings', () => {
    expect(component.isDarkMode).toBe(false); // ✅ Par défaut `isDarkMode` est `false`
    expect(component.notificationsEnabled).toBe(false); // ✅ `notificationsEnabled` est `false`
    expect(component.purgeDelay).toBe(7); // ✅ Par défaut `purgeDelay` est `7`
  });

  it('should toggle dark mode and update localStorage', () => {
    component.toggleDarkMode();
    expect(component.isDarkMode).toBe(true); // ✅ Mode sombre activé
    expect(localStorage.getItem('theme')).toBe('dark'); // ✅ Vérification du stockage

    component.toggleDarkMode();
    expect(component.isDarkMode).toBe(false); // ✅ Mode sombre désactivé
    expect(localStorage.getItem('theme')).toBe('light'); // ✅ Vérification du stockage
  });

  it('should toggle notifications and update localStorage', () => {
    component.toggleNotifications();
    expect(component.notificationsEnabled).toBe(true); // ✅ Notifications activées
    expect(localStorage.getItem('notifications')).toBe('true'); // ✅ Vérification du stockage

    component.toggleNotifications();
    expect(component.notificationsEnabled).toBe(false); // ✅ Notifications désactivées
    expect(localStorage.getItem('notifications')).toBe('false'); // ✅ Vérification du stockage
  });

  it('should update purge delay and store it in localStorage', () => {
    component.purgeDelay = 10;
    component.savePurgeDelay();
    expect(localStorage.getItem('purgeDelay')).toBe('10'); // ✅ Vérification du stockage
  });

  it('should apply the theme correctly', () => {
    component.isDarkMode = true;
    component.applyTheme();
    expect(document.documentElement.classList.contains('dark')).toBe(true); // ✅ Vérifie que la classe `dark` est appliquée

    component.isDarkMode = false;
    component.applyTheme();
    expect(document.documentElement.classList.contains('dark')).toBe(false); // ✅ Vérifie que la classe `dark` est retirée
  });

  it('should call savePurgeDelay() when button is clicked', () => {
    jest.spyOn(component, 'savePurgeDelay'); // ✅ Espionne la méthode
    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();
    expect(component.savePurgeDelay).toHaveBeenCalled(); // ✅ Vérifie que la méthode est bien appelée
  });

  it('should mock alert when saving purge delay', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {}); // ✅ Mock `alert`
    component.savePurgeDelay();
    expect(alertMock).toHaveBeenCalledWith('Délai de purge mis à jour !'); // ✅ Vérifie que `alert` est bien appelée
  });
});
