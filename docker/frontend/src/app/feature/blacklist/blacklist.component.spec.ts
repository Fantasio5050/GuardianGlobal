import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlacklistComponent } from './blacklist.component';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

describe('BlacklistComponent', () => {
  let component: BlacklistComponent;
  let fixture: ComponentFixture<BlacklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, BlacklistComponent], // ✅ Déplacement dans `imports`
    }).compileComponents();

    fixture = TestBed.createComponent(BlacklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait afficher les entrées initiales de la blacklist', () => {
    expect(component.blacklist.length).toBe(2);
  });

  it('devrait ajouter une entrée valide à la blacklist', () => {
    component.addEntry('Email', 'Test Entry', 'test@example.com');
    expect(component.blacklist.length).toBe(3);
    expect(component.blacklist[2]).toEqual({
      type: 'Email',
      label: 'Test Entry',
      value: 'test@example.com'
    });
  });

  it('ne devrait pas ajouter une entrée vide à la blacklist', () => {
    component.addEntry('', '', '');
    expect(component.blacklist.length).toBe(2); // Ne change pas
  });

  it('ne devrait pas ajouter une entrée sans type', () => {
    component.addEntry('', 'Spam', 'spam@example.com');
    expect(component.blacklist.length).toBe(2); // Ne change pas
  });

  it('ne devrait pas ajouter une entrée sans valeur', () => {
    component.addEntry('Email', 'Spam', '');
    expect(component.blacklist.length).toBe(2); // Ne change pas
  });

  it('devrait supprimer une entrée existante de la blacklist', () => {
    component.removeEntry(0);
    expect(component.blacklist.length).toBe(1);
    expect(component.blacklist[0].value).toBe('+33 612345678'); // L'entrée restante
  });

  it('ne devrait pas supprimer une entrée si l’index est hors limite (trop grand)', () => {
    component.removeEntry(10);
    expect(component.blacklist.length).toBe(2); // Aucune suppression
  });

  it('ne devrait pas supprimer une entrée si l’index est négatif', () => {
    const initialLength = component.blacklist.length;
    component.removeEntry(-1);
    expect(component.blacklist.length).toBe(initialLength); // ✅ Vérifie que la liste reste inchangée
  });
});
