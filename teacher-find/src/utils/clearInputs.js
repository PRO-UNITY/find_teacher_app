// clearInputs.js
export const clearInputs = (setters) => {
    setters.forEach((set) => {
        if (typeof set === 'function') {
            set('');
        }
    });
};
