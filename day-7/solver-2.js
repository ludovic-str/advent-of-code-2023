const fs = require("fs");

const cardsRanked = new Map([
    ["2", 2],
    ["3", 3],
    ["4", 4],
    ["5", 5],
    ["6", 6],
    ["7", 7],
    ["8", 8],
    ["9", 9],
    ["T", 10],
    ["J", 0],
    ["Q", 12],
    ["K", 13],
    ["A", 14]
]);


const getSplitedHands = (input) => {
    const hands = [];

    for (let i = 0; i < input.length; i++) {
        const hand = input[i].split(" ");
        hands.push([hand[0], Number(hand[1])]);
    }

    return hands;
}

const compareSame = (cards1, cards2) => {
    for (let i = 0; i < cards1.length; i++) {
        if (cardsRanked.get(cards1[i]) !== cardsRanked.get(cards2[i])) {
            return cardsRanked.get(cards1[i]) - cardsRanked.get(cards2[i]);
        }
    }

    return 0;
}

const getTwoHighestQuantityValue = (firstQuantity, secondQuantity) => {
    if (firstQuantity === 3 && secondQuantity === 2) {
        return 3.5;
    }

    if (firstQuantity === 2 && secondQuantity === 2) {
        return 2.5;
    }

    return firstQuantity;
}

const handleJokerInCardByOccurence = (cardSortedByOccurence, jokerNumber) => {
    if (jokerNumber === 0) {
        return;
    }

    cardSortedByOccurence[0][1] += jokerNumber;
}

const evaluateHandCards = (hand) => {
    const numberByCard = new Map();

    for (const card of hand) {
        if (numberByCard.has(card)) {
            numberByCard.set(card, numberByCard.get(card) + 1);
        } else {
            numberByCard.set(card, 1);
        }
    }

    const jokerNumber = numberByCard.get("J");
    
    if (jokerNumber) {
        numberByCard.delete("J");

        if (jokerNumber === 5) {
            return 5;
        }
    }

    let cardSortedByOccurence = [...numberByCard.entries()].sort((a, b) => b[1] - a[1]);

    handleJokerInCardByOccurence(cardSortedByOccurence, jokerNumber ?? 0);

    if (cardSortedByOccurence.length === 1) {
        return 5;
    }
    
    return getTwoHighestQuantityValue(cardSortedByOccurence[0][1], cardSortedByOccurence[1][1] ?? 0);
}

const compareHands = (hand1, hand2) => {
    const hand1Cards = hand1[0].split("")
    const hand2Cards = hand2[0].split("")

    const hand1Value = evaluateHandCards(hand1Cards);
    const hand2Value = evaluateHandCards(hand2Cards);
    
    if (hand1Value !== hand2Value) {
        return hand1Value - hand2Value;
    }

    return compareSame(hand1Cards, hand2Cards);
}

let res = 0;

const buff = fs.readFileSync("./input", "utf-8");
const input = buff.split("\n");

const splitedHands = getSplitedHands(input);

const sortedInput = splitedHands.sort((a, b) => compareHands(a, b));

for (let i = 0; i < sortedInput.length; i++) {
    res += sortedInput[i][1] * (i + 1);
}

console.log(res);