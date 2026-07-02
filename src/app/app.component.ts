import { Component } from '@angular/core';

/**
 * AppComponent — the root component of the app.
 *
 * In Angular every component has:
 *   - selector  → the HTML tag used in index.html or other templates
 *   - template  → the HTML the component renders
 *   - styles    → scoped CSS that only applies to this component
 *
 * Because we used `standalone: true` (Angular 17+), there is no NgModule.
 * Everything this component needs is imported directly here.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  // ─── State ────────────────────────────────────────────────────────────────

  /** The value shown on the display. We start with '0'. */
  display: string = '0';

  /** The first number the user entered before pressing an operator. */
  firstOperand: number | null = null;

  /** Which operator the user pressed: +, -, *, or / */
  operator: string | null = null;

  /**
   * Tracks whether the UI is in light mode (true) or dark mode (false).
   * The template uses this to conditionally apply the 'light' CSS class.
   */
  isLightMode: boolean = false;

  /**
   * Flag that tells us "the user just pressed an operator, so the next
   * digit they type should start a fresh number on the display."
   */
  waitingForSecondOperand: boolean = false;


  // ─── Button handlers ──────────────────────────────────────────────────────

  /**
   * Called when the user presses a digit button (0-9) or the decimal point.
   *
   * @param value - the character on the button that was pressed, e.g. '7' or '.'
   */
  pressDigit(value: string): void {

    // If we are waiting for a fresh number, replace whatever is on the display.
    if (this.waitingForSecondOperand) {
      this.display = value === '.' ? '0.' : value;
      this.waitingForSecondOperand = false;
      return;
    }

    // Don't allow more than one decimal point.
    if (value === '.' && this.display.includes('.')) {
      return;
    }

    // Replace the initial '0' when the user starts typing,
    // but keep it when they type a decimal point.
    if (this.display === '0' && value !== '.') {
      this.display = value;
    } else {
      this.display += value;
    }
  }

  /**
   * Called when the user presses an operator button (+, -, *, /).
   *
   * @param op - the operator character pressed
   */
  pressOperator(op: string): void {

    // If there is already a pending operation, calculate it first
    // (this lets the user chain: 2 + 3 * ... without pressing =).
    if (this.firstOperand !== null && !this.waitingForSecondOperand) {
      this.calculate();
    }

    // Save the current display value as the first operand.
    this.firstOperand = parseFloat(this.display);

    // Remember which operator was pressed.
    this.operator = op;

    // Signal that the next digit starts a new number.
    this.waitingForSecondOperand = true;
  }

  /**
   * Called when the user presses '='.
   * Runs the stored operation and shows the result.
   */
  pressEquals(): void {
    // Nothing to do if the user hasn't picked an operator yet.
    if (this.operator === null || this.firstOperand === null) {
      return;
    }
    this.calculate();
    // Clear the operator so pressing '=' again doesn't repeat the operation.
    this.operator = null;
    this.firstOperand = null;
  }

  /**
   * Called when the user presses 'C' (Clear).
   * Resets the calculator to its initial state.
   */
  pressClear(): void {
    this.display = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
  }

  /**
   * Called when the user clicks the light/dark toggle button.
   * Should switch the UI between dark mode (default) and light mode.
   *
   * EXERCISE 3 ── implement this method.
   *
   * Hint: flip the value of this.isLightMode between true and false.
   * The template already binds [class.light] to isLightMode, so the CSS
   * will update automatically once you toggle the property.
   */
  toggleTheme(): void {
    this.isLightMode = !this.isLightMode;
  }

  /**
   * Called when the user presses '+/-'.
   * Toggles the sign of the current displayed number.
   *
   * EXERCISE 1 ── implement this method.
   *
   * Hint: multiply the current display value by -1, then update this.display.
   * Remember to handle the edge case where the display is '0'.
   */
  pressToggleSign(): void {
    const value = parseFloat(this.display) * -1;
    this.display = value === 0 ? '0' : value.toString();
  }

  /**
   * Called when the user presses '%'.
   * Converts the current displayed number to its percentage (divides by 100).
   *
   * EXERCISE 2 ── implement this method.
   *
   * Hint: divide the current display value by 100, then update this.display.
   */
  pressPercent(): void {
    const value = parseFloat(this.display) / 100;
    this.display = value.toString();
  }


  // ─── Private helpers ──────────────────────────────────────────────────────

  /**
   * Performs the arithmetic operation stored in this.operator using
   * this.firstOperand and the current display value as the second operand.
   * The result is written back to this.display.
   */
  private calculate(): void {
    const secondOperand = parseFloat(this.display);
    let result: number;

    // Pick the right arithmetic operation based on the stored operator.
    switch (this.operator) {
      case '+':
        result = this.firstOperand! + secondOperand;
        break;
      case '-':
        result = this.firstOperand! - secondOperand;
        break;
      case '*':
        result = this.firstOperand! * secondOperand;
        break;
      case '/':
        // Guard against division by zero.
        result = secondOperand !== 0
          ? this.firstOperand! / secondOperand
          : 0;
        break;
      default:
        return; // Unknown operator — do nothing.
    }

    // Show the result; avoid ugly floating-point noise (e.g. 0.1 + 0.2).
    this.display = parseFloat(result.toPrecision(10)).toString();

    // The result becomes the new first operand for chained operations.
    this.firstOperand = result;
    this.waitingForSecondOperand = true;
  }
}
