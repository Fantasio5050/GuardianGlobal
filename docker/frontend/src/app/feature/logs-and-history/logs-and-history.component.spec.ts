import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogsAndHistoryComponent } from './logs-and-history.component';
import { By } from '@angular/platform-browser';

describe('LogsAndHistoryComponent', () => {
  let component: LogsAndHistoryComponent;
  let fixture: ComponentFixture<LogsAndHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogsAndHistoryComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LogsAndHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.restoreAllMocks(); // ✅ Réinitialisation des mocks après chaque test
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with logs', () => {
    expect(component.filteredLogs.length).toBe(4); // ✅ Vérifie que les logs sont bien chargés
  });

  it('should render the correct number of logs in the template', () => {
    const logElements = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(logElements.length).toBe(4); // ✅ Vérifie que les logs sont affichés
  });

  it('should filter logs by type', () => {
    component.applyFilter('ajout');
    fixture.detectChanges();
    expect(component.filteredLogs.length).toBe(2); // ✅ Vérifie qu'il ne reste que les logs "ajout"
  });

  it('should show all logs when filter is set to "all"', () => {
    component.applyFilter('all');
    fixture.detectChanges();
    expect(component.filteredLogs.length).toBe(4); // ✅ Vérifie que tous les logs sont visibles
  });

  it('should confirm and clear all logs when confirmClearLogs() is called', () => {
    jest.spyOn(window, 'confirm').mockReturnValue(true); // ✅ Simule la confirmation de l'utilisateur
    component.confirmClearLogs();
    fixture.detectChanges();
    expect(component.filteredLogs.length).toBe(0); // ✅ Vérifie que tous les logs ont été supprimés
  });

  it('should not clear logs if confirmation is declined', () => {
    jest.spyOn(window, 'confirm').mockReturnValue(false); // ❌ Simule un refus de suppression
    component.confirmClearLogs();
    fixture.detectChanges();
    expect(component.filteredLogs.length).toBe(4); // ✅ Vérifie que les logs sont toujours là
  });

  it('should display "Aucun log enregistré" when logs are empty', () => {
    component.clearLogs();
    fixture.detectChanges();
    const noLogsMessage = fixture.debugElement.query(By.css('p'));
    expect(noLogsMessage.nativeElement.textContent).toContain('Aucun log enregistré.');
  });
});
