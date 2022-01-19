const evolutions = [

  /*["venusaur", "me"],*/

  ["charizard"/*,"me"*/, "gm"],

  /*["blastoise","me"],
  
  ["beedrill","me"],
  
  ["pidgeot","me"],
  
  ["alakazam","me"],
  
  ["slowbro","me"],*/

  ["gengar"/*,"me"*/, "gm"],

  /*["kangaskhan","me"],
  
  ["pinsir","me"],
  
  ["gyarados","me"],
  
  ["aerodactyl","me"],
  
  ["mewtwo","me"],
  
  ["ampharos","me"],
  
  ["steelix","me"],
  
  ["scizor","me"],
  
  ["heracross","me"],
  
  ["houndoom","me"],
  
  ["tyranitar","me"],
  
  ["sceptile","me"],
  
  ["blaziken","me"],
  
  ["swampert","me"],
  
  ["gardevoir","me"],
  
  ["sableye","me"],
  
  ["mawile","me"],
  
  ["aggron","me"],
  
  ["medicham","me"],
  
  ["manectric","me"],
  
  ["sharpedo","me"],
  
  ["camerupt","me"],
  
  ["altaria","me"],
  
  ["banette","me"],
  
  ["absol","me"],
  
  ["glalie","me"],
  
  ["salamence","me"],
  
  ["metagross","me"],
  
  ["latias","me"],
  
  ["latios","me"],
  
  ["rayquaza","me"],
  
  ["lopunny","me"],
  
  ["garchomp","me"],
  
  ["lucario","me"],
  
  ["abomasnow","me"],
  
  ["gallade","me"],
  
  ["audino","me"],
  
  ["diancie","me"],*/



  ["butterfree", "gm"],

  ["pikachu", "gm"],

  ["meowth", "gm"],

  ["machamp", "gm"],

  ["kingler", "gm"],

  ["lapras", "gm"],

  ["eevee", "gm"],

  ["snorlax", "gm"],

  ["garbodor", "gm"],

  ["melmetal", "gm"],

  ["rillaboom", "gm"],

  ["cinderace", "gm"],

  ["inteleon", "gm"],

  ["corviknight", "gm"],

  ["orbeetle", "gm"],

  ["drednaw", "gm"],

  ["coalossal", "gm"],

  ["flapple", "gm"],

  ["appletun", "gm"],

  ["sandaconda", "gm"],

  ["toxtricity", "gm"],

  ["centiskorch", "gm"],

  ["hatterene", "gm"],

  ["grimmsnarl", "gm"],

  ["alcremie", "gm"],

  ["copperajah", "gm"],

  ["duraludon", "gm"],

  ["urshifu", "gm"]

];



const gender = [ //fd,md,uk,fo,mo

  ["venusaur", "fm"],

  ["butterfree", "fm"],

  ["rattata", "fm"],

  ["raticate", "fm"],

  ["pikachu", "fm"],

  ["raichu", "fm"],

  ["nidoran", "fm"],

  ["zubat", "fm"],

  ["golbat", "fm"],

  ["gloom", "fm"],

  ["vileplume", "fm"],

  ["kadabra", "fm"],

  ["alakazam", "fm"],

  ["doduo", "fm"],

  ["hypno", "fm"],

  ["dodrio", "fm"],

  ["rhyhorn", "fm"],

  ["rhydon", "fm"],

  ["goldeen", "fm"],

  ["seaking", "fm"],

  ["scyther", "fm"],

  ["magikarp", "fm"],

  ["gyarados", "fm"],

  ["eevee", "fm"],

  ["meganium", "fm"],

  ["ledyba", "fm"],

  ["ledian", "fm"],

  ["xatu", "fm"],

  ["sudowoodo", "fm"],

  ["politoed", "fm"],

  ["aipom", "fm"],

  ["wooper", "fm"],

  ["quagsire", "fm"],

  ["murkrow", "fm"],

  ["wobbuffet", "fm"],

  ["girafarig", "fm"],

  ["gligar", "fm"],

  ["steelix", "fm"],

  ["scizor", "fm"],

  ["heracross", "fm"],

  ["sneasel", "fm"],

  ["ursaring", "fm"],

  ["piloswine", "fm"],

  ["octillery", "fm"],

  ["houndoom", "fm"],

  ["donphan", "fm"],

  ["combusken", "fm"],

  ["blaziken", "fm"],

  ["beautifly", "fm"],

  ["dustox", "fm"],

  ["ludicolo", "fm"],

  ["nuzleaf", "fm"],

  ["shiftry", "fm"],

  ["meditite", "fm"],

  ["medicham", "fm"],

  ["roselia", "fm"],

  ["gulpin", "fm"],

  ["swalot", "fm"],

  ["numel", "fm"],

  ["camerupt", "fm"],

  ["cacturne", "fm"],

  ["milotic", "fm"],

  ["relicanth", "fm"],

  ["starly", "fm"],

  ["staravia", "fm"],

  ["staraptor", "fm"],

  ["bidoof", "fm"],

  ["bibarel", "fm"],

  ["kricktot", "fm"],

  ["kricketune", "fm"],

  ["shinx", "fm"],

  ["luxio", "fm"],

  ["luxray", "fm"],

  ["roserade", "fm"],

  ["combee", "fm"],

  ["pachirisu", "fm"],

  ["buizel", "fm"],

  ["floatzel", "fm"],

  ["ambipom", "fm"],

  ["gible", "fm"],

  ["gabite", "fm"],

  ["garchomp", "fm"],

  ["hippopotas", "fm"],

  ["hippowdon", "fm"],

  ["croagunk", "fm"],

  ["toxicroak", "fm"],

  ["finneon", "fm"],

  ["lumineon", "fm"],

  ["snover", "fm"],

  ["abomasnow", "fm"],

  ["weavile", "fm"],

  ["rhyperior", "fm"],

  ["tangrowth", "fm"],

  ["mamoswine", "fm"],

  ["unfezant", "fm"],

  ["frillish", "fm"],

  ["jellicent", "fm"],

  ["pyroar", "fm"],

  ["meowstic", "fm"],

  ["indeedee", "fm"],



  ["diancie", "uk"],

  ["magnemite", "uk"],

  ["magneton", "uk"],

  ["voltorb", "uk"],

  ["electrode", "uk"],

  ["staryu", "uk"],

  ["starmie", "uk"],

  ["ditto", "uk"],

  ["porygon", "uk"],

  ["articuno", "uk"],

  ["zapdos", "uk"],

  ["moltres", "uk"],

  ["mewtwo", "uk"],

  ["mew", "uk"],

  ["unown", "uk"],

  ["porygon2", "uk"],

  ["raikou", "uk"],

  ["entei", "uk"],

  ["suicune", "uk"],

  ["lugia", "uk"],

  ["ho-oh", "uk"],

  ["celebi", "uk"],

  ["shedinja", "uk"],

  ["lunatone", "uk"],

  ["solrock", "uk"],

  ["baltoy", "uk"],

  ["claydol", "uk"],

  ["beldum", "uk"],

  ["metang", "uk"],

  ["metagross", "uk"],

  ["regirock", "uk"],

  ["regice", "uk"],

  ["registeel", "uk"],

  ["kyogre", "uk"],

  ["groudon", "uk"],

  ["rayquaza", "uk"],

  ["jirachi", "uk"],

  ["deoxys", "uk"],

  ["bronzor", "uk"],

  ["bronzong", "uk"],

  ["magnezone", "uk"],

  ["porygon-z", "uk"],

  ["rotom", "uk"],

  ["uxie", "uk"],

  ["mesprit", "uk"],

  ["azelf", "uk"],

  ["dialga", "uk"],

  ["palkia", "uk"],

  ["regigigas", "uk"],

  ["phione", "uk"],

  ["manaphy", "uk"],

  ["darkrai", "uk"],

  ["shaymin", "uk"],

  ["arceus", "uk"],

  ["victini", "uk"],

  ["klink", "uk"],

  ["klang", "uk"],

  ["klinklang", "uk"],

  ["cryogonal", "uk"],

  ["golett", "uk"],

  ["golurk", "uk"],

  ["cobalion", "uk"],

  ["terrakion", "uk"],

  ["virizion", "uk"],

  ["reshiram", "uk"],

  ["zekrom", "uk"],

  ["kyurem", "uk"],

  ["keldeo", "uk"],

  ["meloetta", "uk"],

  ["genesect", "uk"],

  ["carbink", "uk"],

  ["xerneas", "uk"],

  ["yveltal", "uk"],

  ["zygarde", "uk"],

  ["hoopa", "uk"],

  ["volcanion", "uk"],

  ["type, Null", "uk"],

  ["silvally", "uk"],

  ["minior", "uk"],

  ["dhelmise", "uk"],

  ["tapu Koko", "uk"],

  ["tapu Lele", "uk"],

  ["tapu BUlu", "uk"],

  ["tapu Fini", "uk"],

  ["cosmog", "uk"],

  ["cosmoem", "uk"],

  ["solgaleo", "uk"],

  ["lunala", "uk"],

  ["nihilego", "uk"],

  ["buzzwole", "uk"],

  ["pheromosa", "uk"],

  ["xurkitree", "uk"],

  ["celesteela", "uk"],

  ["kartana", "uk"],

  ["guzzlord", "uk"],

  ["necrozma", "uk"],

  ["magearna", "uk"],

  ["marshadow", "uk"],

  ["poipole", "uk"],

  ["naganadel", "uk"],

  ["stakataka", "uk"],

  ["blacephalon", "uk"],

  ["zeraora", "uk"],

  ["meltan", "uk"],

  ["melmetal", "uk"],

  ["sinistea", "uk"],

  ["polteageist", "uk"],

  ["falinks", "uk"],

  ["dracozolt", "uk"],

  ["arctozolt", "uk"],

  ["dracovish", "uk"],

  ["arctovish", "uk"],

  ["zacian", "uk"],

  ["eternatus", "uk"],

  ["zamazenta", "uk"],



  ["nidoran-m", "mo"],

  ["nidorino", "mo"],

  ["nidoking", "mo"],

  ["volbeat", "mo"],

  ["gallade", "mo"],

  ["mothim", "mo"],

  ["tyrogue", "mo"],

  ["hitmonlee", "mo"],

  ["hitmonchan", "mo"],

  ["hitmontop", "mo"],

  ["latios", "mo"],

  ["tauros", "mo"],

  ["throh", "mo"],

  ["sawk", "mo"],

  ["rufflet", "mo"],

  ["braviary", "mo"],

  ["tornadus", "mo"],

  ["thundurus", "mo"],

  ["landorus", "mo"],

  ["impidimp", "mo"],

  ["morgrem", "mo"],

  ["grimmsnarl", "mo"],



  ["nidoran-f", "fo"],

  ["nidorina", "fo"],

  ["nidoqueen", "fo"],

  ["illumise", "fo"],

  ["froslass", "fo"],

  ["wormadam", "fo"],

  ["vespiquen", "fo"],

  ["salazzle", "fo"],

  ["happiny", "fo"],

  ["chansey", "fo"],

  ["blissey", "fo"],

  ["kangaskhan", "fo"],

  ["smoochum", "fo"],

  ["jynx", "fo"],

  ["miltank", "fo"],

  ["cresselia", "fo"],

  ["petilil", "fo"],

  ["lilligant", "fo"],

  ["vullaby", "fo"],

  ["mandibuzz", "fo"],

  ["flabebe", "fo"],

  ["floette", "fo"],

  ["florges", "fo"],

  ["bounsweet", "fo"],

  ["steenee", "fo"],

  ["tsareena", "fo"],

  ["hatenna", "fo"],

  ["hattrem", "fo"],

  ["hatterene", "fo"],

  ["milcery", "fo"],

  ["alcremie", "fo"],

  ["latias", "fo"],



  ["torchic", "fd"],

];

