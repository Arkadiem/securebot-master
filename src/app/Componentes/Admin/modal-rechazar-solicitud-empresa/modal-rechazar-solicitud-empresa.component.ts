import { Component, Injectable, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Enterprise } from 'src/app/Interfaces/enterprise.interface';
import { EnterpriseService } from 'src/app/Services/enterprise.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-rechazar-solicitud-empresa',
  templateUrl: './modal-rechazar-solicitud-empresa.component.html',
  styleUrls: ['./modal-rechazar-solicitud-empresa.component.css']
})

@Injectable()
export class ModalRechazarSolicitudEmpresaComponent {
  enterprise?: Enterprise;
  rejectForm: FormGroup;

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: { id: number }, private enterpriseService: EnterpriseService, private fb: FormBuilder) {
    this.rejectForm = this.fb.group({
      motivo: ['', Validators.required]
    });
   }

  close() {
    this.dialog.closeAll();
  }

  onSubmit(enterprise: Enterprise) {
    if(this.rejectForm.valid) {
      this.enterpriseService.rejectEnterprise(this.data.id, enterprise).subscribe(() => location.reload());
      this.close();
    }
  }

}
