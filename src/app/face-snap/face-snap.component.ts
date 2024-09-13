import { Component, Input, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap'
import { CurrencyPipe, DatePipe, DecimalPipe, LowerCasePipe, NgClass, NgStyle, PercentPipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { FaceSnapsService } from '../services/face-snaps.service';

@Component({
  selector: 'app-face-snap',
  standalone: true,
  imports: [
    NgStyle,
    NgClass,
    UpperCasePipe,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss'
})
export class FaceSnapComponent implements OnInit {
  @Input() faceSnap!: FaceSnap;

  userHasSnapped!: boolean;
  snapButtonText!: string;
  myPercentage: number = 0.3367;

  constructor(private faceSnapsService: FaceSnapsService) {}

  ngOnInit(): void {
    this.userHasSnapped = false;
    this.snapButtonText = "Oh Snap!";
  }

  onSnap(): void {
    if(this.userHasSnapped == false) {
      this.snap();
    } else {
      this.unSnap();
    }
  }

  snap(): void {
    this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'snap');
    this.userHasSnapped = true;
    this.snapButtonText = "Oops, un Snap!";
  }

  unSnap(): void {
    this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'unsnap');
    this.userHasSnapped = false;
    this.snapButtonText = "Oh Snap!";
  }
}
