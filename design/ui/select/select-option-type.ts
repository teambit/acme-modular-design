export type SelectOption = {
  /**
   * value passed to `onChange` when the option is chosen.
   */
  value: string;

  /**
   * visible option text.
   */
  label: string;

  /**
   * prevents the option from being chosen.
   */
  disabled?: boolean;
};
