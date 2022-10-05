import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Argonaute } from '../argonaute';
import { ArgonauteService } from '../argonaute.service';

@Component({
  selector: 'app-edit-page',
  template:`<!-- Modif member form -->
    <h2>Modifier l'argonaute {{ argonaute.nom }}</h2>
    <form *ngIf="argonaute" (ngSubmit)="siEnvoiForm()" #editArgonauteForm="ngForm"
    class="new-member-form" id="new-member-form">
        <div class="form-groupe">
            <label for="name">Nom de l&apos;Argonaute</label>
            <input type="text" id="name" 
            required
            [(ngModel)]="argonaute.nom" name="name"
            #name="ngModel" />
        </div>
        <div>
            <label for="forname">Prénom de l&apos;Argonaute</label>
            <input id="forname" type="text"
            required
            [(ngModel)]="argonaute.prenom"
            name="forname"
            #forname="ngModel"  />
        </div>
        <div>
            <label for="qualif">Qualificatif</label>
            <input id="qualif" 
            type="text"
            required
            [(ngModel)]="argonaute.qualificatif"
            name="qualif"
            #qualif="ngModel"/>
        </div>
        <button type="submit" name="submit" id="envoyer" [disabled]="editArgonauteForm.invalid">Envoyer</button>
</form>
<h3 *ngIf="!argonaute">
    Aucun Argonaute à éditer
</h3>
  `,
})
export class EditPageComponent implements OnInit {
  argonaute: Argonaute;

  constructor(
    private routerModifier: Router,
    private routeEdit: ActivatedRoute,
    private argonauteService: ArgonauteService
  ) { }

  ngOnInit(){
    const IdArgono: string|null = this.routeEdit.snapshot.paramMap.get('id');
    if (IdArgono){
    this.argonauteService.RecupererIdArgonaute(+IdArgono)
    .subscribe(argonaute => this.argonaute = argonaute);
    };
  }
  siEnvoiForm(){
    this.argonauteService.updateArgonaute(this.argonaute)
    .subscribe(() => this.routerModifier.navigate(['/argonaute', this.argonaute.id]))}
    ;
}
