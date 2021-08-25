import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  subscription: Subscription = null;
  inputStreamData = ['john wick', 'inception', 'interstellar'];
  outputStreamData = [];

  ngOnInit() {}

  startStream() {
    const streamSource = interval(1500);
    this.subscription = streamSource
      .pipe(map((output) => output % this.inputStreamData.length))
      .pipe(map((index) => this.inputStreamData[index]))
      .subscribe((element) => {
        this.outputStreamData.push(element);
      });
  }

  stopStream() {
    this.subscription.unsubscribe();
    this.subscription = null;
  }
}
