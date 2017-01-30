let bin = 'recycle';
let names = [
    'aluminum-foil',
    'Aluminum-food-can-1',
    'Aluminum-food-can-2',
    'Aluminum-food-can-3',
    'aluminum-food-can-5',
    'aluminum-pan',
    'bagel-package',
    'cardboard-box',
    'empty-aluminum-can-1',
    'empty-aluminum-can-2',
    'empty-aluminum-can-3',
    'empty-aluminum-can-4',
    'box-of-cookies-3',
    'empty-chocolate-milk-carton-2',
    'empty-chocolate-milk-carton-4',
    'empty-chocolate-milk-carton-5',
    'empty-chocolate-milk-carton-6',
    'empty-chocolate-milk-carton',
    'empty-cookie-box-1',
    'empty-cookie-box-2',
    'empty-milk-carton-12',
    'empty-milk-carton-13',
    'empty-milk-carton-14',
    'empty-plastic-bottle-1',
    'empty-plastic-bottle-2',
    'empty-plastic-bottle-3',
    'empty-yogurt-container-2',
    'empty-yogurt-container-3',
    'empty-yogurt-container-5',
    'empty-yogurt-container-6',
    'empty-yogurt-container-7',
    'empty-yogurt-container-8',
    'empty-yogurt-container-9',
    'empty-yogurt-container-10',
    'orange-soda-can',
    'paper-folder',
    'paper-packaging-1',
    'paper-packaging-8',
    'paper-packaging',
    'plastic-cup-1',
    'plastic-cup-2',
    'plastic-cup-3',
    'plastic-cup-4',
    'plastic-cup-5',
    'plastic-cup-6',
    'plastic-cup-7',
    'plastic-lids-1',
    'plastic-packaging-2',
    'plastic-packaging-4',
    'plastic-packaging-5',
    'plastic-packaging-6',
    'plastic-packaging-7',
    'wrapping-paper',
];

export default _.map(names, (name, frame) => ({
    name,
    bin,
    frame,
}));
