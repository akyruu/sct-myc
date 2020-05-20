import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class RushContext {
  readonly title = new BehaviorSubject<string>(undefined);
}
