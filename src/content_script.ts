const TOGGLE_ID = 'skroutz_common_stores_toggle';
const SHOW_COMMON_ID = 'skroutz_common_stores_show';
const CLASS_PREFIX = 'skroutz_common_stores_';
const LOCAL_STORAGE_KEY = 'skroutz_common_stores_items';
const ADD_TO_LIST_MESSAGE = 'Add product to list';
const REMOVE_FROM_LIST_MESSAGE = 'Remove product from list';

let items: object;

window.onload = function () {
    if (!location.pathname.startsWith(`/s/`)) {
        return;
    }
    items = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};

    const button = createButton('toggle', TOGGLE_ID);

    if (items && !(location.pathname in items)) {
        addToListButtonFactory(button);
    } else {
        removeFromListButtonFactory(button);
        showCommonStoresButton();
    }


    document.querySelector('.sku-actions').appendChild(button);
}

async function addProductToList() {
    const shops = await loadAllShops();
    document.querySelector(`.chip`).scrollIntoView({ behavior: 'smooth' });

    const shopNames = Array.from(shops).map(element => element.innerHTML);
    items[location.pathname.toString()] = shopNames;

    const commonShops = Object.values(items).reduce((intersectionArray, currentArray) => intersectionArray.filter(item => currentArray.includes(item)));
    const commonShopsElements = Array.from(shops).filter(shop => commonShops.includes(shop.innerHTML));

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    const button = document.querySelector(`#${TOGGLE_ID}`) as HTMLElement;
    removeFromListButtonFactory(button);
    showCommonStoresButton();

    commonShopsElements.forEach((element) => {
        closestByClass(element, 'card').setAttribute('style', 'border: 3px blue solid;')
    });
}

function showCommonStoresButton() {
    const showButton = document.querySelector(`#${SHOW_COMMON_ID}`);

    if (Object.keys(items).length < 2) {
        if (showButton) {
            showButton.parentNode.removeChild(showButton);
        }
        return;
    }

    if (showButton) {
        return;
    }

    const button = createButton('Show common stores', SHOW_COMMON_ID);
    button.addEventListener('click', showCommonStores);
    document.querySelector('.sku-actions').appendChild(button);
}

async function showCommonStores() {
    const shops = await loadAllShops();
    document.querySelector(`.chip`).scrollIntoView({ behavior: 'smooth' });

    const commonShops = Object.values(items).reduce((p, c) => p.filter(e => c.includes(e)));
    const commonShopsElements = Array.from(shops).filter(shop => commonShops.includes(shop.innerHTML));

    commonShopsElements.forEach((element) => {
        closestByClass(element, 'card').setAttribute('style', 'border: 3px blue solid;')
    });
}

function removeProductFromList(): void {
    localStorage.removeItem(location.pathname);
    const button = <HTMLElement>document.querySelector(`#${TOGGLE_ID}`);
    delete items[location.pathname.toString()];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    addToListButtonFactory(button);
    showCommonStoresButton();
}

function addToListButtonFactory(button: HTMLElement): void {
    button.innerText = ADD_TO_LIST_MESSAGE;
    button.addEventListener('click', addProductToList);
    button.removeEventListener('click', removeProductFromList);
}

function removeFromListButtonFactory(button: HTMLElement): void {
    button.innerText = REMOVE_FROM_LIST_MESSAGE;
    button.addEventListener('click', removeProductFromList);
    button.removeEventListener('click', addProductToList);
}

async function loadAllShops(shops?: HTMLElement[]): Promise<HTMLElement[]> {
    if (shops) {
        shops[shops.length - 1].scrollIntoView();
        await scrollToElement(shops[shops.length - 1]);
    }

    const elements = Array.from(document.querySelectorAll('.shop-name')) as HTMLElement[];
    if (shops && elements.length === shops.length) {
        return elements;
    }

    return await loadAllShops(elements);
}

async function scrollToElement(element) {
    return new Promise((resolve, reject) => {
        const intersectionObserver = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                intersectionObserver.disconnect();
                setTimeout(resolve, 100);
            }
        });
        intersectionObserver.observe(element);
    });
}

function closestByClass(element, classToFound: string) {
    while (!element.className.includes(classToFound)) {
        element = element.parentNode;
        if (!element || element.className === undefined) {
            return null;
        }
    }
    return element;
}

function createButton(name: string, id: string): HTMLElement {
    const button = document.createElement('button');
    button.setAttribute('style', 'margin-left: 10px; padding: 5px; background-color: tomato; color: white');
    button.id = id;
    button.innerText = name;
    return button;
}