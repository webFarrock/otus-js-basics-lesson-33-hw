import {configureStore} from './configureStore';
import {combineReducers} from "./combineReducers";

(document.getElementById("app") as HTMLElement).innerHTML = `Redux`;

type State = {
    counter: number
    secondCounter: number
};
const state: State = {counter: 100, secondCounter: 500}

type Action = {
    type: 'inc'
} | {
    type: 'inc10'
} | {
    type: 'dec'
} | {
    type: 'dec10'
} | {
    type: 'plus',
    payload: number
} | {
    type: 'plusSecond',
    payload: number
}


const reducersConfig = {
    counter: (state = 0, action: Action) => {
        switch (action.type) {
            case('inc'): {
                return state + 1
            }
            case('dec'): {
                return state - 1
            }
            case('plus'): {
                return state + action.payload
            }
        }
        return state;
    },
    secondCounter: (state = 0, action: Action) => {
        switch (action.type) {
            case('inc10'): {
                return state + 10
            }
            case('dec10'): {
                return state - 10
            }
            case('plusSecond'): {
                return state + action.payload
            }
        }
        return state;
    },
};

const combinedReducer = combineReducers<State, Action>(reducersConfig);

const store = configureStore(combinedReducer, state);

(document.getElementById("app") as HTMLElement).innerHTML = `
   <h1 class="h1">Counter: ${store.getState()?.counter}</h1>
   <button class="dec">dec</button>
   <button class="inc">inc</button>
   <br />
   <input type="number" class="number" value="3" /><button class="plus">plus</button>
   <hr/>
   <hr/>
   <h1 class="secondH1">Second Counter: ${store.getState()?.secondCounter}</h1>
   <button class="secondDec">dec10</button>
   <button class="secondInc">inc10</button>
   <br />
   <input type="number" class="secondNumber" value="200" /><button class="secondPlus">plus</button>
 `;

const incButton = document.querySelector('.inc') as HTMLButtonElement;
const decButton = document.querySelector('.dec') as HTMLButtonElement;
const plusButton = document.querySelector('.plus') as HTMLButtonElement;
const numberInput = document.querySelector('.number') as HTMLInputElement;
const header = document.querySelector('.h1') as HTMLHeadElement;

incButton.addEventListener('click', () => store.dispatch({
    type: 'inc',
}));

decButton.addEventListener('click', () => store.dispatch({
    type: 'dec',
}));

plusButton.addEventListener('click', () => store.dispatch({
    type: 'plus',
    payload: Number(numberInput.value)
}));

store.subscribe(() => header.innerHTML = `Counter: ${store.getState()?.counter}`);


const secondIncButton = document.querySelector('.secondInc') as HTMLButtonElement;
const secondDecButton = document.querySelector('.secondDec') as HTMLButtonElement;
const secondPlusButton = document.querySelector('.secondPlus') as HTMLButtonElement;
const secondNumberInput = document.querySelector('.secondNumber') as HTMLInputElement;
const secondHeader = document.querySelector('.secondH1') as HTMLHeadElement;

secondIncButton.addEventListener('click', () => store.dispatch({
    type: 'inc10',
}));

secondDecButton.addEventListener('click', () => store.dispatch({
    type: 'dec10',
}));

secondPlusButton.addEventListener('click', () => store.dispatch({
    type: 'plusSecond',
    payload: Number(secondNumberInput.value)
}));

store.subscribe(() => secondHeader.innerHTML = `Second Counter: ${store.getState()?.secondCounter}`);
