import { takeWhile } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval } from 'rxjs/internal/observable/interval';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  firstSubscription: Subscription = null;
  secondSubscription: Subscription = null;
  thirdSubscription: Subscription = null;
  inputStreamData = ['john wick', 'inception', 'interstellar'];
  outputStreamData = [];
  isComponentAlive: boolean = false;

  constructor() {}

  ngOnInit() {
    this.isComponentAlive = true;
  }

  ngOnDestroy() {
    this.isComponentAlive = false;
  }

  startStream() {
    this.isComponentAlive = true;
    const firstStreamSource = interval(1500);
    this.firstSubscription = firstStreamSource
      .pipe(takeWhile(() => !!this.isComponentAlive))
      .subscribe((input) => {
        this.outputStreamData.push(input);
        console.log('stream output', input);
      });
    const secondStreamSource = interval(3000);
    this.secondSubscription = secondStreamSource
      .pipe(takeWhile(() => !!this.isComponentAlive))
      .subscribe((input) => {
        this.outputStreamData.push(input);
        console.log('stream output', input);
      });
    const thirdStreamSource = interval(500);
    this.thirdSubscription = thirdStreamSource
      .pipe(takeWhile(() => !!this.isComponentAlive))
      .subscribe((input) => {
        this.outputStreamData.push(input);
        console.log('stream output', input);
      });
  }

  stopStream() {
    this.isComponentAlive = false;
    this.firstSubscription.unsubscribe();
    this.secondSubscription.unsubscribe();
    this.thirdSubscription.unsubscribe();

    this.firstSubscription = null;
    this.secondSubscription = null;
    this.thirdSubscription = null;
  }
}
