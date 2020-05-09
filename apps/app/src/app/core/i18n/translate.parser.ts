import { Injectable } from '@angular/core';
import { TranslateDefaultParser } from '@ngx-translate/core';

@Injectable()
export class TranslateParser extends TranslateDefaultParser {
  getValue(target: any, key: string): any {
    target = super.getValue(target, key);
    if (target instanceof Array) {
      target = target.join(' ');
    }
    return target;
  }
}
