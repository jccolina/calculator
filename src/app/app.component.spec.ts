/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

/**
 * Test suite for AppComponent (the calculator)
 *
 * All math logic and UI live in AppComponent, so there is one spec file.
 *
 * Key concepts used here:
 *   fixture.componentInstance  → the component class (the TypeScript object)
 *   fixture.nativeElement      → the rendered HTML
 *   fixture.detectChanges()    → tells Angular to update the HTML after any state change
 *
 * Legend:
 *   ✅  = already implemented — read these to understand the pattern
 *   🎯  = YOUR TURN — remove pending() and write the assertion
 */
describe('AppComponent (Calculator)', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  // Runs before EVERY test — gives each test a clean, fresh component
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent] // standalone component → imported, not declared
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // first render
  });

  // ─── Smoke test ──────────────────────────────────────────────────────────────

  // ✅ Angular must be able to create the component without errors
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // ─── Display ─────────────────────────────────────────────────────────────────

  // ✅ The screen must start at "0"
  it('should show "0" as the initial display value', () => {
    // querySelector finds the first element matching the CSS selector
    const displayEl = fixture.nativeElement.querySelector('.display__value');
    expect(displayEl.textContent.trim()).toBe('0');
  });

  // ✅ Pressing a digit updates the screen
  it('should update the display when a digit is pressed', () => {
    component.pressDigit('5');
    fixture.detectChanges(); // re-render after state change

    const displayEl = fixture.nativeElement.querySelector('.display__value');
    expect(displayEl.textContent.trim()).toBe('5');
  });

  // 🎯 YOUR TURN — pressing 1 then 2 must show "12", not just "2"
  it('should handle multi-digit numbers', () => {
    // Hint: call pressDigit twice, then detectChanges, then read the display
    pending('Student exercise — remove this line and write the test');
  });

  // 🎯 YOUR TURN — pressing "." should add a decimal point to the display
  it('should append a decimal point when "." is pressed', () => {
    // Hint: press a digit first, then press '.', check that display contains '.'
    pending('Student exercise — remove this line and write the test');
  });

  // 🎯 YOUR TURN — pressing "." twice should not produce "1.." on the display
  it('should not allow more than one decimal point', () => {
    pending('Student exercise — remove this line and write the test');
  });

  // ─── Clear ───────────────────────────────────────────────────────────────────

  // ✅ Clear resets display to "0"
  it('should reset the display to "0" when C is pressed', () => {
    component.pressDigit('9'); // type something first
    component.pressClear();
    fixture.detectChanges();

    const displayEl = fixture.nativeElement.querySelector('.display__value');
    expect(displayEl.textContent.trim()).toBe('0');
  });

  // 🎯 YOUR TURN — Clear should also cancel any pending operation
  it('should cancel any pending operation when C is pressed', () => {
    // Hint: press a digit, an operator, another digit, then Clear.
    // After clear, the internal state (firstOperand, operator) should be reset.
    // Check component.firstOperand === null and component.operator === null
    pending('Student exercise — remove this line and write the test');
  });

  // ─── Addition ────────────────────────────────────────────────────────────────

  // ✅ Full addition flow: 3 + 4 = 7
  it('should add two numbers correctly', () => {
    component.pressDigit('3');
    component.pressOperator('+');
    component.pressDigit('4');
    component.pressEquals();
    fixture.detectChanges();

    const displayEl = fixture.nativeElement.querySelector('.display__value');
    expect(displayEl.textContent.trim()).toBe('7');
  });

  // ─── Subtraction ─────────────────────────────────────────────────────────────

  // 🎯 YOUR TURN — 9 - 4 = 5
  it('should subtract two numbers correctly', () => {
    pending('Student exercise — remove this line and write the test');
  });

  // 🎯 YOUR TURN — 3 - 7 should give a negative result
  it('should return a negative result when the difference is negative', () => {
    pending('Student exercise — remove this line and write the test');
  });

  // ─── Multiplication ───────────────────────────────────────────────────────────

  // 🎯 YOUR TURN — 6 × 7 = 42
  it('should multiply two numbers correctly', () => {
    pending('Student exercise — remove this line and write the test');
  });

  // ✅ Anything × 0 = 0
  it('should return 0 when multiplying by zero', () => {
    component.pressDigit('5');
    component.pressOperator('*');
    component.pressDigit('0');
    component.pressEquals();
    fixture.detectChanges();

    const displayEl = fixture.nativeElement.querySelector('.display__value');
    expect(displayEl.textContent.trim()).toBe('0');
  });

  // ─── Division ────────────────────────────────────────────────────────────────

  // ✅ 10 ÷ 2 = 5
  it('should divide two numbers correctly', () => {
    component.pressDigit('1');
    component.pressDigit('0');
    component.pressOperator('/');
    component.pressDigit('2');
    component.pressEquals();
    fixture.detectChanges();

    const displayEl = fixture.nativeElement.querySelector('.display__value');
    expect(displayEl.textContent.trim()).toBe('5');
  });

  // 🎯 YOUR TURN — 7 ÷ 2 = 3.5 (decimal result)
  it('should return a decimal when division is not exact', () => {
    pending('Student exercise — remove this line and write the test');
  });

  // ✅ Division by zero — the app shows "0" instead of crashing
  it('should display "0" when dividing by zero', () => {
    component.pressDigit('8');
    component.pressOperator('/');
    component.pressDigit('0');
    component.pressEquals();
    fixture.detectChanges();

    const displayEl = fixture.nativeElement.querySelector('.display__value');
    expect(displayEl.textContent.trim()).toBe('0');
  });

  // ─── Chained operations ───────────────────────────────────────────────────────

  // 🎯 YOUR TURN — pressing an operator while one is pending should chain:
  //   press 2, press +, press 3, press *, press 4, press = → result should be 20
  //   (because 2+3=5, then 5*4=20)
  it('should chain operations without pressing "=" in between', () => {
    pending('Student exercise — remove this line and write the test');
  });

  // ─── EXERCISE 1 — pressToggleSign() ──────────────────────────────────────────

  // ✅ The +/- button must exist in the rendered HTML
  it('should have a toggle-sign button in the template', () => {
    const buttons: NodeListOf<HTMLButtonElement> =
      fixture.nativeElement.querySelectorAll('button');
    const btn = Array.from(buttons).find(b => b.textContent?.trim() === '+/-');
    expect(btn).toBeTruthy();
  });

  // ✅ Calling pressToggleSign() must never throw, even before it's implemented
  it('pressToggleSign() should not throw an error when called', () => {
    expect(() => component.pressToggleSign()).not.toThrow();
  });

  // 🎯 YOUR TURN — after implementing EXERCISE 1:
  //   display shows "5" → press +/- → display should show "-5"
  it('should change a positive number to negative when +/- is pressed', () => {
    component.pressDigit('5');
    component.pressToggleSign();
    fixture.detectChanges();

    const displayEl = fixture.nativeElement.querySelector('.display__value');
    expect(displayEl.textContent.trim()).toBe('-5');
  });

  // 🎯 YOUR TURN — after implementing EXERCISE 1:
  //   display shows "-5" → press +/- → display should show "5"
  it('should change a negative number to positive when +/- is pressed', () => {
    component.pressDigit('5');
    component.pressToggleSign();
    component.pressToggleSign();
    fixture.detectChanges();

    const displayEl = fixture.nativeElement.querySelector('.display__value');
    expect(displayEl.textContent.trim()).toBe('5');
  });

  // ─── EXERCISE 2 — pressPercent() ─────────────────────────────────────────────

  // ✅ The % button must exist in the rendered HTML
  it('should have a percent button in the template', () => {
    const buttons: NodeListOf<HTMLButtonElement> =
      fixture.nativeElement.querySelectorAll('button');
    const btn = Array.from(buttons).find(b => b.textContent?.trim() === '%');
    expect(btn).toBeTruthy();
  });

  // ✅ Calling pressPercent() must never throw, even before it's implemented
  it('pressPercent() should not throw an error when called', () => {
    expect(() => component.pressPercent()).not.toThrow();
  });

  // 🎯 YOUR TURN — after implementing EXERCISE 2:
  //   display shows "50" → press % → display should show "0.5"
  it('should divide the displayed number by 100 when % is pressed', () => {
    pending('Student exercise — implement pressPercent() first, then write this test');
  });

});
