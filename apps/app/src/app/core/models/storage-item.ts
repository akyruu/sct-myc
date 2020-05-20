import {BehaviorSubject, Subscription} from 'rxjs';

export type StorageType = 'local' | 'session';

export class StorageItem<T> {
  /* FIELDS ================================================================ */
  private readonly _storage: Storage;
  private readonly _key: string;
  private readonly _cache = new BehaviorSubject<T>(null);
  private _cached = false;

  /* CONSTRUCTOR =========================================================== */
  constructor(
    type: StorageType,
    key: string,
    private _transform: (value: T) => string,
    private _reverse: (value: string) => T
  ) {
    switch (type) {
      case 'local':
        this._storage = localStorage;
        break;
      case 'session':
        this._storage = sessionStorage;
        break;
      default:
        throw new Error('Unknown storage type: <' + type + '>');
    }
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
export class StringStorageItem extends StorageItem<string> {
  constructor(type: StorageType, key: string) {
    super(type, key, value => value, value => value);
  }
}

export class ObjectStorageItem<T extends object> extends StorageItem<T> {
  constructor(type: StorageType, key: string) {
    super(
      type,
      key,
      value => value ? JSON.stringify(value) : undefined,
      value => value ? JSON.parse(value) : undefined
    );
  }
}
