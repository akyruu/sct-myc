import { BehaviorSubject, Subscription } from 'rxjs';

export class LocalStorageItem<T> {
  /* FIELDS ================================================================ */
  private readonly _key: string;
  private readonly _cache = new BehaviorSubject<T>(null);
  private _cached = false;

  /* CONSTRUCTOR =========================================================== */
  constructor(
    key: string,
    private _transform: (value: T) => string,
    private _reverse: (value: string) => T
  ) {
    this._key = 'sct-myc-' + key;
  }

  /* METHODS =============================================================== */
  get value(): T {
    if (!this._cached) {
      this._cache.next(this._reverse(localStorage.getItem(this._key)));
      this._cached = true;
    }
    return this._cache.value;
  }

  set value(value: T) {
    localStorage.setItem(this._key, this._transform(value));
    this._cache.next(value);
  }

  clear(): void {
    localStorage.removeItem(this._key);
    this._cache.next(undefined);
  }

  subscribe(observer: (value: T) => void): Subscription {
    return this._cache.subscribe(observer);
  }
}

/* IMPLEMENTATIONS ========================================================= */
export class StringLocalStorageItem extends LocalStorageItem<string> {
  constructor(key: string) {
    super(key, value => value, value => value);
  }
}

export class ObjectLocalStorageItem<T extends object> extends LocalStorageItem<T> {
  constructor(key: string) {
    super(
      key,
      value => value ? JSON.stringify(value) : undefined,
      value => value ? JSON.parse(value) : undefined
    );
  }
}
