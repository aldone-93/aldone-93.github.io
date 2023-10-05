import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-italy-map',
  templateUrl: './italy-map.component.html',
  styleUrls: ['./italy-map.component.scss']
})
export class ItalyMapComponent {

  svgName = "region";
  hoveredRegion: string | null = null;
  description = "";
  plateName = "";
  constructor() { }

  ngAfterViewInit(): void {
  
    Array.from(document.getElementsByClassName("region")).forEach( el => {
      el.addEventListener("mouseover", (eventPointer:any) => {
        window.document.getElementById('regionDiv')?.classList.remove('show');
        this.hoveredRegion = eventPointer.currentTarget.attributes.regione.value;
        this.description = descriptions.getDescription(this.hoveredRegion!);
        this.plateName = PlateName.getName(this.hoveredRegion!);

        setTimeout(() => {
          window.document.getElementById('regionDiv')?.classList.add('show');
        }, 300);
      })
    });
  }

  hideRegion() {
    this.hoveredRegion = null;
  }
}

export class descriptions {
  static Piemonte = 'Pride of Piedmont. The names come from Piedmontesedialect: "anulòt," a ring-shaped tool used to prepare this type of pasta at home, and "plin", thepinch that is given to the dough in order to enclose the filling.';
  static Lombardia = " Local dish of Valtellina. They can be found in fresh or driedversions and they even have an academy that guards the original recipe and traditions of thePGI dish: the Accademia dei Pizzoccheri di Teglio.";
  static ['Emilia-Romagna'] = "One of the most beloved dishes in the world.They were worshipped as food for sailors, in fact the Republic of Genoaserved them on boatsas early as 1100; besides, they are even better reheated the day after!";
  static Toscana = "The discovery of potatoes. Originating as a poor men's dish,the filling became made of potatoes only with their cultivation in Mugello in the mid-1800s,since they were considered until then the food of the needy.";
  static Puglia = "A Bari memory. Its tradition dates back to medievaltimes, when a handmade durum wheat pasta was made with a circular shape and hollowed outin the center with thumb pressure.";
  static Lazio = "An all-Roman flavor. Named after the woodcutters in theApennines who gathered wood to make charcoal and cooked the pasta using easily preservedingredients they brought when they guarded the charcoal pile.";
  static ['Trentino-Alto Adige'] = "South Tyrolean delicacy. In German it means 'littlesparrow', attributed for the small shape and because in Germany they are used as a side dishfor feathered meat.";
  static Calabria = "The dish from ViboValentia. Previously relegated only to thisprovince, the name is due to the thin stick made from the woody part of sparto stems, a typicalMediterranean plant, used to roll the pasta.";
  static Campania = 'A Neapolitan tradition. The name comes from twoNeapolitan words, "scialare" (enjoy) and "tiella" (pan) and have become the cutting edge inpasta making.';
  static Abruzzo = "The non-musical instrument. Their name is due to theconformation of the device formed by metal ropes that cut the pasta with the pressure of therolling pin, obtaining wires with a square cross-section.";
  static Marche = "A grandmother's dough. In the past they were made with cooked andleftover polenta from the day before, rolled out into a sheet, “crescia”, and cut into diamondshapes, thus creating the “cresce tagliate” (“cresc tajate” in dialect).";
  static Basilicata = 'Mom’s meat sauce. The name comes from thedialect "lu n\'truppc," meaning the snag, that piece of meat or sausage that-escaped frommom\'s control in seasoning the pasta-ended up on the plate of the luckiest person.';
  static Umbria = "A popular legend. It is said that in the 12th century,Frederick Barbarossa wanted to destroy Umbria until he tasted strangozzi, considering themso good that he decided to spare many Umbrian places.";
  static Liguria = "Ligurian cuisine classic of classics. In the days of themaritime republics, Genoa focused on Mediterranean herbs such as basil to counter thehegemony of the spice market owned by Venice.";
  static Molise = "The typical dish at festivals. Their origins date back to St.Antonio Abate, celebrated in January,and they are so small that they must be hollowed outwith a single finger; tradition says perfection is achieved when a spoonful contains no morethan 10.";
  static ["Valle d'Aosta"] = "The oldest Aosta Valley dish. They first appeared in thekitchens ofthe Walser between the 11th and 12th centuries, a Germanic population now livingnear Monte Rosa.";
  static ['Friuli-Venezia Giulia'] = "The symbol of the holiday. They are one of thegastronomic innovations originating in the Middle Ages and today chosen as a dish onChristmas Eve or at Easter lunch.";
  static Veneto = "A peasant origin. Their history dates back to the 1300s, thanks to apasta maker who-to feed soldiers-mixed wheat flour and durum wheat flour, creating alarge spaghetto called 'bigàt', caterpillar in dialect.";
  static Sardegna = "Sardinian cultural heritage. From the PGI mark, their classic shapecalled\"sa spighitta,\" the typical ear-shaped design, came about with the intention of aidingthe harvesting of wheat, the ingredient needed to make them.";
  static Sicilia = 'The true taste of Catania. Born in this town and soon spreadingthroughout the nation, it owes its name to a playwright who called it "a true Norma," referringto a musical opera by Vincenzo Bellini.'

  static getDescription(value: string) {
    return this[value as keyof descriptions];
  }
}

export class PlateName {
  static Piemonte = 'Agnolotti del plin';
  static Lombardia = 'Lombardy';
  static ['Emilia-Romagna'] = 'Lasagne alla Bolognese';
  static Toscana = 'Tortellidel Mugello';
  static Puglia = 'Orecchiette alle cime di rapa';
  static Lazio = 'Pasta alla carbonara';
  static ['Trentino-Alto Adige'] = 'Spätzle';
  static Calabria = "Fileja con 'nduja";
  static Campania = 'Scialatielli alla pescatora';
  static Abruzzo = 'Spaghetti alla chitarra';
  static Marche = 'Crestaiate';
  static Basilicata = "Strascinati alla 'ndruppeche'";
  static Umbria = 'Strangozzi alla Norcina';
  static Liguria = 'Liguria';
  static Molise = 'Cavatelli con funghi';
  static ["Valle d'Aosta"] = 'Chnéffléne';
  static ['Friuli-Venezia Giulia'] = 'Cjarsons';
  static Veneto = 'Bigoli insalsa';
  static Sardegna = 'Culurgiones';
  static Sicilia = 'Pasta alla norma';

  static getName(value: string) {
    return this[value as keyof descriptions];
  }
}