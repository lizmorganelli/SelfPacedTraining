// import { Component, OnInit } from '@angular/core';

// import { Hero } from '../hero';
// import { HeroService } from '../hero.service';

// @Component({
//   selector: 'app-heroes',
//   templateUrl: './heroes.component.html',
//   styleUrls: ['./heroes.component.css']
// })
// export class HeroesComponent implements OnInit {

//   selectedHero: Hero;

//   heroes: Hero[];

//   constructor(private heroService: HeroService) { }

//   ngOnInit() {
//     this.getHeroes();
//   }

//   onSelect(hero: Hero): void {
//     this.selectedHero = hero;
//   }

//   getHeroes(): void {
//     this.heroService.getHeroes()
//         .subscribe(heroes => this.heroes = heroes);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// do not need this import any more, using HeroService instead : import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  // hero = 'Windstorm';
  //refactor hero to be of type Hero and initialize it

  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // };

  //rename hero to selected hero and dont set it to anything
  //the following is no longer needed once we add the router to another page to show the details
  // selectedHero: Hero;

  // heroes = HEROES;
  //replacing the definition of heroes property with a simple declaration
  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  //need a get heroes function to retrieve the heroes from the service
  //change below now that we have observable)
  // get
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  //the following method assigned the clicked hero from the template to the components selectedHero
  //the following is no longer needed once we add the router to another page to show the details
  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }
}
