## Basic rules for character ID

11 - main character
12 - secondary character
13 - background character

10 - independent
11 - associated with Dumbledore
12 - associated with Voldemort

000 - no house
001 - Gryffindor
002 - Slytherin
003 - Ravenclaw
004 - Hufflepuff
05* - Former student

_Example:_

* Hermione Granger
  1111001hermione

* James Potter
  1311051james

* Nymphadora Tonks
  1211054nymphadora

* Lucius Malfoy
  1212052lucius

* Bartemius Crouch
  1311000bartemius

* Bartemius Crouch Junior
  1312000bartemius

## Model of character object

  {
    "id": "",
    "name": "",
    "fullname": "",
    "aka": [],
    "dateOfBirth": "",
    "yearOfBirth": 1881,
    "alive": false,
    "dateOfDeath": "",
    "yearOfDeath": 0,
    "ancestry": "half-blood",
    "species": "human",
    "gender": "female",
    "height": 0,
    "skinColour": "",
    "eyeColour": "",
    "hairColour": "",
    "country": "",
    "occupation": "",
    "hogwartsStudent": false,
    "ishogwartsStudent": "",
    "hogwartsStaff": false,
    "house": "",
    "relatives": {
      "parents": [],
      "spouse": [],
      "children": [],
      "siblings": [],
      "friends": []
    },
    "associations": {
      "member": []
    },
    "wand": {
      "wood": "",
      "core": "",
      "length": 0
    },
    "patronus": "",
    "actor": [""],
    "image": ""
  },
