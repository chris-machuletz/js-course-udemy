class TownElement {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends TownElement {
    constructor(name, buildYear, trees, parkArea) {
        super(name, buildYear);
        this.trees = trees;
        this.parkArea = parkArea;
    }
    calcTreeDensity() {
        return this.trees / this.parkArea;
    }
    calcAge() {
        let now = new Date().getFullYear();
        return now - this.buildYear;
    }
}

class Street extends TownElement {
    constructor(name, buildYear, length, size = 3) {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }
    classifyStreet() {
        let classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');

        return classification.get(this.size);
    }
}

const parksReport = function (parks) {
    console.log('----PARKS REPORT----');

    let avgAge = parks.reduce((acc, cur) => {
        return acc + cur.calcAge();
    }, 0);
    avgAge = avgAge / parks.length;

    console.log(`Our ${parks.length} Parks have an average age of ${avgAge} years.`);

    parks.forEach(cur => {
        console.log(`${cur.name} has a tree density of ${cur.calcTreeDensity()} trees per square km.`)
    });

    parks.forEach(cur => {
        if (cur.trees >= 1000) console.log(`${cur.name} has more than 1000 trees.`);
    });

}

const streetsReport = function (streets) {
    console.log('----STREETS REPORT----');

    const totalLength = streets.reduce((acc, cur) => {
        return acc + cur.length
    }, 0);

    const avgLength = totalLength / streets.length;

    console.log(`Our ${streets.length} streets have a total length of ${totalLength}, with an average of ${avgLength} km.`);

    streets.forEach(cur => {
        console.log(`${cur.name}, built in ${cur.buildYear}, is a ${cur.classifyStreet()} street.`);
    });
}

const init = function () {
    // Init Parks
    const parks = [
        new Park('Green Park', 1805, 521, 2.5),
        new Park('National Park', 1558, 1210, 5.6),
        new Park('Oak Park', 1920, 548, 0.7)
    ];

    // Init Streets
    const streets = [
        new Street('Ocean Avene', 1999, 1.4, 4),
        new Street('Evergreen Street', 2008, 0.4, 2),
        new Street('4th Street', 2015, 1),
        new Street('sunset Boulevard', 1982, 5.5, 5)
    ];

    parksReport(parks);
    streetsReport(streets);
}

init();