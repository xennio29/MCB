import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'MCB-proxies',
  templateUrl: './proxies.component.html',
  styleUrls: ['./proxies.component.scss']
})
export class ProxiesComponent implements OnInit {

  imagesPath = [
    'assets/proxies/Badlands.jpg',
    'assets/proxies/Bayou.jpg',
    'assets/proxies/Plateau.jpg',
    'assets/proxies/Savannah.jpg',
    'assets/proxies/Scrubland.jpg',
    'assets/proxies/Taiga.jpg',
    'assets/proxies/Tropical_island.jpg',
    'assets/proxies/Tundra.jpg',
    'assets/proxies/Underground_sea.jpg',
    'assets/proxies/Volcanic_island.jpg',
    'assets/proxies/City_of_Traitors.jpg',
    'assets/proxies/Gaea_Craddle.jpg',
    'assets/proxies/Tabernacle.jpg',
    'assets/proxies/Grim_Monolith.jpg',
    'assets/proxies/Mox_Diamond.jpg',
    'assets/proxies/Lion_eye_Diamond.jpg',
    'assets/proxies/Phyrexian_Dreadnought.jpg',
    'assets/proxies/Force_of_Will.jpg'
  ];

  constructor() { }

  ngOnInit(): void {

  }

}
