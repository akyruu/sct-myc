import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  TemplateRef
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sct-myc-translate',
  templateUrl: './translate.component.html'
})
export class TranslateComponent implements OnInit, AfterContentInit, OnDestroy {
  /* FIELDS ================================================================ */
  @Input() key: string;
  @ContentChildren(TemplateRef) templates = new QueryList<TemplateRef<any>>();

  parts: (string | { outlet: TemplateRef<any> })[] = [];

  private _value: string;
  private readonly _subscriptions: Subscription[] = [];

  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _elementRef: ElementRef,
    private _rendered: Renderer2,
    private _translate: TranslateService
  ) {}

  /* METHODS =============================================================== */
  ngOnInit(): void {
    this._subscriptions.push(this._translate.get(this.key).subscribe(value => {
      this._value = value;
      this._updateParts();
    }));
    this._subscriptions.push(this.templates.changes.subscribe(() => this._updateParts()));
  }

  ngAfterContentInit(): void {
    this._updateParts();
  }

  private _updateParts(): void {
    this.parts = [];

    if (this._value) {
      const groups = this._value.match(/\{\{[^}]+\}\}/g);
      if (!groups) {
        this.parts = [this._value];
      } else {
        let end = 0;
        for (const group of groups) {
          const start = this._value.indexOf(group, end);
          if (start > 0) {
            this.parts.push(this._value.substring(end, start));
          }
          end = start + group.length;

          const id = this._value.substring(start + 2, end - 2).trim();
          const template = this.templates.find(t =>
            t['_declarationTContainer']?.localNames[0] === id);
          if (!template) {
            this.parts.push('[INVALID_TOKEN:' + id + ']');
          } else {
            this.parts.push({ outlet: template });
          }
        }
        this.parts.push(this._value.substring(end));
      }
    }
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
