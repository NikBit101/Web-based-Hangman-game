const categories = {};

export function prepareCategory() {
    categories.colors = [ "red", "orange", "yellow", "lime", "green", "cyan", "blue", "purple", "violet", "pink", "black", "white"];
    categories.animals = [ "cat", "dog", "giraffe", "parrot", "elephant", "snake", "mouse", "tiger", "bear", "wolf", "crocodile", "dolphin"];
    categories.cars = [ "hyundai", "volkswagen", "ford", "BMW", "tesla", "ferrari", "porsche", "honda", "toyota", "lamborghini"];
    categories.searchEngines = ["google", "yahoo", "yandex", "bing"];
    categories.cities = ["portsmouth", "southampton", "london", "yorkshire", "cardiff", "birmingham", "solent", "brighton"];
    categories.countries = ["england", "america", "canada", "brazil", "france", "russia", "africa", "finland", "iceland", "latvia", "spain", "germany", "australia", "austria", "mexico", "madagascar", "belgium", "netherlands", "china", "japan", "southKorea", "northKorea", "newZealand"];
    categories.socialMedias = ["youtube", "instagram", "facebook", "snapchat", "twitter"];
    categories.communications = ["discord", "skype", "whatsapp", "zoom", "teamspeak"];
    categories.drinks = ["water", "juice", "pepsi", "cocacola", "fanta", "sprite", "mountaindew", "sevenup"];
    return categories;
}