export enum Color {
  BLUE = 'Blue',
  RED = 'Red',
  BLACK = 'Black',
  WHITE = 'White',
  YELLOW = 'Yellow',
}

/**
 * Represents a Car object type.
 * It is called ICarDomain to don't mess up with Mongo Models.
 * It in a separate folder since it is used in multiple places including Mongose Model.
 */
export interface ICarDomain {
  /**
   * Unique car identifier
   */
  serieNumber: number;
  /**
   * Car brand, eg. Ford, Mercedes
   */
  brand: string;
  /**
   * Car color, only available colors
   */
  color: Color;
  /**
   * Car Model
   */
  model: string;
  /**
   * Date when the car db entry was created
   */
  creationDate?: Date;
}
