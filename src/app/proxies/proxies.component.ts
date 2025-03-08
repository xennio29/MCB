import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'MCB-proxies',
    templateUrl: './proxies.component.html',
    styleUrls: ['./proxies.component.scss'],
    standalone: false
})
export class ProxiesComponent implements OnInit {

  LegacyImagesPath = [
    'assets/proxies/Legacy/Badlands.jpg',
    'assets/proxies/Legacy/Bayou.jpg',
    'assets/proxies/Legacy/Plateau.jpg',
    'assets/proxies/Legacy/Savannah.jpg',
    'assets/proxies/Legacy/Scrubland.jpg',
    'assets/proxies/Legacy/Taiga.jpg',
    'assets/proxies/Legacy/Tropical_island.jpg',
    'assets/proxies/Legacy/Tundra.jpg',
    'assets/proxies/Legacy/Underground_sea.jpg',
    'assets/proxies/Legacy/Volcanic_island.jpg',
    'assets/proxies/Legacy/City_of_Traitors.jpg',
    'assets/proxies/Legacy/Gaea_Craddle.jpg',
    'assets/proxies/Legacy/Tabernacle.jpg',
    'assets/proxies/Legacy/Grim_Monolith.jpg',
    'assets/proxies/Legacy/Mox_Diamond.jpg',
    'assets/proxies/Legacy/Lion_eye_Diamond.jpg',
    'assets/proxies/Legacy/Phyrexian_Dreadnought.jpg',
    'assets/proxies/Legacy/Force_of_Will.jpg'
  ];

  VintageImagesPath = [
    'assets/proxies/Vintage/Black Lotus.jpeg',
    'assets/proxies/Vintage/Ancestral recall.jpeg',
    'assets/proxies/Vintage/Time Walk.jpeg',
    'assets/proxies/Vintage/Time twister.jpeg',
    'assets/proxies/Vintage/Time Vault.jpeg',
    
    'assets/proxies/Vintage/Mox pearl.jpeg',
    'assets/proxies/Vintage/Mox Saphir.jpeg',
    'assets/proxies/Vintage/Mox Opal.jpeg',
    'assets/proxies/Vintage/Mox Ruby.jpeg',
    'assets/proxies/Vintage/Mox Emerald.jpeg',

    'assets/proxies/Vintage/Badland.jpeg',
    'assets/proxies/Vintage/Bayou.jpeg',
    'assets/proxies/Vintage/plateau.jpeg',
    'assets/proxies/Vintage/Savannah.jpeg',
    'assets/proxies/Vintage/Scrubland.jpeg',
    'assets/proxies/Vintage/Taiga.jpeg',
    'assets/proxies/Vintage/Tropical Island.jpeg',
    'assets/proxies/Vintage/Tundra.jpeg',
    'assets/proxies/Vintage/Underground Sea.jpeg',
    'assets/proxies/Vintage/Volcanic Island.jpeg',
    
    'assets/proxies/Vintage/Imperial seal.jpeg',
    'assets/proxies/Vintage/Vampiric Tutor.jpeg',
    'assets/proxies/Vintage/DT.jpeg',
    'assets/proxies/Vintage/Yaw Will.jpeg',
    'assets/proxies/Vintage/Transmute artefact.jpeg',
    'assets/proxies/Vintage/Mana crypt.jpeg',
    'assets/proxies/Vintage/Mana Vault.jpeg',
    'assets/proxies/Vintage/Library Alexandr.jpeg',
    'assets/proxies/Vintage/Mishra workshop.jpeg',
    'assets/proxies/Vintage/Bazaar.jpeg',
    'assets/proxies/Vintage/Tolarian aca.jpeg',

    'assets/proxies/Vintage/Ancitn tomb.jpeg',
    'assets/proxies/Vintage/City of traitor.jpeg',
    'assets/proxies/Vintage/Monolith.jpeg',
    'assets/proxies/Vintage/Tabernacle.jpeg',
    
    'assets/proxies/Vintage/FoW.jpeg',
    'assets/proxies/Vintage/LED.jpeg',
    'assets/proxies/Vintage/Chalice.jpeg',
    'assets/proxies/Vintage/Chrome Mox.jpeg',
    'assets/proxies/Vintage/Dreadnought.jpeg',
    'assets/proxies/Vintage/Null od.jpeg',
    'assets/proxies/Vintage/Wastland.jpeg',
  ];

  public selectedVal: string;

  public isLegacy: boolean;
  public isVintage: boolean;

  constructor() { }

  ngOnInit() {
    this.selectedVal ='legacy';
    this.isLegacy = this.selectedVal == "legacy";
    this.isVintage = this.selectedVal == "vintage";
  } 
  
  public onValChange(val: string) {
    this.selectedVal = val;
    this.isLegacy = this.selectedVal == "legacy";
    this.isVintage = this.selectedVal == "vintage";
  }

}
