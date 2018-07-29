const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

export const increment = () => {
    return {
        type:INCREMENT
    }
};

export const decrement = () => {
    return {
        type:DECREMENT
    }
};