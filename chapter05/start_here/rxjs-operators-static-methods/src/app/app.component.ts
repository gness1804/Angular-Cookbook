import { Component } from '@angular/core';
import { interval, Subscription, merge, partition } from 'rxjs';
import { map, tap } from 'rxjs/operators';

interface Movie {
  type: 'movie';
  title: string;
}

interface Cartoon {
  type: 'cartoon';
  title: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  subscription: Subscription = null;
  combinedStreamData: (Cartoon | Movie)[] = [
    {
      type: 'movie',
      title: 'john wick',
    },
    {
      type: 'cartoon',
      title: 'Thunder Cats',
    },
    {
      type: 'movie',
      title: 'inception',
    },
    {
      type: 'cartoon',
      title: 'Dragon Ball Z',
    },
    {
      type: 'cartoon',
      title: 'Ninja Turtles',
    },
    {
      type: 'movie',
      title: 'interstellar',
    },
  ];
  outputStreamData = [];
  movies: Movie[] = [];
  cartoons: Cartoon[] = [];
  ngOnInit() {}

  startStream() {
    const streamSource = interval(1500).pipe(
      map((input) => {
        const index = input % this.combinedStreamData.length;
        return this.combinedStreamData[index];
      })
    );

    const [moviesStream, cartoonsStream] = partition(
      streamSource,
      (item) => item.type === 'movie'
    );

    const merged = merge(
      moviesStream.pipe(
        tap((movie: Movie) => {
          this.movies.push(movie);
        })
      ),
      cartoonsStream.pipe(
        tap((cartoon: Cartoon) => {
          this.cartoons.push(cartoon);
        })
      )
    );

    this.subscription = merged.subscribe((input) => {
      this.outputStreamData.push(input);
    });
  }

  stopStream() {
    this.subscription.unsubscribe();
    this.subscription = null;
  }
}
