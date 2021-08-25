import { Component } from '@angular/core';
import { interval, Subscription, merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  subscription: Subscription = null;
  inputStreamData = ['john wick', 'inception', 'interstellar'];
  cartoonsStreamData = ['thunder cats', 'Dragon Ball Z', 'Ninja Turtles'];
  outputStreamData = [];

  ngOnInit() {}

  startStream() {
    const cartoonsStreamSource = interval(1000).pipe(
      map((output) => output % this.cartoonsStreamData.length),
      map((index) => this.cartoonsStreamData[index])
    );

    const moviesStreamSource = interval(1500).pipe(
      map((output) => output % this.inputStreamData.length),
      map((index) => this.inputStreamData[index])
    );

    // see https://www.learnrxjs.io/learn-rxjs/operators/combination/merge
    const merged = merge(
      cartoonsStreamSource,
      moviesStreamSource,
    )

    this.subscription = merged.subscribe(str => this.outputStreamData.push(str));
  }

  stopStream() {
    this.subscription.unsubscribe();
    this.subscription = null;
  }
}
