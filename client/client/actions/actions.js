const actions = {
    ADD: Symbol('ADD'),
    REMOVE: Symbol('REMOVE')
};

const add = (amount) => ({
    type: actions.ADD,
    amount: amount
});

const remove = (amount) => ({
    type: actions.REMOVE,
    amount: amount
});

export {actions, add, remove};
