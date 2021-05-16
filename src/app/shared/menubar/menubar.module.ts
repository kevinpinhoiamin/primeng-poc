import { NgModule } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { MenubarModule as PrimeNGMenubarModule } from 'primeng/menubar';

import { MenubarComponent } from './menubar.component';

@NgModule({
  declarations: [MenubarComponent],
  imports: [SharedModule, PrimeNGMenubarModule],
  exports: [MenubarComponent],
})
export class MenubarModule {}
