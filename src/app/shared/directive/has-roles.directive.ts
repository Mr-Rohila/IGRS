import { Directive, Input, OnChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { Roles } from '../model/Roles';
import { Users } from '../model/Users';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Directive({
  selector: '[hasRoles]'
})
export class HasRolesDirective implements OnChanges {

  constructor(private templateRef: TemplateRef<unknown>, private viewContainer: ViewContainerRef, private _local: LocalStorageService) { }

  private visible: boolean;

  private roles: Roles[];
  private currentUser: Users | null;


  @Input() set hasRoles(roles: Roles[]) {
    this.roles = roles;
  }

  ngOnChanges(): void {
    this.currentUser = this._local.getCurrentUser();
    if (!this.roles?.length || !this.currentUser) {
      return;
    }

    if (this.visible) {
      return;
    }

    // check if user roles include at least one of the input roles
    if (this.currentUser.roles.some(role => this.roles.includes(role))) {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.visible = true;
      return;
    }

    this.viewContainer.clear();
    this.visible = false;
  }
}
