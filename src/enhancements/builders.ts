import { Person, Group } from '../models';
import { isPerson, isGroup } from './type-guards';

/**
 * Base builder class
 */
export abstract class Builder<T> {
  protected item: Partial<T> = {};

  /**
   * Set a property value
   */
  protected set<K extends keyof T>(key: K, value: T[K]): this {
    this.item[key] = value;
    return this;
  }

  /**
   * Build and validate the object
   */
  abstract build(): T;
}

/**
 * Builder for Person objects
 */
export class PersonBuilder extends Builder<Person> {
  withEmail(email: string): this {
    return this.set('email', email);
  }

  withName(name: string): this {
    return this.set('name', name);
  }

  withActive(active: boolean): this {
    return this.set('active', active);
  }

  build(): Person {
    if (!isPerson(this.item)) {
      throw new Error('Invalid Person object: missing required fields');
    }
    return this.item as Person;
  }
}

/**
 * Builder for Group objects
 */
export class GroupBuilder extends Builder<Group> {
  withName(name: string): this {
    return this.set('name', name);
  }

  withDescription(description: string): this {
    return this.set('description', description);
  }

  build(): Group {
    if (!isGroup(this.item)) {
      throw new Error('Invalid Group object: missing required fields');
    }
    return this.item as Group;
  }
}

/**
 * Fluent interface for creating objects
 */
export const create = {
  person: () => new PersonBuilder(),
  group: () => new GroupBuilder(),
};