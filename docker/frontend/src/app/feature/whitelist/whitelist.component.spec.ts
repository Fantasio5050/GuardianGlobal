import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhitelistComponent } from './whitelist.component';
import { By } from '@angular/platform-browser';

describe('WhitelistComponent', () => {
  let component: WhitelistComponent;
  let fixture: ComponentFixture<WhitelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhitelistComponent], // ✅ Import correct
    }).compileComponents();

    fixture = TestBed.createComponent(WhitelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display initial whitelist entries', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2); // ✅ Vérifie que 2 entrées sont affichées
  });

  it('should add a valid entry to the whitelist', () => {
    component.addEntry('email', 'New Contact', 'new@trusted.com');
    fixture.detectChanges();

    expect(component.whitelist.length).toBe(3);
    expect(component.whitelist[2]).toEqual({
      type: 'email',
      label: 'New Contact',
      value: 'new@trusted.com'
    });
  });

  it('should not add an entry with an empty value', () => {
    component.addEntry('email', 'Empty Contact', '');
    fixture.detectChanges();

    expect(component.whitelist.length).toBe(2); // ✅ Aucune entrée ajoutée
  });

  it('should remove an existing entry', () => {
    component.removeEntry(0);
    fixture.detectChanges();

    expect(component.whitelist.length).toBe(1);
    expect(component.whitelist[0].value).toBe('+33 689745612'); // ✅ Vérifie que la bonne entrée reste
  });

  it('should not remove an entry if index is negative', () => {
    const initialLength = component.whitelist.length;
    component.removeEntry(-1);
    fixture.detectChanges();

    expect(component.whitelist.length).toBe(initialLength); // ✅ La liste ne doit pas changer
  });

  it('should not remove an entry if index is too large', () => {
    const initialLength = component.whitelist.length;
    component.removeEntry(10);
    fixture.detectChanges();

    expect(component.whitelist.length).toBe(initialLength); // ✅ La liste ne doit pas changer
  });
});
