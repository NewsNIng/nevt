import Nevt from './index';

const nevt = new Nevt();

interface IData {
    name: string;
}

enum EAction {
    LAZY = 'LAZY',
    
}

// pub 
nevt.emit(EAction.LAZY, {name: 'LAZY'} as IData, { lazy: true });


// sub after pub
nevt.on(EAction.LAZY, (data: IData) => {
    console.log(data.name);
}, { lazy: true });





