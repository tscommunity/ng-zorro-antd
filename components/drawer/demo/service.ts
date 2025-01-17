/* declarations: NzDrawerCustomComponent */

import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';

import { NZ_DRAWER_DATA, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'nz-demo-drawer-service',
  template: `
    <ng-template #drawerTemplate let-data let-drawerRef="drawerRef">
      value: {{ data?.value }}
      <br />
      <br />
      <button nz-button nzType="primary" (click)="drawerRef.close()">close</button>
    </ng-template>
    <div nz-form>
      <nz-form-item>
        <input nz-input [(ngModel)]="value" />
      </nz-form-item>
    </div>
    <button nz-button nzType="primary" (click)="openTemplate()">Use Template</button>
    &nbsp;
    <button nz-button nzType="primary" (click)="openComponent()">Use Component</button>
  `
})
export class NzDemoDrawerServiceComponent {
  @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: string };
    drawerRef: NzDrawerRef<string>;
  }>;
  value = 'ng';

  constructor(private drawerService: NzDrawerService) {}

  openTemplate(): void {
    const drawerRef = this.drawerService.create({
      nzTitle: 'Template',
      nzFooter: 'Footer',
      nzExtra: 'Extra',
      nzContent: this.drawerTemplate,
      nzContentParams: {
        value: this.value
      }
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Template) open');
    });

    drawerRef.afterClose.subscribe(() => {
      console.log('Drawer(Template) close');
    });
  }

  openComponent(): void {
    const drawerRef = this.drawerService.create<NzDrawerCustomComponent, { value: string }, string>({
      nzTitle: 'Component',
      nzFooter: 'Footer',
      nzExtra: 'Extra',
      nzContent: NzDrawerCustomComponent,
      nzContentParams: {
        value: this.value
      },
      nzData: {
        value: 'Ng Zorro'
      }
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      console.log(data);
      if (typeof data === 'string') {
        this.value = data;
      }
    });
  }
}

@Component({
  selector: 'nz-drawer-custom-component',
  template: `
    <div>
      <input nz-input [(ngModel)]="nzData.value" />
      <nz-divider></nz-divider>
      <button nzType="primary" (click)="close()" nz-button>Confirm</button>
    </div>
  `
})
export class NzDrawerCustomComponent {
  // @Input() value = '';

  constructor(private drawerRef: NzDrawerRef<string>, @Inject(NZ_DRAWER_DATA) public nzData: { value: string }) {}

  close(): void {
    this.drawerRef.close(this.nzData);
  }
}
