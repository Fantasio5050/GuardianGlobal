import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';
import { By } from '@angular/platform-browser';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.restoreAllMocks(); // ✅ Réinitialisation des mocks après chaque test
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with alerts', () => {
    expect(component.alerts.length).toBe(2); // ✅ Vérifie la présence de 2 alertes initiales
  });

  it('should render the correct number of alerts', () => {
    const alertElements = fixture.debugElement.queryAll(By.css('li'));
    expect(alertElements.length).toBe(2); // ✅ Vérifie qu'il y a bien 2 alertes affichées
  });

  it('should remove an alert when clicking the remove button', () => {
    component.removeAlert(0);
    fixture.detectChanges();
    expect(component.alerts.length).toBe(1); // ✅ Vérifie qu'il reste 1 alerte après suppression
  });

  it('should remove an alert when clicking the remove button in the template', () => {
    fixture.detectChanges();
    const removeButton = fixture.debugElement.query(By.css('li button'));
    removeButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.alerts.length).toBe(1); // ✅ Vérifie que l'alerte a bien été supprimée
  });

  it('should clear all alerts when clicking the clear button', () => {
    component.clearAllAlerts();
    fixture.detectChanges();
    expect(component.alerts.length).toBe(0); // ✅ Vérifie que toutes les alertes sont supprimées
  });

  it('should display "Aucune alerte" message when there are no alerts', () => {
    component.clearAllAlerts();
    fixture.detectChanges();
    const noAlertsMessage = fixture.debugElement.query(By.css('p'));
    expect(noAlertsMessage.nativeElement.textContent).toContain('Aucune alerte pour le moment.');
  });
});
